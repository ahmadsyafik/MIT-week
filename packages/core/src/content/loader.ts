import type {
  ActionGuide,
  CaseDefinition,
  MalwareType,
  Modus,
  ReportChannel,
  TriageMessage,
} from "@jagaruang/contracts";
import {
  ActionGuideSchema,
  CaseDefinitionSchema,
  MalwareTypeSchema,
  ModusSchema,
  PermissionSchema,
  ReportChannelSchema,
  RuleSchema,
  TriageMessageSchema,
  type PermissionEntry,
  type Rule,
} from "./schemas";

import rulesJson from "./rules.json";
import modusJson from "./modus.json";
import malwareJson from "./malware.json";
import permissionsJson from "./permissions.json";
import contactsJson from "./contacts.json";
import actionGuidesJson from "./action-guides.json";
import triageJson from "./triage.json";
import k1CaseJson from "./cases/k1-undangan-apk.json";
import k2CaseJson from "./cases/k2-foto-paket.json";
import k3CaseJson from "./cases/k3-loker-palsu.json";

function parseArrayWithSchema<T>(
  raw: unknown,
  schema: { safeParse: (data: unknown) => { success: true; data: T } | { success: false; error: unknown } },
  entityName: string,
): T[] {
  if (!Array.isArray(raw)) {
    console.warn(`[loader] Expected array for ${entityName}, received ${typeof raw}`);
    return [];
  }
  const result: T[] = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const parsed = schema.safeParse(item);
    if (parsed.success) {
      result.push(parsed.data);
    } else {
      console.warn(`[loader] Invalid ${entityName} at index ${i}:`, parsed.error);
    }
  }
  return result;
}

export function loadRules(data?: unknown): Rule[] {
  return parseArrayWithSchema(data ?? rulesJson, RuleSchema, "Rule");
}

export function loadModus(data?: unknown): Modus[] {
  return parseArrayWithSchema(data ?? modusJson, ModusSchema, "Modus");
}

export function loadMalware(data?: unknown): MalwareType[] {
  return parseArrayWithSchema(data ?? malwareJson, MalwareTypeSchema, "MalwareType");
}

export function loadPermissions(data?: unknown): PermissionEntry[] {
  return parseArrayWithSchema(data ?? permissionsJson, PermissionSchema, "PermissionEntry");
}

export function loadCases(data?: unknown): CaseDefinition[] {
  const defaultCases = [k1CaseJson, k2CaseJson, k3CaseJson];
  return parseArrayWithSchema(data ?? defaultCases, CaseDefinitionSchema, "CaseDefinition");
}

export function loadActionGuides(data?: unknown): ActionGuide[] {
  return parseArrayWithSchema(data ?? actionGuidesJson, ActionGuideSchema, "ActionGuide");
}

export function loadReportChannels(data?: unknown): ReportChannel[] {
  const source = data ?? contactsJson;
  let defaultVerifiedAt = "2026-11-03";
  let rawChannels: unknown[] = [];

  if (source && typeof source === "object") {
    if ("verifiedAt" in source && typeof (source as { verifiedAt: unknown }).verifiedAt === "string") {
      defaultVerifiedAt = (source as { verifiedAt: string }).verifiedAt;
    }
    if ("channels" in source && Array.isArray((source as { channels: unknown }).channels)) {
      rawChannels = (source as { channels: unknown[] }).channels;
    } else if (Array.isArray(source)) {
      rawChannels = source;
    }
  }

  const result: ReportChannel[] = [];
  for (let i = 0; i < rawChannels.length; i++) {
    const item = rawChannels[i];
    const parsed = ReportChannelSchema.safeParse(item);
    if (parsed.success) {
      result.push({
        id: parsed.data.id,
        name: parsed.data.name,
        url: parsed.data.url,
        contact: parsed.data.contact,
        verifiedAt: parsed.data.verifiedAt || defaultVerifiedAt,
      });
    } else {
      console.warn(`[loader] Invalid ReportChannel at index ${i}:`, parsed.error);
    }
  }
  return result;
}

export function loadTriageMessages(data?: unknown): TriageMessage[] {
  return parseArrayWithSchema(data ?? triageJson, TriageMessageSchema, "TriageMessage");
}

