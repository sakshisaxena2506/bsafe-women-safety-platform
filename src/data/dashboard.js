export const dashboardStats = [
  { label: "Active alerts", value: "07", detail: "2 critical right now" },
  { label: "Avg response", value: "02:34", detail: "City-wide today" },
  { label: "Verified volunteers", value: "248", detail: "81 currently online" },
  { label: "Safe zones", value: "36", detail: "Near major routes" }
];

export const landingStats = [
  { label: "Registered users", value: "12K+" },
  { label: "Verified responders", value: "248" },
  { label: "Avg response time", value: "2.5m" },
  { label: "Safe zones mapped", value: "36" }
];

export const testimonials = [
  {
    name: "Ritika S.",
    role: "Student",
    quote: "bSafe made late evening travel feel more controlled because my contacts could follow my live route."
  },
  {
    name: "Neha P.",
    role: "Working professional",
    quote: "The SOS workflow is simple and quick. I did not have to search for numbers during a stressful moment."
  },
  {
    name: "Aditi M.",
    role: "Community volunteer",
    quote: "The responder dashboard gives clear details without exposing more personal information than needed."
  }
];

export const faqs = [
  {
    question: "Does bSafe directly call the police?",
    answer: "Phase 1 is designed for verified volunteer, support team, trusted contact, and admin coordination. Police integration can be added in a later phase."
  },
  {
    question: "Can this work as a mobile app later?",
    answer: "Yes. The frontend is structured so the same modules can later be moved into a native or hybrid mobile app."
  },
  {
    question: "Is location sharing always active?",
    answer: "No. The current product design starts live location sharing during active emergency workflows or when the user explicitly enables it."
  }
];
