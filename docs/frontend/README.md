# DOMAIN FRONTEND (Tampilan): README

> **Penanggung Jawab:** Ahmad Syifa'ul Falakhul Khayyi (`@syifamojocanggih-hash`) dan Mutiara Dewanda Prisvilla (`@mutiaradewanda`)  
> **Ruang Lingkup:** `apps/web/`, `docs/frontend/`  
> **Teknologi:** React 18 · TypeScript 5 · Vite 6 · Tailwind CSS v4 · Lucide React · Three.js (`@react-three/fiber`)

---

## 1. Mandat & Ruang Lingkup

Domain Frontend bertanggung jawab penuh atas seluruh antarmuka yang dilihat, diinteraksikan, dan dialami oleh pengguna, meliputi:
- **Desain & Tipografi**: Menggunakan palet biru gelap profesional (`#27374D`, `#526D82`, `#9DB2BF`, `#DDE6ED`), kartu putih rounded dengan shadow halus, dan tipografi modern self-hosted *Plus Jakarta Sans*.
- **Pemisahan Rute Publik & Terproteksi**: Rute `/` menyajikan Landing Page publik dengan kanvas 3D Three.js, sedangkan rute `/dashboard` menyajikan Dashboard Utama dengan sistem autentikasi lokal terproteksi (`AuthContext.tsx`).
- **Pemeriksa Heuristik Interaktif (`/cek`)**: Mengonsumsi hasil analisis dari `@jagaruang/core` melalui `apps/web/src/lib/coreClient.ts`.
- **Hub Pembelajaran Interaktif (`/belajar`)**: Menyediakan 4 pilar edukasi terpadu (Skenario Simulator, 12 Modul Pembelajaran Interaktif, Kuis Kilat 2 Menit, dan Kamus Jebakan).
- **Pusat Darurat & Mitigasi (`/lindungi` & Modul m11)**: Panduan tanggap darurat, direktori kanal lapor resmi terverifikasi, generator kartu peringatan, serta wizard darurat dan generator draf kronologi lokal.
- **Sandi Verifikasi Keluarga (`/sandi`)**: Antarmuka pembuatan dan pengelolaan kata sandi verbal untuk menangkal penipuan AI Voice Cloning.
- **Transparansi Sistem (`/keterbatasan`)**: Halaman kebijakan privasi, keterbatasan deteksi heuristik, dan tombol kontrol penghapusan data lokal.

---

## 2. Struktur Direktori Frontend (`apps/web/`)

