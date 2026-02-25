import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutFull from "../layout/base";
import { ArrowLeft } from "lucide-react";
import { Navbar, LoginModal, SignupModal } from "./auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function Rankings({ user }) {
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"), orderBy("score", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // rank pill colors for top 3
  const getRankColor = (rank) => {
    if (rank === 0) return "bg-yellow-400 text-white"; // gold
    if (rank === 1) return "bg-slate-400 text-white";  // silver
    if (rank === 2) return "bg-amber-700 text-white";  // bronze
    return "bg-slate-200 text-slate-900";              // default
  };

  return (
    <LayoutFull>
      <Navbar user={user} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* Main content */}
      <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-start pt-16 px-4 bg-slate-50">
        
        {/* Back button */}
        <div className="w-full max-w-3xl mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl shadow transition"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          Member Rankings
        </h1>

        {/* Leaderboard */}
        <div className="w-full max-w-3xl space-y-4">
          {users.map((player, index) => (
            <div
              key={player.id}
              className={`flex justify-between items-center p-4 rounded-2xl shadow-md transition transform hover:-translate-y-1 hover:shadow-lg ${
                player.id === user?.uid ? "bg-cyan-100" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 font-medium rounded-full ${getRankColor(index)}`}
                >
                  #{index + 1}
                </span>
                <span className="font-semibold text-slate-900">
                  {player.name || player.email}
                </span>
              </div>
              <span className="font-bold text-slate-700">{player.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </LayoutFull>
  );
}