/**
 * Data Modul m12: Cara Mendampingi Keluarga yang Kena Tipu
 * JagaRuang - Platform Edukasi Anti-Penipuan Digital
 *
 * Fokus utama: Pendampingan psikologis dan emosional keluarga/kerabat korban penipuan,
 * dipadukan dengan langkah teknis berurutan (pemisahan mode pesawat vs cabut SIM card)
 * serta integrasi fitur Sandi Keluarga (/sandi).
 */

export interface DialogueComparison {
  id: string;
  situation: string;
  supportiveSpeech: {
    bubble: string;
    reason: string;
  };
  harmfulSpeech: {
    bubble: string;
    impact: string;
    reason?: string;
  };
}

export interface PsychologicalPhase {
  order: number;
  phaseName: string;
  symptoms: string;
  bestSupporterAttitude: string;
  caution: string;
}

export interface DeviceSecurityStep {
  priority: number;
  action: string;
  goal: string;
  reason: string;
}

export interface SimulationChallenge {
  id: string;
  victimStatement: string;
  context: string;
  options: {
    text: string;
    isBest: boolean;
    feedback: string;
  }[];
}

export interface ModulDampingiKeluargaData {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  lastUpdated: string;
  readingTimeMinutes: number;
  anonymousQuote: {
    quote: string;
    author: string;
  };
  keyTakeaway: string;
  psychologicalPhases: PsychologicalPhase[];
  dialogueComparisons: DialogueComparison[];
  deviceSecurityPriority: DeviceSecurityStep[];
  sandiKeluargaConnection: {
    title: string;
    voiceCloneContext: string;
    whySandiHelps: string;
    actionUrl: string;
  };
  simulationChallenges: SimulationChallenge[];
}

