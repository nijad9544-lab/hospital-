"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import { CURRENCIES, CurrencyCode } from "@/lib/currency";

export function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      aria-label="Select currency"
      className={`rounded-pill border border-muted/20 bg-transparent px-3 py-1.5 text-sm font-medium text-darktext outline-none ${className}`}
    >
      {CURRENCIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.code}
        </option>
      ))}
    </select>
  );
}
