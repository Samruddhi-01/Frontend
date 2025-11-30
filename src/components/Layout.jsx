// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col overflow-auto">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Outlet />
      </div>
    </div>
  );
}
