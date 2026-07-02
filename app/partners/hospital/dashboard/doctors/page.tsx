import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentHospital } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApprovalStatusBadge } from "@/components/dashboard/ApprovalStatusBadge";
import { DoctorAddForm } from "@/components/forms/DoctorAddForm";

export const metadata: Metadata = {
  title: "Manage Doctors | CARELET",
  robots: { index: false },
};

export default async function HospitalDoctorsPage() {
  const hospital = await getCurrentHospital();
  if (!hospital) redirect("/partners/login");

  const doctors = await prisma.doctor.findMany({
    where: { hospitalId: hospital.id },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Manage Doctors</h1>
      <p className="mt-2 text-sm text-muted">
        Add doctors to your hospital. New doctors require admin approval before they
        appear on the public site.
      </p>

      <div className="mt-6 space-y-3">
        {doctors.length === 0 && (
          <p className="text-sm text-muted">No doctors added yet.</p>
        )}
        {doctors.map((d) => (
          <div key={d.id} className="flex items-center justify-between rounded-card bg-white p-4 shadow-soft">
            <div>
              <p className="font-medium text-darktext">{d.title} {d.name}</p>
              <p className="text-sm text-muted">{d.speciality} &middot; {d.experience} yrs experience</p>
            </div>
            <ApprovalStatusBadge status={d.status} />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <DoctorAddForm />
      </div>
    </div>
  );
}
