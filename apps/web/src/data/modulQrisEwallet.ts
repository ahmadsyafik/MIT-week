// Data terstruktur untuk Modul Pembelajaran m9: Pola Penipuan QRIS & E-Wallet
// Target: Masyarakat awam (pembeli & penjual), bahasa non-absolut, akurat, berbasis fakta Bank Indonesia.

export interface QrisModusCard {
  id: string;
  targetRole: "pembeli" | "penjual" | "semua";
  title: string;
  shortSummary: string;
  sampleScenario: string;
  specificRedFlags: string[];
  howToStop: string;
}

export interface CashierHotspot {
  id: string;
  title: string;
  coordinates: { x: number; y: number }; // Persentase untuk overlay SVG
  inspectionTip: string;
  safetyAdvice: string;
}

export interface QrisQuizItem {
  id: number;
  situation: string;
  context: string;
  isSuspicious: boolean;
  options: {
    label: string;
    decision: "aman" | "mencurigakan";
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface ModulQrisEwalletData {
  id: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  opener: {
    highlight: string;
    explanation: string;
  };
  moneyDirectionPrinciple: {
    title: string;
    payingExplanation: string;
    receivingExplanation: string;
    goldenRulePinOtp: string;
  };
  cashierHotspots: CashierHotspot[];
  buyerModusList: QrisModusCard[];
  sellerModusList: QrisModusCard[];
  merchantMockupSimulation: {
    title: string;
    intro: string;
    displayedMerchantName: string;
    expectedEntity: string;
    amount: string;
    explanationIfPaid: string;
    explanationIfCancelled: string;
  };
  sellerScreenshotSimulation: {
    title: string;
    situation: string;
    options: {
      action: string;
      isSafe: boolean;
      explanation: string;
    }[];
  };
  merchantPrintPoster: {
    title: string;
    points: { rule: string; why: string }[];
  };
  redFlagsBuyer: {
    id: string;
    title: string;
    explanation: string;
    isSupportingOnly?: boolean;
    supportingNote?: string;
  }[];
  redFlagsSeller: {
    id: string;
    title: string;
    explanation: string;
  }[];
  checklistBuyer: {
    id: string;
    action: string;
    reason: string;
  }[];
  checklistSeller: {
    id: string;
    action: string;
    reason: string;
  }[];
  emergencySteps: {
    order: number;
    title: string;
    action: string;
    verificationNote?: string;
  }[];
  quizQuestions: QrisQuizItem[];
  takeaway: string;
  sources: {
    organization: string;
    title: string;
    url?: string;
    verified: boolean;
    note?: string;
  }[];
  disclaimer: string;
}

export const MODUL_QRIS_EWALLET: ModulQrisEwalletData = {
  id: "m9",
  title: "Pola Penipuan QRIS & E-Wallet",
  readingTime: "5-6 menit baca",
  lastUpdated: "2026-11-07",
  opener: {
    highlight:
      "QRIS membuat pembayaran menjadi cepat dan praktis, dan sistem QRIS sendiri relatif aman karena telah melalui pengujian keamanan ketat.",
    explanation:
      "Yang sering dimanfaatkan penipu bukanlah kelemahan sistem digitalnya, melainkan stiker fisik di meja kasir/kotak amal, manipulasi tautan di media sosial, dan kebiasaan kita yang kurang teliti saat memindai.",
  },
  moneyDirectionPrinciple: {
    title: "Prinsip Arah Uang: Membayar vs Menerima Dana",
    payingExplanation:
      "Saat kamu MEMBAYAR: Kamu memindai kode QRIS orang lain, mengetikkan nominal, dan memasukkan PIN rahasiamu. Uang keluar dari saldo akunmu.",
    receivingExplanation:
      "Saat kamu MENERIMA uang atau pencairan dana: Pihak pengirim yang memindai kodemu atau mentransfer ke nomor akunmu. Kamu TIDAK PERLU memasukkan PIN atau kode OTP apa pun, dan saldo akunmu otomatis bertambah.",
    goldenRulePinOtp:
      "Untuk menerima uang, kamu tidak perlu memasukkan PIN atau kode OTP, dan jangan pernah memberikannya kepada siapa pun. Memindai QR umumnya berarti membayar, sehingga jika kamu diminta memindai QR atau memasukkan PIN untuk 'menerima uang / refund', itu adalah tanda janggal yang nyata.",
  },
  cashierHotspots: [
    {
      id: "spot-stiker",
      title: "Stiker QRIS yang Bertumpuk",
      coordinates: { x: 45, y: 55 },
      inspectionTip:
        "Raba permukaan stiker kode QRIS di meja kasir atau kotak amal. Apakah terasa ada lapisan stiker baru yang menimpa kode lama?",
      safetyAdvice:
        "Stiker bertumpuk adalah sinyal pendukung kecurigaan. Pelaku sengaja menempelkan stiker miliknya di atas QRIS resmi merchant.",
    },
    {
      id: "spot-posisi",
      title: "Posisi Penempatan Kode yang Luput dari Pengawasan",
      coordinates: { x: 75, y: 70 },
      inspectionTip:
        "Periksa apakah kode QRIS diletakkan di tempat sepi yang jauh dari pandangan kasir atau pengurus tempat ibadah.",
      safetyAdvice:
        "Bagi pedagang, pasanglah kode QRIS tepat di depan pandangan kasir dan lapisi dengan laminasi akrilik transparan agar sulit ditimpa.",
    },
    {
      id: "spot-layar",
      title: "Pemeriksaan Nama Merchant di Layar Ponsel",
      coordinates: { x: 25, y: 40 },
      inspectionTip:
        "Setelah kamera memindai kode QR, baca nama merchant yang muncul di layar aplikasi pembayaranmu sebelum memasukkan PIN.",
      safetyAdvice:
        "Ini adalah garis pertahanan utama! Pastikan nama merchant yang muncul di layar persis sesuai dengan nama toko atau nama lembaga resmi tempat ibadah.",
    },
  ],
  buyerModusList: [
    {
      id: "stiker-palsu",
      targetRole: "pembeli",
      title: "Stiker QRIS Palsu di Meja Kasir atau Kotak Amal",
      shortSummary:
        "Pelaku menempelkan stiker kode QRIS miliknya di atas kode QRIS resmi milik pedagang atau kotak amal tempat ibadah.",
      sampleScenario:
        "Seseorang menempelkan stiker QRIS bertuliskan 'Restorasi Masjid' di kotak amal. Saat jamaah memindai dan mentransfer infak, dana masuk ke rekening pribadi pelaku di kota lain.",
      specificRedFlags: [
        "Nama merchant di layar ponsel tidak dikenal oleh pengurus tempat ibadah atau penjaga kasir.",
        "Stiker QRIS tampak baru, bergelembung, atau terasa berlapis saat diraba.",
        "Nama merchant memakai ejaan yang mirip namun berada di bawah penyedia jasa pembayaran yang berbeda dari kasir resmi.",
      ],
      howToStop:
        "Sebelum konfirmasi, baca nama merchant di layar. Untuk kotak amal atau donasi, tanyakan kepada pengurus dan pastikan namanya persis sama dengan rekening resmi lembaganya.",
    },
    {
      id: "quishing",
      targetRole: "pembeli",
      title: "Quishing (QR Phishing di Poster, Email, atau Medsos)",
      shortSummary:
        "Penipuan memakai kode QR (Quishing) yang disebarkan lewat selebaran, pesan chat, atau email untuk mengarahkan korban ke situs web tiruan pencuri password.",
      sampleScenario:
        "Brosur promo internet murah meminta korban memindai QR code. Saat dipindai, browser membuka halaman login bank palsu: 'Masukkan nomor kartu dan PIN Anda untuk aktivasi kuota gratis'.",
      specificRedFlags: [
        "Kode QR berasal dari email tak dikenal atau selebaran tempel di tempat umum.",
        "Setelah dipindai, kode tidak membuka transaksi pembayaran melainkan mengarahkan ke formulir web yang meminta login kredensial.",
      ],
      howToStop:
        "Hanya pindai kode QR dari sumber fisik yang kamu kenal dan gunakan aplikasi pemindai bawaan dompet digital atau mobile banking terpercaya.",
    },
    {
      id: "giveaway-qris",
      targetRole: "pembeli",
      title: "Giveaway & Lelang Palsu Berkedok Biaya Administrasi QRIS",
      shortSummary:
        "Korban diberitahu memenangkan giveaway atau lelang barang murah, namun diminta memindai QRIS untuk membayar 'pajak hadiah' atau 'biaya aktivasi'.",
      sampleScenario:
        "\"Selamat Kakak menang giveaway iPhone! Scan QRIS ini untuk bayar biaya ongkir Rp50.000, hadiah langsung kami kirim hari ini.\"",
      specificRedFlags: [
        "Pemenang hadiah diminta memindai kode QRIS dan membayar uang di muka.",
        "Penjual lelang barang mewah memaksa transfer cepat via QRIS dalam hitungan menit.",
      ],
      howToStop:
        "Pemenang undian resmi tidak pernah diminta membayar biaya administrasi atau memindai QR di muka. Pajak hadiah selalu dipotong langsung dari nilai hadiah.",
    },
    {
      id: "link-pencairan-palsu",
      targetRole: "pembeli",
      title: "Tautan / Permintaan Transfer Berkedok 'Pencairan Saldo'",
      shortSummary:
        "Pelaku mengirim tautan transfer atau kode QR dengan dalih 'kiriman uang / refund', lalu memandu korban mengetik PIN agar 'uang bisa cair masuk'.",
      sampleScenario:
        "\"Kak uang refund belanjaannya sudah saya kirim via link ini ya. Klik tautannya, pilih dompet digital Kakak, lalu masukkan PIN akunnya biar dananya langsung cair masuk ke saldo Kakak.\"",
      specificRedFlags: [
        "Pihak lain meminta kamu memasukkan PIN atau menyebutkan kode OTP untuk 'menerima' uang.",
        "Layar aplikasi pembayaran menampilkan tombol 'Konfirmasi Pembayaran' atau 'Kirim Uang', bukan 'Terima Uang'.",
      ],
      howToStop:
        "Ingat aturan baku: Untuk menerima uang, kamu tidak perlu memasukkan PIN atau kode OTP. Jika aplikasi meminta PIN, artinya uangmu yang akan KELUAR!",
    },
  ],
  sellerModusList: [
    {
      id: "bukti-palsu",
      targetRole: "penjual",
      title: "Manipulasi Bukti Transfer (Tangkapan Layar Struk Palsu)",
      shortSummary:
        "Pembeli abal-abal menunjukkan tangkapan layar ponsel bertuliskan 'Pembayaran Berhasil' yang sebenarnya hasil editan aplikasi generator struk palsu.",
      sampleScenario:
        "Pembeli terburu-buru menyodorkan layar HP ke kasir: 'Mbak sudah saya bayar ya Rp250.000, ini struknya berhasil. Tolong bungkus cepat saya lagi parkir darurat!' Namun saat dicek kasir, saldo toko belum bertambah.",
      specificRedFlags: [
        "Pembeli mendesak dan menolak menunggu kasir memeriksa mutasi saldo toko.",
        "Font tulisan, jam transaksi, atau tata letak struk tampak sedikit buram atau tidak presisi.",
        "Notifikasi masuk di aplikasi merchant milik penjual tidak berbunyi.",
      ],
      howToStop:
        "Layar milik pembeli bukan bukti sah dana masuk. Selalu periksa sendiri mutasi transaksi atau saldo di aplikasi merchant milik tokomu sebelum menyerahkan barang dagangan.",
    },
    {
      id: "stiker-ditimpa",
      targetRole: "penjual",
      title: "Stiker QRIS Toko Ditimpa Pelaku",
      shortSummary:
        "Pelaku berpura-pura menjadi pembeli yang berlama-lama di meja kasir saat kondisi ramai, lalu diam-diam menempelkan stiker QRIS miliknya di atas QRIS toko.",
      sampleScenario:
        "Seorang pedagang baru menyadari setelah seharian berjualan bahwa ada belasan transaksi pelanggan yang tidak masuk ke rekening toko karena kode QRIS di kasir telah ditimpa stiker orang lain.",
      specificRedFlags: [
        "Pelanggan mengeluh bahwa nama toko yang muncul di ponsel mereka berbeda dari nama tokomu.",
        "Ada bekas lem, gelembung udara, atau sudut stiker yang tampak terangkat pada papan QRIS.",
      ],
      howToStop:
        "Pasang papan QRIS di tempat yang mudah diawasi mata kasir, lapisi dengan akrilik transparan permanen, dan lakukan pemeriksaan fisik stiker secara berkala setiap pagi.",
    },
  ],
  merchantMockupSimulation: {
    title: "Simulasi Layar Konfirmasi Pembayaran QRIS",
    intro:
      "Perhatikan layar konfirmasi di bawah ini. Kamu sedang berbelanja di warung makan 'Soto Ayam Pak Joko', namun layar ponselmu menampilkan data berikut:",
    displayedMerchantName: "YAYASAN AMAL SEJAHTERA BERSAMA - JAKARTA PUSAT",
    expectedEntity: "Soto Ayam Pak Joko",
    amount: "Rp 35.000",
    explanationIfPaid:
      "🚨 JANGAN DILANJUTKAN! Nama merchant di layar ('Yayasan Amal Sejahtera Bersama') sama sekali tidak cocok dengan nama warung ('Soto Ayam Pak Joko'). Jika kamu menekan tombol bayar dan memasukkan PIN, uangmu akan masuk ke rekening penipu yang menempelkan stiker palsu di meja warung tersebut.",
    explanationIfCancelled:
      "✓ KEPUTUSAN TEPAT! Membatalkan transaksi dan segera memberitahu pemilik warung bahwa stiker QRIS di mejanya kemungkinan telah ditimpa oleh pihak tidak bertanggung jawab.",
  },
  sellerScreenshotSimulation: {
    title: "Simulasi Kasir Toko: Pembeli Menunjukkan Layar 'Berhasil'",
    situation:
      "Pembeli menyodorkan layar ponselnya yang menampilkan tulisan 'Pembayaran Berhasil Rp150.000' dan meminta barangnya segera diserahkan karena ia sedang terburu-buru. Apa tindakan terbaikmu sebagai kasir?",
    options: [
      {
        action: "Langsung serahkan barang belanjaan karena layar pembeli sudah ada centang hijau berhasil",
        isSafe: false,
        explanation:
          "Sangat berisiko! Layar pembeli sangat mudah dipalsukan menggunakan aplikasi pembuat struk palsu atau tangkapan layar transaksi lama.",
      },
      {
        action: "Minta pembeli menunggu 10-20 detik sementara kamu mengecek notifikasi saldo masuk di aplikasi merchant tokomu sendiri",
        isSafe: true,
        explanation:
          "Tepat 100%! Garis pertahanan penjual adalah catatan mutasi di aplikasi milik sendiri. Jangan pernah menyerahkan barang sebelum ada konfirmasi saldo masuk.",
      },
    ],
  },
  merchantPrintPoster: {
    title: "Poster Panduan Pedagang: 3 Langkah Amankan QRIS Tokomu",
    points: [
      {
        rule: "1. Pasang di Meja Kasir yang Terlihat Jelas",
        why: "Jangan letakkan papan QRIS di sudut meja yang luput dari pandangan mata kasir.",
      },
      {
        rule: "2. Lapisi dengan Akrilik atau Laminasi Transparan",
        why: "Membuat permukaan licin sehingga stiker tempelan pelaku tidak bisa merekat dengan mudah.",
      },
      {
        rule: "3. Jadikan Cek Mutasi Sebagai Standar Serah Terima",
        why: "Barang hanya diserahkan setelah notifikasi saldo masuk berbunyi di ponsel tokomu, bukan dari layar pembeli.",
      },
    ],
  },
  redFlagsBuyer: [
    {
      id: "rf-b-nama",
      title: "Nama Merchant di Layar Tidak Cocok atau Tidak Masuk Akal",
      explanation:
        "Nama yang muncul di layar ponsel tidak sama dengan nama toko, atau berlokasi di kota yang jauh dari tempatmu berdiri.",
    },
    {
      id: "rf-b-pin-terima",
      title: "Diminta Memasukkan PIN atau Menyebutkan OTP untuk 'Menerima Uang'",
      explanation:
        "Menerima uang tidak pernah membutuhkan PIN atau OTP. Siapa pun yang memintanya sedang mencoba menarik uangmu.",
    },
    {
      id: "rf-b-quishing-link",
      title: "QR Code Membuka Tautan Web yang Meminta Login Akun",
      explanation:
        "Alih-alih membuka konfirmasi bayar di dompet digital, kode QR malah mengarahkan browser ke formulir login kredensial.",
    },
    {
      id: "rf-b-stiker-tumpuk",
      title: "Stiker Bertumpuk atau Ada Bekas Tempelan Baru",
      explanation:
        "Permukaan stiker tidak rata atau sudutnya tampak sengaja direkatkan di atas kode lama.",
      isSupportingOnly: true,
      supportingNote:
        "Catatan: Stiker bertumpuk adalah sinyal pendukung, karena pedagang juga bisa menempel stiker pembaruan resmi. Pemeriksaan utama tetap mencocokkan nama merchant di layar.",
    },
  ],
  redFlagsSeller: [
    {
      id: "rf-s-layar-saja",
      title: "Bukti Pembayaran Hanya Berupa Tangkapan Layar Pembeli",
      explanation:
        "Pembeli hanya menunjukkan foto atau animasi layar HP miliknya tanpa adanya notifikasi saldo masuk di aplikasi kasir.",
    },
    {
      id: "rf-s-buru-buru",
      title: "Pembeli Mendesak Sangat Agresif dan Memaksa Cepat",
      explanation:
        "Menciptakan suasana panik di kasir agar penjual tidak sempat membuka aplikasi mutasi saldo.",
    },
    {
      id: "rf-s-mutasi-kosong",
      title: "Saldo di Aplikasi Kasir Belum Bertambah Setelah Beberapa Menit",
      explanation:
        "Sistem QRIS memproses dana seketika. Jika saldo mutasi tidak bertambah, transaksi tersebut kemungkinan besar fiktif.",
    },
  ],
  checklistBuyer: [
    {
      id: "chk-b-1",
      action: "Sebelum konfirmasi, baca nama merchant di layar ponsel dengan teliti.",
      reason: "Untuk kotak amal atau donasi, pastikan nama di layar persis sama dengan nama lembaga resmi tempat ibadah.",
    },
    {
      id: "chk-b-2",
      action: "Jangan pernah memasukkan PIN atau menyebutkan kode OTP untuk keperluan menerima uang atau pencairan saldo.",
      reason: "Memasukkan PIN berarti menyetujui transaksi pengeluaran dana dari akunmu.",
    },
    {
      id: "chk-b-3",
      action: "Pindai kode QR hanya dari sumber fisik terpercaya dan gunakan aplikasi pembayaran resmi dari bank atau dompet digital berizin.",
      reason: "Mencegah serangan quishing yang mengarahkan ke website phishing berbahaya.",
    },
    {
      id: "chk-b-4",
      action: "Jika diminta memindai QR atau klik tautan untuk menerima hadiah atau refund, anggap sebagai tanda janggal.",
      reason: "Pengembalian dana resmi dari toko selalu masuk otomatis ke saldo akunmu tanpa perlu tindakan pindai ulang dari pihak pembeli.",
    },
  ],
  checklistSeller: [
    {
      id: "chk-s-1",
      action: "Periksa sendiri mutasi saldo di aplikasi tokomu sebelum menyerahkan barang belanjaan.",
      reason: "Layar ponsel milik pembeli sangat mudah dipalsukan dengan generator struk tiruan.",
    },
    {
      id: "chk-s-2",
      action: "Pasang stiker QRIS di tempat yang mudah diawasi mata kasir dan lindungi dengan laminasi akrilik transparan.",
      reason: "Mencegah pelaku menempelkan stiker QRIS liar secara diam-diam di atas kode resmi tokomu.",
    },
    {
      id: "chk-s-3",
      action: "Aktifkan notifikasi suara atau pesan instan dari aplikasi resmi penyedia pembayaran tokomu.",
      reason: "Memberikan kepastian seketika saat dana pelanggan benar-benar telah masuk ke kas toko.",
    },
  ],
  emergencySteps: [
    {
      order: 1,
      title: "Hubungi Bank / Penyedia Dompet Digital Segera",
      action:
        "Laporkan ID transaksi QRIS, tanggal-jam, nama merchant yang salah, dan nominal transaksi agar pihak penyedia pembayaran memproses investigasi penipuan merchant.",
      verificationNote:
        "// TODO: verifikasi manual kontak pengaduan QRIS di situs resmi Bank Indonesia / penyedia e-wallet",
    },
    {
      order: 2,
      title: "Simpan & Amankan Semua Bukti Transaksi",
      action:
        "Ambil tangkapan layar mutasi pembayaran di aplikasi dompet digitalmu, foto fisik kode QRIS yang dipindai (beserta lokasinya), dan foto struk.",
    },
    {
      order: 3,
      title: "Laporkan ke IASC & Bank Indonesia",
      action:
        "Buat laporan di portal resmi iasc.ojk.go.id dan kanal pengaduan konsumen Bank Indonesia bila transaksi melibatkan penyalahgunaan QRIS massal.",
      verificationNote:
        "// TODO: verifikasi manual kanal lapor pengaduan QRIS Bank Indonesia (Bicara 131)",
    },
    {
      order: 4,
      title: "Ganti PIN & Amankan Akun Pembayaran",
      action:
        "Jika kamu sempat mengetikkan PIN atau memberikan kode OTP pada situs web quishing mencurigakan, segera ubah PIN pembayaran dan kata sandi akunmu saat ini juga.",
    },
  ],
  quizQuestions: [
    {
      id: 1,
      situation: "Kamu berbelanja di kasir toko buku 'Cahaya Ilmu', tetapi saat memindai QRIS, layar ponselmu menampilkan nama merchant 'CV SUKSES ABADI MANDIRI - BANDUNG'.",
      context: "Kasir toko buku berada di Jakarta Selatan.",
      isSuspicious: true,
      options: [
        {
          label: "Lanjut bayar karena mungkin itu nama perusahaan distributor bukunya",
          decision: "aman",
          isCorrect: false,
          explanation:
            "Berisiko! Toko resmi biasanya menampilkan nama brand toko atau nama badan usahanya sendiri. Selalu tanyakan ke kasir sebelum menekan konfirmasi.",
        },
        {
          label: "Batalkan dan tanyakan ke kasir apakah nama merchant tersebut benar milik mereka",
          decision: "mencurigakan",
          isCorrect: true,
          explanation:
            "Tepat! Mengonfirmasi ke kasir sebelum bayar mencegah uangmu masuk ke stiker QRIS penipu yang sengaja ditimpa orang lain.",
        },
      ],
    },
    {
      id: 2,
      situation: "Admin toko online mengirim pesan WhatsApp: 'Kak ini uang pengembalian (refund) barang Rp75.000, silakan klik link QR ini lalu ketik PIN e-wallet Kakak biar saldo cair masuk.'",
      context: "Pesan masuk dari nomor asing.",
      isSuspicious: true,
      options: [
        {
          label: "Ketik PIN agar uang refund segera ditransfer ke saldo dompet digital",
          decision: "aman",
          isCorrect: false,
          explanation:
            "Bahaya Fatal! Mengetik PIN di tautan pembayaran berarti menyetujui transfer keluar, bukan menerima uang masuk. Saldomu justru akan ditarik!",
        },
        {
          label: "Tolak dan tegaskan bahwa menerima uang tidak pernah memerlukan ketik PIN",
          decision: "mencurigakan",
          isCorrect: true,
          explanation:
            "Tepat 100%! Untuk menerima dana atau pencairan uang, kamu tidak perlu mengetikkan PIN atau kode OTP apa pun.",
        },
      ],
    },
    {
      id: 3,
      situation: "Kamu sedang menjaga kasir warung kopi. Pembeli menunjukkan layar HP miliknya bertuliskan 'Pembayaran Berhasil Rp25.000' dan langsung ingin membawa kopinya pergi.",
      context: "Aplikasi kasir di ponsel tokomu belum menampilkan notifikasi saldo masuk.",
      isSuspicious: true,
      options: [
        {
          label: "Bolehkan pergi karena layarnya sudah ada centang hijau resmi",
          decision: "aman",
          isCorrect: false,
          explanation:
            "Kurang aman. Layar pembeli sangat mudah dipalsukan dengan foto screenshot editan.",
        },
        {
          label: "Minta pembeli menunggu sejenak sampai notifikasi saldo masuk muncul di ponsel tokomu",
          decision: "mencurigakan",
          isCorrect: true,
          explanation:
            "Tepat! Standar keamanan pedagang adalah memverifikasi mutasi saldo di aplikasi milik toko sendiri, bukan mengandalkan layar pembeli.",
        },
      ],
    },
  ],
  takeaway:
    "Untuk menerima uang, kamu tidak perlu memberikan PIN atau OTP. Dan sebelum membayar, baca nama merchant di layar dengan teliti.",
  sources: [
    {
      organization: "Bank Indonesia (BI)",
      title: "Edukasi Keamanan Sistem Pembayaran QRIS & Pencegahan Modus Quishing",
      url: "https://www.bi.go.id", // // TODO: verifikasi manual di situs resmi Bank Indonesia
      verified: false,
      note: "Pedoman resmi Bank Indonesia mengenai verifikasi nama merchant dan pelindungan fisik stiker QRIS.",
    },
    {
      organization: "Badan Siber dan Sandi Negara (BSSN)",
      title: "Laporan Ancaman Kejahatan Siber Berbasis QR Code (Quishing)",
      url: "https://bssn.go.id", // // TODO: verifikasi manual publikasi BSSN
      verified: false,
    },
  ],
  disclaimer:
    "Modul ini bersifat edukasi umum. Modus dan tampilan aplikasi pembayaran terus berubah. Jika ragu, verifikasi lewat kanal resmi Bank Indonesia atau penyedia pembayaran berizin.",
};

