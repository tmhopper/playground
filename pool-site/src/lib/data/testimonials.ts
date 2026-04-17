export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  serviceId: string;
  avatar: string;
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Elena Ramirez",
    role: "Homeowner (nominated)",
    location: "Manteca, CA",
    rating: 5,
    quote:
      "I didn't think my pool could be saved. My husband used to take care of it. Troy showed up, explained everything, and filmed it all. My grandkids swam in it last weekend. I cried.",
    serviceId: "nominated",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    date: "2026-04-03",
  },
  {
    id: "t2",
    name: "Marcus Chen",
    role: "Weekly client",
    location: "Tracy, CA",
    rating: 5,
    quote:
      "I switched from the big chain service after one month. Troy texts me a video report every Monday. I always know what's going on with my pool. No contract, no upsells.",
    serviceId: "weekly",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    date: "2026-03-22",
  },
  {
    id: "t3",
    name: "Sarah Ballard",
    role: "Homeowner",
    location: "Stockton, CA",
    rating: 5,
    quote:
      "Quoted me $1,200 by another company for a 'pump replacement.' Troy came out for the $85 consult, showed me the actual problem was a $14 gasket, and fixed it in 20 minutes. Credited the consult fee against the gasket. The most honest pool guy in the 209.",
    serviceId: "repair-consult",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    date: "2026-03-15",
  },
  {
    id: "t4",
    name: "Derek Park",
    role: "Green-to-Clean Rescue",
    location: "Modesto, CA",
    rating: 5,
    quote:
      "House sat vacant for 10 months during my mom's surgery. I came back to a swamp. Troy had it swimmable in 4 days. Sent me photos daily since I was still out of state.",
    serviceId: "rescue",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    date: "2026-02-28",
  },
  {
    id: "t5",
    name: "Joanne & Bill Carter",
    role: "Weekly clients",
    location: "Lodi, CA",
    rating: 5,
    quote:
      "We're in our seventies. Bill couldn't keep up with the brushing anymore. Troy took it over and never made us feel dumb about what we didn't know. That matters more than he probably realizes.",
    serviceId: "weekly",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80",
    date: "2026-02-11",
  },
  {
    id: "t6",
    name: "Nicole Adebayo",
    role: "Deep Clean client",
    location: "Elk Grove, CA",
    rating: 5,
    quote:
      "Moved into a new build, no idea what I was doing. Booked a Deep Clean + consult. Left with a balanced pool and a checklist I'm still using six months later.",
    serviceId: "deep-clean",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    date: "2026-01-30",
  },
];

export const aggregateRating = {
  value: 4.9,
  count: 38,
  outOf: 5,
};
