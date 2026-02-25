import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutFull from "../layout/base";
import { ArrowLeft } from "lucide-react";

export default function Submit() {
  const [flag, setFlag] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flag === "flag{test}") {
      setStatus("success");
      setFlag("");
    } else {
      setStatus("error");
    }
  };

  return (
    <LayoutFull>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-slate-950 to-gray-900 px-4">

        <div className="w-full max-w-2xl bg-gradient-to-tl from-slate-800/90 via-slate-900/70 to-slate-950/90 border border-slate-700 shadow-2xl rounded-3xl p-8 backdrop-blur-lg">

          {/* Back button */}
          <div className="mb-6 text-left">
            <Link
              to="/"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
            Submit Flag
          </h1>

          <p className="text-slate-300 mb-6">
            Enter your flag below to earn points.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Flag input */}
            <div className="text-left">
              <label className="block text-sm text-slate-400 mb-1">
                Flag
              </label>
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="flag{...}"
                className="w-full px-5 py-3 rounded-2xl bg-slate-800 border border-cyan-500/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              />
            </div>

            {/* Status message */}
            {status === "success" && (
              <div className="text-green-400 text-sm font-medium flex items-center gap-2">
                ✅ Correct flag! Points awarded.
              </div>
            )}

            {status === "error" && (
              <div className="text-red-400 text-sm font-medium flex items-center gap-2">
                ❌ Incorrect flag. Try again.
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-lg transition shadow-md hover:shadow-xl"
            >
              Submit Flag
            </button>
          </form>
        </div>
      </main>
    </LayoutFull>
  );
}