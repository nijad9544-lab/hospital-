"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CITIES = ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Munnar"];

export function SearchBar() {
  const router = useRouter();
  const [treatment, setTreatment] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (treatment) params.set("q", treatment);
    if (city) params.set("city", city);
    router.push(`/treatments?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col gap-3 rounded-card bg-white p-3 shadow-soft sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <Search size={18} className="text-muted" />
        <input
          type="text"
          placeholder="Search treatment (e.g. Knee Replacement)"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="w-full bg-transparent py-2 text-sm text-darktext outline-none placeholder:text-muted"
        />
      </div>
      <div className="h-px w-full bg-offwhite sm:h-8 sm:w-px" />
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded-btn bg-offwhite px-3 py-2 text-sm text-darktext outline-none sm:bg-transparent"
      >
        <option value="">All Cities</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-pill bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
      >
        Search
      </button>
    </form>
  );
}
