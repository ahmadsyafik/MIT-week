import type { ActionGuide, ReportChannel, WarningCard, AnalysisResult } from "@jagaruang/contracts";

export const MOCK_REPORT_CHANNELS: ReportChannel[] = [
  {
    id: "cek-rekening",
    name: "CekRekening.id (Kemenkominfo)",
    url: "https://cekrekening.id",
    contact: "Portal Aduan Rekening Bank",
    verifiedAt: "2026-10-15",
  },
  {
    id: "aduan-konten",
    name: "Aduan Konten Kominfo",
    url: "https://aduankonten.id",
    contact: "WhatsApp: +62 811-9224-545",
    verifiedAt: "2026-10-20",
  },
  {
    id: "patroli-siber",
    name: "Patroli Siber Polri (Dittipidsiber)",
    url: "https://patrolisiber.id",
    contact: "info@patrolisiber.id",
    verifiedAt: "2026-10-25",
  },
  {
    id: "call-center-bank",
    name: "Call Center Bank Resmi",
    contact: "BCA (1500888), Mandiri (14000), BRI (1500017), BNI (1500046)",
    verifiedAt: "2026-11-01",
  },
  {
    id: "ojk-kontak",
    name: "Kontak OJK 157 (Konsumen Keuangan)",
    url: "https://kontak157.ojk.go.id",
    contact: "Telp 157 / WhatsApp: +62 81-157-157-157",
    verifiedAt: "2026-10-30",
  },
];

export const MOCK_ACTION_GUIDES: ActionGuide[] = [
  {
    id: "guide-belum-klik",
    condition: "belum_klik",
    title: "Pesan / Tautan Mencurigakan Baru Diterima (Belum Diklik)",
    steps: [
      {
        id: "step-bk-1",
        order: 1,
        text: "Tahan diri: Jangan klik tautan, jangan unduh lampiran berkas (.apk, .zip), dan jangan membalas pesan tersebut.",
        urgency: "segera",
      },
      {
        id: "step-bk-2",
        order: 2,
        text: "Ambil tangkapan layar (screenshot) pesan dan nomor pengirim secara utuh sebagai bukti arsip mandiri.",
        urgency: "segera",
      },
      {
        id: "step-bk-3",
        order: 3,
        text: "Blokir nomor pengirim dan laporkan sebagai spam di aplikasi WhatsApp/Telegram/SMS ponselmu.",
        urgency: "hari_ini",
      },
      {
        id: "step-bk-4",
        order: 4,
        text: "Laporkan nomor pengirim ke portal Aduan Konten Kominfo agar nomor diblokir oleh operator.",
        urgency: "hari_ini",
        channelId: "aduan-konten",
      },
      {
        id: "step-bk-5",
        order: 5,
        text: "Bagikan kartu peringatan singkat ke keluarga atau grup pertemanan agar tidak ada yang terkena modus serupa.",
        urgency: "minggu_ini",
      },
    ],
  },
  {
    id: "guide-sudah-install",
    condition: "sudah_install",
    title: "Darurat: Sudah Terlanjur Unduh / Pasang Berkas APK Mencurigakan",
    steps: [
      {
        id: "step-si-1",
        order: 1,
        text: "Segera aktifkan Mode Pesawat (Airplane Mode) seketika untuk memutus koneksi internet dan pengiriman SMS OTP ke server pelaku.",
        urgency: "segera",
      },
      {
        id: "step-si-2",
        order: 2,
        text: "Keluarkan kartu SIM fisik (atau nonaktifkan eSIM) dari ponsel untuk mencegah malware membaca atau meneruskan SMS verifikasi bank.",
        urgency: "segera",
      },
      {
        id: "step-si-3",
        order: 3,
        text: "Hubungi Call Center resmi Bank dan Dompet Digital (gunakan ponsel lain) untuk memblokir sementara m-Banking dan kartu debit.",
        urgency: "segera",
        channelId: "call-center-bank",
      },
      {
        id: "step-si-4",
        order: 4,
        text: "Buka Pengaturan HP > Aplikasi > temukan aplikasi mencurigakan > Hapus Izin Aksesibilitas & SMS > Copot Pemasangan (Uninstall).",
        urgency: "segera",
      },
      {
        id: "step-si-5",
        order: 5,
        text: "Jika aplikasi bersembunyi atau menolak dicopot, lakukan Reset Pabrik (Factory Reset) pada perangkat ponselmu.",
        urgency: "hari_ini",
      },
      {
        id: "step-si-6",
        order: 6,
        text: "Ganti seluruh kata sandi email utama, akun perbankan, dan e-commerce dari perangkat komputer/ponsel lain yang bersih.",
        urgency: "hari_ini",
      },
    ],
  },
  {
    id: "guide-sudah-transfer",
    condition: "sudah_transfer",
    title: "Kritis: Sudah Terlanjur Transfer Uang atau Memasukkan Data Rekening",
    steps: [
      {
        id: "step-st-1",
        order: 1,
        text: "Waktu sangat krusial! Segera telepon Call Center resmi Bank pengirimmu (dalam hitungan menit) untuk minta penahanan transaksi penipuan.",
        urgency: "segera",
        channelId: "call-center-bank",
      },
      {
        id: "step-st-2",
        order: 2,
        text: "Simpan bukti mutasi rekening: catat nama bank tujuan, nomor rekening pelaku, nama pemilik rekening penipu, tanggal, jam, dan nomor referensi transfer.",
        urgency: "segera",
      },
      {
        id: "step-st-3",
        order: 3,
        text: "Laporkan nomor rekening penipu ke portal CekRekening.id (Kemenkominfo) agar rekening penampung segera dibekukan.",
        urgency: "hari_ini",
        channelId: "cek-rekening",
      },
      {
        id: "step-st-4",
        order: 4,
        text: "Datang ke kantor kepolisian terdekat (SPKT/Polres) atau buat laporan di Patroli Siber Polri untuk menerbitkan Surat Tanda Laporan Polisi.",
        urgency: "hari_ini",
        channelId: "patroli-siber",
      },
      {
        id: "step-st-5",
        order: 5,
        text: "Bawa Surat Laporan Polisi ke kantor cabang bank terdekat untuk proses investigasi dan penahanan dana di bank tujuan transfer.",
        urgency: "hari_ini",
      },
    ],
  },
  {
    id: "guide-akun-diretas",
    condition: "akun_diretas",
    title: "Pemulihan: Akun WhatsApp / Email / Dompet Digital Telah Diretas",
    steps: [
      {
        id: "step-ad-1",
        order: 1,
        text: "Untuk WhatsApp: Pasang ulang WhatsApp di HP, verifikasi nomor dengan 6 digit SMS OTP baru untuk mengambil alih sesi kembali.",
        urgency: "segera",
      },
      {
        id: "step-ad-2",
        order: 2,
        text: "Keluarkan paksa semua sesi login aktif melalui menu 'Perangkat Tertaut' (Linked Devices).",
        urgency: "segera",
      },
      {
        id: "step-ad-3",
        order: 3,
        text: "Kirim email bantuan darurat ke support@whatsapp.com dengan subjek 'Hilang/Dicuri: Silakan nonaktifkan akun saya' beserta nomor HP lengkap format internasional (+62...).",
        urgency: "segera",
      },
      {
        id: "step-ad-4",
        order: 4,
        text: "Beri tahu keluarga dan teman terdekat lewat media sosial lain bahwa nomor sedang diretas agar tidak mengirim uang jika dihubungi.",
        urgency: "segera",
      },
      {
        id: "step-ad-5",
        order: 5,
        text: "Aktifkan Verifikasi Dua Langkah (Two-Factor Authentication / PIN 2FA) dengan alamat email pemulihan yang aman.",
        urgency: "hari_ini",
      },
    ],
  },
  {
    id: "guide-orang-dekat",
    condition: "orang_dekat_hampir_kena",
    title: "Bantuan Sekitar: Orang Tua / Kerabat Hampir Tertipu atau Sedang Bingung",
    steps: [
      {
        id: "step-od-1",
        order: 1,
        text: "Bantu mereka untuk tetap tenang dan jangan menyalahkan. Minta mereka menghentikan percakapan seketika dan tunda transfer dana.",
        urgency: "segera",
      },
      {
        id: "step-od-2",
        order: 2,
        text: "Periksa ponsel mereka bersama-sama: pastikan tidak ada file installer (.apk) yang sedang berjalan atau kode OTP yang terbaca.",
        urgency: "segera",
      },
      {
        id: "step-od-3",
        order: 3,
        text: "Verifikasi informasi secara independen lewat nomor resmi (misal menghubungi langsung kerabat yang dikabarkan sakit atau ditahan).",
        urgency: "segera",
      },
      {
        id: "step-od-4",
        order: 4,
        text: "Buatkan Kartu Peringatan Singkat dan bagikan ke grup keluarga besar agar kerabat lain waspada terhadap modus yang sama.",
        urgency: "hari_ini",
      },
      {
        id: "step-od-5",
        order: 5,
        text: "Sepakati 'Sandi Keluarga' lisan secara tatap muka untuk memvalidasi permintaan bantuan dana mendadak di kemudian hari.",
        urgency: "minggu_ini",
      },
    ],
  },
];

