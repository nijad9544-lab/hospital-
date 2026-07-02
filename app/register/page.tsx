import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentPatient } from "@/lib/auth";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Create Your Account | CARELET",
  robots: { index: false },
};

export default async function RegisterPage() {
  const patient = await getCurrentPatient();
  if (patient) redirect("/dashboard");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-darktext">Create your patient account</h1>
      <p className="mt-2 text-sm text-muted">
        Register to upload medical reports and request treatment quotes from multiple
        Kerala hospitals.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <RegisterForm />
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
