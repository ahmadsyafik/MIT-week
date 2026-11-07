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
export function buildWarningCard(_result?: AnalysisResult): WarningCard {
  return {
    text: `JagaRuang: Yuk, Jaga Keluarga dari Penipuan Digital!

Halo Keluarga & Sahabat tersayang,

Akhir-akhir ini makin banyak modus penipuan online yang menyasar siapa saja, termasuk orang-orang terdekat kita. Yuk, kenali tandanya bersama-sama.

Ciri-ciri Pesan Mencurigakan

Biasanya pelaku berpura-pura jadi orang yang kita kenal atau pihak resmi seperti bank atau kurir, lalu:

- Mendesak kita buru-buru transfer uang
- Mengirim file aneh berformat .apk
- Mengarahkan ke link yang bukan situs resmi

Apa yang Harus Kita Lakukan?

Pertama, jangan langsung klik link atau pasang file yang dikirim, sekalipun dari nomor yang kita kenal.

Kedua, jangan pernah kasih tahu kode OTP, PIN, atau data rekening ke siapa pun, walau mengaku dari bank sekalipun.

Ketiga, cek dulu baru percaya. Kalau ragu, telepon langsung ke call center resmi, atau tanya tatap muka ke orang yang bersangkutan.

Semua pengecekan di JagaRuang diproses langsung di perangkatmu, datamu aman dan tidak dikirim ke mana-mana.

Yuk saling ingatkan, karena menjaga satu sama lain dimulai dari hal kecil seperti ini.

#JagaRuang #CekLatihLindungi #GuardiansOfTheDigitalSpace`,
  };
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
