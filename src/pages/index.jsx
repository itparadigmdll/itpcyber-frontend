import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutFull from "../layout/base";
import { Navbar, LoginModal, SignupModal } from "./auth";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Index() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // 🔥 Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => unsub();
  }, []);

  return (
    <LayoutFull>
      {/* NAVBAR */}
      <Navbar
        user={user}
        profile={profile}
        setShowLogin={setShowLogin}
      />

      {/* MODALS */}
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

      {/* MAIN CONTENT */}
      <main className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-4 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            iTP CyberSec Team
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8">
            Your scores, achievements, and rankings are all here.
          </p>

          {/* SCORE CARD */}
          <div className="bg-white shadow-xl rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Current Score
            </h2>

            <div className="text-3xl font-bold text-cyan-600">
              {profile?.score ?? 0}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/submit"
              className="block py-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg transition"
            >
              Submit A Flag
            </Link>

            <Link
              to="/achievements"
              className="block py-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg transition"
            >
              Achievements
            </Link>

            <Link
              to="/rankings"
              className="block py-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg transition"
            >
              Rankings
            </Link>
          </div>
        </div>
      </main>
    </LayoutFull>
  );
}