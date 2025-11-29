import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import ViewUser from "./pages/ViewUser";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // LOGIN STATE
  const [auth, setAuth] = useState(() => {
    const isLoggedIn = localStorage.getItem("auth") === "true";
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    return { isLoggedIn, admin };
  });

  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  // DARK MODE
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {!hideLayout && (
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}

      <div className="flex-1 flex flex-col">
        {!hideLayout && <Navbar isDark={isDark} setIsDark={setIsDark} />}

        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute auth={auth}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute auth={auth}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-user"
            element={
              <ProtectedRoute auth={auth}>
                <AddUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-user/:id"
            element={
              <ProtectedRoute auth={auth}>
                <ViewUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-user/:id"
            element={
              <ProtectedRoute auth={auth}>
                <EditUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
