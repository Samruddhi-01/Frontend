import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/v1/admin/register", form);

      toast.success("Registered Successfully!");
      setSuccess(true);
      setMsg("Registration successful");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error("Registration Failed!");
      setSuccess(false);
      setMsg("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-500 animate-gradient">
      <div
        className={`backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-11/12 sm:w-96 border border-white/30
        ${success ? "bg-purple-600/40 border-purple-400" : "bg-white/20"}`}
      >
        <h2 className="text-4xl font-bold text-white text-center mb-6">Register</h2>
        {msg && (
          <p className={`text-center mb-4 font-semibold ${success ? "text-purple-200" : "text-white"}`}>
            {msg}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 border border-white/40">
            <FaUser className="text-white mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-white placeholder-white/70 w-full"
              required
            />
          </div>

          <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 border border-white/40">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-white placeholder-white/70 w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-3 font-semibold py-2 rounded-lg shadow-lg w-full transition disabled:opacity-60 disabled:cursor-not-allowed
              ${success ? "bg-purple-700 hover:bg-purple-800 text-white" : "bg-white text-purple-700 hover:bg-purple-200"}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-white mt-4 text-center">
          Already have an account? <Link to="/login" className="underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
