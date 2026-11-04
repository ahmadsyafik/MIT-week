import { describe, it, expect, vi } from "vitest";
import { pickTriageMessages, scoreTriage } from "../index";
import type { TriageChoice, TriageMessage } from "@jagaruang/contracts";
import * as loader from "../../content/loader";

describe("BE-5.1 Triage Engine", () => {
  it("1. pickTriageMessages return maks count item", () => {
    const res = pickTriageMessages(5);
    expect(res.length).toBeLessThanOrEqual(5);
    expect(res.length).toBe(5);
  });

  it("2. pickTriageMessages seed sama → urutan hasil identik (deterministik)", () => {
    const res1 = pickTriageMessages(10, 42);
    const res2 = pickTriageMessages(10, 42);
    expect(res1.map((m) => m.id)).toEqual(res2.map((m) => m.id));

    const resDiff = pickTriageMessages(10, 999);
    expect(res1.map((m) => m.id)).not.toEqual(resDiff.map((m) => m.id));
  });

  it("3. pickTriageMessages tidak crash jika messages kosong → return []", () => {
    const spy = vi.spyOn(loader, "loadTriageMessages").mockReturnValueOnce([]);
    const res = pickTriageMessages(5);
    expect(res).toEqual([]);
    spy.mockRestore();
  });

  it("4. scoreTriage semua benar → score === messages.length", () => {
    const sampleMessages: TriageMessage[] = [
      {
        id: "msg-1",
        content: "Scam message",
        isScam: true,
        ruleIds: ["R1"],
        explanation: "Scam explanation",
      },
      {
        id: "msg-2",
        content: "Legit message",
        isScam: false,
        ruleIds: [],
        explanation: "Legit explanation",
      },
    ];

    const answers: Record<string, TriageChoice | null> = {
      "msg-1": "curiga",
      "msg-2": "biasa",
    };

    const res = scoreTriage(sampleMessages, answers);
    expect(res.score).toBe(sampleMessages.length);
    expect(res.details.every((d) => d.correct)).toBe(true);
  });

  it("5. scoreTriage answer null → salah (correct: false)", () => {
    const sampleMessages: TriageMessage[] = [
      {
        id: "msg-1",
        content: "Scam message",
        isScam: true,
        ruleIds: ["R1"],
        explanation: "Scam explanation",
      },
    ];

    const answers: Record<string, TriageChoice | null> = {
      "msg-1": null,
    };

    const res = scoreTriage(sampleMessages, answers);
    expect(res.score).toBe(0);
    expect(res.details[0].correct).toBe(false);
    expect(res.details[0].chosen).toBeNull();
  });

  it("6. scoreTriage pesan sah dijawab salah → correct: false", () => {
    const sampleMessages: TriageMessage[] = [
      {
        id: "msg-legit",
        content: "Pesan sah dari bank",
        isScam: false,
        ruleIds: [],
        explanation: "Pesan sah",
      },
    ];

    const answers: Record<string, TriageChoice | null> = {
      "msg-legit": "curiga",
    };

    const res = scoreTriage(sampleMessages, answers);
    expect(res.score).toBe(0);
    expect(res.details[0].correct).toBe(false);
    expect(res.details[0].chosen).toBe("curiga");
    expect(res.details[0].explanation).toBe(
      "Tidak ada tanda bahaya di pesan ini, tetap verifikasi jika ragu.",
    );
  });

  it("7. scoreTriage recommendedCaseIds dideduplikasi", () => {
    // Dua pesan scam dengan modus sama yang terkait dengan case yang sama
    const sampleMessages: TriageMessage[] = [
      {
        id: "msg-scam-1",
        content: "Undangan nikah apk 1",
        isScam: true,
        ruleIds: ["FILE-APK-CHAT-L5"],
        explanation: "APK",
        modusId: "undangan_apk",
      },
      {
        id: "msg-scam-2",
        content: "Undangan nikah apk 2",
        isScam: true,
        ruleIds: ["FILE-APK-CHAT-L5"],
        explanation: "APK",
        modusId: "undangan_apk",
      },
    ];

    // Dijawab biasa (salah)
    const answers: Record<string, TriageChoice | null> = {
      "msg-scam-1": "biasa",
      "msg-scam-2": "biasa",
    };

    const res = scoreTriage(sampleMessages, answers);
    expect(res.recommendedCaseIds).toEqual(["k1"]);
  });

  it("8. scoreTriage details.length === messages.length", () => {
    const messages = loader.loadTriageMessages().slice(0, 7);
    const answers: Record<string, TriageChoice | null> = {};
    messages.forEach((m, idx) => {
      answers[m.id] = idx % 2 === 0 ? "biasa" : "curiga";
    });

    const res = scoreTriage(messages, answers);
    expect(res.details.length).toBe(messages.length);
    expect(res.total).toBe(messages.length);
  });
});

