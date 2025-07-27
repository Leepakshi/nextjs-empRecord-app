"use client";

import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/userService";
import Loader from "../components/Loader";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (user) => {
    alert(`Clicked on ${user.name}`);
    // You can redirect using router.push(`/user/${user.id}`) if needed
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Employees List</h2>
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-3 py-2 rounded w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={handleSort}
              >
                Name {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(user)}
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email || "-"}</td>
                  <td className="px-4 py-2">{user.role || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
