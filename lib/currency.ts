export type CurrencyCode = "INR" | "USD" | "AED";

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "AED", label: "UAE Dirham", symbol: "AED " },
];

// Indicative rates relative to 1 INR. Update before relying on these for real transactions.
const RATES_FROM_INR: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 1 / 83,
  AED: 1 / 22.6,
};

export function convertFromINR(amountInINR: number, currency: CurrencyCode) {
  return amountInINR * RATES_FROM_INR[currency];
}

export function formatPrice(amountInINR: number, currency: CurrencyCode) {
  const converted = convertFromINR(amountInINR, currency);
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "";
  const decimals = currency === "INR" ? 0 : 0;
  return `${symbol}${converted.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  })}`;
}
