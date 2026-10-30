# GITHUB_SETUP.md: Panduan Lengkap Setup Repo, Branch, Proteksi, dan Deploy

Repo: `https://github.com/ahmadsyafik/MIT-week.git`
Branch yang dibuat: **`main`**, **`development`**, **`backend`**, **`frontend`**

> Perintah ditulis untuk **Git Bash** (Windows) atau terminal Linux/macOS. Di Windows, **jangan pakai CMD/PowerShell** untuk script `.sh` dan hook. Buka *Git Bash*.

Peta isi panduan:
0. Prasyarat · 1. Siapkan folder lokal · 2. Isi scaffold · 3. Ganti placeholder · 4. Commit pertama ke `main` · 5. Buat 3 branch · 6. Pengaturan GitHub · 7. Undang teman · 8. Vercel · 9. Alur kerja harian · 10. Cara menggabungkan · 11. Uji penjaga batas folder · 12. Troubleshooting · 13. Checklist akhir

---

## 0. Prasyarat

```bash
git --version        # >= 2.30
node -v              # >= 20 (disarankan 22)
npm -v               # >= 10
git config --global user.name  "Ahmad Syifa'ul Falakhul Khayyi"
git config --global user.email "emailmu@contoh.com"     # sama dengan email akun GitHub
```
Perlu login GitHub di terminal (HTTPS dengan Personal Access Token, atau SSH). Bila `git push` meminta password lalu gagal, buat token di *GitHub -> Settings -> Developer settings -> Personal access tokens* (izin `repo` dan `workflow`) dan pakai sebagai password. Izin **`workflow`** wajib karena kita mendorong file di `.github/workflows/`.

## 1. Siapkan folder lokal

```bash
cd ~/Documents                                     # bebas
git clone https://github.com/ahmadsyafik/MIT-week.git
cd MIT-week
git status
```
- Muncul `You appear to have cloned an empty repository`: repo kosong, lanjut.
- Repo sudah berisi (mis. README bawaan GitHub): tidak masalah, scaffold akan menimpanya.

## 2. Isi scaffold

1. Ekstrak `MIT-week-scaffold.zip` **ke dalam folder `MIT-week`** sehingga `package.json`, `apps/`, `packages/`, `docs/`, `.github/` berada langsung di dalam `MIT-week/` (bukan di dalam subfolder lagi).
2. Salin dokumen proyekmu:
   ```bash
   cp /path/ke/PRD_JagaRuang.pdf docs/universal/PRD_JagaRuang.pdf
   ```
   (Opsional) dokumen perancangan -> `docs/universal/PERANCANGAN.md` atau `.pdf`.
3. Pastikan struktur:
   ```bash
   ls -a
   # .github  .githooks  .gitattributes  .gitignore  README.md  apps  docs  package.json  package-lock.json  packages  scripts  vercel.json
   ```

## 3. Ganti placeholder (wajib)

Cari semua placeholder:
```bash
   grep -rn "USERNAME_FE\|\[Nama FE\]" --exclude-dir=node_modules .
```
Ganti:
| Placeholder | Ganti dengan | File |
|---|---|---|
| `@USERNAME_FE` | username GitHub temanmu (diawali `@`) | `.github/CODEOWNERS`, `docs/README.md`, `docs/frontend/README.md`, `docs/universal/BOUNDARIES_AND_CONTRACTS.md` |
| `[Nama FE]` | nama temanmu | `docs/README.md`, `docs/frontend/README.md`, `README.md` |

Bila Integrator bukan kamu, ubah juga baris "Integrator" di `docs/README.md` dan `docs/development/README.md`.

## 4. Commit pertama ke `main`

```bash
npm install            # memasang dependensi + mengaktifkan hook pre-push
npm run check          # harus hijau: typecheck + test + build

git branch -M main
git add .
git status             # pastikan node_modules/ dan dist/ TIDAK ikut (sudah di .gitignore)
git commit -m "chore: init scaffold jagaruang (docs, workspaces, ci, scope-guard)"
git push -u origin main
```
> Jika `git push` ditolak karena repo sudah punya commit (README bawaan): `git pull origin main --allow-unrelated-histories` (selesaikan konflik `README.md` dengan memilih versi scaffold), lalu push lagi.

## 5. Buat 3 branch

Semua dibuat dari commit yang sama (`main`), lalu didorong. **Dorong `development` lebih dulu**, karena hook `pre-push` membandingkan `backend`/`frontend` dengan `origin/development`.

```bash
git branch development && git push -u origin development
git branch backend     && git push -u origin backend
git branch frontend    && git push -u origin frontend
git branch -a          # harus tampil: main, development, backend, frontend (+ remotes/origin/...)
```

Mulai bekerja sebagai Backend:
```bash
git checkout backend
```

## 6. Pengaturan GitHub (di browser)

