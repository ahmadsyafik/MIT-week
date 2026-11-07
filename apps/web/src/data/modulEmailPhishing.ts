// Data terstruktur untuk Modul Pembelajaran m4: Keamanan Email & Phishing

export interface EmailMockAnnotation {
  id: string;
  field: "sender" | "urgency" | "bodyLink" | "attachment";
  title: string;
  status: "bahaya" | "waspada";
  description: string;
}

export interface DomainComparisonQuiz {
  id: number;
  question: string;
  context: string;
  optionA: {
    text: string;
    isFake: boolean;
    explanation: string;
  };
  optionB: {
    text: string;
    isFake: boolean;
    explanation: string;
  };
}

export interface ModulEmailPhishingData {
  id: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  twoCasesClarification: {
    caseA: {
      title: string;
      concept: string;
      example: string;
      howToDetect: string;
    };
    caseB: {
      title: string;
      concept: string;
      example: string;
      howToDetect: string;
    };
  };
  homographAttack: {
    title: string;
    explanation: string;
    exampleLatinVsCyrillic: string;
    defenseTip: string;
  };
  technicalAuthIndicators: {
    title: string;
    intro: string;
    standards: {
      name: string;
      role: string;
      simpleAnalogy: string;
    }[];
  };
  mockEmail: {
    fromDisplay: string;
    fromRealEmail: string;
    to: string;
    subject: string;
    date: string;
    bodyParagraphs: string[];
    buttonText: string;
    buttonHoverUrl: string;
    attachmentName: string;
    attachmentSize: string;
    annotations: EmailMockAnnotation[];
  };
  domainQuizzes: DomainComparisonQuiz[];
  checklistItems: {
    id: string;
    action: string;
    benefit: string;
  }[];
  sources: { name: string; note?: string }[];
  disclaimer: string;
  takeaway: string;
}

