# DEPLOY.md: Deploy Gabungan (Vercel)

## 1. Konfigurasi (sudah ada di `vercel.json`)
| Pengaturan | Nilai |
|---|---|
| Install | `npm ci` |
| Build | `npm run build` (typecheck web + `vite build`) |
| Output | `apps/web/dist` |
| Rewrites | semua rute -> `/index.html` (SPA) |
| Header | CSP ketat, `nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy` |

CSP: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` (alasan `unsafe-inline` di ADR-005).

## 2. Environment variable (Vercel -> Settings -> Environment Variables)
| Nama | Nilai | Kapan |
|---|---|---|
| `VITE_USE_MOCK` | `false` | Setelah core Backend ter-merge. **Wajib sebelum rilis akhir**, kalau tidak situs live menampilkan data tiruan |

## 3. Strategi branch di Vercel
- **Selama pengembangan:** Production Branch = `development` (agar ada URL live gabungan sejak hari 3).
- **Sebelum penilaian:** merge `development` -> `main`, lalu ubah Production Branch = `main`.
- Branch `backend`/`frontend` menghasilkan *preview deployment* (URL berbeda) untuk dicoba rekan.

## 4. Checklist deploy
- [ ] Tautan produksi terbuka di **jendela incognito / HP lain tanpa login Vercel** (matikan Deployment Protection untuk Production)
- [ ] `VITE_USE_MOCK=false` di Production dan alur "Coba contoh" tetap jalan
- [ ] Refresh di `/cek`, `/latih`, `/lindungi` tidak 404
- [ ] Konsol browser bersih di alur utama; tab Network tidak menunjukkan permintaan ke domain lain
- [ ] Header CSP terlihat di respons (DevTools -> Network -> Headers)
- [ ] Skenario uji juri lulus di HP + jaringan seluler

## 4a. Bila deploy terblokir
- Deploy tertahan karena author commit bukan pemilik akun Vercel (plan Hobby + repo privat): lakukan merge ke `development` dari akun pemilik Vercel, atau jadikan repo publik, atau pakai tim Vercel.
- Tampilan polos/rusak di produksi tapi normal di lokal: biasanya CSP memblokir sesuatu. Cek konsol, lalu minta Integrator menyesuaikan.
