# Changelog: Frontend (Tampilan)

Format: `[versi] tanggal` + perubahan, merujuk ID tugas di [`TASK_GUIDE.md`](TASK_GUIDE.md).

## [Belum dirilis]
### Pembersihan Ikon Dekoratif pada Sub-Header & Judul (ModulPinjolIlegalPage.tsx)
- **apps/web/src/components/modul/ModulPinjolIlegalPage.tsx**:
  - Menghapus ikon dekoratif kecil pada sub-header kategori modul:
    - Ikon Timbangan (`Scale`) pada *"Pedoman Komparasi"*.
    - Ikon Peringatan Segitiga (`AlertTriangle`) pada *"Dua Pola Kejadian Nyata"*.
    - Ikon Kilau Bintang (`Sparkles`) pada *"Alat Mandiri"*.
    - Ikon Tanda Tanya (`HelpCircle`) pada *"Latihan Refleks"*.
    - Ikon Salin (`Copy`) pada *"Templat Siap Salin"*.
    - Ikon Ponsel (`Smartphone`) pada *"Simulasi Interaktif"*.
  - Menghapus ikon perisai oranye (`ShieldAlert`) dari judul utama panduan SLIK OJK.
  - Tampilan header setiap seksi kini tampil seragam, rapi, dan bersih.
### Penyeragaman Tombol Izin Akses Ponsel Menjadi Netral Polos (ModulPinjolIlegalPage.tsx)
- **apps/web/src/components/modul/ModulPinjolIlegalPage.tsx**:
  - Mengubah warna tombol pemilih izin akses (*Kontak Telepon, Galeri, SMS, Kamera, Mikrofon, Lokasi*) dari yang sebelumnya berwarna merah/hijau mencolok menjadi tombol netral polos berlatar putih dengan garis tepi abu-abu (*`bg-white text-[#27374D] border-slate-200 hover:bg-slate-50`*).
  - Status aktif tetap ditandai tegas dengan warna navy solid (*`bg-[#27374D] text-white`*).
### Penghapusan Banner Cek 5 Detik Sebelum Bayar QRIS (ModulQrisEwalletPage.tsx)
- **apps/web/src/components/modul/ModulQrisEwalletPage.tsx**:
  - Menghapus banner gelap *"Cek 5 Detik Sebelum Bayar QRIS"* beserta tombol salin tips di Bagian 6 (Intisari & Rujukan Sumber).
  - Bagian intisari kini langsung menyajikan rangkuman perlindungan QRIS & E-Wallet secara bersih dan padat.
### Implementasi Dropdown Interaktif pada Tindakan Kasir (ModulQrisEwalletPage.tsx)
- **apps/web/src/components/modul/ModulQrisEwalletPage.tsx**:
  - Mengubah kotak hijau *"Tindakan Kasir"* pada kedua kartu modus pedagang (*Manipulasi Bukti Transfer* dan *Stiker QRIS Toko Ditimpa Pelaku*) menjadi tombol dropdown/toggle interaktif (*"Tindakan kasir ▾" / "Tutup tindakan kasir ▴"*).
  - Tampilan kartu kini jauh lebih ringkas, hemat ruang, dan sejajar rapi saat pertama kali dibuka.
### Pembersihan Ikon Panah & Badge pada Prinsip Arah Uang (ModulQrisEwalletPage.tsx)
- **apps/web/src/components/modul/ModulQrisEwalletPage.tsx**:
  - Menghapus badge pill *"Wajib PIN"* dan *"Tanpa PIN / OTP"* pada kartu prinsip arah uang.
  - Menghapus ikon panah miring (*ArrowUpRight* dan *ArrowDownRight*) pada header *"Membayar (Uang Keluar)"* dan *"Menerima (Uang Masuk)"*.
  - Menstandarkan ketebalan border dari `border-2` menjadi border halus `border border-rose-200 / border-emerald-200` agar selaras dengan sistem desain modul.
### Pembersihan Angka Laporan Header & Label Nomor Modus Terkait (ModulPolaModusNasionalPage.tsx)
- **apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx**:
  - Menghapus label teks angka laporan di header Bagian 6 (*"1.379 Laporan (s.d. Akhir Juni 2026)"*) dan Bagian 7 (*"25.875 Aduan (1 Jan – 31 Jul 2026)"*).
  - Menghapus label nomor modul (*"MODUL #2"*, *"MODUL #3"*, *"MODUL #1"*) pada kartu navigasi modul terkait di bagian bawah.
  - Memastikan seluruh modul bebas dari teks tanggal *"Terakhir Diperbarui"*.
### Standarisasi Kartu Putih Solid pada Bahaya APK (ModulPolaModusNasionalPage.tsx)
- **apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx**:
  - Mengubah kontainer Bagian 5 (*Teknik Khusus File APK Berbahaya*) dari yang sebelumnya berupa outline stroke transparan (*`border-2 border-red-300 bg-red-50/30`*) menjadi kartu putih solid standar (*`border border-[#9DB2BF]/50 bg-white`*).
  - Menyesuaikan tipografi judul header dengan warna navy standar (*`text-[#27374D]`*) dan subtitle rose tebal, serta memberikan latar lembut yang serasi pada 3 kartu dampak fatal (*`border border-rose-100 bg-rose-50/40`*).
### Penghapusan Kotak Studi Kasus Fiktif pada Kartu Modus Teratas (ModulPolaModusNasionalPage.tsx)
- **apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx**:
  - Menghapus kotak abu-abu *"Studi Kasus"* beserta kutipan cerita fiktif dan poin *"Pelajaran Utama"* pada setiap kartu rincian modus teratas.
  - Kartu modus kini lebih fokus dan ringkas menyajikan anatomi pesan dan kotak hijau *"Cara Berhenti di Titik Ini"*.
### Penghapusan Badge Kategori Modus pada Diagram Batang (ModulPolaModusNasionalPage.tsx)
- **apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx**:
  - Menghapus badge pill kategori (*"Alasan / Cerita Skenario"* dan *"Cara / Teknik Eksekusi"*) di samping nama modus pada visualisasi diagram batang horizontal interaktif.
  - Baris daftar modus kini tampil jauh lebih bersih, rapi, dan judul tidak lagi terhimpit oleh label badge.
### Penghapusan Garis Footer Sumber & Catatan TODO pada Kartu Metrik (ModulPolaModusNasionalPage.tsx)
- **apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx**:
  - Menghapus baris footer (*"Sumber: Satgas PASTI / IASC OJK"* dan *"// TODO: verifikasi manual publikasi resmi"*) pada kedua kartu metrik utama (*Total Laporan Masyarakat* dan *Dana Korban Berhasil Diamankan*).
  - Membersihkan string sisa komentar TODO pada daftar tautan rujukan publik di bagian bawah modul (`ModulPolaModusNasionalPage.tsx` dan `ModulQrisEwalletPage.tsx`).
  - Kartu metrik kini tampil minimalis, fokus pada angka dan deskripsi utama.
### Implementasi Dropdown pada 5 Modus Tambahan & Red Flags Bernuansa (ModulSebelumTransferPage.tsx)
- **apps/web/src/components/modul/ModulSebelumTransferPage.tsx**:
  - Mengubah kotak peringatan merah *"Bahaya"* pada 5 Modus Tambahan (*Bukti Transfer Palsu*, *Ajakan Pindah ke WhatsApp*, *Penipuan COD*, *Trik Kode Unik*, dan *Harga Jauh di Bawah Standar Pasar*) menjadi tombol dropdown interaktif ringkas (*"Bahaya ▾" / "Tutup bahaya ▴"*).
  - Mengubah kotak panduan hijau *"Saran Tindakan"* pada 4 kartu Red Flags Bernuansa (*Nama Pemilik Rekening Berbeda*, *Menolak Rekber*, *Foto Produk Curian*, dan *Menolak Video Call*) menjadi tombol dropdown interaktif ringkas (*"Saran tindakan ▾" / "Tutup saran tindakan ▴"*).
  - Mengurangi ketinggian seluruh kartu secara drastis sehingga tampilan grid menjadi rapi, seimbang, dan hemat ruang.
### Penghapusan Kotak Rem Darurat pada Alur Stepper Transaksi (ModulSebelumTransferPage.tsx)
- **apps/web/src/components/modul/ModulSebelumTransferPage.tsx**:
  - Menghapus kotak panduan hijau *"Rem Darurat"* (`extraDetail`) pada keempat kartu tahapan alur jebakan transaksi (*Alur Jebakan Transaksi (Tekanan → Rekening Asing → Lenyap)*).
  - Setiap kartu alur kini tampil lebih padat, ringkas, dan fokus menyajikan judul serta penjelasan tahapan alur penipuan.
### Penghapusan Titik Indikator dan Kotak Ikon pada Modul 10 Ciri (ModulSepuluhCiriPage.tsx)
- **apps/web/src/components/modul/ModulSepuluhCiriPage.tsx**:
  - Menghapus titik bulat oranye dan merah (*rounded-full bg-amber-500 / bg-rose-500*) pada kartu Aturan Ambang Batas Kewaspadaan (*Tingkat 1* dan *Tingkat 2*).
  - Menghapus kotak ikon kecil (*`p-1 rounded-md bg-slate-50 border border-slate-200`*) di samping judul 10 ciri red flags, sehingga setiap kartu ciri langsung diawali oleh judul tebal (`tr.number. tr.name`) secara bersih dan seragam.
### Penghapusan Subtitle Pelaku & Pelebaran Judul Langkah pada Diagram Spoofing (ModulTeleponBankPage.tsx)
- **apps/web/src/components/modul/ModulTeleponBankPage.tsx**:
  - Menghapus label entitas/pelaku (*"Pelaku di Laptop"*, *"Gateway VoIP / SIP Trunk"*, dan *"Layar Ponsel Korban"*) yang sebelumnya berada di sudut kanan atas header kartu diagram alur Caller ID Spoofing.
  - Judul langkah alur (`st.order. st.label`) kini membentang leluasa memenuhi lebar kartu tanpa terhimpit atau terpotong barisnya (*"judulnya ditarik ke kanan"*).
### Penyesuaian Font Menjadi Plus Jakarta Sans pada Indikator Autentikasi Teknis (ModulEmailPhishingPage.tsx)
- **apps/web/src/components/modul/ModulEmailPhishingPage.tsx**:
  - Mengubah font judul kartu indikator autentikasi teknis (*"SPF (Sender Policy Framework)"*, *"DKIM (DomainKeys Identified Mail)"*, dan *"DMARC"*) dari yang sebelumnya menggunakan font monospace (`font-mono`) menjadi font standar aplikasi **Plus Jakarta Sans** (`font-sans text-xs font-black text-sky-900`) sesuai permintaan pengguna.
### Penghapusan Kotak Badge pada Label Lampiran Bahaya (ModulEmailPhishingPage.tsx)
- **apps/web/src/components/modul/ModulEmailPhishingPage.tsx**:
  - Mengubah label *"Lampiran Bahaya"* pada kotak lampiran email simulasi dari yang sebelumnya menggunakan badge berlatar kotak (*bg-rose-100 px-2 py-0.5 rounded*) menjadi teks tipografi merah bersih tanpa kotak (`text-xs font-bold text-rose-700`).
### Penghapusan Badge Kasus Duplikat pada Modul Email Phishing (ModulEmailPhishingPage.tsx)
- **apps/web/src/components/modul/ModulEmailPhishingPage.tsx**:
  - Menghapus badge pill duplikat *"KASUS A: DISPLAY NAME SPOOFING"* dan *"KASUS B: KARAKTER '@' PADA URL"* pada Bagian 1 Anatomi Pengirim.
  - Kartu kini langsung menyajikan judul utama (`data.twoCasesClarification.caseA.title` dan `caseB.title`) secara bersih tanpa redundansi visual.
### Penghapusan Kotak Badge pada Label Kode Jenis (ModulPerKanalPage.tsx)
- **apps/web/src/components/modul/ModulPerKanalPage.tsx**:
  - Mengubah label badge *"Kode Jenis A"* dan *"Kode Jenis B"* pada perbandingan otentikasi WhatsApp dari yang sebelumnya berupa kotak berlatar belakang (*rounded-md bg-amber-200 / bg-emerald-200*) menjadi teks tipografi bersih dan tebal tanpa kotak (`text-xs font-black uppercase tracking-wider`).
### Penghapusan Teks 'Terakhir Diperbarui' di Seluruh Modul Pembelajaran
- **Standarisasi Bersih pada Seluruh Modul Pembelajaran**:
  - Menghapus label teks tanggal *"Terakhir Diperbarui: YYYY-MM-DD"* di area rujukan sumber literasi dan footer di seluruh 12 modul pembelajaran (`ModulAnatomiPenipuanPage.tsx`, `ModulPerKanalPage.tsx`, `ModulEmailPhishingPage.tsx`, `ModulPolaModusNasionalPage.tsx`, `ModulQrisEwalletPage.tsx`, `ModulSebelumTransferPage.tsx`, `ModulSepuluhCiriPage.tsx`, `ModulTeleponBankPage.tsx`, `ModulRekayasaSosialPage.tsx`, `ModulDampingiKeluargaPage.tsx`, `ModulPusatDaruratPage.tsx`, dan `ModulPinjolIlegalPage.tsx`).
  - Bagian sumber rujukan kini tampil lebih bersih dan rapi hanya menonjolkan judul *"Sumber Rujukan Literasi"* dan daftar referensi resmi.
### Implementasi Dropdown Titik Henti pada Bagian 3 Modul Anatomi Penipuan (ModulAnatomiPenipuanPage.tsx)
- **apps/web/src/components/modul/ModulAnatomiPenipuanPage.tsx**:
  - Mengubah tampilan instruksi titik henti pada kartu langkah variasi alur singkat (*Alur Singkat Lainnya: Tidak Semua Penipuan 5 Fase Penuh*) dari yang sebelumnya kotak hijau statis yang selalu terbuka menjadi tombol dropdown ringkas (*"Titik henti ▾" / "Tutup titik henti ▴"*).
  - Mengurangi tinggi kartu secara signifikan sehingga seluruh daftar variasi langkah tampil rapi, padat, dan tidak memanjang ke bawah.
  - Setiap kartu langkah dapat dibuka dan ditutup (*expand/collapse*) secara mandiri dengan transisi halus.
### Transformasi Sticky Reading Progress Bar Menjadi Sub-Navbar Full-Width Seamless (Edge-to-Edge)
- **apps/web/src/components/Layout.tsx**:
  - Mengubah kontainer `<main>` dari `max-w-7xl mx-auto p-4 sm:p-6 lg:p-7` menjadi `flex-1 w-full pb-24 md:pb-7`. Ini memungkinkan bilah status/sub-navbar di tingkat halaman membentang penuh 100% *edge-to-edge* menyatu langsung di bawah header utama aplikasi tanpa jeda atau pembatas samping.
  - Memindahkan pembungkus konten standar `max-w-7xl mx-auto p-4 sm:p-6 lg:p-7` ke masing-masing halaman utama (`Dashboard.tsx`, `Cek.tsx`, `Lindungi.tsx`, `Sandi.tsx`, `Beranda.tsx`, `Keterbatasan.tsx`, dan hub utama `Belajar.tsx`).
- **apps/web/src/pages/Belajar.tsx**:
  - Saat pengguna membuka modul detail (`activeTab === "modul" && activeModuleId`), halaman langsung merender `ModulPage` secara utuh tanpa membungkusnya dalam kartu hub "Belajar".
  - Hal ini meniadakan jarak/celah kosong abu-abu di atas modul, sehingga sticky reading bar dapat menempel (*flush*) persis di bawah top navbar utama aplikasi (`top-16`).
- **apps/web/src/components/modul/ModulRekayasaSosialPage.tsx & ModulDetailLayout.tsx**:
  - Mengubah sticky progress bar pembacaan dari tampilan kotak terisolasi dengan sela samping (`-mx-4 sm:-mx-6`) menjadi bilah sub-navbar penuh *full-width* (`w-full bg-white/95 backdrop-blur-md border-b border-[#9DB2BF]/40 shadow-xs`) persis seperti top navbar di atasnya.
  - Konten judul modul dan indikator persentase di dalamnya dipusatkan dengan rapi menggunakan `max-w-7xl mx-auto px-4 sm:px-6 lg:px-7`.
  - Seluruh 12 modul pembelajaran kini memiliki sub-navbar pembacaan yang mulus, elegan, dan menyatu penuh dengan tata letak aplikasi.
### Pembersihan Menyeluruh Badge Pill, Label Redundan, dan Badge Nomor di Seluruh Modul
- **Standarisasi Visual Lintas Seluruh Modul Pembelajaran**:
  - **apps/web/src/components/modul/ModulPerKanalPage.tsx**: Menghapus badge pill header seksi (*SOP Darurat*, *Uji Cepat Refleks WhatsApp*), menghapus lingkaran nomor merah `[ 1 ]` pada langkah SOP darurat menjadi judul terformat rapi (`1. Judul`), dan merapikan indikator progres audit tanpa kotak pill.
  - **apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx**: Menghapus seluruh pill badge header seksi (*Refleksi Pengalaman Pribadi*, *Bukan Modus Tersendiri*, *Tren Kejahatan Berbasis AI*, *Penanganan Entitas Keuangan Ilegal*, *Latihan Refleks Cepat*, *SOP Darurat Pelaporan*), menghapus badge pill tingkat bahaya (*Bahaya Kritis / Perlu Waspada*) pada kartu Red Flags, menghapus nomor bulat merah pada SOP darurat, dan mengubah legend grafik menjadi dot indikator bersih.
  - **apps/web/src/components/modul/ModulQrisEwalletPage.tsx**: Menghapus nomor bulat merah pada langkah darurat, menghapus pill header seksi (*Aturan Dasar*, *Simulasi Keputusan Kasir*, *Latihan Refleks Cepat*), dan menyederhanakan indikator progres checklist.
  - **apps/web/src/components/modul/ModulSebelumTransferPage.tsx**: Menghapus pill keparahan pada kartu Red Flags, menghapus pill header seksi (*Simulasi Chat*, *Studi Kasus Fiktif*, *SOP Darurat Korban*, *Uji Refleks Cepat*), menghapus nomor bulat merah dan timeline pill (*Menit 1 - 15*) pada SOP darurat, serta merapikan progres checklist.
  - **apps/web/src/components/modul/ModulSepuluhCiriPage.tsx**: Menghapus kotak nomor urut terpisah dan pill keparahan (*Bahaya Kritis / Perlu Waspada*), menyederhanakan judul trait menjadi format elegan (`1. Nama Ciri`), menghapus header pill kuis capstone, dan merapikan progres checklist.
  - **apps/web/src/components/modul/ModulTeleponBankPage.tsx**: Menghapus badge nomor urut terpisah pada diagram alur spoofing dan mengintegrasikannya langsung ke judul (`1. Judul`), menghapus pill header seksi (*Diagram Alur*, *Aturan Wajib Verifikasi*, *Simulasi Telepon Interaktif*), dan merapikan checklist.
  - **apps/web/src/components/modul/ModulPinjolIlegalPage.tsx**: Menghapus lingkaran nomor A/B pada skenario pola menjadi judul rapi (*Pola A / Pola B*), menyederhanakan lingkaran nomor pada panduan SLIK dan langkah proteksi teror pinjol, serta merapikan persentase checklist.
  - **apps/web/src/components/modul/ModulPusatDaruratPage.tsx**: Menghapus lingkaran nomor terpisah pada instruksi kanal dan 5 langkah SOP universal, serta menghapus pill badge privasi pada generator kronologi.
  - **apps/web/src/components/modul/ModulDampingiKeluargaPage.tsx**: Menghapus lingkaran nomor gelap pada urutan prioritas pengamanan perangkat menjadi judul bersih (`1. Judul`), menghapus badge pill *Tujuan*, dan menyederhanakan indikator checklist.
  - **apps/web/src/components/modul/ModulDetailLayout.tsx**: Merapikan teks bagian pembacaan di top bar tanpa pill kotak berlebih, dan mengubah tombol toggle tandai selesai menjadi tombol sudut melengkung `rounded-xl` yang konsisten.

### Pembersihan Seluruh Badge Pill pada Modul Anatomi Penipuan (ModulAnatomiPenipuanPage.tsx)
- **apps/web/src/components/modul/ModulAnatomiPenipuanPage.tsx**:
  - Menghapus badge pill kesulitan intervensi fase (*"Masih Sangat Mudah Berhenti"*, *"Fase Kritis"*, dst.) pada kartu accordion 5 Fase Alur Penipuan.
  - Menghapus badge pill header seksi (*"Studi Kasus Fiktif Interaktif"*, *"Protokol Darurat"*, dan *"Latihan Refleks Cepat"*).
  - Menghapus badge pill tipe alur (*"Alur Singkat (3 Fase Langsung Eksekusi)"*).
  - Menghapus badge pill tingkat bahaya pada kamus istilah (*"Tingkat Waspada"* / *"Tingkat Bahaya"*).
  - Menghapus badge pill penanda waktu respons darurat (*"Dalam 1 – 2 Jam Pertama (Golden Period)"*).
  - Menghapus badge pill keparahan (*severityLabel*) pada kartu Red Flags indikasi bahaya.
  - Seluruh modul kini tampil bersih, konsisten, elegan, dan bebas dari badge-badge dekoratif yang berlebihan.

### Penghapusan Label Teks Tahap pada Kartu Alur Proses (ModernProcessFlow.tsx)
- **apps/web/src/components/modul/ModernProcessFlow.tsx**:
  - Menghapus label teks duplikat *"TAHAP 1"*, *"TAHAP 2"*, dst. pada kartu deskripsi alur proses desktop dan *"Langkah 01"* pada mobile sesuai instruksi pengguna.
  - Kartu kini langsung menyajikan judul fase/tahapan (`st.title`) secara bersih tanpa redundansi, karena nomor urut langkah (`01`, `02`, dst.) dan ikon visual telah diwakili oleh squircle 3D di bagian atas linimasa.

### Transformasi Bagian Pembedahan Pesan Menjadi Perbandingan Statis Non-Clickable (ModulRekayasaSosialPage.tsx)
- **apps/web/src/components/modul/ModulRekayasaSosialPage.tsx**:
  - Mengubah Bagian 6 (*Pembedahan Pesan: Asli vs Rekayasa Sosial*) dari yang sebelumnya spotter interaktif berkancing klik menjadi **tampilan perbandingan visual statis murni** sesuai instruksi pengguna (*"buat cuman perbedaan gabisa di click"*).
  - Menghapus banner penghitung kejelian (*"Kejelianmu Menemukan Red Flag: 0 dari 4 Terungkap"*), instruksi ketuk teks, dan popover kartu hitam bawah.
  - Mengganti seluruh tombol klik garis putus-putus pada teks pesan palsu (nomor telepon seluler, batas waktu palsu, URL phising, ancaman saldo) menjadi teks penanda berlatar warna netral yang tidak dapat diklik (*non-clickable*).

