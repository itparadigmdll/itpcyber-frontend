import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutFull from "../layout/base";
import { Navbar, LoginModal, SignupModal } from "./auth";

export default function Rankings({ user }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const topScorers = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 88 },
    { name: "Charlie", score: 80 },
  ];

  return (
    <LayoutFull>
      <Navbar user={user} setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>

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
          Member Grades
        </h1>

        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-3">
          {topScorers.map((player, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-100 rounded-xl px-4 py-2"
            >
              <span className="font-medium text-slate-900">
                {player.name}
              </span>
              <span className="font-semibold text-slate-700">
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </LayoutFull>
  );
}