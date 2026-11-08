# PAGES_AND_FLOWS.md: Arsitektur Halaman, Navigasi, & Alur Pengguna

Dokumen ini mendefinisikan seluruh struktur rute URL, komponen halaman, tata kelola alur interaksi (*user flows*), serta penanganan state pada aplikasi **JagaRuang**.

---

## 1. Peta Rute & Struktur Navigasi Aplikasi

```
                                      ROOT DIRECTORY (/)
                                       [Landing Page]
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │ Pengguna Belum Login                          │ Pengguna Sudah Login
                      ▼                                               ▼
             [Modal Login / Register]                       [Buka Dashboard: /dashboard]
                      │
                      └───────────────► /dashboard
                                            │
        ┌──────────────┬────────────────────┼────────────────────┬─────────────────┐
        ▼              ▼                    ▼                    ▼                 ▼
      /cek          /belajar             /lindungi             /sandi        /keterbatasan
  (Pemeriksa)   (Hub Pembelajaran)    (Pusat Mitigasi)    (Sandi Keluarga)  (Transparansi)
                       │
       ┌───────────────┼───────────────┬───────────────┐
       ▼               ▼               ▼               ▼
   tab=simulator   tab=modul       tab=kilat       tab=kamus
  (Skenario Chat) (12 Modul m1-12)(Drill 2 Menit) (10 Modus Istilah)
```

### Tabel Rute Lengkap

| Rute URL | Komponen Halaman | Hak Akses | Deskripsi & Fitur Utama |
|---|---|---|---|
| `/` | `pages/Beranda.tsx` | Publik | Landing Page publik dengan Three.js 3D Canvas, capaian metrik nasional, showcase 3 pilar, FAQ accordion, dan CTA pendaftaran. |
| `/dashboard` | `pages/Dashboard.tsx` | Terproteksi (`ProtectedRoute`) | Dashboard utama pengguna: kartu progres belajar, pintasan aksi cepat, notifikasi aktivitas, dan rekapitulasi status keamanan. |
| `/cek` | `pages/Cek.tsx` | Terproteksi | Pemeriksa cerdas multi-vektor: Tab Pesan Teks, Tab Tautan Phishing, dan Tab File Lampiran/Izin APK dengan 22 aturan inferensi lokal. |
| `/belajar` | `pages/Belajar.tsx` | Terproteksi | Hub Belajar 4 Pilar (`?tab=simulator`, `?tab=modul`, `?tab=kilat`, `?tab=kamus`). |
| `/belajar?modul=m[1-12]` | `components/modul/Modul*Page.tsx` | Terproteksi | 12 Halaman modul pembelajaran interaktif berurutan. |
| `/lindungi` | `pages/Lindungi.tsx` | Terproteksi | Pusat proteksi diri & sekitar: panduan checklist 5 kondisi, direktori kanal lapor resmi terverifikasi, dan generator kartu peringatan visual. |
| `/sandi` | `pages/Sandi.tsx` | Terproteksi | Fitur khusus pembuatan dan panduan Sandi Verifikasi Keluarga penangkal AI Voice Cloning. |
| `/keterbatasan` | `pages/Keterbatasan.tsx` | Publik / Terproteksi | Transparansi cara kerja algoritma, batasan pendeteksian heuristik, dan kontrol penghapusan data lokal (`localStorage`). |
| `*` | `pages/NotFound.tsx` | Publik | Penanganan rute tidak ditemukan (404) dengan tombol kembali yang ramah. |

---

## 2. Alur Interaksi Per Fitur Utama

### 2.1. Alur Cek Pesan, Link, & File (`/cek`)

