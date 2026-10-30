# SETUP.md: Setup Lingkungan Backend (`packages/core`)

## 1. Prasyarat
- **Node.js 20+** (disarankan 22) dan **npm 10+**. Cek: `node -v && npm -v`
- **Git** (di Windows pakai **Git Bash** agar script `.sh` dan hook berjalan)

## 2. Pertama kali

```bash
git clone https://github.com/ahmadsyafik/MIT-week.git
cd MIT-week
git checkout backend
npm install            # memasang semua workspace + mengaktifkan hook pre-push
```

## 3. Perintah harian

```bash
npm run typecheck -w @jagaruang/core     # cek tipe core saja
npm test -w @jagaruang/core              # jalankan Vitest sekali
npm run test:watch -w @jagaruang/core    # mode watch saat menulis aturan
npm run check                            # typecheck + test + build seluruh proyek
npm run scope                            # cek batas folder (sama dengan scope-guard)
```

## 4. Tambah dependensi (hanya untuk core)

```bash
npm install <paket> -w @jagaruang/core
```
Ini mengubah `packages/core/package.json` dan `package-lock.json` (keduanya diizinkan).

## 5. Catatan penting
- Tidak ada `.env`, database, Docker, atau server. Semua fungsi berjalan di browser.
- Konten JSON di-`import` saat build (bukan `fetch`).
- Uji dari konsol: tes Vitest adalah "client"-mu. Frontend tidak perlu ada untuk menguji Backend.
- Jangan commit file `.env` atau data pribadi apa pun.
