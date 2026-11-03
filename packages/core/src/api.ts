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
  CaseDebrief,
  CaseDefinition,
  CaseSession,
  LocalProgress,
  MalwareType,
  MaskResult,
  Modus,
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
export function maskPii(_text: string): MaskResult {
  return notImplemented("BE-2.1 maskPii");
}
export function analyze(_input: AnalyzeInput): AnalysisResult {
  return notImplemented("BE-2.2 analyze");
}

/* Konten */
export function listMalwareTypes(): MalwareType[] {
  return notImplemented("BE-3.1 listMalwareTypes");
}
export function listModus(): Modus[] {
  return notImplemented("BE-3.1 listModus");
}
export function listCases(): CaseDefinition[] {
  return notImplemented("BE-3.2 listCases");
}
export function listActionGuides(): ActionGuide[] {
  return notImplemented("BE-4.1 listActionGuides");
}
export function listReportChannels(): ReportChannel[] {
  return notImplemented("BE-4.1 listReportChannels");
}

/* Latih */
export function startCase(_caseId: string): CaseSession {
  return notImplemented("BE-3.3 startCase");
}
export function tapEvidence(_s: CaseSession, _evidenceId: string): CaseSession {
  return notImplemented("BE-3.3 tapEvidence");
}
export function useHint(_s: CaseSession): CaseSession {
  return notImplemented("BE-3.3 useHint");
}
export function chooseOption(_s: CaseSession, _optionId: string): CaseSession {
  return notImplemented("BE-3.3 chooseOption");
}
export function getDebrief(_s: CaseSession): CaseDebrief {
  return notImplemented("BE-3.3 getDebrief");
}

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
export const storage = {
  load(): LocalProgress {
    return notImplemented("BE-1.3 storage.load");
  },
  save(_p: LocalProgress): void {
    return notImplemented("BE-1.3 storage.save");
  },
  clearAll(): void {
    return notImplemented("BE-1.3 storage.clearAll");
  },
};
