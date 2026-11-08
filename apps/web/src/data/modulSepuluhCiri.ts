// Data terstruktur untuk Modul Pembelajaran m6: 10 Ciri Pesan Phishing yang Wajib Dicek
// Modul Capstone Penutup Seri Phishing

export interface TraitItem {
  number: number;
  id: string;
  name: string;
  iconName: "clock" | "gift" | "lock" | "link" | "file" | "user" | "spell" | "phone" | "alert" | "globe";
  severity: "waspada" | "bahaya";
  summary: string;
  nuanceExplanation?: string;
  exampleSnippet: string;
}

export interface TraitCategory {
  id: string;
  categoryName: string;
  categorySummary: string;
  traits: TraitItem[];
}

export interface CapstoneQuizMessage {
  id: number;
  channel: "Email" | "WhatsApp" | "SMS" | "Telepon";
  senderInfo: string;
  content: string;
  isPhishing: boolean;
  actualRedFlagIds: string[];
  options: {
    traitId: string;
    label: string;
  }[];
  explanation: string;
}

export interface ModulSepuluhCiriData {
  id: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  thresholdRule: {
    oneTrait: string;
    twoOrMoreTraits: string;
  };
  categories: TraitCategory[];
  capstoneQuizzes: CapstoneQuizMessage[];
  checklist: {
    id: string;
    action: string;
    benefit: string;
    hasLinkToCek?: boolean;
  }[];
  sources: { name: string; note?: string }[];
  disclaimer: string;
  takeaway: string;
}

