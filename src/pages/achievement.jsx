import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutFull from "../layout/base";
import { Navbar, LoginModal, SignupModal } from "./auth";

export default function Achievements({ user }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const achievements = [
    { title: "First Login", description: "Logged in for the first time", date: "2026-01-01" },
    { title: "Top Scorer", description: "Reached the highest score in a quiz", date: "2026-02-15" },
    { title: "Contributor", description: "Added content to the platform", date: "2026-02-20" },
  ];

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

      <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-4 bg-slate-50">
        <div className="w-full max-w-md mb-4">
          <Link
            to="/"
            className="inline-block text-white bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition"
          >
            ⟵ Back
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Achievements
        </h1>

        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-3">
          {achievements.map((ach, index) => (
            <div
              key={index}
              className="flex flex-col bg-slate-100 rounded-xl px-4 py-3"
            >
              <span className="font-semibold text-slate-900">{ach.title}</span>
              <span className="text-slate-700 text-sm">{ach.description}</span>
              <span className="text-slate-500 text-xs mt-1">{ach.date}</span>
            </div>
          ))}
        </div>
      </div>
    </LayoutFull>
  );
}