```
[ PENGGUNA ] 
   │
   ├─► Pilih Tab: [Pesan Teks] / [Tautan Web] / [File Lampiran & APK]
   │
   ├─► Ketik/Tempel Konten ATAU Tekan Tombol ["Coba Contoh"]
   │
   ├─► Tekan Tombol ["Analisis Sekarang"]
   │
   ▼
[ MESIN INFERENSI LOKAL (coreClient.ts) ]
   │
   ├─► 1. Normalisasi teks & Redaksi Otomatis PII (Nomor HP, Rekening, NIK)
   ├─► 2. Evaluasi 22 Aturan Heuristik L1 - L5
   ├─► 3. Kalkulasi Skor Risiko (0 - 100) & Penentuan Band Kewaspadaan
   │
   ▼
[ HASIL ANALISIS REAL-TIME ]
   ├── Visual Risk Meter (Belum Terlihat / Waspada / Tinggi / Sangat Tinggi)
   ├── Teks Asli dengan Penyorotan Kalimat Curiga (<mark>)
   ├── Rincian Tanda Kejanggalan ("Kenapa Mencurigakan")
   ├── Langkah Verifikasi Mandiri yang Disarankan ("Cara Cek Sendiri")
   ├── Disclaimer Permanen Sistem (Non-Antivirus Notice)
   │
   └── Aksi Tindak Lanjut Terhubung:
       ├─► [Latih di Simulator] -> membuka /belajar?tab=simulator
       ├─► [Pelajari Istilah]  -> membuka /belajar?tab=kamus
       └─► [Tindakan Darurat]  -> membuka /lindungi
```

### 2.2. Alur Hub Belajar: 4 Pilar (`/belajar`)

