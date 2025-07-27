"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", color: "white" }}>
        <h2 style={{ margin: 0 }}>My App</h2>
      </Link>

      {/* Menu */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
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
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
