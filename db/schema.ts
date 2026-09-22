import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Leads captured from the conversational project-intake form (`/proyecto`).
// `publicId` is the only identifier ever exposed to the browser — it is an
// opaque random token stored in the visitor's own localStorage so autosave
// requests can find their row again, while the numeric `id` stays internal.
// Contact fields are written as soon as step 0 completes; every later step
// PATCHes more answers into `answersJson` (the full, resumable snapshot)
// plus a handful of dedicated columns kept for quick triage without parsing
// JSON (project type, budget, timeline, preferred contact method).
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  publicId: text("public_id").notNull().unique(),
  status: text("status").notNull().default("in_progress"), // 'in_progress' | 'completed'
  currentStep: integer("current_step").notNull().default(0),

  name: text("name").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  company: text("company").notNull().default(""),

  projectTypes: text("project_types").notNull().default(""),
  mainGoal: text("main_goal").notNull().default(""),
  budgetRange: text("budget_range").notNull().default(""),
  timeline: text("timeline").notNull().default(""),
  preferredContactMethod: text("preferred_contact_method").notNull().default(""),

  // Full answer snapshot, keyed by question id — the source of truth used to
  // resume the form and the safety net if a dedicated column is ever missing.
  answersJson: text("answers_json").notNull().default("{}"),

  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
