"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSubmitSchema, ReviewSubmitFormInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewSubmitFormInput>({
    resolver: zodResolver(reviewSubmitSchema),
    defaultValues: { rating: 5 },
  });

  async function onSubmit(data: ReviewSubmitFormInput) {
    setStatus("idle");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset({ rating: 5 });
  }

  if (status === "success") {
    return (
      <div className="rounded-card bg-secondary/10 p-6 text-center">
        <p className="font-medium text-darktext">Thank you for sharing your experience!</p>
        <p className="mt-2 text-sm text-muted">
          Your review has been submitted and will appear on the site after a quick review
          by our team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {status === "error" && (
        <div className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">
          Something went wrong. Please try again.
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">Your rating</label>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => field.onChange(n)}
                  aria-label={`${n} star${n === 1 ? "" : "s"}`}
                >
                  <Star
                    size={28}
                    className={Number(field.value) >= n ? "fill-secondary text-secondary" : "fill-none text-muted/40"}
                  />
                </button>
              ))}
            </div>
          )}
        />
        {errors.rating && <p className="mt-1 text-xs text-red-600">{errors.rating.message}</p>}
      </div>

      <div>
        <input
          {...register("name")}
          placeholder="Your name"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <input
          {...register("country")}
          placeholder="Country (optional)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <input
          {...register("treatment")}
          placeholder="Treatment received (optional)"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <textarea
          {...register("quote")}
          placeholder="Tell us about your experience"
          rows={5}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {errors.quote && <p className="mt-1 text-xs text-red-600">{errors.quote.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
