// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("admin");
    if (typeof setAuth === "function") {
      setAuth({ isLoggedIn: false, admin: null });
    }
    await Swal.fire({ title: "Logged out", icon: "success", timer: 900, showConfirmButton: false });
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full p-6 glass neo-surface flex items-center justify-between rounded-b-2xl">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-300 dark:to-purple-400">
        Dashboard
      </h1>
      <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg">
ww        Logout
      </button>
    </header>
  );
}
