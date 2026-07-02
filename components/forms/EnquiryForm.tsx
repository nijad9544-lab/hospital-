"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, EnquiryInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "+91XXXXXXXXXX";

interface EnquiryFormProps {
  packageId?: string;
  hospitalId?: string;
  defaultTreatment?: string;
  title?: string;
}

export function EnquiryForm({
  packageId,
  hospitalId,
  defaultTreatment = "",
  title = "Send an Enquiry",
}: EnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { treatment: defaultTreatment, packageId, hospitalId },
  });

  async function onSubmit(data: EnquiryInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const waText = encodeURIComponent("I am interested in medical tourism Kerala");

  return (
    <div className="rounded-card bg-white p-6 shadow-soft">
      <h3 className="mb-4 text-lg font-semibold text-darktext">{title}</h3>

      {status === "success" && (
        <div className="mb-4 rounded-btn bg-primary/10 px-4 py-3 text-sm text-primary">
          Thank you! Our team will contact you within 24 hours.
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">
          Something went wrong. Please try again or use WhatsApp below.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
          {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
        </div>
        <div>
          <input
            {...register("treatment")}
            placeholder="Treatment of interest"
            className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          {errors.treatment && (
            <p className="mt-1 text-xs text-red-600">{errors.treatment.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...register("message")}
            placeholder="Message (optional)"
            rows={3}
            className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Sending..." : "Send Enquiry"}
        </Button>
      </form>

      <a
        href={`https://wa.me/${WA_NUMBER.replace(/[^0-9]/g, "")}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-pill border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/5"
      >
        Chat on WhatsApp instead
      </a>
    </div>
  );
}
