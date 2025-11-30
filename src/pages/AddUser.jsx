import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddUser() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        console.log("User created:", createdUser);
        Swal.fire({ title: "User added!", icon: "success", timer: 1200, showConfirmButton: false });
        setFormData({ name: "", email: "" });
      })
      .catch(() => Swal.fire({ title: "Create failed", icon: "error" }));
  };

  return (
    <main className="p-6 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
      <form
        onSubmit={handleSubmit}
        className="glass neo-surface rounded-2xl p-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="glass-input"
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="glass-input"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