### Penghapusan Badge Pill Urgensi Waktu pada Langkah Mitigasi (Modul)
- **apps/web/src/components/modul/ModulRekayasaSosialPage.tsx**:
  - Menghapus badge pill urgensi waktu (*misal: "Menit 1 - 15"*, *"Menit 15 - 60"*, dst.) pada Bagian 9 (*Pertolongan Pertama Jika Terlanjur Jadi Korban*) sesuai permintaan pengguna.
  - Kartu langkah mitigasi darurat kini tampil bersih dan rapi hanya menonjolkan nomor urut langkah, judul tindakan, dan deskripsi SOP darurat.
- **apps/web/src/components/modul/ModulPerKanalPage.tsx & ModulPolaModusNasionalPage.tsx**:
  - Menghapus badge urgensi waktu pada kartu langkah mitigasi darurat sehingga seluruh modul memiliki konsistensi visual yang seragam dan elegan.

### Pembersihan Baris Nomor dan Badge Tag pada Kartu Red Flags (ModulRekayasaSosialPage.tsx)
- **apps/web/src/components/modul/ModulRekayasaSosialPage.tsx**:
  - Menghapus baris atas yang memuat kotak nomor urut oranye (`1`, `2`, dst.) dan badge pill tag kategori (*"Psikologi"*, *"Teknis"*, dst.) pada kartu-kartu Bagian 7 (*7 Tanda Kejanggalan / Red Flags*) sesuai permintaan pengguna.
  - Kartu kini tampil bersih dan fokus dengan langsung menonjolkan judul tanda kejanggalan (`rf.label`) dan penjelasannya (`rf.explanation`).

### Penghapusan Badge Pill Tingkat Bahaya pada Alur Modul (ModernProcessFlow.tsx & Modul)
- **apps/web/src/components/modul/ModernProcessFlow.tsx**:
  - Menghapus rendering badge pill tingkat risiko (*"Rendah"*, *"Sedang"*, *"Tinggi"*, *"Kritis"*) dari setiap kartu proses tahapan alur penipuan baik pada tampilan desktop maupun mobile sesuai instruksi pengguna.
  - Kartu tahapan kini tampil bersih, modern, dan fokus hanya menampilkan nomor urut tahapan (`TAHAP 1`, `TAHAP 2`, dst.), judul, subjudul, dan isi deskripsi.
- **apps/web/src/components/modul/ModulRekayasaSosialPage.tsx**:
  - Menghapus penerusan properti `badge: step.dangerLevel` pada Bagian 5 (4 Tahap Alur Terjadinya Penipuan).
- **apps/web/src/components/modul/ModulAnatomiPenipuanPage.tsx**:
  - Menghapus properti `badge: phase.difficultyLabel` pada alur 5 fase penipuan serta menghapus pill badge intervensi di header dan pill tingkat bahaya pada kartu kamus istilah.

### Penyederhanaan Indikator Nomor Soal Kuis Kilat (Belajar.tsx)
- **apps/web/src/pages/Belajar.tsx**:
  - Menghapus ikon logo list (`ListChecks`), tombol scroll mini chevron (`<` dan `>`), garis pemisah vertikal, serta bingkai kotak pembungkus (*square / pill container*) pada bilah atas sesi kuis kilat (`KilatPage`) sesuai instruksi pengguna.
  - Indikator kini tampil bersih dan minimalis sebagai teks biasa: `Soal 1 / 10`, menjaga estetika header tetap rapi dan tidak terdistraksi kontrol ganda karena navigasi soal utama sudah tersedia di bawah kartu pertanyaan.

### Transformasi Cara Verifikasi Menjadi Pop-up Modal Interaktif (Cek.tsx)
- **apps/web/src/pages/Cek.tsx**:
  - Mengubah tampilan panduan *"Cara Verifikasi"* pada kartu temuan tanda peringatan analisis dari yang sebelumnya berformat *collapsible accordion* (yang mendorong kartu di baris bawahnya ke bawah) menjadi dialog **Pop-up Modal** terisolasi.
  - Kartu-kartu temuan peringatan pada *grid 2 kolom* kini memiliki tinggi konsisten (`items-stretch` dengan tata letak flex) tanpa saling dorong atau mengubah posisi layout saat tombol ditekan.
  - Dialog modal dilengkapi:
    - *Backdrop overlay* dengan efek *blur* halus (`backdrop-blur-xs`).
    - Ikon perisai verifikasi mandiri, kategori temuan, dan rangkuman indikasi kejanggalan.
    - Kotak panduan verifikasi mandiri beraksen hijau emerald dengan ikon centang tebal.
    - Tombol tutup (`X` dan *"Mengerti, Tutup"*) serta penanganan penutupan via tombol `Escape` dan klik di luar area modal.

### Penghapusan Badge Tingkat Risiko pada Kartu Izin Aplikasi (Cek.tsx)
- **apps/web/src/pages/Cek.tsx**:
  - Menghapus badge pill tingkat risiko (*"Sedang"*, *"Tinggi"*, *"Kritis"*) dari daftar kartu pilihan izin aplikasi Android pada tab *Berkas* di halaman Cek Pesan & File sesuai permintaan pengguna.
  - Kartu izin aplikasi kini tampil bersih dan netral hanya menampilkan nama izin dan nama teknis tanpa menghakimi atau membocorkan analisis risiko sebelum tombol *"Periksa Berkas"* ditekan.

### Penyesuaian Logo dan Header Brand Sidebar Menjadi Non-Clickable (Layout.tsx)
- **apps/web/src/components/Layout.tsx**:
  - Mengubah tautan logo brand *JagaRuang* pada bagian atas sidebar (`<NavLink to="/">`) menjadi elemen tampilan pajangan murni (`<div>` dengan `cursor-default` & `select-none`) agar tidak dapat diklik sesuai instruksi pengguna.
  - Mengecilkan ukuran logo putih dari `h-9 w-9` menjadi `h-7 w-7` agar lebih proporsional, rapi, dan seimbang dengan teks *JagaRuang Guardians of Digital*.
  - Menyesuaikan juga logo pada bilah atas mobile menjadi elemen pajangan non-clickable.

### Penghapusan Karakter Titik pada Logo Brand Landing Page (Layout.tsx)
- **apps/web/src/components/Layout.tsx**:
  - Menghapus karakter titik (`.`) berwarna `#526D82` di samping teks logo brand *JagaRuang* pada navigasi bilah atas landing page sesuai permintaan pengguna, sehingga nama brand tampil bersih menjadi *"JagaRuang"*.

### Penghapusan Badge Kategori dan Tanggal Pembaruan pada Header Modul
- **apps/web/src/components/modul/ModulDetailLayout.tsx & components/modul/ModulRekayasaSosialPage.tsx**:
  - Menghapus badge kategori (*misal: "Dasar Keamanan"*) dan teks tanggal pembaruan (*misal: "Diperbarui: 7 November 2026"*) pada bagian atas kartu header modul sesuai permintaan pengguna, sehingga judul modul langsung tampil bersih, elegan, dan fokus.

### Implementasi Infografis Alur Tahapan Bergaya Zigzag Modern (ModernProcessFlow.tsx)
- **Komponen Visual Reusable `apps/web/src/components/modul/ModernProcessFlow.tsx`**:
  - Dibuat terinspirasi dari referensi visual infografis proses berjenjang modern (*zigzag process roadmap*):
    - **Tampilan Desktop Alternating Staggered Zigzag**: Nomor langkah (`01`, `02`, `03`, `04`, `05`) bergaya tebal miring modern dengan warna aksen neon/gradien, kartu squircle 3D mengambang dengan pencahayaan ambient glow (*cyan*, *indigo*, *purple*, *pink*, *rose*), dan lintasan garis penghubung zigzag SVG bergradasi.
    - **Tampilan Mobile Vertical Stepped Timeline**: Terurai rapi menjadi linimasa vertikal dengan lintasan gradien di sisi kiri, kartu squircle menyala, nomor langkah, dan teks deskripsi yang responsif di layar kecil.
- **Penerapan Alur Tahapan Baru di Seluruh Modul**:
  - **Modul 1 (m1)**: [`ModulRekayasaSosialPage.tsx`](apps/web/src/components/modul/ModulRekayasaSosialPage.tsx) — Bagian 5 (*4 Tahap Alur Terjadinya Penipuan: Pancingan Awal, Membangun Kepercayaan, Memicu Emosi, Eksploitasi & Pemutusan Jejak*) kini berformat zigzag infografis modern menggantikan 4 kotak datar lama.
  - **Modul 2 (m2)**: [`ModulAnatomiPenipuanPage.tsx`](apps/web/src/components/modul/ModulAnatomiPenipuanPage.tsx) — Bagian 1 (*5 Fase Alur Penipuan & Titik Intervensi*) kini dilengkapi visual roadmap zigzag 5 fase lengkap dengan istilah teknis dan tingkat bahaya.
  - **Modul 7 (m7)**: [`ModulSebelumTransferPage.tsx`](apps/web/src/components/modul/ModulSebelumTransferPage.tsx) — Bagian 1 (*Alur Jebakan Transaksi 4 Fase*) kini menampilkan roadmap visual bertahap dengan integrasi rem darurat di setiap fasenya.
  - **Modul 11 (m11)**: [`ModulPusatDaruratPage.tsx`](apps/web/src/components/modul/ModulPusatDaruratPage.tsx) — Bagian 5 (*4 Tahap Penanganan SOP Otoritas Pasca Lapor*) kini berformat visual infografis transparan.
  - **Modul 12 (m12)**: [`ModulDampingiKeluargaPage.tsx`](apps/web/src/components/modul/ModulDampingiKeluargaPage.tsx) — Bagian 1 (*3 Fase Dinamika Emosi Korban*) kini berformat visual linimasa bertingkat lengkap dengan sikap terbaik dan batasan pendamping.

### Pembersihan Ikon Emoji Informal dan Penyelarasan Sistem Ikon Lucide di Seluruh Modul
- **Pembersihan Emoji Tunjuk Tangan (`👉`) & Emoji Teks Informal**:
  - Menghapus seluruh ikon emoji tunjuk tangan (`👉`) dari modul pembelajaran yang tidak konsisten dengan sistem desain:
    - [`ModulRekayasaSosialPage.tsx`](apps/web/src/components/modul/ModulRekayasaSosialPage.tsx): Menghapus `👉` pada judul pertanyaan keputusan skenario dan mengganti emoji pin `📌` dengan ikon Lucide `<Info />` yang rapi.
    - [`ModulSebelumTransferPage.tsx`](apps/web/src/components/modul/ModulSebelumTransferPage.tsx): Mengganti label `👉 Ketuk untuk periksa tanda bahaya` menjadi badge teks terpadu berikon Lucide `<AlertTriangle />`.
    - [`ModulPolaModusNasionalPage.tsx`](apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx): Mengganti `👉` pada pilihan kuis diagnostik personal dengan ikon `<ChevronRight />`, merapikan badge legenda (`■ Alasan/Cerita` menjadi teks bersih), dan mengganti emoji `💡` / `ℹ️` dengan ikon Lucide `<Lightbulb />` dan `<Info />`.
  - Mengganti emoji informal lainnya (`💡`, `⚠️`, `❌`, `⚖️`, `⏱️`, `📊`, `💚`, `🚨`, `📞`, `🧠`, `📱`) di seluruh komponen modul ([`ModulSepuluhCiriPage.tsx`](apps/web/src/components/modul/ModulSepuluhCiriPage.tsx), [`ModulPinjolIlegalPage.tsx`](apps/web/src/components/modul/ModulPinjolIlegalPage.tsx), [`ModulDampingiKeluargaPage.tsx`](apps/web/src/components/modul/ModulDampingiKeluargaPage.tsx), [`ModulPusatDaruratPage.tsx`](apps/web/src/components/modul/ModulPusatDaruratPage.tsx), [`ModulEmailPhishingPage.tsx`](apps/web/src/components/modul/ModulEmailPhishingPage.tsx), [`ModulQrisEwalletPage.tsx`](apps/web/src/components/modul/ModulQrisEwalletPage.tsx)) dengan komponen ikon SVG Lucide yang konsisten dan elegan.

### Standardisasi Desain dan Tata Letak Seluruh 12 Modul Pembelajaran Meniru Desain Modul 1 (ModulDetailLayout.tsx)
- **Komponen Inti Reusable `apps/web/src/components/modul/ModulDetailLayout.tsx`**:
  - Mengabstraksi seluruh arsitektur visual modul referensi (*Apa Itu Rekayasa Sosial?*) ke dalam komponen pembungkus generik yang konsisten di semua modul:
    - **Bilah Progres Membaca Sticky di Atas**: Indikator bagian aktif (*Bagian X dari Y*), persentase kelulusan membaca (0–100%), dan lintasan bar progres gradien responsif.
    - **Header Modul Standar**: Kategori modul dengan tag status terstandarisasi, tanggal pembaruan resmi, estimasi waktu baca (`X Menit Baca`), tombol cepat tandai selesai baca, judul modul tebal dan rangkuman intisari.
    - **Tata Letak Dua Kolom Responsif (`grid-cols-1 lg:grid-cols-12`)**:
      - Kolom Kiri / Konten (`lg:col-span-8 xl:col-span-9`): Kartu-kartu bagian berdesain seragam (`rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs scroll-mt-32`).
      - Kolom Kanan Desktop Sticky (`lg:col-span-4 xl:col-span-3 sticky top-28`): *Mini Table of Contents* (Daftar Isi) interaktif dengan deteksi posisi scroll otomatis dan pelompat halus (*smooth scroll*) ke masing-masing bagian.
    - **Bilah Aksi Bawah Standar**: Tombol *"Kembali ke Daftar Modul"*, tombol konfirmasi *"Selesai & Catat Progres"*, tombol rekomendasi *"Uji Kasus di Simulator"*, serta Kartu Navigasi Modul Selanjutnya (*Next Module Chaining*) dengan perpindahan SPA tanpa *full reload*.
- **Migrasi dan Refaktorisasi 12 Modul Pembelajaran**:
  - **Modul 1 (m1)**: [`ModulRekayasaSosialPage.tsx`](apps/web/src/components/modul/ModulRekayasaSosialPage.tsx) — Dijadikan acuan desain dan ditambahkan callback `onSelectModule` untuk navigasi langsung ke Modul 2.
  - **Modul 2 (m2)**: [`ModulAnatomiPenipuanPage.tsx`](apps/web/src/components/modul/ModulAnatomiPenipuanPage.tsx) — Dimigrasikan ke 9 seksi terstruktur dengan TOC sticky dan rekomendasi menuju Modul 3.
  - **Modul 3 (m3)**: [`ModulPerKanalPage.tsx`](apps/web/src/components/modul/ModulPerKanalPage.tsx) — Dimigrasikan ke 8 seksi (WhatsApp) dengan checklist interaktif dan rekomendasi menuju Modul 4.
  - **Modul 4 (m4)**: [`ModulEmailPhishingPage.tsx`](apps/web/src/components/modul/ModulEmailPhishingPage.tsx) — Dimigrasikan ke 7 seksi (analisis header, spoofing, simulasi email) dan rekomendasi menuju Modul 5.
  - **Modul 5 (m5)**: [`ModulTeleponBankPage.tsx`](apps/web/src/components/modul/ModulTeleponBankPage.tsx) — Dimigrasikan ke 7 seksi (spoofing caller ID, aturan verifikasi bank, audio simulasi) dan rekomendasi menuju Modul 6.
  - **Modul 6 (m6)**: [`ModulSepuluhCiriPage.tsx`](apps/web/src/components/modul/ModulSepuluhCiriPage.tsx) — Dimigrasikan ke 5 seksi (ambang batas psikologis, 10 kartu ciri, kuis capstone) dan rekomendasi menuju Modul 7.
  - **Modul 7 (m7)**: [`ModulSebelumTransferPage.tsx`](apps/web/src/components/modul/ModulSebelumTransferPage.tsx) — Dimigrasikan ke 10 seksi (alur jebakan rekening, simulasi chat, checklist transfer) dan rekomendasi menuju Modul 8.
  - **Modul 8 (m8)**: [`ModulPolaModusNasionalPage.tsx`](apps/web/src/components/modul/ModulPolaModusNasionalPage.tsx) — Dimigrasikan ke 12 seksi (dasbor metrik nasional PASTI/IASC, kartu modus, bahaya APK) dan rekomendasi menuju Modul 9.
  - **Modul 9 (m9)**: [`ModulQrisEwalletPage.tsx`](apps/web/src/components/modul/ModulQrisEwalletPage.tsx) — Dimigrasikan ke 6 seksi (alur uang QRIS, peran penjual vs pembeli, kuis interaktif) dan rekomendasi menuju Modul 10.
  - **Modul 10 (m10)**: [`ModulPinjolIlegalPage.tsx`](apps/web/src/components/modul/ModulPinjolIlegalPage.tsx) — Dimigrasikan dengan TOC dinamis sesuai tab pencegahan vs penanganan teror kontak dan rekomendasi menuju Modul 11.
  - **Modul 11 (m11)**: [`ModulPusatDaruratPage.tsx`](apps/web/src/components/modul/ModulPusatDaruratPage.tsx) — Dimigrasikan ke 7 seksi (tindakan prioritas, wizard kanal, 5 langkah universal, generator kronologi otomatis) dan rekomendasi menuju Modul 12.
  - **Modul 12 (m12)**: [`ModulDampingiKeluargaPage.tsx`](apps/web/src/components/modul/ModulDampingiKeluargaPage.tsx) — Dimigrasikan ke 6 seksi (3 fase emosi, script respons empati vs menghakimi, prioritas teknis HP, checklist keluarga) dan loop penutup kembali ke Modul 1.
- **apps/web/src/pages/Belajar.tsx**:
  - Menghubungkan *prop* `onSelectModule` di komponen induk `ModulPage` untuk mengalirkan perpindahan modul SPA instan tanpa kedip (*seamless scroll to top* dan update query string browser `?module=<id>`).

### Penyesuaian Dialog & Tampilan Obrolan Skenario Dating App / Love Scam (fiveStepScenarios.ts & FakeChatSimulator.tsx)
- **apps/web/src/mocks/fiveStepScenarios.ts**:
  - Menulis ulang pesan pembuka skenario K5 (*Kenalan Online yang Berujung Investasi Bodong / Pig Butchering*) agar natural untuk dua orang yang baru saja cocok (*match*) di aplikasi kencan:
    - Sapaan pembuka diubah dari *"Hai kamu! Gimana harinya? Sibuk banget ya belakangan ini?"* menjadi *"Hai! Salam kenal yaa, aku Siska 😊 Senang deh akhirnya kita bisa match di sini. Lagi santai atau ada kesibukan nih?"*.
    - Pesan kedua menjelaskan konteks aktivitas santai pelaku sehabis mengecek hasil trading kripto sampingan sebelum mengirim tangkapan layar profit.
    - Ajakan lanjutan diperhalus agar mencerminkan pola psikologis *Pig Butchering* yang realistis (menawarkan ajaran dari awal dengan modal kecil).
    - Menyesuaikan alasan keputusan dan tanggapan attacker pada Keputusan 1 & 2 agar selaras dengan konteks orang yang baru saling kenal.
- **apps/web/src/components/simulator/FakeChatSimulator.tsx**:
  - Mengubah urutan penampilan pesan agar teks penjelasan dikirim terlebih dahulu sebelum gambar bukti portofolio kripto muncul.
  - Menambahkan template bubble chat khusus `isDatingApp` lengkap dengan foto profil asli Siska beraksen gradasi rose/amber (menggantikan lingkaran oranye tanda tanya `?` bawaan WhatsApp) dan kartu lampiran bertema dating app.

### Penghapusan Tombol "Daftar Skenario" pada Tampilan Dating App (FakeChatSimulator.tsx)
- **apps/web/src/components/simulator/FakeChatSimulator.tsx**:
  - Menghapus tombol navigasi internal *"← Daftar Skenario"* di bagian atas overlay layar *"Find a match"* pada skenario Love Scam Dating App sesuai permintaan pengguna.
  - Tampilan layar pembuka dating app kini bersih dan terpusat (*centered*) hanya menampilkan teks *"Find a match"* serta tombol aksi Silang dan Hati, tanpa menduplikasi tombol navigasi skenario yang sudah tersedia di atas bingkai smartphone simulator.

### Penyesuaian Proporsi Ukuran Logo Brand JagaRuang (Layout.tsx & LoginModal.tsx)
- **apps/web/src/components/Layout.tsx & components/LoginModal.tsx**:
  - Mengecilkan ukuran logo dan tipografi nama brand *JagaRuang* pada navigasi bilah atas landing page dari `h-9 w-9` / `text-xl` menjadi `h-7 w-7` / `text-lg font-extrabold` agar terlihat lebih proporsional, rapi, dan seimbang dengan tautan navigasi di sekitarnya.
  - Menyesuaikan juga ukuran logo pada dialog login (`LoginModal.tsx`) dari `h-11 w-11` menjadi `h-8 w-8` yang lebih ringkas dan elegan.

### Pembersihan Tautan "Halaman Depan (Landing)" pada Sidebar dan Profil (Layout.tsx & UserProfileDropdown.tsx)
- **apps/web/src/components/Layout.tsx & components/UserProfileDropdown.tsx**:
  - Menghapus tombol *"Halaman Depan (Landing)"* berikon bola dunia (`Globe`) dari footer bilah sisi (*sidebar*) dan menu tarik-turun profil pengguna sesuai permintaan.
  - Bagian bawah sidebar kini kembali ringkas dan bersih hanya memuat tombol *"Keluar dari Sesi"*.

### Perbaikan Fatal Unhandled Exception Runtime Penyebab Layar Blank (modulPusatDarurat.ts & ModulPusatDaruratPage.tsx)
- **apps/web/src/data/modulPusatDarurat.ts, components/modul/ModulPusatDaruratPage.tsx, data/modulPolaModusNasional.ts**:
  - Memperbaiki string catatan realistis di `modulPusatDarurat.ts` yang sebelumnya secara tidak sengaja memuat frasa terlarang *"pembekuan permanen"* pada teks edukasi penolakan.
  - Frasa tersebut memicu `validatePusatDaruratData()` melempar *fatal unhandled exception* di level impor modul teratas (`validatePusatDaruratData()` di `ModulPusatDaruratPage.tsx`), yang seketika menghentikan inisialisasi React dan membuat seluruh aplikasi menjadi layar kosong (*blank*).
  - Mengubah kalimat edukasi menjadi istilah perbankan resmi tanpa frasa terlarang dan membungkus pemanggilan validasi dalam blok `try...catch` aman agar tidak pernah menghentikan proses rendering aplikasi.

