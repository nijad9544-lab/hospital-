import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentHospital } from "@/lib/auth";
import { HospitalProfileForm } from "@/components/forms/HospitalProfileForm";

export const metadata: Metadata = {
  title: "Edit Hospital Profile | CARELET",
  robots: { index: false },
};

export default async function HospitalProfilePage() {
  const hospital = await getCurrentHospital();
  if (!hospital) redirect("/partners/login");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Edit Hospital Profile</h1>
      <p className="mt-2 text-sm text-muted">
        Keep your hospital details up to date for international patients.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <HospitalProfileForm
          defaultValues={{
            description: hospital.description,
            address: hospital.address,
            phone: hospital.phone,
            website: hospital.website || "",
          }}
        />
      </div>
    </div>
  );
}
