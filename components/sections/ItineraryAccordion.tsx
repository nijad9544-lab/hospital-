"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ItineraryDay } from "@/lib/types";

export function ItineraryAccordion({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number | null>(itinerary[0]?.day ?? null);

  return (
    <div className="space-y-2">
      {itinerary.map((item) => (
        <div key={item.day} className="rounded-card bg-white shadow-soft">
          <button
            onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-medium text-darktext">
              Day {item.day}: {item.title}
            </span>
            <ChevronDown
              size={18}
              className={`text-muted transition-transform ${
                openDay === item.day ? "rotate-180" : ""
              }`}
            />
          </button>
          {openDay === item.day && (
            <p className="px-5 pb-4 text-sm text-muted">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
