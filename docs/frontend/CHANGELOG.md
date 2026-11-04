# Changelog: Frontend (Tampilan)

Format: `[versi] tanggal` + perubahan, merujuk ID tugas di [`TASK_GUIDE.md`](TASK_GUIDE.md).

## [Belum dirilis]
### Ditambahkan
- **FE-1.1**: Navigasi responsif (ramah mobile mulai 360 px dengan menu toggle), keyboard navigation & skip-link aksesibilitas, footer permanen dengan tautan Keterbatasan dan Privasi.
- **FE-1.2**: Komponen dasar desain sistem (`Button`, `Card`, `LevelBadge`, `RiskMeter`, `Disclaimer`, `FlagList`) dengan aturan token warna `DESIGN_SYSTEM.md` (level terendah biru-abu, ikon info, tanpa klaim hijau/persentase penipuan).
- **FE-1.3**: Halaman Keterbatasan dan Privasi (`/keterbatasan`) memuat penjelasan on-device, batas analisis aturan, transparansi uji analyzer, serta tombol interaktif "Hapus semua data lokal" (`storage.clearAll`).
- Setup lingkungan lokal: `apps/web/.env.local` (`VITE_USE_MOCK=true`) dan penambahan paket ikon `lucide-react` mandiri (bebas CDN).
- Pembaruan halaman `Beranda` dan peningkatan tampilan tab serta input `Cek` (Pesan, Link, Berkas & Izin).
- **Pemisahan Alur Landing Page & Pengguna Login**:
  - `AuthContext`: Manajemen status sesi lokal (on-device, tanpa server) dengan dukungan penyimpanan aman `localStorage`.
  - Tata Letak Sidebar & Navigasi Bersyarat (`Layout.tsx`):
    - **Mode Pengunjung (Belum Login):** Tampilan Landing Page bersih tanpa sidebar/navbar menu; hanya logo JR dan tombol **Masuk**.
    - **Mode Pengguna (Sudah Login):** Navigasi vertikal berbasis **Sidebar** di sisi kiri untuk desktop (w-64 fixed) dengan ikon intuitif, profil pengguna, dan link cepat; serta drawer samping geser responsif (off-canvas) untuk perangkat seluler dengan tombol hamburger, backdrop blur, dan target sentuh >= 44 px.
    - Tetap mempertahankan link permanen Keterbatasan & Privasi serta tombol **Keluar dari Sesi**.
  - `LoginModal`: Modal login cepat dengan nama samaran/tamu ramah privasi (100% on-device).
  - `ProtectedRoute`: Proteksi rute internal aplikasi dengan gerbang ramah jika belum login.
  - **Redesain Dashboard Pengguna Sesuai Referensi & Pembaruan Palet Warna**:
    - Penyesuaian palet warna: `#DDE6ED` (background utama aplikasi), `#27374D` (font/tipografi utama berkontras tinggi), `#526D82` (background sidebar navigasi), dan `#9DB2BF` (warna kontras tambahan, border, aksen halus).
    - Top bar pencarian modul/istilah terintegrasi, notifikasi, dan status profil pengguna.
    - **1. Banner Welcome Back**: Sambutan personal, indikator progres pembelajaran, dan ilustrasi isometrik edukasi.
    - **2. Kalender & Pintasan Simulator**: Widget kalender interaktif bulanan dengan penanda skenario waspada/selesai serta tombol pintasan ke simulasi aktif.
    - **3. Kamus & Modus Populer**: Daftar ringkasan istilah/modus siber (Upcoming Task style) terhubung ke `/kamus`.
    - **4. Grafik Pembelajaran Mingguan**: Kurva gelombang halus (Activities SVG wave chart) dengan titik sorotan hari aktif dan metrik capaian.
    - **5. Sidebar**: Navigasi vertikal persis referensi dengan kartu info "Tantangan Kilat 120 Detik" di bagian bawah.
    - **6. Pintasan Menuju Modul**: 3 kartu kursus/studi kasus (Undangan APK, Kurir Paket, Loker WFH) lengkap dengan level, estimasi durasi, dan progres.
  - **Redesain Landing Page Berbasis Video Referensi & Integrasi Three.js**:
    - Komponen 3D Canvas interaktif (`ThreeHeroCanvas.tsx`): Model smartphone 3D interaktif Three.js dengan pencahayaan dinamis, partikel/cincin pelindung melayang, efek *mouse parallax tilt*, dan simulasi layar aplikasi JagaRuang.
    - Struktur Landing Page lengkap persis alur video: Top Navbar (Home, Tiga Pilar, Modul, Cerita Rekan, FAQ, Login & Register), Hero Section 2 kolom, Metrics Counter Bar (10K+ Skenario, 8K+ Pengguna, 4.9 Rating, 100% On-Device), Kartu Rekomendasi Modul, Testimoni Komunitas, Accordion FAQ, dan Banner Aksi Bawah.
  - **Restrukturisasi Hub Belajar (/belajar) & Halaman Pembelajaran Khusus (Cover + Page Khusus)**:
    - **Header & 4 Tab Navigasi Horizontal**: Simulator, Modul, Kilat 2 Menit, dan Kamus dengan alur mandiri (tidak digabung dalam satu alur scroll panjang).
    - **Bagian 1 (Simulator)**: Cover 3 kartu skenario kasus latih; klik kartu membuka halaman simulasi khusus (Briefing -> Investigasi Bukti -> Debrief & Hasil Evaluasi).
    - **Bagian 2 (Modul Pembelajaran)**: Tampilan Cover persis referensi visual Figma dengan tombol cepat "Kilat 2 Menit", filter 6 kategori ("Semua", "Dasar Keamanan", "Per Kanal", "Checklist Praktis", "Pola Kejadian Nyata", "Setelah Kejadian"), dan grid 12 kartu modul lengkap dengan badge status "Belum dibaca" / "Sudah dibaca". Klik kartu modul membuka halaman pembelajaran khusus (Konsep Utama, Tahapan Anatomi, Tanda Kejanggalan, Checklist Praktis Interaktif, dan Intisari Perlindungan).
    - **Bagian 3 (Kilat 2 Menit)**: Cover standby hero 120 detik; klik "Mulai Sekarang" membuka halaman simulasi drill khusus (timer countdown 120s, kartu pesan, tombol "Pesan Biasa" vs "Curiga", dan evaluasi skor refleks).
    - **Bagian 4 (Kamus Jebakan)**: Cover pencarian istilah dan filter kategori; klik istilah membuka halaman khusus kupas tuntas modus, cara kerja, titik masuk, dan pertolongan pertama.
    - **Notifikasi & On-Device Storage**: Terintegrasi dengan sistem notifikasi progres target dan persistensi status modul lokal di `localStorage`.
    - Dashboard pengguna login tetap terjaga 100% utuh tanpa perubahan.
  - **Redesain Total Komposisi Visual 3D Hero (React Three Fiber & Drei)**:
    - Konsep tunggal terpadu: **"iPhone sebagai hero, orbit sebagai aksesori halus"**.
    - **Model Prosedural iPhone 15/16 Pro (`IPhone.tsx`)**: Dibuat 100% secara prosedural dengan material titanium natural (`metalness 0.96`, `roughness 0.26`), layar depan glossy dengan Dynamic Island kapsul, tombol titanium (Action, Volume, Power), kaca frosted belakang, dan modul kamera 3 lensa Pro (outer titanium ring, inner dark bezel, glass lens, True Tone flash, serta LiDAR).
    - **Layar HTML Ultra-Tajam (`<Html transform>`)**: Tampilan antarmuka tajam dengan kontras tinggi (setara 11-12px final) menampilkan 3 elemen fokus: Header JagaRuang Mobile dengan status bar, Kartu Peringatan Kritis merah (`Undangan_Pernikahan.apk`), dan Kartu Status Hijau terverifikasi (`Tautan Aman`).
    - **Satu Cincin Orbit Halus (`Orbit.tsx`)**: Satu cincin torus tipis berbagi titik pusat sama `[0, 0, 0]` dengan HP, memotong depan dan belakang dengan *depth buffer* akurat (tanpa *clipping bug*), serta partikel bercahaya emerald yang mengitari cincin.
    - **Kartu Notifikasi Melayang Berkedalaman (`FloatingCards.tsx`)**: 3 kartu notifikasi melayang dengan parallax multi-layer (Tautan Aman hijau, Peringatan Berkas merah, dan Sandi Keluarga slate).
    - **Pencahayaan Studio & Efek Refleksi (`HeroScene.tsx`)**: Menggunakan `<Lightformer>` prosedural (100% on-device tanpa unduhan eksternal), directional light dengan bayangan halus, serta `<ContactShadows>` di bawah HP.
    - **Interaktivitas & Aksesibilitas**: Animasi `Float` halus, tilt kursor responsif (maks ~15 derajat) dengan lerp damping, kepatuhan `prefers-reduced-motion` untuk pose statis, dan `IntersectionObserver` / visibility listener untuk auto-pause saat di luar layar.
    - **Konfigurasi Terpusat (`hero3d.config.ts`)**: Seluruh parameter visual, kecepatan, dan skala dikumpulkan di satu file konfigurasi.
    - **Code Splitting & Lazy Loading**: Chunk R3F dimuat secara asinkron dengan skeleton fallback (`Hero3DFallback.tsx`).
