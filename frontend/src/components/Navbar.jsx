import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
  }, [location.pathname]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    localStorage.clear();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  if (!localStorage.getItem("token")) return null;

  const navStyle = (path) =>
    location.pathname === path
      ? "font-semibold text-black"
      : "text-black hover:opacity-80";

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <h1
            onClick={() => navigate("/profile")}
            className="text-xl font-bold  text-primary cursor-pointer"
          >
            User Management
          </h1>

          <nav className="flex gap-6">
            <button
              onClick={() => navigate("/profile")}
              className={`text-sm ${navStyle("/profile")}`}
            >
              Profile
            </button>

            {role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className={`text-sm ${navStyle("/admin")}`}
              >
                Admin Dashboard
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-medium text-black">{name}</p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