### Penetapan Landing Page Sebagai Direktori Awal Aplikasi dan Pemisahan Rute Dashboard (App.tsx & Layout.tsx)
- **apps/web/src/App.tsx, pages/Beranda.tsx, pages/Dashboard.tsx, components/Layout.tsx**:
  - Mengubah rute awal direktori `/` (root) agar **selalu menyajikan Landing Page** publik (Three.js 3D smartphone canvas, capaian metrik, tiga pilar utama, pilihan studi kasus populer, FAQ accordion, dan banner CTA), bukan langsung membuka dashboard utama saat diakses.
  - Memisahkan halaman Dashboard Utama ke rute terproteksi mandiri di `/dashboard` (`pages/Dashboard.tsx`):
    - Pengguna yang masuk ke direktori awal `/` akan selalu melihat Landing Page.
    - Jika pengguna sudah login, bilah atas Landing Page dan tombol hero secara dinamis menampilkan tombol *"Buka Dashboard"* (`/dashboard`) dan ucapan selamat datang.
    - Jika pengguna belum login, tombol *"Login"*, *"Register"*, dan *"Mulai Sekarang"* memunculkan modal autentikasi lokal.
  - Memperbarui navigasi menu sidebar dan bilah bawah mobile (`NAV_ITEMS`) di `Layout.tsx` agar menu *"Dashboard"* mengarah tepat ke `/dashboard`.
  - Menambahkan tautan *"Halaman Depan (Landing)"* pada footer sidebar dan dropdown profil pengguna (`UserProfileDropdown.tsx`) agar pengguna dapat kembali ke halaman depan publik kapan pun dengan mudah.
  - Menyesuaikan alur `LoginModal.tsx` agar mengarahkan pengguna secara mulus ke `/dashboard` begitu proses login berhasil saat berada di Landing Page.

### Penyatuan Halaman Detail Kamus Menjadi 1 Section Utuh Tanpa Pembagian Kotak Terpisah (Belajar.tsx)
- **apps/web/src/pages/Belajar.tsx**:
  - Menggabungkan seluruh konten halaman detail istilah kamus penipuan (`KamusPage`) ke dalam **1 wadah section tunggal** (`<article className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-10 lg:p-12 shadow-xs space-y-8 sm:space-y-10">`) dan menghapus pembagian kotak-kotak kartu terpisah yang sebelumnya terpecah menjadi 5 elemen mengambang:
    - **Baris Atas**:
      - Sisi Kiri: Menampilkan judul istilah font besar (`text-3xl sm:text-4xl lg:text-5xl font-black`), watermark monogram huruf awal, lencana kategori, dan paragraf ringkasan definisi istilah secara menyatu.
      - Sisi Kanan: Menampilkan rincian *"Cara Kerja & Titik Masuk"* dengan tipografi rapi, pembatas vertikal halus (`lg:border-l lg:border-slate-100 lg:pl-10`), dan badge *"Alur Modus"* tanpa kotak kartu pembungkus tersendiri.
    - **Baris Bawah**:
      - Sisi Kiri: Menampilkan *"Pertolongan Pertama Terpapar"* dengan header aksen merah lembut, ikon `OctagonAlert`, dan callout waktu mitigasi 15 menit.
      - Sisi Kanan: Menampilkan *"Langkah Pencegahan Utama"* dengan header aksen hijau lembut, ikon `ShieldCheck`, dan pembatas vertikal halus (`lg:border-l lg:border-slate-100 lg:pl-10`).
    - **Action Footer**: Tombol navigasi (*"Kembali ke Daftar Kamus"*, *"Uji Cek Pesan & Berkas"*, dan *"Latihan di Simulator"*) kini terintegrasi langsung di bagian bawah section dengan garis pembatas halus (`border-t border-[#DDE6ED]`).
    - Hasil visual bersih, lapang, kohesif, dan mudah dibaca baik di layar ponsel maupun desktop.

### Revisi Menyeluruh Modul Edukasi "Apa Itu Rekayasa Sosial?" (Belajar.tsx & ModulRekayasaSosialPage.tsx)
- **apps/web/src/data/modulRekayasaSosial.ts & components/modul/ModulRekayasaSosialPage.tsx**:
  - Merevisi total modul `m1` (*"Apa Itu Rekayasa Sosial?"*) dari teks statis menjadi modul pembelajaran interaktif berbobot 5-6 menit baca dengan gaya percakapan yang ramah (*"kamu"*):
    - **Pemisahan Data Konten**: Seluruh teks, skenario, data kuis, dan referensi dipisahkan ke file data mandiri `modulRekayasaSosial.ts` dengan metadata `terakhirDiperbarui` dan anotasi `// TODO: verifikasi manual` untuk nomor kontak & URL resmi.
    - **Hook Skenario Pembuka**: Menghadirkan simulasi pesan SMS ancaman rekening diblokir dalam 1 jam dengan 3 opsi keputusan interaktif dan umpan balik langsung.
    - **Prinsip Psikologis & Ragam Modus**: Akordion interaktif 5 prinsip psikologis manusia (Otoritas, Urgensi, Rasa Takut, Iming-iming, Rasa Percaya) serta 6 ragam modus rekayasa sosial di Indonesia (Phishing, Smishing, Vishing, Pretexting, Baiting APK, Impersonation).
    - **Timeline Visual 4 Tahap**: Diagram alur tahapan penipuan dari Pancingan Awal hingga Eksploitasi & Pemutusan Jejak dengan indikator tingkat bahaya.
    - **Spotter Red Flag Pesan Asli vs Palsu**: Komparasi visual berdampingan antara pesan resmi bank dan pesan penipu, dilengkapi area red flag yang dapat diklik untuk membuka penjelasan popover dan penghitung kejelian (*"X dari 4 Terungkap"*).
    - **Checklist Perlindungan Berlandaskan Alasan**: 4 butir tindakan mandiri dengan label rekomendasi praktis/kewajiban mutlak, animasi centang, dan penyimpanan status lokal (`localStorage`).
    - **Alur Mitigasi Darurat 5 Langkah**: Panduan pertolongan pertama berurutan jika terlanjur menjadi korban (Blokir bank, ganti kredensial, putuskan akses/mode pesawat, simpan bukti, lapor kanal resmi).
    - **Mini Kuis 4 Soal**: Kuis evaluasi pemahaman dengan penilaian skor instan dan penghargaan lencana ringan *"Penjaga Anti-OTP"*.
    - **UI/UX & Aksesibilitas**: Dilengkapi *Sticky Reading Progress Bar* tipis dengan persentase di atas, *Sticky Mini Table of Contents* di sisi kanan desktop untuk navigasi cepat, dan integrasi tombol aksi berurutan (*Uji Kasus di Simulator*, *Selesai & Catat Progres*, serta kartu modul berikutnya).

### Penghapusan Navigasi "Daftar Skenario" pada Layar Marketplace (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Menghapus tombol navigasi internal `<- Daftar Skenario` di bilah paling atas layar katalog Facebook Marketplace.
  - Tampilan layar katalog Facebook Marketplace kini langsung dibuka dengan header judul asli *"Marketplace"* dan ikon Messenger, Profil, serta Pencarian secara otentik menyerupai aplikasi Facebook ponsel sesungguhnya, tanpa elemen navigasi internal yang tumpang-tindih dengan navigasi halaman utama.

### Pembaruan Foto Produk iPhone 14 Pro pada Marketplace Simulator (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Memperbarui aset foto produk untuk pilihan gadget *iPhone 14 Pro 128GB Deep Purple* (`/simulator/marketplace/iphone-14-pro.jpg`) menggunakan foto presisi berkualitas tinggi yang dikirimkan oleh pengguna.
  - Foto tersebut kini otomatis tampil pada kartu katalog pilihan produk Facebook Marketplace dan pratinjau pesan di ruang obrolan obrolan Messenger saat pengguna memilih varian iPhone 14 Pro.

### Penyederhanaan Pesan & Kotak Peringatan Sistem Ruang Obrolan (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Menyederhanakan teks pesan peringatan sistem pembuka yang sebelumnya berbelit-belit dan kaku:
    - Skenario FB Marketplace: Dari *"Saluran komunikasi: Facebook Marketplace & Messenger • Mega Promo Gadget Murah Store. Waspadai ajakan transaksi atau transfer langsung di luar rekening bersama resmi."* menjadi kalimat ringkas satu baris: *"Waspadai transaksi langsung di luar rekening bersama resmi."*.
    - Skenario Lainnya: Disederhanakan menjadi pesan keamanan langsung tanpa prefiks formal "Saluran komunikasi: ...".
  - Mengubah desain kotak pembungkus pesan sistem menjadi bentuk kapsul membulat ramping (`rounded-full px-3.5 py-1`) dengan penataan sejajar ikon gembok kecil dalam satu baris horizontal rapi, menghindari tampilan kotak tebal multi-baris yang canggung.

### Pembersihan Bilah Marketplace & Tombol Ganti Barang pada Chat Simulator FB (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Menghapus tombol navigasi biru `<- Marketplace` pada bilah header percakapan Facebook Messenger skenario K8.
  - Menghapus bar atas *"Iklan Facebook Marketplace"* beserta tombol *"Ganti Pilihan Barang"* pada banner preview produk yang disematkan di bagian atas ruang obrolan.
  - Tampilan kartu produk yang sedang ditanyakan kini tampil ringkas, bersih, dan fokus menyajikan foto HP, nama produk, potongan harga, serta spesifikasi tanpa tombol navigasi yang berulang.

### Integrasi Gambar Cover Asli Simulator pada Kartu Modul Beranda (Beranda.tsx)
- **Beranda.tsx**:
  - Mengganti kotak placeholder abu-abu polos dan ikon kecil pada 3 kartu pilihan studi kasus beranda (*"Modul Simulasi Populer"*) dengan gambar cover asli dari masing-masing skenario simulator interaktif:
    - Skenario 1 (*Undangan APK Palsu*): Menggunakan gambar cover asli `/simulator/covers/undangan-digital.jpg` dengan lencana kanal `WhatsApp`.
    - Skenario 2 (*Kurir Paket & Foto Resi*): Menggunakan gambar cover asli `/simulator/covers/paket.jpg` dengan lencana kanal `WhatsApp`.
    - Skenario 3 (*Loker WFH & Deposit*): Menggunakan gambar cover asli `/simulator/covers/work-from-home.jpg` dengan lencana kanal `Media Sosial`.
  - Mengoptimalkan wadah rasio gambar kartu menjadi `aspect-[16/10]` dengan sudut melengkung `rounded-2xl`, efek transisi perbesaran halus (*hover zoom* `scale-105`), dan lencana kanal mengambang semi-transparan berlatar *backdrop-blur* selaras dengan desain kartu cover simulator di halaman Belajar.

### Penghapusan Bagian Suara Komunitas & Navigasi Cerita Rekan (Beranda.tsx & Layout.tsx)
- **Beranda.tsx & Layout.tsx**:
  - Menghapus seksi testimonial *"Suara Komunitas — Dipercaya Rekan Muda Indonesia"* beserta ketiga kartu ulasan testimoni pengguna di [`Beranda.tsx`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/src/pages/Beranda.tsx).
  - Menghapus tautan menu *"Cerita Rekan"* (`href="#testimoni"`) pada bilah navigasi header di [`Layout.tsx`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/src/components/Layout.tsx) agar susunan navigasi tetap bersih dan sinkron dengan konten halaman beranda.

### Pembaruan Tampilan Dropdown AI Notification Center Sesuai Referensi Desain (NotificationDropdown.tsx)
- **NotificationDropdown.tsx & notificationService.ts**:
  - Mengubah desain kartu popover notifikasi agar persis mengikuti referensi desain modern **AI Notification Center**:
    - **Header & Aksi**: Menampilkan judul `AI Notification Center` dengan tombol `See All` bergaris tepi halus untuk menandai semua notifikasi telah dibaca.
    - **Segmented Tab Pill**: Menambahkan kontrol tab segmentasi (`Today` | `This Week` | `Earlier`) dalam wadah pil abu-abu muda lembut (`bg-slate-100/80 p-1 rounded-xl`) dengan tombol aktif berlatar putih timbul (`bg-white shadow-xs font-bold`).
    - **Lingkaran Ikon Garis Halus**: Ikon bundar bergaris tepi halus (`w-10 h-10 rounded-full border border-slate-200/90 bg-white`) dengan ikon representatif (`Lightbulb` bohlam, `TrendingUp` grafik tren, `Wrench` kunci pas, dan `ShieldAlert` perisai).
    - **Titik Indikator Ungu/Indigo**: Menyematkan titik bulat ungu (`bg-purple-500`) tepat di samping judul notifikasi sesuai estetika antarmuka AI pada referensi.
    - **Tipografi Data & Metrik Tebal**: Pemformat pesan otomatis mencetak tebal (*bold*) angka metrik, persentase (seperti `27%`, `99.4%`), kuantitas (`10,000+`), dan waktu (`2:00 AM UTC`) untuk hierarki baca yang profesional dan meyakinkan.

### Isolasi Tinggi Kartu Akordion pada Grid (Cek.tsx & Belajar.tsx)
- **Cek.tsx & Belajar.tsx**:
  - Memperbaiki perilaku perataan grid pada kartu-kartu akordion yang dapat dibuka-tutup (*collapsible*):
    - Pada bagian **"Tanda Peringatan Ditemukan"** ([`Cek.tsx`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/src/pages/Cek.tsx)): Menambahkan `items-start` pada container grid 2 kolom dan menetapkan tinggi kartu alami (`h-fit`). Ketika salah satu kartu dibuka tombol *"Cara verifikasi"*-nya, kartu di sebelahnya tetap mempertahankan tinggi aslinya yang ringkas tanpa ikut tertarik molor (*stretch*) atau menyisakan ruang kosong putih yang canggung.
    - Pada bagian **"Ulasan Detail Refleks Keputusanmu"** ([`Belajar.tsx`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/src/pages/Belajar.tsx)): Menambahkan `items-start` dan `h-fit` pada grid 10 soal evaluasi latihan kilat. Saat salah satu soal dibuka penjelasannya, kartu soal di sampingnya tetap tertutup rapi dan tidak lagi meregang mengikuti tinggi soal yang terbuka.

### Pengacakan Posisi Opsi Pilihan Jawaban pada Semua Simulator (FakeChatSimulator.tsx & PhoneCallSimulator.tsx)
- **FakeChatSimulator.tsx & PhoneCallSimulator.tsx**:
  - Mengimplementasikan pengacakan posisi (*Fisher-Yates shuffle*) pada opsi pilihan jawaban interaktif (baik skenario dengan 3 pilihan maupun 2 pilihan) sehingga posisi jawaban aman, ragu-ragu, dan berisiko tampil acak di setiap langkah keputusan dan sesi simulasi.
  - Menghilangkan pola tebakan posisi (seperti pola lama di mana opsi ke-3 selalu aman dan opsi ke-1 selalu berisiko/salah), sehingga peserta simulasi dituntut membaca dan menganalisis konteks pesan secara kritis.
  - Label huruf tampilan (A, B, C) tetap disajikan secara urut dan rapi dari atas ke bawah untuk kenyamanan navigasi, sementara pemetaan aksi di belakang layar terhubung ke data opsi yang telah diacak secara dinamis.
  - Evaluasi tingkat risiko pada simulasi chat kini murni didasarkan pada atribut tipe opsi (`selectedOption.type === "risky"`) bukan indeks huruf statis.
  - Tombol pintasan refleks aman pada simulator panggilan suara (tombol tutup telepon merah) kini secara dinamis mencari dan mengeksekusi opsi bertipe aman (`type === "safe"`).

### Pembersihan Ikon Sparkle & Badge pada Banner Match Dating App K5 (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Menghapus ikon kilau kuning (*Sparkles*) di samping teks judul *"Kalian Berdua Saling Cocok!"*.
  - Menghapus kedua lencana badge (*"Dating App Verified"* dan *"98% Kecocokan"*) pada banner kartu ucapan kecocokan Dating App di ruang obrolan, sehingga tampilan kartu awal chat tampil bersih dan minimalis.

### Penataan Ulang Tata Letak Halaman Detail Istilah Kamus 1/3 Kiri & 2/3 Kanan (Belajar.tsx)
- **Belajar.tsx**:
  - Mengubah struktur halaman detail istilah (`KamusPage`) menjadi tata letak proporsional terpadu **1/3 bagian kiri** dan **2/3 bagian kanan**:
    - **Sisi Kiri (Skala 1/3 — `lg:col-span-4`)**: Menampilkan judul istilah dengan ukuran font besar (`text-3xl sm:text-4xl lg:text-5xl font-black`), watermark monogram huruf kapital di belakangnya, dan efek sticky pada desktop agar tetap terlihat saat membaca konten.
    - **Sisi Kanan (Skala 2/3 — `lg:col-span-8`)**: Diisi langsung dengan teks definisi istilah di bagian atas, kemudian disusul oleh 4 uraian modus (Tahapan Cara Kerja Modus, Titik Masuk Utama / Entry Point, Pertolongan Pertama Jika Terlanjur Terpapar, dan Langkah Pencegahan Utama) yang disajikan sebagai **teks murni (*only text*)** tanpa kotak kontainer pembungkus (*border* dan *background* kartu telah dihilangkan) agar tampilan lebih bersih, leluasa, dan nyaman dibaca.

### Pembersihan Badge Kategori pada Kamus Istilah (Belajar.tsx)
- **Belajar.tsx**:
  - Menghapus badge pill kategori (seperti *"Malware Android"*, *"Manipulasi Sosial"*, dll.) pada kartu kamus istilah serta pada bagian tajuk hero halaman detail istilah (`KamusPage`), sehingga judul istilah tampil bersih, besar, dan fokus tanpa elemen dekoratif berlebih.

### Integrasi Foto Asli Listing Produk Smartphone Facebook Marketplace K8 (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx & Asset Simulator**:
  - Mengekstrak dan mengintegrasikan 6 foto smartphone asli dari arsip `foto hp.zip` ke dalam direktori publik [`apps/web/public/simulator/marketplace/`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/public/simulator/marketplace):
    - `iphone-15-promax.jpg` (iPhone 15 Pro Max 256GB)
    - `samsung-s24-ultra.jpg` (Samsung Galaxy S24 Ultra 512GB)
    - `xiaomi-14-ultra.jpg` (Xiaomi 14 Ultra Leica)
    - `iphone-14-pro.jpg` (iPhone 14 Pro 128GB)
    - `google-pixel-8-pro.jpg` (Google Pixel 8 Pro 256GB)
    - `ipad-air-5.jpg` (iPad Air 5 M1)
  - Menggantikan kotak mockup CSS gradien lama dengan tag gambar (`<img>`) beresolusi tajam dan rasio persegi (`aspect-square object-cover`) pada grid 3 kolom katalog FB Marketplace.
  - Menghubungkan foto produk yang dipilih langsung ke kartu cuplikan iklan di bagian atas layar Facebook Messenger.
  - **Sinkronisasi Foto Unit Obrolan Realistis**: Mengganti brosur promo generik (`k8-flash-sale.svg`) di ruang obrolan Messenger dengan foto unit HP asli yang diklik pengguna (misal: jika pengguna mengklik iPhone 15 Pro Max di katalog, maka penjual mengirimkan foto fisik unit iPhone 15 Pro Max lengkap dengan nama file `Foto_iPhone_15_Pro_Max_Segel.jpg`, teks animasi mengetik dinamis, dan fitur perbesar foto lightbox).

### Simulasi Marketplace Model Facebook & Transisi ke Facebook Messenger Khusus K8 (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Mengimplementasikan pengalaman interaktif **Facebook Marketplace Feed** untuk skenario toko online fiktif (K8):
    - **Layar Katalog Facebook Marketplace**:
      - Bilah pencarian khas Facebook Marketplace lengkap dengan ikon toko (*Store*), kolom cari produk, dan tombol kembali ke daftar skenario. Menghapus lencana *"Mode Investigasi Toko Fiktif"* agar tampilan bersih otentik.
      - Bilah filter kategori cepat (*"Semua Ponsel"*, *"Harga Terendah"*, *"Cuci Gudang"*, *"Garansi Resmi"*) serta indikator lokasi radius 10 km.
      - Menampilkan grid **3 kolom (3 dan 3 barang)** kartu produk *smartphone/gadget* dengan harga murah fiktif (iPhone 15 Pro Max Rp3.500.000, Samsung Galaxy S24 Ultra Rp4.200.000, Xiaomi 14 Ultra Rp2.900.000, iPhone 14 Pro Rp2.800.000, Google Pixel 8 Pro Rp3.100.000, dan iPad Air 5 Rp3.800.000). Bebas dari produk mobil/otomotif sesuai preferensi pengguna.
      - Desain visual kartu produk menyerupai listing nyata di Facebook Marketplace dengan mockup smartphone modern, badge promo warna-warni (*"Promo 80%"*, *"Flash Sale"*), ikon bookmark hati, harga coret, serta tombol *"Kirim Pesan"*.
    - **Transisi Mulus ke Facebook Messenger ("Message FB")**:
      - Ketika pengguna mengetuk/klik salah satu produk murah, simulator langsung bertransisi ke tampilan percakapan Facebook Messenger bersama seller *Mega Promo Gadget Murah Store*.
      - Pesan pertanyaan pembuka otomatis dikirimkan oleh pengguna (*"Halo, apakah [nama produk] ini masih ada?"*) dan direspons cepat oleh penjual fiktif yang mendesak transfer langsung ke rekening pribadi.
    - **Desain Antarmuka Facebook Messenger Otentik**:
      - Header khas Messenger berwarna putih dengan aksen biru Messenger (`#0084FF`), avatar toko dengan verifikasi toko terpercaya, status *"Aktif sekarang • Di Facebook Marketplace"*, serta tombol *"Pilihan Barang"* untuk kembali menelusuri katalog Marketplace kapan saja.
      - Cuplikan kartu banner produk Marketplace tersemat di bagian paling atas riwayat obrolan menampilkan thumbnail produk, harga promo, harga coret normal, dan spesifikasi barang.
      - Balon pesan pengguna di sisi kanan berwarna biru khas Messenger (`bg-[#0084FF] text-white`) lengkap dengan ikon centang terbaca.
      - Balon pesan penjual di sisi kiri berwarna abu-abu khas Messenger (`bg-[#F0F2F5] text-slate-900`) didampingi mini avatar toko.
      - Bilah input palsu khas Facebook Messenger di atas dock keputusan dilengkapi tombol jempol biru Messenger (*Thumbs Up* `#0084FF`), ikon kamera, foto, dan mikrofon.
      - Tombol keputusan di dock bawah menggunakan gaya aksen biru Messenger saat disorot/hover.