export const MODUL_DAMPINGI_KELUARGA_DATA: ModulDampingiKeluargaData = {
  id: "m12",
  title: "Cara Mendampingi Keluarga yang Kena Tipu",
  subtitle: "Panduan empati, pemulihan psikologis, dan urutan tindakan teknis mendampingi orang terdekat.",
  slug: "mendampingi-keluarga",
  lastUpdated: "2026-11-07",
  readingTimeMinutes: 5,

  anonymousQuote: {
    quote:
      "Uang yang hilang memang menyakitkan, tapi rasa bersalah dan tatapan menghakimi dari keluarga jauh lebih menghancurkan. Yang paling saya butuhkan saat itu bukan omelan 'kenapa bisa sebodoh itu', tapi seseorang yang memeluk dan berkata 'kita selesaikan ini bareng-bareng'.",
    author: "Cerita Anonim Korban Rekayasa Sosial",
  },

  keyTakeaway:
    "Korban penipuan mengalami guncangan psikologis berat. Menghardik tidak akan mengembalikan uang, justru menutup komunikasi saat mereka paling membutuhkan perlindungan.",

  psychologicalPhases: [
    {
      order: 1,
      phaseName: "Fase 1: Syok & Penyangkalan (Shock & Denial)",
      symptoms:
        "Bingung, linglung, memeriksa saldo berulang kali, atau bersikeras bahwa 'ini cuma salah paham dari pihak bank/investasi'.",
      bestSupporterAttitude:
        "Tunjukkan kehadiran fisik yang tenang. Berikan air minum, dengarkan tanpa memotong, dan jangan langsung mendebat logika mereka.",
      caution: "Hindari langsung meminta mereka menceritakan kronologi teknis rumit saat napas mereka masih tersengal atau gemetar.",
    },
    {
      order: 2,
      phaseName: "Fase 2: Menyalahkan Diri & Rasa Malu (Guilt & Shame)",
      symptoms:
        "Merasa bodoh, tidak berharga, mengurung diri, atau takut rahasia ini diketahui oleh pasangan, anak, atau rekan kerja.",
      bestSupporterAttitude:
        "Tegaskan bahwa pelaku adalah sindikat kriminal profesional yang memang terlatih memanipulasi psikologi manusia, bukan karena korban lemah.",
      caution: "Jangan sekali-kali berkata 'Tuh kan, dari awal dibilangin jangan percaya!'. Kata-kata ini memicu depresi mendalam.",
    },
    {
      order: 3,
      phaseName: "Fase 3: Kerentanan Lanjutan (Second-Layer Vulnerability)",
      symptoms:
        "Panik ingin uangnya kembali secepat mungkin, sehingga sangat rentan tertipu tawaran 'jasa recovery akun/dana' palsu di internet.",
      bestSupporterAttitude:
        "Dampingi interaksi digital mereka. Jaga agar korban tidak mencari-cari bantuan liar di media sosial yang meminta biaya pancingan.",
      caution: "Ambil alih komunikasi dengan pihak luar jika korban masih tampak sangat cemas dan tidak stabil.",
    },
  ],

  dialogueComparisons: [
    {
      id: "dial_1",
      situation: "Saat pertama kali korban menceritakan bahwa saldo tabungannya lenyap",
      supportiveSpeech: {
        bubble: "“Tarik napas dulu, Ma/Pa. Yang penting Mama/Papa sehat dan ada di sini. Ayo kita duduk, kita urus bareng-bareng sekarang.”",
        reason: "Menenangkan kepanikan fisik, mengutamakan keselamatan jiwa, dan menegaskan kehadiran pendamping.",
      },
      harmfulSpeech: {
        bubble: "“Gimana sih kok bisa ceroboh banget?! Kan udah sering dikasih tau di TV jangan asal pencet!”",
        impact: "Membuat korban langsung defensif, merasa dipermalukan, dan enggan membagikan bukti penting.",
      },
    },
    {
      id: "dial_2",
      situation: "Saat korban menangis dan merasa bersalah karena kehilangan uang belanja/sekolah",
      supportiveSpeech: {
        bubble: "“Ini bukan salah kamu. Yang salah adalah penipunya yang sengaja menjebak. Siapa pun bisa lengah kalau ditekan seperti itu.”",
        reason: "Memisahkan identitas korban dari tindak kejahatan pelaku, mengurangi beban rasa bersalah yang destruktif.",
      },
      harmfulSpeech: {
        bubble: "“Nyesel kan sekarang? Harusnya tadi tanya dulu ke aku sebelum transfer, jangan sok tau!”",
        impact: "Menambah rasa penyesalan tanpa memberikan solusi praktis apa pun.",
      },
    },
    {
      id: "dial_3",
      situation: "Saat mempersiapkan laporan ke bank dan polisi",
      supportiveSpeech: {
        bubble: "“Biar aku yang bantu ketik kronologinya dan temani ke kantor polisi ya. Kamu cukup ingat garis besarnya aja.”",
        reason: "Mengurangi beban kognitif korban yang sedang dalam kondisi syok traumatik.",
      },
      harmfulSpeech: {
        bubble: "“Urus sendiri sana ke polisi, biar kapok dan tahu rasanya repot!”",
        impact: "Mengisolasi korban dan meningkatkan risiko korban mengurungkan niat melapor karena takut diinterogasi.",
      },
    },
  ],

  deviceSecurityPriority: [
    {
      priority: 1,
      action: "Aktifkan Mode Pesawat (Airplane Mode) / Matikan WiFi",
      goal: "Menghentikan malware aktif yang sedang berjalan",
      reason:
        "Jika korban sempat menginstal file APK jahat, malware membutuhkan koneksi internet untuk mengirimkan SMS OTP dan mencuri saldo. Mengaktifkan mode pesawat secara instan memutus rantai komunikasi data ke server penyerang.",
    },
    {
      priority: 2,
      action: "Cabut SIM Card dari Slot Ponsel",
      goal: "Mencegah pembajakan SMS lanjutan / SIM Swap",
      reason:
        "Tindakan ini berbeda dari sekadar mode pesawat. Mencabut fisik kartu SIM mencegah pelaku menyadap panggilan masuk atau melakukan registrasi ulang akun perbankan melalui jaringan seluler saat ponsel dinyalakan kembali.",
    },
    {
      priority: 3,
      action: "Ganti PIN & Password dari Perangkat Terpisah yang Bersih",
      goal: "Mengamankan akun perbankan tanpa risiko keylogger",
      reason:
        "Jangan mengganti kata sandi m-banking menggunakan ponsel yang baru saja terinfeksi. Gunakan laptop atau ponsel keluarga lain yang aman.",
    },
    {
      priority: 4,
      action: "Periksa & Hapus Aplikasi Asing di Pengaturan",
      goal: "Membersihkan infeksi aplikasi jahat",
      reason:
        "Buka Pengaturan > Aplikasi, cari aplikasi tanpa ikon atau dengan nama generik yang baru dipasang, lalu copot pemasangannya.",
    },
  ],

  sandiKeluargaConnection: {
    title: "Cegah Penipuan Keluarga di Masa Depan dengan 'Sandi Keluarga'",
    voiceCloneContext:
      "Kini sindikat penipuan memanfaatkan kecerdasan buatan (AI Voice Cloning) untuk menirukan suara anak atau kerabat yang menangis meminta transfer tebusan darurat (kecelakaan, tertahan polisi).",
    whySandiHelps:
      "Sandi Keluarga adalah satu kata rahasia yang disepakati hanya oleh anggota keluarga inti (misal: 'Kucing belang tiga'). Ketika ada telepon darurat mencurigakan yang meminta uang, tanyakan kata sandi ini. Penipu atau suara AI tidak akan pernah bisa menjawabnya.",
    actionUrl: "/sandi",
  },

  simulationChallenges: [
    {
      id: "sim_1",
      context: "Ibumu baru saja menyadari bahwa uang arisan keluarga Rp 10 juta yang disimpan di e-wallet telah ludes setelah menerima telepon dari 'petugas bank'. Beliau duduk lemas dan gemetar.",
      victimStatement: "“Ibu nggak tahu harus gimana lagi... uang orang-orang habis semua gara-gara kebodohan Ibu...”",
      options: [
        {
          text: "“Ibu tenang dulu ya, Ibu minum air hangat ini. Kehilangan ini berat, tapi Ibu nggak bodoh—Ibu dijebak penjahat profesional. Sekarang kita telepon call center bank bareng-bareng.”",
          isBest: true,
          feedback: "Pilihan Sangat Tepat! Respons ini memberikan kenyamanan fisik, menormalkan perasaan, menghapus stigma kebodohan, dan langsung menawarkan bantuan nyata terstruktur.",
        },
        {
          text: "“Kenapa Ibu percaya gitu aja sih? Kan kemarin udah dibilang kalau bank nggak pernah minta OTP! Sekarang gimana bayar arisannya?”",
          isBest: false,
          feedback: "Kurang Tepat. Menghakimi saat korban sedang syok berat akan memicu trauma mendalam dan membuat korban semakin putus asa.",
        },
        {
          text: "“Ya sudah, ikhlaskan saja Bu, uang hilang nggak bakal balik lagi. Jadikan pelajaran berharga.”",
          isBest: false,
          feedback: "Kurang Tepat. Mengatakan 'ikhlaskan saja' di menit awal mengecilkan rasa kehilangan dan menghentikan langkah mitigasi darurat yang seharusnya bisa menyelamatkan dana jika segera dilaporkan.",
        },
      ],
    },
  ],
};
