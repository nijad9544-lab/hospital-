import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentHospital, getCurrentDoctor } from "@/lib/auth";
import { PartnerLoginForm } from "@/components/forms/PartnerLoginForm";

export const metadata: Metadata = {
  title: "Partner Sign In | CARELET",
  robots: { index: false },
};

export default async function PartnerLoginPage() {
  const [hospital, doctor] = await Promise.all([getCurrentHospital(), getCurrentDoctor()]);
  if (hospital) redirect("/partners/hospital/dashboard");
  if (doctor) redirect("/partners/doctor/dashboard");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-darktext">Partner Sign In</h1>
      <p className="mt-2 text-sm text-muted">
        Sign in to your hospital or doctor dashboard.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <PartnerLoginForm />
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        New hospital partner?{" "}
        <Link href="/partners/register" className="font-medium text-primary hover:underline">
          Apply here
        </Link>
      </p>
    </div>
  );
}
