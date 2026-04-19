export const brand = {
  name: "Toe Dirt",
  tagline: "Rugged. Raw. Ready.",
  kicker: "Construction. Charisma. Conviction.",
  disclaimer:
    "Toe Dirt is a parody. Any resemblance to real construction workers, influencers, or toes is purely coincidental and mostly flattering.",
  emails: {
    hey: "hey@toedirt.com",
    bookings: "bookings@toedirt.com",
    bob: "bob@toedirt.com",
  },
  socials: [
    { label: "Instagram", handle: "@toedirt", href: "https://instagram.com/toedirt" },
    { label: "TikTok", handle: "@toedirt", href: "https://tiktok.com/@toedirt" },
    { label: "X", handle: "@toedirt", href: "https://x.com/toedirt" },
    { label: "YouTube", handle: "@toedirt", href: "https://youtube.com/@toedirt" },
    { label: "Threads", handle: "@toedirt", href: "https://threads.net/@toedirt" },
    { label: "Bluesky", handle: "@toedirt", href: "https://bsky.app/profile/toedirt" },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "The Dirt" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/packages", label: "Packages" },
  { href: "/shop", label: "Shop" },
  { href: "/bob", label: "Bob's Corner" },
  { href: "/contact", label: "Slide In My DMs" },
] as const;

export const asSeenIn = [
  "Hard Hat Monthly",
  "Dirt Digest",
  "Pinky Toe Times",
  "Boot Hole Quarterly",
  "Jobsite Journal",
  "The Daily Dig",
] as const;

export const testimonials = [
  {
    quote: "I ate dinner off his big toe and my whole life changed.",
    author: "Karen",
    location: "Tulsa, OK",
  },
  {
    quote: "Never thought I'd subscribe to a construction worker. Never thought wrong.",
    author: "Derek",
    location: "Boise, ID",
  },
  {
    quote: "The boot hole peek was worth every penny of my tax return.",
    author: "Linda",
    location: "Scranton, PA",
  },
  {
    quote: "Bob sent me a signed hard hat. I cried. My wife cried. My wife left.",
    author: "Greg",
    location: "Modesto, CA",
  },
  {
    quote: "Finally, a gentleman in the dirt-content space.",
    author: "Beverly",
    location: "Tampa, FL",
  },
] as const;

export const associates = [
  {
    name: "Marcy \"The Director\" Dobbs",
    role: "Toe Director",
    bio: "Twenty years in cinematography. One year in toes. No regrets.",
  },
  {
    name: "Hank Goblin",
    role: "Chief Toe Officer",
    bio: "Oversees all fiduciary duties below the ankle.",
  },
  {
    name: "Lyle Creek",
    role: "Boot-Hole Engineer",
    bio: "Certified in ventilated footwear. Formerly OSHA-adjacent.",
  },
  {
    name: "Pam Dunkirk",
    role: "Head of Dirt Acquisition",
    bio: "Sources premium jobsite soil from six continents. Antarctica is next.",
  },
  {
    name: "Bob",
    role: "Mascot & Head of Vibes",
    bio: "Don't email Bob directly. He'll come to you.",
  },
] as const;

export const milestones = [
  { year: "2023", event: "First boot hole accidentally photographed mid-shift." },
  { year: "2024", event: "First DM slid. Second boot hole engineered on purpose." },
  { year: "2025", event: "Bob signed on as creative director and mascot." },
  { year: "2026", event: "toedirt.com launches. The dirt goes global." },
] as const;