```
apps/web/
├── public/                          # Aset statis favicon dan gambar
├── src/
│   ├── components/                  # Komponen antarmuka modular
│   │   ├── landing/                 # Hero3DCanvas Three.js & komponen Landing Page
│   │   ├── modul/                   # Halaman modular untuk 12 modul edukasi:
│   │   │   ├── ModulRekayasaSosialPage.tsx   # m1: Rekayasa Sosial
│   │   │   ├── ModulAnatomiPenipuanPage.tsx  # m2: Anatomi Penipuan
│   │   │   ├── ModulPerKanalPage.tsx         # m3: Keamanan WhatsApp
│   │   │   ├── ModulEmailPhishingPage.tsx    # m4: Email & Phishing
│   │   │   ├── ModulTeleponBankPage.tsx      # m5: Telepon Mengaku Bank
│   │   │   ├── ModulSepuluhCiriPage.tsx      # m6: 10 Ciri Phishing (Capstone)
│   │   │   ├── ModulSebelumTransferPage.tsx  # m7: Checklist Sebelum Transfer
│   │   │   ├── ModulPolaModusNasionalPage.tsx # m8: Modus Terbanyak Nasional IASC
│   │   │   ├── ModulQrisEwalletPage.tsx      # m9: QRIS & E-Wallet
│   │   │   ├── ModulPinjolIlegalPage.tsx     # m10: Pinjaman Online Ilegal
│   │   │   ├── ModulPusatDaruratPage.tsx     # m11: Pusat Darurat (Emergency Wizard)
│   │   │   └── ModulDampingiKeluargaPage.tsx # m12: Pendampingan Keluarga
│   │   ├── simulator/               # FakeChatSimulator & Lightbox Forensik Kasus
│   │   ├── ui/                      # Atom UI dasar (Button, Card, Modal, RiskMeter, dsb.)
│   │   ├── Layout.tsx               # Layout navigasi sidebar desktop & bilah bawah mobile
│   │   ├── LoginModal.tsx           # Modal autentikasi lokal
│   │   ├── ProtectedRoute.tsx       # Pengawal rute terproteksi dashboard
│   │   └── UserProfileDropdown.tsx  # Menu profil pengguna & switch landing
│   ├── context/
│   │   └── AuthContext.tsx          # Konteks otentikasi sesi lokal
│   ├── data/                        # File data mandiri per modul dengan validasi build:
│   │   ├── modulRekayasaSosial.ts
│   │   ├── modulAnatomiPenipuan.ts
│   │   ├── modulPerKanal.ts
│   │   ├── modulEmailPhishing.ts
│   │   ├── modulTeleponBank.ts
│   │   ├── modulSepuluhCiri.ts
│   │   ├── modulSebelumTransfer.ts
│   │   ├── modulPolaModusNasional.ts
│   │   ├── modulQrisEwallet.ts
│   │   ├── modulPinjolIlegal.ts
│   │   ├── modulPusatDarurat.ts
│   │   └── modulDampingiKeluarga.ts
│   ├── lib/
│   │   ├── coreClient.ts            # Pintu gerbang konsumsi fungsi inferensi @jagaruang/core
│   │   └── notificationService.ts   # Notifikasi peristiwa lokal
│   ├── mocks/                       # Data tiruan skenario chat dan audio vishing
│   ├── pages/                       # Halaman tampilan utama
│   │   ├── Beranda.tsx              # Landing Page interaktif
│   │   ├── Dashboard.tsx            # Dashboard utama terproteksi
│   │   ├── Cek.tsx                  # Halaman Cek Pesan, Link, File & Izin
│   │   ├── Belajar.tsx              # Hub Belajar (Simulator, Modul, Kilat, Kamus)
│   │   ├── Lindungi.tsx             # Panduan mitigasi, kanal resmi, & kartu peringatan
│   │   ├── Sandi.tsx                # Halaman panduan & pembuat Sandi Keluarga
│   │   ├── Keterbatasan.tsx         # Keterbatasan analisis & manajemen storage
│   │   └── NotFound.tsx             # Halaman 404
│   ├── App.tsx                      # Router konfigurasi React Router v6
│   ├── index.css                    # Definisi Tailwind CSS v4 & custom design tokens
│   └── main.tsx                     # Entry point React
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Aturan & Batasan Pengembangan Frontend

1. **Konsumsi Single-Entry Core**: Frontend hanya memanggil fungsi logika analisis `@jagaruang/core` melalui `apps/web/src/lib/coreClient.ts`. Tidak boleh mengimpor langsung dari `packages/core/src/...`.
2. **Tanpa Jaringan Saat Runtime (Zero Runtime Fetch)**: Dilarang menambahkan panggilan `fetch`, `axios`, atau koneksi API eksternal saat aplikasi berjalan di peramban. Seluruh logika inferensi dan generator draf berjalan 100% lokal di memori klien.
3. **Keamanan Eksekusi Konten**: Dilarang menggunakan `dangerouslySetInnerHTML` atau `eval`. Penandaan teks red flag dibuat aman menggunakan elemen React standar (`<mark>`).
4. **Bahasa & Nada Komunikasi**:
   - Gunakan Bahasa Indonesia yang ramah, santai namun formal (*"kamu"*), kalimat pendek dan to the point.
   - Hindari klaim mutlak atau kepastian palsu ("pasti aman", "100%", "pembekuan permanen", "1-2 jam golden period"). Gunakan formulasi objektif seperti *"Belum terlihat tanda bahaya"*, *"Waspada"*, atau *"Tingkat Risiko Tinggi"*.
5. **Aksesibilitas (WCAG AA)**:
   - Target sentuh tombol minimal 44 × 44 px.
   - Kontras warna teks sekunder minimal 4.5:1 terhadap latar belakang kartu.
   - Semua elemen interaktif (tombol salin, kuis, tab, simulator) memiliki label `aria-label`, fokus keyboard yang jelas, dan pengumuman pembaca layar melalui `aria-live`.

---

## 4. Indeks Dokumen Terkait

- 🎨 [**DESIGN_SYSTEM.md**](DESIGN_SYSTEM.md): Spesifikasi warna, token CSS, dan pedoman komponen visual.
- 🗺️ [**PAGES_AND_FLOWS.md**](PAGES_AND_FLOWS.md): Spesifikasi lengkap rute halaman, modul, dan alur interaksi.
- 🛠️ [**SETUP.md**](SETUP.md): Panduan menjalankan server frontend di lingkungan lokal.
- 📋 [**TASK_GUIDE.md**](TASK_GUIDE.md): Pelacakan tugas implementasi frontend FE-1.x hingga FE-6.x.
- 📦 [**MOCK_DATA.md**](MOCK_DATA.md): Panduan konsumsi mock data untuk pengujian lokal.
- 📝 [**CHANGELOG.md**](CHANGELOG.md): Riwayat lengkap perubahan dan penyempurnaan UI.
