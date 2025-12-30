import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState({ open: false, id: null, action: "" });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/users?page=${page}`);
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleAction = async () => {
    try {
      await api.patch(
        `/admin/users/${confirm.id}/${confirm.action}`
      );
      toast.success(
        confirm.action === "activate"
          ? "User activated successfully"
          : "User deactivated successfully"
      );
      fetchUsers();
    } catch {
      toast.error("Action failed");
    } finally {
      setConfirm({ open: false, id: null, action: "" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">
      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h2>

      <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.fullName}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  {user.status === "active" ? (
                    <button
                      onClick={() =>
                        setConfirm({
                          open: true,
                          id: user._id,
                          action: "deactivate"
                        })
                      }
                      className="px-4 py-2 bg-danger text-white rounded-lg text-xs"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setConfirm({
                          open: true,
                          id: user._id,
                          action: "activate"
                        })
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-6 py-4 border-t">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {confirm.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl2 shadow-card w-96">
            <h3 className="text-lg font-semibold mb-2">
              Confirm Action
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to {confirm.action} this user?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() =>
                  setConfirm({ open: false, id: null, action: "" })
                }
                className="px-4 py-2 bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                className="px-4 py-2 bg-danger text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
