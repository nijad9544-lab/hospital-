import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentDoctor } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApprovalStatusBadge } from "@/components/dashboard/ApprovalStatusBadge";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { DoctorProfileForm } from "@/components/forms/DoctorProfileForm";
import { AvailabilityEditor } from "@/components/forms/AvailabilityEditor";

export const metadata: Metadata = {
  title: "Doctor Dashboard | CARELET",
  robots: { index: false },
};

export default async function DoctorDashboardPage() {
  const doctor = await getCurrentDoctor();
  if (!doctor) redirect("/partners/login");

  const slots = await prisma.availability.findMany({
    where: { doctorId: doctor.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-darktext">
            {doctor.title} {doctor.name}
          </h1>
          <div className="mt-2">
            <ApprovalStatusBadge status={doctor.status} />
          </div>
        </div>
        <LogoutButton endpoint="/api/doctor-auth/logout" redirectTo="/partners/login" />
      </div>

      {doctor.status === "pending" && (
        <div className="mt-6 rounded-card bg-secondary/10 p-4 text-sm text-darktext">
          Your profile is under review by our team and won&apos;t appear publicly until
          approved.
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold text-darktext">Profile</h2>
      <div className="mt-4 rounded-card bg-white p-6 shadow-soft">
        <DoctorProfileForm
          defaultValues={{
            qualification: doctor.qualification,
            experience: doctor.experience,
            bio: doctor.bio,
          }}
        />
      </div>

      <h2 className="mt-8 text-lg font-semibold text-darktext">Weekly Availability</h2>
      <div className="mt-4 rounded-card bg-white p-6 shadow-soft">
        <AvailabilityEditor
          initialSlots={slots.map((s) => ({
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
          }))}
        />
      </div>
    </div>
  );
}
