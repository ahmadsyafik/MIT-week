// =============================================================================
// DATA RESMI MODUL: APA ITU REKAYASA SOSIAL? (JAGARUANG)
// Disusun untuk edukasi literasi keamanan digital masyarakat awam Indonesia.
// Tanggal pembaruan konten tercatat dan dapat diaudit secara berkala.
// =============================================================================

export interface ScenarioHookChoice {
  id: "A" | "B" | "C";
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface ScenarioHookData {
  sender: string;
  timestamp: string;
  messageText: string;
  question: string;
  choices: ScenarioHookChoice[];
  callout: string;
}

export interface PsychologicalPrinciple {
  id: string;
  name: string;
  tag: string;
  explanation: string;
  exampleMessage: string;
  iconName: string;
}

export interface AttackType {
  id: string;
  name: string;
  channel: string;
  definition: string;
  indonesiaExample: string;
  iconName: string;
}

export interface AnatomyStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  dangerLevel: "Rendah" | "Sedang" | "Tinggi" | "Kritis";
  iconName: string;
}

export interface RedFlagDetail {
  id: string;
  label: string;
  explanation: string;
  tag: string;
}

export interface ComparisonMessage {
  type: "official" | "fake";
  title: string;
  senderName: string;
  senderAddress: string;
  messageBody: string;
  ctaText?: string;
  redFlags?: {
    id: string;
    textSnippet: string;
    reason: string;
  }[];
}

export interface ActionChecklistItem {
  id: string;
  task: string;
  reason: string;
  labelType: "rekomendasi_praktis" | "kewajiban_mutlak";
}

