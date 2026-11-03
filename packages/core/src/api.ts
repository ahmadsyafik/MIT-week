/**
 * API PUBLIK @jagaruang/core: ini yang dipakai Frontend.
 * Semua fungsi di bawah masih STUB (throw). Backend mengisinya sesuai
 * docs/backend/TASK_GUIDE.md. JANGAN ubah tanda tangan fungsi tanpa RFC.
 * Frontend memakai mock di apps/web/src/mocks sampai fungsi ini selesai.
 */
import type {
  ActionGuide,
  AnalysisResult,
  AnalyzeInput,
  MaskResult,
  ReportChannel,
  TriageChoice,
  TriageMessage,
  TriageResult,
  WarningCard,
} from "@jagaruang/contracts";

function notImplemented(task: string): never {
  throw new Error(`NOT_IMPLEMENTED: ${task}`);
}

/* Cek */
export { maskPii } from "./analyzer/pii";
export { analyze } from "./analyzer/index";

/* Konten */
export { listMalwareTypes, listModus, loadCases as listCases, loadActionGuides as listActionGuides, loadReportChannels as listReportChannels } from "./content/loader";

/* Latih */
export { startCase, tapEvidence, useHint, chooseOption, getDebrief } from "./cases/engine";

/* Kilat 2 Menit */
export function pickTriageMessages(_count?: number, _seed?: number): TriageMessage[] {
  return notImplemented("BE-5.1 pickTriageMessages");
}
export function scoreTriage(
  _messages: TriageMessage[],
  _answers: Record<string, TriageChoice | null>,
): TriageResult {
  return notImplemented("BE-5.1 scoreTriage");
}

/* Lindungi / Sandi / Kartu */
export function generateSafeword(_wordCount?: 2 | 3): string {
  return notImplemented("BE-5.2 generateSafeword");
}
export function buildWarningCard(_result: AnalysisResult): WarningCard {
  return notImplemented("BE-4.2 buildWarningCard");
}

/* Penyimpanan lokal */
export { storage } from "./storage";
