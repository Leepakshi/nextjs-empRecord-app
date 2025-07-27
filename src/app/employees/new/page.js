// app/employees/new/page.js
"use client";

import { useState } from "react";

export default function NewEmployee() {
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Post to API or store
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </form>
  );
}
