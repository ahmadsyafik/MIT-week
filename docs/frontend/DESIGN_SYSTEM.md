# DESIGN_SYSTEM.md: Sistem Desain, Token Visual, & Aksesibilitas

Dokumen ini mendefinisikan token warna, tipografi, komponen antarmuka, serta aturan kepatuhan aksesibilitas (**WCAG AA**) yang diterapkan di seluruh aplikasi **JagaRuang**.

---

## 1. Filosofi & Pendekatan Visual

- **Profesional, Tenang, & Terpercaya**: Dirancang khusus agar pengguna yang sedang cemas atau panik tidak merasa kewalahan (*overwhelmed*).
- **Tema Biru Gelap (*Dark Slate Navy*)**: Menggunakan perpaduan warna biru gelap `#27374D` sebagai aksen primer yang kokoh dan berwibawa, dipadukan dengan kartu putih rounded dan latar belakang abu-abu terang `#DDE6ED` yang sejuk di mata.
- **Hierarki Kartu Rounded & Elegan**: Setiap kartu informasi menggunakan kelengkungan sudut modern (`rounded-2xl` atau `rounded-3xl`), pembatas halus (`border border-[#9DB2BF]/50`), dan bayangan lembut (`shadow-xs` hingga `shadow-md`).

---

## 2. Palet Warna & Token Desain

### 2.1. Warna Inti Aplikasi

| Token Nama | Nilai HEX | Peran dalam Antarmuka |
|---|---|---|
| `Primary Dark` | `#27374D` | Warna teks utama, header banner, tombol aksi primer, border aktif |
| `Secondary Slate`| `#526D82` | Teks sekunder, deskripsi bantuan, ikon penjelas |
| `Border Soft` | `#9DB2BF` | Garis pembatas kartu, separator navigasi, aksen outline |
| `Background Soft`| `#DDE6ED` | Latar belakang halaman aplikasi, badge status netral |
| `Surface White` | `#FFFFFF` | Latar belakang kartu konten, modal pop-up, form input |

### 2.2. Warna Tingkat Risiko (Risk Bands)

Sistem inferensi heuristik JagaRuang membagi tingkat kewaspadaan menjadi 4 kategori. Setiap tingkat **wajib menyertakan label teks dan ikon pendukung**, tidak boleh hanya mengandalkan warna semata:

| Band Risiko | Label Resmi | Warna Aksen | Latar Kartu | Ikon Resmi | Keterangan Makna |
|---|---|---|---|---|---|
| `belum_terlihat` | Belum terlihat tanda bahaya | Biru-Abu (`#526D82`) | Biru-abu lembut | `Info` (i) | Indikator kejanggalan belum ditemukan pada input ini. |
| `waspada` | Waspada | Kuning-Kuning Tua (`#D97706`) | Kuning muda | `AlertTriangle` (▲) | Ditemukan 1 indikator mencurigakan, perlu verifikasi mandiri. |
| `tinggi` | Risiko tinggi | Oranye-Kemerahan (`#EA580C`)| Oranye lembut | `AlertTriangle` (▲) | Ditemukan pola rekayasa sosial atau tautan berbahaya. |
| `sangat_tinggi` | Risiko sangat tinggi | Merah Tegas (`#DC2626`) | Merah muda lembut | `OctagonAlert` (🛑) | Ditemukan malware APK, pencuri OTP, atau ancaman kritis. |

> **Aturan Keamanan Desain (Prinsip Non-False Safety):**  
> Dilarang keras menggunakan warna hijau mencolok, tanda centang hijau, atau ikon perisai aman untuk hasil analisis berisiko terendah. Hal ini untuk mencegah pengguna berasumsi bahwa pesan/link tersebut "100% aman dan terbukti bebas penipuan".

---

## 3. Tipografi

Aplikasi menggunakan tipografi modern yang dihosting mandiri (*self-hosted*) melalui paket `@fontsource-variable`:

- **Font Utama Antarmuka**: `Plus Jakarta Sans` (`@fontsource-variable/plus-jakarta-sans`)
  - Karakter: Geometris, modern, mudah dibaca pada layar smartphone beresolusi tinggi maupun rendah.
