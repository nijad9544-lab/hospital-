"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hospitalProfileSchema, HospitalProfileInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function HospitalProfileForm({
  defaultValues,
}: {
  defaultValues: HospitalProfileInput;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HospitalProfileInput>({
    resolver: zodResolver(hospitalProfileSchema),
    defaultValues,
  });

  async function onSubmit(data: HospitalProfileInput) {
    setStatus("idle");
    const res = await fetch("/api/hospital/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {status === "success" && (
        <div className="rounded-btn bg-secondary/10 px-4 py-3 text-sm text-darktext">
          Profile updated.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">
          Could not update profile. Please try again.
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">Address</label>
        <input
          {...register("address")}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">Phone</label>
        <input
          {...register("phone")}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">Website (optional)</label>
        <input
          {...register("website")}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
