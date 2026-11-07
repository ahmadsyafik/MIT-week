// Data terstruktur untuk Modul Pembelajaran m8: Pola Modus Penipuan Terbanyak di Indonesia
// Sumber resmi: Rangkuman publikasi Satgas PASTI / Indonesia Anti-Scam Centre (IASC) OJK
// Target: Masyarakat awam Indonesia. Semua persentase dihitung dinamis oleh kode dari jumlah laporan mentah.

export interface DataEntryMeta {
  asOf: string; // Format YYYY-MM-DD
  period: string; // Rentang pelaporan
  source: string; // Nama lembaga + judul publikasi
  sourceUrl: string; // URL publikasi resmi
  verified: boolean; // Selalu false sampai diverifikasi manual oleh pengembang
}

export interface IascOverviewItem extends DataEntryMeta {
  totalLaporan?: number;
  danaDiblokirNominal?: number;
  danaDiblokirDisplay?: string;
  danaKorbanDiamankanNominal?: number;
  danaKorbanDiamankanDisplay?: string;
  notes?: string;
}

export interface TopModusItem {
  id: string;
  rank: number;
  name: string;
  categoryType: "alasan" | "teknik";
  categoryTypeLabel: string;
  laporanCount: number; // Jumlah mentah laporan (bukan kerugian)
  colorClass: string;
  patternLabel: string;
  shortSummary: string;
  sampleMessage: string;
  sampleSender: string;
  specificRedFlags: string[];
  howToStop: string;
  fictionalCase: {
    title: string;
    story: string;
    lesson: string;
  };
}

export interface AiModusReport extends DataEntryMeta {
  totalLaporan: number;
  breakdownSummary: string[];
  defenseTips: string[];
}

export interface IllegalEntitiesReport extends DataEntryMeta {
  totalPengaduan: number;
  institutionName: string;
  scopeSummary: string;
  differenceFromIasc: string;
}

