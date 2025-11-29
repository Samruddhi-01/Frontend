import React, { useState } from "react";

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
        alert("User added successfully!");
        setFormData({ name: "", email: "" });
      })
      .catch((err) => console.error("Error creating user:", err));
  };

  return (
    <main className="p-6 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Add New User</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