export const MODUL_SEPULUH_CIRI: ModulSepuluhCiriData = {
  id: "m6",
  title: "10 Ciri Pesan Phishing yang Wajib Dicek",
  readingTime: "6 menit baca",
  lastUpdated: "2026-11-07",
  thresholdRule: {
    oneTrait:
      "1 Ciri Ditemukan = Berhenti Sejenak & Waspada (Belum tentu penipuan, lakukan pengecekan santai).",
    twoOrMoreTraits:
      "2 Ciri atau Lebih Ditemukan = Sangat Mencurigakan & Wajib Verifikasi Mandiri (Hampir pasti rekayasa sosial jahat, jangan klik atau balas!).",
  },
  categories: [
    {
      id: "cat-psikologis",
      categoryName: "Kategori 1: Tekanan Emosional & Manipulasi Pikiran",
      categorySummary:
        "Memanfaatkan emosi takut, panik, serakah, atau tergesa-gesa agar akal sehat lumpuh.",
      traits: [
        {
          number: 1,
          id: "t-urgensi",
          name: "Urgensi Waktu Sempit yang Memaksa Panik",
          iconName: "clock",
          severity: "bahaya",
          summary:
            "Memberi batas waktu beberapa menit atau jam agar kamu bertindak terburu-buru tanpa memeriksa logika.",
          exampleSnippet:
            "\"Akun m-Banking Anda akan diblokir dalam 15 menit jika Anda tidak melakukan verifikasi data sekarang juga!\"",
        },
        {
          number: 2,
          id: "t-hadiah",
          name: "Iming-Iming Hadiah Spektakuler yang Tak Masuk Akal",
          iconName: "gift",
          severity: "bahaya",
          summary:
            "Memberitahukan kamu memenangkan undian puluhan juta rupiah dari kuis atau undian yang tidak pernah kamu ikuti.",
          exampleSnippet:
            "\"Selamat! Nomor WhatsApp Anda terpilih memenangkan hadiah Grand Prize Toyota Alphard dari Telkomsel!\"",
        },
        {
          number: 3,
          id: "t-rahasia",
          name: "Permintaan untuk Merahasiakan Percakapan",
          iconName: "lock",
          severity: "bahaya",
          summary:
            "Melarang korban memberitahu keluarga, rekan kerja, atau bertanya ke kantor bank resmi.",
          exampleSnippet:
            "\"Jangan beritahu siapa pun termasuk pihak bank, ini proses audit rahasia kepolisian demi mengamankan uang Anda.\"",
        },
      ],
    },
    {
      id: "cat-teknis",
      categoryName: "Kategori 2: Indikator Teknis, Domain & Berkas",
      categorySummary:
        "Celah teknis pada alamat web, format berkas, atau manipulasi sistem pengiriman.",
      traits: [
        {
          number: 4,
          id: "t-ekstensi",
          name: "Domain dengan Ekstensi Tidak Biasa (.xyz, .top, .vip)",
          iconName: "globe",
          severity: "waspada",
          summary:
            "Menggunakan domain murah yang sering dibeli massal oleh pelaku kejahatan siber.",
          nuanceExplanation:
            "CATATAN PENTING: Ekstensi seperti .xyz atau .top bukan bukti tunggal phishing karena banyak startup dan komunitas sah yang juga menggunakannya. Jadikan ini faktor pendukung kecurigaan jika muncul bersamaan dengan red flag lainnya.",
          exampleSnippet:
            "Tautan bank ditulis sebagai: 'https://bca-klik-layanan.xyz/login' bukannya 'klikbca.com'.",
        },
        {
          number: 5,
          id: "t-typo",
          name: "Penulisan Domain Menyerupai Asli (Typosquatting)",
          iconName: "link",
          severity: "bahaya",
          summary:
            "Mengubah atau menyisipkan 1-2 huruf pada nama domain resmi agar sepintas tampak asli di layar.",
          exampleSnippet:
            "Contoh: 'www.clikbca.com', 'bri-mo-info.com', atau 'tokopedla.id'.",
        },
        {
          number: 6,
          id: "t-apk",
          name: "Pengiriman Berkas Lampiran .APK / .HTML / .ISO / .ZIP",
          iconName: "file",
          severity: "bahaya",
          summary:
            "Menyamarkan aplikasi Android atau skrip peretas sebagai dokumen resi paket, foto, atau bukti transfer.",
          exampleSnippet:
            "File kiriman chat bernama 'Foto_Surat_Tilang_ETLE.apk' berukuran 6.2 MB.",
        },
        {
          number: 7,
          id: "t-nomor-biasa",
          name: "Nomor Seluler Biasa Mengaku Institusi Korporasi",
          iconName: "phone",
          severity: "bahaya",
          summary:
            "Pesan resmi perusahaan besar dikirimkan menggunakan nomor kartu perdana seluler biasa (+62 8xx).",
          exampleSnippet:
            "Pemberitahuan pemenang Shopee dikirim lewat nomor WhatsApp pribadi tanpa centang hijau resmi.",
        },
      ],
    },
    {
      id: "cat-bahasa",
      categoryName: "Kategori 3: Pola Bahasa, Sapaan & Komunikasi",
      categorySummary:
        "Kejanggalan pada gaya penulisan, etika sapaan, dan kemunculan kontak tiba-tiba.",
      traits: [
        {
          number: 8,
          id: "t-sapaan-umum",
          name: "Sapaan Umum Kaku Tanpa Menyebut Nama Korban",
          iconName: "user",
          severity: "waspada",
          summary:
            "Menggunakan panggilan generik seperti 'Yth. Pelanggan Tercinta' karena pelaku menyebar template ke jutaan kontak acak.",
          exampleSnippet:
            "\"Kepada Yth. Pemilik Rekening yang Terhormat, verifikasi segera akun Anda...\"",
        },
        {
          number: 9,
          id: "t-tata-bahasa",
          name: "Tata Bahasa Kaku Hasil Terjemahan Mesin",
          iconName: "spell",
          severity: "waspada",
          summary:
            "Banyak kesalahan ejaan, struktur kalimat terbalik, atau campuran istilah bahasa asing yang tidak wajar.",
          exampleSnippet:
            "\"Kami telah periksa penangguhan dana Anda yang jatuh tempo pada Anda punya dompet...\"",
        },
        {
          number: 10,
          id: "t-unsolicited",
          name: "Kontak Masuk Tiba-Tiba Tanpa Pernah Diminta",
          iconName: "alert",
          severity: "waspada",
          summary:
            "Kamu tidak sedang memesan paket, tidak sedang mengajukan kredit, namun tiba-tiba dihubungi mengenai hal tersebut.",
          exampleSnippet:
            "Tiba-tiba menerima chat kurir mengabarkan paket bermasalah saat kamu tidak berbelanja daring.",
        },
      ],
    },
  ],
  capstoneQuizzes: [
    {
      id: 1,
      channel: "Email",
      senderInfo: "Layanan Pelanggan <info@bank-bca-nasabah.xyz>",
      content:
        "Yth. Nasabah, demi keamanan transaksi bulanan Anda, mohon perbarui data kartu ATM Anda dalam 2 jam melalui tautan: https://klikbca.com@bank-bca-nasabah.xyz/update",
      isPhishing: true,
      actualRedFlagIds: ["t-urgensi", "t-ekstensi", "t-sapaan-umum"],
      options: [
        { traitId: "t-urgensi", label: "Ciri 1: Urgensi waktu 2 jam" },
        { traitId: "t-ekstensi", label: "Ciri 4: Ekstensi domain .xyz & jebakan '@'" },
        { traitId: "t-sapaan-umum", label: "Ciri 8: Sapaan umum 'Yth. Nasabah'" },
        { traitId: "t-apk", label: "Ciri 6: File APK berbahaya" },
      ],
      explanation:
        "Pesan ini memuat 3 ciri red flag: ancaman waktu 2 jam, domain .xyz dengan jebakan karakter '@', dan sapaan umum tanpa nama.",
    },
    {
      id: 2,
      channel: "WhatsApp",
      senderInfo: "+62 895-1234-5678 (Profil: Foto Resi Kurir)",
      content:
        "Paket Anda no resi JNE-9912 tertahan karena alamat sobek. Silakan unduh dan pasang aplikasi Lihat_Paket.apk ini untuk melihat foto fisik barang Anda.",
      isPhishing: true,
      actualRedFlagIds: ["t-apk", "t-nomor-biasa", "t-unsolicited"],
      options: [
        { traitId: "t-apk", label: "Ciri 6: File lampiran .apk berbahaya" },
        { traitId: "t-nomor-biasa", label: "Ciri 7: Nomor seluler biasa mengaku ekspedisi" },
        { traitId: "t-unsolicited", label: "Ciri 10: Kontak tiba-tiba" },
        { traitId: "t-hadiah", label: "Ciri 2: Iming-iming hadiah mobil" },
      ],
      explanation:
        "Jelas penipuan sniffing APK! Berkas .apk dikirim oleh nomor seluler biasa berkedok kurir ekspedisi resmi.",
    },
    {
      id: 3,
      channel: "SMS",
      senderInfo: "BANK-MANDIRI (SMS Masking Resmi)",
      content:
        "Transaksi debit Rp250.000 di SUPERINDO pada 07/11 14:20 BERHASIL. Sisa saldo Rp1.450.000. Hubungi 14000 jika bukan transaksi Anda.",
      isPhishing: false,
      actualRedFlagIds: [],
      options: [
        { traitId: "t-urgensi", label: "Ada ancaman waktu panik" },
        { traitId: "t-apk", label: "Ada lampiran aplikasi berbahaya" },
        { traitId: "t-ekstensi", label: "Ada domain aneh .xyz" },
      ],
      explanation:
        "Pesan ini adalah SMS notifikasi transaksi RESMI! Tidak meminta kode rahasia, tidak menyertakan tautan jebakan, dan mengarahkan ke nomor call center resmi 14000.",
    },
    {
      id: 4,
      channel: "WhatsApp",
      senderInfo: "+62 812-9988-1122",
      content:
        "Halo Bu, ini nomorku yang baru. Nomor lama rusak. Tolong jangan bilang Bapak dulu ya, aku butuh pinjam 2 juta mendesak buat bayar kuliah temanku.",
      isPhishing: true,
      actualRedFlagIds: ["t-rahasia", "t-nomor-biasa"],
      options: [
        { traitId: "t-rahasia", label: "Ciri 3: Meminta merahasiakan dari keluarga" },
        { traitId: "t-nomor-biasa", label: "Ciri 7: Menghubungi dari nomor baru asing" },
        { traitId: "t-ekstensi", label: "Ciri 4: Ekstensi domain .top" },
      ],
      explanation:
        "Modus penyamaran kerabat! Pelaku sengaja melarang melapor ke Bapak untuk mencegah konfirmasi silang.",
    },
    {
      id: 5,
      channel: "Email",
      senderInfo: "Google Security <no-reply@accounts.google.com>",
      content:
        "Peringatan Keamanan: Ada login baru ke Akun Google Anda dari perangkat Windows di Jakarta. Jika ini Anda, Anda tidak perlu melakukan apa pun.",
      isPhishing: false,
      actualRedFlagIds: [],
      options: [
        { traitId: "t-urgensi", label: "Ada batas waktu 10 menit" },
        { traitId: "t-typo", label: "Domain pengirim palsu" },
      ],
      explanation:
        "Pesan ini RESMI dari Google! Domain pengirim adalah accounts.google.com resmi dan tidak meminta kamu memasukkan password atau mengunduh berkas.",
    },
  ],
  checklist: [
    {
      id: "chk-c-1",
      action: "Terapkan Aturan Ambang Batas: 1 ciri = waspada, 2 ciri = stop & verifikasi.",
      benefit: "Mencegah kecurigaan berlebihan sekaligus menjaga kewaspadaan terukur.",
    },
    {
      id: "chk-c-2",
      action: "Gunakan fitur 'Cek Pesan & File' di JagaRuang sebelum membuka tautan atau file mencurigakan.",
      benefit: "Memindai teks dan file dengan 22 aturan heuristik deteksi kejahatan digital.",
      hasLinkToCek: true,
    },
    {
      id: "chk-c-3",
      action: "Selalu konfirmasi dua arah lewat nomor telepon lama yang sudah tersimpan sebelum mengirim dana.",
      benefit: "Membatalkan seluruh skenario drama penyamaran nomor kerabat.",
    },
    {
      id: "chk-c-4",
      action: "Ingat prinsip emas: Ekstensi .xyz/.top adalah indikator pendukung, bukan bukti mutlak tunggal.",
      benefit: "Memberikan pemahaman objektif yang tidak menghakimi bisnis legal yang memakai TLD modern.",
    },
  ],
  sources: [
    {
      name: "Cyber Security & Infrastructure Security Agency (CISA) - Recognizing and Reporting Phishing",
      note: "[VERIFIKASI: Standar global 10 indikator phishing cisa.gov]",
    },
    {
      name: "Indonesia Anti-Scam Centre (IASC) / OJK Satgas PASTI",
      note: "[VERIFIKASI: Pola laporan penipuan digital terkini iasc.ojk.go.id]",
    },
  ],
  disclaimer:
    "Modul ini adalah rangkuman capstone universal. Modus penipuan terus berevolusi memadukan AI dan rekayasa psikologis. Selalu gunakan nalar kritis dan verifikasi mandiri.",
  takeaway:
    "Kunci keselamatan digital bukan menghafal setiap jenis penipuan baru, melainkan mengenali pola 10 ciri red flag universal. Begitu 2 ciri muncul bersamaan, segera berhenti dan putus komunikasi.",
};

