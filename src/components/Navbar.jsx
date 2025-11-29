// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <header className="w-full p-6 bg-white dark:bg-gray-800 shadow-md flex items-center justify-center">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
        Dashboard
      </h1>
    </header>
  );
}