export interface ModulPolaModusData {
  id: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  opener: {
    quote: string;
    explanation: string;
  };
  howToReadData: {
    title: string;
    guidelines: { title: string; desc: string }[];
  };
  iascOverviewEntries: IascOverviewItem[];
  modusDataset: {
    meta: DataEntryMeta;
    totalLaporanRef: number; // 579459 per 31 Mei 2026
    items: TopModusItem[];
    notes: string;
  };
  specialApkTechnique: {
    title: string;
    subtitle: string;
    explanation: string;
    realRisks: string[];
    defenseAdvice: string;
  };
  aiScams: AiModusReport;
  illegalEntities: IllegalEntitiesReport;
  generalRedFlags: {
    id: string;
    icon: "transfer" | "price" | "deposit" | "apk" | "caller";
    title: string;
    severity: "merah" | "kuning";
    severityLabel: string;
    explanation: string;
    isWeakSignal?: boolean;
    weakSignalNote?: string;
  }[];
  interactiveChecklist: {
    id: string;
    action: string;
    reason: string;
    verificationNote?: string;
  }[];
  emergencySteps: {
    order: number;
    title: string;
    urgency: string;
    action: string;
    twoReportingChannels: string;
    verificationNote?: string;
  }[];
  quizPractice: {
    id: number;
    scenario: string;
    sender: string;
    options: {
      categoryName: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  }[];
  personalDiagnosticQuiz: {
    question: string;
    options: {
      id: string;
      label: string;
      targetModusId: string;
    }[];
  };
  takeaway: string;
  sourcesList: {
    title: string;
    organization: string;
    period: string;
    url: string;
    verified: boolean;
  }[];
  disclaimer: string;
}

export const MODUL_POLA_MODUS_NASIONAL: ModulPolaModusData = {
  id: "m8",
  title: "Pola Modus Penipuan Terbanyak di Indonesia",
  readingTime: "5-6 menit baca",
  lastUpdated: "2026-11-07",
  opener: {
    quote:
      "Angka ini bukan untuk menakut-nakuti. Ia menunjukkan modus apa yang paling sering dilaporkan masyarakat, supaya kamu tahu persis apa yang perlu diwaspadai di sekitarmu.",
    explanation:
      "Berdasarkan rangkuman data resmi Indonesia Anti-Scam Centre (IASC) dan Satgas PASTI, data ini mencerminkan laporan yang masuk, bukan seluruh kasus di lapangan, dan bukan nilai total kerugian.",
  },
  howToReadData: {
    title: "Panduan Penting Cara Membaca Angka Statistik Ini",
    guidelines: [
      {
        title: "Jumlah Laporan ≠ Seluruh Kasus di Indonesia",
        desc: "Banyak korban penipuan yang enggan melapor karena malu, nominalnya kecil, atau tidak tahu kanal resmi pelaporan. Angka ini adalah fenomena puncak gunung es.",
      },
      {
        title: "Jumlah Laporan ≠ Nilai Kerugian Finansial",
        desc: "Satu laporan bisa melibatkan kerugian puluhan ribu rupiah (misal pulsa), atau ratusan juta rupiah (investasi bodong). Jangan menyamakan jumlah aduan dengan besaran kerugian.",
      },
      {
        title: "Angka Bergerak & Berubah Setiap Periode",
        desc: "Sindikat penipuan selalu mengganti tema cerita sesuai momentum (Ramadan, pemilu, diskon belanja akhir tahun). Selalu periksa tanggal 'Data per' di setiap grafik.",
      },
      {
        title: "Alasan/Cerita Berbeda dengan Teknik/Alat",
        desc: "Belanja dan kerja adalah 'alasan' penipu mengajak bicara. Sedangkan telepon palsu dan file APK adalah 'alat teknis' untuk mengeksekusi pencurian.",
      },
    ],
  },
  // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
  iascOverviewEntries: [
    {
      asOf: "2026-05-31",
      period: "22 Nov 2024 - 31 Mei 2026",
      source: "Satgas PASTI / Indonesia Anti-Scam Centre (IASC)",
      sourceUrl: "https://iasc.ojk.go.id", // // TODO: verifikasi manual URL publikasi resmi
      verified: false,
      totalLaporan: 579459,
      notes: "Total akumulasi laporan sejak peluncuran IASC (22 Nov 2024)",
    },
    {
      asOf: "2026-08-31",
      period: "22 Nov 2024 - 31 Agu 2026",
      source: "Satgas PASTI / Indonesia Anti-Scam Centre (IASC)",
      sourceUrl: "https://iasc.ojk.go.id", // // TODO: verifikasi manual URL publikasi resmi
      verified: false,
      totalLaporan: 668441,
      danaDiblokirNominal: 771200000000,
      danaDiblokirDisplay: "Rp 771,2 miliar",
      notes: "Dana hasil kejahatan yang berhasil dibekukan di rekening penampung",
    },
    {
      asOf: "2026-09-30",
      period: "22 Nov 2024 - 30 Sep 2026",
      source: "Satgas PASTI / Indonesia Anti-Scam Centre (IASC)",
      sourceUrl: "https://iasc.ojk.go.id", // // TODO: verifikasi manual URL publikasi resmi
      verified: false,
      totalLaporan: 702342,
      notes: "Pembaruan total laporan kuartal ketiga 2026",
    },
    {
      asOf: "2026-10-31",
      period: "22 Nov 2024 - 31 Okt 2026",
      source: "Satgas PASTI / Indonesia Anti-Scam Centre (IASC)",
      sourceUrl: "https://iasc.ojk.go.id", // // TODO: verifikasi manual URL publikasi resmi
      verified: false,
      danaKorbanDiamankanNominal: 825200000000,
      danaKorbanDiamankanDisplay: "Rp 825,2 miliar",
      notes: "Total dana korban yang berhasil diamankan dari rekening penampung penipu",
    },
  ],
  modusDataset: {
    meta: {
      asOf: "2026-05-31",
      period: "22 Nov 2024 - 31 Mei 2026",
      source: "Publikasi Data Penanganan Kejahatan Keuangan IASC / Satgas PASTI",
      sourceUrl: "https://iasc.ojk.go.id", // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
      verified: false,
    },
    totalLaporanRef: 579459, // Basis kalkulasi persentase pada periode yang sama (31 Mei 2026)
    notes:
      "Empat modus dengan laporan terbanyak yang kami verifikasi; rincian lengkap tersedia di publikasi sumber. // TODO: ambil rincian lengkap dari publikasi resmi",
    items: [
      {
        id: "belanja",
        rank: 1,
        name: "Penipuan Transaksi Belanja Online",
        categoryType: "alasan",
        categoryTypeLabel: "Alasan / Cerita Skenario",
        laporanCount: 77740, // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
        colorClass: "bg-blue-600",
        patternLabel: "Skenario Transaksi",
        shortSummary:
          "Menawarkan produk elektronik, pakaian, atau barang lelang berharga miring di media sosial, lalu meminta transfer langsung ke rekening pribadi di luar marketplace.",
        sampleMessage:
          "\"iPhone 15 Pro Max Garansi Resmi iBox cuma Rp4.500.000 promo cuci gudang sitaan bea cukai! Minat langsung WA ke [nomor], tidak melayani transaksi e-commerce karena limit pajak.\"",
        sampleSender: "Akun Instagram/Facebook toko online fiktif dengan ulasan editan",
        specificRedFlags: [
          "Harga barang jauh di bawah standar pasar (diskon > 60% tanpa alasan masuk akal).",
          "Menolak pembayaran via rekening bersama (escrow) marketplace resmi.",
          "Setelah transfer pertama, meminta 'biaya asuransi kargo' atau 'surat lelang' tambahan.",
        ],
        howToStop:
          "Hanya bertransaksi di dalam aplikasi e-commerce resmi. Jika penjual menolak sistem rekening bersama, batalkan pembelian seketika.",
        fictionalCase: {
          title: "Studi Kasus: Diskon Ponsel Murah Berujung Pemblokiran Kontak",
          story:
            "Doni (26 tahun) tergiur iklan ponsel diskon 70% di media sosial. Penjual mengaku distributor resmi dan meminta transfer Rp3.200.000 ke rekening perorangan. Setelah transfer, penjual meminta tambahan Rp900.000 untuk 'asuransi pengiriman'. Begitu Doni menolak, kontak WhatsApp-nya langsung diblokir.",
          lesson:
            "Penjual resmi tidak pernah keberatan menggunakan platform e-commerce yang memiliki fitur garansi uang kembali.",
        },
      },
      {
        id: "fake-call",
        rank: 2,
        name: "Impersonation / Panggilan Telepon Palsu",
        categoryType: "teknik",
        categoryTypeLabel: "Cara / Teknik Eksekusi",
        laporanCount: 47269, // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
        colorClass: "bg-amber-600",
        patternLabel: "Teknik Penyamaran",
        shortSummary:
          "Pelaku menelepon dengan memalsukan nomor pemanggil (Caller ID Spoofing) agar layar ponsel korban menampilkan nama atau nomor resmi call center bank.",
        sampleMessage:
          "\"Selamat siang Bpk/Ibu, sistem keamanan kami mendeteksi transaksi transfer mencurigakan Rp7.500.000 di akun Anda. Sebutkan 6 digit kode pembatalan yang kami kirim ke SMS Anda sekarang!\"",
        sampleSender: "Panggilan telepon dengan nomor pemanggil mirip 1500xxx atau nomor seluler biasa",
        specificRedFlags: [
          "Penelepon meminta kode OTP, PIN m-Banking, atau nomor CVV kartu debit/kredit.",
          "Menciptakan kepanikan darurat dan melarang memutus sambungan telepon.",
          "Menyuruh korban menghubungi nomor polisi atau OJK palsu yang didiktekan pelaku.",
        ],
        howToStop:
          "Tutup telepon seketika. Hubungi nomor call center bank resmi yang tertera di balik kartu ATM fisik milikmu.",
        fictionalCase: {
          title: "Studi Kasus: Telepon Mengaku Petugas Bank Pembatalan Transaksi",
          story:
            "Ibu Rini (48 tahun) panik saat ditelepon petugas yang mengaku dari kantor pusat bank. Layar ponselnya tertulis 'Bank Call Center'. Pelaku mendiktekan bahwa ada transaksi mencurigakan dan meminta 6 digit angka SMS untuk pembatalan. Setelah kode dibacakan, saldo tabungan Ibu Rini terkuras Rp12.000.000.",
          lesson:
            "Bank resmi tidak pernah meminta kode OTP atau PIN. Nomor di layar ponsel bisa dipalsukan dengan teknologi internet VoIP.",
        },
      },
      {
        id: "investasi",
        rank: 3,
        name: "Penipuan Investasi Bodong",
        categoryType: "alasan",
        categoryTypeLabel: "Alasan / Cerita Skenario",
        laporanCount: 26649, // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
        colorClass: "bg-emerald-600",
        patternLabel: "Skenario Keuangan",
        shortSummary:
          "Menjanjikan keuntungan harian pasti (fixed return) tinggi tanpa risiko dari trading kripto, forex, atau titip dana emas abal-abal.",
        sampleMessage:
          "\"Paket VIP Profit Harian: Modal Rp1.000.000 dapat untung Rp400.000 per hari (40% profit)! Dijamin tanpa risiko rugi. Daftar di [tautan] sekarang sebelum kuota penuh.\"",
        sampleSender: "Admin grup Telegram atau WhatsApp yang memamerkan bukti transfer fiktif",
        specificRedFlags: [
          "Menjanjikan imbal hasil pasti tanpa ada risiko kerugian sama sekali.",
          "Meminta setoran uang ke rekening perorangan, bukan rekening penampung berizin OJK/Bappebti.",
          "Saat ingin menarik keuntungan (withdraw), korban dimintai setoran 'pajak pencairan'.",
        ],
        howToStop:
          "Cek legalitas entitas di situs resmi OJK (ojk.go.id) atau Bappebti. Pahami prinsip keuangan: high return pasti dibarengi high risk.",
        fictionalCase: {
          title: "Studi Kasus: Terjebak Skema Titip Dana VIP Kripto",
          story:
            "Agus (32 tahun) diajak kenalan online masuk ke grup titip dana kripto. Di awal, setoran Rp500.000 berhasil ditarik beserta keuntungan Rp150.000. Yakin aman, Agus menyetor Rp20.000.000. Saat hendak menarik dana, admin menuntut pajak Rp5.000.000. Begitu ditolak, grup dibubarkan dan admin menghilang.",
          lesson:
            "Keuntungan di awal sengaja diberikan dari uang korban sendiri (skema ponzi) untuk memancing setoran yang jauh lebih besar.",
        },
      },
      {
        id: "kerja",
        rank: 4,
        name: "Penipuan Lowongan Kerja / Komisi Tugas",
        categoryType: "alasan",
        categoryTypeLabel: "Alasan / Cerita Skenario",
        laporanCount: 23910, // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
        colorClass: "bg-purple-600",
        patternLabel: "Skenario Karir",
        shortSummary:
          "Menawarkan pekerjaan sampingan fleksibel dari rumah (WFH) hanya dengan like video YouTube atau ulas produk e-commerce, namun kemudian menuntut deposit modal bertingkat.",
        sampleMessage:
          "\"Loker Part-Time Online: Tugas follow toko dan like video, gaji Rp300.000 - Rp800.000 per hari. Tanpa syarat pengalaman, langsung dibayar hari ini. Hubungi admin WA [nomor].\"",
        sampleSender: "Nomor luar negeri virtual (+1, +44, +234) via WhatsApp atau Telegram",
        specificRedFlags: [
          "Syarat penerimaan kerja instan tanpa wawancara atau seleksi kualifikasi.",
          "Diminta membayar uang deposit pribadi untuk membuka akses 'tugas komisi berbayar tinggi'.",
          "Daftar anggota grup lain tampak seperti akun bot yang mengirim pesan seragam.",
        ],
        howToStop:
          "Perusahaan resmi tidak pernah meminta pelamar kerja membayar deposit modal untuk bekerja. Jika diminta deposit, segera tinggalkan grup.",
        fictionalCase: {
          title: "Studi Kasus: Modus Tugas Komisi Review Video Berbayar",
          story:
            "Siti (23 tahun) mencari kerja sampingan dan menerima tawaran like video. Tiga tugas pertama berhasil menghasilkan Rp45.000. Lalu admin memberi 'Tugas Khusus VIP' dengan syarat deposit Rp2.000.000 untuk dapat komisi Rp1.000.000. Setelah deposit, sistem dinyatakan 'error' dan Siti dipaksa deposit Rp5.000.000 lagi.",
          lesson:
            "Pekerjaan sejati membayar keringatmu, bukan menagih uangmu. Begitu ada syarat deposit, itu adalah penipuan berantai.",
        },
      },
    ],
  },
  specialApkTechnique: {
    title: "Teknik Khusus: File APK Berbahaya (Malware Pencuri OTP)",
    subtitle: "Teknik Transversal yang Bisa Menyusup ke Modus Mana Pun",
    explanation:
      "File APK (.apk) bukanlah nama modus penipuan yang berdiri sendiri, melainkan alat/teknik berbahaya. Pelaku dapat menyelipkan file APK ini ke dalam berbagai cerita: kurir paket mengabarkan barang rusak, undangan pernikahan digital, surat tilang kepolisian, hingga formulir lamaran kerja palsu.",
    realRisks: [
      "Menyadap seluruh SMS masuk di ponselmu, termasuk kode OTP m-Banking dan perbankan digital.",
      "Mengambil alih izin aksesibilitas (Accessibility Service) sehingga layar ponsel bisa dikendalikan penipu dari jarak jauh.",
      "Menguras saldo rekening dan dompet digital tanpa memunculkan notifikasi di layar korban.",
    ],
    defenseAdvice:
      "Hanya unduh dan pasang aplikasi dari toko resmi Google Play Store atau Apple App Store. Kunci opsi 'Pasang Aplikasi Tidak Dikenal' (Install Unknown Apps) di setelan ponselmu.",
  },
  aiScams: {
    asOf: "2026-06-30",
    period: "1 Jan 2026 - 30 Jun 2026",
    source: "Laporan Khusus Penanganan Kejahatan Berbasis AI - Satgas PASTI",
    sourceUrl: "https://iasc.ojk.go.id", // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
    verified: false,
    totalLaporan: 1379, // Data resmi sampai akhir Juni 2026
    breakdownSummary: [
      "Penipuan investasi dengan video rekayasa wajah tokoh publik (Deepfake Video)",
      "Robot trading dan platform kripto palsu berklaim kecerdasan buatan (AI Trading Bots)",
      "Penipuan transaksi belanja daring berkedok teknologi AI",
      "Panggilan telepon darurat palsu menggunakan tiruan suara kerabat (AI Voice Cloning)",
    ],
    defenseTips: [
      "Jangan percaya video promosi investasi yang memperlihatkan tokoh ternama atau pejabat negara mempromosikan saham tertentu — verifikasi ke akun medsos terverifikasi tokoh tersebut.",
      "Buat 'Sandi Rahasia Keluarga' (fitur Sandi JagaRuang) untuk mematahkan penipuan kloning suara anak atau kerabat yang mengaku darurat.",
    ],
  },
  illegalEntities: {
    asOf: "2026-07-31",
    period: "1 Jan 2026 - 31 Jul 2026",
    source: "Rekapitulasi Penindakan Entitas Keuangan Ilegal - Sekretariat Satgas PASTI",
    sourceUrl: "https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers", // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
    verified: false,
    totalPengaduan: 25875, // Data resmi 1 Jan - 31 Jul 2026
    institutionName: "Satgas PASTI (Satuan Tugas Pemberantasan Aktivitas Keuangan Ilegal)",
    scopeSummary:
      "Aduan entitas ilegal meliputi aplikasi pinjaman online (pinjol) ilegal tanpa izin OJK, penawaran investasi tanpa legalitas Bappebti, serta layanan gadai swasta bodong.",
    differenceFromIasc:
      "PENTING DIPAHAMI: Data aduan entitas ilegal di Satgas PASTI dicatat terpisah dari data transaksi penipuan IASC. IASC fokus pada nomor rekening dan nomor kontak pelaku penipuan digital perorangan, sedangkan Satgas PASTI fokus pada pemblokiran aplikasi dan perusahaan keuangan bodong.",
  },
  generalRedFlags: [
    {
      id: "rf-transfer-pribadi",
      icon: "transfer",
      title: "Permintaan Transfer ke Rekening Pribadi",
      severity: "merah",
      severityLabel: "Bahaya Tinggi",
      explanation:
        "Toko, institusi, atau kantor resmi tidak pernah menggunakan rekening atas nama perorangan untuk transaksi korporasi.",
    },
    {
      id: "rf-harga-miring",
      icon: "price",
      title: "Harga Jauh di Bawah Pasar & Menekan Waktu",
      severity: "merah",
      severityLabel: "Bahaya Tinggi",
      explanation:
        "Umpan harga murah tidak masuk akal yang dibarengi ancaman batas waktu 10-15 menit agar korban tidak sempat berpikir.",
    },
    {
      id: "rf-deposit-komisi",
      icon: "deposit",
      title: "Komisi / Hadiah Menuntut Deposit Uang di Muka",
      severity: "merah",
      severityLabel: "Bahaya Tinggi",
      explanation:
        "Loker yang meminta bayaran atau hadiah undian yang memungut biaya pajak pencairan adalah penipuan mutlak.",
    },
    {
      id: "rf-file-apk",
      icon: "apk",
      title: "Pengiriman File Berekstensi .APK di Chat",
      severity: "merah",
      severityLabel: "Bahaya Tinggi",
      explanation:
        "Berkas berkedok undangan, resi kurir, atau berkas tilang yang sebenarnya adalah malware pencuri SMS OTP.",
    },
    {
      id: "rf-telepon-petugas",
      icon: "caller",
      title: "Penelepon Mengaku Petugas Meminta Data Rahasia",
      severity: "merah",
      severityLabel: "Bahaya Tinggi",
      explanation:
        "Meminta kode OTP SMS, nomor CVV kartu, atau PIN perbankan dengan dalih darurat atau pembatalan transaksi.",
    },
    {
      id: "rf-tutup-komentar",
      icon: "price",
      title: "Akun Penjual Menutup Kolom Komentar Publik",
      severity: "kuning",
      severityLabel: "Sinyal Lemah / Perlu Waspada",
      explanation:
        "Penjual mematikan komentar di media sosial agar korban terdahulu tidak bisa memberi testimoni peringatan.",
      isWeakSignal: true,
      weakSignalNote:
        "Catatan: Kolom komentar nonaktif adalah indikator pendukung yang lemah karena sebagian bisnis menutup komentar untuk menghindari spam. Nilai indikator ini bersama red flag lainnya.",
    },
  ],
  interactiveChecklist: [
    {
      id: "chk-pola-1",
      action: "Sebelum transfer, cek kembali nama penjual dan rekening tujuan di CekRekening.id.",
      reason: "Memastikan nomor rekening perorangan belum memiliki riwayat pelaporan aktif di kepolisian/bank.",
    },
    {
      id: "chk-pola-2",
      action: "Bila ada telepon mengaku petugas, tutup panggilan lalu hubungi nomor resmi yang kamu cari sendiri.",
      reason: "Mematahkan teknik Caller ID Spoofing dan memastikan kamu berbicara dengan kantor bank sebenarnya.",
    },
    {
      id: "chk-pola-3",
      action: "Jangan pasang file APK dari luar toko resmi, dan ingatkan orang tua serta kerabat.",
      reason: "Menutup pintu utama masuknya malware pencuri saldo m-Banking di ponsel keluarga.",
    },
    {
      id: "chk-pola-4",
      action: "Simpan kontak kanal lapor resmi OJK/IASC di ponselmu untuk kondisi darurat.",
      reason: "Mempercepat pelaporan dalam 1-2 jam pertama (Golden Period) saat kerugian baru saja terjadi.",
      verificationNote:
        "// TODO: verifikasi manual kontak resmi IASC dan Satgas PASTI OJK (157 / iasc.ojk.go.id)",
    },
    {
      id: "chk-pola-5",
      action: "Bagikan Kartu Peringatan JagaRuang ke grup obrolan keluarga.",
      reason: "Melindungi anggota keluarga yang jarang terpapar literasi keamanan siber dari modus terkini.",
    },
  ],
  emergencySteps: [
    {
      order: 1,
      title: "Hubungi Bank / E-Wallet Pengirim Segera",
      urgency: "1 - 2 Jam Pertama (Golden Period)",
      action:
        "Minta pihak bank membekukan sementara akun rekeningmu dan menerbitkan nomor laporan untuk koordinasi blokir ke bank rekening penerima milik penipu.",
      twoReportingChannels:
        "Laporan masuk lewat dua jalur: (1) Melalui Pelaku Usaha Sektor Keuangan (kantor bank/e-wallet), atau (2) Pelaporan langsung secara digital ke portal IASC.",
      verificationNote:
        "// TODO: verifikasi manual alur pelaporan antarbank dan penerbitan tiket aduan IASC",
    },
    {
      order: 2,
      title: "Simpan & Amankan Semua Bukti Digital",
      urgency: "Hari Ini Juga",
      action:
        "Ambil tangkapan layar (screenshot) nomor telepon, bukti transfer mutasi m-Banking, tautan akun media sosial pelaku, dan percakapan chat utuh tanpa diedit.",
      twoReportingChannels:
        "Bukti ini diunggah pada formulir aduan IASC dan berkas pembuatan laporan kepolisian.",
    },
    {
      order: 3,
      title: "Laporkan ke IASC & Patroli Siber Kepolisian",
      urgency: "Dalam 1 x 24 Jam",
      action:
        "Buka portal iasc.ojk.go.id untuk memasukkan data nomor rekening penipu, serta laporkan ke kantor polisi terdekat atau portal siber.polri.go.id.",
      twoReportingChannels:
        "Catatan: Penanganan IASC bertujuan mengamankan aset yang belum ditarik tunai oleh sindikat penipu. Pengembalian dana tergantung pada sisa saldo di rekening penampung dan putusan hukum; dana tidak dijamin pasti kembali 100%.",
    },
    {
      order: 4,
      title: "Ganti Kata Sandi & Lepas Akses Perangkat",
      urgency: "Seketika",
      action:
        "Jika kamu sempat memasang file APK mencurigakan, segera aktifkan Mode Pesawat (Airplane Mode), hapus aplikasi berbahaya, dan ganti seluruh PIN m-Banking serta password email dari perangkat ponsel lain yang bersih.",
      twoReportingChannels: "Memutus kendali jarak jauh peretas terhadap perangkatmu.",
    },
  ],
  quizPractice: [
    {
      id: 1,
      scenario:
        "Kamu dihubungi via WA oleh orang yang mengaku HRD perusahaan e-commerce: 'Selamat! Anda diterima part-time like video YouTube dengan gaji Rp400rb/hari. Silakan deposit Rp100rb untuk membuka akun kerja Anda.'",
      sender: "Nomor seluler asing +234 812-xxx",
      options: [
        {
          categoryName: "Penipuan Lowongan Kerja / Komisi Tugas",
          isCorrect: true,
          explanation:
            "Tepat! Ini adalah modus penipuan kerja (peringkat #4). Ciri khas utamanya adalah syarat instan dan tuntutan deposit uang muka.",
        },
        {
          categoryName: "Penipuan Transaksi Belanja Online",
          isCorrect: false,
          explanation:
            "Kurang tepat. Modus ini menawarkan pekerjaan/tugas harian, bukan pembelian produk barang.",
        },
        {
          categoryName: "Impersonation / Panggilan Telepon Bank",
          isCorrect: false,
          explanation:
            "Kurang tepat. Pelaku tidak menyamar sebagai petugas bank via panggilan suara.",
        },
      ],
    },
    {
      id: 2,
      scenario:
        "Layar ponselmu berdering menampilkan nomor '1500888'. Penelepon menyatakan ada transaksi kartu kredit di Singapura sebesar Rp15 Juta dan meminta kamu menyebutkan 6 digit kode SMS OTP untuk membatalkannya.",
      sender: "Panggilan telepon dengan nomor mirip call center resmi",
      options: [
        {
          categoryName: "Impersonation / Panggilan Telepon Palsu (Fake Call)",
          isCorrect: true,
          explanation:
            "Tepat! Ini adalah modus Impersonation / Fake Call (peringkat #2) yang memanfaatkan teknologi Caller ID Spoofing untuk mencuri OTP.",
        },
        {
          categoryName: "Penipuan Investasi Bodong",
          isCorrect: false,
          explanation:
            "Kurang tepat. Tidak ada penawaran keuntungan finansial atau investasi di skenario ini.",
        },
      ],
    },
  ],
  personalDiagnosticQuiz: {
    question: "Manakah dari pesan di bawah ini yang pernah kamu terima baru-baru ini?",
    options: [
      {
        id: "opt-belanja",
        label: "Iklan barang murah/lelang di media sosial yang meminta transfer langsung",
        targetModusId: "belanja",
      },
      {
        id: "opt-telepon",
        label: "Telepon mengaku bank/polisi yang mengabarkan masalah darurat dan meminta data",
        targetModusId: "fake-call",
      },
      {
        id: "opt-loker",
        label: "Chat tawaran kerja part-time like video/review dengan syarat deposit",
        targetModusId: "kerja",
      },
      {
        id: "opt-investasi",
        label: "Ajakan gabung grup investasi profit pasti harian dari kenalan medsos",
        targetModusId: "investasi",
      },
    ],
  },
  takeaway:
    "Penipu terus berganti cerita, tetapi pola intinya sama: mendesakmu bertindak cepat. Berhenti sejenak dan verifikasi lewat jalur yang kamu pilih sendiri.",
  sourcesList: [
    {
      title: "Data Penanganan Laporan Penipuan Keuangan Digital",
      organization: "Indonesia Anti-Scam Centre (IASC) / Satgas PASTI OJK",
      period: "22 November 2024 – 31 Oktober 2026",
      url: "https://iasc.ojk.go.id", // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
      verified: false,
    },
    {
      title: "Rekapitulasi Penindakan Entitas Keuangan Ilegal",
      organization: "Sekretariat Satgas PASTI Otoritas Jasa Keuangan",
      period: "1 Januari 2026 – 31 Juli 2026",
      url: "https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers", // // TODO: verifikasi manual terhadap publikasi resmi OJK/IASC
      verified: false,
    },
  ],
  disclaimer:
    "Modul ini bersifat edukasi umum. Data berasal dari laporan masyarakat dan berubah dari waktu ke waktu. Jika ragu, verifikasi lewat kanal resmi.",
};

// =============================================================================
// HELPER FUNCTIONS & RUNTIME INTEGRITY VALIDATION
// =============================================================================

/**
 * Validasi runtime integritas dataset saat modul dimuat.
 * Memastikan setiap data entry memiliki asOf, period, dan source yang valid.
 */
export function validateModusData(data: ModulPolaModusData): boolean {
  if (!data.modusDataset.meta.asOf || !data.modusDataset.meta.source) {
    throw new Error("Dataset modus wajib memiliki asOf dan source!");
  }
  for (const entry of data.iascOverviewEntries) {
    if (!entry.asOf || !entry.source) {
      throw new Error(`Data IASC overview per ${entry.asOf} tidak lengkap!`);
    }
  }
  if (!data.aiScams.asOf || !data.illegalEntities.asOf) {
    throw new Error("Data AI Scams dan Entitas Ilegal wajib memiliki asOf!");
  }
  return true;
}

// Jalankan validasi integritas
validateModusData(MODUL_POLA_MODUS_NASIONAL);

/**
 * Menghitung persentase dinamis dari jumlah laporan mentah terhadap total laporan.
 * Hasil dibulatkan ke 1 angka di belakang koma (contoh: 13.4%).
 */
export function calculateDynamicPercentage(
  count: number,
  total: number
): { rawPercent: number; displayPercent: string } {
  if (!total || total <= 0) return { rawPercent: 0, displayPercent: "0%" };
  const val = (count / total) * 100;
  return {
    rawPercent: val,
    displayPercent: `${val.toFixed(1)}%`,
  };
}

/**
 * Memeriksa apakah data sudah berumur lebih dari 90 hari sejak tanggal hari ini.
 * Jika ya, sistem menampilkan penanda visual bahwa data mungkin sudah bergerak.
 */
export function isDataOlderThan90Days(asOfString: string): boolean {
  try {
    const asOfDate = new Date(asOfString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - asOfDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 90;
  } catch {
    return false;
  }
}

