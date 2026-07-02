"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function HospitalQuoteForm({ quoteRequestId }: { quoteRequestId: string }) {
  const router = useRouter();
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/hospital/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quoteRequestId, price, currency, notes }),
    });

    if (!res.ok) {
      setError("Could not submit quote. Check the price and try again.");
      setSubmitting(false);
      return;
    }

    setPrice("");
    setNotes("");
    setSubmitting(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 rounded-card bg-offwhite p-4">
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Your quote price"
          type="number"
          className="w-full rounded-btn border border-muted/20 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="rounded-btn border border-muted/20 px-2 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="AED">AED</option>
          <option value="OMR">OMR</option>
          <option value="QAR">QAR</option>
        </select>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (inclusions, duration, etc.)"
        rows={2}
        className="w-full rounded-btn border border-muted/20 px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <Button type="submit" disabled={submitting} size="sm">
        {submitting ? "Submitting..." : "Submit Quote"}
      </Button>
    </form>
  );
}
