import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Login({ setAuth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        form
      );

      if (res.status === 200) {
        localStorage.setItem("admin", JSON.stringify({ username: form.username }));
        localStorage.setItem("auth", "true");

        setAuth({
          isLoggedIn: true,
          admin: { username: form.username },
        });

        setMsg("Login Successful!");
        setSuccess(true);
        Swal.fire({ title: "Logged in!", icon: "success", timer: 1000, showConfirmButton: false });
        setTimeout(() => navigate("/"), 800);
      } else {
        setMsg("Invalid Credentials");
        setSuccess(false);
        Swal.fire({ title: "Invalid credentials", icon: "error" });
      }
    } catch (err) {
      const message = err.response?.data?.message || "Server Error";
      setMsg(message);
      setSuccess(false);
      Swal.fire({ title: message, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-500 animate-gradient">
      <div className="glass neo-surface p-10 rounded-2xl w-11/12 sm:w-96">

        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Admin Login
        </h2>

        {msg && (
          <p className="text-center mb-4 text-white font-semibold">{msg}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center rounded-lg">
            <FaUser className="text-white mr-3" />
            <input
              type="text"
              placeholder="Username"
              className="glass-input w-full"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center rounded-lg">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="glass-input w-full"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-white mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
