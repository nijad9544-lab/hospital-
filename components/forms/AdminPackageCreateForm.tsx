"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ItineraryDayEditor } from "@/components/forms/ItineraryDayEditor";

interface HospitalOption {
  id: string;
  name: string;
  city: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface PackageInitialValues {
  name: string;
  category: string;
  description: string;
  duration: string;
  city: string;
  price: number;
  currency: string;
  inclusions: string;
  tags: string;
  hospitalId: string;
  imageUrl: string;
  featured: boolean;
  popular: boolean;
  itinerary: ItineraryDay[];
}

export function AdminPackageCreateForm({
  hospitals,
  packageId,
  initialValues,
}: {
  hospitals: HospitalOption[];
  packageId?: string;
  initialValues?: PackageInitialValues;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isEdit = Boolean(packageId);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    initialValues?.itinerary || [{ day: 1, title: "", description: "" }]
  );

  const [form, setForm] = useState({
    name: initialValues?.name || "",
    category: initialValues?.category || "medical",
    description: initialValues?.description || "",
    duration: initialValues?.duration || "",
    city: initialValues?.city || "",
    price: initialValues ? String(initialValues.price) : "",
    currency: initialValues?.currency || "INR",
    inclusions: initialValues?.inclusions || "",
    tags: initialValues?.tags || "",
    hospitalId: initialValues?.hospitalId || "",
    imageUrl: initialValues?.imageUrl || "",
    featured: initialValues?.featured || false,
    popular: initialValues?.popular || false,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (itinerary.some((d) => !d.title || !d.description)) {
      setError("Every itinerary day needs a title and description.");
      return;
    }

    setSubmitting(true);

    const res = await fetch(
      isEdit ? `/api/admin/packages/${packageId}` : "/api/admin/packages",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          hospitalId: form.hospitalId || undefined,
          imageUrl: form.imageUrl || undefined,
          itinerary,
        }),
      }
    );

    if (!res.ok) {
      const body = await res.json();
      setError(
        body.error?.formErrors?.[0] ||
          `Could not ${isEdit ? "update" : "create"} package. Please check the fields and try again.`
      );
      setSubmitting(false);
      return;
    }

    router.push("/admin/packages");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <input
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Package name"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className="rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="medical">Medical</option>
          <option value="ayurveda">Ayurveda</option>
          <option value="combo">Combo</option>
          <option value="stay">Stay</option>
        </select>
        <select
          value={form.hospitalId}
          onChange={(e) => update("hospitalId", e.target.value)}
          className="rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="">No hospital (e.g. stay/Ayurveda)</option>
          {hospitals.map((h) => (
            <option key={h.id} value={h.id}>{h.name} &mdash; {h.city}</option>
          ))}
        </select>
      </div>

      <textarea
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        placeholder="Description"
        rows={3}
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          value={form.duration}
          onChange={(e) => update("duration", e.target.value)}
          placeholder="Duration (e.g. 10-14 days)"
          className="rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <input
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
          placeholder="City"
          className="rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
          placeholder="Price"
          className="rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <select
          value={form.currency}
          onChange={(e) => update("currency", e.target.value)}
          className="rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="AED">AED</option>
        </select>
      </div>

      <input
        value={form.inclusions}
        onChange={(e) => update("inclusions", e.target.value)}
        placeholder="Inclusions, comma-separated"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      <input
        value={form.tags}
        onChange={(e) => update("tags", e.target.value)}
        placeholder="Tags, comma-separated (optional)"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      <input
        value={form.imageUrl}
        onChange={(e) => update("imageUrl", e.target.value)}
        placeholder="Image URL (optional, e.g. /images/packages/example.jpg)"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />

      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-darktext">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-darktext">
          <input
            type="checkbox"
            checked={form.popular}
            onChange={(e) => update("popular", e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Popular
        </label>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-darktext">Day-by-Day Itinerary</label>
        <ItineraryDayEditor days={itinerary} onChange={setItinerary} />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Package"}
      </Button>
    </form>
  );
}
