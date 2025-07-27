"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import React, { Suspense } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: true, // important!
      callbackUrl: "/dashboard",
      email,
      password,
    });

    if (result?.error) {
      //setError("Invalid credentials");
      toast.error("Invalid credentials");
    } else {
      toast.success("Login successful");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center ">Login</h2>
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}
        <Suspense fallback={<Loader />}>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-500 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-500 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
            >
              Login
            </button>
          </form>
        </Suspense>
        <div className="text-center text-gray-500 py-3">or</div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full border border-gray-400 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-100 transition"
        >
          Sign in with Google
        </button>
        {/* <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded bg-black text-white hover:bg-gray-800 transition"
        >
          Continue with GitHub
        </button> */}
      </div>
    </div>
  );
}
