# TASK_GUIDE.md: Backend (Logika & Data)

> **Branch:** `backend` · **R/W:** `packages/core/`, `docs/backend/`
> **Kontrak:** [`../universal/INTERFACES.md`](../universal/INTERFACES.md)
> Prioritas PRD: Must = F1, F2, F3(Latih), F4(Lindungi), F5(Coba contoh), F6. Should = Kamus, Kartu. Could = Kilat, Sandi.

Tanda: 🟢 Must · 🟡 Should · ⚪ Could

---

## TAHAP 1: Fondasi (hari 1)

#### 🟢 BE-1.1: Skema Zod & loader konten
- **File:** `src/content/schemas.ts`, `src/content/loader.ts`
- **Isi:** skema Zod untuk rules, modus, malware, permissions, cases, triage, action guides, contacts. Loader **melewati item rusak** dan `console.warn`, tidak melempar (satu kasus rusak tidak boleh menjatuhkan app).
- **Checklist:** [ ] item rusak dilewati [ ] tes untuk ID tidak cocok [ ] tidak ada `fetch`; JSON di-import saat build

#### 🟢 BE-1.2: Kerangka berkas konten JSON
- **File:** `src/content/*.json`, `src/content/cases/*.json`
- **Checklist:** [ ] semua domain fiktif [ ] ID konsisten (modus <-> malware <-> action guide <-> case)

#### 🟢 BE-1.3: Wrapper localStorage ber-versi
- **File:** `src/storage/index.ts` -> implementasi `storage.load/save/clearAll`
- **Aturan:** try/catch di semua akses, versi skema (`STORAGE_SCHEMA_VERSION`), default saat kosong/rusak/dimatikan, `clearAll` menghapus semua kunci JagaRuang.
- **Checklist:** [ ] tidak melempar saat `localStorage` mati [ ] tes migrasi versi

---

## TAHAP 2: Analyzer (hari 2-3)

#### 🟢 BE-2.1: `maskPii`
- Samarkan nomor HP, nomor rekening, email, NIK **sebelum** diproses dan ditampilkan. Kembalikan `found` agar UI menampilkan pemberitahuan.
- **Checklist:** [ ] 4 jenis data tersamarkan [ ] tidak mengubah teks tanpa data pribadi

#### 🟢 BE-2.2: `analyze` (pesan, link, file, izin)
- **Pipeline:** batasi 5.000 karakter -> normalisasi (huruf kecil, NFKC, buang karakter tak terlihat) -> `maskPii` -> jalankan aturan -> skor per kategori (cap 40) -> bonus kombinasi -> override L5 -> label -> petakan modus & jenis malware.
- **22 aturan L1-L5** (bobot 5/10/20/30/40). Aturan file/izin sudah ditetapkan PRD:
  - File (FR-2.2): `.apk` dari chat/link (L5); ekstensi ganda (L4); ekstensi eksekusi pada file yang mengaku dokumen/foto (L4); dokumen bermakro (L3); arsip berkata sandi dari pengirim tak dikenal (L3); nama umpan seperti undangan, resi, tilang, BPJS (L2); pengirim tak dikenal (L2).
  - Izin (FR-2.3): Aksesibilitas, Baca/terima SMS (L5); akses notifikasi, tampil di atas aplikasi lain, administrator perangkat, pasang dari sumber tak dikenal (L4); kontak/galeri/lokasi/mikrofon tanpa kaitan fungsi (L3).
  - Kombinasi (FR-2.4): sumber non-toko resmi + izin L5 = sangat tinggi; izin L5 dari **toko resmi** hanya naik ke **Waspada** dengan penjelasan konteks.
- **Negasi (FR-1.9):** "jangan bagikan kode OTP ini kepada siapa pun" tidak memicu L5.
- **Link (FR-1.6):** hanya string URL dianalisis (typosquatting, shortener, domain mencurigakan). Tidak pernah dibuka.
- Setiap `RedFlag` wajib punya `why` dan `verify`.
- **Checklist (kriteria penerimaan PRD):**
  - [ ] Contoh loker palsu fiktif -> **Risiko sangat tinggi**, ≥ 4 red flag
  - [ ] Notifikasi OTP sah fiktif -> **bukan** tinggi/sangat tinggi
  - [ ] Input kosong -> hasil valid, tidak error
  - [ ] `Undangan Pernikahan Digital.apk` dari WhatsApp + izin Baca SMS -> sangat tinggi
  - [ ] Izin sama dari toko resmi -> tidak sangat tinggi karena izin saja

