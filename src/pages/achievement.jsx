import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Star, Plus, ArrowLeft} from "lucide-react";
import LayoutFull from "../layout/base";
import { Navbar, LoginModal, SignupModal } from "./auth";

export default function Achievements({ user }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const achievements = [
    { title: "First Login", description: "Logged in for the first time", date: "2026-01-01", icon: <CheckCircle size={20} className="text-cyan-500" /> },
    { title: "Top Scorer", description: "Reached the highest score in a quiz", date: "2026-02-15", icon: <Star size={20} className="text-yellow-400" /> },
    { title: "Contributor", description: "Added content to the platform", date: "2026-02-20", icon: <Plus size={20} className="text-green-400" /> },
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

      <div className="min-h-[calc(100vh-72px)] px-4 py-8 bg-slate-50 flex justify-center">
        {/* Main card container */}
        <div className="w-full max-w-3xl bg-slate-100 rounded-2xl shadow-lg p-6 space-y-6">

          {/* Back button styled like a card */}
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-slate-900 rounded-2xl shadow hover:shadow-lg text-white font-semibold transition"
          >
            <ArrowLeft size={16} className="inline mr-2" />
            back
          </Link>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-900 text-center">
            Achievements
          </h1>

          {/* Achievements grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((ach, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex-shrink-0">{ach.icon}</div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">{ach.title}</span>
                  <span className="text-slate-700 text-sm">{ach.description}</span>
                  <span className="mt-1 text-xs text-cyan-500 font-medium">{ach.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutFull>
  );
}