import type { TriageChoice, TriageMessage, TriageResult } from "@jagaruang/contracts";
import { loadTriageMessages, loadModus } from "../content/loader";

export function pickTriageMessages(count = 10, seed?: number): TriageMessage[] {
  const all = loadTriageMessages();
  if (all.length === 0) return [];
  const arr = [...all];
  if (seed !== undefined) {
    // LCG deterministik: a=1664525, c=1013904223, m=2^32
    let state = seed >>> 0;
    for (let i = arr.length - 1; i > 0; i--) {
      state = (1664525 * state + 1013904223) >>> 0;
      const j = state % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } else {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr.slice(0, count);
}

export function scoreTriage(
  messages: TriageMessage[],
  answers: Record<string, TriageChoice | null>,
): TriageResult {
  let score = 0;
  const details = messages.map((msg) => {
    const chosen = answers[msg.id] ?? null;
    const correct =
      (msg.isScam && chosen === "curiga") ||
      (!msg.isScam && chosen === "biasa");
    if (correct) score++;
    // Pesan sah tanpa tanda bahaya: gunakan explanation khusus
    const explanation =
      !msg.isScam && (!msg.ruleIds || msg.ruleIds.length === 0)
        ? "Tidak ada tanda bahaya di pesan ini, tetap verifikasi jika ragu."
        : msg.explanation;
    return { messageId: msg.id, chosen, correct, explanation };
  });

  // recommendedCaseIds: hanya dari pesan scam yang dijawab salah, deduplikasi
  const allModus = loadModus();
  const seen = new Set<string>();
  const recommendedCaseIds: string[] = [];
  for (const msg of messages) {
    if (!msg.isScam) continue;
    const ans = answers[msg.id] ?? null;
    const correct = ans === "curiga";
    if (correct) continue;
    if (!msg.modusId) continue;
    const modus = allModus.find((m) => m.id === msg.modusId);
    if (!modus?.relatedCaseId) continue;
    if (!seen.has(modus.relatedCaseId)) {
      seen.add(modus.relatedCaseId);
      recommendedCaseIds.push(modus.relatedCaseId);
    }
  }
  return { score, total: messages.length, details, recommendedCaseIds };
}

