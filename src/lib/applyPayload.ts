import { z } from "zod";

export const applySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  contact: z.string().trim().min(3, "Contact is required").max(150),
  location: z.string().trim().min(2, "Location is required").max(150),
  social: z.string().trim().min(4, "LinkedIn or X profile is required").max(255),
  experience: z.coerce.number().int().min(0, "Must be 0 or more").max(60, "Must be 60 or less"),
});

export const APPLICATION_STATUSES = [
  "new",
  "reviewing",
  "interviewing",
  "offered",
  "rejected",
  "hired",
  "withdrawn",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const PAGE_SIZE = 20;
