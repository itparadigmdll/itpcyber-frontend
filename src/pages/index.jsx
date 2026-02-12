import { Link } from "react-router";
import { User } from "lucide-react";
import LayoutFull from "../layout/base";

export default function Index() {
  return (
    <LayoutFull>
      {/* Top Bar */}
      <header className="w-full px-8 py-4 flex items-center justify-between bg-slate-900 shadow-md">
        <h2 className="text-lg font-semibold text-white">
          iTP CyberSec
        </h2>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 px-3 py-2 rounded-full transition">
          <User size={20} className="text-white" />
          <span className="text-sm font-medium text-white">Guest</span>
        </div>
      </header>

      {/* Main Section */}
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 bg-slate-50">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            iTP CyberSec Team
          </h1>

          <p className="text-slate-600 mb-6 text-lg">
            Scores: <span className="font-semibold">0</span>
          </p>

          <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
            <Link
              to="achievements"
              className="block w-full text-base font-semibold bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Achievements
            </Link>

            <Link
              to="rankings"
              className="block w-full text-base font-semibold bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Rankings
            </Link>
          </div>
        </div>
      </div>
    </LayoutFull>
  );
}
