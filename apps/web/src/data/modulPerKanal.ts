// Schema generik modul per kanal (WhatsApp, SMS, Email, Telepon)
// Memastikan modul kanal lain di masa depan dapat memakai struktur yang sama.

export interface ModusChannelItem {
  id: string;
  name: string;
  shortLabel: string;
  summary: string;
  messageSnippet: string;
  senderProfile: string;
  redFlags: string[];
  howToStop: string;
  riskLevel: "waspada" | "kritis";
}

export interface SecurityAuditStep {
  id: string;
  title: string;
  menuPath: string; // Misal: Setelan > Akun > Verifikasi Dua Langkah
  instruction: string;
  verificationNote?: string;
}

export interface EmergencyAction {
  order: number;
  title: string;
  urgency: string;
  action: string;
  note?: string;
}

export interface ChannelQuizQuestion {
  id: number;
  messageScenario: string;
  senderInfo: string;
  options: {
    label: string;
    isReal: boolean;
    explanation: string;
  }[];
}

export interface ChannelModuleData {
  id: string;
  channelName: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  openerWhyChannel: {
    question: string;
    points: { title: string; desc: string }[];
  };
  comparisonCards: {
    title: string;
    leftCard: {
      heading: string;
      codeType: string;
      channel: string;
      rule: string;
      dangerIfShared: string;
    };
    rightCard: {
      heading: string;
      codeType: string;
      channel: string;
      rule: string;
      dangerIfShared: string;
    };
    sharedGoldenRule: string;
  };
  badgeVerificationGuide: {
    title: string;
    authentic: {
      title: string;
      location: string;
      howToSpot: string;
    };
    fakeEmoji: {
      title: string;
      location: string;
      howToSpot: string;
    };
  };
  modi: ModusChannelItem[];
  auditChecklist: SecurityAuditStep[];
  emergencyTakeover: {
    title: string;
    subtitle: string;
    steps: EmergencyAction[];
  };
  quiz: ChannelQuizQuestion[];
  sources: { name: string; url?: string; note?: string }[];
  disclaimer: string;
  takeaway: string;
}

