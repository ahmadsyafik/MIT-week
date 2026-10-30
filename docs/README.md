# Dokumentasi JagaRuang (MIT-Week 2026)

Indeks dokumentasi dan matriks wewenang tim. Baca bagian 2 dan 3 **sebelum menulis kode pertama**.

## 1. Peta dokumentasi

```
docs/
├── README.md                          <- dokumen ini
├── universal/                         <- KONTRAK GLOBAL (pemilik: branch development)
│   ├── BOUNDARIES_AND_CONTRACTS.md    <- aturan batas folder & protokol RFC
│   ├── INTERFACES.md                  <- bentuk data & API @jagaruang/core
│   ├── GIT_WORKFLOW.md                <- branch, commit, PR, konflik
│   ├── INTEGRATION_RUNBOOK.md         <- urutan merge ke development & rilis ke main
│   ├── DECISIONS.md                   <- catatan keputusan arsitektur (ADR)
│   ├── ROADMAP.md                     <- rencana 10 hari per peran
│   └── PRD_JagaRuang.pdf              <- PRD (salin manual, lihat GITHUB_SETUP.md)
├── backend/                           <- DOMAIN BACKEND (logika & data)
│   ├── README.md · TASK_GUIDE.md · SETUP.md · DATA_MODEL.md · CHANGELOG.md
├── frontend/                          <- DOMAIN FRONTEND (tampilan)
│   ├── README.md · TASK_GUIDE.md · SETUP.md · PAGES_AND_FLOWS.md
│   └── DESIGN_SYSTEM.md · MOCK_DATA.md · CHANGELOG.md
└── development/                       <- DEPLOY & INTEGRASI
    ├── README.md · DEPLOY.md · GITHUB_SETUP.md
```

## 2. Matriks wewenang (siapa boleh menulis di mana)

| Branch | Penanggung jawab | Boleh ditulis (R/W) | Dilarang keras |
|---|---|---|---|
| `backend` | syafi' (`@ahmadsyafik`) | `packages/core/`, `docs/backend/` | `apps/web/`, `docs/frontend/`, `packages/contracts/`, `docs/universal/`, file root, `.github/`, `scripts/`, `vercel.json` |
| `frontend` | Tiara dan Rapi (`@mutiaradewanda @azzakyDp`) | `apps/web/`, `docs/frontend/` | `packages/core/`, `docs/backend/`, `packages/contracts/`, `docs/universal/`, file root, `.github/`, `scripts/`, `vercel.json` |
| `development` | Syifa (@syifamojocanggih-hash) | file root, `.github/`, `scripts/`, `vercel.json`, `packages/contracts/`, `docs/universal/`, `docs/development/` | Menulis kode fitur milik `packages/core/` atau `apps/web/` secara langsung (selain konflik merge) |
| `main` | Integrator | Tidak ada commit langsung. Hanya menerima merge dari `development` | Semua commit langsung |

`package-lock.json` boleh ikut berubah di `backend` dan `frontend` (otomatis saat `npm install <paket>`).
Konflik lockfile diselesaikan sesuai [GIT_WORKFLOW.md](universal/GIT_WORKFLOW.md) bagian 6.

Aturan ini **ditegakkan otomatis** oleh `scripts/scope-check.sh` (hook `pre-push` di lokal dan workflow `scope-guard` di GitHub).

## 3. Lima aturan emas

1. **Kontrak dulu.** Bentuk data yang melintasi batas domain hanya didefinisikan di `packages/contracts` dan [INTERFACES.md](universal/INTERFACES.md). Mengubahnya wajib lewat RFC.
2. **Satu pintu.** Frontend hanya memakai `@jagaruang/core` lewat `apps/web/src/lib/coreClient.ts`. Tidak ada impor ke `packages/core/src/...`.
3. **Mock dulu.** Frontend bekerja dengan `apps/web/src/mocks` (`VITE_USE_MOCK=true`) sampai Backend selesai. Backend menguji logikanya dengan Vitest tanpa menunggu UI.
4. **Tanpa server, tanpa data pribadi.** Semua berjalan di browser (lihat ADR-001). Tidak ada jaringan saat runtime, tidak ada analytics, tidak ada cookie.
5. **Jujur soal batas.** Tidak ada kata "aman"/"pasti", tidak ada persentase penipuan, disclaimer tampil di setiap hasil.