export interface EmergencyMitigationStep {
  step: number;
  title: string;
  urgency: string;
  actionText: string;
  contactHelper?: string;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: "A" | "B" | "C";
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface OfficialSource {
  institution: string;
  service: string;
  contact: string;
  url: string;
  note: string;
}

export interface ModulRekayasaSosialContent {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  terakhirDiperbarui: string; // ISO Date YYYY-MM-DD
  terakhirDiperbaruiLabel: string;
  disclaimerEdukasi: string;
  summary: string;
  takeaway: string;
  scenarioHook: ScenarioHookData;
  definition: {
    core: string;
    analogy: string;
    callout: string;
  };
  principles: PsychologicalPrinciple[];
  attackTypes: AttackType[];
  anatomy: AnatomyStep[];
  comparison: {
    official: ComparisonMessage;
    fake: ComparisonMessage;
  };
  redFlags: RedFlagDetail[];
  checklist: ActionChecklistItem[];
  emergencyMitigation: EmergencyMitigationStep[];
  quiz: QuizQuestion[];
  badgeReward: {
    title: string;
    description: string;
    icon: string;
  };
  sources: OfficialSource[];
}

export const MODUL_REKAYASA_SOSIAL: ModulRekayasaSosialContent = {
  id: "m1",
  title: "Apa Itu Rekayasa Sosial?",
  category: "Dasar Keamanan",
  readingTime: "5-6 menit baca",
  terakhirDiperbarui: "2026-11-07",
  terakhirDiperbaruiLabel: "7 November 2026",
  disclaimerEdukasi:
    "Modul ini bersifat edukasi umum untuk melatih kewaspadaan masyarakat. Modus dan variasi manipulasi penipuan terus berkembang di lapangan. Jika kamu merasa ragu, selalu verifikasi informasi secara mandiri melalui kanal resmi instansi atau perbankan terkait.",
  summary:
    "Memahami bagaimana penipu mengeksploitasi emosi manusia dan cara membangun jeda berpikir kritis sebelum mengambil tindakan.",
  takeaway:
    "Teknologi membantu, tetapi jeda berpikir dan verifikasi independen adalah pertahanan terkuat.",

  // 1. Hook Pembuka Interaktif
  scenarioHook: {
    sender: "NOTIFIKASI BANK (Nomor HP Biasa: +62 812-9844-1022)",
    timestamp: "10:14",
    messageText:
      "PERINGATAN RESMI: Rekening tabungan dan kartu ATM Anda akan diblokir permanen dalam 1 jam ke depan karena belum melakukan validasi data nasabah. Segera perbarui data akun Anda melalui tautan resmi ini: https://bit.ly/update-data-bank-bca",
    question: "Apa tindakan pertama yang akan kamu ambil saat menerima pesan seperti ini?",
    choices: [
      {
        id: "A",
        label: "Langsung klik tautan karena panik saldo rekening tidak bisa ditarik.",
        isCorrect: false,
        feedback:
          "Kurang tepat! Tautan bit.ly adalah pemendek URL yang menyamarkan situs web phishing pencuri PIN dan kata sandi rekeningmu.",
      },
      {
        id: "B",
        label: "Abaikan tautan, lalu hubungi call center resmi bank yang tercantum di balik kartu fisik ATM.",
        isCorrect: true,
        feedback:
          "Pilihan terbaik! Menghubungi kontak resmi yang kamu cari sendiri (bukan dari pesan yang mencurigakan) adalah kunci verifikasi independen.",
      },
      {
        id: "C",
        label: "Membalas SMS tersebut untuk menanyakan data pribadi apa saja yang belum lengkap.",
        isCorrect: false,
        feedback:
          "Berisiko! Membalas pesan mengonfirmasi bahwa nomor ponselmu aktif dan membuat penipu semakin gencar melancarkan teknik rekayasa sosial.",
      },
    ],
    callout:
      "Penipu sengaja menyematkan batas waktu mendesak (urgensi palsu) agar otak logismu mati dan kamu bertindak panik tanpa sempat memeriksa fakta.",
  },

  // 2. Definisi Rekayasa Sosial
  definition: {
    core: "Rekayasa sosial (social engineering) adalah seni manipulasi psikologis. Di sini, penipu tidak bersusah payah meretas enkripsi data perbankan atau sistem komputer yang rumit, melainkan mengeksploitasi pikiran, kebiasaan, dan respons emosional manusia.",
    analogy:
      "Ibarat sebuah rumah dengan pintu baja dan gembok terkuat: penipu tidak berusaha mendobrak pintu baja tersebut, melainkan menyamar sebagai petugas paket atau kerabat agar pemilik rumah membukakan pintunya dengan sukarela.",
    callout:
      "Teknologi keamanan secanggih apa pun akan runtuh jika pemilik kunci dengan sukarela menyerahkan kata sandi atau kode OTP kepada orang asing.",
  },

  // 3. Kenapa Kita Bisa Tertipu (5 Prinsip Psikologis)
  principles: [
    {
      id: "otoritas",
      name: "Otoritas (Authority)",
      tag: "Peniruan Lembaga",
      explanation:
        "Manusia cenderung patuh dan enggan mendebat figur berseragam atau instansi resmi yang dianggap berwenang mengatur hukum dan keuangan.",
      exampleMessage:
        '"Saya dari Divisi Kejahatan Siber Kepolisian / Satgas Penegakan Hukum Pajak. Anda terlibat dugaan pencucian uang."',
      iconName: "ShieldAlert",
    },
    {
      id: "urgensi",
      name: "Urgensi (Urgency)",
      tag: "Tekanan Waktu",
      explanation:
        "Menciptakan batas waktu ekstrem agar korban tidak sempat berpikir jernih, berdiskusi dengan keluarga, atau mengecek fakta.",
      exampleMessage:
        '"Batas waktu konfirmasi tersisa 15 menit. Jika tidak direspons sekarang, kuota promo cashback Rp 5.000.000 otomatis hangus."',
      iconName: "Clock",
    },
    {
      id: "rasa-takut",
      name: "Rasa Takut (Fear)",
      tag: "Ancaman Kerugian",
      explanation:
        "Memanfaatkan rasa takut kehilangan dana, ancaman hukuman penjara, pemblokiran rekening, atau aib keluarga yang tersebar.",
      exampleMessage:
        '"Surat Panggilan Pidana: Rekening Anda terindikasi menampung dana gelap. Segera hubungi penyidik untuk mediasi damai."',
      iconName: "AlertTriangle",
    },
    {
      id: "iming-iming",
      name: "Iming-iming (Greed / Opportunity)",
      tag: "Peluang Instan",
      explanation:
        "Menawarkan keuntungan yang terdengar terlalu muluk untuk menjadi kenyataan seperti undian berhadiah miliaran, kerja paruh waktu mudah bergaji tinggi, atau kupon flash sale tak wajar.",
      exampleMessage:
        '"Selamat! Nomor Anda terpilih memenangkan saldo tunai Rp 75.000.000 dari Gebyar Promo Nasional. Klaim hadiahmu di sini."',
      iconName: "Sparkles",
    },
    {
      id: "rasa-percaya",
      name: "Rasa Percaya & Sungkan (Trust & Social Proof)",
      tag: "Hubungan Kerabat",
      explanation:
        "Memanfaatkan rasa sungkan antar-teman, simpati kemanusiaan, atau kepanikan saat mendengar anggota keluarga sedang mengalami musibah.",
      exampleMessage:
        '"Mah/Pah, ini aku ganti nomor HP sementara karena nomorku yang lama hilang. Tolong transfer uang kosan sekarang ke rekening temanku."',
      iconName: "Heart",
    },
  ],

  // 4. Jenis-Jenis Rekayasa Sosial
  attackTypes: [
    {
      id: "phishing",
      name: "Phishing (Situs Web & Email Tiruan)",
      channel: "Email & Web Link",
      definition:
        "Upaya memancing data pribadi (kata sandi, nomor kartu, PIN) menggunakan situs web atau email tiruan yang menyerupai institusi terpercaya.",
      indonesiaExample:
        "Email mengatasnamakan Direktorat Pajak atau perbankan yang mengarahkan korban ke formulir pembaruan data nasabah palsu.",
      iconName: "Globe",
    },
    {
      id: "smishing",
      name: "Smishing (SMS Phishing)",
      channel: "Pesan Singkat SMS",
      definition:
        "Pancingan phishing yang dikirimkan melalui saluran SMS dengan tautan berbahaya atau iming-iming hadiah mendesak.",
      indonesiaExample:
        "SMS pemberitahuan paket ekspedisi tertahan di gudang atau SMS ancaman pemblokiran kartu seluler jika tidak klik tautan.",
      iconName: "MessageSquare",
    },
    {
      id: "vishing",
      name: "Vishing (Voice Call Phishing)",
      channel: "Panggilan Suara / Telepon",
      definition:
        "Manipulasi percakapan telepon langsung untuk menekan korban agar segera menyerahkan kode rahasia atau mentransfer uang.",
      indonesiaExample:
        "Panggilan dari 'Customer Service Bank' yang meminta 6 digit kode OTP perbankan dengan dalih membatalkan tagihan kartu kredit fiktif.",
      iconName: "PhoneCall",
    },
    {
      id: "pretexting",
      name: "Pretexting (Rekaan Skenario Terstruktur)",
      channel: "Chat & Media Sosial",
      definition:
        "Menyusun cerita rekaan yang sangat mendetail dan masuk akal untuk memancing korban memberikan informasi rahasia atau dana.",
      indonesiaExample:
        "Tawaran pekerjaan paruh waktu Admin WFH dengan iming-iming komisi besar, namun pelamar diwajibkan menyetor uang deposit awal terlebih dahulu.",
      iconName: "FileCode",
    },
    {
      id: "baiting",
      name: "Baiting (Umpan Berkas Beracun / Malware)",
      channel: "Lampiran Dokumen / Chat",
      definition:
        "Menyodorkan umpan berkas menarik yang di dalamnya disusupi virus pencuri data atau aplikasi berbahaya (trojan).",
      indonesiaExample:
        "Penyebaran file berkas `.apk` berkedok surat undangan pernikahan digital, foto bukti resi kurir paket, atau surat tilang kepolisian di WhatsApp.",
      iconName: "Download",
    },
    {
      id: "impersonation",
      name: "Impersonation (Penyamaran Identitas)",
      channel: "WhatsApp & Telegram",
      definition:
        "Menyamar secara utuh sebagai orang atau pihak yang dikenal korban (keluarga, bos di kantor, rekan satu organisasi) menggunakan akun tiruan.",
      indonesiaExample:
        "Pesan WhatsApp memakai foto profil atasan kantor yang meminta transfer mendadak ke rekening pribadi karena alasan meeting penting.",
      iconName: "UserCheck",
    },
  ],

  // 5. Anatomi Penipuan (4 Tahap Timeline)
  anatomy: [
    {
      step: 1,
      title: "Pancingan Awal (Approach)",
      subtitle: "Membuka Kontak Tanpa Curiga",
      description:
        "Pelaku membuka kontak pertama melalui jalur yang akrab (WhatsApp, SMS, telepon) menggunakan nomor asing dengan sapaan hangat atau darurat.",
      dangerLevel: "Rendah",
      iconName: "Send",
    },
    {
      step: 2,
      title: "Membangun Kepercayaan (Trust Building)",
      subtitle: "Menampilkan Identitas Palsu",
      description:
        "Pelaku menyodorkan bukti palsu: kop surat edaran, kartu pegawai rekaan, atau memanfaatkan informasi nama lengkap dan nomor rekeningmu yang bocor dari internet.",
      dangerLevel: "Sedang",
      iconName: "Award",
    },
    {
      step: 3,
      title: "Memicu Emosi (Emotional Trigger)",
      subtitle: "Mematikan Logika dengan Panik",
      description:
        "Pelaku melancarkan skenario darurat ('rekeningmu dibekukan dalam 15 menit', 'anakmu kecelakaan di rumah sakit') agar kamu tidak sempat berpikir jernih.",
      dangerLevel: "Tinggi",
      iconName: "Zap",
    },
    {
      step: 4,
      title: "Eksploitasi & Pemutusan Jejak (Action & Disappearance)",
      subtitle: "Pencurian Dana / Data Tuntas",
      description:
        "Korban yang tertekan akhirnya menyerahkan kode OTP, mentransfer uang, atau memasang aplikasi berbahaya. Setelah berhasil, pelaku langsung memblokir nomor kontak.",
      dangerLevel: "Kritis",
      iconName: "Lock",
    },
  ],

  // 6. Contoh Pesan Asli vs Palsu Berdampingan (Interactive Spotter)
  comparison: {
    official: {
      type: "official",
      title: "Contoh Pesan Resmi Institusi Bank",
      senderName: "BCA / BANK RESMI (Sender ID Terdaftar)",
      senderAddress: "SMS Sender ID: 'BANKBCA' / Centang Hijau WhatsApp",
      messageBody:
        "INFO RESMI: Kode OTP pendaftaran m-Banking Anda adalah 829104. HATI-HATI! JANGAN PERNAH berikan kode ini kepada SIAPAPUN, termasuk pihak Bank. Bank tidak pernah meminta kode OTP untuk alasan apa pun.",
      ctaText: "Aman: Tidak ada tautan mencurigakan & memperingatkan agar OTP dijaga.",
    },
    fake: {
      type: "fake",
      title: "Contoh Pesan Penipuan Rekayasa Sosial",
      senderName: "Admin Pembaruan Bank (Nomor Pribadi)",
      senderAddress: "+62 878-1920-3341 (Nomor GSM Biasa)",
      messageBody:
        "PERINGATAN: Rekening Anda terancam ditutup hari ini! Klik https://bca-pembaruan-tarif.com/login untuk pembatalan kenaikan biaya transaksi bulanan Rp 150.000. Hubungi segera sebelum saldo terpotong otomatis.",
      ctaText: "Bahaya: Menggunakan urgensi palsu, domain tiruan, dan nomor seluler biasa.",
      redFlags: [
        {
          id: "rf-sender",
          textSnippet: "+62 878-1920-3341",
          reason: "Bank resmi menggunakan nama resmi resmi (Sender ID) atau nomor WhatsApp bisnis bercentang hijau, bukan nomor ponsel seluler biasa.",
        },
        {
          id: "rf-urgency",
          textSnippet: "terancam ditutup hari ini!",
          reason: "Menciptakan kepanikan buatan agar korban terburu-buru mengklik tanpa sempat mengecek informasi ke kantor cabang.",
        },
        {
          id: "rf-link",
          textSnippet: "https://bca-pembaruan-tarif.com/login",
          reason: "Domain bukan domain resmi bank. Tautan ini mengarah ke situs web tiruan (phishing) untuk mencuri username, password, dan PIN.",
        },
        {
          id: "rf-pressure",
          textSnippet: "sebelum saldo terpotong otomatis",
          reason: "Mengancam kerugian finansial fiktif untuk memicu rasa takut kehilangan uang seketika.",
        },
      ],
    },
  },

  // 7. Red Flags Lengkap
  redFlags: [
    {
      id: "rf-1",
      label: "Urgensi dan Batas Waktu Palsu",
      explanation:
        "Penipu selalu menetapkan batas waktu sangat sempit (misal 'dalam 15 menit') untuk memicu kepanikan sehingga korban tidak sempat berdiskusi dengan orang lain.",
      tag: "Psikologi",
    },
    {
      id: "rf-2",
      label: "Permintaan Kode OTP, PIN, atau Kata Sandi",
      explanation:
        "Pihak perbankan, dompet digital, atau instansi resmi tidak pernah meminta kode OTP, PIN transaksi, atau kata sandimu dengan alasan apa pun.",
      tag: "Kredensial",
    },
    {
      id: "rf-3",
      label: "Ketidakcocokan Identitas Pengirim",
      explanation:
        "Mengaku sebagai instansi resmi atau layanan pelanggan ternama, namun menghubungi lewat nomor seluler biasa atau email gratisan (seperti @gmail.com).",
      tag: "Identitas",
    },
    {
      id: "rf-4",
      label: "Pengiriman Tautan Aneh atau File Aplikasi (.apk)",
      explanation:
        "Penyebaran tautan pemendek URL tidak resmi (bit.ly, s.id) atau lampiran berkas berekstensi ganda seperti `.jpg.apk` dan `.pdf.apk` yang sebenarnya adalah aplikasi penyadap SMS OTP.",
      tag: "Malware",
    },
    {
      id: "rf-5",
      label: "Instruksi untuk Merahasiakan Komunikasi",
      explanation:
        "Pelaku melarang korban berbicara dengan keluarga, rekan kerja, atau petugas bank terdekat dengan dalih 'operasi penyelidikan rahasia'.",
      tag: "Isolasi",
    },
    {
      id: "rf-6",
      label: "Permintaan Transfer ke Rekening Pribadi / Perorangan",
      explanation:
        "Transaksi instansi atau biaya administrasi resmi tidak pernah menggunakan nomor rekening atas nama pribadi perorangan.",
      tag: "Finansial",
    },
    {
      id: "rf-7",
      label: "Pemberitahuan Hadiah yang Tidak Pernah Diikuti",
      explanation:
        "Pengumuman menang undian miliaran rupiah padahal kamu tidak pernah membeli tiket undian atau mendaftar program promosi tersebut.",
      tag: "Umpan",
    },
  ],

  // 8. Checklist Tindakan Mandiri (dengan Alasan Rasional)
  checklist: [
    {
      id: "chk-1",
      task: "Tarik napas dan terapkan 'Jeda 5 Menit' saat menerima pesan bernada panik atau mendesak.",
      reason:
        "Saran praktis: Jeda 5 menit memberi waktu bagi hormon adrenalin untuk turun sehingga bagian otak logismu kembali aktif menganalisis kejanggalan.",
      labelType: "rekomendasi_praktis",
    },
    {
      id: "chk-2",
      task: "Verifikasi kontak pengirim melalui kanal resmi yang kamu cari sendiri secara mandiri.",
      reason:
        "Kewajiban mutlak: Jangan pernah menghubungi nomor telepon atau mengklik tautan yang tertera di dalam pesan yang sedang kamu curigai.",
      labelType: "kewajiban_mutlak",
    },
    {
      id: "chk-3",
      task: "Jaga kode OTP, PIN, dan Password layaknya kunci brankas pribadi milikmu.",
      reason:
        "Kewajiban mutlak: Kode OTP adalah persetujuan akhir perpindahan dana. Siapa pun yang meminta kode OTP pada dasarnya sedang berusaha mengambil uangmu.",
      labelType: "kewajiban_mutlak",
    },
    {
      id: "chk-4",
      task: "Sepakati 'Kata Sandi Rahasia Keluarga' untuk memvalidasi kabar darurat dari kerabat.",
      reason:
        "Rekomendasi praktis: Jika ada kontak mengaku kerabat meminta uang darurat, tanyakan kata sandi keluarga untuk memastikan bahwa akun mereka tidak sedang dibajak.",
      labelType: "rekomendasi_praktis",
    },
  ],

  // 9. Pertolongan Pertama Jika Terlanjur Jadi Korban (5 Langkah Berurutan)
  emergencyMitigation: [
    {
      step: 1,
      title: "Hubungi Bank / E-Wallet Segera",
      urgency: "Menit 1 - 15",
      actionText:
        "Telepon call center resmi bankmu seketika untuk meminta pemblokiran rekening, kartu ATM, dan akun m-Banking agar saldo yang tersisa tidak dapat ditarik pelaku.",
      contactHelper: "Gunakan nomor resmi di balik fisik kartu ATM atau aplikasi resmi.",
      iconName: "PhoneCall",
    },
    {
      step: 2,
      title: "Ganti Seluruh PIN dan Kata Sandi Kredensial",
      urgency: "Segera setelah lapor bank",
      actionText:
        "Ubah PIN m-Banking, kata sandi email utama, dan akses akun dompet digital. Pastikan kamu menggantinya dari perangkat lain yang aman (bukan dari ponsel yang terinfeksi file asing).",
      iconName: "KeyRound",
    },
    {
      step: 3,
      title: "Putuskan Akses Perangkat jika Memasang File Mencurigakan",
      urgency: "Wajib jika sempat klik file .apk",
      actionText:
        "Segera nyalakan Mode Pesawat (Airplane Mode) dan copot kartu SIM. Hapus aplikasi berbahaya melalui menu Pengaturan > Aplikasi, atau lakukan Reset ke Setelan Pabrik jika perlu.",
      iconName: "Smartphone",
    },
    {
      step: 4,
      title: "Amankan & Simpan Seluruh Bukti Digital",
      urgency: "Dokumentasi Hukum",
      actionText:
        "Ambil tangkapan layar (screenshot) nomor telepon penipu, riwayat obrolan pesan, nomor rekening tujuan transfer, serta mutasi transaksi perbankan untuk bahan laporan kepolisian.",
      iconName: "Camera",
    },
    {
      step: 5,
      title: "Laporkan ke Kanal Resmi Penegak Hukum & Otoritas",
      urgency: "Tindakan Lanjutan",
      actionText:
        "Laporkan rekening penipu ke portal CekRekening.id (Komdigi), buat laporan pengaduan ke Kontak 157 (OJK), dan ajukan laporan polisi ke kantor kepolisian terdekat.",
      contactHelper: "Portal: cekrekening.id • OJK: Kontak 157",
      iconName: "ShieldAlert",
    },
  ],

  // 10. Mini Kuis (4 Soal Interaktif)
  quiz: [
    {
      id: 1,
      question:
        "Nomor tak dikenal di WhatsApp mengirim pesan: 'Paket tertahan, silakan unduh bukti resi: Foto_Resi_Paket.jpg.apk'. Apa bahaya utama dari file tersebut?",
      options: [
        {
          key: "A",
          text: "File itu foto biasa, hanya saja format kompresinya diperkecil agar hemat kuota.",
          isCorrect: false,
        },
        {
          key: "B",
          text: "Itu adalah aplikasi Android mentah (.apk) berkedok foto yang dapat menyadap SMS dan mencuri kode OTP perbankan.",
          isCorrect: true,
        },
        {
          key: "C",
          text: "Tidak ada bahaya selama kita belum memasukkan nomor rekening di chat.",
          isCorrect: false,
        },
      ],
      explanation:
        "Trik ekstensi ganda (.jpg.apk) adalah modus penyamaran aplikasi malware pencuri OTP. Foto asli tidak pernah berekstensi .apk.",
    },
    {
      id: 2,
      question:
        "Seseorang menelepon mengaku petugas resmi bank. Ia meminta 6 digit kode OTP di SMS ponselmu untuk 'membatalkan transaksi gelap'. Tindakan apa yang benar?",
      options: [
        {
          key: "A",
          text: "Segera berikan karena ia petugas bank resmi yang ingin menolong uang kita.",
          isCorrect: false,
        },
        {
          key: "B",
          text: "Berikan 3 digit pertama saja untuk membuktikan identitas.",
          isCorrect: false,
        },
        {
          key: "C",
          text: "Tolak dan segera tutup telepon. Pihak bank resmi TIDAK PERNAH meminta kode OTP nasabah.",
          isCorrect: true,
        },
      ],
      explanation:
        "Kode OTP adalah tanda tangan digital rahasia. Siapa pun yang meminta kode OTP—sekalipun mengaku pihak bank—sedang mencoba membobol akunmu.",
    },
    {
      id: 3,
      question:
        "Rekan kerja di WhatsApp tiba-tiba meminta pinjaman dana darurat Rp 2 juta ke rekening atas nama orang lain. Langkah paling aman pertama kali adalah?",
      options: [
        {
          key: "A",
          text: "Langsung transfer karena merasa tidak enak dan sungkan terhadap teman dekat.",
          isCorrect: false,
        },
        {
          key: "B",
          text: "Telepon langsung nomor rekan tersebut via panggilan suara seluler biasa atau temui secara langsung untuk memastikan keaslian pesan.",
          isCorrect: true,
        },
        {
          key: "C",
          text: "Transfer separuhnya dulu agar tidak rugi terlalu banyak jika ternyata penipuan.",
          isCorrect: false,
        },
      ],
      explanation:
        "Akun WhatsApp rekanmu mungkin telah dibajak (account takeover). Selalu verifikasi langsung dengan suara asli atau jalur komunikasi lain sebelum mengirimkan uang.",
    },
    {
      id: 4,
      question:
        "Mengapa penipu rekayasa sosial hampir selalu memberikan batasan waktu mendesak (misal 'Konfirmasi dalam 10 menit!')?",
      options: [
        {
          key: "A",
          text: "Karena sistem perbankan memang memiliki batas waktu server yang singkat.",
          isCorrect: false,
        },
        {
          key: "B",
          text: "Agar calon korban panik, tertekan, dan tidak sempat mengecek kebenaran informasi ke orang lain.",
          isCorrect: true,
        },
        {
          key: "C",
          text: "Hanya sebagai formalitas tata bahasa layanan pelanggan internasional.",
          isCorrect: false,
        },
      ],
      explanation:
        "Urgensi palsu adalah senjata utama psikologis penipu agar korban bereaksi secara naluriah dan mengabaikan logika pencegahan.",
    },
  ],

  // 11. Badge Penghargaan Ringan
  badgeReward: {
    title: "Penjaga Anti-OTP",
    description:
      "Kamu telah menuntaskan modul pemahaman Rekayasa Sosial, mengenali 7 red flag utama, dan menguasai teknik jeda berpikir kritis.",
    icon: "ShieldCheck",
  },

  // 12. Daftar Sumber Resmi Beranotasi
  sources: [
    {
      institution: "Otoritas Jasa Keuangan (OJK)", // TODO: verifikasi manual
      service: "Kontak Konsumen & Pengaduan Keuangan OJK 157", // TODO: verifikasi manual
      contact: "Telepon: 157 • WhatsApp: 081-157-157-157", // TODO: verifikasi manual
      url: "https://ojk.go.id", // TODO: verifikasi manual
      note: "Regulator resmi sektor jasa keuangan dan pelaporan entitas keuangan ilegal di Indonesia.",
    },
    {
      institution: "Kementerian Komunikasi dan Digital (Komdigi)", // TODO: verifikasi manual
      service: "Portal CekRekening.id & AduanKonten.id", // TODO: verifikasi manual
      contact: "Layanan Aduan Konten & Database Rekening Penipuan", // TODO: verifikasi manual
      url: "https://cekrekening.id", // TODO: verifikasi manual
      note: "Basis data nasional pelaporan nomor rekening bank dan e-wallet yang terindikasi tindak pidana penipuan.",
    },
    {
      institution: "Badan Siber dan Sandi Negara (BSSN)", // TODO: verifikasi manual
      service: "Pusat Operasi Keamanan Siber Nasional (Gov-CSIRT)", // TODO: verifikasi manual
      contact: "Email: incident@bssn.go.id", // TODO: verifikasi manual
      url: "https://bssn.go.id", // TODO: verifikasi manual
      note: "Panduan literasi keamanan siber dan penanganan insiden digital masyarakat umum.",
    },
    {
      institution: "Bank Indonesia (BI)", // TODO: verifikasi manual
      service: "Contact Center Bank Indonesia BICARA 131", // TODO: verifikasi manual
      contact: "Telepon: 131 • Email: bicara@bi.go.id", // TODO: verifikasi manual
      url: "https://www.bi.go.id", // TODO: verifikasi manual
      note: "Otoritas sistem pembayaran nasional dan edukasi perlindungan konsumen sistem pembayaran.",
    },
    {
      institution: "Indonesia Anti-Scam Centre (IASC)", // TODO: verifikasi manual
      service: "Satuan Tugas Pemberantasan Penipuan Keuangan Digital", // TODO: verifikasi manual
      contact: "Kolaborasi OJK, Asosiasi Bank, dan Penegak Hukum", // TODO: verifikasi manual
      url: "https://ojk.go.id", // TODO: verifikasi manual
      note: "Pusat koordinasi pemblokiran cepat rekening perbankan penipu secara lintas bank.",
    },
  ],
};

