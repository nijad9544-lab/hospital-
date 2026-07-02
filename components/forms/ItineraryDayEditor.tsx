"use client";

import { Trash2, Plus } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export function ItineraryDayEditor({
  days,
  onChange,
}: {
  days: ItineraryDay[];
  onChange: (days: ItineraryDay[]) => void;
}) {
  function addDay() {
    const nextDay = days.length > 0 ? Math.max(...days.map((d) => d.day)) + 1 : 1;
    onChange([...days, { day: nextDay, title: "", description: "" }]);
  }

  function updateDay(index: number, field: keyof ItineraryDay, value: string | number) {
    onChange(days.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  }

  function removeDay(index: number) {
    onChange(days.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {days.map((d, i) => (
        <div key={i} className="space-y-2 rounded-btn bg-offwhite p-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={d.day}
              onChange={(e) => updateDay(i, "day", Number(e.target.value))}
              className="w-20 rounded-btn border border-muted/20 px-2 py-2 text-sm outline-none focus:border-primary"
              aria-label="Day number"
            />
            <input
              value={d.title}
              onChange={(e) => updateDay(i, "title", e.target.value)}
              placeholder="Day title"
              className="flex-1 rounded-btn border border-muted/20 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button type="button" onClick={() => removeDay(i)} className="text-muted hover:text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={d.description}
            onChange={(e) => updateDay(i, "description", e.target.value)}
            placeholder="Day description"
            rows={2}
            className="w-full rounded-btn border border-muted/20 px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addDay}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <Plus size={14} /> Add itinerary day
      </button>
    </div>
  );
}
