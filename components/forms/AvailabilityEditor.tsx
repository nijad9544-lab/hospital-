"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface Slot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export function AvailabilityEditor({ initialSlots }: { initialSlots: Slot[] }) {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [saving, setSaving] = useState(false);

  function addSlot() {
    setSlots((prev) => [...prev, { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }]);
  }

  function updateSlot(index: number, field: keyof Slot, value: string | number) {
    setSlots((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot))
    );
  }

  function removeSlot(index: number) {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setStatus("idle");
    const res = await fetch("/api/doctor/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slots }),
    });
    setStatus(res.ok ? "success" : "error");
    setSaving(false);
  }

  return (
    <div className="space-y-3">
      {status === "success" && (
        <div className="rounded-btn bg-secondary/10 px-4 py-3 text-sm text-darktext">
          Availability saved.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">
          Could not save availability. Please try again.
        </div>
      )}

      {slots.map((slot, i) => (
        <div key={i} className="flex items-center gap-2">
          <select
            value={slot.dayOfWeek}
            onChange={(e) => updateSlot(i, "dayOfWeek", Number(e.target.value))}
            className="rounded-btn border border-muted/20 px-3 py-2 text-sm outline-none focus:border-primary"
          >
            {DAYS.map((day, idx) => (
              <option key={day} value={idx}>{day}</option>
            ))}
          </select>
          <input
            type="time"
            value={slot.startTime}
            onChange={(e) => updateSlot(i, "startTime", e.target.value)}
            className="rounded-btn border border-muted/20 px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <span className="text-muted">to</span>
          <input
            type="time"
            value={slot.endTime}
            onChange={(e) => updateSlot(i, "endTime", e.target.value)}
            className="rounded-btn border border-muted/20 px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button type="button" onClick={() => removeSlot(i)} className="text-muted hover:text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSlot}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <Plus size={14} /> Add availability slot
      </button>

      <div>
        <Button onClick={handleSave} disabled={saving} size="sm">
          {saving ? "Saving..." : "Save Availability"}
        </Button>
      </div>
    </div>
  );
}