### Layar Interaktif "Find a match" Khusus Simulator Dating App K5 (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Menyederhanakan tampilan awal *"Find a match"* pada simulator Dating App (K5):
    - Mengubah tampilan menjadi **polosan dan bersih**: menghapus foto profil, nama pengirim, lencana bio, dan tag minat sesuai permintaan.
    - Menampilkan teks minimalis dan tebal **"Find a match"** di tengah layar dengan latar belakang gelap elegan (*deep dark gradient*).
    - Menempatkan dua tombol aksi utama: Tombol Silang (`X`) yang tidak berfungsi dan Tombol Hati Hijau (`Love`) yang berfungsi untuk langsung membuka ruang obrolan *fake chat*.
  - Mengimplementasikan alur interaktif awal pra-chat khusus untuk skenario **Aplikasi Dating** (K5 — Siska / Modus Pig Butchering) sesuai referensi antarmuka pengguna:
    - **Header & Kartu Profil "Find a match"**:
      - Menampilkan bilah navigasi dengan logo api gradien (*Flame*) bertuliskan *"Find a match"* dan status koneksi online.
      - Menampilkan kartu profil geser (*swipe card*) Siska (24 tahun, terverifikasi centang biru, jarak 2 km, minat Kripto & Traveling, bio memikat, serta foto profil asli `/simulator/covers/dating-apps.jpg`).
    - **Mekanisme Interaksi Tombol Silang vs Love**:
      - **Tombol Silang (X / Pass)**: Didesain **tidak berfungsi untuk melanjutkan**. Saat diklik, tombol dan kartu memicu animasi getar halus (*shake*) dan menampilkan *tooltip* peringatan bahwa pengguna harus menerima kecocokan (*match*) untuk memulai skenario investigasi.
      - **Tombol Love (Green Heart / Match)**: Didesain meniru persis gambar referensi (tombol lingkaran gradien hijau zamrud berpendar). Saat diklik, sistem memutar audio synthesizer chord kemenangan (*Web Audio API*), menampilkan modal perayaan selebrasi *"IT'S A MATCH! 🎉"*, dan langsung membuka ruang obrolan *fake chat* bersama Siska.
    - **Adaptasi Tema Obrolan Khas Dating App**:
      - Bilah header obrolan kini memiliki identitas khas Dating App (cincin avatar gradien rose-amber, status *"Baru saja cocok hari ini"*, dan tombol pintasan *"Kartu Match"*).
      - Menampilkan kartu ucapan kecocokan di bagian teratas obrolan (*"Kalian Berdua Saling Cocok!"*).
      - Menambahkan bilah input visual kencan palsu (*"Kirim pesan ke Siska..."* dengan ikon hati dan kirim).

### Kontrol Keputusan Pengguna Tanpa Auto-Restart atau Timer Otomatis pada Simulasi Selesai (PhoneCallSimulator.tsx & FakeChatSimulator.tsx)
- **PhoneCallSimulator.tsx**:
  - Menghapus ikon kilau kuning (*Sparkles*) dan teks pendukung *"Pilih jawaban atau tekan Tutup Telepon"* pada bagian judul *Tentukan Respons Bicaramu*.
  - Menghapus ikon speaker (*Volume2*) dan titik peluru bulat merah muda pada daftar transkripsi suara dialog penelpon sehingga transkripsi teks tampil bersih dan elegan.
  - Menghapus teks instruksi bawah *"Panggilan selesai. Ketuk tombol di atas untuk melihat evaluasi skenario."* di bawah tombol *"Lanjutkan ke Ringkasan Skenario"*.
  - Menghapus seluruh ikon kecil visual yang mengganggu pada kotak ringkasan respons di layar panggilan berakhir (`callPhase === "ended"`): menghapus ikon `🗣️` dari *"Respons Kamu:"* dan ikon `📞` dari *"Reaksi Penelpon:"*.
  - Menghapus ikon gembok kecil (`Lock`) pada lencana *"Kanal Suara Aman (HD)"* di bilah atas antarmuka telepon.
  - Menghapus seluruh timer otomatis (`setTimeout` 1600ms & 2000ms) yang sebelumnya langsung menutup paksa layar panggilan suara (`onDeclineCall` / `onCompleteCall`) tanpa persetujuan pengguna.
  - Menghapus teks berdenyut otomatis (*"Menutup tampilan telepon & kembali ke ringkasan obrolan..."*).
  - Menyediakan tombol aksi interaktif eksplisit: **"Lanjutkan ke Ringkasan Skenario"** di layar panggilan berakhir (`callPhase === "ended"`). Pengguna kini memegang kendali penuh untuk membaca ulasan respons dan reaksi penelpon secara tenang, dan simulasi baru akan melanjutkan ke tahapan berikutnya saat tombol tersebut ditekan.
- **FakeChatSimulator.tsx**:
  - Memastikan seluruh skenario simulasi yang telah mencapai hasil evaluasi akhir (*scenario endings*) tetap menetap di layar ringkasan skor dan tidak pernah melakukan pengulangan otomatis (*auto-restart* / *auto-loop*). Pengulangan hanya terjadi secara eksplisit jika pengguna menekan tombol *"Ulangi Kasus"* atau *"Kembali ke Daftar Kasus"*.

### Antarmuka & Tata Letak Dinamis Khas Instagram Direct Message & Konsistensi Font Plus Jakarta Sans (FakeChatSimulator.tsx & PhoneCallSimulator.tsx)
- **FakeChatSimulator.tsx & PhoneCallSimulator.tsx**:
  - **Konsistensi Font Plus Jakarta Sans**: Menghapus seluruh kelas `font-mono` yang sebelumnya membuat teks alamat pengirim/handle `@recruitment_workfromhome_id`, jam status bar, dan label kartu tampil dalam font monospace mesin tik. Sekarang seluruh simulator konsisten menggunakan tipografi utama **Plus Jakarta Sans** (`font-sans`).
  - Mengimplementasikan adaptasi antarmuka dinamis (*multi-platform dynamic chat UI*) yang membedakan skenario Media Sosial (DM Instagram, seperti K3 Lowongan WFH & K7 Giveaway) dari skenario pesan instan standar (WhatsApp, seperti K1 & K2):
  - **Bilah Header Instagram DM**:
    - Latar belakang putih bersih (`bg-white`) dengan garis pemisah halus (`border-b border-slate-200/80`).
    - Avatar profil dengan **Instagram Story Gradient Ring** (`from-[#f09433] via-[#dc2743] to-[#bc1888]`) dan indikator status aktif online hijau.
    - Lencana nama pengirim dengan centang biru terverifikasi (`CheckCircle2` biru), nama handle `@recruitment_workfromhome_id`, serta tombol aksi khas Instagram DM di kanan (panggilan suara, video call, dan info profil).
  - **Layar Obrolan & Balon Pesan Otentik Instagram**:
    - Menghilangkan wallpaper doodle WhatsApp untuk skenario Instagram, menggantinya dengan latar belakang putih bersih (`bg-white`) dan banner kartu ringkasan profil Instagram di bagian teratas obrolan.
    - Balon chat pengirim (kiri) menggunakan warna abu-abu khas Instagram (`bg-[#EFEFEF] text-[#262626] rounded-[22px] rounded-bl-sm`) didampingi mini avatar bundar di sampingnya.
    - Balon chat pengguna (kanan) menggunakan gradien warna ungu-magenta khas Instagram Messenger (`bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#D946EF] rounded-[22px] rounded-br-sm text-white`) disertai status keterangan *"Dilihat"*.
    - Menambahkan mockup bilah input Instagram di atas titik keputusan (ikon kamera biru, bilah *"Kirim pesan..."*, mic, gambar, dan ikon hati).
### Penyesuaian Stacking Context Navbar & Penyempurnaan Popup Dialog Peringatan (Layout.tsx & FakeChatSimulator.tsx)
- **Layout.tsx**:
  - Memperbarui `z-index` bilah navigasi atas (*sticky dashboard header*) dari `z-30` menjadi `z-40` agar konsisten dengan header publik dan selalu berada di atas seluruh elemen konten halaman saat bergulir (*scrolling*).
- **FakeChatSimulator.tsx**:
  - Menambahkan isolasi konteks tumpukan CSS (`isolate z-0`) pada bingkai terluar smartphone simulator sehingga seluruh elemen dan overlay di dalamnya (termasuk modal popup `z-40` dan header obrolan) tersegel rapi di level 0 dan tidak akan pernah tembus atau menutupi kolom pencarian (*search bar*) maupun header website saat digulir.
  - Menyederhanakan tampilan kartu modal popup peringatan sistem (*Mobile System Alert Dialog*):
    - Menghapus kotak terpisah *"Tindakan terakhir: ..."* dan teks ganda *"Ketuk di mana saja untuk melanjutkan"* agar dialog peringatan tampil ringkas, bersih, dan fokus seperti peringatan keamanan sistem operasi ponsel asli.
    - Menghapus badge pill *"Perbesar Layar"* dari kartu pesan sistem dan notifikasi mutasi bank pada feed obrolan untuk mengeliminasi redundansi visual.
### Pembaruan Widget Indikator Risiko dengan Ikon & Persenan (Cek.tsx)
- **Cek.tsx**:
  - Menghapus lingkaran donat *brush stroke* (`strokeWidth="11"` & `tubularHighlight`) yang sebelumnya mengganggu secara visual dengan ujung terpotong (*overlap tip*).
  - Mengganti tampilan skor lingkaran menjadi widget indikator visual bersih (*clean neumorphic indicator hub*):
    - Menampilkan **Ikon Indikator Keamanan** yang relevan secara dinamis sesuai kategori risiko (`ShieldAlert` untuk Risiko Sangat Tinggi, `AlertTriangle` untuk Risiko Tinggi, `AlertCircle` untuk Waspada, dan `ShieldCheck` untuk Belum Terlihat Bahaya).
    - Mengubah format angka skor menjadi **persenan** (`{result.score}%`, misal `90%`) menggantikan teks lama `dari 100`.
    - Dilengkapi *ambient halo* berpendar lembut serta *bar meter* horizontal ramping modern dengan gradien warna halus (kuning ke orange/merah) yang presisi dari 0% hingga 100%.

### Popup Dialog Peringatan Bersih dengan Efek Blur Layar Chat (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Mengubah tampilan peringatan sistem dari yang sebelumnya layar hitam pekat penuh menjadi **modal dialog popup otomatis yang bersih, simpel, dan elegan** (*Clean Mobile System Alert Popup*):
    - Latar belakang obrolan (*chat area*, *wallpaper doodle*, dan bilah header) tetap terlihat di belakang dengan efek blur halus mendalam (`backdrop-blur-md bg-black/50`).
    - Kartu popup mengambang di tengah layar ponsel dengan desain putih bersih (`bg-white rounded-3xl p-6 shadow-2xl`), ikon peringatan simpel (`AlertTriangle` / `AlertOctagon`), judul jelas, isi pesan sistem, serta catatan tindakan sebelumnya.
    - Pengguna dapat mengetuk/klik di area mana saja (baik pada latar belakang blur maupun kartu popup dan tombol *"Lanjutkan ke Pilihan Keputusan"*) untuk menutup dialog dan melanjutkan ke langkah keputusan berikutnya.

### Isolasi Tinggi Ponsel Hanya untuk Sesi Telepon & Perbaikan Ruang Kosong Mode Chat (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Menghapus pembatas tinggi paksa (`min-h-[780px] sm:min-h-[850px]`) dari bingkai terluar simulator smartphone di `FakeChatSimulator.tsx`.
  - Memperbaiki bug tampilan pada mode obrolan (chat) di mana bilah navigasi ponsel sempat mengambang di tengah dan menyisakan ruang kosong biru tua (`bg-[#27374D]`) yang masif di bawah bilah navigasi saat pesan obrolan masih sedikit.
  - Sekarang mode chat membungkus konten dan dock input percakapan secara natural dan rapat dengan bilah navigasi ponsel menempel pas di bagian bawah bingkai tanpa celah kosong.
  - Dimensi tinggi yang panjang (`min-h-[720px] sm:min-h-[790px]`) kini **hanya berlaku secara eksklusif untuk sesi panggilan telepon** (`PhoneCallSimulator.tsx`) sehingga tampilan telepon tetap panjang dan proporsional persis smartphone nyata saat panggilan berlangsung.

### Penyederhanaan Visual Minimalis Layar Panggilan Masuk (PhoneCallSimulator.tsx)
- **PhoneCallSimulator.tsx**:
  - Menghapus elemen dekoratif yang mengganggu pada tampilan panggilan masuk sesuai permintaan visual pengguna:
    - Menghapus lencana pill *"Panggilan Masuk..."* di bagian atas.
    - Menghapus teks nomor dan keterangan tambahan `+62 821-9900-1122 (Panggilan Suara Masuk)` serta `Indonesia • Panggilan Seluler`.
    - Menghapus avatar lingkaran riak getar di bagian tengah dan teks *"Menunggu Respons Kamu..."*.
  - Menghasilkan tampilan antarmuka panggilan masuk yang jauh lebih bersih, modern, dan autentik persis referensi video (nama penelepon *Customer Security Bank X* tebal di bagian atas, ruang tengah lapang minimalis, tombol *Ingatkan Saya / Pesan*, serta kapsul interaktif *Ketuk untuk Menjawab* dan tombol *Tolak* di bagian bawah).
### Penyelarasan Panjang & Proporsi Mockup Layar HP Simulator
- **FakeChatSimulator.tsx & PhoneCallSimulator.tsx**:
  - Menyelaraskan tinggi dan proporsi bingkai HP simulator agar layar panggilan telepon memiliki panjang yang presisi sama dengan panjang layar simulator chat (`min-h-[780px] sm:min-h-[850px]`):
    - Memposisikan bilah status ponsel asli (*Mock Phone Status Bar* dengan waktu 09:41, notch kamera, 5G, dan 88%) permanen di bagian paling atas bingkai ponsel.
    - Memposisikan bilah navigasi ponsel (*Bilah Navigasi Smartphone* dengan tombol Back, Home, dan Multitasking) permanen di bagian bawah bingkai ponsel.
    - Mengubah wadah dalam `PhoneCallSimulator` menjadi `min-h-[720px] sm:min-h-[790px] flex-1` serta merelokasi dan memperluas jarak vertikal antar elemen (avatar riak berdenyut, tombol aksi cepat, kapsul geser/ketuk untuk menjawab, dan transkripsi panggilan) sehingga layar telepon tidak lagi tampak gepeng/pendek dan bertransisi mulus tanpa lonjakan tinggi saat berpindah ke obrolan chat.
### Perbaikan Isolasi Audio Panggilan Telepon (PhoneCallSimulator.tsx)
- **PhoneCallSimulator.tsx**:
  - Memperbaiki bug kebocoran nada dering (*ringtone leak*) agar audio telepon **hanya berbunyi secara eksklusif selama sesi panggilan masuk**:
    - Menambahkan mekanisme *guard flag* (`isRingingActive`) dan pembersihan otomatis `stopRinging()` sebelum interval baru dibuat untuk mencegah *interval timer* terduplikasi atau tertinggal di memori browser.
    - Menambahkan fungsi pembersihan mendalam `cleanup()` yang menutup dan mendestruksi `AudioContext` serta membersihkan seluruh timer saat komponen *unmount* (ketika panggilan selesai dan kembali ke Fake Chat atau saat pengguna berpindah halaman).
    - Memastikan dering langsung berhenti seketika (*instant mute*) saat panggilan diangkat (`callPhase === "active"`), panggilan ditolak/diputus (`callPhase === "ended"`), atau saat tab browser diminimalkan/tidak aktif (*visibilitychange listener*).
### Penyesuaian Lebar Peringatan Selayar HP pada Simulator (FakeChatSimulator.tsx)
- **FakeChatSimulator.tsx**:
  - Mengubah seluruh kotak peringatan sistem (`systemCard`), kartu konsekuensi tindakan edukatif (*Konsekuensi Tindakan Berisiko / Konsekuensi Tindakan Aman & Waspada*), peringatan mutasi bank (*Bank Notification*), serta panggilan suara masuk agar tampil penuh selebar layar ponsel simulator (`w-full` dengan padding `p-4 sm:p-5` dan sudut `rounded-2xl`).
  - Menghapus pembatas lebar sempit (`max-w-lg` 512px) dan pembungkus tengah (`flex justify-center`) yang sebelumnya membuat kartu peringatan tampak melayang sempit di tengah layar ponsel simulator pada layar tablet/desktop, sehingga sekarang kartu peringatan membentang proporsional memenuhi lebar layar HP simulator secara konsisten di seluruh skenario (K1 s.d. K8).
### Simulasi Panggilan Telepon Interaktif Skenario K4 (Telepon Palsu Petugas Bank)
- **PhoneCallSimulator.tsx & FakeChatSimulator.tsx**:
  - Mengimplementasikan pengalaman simulasi panggilan telepon suara (*voice call*) interaktif penuh untuk **Skenario K4 (Telepon Palsu Petugas Bank)** dengan referensi desain ponsel modern (iOS call screen):
    - **Layar Panggilan Masuk (Incoming Call):**
      - Tampilan bertema gelap ramping (`#121214` / `#1C1C1E`) dengan ambient glow dan status bar ponsel (09:41, sinyal seluler, 5G, baterai).
      - Menampilkan identitas penelepon: *Customer Security Bank X* (`+62 821-9900-1122`), status berdenyut *"Panggilan Masuk..."*, serta avatar lingkaran bergelombang getar (*animated ripple waves* & *shake*).
      - Tombol aksi cepat atas (*Ingatkan Saya* dengan ikon `Clock` dan *Pesan* dengan ikon `MessageSquare`).
      - Pengguna harus mengangkat panggilan sendiri secara interaktif (menunggu dipencet pengguna sebelum simulasi dimulai) melalui tombol hijau *"Angkat / Jawab"* atau kapsul beranimasi shimmer *"Ketuk untuk Menjawab"*, atau langsung menolak panggilan melalui tombol merah *"Tolak Panggilan"*.
      - Dilengkapi audio synthesizer Web Audio API mandiri (100% on-device tanpa berkas eksternal) untuk nada dering dan nada putus panggilan, serta tombol sakelar dering senyap/nyala.
    - **Layar Panggilan Aktif (Active Call):**
      - Timer durasi panggilan mulai menghitung detik berjalan (`00:01`, `00:02`, dst.) dengan indikator equalizer gelombang audio (*live voice equalizer*).
      - Menampilkan 6 tombol bundar in-call iOS (Mute/Bisu, Keypad interaktif, Speaker, Tambah Panggilan, FaceTime, dan Kontak).
      - **Transkripsi Suara Langsung (*Live Speech-to-Text*):** Menampilkan teks dialog yang diucapkan oleh petugas bank gadungan secara bertahap dan jelas, menuntut kode OTP SMS dengan alasan transaksi darurat Rp4.500.000.
      - **Pilihan Ganda Pop-Out (A, B, C):** Menyediakan 3 opsi respons bicaramu dengan desain kartu *elevated pop-out* (menonjol dan terangkat berbayangan lembut saat kursor menyentuh kartu dengan lencana lingkaran huruf A/B/C putih).
      - Tombol merah bulat besar di bagian bawah (*End Call*) yang langsung memutus sambungan telepon sebagai respons aman (setara opsi C).
    - **Panggilan Selesai & Kembali Otomatis ke Fake Chat:**
      - Saat pengguna memilih respons atau mematikan telepon, layar menampilkan status *"Panggilan Berakhir"*, durasi total, ucapan respons pengguna, dan reaksi penelpon.
      - Layar panggilan tertutup secara otomatis setelah jeda singkat (~1.8 detik), mengembalikan pengguna ke tampilan chat simulasi (*Fake Chat*) dengan riwayat percakapan, transkripsi telepon, konsekuensi keputusan, serta evaluasi skor pertahanan atau kelanjutan skenario.
      - Tersedia tombol *"Layar Telepon"* di bilah header jika pengguna ingin membuka kembali antarmuka telepon kapan saja.
