import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaUser, FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserDetailsModal from "../components/UserDetailsModal";
import Swal from "sweetalert2";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
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

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      fetch(`http://localhost:8080/api/v1/user/delete/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setUsers(users.filter((u) => u.id !== id));
          Swal.fire({ title: "Deleted!", icon: "success", timer: 1200, showConfirmButton: false });
        })
        .catch(() => {
          Swal.fire({ title: "Delete failed", icon: "error" });
        });
    }
  };

  const openUserModal = (id) => {
    setModalOpen(true);
    setLoadingUser(true);
    setSelectedUser(null);
    fetch(`http://localhost:8080/api/v1/user/view/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedUser(data))
      .catch((err) => console.error("Error loading user:", err))
      .finally(() => setLoadingUser(false));
  };

  return (
    <main className="p-6 flex flex-col gap-6">

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center glass rounded-xl px-4 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-500 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-600 dark:text-white dark:placeholder-white/70"
          />
        </div>

        <button
          onClick={() => navigate("/add-user")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6 glass neo-surface rounded-2xl">
        <table className="min-w-full rounded-2xl">
          <thead>
            <tr className="border-b border-gray-300 dark:border-white/20 text-gray-900 dark:text-white/90">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white/90">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => openUserModal(user.id)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-100"
                    >
                      <FaUser size={20} />
                    </button>

                    <button
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                      className="text-green-600 hover:text-green-700 dark:text-green-200 dark:hover:text-green-100"
                    >
                      <FaPen size={20} />
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-300 dark:hover:text-red-200"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600 dark:text-white/70">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UserDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={selectedUser}
        loading={loadingUser}
      />

    </main>
  );
}
