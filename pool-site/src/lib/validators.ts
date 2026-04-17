import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const bookingSchema = z.object({
  name: z.string().min(2, "Your name"),
  email: z.string().email("Valid email"),
  phone: z.string().min(7, "Phone number"),
  address: z.string().min(5, "Property address"),
  service: z.string().min(1, "Pick a service"),
  preferredDate: z.string().optional(),
  notes: z.string().optional(),
});

export const nominateStep1Schema = z.object({
  propertyAddress: z.string().min(5, "Address or cross-streets"),
  city: z.string().min(2, "City"),
  category: z.string().min(1, "Pick a category"),
  story: z.string().min(20, "Tell me a little more — at least 20 characters"),
});
export const nominateStep2Schema = z.object({
  yourName: z.string().optional(),
  yourEmail: z.string().email("Valid email").optional().or(z.literal("")),
  relationship: z.string().min(1, "Pick your relationship"),
});
export const nominateStep3Schema = z.object({
  ownerName: z.string().optional(),
  ownerContact: z.string().optional(),
  permissionConfirmed: z
    .boolean()
    .refine((v) => v, "Please confirm before submitting"),
});

export const sponsorSchema = z.object({
  amount: z.number().min(1),
  name: z.string().min(1, "Your name or 'Anonymous'"),
  email: z.string().email("Valid email"),
  publicName: z.string().optional(),
  message: z.string().optional(),
});

export const volunteerSchema = z.object({
  name: z.string().min(2, "Name"),
  email: z.string().email("Valid email"),
  skills: z.string().min(1, "How can you help?"),
  availability: z.string().min(1, "When are you available?"),
});

export const mediaSchema = z.object({
  name: z.string().min(2, "Name"),
  outlet: z.string().min(1, "Outlet"),
  email: z.string().email("Valid email"),
  subject: z.string().min(1, "Subject"),
  message: z.string().min(10, "Message"),
});
