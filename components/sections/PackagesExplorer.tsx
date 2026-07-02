"use client";

import { useMemo, useState } from "react";
import { PackageCard } from "@/components/sections/PackageCard";

interface PackageData {
  id: string;
  slug: string;
  name: string;
  category: string;
  duration: string;
  city: string;
  price: number;
  imageUrl: string | null;
}

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Medical", value: "medical" },
  { label: "Ayurveda", value: "ayurveda" },
  { label: "Combo", value: "combo" },
  { label: "Stay", value: "stay" },
];

export function PackagesExplorer({ packages }: { packages: PackageData[] }) {
  const [category, setCategory] = useState("");

  const filtered = useMemo(
    () => (category ? packages.filter((p) => p.category === category) : packages),
    [packages, category]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`rounded-pill px-5 py-2 text-sm font-medium ${
              category === c.value
                ? "bg-primary text-white"
                : "bg-white text-darktext shadow-soft"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
