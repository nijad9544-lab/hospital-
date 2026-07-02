import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  country: z.string().min(2, "Country is required"),
  treatment: z.string().min(2, "Please select or enter a treatment"),
  message: z.string().optional(),
  packageId: z.string().optional(),
  hospitalId: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(6, "Enter a valid phone number"),
  country: z.string().min(2, "Country is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const quoteRequestSchema = z.object({
  treatment: z.string().min(2, "Please describe the treatment you need"),
  message: z.string().optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const adminQuoteSchema = z.object({
  hospitalId: z.string().min(1, "Select a hospital"),
  price: z.coerce.number().int().positive("Enter a valid price"),
  currency: z.string().min(1).default("INR"),
  notes: z.string().optional(),
});

export type AdminQuoteInput = z.infer<typeof adminQuoteSchema>;

export const hospitalSignupSchema = z.object({
  name: z.string().min(2, "Hospital name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  city: z.string().min(2, "City is required"),
  phone: z.string().min(6, "Enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  description: z.string().min(20, "Please describe your hospital (min 20 characters)"),
});

export type HospitalSignupInput = z.infer<typeof hospitalSignupSchema>;

export const partnerLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type PartnerLoginInput = z.infer<typeof partnerLoginSchema>;

export const hospitalProfileSchema = z.object({
  description: z.string().min(20, "Description is too short"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(6, "Enter a valid phone number"),
  website: z.string().optional(),
});

export type HospitalProfileInput = z.infer<typeof hospitalProfileSchema>;

export const doctorCreateSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Temporary password must be at least 8 characters"),
  title: z.string().min(1, "Title is required"),
  speciality: z.string().min(2, "Speciality is required"),
  qualification: z.string().min(2, "Qualification is required"),
  experience: z.coerce.number().int().min(0, "Enter valid years of experience"),
  bio: z.string().min(20, "Bio is too short"),
});

export type DoctorCreateInput = z.infer<typeof doctorCreateSchema>;
export type DoctorCreateFormInput = z.input<typeof doctorCreateSchema>;

export const doctorProfileSchema = z.object({
  bio: z.string().min(20, "Bio is too short"),
  qualification: z.string().min(2, "Qualification is required"),
  experience: z.coerce.number().int().min(0, "Enter valid years of experience"),
});

export type DoctorProfileInput = z.infer<typeof doctorProfileSchema>;
export type DoctorProfileFormInput = z.input<typeof doctorProfileSchema>;

export const availabilitySchema = z.object({
  slots: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      startTime: z.string().min(1),
      endTime: z.string().min(1),
    })
  ),
});

export type AvailabilityInput = z.infer<typeof availabilitySchema>;

export const reviewSubmitSchema = z.object({
  name: z.string().min(2, "Name is required"),
  country: z.string().optional(),
  treatment: z.string().optional(),
  rating: z.coerce.number().int().min(1, "Select a rating").max(5, "Select a rating"),
  quote: z.string().min(20, "Please share a bit more detail (min 20 characters)"),
});

export type ReviewSubmitInput = z.infer<typeof reviewSubmitSchema>;
export type ReviewSubmitFormInput = z.input<typeof reviewSubmitSchema>;

export const adminHospitalCreateSchema = z.object({
  name: z.string().min(2, "Hospital name is required"),
  email: z.string().email("Enter a valid email"),
  city: z.string().min(2, "City is required"),
  phone: z.string().min(6, "Enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  description: z.string().min(20, "Please describe the hospital (min 20 characters)"),
  website: z.string().optional(),
  accreditation: z.string().optional(), // comma-separated, parsed in the API route
  specialities: z.string().optional(), // comma-separated, parsed in the API route
  imageUrl: z.string().optional(),
  featured: z.boolean().optional(),
});

export type AdminHospitalCreateInput = z.infer<typeof adminHospitalCreateSchema>;

export const adminPackageCreateSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  category: z.enum(["medical", "ayurveda", "combo", "stay"]),
  description: z.string().min(20, "Description is too short"),
  duration: z.string().min(1, "Duration is required"),
  city: z.string().min(2, "City is required"),
  price: z.coerce.number().int().positive("Enter a valid price"),
  currency: z.string().min(1).default("INR"),
  inclusions: z.string().min(1, "List at least one inclusion"), // comma-separated
  tags: z.string().optional(), // comma-separated
  hospitalId: z.string().optional(),
  featured: z.boolean().optional(),
  popular: z.boolean().optional(),
  imageUrl: z.string().optional(),
  itinerary: z
    .array(
      z.object({
        day: z.number().int().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .min(1, "Add at least one itinerary day"),
});

export type AdminPackageCreateInput = z.infer<typeof adminPackageCreateSchema>;
export type AdminPackageCreateFormInput = z.input<typeof adminPackageCreateSchema>;
