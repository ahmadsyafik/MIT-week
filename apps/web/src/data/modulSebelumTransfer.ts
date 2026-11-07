// Data terstruktur untuk Modul Pembelajaran m7: Checklist Sebelum Transfer
// Target Pengguna: Masyarakat umum, orang tua/lansia, bahasa santai, konkret, kalimat pendek.

export interface TransferStepperStep {
  step: number;
  title: string;
  shortDesc: string;
  accordionDetails: string;
  safetyTip: string;
}

export interface TransferRedFlag {
  id: string;
  title: string;
  severity: "kuning" | "merah" | "hijau";
  severityLabel: string;
  explanation: string;
  advice: string;
}

export interface ChatBubbleSimulation {
  id: string;
  sender: "penjual" | "pembeli";
  text: string;
  isSuspicious: boolean;
  redFlagExplanation?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TransferQuizItem {
  id: number;
  question: string;
  options: {
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface ModulSebelumTransferData {
  id: string;
  title: string;
  readingTime: string;
  lastUpdated: string;
  whyNewAccountRisk: {
    heading: string;
    points: string[];
  };
  stepperTimeline: TransferStepperStep[];
  additionalAnatomyModus: {
    title: string;
    items: { name: string; desc: string; danger: string }[];
  };
  redFlagsNuanced: TransferRedFlag[];
  chatSimulation: {
    title: string;
    subtitle: string;
    bubbles: ChatBubbleSimulation[];
  };
  caseStudyFictional: {
    title: string;
    label: string;
    story: string;
    lessons: string[];
  };
  emergencyIfTransferred: {
    title: string;
    steps: {
      order: number;
      title: string;
      timeline: string;
      detail: string;
      verificationNote?: string;
    }[];
  };
  checklist: {
    id: string;
    action: string;
    why: string;
    privacyNote?: string;
  }[];
  faqs: FaqItem[];
  quizzes: TransferQuizItem[];
  sources: { name: string; note?: string }[];
  disclaimer: string;
  takeaway: string;
}

export const MODUL_SEBELUM_TRANSFER: ModulSebelumTransferData = {
  id: "m7",
  title: "Checklist Sebelum Transfer",
  readingTime: "±4 menit baca",
  lastUpdated: "2026-11-07",
  whyNewAccountRisk: {
    heading: "Sebelum Pencet 'Kirim', Kenapa Rekening Baru Perlu Dicek?",
    points: [
      "Uang yang sudah kamu kirim via transfer antarbank atau QRIS berpindah secara langsung dan seketika.",
      "Begitu uang masuk ke rekening penipu, saldo biasanya langsung dipindahkan atau ditarik tunai di ATM dalam hitungan menit.",
      "Bank tidak bisa menarik kembali uangmu secara sepihak tanpa persetujuan pemilik rekening tujuan atau perintah resmi penegak hukum.",
    ],
  },
  stepperTimeline: [
    {
      step: 1,
      title: "Tekanan Urgensi",
      shortDesc: "Penjual memintamu transfer cepat dalam hitungan menit.",
      accordionDetails:
        "Pelaku berkata barang incaranmu sedang ditawar pembeli lain, atau promo diskon 70% hanya berlaku sampai jam 12 siang ini. Ini trik agar kamu tidak sempat berpikir jernih.",
      safetyTip:
        "Tarik napas sejenak. Jangan pernah mentransfer uang dalam kondisi terburu-buru.",
    },
    {
      step: 2,
      title: "Rekening Penampung Diberikan",
      shortDesc: "Nomor rekening atau QRIS pribadi asing diberikan lewat chat.",
      accordionDetails:
        "Penjual toko online mengaku perusahaan resmi, namun saat transaksi meminta transfer ke rekening perorangan (rekening penampung/pinjaman). Terkadang disertai permintaan nominal dengan kode unik aneh (misal Rp200.742) yang sebenarnya adalah kode tiket top-up dompet digital milik pelaku.",
      safetyTip:
        "Cek rekening tersebut di portal CekRekening.id sebelum membuka aplikasi m-Banking.",
    },
    {
      step: 3,
      title: "Uang Ditransfer & Bukti Dikirim",
      shortDesc: "Korban mengirimkan struk transfer ke penjual.",
      accordionDetails:
        "Korban merasa lega karena sudah membayar. Namun beberapa menit kemudian, penjual meminta 'biaya asuransi pengiriman' atau 'uang jaminan gudang' tambahan.",
      safetyTip:
        "Jika penjual meminta biaya tambahan baru setelah transfer pertama, JANGAN KIRIM LAGI sepeser pun!",
    },
    {
      step: 4,
      title: "Pelaku Menghilang",
      shortDesc: "Nomor korban diblokir dan chat dihapus.",
      accordionDetails:
        "Uang telah ditarik tunai di rekening penampung. Penjual memutus seluruh saluran komunikasi.",
      safetyTip:
        "Segera telepon call center bank milikmu dalam 1-2 jam pertama untuk melaporkan penipuan.",
    },
  ],
  additionalAnatomyModus: {
    title: "5 Modus Tambahan yang Sering Menjebak Transaksi",
    items: [
      {
        name: "Bukti Transfer Palsu (Struk Editan)",
        desc: "Pembeli abal-abal mengirim foto struk transfer m-Banking yang sebenarnya diedit menggunakan aplikasi foto editor, padahal saldo belum masuk ke rekeningmu.",
        danger: "Jangan percaya struk foto! Selalu buka aplikasi m-Banking milikmu dan pastikan saldo mutasi rekening benar-benar bertambah.",
      },
      {
        name: "Ajakan Pindah ke WhatsApp dari Marketplace",
        desc: "Penjual meminta melanjutkan transaksi via chat WhatsApp pribadi dengan iming-iming 'bebas biaya admin marketplace' atau diskon khusus.",
        danger: "Transaksi di luar marketplace resmi menghilangkan perlindungan rekening bersama (escrow) sehingga uangmu tidak bisa dikembalikan jika barang tidak dikirim.",
      },
      {
        name: "Penipuan COD (Cash On Delivery) Paket Kosong",
        desc: "Kurir datang menagih bayaran paket COD yang tidak pernah dipesan oleh penghuni rumah, berisi barang rongsokan tak bernilai.",
        danger: "Beri tahu orang rumah: Jangan pernah bayar paket COD jika nama pemesan atau barangnya tidak jelas.",
      },
      {
        name: "Trik Kode Unik Pembayaran E-Wallet",
        desc: "Pelaku meminta kamu mentransfer nominal acak seperti Rp150.841 dengan dalih 'agar sistem mengenali antrean transfermu'.",
        danger: "Nominal acak tersebut sebenarnya adalah kode tiket otomatis untuk mengisi saldo e-wallet penipu di dompet digital tanpa verifikasi KTP.",
      },
      {
        name: "Harga Jauh di Bawah Standar Pasar",
        desc: "Ponsel harga normal Rp10 Juta dijual hanya Rp3 Juta dengan alasan 'barang lelang sitaan bea cukai' atau 'promo cuci gudang'.",
        danger: "Jika suatu penawaran tampak terlalu indah untuk menjadi kenyataan, hampir pasti itu adalah jebakan penipuan.",
      },
    ],
  },
  redFlagsNuanced: [
    {
      id: "rf-nama-beda",
      title: "Nama Pemilik Rekening Berbeda dari Nama Toko",
      severity: "kuning",
      severityLabel: "Perlu Waspada (Bernuansa)",
      explanation:
        "Pada bisnis toko kecil atau UMKM, nama rekening memang bisa atas nama pemilik pribadi. Ini belum tentu penipuan.",
      advice:
        "Jangan langsung memvonis. Minta penjual menjelaskan mengapa nama rekening berbeda dan verifikasi nomor HP atau media sosial mereka lewat jalur lain.",
    },
    {
      id: "rf-tolak-escrow",
      title: "Menolak Sistem Rekening Bersama (Marketplace)",
      severity: "merah",
      severityLabel: "Bahaya Tinggi",
      explanation:
        "Penjual ngotot hanya mau transfer langsung ke rekening pribadi dan menolak transaksi lewat platform e-commerce terpercaya.",
      advice:
        "Batalkan transaksi. Marketplace resmi melindungi uangmu sampai barang diterima dengan selamat.",
    },
    {
      id: "rf-foto-curian",
      title: "Foto Produk Curian dari Toko Lain & Akun Baru",
      severity: "merah",
      severityLabel: "Bahaya Tinggi",
      explanation:
        "Foto produk memiliki watermark nama toko lain yang disensor, akun media sosial baru dibuat beberapa minggu, dan kolom komentar dimatikan.",
      advice:
        "Gunakan pencarian gambar Google (Reverse Image Search) untuk mengecek apakah foto tersebut milik penjual lain.",
    },
    {
      id: "rf-tolak-video",
      title: "Menolak Panggilan Video Singkat",
      severity: "kuning",
      severityLabel: "Perlu Waspada",
      explanation:
        "Untuk transaksi perorangan bernilai jutaan rupiah (misal jual beli motor atau barang elektronik bekas), penjual menolak video call cek kondisi fisik barang.",
      advice:
        "Waspadai barang fiktif. Selalu prioritaskan opsi bayar di tempat (COD) di lokasi umum yang ramai dan aman.",
    },
  ],
  chatSimulation: {
    title: "Simulasi Chat Penjual: Ketuk Kalimat yang Mencurigakan!",
    subtitle:
      "Berikut adalah percakapan nyata saat membeli laptop bekas online. Ketuk gelembung chat yang memuat tanda bahaya (red flag):",
    bubbles: [
      {
        id: "b1",
        sender: "pembeli",
        text: "Halo Kak, laptop ThinkPad T480-nya masih ada? Bisa transaksi lewat Tokopedia/Shopee?",
        isSuspicious: false,
      },
      {
        id: "b2",
        sender: "penjual",
        text: "Masih Kak! Tapi maaf banget Tokopedia saya lagi limit kena pajak admin. Langsung transfer aja ya Kak, saya kasih diskon 300rb!",
        isSuspicious: true,
        redFlagExplanation:
          "🚨 RED FLAG: Menolak transaksi lewat marketplace resmi dengan alasan limit/pajak untuk memancing transaksi transfer langsung tanpa jaminan escrow.",
      },
      {
        id: "b3",
        sender: "pembeli",
        text: "Boleh minta foto unitnya dengan kertas bertuliskan nama saya Kak?",
        isSuspicious: false,
      },
      {
        id: "b4",
        sender: "penjual",
        text: "Aduh barangnya udah di kardus siap kirim di JNE Kak. Banyak yang antre nih, kalau gak transfer dalam 10 menit saya lempar ke orang lain ya!",
        isSuspicious: true,
        redFlagExplanation:
          "🚨 RED FLAG: Tekanan waktu 10 menit dan menolak bukti kepemilikan fisik barang asli.",
      },
      {
        id: "b5",
        sender: "penjual",
        text: "Transfer Rp2.500.829 ke Rek BCA 82910281 Bpk Hendra ya. Harus pas 829-nya biar sistem lacak otomatis.",
        isSuspicious: true,
        redFlagExplanation:
          "🚨 RED FLAG: Rekening penampung atas nama perorangan lain dan kode unik 829 mencurigakan yang mengarah ke tiket top-up e-wallet.",
      },
    ],
  },
  caseStudyFictional: {
    title: "Studi Kasus: Membeli Kamera Bekas Murah Berujung Saldo Lenyap",
    label: "Ilustrasi Fiktif Berdasarkan Pola Laporan Nyata",
    story:
      "Pak Joko (52 tahun) melihat iklan kamera mirrorless di media sosial dengan harga Rp2.500.000 (harga pasaran normal Rp6 Juta). Penjual mengaku pensiunan fotografer yang sedang butuh uang obat cucunya. Karena merasa iba dan tergiur harga murah, Pak Joko mentransfer uang ke rekening atas nama 'Budi Santoso'. Setelah transfer, penjual meminta 'uang asuransi kargo' Rp800.000 lagi. Saat Pak Joko mulai curiga dan menolak, penjual memblokir nomor WhatsApp Pak Joko.",
    lessons: [
      "Harga jauh di bawah pasar adalah umpan emosional paling efektif.",
      "Cerita iba (butuh uang obat/operasi) sering dipakai sebagai kedok pretexting.",
      "Permintaan transfer kedua untuk 'biaya asuransi/kurir' adalah penanda pasti penipuan.",
    ],
  },
  emergencyIfTransferred: {
    title: "Kalau Terlanjur Transfer: 4 Langkah Darurat Berurutan",
    steps: [
      {
        order: 1,
        title: "Telepon Call Center Bank Pengirim Segera",
        timeline: "Maksimal 1 - 2 Jam (Golden Period)",
        detail:
          "Minta pihak bank menandai transaksi penipuan dan menerbitkan tiket pelaporan resmi agar bank pengirim bisa berkoordinasi dengan bank penerima untuk menahan saldo penipu sebelum ditarik.",
        verificationNote:
          "// TODO: verifikasi manual nomor resmi bank penerbit kartumu di balik fisik kartu debit/kredit.",
      },
      {
        order: 2,
        title: "Kumpulkan & Cetak Bukti Percakapan",
        timeline: "Hari Ini Juga",
        detail:
          "Simpan tangkapan layar chat dari awal hingga pemblokiran, nomor kontak pelaku, foto struk transfer, dan tautan akun media sosial toko penjual.",
      },
      {
        order: 3,
        title: "Laporkan Nomor Rekening di Portal CekRekening.id",
        timeline: "Dalam 1 x 24 Jam",
        detail:
          "Masukkan data nomor rekening penipu dan kronologi kejadian di portal CekRekening.id Komdigi agar status rekening tersebut dibekukan secara nasional.",
        verificationNote:
          "[VERIFIKASI: Periksa alamat portal resmi cekrekening.id Komdigi]",
      },
      {
        order: 4,
        title: "Buat Laporan Resmi di Kantor Kepolisian Terdekat",
        timeline: "Dalam 1 - 2 Hari",
        detail:
          "Bawa Surat Tanda Penerimaan Laporan (STPL) dari kepolisian ke kantor cabang bank milikmu sebagai syarat hukum pencairan kembali dana yang sempat ditahan bank penerima.",
        verificationNote:
          "[VERIFIKASI: Syarat berkas pemblokiran rekening tindak pidana perbankan]",
      },
    ],
  },
  checklist: [
    {
      id: "chk-tf-1",
      action: "Cek nama pemilik rekening tujuan di portal CekRekening.id sebelum membuka aplikasi perbankan.",
      why: "Memeriksa apakah rekening pernah dilaporkan atas tindak pidana penipuan aktif.",
    },
    {
      id: "chk-tf-2",
      action: "Cek riwayat nomor kontak penjual di aplikasi identifikasi nomor publik (GetContact / Truecaller).",
      why: "Melihat tag ulasan komunitas terhadap nomor HP pengirim.",
      privacyNote:
        "Catatan Privasi: Aplikasi publik semacam ini mengakses buku kontak pengguna dan ulasannya tidak selalu 100% akurat. Gunakan sebagai bahan pertimbangan tambahan.",
    },
    {
      id: "chk-tf-3",
      action: "Pastikan transaksi belanja online diselesaikan di dalam sistem rekening bersama (escrow) marketplace resmi.",
      why: "Marketplace menahan uangmu dengan aman sampai kamu mengonfirmasi barang diterima dalam kondisi baik.",
    },
    {
      id: "chk-tf-4",
      action: "Jika mentransfer untuk keperluan darurat keluarga, telepon langsung atau video call terlebih dahulu.",
      why: "Memastikan uang dikirim ke keluarga yang sebenarnya, bukan ke nomor palsu yang membajak akun WhatsApp kerabat.",
    },
    {
      id: "chk-tf-5",
      action: "Simpan tangkapan layar percakapan, kesepakatan harga, dan bukti transfer ke galeri ponsel.",
      why: "Alat bukti mutlak jika sewaktu-waktu dibutuhkan untuk koordinasi pelaporan perbankan.",
    },
  ],
  faqs: [
    {
      question: "Bagaimana jika penjualnya toko kecil/UMKM yang memang belum punya PT?",
      answer:
        "Boleh bertransaksi dengan rekening pribadi UMKM, asalkan kamu memastikan akun tokonya memiliki reputasi wajar, ulasan foto asli dari pembeli lain, bersedia mengirim bukti foto fisik barang, atau menawarkan opsi pembayaran COD/marketplace.",
    },
    {
      question: "Apakah transfer lewat Virtual Account (VA) pasti aman dari penipuan?",
      answer:
        "Belum tentu! Penipu sering membuat nomor Virtual Account pembayaran e-wallet atau marketplace fiktif. Jika kamu membayar VA tersebut, saldo langsung masuk ke dompet digital pelaku tanpa bisa dibatalkan.",
    },
    {
      question: "Apakah bank bisa langsung mengembalikan uang saya yang sudah terlanjur ditransfer?",
      answer:
        "Secara hukum perbankan, bank tidak berhak menarik saldo dari rekening nasabah lain tanpa izin tertulis pemilik rekening atau putusan/perintah resmi kepolisian dan pengadilan. Namun jika dilaporkan cepat (< 2 jam), bank penerima bisa membekukan sementara rekening penipu sebelum uangnya ditarik tunai.",
    },
    {
      question: "Apakah foto KTP yang dikirimkan penjual bisa menjamin keasliannya?",
      answer:
        "Sama sekali tidak! Penipu sering memakai foto KTP curian milik korban penipuan loker fiktif sebelumnya untuk meyakinkan calon korban baru.",
    },
  ],
  quizzes: [
    {
      id: 1,
      question:
        "Kamu ingin membeli kamera bekas di Instagram. Penjual meminta transfer ke rekening pribadi BCA dan menolak transaksi Tokopedia dengan alasan limit pajak. Apa tindakan teraman?",
      options: [
        {
          label: "Batalkan transaksi karena menolak escrow marketplace adalah red flag bahaya",
          isCorrect: true,
          explanation:
            "Tepat! Penjual jujur tidak akan keberatan menggunakan platform aman bergaransi uang kembali.",
        },
        {
          label: "Langsung transfer asalkan penjual mengirimkan foto KTP-nya",
          isCorrect: false,
          explanation:
            "Salah. Foto KTP sangat mudah dipalsukan atau diambil dari korban penipuan lain.",
        },
        {
          label: "Transfer setengah harga dulu sebagai tanda jadi (DP)",
          isCorrect: false,
          explanation:
            "Berisiko. Uang muka (DP) tetap akan hilang begitu kontak diblokir pelaku.",
        },
      ],
    },
    {
      id: 2,
      question:
        "Saat membeli barang seharga Rp100.000, penjual meminta kamu mentransfer nominal tepat Rp100.829. Apa arti kode 829 tersebut?",
      options: [
        {
          label: "Kode tiket otomatis untuk top-up dompet digital pelaku",
          isCorrect: true,
          explanation:
            "Tepat! Angka unik acak ini sering digunakan gateway e-wallet untuk mencocokkan setoran saldo otomatis tanpa verifikasi KTP.",
        },
        {
          label: "Pajak resmi pertambahan nilai pemerintah 11%",
          isCorrect: false,
          explanation:
            "Salah. Pajak resmi perbankan dihitung transparan, bukan berupa kode acak ke rekening pribadi.",
        },
      ],
    },
    {
      id: 3,
      question:
        "Jika kamu baru saja menyadari telah mentransfer uang ke penipu 30 menit yang lalu, apa tindakan paling pertama yang wajib dilakukan?",
      options: [
        {
          label: "Segera telepon call center bank milikmu untuk blokir & koordinasi penahanan saldo",
          isCorrect: true,
          explanation:
            "Tepat! Waktu 1-2 jam pertama (Golden Period) sangat krusial sebelum pelaku sempat menarik tunai uangmu di mesin ATM.",
        },
        {
          label: "Memohon dan memarahi penipu lewat chat agar mengembalikan uangnya",
          isCorrect: false,
          explanation:
            "Sia-sia. Penipu profesional akan langsung memblokir nomor kontakmu begitu uang diterima.",
        },
      ],
    },
  ],
  sources: [
    {
      name: "Portal CekRekening.id - Direktorat Pengendalian Aplikasi Informatika Komdigi",
      note: "[VERIFIKASI: Database nasional pelaporan rekening penipuan komdigi.go.id]",
    },
    {
      name: "Bank Indonesia (BI) - Pedoman Transaksi Pembayaran Aman bagi Konsumen",
      note: "[VERIFIKASI: Ketentuan transfer dana seketika SKNBI / BI-FAST]",
    },
    {
      name: "Otoritas Jasa Keuangan (OJK) - Satgas Pemberantasan Aktivitas Keuangan Ilegal (PASTI)",
      note: "[VERIFIKASI: Kanal aduan konsumen OJK 157]",
    },
  ],
  disclaimer:
    "Modul ini bersifat edukasi transaksi umum. Keputusan transfer dan pemilihan jalur transaksi sepenuhnya berada pada kendali pengguna. Verifikasi mandiri sebelum menekan tombol kirim adalah perlindungan terbaik.",
  takeaway:
    "Sebelum pencet 'Kirim', luangkan 2 menit untuk memeriksa nomor rekening tujuan. Uang yang sudah keluar hampir mustahil ditarik kembali jika sudah berpindah tangan.",
};
