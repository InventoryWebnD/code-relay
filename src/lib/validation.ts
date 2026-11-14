import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  password: z.string().min(8).max(72),
  institution: z.string().trim().min(2).max(160),
  department: z.string().trim().max(120).optional().or(z.literal("")),
  studyYear: z.string().trim().max(40).optional().or(z.literal("")),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  phone: z.string().trim().max(30).optional().nullable(),
  institution: z.string().trim().max(160).optional().nullable(),
  department: z.string().trim().max(120).optional().nullable(),
  studyYear: z.string().trim().max(40).optional().nullable(),
  bio: z.string().trim().max(500).optional().nullable(),
  githubUrl: z.string().url().max(300).optional().or(z.literal("")).nullable(),
  linkedinUrl: z.string().url().max(300).optional().or(z.literal("")).nullable(),
  websiteUrl: z.string().url().max(300).optional().or(z.literal("")).nullable(),
});

export const teamSchema = z.object({
  name: z.string().trim().min(2).max(80),
});

export const competitionSchema = z.object({
  name: z.string().trim().min(3).max(150),
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9-]+$/),
  edition: z.string().max(30).optional(),
  description: z.string().trim().min(10),
  format: z.string().max(80).optional(),
  minTeamSize: z.number().int().min(1).max(20).default(2),
  maxTeamSize: z.number().int().min(1).max(20).default(4),
  allowedTracks: z.array(z.enum(["WEB2", "WEB3", "BOTH"])).default(["WEB2", "WEB3"]),
  rules: z.string().optional(),
  eligibility: z.string().optional(),
  registrationOpensAt: z.string().datetime().optional().nullable(),
  registrationClosesAt: z.string().datetime().optional().nullable(),
  startsAt: z.string().datetime().optional().nullable(),
  endsAt: z.string().datetime().optional().nullable(),
  submissionDeadline: z.string().datetime().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "REGISTRATION_CLOSED", "LIVE", "JUDGING", "COMPLETED", "ARCHIVED"]).optional(),
  isPublished: z.boolean().optional(),
});
