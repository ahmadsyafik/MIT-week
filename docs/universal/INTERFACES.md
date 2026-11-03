# INTERFACES.md: Kontrak Data & API Publik

> **Sumber kebenaran tunggal.** Padanan kode: `packages/contracts/src/index.ts`. Versi: `0.1.0`.
> Mengubah file ini atau kontrak kode wajib lewat RFC ([BOUNDARIES_AND_CONTRACTS.md](BOUNDARIES_AND_CONTRACTS.md) bagian 5).
> Aturan kompatibilitas: field baru bersifat **opsional**; jangan hapus field yang sudah dipakai.

## 1. Konstanta skoring (dari PRD FR-1.3, FR-1.4)

| Level | Bobot |
|---|---|
| L1 Info | 5 |
| L2 Rendah | 10 |
| L3 Sedang | 20 |
| L4 Tinggi | 30 |
| L5 Kritis | 40 (menentukan label akhir) |

- Batas **40 poin per kategori**; bonus **+10** bila tanda berasal dari **>= 3 kategori**; skor maksimum **100**.
- Label: `0-14` Belum terlihat tanda bahaya · `15-39` Waspada · `40-69` Risiko tinggi · `70-100` **atau ada L5** Risiko sangat tinggi.
- Input teks maksimal **5.000 karakter**.

## 2. Bentuk data utama

```ts
type AnalyzeInput =
  | { kind: "message"; text: string }
  | { kind: "link"; url: string }
  | { kind: "file"; fileName: string; source: FileSource; permissions: string[] };

interface AnalysisResult {
  score: number;                 // 0-100, jangan tampil sebagai persentase penipuan
  band: "belum_terlihat" | "waspada" | "tinggi" | "sangat_tinggi";
  flags: RedFlag[];              // ruleId, level, category, span?, why, verify
  modus: string[];               // id modus
  malwareTypes: string[];        // id jenis malware
  displayText?: string;          // teks ternormalisasi + data pribadi disamarkan
  piiMasked?: PiiKind[];
  disclaimer: string;            // SELALU tampil
}
```
Tipe lengkap (Kamus, Lindungi, Latih, Triage, Storage) ada di `packages/contracts/src/index.ts`. Itu yang dipakai kompilator, jadi tetap rujukan akhir.

## 3. API publik `@jagaruang/core` (yang boleh dipakai Frontend)

| Fungsi | Masukan | Keluaran | Tugas BE |
|---|---|---|---|
| `maskPii` | `text` | `MaskResult` | BE-2.1 |
| `analyze` | `AnalyzeInput` | `AnalysisResult` | BE-2.2 |
| `listMalwareTypes` | - | `MalwareType[]` | BE-3.1 |
| `listModus` | - | `Modus[]` | BE-3.1 |
| `listCases` | - | `CaseDefinition[]` | BE-3.2 |
| `startCase` | `caseId` | `CaseSession` | BE-3.3 |
| `tapEvidence` | `session, evidenceId` | `CaseSession` | BE-3.3 |
| `useHint` | `session` | `CaseSession` | BE-3.3 |
| `chooseOption` | `session, optionId` | `CaseSession` | BE-3.3 |
| `getDebrief` | `session` | `CaseDebrief` | BE-3.3 |
| `listActionGuides` | - | `ActionGuide[]` | BE-4.1 |
| `listReportChannels` | - | `ReportChannel[]` | BE-4.1 |
| `buildWarningCard` | `AnalysisResult` | `WarningCard` | BE-4.2 |
| `pickTriageMessages` | `count?, seed?` | `TriageMessage[]` | BE-5.1 |
| `scoreTriage` | `messages, answers` | `TriageResult` | BE-5.1 |
| `generateSafeword` | `wordCount?` | `string` | BE-5.2 |
| `storage.load/save/clearAll` | - | `LocalProgress` | BE-1.3 |

Semua fungsi **sinkron dan murni** (kecuali `storage`), tidak melakukan permintaan jaringan.
Fungsi yang belum selesai melempar `Error("NOT_IMPLEMENTED: <id tugas>")`. Frontend memakai mock sampai selesai.

## 4. Aturan perilaku yang harus dipatuhi kedua sisi

1. `analyze` tidak membuka link dan tidak membaca isi file.
2. Input kosong tidak boleh melempar error ke UI: Frontend memvalidasi, core mengembalikan hasil kosong yang valid.
3. Pesan sah seperti "jangan bagikan kode OTP ini kepada siapa pun" tidak boleh memicu aturan L5 (negasi).
4. Kartu Peringatan tidak memuat salinan pesan mentah pengguna.
5. Pilihan jawaban Kilat 2 Menit: `"biasa"` atau `"curiga"`. Tidak ada `"aman"`.
6. Level terendah tidak memakai hijau/centang/perisai. Ikon info saja (aturan UI, FE).
7. `storage` tidak boleh melempar error bila `localStorage` kosong/dimatikan. Kembalikan default.
8. Sandi Keluarga **tidak disimpan** kecuali pengguna mengaktifkan opsi simpan.
