"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    setError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error?.formErrors?.[0] || "Something went wrong. Please try again.");
      return;
    }

    router.push("/dashboard");
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
          placeholder="Full name"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
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
          placeholder="Password (min 8 characters)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("phone")}
          placeholder="Phone (with country code)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <div>
        <input
          {...register("country")}
          placeholder="Country"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.country && (
          <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
