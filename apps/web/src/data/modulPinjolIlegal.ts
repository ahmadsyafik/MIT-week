/**
 * Data Modul m10: Pola Pinjaman Online Ilegal
 * JagaRuang - Platform Edukasi Anti-Penipuan Digital
 *
 * Mengikuti pedoman literasi keuangan OJK dan Satgas PASTI:
 * - Batasan akses izin "CAMILAN" (Camera, Microphone, Location diperbolehkan untuk fintech berizin).
 * - Larangan akses kontak, galeri foto, riwayat panggilan, dan SMS.
 * - Pemisahan Pola A (mengajukan sendiri) vs Pola B (transfer sepihak / pencurian data).
 * - Non-judgmental, menenangkan, tanpa janji/nasihat hukum, 100% lokal offline.
 */

export interface ModulSource {
  agency: string;
  title: string;
  url?: string;
  asOf: string;
  verified: boolean;
  notes?: string;
}

export interface PermissionItem {
  id: string;
  name: string;
  technicalName: string;
  status: "forbidden" | "allowed_conditional";
  badgeLabel: string;
  explanation: string;
  riskIfGranted: string;
  legalContext: string;
}

export interface QuizPinjol {
  id: string;
  scenario: string;
  options: {
    label: string;
    isSuspicious: boolean;
    explanation: string;
  }[];
  correctAnswerIndex: number;
}

export interface ModulPinjolData {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  lastUpdated: string;
  readingTimeMinutes: number;
  disclaimer: string;
  keyTakeaway: string;
  sources: ModulSource[];
  officialStats: {
    blockedEntitiesCount: number;
    complaintsCount: number;
    asOf: string;
    source: string;
    sourceUrl?: string;
    verified: boolean;
  };
  officialContacts: {
    channel: string;
    value: string;
    description: string;
    verificationNote: string;
  }[];
  permissionsGuide: PermissionItem[];
  comparisonTable: {
    feature: string;
    legalFintech: string;
    illegalPinjol: string;
  }[];
  scenarios: {
    id: "pola_a" | "pola_b";
    title: string;
    description: string;
    steps: {
      order: number;
      phase: string;
      description: string;
      safeExitPoint: string;
    }[];
  }[];
  whyTargetPersonalData: {
    title: string;
    explanation: string;
    slikGuide: {
      title: string;
      description: string;
      steps: string[];
      verificationNote: string;
    };
  };
  emergencyTerrorPanel: {
    headline: string;
    calmMessage: string;
    steps: {
      order: number;
      title: string;
      desc: string;
      caution?: string;
    }[];
    messageTemplates: {
      id: string;
      target: string;
      purpose: string;
      templateText: string;
    }[];
  };
  safeFinancialAlternatives: {
    title: string;
    items: {
      type: string;
      description: string;
      consideration: string;
    }[];
  };
  quizList: QuizPinjol[];
}

