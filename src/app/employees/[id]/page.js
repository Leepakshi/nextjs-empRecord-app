"use client";

import { useParams, redirect } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getUserDetails,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import Loader from "@/app/components/Loader";

const EmployeeDetail = () => {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserDetails(id);
      setUser(data);
    }
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    await updateUser(id, user);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      redirect("/employees");
    }
  };

  if (!user) return <Loader />;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Employee Details
      </h1>

      {editing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            placeholder="Role"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-2 text-gray-700 text-lg mb-4">
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user.role}
          </p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setEditing(!editing)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
