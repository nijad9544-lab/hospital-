import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma, SAFE_HOSPITAL_SELECT } from "@/lib/db";
import { asStringArray } from "@/lib/types";
import { AdminHospitalCreateForm } from "@/components/forms/AdminHospitalCreateForm";

export const metadata: Metadata = {
  title: "Edit Hospital | Admin",
  robots: { index: false },
};

export default async function AdminEditHospitalPage({
  params,
}: {
  params: { id: string };
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const hospital = await prisma.hospital.findUnique({
    where: { id: params.id },
    select: SAFE_HOSPITAL_SELECT,
  });

  if (!hospital) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Edit Hospital</h1>
      <p className="mt-1 text-sm text-muted">{hospital.name}</p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <AdminHospitalCreateForm
          hospitalId={hospital.id}
          defaultValues={{
            name: hospital.name,
            email: hospital.email,
            city: hospital.city,
            phone: hospital.phone,
            address: hospital.address,
            description: hospital.description,
            website: hospital.website || "",
            accreditation: asStringArray(hospital.accreditation).join(", "),
            specialities: asStringArray(hospital.specialities).join(", "),
            imageUrl: hospital.imageUrl || "",
            featured: hospital.featured,
          }}
        />
      </div>
    </div>
  );
}