export const MODUL_WHATSAPP: ChannelModuleData = {
  id: "m3",
  channelName: "WhatsApp",
  title: "Keamanan di WhatsApp",
  readingTime: "5 menit baca",
  lastUpdated: "2026-11-07",
  sources: [
    {
      name: "WhatsApp Help Center Resmi - Two-Step Verification & Account Security",
      note: "[VERIFIKASI: Periksa alur pemulihan akun di faq.whatsapp.com/general/account-and-profile/stolen-accounts]",
    },
    {
      name: "Kementerian Komunikasi dan Digital (Komdigi) - Panduan Keamanan Akun Pesan Instan",
      note: "[VERIFIKASI: Pastikan pedoman privasi aplikasi perpesanan komdigi.go.id]",
    },
    {
      name: "Bareskrim Polri - Modus Sniffing APK & Pembajakan WhatsApp",
      note: "[VERIFIKASI: Periksa siaran pers penanganan kejahatan siber siber.polri.go.id]",
    },
  ],
  disclaimer:
    "Modul ini bersifat edukasi umum. Tampilan antarmuka WhatsApp dan metode pengambilalihan akun terus diperbarui oleh pengembang maupun pelaku kejahatan. Jangan pernah menyerahkan kode verifikasi apa pun kepada siapa pun.",
  openerWhyChannel: {
    question: "Kenapa Penipu Sangat Menyukai WhatsApp?",
    points: [
      {
        title: "Tingkat Kepercayaan & Kedekatan Tinggi",
        desc: "Masyarakat Indonesia terbiasa berkomunikasi santai di WhatsApp dengan keluarga dan rekan kerja, sehingga kewaspadaan kritis cenderung menurun dibandingkan saat menerima email formal.",
      },
      {
        title: "Penyalahgunaan Enkripsi End-to-End",
        desc: "Pesan hanya bisa dibaca oleh pengirim dan penerima. Platform tidak bisa memindai isi percakapan secara otomatis di server, sehingga penipu bebas memanipulasi korban secara privat.",
      },
      {
        title: "Kemudahan Memalsukan Identitas Profil",
        desc: "Siapa saja bisa memasang foto profil logo bank, mengetik emotikon centang hijau di samping nama, atau memakai nomor luar negeri virtual dengan biaya sangat murah.",
      },
    ],
  },
  comparisonCards: {
    title: "Bedah Dua Kode Rahasia WhatsApp: Jangan Pernah Tertukar & Jangan Pernah Diberikan!",
    leftCard: {
      heading: "Kode SMS Registrasi",
      codeType: "6 Angka via SMS",
      channel: "Dikirim via SMS resmi saat pertama kali mendaftar nomor ponsel.",
      rule: "Hanya diminta saat pertama kali menginstal atau mendaftarkan ulang nomor di ponsel baru.",
      dangerIfShared:
        "Jika diberikan ke penipu, akun WhatsApp-mu langsung log out seketika dan berpindah ke ponsel pelaku!",
    },
    rightCard: {
      heading: "PIN Verifikasi Dua Langkah",
      codeType: "6 Angka Rahasia Buatanmu Sendiri",
      channel: "Dibuat sendiri di menu Setelan WhatsApp (bukan dari SMS).",
      rule: "WhatsApp akan memintanya secara berkala saat membuka aplikasi untuk mengonfirmasi pemilik asli.",
      dangerIfShared:
        "Jika penipu tahu PIN ini setelah mencuri SMS, kamu tidak akan bisa lagi merebut kembali akunmu karena akun terkunci PIN pelaku!",
    },
    sharedGoldenRule:
      "ATURAN MUTLAK: Pihak WhatsApp resmi maupun kasir minimarket TIDAK PERNAH meminta salah satu dari kedua kode ini. Siapapun yang memintanya adalah 100% penipu.",
  },
  badgeVerificationGuide: {
    title: "Centang Hijau Resmi vs Emoji Centang Buatan Penipu",
    authentic: {
      title: "Centang Hijau Resmi WhatsApp (Official Business Account)",
      location: "Menempel di samping nama pada bilah header obrolan paling atas.",
      howToSpot:
        "Lencana hijau ini diberikan langsung oleh sistem WhatsApp setelah verifikasi legalitas perusahaan. Nama kontak yang muncul adalah nama resmi perusahaan meskipun kamu belum menyimpannya di buku telepon ponsel.",
    },
    fakeEmoji: {
      title: "Emoji Centang Hijau Palsu (Ketik Manual)",
      location: "Berada di dalam teks nama profil, bio, atau info nomor.",
      howToSpot:
        "Penipu menyisipkan karakter emoji (contoh: 'Bank Mandiri ✅' atau 'J&T Express 🟢'). Saat header dibuka, nomornya tetap nomor ponsel biasa (+62 8xx) dan tidak memiliki lencana resmi terverifikasi dari WhatsApp.",
    },
  },
  modi: [
    {
      id: "otp-voucher",
      name: "Pencurian Kode Registrasi SMS (Dalih Voucher Minimarket)",
      shortLabel: "Kode SMS Registrasi",
      summary:
        "Penipu berpura-pura menjadi kasir minimarket yang mengaku salah memasukkan nomor untuk voucher game atau promo belanja, lalu meminta 6 angka SMS yang masuk ke ponselmu.",
      messageSnippet:
        "\"Kak maaf banget, saya kasir Indomaret salah input no HP buat voucher game 100rb. Kodenya masuk ke SMS Kakak ya, tolong kirimkan 6 angkanya kak nanti saya potong gaji...\"",
      senderProfile: "Nomor seluler biasa dengan foto profil berseragam minimarket",
      redFlags: [
        "Meminta kode 6 digit SMS dengan dalih apapun",
        "Memakai alasan iba (potong gaji, anak sakit) agar korban terburu-buru",
        "SMS resmi dari WhatsApp jelas bertuliskan: 'Jangan bagikan kode ini'",
      ],
      howToStop:
        "Abaikan pesan tersebut dan hapus SMS kode verifikasi dari kotak masuk. Jangan pernah kirim 6 angka tersebut ke siapa pun.",
      riskLevel: "kritis",
    },
    {
      id: "linked-devices",
      name: "Pembajakan via Perangkat Tertaut (Linked Devices / WhatsApp Web)",
      shortLabel: "WhatsApp Web QR",
      summary:
        "Korban diminta memindai kode QR di situs web fiktif (misal untuk klaim bansos, voting lomba, atau kupon) yang ternyata adalah sesi otentikasi WhatsApp Web penipu.",
      messageSnippet:
        "\"Yuk dukung keponakanku di lomba tari nasional! Cukup scan QR code di link ini pakai kamera WhatsApp kamu untuk kirim vote gratis.\"",
      senderProfile: "Bisa berasal dari akun teman yang sebelumnya sudah dibajak",
      redFlags: [
        "Diminta membuka menu 'Perangkat Tertaut' lalu scan QR dari sumber asing",
        "QR code mengarahkan sesi web baru di komputer orang lain",
      ],
      howToStop:
        "Buka menu Setelan > Perangkat Tertaut. Jika ada perangkat asing yang aktif (misal Google Chrome Windows), segera ketuk 'Keluar' (Log Out) saat ini juga.",
      riskLevel: "kritis",
    },
    {
      id: "apk-dokumen",
      name: "Pengiriman Berkas APK Berbahaya (.apk)",
      shortLabel: "Malware APK Chat",
      summary:
        "File instalasi aplikasi Android dikirim langsung lewat chat berkedok foto resi paket kurir, undangan pernikahan digital, surat tilang ETLE, atau formulir PPS Pemilu.",
      messageSnippet:
        "\"Undangan_Pernikahan_Digital_Rina_&_Dodi.apk (7.8 MB) — Mohon kehadirannya ya teman-teman, klik untuk buka rincian acara.\"",
      senderProfile: "Nomor asing atau nomor kenalan yang akunnya disusupi",
      redFlags: [
        "Nama berkas berakhiran '.apk' padahal diklaim sebagai foto atau surat undangan",
        "Ukuran berkas beberapa megabyte (MB) dan meminta izin akses SMS saat diinstal",
      ],
      howToStop:
        "Tolak instalasi berkas .apk dari chat WhatsApp. Hanya instal aplikasi dari Google Play Store resmi.",
      riskLevel: "kritis",
    },
    {
      id: "ganti-nomor",
      name: "Penyamaran Keluarga / Teman ('Ganti Nomor')",
      shortLabel: "Penyamaran Keluarga",
      summary:
        "Penipu menyapa ramah dengan foto profil kerabat dan mengaku nomor lamanya hilang, lalu meminjam sejumlah dana karena ada keperluan mendesak.",
      messageSnippet:
        "\"Pagi Pa/Ma, ini nomorku yang baru ya. Nomor lama kartu SIM-nya rusak. Tolong transferin dulu 1,5jt ke temanku ini, m-Bankingku belum aktif...\"",
      senderProfile: "Foto profil keluarga yang dicuri dari media sosial terbuka",
      redFlags: [
        "Tiba-tiba menyapa dari nomor baru dan langsung membahas pinjaman uang",
        "Menolak panggilan suara atau video call dengan alasan sinyal buruk",
        "Rekening tujuan menggunakan nama orang asing yang tidak dikenal keluarga",
      ],
      howToStop:
        "Hubungi kerabat tersebut lewat nomor lama atau tanyakan 'Sandi Rahasia Keluarga' untuk memastikan keaslian orang tersebut.",
      riskLevel: "waspada",
    },
    {
      id: "grup-investasi",
      name: "Dimasukkan ke Grup Tugas / Komisi Bodong",
      shortLabel: "Grup Tugas Berbayar",
      summary:
        "Nomormu tiba-tiba dimasukkan ke dalam grup WhatsApp berisi ratusan orang yang memamerkan bukti transfer reward tugas like/subscribe YouTube berbayar komisi tinggi.",
      messageSnippet:
        "\"Grup Kerja Sampingan Part-Time TikTok: Tugas 1 like video dapat Rp15.000, Tugas deposit VIP komisi 30% per hari!\"",
      senderProfile: "Admin grup dengan nomor luar negeri (+1, +44, +234)",
      redFlags: [
        "Dimasukkan ke grup secara sepihak tanpa persetujuanmu",
        "Banyak anggota 'bot' yang memamerkan struk transfer saldo palsu",
        "Meminta deposit uang pribadi untuk membuka komisi tugas berikutnya",
      ],
      howToStop:
        "Segera keluar dari grup (Keluar & Hapus Grup), lalu laporkan grup sebagai spam ke WhatsApp.",
      riskLevel: "waspada",
    },
    {
      id: "cs-palsu",
      name: "Customer Service / Akun Bisnis Tiruan",
      shortLabel: "CS Bank Palsu",
      summary:
        "Saat kamu mengeluhkan kendala bank di media sosial (seperti Twitter/X), penipu langsung mengirim pesan WhatsApp mengaku sebagai admin resmi call center bank.",
      messageSnippet:
        "\"Halo Bpk/Ibu, kami dari Tim Layanan Nasabah Bank BRI. Terkait kendala transaksi Anda, silakan isi data pada form verifikasi berikut: [link]\"",
      senderProfile: "Foto profil logo bank dengan nomor seluler biasa berawalan 08xx",
      redFlags: [
        "Menghubungi dari nomor ponsel biasa (bukan nomor WhatsApp resmi centang hijau)",
        "Meminta data sensitif nomor kartu debit, tanggal kedaluwarsa, atau kode CVV/OTP",
      ],
      howToStop:
        "Hanya hubungi nomor call center resmi bank yang tercantum di balik fisik kartu ATM milikmu.",
      riskLevel: "kritis",
    },
  ],
  auditChecklist: [
    {
      id: "aud-1",
      title: "Aktifkan Verifikasi Dua Langkah (PIN 6 Digit)",
      menuPath: "Setelan > Akun > Verifikasi Dua Langkah > Nyalakan",
      instruction:
        "Buat PIN 6 digit yang tidak mudah ditebak (hindari tanggal lahir) dan masukkan alamat email pemulihan yang aktif.",
      verificationNote:
        "// TODO: verifikasi manual terhadap Help Center WhatsApp terbaru (Settings > Account > Two-Step Verification)",
    },
    {
      id: "aud-2",
      title: "Periksa Daftar Perangkat Tertaut Aktif",
      menuPath: "Setelan > Perangkat Tertaut",
      instruction:
        "Tinjau apakah ada sesi web aktif di komputer yang tidak kamu kenali. Jika ada, ketuk sesi tersebut lalu pilih 'Keluar'.",
      verificationNote:
        "// TODO: verifikasi manual terhadap Help Center WhatsApp terbaru (Settings > Linked Devices)",
    },
    {
      id: "aud-3",
      title: "Kunci Pengaturan Siapa yang Bisa Menambahkan ke Grup",
      menuPath: "Setelan > Privasi > Grup > Pilih 'Kontak Saya'",
      instruction:
        "Ubah pengaturan dari 'Semua Orang' menjadi 'Kontak Saya' agar nomor acak penipu tidak bisa sembarangan memasukkanmu ke grup penipuan.",
      verificationNote:
        "// TODO: verifikasi manual terhadap Help Center WhatsApp terbaru (Settings > Privacy > Groups)",
    },
    {
      id: "aud-4",
      title: "Kunci Otomatis Aplikasi dengan Sidik Jari / Face ID",
      menuPath: "Setelan > Privasi > Kunci Aplikasi > Nyalakan",
      instruction:
        "Memastikan orang lain tidak bisa membuka WhatsApp-mu saat ponsel sedang dipinjam atau tertinggal.",
      verificationNote:
        "// TODO: verifikasi manual terhadap Help Center WhatsApp terbaru (Settings > Privacy > App Lock)",
    },
  ],
  emergencyTakeover: {
    title: "Protokol Darurat: Akun WhatsApp Diambil Alih / Dibajak",
    subtitle:
      "Jika akunmu tiba-tiba log out sendiri dan kamu tidak bisa masuk kembali, lakukan langkah pemulihan cepat ini:",
    steps: [
      {
        order: 1,
        title: "Masuk Kembali Menggunakan Nomor Ponselmu",
        urgency: "Seketika",
        action:
          "Buka WhatsApp di ponselmu, masukkan nomor teleponmu, dan minta kode verifikasi 6 digit via SMS. Begitu kamu memasukkan kode SMS yang benar, akun penipu di perangkat lain akan otomatis ter-log out seketika.",
      },
      {
        order: 2,
        title: "Jika Penipu Sudah Memasang PIN Verifikasi Dua Langkah",
        urgency: "Tunggu 7 Hari",
        action:
          "Jika kamu dimintai PIN yang tidak kamu ketahui, berarti pelaku telah mengaktifkan Two-Step Verification. Kamu harus menunggu masa tenggang 7 hari tanpa PIN untuk dapat mereset akun. Selama masa ini, penipu juga TIDAK BISA mengakses chatmu karena akun sudah ter-log out dari ponsel mereka.",
      },
      {
        order: 3,
        title: "Beri Tahu Kerabat & Keluarga Lewat Kanal Lain",
        urgency: "Dalam 30 Menit",
        action:
          "Kirimkan SMS biasa atau posting di media sosial (Instagram/Facebook): 'Nomor WhatsApp saya sedang dibajak. Jika ada pesan meminta uang atau kode transfer atas nama saya, mohon abaikan!'",
      },
      {
        order: 4,
        title: "Kirim Email Resmi ke Dukungan WhatsApp",
        urgency: "Maksimal 1 x 24 Jam",
        action:
          "Kirim email ke support@whatsapp.com dengan subjek 'Akun hilang/dicuri: Mohon nonaktifkan akun saya' dan sertakan nomor ponselmu dalam format internasional (+62 8xx...).",
        note:
          "// TODO: verifikasi manual format email dan alamat support@whatsapp.com di Help Center resmi.",
      },
    ],
  },
  quiz: [
    {
      id: 1,
      messageScenario:
        "Seseorang mengaku teman lamamu mengirim chat WA: 'Bro, pulsa m-Banking gue limit, transferin 500rb dulu ke rek 0921821 Bpk Rudi ini ya, nanti sore gue ganti 600rb.'",
      senderInfo: "Foto profil teman, tapi nomornya baru (+62 895-xxx)",
      options: [
        {
          label: "Langsung transfer karena foto profilnya benar-benar temanku",
          isReal: false,
          explanation:
            "Bahaya! Foto profil bisa diunduh siapa saja dari media sosial. Nama rekening tujuan juga milik orang asing (Bpk Rudi).",
        },
        {
          label: "Telepon ke nomor lamanya atau video call sebelum bertindak",
          isReal: true,
          explanation:
            "Tepat! Selalu verifikasi langsung dengan mendengar suara atau panggilan video jika ada kenalan yang meminjam dana.",
        },
        {
          label: "Minta nomor rekening lain yang beratasnamakan bank pemerintah",
          isReal: false,
          explanation:
            "Kurang tepat. Masalahnya bukan bank mana, tetapi apakah orang tersebut benar-benar temanmu atau penipu yang mencuri foto.",
        },
      ],
    },
    {
      id: 2,
      messageScenario:
        "Chat masuk dari 'Customer Care Bank BCA ✅': 'Yth Nasabah, terjadi transaksi mencurigakan di kartu Anda. Klik link ini untuk pembatalan.'",
      senderInfo: "Nomor seluler biasa +62 813-9921-1200 dengan ikon centang di samping nama profil",
      options: [
        {
          label: "Ini akun resmi karena ada centang hijau di samping namanya",
          isReal: false,
          explanation:
            "Salah! Centang tersebut hanyalah karakter emoji yang diketik manual penipu di nama profilnya, bukan lencana resmi WhatsApp.",
        },
        {
          label: "Ini penipuan karena nomornya nomor HP biasa dan ada tautan pembatalan",
          isReal: true,
          explanation:
            "Tepat! Bank resmi menggunakan akun WhatsApp Verified bercentang hijau asli di header dan tidak pernah mengirim tautan pembatalan transaksi via nomor seluler biasa.",
        },
      ],
    },
  ],
  takeaway:
    "WhatsApp adalah ruang privat, namun keamanannya sepenuhnya di tanganmu. Dua prinsip mutlak: Jangan pernah serahkan 6 digit kode SMS registrasi kepada siapa pun, dan selalu aktifkan Verifikasi Dua Langkah dengan PIN buatanmu sendiri.",
};

