import { describe, it, expect } from "vitest";
import {
  loadRules,
  loadModus,
  loadMalware,
  loadCases,
  loadActionGuides,
  loadReportChannels,
  loadTriageMessages,
} from "../loader";

describe("BE-6.1 Content Integrity", () => {
  it("1. Setiap modus.modusId yang dirujuk rules.json ada di modus.json", () => {
    const rules = loadRules();
    const modus = loadModus();
    const modusIds = new Set(modus.map((m) => m.id));

    // Bila ada rule yang memiliki atribut modusId
    for (const rule of rules) {
      if ("modusId" in rule && typeof (rule as unknown as { modusId?: string }).modusId === "string") {
        const refId = (rule as unknown as { modusId: string }).modusId;
        expect(modusIds.has(refId)).toBe(true);
      }
    }
  });

  it("2. Setiap modus.malwareTypeId yang ada merujuk id valid di malware.json", () => {
    const modus = loadModus();
    const malware = loadMalware();
    const malwareIds = new Set(malware.map((m) => m.id));

    for (const m of modus) {
      if (m.malwareTypeId) {
        expect(malwareIds.has(m.malwareTypeId)).toBe(true);
      }
    }
  });

  it("3. Setiap modus.actionGuideId yang ada merujuk id valid di action-guides.json", () => {
    const modus = loadModus();
    const guides = loadActionGuides();
    const guideIds = new Set(guides.map((g) => g.id));

    for (const m of modus) {
      if (m.actionGuideId) {
        expect(guideIds.has(m.actionGuideId)).toBe(true);
      }
    }
  });

  it("4. Setiap modus.relatedCaseId yang ada merujuk id valid di cases/*.json", () => {
    const modus = loadModus();
    const cases = loadCases();
    const caseIds = new Set(cases.map((c) => c.id));

    for (const m of modus) {
      if (m.relatedCaseId) {
        expect(caseIds.has(m.relatedCaseId)).toBe(true);
      }
    }
  });

  it("5. Setiap action-guides.steps[].channelId yang ada merujuk id valid di contacts.json", () => {
    const guides = loadActionGuides();
    const channels = loadReportChannels();
    const channelIds = new Set(channels.map((c) => c.id));

    for (const guide of guides) {
      for (const step of guide.steps) {
        if (step.channelId) {
          expect(channelIds.has(step.channelId)).toBe(true);
        }
      }
    }
  });

  it("6. Setiap triage.message.modusId yang ada merujuk id valid di modus.json", () => {
    const messages = loadTriageMessages();
    const modus = loadModus();
    const modusIds = new Set(modus.map((m) => m.id));

    for (const msg of messages) {
      if (msg.modusId) {
        expect(modusIds.has(msg.modusId)).toBe(true);
      }
    }
  });

  it("7. Setiap case.nodes[].options[].actionGuideId yang ada merujuk id valid di action-guides.json", () => {
    const cases = loadCases();
    const guides = loadActionGuides();
    const guideIds = new Set(guides.map((g) => g.id));

    for (const c of cases) {
      for (const node of c.nodes) {
        for (const option of node.options || []) {
          if (option.actionGuideId) {
            expect(guideIds.has(option.actionGuideId)).toBe(true);
          }
        }
      }
    }
  });

  it("8. Tidak ada rule yang pattern-nya adalah string kosong \"\"", () => {
    const rules = loadRules();
    expect(rules.length).toBeGreaterThan(0);
    for (const rule of rules) {
      expect(typeof rule.pattern).toBe("string");
      expect(rule.pattern.trim().length).toBeGreaterThan(0);
    }
  });
});