Buka `https://github.com/ahmadsyafik/MIT-week` -> **Settings**.

### 6.1 Actions
*Settings -> Actions -> General*
- *Actions permissions*: **Allow all actions and reusable workflows**.
- *Workflow permissions*: **Read repository contents** (cukup; workflow kita hanya membaca).

### 6.2 Aturan branch (Rulesets)
*Settings -> Rules -> Rulesets -> New ruleset -> New branch ruleset*

> **Catatan paket:** Branch protection/ruleset pada repo **privat** milik akun pribadi butuh GitHub Pro. Di akun gratis, ruleset hanya efektif untuk repo **publik**. Bila repo privat dan kamu tidak bisa memakainya, penjagaan tetap berjalan lewat hook `pre-push` dan workflow `scope-guard` (workflow akan tampil merah, tetapi merge tidak diblokir otomatis, jadi disiplin tim yang menahannya).

**Ruleset A: `protect-main`**
- *Enforcement status*: **Active**
- *Target branches* -> *Add target* -> *Include by pattern* -> `main`
- Centang: **Restrict deletions**, **Block force pushes**, **Require a pull request before merging** (Required approvals: `1`), **Require status checks to pass** -> tambahkan `check`
- *Bypass list*: tambahkan **Repository admin** (kamu) agar bisa darurat.

**Ruleset B: `protect-development`**
- *Target*: `development`
- Centang: **Restrict deletions**, **Block force pushes**, **Require a pull request before merging** (Required approvals: `1`), **Require status checks to pass** -> tambahkan `check` dan `scope`
- *Bypass list*: **Repository admin**.

> Nama `check` dan `scope` baru muncul di daftar setelah workflow berjalan sekali pada sebuah PR. Buat ruleset dulu tanpa status check, buka PR pertama, lalu edit ruleset dan tambahkan keduanya.

**Ruleset C (opsional): `protect-role-branches`**
- *Target*: pola `backend` dan `frontend`
- Centang: **Restrict deletions**, **Block force pushes**. (Jangan wajibkan PR; ini ruang kerja pribadi.)

### 6.3 Default branch
Biarkan `main` sebagai default. (Bila temanmu bingung branch mana yang harus di-clone, README root sudah menjelaskan.)

### 6.4 Pengaturan merge
*Settings -> General -> Pull Requests*: aktifkan **Allow squash merging** dan **Allow merge commits**. Biarkan **Automatically delete head branches** dalam keadaan **mati**, karena branch `backend`/`frontend` harus tetap ada setelah PR di-merge.

## 7. Undang teman (Frontend)

*Settings -> Collaborators -> Add people* -> username temannya -> role **Write**. Temanmu menerima email undangan dan harus menerimanya.

Kirim ke temanmu:
```bash
git clone https://github.com/ahmadsyafik/MIT-week.git
cd MIT-week
git checkout frontend
npm install
cp apps/web/.env.example apps/web/.env.local
npm run dev
```
dan minta ia membaca `docs/frontend/README.md`, `docs/frontend/TASK_GUIDE.md`, `docs/universal/BOUNDARIES_AND_CONTRACTS.md`.

## 8. Deploy di Vercel (branch `development`)

1. `vercel.com` -> login dengan GitHub -> **Add New -> Project** -> pilih repo `MIT-week` (beri akses repo bila diminta) -> **Import**.
2. *Framework Preset*: **Other**. *Root Directory*: `./` (kosongkan). Build/Install/Output otomatis dari `vercel.json`. -> **Deploy**.
3. **Production Branch -> `development`** (selama pengembangan): *Project -> Settings -> Environments -> Production -> Branch Tracking* (atau *Settings -> Git -> Production Branch*, tergantung tampilan) -> isi `development`.
4. **Deployment Protection**: *Settings -> Deployment Protection* -> matikan *Vercel Authentication* untuk **Production** agar tautan terbuka tanpa login. Uji di jendela incognito.
5. **Environment Variable** (setelah core Backend ter-merge): `VITE_USE_MOCK` = `false` (Production) -> **Redeploy**.
6. **Sebelum penilaian:** merge `development` -> `main`, lalu ubah Production Branch ke **`main`**.

Detail: [`DEPLOY.md`](DEPLOY.md).

## 9. Alur kerja harian

### Backend (kamu)
```bash
git checkout backend
git fetch origin
git merge origin/development          # ambil kemajuan terbaru
npm install                           # bila ada paket berubah

# ... kerja HANYA di packages/core/ dan docs/backend/ ...

npm run check                         # typecheck + test + build
npm run scope                         # cek batas folder
git add packages/core docs/backend
git commit -m "feat(core): implement maskPii"
git push origin backend               # hook pre-push akan menjalankan scope-guard
```

