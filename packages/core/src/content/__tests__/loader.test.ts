import { describe, it, expect, vi } from "vitest";
import {
  loadRules,
  loadModus,
  loadMalware,
  loadPermissions,
  loadCases,
  loadActionGuides,
  loadReportChannels,
  loadTriageMessages,
} from "../loader";
import { RuleSchema } from "../schemas";

describe("BE-1.1 Content Loader & Schemas", () => {
  it("loadRules() return array", () => {
    const rules = loadRules();
    expect(Array.isArray(rules)).toBe(true);
    expect(rules.length).toBeGreaterThan(0);
    for (const r of rules) {
      expect(r.id).toBeDefined();
      expect(r.level).toMatch(/^L[1-5]$/);
      expect(r.category).toBeDefined();
      expect(r.pattern).toBeDefined();
      expect(r.why).toBeDefined();
      expect(r.verify).toBeDefined();
    }
  });

  it("RuleSchema mendukung field negationPatterns untuk FR-1.9 (negasi OTP)", () => {
    const ruleWithNegation = {
      id: "RULE-OTP-01",
      level: "L5" as const,
      category: "permintaan_kode",
      pattern: "otp|kode",
      why: "Permintaan kode OTP mencurigakan",
      verify: "Jangan bagikan OTP",
      negationPatterns: ["jangan bagikan kode otp ini kepada siapa pun"],
    };

    const parsed = RuleSchema.safeParse(ruleWithNegation);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.negationPatterns).toEqual([
        "jangan bagikan kode otp ini kepada siapa pun",
      ]);
    }
  });

  it("Item JSON yang tidak valid schema dilewati (tidak throw)", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const mixedData = [
      {
        id: "VALID-01",
        level: "L3",
        category: "test_category",
        pattern: "test",
        why: "Test why",
        verify: "Test verify",
      },
      {
        id: "INVALID-BROKEN",
        // missing required fields: level, category, pattern, why, verify
      },
      {
        id: "VALID-02",
        level: "L5",
        category: "test_category",
        pattern: "test2",
        why: "Test why 2",
        verify: "Test verify 2",
      },
    ];

    let result: unknown[];
    expect(() => {
      result = loadRules(mixedData);
    }).not.toThrow();

    expect(result!).toHaveLength(2);
    expect(result![0]).toMatchObject({ id: "VALID-01" });
    expect(result![1]).toMatchObject({ id: "VALID-02" });
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it("returns empty array and logs warning if input is not an array", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = loadRules({ not: "an array" });
    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it("loadModus() returns at least 5 modus (loker_palsu, giveaway_palsu, undangan_apk, foto_paket_apk, phishing_link)", () => {
    const modusList = loadModus();
    expect(modusList.length).toBeGreaterThanOrEqual(5);
    const ids = modusList.map((m) => m.id);
    expect(ids).toContain("loker_palsu");
    expect(ids).toContain("giveaway_palsu");
    expect(ids).toContain("undangan_apk");
    expect(ids).toContain("foto_paket_apk");
    expect(ids).toContain("phishing_link");
  });

  it("loadMalware() returns 10 entries and firstResponse DILARANG memuat kata 'aman' atau 'pasti'", () => {
    const malwareList = loadMalware();
    expect(malwareList).toHaveLength(10);

    const requiredIds = [
      "phishing",
      "trojan",
      "sms_stealer",
      "spyware",
      "rat",
      "keylogger",
      "infostealer",
      "ransomware",
      "adware",
      "worm",
    ];
    const ids = malwareList.map((m) => m.id);
    for (const reqId of requiredIds) {
      expect(ids).toContain(reqId);
    }

    // Periksa kata terlarang di firstResponse: DILARANG memuat "aman" atau "pasti"
    for (const m of malwareList) {
      expect(m.name).toBeTruthy();
      expect(m.meaning).toBeTruthy();
      expect(m.howItWorks).toBeTruthy();
      expect(m.entryPoint).toBeTruthy();
      expect(m.firstResponse).toBeTruthy();

      const forbiddenWordRegex = /\b(aman|pasti|100%)\b/i;
      expect(m.firstResponse).not.toMatch(forbiddenWordRegex);
    }
  });

  it("loadPermissions() returns permission entries with levels L3 to L5", () => {
    const perms = loadPermissions();
    expect(perms.length).toBeGreaterThanOrEqual(10);
    const sms = perms.find((p) => p.id === "READ_SMS");
    expect(sms).toBeDefined();
    expect(sms?.level).toBe("L5");
    const acc = perms.find((p) => p.id === "ACCESSIBILITY");
    expect(acc).toBeDefined();
    expect(acc?.level).toBe("L5");
  });

  it("loadCases() returns 3 case definitions with empty nodes for Phase 1", () => {
    const cases = loadCases();
    expect(cases).toHaveLength(3);
    const ids = cases.map((c) => c.id);
    expect(ids).toContain("k1");
    expect(ids).toContain("k2");
    expect(ids).toContain("k3");

    for (const c of cases) {
      expect(Array.isArray(c.nodes)).toBe(true);
      expect(c.nodes).toHaveLength(0);
    }
  });

  it("loadActionGuides() returns 3 required action guides with steps", () => {
    const guides = loadActionGuides();
    expect(guides).toHaveLength(3);
    const conditions = guides.map((g) => g.condition);
    expect(conditions).toContain("belum_klik");
    expect(conditions).toContain("sudah_install");
    expect(conditions).toContain("sudah_transfer");

    for (const g of guides) {
      expect(g.steps.length).toBeGreaterThan(0);
      for (const s of g.steps) {
        expect(["segera", "hari_ini", "minggu_ini"]).toContain(s.urgency);
      }
    }
  });

  it("loadReportChannels() returns report channels with verifiedAt", () => {
    const channels = loadReportChannels();
    expect(channels.length).toBeGreaterThanOrEqual(6);
    const iasc = channels.find((c) => c.id === "iasc");
    expect(iasc).toBeDefined();
    expect(iasc?.verifiedAt).toBeTruthy();
    expect(iasc?.url).toBe("https://iasc.ojk.go.id");
  });

  it("loadTriageMessages() returns 15 messages (8 scam, 7 legit)", () => {
    const triage = loadTriageMessages();
    expect(triage).toHaveLength(15);
    const scams = triage.filter((t) => t.isScam);
    const legits = triage.filter((t) => !t.isScam);
    expect(scams).toHaveLength(8);
    expect(legits).toHaveLength(7);

    // Semua domain fiktif hanya pakai .invalid, .test, atau example.com
    for (const t of triage) {
      const urls = t.content.match(/https?:\/\/[^\s/]+/gi) || [];
      for (const url of urls) {
        const isFictional =
          url.endsWith(".invalid") ||
          url.endsWith(".test") ||
          url.includes("example.com");
        expect(isFictional).toBe(true);
      }
    }
  });
});

