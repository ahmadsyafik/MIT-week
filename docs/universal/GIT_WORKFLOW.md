# GIT_WORKFLOW.md: Alur Git Berbasis Peran

## 1. Branch

```
main            <- stabil, hasil final untuk juri (dilindungi)
  ▲  PR (hanya Integrator)
development     <- integrasi + deploy gabungan (dilindungi)
  ▲                ▲
backend         frontend
(logika/data)   (tampilan)
```

| Branch | Isi | Siapa yang push |
|---|---|---|
| `main` | Rilis stabil | Tidak ada push langsung. Hanya merge PR dari `development` |
| `development` | Gabungan `backend` + `frontend` + infrastruktur | Integrator (untuk file infrastruktur) dan merge PR |
| `backend` | Pekerjaan Backend | Backend |
| `frontend` | Pekerjaan Frontend | Frontend |

Sub-branch pendek boleh dipakai bila perlu: `backend/analyzer-rules`, `frontend/cek-page`. Aturan folder sama.

Integrator mengubah file infrastruktur (root, `.github/`, `scripts/`, `vercel.json`, `packages/contracts/`, `docs/universal/`) lewat branch pendek `infra/<topik>` -> PR ke `development` (tidak dibatasi scope-guard).

## 2. Rutinitas harian

```bash
# Backend (contoh). Frontend sama, ganti nama branch.
git checkout backend
git fetch origin
git merge origin/development        # ambil kemajuan terbaru dari integrasi
npm install                          # bila package.json/lockfile berubah
# ... kerja di folder wewenang ...
npm run check                        # typecheck + test + build
git add packages/core docs/backend
git commit -m "feat(core): tambah aturan negasi OTP"
git push origin backend              # hook pre-push menjalankan scope-guard
```

> Pakai `git merge`, bukan `rebase`, supaya riwayat aman dan tidak butuh `--force`.

## 3. Format commit (Conventional Commits)

```
<tipe>(<lingkup>): <deskripsi imperatif singkat>
tipe     : feat | fix | docs | refactor | test | chore
lingkup  : core | web | contracts | ci | docs | deploy
```

Contoh: `feat(core): implement maskPii for phone and email` · `feat(web): build risk meter component` · `docs(backend): update changelog`

## 4. Pull Request ke `development`

1. Pastikan `npm run check` lolos dan `npm run scope` hijau.
2. Buka PR `backend` -> `development` (atau `frontend` -> `development`). Isi template.
3. Tunggu CI (`ci`, `scope-guard`) hijau dan 1 approval dari rekan.
4. Merge dengan **Squash and merge** bila riwayat berantakan, atau **Create a merge commit** bila ingin menyimpan riwayat. Pilih satu dan konsisten.
5. Setelah merge, kedua role branch menjalankan `git merge origin/development`.

Urutan merge ke `development` ada di [INTEGRATION_RUNBOOK.md](INTEGRATION_RUNBOOK.md).

## 5. Rilis ke `main`

Hanya Integrator: PR `development` -> `main` setelah skenario uji juri lulus. Beri tag `v1.0.0`.

## 6. Konflik

| File | Cara |
|---|---|
| `package-lock.json` | Jangan digabung manual. Ambil versi `origin/development`, lalu `npm install` ulang: `git checkout origin/development -- package-lock.json && npm install && git add package-lock.json` |
| `packages/contracts/*`, `docs/universal/*` | Seharusnya tidak berubah di role branch. Jika konflik, ambil versi `development`: `git checkout origin/development -- <file>` |
| File milik sendiri | Selesaikan manual seperti biasa |

## 7. Jika terlanjur mengubah file di luar wewenang

```bash
git checkout origin/development -- <path/file/itu>
git commit -m "chore: kembalikan file di luar wewenang"
```
Butuh perubahan di sana? Minta pemilik foldernya atau ajukan RFC.
