/**
 * Keuzehulp/wizard: gedeelde slugs en types voor alle dienstenpagina's.
 * Komt overeen met DB-constraint in supabase/migrations (service_slug CHECK).
 */

export const KEUZEHULP_SERVICE_SLUGS = [
  "keuken-wrapping",
  "aanrechtbladen",
  "kasten",
  "kozijnen",
  "deuren",
  "frontjes", // Changed from "keuken-frontjes" to "frontjes"
  "achterwanden",
  "schadeherstel",
] as const;

export type KeuzehulpServiceSlug = (typeof KEUZEHULP_SERVICE_SLUGS)[number];

export function isKeuzehulpServiceSlug(s: string): s is KeuzehulpServiceSlug {
  return (KEUZEHULP_SERVICE_SLUGS as readonly string[]).includes(s);
}

/** Row voor insert in keuzehulp_submissions (alle velden voor ERP). */
export interface KeuzehulpSubmissionInsert {
  service_slug: KeuzehulpServiceSlug;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  contact_address: string | null;
  wizard_data: Record<string, unknown>;
}
