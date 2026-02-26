import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutFull from "../layout/base";
import { ArrowLeft } from "lucide-react";

import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  increment,
} from "firebase/firestore";

export default function Submit() {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔐 SHA-256 hashing function
  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      setMessage({ type: "error", text: "You must be logged in." });
      return;
    }

    const cleanFlag = flag.trim();

    if (!cleanFlag) {
      setMessage({ type: "error", text: "Flag cannot be empty." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const hashedInput = await sha256(cleanFlag);

      const snapshot = await getDocs(collection(db, "flags"));

      let matchedFlag = null;
      let matchedId = null;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        if (data.hash === hashedInput) {
          matchedFlag = data;
          matchedId = docSnap.id;
        }
      });

      if (!matchedFlag) {
        setMessage({
          type: "error",
          text: "Incorrect flag. Try again.",
        });
        setLoading(false);
        return;
      }

      // 🔎 Check if already solved
      const solvedRef = doc(
        db,
        "users",
        user.uid,
        "solved",
        matchedId
      );

      const solvedSnap = await getDoc(solvedRef);

      if (solvedSnap.exists()) {
        setMessage({
          type: "error",
          text: "You already solved this challenge.",
        });
        setLoading(false);
        return;
      }

      // ✅ Record solve
      await setDoc(solvedRef, {
        solvedAt: new Date(),
        score: matchedFlag.score,
        challenge: matchedFlag.challenge,
      });

      // ✅ Increment user score
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        score: increment(matchedFlag.score),
      });

      setMessage({
        type: "success",
        text: `Correct! +${matchedFlag.score} points 🎉`,
      });

      setFlag("");

    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong.",
      });
    }

    setLoading(false);
  };

  return (
    <LayoutFull>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-slate-950 to-gray-900 px-4">
        <div className="w-full max-w-2xl bg-gradient-to-tl from-slate-800/90 via-slate-900/70 to-slate-950/90 border border-slate-700 shadow-2xl rounded-3xl p-8 backdrop-blur-lg">

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

            <div className="text-left">
              <label className="block text-sm text-slate-400 mb-1">
                Flag
              </label>
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="iTP{...}"
                className="w-full px-5 py-3 rounded-2xl bg-slate-800 border border-cyan-500/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              />
            </div>

            {message && (
              <div
                className={`text-sm font-medium ${
                  message.type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message.type === "success" ? "✅" : "❌"} {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg transition shadow-md hover:shadow-xl"
            >
              {loading ? "Checking..." : "Submit Flag"}
            </button>
          </form>
        </div>
      </main>
    </LayoutFull>
  );
}