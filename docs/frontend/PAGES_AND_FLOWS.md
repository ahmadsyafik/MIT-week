# PAGES_AND_FLOWS.md: Halaman & Alur

## Navigasi

```
                       BERANDA
  ┌──────┬────────┬──────────┬───────┬──────────────┬────────────────┐
 CEK   LATIH   LINDUNGI   KAMUS   KILAT 2 MNT   SANDI KELUARGA
  └── footer di semua halaman: Keterbatasan & Privasi
```

| Rute | Halaman | Prioritas |
|---|---|---|
| `/` | Beranda (tombol Mulai Cek, Kasus cepat 3 menit) | Must |
| `/cek` | Cek (tab Pesan, Link, File & Izin) + hasil | Must |
| `/latih` | Daftar kasus + alur kasus | Must |
| `/lindungi` | Pilih kondisi + checklist + kanal lapor | Must |
| `/kamus` | Kamus Jebakan (kartu geser) | Should |
| `/kilat` | Kilat 2 Menit | Could |
| `/sandi` | Sandi Keluarga | Could |
| `/keterbatasan` | Keterbatasan dan Privasi + hapus data lokal | Must |

## Alur Cek
```
Pilih tab -> isi input / "Coba contoh" -> (core: normalisasi, samarkan data pribadi, aturan, skor)
 -> HASIL: label + meter, teks ter-highlight, "Kenapa?" + "Cara verifikasi", modus, jenis malware
     ├─► Latih modus ini        -> /latih (kasus terkait)
     ├─► Apa yang harus kulakukan? -> /lindungi
     ├─► Pelajari: <malware>    -> /kamus (kembali memulihkan hasil)
     └─► Buat Kartu Peringatan
```

## Alur Latih
```
Pilih kasus -> Briefing (3-4 kartu) -> Investigasi (ketuk bukti) -> Keputusan 1 -> Konsekuensi
 -> Keputusan 2 -> Konsekuensi -> Debrief (skor, red flag terlewat, jawaban ideal, kode TRUST{...})
 -> [Lindungi] / [Ulang] / [Kasus berikutnya]
(pilihan berisiko -> layar konsekuensi + tautan langsung ke Lindungi)
```

## Alur Lindungi
```
Pilih kondisi -> checklist berurutan (centang tersimpan lokal) -> kanal lapor resmi (verifiedAt)
 -> [Buat Kartu Peringatan untuk keluarga/teman]
```

## Alur Kilat 2 Menit
```
Mulai -> 10 pesan acak, timer 120 dtk, pilih "Pesan biasa"/"Curiga" -> hasil + alasan + rekomendasi Latih
```

## Alur Sandi Keluarga
```
Buat 2-3 kata -> salin -> panduan "sepakati langsung, jangan lewat chat" -> opsional simpan lokal (default mati) -> hapus
```

## State yang wajib ditangani di setiap halaman
`kosong` · `memuat` · `hasil` · `error ramah` (tidak ada stack trace) · `localStorage mati` (tetap berfungsi).
