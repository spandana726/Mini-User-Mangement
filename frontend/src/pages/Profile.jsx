import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setFullName(res.data.data.fullName);
      setEmail(res.data.data.email);
    });
  }, []);

  const updateProfile = async () => {
    if (!fullName || !email) {
      toast.error("Full name and email are required");
      return;
    }

    try {
      setLoading(true);
      await api.put("/users/me", { fullName, email });
      localStorage.setItem("name", fullName);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await api.put("/users/change-password", {
        currentPassword,
        newPassword
      });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 space-y-8">
      <div className="bg-white rounded-xl2 shadow-card p-8">
        <h2 className="text-xl font-bold mb-6">
          Profile Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Full Name
            </label>
            <input
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Email
            </label>
            <input
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={updateProfile}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark"
          >
            Save Changes
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl2 shadow-card p-8">
        <h2 className="text-xl font-bold mb-6">
          Change Password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={changePassword}
            disabled={loading}
            className="px-6 py-3 bg-danger text-white rounded-lg hover:bg-red-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
