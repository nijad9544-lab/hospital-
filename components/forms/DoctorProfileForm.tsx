"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorProfileSchema, DoctorProfileFormInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function DoctorProfileForm({ defaultValues }: { defaultValues: DoctorProfileFormInput }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorProfileFormInput>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues,
  });

  async function onSubmit(data: DoctorProfileFormInput) {
    setStatus("idle");
    const res = await fetch("/api/doctor/profile", {
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
        <label className="mb-1 block text-sm font-medium text-darktext">Qualification</label>
        <input
          {...register("qualification")}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.qualification && (
          <p className="mt-1 text-xs text-red-600">{errors.qualification.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">Years of Experience</label>
        <input
          {...register("experience")}
          type="number"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.experience && (
          <p className="mt-1 text-xs text-red-600">{errors.experience.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">Bio</label>
        <textarea
          {...register("bio")}
          rows={4}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.bio && <p className="mt-1 text-xs text-red-600">{errors.bio.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
