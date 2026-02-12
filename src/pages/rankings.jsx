import { Link } from "react-router";
import { User } from "lucide-react";
import LayoutFull from "../layout/base";

export default function Rankings() {
  // Sample top scorers data
  const topScorers = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 88 },
    { name: "Charlie", score: 80 },
  ];

  return (
    <LayoutFull>
      {/* Top Bar */}
      <header className="w-full px-8 py-4 flex items-center justify-between bg-slate-900 shadow-md">
        <Link
          to="/"
          className="text-white bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition"
        >
          ⟵ Back
        </Link>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 px-3 py-2 rounded-full transition">
          <User size={20} className="text-white" />
          <span className="text-sm font-medium text-white">Guest</span>
        </div>
      </header>

      {/* Main Section */}
      <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-4 bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Member Grades
        </h1>

        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-3">
          {topScorers.map((player, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-100 rounded-xl px-4 py-2"
            >
              <span className="font-medium text-slate-900">{player.name}</span>
              <span className="font-semibold text-slate-700">{player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </LayoutFull>
  );
}