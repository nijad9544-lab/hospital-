import { FAQ } from "@/lib/types";

export function getHospitalFaqs(hospital: {
  name: string;
  city: string;
  accreditation: string[];
}): FAQ[] {
  const accreditationText = hospital.accreditation.length > 0
    ? hospital.accreditation.join(" and ")
    : "nationally recognised";

  return [
    {
      q: `Is ${hospital.name} accredited for international patients?`,
      a: `${hospital.name} holds ${accreditationText} accreditation, meeting the same quality and safety standards expected by international patients.`,
    },
    {
      q: `How do I book a consultation at ${hospital.name}?`,
      a: `You can request a free quote or consultation through this page. A care coordinator will confirm your appointment and help arrange travel logistics to ${hospital.city}.`,
    },
    {
      q: `Does ${hospital.name} provide support for international patients?`,
      a: `Yes, the hospital's international patient desk assists with multilingual coordination, airport transfers, visa documentation, and accommodation for visiting patients and attendants.`,
    },
    {
      q: `What languages are spoken at ${hospital.name}?`,
      a: `Doctors and coordinators at ${hospital.name} typically communicate in English, with interpreter support available for Arabic and other languages depending on patient needs.`,
    },
  ];
}

export function getPackageFaqs(pkg: {
  name: string;
  duration: string;
  city: string;
}): FAQ[] {
  return [
    {
      q: `What is included in the ${pkg.name} package?`,
      a: `The package covers the core treatment or therapy, hospital or facility stay, and coordination support for the full ${pkg.duration} duration in ${pkg.city}. See the inclusions list on this page for full details.`,
    },
    {
      q: `How long does the ${pkg.name} package take?`,
      a: `This package is designed to run over ${pkg.duration}, including pre-treatment evaluation, the core procedure or therapy, and recovery time before discharge.`,
    },
    {
      q: `Can the price change after booking?`,
      a: `The listed price is an estimate based on standard cases. Your care coordinator will confirm a final price after reviewing your medical reports, as complexity can affect the final cost.`,
    },
    {
      q: `Is travel and accommodation included?`,
      a: `Core accommodation during treatment is included where specified in the inclusions list. International flights and visa fees are not included and are the patient's responsibility.`,
    },
  ];
}

export function getDoctorFaqs(doctor: {
  name: string;
  title: string;
  speciality: string;
  hospitalName: string;
}): FAQ[] {
  return [
    {
      q: `How do I book a consultation with ${doctor.title} ${doctor.name}?`,
      a: `Use the enquiry form on this page to request a consultation. A care coordinator will confirm availability with ${doctor.title} ${doctor.name} at ${doctor.hospitalName}.`,
    },
    {
      q: `What conditions does ${doctor.title} ${doctor.name} treat?`,
      a: `${doctor.title} ${doctor.name} specialises in ${doctor.speciality}, treating both routine and complex cases referred by international patients.`,
    },
    {
      q: `Can I get a remote second opinion before travelling?`,
      a: `Yes, share your medical reports through the quote request system and ${doctor.title} ${doctor.name}'s team can often provide an initial assessment before you commit to travel.`,
    },
  ];
}
