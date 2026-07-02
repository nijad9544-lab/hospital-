"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  endpoint,
  confirmMessage,
}: {
  endpoint: string;
  confirmMessage: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm(confirmMessage)) return;

    setLoading(true);
    setError(null);

    const res = await fetch(endpoint, { method: "DELETE" });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error?.formErrors?.[0] || "Could not delete. Please try again.");
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="flex items-center gap-1 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
      >
        <Trash2 size={14} /> {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="max-w-[200px] text-right text-xs text-red-600">{error}</p>}
    </div>
  );
}
