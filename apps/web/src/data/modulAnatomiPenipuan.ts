// Data terstruktur untuk Modul Pembelajaran m2: Anatomi Sebuah Penipuan
// Target: Masyarakat awam Indonesia, bahasa santai, edukatif, tanpa klaim absolut.

export interface InterventionPoint {
  phaseNumber: number;
  phaseName: string;
  technicalTerm: string;
  difficulty: "mudah" | "kritis";
  difficultyLabel: string;
  summary: string;
  exampleSnippet: string;
  howToStop: string;
}

export interface CaseStep {
  step: number;
  title: string;
  sender: string;
  message: string;
  victimAction: string;
  attackerBehindTheScenes: string;
  safetyTip: string;
}

export interface AlternativeFlow {
  id: string;
  name: string;
  badge: string;
  summary: string;
  steps: {
    title: string;
    description: string;
    intervention: string;
  }[];
}

export interface GlossaryItem {
  id: string;
  term: string;
  simpleExplanation: string;
  example: string;
  dangerLevel: "waspada" | "bahaya";
}

export interface RedFlagItem {
  id: string;
  title: string;
  severity: "kuning" | "merah";
  severityLabel: string;
  explanation: string;
  whatToDo: string;
}

export interface ChecklistAction {
  id: string;
  action: string;
  whySafe: string;
  verificationSource?: string;
}

