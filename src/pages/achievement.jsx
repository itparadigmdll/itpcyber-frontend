import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import LayoutFull from "../layout/base";
import { Navbar, LoginModal, SignupModal } from "./auth";

import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Achievements({ user }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setAchievements([]);
        setLoading(false);
        return;
      }

      try {
        const solvedRef = collection(
          db,
          "users",
          currentUser.uid,
          "solved"
        );

        const snapshot = await getDocs(solvedRef);

        const solvedData = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            title: data.challenge || "Unknown Challenge",
            description: `+${data.score} points`,
            date: data.solvedAt?.toDate
              ? data.solvedAt.toDate().toLocaleDateString()
              : "Unknown date",
          };
        });

        setAchievements(solvedData);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }

      setLoading(false);
    };

    fetchAchievements();
  }, []);

  return (
    <LayoutFull>
      <Navbar
        user={user}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
      />

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

      <div className="min-h-[calc(100vh-72px)] px-4 py-8 bg-slate-50 flex justify-center">
        <div className="w-full max-w-3xl bg-slate-100 rounded-2xl shadow-lg p-6 space-y-6">

          {/* Back */}
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-slate-900 rounded-2xl shadow hover:shadow-lg text-white font-semibold transition"
          >
            <ArrowLeft size={16} className="inline mr-2" />
            back
          </Link>

          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-900 text-center">
            Solved Challenges
          </h1>

          {/* Content */}
          {loading ? (
            <p className="text-center text-slate-500">
              Loading Challenges...
            </p>
          ) : achievements.length === 0 ? (
            <p className="text-center text-slate-500">
              No Solved Challenges yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {achievements.map((ach, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle size={20} className="text-cyan-500" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">
                      {ach.title}
                    </span>
                    <span className="text-slate-700 text-sm">
                      {ach.description}
                    </span>
                    <span className="mt-1 text-xs text-cyan-500 font-medium">
                      {ach.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LayoutFull>
  );
}