# DOMAIN BACKEND (Logika & Data): README

> **PENANGGUNG JAWAB:** Ahmad Syifa'ul Falakhul Khayyi (`@ahmadsyafik`)
> **BRANCH:** `backend`
> **BOLEH DITULIS (R/W):** `packages/core/`, `docs/backend/`

## 1. Mandat

Backend di JagaRuang **bukan server** (ADR-001). Backend memegang otak aplikasi yang berjalan di browser:

- **Analyzer** (F1, F2): normalisasi, penyamaran data pribadi, 22 aturan L1-L5, skor, label, pemetaan modus & jenis malware.
- **Konten** (F3, F4, F6): Kamus Jebakan (10 entri), 3 kasus Latih (K1 undangan APK, K2 foto paket, K3 loker palsu), panduan Lindungi, `contacts.json`.
- **Case engine** (F4): menjalankan kasus bercabang dari JSON, skor, peringkat, kode `TRUST{...}`.
- **Triage** (F5/F9) dan **Sandi Keluarga** (F7/F10), **Kartu Peringatan** (F8).
- **Penyimpanan lokal**: wrapper `localStorage` ber-versi.
- **Tes**: Vitest, set uji ≥ 30 kalimat, hasil yang meleset dilaporkan jujur di README.

## 2. Zona terlarang

1. ❌ **Dilarang menulis UI**: React, JSX/TSX, Tailwind, CSS. Jangan menyentuh `apps/web/`.
2. ❌ **Dilarang mengubah `packages/contracts/` atau `docs/universal/` sepihak.** Pakai RFC.
3. ❌ **Dilarang menambah permintaan jaringan saat runtime** (fetch/XHR/beacon), analytics, atau cookie.
4. ❌ **Dilarang membuka link atau membaca isi file** pengguna. Hanya string URL dan nama file.
5. ❌ **Dilarang memuat kata "aman"/"pasti"/persentase penipuan** di teks `why`, `verify`, atau konten JSON.
6. ❌ **Dilarang memakai data/domain nyata.** Hanya `example.com`, `.test`, `.invalid`.
7. ❌ Mengubah tanda tangan fungsi publik tanpa RFC.

## 3. Struktur folder milik Backend

```
packages/core/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts            <- API publik (re-export)
    ├── api.ts              <- tanda tangan publik (stub -> isi bertahap)
    ├── scoring.ts          <- skor & label (SUDAH ADA, bertes)
    ├── analyzer/           <- normalisasi, pii, aturan teks/url/file/izin
    ├── cases/              <- case engine
    ├── triage/ · safeword/ · warningCard/
    ├── storage/            <- wrapper localStorage
    └── content/            <- JSON + skema Zod (rules, modus, malware, permissions,
                               cases/, triage, action-guides, contacts)
```

## 4. Indeks dokumen

1. [`TASK_GUIDE.md`](TASK_GUIDE.md): daftar tugas BE-1.x s.d BE-6.x
2. [`SETUP.md`](SETUP.md): menjalankan dan menguji di lokal
3. [`DATA_MODEL.md`](DATA_MODEL.md): model data konten & data lokal
4. [`CHANGELOG.md`](CHANGELOG.md): catatan perubahan (+ hasil uji analyzer)
5. Kontrak: [`../universal/INTERFACES.md`](../universal/INTERFACES.md)
