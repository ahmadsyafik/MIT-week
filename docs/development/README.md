# DOMAIN DEVELOPMENT (Integrasi & Deploy): README

> **PENANGGUNG JAWAB:** Syifa (`@syifamojocanggih-hash`; ubah bila disepakati)
> **BRANCH:** `development` (dan `main` untuk rilis)
> **BOLEH DITULIS (R/W):** `package.json` root, `.github/`, `scripts/`, `.githooks/`, `vercel.json`, `packages/contracts/`, `docs/universal/`, `docs/development/`, `README.md` root

## 1. Mandat
- Menggabungkan pekerjaan `backend` dan `frontend` di `development` (staging dan **deploy gabungan**).
- Menjaga CI hijau (`ci`, `scope-guard`) dan kontrak (`packages/contracts`) tetap konsisten.
- Mengelola deploy Vercel, header keamanan (CSP), dan rilis ke `main` + tag.
- Menjaga README root, video demo, dan checklist rilis.

## 2. Zona terlarang
1. ❌ Mengerjakan fitur di `packages/core/` atau `apps/web/`. Kembalikan ke pemiliknya lewat issue.
2. ❌ Mengubah kontrak tanpa RFC yang disepakati dua pihak.
3. ❌ Push langsung ke `main`. Selalu lewat PR dari `development`.
4. ❌ Melonggarkan CSP atau menambah layanan pihak ketiga tanpa memperbarui halaman Keterbatasan.

## 3. Dokumen
- [`GITHUB_SETUP.md`](GITHUB_SETUP.md): **panduan lengkap setup repo, branch, proteksi, Vercel**
- [`DEPLOY.md`](DEPLOY.md): konfigurasi deploy & checklist
- [`../universal/INTEGRATION_RUNBOOK.md`](../universal/INTEGRATION_RUNBOOK.md): urutan merge & rilis
