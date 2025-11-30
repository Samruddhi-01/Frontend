import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/user/view/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  if (!user) return <p className="text-gray-700 dark:text-white/80 p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Details</h2>
      <div className="glass neo-surface rounded-2xl p-6 mt-4 text-gray-900 dark:text-white/90">
        <p><strong className="text-gray-900 dark:text-white">ID:</strong> {user.id}</p>
        <p><strong className="text-gray-900 dark:text-white">Name:</strong> {user.name}</p>
        <p><strong className="text-gray-900 dark:text-white">Email:</strong> {user.email}</p>
      </div>
    </main>
  );
}
