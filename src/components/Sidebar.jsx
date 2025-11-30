// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Users", icon: <FaUsers />, path: "/users" },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } glass neo-surface text-gray-900 dark:text-white transition-all duration-300 flex flex-col min-h-screen overflow-y-auto flex-shrink-0`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-6 glass-header rounded-b-xl">
        {!isCollapsed && (
          <h2 className="text-3xl font-bold flex items-center gap-3">
            MyPanel
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-2xl px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <FiAlignJustify />
        </button>
      </div>

      {/* Sidebar menu */}
      <nav className="flex flex-col mt-6 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 font-bold text-xl rounded-lg transition-colors duration-200
              ${location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-500/60"}
            `}
          >
            {item.icon} {!isCollapsed && item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
