import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaUser, FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user/view-users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data);
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = (id) => {
    fetch(`http://localhost:8080/api/v1/user/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => setUsers(users.filter((u) => u.id !== id)))
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <main className="p-6 flex flex-col gap-6">

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        <button
          onClick={() => navigate("/add-user")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/view-user/${user.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaUser size={20} />
                    </button>

                    <button
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaPen size={20} />
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </main>
  );
}
