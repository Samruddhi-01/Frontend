// src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <main className="p-6 flex flex-col gap-6">
      <p className="text-lg opacity-70">Welcome to your dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">Users</h3>
          <p className="text-gray-600 dark:text-gray-300">Total registered users</p>
          <span className="text-3xl font-bold mt-4">1,245</span>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">Revenue</h3>
          <p className="text-gray-600 dark:text-gray-300">Monthly revenue</p>
          <span className="text-3xl font-bold mt-4">$12,430</span>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">Orders</h3>
          <p className="text-gray-600 dark:text-gray-300">New orders this month</p>
          <span className="text-3xl font-bold mt-4">320</span>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">Tasks</h3>
          <p className="text-gray-600 dark:text-gray-300">Pending tasks</p>
          <span className="text-3xl font-bold mt-4">18</span>
        </div>
      </div>
    </main>
  );
}