export interface VictimStep {
  order: number;
  title: string;
  timeline: string;
  action: string;
  warning?: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  options: {
    phase: number;
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface ModulAnatomiData {
  id: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  sources: { name: string; url?: string; note?: string }[];
  disclaimer: string;
  opener: {
    highlight: string;
    description: string;
  };
  phases: InterventionPoint[];
  caseStudy: {
    caseName: string;
    intro: string;
    steps: CaseStep[];
  };
  alternativeFlows: AlternativeFlow[];
  glossary: GlossaryItem[];
  redFlags: RedFlagItem[];
  checklist: ChecklistAction[];
  emergencySteps: VictimStep[];
  quiz: QuizQuestion[];
  takeaway: string;
}

export const MODUL_ANATOMI_PENIPUAN: ModulAnatomiData = {
  id: "m2",
  title: "Anatomi Sebuah Penipuan",
  readingTime: "5-6 menit baca",
  lastUpdated: "2026-11-07",
  sources: [
    {
      name: "Kementerian Komunikasi dan Digital (Komdigi) / Portal CekRekening.id",
      note: "[VERIFIKASI: Pastikan portal CekRekening.id aktif untuk cek nomor rekening perorangan]",
    },
    {
      name: "Otoritas Jasa Keuangan (OJK) - Satgas Pasti / IASC",
      note: "[VERIFIKASI: Periksa kanal pengaduan resmi IASC dan kontak call center OJK 157]",
    },
    {
      name: "Bareskrim Polri - Direktorat Tindak Pidana Siber (Patroli Siber)",
      note: "[VERIFIKASI: Periksa alur pelaporan online siber.polri.go.id]",
    },
  ],
  disclaimer:
    "Modul ini bersifat edukasi umum. Tampilan dan modus penipuan terus berkembang. Sebagian penipuan tidak melewati 5 fase lengkap melainkan langsung mengeksekusi dalam satu pesan singkat. Jika ragu, selalu verifikasi lewat kanal resmi independen.",
  opener: {
    highlight:
      "Banyak penipuan mengikuti pola yang serupa, tetapi tidak semuanya melewati 5 fase lengkap — sebagian pelaku langsung mengeksekusi jebakan dalam satu pesan singkat.",
    description:
      "Dengan memahami alur umum penipuan, kamu bisa mengenali 'di mana posisi kamu saat ini' dan mengambil rem darurat sebelum saldo, data, atau akunmu lenyap.",
  },
  phases: [
    {
      phaseNumber: 1,
      phaseName: "Mengumpulkan Data",
      technicalTerm: "Reconnaissance / Profiling",
      difficulty: "mudah",
      difficultyLabel: "Masih Sangat Mudah Berhenti",
      summary:
        "Pelaku mencari celah nomor kontak atau nama calon korban. Sebagian memakai data bocor yang beredar di internet, tetapi banyak juga yang sekadar mengirim pesan massal acak ke ribuan nomor tanpa tahu siapa kamu.",
      exampleSnippet:
        "Pesan tidak menyebut nama lengkapmu, atau menyebut namamu persis seperti format akun media sosial terbuka.",
      howToStop:
        "Abaikan pesan asing yang tidak jelas juntrungannya. Jangan membalas 'Ini siapa?' karena membalas menandakan nomormu aktif dan siap ditarget lebih lanjut.",
    },
    {
      phaseNumber: 2,
      phaseName: "Memancing",
      technicalTerm: "Baiting",
      difficulty: "mudah",
      difficultyLabel: "Masih Mudah Berhenti",
      summary:
        "Pelaku melempar umpan emosional: tawaran menggiurkan (hadiah gratis, diskon besar, loker gaji tinggi) atau ancaman mencemaskan (paket tertahan, denda tilang, rekening diblokir) agar kamu bereaksi cepat tanpa sempat berpikir jernih.",
      exampleSnippet:
        "\"Paket J&T Express Anda tertahan di gudang karena alamat rusak! Klik tautan untuk verifikasi sebelum dibuang besok!\"",
      howToStop:
        "Tarik napas sejenak. Tanyakan ke diri sendiri: 'Apakah aku memang memesan paket ini?' Jangan pernah klik tautan atau file di pesan yang memicu kepanikan mendadak.",
    },
    {
      phaseNumber: 3,
      phaseName: "Membangun Cerita",
      technicalTerm: "Pretexting",
      difficulty: "mudah",
      difficultyLabel: "Masih Mudah Berhenti",
      summary:
        "Pelaku menyamar dengan skenario dan identitas palsu yang tampak meyakinkan. Mereka bisa memasang logo kurir resmi, memakai seragam bank di foto profil, atau mengaku sebagai customer service yang sopan dan siap membantu.",
      exampleSnippet:
        "\"Halo Kak, saya Budi dari CS Ekspedisi Kilat Nusantara. Mohon maaf paket Kakak tertahan nomor resi #EXP-9921...\"",
      howToStop:
        "Verifikasi lewat jalur mandiri yang kamu cari sendiri di Google atau aplikasi resmi, bukan lewat nomor kontak atau tautan yang diberikan orang tersebut.",
    },
    {
      phaseNumber: 4,
      phaseName: "Menjebak",
      technicalTerm: "Execution / The Trap",
      difficulty: "kritis",
      difficultyLabel: "Fase Kritis — Titik Balik Terakhir",
      summary:
        "Di fase ini, jebakan dieksekusi. Kamu diarahkan untuk mengunduh file (.apk berkedok foto/dokumen), mentransfer biaya admin ke rekening perorangan, atau memasukkan kode OTP/PIN ke situs web tiruan.",
      exampleSnippet:
        "\"Silakan instal aplikasi Pelacakan_Paket.apk ini untuk melihat foto paket Kakak dan bayar denda Rp15.000 ke rekening Bpk. Slamet...\"",
      howToStop:
        "JANGAN PERNAH instal file .apk dari chat! JANGAN PERNAH transfer uang admin untuk klaim hadiah! Jika sudah terlanjur instal, langsung nyalakan Mode Pesawat (Airplane Mode) ponselmu sekarang juga.",
    },
    {
      phaseNumber: 5,
      phaseName: "Menghilang",
      technicalTerm: "Disengagement & Cashing Out",
      difficulty: "kritis",
      difficultyLabel: "Sudah Terlambat — Masuk Jalur Mitigasi",
      summary:
        "Setelah uang masuk ke rekening penampung atau kode OTP berhasil mencuri saldo m-Banking, pelaku langsung memblokir nomormu, menghapus chat percakapan, dan memindahkan uang ke akun lain dalam hitungan menit.",
      exampleSnippet:
        "Nomor WhatsApp pelaku tiba-tiba hanya centang satu, foto profil hilang, dan nomor call center tidak lagi dapat dihubungi.",
      howToStop:
        "Fase pencegahan sudah lewat. Segera beralih ke 'Langkah Darurat Korban': telepon call center bank untuk blokir rekening dan amankan perangkat.",
    },
  ],
  caseStudy: {
    caseName: "Bedah Kasus Nyata: Jebakan File APK Berkedok Paket Tertahan",
    intro:
      "Berikut adalah simulasi alur langkah demi langkah yang dialami ribuan korban di Indonesia. Nama perusahaan kurir dan nama pengirim di bawah adalah fiktif.",
    steps: [
      {
        step: 1,
        title: "Pesan WhatsApp Tiba-tiba Masuk",
        sender: "Nomor Asing (+62 882-9912-3841) dengan foto profil logo kurir fiktif 'CepatKilat'",
        message:
          "\"Yth. Pelanggan CepatKilat, paket Anda no. resi CK-90821 tidak dapat dikirim karena alamat tidak terbaca. Harap cek foto paket pada lampiran di bawah.\"",
        victimAction:
          "Korban teringat bahwa adiknya memang sempat memesan barang online beberapa hari lalu, sehingga korban merasa pesan ini nyata.",
        attackerBehindTheScenes:
          "Fase 1 (Data) & Fase 2 (Memancing): Pelaku menyebarkan template broadcast ini ke ribuan nomor sekaligus secara acak.",
        safetyTip:
          "Ekspedisi resmi selalu menghubungi lewat aplikasi kurir atau SMS resmi bertanda pengirim terverifikasi, bukan nomor seluler biasa yang mengirim file instalasi.",
      },
      {
        step: 2,
        title: "Pengiriman File Berbahaya (.apk)",
        sender: "Akun Pelaku",
        message:
          "File lampiran bernama: 'LIHAT_FOTO_PAKET_RUSAK.apk' (Ukuran 8.4 MB). Pelaku menulis: 'Kak tolong klik dan instal aplikasinya ya biar kebuka foto paketnya.'",
        victimAction:
          "Korban mengira file tersebut adalah foto dokumen dan menekan tombol 'Unduh' lalu 'Instal'.",
        attackerBehindTheScenes:
          "Fase 3 (Pretexting) & Fase 4 (Jebakan): Berkas tersebut bukan foto, melainkan program jahat peretas (malware) yang meminta izin membaca SMS di ponsel Android.",
        safetyTip:
          "Foto asli selalu berekstensi .jpg, .png, atau .webp. Jika akhir nama file adalah '.apk', itu adalah aplikasi perangkat lunak!",
      },
      {
        step: 3,
        title: "Izin Berbahaya Diberikan",
        sender: "Layar Ponsel Korban",
        message:
          "Muncul pop-up Android: 'Izinkan aplikasi ini membaca dan mengirim pesan SMS? [Tolak] [Izinkan]'",
        victimAction:
          "Karena terburu-buru ingin melihat foto paket, korban menekan tombol 'Izinkan'. Layar aplikasi sempat berkedip lalu kembali normal.",
        attackerBehindTheScenes:
          "Fase 4 (Eksekusi Kritis): Aplikasi jahat langsung berjalan di latar belakang (background) tanpa ikon di layar depan, siap menyadap SMS masuk.",
        safetyTip:
          "Aplikasi kurir tidak pernah membutuhkan izin membaca pesan SMS pribadi di ponselmu.",
      },
      {
        step: 4,
        title: "Saldo Terkuras di Latar Belakang",
        sender: "Sistem Bank Korban",
        message:
          "SMS masuk dari bank: 'Kode OTP transfer Rp4.500.000 ke Bank X no. rek 8829... adalah 492102. JANGAN BERIKAN KODE INI KE SIAPAPUN.'",
        victimAction:
          "Korban bahkan tidak sempat melihat SMS ini karena malware langsung meneruskan isi SMS ke bot Telegram pelaku dan menghapus pesan SMS dari kotak masuk korban.",
        attackerBehindTheScenes:
          "Fase 5 (Menghilang): Pelaku memasukkan OTP ke akun m-Banking korban yang sudah disadap sebelumnya, menguras saldo ke rekening penampung, dan mematikan server.",
        safetyTip:
          "Jika kamu terlanjur menekan izin berbahaya, segera aktifkan Mode Pesawat (Airplane Mode) seketika untuk memutus koneksi internet malware ke server penipu.",
      },
    ],
  },
  alternativeFlows: [
    {
      id: "undian",
      name: "Penipuan Hadiah / Undian Palsu",
      badge: "Alur Singkat (3 Fase Langsung Eksekusi)",
      summary:
        "Modus hadiah biasanya memangkas fase pengumpulan data dan langsung melompat dari broadcast massal ke pembayaran 'biaya administrasi'.",
      steps: [
        {
          title: "1. Umpan Ledakan Kegembiraan",
          description:
            "Pesan SMS/DM: 'Selamat! Nomor Anda terpilih memenangkan undian Rp50 Juta dari Bank Bintang. Hubungi WA 0812...'",
          intervention:
            "Tanya diri: Apakah kamu pernah mendaftar undian ini? Hadiah resmi diumumkan terbuka di situs resmi perbankan, bukan lewat SMS acak.",
        },
        {
          title: "2. Jebakan Biaya Administrasi / Pajak Hadiah",
          description:
            "Pelaku meminta korban mentransfer 'biaya pencairan / pajak 10%' sebesar Rp1.500.000 ke rekening perorangan sebelum hadiah dikirim.",
          intervention:
            "ATURAN MUTLAK: Pemenang undian resmi TIDAK PERNAH diminta transfer biaya di muka. Pajak hadiah selalu dipotong langsung dari nilai hadiah.",
        },
        {
          title: "3. Pelaku Menghilang",
          description:
            "Setelah korban mentransfer, nomor korban langsung diblokir atau dimintai biaya tambahan baru dengan alasan 'bea materai'.",
          intervention:
            "Jika sudah transfer, jangan kirim sepeser pun lagi meskipun diancam denda. Segera hubungi bank untuk lapor rekening penampung.",
        },
      ],
    },
    {
      id: "keluarga",
      name: "Penipuan 'Ganti Nomor' Mengaku Kerabat",
      badge: "Alur Manipulasi Kedekatan Emosional",
      summary:
        "Pelaku menyamar sebagai anak, saudara, atau teman dekat yang baru saja ganti nomor telepon dan berada dalam situasi mendesak.",
      steps: [
        {
          title: "1. Menanamkan Kepercayaan (Pretexting Ramah)",
          description:
            "Chat WhatsApp dari nomor baru: 'Halo Bu, ini nomorku yang baru ya. Nomor lama error/rusak, simpan yang ini dulu ya.'",
          intervention:
            "Jangan langsung simpan atau percaya. Telepon balik ke nomor lama kerabatmu atau konfirmasi lewat anggota keluarga yang lain.",
        },
        {
          title: "2. Cerita Darurat Meminjam Uang",
          description:
            "Beberapa jam kemudian: 'Bu, ini teman lagi butuh pinjam uang operasi mendadak Rp2 Juta, tapi m-Banking-ku lagi limit. Bisa tolong transferkan dulu ke rek temanku ini?'",
          intervention:
            "Lakukan 'Video Call' atau dengarkan suaranya langsung. Penipu akan selalu menolak panggilan video dengan seribu alasan (sinyal jelek, lagi rapat).",
        },
        {
          title: "3. Saldo Berpindah & Jejak Hilang",
          description:
            "Uang masuk ke rekening perorangan orang lain. Saat anak asli menelepon sore harinya, korban baru tersadar telah tertipu.",
          intervention:
            "Gunakan 'Sandi Rahasia Keluarga' (fitur Sandi JagaRuang) untuk memastikan identitas kerabat sebelum mentransfer uang.",
        },
      ],
    },
  ],
  glossary: [
    {
      id: "baiting",
      term: "Baiting (Memancing Umpan)",
      simpleExplanation:
        "Taktik memikat korban menggunakan sesuatu yang sangat menggiurkan (seperti iming-iming hadiah gratis, voucer belanja) atau hal yang sangat menakutkan (ancaman pemblokiran akun, denda tilang).",
      example:
        "Contoh: 'Selamat kamu menang saldo Rp2.000.000! Klik tautan ini dalam 10 menit untuk klaim.'",
      dangerLevel: "waspada",
    },
    {
      id: "pretexting",
      term: "Pretexting (Membangun Cerita Palsu)",
      simpleExplanation:
        "Skenario drama kebohongan yang dirancang pelaku agar korban percaya bahwa permintaan informasi atau transfer tersebut sah dan beralasan.",
      example:
        "Contoh: Mengaku sebagai kurir yang salah alamat atau petugas bank yang sedang memeriksa sistem keamanan.",
      dangerLevel: "waspada",
    },
    {
      id: "apk-berbahaya",
      term: "File APK Berbahaya",
      simpleExplanation:
        "Format aplikasi untuk ponsel Android yang dipasang dari luar Google Play Store. Jika dipasang, aplikasi ini dapat menyadap isi SMS, membaca kode OTP m-Banking, bahkan mengendalikan layar ponsel korban.",
      example:
        "Contoh: File bernama 'Surat_Undangan.apk' atau 'Foto_Paket.apk' yang dikirim lewat WhatsApp chat.",
      dangerLevel: "bahaya",
    },
    {
      id: "rekening-penampung",
      term: "Rekening Penampung (Nominee)",
      simpleExplanation:
        "Rekening bank atau akun e-wallet atas nama orang lain (seringkali warga yang dibeli buku tabungannya atau dipinjam identitasnya) yang digunakan penipu untuk menampung uang kejahatan sebelum ditarik tunai.",
      example:
        "Contoh: Belanja di toko yang mengaku perusahaan resmi PT ABC, tetapi diminta mentransfer ke rekening perorangan atas nama Bpk. Maman.",
      dangerLevel: "bahaya",
    },
  ],
  redFlags: [
    {
      id: "admin-fee",
      title: "Biaya Administrasi untuk Klaim Hadiah",
      severity: "merah",
      severityLabel: "Bahaya Pasti",
      explanation:
        "Hadiah resmi tidak pernah meminta pemenang mentransfer uang muka untuk 'membuka blokir' atau 'biaya kurir'.",
      whatToDo: "Segera putus kontak dan blokir nomor pengirim.",
    },
    {
      id: "rahasia",
      title: "Diminta Merahasiakan Percakapan",
      severity: "merah",
      severityLabel: "Manipulasi Emosi",
      explanation:
        "Pelaku melarangmu bertanya ke keluarga atau datang ke kantor bank dengan dalih 'promo rahasia' atau 'kasus tertutup'.",
      whatToDo:
        "Selalu ceritakan dan diskusikan pesan tersebut dengan orang terdekat sebelum mengambil tindakan.",
    },
    {
      id: "rekening-berubah",
      title: "Rekening Tujuan Menggunakan Nama Pribadi",
      severity: "merah",
      severityLabel: "Bahaya Finansial",
      explanation:
        "Transaksi dengan institusi resmi, marketplace, atau toko besar tidak pernah menggunakan rekening atas nama perorangan.",
      whatToDo:
        "Cek riwayat rekening tersebut di portal CekRekening.id sebelum mengirim uang sepeser pun.",
    },
    {
      id: "file-apk",
      title: "Pengiriman Tautan Aneh atau File Berformat .APK",
      severity: "merah",
      severityLabel: "Bahaya Pengambilalihan",
      explanation:
        "Pengirim di chat mengirim file dengan akhiran .apk berkedok surat undangan, resi paket, atau berkas tilang kepolisian.",
      whatToDo: "Jangan pernah ketuk file tersebut. Hapus chat seketika.",
    },
    {
      id: "tekanan-waktu",
      title: "Tekanan Waktu Singkat ('Harus Sekarang')",
      severity: "kuning",
      severityLabel: "Perlu Waspada",
      explanation:
        "Kamu dipaksa memutuskan dalam waktu 5-15 menit agar otak tidak sempat menganalisis logika situasi dengan tenang.",
      whatToDo:
        "Tunda dan perlambat. Keadaan darurat perbankan resmi selalu bisa dikonfirmasi di jam kerja lewat kantor cabang terdekat.",
    },
    {
      id: "unsolicited",
      title: "Kontak Datang Tiba-tiba Tanpa Diminta",
      severity: "kuning",
      severityLabel: "Perlu Waspada",
      explanation:
        "Pesan atau panggilan masuk tanpa kamu pernah meminta informasi tersebut sebelumnya.",
      whatToDo:
        "Verifikasi kebenaran informasi lewat kanal resmi yang kamu cari sendiri secara independen.",
    },
  ],
  checklist: [
    {
      id: "chk-1",
      action: "Berhenti sejenak dan tanya diri: apakah aku memang menunggu hadiah/telepon/paket ini?",
      whySafe:
        "Menghilangkan dorongan reaktif impulsif yang menjadi target utama manipulasi rekayasa sosial.",
    },
    {
      id: "chk-2",
      action:
        "Verifikasi lewat kanal resmi yang kamu cari sendiri (bukan nomor kontak atau tautan dari pengirim pesan).",
      whySafe:
        "Menjamin kamu terhubung ke institusi yang sebenarnya, bukan ke nomor palsu milik sindikat pelaku.",
    },
    {
      id: "chk-3",
      action: "Cek nama pemilik rekening tujuan di portal CekRekening.id sebelum mentransfer.",
      whySafe:
        "Melihat apakah nomor rekening tujuan telah memiliki riwayat pelaporan kejahatan penipuan aktif.",
      verificationSource:
        "// TODO: verifikasi manual nama dan fungsi portal CekRekening.id Komdigi",
    },
    {
      id: "chk-4",
      action: "Simpan tangkapan layar (screenshot) percakapan, nomor kontak, dan nomor rekening sebagai bukti.",
      whySafe:
        "Bukti digital ini mutlak dibutuhkan pihak bank dan kepolisian jika proses penelusuran atau blokir hukum harus dilakukan.",
    },
  ],
  emergencySteps: [
    {
      order: 1,
      title: "Hubungi Call Center Bank / E-Wallet Segera",
      timeline: "Dalam 1 - 2 Jam Pertama (Golden Period)",
      action:
        "Minta pihak bank membekukan sementara akun m-Banking milikmu dan mengajukan pemblokiran rekening tujuan milik penipu.",
      warning:
        "// TODO: verifikasi manual nomor resmi call center bank penerbit kartumu dari balik fisik kartu debit/kredit.",
    },
    {
      order: 2,
      title: "Putuskan Akses Perangkat (Jika Pasang File APK)",
      timeline: "Seketika Tanpa Ditunda",
      action:
        "Segera aktifkan 'Mode Pesawat' (Airplane Mode), copot kartu SIM, dan lakukan reset pabrik (Factory Reset) ponsel jika perlu untuk membersihkan malware.",
    },
    {
      order: 3,
      title: "Ganti Seluruh Kata Sandi & PIN Keuangan",
      timeline: "Dari Perangkat Bersih yang Berbeda",
      action:
        "Ubah kata sandi email utama, akun m-Banking, e-wallet, dan akun media sosial dari komputer atau ponsel keluarga yang aman.",
    },
    {
      order: 4,
      title: "Buat Laporan Resmi ke Pihak Berwenang",
      timeline: "Maksimal 1 x 24 Jam",
      action:
        "Laporkan nomor rekening penipu ke portal CekRekening.id dan buat laporan resmi di kantor kepolisian terdekat atau portal Patroli Siber (siber.polri.go.id).",
      warning:
        "// TODO: verifikasi manual syarat berkas laporan ke kepolisian (bawa KTP, mutasi rekening, dan cetak bukti chat).",
    },
  ],
  quiz: [
    {
      id: 1,
      scenario:
        "Seseorang mengirim chat WA menawarkan loker admin ketik berpenghasilan Rp500.000/hari tanpa syarat pengalaman. Berada di fase manakah tindakan pelaku ini?",
      options: [
        {
          phase: 1,
          label: "Fase 1: Mengumpulkan Data",
          isCorrect: false,
          explanation:
            "Kurang tepat. Pelaku sudah mulai melempar tawaran menggiurkan ke calon korban.",
        },
        {
          phase: 2,
          label: "Fase 2: Memancing (Baiting)",
          isCorrect: true,
          explanation:
            "Tepat! Pelaku menggunakan umpan gaji fantastis yang tidak realistis untuk memicu rasa antusias dan ketertarikan cepat korban.",
        },
        {
          phase: 4,
          label: "Fase 4: Menjebak (Eksekusi)",
          isCorrect: false,
          explanation:
            "Belum sampai tahap jebakan transfer deposit modal atau pemasangan aplikasi berbahaya.",
        },
      ],
    },
    {
      id: 2,
      scenario:
        "Kamu diminta memasang file bernama 'Undangan_Pernikahan.apk' agar bisa melihat denah lokasi pesta pernikahan kerabat. Berada di fase manakah situasi ini?",
      options: [
        {
          phase: 3,
          label: "Fase 3: Membangun Cerita",
          isCorrect: false,
          explanation:
            "Cerita sudah selesai dibangun, saat ini korban diarahkan untuk melakukan tindakan instalasi fatal.",
        },
        {
          phase: 4,
          label: "Fase 4: Menjebak (Eksekusi Kritis)",
          isCorrect: true,
          explanation:
            "Tepat! Pengiriman file aplikasi jahat (.apk) adalah jebakan utama untuk menyusupkan malware pencuri SMS OTP ke ponselmu.",
        },
        {
          phase: 5,
          label: "Fase 5: Menghilang",
          isCorrect: false,
          explanation:
            "Pelaku belum menghilang karena malware belum terpasang dan saldo belum terkuras.",
        },
      ],
    },
    {
      id: 3,
      scenario:
        "Setelah mentransfer 'biaya administrasi hadiah' Rp300.000, nomor WhatsApp kamu tiba-tiba diblokir oleh admin undian. Berada di fase manakah ini?",
      options: [
        {
          phase: 2,
          label: "Fase 2: Memancing",
          isCorrect: false,
          explanation:
            "Umpan sudah berhasil dimakan korban dan uang telah berpindah.",
        },
        {
          phase: 4,
          label: "Fase 4: Menjebak",
          isCorrect: false,
          explanation:
            "Tahap jebakan transfer sudah terjadi beberapa menit sebelumnya.",
        },
        {
          phase: 5,
          label: "Fase 5: Menghilang (Cashing Out)",
          isCorrect: true,
          explanation:
            "Tepat! Pelaku memutus kontak dan mengamankan dana hasil kejahatan ke rekening penampung berikutnya.",
        },
      ],
    },
  ],
  takeaway:
    "Penipuan bukanlah sihir yang tak bisa dihentikan. Hampir semua skema memberikan sinyal kejanggalan sebelum eksekusi terjadi. Memutus komunikasi di fase 1, 2, atau 3 adalah cara paling mudah untuk menyelamatkan diri tanpa kerugian.",
};

