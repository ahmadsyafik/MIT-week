# Dokumentasi Teknis JagaRuang (MIT-Week 2026)

Indeks dokumentasi resmi, arsitektur sistem, spesifikasi antarmuka, dan matriks wewenang pengembangan proyek **JagaRuang** (Platform Edukasi & Mitigasi Anti-Penipuan Digital).

---

## 1. Peta Indeks Dokumentasi

```
docs/
├── README.md                          <- Dokumen indeks utama ini
├── universal/                         <- Kontrak Global & Arsitektur Lintas Peran
│   ├── BOUNDARIES_AND_CONTRACTS.md    <- Aturan batas folder & protokol RFC perubahan tipe
│   ├── INTERFACES.md                  <- Spesifikasi bentuk data & API @jagaruang/core
│   ├── GIT_WORKFLOW.md                <- Alur branch, konvensi commit, & resolusi konflik
│   ├── INTEGRATION_RUNBOOK.md         <- Prosedur integrasi ke development & rilis ke main
│   ├── DECISIONS.md                   <- Catatan Keputusan Arsitektur (ADR-001 s.d. ADR-007)
│   ├── ROADMAP.md                     <- Rencana kerja & milestone pencapaian tim
│   └── PRD_JagaRuang.pdf              <- Product Requirements Document resmi
├── backend/                           <- Domain Logika & Inferensi (@jagaruang/core)
│   ├── README.md                      <- Mandat & pengenalan modul core
│   ├── TASK_GUIDE.md                  <- Daftar tugas backend (BE-1.x s.d. BE-5.x)
│   ├── SETUP.md                       <- Panduan pengujian & eksekusi vitest di lokal
│   ├── DATA_MODEL.md                  <- Struktur aturan heuristik 22 rules & taksonomi modus
│   └── CHANGELOG.md                   <- Catatan rilis & evaluasi akurasi analyzer
├── frontend/                          <- Domain Antarmuka Pengguna (@jagaruang/web)
│   ├── README.md                      <- Arsitektur frontend React 18, Vite, & modular learning
│   ├── TASK_GUIDE.md                  <- Panduan tugas frontend (FE-1.x s.d. FE-6.x)
│   ├── SETUP.md                       <- Panduan menjalankan server frontend di lokal
│   ├── PAGES_AND_FLOWS.md             <- Spesifikasi lengkap rute halaman, modul, & state alur
│   ├── DESIGN_SYSTEM.md               <- Token warna, tipografi Plus Jakarta Sans, & WCAG AA
│   ├── MOCK_DATA.md                   <- Panduan konsumsi mock data
│   └── CHANGELOG.md                   <- Riwayat perubahan UI, komponen modular, & refactoring
└── development/                       <- Integrasi, Pengujian, & Deployment
    ├── README.md                      <- Pengenalan peran integrasi
    ├── DEPLOY.md                      <- Prosedur deploy ke Vercel & verifikasi CSP
    └── GITHUB_SETUP.md                <- Konfigurasi proteksi branch & CI workflows
```

---

## 2. Matriks Wewenang & Batas Cakupan Pengembangan

Untuk menjaga kebersihan arsitektur monorepo, setiap branch memiliki batas cakupan modifikasi yang ditegakkan secara otomatis melalui hook lokal (`scripts/scope-check.sh`) dan GitHub Actions:

| Branch | Penanggung Jawab | Direktori Wewenang (R/W) | Larangan Modifikasi Langsung |
|---|---|---|---|
| `backend` | Raffi (`@azzakyDp`) | `packages/core/`, `docs/backend/` | `apps/web/`, `docs/frontend/`, `packages/contracts/`, `docs/universal/`, file root |
| `frontend` | Syifa & Mutiara (`@syifamojocanggih-hash`, `@mutiaradewanda`) | `apps/web/`, `docs/frontend/` | `packages/core/`, `docs/backend/`, `packages/contracts/`, `docs/universal/`, file root |
| `development` | Raffi (`@azzakyDp`); Pengujian oleh Syafi (`@ahmadsyafik`) | File root, `.github/`, `scripts/`, `vercel.json`, `packages/contracts/`, `docs/universal/`, `docs/development/` | Menulis kode fitur milik `packages/core/` atau `apps/web/` secara langsung |
| `main` | Integrator | Menerima penggabungan (*merge*) tervalidasi dari `development` atau `frontend` | Tidak diperkenankan commit langsung tanpa verifikasi check |

---

## 3. Lima Prinsip Utama Arsitektur

1. **Kontrak Data Bersama (Contract-First)**: Semua bentuk data yang melintasi batas domain frontend dan backend didefinisikan secara deklaratif di `packages/contracts` dan [INTERFACES.md](universal/INTERFACES.md).
2. **Pintu Gerbang Tunggal (Single Entry Point)**: Aplikasi frontend mengonsumsi fungsi logika `@jagaruang/core` secara eksklusif melalui `apps/web/src/lib/coreClient.ts`. Tidak diperbolehkan mengimpor file internal `packages/core/src/...` secara bebas.
3. **Privasi Penuh 100% Client-Side**: Aplikasi tidak memiliki server backend runtime, database, cookies pelacak, maupun skrip analitik pihak ketiga. Seluruh evaluasi inferensi heuristik berjalan lokal di browser pengguna (lihat [ADR-001](universal/DECISIONS.md)).
4. **Penyajian Informasi Objektif (No False Certainty)**: Menghindari klaim kepastian mutlak seperti "100% aman" atau "pasti penipuan". Seluruh hasil disajikan dalam bentuk tingkat kewaspadaan berbasis indikator kejanggalan disertai disclaimer permanen.
5. **Aksesibilitas & Inklusivitas**: Antarmuka mematuhi standar kontras warna WCAG AA, navigasi ramah keyboard, pengumuman pembaca layar (*screen reader* ARIA), serta dukungan responsif dari layar terkecil (360 px).

---

## 4. Panduan Navigasi Cepat Dokumen

- Ingin menjalankan aplikasi di lokal? Baca [SETUP Frontend](frontend/SETUP.md) atau [README Root](../README.md#5-cara-menjalankan-di-komputer-lokal).
- Ingin memahami alur navigasi dan seluruh 12 modul edukasi? Baca [PAGES_AND_FLOWS.md](frontend/PAGES_AND_FLOWS.md).
- Ingin mempelajari sistem warna, komponen kartu, dan tipografi? Baca [DESIGN_SYSTEM.md](frontend/DESIGN_SYSTEM.md).
- Ingin mengetahui alasan arsitektur di balik keputusan teknis? Baca [DECISIONS.md](universal/DECISIONS.md).
