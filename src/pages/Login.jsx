import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

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
        "http://localhost:8080/api/v1/admin/login",
        form
      );

      const data = res.data;

      if (data?.auth) {
        localStorage.setItem("admin", JSON.stringify({ username: data.username }));
        localStorage.setItem("auth", "true");

        setAuth({
          isLoggedIn: true,
          admin: { username: data.username },
        });

        setMsg("Login Successful!");
        setSuccess(true);

        setTimeout(() => navigate("/"), 800);
      } else {
        setMsg("Invalid Credentials");
        setSuccess(false);
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Server Error");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-500">
      <div className="backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-11/12 sm:w-96 border border-white/30 bg-white/20">

        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Admin Login
        </h2>

        {msg && (
          <p className="text-center mb-4 text-white font-semibold">{msg}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 border border-white/40">
            <FaUser className="text-white mr-3" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent text-white w-full"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 border border-white/40">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-white w-full"
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
            className="mt-3 bg-white text-purple-700 font-semibold py-2 rounded-lg"
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
