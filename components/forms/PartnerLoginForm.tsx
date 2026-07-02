"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerLoginSchema, PartnerLoginInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

type Role = "hospital" | "doctor";

export function PartnerLoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("hospital");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerLoginInput>({ resolver: zodResolver(partnerLoginSchema) });

  async function onSubmit(data: PartnerLoginInput) {
    setError(null);
    const endpoint = role === "hospital" ? "/api/hospital-auth/login" : "/api/doctor-auth/login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error?.formErrors?.[0] || "Invalid email or password.");
      return;
    }

    router.push(role === "hospital" ? "/partners/hospital/dashboard" : "/partners/doctor/dashboard");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 flex rounded-pill bg-offwhite p-1">
        <button
          type="button"
          onClick={() => setRole("hospital")}
          className={`flex-1 rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
            role === "hospital" ? "bg-primary text-white" : "text-muted"
          }`}
        >
          Hospital
        </button>
        <button
          type="button"
          onClick={() => setRole("doctor")}
          className={`flex-1 rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
            role === "doctor" ? "bg-primary text-white" : "text-muted"
          }`}
        >
          Doctor
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {error && (
          <div className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div>
          <input
            {...register("email")}
            placeholder="Email address"
            className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Signing in..." : `Sign in as ${role === "hospital" ? "Hospital" : "Doctor"}`}
        </Button>
      </form>
    </div>
  );
}