export const MODUL_EMAIL_PHISHING: ModulEmailPhishingData = {
  id: "m4",
  title: "Keamanan Email & Phishing",
  readingTime: "4-5 menit baca",
  lastUpdated: "2026-11-07",
  twoCasesClarification: {
    caseA: {
      title: "Kasus 1: Display Name Spoofing (Nama Tampilan Palsu)",
      concept:
        "Pengirim mengganti nama tampilan (Display Name) email menjadi nama resmi bank, padahal alamat email aslinya adalah akun gratisan atau server peretas.",
      example:
        "Tampilan di layar: \"Bank Central Asia\" <layanan_bca992@gmail.com> atau <admin@peretas-server.xyz>",
      howToDetect:
        "Sentuh atau klik pada nama pengirim untuk melihat alamat lengkap di dalam kurung sudut <...>. Bank resmi menggunakan domain perusahaannya sendiri, bukan @gmail.com atau @yahoo.com.",
    },
    caseB: {
      title: "Kasus 2: Penyamaran Domain Menggunakan Karakter \"@\" di URL",
      concept:
        "Penipu menyisipkan karakter \"@\" di dalam tautan web. Menurut standar web browser, teks sebelum tanda \"@\" dianggap sebagai nama pengguna (username), sedangkan situs yang sebenarnya dibuka browser adalah domain SETELAH tanda \"@\".",
      example:
        "http://bca.co.id@phisher-jebakan.com/login",
      howToDetect:
        "Jangan terkecoh oleh nama bca.co.id di depan! Tautan tersebut sebenarnya membuka situs phisher-jebakan.com.",
    },
  },
  homographAttack: {
    title: "Serangan Homograf (Karakter Unicode Mirip Huruf Latin)",
    explanation:
      "Pelaku mendaftarkan domain web menggunakan karakter abjad non-Latin (seperti Cyrillic atau Yunani) yang bentuk visualnya identik dengan huruf Latin biasa. Teknik ini sering dipakai peretas tingkat lanjut.",
    exampleLatinVsCyrillic:
      "Contoh: Domain \"bса.com\" (menggunakan huruf Cyrillic 'а' U+0430) terlihat sama persis dengan \"bca.com\" asli di layar, namun di sistem komputer diterjemahkan menjadi \"xn--b-8sb1b.com\" (Punycode).",
    defenseTip:
      "Ketik alamat web resmi bank langsung di bilah URL browser atau gunakan penanda bookmark terpercaya, bukan mengklik tautan dari isi email.",
  },
  technicalAuthIndicators: {
    title: "Tanda Kegagalan Autentikasi Teknis (SPF, DKIM, DMARC)",
    intro:
      "Penyedia email modern (seperti Gmail atau Outlook) memiliki sistem verifikasi otomatis. Jika email gagal lolos verifikasi ini, biasanya muncul peringatan merah 'Pengirim ini tidak terverifikasi'.",
    standards: [
      {
        name: "SPF (Sender Policy Framework)",
        role: "Memeriksa apakah server pengirim diizinkan mengirim email atas nama domain tersebut.",
        simpleAnalogy: "Seperti memeriksa apakah nomor kurir terdaftar di kantor ekspedisi.",
      },
      {
        name: "DKIM (DomainKeys Identified Mail)",
        role: "Tanda tangan digital terenkripsi yang memastikan isi email tidak diubah di tengah jalan.",
        simpleAnalogy: "Seperti segel lak lilin resmi pada amplop surat rahasia.",
      },
      {
        name: "DMARC",
        role: "Instruksi yang memerintahkan kotak masuk untuk menolak/membuang email jika SPF dan DKIM palsu.",
        simpleAnalogy: "Satpam gerbang yang langsung membuang surat berperekat palsu ke tempat sampah.",
      },
    ],
  },
  mockEmail: {
    fromDisplay: "Pusat Keamanan Akun Bank",
    fromRealEmail: "security-alert@layanan-verifikasi-bca.com",
    to: "nasabah@email-anda.com",
    subject: "Pemberitahuan Mendesak: Akun Anda Akan Dibekukan Dalam 12 Jam",
    date: "Hari ini, 09:14 WIB",
    bodyParagraphs: [
      "Yth. Nasabah yang Terhormat,",
      "Sistem kami mendeteksi aktivitas login yang tidak wajar dari lokasi tidak dikenal pada akun Anda. Demi keamanan aset, akses rekening akan dibekukan sementara dalam waktu 12 jam.",
      "Segera lakukan pembaruan data dan verifikasi identitas Anda melalui tombol aman di bawah ini untuk menghindari pemblokiran permanen kartu ATM dan mobile banking Anda.",
    ],
    buttonText: "Verifikasi Akun Saya Sekarang",
    buttonHoverUrl: "http://klikbca.com@server-update-nasabah.xyz/auth?token=9218",
    attachmentName: "Formulir_Pemulihan_Akun.html",
    attachmentSize: "24.6 KB",
    annotations: [
      {
        id: "ann-from",
        field: "sender",
        title: "Domain Pengirim Tidak Resmi",
        status: "bahaya",
        description:
          "Nama pengirim adalah 'Pusat Keamanan Akun Bank', tetapi alamat aslinya adalah @layanan-verifikasi-bca.com (domain palsu buatan penipu, bukan domain resmi bank).",
      },
      {
        id: "ann-urgency",
        field: "urgency",
        title: "Urgensi Waktu Palsu",
        status: "waspada",
        description:
          "Mengancam penangguhan dalam 12 jam untuk memicu kepanikan dan memaksa korban mengklik tanpa memeriksa keaslian.",
      },
      {
        id: "ann-link",
        field: "bodyLink",
        title: "Jebakan Karakter '@' Pada Tautan",
        status: "bahaya",
        description:
          "Tautan menampilkan 'klikbca.com@server-update-nasabah.xyz'. Browser sebenarnya mengarahkan ke domain penipu server-update-nasabah.xyz!",
      },
      {
        id: "ann-attach",
        field: "attachment",
        title: "Lampiran Berbahaya Berformat .HTML",
        status: "bahaya",
        description:
          "File lampiran berekstensi .html dirancang untuk membuka formulir login palsu secara offline di browser ponselmu untuk mencuri password.",
      },
    ],
  },
  domainQuizzes: [
    {
      id: 1,
      question: "Soal 1: Mana Tautan yang Benar-Benar Resmi?",
      context: "Kamu menerima email pembaruan tarif bank. Perhatikan kedua tautan di bawah:",
      optionA: {
        text: "https://www.klikbca.com/tariftarif.html",
        isFake: false,
        explanation:
          "✓ BENAR! Domain utamanya adalah klikbca.com (domain resmi). Bagian setelah garis miring (/tariftarif.html) adalah halaman dokumen di dalam server resmi.",
      },
      optionB: {
        text: "https://www.klikbca.com@update-tarif-nasabah.com/index",
        isFake: true,
        explanation:
          "✕ INI PALSU! Terdapat karakter '@'. Domain yang sebenarnya dibuka adalah update-tarif-nasabah.com milik pelaku.",
      },
    },
    {
      id: 2,
      question: "Soal 2: Mana Alamat Pengirim yang Aman?",
      context: "Kamu menerima email klaim kupon belanja marketplace:",
      optionA: {
        text: "Tokopedia Promo <promo-official@tokopedia.com>",
        isFake: false,
        explanation:
          "✓ AMAN! Domain setelah tanda '@' adalah 'tokopedia.com', domain resmi perusahaan.",
      },
      optionB: {
        text: "Tokopedia Promo <tokopedia-care@promo-tokopedia2026.net>",
        isFake: true,
        explanation:
          "✕ PALSU! Domain pengirim adalah promo-tokopedia2026.net. Nama 'tokopedia' di depan hanyalah subdomain buatan pelaku.",
      },
    },
  ],
  checklistItems: [
    {
      id: "chk-em-1",
      action: "Arahkan kursor atau tahan sentuhan pada tautan untuk melihat alamat URL tujuan sebenarnya sebelum mengklik.",
      benefit: "Mendeteksi penyamaran URL dan karakter '@' yang menjebak.",
    },
    {
      id: "chk-em-2",
      action: "Periksa alamat email di dalam kurung siku <...> pengirim, bukan hanya nama tampilan luarnya.",
      benefit: "Menghindari trik Display Name Spoofing yang mencatut nama institusi besar.",
    },
    {
      id: "chk-em-3",
      action: "Jangan pernah mengunduh atau membuka lampiran berformat .html, .zip, .iso, atau .exe dari email tak dikenal.",
      benefit: "Mencegah file phishing dan script peretas berjalan di perangkatmu.",
    },
    {
      id: "chk-em-4",
      action: "Gunakan fitur 'Cek Pesan & File' di JagaRuang untuk menganalisis teks email mencurigakan.",
      benefit: "Memindai 22 aturan heuristik red flags secara privat on-device tanpa kirim data ke server.",
    },
  ],
  sources: [
    {
      name: "Internet Engineering Task Force (IETF) - RFC 7208 (SPF) & RFC 6376 (DKIM)",
      note: "[VERIFIKASI: Standar resmi autentikasi email]",
    },
    {
      name: "Badan Siber dan Sandi Negara (BSSN) - Panduan Keamanan Email Phishing",
      note: "[VERIFIKASI: Laporan tren insiden phishing bssn.go.id]",
    },
  ],
  disclaimer:
    "Modul ini bersifat edukasi umum. Analisis header email dapat berbeda tergantung aplikasi email yang kamu gunakan (Gmail, Outlook, Apple Mail). Jika ragu, hubungi kontak resmi institusi.",
  takeaway:
    "Garis pertahanan pertama email phishing selalu ada pada domain asli di balik tanda '@' dan alamat sebenarnya dari tautan sebelum diklik. Jangan biarkan urgensi palsu mendikte keputusanmu.",
};

