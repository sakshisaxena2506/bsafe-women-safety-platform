export const alerts = [
  {
    id: "ALT-9811",
    userId: "USR-2048",
    createdAt: "2026-06-17T14:05:00+05:30",
    status: "active",
    severity: "critical",
    location: "Koramangala 5th Block, Bengaluru",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    responder: "Asha K.",
    description: "User triggered SOS while returning from office."
  },
  {
    id: "ALT-9740",
    userId: "USR-1832",
    createdAt: "2026-06-16T21:42:00+05:30",
    status: "resolved",
    severity: "medium",
    location: "Indiranagar Metro Station",
    coordinates: { lat: 12.9784, lng: 77.6408 },
    responder: "Safe Transit Team",
    description: "Late evening route assistance requested."
  },
  {
    id: "ALT-9662",
    userId: "USR-1550",
    createdAt: "2026-06-15T19:15:00+05:30",
    status: "assigned",
    severity: "high",
    location: "HSR Layout Sector 2",
    coordinates: { lat: 12.9116, lng: 77.6389 },
    responder: "Maya V.",
    description: "User reported being followed near a bus stop."
  }
];

export const alertTimeline = [
  {
    id: "step-1",
    title: "Alert created",
    description: "SOS request generated with user profile and emergency note.",
    time: "14:05"
  },
  {
    id: "step-2",
    title: "Location shared",
    description: "Live coordinates shared with trusted contacts and verified responders.",
    time: "14:05"
  },
  {
    id: "step-3",
    title: "Volunteer notified",
    description: "Nearby responders inside the response radius received the incident.",
    time: "14:06"
  },
  {
    id: "step-4",
    title: "Help arrived",
    description: "Assigned responder reached the user location.",
    time: "14:09"
  },
  {
    id: "step-5",
    title: "Incident resolved",
    description: "Admin closed the incident after confirmation from user and responder.",
    time: "14:18"
  }
];
