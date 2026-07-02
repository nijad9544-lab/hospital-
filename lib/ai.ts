import OpenAI from "openai";
import { prisma, SAFE_HOSPITAL_SELECT } from "@/lib/db";

export interface ConciergeAnalysis {
  extractedInfo: string;
  treatmentSummary: string;
  estimatedCostRange: string;
  recommendedTreatmentCategory: string;
  source: "openai" | "stub";
}

interface AnalyzeInput {
  treatment: string;
  message: string | null;
  reportFileNames: string[];
}

export async function analyzeMedicalCase(input: AnalyzeInput): Promise<ConciergeAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    return analyzeWithOpenAI(apiKey, input);
  }

  return stubAnalysis(input);
}

async function analyzeWithOpenAI(apiKey: string, input: AnalyzeInput): Promise<ConciergeAnalysis> {
  const client = new OpenAI({ apiKey });

  const prompt = `You are a medical tourism concierge for CARELET, a marketplace connecting
international patients with hospitals in Kerala, India. A patient has requested an
estimate for the following:

Treatment requested: ${input.treatment}
Patient notes: ${input.message || "(none provided)"}
Uploaded report file names: ${input.reportFileNames.join(", ") || "(none uploaded)"}

Respond with a JSON object with exactly these keys:
- extractedInfo: a short summary of what can be inferred about the patient's condition from the notes (1-2 sentences, and explicitly note that no clinical diagnosis is being made)
- treatmentSummary: a plain-language summary of what this treatment generally involves (2-3 sentences)
- estimatedCostRange: a rough INR cost range for this treatment in Kerala (e.g. "₹3,00,000 - ₹5,50,000"), clearly labeled as an estimate pending hospital review
- recommendedTreatmentCategory: a single category word matching one of: Cardiology, Orthopaedics, Dental, Oncology, Fertility, Ayurveda, Ophthalmology, Nephrology, Neurology, General`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content || "{}";
  const parsed = JSON.parse(raw);

  return {
    extractedInfo: parsed.extractedInfo || "Unable to extract details from the provided notes.",
    treatmentSummary: parsed.treatmentSummary || "",
    estimatedCostRange: parsed.estimatedCostRange || "Not available",
    recommendedTreatmentCategory: parsed.recommendedTreatmentCategory || "General",
    source: "openai",
  };
}

function stubAnalysis(input: AnalyzeInput): ConciergeAnalysis {
  const category = guessCategory(input.treatment);

  return {
    extractedInfo: input.message
      ? `Based on your notes, our care team will review: "${input.message.slice(0, 140)}". This is not a clinical diagnosis — a hospital specialist will confirm details after reviewing your reports.`
      : "No additional notes were provided. Our care team will review your uploaded reports directly.",
    treatmentSummary: `${input.treatment} is a commonly requested procedure among CARELET's international patients. Once a hospital reviews your case, they will share a detailed treatment plan tailored to your condition.`,
    estimatedCostRange: "₹1,50,000 - ₹6,00,000 (varies significantly by hospital and case complexity — pending hospital review)",
    recommendedTreatmentCategory: category,
    source: "stub",
  };
}

function guessCategory(treatment: string): string {
  const t = treatment.toLowerCase();
  if (/cardiac|heart|bypass/.test(t)) return "Cardiology";
  if (/knee|hip|spine|ortho|joint/.test(t)) return "Orthopaedics";
  if (/dental|tooth|teeth|implant/.test(t)) return "Dental";
  if (/cancer|tumor|oncology/.test(t)) return "Oncology";
  if (/ivf|fertility/.test(t)) return "Fertility";
  if (/panchakarma|ayurveda|wellness/.test(t)) return "Ayurveda";
  if (/eye|cataract|ophthal/.test(t)) return "Ophthalmology";
  if (/kidney|nephro|dialysis/.test(t)) return "Nephrology";
  if (/neuro|brain|spine surgery/.test(t)) return "Neurology";
  return "General";
}

export async function recommendHospitals(category: string) {
  return prisma.hospital.findMany({
    where: {
      status: "approved",
      specialities: { contains: category },
    },
    take: 5,
    orderBy: { rating: "desc" },
    select: SAFE_HOSPITAL_SELECT,
  });
}
