"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import { formatPrice } from "@/lib/currency";

export function Price({ amountInINR, className = "" }: { amountInINR: number; className?: string }) {
  const { currency } = useCurrency();
  return <span className={className}>{formatPrice(amountInINR, currency)}</span>;
}
