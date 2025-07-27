"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/userService";
import toast from "react-hot-toast";

export default function NewEmployee() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(formData); // 🚀 toast handled by interceptor
      toast.success("✅ Manually added success toast");
      router.push("/employees");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create New User
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
