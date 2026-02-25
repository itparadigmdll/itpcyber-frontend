import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutFull from "../layout/base";
import { ArrowLeft } from "lucide-react";

export default function Submit() {
  const [flag, setFlag] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // mock validation
    if (flag === "flag{test}") {
      setStatus("success");
      setFlag("");
    } else {
      setStatus("error");
    }
  };

  return (
    <LayoutFull>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4">

        <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-700 shadow-2xl rounded-3xl p-8 backdrop-blur">

          {/* Back button */}
          <div className="mb-6 text-left">
            <Link
              to="/"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
            <ArrowLeft size={18} className="inline mr-2" />
            Back to Home
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Submit Flag
          </h1>

          <p className="text-slate-400 mb-6">
            Enter your flag below.
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
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Status message */}
            {status === "success" && (
              <div className="text-green-400 text-sm font-medium">
                ✅ Correct flag! Points awarded.
              </div>
            )}

            {status === "error" && (
              <div className="text-red-400 text-sm font-medium">
                ❌ Incorrect flag. Try again.
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-lg transition shadow-lg"
            >
              Submit Flag
            </button>
          </form>
        </div>
      </main>
    </LayoutFull>
  );
}