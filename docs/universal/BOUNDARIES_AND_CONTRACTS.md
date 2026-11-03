# BOUNDARIES_AND_CONTRACTS.md: Batas Kerja & Kontrak Antar-Peran

> **STATUS:** acuan mutlak. Berlaku untuk developer maupun AI coding assistant yang dipakai tiap peran.
> Pemilik dokumen: branch `development`.

## 1. Pembagian domain

JagaRuang adalah aplikasi **client-side murni** (ADR-001). Karena itu "Backend" berarti *logika dan data di dalam browser*, bukan server.

```
┌──────────────────────── Browser ─────────────────────────┐
│  FRONTEND (apps/web)        halaman, komponen, gaya      │
│        │  hanya lewat src/lib/coreClient.ts              │
│        ▼                                                 │
│  @jagaruang/core (BACKEND)  analyzer, case engine,       │
│        │                    triage, sandi, storage       │
│        ▼                                                 │
│  @jagaruang/contracts       tipe data bersama (KONTRAK)  │
└──────────────────────────────────────────────────────────┘
```

## 2. Hak akses per peran

### 2.1 Backend (branch `backend`): `@ahmadsyafik`
| | |
|---|---|
| Boleh ditulis | `packages/core/` (kode, konten JSON, skema Zod, tes), `docs/backend/` |
| Tanggung jawab | `analyze`, `maskPii`, aturan 22 level L1-L5, case engine + 3 kasus, Kamus Jebakan (data), Lindungi (data), `contacts.json`, triage, generator sandi, wrapper `localStorage`, unit test |
| Output resmi | API publik di `packages/core/src/index.ts` sesuai [INTERFACES.md](INTERFACES.md) |
| Dilarang | Menulis React/JSX/CSS/Tailwind, menyentuh `apps/web/`, mengubah `packages/contracts/` sepihak, menambah permintaan jaringan saat runtime |

### 2.2 Frontend (branch `frontend`): `@mutiaradewanda @azzakyDp`
| | |
|---|---|
| Boleh ditulis | `apps/web/` (halaman, komponen, gaya, mock, aset), `docs/frontend/` |
| Tanggung jawab | Semua tampilan dan interaksi, responsif 360 px, aksesibilitas, copywriting UI, halaman Keterbatasan, tombol hapus data lokal (memanggil `storage.clearAll`) |
| Output resmi | Aplikasi web yang memakai API core lewat `coreClient.ts` |
| Dilarang | Menulis logika deteksi/skor/aturan, menyentuh `packages/core/`, mengimpor `packages/core/src/...`, mengubah `packages/contracts/` sepihak, menambah pemanggilan jaringan/analytics/font eksternal |

### 2.3 Development (branch `development`): Integrator
| | |
|---|---|
| Boleh ditulis | `package.json` root, `.github/`, `scripts/`, `.githooks/`, `vercel.json`, `packages/contracts/`, `docs/universal/`, `docs/development/`, `README.md` root |
| Tanggung jawab | Menggabungkan `backend` + `frontend`, menjaga CI hijau, deploy gabungan, menjaga kontrak, rilis ke `main` |
| Dilarang | Mengerjakan fitur di folder milik `backend`/`frontend`. Kembalikan ke pemiliknya |

## 3. Zona abu-abu (siapa mengurus apa)

| Situasi | Pemilik | Cara |
|---|---|---|
| Butuh paket npm baru untuk UI | Frontend | `npm install <paket> -w @jagaruang/web` (lockfile ikut berubah, diizinkan) |
| Butuh paket npm baru untuk logika | Backend | `npm install <paket> -w @jagaruang/core` |
| Butuh field baru di hasil analisis | Dua pihak | RFC (bagian 5) |
| Teks penjelasan red flag ("why"/"verify") | Backend (data) | Frontend hanya menampilkan. Mau ubah kata-katanya? Minta Backend |
| Teks tombol/judul/label UI | Frontend | Bebas, asal lolos aturan kata terlarang |
| Kata terlarang di data core | Backend | Perbaiki di JSON |
| Header CSP / `vercel.json` | Integrator | Frontend meminta lewat issue bila ada yang diblokir |
| Dependensi root, CI, workflow | Integrator | Issue/PR ke `development` |

## 4. Penegakan otomatis

- **Lokal:** hook `.githooks/pre-push` menjalankan `scripts/scope-check.sh`. Aktif otomatis setelah `npm install`.
- **GitHub:** workflow `scope-guard` memblokir PR ke `development` bila ada file di luar wewenang.
- **Review:** CODEOWNERS meminta pemilik folder me-review PR.

## 5. Protokol perubahan kontrak (RFC)

Dipakai bila fitur **benar-benar** butuh perubahan di `packages/contracts` atau [INTERFACES.md](INTERFACES.md).

1. **Buka issue** berjudul `RFC: <ringkas>` berisi alasan, field/fungsi yang berubah, dan dampak ke pihak lain.
2. **Kompatibel mundur dulu.** Field baru bersifat opsional. Jangan hapus/ubah arti field yang sudah dipakai.
3. **Disepakati** di issue (Backend dan Frontend sama-sama setuju).
4. **Integrator** memperbarui `packages/contracts` + `INTERFACES.md` di `development`, lalu mengumumkan.
5. Kedua role branch **merge `development`** ke branch masing-masing.
6. **Backend** mengimplementasikan, **Frontend** memperbarui `src/mocks/` agar sejalan, lalu mengonsumsinya.

## 6. Larangan keamanan & privasi (berlaku untuk semua peran)

- Tidak ada `fetch`/XHR/WebSocket/beacon ke luar saat runtime; tidak ada analytics/cookie.
- Tidak ada `dangerouslySetInnerHTML`, `eval`, `new Function`.
- Link tidak pernah dibuka; isi file tidak pernah dibaca (hanya nama + ekstensi).
- Semua contoh fiktif: domain `example.com`, `.test`, `.invalid`.
- Tidak ada kata "aman", "pasti", "100%" sebagai klaim di teks UI; tidak ada persentase penipuan.
