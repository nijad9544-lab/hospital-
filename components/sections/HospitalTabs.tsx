"use client";

import { useState } from "react";
import Link from "next/link";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { asStringArray } from "@/lib/types";
import { InternationalPatientsTab } from "@/components/sections/InternationalPatientsTab";
import { Price } from "@/components/ui/Price";

interface DoctorSummary {
  slug: string;
  name: string;
  title: string;
  speciality: string;
  experience: number;
}

interface PackageSummary {
  slug: string;
  name: string;
  duration: string;
  price: number;
}

const TABS = ["Overview", "Doctors", "Packages", "International Patients", "Reviews"] as const;

export function HospitalTabs({
  description,
  specialities,
  address,
  doctors,
  packages,
  rating,
  reviewCount,
  phone,
  email,
}: {
  description: string;
  specialities: string;
  address: string;
  doctors: DoctorSummary[];
  packages: PackageSummary[];
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
}) {
  const [active, setActive] = useState<typeof TABS[number]>("Overview");
  const specialityList = asStringArray(specialities);

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-muted/15">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              active === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted hover:text-darktext"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-6">
        {active === "Overview" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-darktext">Overview</h2>
            <p className="text-muted">{description}</p>
            <h3 className="text-base font-semibold text-darktext">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {specialityList.map((s) => (
                <Badge key={s} variant="outline">{s}</Badge>
              ))}
            </div>
            <h3 className="text-base font-semibold text-darktext">Address</h3>
            <p className="text-muted">{address}</p>
            <div className="h-56 w-full rounded-card bg-primary/10 flex items-center justify-center text-sm text-muted">
              Map embed placeholder
            </div>
          </div>
        )}

        {active === "Doctors" && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-darktext">Doctors</h2>
            {doctors.length === 0 && <p className="text-muted">No doctors listed yet.</p>}
            {doctors.map((d) => (
              <Link
                key={d.slug}
                href={`/doctors/${d.slug}`}
                className="flex items-center justify-between rounded-card bg-offwhite p-4 hover:bg-primary/5"
              >
                <div>
                  <p className="font-medium text-darktext">{d.title} {d.name}</p>
                  <p className="text-sm text-muted">{d.speciality} &middot; {d.experience} yrs experience</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {active === "Packages" && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-darktext">Packages</h2>
            {packages.length === 0 && <p className="text-muted">No packages linked yet.</p>}
            {packages.map((p) => (
              <Link
                key={p.slug}
                href={`/packages/${p.slug}`}
                className="flex items-center justify-between rounded-card bg-offwhite p-4 hover:bg-primary/5"
              >
                <div>
                  <p className="font-medium text-darktext">{p.name}</p>
                  <p className="text-sm text-muted">{p.duration}</p>
                </div>
                <Price amountInINR={p.price} className="font-semibold text-primary" />
              </Link>
            ))}
          </div>
        )}

        {active === "International Patients" && (
          <InternationalPatientsTab phone={phone} email={email} />
        )}

        {active === "Reviews" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-darktext">Reviews</h2>
            <StarRating rating={rating} reviewCount={reviewCount} size={20} />
            <p className="text-muted">
              Based on {reviewCount} verified patient reviews collected from international
              patients treated at this hospital.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
