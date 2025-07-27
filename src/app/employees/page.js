"use client";

import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/userService";
import Loader from "../components/Loader";
import Link from "next/link";

const DEFAULT_IMAGE = "https://avatars.githubusercontent.com/u/583231?v=4"; // GitHub Octocat avatar

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((u) => (
          <Link href={`/employees/${u.id}`} key={u.id}>
            <div className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center text-center hover:shadow-lg transition">
              <img
                src={u.image || DEFAULT_IMAGE}
                alt={u.name || "Unknown"}
                onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <p className="text-lg font-semibold">
                {u.name || "Unnamed User"}
              </p>
              <p className="text-sm text-gray-600">{u.email || "No Email"}</p>
              <p className="text-sm text-blue-600 font-medium">
                {u.role || "No Role"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
