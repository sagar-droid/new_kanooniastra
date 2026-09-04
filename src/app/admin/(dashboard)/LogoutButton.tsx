"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
