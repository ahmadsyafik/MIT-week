/**
 * Data Modul m11: Pusat Darurat - Cara Lapor Jika Sudah Jadi Korban
 * JagaRuang - Platform Edukasi Anti-Penipuan Digital
 *
 * Mengikuti aturan ketat:
 * - Domain IASC resmi HANYA iasc.ojk.go.id. Dilarang domain lain.
 * - Dilarang menyebut "1-2 jam" atau "pembekuan permanen".
 * - Data realistis: Dana diamankan Rp 825,2 M vs dikembalikan Rp 207,16 M (per 31 Okt 2026).
 * - Generator kronologi 100% lokal di perangkat (memory session only).
 */

export interface EmergencyChannelConfig {
  id: string;
  label: string;
  iconName: string;
  firstActionHeadline: string;
  specificInstructions: string[];
  requiredEvidence: string[];
}

export interface ModulPusatDaruratData {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  lastUpdated: string;
  readingTimeMinutes: number;
  disclaimer: string;
  keyTakeaway: string;
  iascOfficialDomain: string;
  realisticExpectations: {
    securedFundsTotal: string;
    returnedFundsTotal: string;
    asOf: string;
    source: string;
    sourceUrl?: string;
    verified: boolean;
    explanation: string;
  };
  timeContext: {
    idealReportingWindow: string;
    averageNationalReportTime: string;
    criminalSpeed: string;
    goldenRule: string;
    source: string;
  };
  officialContacts: {
    name: string;
    value: string;
    role: string;
    hours: string;
    verificationNote: string;
  }[];
  universalSteps: {
    order: number;
    title: string;
    desc: string;
    keyDetail: string;
  }[];
  channelConfigs: Record<string, EmergencyChannelConfig>;
  postReportWorkflow: {
    order: number;
    phase: string;
    description: string;
    realisticNote: string;
  }[];
  secondLayerScamWarning: {
    title: string;
    description: string;
    redFlags: string[];
  }[];
  supporterGuide: {
    title: string;
    description: string;
    legalPrerequisite: string;
    actionChecklist: string[];
  };
}

