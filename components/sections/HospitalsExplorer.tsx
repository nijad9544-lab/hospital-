"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FilterBar } from "@/components/ui/FilterBar";
import { HospitalCard } from "@/components/sections/HospitalCard";
import { asStringArray } from "@/lib/types";

interface HospitalData {
  id: string;
  slug: string;
  name: string;
  city: string;
  accreditation: string;
  specialities: string;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  featured: boolean;
}

type SortKey = "featured" | "rating" | "az";

export function HospitalsExplorer({ hospitals }: { hospitals: HospitalData[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selected, setSelected] = useState<Record<string, string[]>>({
    city: [],
    accreditation: [],
    speciality: [],
  });

  const cities = useMemo(() => Array.from(new Set(hospitals.map((h) => h.city))), [hospitals]);
  const accreditations = useMemo(
    () => Array.from(new Set(hospitals.flatMap((h) => asStringArray(h.accreditation)))),
    [hospitals]
  );
  const specialities = useMemo(
    () => Array.from(new Set(hospitals.flatMap((h) => asStringArray(h.specialities)))),
    [hospitals]
  );

  function toggle(key: string, value: string) {
    setSelected((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  }

  const filtered = useMemo(() => {
    let result = hospitals.filter((h) => {
      const matchesQuery =
        !query ||
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        asStringArray(h.specialities).some((s) => s.toLowerCase().includes(query.toLowerCase()));

      const matchesCity = selected.city.length === 0 || selected.city.includes(h.city);
      const matchesAccreditation =
        selected.accreditation.length === 0 ||
        asStringArray(h.accreditation).some((a) => selected.accreditation.includes(a));
      const matchesSpeciality =
        selected.speciality.length === 0 ||
        asStringArray(h.specialities).some((s) => selected.speciality.includes(s));

      return matchesQuery && matchesCity && matchesAccreditation && matchesSpeciality;
    });

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sort === "az") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [hospitals, query, selected, sort]);

  return (
    <div className="mt-8 flex flex-col gap-6 lg:flex-row">
      <FilterBar
        groups={[
          { title: "City", key: "city", options: cities.map((c) => ({ label: c, value: c })) },
          {
            title: "Accreditation",
            key: "accreditation",
            options: accreditations.map((a) => ({ label: a, value: a })),
          },
          {
            title: "Speciality",
            key: "speciality",
            options: specialities.map((s) => ({ label: s, value: s })),
          },
        ]}
        selected={selected}
        onChange={toggle}
      />

      <div className="flex-1">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-btn bg-white px-4 py-2.5 shadow-soft">
            <Search size={18} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or speciality"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-btn border border-muted/20 bg-white px-4 py-2.5 text-sm outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="rating">Sort: Rating</option>
            <option value="az">Sort: A-Z</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted">No hospitals match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
