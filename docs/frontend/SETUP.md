# SETUP.md: Setup Lingkungan Frontend (`apps/web`)

## 1. Prasyarat
- **Node.js 20+** (disarankan 22), **npm 10+**, **Git** (di Windows pakai **Git Bash**).

## 2. Pertama kali

```bash
git clone https://github.com/ahmadsyafik/MIT-week.git
cd MIT-week
git checkout frontend
npm install                                   # memasang semua workspace + hook pre-push
cp apps/web/.env.example apps/web/.env.local  # VITE_USE_MOCK=true (default)
npm run dev                                   # buka http://localhost:5173
```

## 3. Perintah harian

```bash
npm run dev          # server dev Vite (hot reload)
npm run typecheck    # cek tipe seluruh workspace
npm run build        # typecheck web + build produksi
npm run scope        # cek batas folder
npm run check        # typecheck + test + build
```

## 4. Mode data
| `VITE_USE_MOCK` | Perilaku |
|---|---|
| `true` (default) | Memakai `src/mocks/*`. Aman saat Backend belum selesai |
| `false` | Memanggil `@jagaruang/core` asli. Fungsi yang belum selesai melempar `NOT_IMPLEMENTED` |

## 5. Tambah dependensi (hanya untuk web)
```bash
npm install <paket> -w @jagaruang/web
```

## 6. Catatan penting
- Font di-host sendiri (Fontsource). Jangan memakai Google Fonts/CDN.
- Produksi dipasang header CSP ketat (`vercel.json`): tanpa skrip/gambar/font eksternal. Butuh pengecualian? Minta Integrator.
- Gunakan `HashRouter` hanya bila ada masalah rute di hosting. Default: `BrowserRouter` + rewrite di `vercel.json`.
