import { z } from "zod";

export const MatchScoreSchema = z.object({
  overall: z.number().int().min(0).max(100),
  skills: z.number().int().min(0).max(100),
  experience: z.number().int().min(0).max(100),
  domain: z.number().int().min(0).max(100),
  culture: z.number().int().min(0).max(100),
  logistics: z.number().int().min(0).max(100),
  reasoning: z.object({
    skills: z.string(),
    experience: z.string(),
    domain: z.string(),
    culture: z.string(),
    logistics: z.string(),
  }),
  strengths: z.array(z.string()).min(1).max(10),
  gaps: z.array(z.string()).min(0).max(10),
  summary: z.string(),
});

export type MatchScore = z.infer<typeof MatchScoreSchema>;

export const MatchScoreTool = {
  name: "submit_match_score",
  description:
    "Submit the full match score for this job relative to the candidate's profile. Call this exactly once.",
  input_schema: {
    type: "object" as const,
    properties: {
      overall: { type: "number", minimum: 0, maximum: 100, description: "Overall match 0-100. Calibrate honestly; 70+ means strong match." },
      skills: { type: "number", minimum: 0, maximum: 100 },
      experience: { type: "number", minimum: 0, maximum: 100 },
      domain: { type: "number", minimum: 0, maximum: 100 },
      culture: { type: "number", minimum: 0, maximum: 100 },
      logistics: { type: "number", minimum: 0, maximum: 100, description: "Location, salary, work mode match." },
      reasoning: {
        type: "object",
        properties: {
          skills: { type: "string", description: "1-2 sentences. Cite specific skills from JD and profile." },
          experience: { type: "string" },
          domain: { type: "string" },
          culture: { type: "string" },
          logistics: { type: "string" },
        },
        required: ["skills", "experience", "domain", "culture", "logistics"],
      },
      strengths: {
        type: "array",
        items: { type: "string" },
        description: "3-5 short bullets naming the candidate's biggest advantages for this specific role.",
      },
      gaps: {
        type: "array",
        items: { type: "string" },
        description: "0-5 short bullets naming real gaps. Empty array if none. No inflation.",
      },
      summary: { type: "string", description: "1-2 sentence overall verdict." },
    },
    required: ["overall", "skills", "experience", "domain", "culture", "logistics", "reasoning", "strengths", "gaps", "summary"],
  },
};

export const ResumeSchema = z.object({
  header: z.object({
    name: z.string(),
    title: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
  summary: z.string().optional(),
  experience: z.array(
    z.object({
      company: z.string(),
      title: z.string(),
      location: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      bullets: z.array(z.string()),
    })
  ),
  education: z
    .array(
      z.object({
        school: z.string(),
        degree: z.string().optional(),
        field: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        details: z.array(z.string()).default([]),
      })
    )
    .default([]),
  skills: z.array(z.string()).default([]),
  projects: z
    .array(z.object({ name: z.string(), url: z.string().optional(), description: z.string() }))
    .default([]),
});

export type Resume = z.infer<typeof ResumeSchema>;

export const ResumeTool = {
  name: "submit_tailored_resume",
  description:
    "Submit the full tailored résumé as structured JSON. Only rewrite bullets where JD alignment genuinely helps. Preserve truth — never invent experience. Flag materially changed bullets in the diff.",
  input_schema: {
    type: "object" as const,
    properties: {
      resume: {
        type: "object",
        properties: {
          header: {
            type: "object",
            properties: {
              name: { type: "string" },
              title: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              location: { type: "string" },
              links: {
                type: "array",
                items: {
                  type: "object",
                  properties: { label: { type: "string" }, url: { type: "string" } },
                  required: ["label", "url"],
                },
              },
            },
            required: ["name"],
          },
          summary: { type: "string" },
          experience: {
            type: "array",
            items: {
              type: "object",
              properties: {
                company: { type: "string" },
                title: { type: "string" },
                location: { type: "string" },
                startDate: { type: "string" },
                endDate: { type: "string" },
                bullets: { type: "array", items: { type: "string" } },
              },
              required: ["company", "title", "bullets"],
            },
          },
          education: {
            type: "array",
            items: {
              type: "object",
              properties: {
                school: { type: "string" },
                degree: { type: "string" },
                field: { type: "string" },
                startDate: { type: "string" },
                endDate: { type: "string" },
                details: { type: "array", items: { type: "string" } },
              },
              required: ["school"],
            },
          },
          skills: { type: "array", items: { type: "string" } },
          projects: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                url: { type: "string" },
                description: { type: "string" },
              },
              required: ["name", "description"],
            },
          },
        },
        required: ["header", "experience"],
      },
      diff: {
        type: "array",
        items: {
          type: "object",
          properties: {
            section: { type: "string", description: "e.g. 'experience[0].bullets[2]' or 'summary'" },
            before: { type: "string" },
            after: { type: "string" },
            reason: { type: "string", description: "1 sentence why this change aligns with the JD." },
          },
          required: ["section", "before", "after", "reason"],
        },
      },
    },
    required: ["resume", "diff"],
  },
};

export const BulkParseTool = {
  name: "submit_parsed_jobs",
  description: "Submit a structured list of jobs extracted from the raw text.",
  input_schema: {
    type: "object" as const,
    properties: {
      jobs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            company: { type: "string" },
            location: { type: "string" },
            workMode: { type: "string" },
            url: { type: "string" },
            description: { type: "string", description: "Body text of the posting." },
          },
          required: ["title", "company"],
        },
      },
    },
    required: ["jobs"],
  },
};
