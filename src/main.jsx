import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import './index.css';
import Index from "./pages";
import Rankings from "./pages/rankings";
import Achievements from "./pages/achievement";
import Submit from "./pages/submit";

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index user={user} />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/rankings" element={<Rankings user={user} />} />
        <Route path="/achievements" element={<Achievements user={user} />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);