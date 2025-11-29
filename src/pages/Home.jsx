// src/pages/Home.jsx
import React from "react";
import { FaUsers, FaShoppingCart, FaTasks } from "react-icons/fa";

export default function Home() {
  return (
    <main className="p-6 flex flex-col gap-6">
      <p className="text-lg opacity-70">Welcome to your dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        {/* Users Card */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 shadow-xl rounded-xl p-6 flex flex-col items-center text-white transform hover:scale-105 transition-transform duration-300">
          <FaUsers className="text-4xl mb-2" />
          <h3 className="text-xl font-bold mb-2">Users</h3>
          <p className="opacity-90">Total registered users</p>
          <span className="text-3xl font-bold mt-4">12</span>
        </div>

        {/* Orders Card */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 shadow-xl rounded-xl p-6 flex flex-col items-center text-white transform hover:scale-105 transition-transform duration-300">
          <FaShoppingCart className="text-4xl mb-2" />
          <h3 className="text-xl font-bold mb-2">Orders</h3>
          <p className="opacity-90">New orders this month</p>
          <span className="text-3xl font-bold mt-4">3</span>
        </div>

        {/* Tasks Card */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-700 dark:to-purple-900 shadow-xl rounded-xl p-6 flex flex-col items-center text-white transform hover:scale-105 transition-transform duration-300">
          <FaTasks className="text-4xl mb-2" />
          <h3 className="text-xl font-bold mb-2">Tasks</h3>
          <p className="opacity-90">Pending tasks</p>
          <span className="text-3xl font-bold mt-4">18</span>
        </div>

      </div>
    </main>
  );
}
