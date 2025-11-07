"use client";

import { useRouter } from "next/navigation";
import { logout } from "./actions";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="cursor-pointer text-left text-blue-600">
      Logout
    </button>
  );
}