export const MODUL_PUSAT_DARURAT_DATA: ModulPusatDaruratData = {
  id: "m11",
  title: "Pusat Darurat: Cara Lapor Jika Sudah Jadi Korban",
  subtitle: "Panduan taktis pelaporan cepat ke bank, portal IASC OJK, dan kepolisian.",
  slug: "cara-lapor-darurat",
  lastUpdated: "2026-11-07",
  readingTimeMinutes: 5,
  disclaimer:
    "Modul ini bersifat panduan darurat umum dan bukan layanan hukum resmi. Penanganan penghentian transaksi dan pengembalian sisa dana sepenuhnya merupakan kewenangan penyedia jasa keuangan dan aparat penegak hukum.",
  keyTakeaway:
    "Semakin cepat kamu melapor, semakin besar peluangnya. Hubungi bank pengirim dulu, lapor ke portal iasc.ojk.go.id, dan simpan seluruh bukti. Kamu tidak sendirian.",

  iascOfficialDomain: "iasc.ojk.go.id",

  realisticExpectations: {
    securedFundsTotal: "Rp 825,2 Miliar",
    returnedFundsTotal: "Rp 207,16 Miliar",
    asOf: "31 Oktober 2026",
    source: "Anti-Scam Center (IASC) OJK",
    sourceUrl: "https://www.ojk.go.id", // TODO: verifikasi manual rilis pers IASC
    verified: false,
    explanation:
      "Melapor cepat meningkatkan peluang penyelamatan saldo yang belum sempat ditarik oleh pelaku. Namun, pengembalian dana bukan jaminan, karena sindikat penipuan kerap memindahkan dana dalam hitungan menit ke berbagai lapis rekening dan e-wallet.",
  },

  timeContext: {
    idealReportingWindow: "10 menit atau kurang",
    averageNationalReportTime: "Sekitar 12 jam",
    criminalSpeed: "Hitungan menit hingga beberapa detik",
    goldenRule:
      "OJK menyebut idealnya korban melapor dalam 10 menit atau kurang. Rerata korban di Indonesia baru melapor sekitar 12 jam setelah kejadian, padahal pelaku memindahkan dana sangat cepat. Semakin cepat kamu bertindak, semakin besar kemungkinan dana tertahan. Jika sudah lewat dari itu, tetaplah melapor.",
    source: "Statistik Pelaporan IASC OJK 2026",
  },

  officialContacts: [
    {
      name: "Portal Resmi IASC OJK",
      value: "iasc.ojk.go.id",
      role: "Pusat pelaporan penipuan terintegrasi lintas bank & e-wallet.",
      hours: "24 Jam Setiap Hari (Online)",
      verificationNote: "// TODO: verifikasi manual alamat portal iasc.ojk.go.id",
    },
    {
      name: "Kontak Konsumen OJK",
      value: "157",
      role: "Layanan konsultasi dan aduan konsumen sektor jasa keuangan.",
      hours: "Hari kerja 08.00 - 17.00 WIB",
      verificationNote: "// TODO: verifikasi manual jam layanan call center 157 di ojk.go.id",
    },
    {
      name: "WhatsApp Resmi OJK",
      value: "081-157-157-157",
      role: "Pengecekan izin entitas dan informasi layanan pengaduan.",
      hours: "Layanan respons otomatis 24 Jam",
      verificationNote: "// TODO: verifikasi manual nomor WhatsApp centang hijau OJK",
    },
    {
      name: "Kepolisian Republik Indonesia (SPKT)",
      value: "110",
      role: "Layanan kepolisian untuk penerbitan STPL (Surat Tanda Penerimaan Laporan).",
      hours: "24 Jam Setiap Hari",
      verificationNote: "// TODO: verifikasi manual alur penerbitan STPL di kantor polisi terdekat",
    },
  ],

  universalSteps: [
    {
      order: 1,
      title: "Hubungi Bank / Penyedia Pembayaran Pengirim",
      desc: "Telepon segera call center resmi bank atau e-wallet yang kamu gunakan untuk mengirim uang. Minta petugas menandai transaksi tersebut sebagai tindak penipuan dan meminta koordinasi penahanan transaksi ke bank tujuan.",
      keyDetail: "Gunakan nomor resmi yang tertera di belakang kartu ATM fisik atau aplikasi resmi, bukan dari hasil pencarian Google yang rentan nomor palsu.",
    },
    {
      order: 2,
      title: "Laporkan ke Portal IASC (iasc.ojk.go.id)",
      desc: "Buka portal resmi iasc.ojk.go.id. Masukkan data kronologi, nomor rekening pelaku, nama bank penerima, dan bukti transfer untuk memicu penghentian aliran dana lintas ekosistem keuangan perbankan.",
      keyDetail: "Pastikan alamat di browser adalah iasc.ojk.go.id. Waspadai situs tiruan yang beredar di pesan penipuan.",
    },
    {
      order: 3,
      title: "Amankan Akun & Perangkat",
      desc: "Jika sempat memasang file APK mencurigakan atau membagikan kredensial, putuskan koneksi internet (mode pesawat), cabut izin aplikasi, dan segera ubah kata sandi serta PIN m-banking dari perangkat lain yang bersih.",
      keyDetail: "Jangan gunakan ponsel yang masih terinfeksi malware untuk mengganti PIN perbankan.",
    },
    {
      order: 4,
      title: "Buat Laporan Polisi (Surat Tanda Penerimaan Laporan / STPL)",
      desc: "Datangi kantor kepolisian (Polsek/Polres) bagian Sentra Pelayanan Kepolisian Terpadu (SPKT) untuk mendapatkan STPL resmi sebagai kelengkapan dokumen pemblokiran dan pembuktian hukum perbankan.",
      keyDetail: "Bawa cetakan mutasi rekening, tangkapan layar chat percakapan penipu, serta nomor tiket laporan bank.",
    },
    {
      order: 5,
      title: "Pantau Tiket Penanganan Laporan",
      desc: "Simpan nomor registrasi aduan dari bank dan nomor registrasi IASC untuk memeriksa perkembangan penelusuran dana secara berkala.",
      keyDetail: "Bank atau IASC tidak pernah meminta kamu mentransfer uang jaminan untuk mencairkan saldo yang diblokir.",
    },
  ],

  channelConfigs: {
    bank: {
      id: "bank",
      label: "Transfer Rekening Bank",
      iconName: "Landmark",
      firstActionHeadline: "Segera telepon nomor call center resmi di fisik kartu ATM.",
      specificInstructions: [
        "Sampaikan kepada petugas bank bahwa kamu telah menjadi korban penipuan transfer perbankan.",
        "Sebutkan rincian: nomor rekening pengirimmu, nomor rekening penerima (pelaku), nama bank tujuan, waktu tepat transaksi, dan nominal yang dikirim.",
        "Minta petugas membuat nomor tiket laporan penipuan transaksi dan menanyakan syarat formal untuk permintaan hold/blokir rekening penampung.",
      ],
      requiredEvidence: ["Bukti transfer mutasi (PDF/screenshot)", "Nomor rekening & bank pelaku", "Tangkapan layar chat"],
    },
    ewallet: {
      id: "ewallet",
      label: "Aplikasi E-Wallet (GoPay, OVO, DANA, ShopeePay)",
      iconName: "Wallet",
      firstActionHeadline: "Buka menu Bantuan di dalam aplikasi resmi e-wallet.",
      specificInstructions: [
        "Pilih riwayat transaksi yang mencurigakan dan klik 'Laporkan Masalah' atau hubungi customer service via live chat resmi.",
        "Jika akun e-walletmu diambil alih, segera hubungi call center melalui nomor telepon terpisah untuk membekukan akun sementara.",
        "Minta pihak e-wallet memblokir akun penerima dana penipuan.",
      ],
      requiredEvidence: ["ID Transaksi E-wallet", "Nomor ponsel pelaku", "Bukti percakapan"],
    },
    qris: {
      id: "qris",
      label: "Pembayaran QRIS Palsu / Merchant Bodong",
      iconName: "QrCode",
      firstActionHeadline: "Catat nama merchant (NMID) yang tertera pada bukti pembayaran.",
      specificInstructions: [
        "Periksa riwayat pembayaran di aplikasi m-banking atau e-wallet yang kamu gunakan untuk memindai QRIS.",
        "Catat NMID (National Merchant ID) dan nama acquirer (penyedia QRIS) yang tertera.",
        "Laporkan ke bankmu serta laporkan penyalahgunaan merchant ke penyedia QRIS terkait dan portal IASC.",
      ],
      requiredEvidence: ["Foto stiker QRIS fisik jika ada", "NMID & nama merchant dari struk digital", "Bukti mutasi"],
    },
    kripto: {
      id: "kripto",
      label: "Aset Kripto (Crypto / USDT)",
      iconName: "Coins",
      firstActionHeadline: "Catat TxID (Transaction Hash) dan alamat dompet (wallet address) tujuan.",
      specificInstructions: [
        "Transaksi blockchain bersifat tidak dapat dibatalkan (irreversible). Hubungi exchange tempatmu menarik dana (mis. Indodax, Tokocrypto) untuk menginfokan alamat penampung kriminal.",
        "Kumpulkan bukti wallet address dan TxID di blockchain explorer untuk dilaporkan ke SPKT kepolisian unit siber.",
      ],
      requiredEvidence: ["Transaction Hash (TxID)", "Alamat Wallet Pengirim & Penerima", "Bukti tangkapan layar platform"],
    },
    whatsapp: {
      id: "whatsapp",
      label: "Akun WhatsApp Dibajak / Diambil Alih",
      iconName: "MessageCircle",
      firstActionHeadline: "Kirim email darurat ke support@whatsapp.com dari perangkat lain.",
      specificInstructions: [
        "Subjek email: 'Hilang/Dicuri: Silakan nonaktifkan akun saya'. Di isi email, cantumkan nomormu dalam format internasional (+62...).",
        "Klarifikasi ke keluarga dan teman lewat media sosial lain bahwa WhatsApp-mu sedang dikuasai orang lain.",
        "Masuk kembali ke WhatsApp setelah beberapa jam menggunakan verifikasi SMS/panggilan baru dan aktifkan Verifikasi Dua Langkah (PIN 6 angka).",
      ],
      requiredEvidence: ["Nomor telepon akun yang dibajak", "Waktu pembajakan", "Tangkapan layar permintaan OTP palsu"],
    },
    apk: {
      id: "apk",
      label: "Menginstal File APK Berbahaya (.apk)",
      iconName: "Smartphone",
      firstActionHeadline: "SEGERA AKTIFKAN MODE PESAWAT (Airplane Mode) sekarang juga!",
      specificInstructions: [
        "Mengaktifkan mode pesawat memutus koneksi internet dan menghentikan pengiriman SMS/OTP ke server penyerang.",
        "Buka Pengaturan HP > Aplikasi > temukan aplikasi asing yang baru diinstal (seringkali menyamar tanpa ikon atau bernama 'Surat Undangan', 'Foto Paket', 'Cek Pajak') > Paksa Berhenti (Force Stop) > Copot Pemasangan (Uninstall).",
        "Bila ragu, lakukan Reset ke Setelan Pabrik (Factory Reset) setelah membackup dokumen penting.",
        "Segera ganti kata sandi dan PIN mobile banking dari perangkat komputer atau HP lain.",
      ],
      requiredEvidence: ["Nama file APK", "Nomor pengirim APK di WhatsApp/SMS", "Riwayat mutasi saldo jika ada kebocoran"],
    },
    pinjol: {
      id: "pinjol",
      label: "Diteror Pinjol Ilegal / Ditransfer Liar",
      iconName: "AlertTriangle",
      firstActionHeadline: "Jangan bayar ke rekening liar dan jangan panik terhadap ancaman.",
      specificInstructions: [
        "Simpan semua tangkapan layar pesan teror dan nomor penagih.",
        "Kirimkan pesan klarifikasi kepada keluarga dan kontak ponselmu bahwa datamu disalahgunakan.",
        "Laporkan ke Satgas PASTI OJK via email waspadainvestasi@ojk.go.id dan WhatsApp OJK 081-157-157-157.",
        "Copot pemasangan aplikasi pinjol dan cabut seluruh izin perangkat.",
      ],
      requiredEvidence: ["Nomor penagih", "Tangkapan layar teror chat/SMS", "Bukti mutasi transfer liar sepihak"],
    },
  },

  postReportWorkflow: [
    {
      order: 1,
      phase: "Verifikasi Laporan",
      description: "Petugas bank dan sistem IASC memeriksa keabsahan bukti transfer, identitas pelapor, dan riwayat mutasi rekening.",
      realisticNote: "Laporan palsu dapat dikenakan sanksi hukum.",
    },
    {
      order: 2,
      phase: "Penelusuran Aliran Dana",
      description: "Sistem menelusuri rantai rekening penerima tempat dana ditransfer, baik di bank yang sama maupun bank lain.",
      realisticNote: "Kecepatan bergantung pada seberapa cepat laporan masuk sebelum dana ditarik tunai.",
    },
    {
      order: 3,
      phase: "Pemblokiran Rekening Penampung",
      description: "Bila bukti kuat dan terindikasi kejahatan, bank penerima melakukan pembatasan dan pemblokiran terhadap rekening tujuan.",
      realisticNote: "Istilah resmi perbankan adalah pemblokiran atau penahanan transaksi sementara berdasarkan laporan tindak pidana tindak lanjut.",
    },
    {
      order: 4,
      phase: "Upaya Pengembalian Sisa Dana",
      description: "Jika masih ada sisa dana pada rekening yang diblokir, bank berkoordinasi dengan kepolisian untuk proses penyelesaian pengembalian kepada korban sesuai prosedur hukum.",
      realisticNote: "Pengembalian BUKAN JAMINAN karena seringkali saldo sudah terkuras habis sebelum pemblokiran efektif.",
    },
  ],

  secondLayerScamWarning: [
    {
      title: "Jasa 'Recovery Dana' Palsu di Media Sosial",
      description: "Waspadai akun di Instagram, X/Twitter, TikTok, atau Telegram yang mengaku 'hacker etis', 'pengacara siber', atau 'orang dalam OJK/bank' yang menawarkan jasa menarik kembali uangmu.",
      redFlags: [
        "Meminta biaya jasa di muka (upfront fee) atau biaya registrasi sebelum dana dikembalikan.",
        "Meminta kamu mentransfer biaya pajak atau uang pancingan ke rekening kripto/e-wallet baru.",
        "Meminta kode OTP atau kata sandi perbankan milikmu.",
      ],
    },
    {
      title: "Situs Web IASC Tiruan (Phishing IASC)",
      description: "Satgas PASTI mengingatkan adanya situs tiruan yang menyerupai portal IASC untuk memancing data korban.",
      redFlags: [
        "Alamat situs BUKAN iasc.ojk.go.id (misalnya iasc-bantuan.com, lapor-ojk.xyz, dll).",
        "Menghubungi korban via nomor WhatsApp anonim dan mengklaim sebagai petugas IASC yang meminta biaya administrasi pencairan.",
      ],
    },
  ],

  supporterGuide: {
    title: "Panduan untuk Pendamping (Keluarga / Teman Korban)",
    description: "Jika kamu mendampingi orang tua atau kerabat yang menjadi korban, perhatikan aspek legal dan emosional pendampingan.",
    legalPrerequisite: "Untuk membuat laporan perbankan atau kepolisian atas nama orang lain, pihak bank umumnya mewajibkan Surat Kuasa tertulis bertanda tangan di atas meterai beserta KTP asli korban.",
    actionChecklist: [
      "Dengarkan tanpa menghardik atau menyalahkan korban atas kelalaiannya.",
      "Bantu mengetik dan mencatat kronologi kejadian secara runtut.",
      "Siapkan fotokopi KTP korban, bukti transfer, dan buat draf Surat Kuasa jika kamu mewakili komunikasi formal.",
      "Dampingi korban saat berbicara dengan customer service bank atau petugas SPKT kepolisian.",
    ],
  },
};

/**
 * Validasi Integritas Build Modul m11
 * Menegakkan larangan kata terlarang dan kewajiban domain resmi tunggal
 */
export function validatePusatDaruratData(): boolean {
  const d = MODUL_PUSAT_DARURAT_DATA;
  if (!d.id || !d.title || !d.lastUpdated) {
    throw new Error("Modul m11: Data dasar tidak lengkap");
  }

  // Wajib domain tunggal iasc.ojk.go.id
  if (d.iascOfficialDomain !== "iasc.ojk.go.id") {
    throw new Error("Modul m11: Domain IASC resmi HANYA boleh iasc.ojk.go.id");
  }

  // Cek frasa terlarang
  const serialized = JSON.stringify(d).toLowerCase();
  if (serialized.includes("1-2 jam") || serialized.includes("pembekuan permanen")) {
    throw new Error("Modul m11: Ditemukan frasa terlarang (1-2 jam / pembekuan permanen)");
  }

  if (!d.realisticExpectations.asOf || !d.realisticExpectations.source) {
    throw new Error("Modul m11: Ekspektasi realistis wajib memiliki asOf dan source");
  }

  return true;
}

