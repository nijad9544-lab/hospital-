import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentHospital } from "@/lib/auth";
import { HospitalRegisterForm } from "@/components/forms/HospitalRegisterForm";

export const metadata: Metadata = {
  title: "Partner with CARELET | Hospital Sign Up",
  robots: { index: false },
};

export default async function PartnerRegisterPage() {
  const hospital = await getCurrentHospital();
  if (hospital) redirect("/partners/hospital/dashboard");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-darktext">Partner with CARELET</h1>
      <p className="mt-2 text-sm text-muted">
        Register your hospital to receive qualified international patient leads and
        submit treatment quotes directly through the CARELET marketplace.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <HospitalRegisterForm />
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        Already a partner?{" "}
        <Link href="/partners/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
