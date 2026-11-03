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
  - Pembaruan `Beranda`: Pengunjung melihat Landing Page pengenalan fitur dan CTA masuk; pengguna terotentikasi disambut dengan dashboard interaktif personal.
