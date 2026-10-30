# DOMAIN FRONTEND (Tampilan): README

> **PENANGGUNG JAWAB:** [tiara] (`@mutiaradewanda`)
> **BRANCH:** `frontend`
> **BOLEH DITULIS (R/W):** `apps/web/`, `docs/frontend/`

## 1. Mandat

Frontend memegang semua yang dilihat dan disentuh pengguna: halaman, komponen, gaya, interaksi, copywriting UI, responsivitas (mulai 360 px), dan aksesibilitas. Data dan logika diambil dari `@jagaruang/core` **hanya lewat** `apps/web/src/lib/coreClient.ts`. Selama Backend belum selesai, Frontend memakai mock di `apps/web/src/mocks/`.

## 2. Zona terlarang

1. ❌ **Dilarang menulis logika deteksi/skor/aturan.** Jangan menghitung skor atau menentukan label sendiri. Tampilkan `AnalysisResult` apa adanya.
2. ❌ **Dilarang menyentuh `packages/core/`** dan `docs/backend/`.
3. ❌ **Dilarang mengimpor `packages/core/src/...` langsung.** Pakai paket `@jagaruang/core` lewat `coreClient.ts`.
4. ❌ **Dilarang mengubah `packages/contracts/` atau `docs/universal/` sepihak.** Pakai RFC.
5. ❌ **Dilarang menambah jaringan saat runtime:** fetch/XHR, analytics, cookie, font/CDN/skrip eksternal.
6. ❌ **Dilarang `dangerouslySetInnerHTML`, `eval`.** Highlight red flag dibuat lewat elemen React (`<mark>`).
7. ❌ **Dilarang memakai kata "aman", "pasti", "100%", persentase penipuan** di teks UI. Dilarang hijau/centang/ikon perisai untuk level terendah.
8. ❌ Mengubah `vercel.json`/CI. Minta Integrator lewat issue.

## 3. Struktur folder milik Frontend

```
apps/web/
├── index.html · vite.config.ts · tsconfig.json · .env.example
└── src/
    ├── main.tsx · App.tsx · index.css
    ├── pages/        <- Beranda, Cek, Latih, Lindungi, Kamus, Kilat, Sandi, Keterbatasan
    ├── components/   <- Layout, RiskMeter, FlagList, Disclaimer, EvidenceCard, ...
    ├── lib/          <- coreClient.ts (pintu tunggal ke core)
    └── mocks/        <- data tiruan sesuai kontrak
```

## 4. Indeks dokumen

1. [`TASK_GUIDE.md`](TASK_GUIDE.md): tugas FE-1.x s.d FE-6.x
2. [`SETUP.md`](SETUP.md): menjalankan di lokal
3. [`PAGES_AND_FLOWS.md`](PAGES_AND_FLOWS.md): spesifikasi halaman & alur
4. [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md): warna level, tipografi, aturan UI
5. [`MOCK_DATA.md`](MOCK_DATA.md): cara memakai/menulis mock
6. [`CHANGELOG.md`](CHANGELOG.md)
