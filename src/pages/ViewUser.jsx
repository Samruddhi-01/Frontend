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

  if (!user) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h2 className="text-xl font-bold">User Details</h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-4">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </main>
  );
}
