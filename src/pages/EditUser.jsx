import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/user/view/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData({ name: data.name, email: data.email }))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/v1/user/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({ title: "User updated!", icon: "success", timer: 1200, showConfirmButton: false });
        navigate("/users"); // go back to list
      })
      .catch(() => Swal.fire({ title: "Update failed", icon: "error" }));
  };

  return (
    <main className="p-6">
      <h2 className="text-xl font-bold text-white text-center">Edit User</h2>
      <form
        onSubmit={handleSubmit}
        className="glass neo-surface rounded-2xl p-6 flex flex-col gap-4 mt-4 max-w-md w-full mx-auto"
      >
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="glass-input w-full"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="glass-input w-full"
          required
        />
        <button
          type="submit"
          className="neo-btn px-4 py-2 w-full"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
