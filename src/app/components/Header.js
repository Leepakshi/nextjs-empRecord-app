"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const username = session?.user?.name || "Guest";

  return (
    <header
      style={{
        backgroundColor: "#1f2937",
        color: "white",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left: Logo */}
      <Link href="/" style={{ textDecoration: "none", color: "white" }}>
        <h2 style={{ margin: 0 }}>My App</h2>
      </Link>

      {/* Center: Navigation */}
      <nav
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Link
          href="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>
        <Link
          href="/employees"
          style={{ color: "white", textDecoration: "none" }}
        >
          Employees
        </Link>
        <Link
          href="/profile"
          style={{ color: "white", textDecoration: "none" }}
        >
          Profile
        </Link>
      </nav>

      {/* Right: User Info and Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span>{username}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
