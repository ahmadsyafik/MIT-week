import { describe, it, expect } from "vitest";
import { buildWarningCard } from "../index";
import type { AnalysisResult } from "@jagaruang/contracts";

describe("BE-4.2 buildWarningCard", () => {
  const baseResult: AnalysisResult = {
    score: 85,
    band: "sangat_tinggi",
    flags: [
      {
        ruleId: "MSG-PAYMENT-01",
        level: "L4",
        category: "permintaan_uang",
        why: "Permintaan uang di awal",
        verify: "Jangan transfer",
      },
    ],
    modus: ["loker_palsu"],
    malwareTypes: [],
    displayText: "Ini teks pesan rahasia pengguna yang sangat sensitif 081234567890",
    disclaimer: "Disclaimer resmi",
  };

  it("1. teks mengandung nama modus dari result.modus[0]", () => {
    const card = buildWarningCard(baseResult);
    expect(card.text).toContain("Lowongan Kerja Palsu");
  });

  it("2. teks TIDAK mengandung string dari result.displayText", () => {
    const sensitiveText = "PESAN_RAHASIA_PENGGUNA_JANGAN_SAMPAI_BOCOR";
    const result: AnalysisResult = {
      ...baseResult,
      displayText: sensitiveText,
    };
    const card = buildWarningCard(result);
    expect(card.text).not.toContain(sensitiveText);
  });

  it("3. result.modus kosong → teks memuat 'modus tidak dikenali'", () => {
    const result: AnalysisResult = {
      ...baseResult,
      modus: [],
    };
    const card = buildWarningCard(result);
    expect(card.text).toContain("modus tidak dikenali");
  });

  it("4. result.flags kosong → tidak crash, teks tetap valid", () => {
    const result: AnalysisResult = {
      ...baseResult,
      flags: [],
    };
    let card: ReturnType<typeof buildWarningCard> | undefined;
    expect(() => {
      card = buildWarningCard(result);
    }).not.toThrow();
    expect(card?.text).toContain("⚠️ Peringatan:");
    expect(card?.text).toContain("Jangan klik, transfer, atau bagikan data pribadi");
    expect(card?.text).not.toContain("undefined");
  });

  it("5. hanya max 3 flag yang disertakan (flags panjang 5 → hanya 3 yang muncul)", () => {
    const result: AnalysisResult = {
      ...baseResult,
      flags: [
        { ruleId: "R1", level: "L1", category: "c1", why: "Tanda pertama", verify: "v1" },
        { ruleId: "R2", level: "L2", category: "c2", why: "Tanda kedua", verify: "v2" },
        { ruleId: "R3", level: "L3", category: "c3", why: "Tanda ketiga", verify: "v3" },
        { ruleId: "R4", level: "L4", category: "c4", why: "Tanda keempat tidak boleh muncul", verify: "v4" },
        { ruleId: "R5", level: "L5", category: "c5", why: "Tanda kelima tidak boleh muncul", verify: "v5" },
      ],
    };
    const card = buildWarningCard(result);
    expect(card.text).toContain("Tanda pertama");
    expect(card.text).toContain("Tanda kedua");
    expect(card.text).toContain("Tanda ketiga");
    expect(card.text).not.toContain("Tanda keempat tidak boleh muncul");
    expect(card.text).not.toContain("Tanda kelima tidak boleh muncul");
  });

  it("6. teks mengandung 'Jangan klik'", () => {
    const card = buildWarningCard(baseResult);
    expect(card.text).toContain("Jangan klik");
  });
});

