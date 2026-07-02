"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorCreateSchema, DoctorCreateFormInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function DoctorAddForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorCreateFormInput>({ resolver: zodResolver(doctorCreateSchema) });

  async function onSubmit(data: DoctorCreateFormInput) {
    setError(null);
    const res = await fetch("/api/hospital/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error?.formErrors?.[0] || "Could not add doctor. Please try again.");
      return;
    }

    reset();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-card bg-white p-5 shadow-soft">
      <h3 className="text-sm font-semibold text-darktext">Add a Doctor</h3>
      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-2">
        <select
          {...register("title")}
          className="rounded-btn border border-muted/20 px-3 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="Dr.">Dr.</option>
        </select>
        <input
          {...register("name")}
          placeholder="Full name"
          className="rounded-btn border border-muted/20 px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}

      <input
        {...register("email")}
        placeholder="Doctor's email"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}

      <input
        {...register("password")}
        type="password"
        placeholder="Temporary password"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}

      <input
        {...register("speciality")}
        placeholder="Speciality (e.g. Cardiology)"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      {errors.speciality && <p className="text-xs text-red-600">{errors.speciality.message}</p>}

      <input
        {...register("qualification")}
        placeholder="Qualification (e.g. MD, DM Cardiology)"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      {errors.qualification && (
        <p className="text-xs text-red-600">{errors.qualification.message}</p>
      )}

      <input
        {...register("experience")}
        type="number"
        placeholder="Years of experience"
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      {errors.experience && <p className="text-xs text-red-600">{errors.experience.message}</p>}

      <textarea
        {...register("bio")}
        placeholder="Short bio"
        rows={3}
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      {errors.bio && <p className="text-xs text-red-600">{errors.bio.message}</p>}

      <Button type="submit" disabled={isSubmitting} size="sm">
        {isSubmitting ? "Adding..." : "Add Doctor"}
      </Button>
      <p className="text-xs text-muted">
        New doctors are reviewed by our team before appearing publicly.
      </p>
    </form>
  );
}
