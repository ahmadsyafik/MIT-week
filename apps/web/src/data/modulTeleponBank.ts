// Data terstruktur untuk Modul Pembelajaran m5: Waspada Telepon Mengaku Bank (Vishing)

export interface CallSimulationStep {
  step: number;
  speaker: string;
  dialogText: string;
  options: {
    label: string;
    decision: "penipuan" | "resmi";
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface ModulTeleponBankData {
  id: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  topBannerGoldenRule: {
    main: string;
    sub: string;
  };
  callerIdSpoofingDiagram: {
    title: string;
    steps: {
      order: number;
      actor: string;
      label: string;
      description: string;
    }[];
  };
  independentVerificationRule: {
    title: string;
    warning: string;
    safeChannels: string[];
  };
  modernVariants: {
    title: string;
    items: {
      type: string;
      modus: string;
      howToRespond: string;
    }[];
  };
  crowdReportedApps: {
    title: string;
    apps: string[];
    howItWorks: string;
    privacyCaveat: string;
  };
  dialogSimulation: {
    title: string;
    intro: string;
    steps: CallSimulationStep[];
  };
  checklist: {
    id: string;
    action: string;
    why: string;
  }[];
  sources: { name: string; note?: string }[];
  disclaimer: string;
  takeaway: string;
}

export const MODUL_TELEPON_BANK: ModulTeleponBankData = {
  id: "m5",
  title: "Waspada Telepon Mengaku Bank",
  readingTime: "4 menit baca",
  lastUpdated: "2026-11-07",
  topBannerGoldenRule: {
    main: "BANK RESMI TIDAK PERNAH MEMINTA KODE OTP, PIN, ATAU 3 ANGKA CVV/CVC KARTU ANDA.",
    sub: "Penelepon yang meminta kode rahasia tersebut dengan dalih apa pun (pembatalan transaksi, kenaikan tarif, pemblokiran akun) adalah 100% penipu.",
  },
  callerIdSpoofingDiagram: {
    title: "Bagaimana Pelaku Memalsukan Nomor Layar Ponselmu (Caller ID Spoofing)?",
    steps: [
      {
        order: 1,
        actor: "Pelaku di Laptop",
        label: "Panggilan Internet (VoIP)",
        description:
          "Pelaku menggunakan layanan telepon berbasis internet (VoIP) yang memungkinkan pengirim mengubah label identitas pemanggil (Caller ID) secara bebas.",
      },
      {
        order: 2,
        actor: "Gateway VoIP / SIP Trunk",
        label: "Penyisipan Nomor Palsu",
        description:
          "Sistem gateway meneruskan panggilan dengan menyematkan nomor resmi call center (misal 1500xxx atau 140xx) ke jaringan operator seluler.",
      },
      {
        order: 3,
        actor: "Layar Ponsel Korban",
        label: "Layar Menampilkan Nomor Bank",
        description:
          "Ponselmu hanya menampilkan label data yang dikirimkan jaringan, sehingga tampak seolah-olah kantor pusat bank yang benar-benar meneleponmu.",
      },
    ],
  },
  independentVerificationRule: {
    title: "Aturan Verifikasi Independen: Jangan Menghubungi Balik Nomor dari SMS/Caller ID",
    warning:
      "Menelepon balik dari perangkat ponsel terpisah TIDAK CUKUP jika nomor yang kamu tuju didapat dari SMS pengirim atau caller ID panggilan tersebut!",
    safeChannels: [
      "Nomor resmi yang tercetak fisik di balik kartu debit/kredit ATM milikmu.",
      "Fitur 'Hubungi Bantuan' di dalam aplikasi mobile banking resmi yang sudah terpasang di ponselmu.",
      "Situs web resmi bank yang kamu cari sendiri dari penanda (bookmark) aman.",
    ],
  },
  modernVariants: {
    title: "Varian Vishing Modern: WhatsApp Call & Video Call Verifikasi",
    items: [
      {
        type: "Panggilan Suara WhatsApp (VoIP)",
        modus:
          "Pelaku menelepon via WhatsApp Call dengan profil logo bank. Sering beralasan 'jaringan telepon kabel call center sedang sibuk sehingga dialihkan ke saluran digital'.",
        howToRespond:
          "Bank resmi TIDAK PERNAH menghubungi nasabah lewat panggilan suara WhatsApp untuk urusan operasional kartu.",
      },
      {
        type: "Panggilan Video Call (Wajah & KTP)",
        modus:
          "Pelaku memakai seragam bank palsu dan meminta korban menghadapkan wajah serta memegang kartu fisik KTP dan kartu ATM ke kamera untuk 'verifikasi biometrik'.",
        howToRespond:
          "Segera matikan panggilan video! Penipu merekam video wajah dan nomor kartumu untuk membobol akun pinjaman online.",
      },
    ],
  },
  crowdReportedApps: {
    title: "Aplikasi Identifikasi Nomor (Truecaller / GetContact)",
    apps: ["Truecaller", "GetContact"],
    howItWorks:
      "Aplikasi ini bekerja berbasis laporan komunitas (crowd-reported tags). Ketika ribuan pengguna menandai suatu nomor sebagai 'Penipu Undian' atau 'Spam Bank Palsu', nama tersebut otomatis muncul saat nomor itu meneleponmu.",
    privacyCaveat:
      "Catatan Privasi: Aplikasi semacam ini membaca dan mengunggah buku kontak pengguna ke server mereka. Gunakan dengan bijak dan jangan mengandalkannya sebagai jaminan mutlak 100% aman.",
  },
  dialogSimulation: {
    title: "Simulasi Percakapan Telepon: Mana yang Resmi & Mana yang Penipuan?",
    intro:
      "Kamu menerima panggilan telepon tak terduga. Tentukan keputusanmu pada setiap tahapan dialog berikut:",
    steps: [
      {
        step: 1,
        speaker: "Penelepon Asing (Layar tertulis: Halo Bank 1500xxx)",
        dialogText:
          "\"Selamat pagi Bpk/Ibu, kami dari Departemen Keamanan Bank. Sistem kami mendeteksi transaksi transfer mencurigakan sebesar Rp5.000.000 di akun Anda. Apakah transaksi ini Anda yang lakukan?\"",
        options: [
          {
            label: "Ini Resmi — karena nomor di layar sesuai dengan nomor call center bank",
            decision: "resmi",
            isCorrect: false,
            explanation:
              "Salah! Nomor di layar bisa dipalsukan dengan teknik Caller ID Spoofing. Jangan langsung percaya hanya dari nomor yang muncul.",
          },
          {
            label: "Ini Penipuan / Waspada — tetap tenang dan jangan panik",
            decision: "penipuan",
            isCorrect: true,
            explanation:
              "Tepat! Pelaku sengaja menciptakan kepanikan agar kamu terburu-buru mengikuti instruksinya.",
          },
        ],
      },
      {
        step: 2,
        speaker: "Penelepon Asing",
        dialogText:
          "\"Baik Bpk/Ibu, demi membatalkan transaksi penipuan ini, sistem kami telah mengirimkan 6 digit kode pembatalan via SMS. Mohon sebutkan kodenya sekarang sebelum 1 menit!\"",
        options: [
          {
            label: "Sebutkan Kodenya — agar uang saya segera kembali",
            decision: "resmi",
            isCorrect: false,
            explanation:
              "Bahaya Fatal! Kode 6 digit tersebut adalah kode OTP persetujuan transaksi penipu. Jika kamu sebutkan, saldo rekeningmu langsung ludes!",
          },
          {
            label: "Ini Penipuan Pasti — Bank resmi tidak pernah meminta kode SMS/OTP!",
            decision: "penipuan",
            isCorrect: true,
            explanation:
              "Tepat 100%! Bank resmi TIDAK PERNAH meminta kode OTP apa pun alasannya. Matikan telepon sekarang juga!",
          },
        ],
      },
    ],
  },
  checklist: [
    {
      id: "chk-tel-1",
      action: "Tutup panggilan telepon sepihak jika penelepon mulai menanyakan kode OTP, PIN, atau 3 angka CVV/CVC.",
      why: "Bank resmi tidak memiliki wewenang untuk meminta data otentikasi rahasia nasabah.",
    },
    {
      id: "chk-tel-2",
      action: "Tolak jika diarahkan untuk menelepon balik nomor lain yang baru saja didiktekan oleh penelepon.",
      why: "Nomor tersebut biasanya nomor sindikat mereka yang menyamar sebagai 'kepolisian' atau 'OJK'.",
    },
    {
      id: "chk-tel-3",
      action: "Hubungi nomor resmi call center yang tercetak fisik di balik kartu ATM milikmu.",
      why: "Memastikan kamu tersambung langsung ke pihak bank tanpa perantara palsu.",
    },
    {
      id: "chk-tel-4",
      action: "Pasang aplikasi identifikasi nomor untuk mengenali tag riwayat spam dari komunitas.",
      why: "Membantu menyaring nomor penipu massal yang sudah sering dilaporkan korban lain.",
    },
  ],
  sources: [
    {
      name: "Otoritas Jasa Keuangan (OJK) - Waspada Vishing & Modus Telepon Bank Palsu",
      note: "[VERIFIKASI: Kontak resmi konsumen OJK 157]",
    },
    {
      name: "Bank Indonesia (BI) - Edukasi Perlindungan Konsumen Sistem Pembayaran",
      note: "[VERIFIKASI: Panduan perlindungan data rahasia perbankan bi.go.id]",
    },
  ],
  disclaimer:
    "Modul ini bersifat edukasi umum. Bank resmi dapat menghubungi nasabah untuk urusan promosi atau verifikasi tertentu, namun TIDAK PERNAH meminta kode sandi, PIN, OTP, atau nomor kartu lengkap.",
  takeaway:
    "Suara ramah dan nomor resmi di layar telepon bukan jaminan keaslian. Kunci mutlak: jangan pernah sebutkan kode OTP atau PIN kepada penelepon mana pun di dunia ini.",
};

