# TASK_GUIDE.md: Frontend (Tampilan)

> **Branch:** `frontend` · **R/W:** `apps/web/`, `docs/frontend/`
> **Kontrak:** [`../universal/INTERFACES.md`](../universal/INTERFACES.md) · Tanda: 🟢 Must · 🟡 Should · ⚪ Could

---

## TAHAP 1: Fondasi (hari 1)

#### 🟢 FE-1.1: Router, Layout, navigasi, footer
- **Sudah ada kerangka:** `App.tsx`, `Layout.tsx`. Lengkapi.
- **Checklist:** [ ] footer "Keterbatasan dan Privasi" di semua halaman [ ] nav bisa dioperasikan keyboard

#### 🟢 FE-1.2: Design tokens & komponen dasar
- `RiskMeter` (meter level, **bukan persentase**), `FlagList`, `Disclaimer`, `LevelBadge` (ikon info untuk level terendah), `Button`, `Card`.
- Warna: lihat [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).

#### 🟢 FE-1.3: Halaman Keterbatasan dan Privasi + tombol "Hapus semua data lokal"
- Isi (PRD F6): analisis berjalan di perangkat, tidak ada data dikirim; hasil adalah indikasi dan bisa keliru; semua skenario fiktif; link tidak dibuka, isi file tidak dibaca; kontak resmi bisa berubah; **hasil uji analyzer** (ambil dari `docs/backend/CHANGELOG.md`).
- Tombol hapus memanggil `storage.clearAll()` (lewat `coreClient`).

---

## TAHAP 2: Cek (hari 2-3)

#### 🟢 FE-2.1: Halaman Cek, 3 tab
- Tab **Pesan** (penghitung karakter, maks 5.000), **Link**, **File & Izin** (nama file, sumber, centang izin dalam bahasa awam; pilih file dari perangkat hanya membaca nama + ekstensi).
- Peringatan di atas kolom input: jangan masukkan data pribadi.
- Pemberitahuan bila `piiMasked` tidak kosong.
- **Checklist:** [ ] input kosong -> pesan validasi, tidak error [ ] tidak ada permintaan jaringan saat pilih file

#### 🟢 FE-2.2: Tampilan hasil
- Label + meter level, teks dengan red flag ter-highlight (`<mark>` dari `span`), "Kenapa?" + "Cara verifikasi" per flag, perkiraan modus, **disclaimer permanen**.
- Tombol lanjut: **Latih modus ini**, **Apa yang harus kulakukan?**, **Pelajari: <jenis malware>**, **Buat Kartu Peringatan**.
- **Checklist:** [ ] tidak ada persentase penipuan [ ] kata terlarang tidak muncul

#### 🟢 FE-2.3: Tombol "Coba contoh" di setiap input (F5)
- Mengisi data fiktif dan langsung bisa dianalisis dengan satu klik berikutnya. Tombol "Mulai kasus cepat (3 menit)" di Beranda.

---

## TAHAP 3: Kamus & Latih (hari 4-6)

#### 🟡 FE-3.1: Kamus Jebakan, kartu geser
- Tautan dari hasil Cek membuka kartu yang tepat; **tombol kembali memulihkan hasil sebelumnya** (simpan state hasil di router state/context).

#### 🟢 FE-3.2: Alur Latih
- Pilih kasus -> Briefing (3-4 kartu) -> Investigasi (ketuk bukti pada tampilan tiruan) -> Keputusan -> Konsekuensi -> Debrief (skor, peringkat, kode `TRUST{...}`, red flag terlewat).
- Pilihan berisiko: layar konsekuensi + tautan langsung ke Lindungi (bukan game over). Tombol petunjuk.
- **Checklist:** [ ] satu kasus selesai di HP tanpa error

---

## TAHAP 4: Lindungi & Kartu (hari 7)

#### 🟢 FE-4.1: Halaman Lindungi
- Pilih kondisi -> checklist berurutan (centang tersimpan lokal lewat `storage`) -> kanal lapor resmi (tampilkan `verifiedAt` + catatan "cek ulang di situs resmi").
- Kalimat pembuka layar darurat menekankan melapor secepat mungkin. **Jangan menjanjikan dana kembali.**

#### 🟡 FE-4.2: Kartu Peringatan
- Tampilkan teks dari `buildWarningCard`; tombol **Salin**; **Web Share API** bila tersedia (cek `navigator.share`).

---

## TAHAP 5: Pembeda (hari 8), ⚪ boleh dipangkas

- **FE-5.1 Kilat 2 Menit:** timer 120 detik, 10 pesan, tombol **"Pesan biasa"** / **"Curiga"** (bukan "Aman"), hasil + alasan + rekomendasi kasus.
- **FE-5.2 Sandi Keluarga:** tombol buat kata, salin, panduan, opsi simpan **default mati**, tombol hapus.

---

## TAHAP 6: Penutup (hari 9-10)

- **FE-6.1** Responsif nyaman mulai 360 px; uji di HP sungguhan.
- **FE-6.2** Aksesibilitas: kontras, fokus terlihat, label form, teks alternatif.
- **FE-6.3** Skrip pemindai kata terlarang di `apps/web/` (mis. `apps/web/scripts/scan-forbidden.mjs`): gagal bila menemukan "aman", "pasti", "100%" pada teks UI.
- **FE-6.4** Ganti ke core asli (`VITE_USE_MOCK=false`) bersama Integrator dan uji alur penuh.
- **FE-6.5** Bagian README Frontend + tangkapan layar.

---

## Definition of Done (per PR ke `development`)
- [ ] `npm run build` hijau
- [ ] `npm run scope` hijau
- [ ] 360 px nyaman, keyboard bisa
- [ ] `docs/frontend/CHANGELOG.md` diperbarui
- [ ] Tidak menyentuh folder di luar wewenang
