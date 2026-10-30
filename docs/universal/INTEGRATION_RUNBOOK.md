# INTEGRATION_RUNBOOK.md: Penggabungan ke `development` dan Rilis ke `main`

## 1. Prinsip
1. Kontrak dulu: integrasi tidak boleh mengubah tanda tangan fungsi/tipe di `packages/contracts`.
2. Tidak ada push langsung ke `development` untuk fitur. Semua lewat PR.
3. Setelah merge, tiap pihak tetap bekerja di branch peran masing-masing.

## 2. Urutan

```
[1] backend  ──PR──> development   (logika + konten + tes)
[2] frontend ──PR──> development   (UI, dengan VITE_USE_MOCK=true dulu)
[3] development: ganti ke core asli (VITE_USE_MOCK=false) -> uji alur penuh
[4] development ──PR──> main       (setelah checklist rilis lulus)
```

Backend lebih dulu karena Frontend perlu mengganti mock ke core asli. Bila Frontend selesai lebih dulu, tidak masalah: mock membuatnya tetap jalan.

## 3. Checklist pra-PR (per role)

### Backend
- [ ] `npm run typecheck && npm test` hijau
- [ ] Skema Zod memvalidasi semua JSON di `packages/core/src/content/`
- [ ] Set uji analyzer ≥ 30 kalimat (termasuk ≥ 10 pesan sah) dan kasus yang meleset tercatat di `docs/backend/CHANGELOG.md`
- [ ] Input 5.000 karakter diproses < 1 detik (ada tes)
- [ ] Tidak ada kata "aman"/"pasti"/persentase di teks `why`, `verify`, atau konten JSON
- [ ] Semua contoh fiktif (domain `example.com`/`.test`/`.invalid`)
- [ ] `npm run scope` hijau

### Frontend
- [ ] `npm run build` hijau
- [ ] Nyaman di 360 px (cek lewat DevTools) dan bisa dioperasikan dengan keyboard
- [ ] Tidak ada impor langsung ke `packages/core/src`
- [ ] Disclaimer tampil di setiap hasil; tidak ada hijau/centang/perisai untuk level terendah
- [ ] Tidak ada kata terlarang di teks UI (jalankan skrip pemindai, FE-6.3)
- [ ] `npm run scope` hijau

## 4. Langkah Integrator di `development`

```bash
git checkout development && git pull origin development
# setelah PR backend & frontend ter-merge:
cp apps/web/.env.example apps/web/.env.local   # lalu set VITE_USE_MOCK=false
npm ci && npm run check
npm run dev                                     # uji manual skenario juri
```
Uji skenario juri (PRD bagian 13) di HP dan jaringan lain. Perbaikan kecil di folder milik role dikembalikan ke role terkait lewat issue.

## 5. Rilis ke `main`
- [ ] Skenario uji juri lulus (mobile + desktop), konsol tanpa error
- [ ] Tautan kanal lapor diperiksa ulang (`contacts.json`, tanggal verifikasi diperbarui)
- [ ] README & video demo siap
- [ ] Production Branch di Vercel dialihkan ke `main` (lihat DEPLOY.md)
- [ ] PR `development` -> `main`, merge, tag `v1.0.0`