export function mockListActionGuides(): ActionGuide[] {
  return MOCK_ACTION_GUIDES;
}

export function mockListReportChannels(): ReportChannel[] {
  return MOCK_REPORT_CHANNELS;
}

export function mockBuildWarningCard(_analysis?: AnalysisResult): WarningCard {
  const text = `JagaRuang: Yuk, Jaga Keluarga dari Penipuan Digital!

Halo Keluarga & Sahabat tersayang,
Akhir-akhir ini makin banyak modus penipuan online yang menyasar siapa saja, termasuk orang-orang terdekat kita. Yuk, kenali tandanya bersama-sama.

Ciri-ciri Pesan Mencurigakan:
Biasanya pelaku berpura-pura jadi orang yang kita kenal atau pihak resmi seperti bank atau kurir, lalu:
- Mendesak kita buru-buru transfer uang
- Mengirim file aneh berformat .apk
- Mengarahkan ke link yang bukan situs resmi

Apa yang Harus Kita Lakukan?
1. Jangan langsung klik link atau pasang file yang dikirim, sekalipun dari nomor yang kita kenal.
2. Jangan pernah kasih tahu kode OTP, PIN, atau data rekening ke siapa pun, walau mengaku dari bank sekalipun.
3. Cek dulu baru percaya. Kalau ragu, telepon langsung ke call center resmi atau tanya tatap muka ke orang yang bersangkutan.

Semua pengecekan di JagaRuang diproses langsung di perangkatmu, datamu aman dan tidak dikirim ke mana-mana. Yuk saling ingatkan, karena menjaga satu sama lain dimulai dari hal kecil seperti ini.

#JagaRuang #CekLatihLindungi #GuardiansOfTheDigitalSpace`;

  return { text };
}

