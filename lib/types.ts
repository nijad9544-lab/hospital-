export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export const asStringArray = (value: string): string[] => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
};

export const asItinerary = (value: string): ItineraryDay[] => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as ItineraryDay[]) : [];
  } catch {
    return [];
  }
};

export const asFaqs = (value: string): FAQ[] => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as FAQ[]) : [];
  } catch {
    return [];
  }
};

export function slugify(text: string) {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}
