"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminHospitalCreateSchema, AdminHospitalCreateInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function AdminHospitalCreateForm({
  hospitalId,
  defaultValues,
}: {
  hospitalId?: string;
  defaultValues?: AdminHospitalCreateInput;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(hospitalId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminHospitalCreateInput>({
    resolver: zodResolver(adminHospitalCreateSchema),
    defaultValues,
  });

  async function onSubmit(data: AdminHospitalCreateInput) {
    setError(null);
    const res = await fetch(
      isEdit ? `/api/admin/hospitals/${hospitalId}` : "/api/admin/hospitals",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const body = await res.json();
      setError(
        body.error?.formErrors?.[0] ||
          `Could not ${isEdit ? "update" : "create"} hospital. Please try again.`
      );
      return;
    }

    router.push("/admin/hospitals");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {error && (
        <div className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div>
        <input
          {...register("name")}
          placeholder="Hospital name"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <input
          {...register("email")}
          placeholder="Contact email"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            {...register("city")}
            placeholder="City"
            className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
        </div>
        <div>
          <input
            {...register("phone")}
            placeholder="Phone"
            className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <input
          {...register("address")}
          placeholder="Full address"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
      </div>
      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          rows={3}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("website")}
          placeholder="Website (optional)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <input
          {...register("accreditation")}
          placeholder="Accreditation, comma-separated (e.g. NABH, JCI)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <input
          {...register("specialities")}
          placeholder="Specialities, comma-separated (e.g. Cardiology, Orthopaedics)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <input
          {...register("imageUrl")}
          placeholder="Image URL (optional, e.g. /images/hospitals/example.jpg)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-darktext">
        <input type="checkbox" {...register("featured")} className="h-4 w-4 accent-primary" />
        Feature this hospital on the homepage
      </label>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Hospital"}
      </Button>
      <p className="text-center text-xs text-muted">
        Hospitals added or edited here are approved and visible immediately.
      </p>
    </form>
  );
}
