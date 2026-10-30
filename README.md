# JagaRuang

> **Cek. Latih. Lindungi.** Aplikasi web interaktif untuk membantu anak muda Indonesia mengenali tipuan digital, berlatih mengambil keputusan yang lebih aman, dan tahu langkah berikutnya saat ada yang terasa janggal.

Studi kasus **The Trust Trap: Navigating Digital Deception** · **MIT-Week 2026** · Tema: *Guardians of the Digital Space*.

- 🔗 **Live:** _(isi tautan Vercel)_
- 🎬 **Video demo:** _(isi tautan)_
- 📄 **PRD:** [`docs/universal/PRD_JagaRuang.pdf`](docs/universal/PRD_JagaRuang.pdf)

---

## 1. Masalah & pendekatan

Penipuan digital (undangan APK palsu, "foto paket", loker palsu, giveaway, phishing) menyasar anak muda setiap hari. Saat ditekan, sulit membedakan yang tepercaya dari yang menipu; setelah sadar, banyak yang tidak tahu harus berbuat apa.

JagaRuang menjawabnya dengan tiga pilar:

| Pilar | Fitur | Isi |
|---|---|---|
| **Cek** | Cek Pesan & Link, Cek File & Izin | Analisis berbasis aturan (22 aturan, 5 level) dengan penjelasan "kenapa" dan "cara verifikasi" |
| **Latih** | 3 kasus bercabang, Kilat 2 Menit | Simulasi realistis dengan umpan balik atas pilihanmu |
| **Lindungi** | Panduan tindakan, Kartu Peringatan, Sandi Keluarga | Checklist berurutan, kanal lapor resmi, dan cara memperingatkan keluarga |

Pelengkap: **Kamus Jebakan** (10 jenis malware/modus) dan tombol **Coba contoh** di setiap input.

## 2. Cara mencoba (alur juri)
1. Buka tautan live -> **Cek** -> **Coba contoh** -> baca hasil dan alasannya.
2. Dari hasil, buka **Kamus Jebakan**, lalu kembali.
3. Jalankan satu kasus di **Latih** sampai Debrief.
4. Buka **Lindungi** sesuai kondisi, lalu buat **Kartu Peringatan**.
5. Buka **Keterbatasan dan Privasi**.

## 3. Privasi & keterbatasan (jujur sejak awal)
- Seluruh analisis berjalan **di perangkatmu**. Tidak ada server aplikasi, database, cookie, analytics, atau permintaan jaringan saat runtime. Tidak ada layanan pihak ketiga.
- Link **tidak pernah dibuka**; isi file **tidak pernah dibaca** (hanya nama dan ekstensi).
- Data pribadi (nomor HP, rekening, email, NIK) disamarkan otomatis. Semua contoh fiktif.
- `localStorage` hanya menyimpan progres; tombol **Hapus semua data lokal** tersedia.
- Hasil adalah **indikasi berbasis aturan yang bisa keliru**. Tidak adanya tanda bahaya bukan bukti bahwa sesuatu terpercaya. JagaRuang bukan antivirus dan bukan kanal pelaporan.
- Hasil uji analyzer, **termasuk kasus yang meleset**: _(isi dari `docs/backend/CHANGELOG.md`)_

## 4. Teknologi
Vite · React · TypeScript · Tailwind CSS · Zod · Vitest · Fontsource (font self-host) · Vercel (hosting statis).

## 5. Struktur repositori

```
MIT-week/
├── apps/web/            Frontend (React)                [branch frontend]
├── packages/core/       Logika & data (analyzer, kasus…) [branch backend]
├── packages/contracts/  Tipe data bersama                [branch development]
├── docs/                Dokumentasi per peran
├── scripts/ · .github/  Penjaga batas folder & CI
└── vercel.json          Deploy + header keamanan
```

Pembagian kerja dan aturan batas folder: [`docs/README.md`](docs/README.md).

## 6. Menjalankan di lokal

```bash
git clone https://github.com/ahmadsyafik/MIT-week.git
cd MIT-week
npm install
cp apps/web/.env.example apps/web/.env.local
npm run dev            # http://localhost:5173
npm run check          # typecheck + test + build
```
Prasyarat: Node.js 20+.

## 7. Tim & branch
| Peran | Nama | Branch |
|---|---|---|
| Backend (logika & data) | Ahmad Syafi'al Anam | `backend` |
| Frontend (tampilan) | Mutiara Dewanda Prisvilla dan Raffi Azzaky Ramadhani | `frontend` |
| Integrasi & deploy | Ahmad Syifa'ul Falakhul Khayyi | `development` -> `main` |

## 8. Dokumentasi
[Indeks](docs/README.md) · [Git workflow](docs/universal/GIT_WORKFLOW.md) · [Kontrak](docs/universal/INTERFACES.md) · [Backend](docs/backend/README.md) · [Frontend](docs/frontend/README.md) · [Deploy](docs/development/DEPLOY.md)
