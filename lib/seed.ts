import { PrismaClient, Hospital, Doctor } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.enquiry.deleteMany();
  await prisma.package.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.review.deleteMany();

  // ---------- Hospitals ----------
  const hospitalData = [
    {
      slug: "amrita-institute-kochi",
      name: "Amrita Institute of Medical Sciences",
      city: "Kochi",
      accreditation: ["NABH", "JCI"],
      specialities: ["Cardiology", "Oncology", "Transplant", "Neurology"],
      description:
        "Amrita Institute of Medical Sciences in Kochi is one of Kerala's largest multi-speciality hospitals, offering advanced cardiac care, organ transplants, and cancer treatment with internationally trained physicians.",
      address: "AIMS Ponekkara P.O, Kochi, Kerala 682041",
      phone: "+91-484-2851234",
      email: "international@aims.amrita.edu",
      website: "https://www.amritahospitals.org",
      rating: 4.7,
      reviewCount: 1280,
      imageUrl: "/images/hospitals/amrita-kochi.jpg",
      featured: true,
    },
    {
      slug: "aster-medcity-kochi",
      name: "Aster Medcity",
      city: "Kochi",
      accreditation: ["NABH", "JCI"],
      specialities: ["Cardiac Surgery", "Orthopaedics", "Liver Transplant", "Fertility"],
      description:
        "Aster Medcity is a JCI-accredited quaternary care hospital in Kochi designed specifically for international patients, with dedicated patient lounges and multilingual coordinators.",
      address: "Kuttisahib Road, South Chittoor, Kochi, Kerala 682027",
      phone: "+91-484-6699999",
      email: "international@astermedcity.com",
      website: "https://www.astermedcity.com",
      rating: 4.8,
      reviewCount: 1540,
      imageUrl: "/images/hospitals/aster-medcity.jpg",
      featured: true,
    },
    {
      slug: "kims-trivandrum",
      name: "KIMS Health Trivandrum",
      city: "Thiruvananthapuram",
      accreditation: ["NABH"],
      specialities: ["Orthopaedics", "Dental", "Gastroenterology", "Urology"],
      description:
        "KIMS Health in Thiruvananthapuram is a leading tertiary care hospital known for joint replacement surgery, dental implants, and gastrointestinal care for patients across the Gulf and Africa.",
      address: "Anayara P.O, Thiruvananthapuram, Kerala 695029",
      phone: "+91-471-3041000",
      email: "intl@kimshealth.org",
      website: "https://www.kimshealth.org",
      rating: 4.5,
      reviewCount: 980,
      imageUrl: "/images/hospitals/kims-trivandrum.jpg",
      featured: true,
    },
    {
      slug: "baby-memorial-kozhikode",
      name: "Baby Memorial Hospital",
      city: "Kozhikode",
      accreditation: ["NABH"],
      specialities: ["Cardiology", "Nephrology", "Neonatology", "Oncology"],
      description:
        "Baby Memorial Hospital in Kozhikode is Malabar region's premier referral hospital, serving international patients from the Middle East with cardiac and kidney care.",
      address: "Indira Gandhi Road, Kozhikode, Kerala 673004",
      phone: "+91-495-2723272",
      email: "info@babymhospital.org",
      website: "https://www.babymhospital.org",
      rating: 4.4,
      reviewCount: 650,
      imageUrl: "/images/hospitals/baby-memorial.jpg",
      featured: false,
    },
    {
      slug: "jubilee-mission-thrissur",
      name: "Jubilee Mission Medical College",
      city: "Thrissur",
      accreditation: ["NABH"],
      specialities: ["Orthopaedics", "Cardiology", "General Surgery"],
      description:
        "Jubilee Mission Medical College Hospital in Thrissur combines academic medicine with advanced surgical care, offering affordable orthopaedic and cardiac packages for overseas patients.",
      address: "Jubilee Junction, Thrissur, Kerala 680005",
      phone: "+91-487-2432200",
      email: "contact@jubileemission.org",
      website: "https://www.jubileemissionhospital.org",
      rating: 4.3,
      reviewCount: 410,
      imageUrl: "/images/hospitals/jubilee-mission.jpg",
      featured: false,
    },
    {
      slug: "ananthapuri-hospitals-trivandrum",
      name: "Ananthapuri Hospitals & Research Institute",
      city: "Thiruvananthapuram",
      accreditation: ["NABH"],
      specialities: ["Cardiac Surgery", "Neurosurgery", "Oncology"],
      description:
        "Ananthapuri Hospitals is a multi-speciality hospital in Trivandrum recognised for cardiac surgery and neurosurgery outcomes, with a dedicated international patient desk.",
      address: "Chacka, Thiruvananthapuram, Kerala 695024",
      phone: "+91-471-3041100",
      email: "info@ananthapurihospitals.com",
      website: "https://www.ananthapurihospitals.com",
      rating: 4.2,
      reviewCount: 320,
      imageUrl: "/images/hospitals/ananthapuri.jpg",
      featured: false,
    },
    {
      slug: "vps-lakeshore-kochi",
      name: "VPS Lakeshore Hospital",
      city: "Kochi",
      accreditation: ["NABH", "JCI"],
      specialities: ["Liver Transplant", "Gastroenterology", "Critical Care"],
      description:
        "VPS Lakeshore Hospital on the banks of Vembanad Lake in Kochi is renowned for liver transplant and gastroenterology, attracting patients from the GCC and Africa.",
      address: "NH 49, Maradu, Kochi, Kerala 682040",
      phone: "+91-484-2701032",
      email: "international@vpslakeshore.com",
      website: "https://www.vpslakeshorehospital.com",
      rating: 4.6,
      reviewCount: 870,
      imageUrl: "/images/hospitals/vps-lakeshore.jpg",
      featured: true,
    },
    {
      slug: "somatheeram-ayurveda-munnar",
      name: "Vana Vasantham Ayurveda & Wellness Resort",
      city: "Munnar",
      accreditation: ["Kerala Tourism Approved"],
      specialities: ["Panchakarma", "Ayurveda", "Yoga Therapy", "Stress Management"],
      description:
        "Set amid the tea hills of Munnar, Vana Vasantham is a dedicated Ayurveda and wellness retreat offering authentic Panchakarma detox programs supervised by registered Ayurveda physicians.",
      address: "Pothamedu, Munnar, Kerala 685612",
      phone: "+91-486-5230456",
      email: "stay@vanavasantham.com",
      website: "https://www.vanavasantham.com",
      rating: 4.9,
      reviewCount: 540,
      imageUrl: "/images/hospitals/vana-vasantham.jpg",
      featured: true,
    },
  ];

  const hospitals: Hospital[] = [];
  for (const h of hospitalData) {
    hospitals.push(
      await prisma.hospital.create({
        data: {
          ...h,
          accreditation: JSON.stringify(h.accreditation),
          specialities: JSON.stringify(h.specialities),
        },
      })
    );
  }
  const bySlug = (slug: string) => hospitals.find((h) => h.slug === slug)!;

  // ---------- Doctors ----------
  const doctorData = [
    {
      slug: "dr-anil-kumar-cardiology",
      name: "Anil Kumar",
      title: "Dr.",
      speciality: "Cardiology",
      qualification: "MD, DM Cardiology (AIIMS)",
      experience: 22,
      hospitalId: bySlug("amrita-institute-kochi").id,
      languages: ["English", "Malayalam", "Hindi", "Arabic"],
      imageUrl: "/images/doctors/anil-kumar.jpg",
      bio: "Dr. Anil Kumar is a senior interventional cardiologist with over two decades of experience in coronary bypass and valve repair, having treated patients from 30+ countries.",
      featured: true,
    },
    {
      slug: "dr-meera-pillai-orthopaedics",
      name: "Meera Pillai",
      title: "Dr.",
      speciality: "Orthopaedics",
      qualification: "MS Ortho, Fellowship Joint Replacement (Singapore)",
      experience: 18,
      hospitalId: bySlug("kims-trivandrum").id,
      languages: ["English", "Malayalam", "Hindi"],
      imageUrl: "/images/doctors/meera-pillai.jpg",
      bio: "Dr. Meera Pillai specialises in minimally invasive knee and hip replacement surgery, with a strong record of rapid recovery protocols for international patients.",
      featured: true,
    },
    {
      slug: "dr-rajeev-nair-oncology",
      name: "Rajeev Nair",
      title: "Dr.",
      speciality: "Oncology",
      qualification: "MD, DM Medical Oncology",
      experience: 20,
      hospitalId: bySlug("amrita-institute-kochi").id,
      languages: ["English", "Malayalam", "Tamil"],
      imageUrl: "/images/doctors/rajeev-nair.jpg",
      bio: "Dr. Rajeev Nair leads the medical oncology unit, specialising in chemotherapy protocols and personalised cancer treatment plans for patients across the GCC.",
      featured: true,
    },
    {
      slug: "dr-fathima-noushad-fertility",
      name: "Fathima Noushad",
      title: "Dr.",
      speciality: "Fertility & IVF",
      qualification: "MD OBG, Fellowship Reproductive Medicine",
      experience: 15,
      hospitalId: bySlug("aster-medcity-kochi").id,
      languages: ["English", "Malayalam", "Arabic"],
      imageUrl: "/images/doctors/fathima-noushad.jpg",
      bio: "Dr. Fathima Noushad has helped thousands of couples through IVF and fertility treatments, with one of the highest success rates in the state.",
      featured: true,
    },
    {
      slug: "dr-sunil-thomas-cardiac-surgery",
      name: "Sunil Thomas",
      title: "Dr.",
      speciality: "Cardiac Surgery",
      qualification: "MCh Cardiothoracic Surgery",
      experience: 25,
      hospitalId: bySlug("aster-medcity-kochi").id,
      languages: ["English", "Malayalam"],
      imageUrl: "/images/doctors/sunil-thomas.jpg",
      bio: "Dr. Sunil Thomas is a pioneering cardiac surgeon known for off-pump bypass surgery, performing over 5,000 successful procedures.",
      featured: false,
    },
    {
      slug: "dr-priya-menon-dental",
      name: "Priya Menon",
      title: "Dr.",
      speciality: "Dental Implants",
      qualification: "MDS Prosthodontics",
      experience: 14,
      hospitalId: bySlug("kims-trivandrum").id,
      languages: ["English", "Malayalam", "Hindi"],
      imageUrl: "/images/doctors/priya-menon.jpg",
      bio: "Dr. Priya Menon specialises in full-mouth dental implants and smile makeovers for medical tourists seeking affordable, high-quality dental care.",
      featured: true,
    },
    {
      slug: "dr-george-mathew-liver-transplant",
      name: "George Mathew",
      title: "Dr.",
      speciality: "Liver Transplant",
      qualification: "MCh Surgical Gastroenterology",
      experience: 19,
      hospitalId: bySlug("vps-lakeshore-kochi").id,
      languages: ["English", "Malayalam"],
      imageUrl: "/images/doctors/george-mathew.jpg",
      bio: "Dr. George Mathew leads the liver transplant program at VPS Lakeshore, with outcomes comparable to leading transplant centres worldwide.",
      featured: false,
    },
    {
      slug: "dr-lakshmi-warrier-ayurveda",
      name: "Lakshmi Warrier",
      title: "Dr.",
      speciality: "Ayurveda & Panchakarma",
      qualification: "BAMS, MD Ayurveda",
      experience: 16,
      hospitalId: bySlug("somatheeram-ayurveda-munnar").id,
      languages: ["English", "Malayalam", "Sanskrit"],
      imageUrl: "/images/doctors/lakshmi-warrier.jpg",
      bio: "Dr. Lakshmi Warrier is a registered Ayurveda physician who designs personalised Panchakarma detox programs for chronic pain, stress and lifestyle disorders.",
      featured: true,
    },
    {
      slug: "dr-arun-pillai-neurology",
      name: "Arun Pillai",
      title: "Dr.",
      speciality: "Neurology",
      qualification: "DM Neurology",
      experience: 17,
      hospitalId: bySlug("amrita-institute-kochi").id,
      languages: ["English", "Malayalam", "Hindi"],
      imageUrl: "/images/doctors/arun-pillai.jpg",
      bio: "Dr. Arun Pillai treats complex neurological disorders including stroke, epilepsy and movement disorders using minimally invasive techniques.",
      featured: false,
    },
    {
      slug: "dr-divya-nambiar-nephrology",
      name: "Divya Nambiar",
      title: "Dr.",
      speciality: "Nephrology",
      qualification: "DM Nephrology",
      experience: 13,
      hospitalId: bySlug("baby-memorial-kozhikode").id,
      languages: ["English", "Malayalam"],
      imageUrl: "/images/doctors/divya-nambiar.jpg",
      bio: "Dr. Divya Nambiar specialises in dialysis management and kidney transplant care for patients with chronic kidney disease.",
      featured: false,
    },
    {
      slug: "dr-vishnu-menon-spine",
      name: "Vishnu Menon",
      title: "Dr.",
      speciality: "Spine Surgery",
      qualification: "MCh Neurosurgery, Fellowship Spine (Germany)",
      experience: 16,
      hospitalId: bySlug("kims-trivandrum").id,
      languages: ["English", "Malayalam", "German"],
      imageUrl: "/images/doctors/vishnu-menon.jpg",
      bio: "Dr. Vishnu Menon performs complex spine surgeries including minimally invasive disc replacement and scoliosis correction.",
      featured: false,
    },
    {
      slug: "dr-nisha-varghese-ophthalmology",
      name: "Nisha Varghese",
      title: "Dr.",
      speciality: "Ophthalmology",
      qualification: "MS Ophthalmology, Fellowship Cataract & Refractive Surgery",
      experience: 12,
      hospitalId: bySlug("jubilee-mission-thrissur").id,
      languages: ["English", "Malayalam"],
      imageUrl: "/images/doctors/nisha-varghese.jpg",
      bio: "Dr. Nisha Varghese performs advanced cataract and LASIK procedures with same-day discharge for international patients.",
      featured: false,
    },
  ];

  const doctors: Doctor[] = [];
  for (const d of doctorData) {
    doctors.push(
      await prisma.doctor.create({
        data: { ...d, languages: JSON.stringify(d.languages) },
      })
    );
  }

  // ---------- Packages ----------
  const packageData = [
    {
      slug: "cardiac-bypass-surgery-package",
      name: "Complete Cardiac Bypass Surgery Package",
      category: "medical",
      description:
        "A comprehensive 14-day package covering pre-op cardiac evaluation, coronary artery bypass graft (CABG) surgery, ICU recovery and post-op rehabilitation at Aster Medcity, Kochi.",
      duration: "12-14 days",
      city: "Kochi",
      price: 550000,
      inclusions: [
        "Pre-op cardiac evaluation & tests",
        "CABG surgery",
        "ICU & ward stay (10 nights)",
        "Post-op physiotherapy",
        "Airport pickup & drop",
        "Dedicated interpreter",
      ],
      itinerary: [
        { day: 1, title: "Arrival & Consultation", description: "Airport pickup, hospital admission, initial cardiac consultation and diagnostic tests." },
        { day: 2, title: "Pre-Surgical Workup", description: "Echocardiogram, angiography and anaesthesia fitness evaluation." },
        { day: 3, title: "Surgery Day", description: "Coronary artery bypass graft (CABG) surgery performed by the cardiac surgery team." },
        { day: 4, title: "ICU Recovery", description: "Close monitoring in the cardiac ICU." },
        { day: 5, title: "ICU Recovery", description: "Continued ICU monitoring, gradual mobilisation." },
        { day: 6, title: "Ward Transfer", description: "Shift to a private ward room, breathing exercises begin." },
        { day: 7, title: "Physiotherapy", description: "Structured cardiac physiotherapy and dietary counselling." },
        { day: 8, title: "Physiotherapy", description: "Continued physiotherapy, wound dressing checks." },
        { day: 9, title: "Review", description: "Cardiologist review and medication adjustment." },
        { day: 10, title: "Discharge Planning", description: "Final tests before discharge from hospital." },
        { day: 11, title: "Discharge & Recovery Stay", description: "Discharge to recovery accommodation near the hospital." },
        { day: 12, title: "Follow-up Consultation", description: "Final follow-up consultation and fitness-to-fly clearance." },
      ],
      hospitalId: bySlug("aster-medcity-kochi").id,
      tags: ["cardiac", "surgery", "popular"],
      featured: true,
      popular: true,
      imageUrl: "/images/packages/cardiac-bypass.jpg",
      metaTitle: "Cardiac Bypass Surgery Package in Kerala | Cost & Itinerary",
      metaDesc: "Complete CABG surgery package in Kochi, Kerala with day-by-day itinerary, inclusions and pricing for international patients.",
    },
    {
      slug: "knee-replacement-package",
      name: "Bilateral Knee Replacement Package",
      category: "medical",
      description:
        "A 10-day package for bilateral total knee replacement at KIMS Trivandrum, including implants, surgery, hospital stay and physiotherapy.",
      duration: "10 days",
      city: "Thiruvananthapuram",
      price: 420000,
      inclusions: [
        "Orthopaedic consultation",
        "Bilateral knee implants (branded)",
        "Surgery & anaesthesia",
        "7 nights hospital stay",
        "Physiotherapy sessions",
        "Airport transfers",
      ],
      itinerary: [
        { day: 1, title: "Arrival & Assessment", description: "Airport pickup, orthopaedic consultation, X-rays and blood work." },
        { day: 2, title: "Pre-op Preparation", description: "Anaesthesia fitness check and surgical planning." },
        { day: 3, title: "Surgery Day", description: "Bilateral total knee replacement surgery." },
        { day: 4, title: "Early Mobilisation", description: "Pain management and first walking attempts with support." },
        { day: 5, title: "Physiotherapy", description: "Structured physiotherapy sessions begin." },
        { day: 6, title: "Physiotherapy", description: "Continued physiotherapy and wound care." },
        { day: 7, title: "Physiotherapy", description: "Stairs training and independence exercises." },
        { day: 8, title: "Review", description: "Surgeon review, X-ray check." },
        { day: 9, title: "Discharge", description: "Hospital discharge with home exercise plan." },
        { day: 10, title: "Final Follow-up", description: "Final follow-up and fitness-to-fly clearance." },
      ],
      hospitalId: bySlug("kims-trivandrum").id,
      tags: ["orthopaedics", "surgery"],
      featured: false,
      popular: true,
      imageUrl: "/images/packages/knee-replacement.jpg",
      metaTitle: "Knee Replacement Package Kerala | All-Inclusive Cost",
      metaDesc: "Bilateral knee replacement package in Thiruvananthapuram, Kerala with implants, surgery and physiotherapy included.",
    },
    {
      slug: "dental-implants-smile-makeover",
      name: "Full Mouth Dental Implants & Smile Makeover",
      category: "medical",
      description:
        "A 7-day full-mouth dental implant package at KIMS Trivandrum combining implants, crowns and a complete smile makeover.",
      duration: "6-7 days",
      city: "Thiruvananthapuram",
      price: 280000,
      inclusions: [
        "Dental consultation & 3D scan",
        "Implant placement (up to 8)",
        "Crowns & abutments",
        "Teeth whitening",
        "Hotel stay (5 nights)",
        "Airport transfers",
      ],
      itinerary: [
        { day: 1, title: "Arrival & Scan", description: "Airport pickup, 3D dental scan and treatment planning." },
        { day: 2, title: "Implant Surgery", description: "Implant placement under local anaesthesia." },
        { day: 3, title: "Rest & Recovery", description: "Rest day with pain management." },
        { day: 4, title: "Review", description: "Healing check and impressions for crowns." },
        { day: 5, title: "Crown Fitting", description: "Final crown fitting and bite adjustment." },
        { day: 6, title: "Whitening & Finishing", description: "Teeth whitening and final polish." },
        { day: 7, title: "Departure Check", description: "Final dental review before departure." },
      ],
      hospitalId: bySlug("kims-trivandrum").id,
      tags: ["dental", "cosmetic"],
      featured: false,
      popular: false,
      imageUrl: "/images/packages/dental-implants.jpg",
      metaTitle: "Dental Implants Package Kerala | Smile Makeover Cost",
      metaDesc: "Full mouth dental implant and smile makeover package in Kerala with transparent pricing and hotel stay included.",
    },
    {
      slug: "panchakarma-21-day-detox",
      name: "Panchakarma 21-Day Authentic Detox",
      category: "ayurveda",
      description:
        "A traditional 21-day Panchakarma detoxification program at Vana Vasantham, Munnar, supervised by registered Ayurveda physicians, including herbal therapies, diet and yoga.",
      duration: "21 days",
      city: "Munnar",
      price: 185000,
      inclusions: [
        "Ayurveda physician consultations",
        "Daily Panchakarma therapies",
        "Herbal medicines",
        "Satvic Ayurvedic meals",
        "Daily yoga & meditation",
        "Resort accommodation",
      ],
      itinerary: [
        { day: 1, title: "Arrival & Doctor Consultation", description: "Pulse diagnosis (Nadi Pariksha) and personalised treatment plan." },
        { day: 2, title: "Snehana (Oleation)", description: "Begin daily herbal oil massages to prepare the body for detox." },
        { day: 5, title: "Swedana (Steam Therapy)", description: "Herbal steam therapy added to loosen toxins." },
        { day: 8, title: "Vamana / Virechana", description: "Therapeutic emesis or purgation as prescribed by the physician." },
        { day: 12, title: "Basti (Medicated Enema)", description: "Course of medicated enemas to cleanse the colon." },
        { day: 16, title: "Rasayana (Rejuvenation)", description: "Rejuvenation therapies and herbal tonics begin." },
        { day: 19, title: "Yoga & Lifestyle Coaching", description: "Personalised yoga and diet plan for life after detox." },
        { day: 21, title: "Final Assessment & Departure", description: "Final physician review and take-home wellness plan." },
      ],
      hospitalId: bySlug("somatheeram-ayurveda-munnar").id,
      tags: ["ayurveda", "wellness", "popular"],
      featured: true,
      popular: true,
      imageUrl: "/images/packages/panchakarma-21-day.jpg",
      metaTitle: "Panchakarma 21 Day Detox Kerala | Authentic Ayurveda Package",
      metaDesc: "Traditional 21-day Panchakarma detox package in Munnar, Kerala with physician-supervised therapies and resort stay.",
    },
    {
      slug: "panchakarma-14-day-rejuvenation",
      name: "Panchakarma 14-Day Rejuvenation",
      category: "ayurveda",
      description:
        "A shorter 14-day Panchakarma program ideal for stress relief, joint pain and lifestyle disorder management.",
      duration: "14 days",
      city: "Munnar",
      price: 125000,
      inclusions: [
        "Ayurveda consultations",
        "Daily therapies",
        "Herbal medicines",
        "Satvic meals",
        "Yoga sessions",
        "Resort accommodation",
      ],
      itinerary: [
        { day: 1, title: "Arrival & Consultation", description: "Initial assessment and treatment plan." },
        { day: 3, title: "Abhyanga & Swedana", description: "Daily oil massage and steam therapy." },
        { day: 7, title: "Mid-program Review", description: "Physician review and plan adjustment." },
        { day: 10, title: "Basti Therapy", description: "Medicated enema course for deeper cleansing." },
        { day: 14, title: "Final Review & Departure", description: "Wellness plan handover and departure." },
      ],
      hospitalId: bySlug("somatheeram-ayurveda-munnar").id,
      tags: ["ayurveda", "wellness"],
      featured: false,
      popular: false,
      imageUrl: "/images/packages/panchakarma-14-day.jpg",
      metaTitle: "Panchakarma 14 Day Package Kerala | Ayurveda Rejuvenation",
      metaDesc: "14-day Panchakarma rejuvenation package in Kerala for stress, joint pain and lifestyle disorders.",
    },
    {
      slug: "ayurveda-weight-management",
      name: "Ayurveda Weight Management Program",
      category: "ayurveda",
      description:
        "A 10-day Ayurvedic weight management program combining herbal therapies, diet correction and yoga for sustainable weight loss.",
      duration: "10 days",
      city: "Munnar",
      price: 95000,
      inclusions: [
        "Body composition assessment",
        "Herbal therapies (Udvartana)",
        "Customised diet plan",
        "Daily yoga",
        "Resort accommodation",
      ],
      itinerary: [
        { day: 1, title: "Assessment", description: "Body composition and metabolic assessment." },
        { day: 2, title: "Udvartana Begins", description: "Herbal powder massage to stimulate metabolism." },
        { day: 5, title: "Diet Correction", description: "Customised low-fat Ayurvedic diet introduced." },
        { day: 8, title: "Yoga Intensive", description: "Focused yoga sessions for fat reduction." },
        { day: 10, title: "Final Review", description: "Progress review and take-home plan." },
      ],
      hospitalId: bySlug("somatheeram-ayurveda-munnar").id,
      tags: ["ayurveda", "wellness"],
      featured: false,
      popular: false,
      imageUrl: "/images/packages/weight-management.jpg",
      metaTitle: "Ayurveda Weight Management Program Kerala | 10 Day Package",
      metaDesc: "10-day Ayurvedic weight management program in Kerala combining herbal therapy, diet and yoga.",
    },
    {
      slug: "stress-management-retreat",
      name: "Ayurveda Stress & Anxiety Management Retreat",
      category: "ayurveda",
      description:
        "A 7-day retreat focused on stress, anxiety and sleep disorders using Shirodhara, meditation and herbal therapies.",
      duration: "7 days",
      city: "Munnar",
      price: 68000,
      inclusions: [
        "Ayurveda consultation",
        "Daily Shirodhara",
        "Meditation sessions",
        "Herbal medicines",
        "Resort accommodation",
      ],
      itinerary: [
        { day: 1, title: "Arrival & Consultation", description: "Stress assessment and treatment plan." },
        { day: 2, title: "Shirodhara Begins", description: "Continuous warm oil flow therapy on the forehead." },
        { day: 4, title: "Meditation Intensive", description: "Guided meditation and pranayama sessions." },
        { day: 6, title: "Herbal Therapy", description: "Calming herbal therapies and head massage." },
        { day: 7, title: "Departure", description: "Final consultation and wellness plan." },
      ],
      hospitalId: bySlug("somatheeram-ayurveda-munnar").id,
      tags: ["ayurveda", "wellness"],
      featured: false,
      popular: false,
      imageUrl: "/images/packages/stress-management.jpg",
      metaTitle: "Ayurveda Stress Management Retreat Kerala | 7 Day Program",
      metaDesc: "7-day Ayurveda retreat in Munnar, Kerala for stress, anxiety and sleep disorders using Shirodhara.",
    },
    {
      slug: "cardiac-care-ayurveda-combo",
      name: "Cardiac Surgery + Ayurveda Recovery Combo",
      category: "combo",
      description:
        "Combines cardiac bypass surgery in Kochi with a 10-day Ayurvedic recovery and rejuvenation program in Munnar for holistic healing.",
      duration: "24 days",
      city: "Kochi & Munnar",
      price: 650000,
      inclusions: [
        "CABG surgery package",
        "Hospital stay & physiotherapy",
        "Transfer to Munnar wellness resort",
        "10-day Ayurveda recovery program",
        "All transfers included",
      ],
      itinerary: [
        { day: 1, title: "Arrival in Kochi", description: "Hospital admission and cardiac evaluation." },
        { day: 3, title: "Surgery Day", description: "Coronary artery bypass graft surgery." },
        { day: 10, title: "Discharge from Hospital", description: "Discharge after recovery and physiotherapy in Kochi." },
        { day: 12, title: "Transfer to Munnar", description: "Scenic drive to the Ayurveda wellness resort." },
        { day: 13, title: "Ayurveda Recovery Begins", description: "Gentle Ayurvedic therapies suited for post-cardiac recovery." },
        { day: 20, title: "Continued Rejuvenation", description: "Diet, yoga and herbal therapies to rebuild strength." },
        { day: 24, title: "Final Review & Departure", description: "Final cardiac and Ayurveda physician review." },
      ],
      hospitalId: bySlug("aster-medcity-kochi").id,
      tags: ["combo", "cardiac", "ayurveda"],
      featured: true,
      popular: false,
      imageUrl: "/images/packages/cardiac-ayurveda-combo.jpg",
      metaTitle: "Cardiac Surgery + Ayurveda Recovery Combo Package Kerala",
      metaDesc: "Combined cardiac bypass surgery and Ayurveda recovery package across Kochi and Munnar, Kerala.",
    },
    {
      slug: "ivf-fertility-ayurveda-combo",
      name: "IVF Treatment + Ayurveda Fertility Support Combo",
      category: "combo",
      description:
        "Combines an IVF cycle at Aster Medcity with complementary Ayurvedic fertility support therapies for improved outcomes.",
      duration: "18 days",
      city: "Kochi & Munnar",
      price: 380000,
      inclusions: [
        "IVF consultation & cycle",
        "Embryo transfer",
        "Ayurveda fertility therapies",
        "Accommodation both locations",
        "All transfers",
      ],
      itinerary: [
        { day: 1, title: "Arrival & IVF Consultation", description: "Initial fertility assessment and cycle planning." },
        { day: 4, title: "Ovarian Stimulation", description: "Hormone monitoring and stimulation begins." },
        { day: 10, title: "Egg Retrieval", description: "Egg retrieval procedure performed." },
        { day: 13, title: "Embryo Transfer", description: "Embryo transfer procedure." },
        { day: 14, title: "Transfer to Munnar", description: "Relocate for restful Ayurveda support therapies." },
        { day: 18, title: "Final Review", description: "Pregnancy test and final consultation." },
      ],
      hospitalId: bySlug("aster-medcity-kochi").id,
      tags: ["combo", "fertility", "ayurveda"],
      featured: false,
      popular: false,
      imageUrl: "/images/packages/ivf-ayurveda-combo.jpg",
      metaTitle: "IVF + Ayurveda Fertility Support Combo Package Kerala",
      metaDesc: "Combined IVF treatment and Ayurvedic fertility support package across Kochi and Munnar, Kerala.",
    },
    {
      slug: "kerala-wellness-stay-package",
      name: "Kerala Wellness & Backwaters Stay Package",
      category: "stay",
      description:
        "A relaxed 8-day wellness stay combining gentle Ayurveda therapies with Kerala backwater houseboat experiences, ideal for companions of medical tourists.",
      duration: "8 days",
      city: "Kochi & Munnar",
      price: 78000,
      inclusions: [
        "Houseboat stay (1 night)",
        "Resort stay (6 nights)",
        "Daily wellness therapies",
        "All meals",
        "Sightseeing transfers",
      ],
      itinerary: [
        { day: 1, title: "Arrival in Kochi", description: "Pickup and check-in, evening Fort Kochi walk." },
        { day: 2, title: "Houseboat Backwaters", description: "Overnight houseboat cruise through Kerala backwaters." },
        { day: 3, title: "Transfer to Munnar", description: "Scenic drive through tea plantations." },
        { day: 4, title: "Wellness Therapies Begin", description: "Daily Ayurveda relaxation therapies." },
        { day: 6, title: "Tea Garden Tour", description: "Guided tour of Munnar's tea estates." },
        { day: 8, title: "Departure", description: "Check-out and airport transfer." },
      ],
      hospitalId: null,
      tags: ["stay", "wellness", "tourism"],
      featured: false,
      popular: false,
      imageUrl: "/images/packages/wellness-stay.jpg",
      metaTitle: "Kerala Wellness & Backwaters Stay Package | 8 Days",
      metaDesc: "Relaxed 8-day Kerala wellness package combining Ayurveda therapies with houseboat backwater stays.",
    },
  ];

  for (const p of packageData) {
    await prisma.package.create({
      data: {
        ...p,
        inclusions: JSON.stringify(p.inclusions),
        itinerary: JSON.stringify(p.itinerary),
        tags: JSON.stringify(p.tags),
      },
    });
  }

  // ---------- Treatments ----------
  const treatmentData = [
    {
      slug: "cardiac-bypass-surgery",
      name: "Cardiac Bypass Surgery (CABG)",
      category: "Cardiology",
      description:
        "Coronary artery bypass graft surgery to restore blood flow to the heart by bypassing blocked arteries, performed at Kerala's leading cardiac centres.",
      costIndia: 550000,
      costUSA: 25000,
      costUK: 18000,
      duration: "12-14 days",
      hospitals: ["Aster Medcity", "Amrita Institute of Medical Sciences"],
      content:
        "Coronary artery bypass graft (CABG) surgery is one of the most performed cardiac procedures worldwide, used to treat severe coronary artery disease. In Kerala, hospitals like Aster Medcity and Amrita Institute use the same techniques, equipment and surgical protocols followed in the US and Europe, but at a fraction of the cost. Surgeons use grafts from the patient's own leg or chest artery to reroute blood around blocked sections of the coronary arteries, restoring normal blood flow to the heart muscle.\n\nKerala's cardiac surgery teams are internationally trained, many having completed fellowships in the UK, US or Germany. Hospitals offer minimally invasive and off-pump bypass options that reduce recovery time. Combined with Kerala's renowned post-operative care and optional Ayurvedic rehabilitation, international patients often choose Kerala not just for cost savings but for the quality of recovery support.",
      faqs: [
        { q: "How long does cardiac bypass surgery take?", a: "The surgery itself typically takes 3-6 hours, depending on the number of grafts required." },
        { q: "How long is the hospital stay?", a: "Most patients stay 7-10 days in hospital followed by a few days of recovery before flying home." },
        { q: "Is off-pump bypass surgery available in Kerala?", a: "Yes, several Kerala hospitals offer off-pump (beating heart) bypass surgery, which can reduce recovery time." },
        { q: "What is the success rate of CABG in Kerala hospitals?", a: "JCI-accredited hospitals in Kerala report success rates comparable to top US and European centres, typically above 98%." },
        { q: "Can I combine cardiac surgery with Ayurveda recovery?", a: "Yes, many patients opt for a combo package that includes a post-surgery Ayurvedic rejuvenation stay in Munnar." },
      ],
      metaTitle: "Cardiac Bypass Surgery Cost in Kerala vs USA & UK",
      metaDesc: "Compare cardiac bypass surgery (CABG) cost in Kerala vs USA and UK, plus top hospitals, procedure details and recovery timeline.",
    },
    {
      slug: "knee-replacement-surgery",
      name: "Knee Replacement Surgery",
      category: "Orthopaedics",
      description:
        "Total or partial knee replacement surgery to relieve chronic joint pain and restore mobility, using globally certified implants.",
      costIndia: 420000,
      costUSA: 35000,
      costUK: 14000,
      duration: "10 days",
      hospitals: ["KIMS Health Trivandrum", "Jubilee Mission Medical College"],
      content:
        "Knee replacement surgery (total or partial) is recommended for patients with severe osteoarthritis or joint damage that limits mobility and causes chronic pain. Kerala hospitals use the same internationally certified implants (Zimmer Biomet, Stryker, DePuy) used in US and UK hospitals, with orthopaedic surgeons trained in robotic-assisted and minimally invasive techniques.\n\nA typical knee replacement cost in Kerala is around 80-85% lower than in the United States, without compromising on implant quality or surgical expertise. Patients benefit from shorter wait times, dedicated physiotherapy programs, and the option to recover in Kerala's calm environment before flying home, often within 10-12 days of surgery.",
      faqs: [
        { q: "What implants are used for knee replacement in Kerala?", a: "Hospitals use globally certified implants from brands such as Zimmer Biomet, Stryker and DePuy Synthes." },
        { q: "How soon can I walk after knee replacement?", a: "Most patients begin walking with support within 24-48 hours of surgery, with physiotherapy starting on day 2 or 3." },
        { q: "Is bilateral knee replacement possible in one trip?", a: "Yes, many patients undergo both knees replaced simultaneously or in a staged approach within the same hospital stay." },
        { q: "How long do knee implants last?", a: "Modern knee implants typically last 15-20 years or more with proper care." },
        { q: "When can I fly home after surgery?", a: "Most surgeons clear patients to fly approximately 10-12 days after surgery, once mobility and wound healing are satisfactory." },
      ],
      metaTitle: "Knee Replacement Cost in Kerala vs USA - Full Comparison",
      metaDesc: "Compare knee replacement surgery cost in Kerala, India vs USA and UK, with top hospitals, implants used and recovery timeline.",
    },
    {
      slug: "dental-implants",
      name: "Dental Implants",
      category: "Dental",
      description:
        "Single or full-mouth dental implant procedures to replace missing teeth permanently, combined with Kerala's affordable dental tourism packages.",
      costIndia: 35000,
      costUSA: 4500,
      costUK: 2800,
      duration: "5-7 days",
      hospitals: ["KIMS Health Trivandrum"],
      content:
        "Dental implants are a permanent solution for missing teeth, involving the placement of titanium posts into the jawbone that act as artificial tooth roots, topped with custom crowns. Kerala has become a popular dental tourism destination because of its combination of skilled prosthodontists, modern 3D imaging technology, and dramatically lower costs compared to Western countries.\n\nA full-mouth implant procedure that might cost $20,000-$30,000 in the US can be completed in Kerala for a fraction of that price, often within a single 6-7 day visit using immediate-load implant techniques. Many patients combine their dental trip with sightseeing or a short Ayurveda wellness stay.",
      faqs: [
        { q: "How many visits are needed for dental implants?", a: "Most patients can complete implant placement and final crown fitting within a single 6-7 day visit using modern techniques." },
        { q: "Are the implant brands used internationally recognised?", a: "Yes, Kerala dental clinics use globally recognised implant brands such as Nobel Biocare, Straumann and Osstem." },
        { q: "Is the procedure painful?", a: "Implant placement is done under local anaesthesia and most patients report only mild discomfort managed with medication." },
        { q: "How long do dental implants last?", a: "With proper care, dental implants can last 15-25 years or longer." },
        { q: "Can I get a full smile makeover in one trip?", a: "Yes, many packages combine implants with whitening, veneers and gum contouring in a single visit." },
      ],
      metaTitle: "Dental Implants Cost in Kerala vs USA & UK | Full Guide",
      metaDesc: "Compare dental implant costs in Kerala vs USA and UK, with top clinics, procedure steps and what to expect during your visit.",
    },
    {
      slug: "ivf-treatment",
      name: "IVF Treatment",
      category: "Fertility",
      description:
        "In-vitro fertilisation treatment for couples facing infertility, offered at Kerala's leading fertility centres with high success rates.",
      costIndia: 180000,
      costUSA: 15000,
      costUK: 6000,
      duration: "14-18 days",
      hospitals: ["Aster Medcity"],
      content:
        "In-vitro fertilisation (IVF) is an assisted reproductive technology where eggs are fertilised with sperm outside the body and the resulting embryo is transferred to the uterus. Kerala's fertility centres are equipped with advanced embryology labs, ICSI and PGT-A genetic screening, with success rates that rival leading clinics in the US and Europe.\n\nThe lower cost of IVF in Kerala makes it accessible for couples who may need multiple cycles. Many international patients combine their IVF cycle with complementary Ayurvedic fertility support therapies, believed to improve uterine receptivity and overall wellbeing during treatment.",
      faqs: [
        { q: "What is the success rate of IVF in Kerala?", a: "Leading Kerala fertility centres report success rates of 40-60% per cycle depending on age and diagnosis, comparable to international benchmarks." },
        { q: "How many days does an IVF cycle take?", a: "A full IVF cycle from stimulation to embryo transfer typically takes 14-18 days." },
        { q: "Is genetic screening (PGT-A) available?", a: "Yes, leading fertility centres in Kochi offer PGT-A and other advanced genetic screening options." },
        { q: "Can single women or same-sex couples access IVF in Kerala?", a: "Indian fertility regulations have specific eligibility criteria; please consult the clinic directly for current rules applicable to international patients." },
        { q: "Should I combine IVF with Ayurveda therapy?", a: "Many patients choose complementary Ayurveda fertility support, though this should be discussed with your treating fertility specialist." },
      ],
      metaTitle: "IVF Treatment Cost in Kerala vs USA & UK | Success Rates",
      metaDesc: "Compare IVF treatment cost and success rates in Kerala vs USA and UK, with top fertility centres and what to expect.",
    },
    {
      slug: "panchakarma-detox",
      name: "Panchakarma Detox Therapy",
      category: "Ayurveda",
      description:
        "A traditional five-fold Ayurvedic detoxification therapy used to eliminate toxins, restore balance and treat chronic lifestyle disorders.",
      costIndia: 125000,
      costUSA: 6000,
      costUK: 5000,
      duration: "14-21 days",
      hospitals: ["Vana Vasantham Ayurveda & Wellness Resort"],
      content:
        "Panchakarma is a classical Ayurvedic detoxification protocol consisting of five therapeutic actions — Vamana, Virechana, Basti, Nasya and Raktamokshana — used to eliminate accumulated toxins (Ama) from the body. Kerala is considered the birthplace of authentic Panchakarma, with generations of Ayurveda physicians (Vaidyas) trained in traditional Gurukula methods.\n\nUnlike spa-style 'Ayurveda' offered elsewhere, genuine Panchakarma in Kerala is medically supervised, with each therapy personalised to the patient's body constitution (Prakriti) and health condition. Programs typically run 14-21 days to allow the body to fully complete the detoxification and rejuvenation cycle, making Kerala a preferred destination for patients seeking authentic, physician-led wellness retreats rather than short spa treatments.",
      faqs: [
        { q: "How long should a Panchakarma program be for best results?", a: "Authentic Panchakarma typically requires a minimum of 14 days, with 21 days recommended for chronic conditions." },
        { q: "Is Panchakarma safe for everyone?", a: "Panchakarma should always be undertaken under the supervision of a registered Ayurveda physician who assesses suitability based on health history." },
        { q: "What conditions does Panchakarma help with?", a: "It is commonly used for chronic pain, stress, skin conditions, digestive disorders and general rejuvenation." },
        { q: "What should I eat during Panchakarma?", a: "A specific Satvic, easily digestible diet is prescribed throughout the program to support the detoxification process." },
        { q: "Can I combine Panchakarma with a medical treatment trip?", a: "Yes, many patients combine post-surgical recovery in Kochi with a Panchakarma program in Munnar." },
      ],
      metaTitle: "Panchakarma Detox Cost in Kerala | 21 Day Authentic Program",
      metaDesc: "Learn about Panchakarma detox therapy in Kerala, costs compared globally, and what a 14-21 day authentic program includes.",
    },
    {
      slug: "cataract-surgery",
      name: "Cataract Surgery",
      category: "Ophthalmology",
      description:
        "Advanced phacoemulsification cataract surgery with premium intraocular lens options, restoring vision with same-day discharge.",
      costIndia: 45000,
      costUSA: 4000,
      costUK: 3000,
      duration: "3-4 days",
      hospitals: ["Jubilee Mission Medical College"],
      content:
        "Cataract surgery is one of the most commonly performed and successful surgical procedures globally, involving the removal of the eye's clouded natural lens and replacement with an artificial intraocular lens (IOL). Kerala ophthalmologists use advanced phacoemulsification techniques with premium IOL options including multifocal and toric lenses for astigmatism correction.\n\nThe procedure is typically performed under topical anaesthesia and takes only 15-20 minutes per eye, with patients able to go home the same day. Kerala's combination of skilled ophthalmic surgeons, modern equipment and significantly lower costs makes it an attractive destination for cataract surgery, especially for patients requiring bilateral procedures.",
      faqs: [
        { q: "Is cataract surgery painful?", a: "No, the procedure is performed under topical or local anaesthesia and is generally painless." },
        { q: "Can both eyes be treated in one trip?", a: "Yes, both eyes can typically be treated a few days apart within the same visit." },
        { q: "What lens options are available?", a: "Standard monofocal, multifocal and toric lenses for astigmatism correction are all available." },
        { q: "How long is the recovery period?", a: "Most patients resume normal activities within 2-3 days, with full visual stabilisation within a few weeks." },
        { q: "When can I fly after cataract surgery?", a: "Most surgeons clear patients to fly within 3-4 days of surgery, after a final post-op check." },
      ],
      metaTitle: "Cataract Surgery Cost in Kerala vs USA & UK | Lens Options",
      metaDesc: "Compare cataract surgery cost in Kerala vs USA and UK, lens options available, and recovery timeline for international patients.",
    },
    {
      slug: "spine-surgery",
      name: "Spine Surgery",
      category: "Orthopaedics",
      description:
        "Minimally invasive and complex spine surgeries including disc replacement, fusion and scoliosis correction by fellowship-trained spine surgeons.",
      costIndia: 480000,
      costUSA: 80000,
      costUK: 22000,
      duration: "10-14 days",
      hospitals: ["KIMS Health Trivandrum"],
      content:
        "Spine surgery covers a range of procedures including discectomy, spinal fusion, artificial disc replacement and scoliosis correction, used to treat chronic back pain, nerve compression and spinal deformities. Kerala's spine surgeons are often fellowship-trained in Europe and use minimally invasive techniques including endoscopic discectomy, which reduces blood loss and accelerates recovery.\n\nWith costs running at roughly one-sixth of US prices, Kerala has become a destination for patients seeking complex spine procedures without the long wait times common in public healthcare systems abroad. Post-operative rehabilitation programs are tailored to each procedure to ensure safe, gradual return to mobility.",
      faqs: [
        { q: "Are minimally invasive spine techniques available?", a: "Yes, endoscopic and microsurgical techniques are widely available, reducing recovery time significantly." },
        { q: "How long is the hospital stay for spine surgery?", a: "Typically 5-7 days depending on the complexity of the procedure, followed by outpatient recovery." },
        { q: "Will I need physiotherapy after spine surgery?", a: "Yes, a structured physiotherapy program is included to support safe recovery and strengthen supporting muscles." },
        { q: "What conditions are treated with spine surgery?", a: "Herniated discs, spinal stenosis, scoliosis, spondylolisthesis and vertebral fractures are commonly treated." },
        { q: "When can I travel after spine surgery?", a: "Most patients are cleared to fly 10-14 days after surgery, following a final surgeon review." },
      ],
      metaTitle: "Spine Surgery Cost in Kerala vs USA & UK | Procedures",
      metaDesc: "Compare spine surgery cost in Kerala vs USA and UK, minimally invasive options, and recovery timeline for international patients.",
    },
    {
      slug: "cancer-treatment",
      name: "Cancer Treatment",
      category: "Oncology",
      description:
        "Comprehensive cancer care including surgery, chemotherapy, radiation and targeted therapy at Kerala's leading oncology centres.",
      costIndia: 400000,
      costUSA: 150000,
      costUK: 45000,
      duration: "Varies by protocol",
      hospitals: ["Amrita Institute of Medical Sciences", "Baby Memorial Hospital"],
      content:
        "Cancer treatment in Kerala spans surgical oncology, medical oncology (chemotherapy and targeted therapy) and radiation oncology, delivered through multidisciplinary tumour boards similar to leading cancer centres worldwide. Hospitals such as Amrita Institute offer comprehensive cancer care including advanced linear accelerators for radiotherapy, bone marrow transplant units and access to the latest targeted and immunotherapy drugs.\n\nFor international patients, the cost of a full treatment protocol in Kerala can be significantly lower than in the US, even when treatment spans several months. Many oncology packages are tailored to the specific cancer type and stage, with case-by-case quotes provided after reviewing medical reports and biopsy results.",
      faqs: [
        { q: "What types of cancer are treated in Kerala?", a: "Kerala's leading oncology centres treat the full range of cancers including breast, lung, GI, blood and gynaecological cancers." },
        { q: "Is targeted therapy and immunotherapy available?", a: "Yes, major cancer centres in Kerala offer access to globally approved targeted therapy and immunotherapy drugs." },
        { q: "How is treatment cost estimated?", a: "Cost depends on cancer type, stage and treatment protocol; a personalised quote is provided after medical report review." },
        { q: "Can treatment be completed in a single visit?", a: "Surgical procedures can often be completed in one visit, while chemotherapy or radiation protocols may require multiple visits or extended stay." },
        { q: "Are second opinions available remotely?", a: "Yes, most hospitals offer remote second-opinion services before patients commit to travel." },
      ],
      metaTitle: "Cancer Treatment Cost in Kerala vs USA & UK | Oncology Care",
      metaDesc: "Compare cancer treatment cost in Kerala vs USA and UK, leading oncology hospitals, and what comprehensive cancer care includes.",
    },
  ];

  for (const t of treatmentData) {
    await prisma.treatment.create({
      data: {
        ...t,
        hospitals: JSON.stringify(t.hospitals),
        faqs: JSON.stringify(t.faqs),
      },
    });
  }

  // ---------- Blog posts ----------
  const blogData = [
    {
      slug: "medical-tourism-kerala-cost-guide",
      title: "Medical Tourism in Kerala: The Complete Cost Guide for 2026",
      excerpt:
        "Everything international patients need to know about medical treatment costs in Kerala, from cardiac surgery to dental implants.",
      category: "Cost Guides",
      tags: ["medical tourism", "cost", "kerala"],
      content: `## Why Patients Choose Kerala for Medical Treatment

Kerala has emerged as one of the world's top medical tourism destinations, combining JCI and NABH accredited hospitals with costs that are often 60-80% lower than the United States or United Kingdom. Unlike many medical tourism hubs, Kerala also offers a unique advantage: world-renowned Ayurveda for post-treatment recovery.

## Typical Treatment Costs in Kerala

Below is a snapshot of common procedures and their approximate costs in Kerala compared to Western countries.

- Cardiac bypass surgery: ₹5.5 lakh (Kerala) vs $25,000 (USA)
- Knee replacement: ₹4.2 lakh (Kerala) vs $35,000 (USA)
- Dental implants (single): ₹35,000 (Kerala) vs $4,500 (USA)
- IVF cycle: ₹1.8 lakh (Kerala) vs $15,000 (USA)

## What's Included in a Medical Tourism Package

Most Kerala hospitals offer all-inclusive packages covering surgery, hospital stay, basic physiotherapy, airport transfers and an interpreter. Always confirm what is included before booking.

## Hidden Costs to Watch For

International patients should budget for visa fees, international flights, companion accommodation, and any extended recovery stay beyond the package duration.

## How to Get an Accurate Quote

The most reliable way to get pricing is to share your medical reports with a hospital's international patient desk, who will provide a personalised quote based on your specific condition.`,
      metaTitle: "Medical Tourism Kerala Cost Guide 2026 | Full Price Breakdown",
      metaDesc: "A complete guide to medical tourism costs in Kerala, comparing cardiac, orthopaedic, dental and fertility treatment prices vs the West.",
    },
    {
      slug: "ayurveda-treatment-packages-kerala-guide",
      title: "Ayurveda Treatment Packages in Kerala: A Beginner's Guide",
      excerpt:
        "A guide to choosing the right Ayurveda and Panchakarma package in Kerala, from short rejuvenation stays to full 21-day detox programs.",
      category: "Ayurveda",
      tags: ["ayurveda", "panchakarma", "wellness"],
      content: `## What Makes Kerala's Ayurveda Authentic

Kerala is widely regarded as the birthplace of authentic Panchakarma, with Ayurveda physicians trained through generations-old Gurukula traditions. Unlike spa-style wellness treatments found elsewhere, genuine Ayurveda packages in Kerala are physician-supervised and personalised to your body constitution (Prakriti).

## Types of Ayurveda Packages Available

### Short Rejuvenation (7-10 days)
Ideal for stress relief, sleep issues and general wellness, focusing on therapies like Abhyanga and Shirodhara.

### Panchakarma Detox (14-21 days)
A complete five-fold detoxification protocol recommended for chronic conditions, lifestyle disorders and deep rejuvenation.

### Specialised Programs
Weight management, fertility support and post-surgical recovery programs combine Ayurveda with modern medical insight.

## How to Choose the Right Duration

Physicians generally recommend a minimum of 14 days for any meaningful Panchakarma detox, as the body needs time to complete each phase of the therapy safely.

## What to Expect During Your Stay

Expect daily therapy sessions, a prescribed Satvic diet, yoga and meditation, with limited alcohol, caffeine and processed food throughout the program.`,
      metaTitle: "Ayurveda Treatment Packages Kerala | Beginner's Guide 2026",
      metaDesc: "A beginner's guide to choosing Ayurveda and Panchakarma packages in Kerala, covering durations, therapies and what to expect.",
    },
    {
      slug: "best-hospitals-kochi-international-patients",
      title: "Best Hospitals in Kochi for International Patients",
      excerpt:
        "A comparison of Kochi's top JCI and NABH accredited hospitals for international patients seeking cardiac, transplant and orthopaedic care.",
      category: "Hospitals",
      tags: ["kochi", "hospitals", "international patients"],
      content: `## Why Kochi is Kerala's Medical Tourism Hub

Kochi is home to several of Kerala's most advanced multi-speciality hospitals, many holding JCI accreditation alongside India's NABH certification. The city's international airport and well-developed hospitality sector also make it the most convenient base for treatment.

## Top Hospitals in Kochi

### Aster Medcity
A JCI-accredited quaternary care hospital purpose-built for international patients, with dedicated lounges, multilingual coordinators and a strong cardiac and transplant program.

### Amrita Institute of Medical Sciences
One of Kerala's largest hospitals, known for cardiology, oncology and organ transplant programs with academic-grade research backing.

### VPS Lakeshore Hospital
Renowned specifically for liver transplant and gastroenterology, attracting patients from across the GCC and Africa.

## What to Look for When Choosing a Hospital

Always verify accreditation (NABH/JCI), ask for the specific surgeon's experience with your condition, and request a written package quote covering the full duration of your stay.

## Getting There

Kochi's Cochin International Airport has direct connections to the Gulf, Southeast Asia and parts of Europe, making logistics straightforward for most international patients.`,
      metaTitle: "Best Hospitals in Kochi for International Patients 2026",
      metaDesc: "Compare the best JCI and NABH accredited hospitals in Kochi, Kerala for international patients seeking cardiac and transplant care.",
    },
    {
      slug: "knee-replacement-cost-india-vs-usa",
      title: "Knee Replacement Cost: India vs USA — A Detailed Comparison",
      excerpt:
        "A detailed cost and quality comparison of knee replacement surgery in India versus the United States for international patients.",
      category: "Cost Guides",
      tags: ["knee replacement", "cost comparison", "orthopaedics"],
      content: `## The Cost Gap Explained

Knee replacement surgery in the United States typically costs $30,000-$50,000 including hospital fees, while the same procedure in Kerala, India costs approximately ₹4-4.5 lakh (roughly $4,800-$5,400) — a saving of nearly 85-90%.

## Why is it So Much Cheaper in India?

Lower costs stem from lower hospital overheads, salary differences for medical staff, and a healthcare system not burdened by the same insurance and litigation costs seen in the US, while still using identical internationally certified implants.

## Quality and Implant Comparison

Kerala hospitals use the same implant brands — Zimmer Biomet, Stryker, DePuy Synthes — as US hospitals, and many orthopaedic surgeons have trained or held fellowships internationally.

## Recovery Timeline Comparison

Recovery protocols are similar in both countries: most patients begin walking within 24-48 hours and complete formal physiotherapy over 2-3 weeks, whether treated in Kerala or the US.

## Is It Worth Traveling for Knee Replacement?

For patients without insurance coverage or facing long wait times, travelling to Kerala for knee replacement can mean significant savings without compromising on implant quality or surgical expertise.`,
      metaTitle: "Knee Replacement Cost India vs USA | Detailed Comparison 2026",
      metaDesc: "A detailed comparison of knee replacement surgery costs in India vs the USA, covering implants, quality and recovery timelines.",
    },
    {
      slug: "panchakarma-21-day-detox-what-to-expect",
      title: "Panchakarma 21-Day Detox: What to Expect Week by Week",
      excerpt:
        "A week-by-week breakdown of what happens during an authentic 21-day Panchakarma detox program in Kerala.",
      category: "Ayurveda",
      tags: ["panchakarma", "detox", "21 day program"],
      content: `## Why 21 Days?

Authentic Panchakarma follows three distinct phases — Purva Karma (preparation), Pradhana Karma (main detox procedures) and Paschat Karma (rejuvenation) — each requiring adequate time to be effective and safe, which is why physicians recommend a minimum 21-day program for lasting results.

## Week 1: Preparation (Purva Karma)

The first week focuses on Snehana (oleation) and Swedana (steam therapy), preparing the body's tissues to release accumulated toxins safely.

## Week 2: Main Detoxification (Pradhana Karma)

This is when the core Panchakarma procedures — Vamana, Virechana or Basti — are administered based on your physician's assessment of your constitution and condition.

## Week 3: Rejuvenation (Paschat Karma)

The final week focuses on Rasayana (rejuvenation) therapies, herbal tonics, and a gradual reintroduction of normal diet, along with yoga and lifestyle coaching for sustaining results at home.

## What You'll Feel

Many patients report initial fatigue in week one as the body adjusts, followed by increased energy and mental clarity by week three as the detoxification completes.

## After You Return Home

Physicians typically provide a personalised diet and lifestyle plan to help maintain the benefits of the program for months after you return home.`,
      metaTitle: "Panchakarma 21 Day Detox: Week by Week Guide | Kerala",
      metaDesc: "A week-by-week guide to what happens during an authentic 21-day Panchakarma detox program in Kerala, from preparation to rejuvenation.",
    },
    {
      slug: "dental-implants-cost-india-vs-uk",
      title: "Dental Implants Cost: India vs UK — Is the Trip Worth It?",
      excerpt:
        "A detailed cost and quality comparison of dental implants in Kerala, India versus the UK, including travel costs and what to expect.",
      category: "Cost Guides",
      tags: ["dental implants", "cost comparison", "uk patients"],
      content: `## The Headline Numbers

A single dental implant in the UK typically costs £2,000-£3,000 (roughly ₹2.1-3.1 lakh), while the same implant in Kerala costs around ₹35,000 (roughly £330). For a full-mouth restoration involving 6-8 implants, UK private dental clinics often quote £15,000-£25,000, compared to roughly ₹2.5-3 lakh (£2,400-£2,900) in Kerala — even after adding flights and a week of accommodation.

## Why the Gap Is So Large

UK dental costs are inflated by clinic overheads, lab fees, and a shortage of NHS dental capacity that has pushed most implant work into the private sector. Kerala clinics use the same implant systems (Nobel Biocare, Straumann, Osstem) but operate with lower staff and facility costs, passing the saving directly to patients.

## What About Quality and Safety?

Kerala's dental prosthodontists are trained on the same implant systems used in the UK and often hold international fellowships. The key safety factor isn't the country — it's choosing a clinic with proper sterilisation protocols, 3D imaging for treatment planning, and a track record with international patients, which is why we only list NABH-recognised facilities on CARELET.

## Is It Worth the Trip for a Single Implant?

For a single implant, the savings (roughly £1,700-£2,700) may not fully offset a long-haul flight unless you're already travelling to Kerala for another reason. For full-mouth restorations or multiple implants, the maths strongly favours travelling, even accounting for flights and a week's stay.

## Planning the Trip

Most full-mouth implant cases can be completed in 6-7 days using immediate-load techniques, meaning a single trip is usually enough — you won't need to fly back and forth for separate procedure stages.`,
      metaTitle: "Dental Implants Cost India vs UK 2026 | Full Comparison",
      metaDesc: "Compare dental implant costs in Kerala, India vs the UK for single implants and full-mouth restorations, including travel cost breakeven.",
    },
    {
      slug: "ivf-cost-kerala-vs-usa-uk",
      title: "IVF Cost in Kerala vs USA and UK: A Realistic Budget Guide",
      excerpt:
        "What an IVF cycle really costs in Kerala compared to the USA and UK, including medication, multiple-cycle budgeting, and success rate context.",
      category: "Cost Guides",
      tags: ["ivf", "fertility", "cost comparison"],
      content: `## Single Cycle Cost Comparison

A single IVF cycle (stimulation, egg retrieval, fertilisation, embryo transfer) costs approximately ₹1.8 lakh (around $2,200) in Kerala, compared to $12,000-$20,000 in the USA and £5,000-£8,000 in the UK. These figures typically exclude medication in all three locations, so budget separately for stimulation drugs.

## Why Multiple-Cycle Budgeting Matters

IVF success rates per cycle are generally 40-50% for women under 35, meaning many patients need 2-3 cycles. At US prices, three cycles can exceed $40,000; at Kerala prices, the same three cycles cost roughly ₹5.4 lakh (around $6,500) — a difference that becomes more significant the more cycles are needed.

## Medication Costs Are Similar Globally

One nuance international patients often miss: stimulation medication (gonadotropins) is priced similarly worldwide since most are imported pharmaceutical products. The savings in Kerala come from the procedure, lab, and embryologist fees — not the drugs.

## Genetic Screening and Add-Ons

Advanced options like PGT-A genetic screening, ICSI, and blastocyst culture are available at Kerala fertility centres and typically add ₹40,000-₹80,000 to the base cycle cost — still well below equivalent add-on pricing in the US or UK.

## Practical Advice for Budgeting

Ask your fertility centre for a written quote that separates the base cycle fee, expected medication cost, and any genetic testing, so you can budget realistically for the possibility of more than one cycle before committing to travel.`,
      metaTitle: "IVF Cost in Kerala vs USA & UK 2026 | Realistic Budget Guide",
      metaDesc: "Compare IVF treatment costs in Kerala vs the USA and UK, with multi-cycle budgeting advice and a breakdown of medication and add-on costs.",
    },
    {
      slug: "hip-replacement-surgery-cost-comparison",
      title: "Hip Replacement Surgery Cost: Kerala vs USA vs UK",
      excerpt:
        "How much does hip replacement surgery cost in Kerala compared to the USA and UK, and what affects the final price.",
      category: "Cost Guides",
      tags: ["hip replacement", "orthopaedics", "cost comparison"],
      content: `## Typical Cost Ranges

Total hip replacement surgery in Kerala costs approximately ₹3.8-4.5 lakh (roughly $4,600-$5,400), compared to $30,000-$40,000 in the USA and £10,000-£14,000 in the UK private sector. The figure depends heavily on the implant brand and whether one or both hips need replacement.

## What Drives the Final Price

Three factors typically move the quote up or down: the implant brand (ceramic-on-ceramic implants cost more than metal-on-polyethylene), whether the procedure is minimally invasive, and the length of hospital stay, which is usually 5-7 days for a single hip.

## Implant Quality Is Not the Trade-Off

Kerala orthopaedic centres use the same internationally certified implant brands — Zimmer Biomet, Stryker, Smith+Nephew — used in US and UK hospitals. The cost difference comes from hospital overheads and surgeon fee structures, not from using cheaper or older-generation implants.

## Recovery Timeline

Most patients begin walking with a frame within 24-48 hours and progress to a cane by week two. Surgeons typically clear international patients to fly home 10-14 days after surgery, once wound healing and mobility milestones are met.

## Bilateral Hip Replacement

If both hips need replacement, doing them in a single trip (either simultaneously or staged a few days apart) is common in Kerala and avoids the cost and disruption of two separate international trips.`,
      metaTitle: "Hip Replacement Cost Kerala vs USA & UK | 2026 Comparison",
      metaDesc: "Compare hip replacement surgery costs in Kerala vs the USA and UK, covering implant brands, recovery timeline and bilateral surgery options.",
    },
    {
      slug: "cancer-treatment-cost-kerala-vs-west",
      title: "Cancer Treatment Cost in Kerala vs the West: What to Expect",
      excerpt:
        "A realistic look at cancer treatment costs in Kerala compared to the USA and UK, and why pricing varies so much by cancer type and stage.",
      category: "Cost Guides",
      tags: ["cancer treatment", "oncology", "cost comparison"],
      content: `## Why Cancer Costs Are Harder to Quote Upfront

Unlike a single surgery, cancer treatment cost depends on cancer type, stage, and protocol (surgery, chemotherapy, radiation, or a combination), so any number you see online is a rough average. As a baseline, a full treatment protocol in Kerala averages around ₹4 lakh (roughly $4,800), compared to $150,000+ in the USA and £45,000+ in the UK private sector for comparable care.

## What's Usually Included

A typical oncology quote from a Kerala hospital covers the diagnostic workup, the primary treatment (surgery and/or a chemotherapy course), and routine follow-up scans, but extended chemotherapy regimens spanning several months will add to the base estimate.

## Why You Need Your Reports Reviewed First

Because pricing depends so heavily on stage and protocol, the only reliable way to get an accurate number is to have a hospital's tumour board review your biopsy and imaging reports. CARELET's quote request system is built for exactly this — upload your reports once and receive case-specific estimates rather than generic averages.

## Targeted Therapy and Immunotherapy Access

Major Kerala cancer centres, including Amrita Institute, offer access to globally approved targeted therapy and immunotherapy drugs, though these add significantly to cost regardless of country — patients on these protocols should expect closer to Western pricing for the drug component specifically.

## Planning for an Extended Stay

Unlike a single surgery trip, cancer treatment may require multiple visits or an extended stay of several weeks to months. Discuss a realistic timeline with your oncology team before booking travel and accommodation.`,
      metaTitle: "Cancer Treatment Cost in Kerala vs USA & UK | 2026 Guide",
      metaDesc: "Understand realistic cancer treatment costs in Kerala compared to the USA and UK, and why getting a personalised quote matters more than averages.",
    },
    {
      slug: "cataract-surgery-cost-kerala-vs-uk-usa",
      title: "Cataract Surgery Cost: Kerala vs UK vs USA",
      excerpt:
        "Compare cataract surgery costs in Kerala against the UK and USA, including premium lens options and same-day discharge details.",
      category: "Cost Guides",
      tags: ["cataract surgery", "ophthalmology", "cost comparison"],
      content: `## Cost at a Glance

Cataract surgery with a standard monofocal lens costs around ₹45,000 per eye in Kerala (roughly $540), compared to $3,500-$5,000 in the USA and £2,500-£3,500 in the UK private sector. Premium multifocal or toric lenses add a similar percentage on top in all three countries.

## Lens Options Explained

Standard monofocal lenses correct vision at one distance, usually requiring reading glasses afterward. Multifocal lenses reduce dependence on glasses entirely but cost more. Toric lenses correct astigmatism. Kerala ophthalmology centres stock all three categories from the same international lens manufacturers used in the West.

## Same-Day, In-and-Out Procedure

Cataract surgery is one of the fastest procedures to travel for: it takes 15-20 minutes per eye under topical anaesthesia, with patients discharged the same day. Many international patients combine it with a short Kerala holiday during recovery.

## Doing Both Eyes in One Trip

Surgeons typically treat the second eye a few days after the first, once the initial eye is stable. This means a single 4-5 day trip is usually enough to treat both eyes rather than requiring two separate visits.

## What to Budget For Beyond the Surgery

Beyond the procedure itself, budget for post-op eye drops (usually a 4-6 week course) and a follow-up consultation before flying home to confirm healing is on track.`,
      metaTitle: "Cataract Surgery Cost Kerala vs UK & USA | 2026 Comparison",
      metaDesc: "Compare cataract surgery costs in Kerala vs the UK and USA, covering lens options, same-day discharge and bilateral treatment planning.",
    },
    {
      slug: "uae-patient-guide-medical-treatment-kerala",
      title: "UAE Patient's Guide to Medical Treatment in Kerala",
      excerpt:
        "Everything patients travelling from the UAE need to know about visas, flights, costs and choosing a hospital in Kerala.",
      category: "Country Guides",
      tags: ["uae", "country guide", "medical tourism"],
      content: `## Why Kerala Is a Popular Choice for UAE Patients

Kerala is roughly a 4-hour direct flight from Dubai or Abu Dhabi, shares strong historical trade and travel links with the Gulf, and offers costs 60-80% lower than UAE private hospitals for major procedures, while maintaining JCI and NABH accredited care.

## Visa Requirements

UAE residents (of any nationality) and UAE/GCC nationals can typically apply for India's e-Medical Visa online, which permits up to 60 days in-country with two extensions. You will need a letter from your chosen Kerala hospital confirming your treatment dates as part of the application.

## Flight and Logistics

Direct flights connect Dubai, Abu Dhabi, and Sharjah to Kochi (Cochin International Airport) in under 4 hours, making same-day arrival and hospital admission realistic for most procedures. Most hospitals offer complimentary airport pickup for confirmed patients.

## Typical Cost Savings for UAE Patients

A cardiac bypass that costs AED 90,000-150,000+ in a UAE private hospital typically costs the equivalent of AED 24,000-27,000 in Kerala. Dental and orthopaedic procedures show similarly large gaps, which is why these are the most common reasons UAE patients travel.

## Language and Cultural Comfort

Many Kerala hospitals have Arabic-speaking coordinators or interpreters, halal food options in hospital cafeterias, and prayer facilities, recognising the volume of Gulf patients they serve each year.`,
      metaTitle: "UAE Patient Guide to Medical Treatment in Kerala | 2026",
      metaDesc: "A complete guide for UAE patients travelling to Kerala for medical treatment, covering visas, flights, costs and hospital language support.",
    },
    {
      slug: "saudi-arabia-medical-tourism-kerala-guide",
      title: "Medical Tourism Guide for Saudi Arabian Patients Visiting Kerala",
      excerpt:
        "A practical guide for patients from Saudi Arabia considering medical treatment in Kerala, India.",
      category: "Country Guides",
      tags: ["saudi arabia", "country guide", "medical tourism"],
      content: `## Why Saudi Patients Choose Kerala

Saudi Arabia has a large medical tourism outflow, traditionally toward Europe and the US, but rising costs and visa friction in Western countries have pushed many patients toward Kerala, where costs are dramatically lower and several hospitals have decades of experience treating Gulf patients.

## Visa and Travel Documentation

Saudi nationals and residents can apply for India's e-Medical Visa online ahead of travel. Processing typically takes a few business days, so apply as soon as your treatment dates are confirmed by the hospital, and keep both digital and printed copies of your hospital invitation letter.

## Flight Connectivity

Direct and one-stop flights connect Riyadh and Jeddah to Kochi in roughly 4-5 hours, with several Gulf carriers operating regular routes, making logistics straightforward even for patients travelling with a companion.

## Cost Comparison for Common Procedures

Cardiac and orthopaedic procedures that cost SAR 80,000-150,000+ in Saudi private hospitals typically run SAR 20,000-25,000 equivalent in Kerala, and IVF cycles costing SAR 20,000+ in Saudi private clinics cost roughly SAR 9,000 equivalent in Kerala.

## What Saudi Patients Often Ask About

Common questions include halal food availability (offered at all major hospitals listed on CARELET), prayer facilities (available at all listed hospitals), and whether female patients can request female doctors or attendants, which most hospitals can accommodate with advance notice.`,
      metaTitle: "Saudi Arabia Medical Tourism Guide to Kerala | 2026",
      metaDesc: "A guide for Saudi Arabian patients travelling to Kerala for medical treatment, covering visas, flights, costs and cultural accommodations.",
    },
    {
      slug: "oman-to-kerala-medical-travel-guide",
      title: "Oman to Kerala: A Complete Medical Travel Guide",
      excerpt:
        "Practical advice for patients travelling from Oman to Kerala for affordable, accredited medical treatment.",
      category: "Country Guides",
      tags: ["oman", "country guide", "medical tourism"],
      content: `## A Long-Standing Travel Route

Oman has deep historical trade links with Kerala, and the Muscat-Kochi flight route is one of the busiest in the region, making Kerala a natural and culturally familiar choice for Omani patients seeking treatment abroad.

## Visa Process for Omani Patients

Omani nationals and residents can apply online for India's e-Medical Visa, which requires a hospital invitation letter confirming your treatment dates. Processing is usually completed within a few business days when the application is complete.

## Direct Flight Access

Direct flights from Muscat to Kochi take under 3 hours, making Kerala one of the most logistically convenient international medical destinations available to Omani patients, even for short-notice consultations or follow-up visits.

## Cost Comparison

Procedures like knee replacement, which can cost OMR 8,000-12,000+ in Omani private hospitals, typically cost the equivalent of OMR 1,500-1,700 in Kerala — savings that make a meaningful difference for elective procedures not covered by insurance.

## Combining Treatment with Recovery

Many Omani patients combine a medical procedure in Kochi with a recovery stay at an Ayurveda wellness resort in Munnar, taking advantage of the short distance between Kerala's medical and wellness hubs to recover in a calmer environment before flying home.`,
      metaTitle: "Oman to Kerala Medical Travel Guide | 2026",
      metaDesc: "A complete guide for patients travelling from Oman to Kerala for medical treatment, covering visas, flights, costs and recovery options.",
    },
    {
      slug: "nigeria-to-india-medical-trip-kerala",
      title: "Nigeria to India: Planning Your Medical Trip to Kerala",
      excerpt:
        "A step-by-step guide for Nigerian patients planning medical treatment in Kerala, covering visas, costs and what to expect.",
      category: "Country Guides",
      tags: ["nigeria", "country guide", "medical tourism"],
      content: `## Why Nigerian Patients Travel to Kerala

India is one of the most established medical tourism destinations for Nigerian patients, and Kerala specifically stands out for its combination of JCI/NABH accredited hospitals, English-speaking doctors, and costs significantly below Indian metro cities like Mumbai or Delhi for comparable quality.

## Visa Requirements for Nigerian Patients

Nigerian nationals typically need to apply for a medical visa through an Indian visa application centre rather than the e-Visa route available to some other nationalities — check current eligibility before booking flights, and apply well in advance, as processing can take longer than the e-Visa process.

## Flight Routing

Most Nigerian patients fly via a Gulf hub (Dubai, Doha, or Abu Dhabi) or via Addis Ababa to reach Kochi or Thiruvananthapuram, typically totalling 12-16 hours of travel time including a layover.

## Cost Comparison

Treatments like cardiac surgery or cancer care that would cost the Naira equivalent of several million in private Nigerian hospitals, or require travel to more expensive destinations like the UK or India's metro cities, often cost 50-70% less in Kerala while maintaining comparable accreditation standards.

## Practical Tips for First-Time Travellers

Bring printed copies of all medical reports and your visa documents, confirm your hospital's airport pickup arrangement in writing before departure, and budget for a companion's costs if travelling with an attendant, as most packages only cover the patient unless specified.`,
      metaTitle: "Nigeria to India Medical Trip Guide: Kerala | 2026",
      metaDesc: "A step-by-step guide for Nigerian patients planning medical treatment in Kerala, India, covering visas, flights, and cost comparisons.",
    },
    {
      slug: "uk-patients-guide-affordable-surgery-kerala",
      title: "UK Patients' Guide to Affordable Surgery in Kerala",
      excerpt:
        "Why UK patients facing NHS waiting lists are increasingly considering Kerala for surgery, and what to know before booking.",
      category: "Country Guides",
      tags: ["uk", "country guide", "nhs waiting lists"],
      content: `## The NHS Waiting List Problem

Many UK patients face waits of 12-18 months or longer for elective procedures like knee and hip replacement on the NHS, and private treatment in the UK can cost £10,000-£15,000 or more — pushing increasing numbers of patients to consider treatment abroad.

## How Kerala Compares on Cost

A knee replacement costing £10,000-£14,000 privately in the UK costs roughly £4,000-£4,500 equivalent in Kerala, including hospital stay and physiotherapy — savings that can fund the flight, accommodation, and still leave a significant balance.

## Accreditation UK Patients Should Look For

UK patients should specifically look for NABH (India's national accreditation) or JCI (the international gold standard) certification, both of which several Kerala hospitals hold, ensuring clinical governance standards comparable to UK private hospitals.

## Visa Process for UK Citizens

UK passport holders are eligible for India's e-Medical Visa, applied for entirely online, typically processed within a few business days once you have a hospital invitation letter confirming treatment dates.

## What to Discuss with Your GP First

Before travelling, discuss your case with your GP or current consultant and bring a full set of imaging and reports — this gives your Kerala surgical team everything needed to confirm suitability and pricing before you commit to travel, and gives your GP visibility for aftercare once you return home.`,
      metaTitle: "UK Patients Guide to Affordable Surgery in Kerala | 2026",
      metaDesc: "Why UK patients are choosing Kerala for surgery over NHS waiting lists, with cost comparisons, visa process and accreditation guidance.",
    },
    {
      slug: "how-to-choose-hospital-cardiac-surgery-kerala",
      title: "How to Choose the Right Hospital for Cardiac Surgery in Kerala",
      excerpt:
        "A practical checklist for international patients choosing where to have cardiac surgery in Kerala.",
      category: "Hospitals",
      tags: ["cardiac surgery", "choosing a hospital", "kerala"],
      content: `## Start With Accreditation

The first filter should always be accreditation — look for NABH at minimum, and JCI if you want the closest equivalent to Western hospital governance standards. Both Aster Medcity and Amrita Institute in Kochi hold strong accreditation track records for cardiac care.

## Check the Surgeon's Specific Experience

Accreditation covers the hospital; it doesn't tell you about your specific surgeon's experience with your exact procedure. Ask directly how many cases of your specific procedure (e.g. off-pump CABG, valve repair) the surgeon performs annually — a high-volume surgeon generally means more consistent outcomes.

## Ask About ICU and Post-Op Protocols

Cardiac surgery recovery depends heavily on ICU quality, not just the surgery itself. Ask about ICU nurse-to-patient ratios, on-site cardiac rehabilitation, and how quickly physiotherapy begins after surgery.

## International Patient Support Matters More Than You Think

A hospital that handles international patients well will have a dedicated coordinator, transparent package pricing in writing, and a clear plan for managing complications if your stay needs to extend — ask about this before booking, not after you arrive.

## Get a Written, Itemised Quote

Before committing to travel, get a written quote that separates surgeon fees, hospital stay, ICU days, and physiotherapy, so you understand exactly what happens if your case turns out more complex than initially assessed.`,
      metaTitle: "How to Choose a Hospital for Cardiac Surgery in Kerala | 2026",
      metaDesc: "A practical checklist for choosing the right hospital for cardiac surgery in Kerala, covering accreditation, surgeon experience and ICU quality.",
    },
    {
      slug: "spine-surgery-kerala-international-patients",
      title: "Spine Surgery in Kerala: What International Patients Should Know",
      excerpt:
        "A guide to spine surgery options, costs, and recovery for international patients considering treatment in Kerala.",
      category: "Hospitals",
      tags: ["spine surgery", "orthopaedics", "kerala"],
      content: `## Conditions Commonly Treated

Kerala's spine surgery centres, including KIMS Trivandrum, treat herniated discs, spinal stenosis, scoliosis, spondylolisthesis, and vertebral fractures, using both traditional open techniques and minimally invasive endoscopic approaches depending on the case.

## Minimally Invasive vs Open Surgery

Many cases that previously required open surgery can now be treated endoscopically through a small incision, reducing blood loss, scarring, and recovery time. Ask your surgeon directly whether your specific condition is a candidate for a minimally invasive approach.

## Realistic Cost Expectations

Spine surgery in Kerala costs approximately ₹4.8 lakh on average (roughly $5,800), compared to $80,000+ in the USA and £22,000+ in the UK — though complex multi-level fusions will cost more than a single-level discectomy.

## Recovery and Hospital Stay

Hospital stay typically runs 5-7 days depending on the procedure's complexity, with structured physiotherapy starting within days of surgery to support safe, gradual mobilisation. Most international patients are cleared to fly 10-14 days post-surgery.

## Questions to Ask Before Booking

Ask specifically whether your surgeon regularly performs your exact procedure (not just "spine surgery" generally), what imaging they need before confirming a quote, and what the physiotherapy plan looks like for the weeks after you return home.`,
      metaTitle: "Spine Surgery in Kerala: International Patient Guide | 2026",
      metaDesc: "What international patients should know about spine surgery in Kerala, including minimally invasive options, costs and recovery timelines.",
    },
    {
      slug: "ivf-success-rates-kerala-what-to-expect",
      title: "IVF Success Rates in Kerala: What to Expect",
      excerpt:
        "An honest look at IVF success rates at Kerala fertility centres and the factors that influence your individual chances.",
      category: "Hospitals",
      tags: ["ivf", "fertility", "success rates"],
      content: `## Typical Success Rate Ranges

Leading Kerala fertility centres, including Aster Medcity's fertility unit, report IVF success rates of roughly 40-50% per cycle for women under 35, declining progressively with age — figures broadly comparable to leading clinics in the US, UK, and Europe.

## Age Is the Single Biggest Factor

Across every country, age affects IVF success more than any other single variable. Success rates for women over 40 using their own eggs typically drop to 10-20% per cycle, which is why fertility specialists often discuss donor egg or embryo options for older patients.

## What Affects Success Beyond Age

Embryo quality, uterine receptivity, sperm quality, and underlying conditions like endometriosis or PCOS all influence outcomes. A thorough diagnostic workup before starting a cycle — rather than proceeding straight to treatment — improves the odds of a successful outcome.

## Genetic Screening's Role

PGT-A (genetic screening of embryos before transfer) is available at major Kerala fertility centres and can improve success rates per transfer for some patient groups, particularly those with a history of recurrent miscarriage, by helping select embryos with the correct chromosome count.

## Setting Realistic Expectations

Ask your fertility specialist for success rate data specific to your age group and diagnosis, not just the clinic's overall average — a clinic-wide success rate can be misleading if it blends very different patient profiles.`,
      metaTitle: "IVF Success Rates in Kerala: What to Expect | 2026",
      metaDesc: "An honest guide to IVF success rates at Kerala fertility centres, covering age factors, genetic screening and how to set realistic expectations.",
    },
    {
      slug: "bariatric-weight-loss-surgery-kerala-guide",
      title: "Bariatric (Weight Loss) Surgery in Kerala: A Complete Guide",
      excerpt:
        "What international patients should know about bariatric surgery options, costs, and eligibility in Kerala.",
      category: "Hospitals",
      tags: ["bariatric surgery", "weight loss surgery", "kerala"],
      content: `## Common Procedures Available

Kerala's bariatric centres offer gastric sleeve, gastric bypass, and mini gastric bypass procedures, performed laparoscopically in most cases, which reduces recovery time compared to open surgery.

## Who Typically Qualifies

Bariatric surgery is generally recommended for patients with a BMI over 35-40, or over 30 with obesity-related conditions like type 2 diabetes or sleep apnoea. A pre-surgical evaluation, including blood work and sometimes a psychological assessment, is standard practice before any procedure is approved.

## Cost Comparison

Gastric sleeve surgery in Kerala costs approximately ₹2.5-3.5 lakh (roughly $3,000-$4,200), compared to $15,000-$20,000+ in the USA and £8,000-£10,000+ in the UK private sector for the same procedure.

## Recovery and Lifestyle Change

Hospital stay is typically 3-5 days, with most patients resuming light activity within two weeks. Long-term success depends heavily on post-surgical dietary changes and follow-up — ask whether your chosen centre offers structured nutritional support after you return home.

## What to Ask Before Booking

Confirm whether the quoted price includes the pre-surgical evaluation and at least one follow-up consultation, and ask how the centre handles remote follow-up for international patients in the months after surgery.`,
      metaTitle: "Bariatric Surgery in Kerala: Complete Guide | 2026",
      metaDesc: "A complete guide to bariatric (weight loss) surgery in Kerala for international patients, covering procedures, eligibility, cost and recovery.",
    },
    {
      slug: "organ-transplant-kerala-international-patients",
      title: "Organ Transplant in Kerala: A Guide for International Patients",
      excerpt:
        "What international patients need to know about liver and kidney transplant programs in Kerala, including legal and logistical considerations.",
      category: "Hospitals",
      tags: ["organ transplant", "liver transplant", "kerala"],
      content: `## Kerala's Transplant Centres

VPS Lakeshore Hospital in Kochi is recognised specifically for its liver transplant program, with outcomes reported to be comparable to established international transplant centres, supported by a dedicated hepatology and surgical gastroenterology team.

## Living Donor vs Deceased Donor Transplants

India's transplant programs are heavily weighted toward living donor transplants (where a family member donates part of their liver or one kidney), as deceased donor organ availability for international patients is highly restricted by law and ethical guidelines.

## Legal Requirements for International Patients

India's transplant regulations require documented proof of the donor-recipient relationship for living donor transplants involving foreign nationals, reviewed by a government-authorised committee before surgery is approved — this process takes time, so begin it as early as possible.

## What the Process Typically Involves

Expect an initial remote review of medical reports, a donor compatibility workup once you arrive, government authorisation review, the transplant surgery itself, and an extended post-operative stay of several weeks for both donor and recipient before discharge.

## Plan for an Extended Stay

Unlike most procedures on CARELET, transplant surgery requires weeks rather than days in Kerala, covering pre-transplant workup, the surgery, and a recovery period before either donor or recipient is fit to fly. Discuss a realistic full timeline with the transplant team before finalising travel plans.`,
      metaTitle: "Organ Transplant in Kerala: International Patient Guide | 2026",
      metaDesc: "A guide for international patients considering liver or kidney transplant in Kerala, covering legal requirements, donor rules and timelines.",
    },
    {
      slug: "ayurveda-vs-western-medicine-when-to-choose",
      title: "Ayurveda vs Western Medicine: When to Choose What",
      excerpt:
        "A balanced look at when Ayurveda is a good complementary or alternative choice, and when Western medicine is essential.",
      category: "Ayurveda",
      tags: ["ayurveda", "western medicine", "wellness"],
      content: `## They Are Not Always Either-Or

Many CARELET patients combine both — for example, having cardiac surgery in Kochi followed by an Ayurvedic rejuvenation program in Munnar. Understanding what each system is suited for helps you make better decisions about your own care.

## Where Western Medicine Is Essential

Acute conditions, infections, trauma, surgical emergencies, and most cancers require Western medical intervention — these are not areas where Ayurveda is a substitute, and any credible Ayurveda physician will say so directly.

## Where Ayurveda Often Adds Value

Chronic conditions like joint pain, stress, digestive disorders, and general fatigue, along with post-surgical recovery and rejuvenation, are areas where Ayurveda's holistic, lifestyle-based approach is frequently used alongside or after Western treatment.

## The Importance of a Genuine Diagnosis Either Way

Just as you wouldn't accept a vague Western diagnosis, a genuine Ayurveda physician (BAMS or MD Ayurveda qualified) will assess your specific body constitution (Prakriti) and condition before recommending a program — be wary of generic "detox" packages that skip this step.

## Always Disclose Both to Your Providers

If you're combining treatments, tell your Western doctors about any Ayurvedic herbs or therapies you're using, and tell your Ayurveda physician about your medical history and current medications — some herbal preparations can interact with prescription drugs.`,
      metaTitle: "Ayurveda vs Western Medicine: When to Choose What | 2026",
      metaDesc: "A balanced guide to when Ayurveda complements or differs from Western medicine, and how to safely combine both approaches to care.",
    },
    {
      slug: "yoga-ayurveda-retreats-kerala-beginners-guide",
      title: "Yoga and Ayurveda Retreats in Kerala: A Beginner's Guide",
      excerpt:
        "New to wellness retreats? Here's what to expect from a yoga and Ayurveda retreat in Kerala, and how to choose the right one.",
      category: "Ayurveda",
      tags: ["yoga", "ayurveda retreat", "wellness"],
      content: `## What a Typical Day Looks Like

Most retreats follow a structured daily rhythm: an early morning yoga or pranayama session, a Satvic breakfast, an Ayurvedic therapy session (such as Abhyanga oil massage), a rest period, an afternoon activity or consultation, and an early, light dinner — all designed around Ayurveda's emphasis on routine.

## How to Choose Between a Short Stay and a Full Program

Beginners often start with a 5-7 day rejuvenation retreat to experience the rhythm without committing to a full Panchakarma detox, which typically requires 14-21 days to be done safely and effectively.

## What to Pack

Loose, comfortable clothing, a yoga mat if you have a preferred one (most retreats provide one), minimal makeup or skincare products (you'll be advised to avoid synthetic products during treatments), and an open mind about dietary restrictions, as most retreats serve a vegetarian Satvic diet throughout your stay.

## Questions to Ask Before Booking

Ask whether a registered Ayurveda physician (not just a wellness therapist) will assess you on arrival, what qualifications your yoga instructor holds, and whether the retreat is licensed by Kerala Tourism or an equivalent body.

## Setting Realistic Expectations

A short retreat is genuinely restorative but won't produce the deeper physiological changes of a full Panchakarma program — go in expecting relaxation and a reset, and treat anything beyond that as a welcome bonus rather than the goal.`,
      metaTitle: "Yoga and Ayurveda Retreats in Kerala: Beginner's Guide | 2026",
      metaDesc: "A beginner's guide to yoga and Ayurveda retreats in Kerala, covering daily routines, what to pack and how to choose the right program length.",
    },
    {
      slug: "post-surgery-recovery-ayurveda-kerala",
      title: "Post-Surgery Recovery with Ayurveda in Kerala",
      excerpt:
        "How patients combine Western surgery with Ayurvedic recovery programs in Kerala, and what's actually appropriate post-surgery.",
      category: "Ayurveda",
      tags: ["post-surgery recovery", "ayurveda", "rehabilitation"],
      content: `## Why Patients Combine the Two

A growing number of CARELET patients have surgery in Kochi and then transfer to an Ayurveda wellness resort in Munnar for a gentler recovery period, valuing the calmer environment and supportive therapies over recovering in a hotel room alone.

## What's Appropriate Immediately After Surgery

Immediately post-surgery, therapies are kept gentle and are chosen specifically by an Ayurveda physician in consultation with your surgical team — vigorous massage, steam therapy, or any Panchakarma procedure is generally inappropriate until your surgeon confirms you're sufficiently healed.

## Diet's Role in Recovery

Ayurvedic post-surgical diet plans typically emphasise easily digestible, warm, freshly prepared food, which supports general healing regardless of which medical tradition you follow — this is often the most universally beneficial part of a combined recovery program.

## Coordination Between Your Surgical and Ayurveda Teams

The single most important factor in safely combining the two is communication — your Ayurveda physician should have your surgical notes and a clear understanding of your recovery stage before recommending any therapy.

## When to Skip the Ayurveda Add-On

If your surgery involved significant blood loss, ongoing wound care, or complications, prioritise stabilising fully under your surgical team's care before considering any wellness program — recovery quality matters more than the original travel plan.`,
      metaTitle: "Post-Surgery Recovery with Ayurveda in Kerala | 2026",
      metaDesc: "How patients combine Western surgery with Ayurvedic recovery in Kerala, including what's appropriate post-surgery and how to coordinate care.",
    },
    {
      slug: "india-medical-visa-guide-gulf-patients",
      title: "Complete Guide to India's Medical Visa for Gulf Patients",
      excerpt:
        "A step-by-step guide to applying for India's e-Medical Visa for patients travelling from the UAE, Saudi Arabia, Oman, Qatar, Kuwait and Bahrain.",
      category: "Visa & Travel",
      tags: ["medical visa", "gulf patients", "india visa"],
      content: `## What the e-Medical Visa Covers

India's e-Medical Visa is designed specifically for patients seeking treatment, valid for up to 60 days from arrival with the option of two extensions if treatment runs longer than expected, and allows one or two e-Medical Attendant visas for accompanying family members.

## Documents You'll Need

You'll typically need a hospital invitation letter confirming your treatment dates, a passport with at least 6 months validity, a recent passport-style photo, and proof of sufficient funds to cover your stay — your hospital's international patient desk can usually provide a template invitation letter.

## Step-by-Step Application Process

Apply online through India's official e-Visa portal, upload your documents, pay the visa fee, and you'll typically receive an approval (or request for more information) within a few business days — apply at least 2-3 weeks before your planned travel date to allow buffer time.

## Common Reasons Applications Get Delayed

The most common delays come from an incomplete or unclear hospital invitation letter, photos that don't meet the size/background requirements, or passport validity that's too close to expiry — double-check all three before submitting.

## What Happens If Your Treatment Extends

If your treatment takes longer than expected, your hospital can issue an updated letter supporting a visa extension application at the local Foreigners Regional Registration Office (FRRO) — start this process before your current visa expires, not after.`,
      metaTitle: "India Medical Visa Guide for Gulf Patients | 2026",
      metaDesc: "A step-by-step guide to India's e-Medical Visa for patients from the UAE, Saudi Arabia, Oman, Qatar, Kuwait and Bahrain, including required documents.",
    },
    {
      slug: "first-time-medical-travel-kerala-what-to-pack",
      title: "What to Pack and Expect: A First-Time Guide to Medical Travel in Kerala",
      excerpt:
        "A practical packing and preparation checklist for first-time medical travellers heading to Kerala for treatment.",
      category: "Visa & Travel",
      tags: ["first time travel", "packing list", "kerala"],
      content: `## Documents to Pack (and Duplicate)

Bring printed and digital copies of your passport, visa approval, hospital invitation letter, all medical reports and imaging, current medication list, and travel insurance details — keep one set in your carry-on and a digital backup in cloud storage in case anything is lost.

## Medical Reports: Bring More Than You Think You Need

Pack every relevant report, scan, and test result, even ones that seem minor — your Kerala medical team has not seen your history before, and having more documentation upfront avoids delays or repeat testing on arrival.

## Practical Items for Your Stay

Loose, comfortable clothing (especially for post-surgical mobility), any personal toiletries you specifically prefer (hospitals provide basics but not your usual brands), a phone charger with an India-compatible plug adapter, and a small amount of Indian Rupees in cash for incidentals.

## What Hospitals Usually Provide

Most hospitals listed on CARELET include airport pickup, basic toiletries, hospital meals (often with international patient menu options), and Wi-Fi — confirm specifics with your coordinator so you don't over-pack.

## Climate and Comfort Considerations

Kerala is tropical and humid year-round, with a monsoon season roughly June-September — pack breathable fabrics regardless of when you travel, and bring a light raincoat or umbrella if visiting during monsoon months.`,
      metaTitle: "First-Time Medical Travel to Kerala: Packing Guide | 2026",
      metaDesc: "A practical packing and preparation checklist for first-time medical travellers visiting Kerala, covering documents, essentials and climate tips.",
    },
  ];

  for (const b of blogData) {
    await prisma.blogPost.create({
      data: { ...b, tags: JSON.stringify(b.tags) },
    });
  }

  // ---------- Reviews ----------
  const reviewData = [
    {
      name: "Mohammed Al-Saud",
      country: "Saudi Arabia",
      treatment: "Cardiac Bypass Surgery",
      rating: 5,
      quote:
        "The cardiac team at Aster Medcity took care of me like family. The cost was a fraction of what I would have paid back home, and the quality of care exceeded my expectations.",
    },
    {
      name: "Sarah Williams",
      country: "United Kingdom",
      treatment: "Knee Replacement",
      rating: 5,
      quote:
        "I was walking again within two days of my knee replacement. The physiotherapy team was excellent, and I got to enjoy Kerala's backwaters during recovery.",
    },
    {
      name: "Amara Okafor",
      country: "Nigeria",
      treatment: "Panchakarma Detox",
      rating: 5,
      quote:
        "My 21-day Panchakarma program in Munnar completely transformed my health. The physicians were knowledgeable and the setting was incredibly peaceful.",
    },
    {
      name: "Fatima Al-Mansoori",
      country: "UAE",
      treatment: "IVF Treatment",
      rating: 5,
      quote:
        "After years of trying, the fertility team in Kochi gave us so much hope and clear answers at every step. We are forever grateful for their care.",
    },
    {
      name: "James Mwangi",
      country: "Kenya",
      treatment: "Dental Implants",
      rating: 4,
      quote:
        "Excellent dental work at a fraction of the cost back home. The whole trip was well coordinated, from the airport pickup to the follow-up calls.",
    },
  ];

  for (const r of reviewData) {
    await prisma.review.create({ data: { ...r, status: "approved" } });
  }

  console.log("Seed complete:", {
    hospitals: hospitals.length,
    doctors: doctors.length,
    packages: packageData.length,
    treatments: treatmentData.length,
    blogPosts: blogData.length,
    reviews: reviewData.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