### Pembaruan Gambar Cover Simulator Skenario dari Berkas Zip
- **Belajar.tsx & public/simulator/covers/**:
  - Mengintegrasikan seluruh aset gambar cover skenario simulator yang diekstrak dari `foto simulator.zip` serta foto unggahan undangan pernikahan ke dalam direktori publik `public/simulator/covers/`:
    - **Kasus K1 (Undangan Pernikahan Digital.apk):** Menggunakan `undangan-digital.jpg` (tampilan landing page/website undangan pernikahan elegan *Wedding Venue & Inquiry Assessment*).
    - **Kasus K2 (Lihat Foto Paket):** Menggunakan `paket.jpg` (foto interaktif seseorang membuka paket kardus).
    - **Kasus K3 (Loker Admin WFH Palsu):** Menggunakan `work-from-home.jpg` (foto kerja remote di depan laptop meja).
    - **Kasus K4 (Telepon Palsu Petugas Bank):** Menggunakan `bank.jpg` (antarmuka transfer dana perbankan digital di ponsel).
    - **Kasus K5 (Kenalan Online -> Investasi Bodong):** Menggunakan `dating-apps.jpg` (tampilan aplikasi kencan daring "Find a Match").
    - **Kasus K6 (Email Akun Akan Ditangguhkan):** Menggunakan `email.jpg` (tampilan kotak masuk email Google Mail).
    - **Kasus K7 (Giveaway Palsu):** Menggunakan `giveaway.jpg` (grafis stempel hadiah kotak giveaway).
    - **Kasus K8 (Toko Online Fiktif):** Menggunakan `toko-online.jpg` (tampilan keranjang belanja checkout belanja daring).
  - Menyesuaikan penataan posisi objek gambar (`object-cover object-center`) pada wadah kartu rasio 4:3 agar fokus utama setiap skenario terpusat dan tidak terpotong.
  - Menghapus elemen indikator titik carousel (*dots indicator*) di bagian bawah pratinjau kartu gambar skenario simulator (`Belajar.tsx`) agar tampilan foto cover bersih sepenuhnya tanpa elemen overlay titik putih.
  - Meratakan warna putih pada aset `giveaway.jpg` dengan menghilangkan garis/letterbox abu-abu di bagian atas dan bawah menjadi putih murni (`#FFFFFF`) rata, serta menyelaraskan latar belakang pembungkus gambar menjadi putih bersih (`bg-white`) agar latar grafis menyatu sempurna dan tidak belang.

### Redesain Tombol Aksi Mulai Simulator Skenario
- **Belajar.tsx**:
  - Mengubah desain tombol aksi pada seluruh kartu skenario simulator di halaman Belajar (`SimulatorCover`):
    - **Model Stroke & Background Outline:** Mengadopsi model stroke kartu profil (latar belakang putih `bg-white`, garis tepi `border border-[#9DB2BF]/60`, bayangan halus `shadow-2xs`, dan transisi hover `hover:border-[#526D82] hover:bg-slate-50 text-[#27374D]`). Mengeliminasi blok warna gelap solid `#27374D` agar tampilan kartu terasa lebih bersih dan lapang.
    - **Bentuk Square dengan Sudut Radius Sama:** Tetap mempertahankan bentuk rounded rectangle (`rounded-xl`) dengan sudut radius yang sama dengan kartu dan tombol pintasan (bukan bentuk kapsul/pill bulat penuh `rounded-full`).
    - **Tipografi & Lokasi Selaras Pintasan Simulator:** Menyelaraskan tata letak tombol dengan tombol Pintasan Simulator (`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 font-bold text-xs sm:text-sm`), memposisikan teks aksi *"Mulai Simulasi"* dan ikon panah `ArrowRight` berdampingan rapi di tengah tanpa kotak terpisah di sisi kanan.

### Diferensiasi Analisis & Pengayaan Fitur Halaman Cek (/cek)
- **Cek.tsx, analysis.ts, & api.ts**:
  - **Diferensiasi Output Pemeriksaan:** Memisahkan logika evaluasi dan tampilan hasil analisis secara spesifik untuk masing-masing tab:
    - **Pesan:** Evaluasi transfer dana, tekanan waktu, tawaran gaji/hadiah berlebihan, tautan pancingan, penyamaran PII otomatis (nomor telepon & rekening), dan permintaan OTP/PIN.
    - **Tautan (URL):** Deteksi protokol tidak terenkripsi (HTTP), TLD berisiko tinggi (`.xyz`, `.top`, `.site`), pemalsuan merk perbankan/ekspedisi (*typosquatting*), jalur jebakan login/verifikasi akun, pemendek tautan (*URL shorteners*), dan unduhan langsung paket aplikasi mentah (`.apk`).
    - **Berkas & Izin:** Deteksi ekstensi file aplikasi mentah (`.apk`), manipulasi ekstensi ganda (*double extension* seperti `.pdf.apk`), kata kunci pancingan rekayasa sosial (undangan, tilang, resi), sumber instalasi tidak resmi (*sideloading* via WhatsApp/Telegram), dan izin berbahaya Android.
  - **Pemilih Izin Interaktif Android:** Menyediakan kartu centang (*checkbox chips*) interaktif di tab Berkas & Izin untuk memilih izin berbahaya seperti `RECEIVE_SMS` (baca OTP), `BIND_ACCESSIBILITY_SERVICE` (aksesibilitas penuh), `READ_CONTACTS`, dan `SYSTEM_ALERT_WINDOW` (screen overlay) dengan label tingkat risiko (*Kritis*, *Tinggi*, *Sedang*).
  - **Tombol Contoh Tiap Tab:**
    - Menyesuaikan narasi ringkasan risiko (*summary*) pada hero box kartu hitam agar relevan secara konteks dengan objek yang diperiksa (pesan, URL, atau file).
    - Menambahkan tombol *"Coba tautan contoh"* dan *"Coba berkas contoh"* dengan data sampel fiktif yang realistis di samping *"Coba contoh fiktif"* untuk pesan.
  - **Redesain Indikator Donut Meter 3D & Gradien Kuning -> Orange -> Merah:**
    - Mengganti donat datar oranye dengan desain *3D Neumorphic Donut Gauge* persis referensi visual: lingkaran melengkung tebal dengan saluran track inset, lapisan kilau tubular 3D (*glossy highlight*), serta piringan tengah terangkat (*elevated central hub disc*) berbayangan lembut yang memuat angka skor dan label "DARI 100".
    - Mengubah skema warna busur lingkaran menjadi gradasi bertahap **Kuning (`#FACC15`) -> Orange (`#F97316`) -> Merah (`#DC2626`)** yang kontras, dinamis, dan intuitif mencerminkan eskalasi risiko.
    - Menghapus bilah 4-segmen skala horizontal (*Aman, Waspada, Berisiko, Sangat Tinggi*) di bawah hero box agar visual kartu hasil tetap bersih, fokus, dan tidak redundan dengan indikator utama.
  - **Penyederhanaan UI Kartu Hasil & Tombol Cara Verifikasi Collapsible:**
    - Menghapus elemen dekoratif yang berlebihan sesuai permintaan (kotak pratinjau target pemeriksaan, lencana objek teks/tautan/berkas di header, lingkaran merah penanda jumlah temuan, tag indikasi modus, dan badge level `L4 · Bahaya` pada kartu red flags).
    - Pada kartu temuan mencurigakan (*red flags*), secara bawaan hanya mencantumkan kategori dan alasan *"Kenapa mencurigakan"*.
    - Menambahkan tombol interaktif *"Cara verifikasi"* (dengan ikon `ChevronDown` / `ChevronUp`) pada masing-masing kartu, yang jika diklik akan membuka kotak panduan *"Cara verifikasi"* ke bawah secara responsif dan rapi.
  - **Status Bersih & Pembersihan Riwayat Saat Pindah Tab:** Menampilkan kartu hijau informatif (*"Tidak Ditemukan Tanda Bahaya Mencurigakan"*) saat tidak ada *red flags* terdeteksi, serta mereset hasil dan error saat berganti tab agar hasil pemeriksaan tidak tercampur.
  - **Menu Dropdown Profil Interaktif (`UserProfileDropdown.tsx`):**
    - Mengubah tombol profil pill di pojok kanan atas top bar menjadi tombol interaktif dengan animasi rotasi panah chevron saat terbuka.
    - Menampilkan panel dropdown melayang (*floating dropdown*) yang memuat informasi akun ringkas, indikator status sesi on-device aktif, tautan cepat ke Keterbatasan & Privasi, serta tombol aksi **Keluar dari Sesi (Logout)**.
    - Dilengkapi dukungan interaktivitas penuh: menutup otomatis saat klik di luar area (*click-outside listener*) atau saat tombol `Escape` ditekan, serta mengarahkan pengguna kembali ke halaman utama secara mulus saat keluar dari sesi.
    - Menghapus label catatan *"Privasi Terjaga: 100% data tersimpan di perangkat lokal"* dari dalam menu dropdown profil agar tampilan dropdown lebih ringkas dan fokus pada opsi navigasi & akun.

### Penyesuaian Tata Letak Kamus Istilah Digital: Grid Daftar & Detail Editorial
- **Belajar.tsx**:
  - **Pengembalian Daftar Istilah Kamus ke Format Grid (`KamusCover`):** Mengembalikan daftar kartu pada halaman cover kamus ke format grid 2 kolom yang ringkas dan teratur (`grid-cols-1 md:grid-cols-2 gap-5`), memuat badge kategori, judul istilah, ringkasan arti 3 baris, dan pintasan `Buka Detail →` tanpa layout horizontal yang terlalu memanjang.
  - **Penerapan Gaya Editorial Wolf & Whale pada Halaman Detail (`KamusPage`):** Menerapkan desain tipografi editorial modern persis referensi visual saat kartu istilah diklik untuk melihat detailnya:
    - **Display Typography (Kiri):** Judul istilah ukuran besar (`text-3xl sm:text-4xl lg:text-5xl font-black`) dengan aksen warna dinamis (`renderStyledTermTitle`), tanda titik aksen, badge kategori pill, serta watermark monogram inisial di latar belakang.
    - **Penjelasan Editorial & Aksi Tautan (Kanan):** Paragraf penjelasan definisi yang leluasa (`text-base sm:text-lg`) langsung di atas kanvas putih bersih, serta tombol tautan `→ Pelajari Anatomi Modus & Pertolongan Pertama` yang membawa langsung ke bagian tahapan modus, titik masuk jebakan, pertolongan pertama, dan pencegahan.

### Komponen Navigasi Mobile Gelembung Melayang (Curved Bubble Bottom Bar)
- **MobileCurvedBottomNav.tsx & Layout.tsx**:
  - Mengimplementasikan desain bilah navigasi bawah ponsel modern (*curved bubble bottom navigation bar*) persis referensi video interaksi:
    - **Floating Active Bubble:** Gelembung lingkaran aktif bergradasi `#27374D` & `#526D82` dengan efek ring putih, bayangan halus, dan kilau refleksi yang melayang di atas bilah navigasi dan memuat ikon halaman aktif.
    - **Curved Notch Scoop:** Cekungan lekukan organik (*curved scoop*) yang diukir halus di tepi atas bilah putih, bergerak mulus (*smooth fluid slide*) mengikuti posisi item aktif menggunakan transisi kurva pegas `cubic-bezier(0.34, 1.35, 0.64, 1)`.
    - **Transisi Ikon & Label:** Ikon halaman tidak aktif terpasang rapi di bilah navigasi; saat suatu modul aktif, ikonnya bertransformasi naik ke dalam gelembung dengan animasi pop-in (`zoom-in-75`), sementara label modul tetap terbaca tebal di bagian bawah dok.
    - Responsif di seluruh lebar layar ponsel (distribusi seimbang $20\%$ per modul) dengan area sentuh nyaman (*touch target* $> 44\text{px}$).

### Pembersihan & Penyederhanaan Tampilan (UI Cleanup)
- **Layout.tsx**:
  - **Pemberhentian Hamburger Menu Mobile & Penyeragaman Navigasi Bawah:** Menghapus tombol hamburger menu (`Menu` icon) dan drawer sidebar geser pada tampilan layar ponsel (`md:hidden`). Navigasi pada perangkat mobile kini difokuskan sepenuhnya melalui bilah navigasi bawah (*bottom navigation bar*) yang sudah memuat 5 halaman utama secara mudah dijangkau satu tangan (*thumb-friendly*), sementara sidebar tetap aktif khusus pada tampilan layar tablet dan desktop (`md:flex`).
- **Lindungi.tsx**:
  - Menghapus badge pill `*Cek ulang keaslian alamat di situs resmi` pada header Kanal Lapor Resmi.
  - Menghapus ikon `Share2` pada label judul "Kartu Peringatan untuk Orang Sekitar".
  - Menghapus teks bawaan `*Teks aman dibagikan karena tidak memuat data pribadi.` agar area umpan balik status salin/bagi lebih bersih dan minimalis.
  - Memperbarui isi draf teks pesan pada Kartu Peringatan Keluarga (*warning card*) dengan salinan pesan edukatif terbaru (*"JagaRuang: Yuk, Jaga Keluarga dari Penipuan Digital!"*).
  - Merapikan struktur paragraf dan jarak baris (*line-height* `leading-normal`) pada pesan peringatan: menyatukan butir daftar (*bullet points* & penomoran langkah) tanpa jeda baris kosong ganda yang terlalu renggang, sehingga pesan tersaji padat, rapi, dan mengalir seperti siaran chat pesan singkat yang natural.
  - Menghapus teks deskripsi header *"Teks ringkas siap salin tanpa memuat data pribadi untuk memperingatkan orang tua dan grup pertemanan."* pada Kartu Peringatan.
- **Beranda.tsx**:
  - Menghapus teks label *"Diperbarui Mingguan"* di samping judul Kamus & Modus Populer.
- **Sandi.tsx**:
  - Menghapus tombol toggle segmented pill *"2 Kata"* vs *"3 Kata (Disarankan)"* pada header pembuatan sandi. Generator kata sandi kini secara default langsung menghasilkan kombinasi 3 kata bahasa Indonesia acak yang kuat dan mudah dihafal secara lisan.
  - Menghapus teks `(*AI Voice Cloning*)` pada deskripsi subtitle header Sandi Verifikasi Keluarga.
- **FakeChatSimulator.tsx & Belajar.tsx**:
  - **Efek Hover Pilihan Ganda Menonjol (Pop-out Selection):** Mengubah desain tombol opsi pilihan ganda keputusan (A, B, C) pada simulator sesuai referensi visual:
    - Saat disentuh kursor (hover), opsi langsung **menonjol** secara nyata: membesar (`scale-[1.03]`), terangkat ke atas (`-translate-y-1.5`), memiliki bayangan pekat yang dalam (`shadow-xl shadow-[#27374D]/30`), dan latar belakang berubah menjadi warna primer solid (`bg-[#27374D]`).
    - Lencana huruf opsi bertransformasi menjadi lingkaran putih bersih (`bg-white text-[#27374D] font-black shadow-md`) dengan teks opsi putih tebal dan panah chevron kanan yang meluncur mulus.
- **FakeChatSimulator.tsx**:
  - Menghapus tombol atas *"Ulangi Kasus"* (`RotateCcw`) pada bilah navigasi atas di atas simulator smartphone agar bilah navigasi tampil ringkas hanya dengan tombol kembali ke daftar skenario.
  - **Pembersihan Elemen Akhir Skenario & Label Tape:**
    - Menghapus tampilan `Kode Bukti: TRUST{...} Salin` pada kartu evaluasi akhir skenario (Foto 1).
    - Menghapus lencana pita kuning *"GILIRANMU MENENTUKAN TINDAKAN"* di atas bilah keputusan, serta menyembunyikan bilah bawah redundan (*Kasus selesai... Selesai / Coba Alur Lain*) saat skenario berakhir sehingga kartu evaluasi akhir menjadi satu-satunya fokus ringkasan penyelesaian (Foto 2).
  - Menyatukan *Bottom Interactive Choices Dock* (tombol pilihan A, B, C dan status percakapan) ke dalam kontainer gulir utama obrolan (*scroll container*), sehingga scrollbar vertikal memanjang hingga ke bagian paling bawah pilihan dan pilihan dapat digulir langsung secara mulus dari dalam area chat.
  - Menambahkan bilah navigasi dekoratif di bagian bawah bingkai smartphone yang memuat tombol Home HP (bersama tombol Back dan Recents) bersifat visual murni (`pointer-events-none`) agar area bawah ponsel proporsional, autentik, dan tidak kosong.
  - Menghapus badge label *"Nomor Asing"* di samping nama kontak dan badge info skenario *"KX · 5 Titik Keputusan"* di header simulator chat agar tampilan bilah atas obrolan tampak bersih, realistis, dan seperti aplikasi pesan asli.
- **Belajar.tsx**:
  - **Penyederhanaan Animasi Hover Kartu Skenario Simulator:** Menghapus efek animasi hover internal (`group-hover:scale-105`, `group-hover:scale-110`, perubahan warna font teks judul, dan translasi panah tombol `Mulai →`) pada elemen dalam kartu. Animasi hover kini terisolasi murni pada kontainer kartu (*card lift & shadow* `hover:-translate-y-1 hover:shadow-xl`), menjaga gambar pratinjau dan tipografi di dalam kartu tetap stabil dan tidak bergerak saat dihover.
  - Menghapus ikon `Sliders` pada judul "Pilih Tingkat Kesulitan:" di kartu tantangan Kilat 2 Menit dan membersihkan import yang tidak terpakai.
  - Menghapus teks petunjuk *"Klik opsi untuk mengatur durasi tantangan"* di samping judul Pilih Tingkat Kesulitan.
  - Memperbesar dan meratakan ukuran tombol aksi kapsul "Mulai →" pada kartu Skenario Simulator (`w-full`, padding `py-2.5`, teks `text-sm font-bold`, dan badge panah `h-7 w-7`) agar proporsional, seragam, dan selaras di seluruh kartu skenario.
  - Memperbesar kotak pratinjau showcase visual *"QUIZ KILAT"* pada kartu Tantangan Kilat (tinggi `min-h-[280px]`, padding `py-9 px-6`, kartu soal melayang lebih besar `w-56`, tipografi `text-6xl`, dan pembagian grid seimbang `lg:col-span-6`) persis sesuai referensi tangkapan layar.
  - Menghapus badge/kotak pembungkus (*square pill*) pada label mode tantangan (`Mode Santai` / `Mode Standar` / `Mode Ekstrem`) dan mempertahankan tipografi serta diferensiasi warna teks murni: hijau (`text-emerald-400`) untuk Santai, polos (`text-white`) untuk Standar, dan merah (`text-rose-400`) untuk Ekstrem.
  - Menghapus titik indikator warna pada kartu opsi pilihan tingkat kesulitan di sebelah kanan agar tampilan kartu opsi tetap polos dan bersih.
  - Memastikan seluruh tipografi aplikasi seragam menggunakan font **Plus Jakarta Sans** (menginstal paket mandiri `@fontsource-variable/plus-jakarta-sans`, memperbarui konfigurasi `@theme` dan `html`/`body` di `index.css`), serta menghapus `font-mono` pada badge timer *"Sisa Waktu:"* di sesi Kilat 2 Menit agar selaras dan konsisten.
  - Menghapus label petunjuk *"Pilih Yes / No"* pada header kartu pertanyaan kuis kilat agar kartu soal lebih rapi dan terfokus.
  - Mengganti kotak medali pada kartu hasil evaluasi tantangan kilat dengan indikator lingkaran progres/donat persentase akurasi dinamis (misal `30%` saat benar 3 soal, berkode warna hijau/kuning/merah adaptif), serta menghapus badge pill *"Akurasi 30%"* di samping judul agar visual ringkas dan fokus.
  - Mengubah daftar ulasan 10 soal hasil tantangan kilat menjadi kartu akordion ringkas yang menampilkan *"Soal X. [Isi Soal]"* dengan penanda garis tepi/stroke tegas (hijau `border-emerald-500` jika tepat dan merah `border-rose-500` jika salah), yang dapat diklik untuk membuka penjelasan detail & tanda kejanggalan (*red flags*) sehingga halaman tidak terlalu panjang.
  - Menghapus teks petunjuk di samping header ulasan 10 soal (*"Pelajari tanda kejanggalan (red flags) dari tiap pesan"*) agar tampilan header lebih bersih dan minimalis.
  - Menghapus dua kotak statistik rincian angka (*"Tepat X dari 10 Soal"* dan *"Kurang Tepat X dari 10 Soal"*) pada kartu hasil evaluasi kuis kilat, menyelaraskan tampilan kartu evaluasi menjadi satu layout terpadu yang bersih dan lega.
  - Menyesuaikan kelengkungan border radius tombol *"Mulai →"* pada kartu Skenario Simulator dari sebelumnya `rounded-full` (kapsul lonjong) menjadi `rounded-xl` (dengan badge panah `rounded-lg`) agar sudutnya lebih tegas, modern, dan tidak terlalu bulat.
  - **Pembersihan Elemen Halaman Detail Kamus (`KamusPage` di `Belajar.tsx`)**:
    - **Pembersihan Lencana Kategori (Foto 1)**: Menghapus badge pill kategori (seperti *"Malware Android"*) di atas judul besar istilah.
    - **Pembersihan Wadah Ikon Sub-Header (Foto 2)**: Menghapus kotak wadah ikon (`OctagonAlert`, `FileCode`, `ShieldCheck`) pada sub-header *Pertolongan Pertama Terpapar*, *Cara Kerja & Titik Masuk*, dan *Langkah Pencegahan Utama*.
    - **Pembersihan Badge Kapsul Sub-Header (Foto 3)**: Menghapus badge pill dekoratif (*"Proteksi Mandiri"*, *"Alur Modus"*, *"Tindakan Cepat"*) di sisi kanan masing-masing sub-header.
    - **Pembersihan Ikon Segitiga Peringatan (Foto 4)**: Menghapus ikon `AlertTriangle` merah pada catatan mitigasi pertolongan pertama.
    - **Pembersihan Baris Kunci Proteksi (Foto 5)**: Menghapus baris teks penutup *"Kunci proteksi paling efektif sebelum terjadi insiden."* beserta ikon centang hijau di bawah langkah pencegahan utama.

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
  - `LoginModal`: Modal login cepat dengan nama samaran/tamu ramah privasi (100% on-device). Pembersihan kotak informasi privasi bawah sesuai permintaan perampingan modal.
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
  - **Penyelarasan Desain & Kesejajaran Grid Dashboard (Beranda.tsx)**:
    - Menyelaraskan kartu bagian **Modul Pembelajaran** di Dashboard pengguna (`Beranda.tsx`) dengan desain kartu modul pembelajaran dari Hub Belajar:
      - Mengganti kartu lama dengan modul pembelajaran riil: *Apa Itu Rekayasa Sosial?*, *Anatomi Sebuah Penipuan*, dan *Keamanan di WhatsApp*.
      - Komposisi kartu identik referensi: wadah ikon di kiri atas, status pill "Belum dibaca" / "Sudah dibaca" tersinkronisasi dengan `localStorage` (`jagaruang_read_modules`), label kategori huruf kapital, judul tebal, ringkasan 2 baris, durasi membaca, dan aksi `Baca Modul →`.
      - Tautan header disesuaikan menjadi `Lihat Semua Modul →` yang mengarah ke `/belajar?tab=modul`.
      - Navigasi kartu langsung membuka materi modul yang dipilih (`/belajar?tab=modul&module={id}`) dengan dukungan tombol kembali yang mulus.
    - **Penyelarasan Panjang & Garis Bawah Kartu Dashboard**:
      - Membagi layout dashboard pengguna menjadi 2 baris grid terkoordinasi (`items-stretch`):
        - **Baris 1**: Kolom kiri (*Welcome Back* + *Modul Pembelajaran*) dan kolom kanan (*Pintasan Simulator*). Wadah *Welcome Back* diperbesar secara vertikal dengan padding proporsional (`p-7 sm:p-8 lg:p-9`) dan ilustrasi terpusat, mengeliminasi sela kosong di atas *Modul Pembelajaran*. Wadah *Pintasan Simulator* meregang penuh (`h-full justify-between`) dengan preview chat responsif (`min-h-[160px] max-h-[220px]`), sehingga ujung garis bawahnya sejajar presisi dengan ujung bawah kartu *Modul Pembelajaran*.
        - **Baris 2**: Kolom kiri (*Activities* – Grafik Pembelajaran Mingguan) dan kolom kanan (*Kamus & Modus Populer*). Wadah *Kamus & Modus Populer* menyajikan 4 istilah populer (*Sniffing APK*, *Social Engineering*, *SIM Swap Fraud*, dan *Phishing Website*) dengan jarak antar item rapat dan proporsional (`space-y-2.5`, padding `p-2.5 sm:p-3`), menghapus peregangan berlebih akibat `justify-between`, serta tombol tautan footer tetap sejajar rapi di bagian bawah.
    - **Penyelarasan Kotak Putih Header Halaman (Cek.tsx & Belajar.tsx)**:
      - Membungkus header judul, deskripsi, dan tab navigasi pada halaman **Cek Indikasi Tipuan Digital** (`Cek.tsx`) ke dalam kotak kartu putih berbingkai lembut (`rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs`) agar kontras, solid, dan tidak tenggelam di latar belakang `#DDE6ED`.
      - Membungkus header judul, deskripsi, dan 4 tab navigasi utama pada halaman **Belajar** (`Belajar.tsx`) ke dalam kotak kartu putih serupa yang selaras dengan gaya kartu `Lindungi.tsx` dan `Beranda.tsx`.
      - Menghilangkan badge pill tingkat risiko (*Level Waspada*, *Risiko Tinggi*, *Risiko Sangat Tinggi*) di pojok kanan atas kartu modul beranda (`MODULE_SHORTCUTS`) untuk tampilan kartu yang lebih bersih dan minimalis.
      - Menghilangkan badge pill kategori (*Malware Android*, *Manipulasi Sosial*, dll.) pada kartu kamus dan halaman detail istilah (`Belajar.tsx`).
      - Menghapus tautan redundan *"Pelajari Modus >"* di baris atas kartu kamus istilah (`Belajar.tsx`) agar tata letak kartu menjadi ringkas dan terfokus pada nama istilah, penjelasan, serta tombol aksi *"Buka Detail →"* di bagian bawah.
      - Menghapus tautan menu *"Keterbatasan"* pada baris navigasi atas Landing Page publik (`Layout.tsx`) sesuai instruksi pengguna, menjaga tautan navbar terfokus pada konten utama (*Home*, *Tiga Pilar*, *Kasus & Modul*, *Cerita Rekan*, dan *FAQ*).
      - Menghapus label *kicker* redundan `"DAFTAR PERIKSA BERURUTAN"` di atas judul panduan tindakan darurat pada halaman **Panduan Lindungi** (`Lindungi.tsx`), dan menambahkan teks deskripsi pendukung ringkas langsung di bawah judul kondisi (`activeGuide.title`), seperti *"Pesan / Tautan Mencurigakan Baru Diterima (Belum Diklik)"*, agar hierarki tipografi lebih bersih, seimbang, dan informatif.
      - **Penyederhanaan Kotak Peringatan Darurat (`Lindungi.tsx`)**: Mengintegrasikan teks pesan penting pembekuan rekening (*"Catatan Penting: Pelaporan resmi bertujuan untuk memutus akses pelaku dan membekukan rekening penampung..."*) langsung berdampingan dengan ikon segitiga darurat (`AlertTriangle`), mengeliminasi pengantar judul yang berulang agar pesan mitigasi kritis langsung tersampaikan secara ringkas dan tegas.
      - Menyelaraskan tipografi header **Pintasan Simulator** di Dashboard Beranda (`Beranda.tsx`): menghapus ikon smartphone dalam kotak dan format huruf besar tracking lebar, menggantinya dengan gaya font judul clean (`text-base font-bold text-[#27374D] Pintasan Simulator`) yang serasi dengan kartu *Kamus & Modus Populer* dan *Activities*.
      - **Penyelarasan Indikator Status Baca Kartu Modul (`Beranda.tsx` & `Belajar.tsx`)**:
        - Memindahkan indikator status baca (*Belum dibaca* / *Sudah dibaca*) dari kotak pill terpisah di atas kartu ke baris bawah footer kartu, persis di pojok kiri berhadapan dengan tombol *"Baca Modul →"*.
        - Menghilangkan badge kotak/square berlatar belakang, menampilkannya sebagai teks bersih (*text only*) yang ringkas dan rapi (`font-medium text-[#526D82]` untuk belum dibaca, `text-emerald-600` untuk sudah dibaca).
    - **Penerapan Logo Resmi JagaRuang (Dual Mode: Biru untuk Cerah, Putih untuk Gelap)**:
      - Menghapus logo emas versi lama sesuai arahan pengguna.
      - Memproses dan menetapkan 2 varian logo perisai geometris resmi dengan pemotongan presisi (*cropped*) tanpa sisa padding kosong:
        - **Logo Biru (`/logo-blue.png`)**: Digunakan untuk permukaan posisi cerah/terang (Navbar Landing Page `bg-white`, Topbar Mobile `bg-white`, Modal Login `bg-white`, dan Favicon peramban `index.html`).
        - **Logo Putih (`/logo-white.png`)**: Digunakan untuk permukaan posisi gelap (Header Sidebar Dashboard `bg-[#526D82]`).
    - **Pembaruan Sandi Rahasia Keluarga & Rekomendasi 2x2 Sandi Campuran (Sandi.tsx)**:
      - Menghapus pill teks pengingat di dalam kotak tampilan sandi besar sesuai instruksi pengguna, menjaga tampilan visual sandi utama bersih dan fokus.
      - Menghapus tombol toggle visibilitas sandi (*Rahasiakan Sandi* / *Rahasiakan*) dari kotak sandi utama maupun header rekomendasi sesuai permintaan pengguna, sehingga teks sandi selalu terlihat jelas dan langsung dapat disalin atau ditetapkan.
      - Menghapus lencana pill berlebih (*[OPSI X]* dan *[Kapital + Angka di Tengah]*) pada item rekomendasi untuk tampilan minimalis.
      - Menata 4 rekomendasi sandi campuran ke dalam **tata letak grid 2x2 (2 atas, 2 bawah) dengan border radius tipis (`rounded-xl` / `rounded-lg`)**:
        - Memadukan huruf kapital, huruf kecil, dan angka (misalnya `Lentera79Samudra`, `kopi88Garuda`, `Elang2026Rembulan`, dan `99KasturiLembah`).
        - Dilengkapi tombol interaktif **Tetapkan Sandi** (berubah menjadi `[✓ Ditetapkan]` saat aktif) untuk menetapkan pilihan ke kotak utama dengan satu klik.
        - Tombol **Acak Opsi Baru** (`RefreshCw`) untuk menghasilkan 4 kombinasi campuran baru secara instan kapan saja.
      - **Accordion Kolapsibel SOP Tindakan Telepon Darurat**:
        - Mengubah 3 kartu statis panjang menjadi daftar accordion interaktif yang ringkas (`SOP_STEPS`), menghemat ruang vertikal halaman secara signifikan.
        - Menghilangkan badge kotak nomor hitam (`[ 01 ]`), menggantinya dengan penomoran teks sejajar langsung dengan judul (*"1. Jangan Langsung Panik"*, *"2. Tanyakan Sandi Rahasia"*, *"3. Tolak & Verifikasi Mandiri"*).
        - Menambahkan ikon panah kanan `>` (`ChevronRight`) di ujung kanan header yang berotasi 90° ke bawah saat baris diklik untuk membuka penjelasan langkah mitigasi.
    - **Pembaruan Layout 2-Kolom & Pengaturan Tingkat Kesulitan Tantangan Kilat (Belajar.tsx)**:
      - **Tata Letak 2 Kolom Seimbang**: Mengubah tata letak cover Tantangan Kilat dari tumpukan satu kolom menjadi grid 2 kolom (`grid-cols-1 lg:grid-cols-12 gap-6 items-stretch`).
      - **Kolom Kiri (Kartu Hero Gelap - `lg:col-span-5`)**:
        - Kartu biru dongker (`#27374D`) dengan header dinamis `TANTANGAN KILAT`, badge mode (`Mode Santai` / `Mode Standar` / `Mode Ekstrem`), judul waktu dinamis (`180 Detik`, `120 Detik`, `60 Detik`), tombol *"Mulai Sekarang"*, dan estimasi kecepatan menjawab. Menghapus 3 badge pill indikator (*Timer*, *10 Soal Uji Visual*, *Pilihan Yes / No*) agar tata letak kartu hero lebih rapi dan tingginya sejajar presisi dengan kartu di sebelah kanan.
        - **Pratinjau Visual Soal & Tipografi Header Viral "QUIZ KILAT"**:
          - Mengisi area tengah kartu hero yang sebelumnya kosong dengan wadah visual interaktif berlatar belakang pencahayaan ambient radial glow (sky, amber, indigo).
          - Menyajikan kartu tangkapan layar simulasi nyata dari soal kuis (SMS Phishing perbankan dengan tautan palsu dan WhatsApp kurir pengirim malware `.apk`) yang dimiringkan bersilangan (`-rotate-6` dan `rotate-6`) dengan respons hover dinamis.
          - Menempatkan tipografi display viral di tengah: judul besar bertingkat **QUIZ KILAT** dengan model font display viral modern (kombinasi icy gradient chrome `QUIZ` dan electric amber neon `KILAT` ber-drop shadow 3D) serta subtitle kapsul `10 Soal Cepat · Yes / No · Uji Refleksmu` tanpa lencana atas yang berlebih.
      - **Kolom Kanan (Kartu Terstruktur - `lg:col-span-7`)**:
        - **Aturan Main Tantangan**: Kartu putih terstruktur dengan grid 2x2 yang rapi dan teratur (1. 10 Pesan Berurutan, 2. Refleks Putusan Cepat, 3. Waktu Berjalan Mundur, 4. Evaluasi & Bedah Kasus).
        - **Pengaturan Tingkat Kesulitan Interaktif**: Wadah kartu putih pemilih durasi tantangan dengan 3 kartu opsi interaktif:
          - **Santai**: 180 Detik (~18 dtk/soal) untuk pemula yang ingin membaca detail pesan tanpa terburu-buru.
          - **Standar**: 120 Detik (~12 dtk/soal) sebagai mode rekomendasi default untuk menguji refleks insting alami.
          - **Ekstrem**: 60 Detik (~6 dtk/soal) tantangan kecepatan tinggi untuk keputusan instan tanpa ragu.
        - Memilih opsi kesulitan secara real-time memperbarui tampilan kartu hero di sebelah kiri dan meneruskan durasi waktu (`initialTime`) ke halaman tantangan (`KilatPage`), termasuk saat tombol ulangi tantangan ditekan.
    - **Pembaruan Tampilan Tantangan Kilat Berbasis Gambar & Pilihan Yes / No (Belajar.tsx)**:
      - **Tata Letak 2 Kolom Berdampingan Sesuai Sketsa**: Membagi layar soal drill menjadi 2 kolom seimbang (`grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch`):
        - **Kolom Kiri (`lg:col-span-7`)**: Kotak tangkapan layar simulasi realistis (`DrillVisualMockup` untuk SMS, WhatsApp, Email, Panggilan, dan Notifikasi) lengkap dengan tombol perbesar modal.
        - **Kolom Kanan (`lg:col-span-5`)**: Tersusun vertikal teratur terdiri dari 3 kartu: **1. Soal** (pertanyaan singkat berbobot), **2. Tombol Yes** (terindikasi manipulasi/penipuan), dan **3. Tombol No** (pesan resmi/aman/wajar) dengan indikator radio circle besar dan deskripsi konteks.
      - **Penegasan Top Bar Header (Timer & Nomor Soal)**:
        - Kotak kartu putih mandiri dengan tombol berbingkai *"Keluar dari Tantangan"*.
        - Lencana jumlah soal beraksen kontras: `Soal X / 10` lengkap dengan ikon `ListChecks`.
        - Tombol/badge timer hitungan mundur yang tegas dan tebal dengan font monospace, ikon jam amber, dan mode pulsa merah menyala otomatis saat waktu tersisa <= 20 detik.
      - **Tombol Zoom & Pratinjau Modal**: Tombol `Maximize2` di sudut kanan atas kartu visual untuk memperbesar pratinjau tangkapan layar dalam modal perbesaran responsif.
      - **Format Soal Singkat Bernomor**: Menampilkan pertanyaan singkat dan terarah per soal (contoh: *1. Apakah pesan SMS perbankan di atas terindikasi penipuan?*) dengan label teks bersih *"PERTANYAAN #X"* tanpa bingkai kotak/pill background.
      - **Tombol Navigasi Soal Sebelumnya & Setelahnya**:
        - Tombol berbingkai *"Soal Sebelumnya"* dengan ikon panah kiri `ChevronLeft` (nonaktif saat di soal 1).
        - Tombol kontras *"Soal Setelahnya"* dengan ikon panah kanan `ChevronRight`, serta tombol *"Selesai & Evaluasi"* saat berada di soal ke-10.
        - Tombol mini panah kiri/kanan di dalam lencana `Soal X / 10` pada top bar untuk penjelajahan cepat antar soal.
      - **Penjabaran Penuh Layar Hasil Evaluasi Tantangan Kilat**:
        - Mengubah wadah evaluasi dari kotak sempit di tengah (`mx-auto max-w-2xl`) menjadi bentang penuh (`w-full`) selaras dengan kartu header dan halaman utama.
        - Menghapus pembatas scroll sempit (`max-h-80 overflow-y-auto`) dan menjabarkan seluruh 10 kartu ulasan soal secara terbuka dalam grid responsif 2 kolom (`grid-cols-1 lg:grid-cols-2`).
        - Menambahkan hero card skor evaluasi 12-kolom dengan piala capaian, narasi hasil refleks, serta kartu ringkasan jumlah tepat vs kurang tepat.
        - Menyembunyikan bilah navigasi drill atas (*Top Bar Header Drill*: Keluar dari Tantangan, counter soal, dan timer) saat berada di layar hasil evaluasi agar hanya tampil pada saat sesi soal aktif berlangsung, menghindari kotak bar kosong di atas layar evaluasi.
        - Memperbarui bilah aksi atas dan bawah dengan tombol ulangi tantangan, buka kamus istilah, dan kembali ke beranda belajar.
    - **Pembaruan Desain & Tata Letak Halaman Cek Indikasi Tipuan Digital (Cek.tsx)**:
      - **Header & Tab Navigasi Minimalis**: Penambahan badge merek Siaga, tipografi judul yang tebal dan tegas, serta tab navigasi garis bawah (*Pesan*, *Tautan*, *Berkas & Izin*) dengan indikator aktif solid.
      - **Banner Peringatan Privasi Elegan**: Kotak pendar emas/amber lembut (`#FFFBF0`, border `#FDE68A`) dengan ikon perisai dan penegasan anonimitas data.
      - **Wadah Formulir & Tombol Aksi Kontras**: Kartu putih bersih dengan label uppercase terstruktur, penghitung karakter monospace, tombol primer hitam solid (`bg-black`), dan tombol sekunder outline bersih.
      - **Kartu Hasil Analisis Hero Donut Gauge**:
        - Kotak gelap arang (*charcoal* `#1E1E1E`) berbayang halus yang memuat pengukur donat SVG melingkar dengan angka skor presisi (`92 dari 100`) dan animasi rotasi halus.
        - Lencana tingkat risiko dinamis bersinar (*glow pill*) serta narasi ringkasan indikasi rekayasa sosial yang berbobot.
      - **Skala 4-Segmen Horizontal**: 4 bar status (*Aman*, *Waspada*, *Berisiko*, *Sangat Tinggi*) dengan pewarnaan aktif oranye/merah menyala dan label teks yang tegas.
      - **Pratinjau Teks & Kartu Tanda Peringatan Berjenjang**:
        - Kotak pratinjau teks font monospace dengan penyamaran data otomatis.
        - Daftar kartu peringatan bertingkat (`TINGKAT L4`, `TINGKAT L2`, dll.) dengan alasan kejanggalan (`Kenapa mencurigakan:`) dan kotak putih inset rekomendasi aksi (`Cara verifikasi:`).
        - Catatan penafian (*disclaimer*) transparan di bagian bawah.
    - **Pembersihan Total Emoticon & Emoji Slop (Anti-Slop Cleanliness)**:
      - Menghapus 100% karakter emoji, emotikon, dan simbol unicode slop di seluruh antarmuka web, komponen simulator, panduan tindakan, serta data skenario (total 38 kemunculan dieliminasi hingga tersisa 0).
      - Menghilangkan badge emoji pada halaman Keterbatasan (`⚡`, `🛡️`, `🔍`, `🧪`) dan menggantinya dengan teks clean berbobot profesional.
      - Menghilangkan emoji pada judul notifikasi dan prompt simulator di `FakeChatSimulator.tsx` (`🔒`, `⚠️`, `🛡️`, `📌`, `💬`).
      - Menghilangkan emoji pada broadcast warning template di `actionGuides.ts` (`🚨`).
      - Mengganti simbol teks mentah seperti unicode star `★` dan checkmark `✓`/`✕` di `Belajar.tsx` dan `Lindungi.tsx` dengan komponen ikon vektor SVG berstandar desain sistem (`<Star />`, `<Check />`, `<X />`).
      - Membersihkan sapaan dan balasan chat skenario di `fiveStepScenarios.ts` dari emoji berlebihan (`🙏`, `💐`, `📦`, `😅`, `💕`, `🥺`, `😢`, `🥹`, dll.) untuk menghasilkan gaya komunikasi yang serius, realistis, dan berkelas.
    - **Penyempurnaan & Kompaksi Baris Bawah Kartu Skenario Simulator (Belajar.tsx)**:
      - Menghapus label tumpuk uppercase `Estimasi` dan menyelaraskan baris durasi kartu skenario simulator agar identik dengan kartu modul: satu baris horizontal bersih (`<Clock /> ~{sc.duration}`) dengan warna slate (`text-[#526D82]`), tipografi font-medium, dan ukuran `text-[11px]` sejajar dengan tombol aksi kapsul `Mulai`.
      - Menambahkan `whitespace-nowrap` dan `leading-none` pada durasi `~2 Mnt` serta menyelaraskan warna ikon jam mikro menjadi abu-abu netral (`text-[#526D82]`) menggantikan warna oranye/amber agar serasi dengan palet desain sistem.
      - Menyesuaikan teks tombol kapsul aksi menjadi `Mulai` dengan ikon panah di lingkaran putih (persis referensi Nike), mencegah teks tombol terputus menjadi dua baris dan menjaga perbandingan ruang tetap proporsional pada grid 4 kolom.
    - **Penyederhanaan Lencana Media Kartu Skenario Simulator (Belajar.tsx)**:
      - Menghapus lencana rating `4.9` di pojok kanan atas kartu yang tidak relevan dengan skenario keamanan.
      - Memindahkan lencana nama kanal komunikasi (misal: `WhatsApp`) langsung ke pojok kiri atas sebagai satu-satunya lencana utama yang bersih dan berkelas (*clean frosted glass*).
    - **Pembaruan Cuplikan Obrolan Skenario & Bukti Gambar Pendukung Penipu (Belajar.tsx & FakeChatSimulator.tsx)**:
      - **Cover Kartu Simulator (`Belajar.tsx`)**:
        - Mengganti ilustrasi anime/komik lama dengan cuplikan obrolan percakapan realistis (`k1-chat-snippet.png`, `k2-chat-snippet.svg`, dst.) yang diambil langsung dari konteks cerita skenario.
        - Memperbarui gaya rendering cover media menjadi `object-cover object-top` tanpa bingkai latar belakang tebal agar menyerupai layar ponsel asli.
      - **Unggahan Gambar Pendukung Penipu (`FakeChatSimulator.tsx` & `fiveStepScenarios.ts`)**:
        - Memperluas skema data skenario (`briefing.supportingImage`) dan alur percakapan simulator sehingga pelaku penipuan tidak hanya mengirim teks polos ("chat tok"), melainkan juga mengunggah berkas foto bukti pendukung yang realistis:
          - Skenario K1: Foto Kartu Undangan Pernikahan Mewah (`k1-invitation.svg`) sebelum berkas `.apk`.
          - Skenario K2: Foto Resi Pengiriman Ekspedisi Gagal Kirim dengan Barcode (`k2-resi-kurir.svg`).
          - Skenario K3: ID Card Resmi Recruiter Global Media & Surat Tugas Freelance (`k3-loker-id.svg`).
          - Skenario K4: Dokumen Peringatan Anomali Transaksi Bank & Fraud Alert (`k4-bank-notice.svg`).
          - Skenario K5: Tangkapan Layar Portofolio Trading Kripto Profit Harian (`k5-trading-profit.svg`).
          - Skenario K6: Surat Notifikasi Darurat Penangguhan Akun Cloud Auth (`k6-voucher-hadiah.svg`).
          - Skenario K7: Surat Resmi Sertifikat Pemenang Gebyar Undian (`k7-security-warning.svg`).
          - Skenario K8: Katalog Flash Sale Gadget Cuci Gudang 70% Non-Rekber (`k8-flash-sale.svg`).
        - Menambahkan wadah visual foto lampiran dalam balon chat dengan efek hover zoom, lencana forensik, dan teks keterangan.
        - Menyediakan fitur interaktif **Modal Lightbox Forensik** sehingga pengguna dapat mengklik foto untuk memperbesar dan menganalisis tanda kejanggalan dokumen secara mendalam.
        - Menghilangkan simbol emoji fast-forward `⏩` yang tersisa pada tombol lewati percakapan.
    - **Penerapan Wallpaper Doodle Realistis pada Semua Fake Chat**:
      - Membuat pola doodle vektor seamless (`chat-doodle-pattern.svg`) dengan ikon-ikon khas percakapan pesan instan (gelembung chat, cangkir kopi, kaca pembesar, pesawat kertas, headphone, jam, gembok, surat, hati, perisai, kamera, nada musik, smartphone, bintang, awan, bohlam lampu, dan aksen garis halus) dengan opasitas rendah (10%) pada latar belakang hangat `#EFEAE2`.
      - Menerapkan wallpaper doodle pada area percakapan interaktif [`FakeChatSimulator.tsx`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/src/components/simulator/FakeChatSimulator.tsx) dengan pengulangan mulus (`backgroundRepeat: repeat`, `backgroundSize: 240px 240px`).
      - Menyematkan elemen pola doodle (`<pattern id="chatDoodle">`) langsung ke dalam seluruh cover cuplikan obrolan SVG skenario (`k1-chat-snippet.svg` hingga `k8-chat-snippet.svg`) di [`Belajar.tsx`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/src/pages/Belajar.tsx) dan [`Beranda.tsx`](file:///c:/Users/ASUS/Documents/code/JagaRuang/apps/web/src/pages/Beranda.tsx).
  - **Redesain Total Komposisi Visual 3D Hero (React Three Fiber & Drei)**:
    - Konsep tunggal terpadu: **"iPhone sebagai hero, orbit sebagai aksesori halus"**.
    - **Model Prosedural iPhone Midnight Space Black (`IPhone.tsx` & `hero3d.config.ts`)**: Bodi ponsel disesuaikan menjadi nuansa Midnight Space Black (`#0E1726`) elegan sesuai desain mockup, bezel tipis presisi, slit earpiece di bezel atas, dan tombol samping beraksen navy gelap (`#223763`).
    - **Tekstur Layar Dashboard Baru Ultra-HD (`dashboard-screen.png`)**: Menampilkan antarmuka mobile dashboard JagaRuang terbaru sesuai mockup (Notch lengkung atas, status bar 09:41, kartu Selamat Datang Kembali! dengan progres belajar 82%, modul horizontal Level Waspada & Level Aman, tip keamanan harian OTP, dan 5 tab navigasi bawah aktif).
    - **Perbaikan Sudut Layar 3D & Z-Layering Bezel (`IPhone.tsx`)**: Mengganti `planeGeometry` siku-siku dengan geometri ber-sudut melengkung `ShapeGeometry` (`shape.absarc`) presisi yang dipetakan UV `[0, 1]`. Memperbaiki Z-layering bezel dan layar (`screen` di `z = +0.006` berada tepat di depan permukaan bezel `z = +0.004`), menghilangkan glitch kotak hitam di tengah layar yang sebelumnya tertembus oleh permukaan depan bezel box.
    - **Penyesuaian Dimensi Kartu Welcome Back Dashboard (`Beranda.tsx`)**: Mengatur kartu banner Welcome Back dengan `flex-1 flex flex-col justify-center` serta padding lebih lega (`p-7 sm:p-8 lg:p-9`) dan ilustrasi lebih proporsional (`h-36 w-36 sm:h-40 sm:w-40`). Kotak banner kini memanjang turun mengisi ruang vertikal secara natural sehingga meniadakan sela kosong canggung di atas Modul Pembelajaran.
    - **Layar HTML Ultra-Tajam (`<Html transform>`)**: Tampilan antarmuka tajam dengan kontras tinggi (setara 11-12px final) menampilkan 3 elemen fokus: Header JagaRuang Mobile dengan status bar, Kartu Peringatan Kritis merah (`Undangan_Pernikahan.apk`), dan Kartu Status Hijau terverifikasi (`Tautan Aman`).
    - **Satu Cincin Orbit Halus (`Orbit.tsx`)**: Satu cincin torus tipis berbagi titik pusat sama `[0, 0, 0]` dengan HP, memotong depan dan belakang dengan *depth buffer* akurat (`depthWrite={false}` dan `renderOrder={1}` untuk mengatasi clipping menembus phone body), serta partikel bercahaya emerald yang mengitari cincin.
    - **Kartu Notifikasi Melayang Berkedalaman (`FloatingCards.tsx`)**: 3 kartu notifikasi melayang dengan parallax multi-layer (`occlude={false}` mencegah geometry occlusion) dengan posisi terkoreksi (card1 `[-1.95, 1.45, 0.7]`, card2 `[1.90, -1.35, 0.85]`, card3 `[1.85, 1.65, -0.45]`) agar tetap dalam frustum kamera.
    - **Optimasi Tekstur Layar & Proporsi Bezel (`IPhone.tsx` & `hero3d.config.ts`)**: Konfigurasi `wrapS`/`wrapT` ke `ClampToEdgeWrapping`, `repeat` dan `offset` tekstur layar dashboard, fallback plane `#DDE6ED` jika tekstur belum tersedia, serta proporsi bezel presisi (`screenWidth: 2.04`, `screenHeight: 4.44` menghasilkan bezel 0.07 per sisi).
    - **Container Bebas Clipping DOM (`Hero3DCanvas.tsx`)**: Menggunakan `overflow: visible` dan `isolation: isolate` langsung pada container utama tanpa `overflow-hidden` di chain parent.
    - **Pencahayaan Studio & Efek Refleksi (`HeroScene.tsx`)**: Menggunakan `<Lightformer>` prosedural (100% on-device tanpa unduhan eksternal), directional light dengan bayangan halus, serta `<ContactShadows>` di bawah HP.
    - **Interaktivitas & Aksesibilitas**: Animasi `Float` halus, tilt kursor responsif (maks ~15 derajat) dengan lerp damping, kepatuhan `prefers-reduced-motion` untuk pose statis, dan `IntersectionObserver` / visibility listener untuk auto-pause saat di luar layar.
    - **Konfigurasi Terpusat (`hero3d.config.ts`)**: Seluruh parameter visual, kecepatan, dan skala dikumpulkan di satu file konfigurasi.
    - **Code Splitting & Lazy Loading**: Chunk R3F dimuat secara asinkron dengan skeleton fallback (`Hero3DFallback.tsx`).
    - **FE-Simulator-Pacing**: Alur Percakapan Alami (*Realistic Fake Chat Pacing*) & Respon Interaktif:
      - **Pembukaan Bertahap Alami**: Chat tidak lagi langsung memunculkan seluruh pesan dan tombol sekaligus. Ditambahkan urutan pembuka bertahap (sapaan awal, tanda pengetikan aktif dengan teks dinamis `${senderName} sedang mengetik...`, lampiran berkas, dan pesan urgensi) dengan jeda waktu realistis layaknya aplikasi percakapan sesungguhnya.
      - **Respon Balasan Lawan Bicara Pasca-Pilihan**: Setelah pengguna memilih opsi tindakan (Opsi A, B, atau C), simulasi tidak langsung melempar kartu akhir secara terburu-buru. Lawan bicara (pelaku/bank/sistem) merespon secara aktif sesuai konteks jawaban pengguna (`attackerReply`) disertai indikator mengetik dan jeda membaca yang nyaman, sehingga alur cerita dapat dinikmati babak demi babak.
      - **Koreksi Balasan Lawan Bicara (`attackerReply`)**: Memastikan `replyMsg` selalu memakai sender `role` (pelaku/lawan bicara) sehingga balasan percakapan (seperti *"Sip mantap kak! Nanti kalau ada peringatan di layar HP..."*) selalu muncul sebagai balon chat WhatsApp asli di sisi kiri lengkap dengan avatar, bukan tertukar menjadi pesan sistem/gembok. Sementara itu, peringatan keamanan dari sistem operasi (OS) dirender terpisah sebagai kartu notifikasi sistem perangkat.
      - **Evaluasi Edukatif Mengalir di Aliran Chat**: Kartu konsekuensi dan evaluasi tindakan muncul alami di dalam alur riwayat pesan sebelum titik keputusan berikutnya atau layar penyelesaian dibuka.
      - **Penyederhanaan Layar Ending Simulator (Anti-Terbelit-belit & Bebas Desakan Redo)**: Menghapus 5 seksi debrief yang berlebihan (tabel kalkulasi komponen poin, daftar berulang tanda bahaya red flag, dan kutipan mentor bertumpuk). Menggantinya dengan 1 kartu hasil akhir yang ringkas & padat: Badge peringkat, skor akhir (/100), dan intisari evaluasi keputusan pengguna. Menghilangkan tombol oranye mencolok "Ulangi dari Awal" di bilah bawah; aksi default kini disesuaikan menjadi "Selesai & Kembali ke Daftar Kasus", tanpa ada timer countdown, auto-refresh, atau desakan mengulang terburu-buru. Pengguna bebas meninjau seluruh riwayat chat obrolan dengan santai.
      - **Kontrol Percepat Fleksibel (*Fast-Forward*)**: Menyediakan tombol "Lewati Mengetik ⏩" / "Tampilkan Langsung" agar pengguna atau penguji dapat melewati jeda waktu kapan saja tanpa hambatan.
      - **Stabilisasi Scroll Alami (*Scroll Containment & No-Bounce*)**: Menghapus penggunaan `scrollIntoView()` yang sebelumnya menyeret seluruh jendela/viewport halaman ke bawah, menonaktifkan CSS `scroll-smooth` pada kontainer chat yang memicu bug lompat ke atas (*reset to top glitch*) di peramban Chromium/Edge saat pengguna menggulir secara manual, mengintegrasikan `isNearBottomRef` agar posisi baca pengguna dihormati (tidak dipaksa melompat ke bawah saat pengguna sedang membaca pesan di atas), serta menambahkan `overscroll-contain` untuk isolasi gulir yang kokoh.
      - **Pembersihan Timer Aman (Memory-Safe)**: Mengintegrasikan `timeoutIdsRef` dan `clearAllTimeouts` untuk mencegah *race condition* atau kebocoran memori saat simulasi diulang atau berpindah skenario.
    - **Redesain Kartu Skenario Simulator Cover Sesuai Referensi Visual ([`Belajar.tsx`](../../apps/web/src/pages/Belajar.tsx))**:
      - Mengubah tampilan kartu skenario (K1 s.d K8) dari desain gelap kaku sebelumnya menjadi kartu modern estetik bersuasana hangat (*warm off-white* `#FAF8F5` dengan sudut lengkung halus `rounded-[28px]` dan *border* `#E7DFD5`).
      - Bagian atas kartu memuat kotak gambar `aspect-[4/3]` berbingkai melengkung `rounded-[20px]`, dilengkapi *floating badges* bergaya *frosted glass* di sudut kiri atas (ID Kasus `K1` dan kanal komunikasi) serta sudut kanan atas (rating `★ 4.9`).
      - Menyematkan indikator titik (*dot carousel indicator*) di dasar gambar persis referensi visual.
      - Bagian tengah memuat judul skenario yang tegas berkontras tinggi (`#27374D`) dan deskripsi singkat 2 baris (`#526D82`).
      - Baris bawah menampilkan estimasi durasi latih di sisi kiri dan tombol kapsul aksi *"Mulai Simulasi"* di sisi kanan lengkap dengan aksen lingkaran putih berisi ikon panah (`ArrowRight`).
    - **Pembaruan Desain & Mekanisme Simulator (Netralitas Tombol, 3 Pilihan, & Layout Organik)**:
      - **3 Pilihan Tindakan di Titik Keputusan Awal**: Mengembangkan titik keputusan awal pada seluruh skenario (K1 s.d K8) dari sebelumnya 2 pilihan menjadi **3 pilihan tindakan realistis** (Opsi A, Opsi B, dan Opsi C) mencakup reaksi impulsif, verifikasi identitas, dan tindakan pencegahan/pelaporan langsung.
      - **Tombol Keputusan 100% Netral (Bebas Spoiler Warna)**: Menghapus seluruh aksen warna hijau (`emerald`) dan merah (`rose`), badge petunjuk "Berisiko" vs "Aman & Verifikasi", serta teks indikator dalam label. Seluruh opsi kini disajikan dengan gaya visual netral seragam (`bg-white`, border abu-kebiruan `#9DB2BF`, dan badge netral `#DDE6ED` / `#27374D`) agar menguji insting objektif pengguna tanpa bias warna.
      - **Layout Organik & Lebih Hidup (Jangan Terlalu Rapi)**:
        - Mockup Layar Smartphone Nyata: Membungkai antarmuka chat dengan bezel smartphone modern, mock status bar (sinyal 5G, jam 09:41, indikator baterai), notch kamera, dan ekor balon percakapan alami.
        - Sentuhan Papan Kasus Detektif: Menyematkan badge berkas beraksen tape miring (`rotate-[-1deg]`), label washi-tape pada bilah keputusan ("Giliranmu Menentukan Tindakan"), serta mengubah drawer bukti investigasi menjadi memo tempel (*sticky note* kuning lembut bergaya catatan lapangan).
    - **Pembersihan Elemen UI & Penyelarasan Pintasan Simulator**:
      - Menghapus badge "Pilar Mitigasi & Tindakan JagaRuang" pada header halaman Panduan Lindungi ([`Lindungi.tsx`](../../apps/web/src/pages/Lindungi.tsx)).
      - Menghapus baris teks keunggulan ringkas ("100% On-Device di Browser" dan "Tautan Tidak Pernah Dibuka") pada Hero Section Beranda ([`Beranda.tsx`](../../apps/web/src/pages/Beranda.tsx)).
      - Menghapus teks petunjuk "*Model 3D interaktif Three.js — Gerakkan kursor atau sentuh untuk memutar" di bawah kanvas 3D smartphone Beranda ([`Beranda.tsx`](../../apps/web/src/pages/Beranda.tsx)).
      - Menghapus breadcrumb kecil "Belajar", badge skenario "8 Skenario (K1 - K8)" di cover Belajar, teks "· MIT-Week 2026" di footer, badge "Fitur Perlindungan Kloning Suara AI" di Sandi Keluarga, dan badge "Kasus K1 · Wajib" di Beranda sesuai instruksi pengguna.
      - Menyelaraskan kartu Pintasan Simulator di Beranda agar tingginya presisi sejajar dengan kartu Modul Pembelajaran, serta menyisipkan grafis pratinjau potongan chat WhatsApp K1 (`k1-chat-snippet.png`).
    - **Fitur Rekomendasi Pintar di Search Bar Top Header (`Layout.tsx`)**:
      - Ketika kotak pencarian diklik/difokuskan, dropdown interaktif muncul menampilkan rekomendasi eksplorasi terbatas maksimal 5 item.
      - Rekomendasi otomatis diacak kembali (*refresh*) setiap kali pengguna mengklik ulang (unclick & click) search bar, lengkap dengan tombol "Acak Lagi".
      - Menyajikan perpaduan 8 skenario Simulator (K1-K8), 12 Modul Pembelajaran, dan 10 Istilah Kamus dengan ikon dan badge warna yang jelas.
      - Mengetik teks pada kotak pencarian langsung menyaring hasil secara real-time dan mengarahkan langsung ke halaman target saat item dipilih.
      - Mengintegrasikan seluruh 8 kasus dari dokumen `Rangkaian_Simulator_Latih_JagaRuang.docx`:
        - K1: Undangan Pernikahan Digital.apk (WhatsApp · Wajib)
        - K2: Lihat Foto Paket (WhatsApp · Wajib)
        - K3: Loker Admin WFH Palsu (Media Sosial / DM · Wajib)
        - K4: Telepon Palsu Petugas Bank (Panggilan Suara / Vishing)
        - K5: Kenalan Online → Investasi Bodong (Dating App / Pig Butchering)
        - K6: Email Akun Akan Ditangguhkan (Email · Phishing)
        - K7: Giveaway Palsu (Media Sosial · Iming-iming Hadiah)
        - K8: Toko Online Fiktif (Marketplace / Belanja Palsu)
      - **Desain Kartu Showcase Minimalis (Cover)**: Grid 8 kartu (4 kolom desktop) dengan layout gambar:
        - Layer background: disiapkan untuk file `bg.png`/`bg.jpg` dengan efek sedikit blur (`blur-[2px]`) dan penurunan kecerahan (`brightness-75`).
        - Bagian tengah: slot gambar tengah (`k1.png` - `k8.png`) dengan placeholder ikon dan judul skenario sementara menunggu unggahan aset.
        - Setiap kartu tetap interaktif dan langsung membuka halaman simulasi khusus (`SimulatorPage`) dengan briefing, investigasi bukti, keputusan, debrief, dan kode penyelesaian `TRUST{...}`.
  - **Simulator Cerita Interaktif Meja Kerja (Visual Novel K1)**:
    - **Aset & Background Meja Kerja Cozy**: Menggunakan template latar meja kerja (`desk-template.jpg`) dengan cangkir kopi, laptop, tanaman sukulen, dan alat tulis sesuai referensi visual.
    - **Alur Rute 41 Kartu K1 (`DeskStorybookSimulator`)**: Memuat dan merender secara sekuensial 41 kartu cerita naratif (`1.jpg` hingga `40.jpg`, termasuk `22.2.jpg`) di atas buku catatan panggung tengah meja dengan rasio presisi (`aspect-[1696/2528]`, `h-[91%]`).
    - **Interaktivitas & Animasi Menarik**:
      - Transisi halaman buku halus dengan bayangan realistis (`shadow-[0_25px_50px_rgba(0,0,0,0.65)]`).
      - Hotspot interaktif tombol keemasan di atas teks "Lanjut →" dengan cincin pendar animasi pulsasi dan kilau bintang.
      - Zona klik sisi kiri/kanan kartu untuk navigasi cepat sebelumnya/selanjutnya.
      - Dukungan navigasi keyboard: panah kanan/spasi/enter (lanjut), panah kiri (kembali), 'f' (layar penuh), Esc (keluar).
      - Bilah kontrol atas mengambang: tombol kembali, info skenario, counter kartu, toggle putar otomatis (slideshow), reset, dan fullscreen.
      - Bilah kontrol bawah mengambang: tombol navigasi dan slider scrubber untuk melompat langsung ke kartu mana saja (1 - 41).
      - Preloading gambar pintar di latar belakang untuk pengalaman perpindahan halaman instan tanpa jeda.
    - **Perayaan Misi Selesai**: Modal popup piala kemenangan saat kartu ke-41 tercapai, tombol salin kode `TRUST{APK-UNDANGAN}`, dan pemicu notifikasi target capaian otomatis.
    - **Pratinjau Cover K1**: Kartu cover K1 menampilkan miniatur kartu buku catatan asli di atas meja kerja yang diburamkan halus.
  - **Penyelarasan Kartu Pintasan Simulator & Cuplikan Chat K1 ([`Beranda.tsx`](../../apps/web/src/pages/Beranda.tsx))**:
    - Menambahkan gambar cuplikan chat WhatsApp skenario K1 (`/simulator/k1-chat-snippet.png`) di antara header *"Pintasan Simulator"* dan teks judul *"Undangan Pernikahan APK"*.
    - Menyesuaikan tinggi/panjang kartu Pintasan Simulator ke bawah sehingga sejajar secara vertikal dengan baris Modul Pembelajaran di sisi kiri.
  - **Penyempurnaan Layar 3D iPhone & Integrasi Screenshot Beranda HD**:
    - **Penghapusan Badge**: Menghapus pill badge `✨ Sesi Aktif Digital Guardian` pada banner Welcome Back di `Beranda.tsx` sesuai permintaan antarmuka yang lebih bersih.
    - **Integrasi Screenshot Beranda HD (1170x2532)**: Layar 3D iPhone kini menampilkan tangkapan layar tampilan mobile Beranda JagaRuang secara proporsional presisi (rasio 1:2.165, pas dengan dimensi layar iPhone 2.06 x 4.46 tanpa distorsi/stretching).
    - **Ketajaman & Rendering Bebas Layar Hitam**: Menggunakan `useTexture` dengan 16x *Anisotropic Filtering*, *Linear Mipmapping*, serta material *emissive map* pendaran OLED terang sehingga layar tidak pernah hitam, tidak blur, dan tetap terbaca jernih di semua sudut rotasi Three.js.
    - **Penempatan Dynamic Island Presisi**: Kapsul Dynamic Island ditempatkan presisi di status bar atas (di antara jam 09:41 dan ikon baterai/wifi) sehingga tidak menutupi logo atau teks header aplikasi.
  - **Simulator Interaktif Fake Chat (Undangan Pernikahan Digital.apk - K1)**:
    - **Komponen Interaktif Baru (`FakeChatSimulator.tsx`)**: Mengubah skenario Undangan Pernikahan Digital APK menjadi simulasi percakapan chat interaktif sekuensial (gaya WhatsApp / visual novel messenger) lengkap dengan avatar lawan bicara, avatar pengguna, gelembung obrolan, kartu lampiran berkas APK asli, dan indikator mengetik.
    - **Alur Percabangan Ketat (Strict Branching Logic A, B, C)**:
      - **Pilihan A (Gegabah/Langsung Buka)**: Pengguna memasang berkas APK -> Pelaku mengarahkan untuk memberikan izin berbahaya -> Muncul kartu peringatan sistem Android (READ_SMS) -> Aplikasi mengalami force close -> Notifikasi SMS perbankan disadap dan saldo tersedot -> Debrief & Solusi Darurat A (Mode pesawat, blokir rekening bank, cabut SIM, factory reset).
      - **Pilihan B (Ragu/Minta Format Biasa)**: Pengguna menanyakan ekstensi .apk dan meminta foto/web -> Pelaku melancarkan manipulasi emosional (guilt-tripping) -> Sub-pilihan B1 (tetap menolak tegas -> pelaku memblokir) atau B2 (goyah -> infeksi) -> Debrief & Solusi B (Nol toleransi APK pernikahan, abaikan rasa sungkan, laporkan nomor).
      - **Pilihan C (Waspada Penuh/Verifikasi Mandiri)**: Pengguna menolak membuka berkas dan memverifikasi langsung -> Pelaku panik dan pesan centang satu -> Panggilan verifikasi mandiri (out-of-band) mengonfirmasi pencatutan nama -> Pengguna memblokir nomor -> Debrief & Solusi Sempurna C (Zero-Trust, verifikasi out-of-band, lapor ke aduannomor.id).
    - **Pengalaman Obrolan Utuh (Single Scrollable Chat)**:
      - Seluruh jalannya simulasi berada dalam 1 thread chat yang mengalir ke bawah seperti percakapan nyata.
      - Pengguna dapat melakukan scroll ke atas kapan saja untuk memeriksa pesan sebelumnya maupun pilihan yang telah diambil.
      - Tombol melayang cerdas "Pesan Terbaru" muncul otomatis saat pengguna menggulir ke atas untuk memudahkan kembali ke pesan paling akhir.
      - Tombol "Coba Pilihan Lain" memungkinkan pengguna mengulang dan bereksplorasi dengan alur pilihan lainnya tanpa harus keluar dari halaman.
    - **Responsif & Aksesibel di Mobile & Desktop**: Tata letak beradaptasi sempurna di layar ponsel (target sentuh >= 48px, padding fleksibel, tanpa overflow) maupun layar desktop (kontainer terpusat elegan dengan elevated shadow dan micro-interaction halus).
  - **Optimasi Performa 3D Scene (INP Reduksi dari 336 ms)**:
    - Menghilangkan kalkulasi berat *Environment Lightformer FBO* pada scene 3D yang sebelumnya membebani CPU main-thread, digantikan dengan pencahayaan direksional efisien.
    - Menambah ketebalan z-axis pada bodi smartphone agar tampil solid dan berisi (`phoneDepth: 0.30`).
    - Merotasi Dynamic Island ke posisi horizontal `[0, 0, Math.PI / 2]` di status bar atas.
  - **Penyederhanaan Dashboard & Redesain Kartu Pintasan Simulator (`Beranda.tsx`)**:
    - **Penghapusan Widget Kalender**: Menghapus kalender bulanan statis berserta kode/state penanganannya (`selectedCalendarTab`, `selectedDayInfo`) untuk merampingkan antarmuka dan mengurangi kepadatan visual.
    - **Penyelarasan Kartu Pintasan Simulator Aktif ke Baris Atas**: Menarik kotak pintasan simulator ke bagian atas kolom kanan dan mengubahnya menjadi *static card* mandiri yang selaras dengan banner "Welcome Back !" di sebelahnya (`rounded-3xl`, `border border-[#9DB2BF]/50`, `bg-white`, `p-6 sm:p-7`, `shadow-xs`).
    - **Detail Kartu Pintasan**: Menampilkan ikon smartphone, label badge "Kasus K1 · Wajib", judul "Undangan Pernikahan APK", deskripsi skenario, indikator durasi & tingkat dasar, serta tombol CTA "Lanjutkan Simulasi" yang terhubung langsung ke skenario interaktif (`/belajar?tab=simulator&scenario=k1`).
  - **Pembaruan Alur Simulasi K1–K8 (Fake Chat Bercabang 5 Titik Keputusan & 5 Ending)**:
    - **Dataset Komprehensif Skenario (`fiveStepScenarios.ts`)**: Menerapkan struktur state machine 5 titik keputusan berurutan (Keputusan 1 s.d 5) untuk seluruh skenario K1 hingga K8 (K1: Undangan APK, K2: Foto Paket, K3: Loker WFH, K4: Telepon Bank, K5: Kenalan Investasi, K6: Email Phishing, K7: Giveaway Palsu, K8: Toko Fiktif).
    - **Logika Alur 5 Keputusan**:
      - Keputusan 1: Aman -> lanjut ke Keputusan 2; Berisiko -> melompat ke Keputusan 3.
      - Keputusan 2: Aman -> **Ending A** (Jalur Aman Penuh, Skor 100 Guardian); Berisiko -> lanjut ke Keputusan 3.
      - Keputusan 3: Aman -> **Ending B** (Batal Instalasi / Berhenti Sebelum Berlanjut, Skor 85 Guardian); Berisiko -> lanjut ke Keputusan 4.
      - Keputusan 4: Aman -> **Ending C** (Tolak Izin SMS / Berhenti Sebelum Dampak Utama, Skor 60 Penjaga); Berisiko -> lanjut ke Keputusan 5.
      - Keputusan 5: Aman -> **Ending D** (Lapor Bank Cepat / Terlambat Sadar Tetap Bertindak, Skor 35 Pemula); Berisiko -> **Ending E** (Kerugian Penuh, Skor 10 Pemula).
    - **Investigasi 4 Bukti Red Flags**: Tombol inspeksi 4 tanda bahaya di top bar chat yang memberikan pemahaman awal (+40 poin).
    - **Debrief Lengkap & Nasihat Mentor Jaga**: Setiap ending memuat tabel rincian skor, narasi keputusan pemain, evaluasi red flags yang dipelajari, quote nasihat ideal dari mentor Jaga, dan tombol salin kode flag penyelesaian (`TRUST{...}`).
  - **Penyederhanaan Tampilan Modal Login (`LoginModal.tsx`)**:
    - Menghapus kotak info privasi on-device di bagian bawah modal login sesuai permintaan perampingan tampilan.
  - **Pembersihan & Perampingan Hasil Analisis Indikasi (`Cek.tsx`)**:
    - **Penghapusan Box Teks**: Menghapus kotak pratinjau *"TEKS YANG DIANALISIS"* pada kartu hasil analisis untuk mengeliminasi redundansi visual teks yang telah dimasukkan pengguna.
    - **Pembersihan Ikon Tanda Tanya**: Menghapus ikon lingkaran tanda tanya (`HelpCircle`) di samping label *"Kenapa mencurigakan:"* pada setiap kartu tanda peringatan bahaya, sehingga tampilan penjelasan menjadi lebih bersih dan fokus pada teks edukasi.
    - **Penghapusan Badge Tingkat L (Foto 1)**: Menghapus badge pill `TINGKAT L{level}` dari setiap kartu tanda peringatan bahaya.
    - **Tata Letak 2 Kolom Grid Kartu Peringatan (Foto 2)**: Mengubah kontainer daftar tanda bahaya dari deret vertikal panjang 1-kolom menjadi grid 2-kolom (`grid-cols-1 md:grid-cols-2`), sehingga kartu tampil sebagai kotak proporsional yang rapi dan terstruktur seimbang.
    - **Penghapusan Teks Mock Data (Foto 3)**: Menghilangkan teks pemberitahuan *"Mode data tiruan (mock) aktif — aman digunakan selama modul logika inti Backend sedang disiapkan."*.
    - **Penghapusan Footer Disclaimer (Foto 4)**: Menghilangkan kotak teks catatan kaki *"Hasil ini hanya indikator berbasis aturan dan bias kalimat..."*.
    - **Penegasan Tipografi INDIKASI RISIKO (Foto 5)**: Mempertebal tipografi header *"INDIKASI RISIKO"* menjadi `font-black text-slate-900` dengan kontras tinggi yang tegas dan tajam.
    - **Pembersihan Waktu Analisis (Foto 1 - `Cek.tsx`)**: Menghilangkan teks status *"Dianalisis baru saja"* pada header hasil analisis.
    - **Pembersihan Durasi & Penataan Tombol Mulai (Foto 2 & 3 - `Belajar.tsx`)**: Menghilangkan label estimasi waktu durasi (`~2 Mnt`) pada cover kartu skenario simulator serta memperpanjang dan memusatkan tombol aksi kapsul *"Mulai →"* (`w-full sm:w-[85%]`, `justify-center`) agar seimbang dan proporsional.
    - **Pembersihan Badge Kondisi Darurat (Foto 4 - `Lindungi.tsx`)**: Menghapus badge pill tingkat status (*Darurat*, *Waspada*, *Kritis*, *Pemulihan*, *Edukasi*) pada tombol opsi kondisi skenario darurat untuk tampilan minimalis dan seragam.
    - **Pembersihan Badge Urgensi Langkah (Foto 5 - `Lindungi.tsx`)**: Menghapus badge urgensi (*Wajib Segera*, *Hari Ini*, *Minggu Ini*) pada daftar langkah panduan mitigasi agar fokus langsung pada urutan tindakan.
    - **Pembersihan Status Terverifikasi (Foto 1 - `Lindungi.tsx`)**: Menghilangkan baris status *"Terverifikasi: {tanggal}"* beserta indikator bulatan hijau pada kartu portal kanal lapor resmi.
    - **Pembersihan Ikon Mikrofon Merah (Foto 2 - `Sandi.tsx`)**: Menghapus ikon `Mic` merah pada header sesi penjelasan AI Voice Cloning.
    - **Pembersihan Estimasi Waktu Baca (Foto 3 - `Belajar.tsx` & `Beranda.tsx`)**: Menghilangkan label durasi waktu baca (*"4 menit baca"*, dll.) pada kartu modul pembelajaran di Hub Belajar dan Beranda.
    - **Pembersihan Kategori & Tanggal Istilah (Foto 4 - `Beranda.tsx`)**: Menghilangkan baris meta *"Penipuan Web · 16 Nov 2026"* pada daftar Kamus & Modus Populer di Beranda.
    - **Pembersihan Footer Popover Notifikasi (Foto 5 - `NotificationDropdown.tsx`)**: Menghapus banner footer *"Notifikasi privasi disimpan 100% lokal di perangkatmu"* dari popover notifikasi.
    - **Pembersihan Footer Modal Lightbox (Foto 1 - `FakeChatSimulator.tsx`)**: Menghilangkan footer modal inspeksi bukti (*"Inspeksi Forensik Kasus"* dan nama berkas) agar tampilan gambar bersih.
    - **Pembersihan Badge Opsi Pilihan (Foto 2 - `FakeChatSimulator.tsx`)**: Menghapus badge pill *"Opsi A / B / C"* pada setiap kartu pilihan keputusan.
    - **Pembersihan Teks Pertimbangan (Foto 3 - `FakeChatSimulator.tsx`)**: Menghilangkan teks pertimbangan (*"Pertimbangan: '...' "*) di bawah label opsi keputusan.
    - **Pembersihan Petunjuk Langkah (Foto 4 - `FakeChatSimulator.tsx`)**: Menghilangkan teks bantuan *"Pilih langkah yang menurutmu paling tepat (tanpa petunjuk warna)"* di header pilihan keputusan.
    - **Pembersihan Sub-Banner Riwayat & Modus (Foto 5 - `FakeChatSimulator.tsx`)**: Menghilangkan bilah sub-banner atas (*ikon kompas + judul modus + "Scroll ke atas untuk memeriksa riwayat"*) sehingga jendela simulator langsung mengalir ke area percakapan chat.
    - **Pembersihan Header Berkas & Mode (Foto 1 - `FakeChatSimulator.tsx`)**: Menghapus pita label *"BERKAS #{id}"* dan badge *"Mode Simulasi Kasus Nyata"* di atas bilah navigasi simulator.
    - **Pembersihan Tombol & Drawer Bukti Investigasi (Foto 2 & 3 - `FakeChatSimulator.tsx`)**: Menghapus tombol *"4 Tanda Kejanggalan (+40 Poin)"* beserta drawer catatan investigasi 4 bukti red flags untuk menjaga antarmuka simulasi tetap imersif dan tidak membocorkan petunjuk kasus.
    - **Penyederhanaan Separator Tanggal Chat (Foto 4 - `FakeChatSimulator.tsx`)**: Menghilangkan teks imbuhan *"· Simulasi Kasus Nyata"* pada gelembung pemisah tanggal di thread percakapan chat, menyisakan label natural *"Hari ini"*.
    - **Pembersihan Badge Rank Hasil Ending (Foto 5 - `FakeChatSimulator.tsx`)**: Menghilangkan badge pill rank (*PEMULA*, *PENJAGA*, *GUARDIAN*) di atas judul evaluasi ending kasus.
    - **Pembersihan Ikon & Elemen Keterbatasan serta Sidebar (Foto 1 s.d 5 - `Keterbatasan.tsx` & `Layout.tsx`)**:
      - **Pembersihan Ikon Bagian Transparansi (Foto 1 - `Keterbatasan.tsx`)**: Menghapus ikon perisai hijau (`ShieldCheck`) pada judul Bagian 3 Transparansi Uji Analyzer agar tipografi judul rapi dan seragam.
      - **Pembersihan Sumber Dokumen (Foto 2 - `Keterbatasan.tsx`)**: Menghilangkan badge pill sumber *"Sumber: docs/backend/CHANGELOG.md"* di samping judul Transparansi Uji Analyzer.
      - **Pembersihan Ikon Penyimpanan Lokal (Foto 3 - `Keterbatasan.tsx`)**: Menghapus ikon hard drive (`HardDrive`) pada judul Bagian 4 Pengelolaan Penyimpanan Lokal (serta ikon `EyeOff` dan `AlertTriangle` pada Bagian 1 & 2 untuk konsistensi tipografi).
      - **Pembersihan Menu Keterbatasan di Sidebar (Foto 4 - `Layout.tsx`)**: Menghapus tautan menu *"Keterbatasan & Privasi"* pada bagian bawah sidebar navigasi desktop & mobile (tautan permanen tetap terjaga di footer aplikasi).
      - **Pembersihan Badge Kebijakan Header (Foto 5 - `Keterbatasan.tsx`)**: Menghilangkan badge pill *"Transparansi & Kebijakan Sistem"* dengan ikon gembok pada header banner halaman Keterbatasan & Kebijakan Privasi.
    - **Pembersihan Elemen Sandi & Keterbatasan (Batch Lanjutan)**:
      - **Pembersihan Teks Penyimpanan Sandi (Foto 1 - `Sandi.tsx`)**: Menghapus kalimat penjelasan *"Bila opsi ini diaktifkan, sandi akan disimpan di memori lokal (localStorage) browser ini."* pada opsi penyimpanan sandi rahasia keluarga.
      - **Penyelarasan Ikon Heading Privasi (Foto 2 & 4 - `Keterbatasan.tsx` & `Sandi.tsx`)**: Memastikan ikon heading `EyeOff` (Bagian 1) dan `AlertTriangle` (Bagian 2 pada `Keterbatasan.tsx` serta banner aturan emas pada `Sandi.tsx`) dihilangkan untuk tipografi judul yang bersih.
      - **Pembersihan Badge Highlight Pilar Privasi (Foto 3 - `Keterbatasan.tsx`)**: Menghilangkan badge pill highlight (*"Zero-Server Transmission"*, *"Inspeksi Pola String Aman"*, *"Inspeksi Ekstensi Saja"*, *"Masking Otomatis"*) pada 4 kartu pilar privasi di Hub Keterbatasan.
      - **Pembersihan Bulatan Titik Indikator (Foto 5 - `Keterbatasan.tsx`)**: Menghapus bulatan indikator warna (*amber, slate, rose, emerald*) di sebelah judul kartu heuristik Bagian 2 Keterbatasan Teknis.
    - **Pembersihan Elemen Header Keterbatasan & Kartu Modul Belajar (Batch Lanjutan 2)**:
      - **Pembersihan 4 Kapsul Prinsip Header (Foto 1 - `Keterbatasan.tsx`)**: Menghapus 4 badge pill (*"Tanpa Server Aplikasi"*, *"Zero Cookies & Analytics"*, *"22 Aturan Heuristik L1–L5"*, *"Contoh & Skenario Fiktif"*) dari banner header Keterbatasan & Kebijakan Privasi.
      - **Pembersihan Durasi Baca Modul (Foto 2 - `Belajar.tsx`)**: Menghilangkan indikator waktu durasi (*"{m.duration}"* dengan ikon jam `Clock`) di top bar halaman detail modul pembelajaran.
      - **Pembersihan Ikon Segitiga Peringatan Red Flags (Foto 3 - `Belajar.tsx`)**: Menghapus deretan ikon `AlertTriangle` amber pada daftar poin tanda kejanggalan (*Red Flags*) di halaman detail modul.
      - **Pembersihan Wadah Ikon Modul (Foto 4 - `Belajar.tsx` & `Beranda.tsx`)**: Menghilangkan wadah ikon pada setiap kartu modul pembelajaran di Hub Belajar dan Beranda (serta header halaman detail modul).
      - **Pembersihan Label Kategori Huruf Kapital (Foto 5 - `Belajar.tsx` & `Beranda.tsx`)**: Menghapus label kategori (*"DASAR KEAMANAN"*, *"CHECKLIST PRAKTIS"*, dll.) dari kartu modul pembelajaran di Hub Belajar dan Beranda.

  - **Pembaruan Komprehensif Seri Modul Pembelajaran Interaktif (Batch m2, m3, m4, m5, m6, m7)**:
    - **Modul m2: Anatomi Sebuah Penipuan (`ModulAnatomiPenipuanPage.tsx` & `modulAnatomiPenipuan.ts`)**:
      - Membedah alur 5 fase dengan nama berbahasa awam (*Mengumpulkan Data*, *Memancing*, *Membangun Cerita*, *Menjebak*, *Menghilang*) lengkap dengan titik intervensi konkret *"Cara Berhenti di Titik Ini"*.
      - Penandaan kesulitan: Fase 1–3 (*Masih Mudah Berhenti*) vs Fase 4–5 (*Kritis / Jalur Mitigasi*).
      - Studi kasus utuh interaktif langkah demi langkah: SMS paket tertahan fiktif -> link -> APK -> saldo terkuras.
      - 2 tab alur alternatif yang lebih pendek: Penipuan Hadiah/Undian Palsu dan Penipuan 'Ganti Nomor' Mengaku Keluarga.
      - Kamus istilah awam inline popover: *Baiting*, *Pretexting*, *File APK Berbahaya*, dan *Rekening Penampung (Nominee)*.
      - 6 red flags universal dan checklist 4 tindakan nyata mandiri tersimpan di `localStorage`.
      - Protokol darurat langkah berurutan jika terlanjur mentransfer dana atau memasang APK.
      - Latihan refleks cepat mini-kuis *"Ini Fase Berapa?"* dengan umpan balik instan.
    - **Modul m3: Keamanan di WhatsApp (`ModulPerKanalPage.tsx` & `modulPerKanal.ts`)**:
      - Menyediakan arsitektur generik per-kanal `ChannelModuleData` yang siap digunakan ulang untuk kanal lain.
      - Penjelasan pembuka *"Kenapa penipu menyukai WhatsApp?"* (kepercayaan tinggi, enkripsi privat, kemudahan menyamar).
      - Kartu komparasi berdampingan: *Kode SMS Registrasi (6 digit)* vs *PIN Verifikasi Dua Langkah (6 digit PIN rahasia)* dengan aturan emas mutlak bahwa kedua kode tidak boleh diberikan kepada siapa pun.
      - Panduan verifikasi lencana centang hijau resmi vs emoji centang buatan penipu di nama kontak.
      - 6 tab modus utama WhatsApp: Pencurian kode registrasi, Pembajakan via Linked Devices (WhatsApp Web QR), Berkas APK chat, Penyamaran identitas keluarga, Grup komisi tugas bodong, dan CS bank tiruan.
      - Audit Keamanan WhatsApp 2 Menit dengan panduan jalur menu setelan dan penanda `// TODO: verifikasi manual`.
      - Protokol darurat akun diambil alih / nomor dibajak dan kuis refleks *"Asli atau Palsu?"*.
    - **Modul m4: Keamanan Email & Phishing (`ModulEmailPhishingPage.tsx` & `modulEmailPhishing.ts`)**:
      - Pemisahan tegas dua kasus manipulasi teknis yang sering tertukar: *(a) Display Name Spoofing* vs *(b) Penyamaran URL dengan Karakter "@"* (di mana browser mengeksekusi domain setelah tanda "@").
      - Penjelasan teknik tingkat lanjut *Homograph Attack* (karakter Unicode Cyrillic yang identik visual dengan huruf Latin).
      - Penjelasan analogi awam indikator autentikasi teknis kotak masuk: SPF, DKIM, dan DMARC.
      - Simulasi visual mock email phishing interaktif dengan penyorotan anotasi langsung (*Display name palsu*, *Urgensi sempit*, *Jebakan karakter '@'*, dan *Lampiran berbahaya .html*).
      - Kuis perbandingan domain gaya picoCTF *"Mana yang Palsu?"* dan interactive checklist dengan lencana penghargaan.
    - **Modul m5: Waspada Telepon Mengaku Bank (`ModulTeleponBankPage.tsx` & `modulTeleponBank.ts`)**:
      - Banner kontras tinggi aturan emas: *"BANK RESMI TIDAK PERNAH MEMINTA KODE OTP, PIN, ATAU 3 ANGKA CVV/CVC"*.
      - Diagram alur teknologi *Caller ID Spoofing* (Laptop VoIP pelaku -> Gateway VoIP / SIP Trunk -> Nomor bank palsu di layar ponsel korban).
      - Aturan wajib verifikasi independen (nomor fisik di kartu ATM, aplikasi mobile banking resmi, bukan menelepon balik nomor dari SMS/Caller ID pemanggil).
      - Penjelasan varian modern *WhatsApp Call* dan *Video Call Verifikasi Akun*.
      - Penjelasan cara kerja aplikasi pelaporan komunitas (*Truecaller / GetContact*) beserta catatan batas privasi data.
      - Simulasi percakapan telepon bertahap bergaya picoCTF dengan pilihan keputusan dan umpan balik langsung.
    - **Modul m6: 10 Ciri Pesan Phishing yang Wajib Dicek (`ModulSepuluhCiriPage.tsx` & `modulSepuluhCiri.ts`)**:
      - Modul Capstone yang mengompilasi 10 ciri red flag universal ke dalam 3 bagian collapsible (*Tekanan Emosional*, *Indikator Teknis & Tautan*, *Pola Bahasa*).
      - Penegasan objektif domain berakhiran *.xyz, .top, .vip* sebagai faktor pendukung kecurigaan (bukan bukti tunggal).
      - Aturan ambang batas: 1 Ciri = Waspada; 2 Ciri atau Lebih = Sangat Mencurigakan & Wajib Verifikasi Mandiri.
      - Tantangan Capstone 5 pesan campuran lintas kanal (Email, WhatsApp, SMS) dengan evaluasi skor dan refleksi diagnostik ciri yang paling sering terlewat.
      - Checklist terhubung langsung dengan fitur aktif `Cek Pesan & File` (`/cek`).
    - **Modul m7: Checklist Sebelum Transfer (`ModulSebelumTransferPage.tsx` & `modulSebelumTransfer.ts`)**:
      - Ditujukan untuk masyarakat awam dan lansia dengan bahasa lugas: *"Sebelum pencet 'Kirim', cek 5 hal ini dulu"*.
      - Standardisasi terminologi: Menggunakan istilah *Rekening Penampung / Rekening Pinjaman* (menggantikan nominee).
      - Penjelasan konkret manipulasi kode unik transfer (nominal tiket otomatis top-up e-wallet penipu).
      - Nuansa red flag nama pemilik rekening berbeda dari nama toko (bisa terjadi pada UMKM sah, disarankan verifikasi).
      - 5 modus transaksi tambahan: Bukti transfer struk editan, Ajakan pindah ke WhatsApp dari marketplace, Penipuan COD barang kosong, Kode unik e-wallet, dan Harga jauh di bawah pasar.
      - Stepper alur jebakan transaksi (Tekanan -> Rekening asing -> Transfer -> Lenyap).
      - Simulasi chat WhatsApp interaktif dengan kemampuan mengetuk gelembung mencurigakan.
      - Studi kasus fiktif kamera murah, protokol darurat 4 langkah berurutan, FAQ interaktif, kuis refleks, serta tombol *"Bagikan Ringkasan ke Keluarga"*.

    - **Modul m8: Pola Modus Penipuan Terbanyak di Indonesia (`ModulPolaModusNasionalPage.tsx` & `modulPolaModusNasional.ts`)**:
      - Menghapus persentase lama yang tidak valid (38/27/21/14) dan menggantinya dengan dataset terstruktur resmi IASC / Satgas PASTI OJK (`asOf`, `period`, `source`, `sourceUrl`, `verified: false`).
      - Seluruh persentase dihitung dinamis oleh fungsi kode (`calculateDynamicPercentage`) dari jumlah laporan mentah terhadap total laporan periode yang sama.
      - Hero stats angka besar: Total Laporan (702.342 per 30 Sep 2026) dan Dana Diamankan (Rp 825,2 Miliar per 31 Okt 2026) dengan animasi counter yang menghormati `prefers-reduced-motion`.
      - Accordion prinsip *"Cara Membaca Angka Ini"* (Laporan ≠ Seluruh Kasus, Laporan ≠ Kerugian, Angka Bergerak Tiap Periode, Alasan/Cerita vs Cara/Teknik).
      - Kuis pembuka personal *"Pernah Menerima yang Mana?"* yang menyorot kartu modus relevan secara dinamis dan tersimpan di preferensi pengguna.
      - Diagram batang horizontal interaktif yang membedakan visual dan pola *"Alasan/Cerita"* (Belanja, Investasi, Kerja) vs *"Cara/Teknik"* (Fake Call/Impersonation), lengkap dengan tabel alternatif teks `sr-only` untuk pembaca layar (screen reader).
      - 4 kartu penjelasan modus teratas: Transaksi Belanja (77.740 laporan), Impersonation/Fake Call (47.269 laporan), Investasi Bodong (26.649 laporan), dan Penipuan Kerja (23.910 laporan), masing-masing dengan contoh pesan anonim, red flags khusus, cara berhenti, studi kasus fiktif, serta tombol *"Bagikan ke Keluarga"*.
      - Kartu transversal khusus *"Teknik: APK Berbahaya"* yang menegaskan bahwa file APK adalah alat eksekusi pencuri SMS OTP yang bisa menyusup ke modus mana pun.
      - Seksi khusus modus berbasis AI (1.379 laporan s.d. Juni 2026) dan aduan entitas keuangan ilegal Satgas PASTI (25.875 aduan) dengan penegasan pemisahan taksonomi dari data IASC.
      - Red flags umum dengan perbaikan sinyal lemah akun jualan menutup komentar, latihan refleks *"Modus yang Mana?"*, interactive checklist 5 tindakan nyata, serta SOP darurat korban dengan penjelasan 2 jalur pelaporan.
      - Validasi integritas dataset saat build (`validateModusData`) yang menggagalkan build bila ada set data tanpa `asOf` atau `source`.
