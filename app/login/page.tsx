import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentPatient } from "@/lib/auth";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Patient Login | CARELET",
  robots: { index: false },
};

export default async function LoginPage() {
  const patient = await getCurrentPatient();
  if (patient) redirect("/dashboard");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-darktext">Sign in to your account</h1>
      <p className="mt-2 text-sm text-muted">
        Access your treatment quote requests and hospital comparisons.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <LoginForm />
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
