import { z } from "zod";
import {
  LEVELS,
  type ActionCondition,
  type ActionGuide,
  type ActionStep,
  type CaseDefinition,
  type CaseEvidence,
  type CaseNode,
  type CaseNodeType,
  type CaseOption,
  type MalwareType,
  type Modus,
  type ReportChannel,
  type TriageMessage,
} from "@jagaruang/contracts";

/* ───────────── Rule ───────────── */
/**
 * Di rules.json Phase 1, baru ada 1 rule (MSG-PAYMENT-01). Phase 2 akan mengisi 22 rules L1-L5.
 * Schema RuleSchema sudah memiliki field negationPatterns?: string[] untuk mendukung FR-1.9 (negasi OTP).
 */
export const RuleSchema = z.object({
  id: z.string().min(1),
  level: z.enum(LEVELS),
  category: z.string().min(1),
  pattern: z.string().min(1),
  why: z.string().min(1),
  verify: z.string().min(1),
  negationPatterns: z.array(z.string()).optional(),
});
export type Rule = z.infer<typeof RuleSchema>;

/* ───────────── Modus ───────────── */
export const ModusSchema: z.ZodType<Modus> = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  malwareTypeId: z.string().optional(),
  actionGuideId: z.string().optional(),
  relatedCaseId: z.string().optional(),
});

/* ───────────── Malware Type ───────────── */
export const MalwareTypeSchema: z.ZodType<MalwareType> = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  meaning: z.string().min(1),
  howItWorks: z.string().min(1),
  entryPoint: z.string().min(1),
  firstResponse: z.string().min(1),
});

/* ───────────── Permission ───────────── */
export const PermissionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  level: z.enum(LEVELS),
  why: z.string().min(1),
});
export type PermissionEntry = z.infer<typeof PermissionSchema>;

/* ───────────── Case Nodes & Components ───────────── */
export const CaseEvidenceSchema: z.ZodType<CaseEvidence> = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  isRedFlag: z.boolean(),
  why: z.string().optional(),
});

export const CaseOptionSchema: z.ZodType<CaseOption> = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  score: z.number(),
  nextNodeId: z.string().min(1),
  actionGuideId: z.string().optional(),
  feedback: z.string().optional(),
});

export const CaseNodeTypeSchema: z.ZodType<CaseNodeType> = z.enum([
  "mission",
  "investigation",
  "decision",
  "consequence",
  "debrief",
]);

export const CaseNodeSchema: z.ZodType<CaseNode> = z.object({
  id: z.string().min(1),
  caseId: z.string().min(1),
  type: CaseNodeTypeSchema,
  screen: z.string().optional(),
  text: z.string().min(1),
  evidence: z.array(CaseEvidenceSchema).optional(),
  options: z.array(CaseOptionSchema).optional(),
  nextNodeId: z.string().optional(),
});

export const CaseDefinitionSchema: z.ZodType<CaseDefinition> = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  modusId: z.string().min(1),
  durationMin: z.number().nonnegative(),
  startNodeId: z.string(),
  briefing: z.array(z.string()),
  nodes: z.array(CaseNodeSchema),
});

/* ───────────── Triage ───────────── */
export const TriageMessageSchema: z.ZodType<TriageMessage> = z.object({
  id: z.string().min(1),
  content: z.string().min(1),
  isScam: z.boolean(),
  ruleIds: z.array(z.string()),
  explanation: z.string().min(1),
  modusId: z.string().optional(),
});

/* ───────────── Action Guide & Steps ───────────── */
export const ActionStepUrgencySchema = z.enum(["segera", "hari_ini", "minggu_ini"]);

export const ActionStepSchema: z.ZodType<ActionStep> = z.object({
  id: z.string().min(1),
  order: z.number(),
  text: z.string().min(1),
  urgency: ActionStepUrgencySchema,
  channelId: z.string().optional(),
});

export const ActionConditionSchema: z.ZodType<ActionCondition> = z.enum([
  "belum_klik",
  "sudah_install",
  "sudah_transfer",
  "akun_diretas",
  "orang_dekat_hampir_kena",
]);

export const ActionGuideSchema: z.ZodType<ActionGuide> = z.object({
  id: z.string().min(1),
  condition: ActionConditionSchema,
  title: z.string().min(1),
  steps: z.array(ActionStepSchema),
});

/* ───────────── Report Channel ───────────── */
export const ReportChannelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  url: z.string().optional(),
  contact: z.string().optional(),
  verifiedAt: z.string().optional(),
});

export const ContactsFileSchema = z.object({
  verifiedAt: z.string().min(1),
  note: z.string().optional(),
  channels: z.array(ReportChannelSchema),
});

