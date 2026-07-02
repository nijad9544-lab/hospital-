"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={faq.q} className="rounded-card bg-white shadow-soft">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-medium text-darktext">{faq.q}</span>
            <ChevronDown
              size={18}
              className={`text-muted transition-transform ${openIndex === i ? "rotate-180" : ""}`}
            />
          </button>
          {openIndex === i && <p className="px-5 pb-4 text-sm text-muted">{faq.a}</p>}
        </div>
      ))}
    </div>
  );
}