#### A. Pilar Simulator (`?tab=simulator`)
1. Pengguna memilih salah satu dari skenario kasus nyata (mis. *Skenario #1: Undangan Pernikahan APK*, *Skenario #2: Kurir Paket Misterius*, atau *Skenario #3: Video Call Bank Palsu*).
2. Sistem menyajikan antarmuka simulasi smartphone yang imersif:
   - **Percakapan Chat Bertahap**: Balon chat muncul berurutan menyerupai percakapan WhatsApp nyata.
   - **Inspeksi Bukti (Lightbox)**: Pengguna dapat mengetuk gambar lampiran untuk memeriksa detail kejanggalan dokumen secara forensik.
   - **Pengambilan Keputusan Percabangan**: Pengguna memilih 1 dari 2-3 pilihan tindakan di setiap tahap kritis.
   - **Konsekuensi Nyata & Debrief Kasus**: Menampilkan skor pemahaman, analisis pilihan yang tepat vs berisiko, serta lencana keberhasilan.

#### B. Pilar 12 Modul Edukasi (`?tab=modul`)
1. Pengguna memilih kartu modul pembelajaran (m1 s.d. m12).
2. Setiap modul menyajikan materi interaktif 4-6 menit baca dengan fitur khusus:
   - **m1 (Rekayasa Sosial)**: Hook simulasi SMS ancaman rekening, akordion 5 prinsip psikologis, timeline 4 tahap, dan spotter red flag pesan asli vs palsu.
   - **m2 (Anatomi Penipuan)**: 5 fase penipuan berbahasa awam, studi kasus fiktif berurutan, latihan titik intervensi dini, dan mitigasi pasca-kejadian.
   - **m3 (Keamanan WhatsApp)**: Pembeda akun centang hijau resmi vs peniru, bahaya file APK dan tautan grup publik.
   - **m4 (Keamanan Email & Phishing)**: Pembongkaran display name spoofing, trik URL karakter `@`, bahaya homograph Unicode Cyrillic, dan latihan kuis domain bergaya CTF.
   - **m5 (Waspada Telepon Bank)**: Diagram alur teknologi *Caller ID Spoofing*, simulasi dialog percakapan telepon bertahap picoCTF, dan batas privasi aplikasi GetContact/Truecaller.
   - **m6 (10 Ciri Phishing - Capstone)**: 3 kategori ciri universal (Emosi, Teknis, Pola Bahasa), tantangan evaluasi 5 pesan acak lintas kanal, dan integrasi fitur Cek.
   - **m7 (Checklist Sebelum Transfer)**: Aturan emas 5 detik sebelum transfer, edukasi rekening penampung (nominee), 5 modus transaksi populer, stepper alur jebakan, dan fitur bagikan ringkasan.
   - **m8 (Pola Modus Terbanyak Nasional)**: Dataset terstruktur IASC & Satgas PASTI OJK, diagram batang interaktif perbandingan Alasan/Cerita vs Cara/Teknik, dan kartu transversal APK.
   - **m9 (QRIS & E-Wallet)**: Tab pemisah Pembeli vs Penjual, hotspot interaktif meja kasir & kotak amal, mockup konfirmasi pembayaran, serta poster cetak keamanan merchant.
   - **m10 (Pinjol Ilegal)**: Tab pemisah *"Aku Mau Pinjam"* vs *"Aku Sedang Diteror"*, simulator pop-up izin Android generik (aturan CAMILAN), tabel komparasi fintech legal vs ilegal, pemeriksa offline 3 langkah, dan templat klarifikasi teror kontak.
   - **m11 (Pusat Darurat Lapor IASC OJK)**: Wizard darurat 3 langkah (mendukung URL parameter `?jalur=`), 2 tombol aksi utama teratas (Bank & Portal IASC), domain resmi tunggal `iasc.ojk.go.id`, generator kronologi 100% lokal, tab pendamping berkuasa, dan mitigasi penipuan lapis kedua (*Recovery Scam*).
   - **m12 (Pendampingan Keluarga Korban)**: Pendekatan empati 3 fase psikologis korban, chat bubble dialog suportif vs menghardik, urutan prioritas teknis (mode pesawat vs cabut SIM card), simulasi respons pendamping picoCTF, dan integrasi pembuatan Sandi Keluarga.

#### C. Pilar Kuis Kilat 2 Menit (`?tab=kilat`)
1. Pengguna memulai kuis reflektif: 10 pesan acak ditampilkan satu per satu dengan penghitung waktu mundur 120 detik.
2. Pengguna membuat keputusan cepat: *"Pesan Biasa"* atau *"Mencurigakan"*.
3. Sistem menyajikan evaluasi keakuratan, rincian red flags pada pesan yang terlewat, dan rekomendasi modul belajar yang sesuai.

#### D. Pilar Kamus Jebakan (`?tab=kamus`)
1. Pengguna menelusuri 10 kartu ensiklopedia istilah penipuan digital (APK Sniffer, Quishing, Spoofing, Vishing, Phishing, dsb.).
2. Setiap kartu menyajikan 1 section utuh terpadu: Definisi & Tanda Utama, Cara Kerja & Titik Masuk, Pertolongan Pertama 15 Menit, dan Langkah Pencegahan Permanen.

### 2.3. Alur Sandi Verifikasi Keluarga (`/sandi`)

```
[ PENGGUNA BUKA /sandi ]
   │
   ├─► Pelajari Bahaya AI Voice Cloning & Deepfake Emergency Call
   │
   ├─► Buat Kata Sandi Rahasia (Generator Acak 2-3 Kata Unik atau Ketik Mandiri)
   │
   ├─► Baca Panduan Komitmen: "Sepakati hanya secara langsung / tatap muka, jangan kirim lewat chat"
   │
   ├─► [Simpan di Perangkat Ini] (Opsional: disimpan di localStorage lokal)
   │
   └─► Simulasi Uji Refleks: Hadapi penelpon darurat dan tanyakan sandi keluarga
```

---

## 3. Penanganan State Antarmuka

Setiap halaman di JagaRuang menangani 5 kondisi state secara konsisten dan aman:
1. **State Kosong (Empty State)**: Menampilkan instruksi ramah, ilustrasi pendukung, dan tombol pancingan *"Coba Contoh Kasus"* agar pengguna tidak bingung memulai.
2. **State Memuat (Loading State)**: Indikator loading halus (*skeleton placeholder* atau spinner aksen biru `#27374D`) dengan animasi transisi yang menghormati preferensi `prefers-reduced-motion`.
3. **State Hasil / Konten (Success / Active State)**: Menampilkan data hasil analisis atau konten modul secara rapi dengan hierarki tipografi yang jelas.
4. **State Error Ramah (Friendly Error State)**: Jika pengguna memasukkan input tidak valid, sistem menampilkan penjelasan ramah tanpa mengekspos pesan teknis *stack trace* peramban.
5. **State Pembatasan Akses Penyimpanan (Storage Restricted / Incognito Mode)**: Jika peramban memblokir akses ke `localStorage` (misalnya pada mode penyamaran ketat), seluruh fitur aplikasi tetap dapat beroperasi normal menggunakan penyimpanan memori sesi (*in-memory state*).