### Frontend (temanmu)
```bash
git checkout frontend
git fetch origin
git merge origin/development
npm install
# ... kerja HANYA di apps/web/ dan docs/frontend/ ...
npm run check && npm run scope
git add apps/web docs/frontend
git commit -m "feat(web): build risk meter"
git push origin frontend
```

### Integrator (infrastruktur)
```bash
git checkout development && git pull origin development
git checkout -b infra/update-ci
# ... ubah .github/, scripts/, vercel.json, packages/contracts/, docs/universal/ ...
git push -u origin infra/update-ci    # lalu buka PR ke development
```

## 10. Cara menggabungkan ke `development`

1. Di GitHub: **Pull requests -> New pull request**. *base*: `development`, *compare*: `backend` (atau `frontend`).
2. Isi template (otomatis muncul). Tunggu **ci** dan **scope-guard** hijau, minta rekan approve.
3. **Merge** (squash atau merge commit; pilih satu dan konsisten).
4. Kedua pihak: `git checkout <branch-mu> && git merge origin/development`.
5. Urutan ideal, lihat [`INTEGRATION_RUNBOOK.md`](../universal/INTEGRATION_RUNBOOK.md): Backend dulu, lalu Frontend, lalu ganti `VITE_USE_MOCK=false`, uji, kemudian PR `development` -> `main` dan beri tag:
   ```bash
   git checkout main && git pull origin main
   git tag -a v1.0.0 -m "Rilis final MIT-Week 2026"
   git push origin v1.0.0
   ```

## 11. Uji penjaga batas folder (lakukan sekali, 2 menit)

Pastikan sistemnya benar-benar bekerja:
```bash
git checkout backend
echo "// uji" >> apps/web/src/App.tsx
git add -A && git commit -m "test: sengaja melanggar"
git push origin backend
# Harapan: push DIBATALKAN dengan pesan "GAGAL: branch 'backend' (Backend) mengubah file di luar wewenangnya"
```
Bersihkan:
```bash
git reset --hard HEAD~1
```
> `git reset --hard` hanya aman di sini karena commit itu belum di-push. Jangan memakainya untuk commit yang sudah di-push.

## 12. Troubleshooting

| Gejala | Penyebab & solusi |
|---|---|
| `bash\r: No such file or directory` saat hook/script | Ujung baris CRLF. Jalankan `git config core.autocrlf false`, lalu `git add --renormalize .` (file `.gitattributes` sudah memaksa LF untuk `.sh` dan hook) |
| Hook `pre-push` tidak berjalan | Hook aktif lewat `npm install` di root. Cek: `git config core.hooksPath` harus `.githooks`. Bila kosong: `git config core.hooksPath .githooks` |
| `scope-guard` gagal padahal merasa tidak menyentuh file orang | Cek daftar file yang disebut di pesan error. Penyebab umum: kamu me-merge branch rekan (bukan `development`) atau menjalankan formatter di seluruh repo. Kembalikan file itu dengan perintah yang tercantum di pesan |
| `scope-guard` menyebut `package-lock.json` | Diizinkan. Bila tetap muncul, berarti kamu menjalankan `npm install` di folder yang salah. Jalankan dari root |
| Konflik `package-lock.json` saat merge | `git checkout origin/development -- package-lock.json && npm install && git add package-lock.json && git commit` |
| `Permission denied` / push ditolak karena `workflow` | Token tidak punya izin `workflow`. Buat token baru dengan izin `repo` + `workflow` |
| Push ke `development` ditolak | Memang diblokir ruleset: buka PR. Integrator boleh bypass untuk kasus darurat |
| Vercel build gagal `npm ci` | `package-lock.json` tidak sinkron. Jalankan `npm install` di lokal, commit lockfile (lewat `infra/*` atau role terkait) |
| Situs live menampilkan "[mode data tiruan aktif]" | `VITE_USE_MOCK` belum `false` di Vercel. Atur lalu redeploy |
| Halaman `/cek` 404 saat refresh | `rewrites` di `vercel.json` hilang. Pastikan masih ada |
| Tampilan polos di produksi | CSP memblokir sesuatu. Buka konsol, catat apa yang diblokir, minta Integrator menyesuaikan `vercel.json` |
| Terlanjur mengedit file di luar wewenang | `git checkout origin/development -- <file>` lalu commit |

## 13. Checklist akhir setup

- [ ] `main`, `development`, `backend`, `frontend` ada di GitHub
- [ ] `npm run check` hijau di lokal; CI hijau di `development`
- [ ] Placeholder `@USERNAME_FE` dan `[Nama FE]` sudah diganti
- [ ] Teman sudah diundang (role Write) dan berhasil `git checkout frontend`
- [ ] Uji penjaga batas folder (bagian 11) berhasil memblokir push
- [ ] Ruleset `main` & `development` aktif (atau catatan paket di 6.2 dipahami)
- [ ] Vercel terhubung; tautan live terbuka di incognito
- [ ] PRD tersalin ke `docs/universal/`