export const MODUL_PINJOL_ILEGAL_DATA: ModulPinjolData = {
  id: "m10",
  title: "Pola Pinjaman Online Ilegal",
  subtitle: "Mengenali batasan izin aplikasi, jebakan teror kontak, dan langkah perlindungan diri.",
  slug: "pinjol-ilegal",
  lastUpdated: "2026-11-07",
  readingTimeMinutes: 5,
  disclaimer:
    "Modul ini bersifat edukasi umum dan bukan nasihat hukum atau keuangan. Aturan regulator dan modus terus berkembang. Jika kamu membutuhkan bantuan hukum atau pemeriksaan status entitas secara resmi, hubungi OJK atau lembaga bantuan hukum.",
  keyTakeaway:
    "Pinjol resmi tidak memerlukan akses kontak ponsel dan galerimu. Cek legalitas ke OJK sebelum mengunduh aplikasi, dan jika kamu sedang diteror, kamu tidak sendirian: kumpulkan bukti dan laporkan.",

  sources: [
    {
      agency: "Otoritas Jasa Keuangan (OJK)",
      title: "Regulasi Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI) / Fintech Lending",
      url: "https://www.ojk.go.id", // TODO: verifikasi manual di ojk.go.id
      asOf: "2026-09-30",
      verified: false,
      notes: "Aturan izin data pribadi peminjam: POJK 40/2024 & POJK 10/2022 (prinsip CAMILAN)",
    },
    {
      agency: "Satgas Pemberantasan Aktivitas Keuangan Ilegal (Satgas PASTI)",
      title: "Siaran Pers Rekapitulasi Penghentian Entitas Pinjol Ilegal Periode 2026",
      url: "https://www.ojk.go.id", // TODO: verifikasi manual siaran pers Satgas PASTI
      asOf: "2026-09-30",
      verified: false,
    },
  ],

  officialStats: {
    blockedEntitiesCount: 951,
    complaintsCount: 25875,
    asOf: "30 September 2026",
    source: "Satgas PASTI OJK",
    sourceUrl: "https://www.ojk.go.id", // TODO: verifikasi manual rilis Satgas PASTI
    verified: false,
  },

  officialContacts: [
    {
      channel: "Kontak Telepon OJK",
      value: "157",
      description: "Layanan konsultasi legalitas dan pengaduan konsumen jasa keuangan.",
      verificationNote: "// TODO: verifikasi manual di ojk.go.id (jam operasional hari kerja)",
    },
    {
      channel: "WhatsApp Resmi OJK",
      value: "081-157-157-157",
      description: "Ketik nama aplikasi untuk memeriksa status izin berizin/ilegal secara otomatis.",
      verificationNote: "// TODO: verifikasi manual nomor centang hijau resmi OJK",
    },
    {
      channel: "Email Pengaduan Satgas PASTI",
      value: "waspadainvestasi@ojk.go.id",
      description: "Penerimaan laporan dan aduan masyarakat terkait aktivitas keuangan ilegal.",
      verificationNote: "// TODO: verifikasi manual alamat email Satgas PASTI OJK",
    },
    {
      channel: "Portal Pengaduan Konsumen OJK",
      value: "konsumen.ojk.go.id",
      description: "Portal Aplikasi Portal Perlindungan Konsumen (APPK).",
      verificationNote: "// TODO: verifikasi manual di portal APPK OJK",
    },
  ],

  permissionsGuide: [
    {
      id: "contacts",
      name: "Kontak Telepon",
      technicalName: "READ_CONTACTS",
      status: "forbidden",
      badgeLabel: "DILARANG KERAS",
      explanation: "Aplikasi pinjol resmi dilarang keras membaca daftar kontak di ponselmu.",
      riskIfGranted: "Nomor keluarga, rekan kerja, dan teman akan disedot untuk dijadikan sasaran intimidasi jika terjadi keterlambatan pembayaran.",
      legalContext: "Sesuai POJK, fintech legal dilarang meminta izin ini.",
    },
    {
      id: "storage",
      name: "Foto, Media & Galeri",
      technicalName: "READ_MEDIA_IMAGES / STORAGE",
      status: "forbidden",
      badgeLabel: "DILARANG KERAS",
      explanation: "Aplikasi dilarang meminta izin menyeluruh untuk menelusuri folder galeri fotomu.",
      riskIfGranted: "Foto pribadi berpotensi dicuri, diedit, atau dijadikan alat pemerasan dan pencemaran nama baik di media sosial.",
      legalContext: "Unggah dokumen pendukung hanya boleh dilakukan per berkas melalui pemilih sistem, bukan izin baca seluruh galeri.",
    },
    {
      id: "sms",
      name: "Pesan Singkat (SMS)",
      technicalName: "READ_SMS / RECEIVE_SMS",
      status: "forbidden",
      badgeLabel: "DILARANG KERAS",
      explanation: "Aplikasi dilarang meminta akses membaca riwayat dan lalu lintas SMS.",
      riskIfGranted: "SMS perbankan, kode OTP akun e-commerce, dan pesan sensitif dapat disadap oleh operator aplikasi ilegal.",
      legalContext: "Regulator melarang akses pembacaan SMS secara mandiri oleh aplikasi pinjaman.",
    },
    {
      id: "call_log",
      name: "Riwayat Panggilan Telepon",
      technicalName: "READ_CALL_LOG",
      status: "forbidden",
      badgeLabel: "DILARANG KERAS",
      explanation: "Aplikasi dilarang menginspeksi siapa saja orang yang sering kamu telepon.",
      riskIfGranted: "Penagih ilegal mengetahui relasi paling aktif untuk diteror saat menagih utang.",
      legalContext: "Akses riwayat panggilan tidak relevan dengan penilaian kredit sah.",
    },
    {
      id: "camera",
      name: "Kamera",
      technicalName: "CAMERA",
      status: "allowed_conditional",
      badgeLabel: "DIPERBOLEHKAN (CAMILAN)",
      explanation: "Fintech resmi diperbolehkan meminta izin kamera.",
      riskIfGranted: "Hanya untuk verifikasi identitas (e-KYC), foto fisik KTP, dan swafoto wajah langsung (liveness detection).",
      legalContext: "Termasuk dalam prinsip CAMILAN (Camera, Microphone, Location). Namun, izin ini saja bukan bukti aplikasi tersebut legal.",
    },
    {
      id: "microphone",
      name: "Mikrofon",
      technicalName: "RECORD_AUDIO",
      status: "allowed_conditional",
      badgeLabel: "DIPERBOLEHKAN (CAMILAN)",
      explanation: "Fintech resmi diperbolehkan meminta akses mikrofon jika terdapat fitur wawancara verifikasi.",
      riskIfGranted: "Digunakan saat perekaman pernyataan persetujuan atau interaksi verifikasi suara secara langsung.",
      legalContext: "Termasuk dalam CAMILAN. Catatan: aplikasi ilegal juga bisa meminta izin ini.",
    },
    {
      id: "location",
      name: "Lokasi Perangkat (GPS)",
      technicalName: "ACCESS_FINE_LOCATION",
      status: "allowed_conditional",
      badgeLabel: "DIPERBOLEHKAN (CAMILAN)",
      explanation: "Fintech berizin OJK diperbolehkan mengakses lokasi kasar/halus perangkat peminjam.",
      riskIfGranted: "Digunakan untuk validasi pencegahan fraud dan kesesuaian domisili saat proses pengajuan pendanaan.",
      legalContext: "Termasuk dalam CAMILAN. Akses lokasi TIDAK membuktikan kelegalan entitas, tetapi bukan red flag mutlak.",
    },
  ],

  comparisonTable: [
    {
      feature: "Regulasi & Izin",
      legalFintech: "Berizin dan diawasi resmi oleh OJK (terdaftar di direktori resmi ojk.go.id).",
      illegalPinjol: "Tidak terdaftar atau beroperasi tanpa izin regulator (ilegal).",
    },
    {
      feature: "Akses Izin di Ponsel",
      legalFintech: "Hanya meminta akses CAMILAN (Kamera, Mikrofon, Lokasi) untuk verifikasi KYC.",
      illegalPinjol: "Meminta izin agresif: Kontak telepon, Galeri Foto, SMS, dan Riwayat Panggilan.",
    },
    {
      feature: "Keterbukaan Biaya",
      legalFintech: "Bunga, biaya administrasi, dan denda dipaparkan transparan sebelum persetujuan kontrak.",
      illegalPinjol: "Potongan biaya di muka sangat tinggi, bunga melonjak eksponensial tanpa kejelasan.",
    },
    {
      feature: "Tenor Pinjaman",
      legalFintech: "Jangka waktu cicilan terstruktur jelas sesuai perjanjian yang disepakati.",
      illegalPinjol: "Tenor sangat pendek (seringkali beberapa hari saja) dan tanggal jatuh tempo dimajukan sepihak.",
    },
    {
      feature: "Etika Penagihan",
      legalFintech: "Wajib mematuhi kode etik asosiasi (AFPI), dilarang mengancam fisik maupun melakukan kekerasan verbal.",
      illegalPinjol: "Menagih dengan teror terorganisir, pelecehan seksual verbal, dan menyebarkan data ke seluruh kontak korban.",
    },
    {
      feature: "Pusat Layanan Konsumen",
      legalFintech: "Memiliki alamat kantor fisik jelas, call center resmi, dan unit pengaduan konsumen.",
      illegalPinjol: "Alamat fiktif atau di luar negeri, identitas penagih anonim dan sering berganti nomor.",
    },
  ],

  scenarios: [
    {
      id: "pola_a",
      title: "Pola A: Mengajukan Sendiri Karena Kebutuhan Mendesak",
      description: "Korban tergiur janji proses cepat 5 menit tanpa syarat rumit saat sedang membutuhkan dana darurat.",
      steps: [
        {
          order: 1,
          phase: "Melihat Iklan / Pesan Blast",
          description: "Menerima tawaran pinjaman cepat via SMS/WhatsApp atau iklan media sosial yang menawarkan pencairan instan tanpa BI checking.",
          safeExitPoint: "Titik Keluar 1: Abaikan penawaran lewat SMS/chat pribadi. Lembaga keuangan berizin dilarang menawarkan pinjaman via saluran komunikasi pribadi tanpa persetujuan.",
        },
        {
          order: 2,
          phase: "Mengunduh APK / Menginstal Aplikasi",
          description: "Aplikasi diminta diunduh lewat link tautan luar (file APK) atau aplikasi yang belum lama terbit di store.",
          safeExitPoint: "Titik Keluar 2: Periksa status legalitas di WhatsApp OJK (081-157-157-157) dengan mengetik nama aplikasi sebelum mengunduh.",
        },
        {
          order: 3,
          phase: "Permintaan Izin Akses Berbahaya",
          description: "Saat pertama kali dibuka, aplikasi meminta izin membaca seluruh kontak dan galeri foto untuk melanjutkan.",
          safeExitPoint: "Titik Keluar 3: SEGERA BATALKAN & UNINSTALL jika aplikasi meminta izin kontak atau galeri. Ini adalah tanda bahaya utama.",
        },
        {
          order: 4,
          phase: "Pencairan dengan Potongan Ekstrem",
          description: "Pinjaman diajukan Rp 2.000.000, namun yang masuk ke rekening hanya Rp 1.200.000 dengan tagihan penuh beserta bunga tinggi.",
          safeExitPoint: "Titik Keluar 4: Simpan seluruh bukti transfer dan rincian transaksi sebagai bukti ketidaksesuaian perjanjian.",
        },
        {
          order: 5,
          phase: "Teror Penagihan Kontak",
          description: "Sebelum atau tepat pada hari jatuh tempo yang dipercepat, penagih mulai mengirim pesan intimidasi ke kontak ponsel korban.",
          safeExitPoint: "Titik Keluar 5: Masuk ke panel darurat di bawah: klarifikasi ke kontak terdekat, amankan perangkat, dan laporkan ke Satgas PASTI.",
        },
      ],
    },
    {
      id: "pola_b",
      title: "Pola B: Rekening Ditransfer Sepihak (Tanpa Mengajukan)",
      description: "Korban tiba-tiba menerima sejumlah dana di rekening tanpa pernah mendaftar, diikuti ancaman pelunasan bunga tinggi.",
      steps: [
        {
          order: 1,
          phase: "Penyalahgunaan Data Pribadi Bocor",
          description: "Data KTP dan rekening korban didapat pelaku dari kebocoran data digital atau formulir fiktif terdahulu.",
          safeExitPoint: "Pencegahan: Jangan pernah mengunggah foto KTP ke formulir pendaftaran yang tidak jelas kredibilitasnya.",
        },
        {
          order: 2,
          phase: "Dana Masuk Tiba-Tiba",
          description: "Ada mutasi masuk dari pengirim tidak dikenal dengan nominal tertentu ke rekening bank/e-wallet korban.",
          safeExitPoint: "Titik Keluar Kritis: JANGAN GUNAKAN UANG ITU. Menyimpan atau memakai uang tersebut akan membuat posisi korban semakin rumit.",
        },
        {
          order: 3,
          phase: "Teror Penagihan Dimulai",
          description: "Beberapa hari kemudian, nomor tak dikenal menghubungi dengan nada mengancam, menuntut pengembalian dana berkali lipat.",
          safeExitPoint: "Titik Keluar Kritis: Tolak mentransfer ke rekening pribadi penagih liar. Hubungi bank pengelola rekeningmu untuk meminta mediasi dan retur dana ke pengirim asli secara resmi.",
        },
        {
          order: 4,
          phase: "Pelaporan ke OJK / Kepolisian",
          description: "Kumpulkan bukti mutasi bank dan tangkapan layar pesan teror untuk dilaporkan sebagai tindakan pemerasan sepihak.",
          safeExitPoint: "Titik Keluar Kritis: Sampaikan laporan tertulis ke Satgas PASTI OJK bahwa kamu adalah korban transfer liar sepihak.",
        },
      ],
    },
  ],

  whyTargetPersonalData: {
    title: "Kenapa Data Pribadi & Kontak Jadi Sasaran Utama?",
    explanation:
      "Pinjol ilegal tidak memiliki kantor resmi, jaminan sertifikat, atau penilaian kredit yang sah. Senjata terkuat mereka adalah rasa malu dan ketakutan sosialmu. Dengan menguasai nomor orang tua, pasangan, atasan kantor, dan rekan kerja, mereka memiliki alat tawar untuk melakukan doxing, fitnah, dan pelecehan sosial massal sampai korban panik dan mencari pinjaman lain untuk melunasi (gali lubang tutup lubang).",
    slikGuide: {
      title: "Waspada Pencurian Identitas (Pinjaman Atas Namamu)",
      description:
        "Jika data KTP-mu pernah bocor atau dicatut pihak lain untuk berutang di fintech resmi, kamu dapat memeriksa catatan riwayat fasilitas pendanaan resmi lewat layanan Informasi Debitur (iDeb / SLIK OJK).",
      steps: [
        "Akses permohonan informasi debitur secara mandiri melalui portal resmi OJK (iDebKu).",
        "Periksa apakah terdapat fasilitas pinjaman aktif dari penyelenggara yang tidak pernah kamu ajukan.",
        "Jika ditemukan pencatutan data, buat surat sanggahan tertulis kepada penyelenggara terkait serta tembuskan ke OJK.",
      ],
      verificationNote: "// TODO: verifikasi manual cara akses SLIK OJK / iDebKu di idebku.ojk.go.id",
    },
  },

  emergencyTerrorPanel: {
    headline: "Langkah Tenang Jika Kamu Sedang Diteror Pinjol Ilegal",
    calmMessage:
      "Tarik napas dalam-dalam. Tekanan dan teror yang mereka lakukan dirancang khusus untuk membuatmu panik dan mengambil keputusan gegabah. Kamu tidak sendirian, dan ada langkah terstruktur untuk melindungi dirimu serta orang di sekitarmu.",
    steps: [
      {
        order: 1,
        title: "Jangan Panik dan Jangan Bayar Biaya Liar Tambahan",
        desc: "Jangan mentransfer dana ke nomor rekening pribadi yang terus berubah dengan janji 'penghapusan data'. Penipu tidak akan pernah menghapus data korban dan justru akan terus memeras jika korban menunjukkan ketakutan.",
      },
      {
        order: 2,
        title: "Dokumentasikan Seluruh Bukti Teror",
        desc: "Simpan tangkapan layar (screenshot) pesan ancaman, nomor telepon penagih, bukti transfer mutasi bank, dan rincian kontak yang dihubungi sebelum memblokir nomor penagih.",
        caution: "Simpan bukti di folder aman / Google Drive agar tidak hilang saat perangkat dibersihkan.",
      },
      {
        order: 3,
        title: "Beri Pemberitahuan Proaktif ke Keluarga & Kontak",
        desc: "Kirim pesan klarifikasi singkat kepada keluarga, teman, dan rekan kerja bahwa datamu telah disalahgunakan dan meminta mereka mengabaikan pesan dari penagih tak dikenal.",
      },
      {
        order: 4,
        title: "Copot Pemasangan (Uninstall) & Cabut Izin Aplikasi",
        desc: "Cabut semua izin di pengaturan ponsel lalu copot aplikasi ilegal tersebut untuk menghentikan pengumpulan data telemetri baru.",
      },
      {
        order: 5,
        title: "Laporkan ke Kanal Resmi",
        desc: "Kirimkan laporan pengaduan ke Satgas PASTI OJK dan kepolisian jika terdapat unsur ancaman kekerasan, fitnah, atau pelecehan seksual.",
      },
    ],
    messageTemplates: [
      {
        id: "family_broadcast",
        target: "Keluarga & Rekan Kerja",
        purpose: "Mencegah kepanikan kontak dan mematahkan taktik pemerasan penagih.",
        templateText:
          "Halo semuanya, mohon maaf mengganggu. Saya ingin menginfokan bahwa data pribadi dan nomor kontak saya telah disalahgunakan oleh pihak tidak bertanggung jawab untuk penagihan liar atas nama saya. Jika ada nomor tak dikenal yang menghubungi dan menagih utang atau membagikan pesan bernada kasar atas nama saya, mohon abaikan, jangan tanggapi, dan JANGAN mentransfer dana sepeser pun. Terima kasih atas pengertian dan bantuannya.",
      },
      {
        id: "official_report",
        target: "Draf Laporan Satgas PASTI / OJK",
        purpose: "Kerangka laporan cepat tanpa mencantumkan rahasia sensitif.",
        templateText:
          "Laporan Aktivitas Penagihan Ilegal / Transfer Liar:\n\nNama Aplikasi: [nama aplikasi fiktif/terduga]\nTanggal Transaksi / Teror Dimulai: [DD/MM/YYYY]\nNomor Penagih yang Meneror: [daftar nomor telepon penagih]\nRekening Tujuan yang Diminta Penagih: [nama bank & nomor rekening]\nRingkasan Kasus Singkat: [Jelaskan apakah mengajukan sendiri atau ditransfer sepihak, potongan biaya ekstrem, serta bentuk ancaman yang dilakukan terhadap daftar kontak]\nLampiran: [Tangkapan layar bukti teror, bukti mutasi rekening, dan izin aplikasi]",
      },
    ],
  },

  safeFinancialAlternatives: {
    title: "Alternatif Sumber Dana yang Aman & Terdaftar",
    items: [
      {
        type: "Perbankan Resmi / Fasilitas KTA Sah",
        description: "Bank umum menyediakan fasilitas kredit mikro atau tanpa agunan dengan bunga dan syarat yang diatur ketat oleh Bank Indonesia dan OJK.",
        consideration: "Memerlukan kelengkapan dokumen penghasilan dan riwayat skor kredit yang sehat.",
      },
      {
        type: "Koperasi Simpan Pinjam Berizin Kemenkop",
        description: "Layanan simpan pinjam berbasis keanggotaan koperasi yang sah dan diawasi oleh Kementerian Koperasi dan UKM.",
        consideration: "Umumnya mensyaratkan pendaftaran sebagai anggota aktif terlebih dahulu.",
      },
      {
        type: "Fintech Lending (LPBBTI) Berizin OJK",
        description: "Penyelenggara pendanaan digital resmi yang terdaftar di situs direktori OJK dan mematuhi kode etik batasan bunga serta larangan akses kontak.",
        consideration: "Selalu pastikan nama aplikasinya terdaftar persis di situs resmi ojk.go.id sebelum mengajukan.",
      },
    ],
  },

  quizList: [
    {
      id: "q1",
      scenario: "Sebuah aplikasi pinjaman meminta izin akses ke Buku Kontak dan Galeri Foto ponselmu saat registrasi awal. Apakah ini normal?",
      options: [
        {
          label: "Normal, karena aplikasi membutuhkan kontak darurat untuk penjamin pinjaman.",
          isSuspicious: false,
          explanation: "Keliru. Fintech resmi DILARANG KERAS meminta akses ke buku kontak ponsel. Kontak darurat diisi manual atas izin yang bersangkutan.",
        },
        {
          label: "Mencurigakan & Red Flag. Pinjol resmi hanya boleh mengakses Kamera, Mikrofon, dan Lokasi (CAMILAN).",
          isSuspicious: true,
          explanation: "Tepat sekali. Meminta akses seluruh kontak adalah ciri mutlak pinjol ilegal untuk sarana intimidasi.",
        },
      ],
      correctAnswerIndex: 1,
    },
    {
      id: "q2",
      scenario: "Aplikasi pinjaman 'Dana Kilat' meminta izin Kamera dan Lokasi GPS saat kamu mengunggah foto KTP. Apakah aplikasi ini pasti ilegal?",
      options: [
        {
          label: "Pasti ilegal, karena aplikasi keuangan tidak boleh meminta izin perangkat apa pun.",
          isSuspicious: false,
          explanation: "Kurang tepat. Kamera dan lokasi diperbolehkan bagi pinjol berizin untuk proses e-KYC. Namun, izin ini saja tidak menjamin kelegalan aplikasi; kamu tetap wajib mengecek nomor izinnya di OJK.",
        },
        {
          label: "Belum tentu ilegal. Kamera dan lokasi diperbolehkan bagi fintech resmi (CAMILAN), namun kamu tetap harus memeriksa status izinnya di OJK.",
          isSuspicious: true,
          explanation: "Tepat sekali! Meminta kamera dan lokasi bukan berarti ilegal, karena itu diperbolehkan regulator untuk KYC. Yang dilarang adalah kontak dan galeri.",
        },
      ],
      correctAnswerIndex: 1,
    },
    {
      id: "q3",
      scenario: "Kamu menerima transfer misterius Rp 1.000.000 ke rekeningmu. Esok harinya, seseorang menelepon memaki dan meminta pengembalian Rp 1.800.000 ke rekening pribadinya. Langkah paling tepat:",
      options: [
        {
          label: "Segera transfer Rp 1.800.000 ke rekening orang tersebut agar namamu tidak dicemarkan.",
          isSuspicious: false,
          explanation: "Sangat berbahaya! Membayar teror pemerasan sepihak akan membuat pelaku terus memerasmu dengan nominal lebih besar.",
        },
        {
          label: "Jangan gunakan uang tersebut, tolak transfer ke rekening liar, simpan mutasi, hubungi bank untuk retur resmi, dan lapor ke Satgas PASTI.",
          isSuspicious: true,
          explanation: "Benar sekali! Pertahankan uang di rekening, jangan ditransfer ke pihak tak dikenal, minta bank memfasilitasi pengembalian dana salah transfer secara legal, dan buat laporan aduan.",
        },
      ],
      correctAnswerIndex: 1,
    },
    {
      id: "q4",
      scenario: "Kamu menerima tawaran pinjaman Rp 50.000.000 lewat pesan blast WhatsApp pribadi dari nomor acak dengan iming-iming 'cair 5 menit tanpa bunga'.",
      options: [
        {
          label: "Tawaran sah dari mitra perbankan resmi yang sedang promosi akhir tahun.",
          isSuspicious: false,
          explanation: "Keliru. Penyelenggara jasa keuangan berizin DILARANG melakukan penawaran produk melalui sarana komunikasi pribadi (SMS/WA) tanpa persetujuan konsumen.",
        },
        {
          label: "Tawaran ilegal dan indikasi kuat penipuan berkedok pinjaman dana.",
          isSuspicious: true,
          explanation: "Tepat. Tawaran pinjaman lewat pesan pribadi ke nomor acak hampir dapat dipastikan berasal dari pinjol ilegal atau scammer berkedok biaya administrasi.",
        },
      ],
      correctAnswerIndex: 1,
    },
  ],
};

/**
 * Validasi integritas build untuk Modul m10
 * Memastikan setiap fakta memiliki sumber dan periode
 */
export function validatePinjolData(): boolean {
  const d = MODUL_PINJOL_ILEGAL_DATA;
  if (!d.id || !d.title || !d.lastUpdated) {
    throw new Error("Modul m10: Properti dasar tidak lengkap");
  }
  if (!d.sources || d.sources.length === 0) {
    throw new Error("Modul m10: Sumber wajib dicantumkan");
  }
  for (const s of d.sources) {
    if (!s.agency || !s.title || !s.asOf) {
      throw new Error(`Modul m10: Sumber ${s.title} tidak memiliki agency atau asOf`);
    }
  }
  if (!d.officialStats.source || !d.officialStats.asOf) {
    throw new Error("Modul m10: Statistik resmi wajib memiliki source dan asOf");
  }
  return true;
}

