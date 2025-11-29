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
      } bg-blue-900 text-white shadow-lg transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-6 border-b border-blue-700">
        {!isCollapsed && (
          <h2 className="text-3xl font-bold flex items-center gap-3">
            MyPanel
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-2xl bg-blue-800 px-3 py-1 rounded hover:bg-blue-700 transition"
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
            className={`flex items-center gap-3 px-6 py-3 font-bold text-xl rounded transition-colors duration-200
              ${location.pathname === item.path ? "bg-white text-blue-900" : "hover:bg-white hover:text-blue-900"}
            `}
          >
            {item.icon} {!isCollapsed && item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