#### 🟢 BE-2.3: Set uji analyzer
- **File:** `src/analyzer/__tests__/*.test.ts`
- **Isi:** ≥ 30 kalimat uji, termasuk **≥ 10 pesan sah**. Catat yang meleset (positif/negatif palsu) di `CHANGELOG.md` untuk README.
- **Performa:** input 5.000 karakter < 1 detik. Regex linear (cegah ReDoS).

---

## TAHAP 3: Konten & Latih (hari 4-6)

#### 🟡 BE-3.1: Kamus Jebakan (data)
- 10 entri: phishing (bukan malware), trojan, SMS stealer/banking trojan, spyware, RAT, keylogger, infostealer, ransomware, adware, worm. Tiap entri: arti, cara kerja, pintu masuk umum di Indonesia, penanganan awal. Fungsi `listMalwareTypes`, `listModus`.
- Penanganan malware = praktik umum; cocokkan dengan panduan resmi bank/OJK sebelum rilis (FR-4.6).

#### 🟢 BE-3.2: Tiga kasus Latih (JSON)
- K1 "Undangan Pernikahan Digital.apk", K2 "Lihat Foto Paket", K3 loker admin WFH palsu. Tiap kasus: briefing 3-4 kartu; fase Misi -> Investigasi -> Keputusan (2-3 titik) -> Konsekuensi -> Debrief.
- **Checklist:** [ ] setiap jalur berakhir di layar akhir valid [ ] pilihan berisiko punya `actionGuideId` (tautan ke Lindungi) [ ] tidak ada link klik ke situs nyata

#### 🟢 BE-3.3: Case engine
- `startCase`, `tapEvidence`, `useHint` (kurangi skor), `chooseOption`, `getDebrief`.
- **Skor maks 100:** investigasi 40, keputusan 50, tanpa petunjuk 10. Peringkat: Pemula, Penjaga, Guardian. Kode selesai `TRUST{...}`.
- Pilihan berisiko -> layar konsekuensi + tautan ke Lindungi, **bukan game over**.
- Debrief: red flag terlewat + alasan + jawaban ideal.

---

## TAHAP 4: Lindungi & Kartu (hari 7)

#### 🟢 BE-4.1: Action guides & `contacts.json`
- 3 kondisi wajib: (1) belum klik/transfer, (2) sudah memasang file/memberi izin, (3) sudah transfer/mengirim data. Opsional: akun diretas, orang dekat hampir kena.
- Kanal (FR-4.4): IASC (iasc.ojk.go.id, Kontak OJK 157, WhatsApp 081-157-157-157, konsumen@ojk.go.id), kepolisian, bank/e-wallet, sipasti.ojk.go.id, cekrekening.id, aduannomor.id. Tiap kanal punya `verifiedAt`.
- **Verifikasi ulang semua tautan/kontak** saat rilis. Jangan menjanjikan dana kembali (FR-4.5).

#### 🟡 BE-4.2: `buildWarningCard`
- Teks siap salin: ringkasan modus + 2-3 tanda bahaya + imbauan singkat. **Tidak** memuat pesan mentah pengguna.

---

## TAHAP 5: Pembeda (hari 8), ⚪ boleh dipangkas

#### ⚪ BE-5.1: Triage
- `pickTriageMessages` (10 acak dari bank fiktif), `scoreTriage`. Umpan balik tanpa tanda bahaya: "Tidak ada tanda bahaya di pesan ini, tetap verifikasi jika ragu." Rekomendasi kasus Latih sesuai kesalahan.

#### ⚪ BE-5.2: `generateSafeword`
- 2-3 kata acak memakai `crypto.getRandomValues` (bukan `Math.random`). Daftar kata ada di `src/content/`.

---

## TAHAP 6: Penutup (hari 9-10)

- **BE-6.1** Tes integritas konten: semua ID saling merujuk valid.
- **BE-6.2** Pemindai kata terlarang di semua JSON konten ("aman", "pasti", "100%").
- **BE-6.3** Bagian README Backend + hasil uji (termasuk yang meleset).

---

## Definition of Done (per PR ke `development`)
- [ ] `npm run typecheck && npm test` hijau
- [ ] `npm run scope` hijau
- [ ] `docs/backend/CHANGELOG.md` diperbarui
- [ ] Tidak menyentuh folder di luar wewenang
