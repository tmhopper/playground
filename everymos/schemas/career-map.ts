import { z } from "zod";

export const RelationshipType = z.enum([
  "lateral_move",
  "reclass",
  "promotion_progression",
  "cross_branch_equivalent",
  "civilian_translation",
]);
export type RelationshipType = z.infer<typeof RelationshipType>;

export const CareerMapEdge = z.object({
  from: z.string().regex(/^[a-z_]+_[a-z0-9]+$/),
  to: z.string(),
  relationship_type: RelationshipType,
  eligibility: z.string().nullable(),
  typical_timeline: z.string().nullable(),
  certs_required: z.array(z.string()),
  notes: z.string().nullable(),
});
export type CareerMapEdge = z.infer<typeof CareerMapEdge>;

export const CareerMapFile = z.array(CareerMapEdge);
export type CareerMapFile = z.infer<typeof CareerMapFile>;
