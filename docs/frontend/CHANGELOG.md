# Changelog: Frontend (Tampilan)

Format: `[versi] tanggal` + perubahan, merujuk ID tugas di [`TASK_GUIDE.md`](TASK_GUIDE.md).

## [Belum dirilis]
### Ditambahkan
- **FE-1.1**: Navigasi responsif (ramah mobile mulai 360 px dengan menu toggle), keyboard navigation & skip-link aksesibilitas, footer permanen dengan tautan Keterbatasan dan Privasi.
- **FE-1.2**: Komponen dasar desain sistem (`Button`, `Card`, `LevelBadge`, `RiskMeter`, `Disclaimer`, `FlagList`) dengan aturan token warna `DESIGN_SYSTEM.md` (level terendah biru-abu, ikon info, tanpa klaim hijau/persentase penipuan).
- **FE-1.3**: Halaman Keterbatasan dan Privasi (`/keterbatasan`) memuat penjelasan on-device, batas analisis aturan, transparansi uji analyzer, serta tombol interaktif "Hapus semua data lokal" (`storage.clearAll`).
- Setup lingkungan lokal: `apps/web/.env.local` (`VITE_USE_MOCK=true`) dan penambahan paket ikon `lucide-react` mandiri (bebas CDN).
- Pembaruan halaman `Beranda` dan peningkatan tampilan tab serta input `Cek` (Pesan, Link, Berkas & Izin).
