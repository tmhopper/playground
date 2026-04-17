export type Service = {
  id: string;
  name: string;
  price: string;
  duration: string;
  tagline: string;
  includes: string[];
  cta: string;
  popular?: boolean;
};

export const services: Service[] = [
  {
    id: "deep-clean",
    name: "One-Time Deep Clean",
    price: "$249",
    duration: "2–4 hrs",
    tagline: "The reset button for a healthy pool.",
    includes: [
      "Full brush, vacuum, skim",
      "Filter cartridge clean or backwash",
      "Full chemical balance",
      "Equipment inspection + short video report",
      "Walk-through of anything that needs attention",
    ],
    cta: "Book a Deep Clean",
  },
  {
    id: "weekly",
    name: "Weekly Maintenance",
    price: "$140/mo",
    duration: "weekly · no contract",
    tagline: "Set it, forget it, swim year-round.",
    includes: [
      "Weekly on-site visit",
      "All chemicals included",
      "Skim, brush, vacuum as needed",
      "Filter check + backwash when scheduled",
      "Monthly equipment health report (video)",
      "Cancel any time — no contracts",
    ],
    cta: "Start Weekly Service",
    popular: true,
  },
  {
    id: "rescue",
    name: "Green-to-Clean Rescue",
    price: "$450–$800",
    duration: "3–7 days",
    tagline: "For pools the neighbors are talking about.",
    includes: [
      "Severe algae + debris recovery",
      "Multi-day filtration cycles",
      "Shock treatment + stabilization",
      "Filter deep clean",
      "Before/after documentation (yours to keep)",
      "One month of follow-up check-ins",
    ],
    cta: "Request a Rescue Quote",
  },
  {
    id: "repair-consult",
    name: "Repair Consult",
    price: "$85/hr",
    duration: "1–2 hrs · often under 1",
    tagline: "Figure out what's wrong before you buy parts.",
    includes: [
      "Full equipment diagnosis",
      "Pump, filter, heater, automation, plumbing",
      "Written report + parts list with prices",
      "Honest answers — we'll tell you if it's not worth fixing",
      "Consult fee credited toward any repair we do",
    ],
    cta: "Schedule a Consult",
  },
];
