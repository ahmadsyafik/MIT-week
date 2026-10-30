/**
 * @jagaruang/contracts: SUMBER KEBENARAN TUNGGAL bentuk data lintas domain.
 * Pemilik: branch `development`. Mengubah file ini WAJIB lewat RFC
 * (lihat docs/universal/BOUNDARIES_AND_CONTRACTS.md §5). Dokumen padanan:
 * docs/universal/INTERFACES.md
 *
 * Aturan: perubahan harus kompatibel mundur (field baru = opsional).
 */

export const CONTRACT_VERSION = "0.1.0";

/* ───────────── Level, skor, label ───────────── */

export const LEVELS = ["L1", "L2", "L3", "L4", "L5"] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_WEIGHT: Record<Level, number> = {
  L1: 5,
  L2: 10,
  L3: 20,
  L4: 30,
  L5: 40,
};

export const CATEGORY_CAP = 40; // batas poin per kategori
export const COMBO_BONUS = 10; // bonus bila tanda berasal dari >= 3 kategori
export const COMBO_MIN_CATEGORIES = 3;
export const SCORE_MAX = 100;
export const INPUT_MAX_CHARS = 5000;

export type Band = "belum_terlihat" | "waspada" | "tinggi" | "sangat_tinggi";

export const BAND_LABEL: Record<Band, string> = {
  belum_terlihat: "Belum terlihat tanda bahaya",
  waspada: "Waspada",
  tinggi: "Risiko tinggi",
  sangat_tinggi: "Risiko sangat tinggi",
};

/** Teks wajib tampil di bawah setiap hasil. Jangan memakai kata "aman"/"pasti" sebagai klaim. */
export const DISCLAIMER =
  "Hasil ini hanya indikasi berbasis aturan dan bisa keliru. Tidak adanya tanda bahaya bukan bukti bahwa sebuah pesan, link, atau file terpercaya. Verifikasi lewat kanal resmi.";

/* ───────────── Cek (Analyzer) ───────────── */

export type FileSource = "whatsapp" | "telegram" | "email" | "toko_resmi" | "lainnya";

export type AnalyzeInput =
  | { kind: "message"; text: string }
  | { kind: "link"; url: string }
  | {
      kind: "file";
      fileName: string; // hanya nama + ekstensi, isi file TIDAK dibaca
      source: FileSource;
      permissions: string[]; // id izin dari content/permissions.json
    };

export interface RedFlag {
  ruleId: string;
  level: Level;
  category: string;
  /** Posisi [mulai, akhir) pada teks yang sudah dinormalisasi/disamarkan. Opsional. */
  span?: [number, number];
  why: string; // kenapa ini mencurigakan
  verify: string; // cara verifikasi
}

export interface AnalysisResult {
  score: number; // 0-100, JANGAN ditampilkan sebagai persentase penipuan
  band: Band;
  flags: RedFlag[];
  modus: string[]; // id modus
  malwareTypes: string[]; // id jenis malware
  /** Teks yang dianalisis setelah normalisasi + penyamaran data pribadi (untuk highlight). */
  displayText?: string;
  piiMasked?: PiiKind[];
  disclaimer: string;
}

export type PiiKind = "phone" | "account" | "email" | "nik";
export interface MaskResult {
  masked: string;
  found: PiiKind[];
}

/* ───────────── Konten statis (JSON dibundel) ───────────── */

export interface MalwareType {
  id: string;
  name: string;
  meaning: string;
  howItWorks: string;
  entryPoint: string;
  firstResponse: string;
}

export interface Modus {
  id: string;
  name: string;
  description: string;
  malwareTypeId?: string;
  actionGuideId?: string;
  relatedCaseId?: string;
}

export interface ReportChannel {
  id: string;
  name: string;
  url?: string;
  contact?: string;
  verifiedAt: string; // ISO date
}

export type ActionCondition =
  | "belum_klik"
  | "sudah_install"
  | "sudah_transfer"
  | "akun_diretas"
  | "orang_dekat_hampir_kena";

export interface ActionStep {
  id: string;
  order: number;
  text: string;
  urgency: "segera" | "hari_ini" | "minggu_ini";
  channelId?: string;
}

export interface ActionGuide {
  id: string;
  condition: ActionCondition;
  title: string;
  steps: ActionStep[];
}

/* ───────────── Latih (Case engine) ───────────── */

export type CaseNodeType = "mission" | "investigation" | "decision" | "consequence" | "debrief";

export interface CaseOption {
  id: string;
  label: string;
  score: number;
  nextNodeId: string;
  /** Bila pilihan berisiko: tautan langsung ke panduan Lindungi. */
  actionGuideId?: string;
  feedback?: string;
}

export interface CaseEvidence {
  id: string;
  label: string;
  isRedFlag: boolean;
  why?: string;
}

export interface CaseNode {
  id: string;
  caseId: string;
  type: CaseNodeType;
  screen?: string; // teks tampilan tiruan (chat/layar)
  text: string;
  evidence?: CaseEvidence[];
  options?: CaseOption[];
  nextNodeId?: string;
}

export interface CaseDefinition {
  id: string;
  title: string;
  modusId: string;
  durationMin: number;
  startNodeId: string;
  briefing: string[]; // 3-4 kartu
  nodes: CaseNode[];
}

export interface CaseSession {
  caseId: string;
  currentNodeId: string;
  score: number;
  evidenceFound: string[];
  hintsUsed: number;
  history: string[]; // id node yang dilalui
  finished: boolean;
}

export type CaseRank = "Pemula" | "Penjaga" | "Guardian";

export interface CaseDebrief {
  score: number; // maks 100: investigasi 40, keputusan 50, tanpa petunjuk 10
  rank: CaseRank;
  flagCode: string; // format TRUST{...}
  missedFlags: { evidenceId: string; label: string; why: string }[];
  idealAnswer: string;
}

/* ───────────── Kilat 2 Menit (Triage) ───────────── */

export interface TriageMessage {
  id: string;
  content: string;
  isScam: boolean;
  ruleIds: string[];
  explanation: string;
  modusId?: string;
}

export type TriageChoice = "biasa" | "curiga"; // BUKAN "aman"

export interface TriageResult {
  score: number;
  total: number;
  details: { messageId: string; chosen: TriageChoice | null; correct: boolean; explanation: string }[];
  recommendedCaseIds: string[];
}

/* ───────────── Kartu Peringatan & Sandi Keluarga ───────────── */

export interface WarningCard {
  text: string; // teks siap salin; TIDAK memuat pesan mentah pengguna
}

/* ───────────── Data lokal (localStorage) ───────────── */

export const STORAGE_SCHEMA_VERSION = 1;

export interface CaseAttempt {
  caseId: string;
  score: number;
  rank: CaseRank;
  flagCode: string;
  finishedAt: string; // ISO
}

export interface LocalProgress {
  schemaVersion: number;
  lessonsDone: string[];
  actionChecks: Record<string, string[]>; // guideId -> stepId yang dicentang
  caseAttempts: CaseAttempt[];
  triageBest?: { score: number; total: number; finishedAt: string };
  safeword?: { word: string; createdAt: string }; // opsional, default TIDAK disimpan
}
