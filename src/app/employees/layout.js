"use client";
import Link from "next/link";
import { pathname, usePathname } from "next/navigation";

export default function EmployeesLayout({ children }) {
  const pathname = usePathname();
  const isNewPage = pathname === "/employees/new";
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
        {!isNewPage && (
          <Link
            href="/employees/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition"
          >
            + Create Employee
          </Link>
        )}
      </div>
      <div className="bg-white rounded-xl shadow p-4">{children}</div>
    </div>
  );
}
