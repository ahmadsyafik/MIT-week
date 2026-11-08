# DECISIONS.md: Catatan Keputusan Arsitektur (ADR)

## ADR-001: Tanpa server aplikasi. "Backend" = logika & data di browser
- **Konteks:** PRD mensyaratkan tanpa backend/database, tanpa data pribadi, tanpa jaringan saat runtime. Namun tim dibagi Backend/Frontend/Development.
- **Keputusan:** Peran Backend memegang paket `@jagaruang/core` (fungsi murni TypeScript, konten JSON, validasi Zod, wrapper localStorage, tes). Frontend memegang UI.
- **Konsekuensi:** Pembagian tetap tegas karena folder dan API publik terpisah. Klaim privasi ("tidak ada data dikirim") tetap benar.
- **Jika kelak butuh server** (mis. pelaporan komunitas): wajib RFC, sertakan banner pemberitahuan pihak ketiga/pengiriman data, dan perbarui halaman Keterbatasan.

## ADR-002: Monorepo npm workspaces
- `packages/contracts` (tipe bersama), `packages/core` (Backend), `apps/web` (Frontend).
- Tiap peran punya `package.json` sendiri sehingga dependensi tidak saling menimpa. Hanya `package-lock.json` yang dipakai bersama.

## ADR-003: Core dikonsumsi sebagai source TypeScript (tanpa langkah build)
- `exports` mengarah ke `src/index.ts`. Vite dan Vitest mengompilasinya langsung. Lebih sedikit konfigurasi, lebih sedikit sumber bug.

## ADR-004: Frontend memakai mock sampai core siap
- `VITE_USE_MOCK=true` (default). Satu-satunya pintu: `apps/web/src/lib/coreClient.ts`.

## ADR-005: CSP ketat, `style-src 'unsafe-inline'` hanya untuk atribut style React
- `default-src 'self'`, skrip hanya `'self'`. Longgarkan `style-src` karena atribut `style={{}}` (mis. lebar meter) diblokir tanpa itu.

## ADR-006: Penegakan batas folder otomatis
- `scripts/scope-check.sh` dipakai hook lokal dan GitHub Action. Aturan di dokumen saja tidak cukup saat deadline.

## ADR-007: Arsitektur Modul Pembelajaran Modular & Pusat Darurat 100% Lokal di Memori
- **Konteks:** Terdapat 12 modul edukasi (`m1` s.d. `m12`) dengan kompleksitas interaktif tinggi (simulasi izin Android, generator kronologi laporan IASC, kalkulator biaya, hotspot kasir, chat dialog pendampingan). Menyimpan seluruh data dan logika dalam satu file besar `Belajar.tsx` menciptakan *code bloat* (>4.000 baris) dan menyulitkan pengujian serta pembaruan data resmi secara berkala.
- **Keputusan:**
  1. Memisahkan data setiap modul ke file TypeScript terdedikasi di `apps/web/src/data/modul[Nama].ts` dengan metadata `lastUpdated`, `sources`, `asOf`, dan fungsi validasi build otomatis (`validate*Data()`).
  2. Memisahkan komponen UI setiap modul ke `apps/web/src/components/modul/Modul[Nama]Page.tsx`.
  3. Modul `m11` (Pusat Darurat) dan fitur Generator Kronologi beroperasi **100% lokal di memori sesi peramban** (tanpa penyimpanan persisten, tanpa pengiriman jaringan) demi melindungi kerahasiaan data korban insiden penipuan.
- **Konsekuensi:** Peningkatan drastis keterbacaan kode (*maintainability*), isolasi regresi, build time tetap cepat, dan integritas data statistik resmi terjamin saat proses kompilasi.
