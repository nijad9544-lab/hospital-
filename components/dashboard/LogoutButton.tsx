"use client";

import { useRouter } from "next/navigation";

export function LogoutButton({ endpoint = "/api/auth/logout", redirectTo = "/" }: { endpoint?: string; redirectTo?: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch(endpoint, { method: "POST" });
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-muted hover:text-primary"
    >
      Log out
    </button>
  );
}
