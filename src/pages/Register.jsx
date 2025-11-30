import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
      await axios.post("http://localhost:8080/api/auth/register", form);

      Swal.fire({ title: "Registered!", icon: "success", timer: 1200, showConfirmButton: false });
      setSuccess(true);
      setMsg("Registration successful");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      Swal.fire({ title: "Registration failed", icon: "error" });
      setSuccess(false);
      setMsg("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-500 animate-gradient">
      <div className="glass neo-surface p-10 rounded-2xl w-11/12 sm:w-96 text-gray-900 dark:text-white">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">Register</h2>
        {msg && (
          <p className={`text-center mb-4 font-semibold ${success ? "text-green-700 dark:text-purple-200" : "text-gray-900 dark:text-white"}`}>
            {msg}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="flex items-center rounded-lg">
            <FaUser className="text-gray-700 dark:text-white mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="glass-input w-full"
              required
            />
          </div>

          <div className="flex items-center rounded-lg">
            <FaLock className="text-gray-700 dark:text-white mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="glass-input w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="text-gray-900 dark:text-white mt-4 text-center">
          Already have an account? <Link to="/login" className="underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