- **Font Alternatif & Monospace**: `Inter Variable` dan font sistem `monospace` untuk alamat domain dan hash teknis.
- **Skala Tipografi**:
  - Judul Halaman Utama: `text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight`
  - Sub-Header Bagian: `text-xl sm:text-2xl font-bold`
  - Judul Kartu: `text-base sm:text-lg font-bold`
  - Teks Isi / Paragraf: `text-xs sm:text-sm font-normal leading-relaxed`
  - Teks Keterangan & Metadata: `text-[11px] sm:text-xs text-[#526D82]`

---

## 4. Komponen Antarmuka & Pola Desain (UI Patterns)

1. **Tombol Aksi (Buttons)**:
   - **Primer**: Latar `#27374D`, teks putih, sudut `rounded-xl`, efek hover `#1E293B`, target sentuh minimum 44 px.
   - **Sekunder**: Latar putih, border `#9DB2BF]/60`, teks `#27374D`, efek hover bg-slate-50.
   - **Aksi Darurat / Berbahaya**: Latar merah marun/rose `#BE123C`, teks putih.
   - **Aksi Dukungan Empatis**: Latar sage green/emerald `#047857`, teks putih.
2. **Kartu Konten (Cards)**:
   - Sudut melengkung `rounded-2xl` atau `rounded-3xl`, latar putih, pembatas `border border-[#9DB2BF]/50`, padding responsif `p-5 sm:p-8`.
3. **Pemberitahuan Peringatan (Alerts / Callouts)**:
   - Menggunakan format satu wadah menyatu dengan border samping tebal atau latar bernuansa lembut (`bg-amber-50`, `bg-rose-50`, `bg-emerald-50`).
4. **Penyorotan Red Flags pada Teks Asli**:
   - Dilarang menyuntikkan HTML mentah (`dangerouslySetInnerHTML`). Penyorotan kata/kalimat mencurigakan dilakukan murni menggunakan elemen React `<mark className="bg-amber-200/80 px-1 py-0.5 rounded font-semibold text-[#27374D]">`.
5. **Chat Bubble Percakapan**:
   - Bubble Pesan Masuk (Pelaku): Latar putih, rounded-2xl dengan sudut kiri atas datar (`rounded-tl-xs`), bayangan halus.
   - Bubble Pesan Pengguna (Korban/Pendamping): Latar hijau WhatsApp (`#DCF8C6`) atau biru slate, rounded-2xl dengan sudut kanan atas datar (`rounded-tr-xs`).

---

## 5. Kepatuhan Aksesibilitas (WCAG 2.1 AA)

JagaRuang dirancang agar dapat diakses dengan mudah oleh semua lapisan masyarakat, termasuk lansia dan pengguna pembaca layar (*screen reader*):

1. **Rasio Kontras Warna (Contrast Ratio)**:
   - Seluruh teks isi dan teks judul memenuhi rasio kontras minimal **4.5:1** terhadap latar belakangnya.
   - Elemen tombol dan teks penting memiliki rasio kontras di atas **7:1**.
2. **Navigasi Papan Ketik (Keyboard Navigation)**:
   - Setiap elemen interaktif (tombol, tab, tautan, slider, checkbox kuis) dapat dijangkau menggunakan tombol `Tab`.
   - Cincin fokus (*focus ring*) tampil kontras dan jelas saat elemen aktif (`focus:ring-2 focus:ring-[#27374D] focus:outline-none`).
3. **Dukungan Pembaca Layar (Screen Readers & ARIA)**:
   - Tombol salin teks kronologi dan kontak darurat mengumumkan hasil keberhasilan penyalinan secara otomatis melalui atribut `aria-live="polite"`.
   - Diagram batang dan grafik statistik menyediakan tabel teks alternatif tersembunyi menggunakan kelas `sr-only`.
4. **Penghormatan Preferensi Pengguna (Motion Sensitivity)**:
   - Semua animasi transisi (dropdown, fade-in, counter angka) menghormati pengaturan sistem operasi `prefers-reduced-motion: reduce`.
5. **Desain Ramah Smartphone (Mobile-First)**:
   - Tata letak tetap proporsional dan tidak terjadi teks terpotong (*overflow*) pada layar terkecil mulai lebar **360 px**.
