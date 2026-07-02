"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ApprovalActions({ endpoint }: { endpoint: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approved" | "rejected" | null>(null);

  async function setStatus(status: "approved" | "rejected") {
    setLoading(status);
    await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setStatus("approved")}
        disabled={loading !== null}
        className="rounded-pill bg-secondary px-4 py-1.5 text-xs font-medium text-darktext hover:opacity-90 disabled:opacity-50"
      >
        {loading === "approved" ? "Approving..." : "Approve"}
      </button>
      <button
        onClick={() => setStatus("rejected")}
        disabled={loading !== null}
        className="rounded-pill border border-red-300 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {loading === "rejected" ? "Rejecting..." : "Reject"}
      </button>
    </div>
  );
}
