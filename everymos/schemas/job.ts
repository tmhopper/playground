import { z } from "zod";

export const Branch = z.enum([
  "army",
  "marine_corps",
  "air_force",
  "navy",
  "coast_guard",
  "space_force",
]);
export type Branch = z.infer<typeof Branch>;

export const ClassificationTerm = z.enum(["MOS", "AFSC", "Rating", "SFSC"]);
export type ClassificationTerm = z.infer<typeof ClassificationTerm>;

export const PersonnelCategory = z.enum(["enlisted", "officer", "warrant_officer"]);
export type PersonnelCategory = z.infer<typeof PersonnelCategory>;

export const Confidence = z.enum(["verified", "probable", "uncertain", "incomplete"]);
export type Confidence = z.infer<typeof Confidence>;

export const JobStatus = z.enum(["active", "inactive", "merged", "divested"]);

export const SecurityClearance = z.enum([
  "none",
  "confidential",
  "secret",
  "top_secret",
  "ts_sci",
  "other",
]);

export const EligibleGenders = z.enum(["all", "male_only", "female_only"]);

const OccupationalField = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

const AsvabSourceSystem = z.enum([
  "army_line_scores",
  "marine_corps_composites",
  "air_force_aptitude",
  "navy_line_scores",
  "coast_guard_afqt",
  "space_force_aptitude",
]);

const AsvabRequirement = z.object({
  composites: z.record(z.string(), z.number().int().min(0).max(300)),
  afqt_minimum: z.number().int().min(0).max(99).nullable(),
  raw_requirement: z.string().min(1),
  source_system: AsvabSourceSystem,
  notes: z.string().nullable(),
});

const PhysicalRequirements = z.object({
  has_additional_requirements: z.boolean(),
  details: z.string(),
  vision: z.string().nullable(),
  color_vision: z.boolean().nullable(),
  swim_qualified: z.boolean().nullable(),
});

const TrainingStage = z.object({
  stage: z.string().min(1),
  school_name: z.string().min(1),
  location: z.string().min(1),
  duration_weeks: z.number().min(0),
  description: z.string().nullable(),
  is_required: z.boolean(),
  prerequisite: z.string().nullable(),
});

const SpecialPay = z.object({
  pay_type: z.string().min(1),
  amount: z.string().min(1),
  conditions: z.string().min(1),
});

const Compensation = z.object({
  typical_entry_rank: z.string().min(1),
  typical_rank_range: z.string().min(1),
  special_pay: z.array(SpecialPay),
  enlistment_bonus: z.string().nullable(),
});

const DutyStationType = z.enum([
  "base",
  "ship",
  "deployable",
  "conus",
  "oconus",
  "embassy",
  "afloat",
  "shore",
  "airfield",
  "submarine",
  "space_installation",
]);

const CivilianEquivalent = z.object({
  title: z.string().min(1),
  industry: z.string().min(1),
  onet_code: z.string().nullable(),
});

const Source = z.object({
  name: z.string().min(1),
  url: z.string().url().nullable(),
  accessed_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const JobEntry = z.object({
  id: z.string().regex(/^[a-z_]+_[a-z0-9]+$/, "id must be {branch_code}_{job_code} lowercase"),
  job_code: z.string().min(1),
  job_title: z.string().min(1),
  branch: Branch,
  branch_display: z.string().min(1),
  classification_term: ClassificationTerm,
  personnel_category: PersonnelCategory,
  occupational_field: OccupationalField,
  status: JobStatus,

  description_official: z.string().min(1),
  description_plain: z.string().min(1),
  description_tldr: z.string().min(1),

  asvab: AsvabRequirement,
  security_clearance: SecurityClearance,
  physical_requirements: PhysicalRequirements,
  citizenship_required: z.boolean(),
  eligible_genders: EligibleGenders,

  training_pipeline: z.array(TrainingStage),
  compensation: Compensation,

  duty_station_types: z.array(DutyStationType),
  common_duty_stations: z.array(z.string()),

  civilian_equivalents: z.array(CivilianEquivalent),
  transferable_certifications: z.array(z.string()).nullable(),

  branch_specific: z.record(z.string(), z.unknown()),

  sources: z.array(Source),
  confidence: Confidence,
  notes: z.string().nullable(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type JobEntry = z.infer<typeof JobEntry>;

export const JobFile = z.array(JobEntry);
export type JobFile = z.infer<typeof JobFile>;
