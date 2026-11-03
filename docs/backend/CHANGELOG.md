# Changelog: Backend (Logika & Data)

Format: `[versi] tanggal` lalu daftar perubahan, merujuk ID tugas di [`TASK_GUIDE.md`](TASK_GUIDE.md).

## [Belum dirilis]

### Ditambahkan

- **BE-1.1**: Skema Zod untuk validasi konten (`src/content/schemas.ts`) dan loader konten nir-jaringan yang toleran terhadap item rusak (`src/content/loader.ts`). `RuleSchema` sudah dilengkapi field `negationPatterns?: string[]` untuk mendukung FR-1.9 (negasi OTP).
- **BE-1.2**: Berkas konten JSON dasar dengan domain rekaan (`.test`, `.invalid`, `example.com`), nomor fiktif, serta teks firstResponse dan panduan tanpa kata terlarang ("aman", "pasti", "100%"):
  - `rules.json`: Di Phase 1 baru memuat 1 rule (`MSG-PAYMENT-01`). Phase 2 akan mengisi 22 rules L1-L5 lengkap beserta pola negasinya.
  - `modus.json` (5 modus wajib: loker palsu, giveaway palsu, undangan APK, foto paket APK, phishing link)
  - `malware.json` (10 jenis malware lengkap dengan arti, cara kerja, pintu masuk, dan penanganan awal tanpa klaim berlebihan)
  - `permissions.json` (10 izin Android berisiko L3-L5)
  - `contacts.json` (kanal pelaporan resmi IASC, OJK, SiPasti, Cek Rekening, Aduan Nomor, Polisi)
  - `action-guides.json` (3 panduan aksi wajib: `guide_belum_klik`, `guide_sudah_install`, `guide_sudah_transfer`)
  - `triage.json` (15 pesan uji: 8 penipuan, 7 pesan wajar/sah)
  - `cases/` (`k1-undangan-apk.json`, `k2-foto-paket.json`, `k3-loker-palsu.json` dengan array `nodes: []`)
- **BE-1.3**: Wrapper penyimpanan lokal ber-versi `storage.load`, `storage.save`, `storage.clearAll` (`src/storage/index.ts`) dengan try/catch menyeluruh, migrasi schemaVersion, penanganan saat localStorage mati/rusak, dan isolasi prefiks `jagaruang:`.
- Rangkaian pengujian unit untuk loader konten (`src/content/__tests__/loader.test.ts`) dan storage (`src/storage/__tests__/storage.test.ts`).
- Kerangka `@jagaruang/core`: tanda tangan API publik (stub), `scoring.ts` (skor + label) beserta tes.

---

## Hasil uji analyzer (isi menjelang rilis; dipakai di README)

| #   | Kalimat uji (fiktif) | Seharusnya | Hasil   | Status               |
| --- | -------------------- | ---------- | ------- | -------------------- |
| 1   | _(isi)_              | _(isi)_    | _(isi)_ | _(sesuai / meleset)_ |

**Kasus yang meleset (dilaporkan terbuka):** _(isi)_
