/**
 * API PUBLIK @jagaruang/core: ini yang dipakai Frontend.
 * Semua fungsi di bawah diisi sesuai docs/backend/TASK_GUIDE.md.
 * JANGAN ubah tanda tangan fungsi tanpa RFC.
 */
import type {
  ActionGuide,
  AnalyzeInput,
  MaskResult,
  ReportChannel,
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
export { pickTriageMessages, scoreTriage } from "./triage/index";

/* Lindungi / Sandi / Kartu */
export { generateSafeword } from "./safeword/index";
export { buildWarningCard } from "./warningCard/index";

/* Penyimpanan lokal */
export { storage } from "./storage";
