import { useState, useEffect } from "react";
import { Eye, EyeOff, X, Shield, User } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/* =========================
          NAVBAR
========================= */
export function Navbar({ user, setShowLogin }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="w-full px-3 py-4 flex items-center justify-between bg-slate-950 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <Shield size={22} className="text-cyan-400" />
        <h2 className="text-base font-semibold tracking-wide text-slate-100">
          iTP CyberSec
        </h2>
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          {/* Display user name or email */}
          <span className="text-sm text-slate-100">
            {user.displayName || user.name}
          </span>

          {/* Styled logout button matching login */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-800 text-slate-100 rounded-xl border border-slate-700 hover:bg-slate-700 transition"
          >
            <User size={16} />
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-800 text-slate-100 rounded-xl border border-slate-700 hover:bg-slate-700 transition"
        >
          <User size={16} />
          Account
        </button>
      )}
    </header>
  );
}

/* =========================
        LOGIN MODAL
========================= */
export function LoginModal({ onClose, onSwitchToSignup }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    setForm({ email: "", password: "" });
    setShowPassword(false);
    onClose();
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      handleClose();
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      alert("Enter your email first");
      return;
    }

    try {
      setIsSendingReset(true);
      await sendPasswordResetEmail(auth, form.email);
      alert("Password reset email sent. Check your inbox.");
    } catch (error) {
      alert("Failed to send reset email");
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-8 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 pr-10 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot password link */}
          <div className="text-right -mt-3">
            <span
              onClick={handleForgotPassword}
              className={`text-xs cursor-pointer hover:underline ${
                isSendingReset ? "text-slate-500" : "text-cyan-400"
              }`}
            >
              {isSendingReset ? "Sending reset..." : "Forgot password?"}
            </span>
          </div>

          <button
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-400">
          Don't have an account?{" "}
          <span
            onClick={onSwitchToSignup}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

/* =========================
        SIGNUP MODAL
========================= */
export function SignupModal({ onClose, onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    onClose();
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // set display name
      await updateProfile(user, {
        displayName: form.name,
      });

      // create firestore user doc (CLEAN VERSION)
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        score: 0,
        createdAt: serverTimestamp(),
      });

      handleClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-8 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition">
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-400">
          Already have an account?{" "}
          <span
            onClick={onSwitchToLogin}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}