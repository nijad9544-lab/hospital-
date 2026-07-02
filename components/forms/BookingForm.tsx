import { EnquiryForm } from "@/components/forms/EnquiryForm";

export function BookingForm({
  packageId,
  hospitalId,
  defaultTreatment,
}: {
  packageId?: string;
  hospitalId?: string;
  defaultTreatment?: string;
}) {
  return (
    <EnquiryForm
      title="Book This Package"
      packageId={packageId}
      hospitalId={hospitalId}
      defaultTreatment={defaultTreatment}
    />
  );
}
