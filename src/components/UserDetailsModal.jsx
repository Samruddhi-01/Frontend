// src/components/UserDetailsModal.jsx
import React from "react";

export default function UserDetailsModal({ open, onClose, user, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative glass neo-surface rounded-2xl p-6 w-11/12 max-w-md text-gray-900 dark:text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">User Details</h3>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {loading ? (
          <p className="text-gray-700 dark:text-white/80">Loading...</p>
        ) : user ? (
          <div className="space-y-2 text-gray-900 dark:text-white/90">
            <p>
              <strong className="text-gray-900 dark:text-white">ID:</strong> {user.id}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Name:</strong> {user.name}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-red-200">Unable to load user details.</p>
        )}
      </div>
    </div>
  );
}
