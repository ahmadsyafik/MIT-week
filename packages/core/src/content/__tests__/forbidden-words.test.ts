import { describe, it, expect } from "vitest";
import rules from "../rules.json";
import malware from "../malware.json";
import modus from "../modus.json";
import actionGuides from "../action-guides.json";
import triage from "../triage.json";
import caseK1 from "../cases/k1-undangan-apk.json";
import caseK2 from "../cases/k2-foto-paket.json";
import caseK3 from "../cases/k3-loker-palsu.json";

const FORBIDDEN_WORDS = [
  "aman",
  "pasti",
  "100%",
  "dijamin",
  "terbukti",
  "tidak mungkin",
];

function findForbiddenWords(
  text: unknown,
  filePath: string,
  fieldPath: string
): string[] {
  if (typeof text !== "string") return [];
  const lower = text.toLowerCase();
  const violations: string[] = [];

  for (const word of FORBIDDEN_WORDS) {
    // Escape for regex if needed (e.g. 100%)
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(^|[^a-zA-Z0-9_])${escaped}([^a-zA-Z0-9_]|$)`, "i");
    if (regex.test(lower)) {
      violations.push(
        `File [${filePath}] field [${fieldPath}] mengandung kata terlarang "${word}": "${text}"`
      );
    }
  }

  return violations;
}

describe("BE-6.2 Forbidden Words Scanner", () => {
  it("1. rules.json bebas kata terlarang", () => {
    const violations: string[] = [];
    const file = "rules.json";

    rules.forEach((rule, idx) => {
      violations.push(...findForbiddenWords(rule.why, file, `rules[${idx}].why`));
      violations.push(...findForbiddenWords(rule.verify, file, `rules[${idx}].verify`));
    });

    expect(violations, violations.join("\n")).toEqual([]);
  });

  it("2. malware.json bebas kata terlarang", () => {
    const violations: string[] = [];
    const file = "malware.json";

    malware.forEach((entry, idx) => {
      violations.push(...findForbiddenWords(entry.meaning, file, `malware[${idx}].meaning`));
      violations.push(...findForbiddenWords(entry.howItWorks, file, `malware[${idx}].howItWorks`));
      violations.push(...findForbiddenWords(entry.entryPoint, file, `malware[${idx}].entryPoint`));
      violations.push(...findForbiddenWords(entry.firstResponse, file, `malware[${idx}].firstResponse`));
    });

    expect(violations, violations.join("\n")).toEqual([]);
  });

  it("3. modus.json bebas kata terlarang", () => {
    const violations: string[] = [];
    const file = "modus.json";

    modus.forEach((entry, idx) => {
      violations.push(...findForbiddenWords(entry.name, file, `modus[${idx}].name`));
      violations.push(...findForbiddenWords(entry.description, file, `modus[${idx}].description`));
    });

    expect(violations, violations.join("\n")).toEqual([]);
  });

  it("4. action-guides.json bebas kata terlarang", () => {
    const violations: string[] = [];
    const file = "action-guides.json";

    actionGuides.forEach((guide, gIdx) => {
      violations.push(...findForbiddenWords(guide.title, file, `actionGuides[${gIdx}].title`));
      guide.steps?.forEach((step, sIdx) => {
        violations.push(
          ...findForbiddenWords(step.text, file, `actionGuides[${gIdx}].steps[${sIdx}].text`)
        );
      });
    });

    expect(violations, violations.join("\n")).toEqual([]);
  });

  it("5. triage.json bebas kata terlarang", () => {
    const violations: string[] = [];
    const file = "triage.json";

    triage.forEach((msg, idx) => {
      violations.push(...findForbiddenWords(msg.content, file, `triage[${idx}].content`));
      violations.push(...findForbiddenWords(msg.explanation, file, `triage[${idx}].explanation`));
    });

    expect(violations, violations.join("\n")).toEqual([]);
  });

  it("6. cases/*.json (k1+k2+k3) bebas kata terlarang", () => {
    const violations: string[] = [];
    const cases = [
      { file: "k1-undangan-apk.json", data: caseK1 },
      { file: "k2-foto-paket.json", data: caseK2 },
      { file: "k3-loker-palsu.json", data: caseK3 },
    ];

    for (const c of cases) {
      c.data.briefing?.forEach((card, idx) => {
        violations.push(...findForbiddenWords(card, c.file, `briefing[${idx}]`));
      });

      c.data.nodes?.forEach((node, nIdx) => {
        violations.push(...findForbiddenWords(node.text, c.file, `nodes[${nIdx}].text`));
        violations.push(...findForbiddenWords(node.screen, c.file, `nodes[${nIdx}].screen`));

        node.evidence?.forEach((ev, eIdx) => {
          violations.push(
            ...findForbiddenWords(ev.why, c.file, `nodes[${nIdx}].evidence[${eIdx}].why`)
          );
        });

        node.options?.forEach((opt, oIdx) => {
          violations.push(
            ...findForbiddenWords(opt.feedback, c.file, `nodes[${nIdx}].options[${oIdx}].feedback`)
          );
        });
      });
    }

    expect(violations, violations.join("\n")).toEqual([]);
  });
});

