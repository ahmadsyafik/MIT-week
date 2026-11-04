import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Compass,
  BookOpen,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  OctagonAlert,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Award,
  X,
  FileCode,
  Users,
  Smartphone,
  Globe,
  QrCode,
  Lock,
  Layers,
  HelpCircle,
  Bell,
} from "lucide-react";
import { Card, Button, Disclaimer } from "../components/ui";
import {
  addNotification,
  NOTIFICATION_EVENT,
  type AppNotification,
} from "../lib/notificationService";

// =============================================================================
// TIPE & DATA STATIC UNTUK 4 TAB BELAJAR
// =============================================================================

type TabType = "simulator" | "modul" | "kilat" | "kamus";

// -----------------------------------------------------------------------------
// 1. DATA SKENARIO SIMULATOR
// -----------------------------------------------------------------------------
interface ScenarioEvidence {
  id: string;
  label: string;
  isRedFlag: boolean;
  explanation: string;
}

interface ScenarioChoice {
  id: string;
  label: string;
  score: number;
  feedback: string;
  isCorrect: boolean;
}

interface ScenarioCase {
  id: string;
  title: string;
  category: string;
  levelLabel: string;
  levelBadge: string;
  dotColor: string;
  duration: string;
  stepsCount: number;
  description: string;
  senderName: string;
  senderAddress: string;
  messageText: string;
  attachmentName?: string;
  attachmentSize?: string;
  briefing: string[];
  evidences: ScenarioEvidence[];
  choices: ScenarioChoice[];
  flagCode: string;
  learningPoint: string;
}

const SCENARIOS: ScenarioCase[] = [
  {
    id: "k1",
    title: "Verifikasi Kontak & Sumber Resmi",
    category: "Skenario 1 · Dasar",
    levelLabel: "Tingkat Dasar",
    levelBadge: "bg-emerald-50 text-emerald-800 border-emerald-300",
    dotColor: "bg-emerald-500",
    duration: "2 Mnt",
    stepsCount: 3,
    description: "Pesan WhatsApp dari nomor seluler pribadi mengaku staf bank resmi meminta klarifikasi transaksi kartu debit.",
    senderName: "BCA Call Center Official",
    senderAddress: "+62 813-8921-9901",
    messageText: "Yth. Nasabah BCA, terdeteksi transaksi mencurigakan senilai Rp 4.750.000 di akun Anda pada 04/11/2026 09:15 WIB. Jika ini bukan Anda, SEGERA batalkan dalam 15 menit melalui konfirmasi ke nomor ini atau saldo Anda akan terdebet otomatis.",
    briefing: [
      "Kamu menerima pesan WhatsApp bernada sangat mendesak dari nomor seluler biasa yang mengaku bank.",
      "Pemberitahuan ancaman pendebetan dana dalam 15 menit bertujuan membuat kamu panik dan gegabah.",
      "Misi: Temukan tanda kejanggalan pada pesan, lalu tentukan keputusan paling aman.",
    ],
    evidences: [
      {
        id: "e1",
        label: "Nomor pengirim adalah nomor seluler biasa (+62 813...), bukan nomor resmi WhatsApp Bank verified centang hijau",
        isRedFlag: true,
        explanation: "Bank resmi tidak pernah menghubungi nasabah perihal transaksi darurat menggunakan nomor seluler prabayar pribadi.",
      },
      {
        id: "e2",
        label: "Urgensi batas waktu panik: 'Batalkan dalam 15 menit atau saldo terdebet otomatis'",
        isRedFlag: true,
        explanation: "Penciptaan urgensi palsu adalah teknik manipulasi psikologis agar korban tidak sempat berpikir jernih.",
      },
      {
        id: "e3",
        label: "Penyebutan nama bank dan format waktu transaksi",
        isRedFlag: false,
        explanation: "Penyebutan nama bank adalah taktik penyamaran umum; format tanggal tidak membuktikan keaslian pesan.",
      },
    ],
    choices: [
      {
        id: "c1",
        label: "Balas pesan WA tersebut untuk minta rincian transaksi dan nomor rekening tujuan",
        score: 10,
        feedback: "Berisiko tinggi! Membalas nomor penipu memastikan nomormu aktif dan membuka peluang serangan rekayasa sosial lebih lanjut.",
        isCorrect: false,
      },
      {
        id: "c2",
        label: "Abaikan pesan, blokir nomor, dan hubungi call center resmi bank dari nomor di balik kartu debit fisik",
        score: 50,
        feedback: "Pilihan Sempurna! Selalu gunakan kanal resmi mandiri yang kamu inisiasi sendiri, jangan pernah membalas kontak yang datang mendadak.",
        isCorrect: true,
      },
    ],
    flagCode: "TRUST{K1_VERIFIED_CLEAN}",
    learningPoint: "Kanal verifikasi bank resmi selalu diinisiasi dari nomor resmi terdaftar (Halo BCA 1500888 atau akun WhatsApp centang hijau terverifikasi Meta).",
  },
  {
    id: "k2",
    title: "Undangan APK & Modus Foto Paket",
    category: "Skenario 2 · Menengah",
    levelLabel: "Level Waspada",
    levelBadge: "bg-amber-50 text-amber-800 border-amber-300",
    dotColor: "bg-amber-500",
    duration: "4 Mnt",
    stepsCount: 5,
    description: "Pengirim mengaku kurir ekspedisi mengirim file berformat .apk yang disamarkan sebagai foto dokumen resi.",
    senderName: "Kurir J&T Express Express",
    senderAddress: "+62 877-4409-1234",
    messageText: "Selamat siang kak, paket Anda tertahan di gudang sortir karena alamat tidak terbaca jelas. Mohon cek foto paket terlampir dan konfirmasi posisi rumah sekarang.",
    attachmentName: "Lihat_Foto_Paket.apk",
    attachmentSize: "7.2 MB",
    briefing: [
      "Sebuah pesan masuk dari pengirim yang mengaku kurir ekspedisi terkenal.",
      "File terlampir tampak seperti berkas gambar dengan nama 'Lihat_Foto_Paket.apk'.",
      "Misi: Deteksi manipulasi ekstensi berkas Android berbahaya dan ambil langkah mitigasi.",
    ],
    evidences: [
      {
        id: "e1",
        label: "Ekstensi berkas berakhiran '.apk', bukan format gambar seperti .jpg atau .png",
        isRedFlag: true,
        explanation: "Berkas .apk adalah aplikasi installer Android, bukan gambar atau dokumen resi.",
      },
      {
        id: "e2",
        label: "Ukuran berkas 7.2 MB untuk sekadar foto resi",
        isRedFlag: true,
        explanation: "Aplikasi malware pencuri SMS OTP umumnya berukuran 5 - 15 MB dan dibungkus paket installer.",
      },
      {
        id: "e3",
        label: "Kurir meminta konfirmasi alamat penerima",
        isRedFlag: false,
        explanation: "Kurir memang sering konfirmasi alamat, tapi kurir resmi tidak pernah mengirimkan berkas installer aplikasi untuk konfirmasi.",
      },
    ],
    choices: [
      {
        id: "c1",
        label: "Unduh dan pasang berkas .apk karena khawatir paket penting tertahan di gudang",
        score: 0,
        feedback: "Bahaya Kritis! Berkas ini memasang malware perayap SMS (Sniffer) yang akan membaca SMS OTP bank dan saldo dompet digitalmu seketika.",
        isCorrect: false,
      },
      {
        id: "c2",
        label: "Tolak unduh berkas, laporkan kontak spam, lalu cek nomor resi paket hanya di aplikasi atau situs web resmi ekspedisi",
        score: 50,
        feedback: "Langkah Sempurna! Lacak paket hanya lewat aplikasi resmi atau situs resmi ekspedisi tanpa memasang aplikasi eksternal dari chat.",
        isCorrect: true,
      },
    ],
    flagCode: "TRUST{APK_SNIFFER_CONTAINED}",
    learningPoint: "Jangan pernah menginstal file .apk dari chat WhatsApp, Telegram, atau email. Foto dokumen asli selalu berekstensi .jpg, .png, atau .pdf.",
  },
  {
    id: "k3",
    title: "Loker WFH & Deposit Rekening",
    category: "Skenario 3 · Kritis",
    levelLabel: "Risiko Kritis",
    levelBadge: "bg-rose-50 text-rose-800 border-rose-300",
    dotColor: "bg-rose-500",
    duration: "3 Mnt",
    stepsCount: 4,
    description: "Tawaran kerja paruh waktu dengan komisi instan yang kemudian meminta setoran dana deposit ke rekening pribadi.",
    senderName: "HR Global Media Partner",
    senderAddress: "Telegram: @hr_recruitment_id",
    messageText: "Selamat! Anda terpilih menjadi mitra reviewer video online. Tugas mudah hanya like 3 video YouTube dibayar Rp 30.000. Setelah tugas pertama berhasil dibayar, silakan ambil 'Misi VIP Deposit Rp 250.000' untuk menarik reward Rp 450.000 dalam 30 menit ke rekening pribadi Bendahara.",
    briefing: [
      "Kamu diundang ke channel kerja freelance tanpa proses seleksi formal.",
      "Tugas pertama membayar uang kecil untuk membangun kepercayaan semu korban (pancingan/Pig Butchering).",
      "Misi: Identifikasi skema manipulasi deposit berbayar dan putus interaksi sebelum terjadi kerugian.",
    ],
    evidences: [
      {
        id: "e1",
        label: "Pemberian komisi kecil awal sebagai taktik 'umpan pancingan' kepercayaan korban",
        isRedFlag: true,
        explanation: "Penipu rela membayar Rp 15.000 - Rp 50.000 di awal agar korban yakin sistem mereka 'terbukti membayar'.",
      },
      {
        id: "e2",
        label: "Syarat mentransfer uang deposit ke rekening perorangan pribadi untuk melanjutkan pekerjaan",
        isRedFlag: true,
        explanation: "Pekerjaan legal tidak pernah menuntut pencari kerja mentransfer uang deposit atau modal tugas.",
      },
      {
        id: "e3",
        label: "Platform komunikasi anonim lewat grup Telegram tanpa alamat kantor jelas",
        isRedFlag: true,
        explanation: "Penipu memanfaatkan anonimitas Telegram dan rekening perantara bodong (nominee account).",
      },
    ],
    choices: [
      {
        id: "c1",
        label: "Transfer deposit Rp 250.000 karena sudah terbukti menerima komisi di tugas sebelumnya",
        score: 0,
        feedback: "Terjebak penipuan! Begitu dana ditransfer, pelaku akan meminta deposit tambahan lebih besar dengan alasan akun terkunci atau tugas belum lengkap.",
        isCorrect: false,
      },
      {
        id: "c2",
        label: "Segera tinggalkan grup, jangan transfer dana sepeser pun, lalu laporkan nomor rekening pelaku ke CekRekening.id",
        score: 50,
        feedback: "Keputusan Tepat! Menghentikan interaksi segera mencegah kerugian finansial berantai yang sering kali mencapai jutaan rupiah.",
        isCorrect: true,
      },
    ],
    flagCode: "TRUST{DEPOSIT_SCAM_BLOCKED}",
    learningPoint: "Rumus baku digital: Lowongan kerja legal tidak pernah meminta deposit uang sepeser pun dari calon pekerjanya.",
  },
];

// -----------------------------------------------------------------------------
// 2. DATA MODUL PEMBELAJARAN (NON-SIMULATOR)
// -----------------------------------------------------------------------------
interface LearningModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  icon: typeof FileCode;
  summary: string;
  threatDetails: string[];
  checklistItems: string[];
}

const LEARNING_MODULES: LearningModule[] = [
  {
    id: "m1",
    title: "Rekayasa Sosial: Seni Menipu Pikiran Manusia",
    category: "Psikologi Keamanan",
    duration: "4 Mnt Baca",
    icon: Users,
    summary: "Penipu modern jarang meretas sistem komputasi rumit; mereka lebih memilih memanipulasi kelemahan emosi manusia seperti panik, ketakutan, keserakahan, dan rasa iba.",
    threatDetails: [
      "Urgensi Waktu Semu: Pelaku selalu memberi tenggat waktu sangat sempit (misal 5-15 menit) agar korban bertindak dengan otak reptil tanpa verifikasi logis.",
      "Otoritas Tiruan: Meniru seragam, kop surat, atau logo resmi lembaga penegak hukum, bank, atau marketplace untuk mengintimidasi korban.",
      "Hadiah & Kelimpahan Tak Masuk Akal: Iming-iming hadiah undian gratis, voucher ratusan ribu, atau gaji kerja lepas fantastis.",
    ],
    checklistItems: [
      "Tarik napas dan jeda minimal 5 menit saat menerima pesan yang mendesak tindakan mendadak.",
      "Verifikasi identitas pihak pengirim melalui kanal kontak independen yang kamu cari sendiri.",
      "Jangan pernah membagikan kode OTP, password, atau PIN dengan alasan apapun kepada siapapun.",
      "Sepakati sandi darurat keluarga untuk memverifikasi permintaan bantuan dana dari orang terdekat.",
    ],
  },
  {
    id: "m2",
    title: "Anatomi Berkas Android & Izin Mematikan",
    category: "Teknis Berkas",
    duration: "5 Mnt Baca",
    icon: FileCode,
    summary: "Pembedahan mendalam bagaimana malware berformat .apk disamarkan menjadi dokumen foto atau undangan pernikahan, serta izin apa saja yang wajib ditolak.",
    threatDetails: [
      "Penyamaran Ekstensi: Berkas berbahaya sering dinamai 'Undangan.apk' atau 'Surat_Tilang.apk' dengan mengganti ikon bawaan menjadi ikon PDF atau galeri.",
      "Izin READ_SMS & RECEIVE_SMS: Begitu izin ini diberikan, aplikasi dapat menyadap seluruh SMS verifikasi OTP perbankan langsung ke server penipu.",
      "Izin BIND_ACCESSIBILITY_SERVICE: Layanan aksesibilitas memungkinkan malware membaca layar korban secara otomatis dan mengklik tombol perbankan tanpa kendali pengguna.",
    ],
    checklistItems: [
      "Periksa akhiran nama berkas secara teliti (pastikan tidak berakhiran .apk jika dimaksudkan berkas dokumen).",
      "Kunci opsi 'Install Unknown Apps' (Pasang dari Sumber Tidak Dikenal) di pengaturan keamanan Android.",
      "Tolak permintaan izin akses SMS dan Layanan Aksesibilitas dari aplikasi di luar toko resmi.",
      "Bila tidak sengaja terpasang, aktifkan Mode Pesawat (Airplane Mode) seketika dan cabut kartu SIM.",
    ],
  },
  {
    id: "m3",
    title: "Verifikasi Kontak & Rekening Bank Resmi",
    category: "Pencegahan Finansial",
    duration: "3 Mnt Baca",
    icon: ShieldCheck,
    summary: "Panduan praktis membedakan rekening perusahaan resmi dari rekening penampung penipu, serta verifikasi tanda centang WhatsApp yang asli.",
    threatDetails: [
      "Centang Hijau Palsu: Penipu memasang emotikon centang hijau (✅) pada nama profil akun personal untuk menipu pengguna awam.",
      "Rekening Nominee: Penipu menggunakan rekening bank atas nama individu yang dibeli dari warga untuk menampung uang kejahatan.",
      "Virtual Account Resmi vs Pribadi: Perusahaan legal menggunakan nomor Virtual Account khusus dengan nama korporasi resmi, bukan rekening perseorangan.",
    ],
    checklistItems: [
      "Cek rekam jejak nomor rekening tujuan di portal resmi Kominfo: https://cekrekening.id.",
      "Periksa reputasi nomor kontak di aplikasi pelacak nomor publik sebelum bertransaksi.",
      "Pastikan centang hijau WhatsApp berada di samping nama kontak resmi (Official Account), bukan di teks nama profil.",
      "Hubungi call center resmi bank untuk mengonfirmasi keabsahan nomor rekening tujuan transfer.",
    ],
  },
  {
    id: "m4",
    title: "Proteksi SIM Swap & Keamanan 2FA Kuat",
    category: "Identitas Digital",
    duration: "4 Mnt Baca",
    icon: Smartphone,
    summary: "Mengapa verifikasi SMS OTP tidak lagi cukup aman dan bagaimana mengamankan akun digital dengan aplikasi autentikator berbasis waktu (TOTP).",
    threatDetails: [
      "Modus SIM Swap: Pelaku mendatangi gerai operator dengan identitas palsu untuk mengkloning kartu SIM korban sehingga SMS OTP masuk ke ponsel pelaku.",
      "Kelemahan SMS: Pesan SMS tidak terenkripsi ujung-ke-ujung (end-to-end) dan rentan disadap melalui malware Android atau celah jaringan operator.",
      "Serangan Intersepsi: Penyerang memanfaatkan OTP yang bocor untuk mereset kata sandi akun email utama dan akun mobile banking.",
    ],
    checklistItems: [
      "Beralih dari SMS OTP ke aplikasi autentikator (seperti Google Authenticator atau Microsoft Authenticator).",
      "Pasang PIN keamanan kartu SIM (SIM Lock PIN) di pengaturan kartu seluler ponselmu.",
      "Aktifkan kunci biometrik (sidik jari / wajah) untuk membuka aplikasi perbankan dan dompet digital.",
      "Segera lapor ke gerai operator seluler jika sinyal ponsel tiba-tiba hilang total tanpa sebab yang jelas.",
    ],
  },
];

// -----------------------------------------------------------------------------
// 3. DATA KILAT 2 MENIT (MICRO-LEARNING REFLEKS DRILL)
// -----------------------------------------------------------------------------
interface TriageDrillItem {
  id: string;
  source: string;
  text: string;
  isScam: boolean;
  explanation: string;
}

const TRIAGE_DRILL_ITEMS: TriageDrillItem[] = [
  {
    id: "t1",
    source: "SMS dari +62 821-9988-1234",
    text: "Pemberitahuan: Akun Bank Mandiri Anda diblokir sementara. Klik http://mandiri-verifikasi.xyz/unblock untuk verifikasi ulang PIN Anda.",
    isScam: true,
    explanation: "Curiga! Domain mandiri-verifikasi.xyz bukan situs resmi Bank Mandiri (bankmandiri.co.id). Bank tidak pernah meminta PIN lewat web.",
  },
  {
    id: "t2",
    source: "SMS dari 'GOJEK'",
    text: "Kode verifikasi (OTP) login akun Gojek Anda adalah: 8492. JANGAN BERIKAN KODE INI KEPADA SIAPAPUN, termasuk pihak Gojek.",
    isScam: false,
    explanation: "Pesan Biasa. Ini adalah pesan OTP resmi dengan peringatan tegas untuk tidak membagikan kode kepada siapapun.",
  },
  {
    id: "t3",
    source: "WhatsApp dari Kontak Tak Dikenal",
    text: "Halo kak, kami dari Shopee. Selamat kamu memenangkan giveaway iPhone 15 Pro Max! Mohon transfer biaya asuransi Rp 150.000 ke rek BNI 0829182392 a.n. Slamet.",
    isScam: true,
    explanation: "Curiga! Shopee tidak pernah memungut biaya asuransi atau pajak undian ke rekening pribadi perorangan.",
  },
  {
    id: "t4",
    source: "WhatsApp dari Nomor Kurir",
    text: "Selamat siang kak, ini foto resi paket dokumen yang kami antar: Cek_Paket_JNE.apk. Mohon diinstall untuk cek detail paket.",
    isScam: true,
    explanation: "Curiga! File berekstensi .apk yang dikirim via chat adalah malware Sniffer pencuri SMS OTP.",
  },
  {
    id: "t5",
    source: "Email dari 'no-reply@accounts.google.com'",
    text: "Peringatan Keamanan: Ada perangkat Windows baru yang login ke Akun Google Anda. Jika ini bukan Anda, tinjau aktivitas perangkat Anda di https://myaccount.google.com.",
    isScam: false,
    explanation: "Pesan Biasa. Tautan mengarah langsung ke domain resmi Google (google.com) untuk audit keamanan mandiri.",
  },
  {
    id: "t6",
    source: "Telegram dari '@crypto_invest_vip'",
    text: "Peluang passive income modal Rp 100.000 jadi Rp 2.000.000 dalam 24 jam! Dijamin profit 100% tanpa risiko oleh OJK.",
    isScam: true,
    explanation: "Curiga! Klaim profit pasti tanpa risiko adalah ciri khas investasi bodong skema ponzi. OJK tidak pernah menjamin investasi crypto.",
  },
  {
    id: "t7",
    source: "SMS dari 'TELKOMSEL'",
    text: "Paket Internet 15GB Anda akan habis dalam 2 hari. Perpanjang kuota melalui aplikasi MyTelkomsel atau hubungi *363#.",
    isScam: false,
    explanation: "Pesan Biasa. Notifikasi resmi masa aktif paket tanpa tautan mencurigakan, mengarahkan ke USSD resmi *363#.",
  },
  {
    id: "t8",
    source: "WhatsApp dari +62 895-3412-9812",
    text: "Mamah minta tolong belikan pulsa Rp 100.000 ke nomor ini ya nak, nomor mamah yang lama sedang gangguan dan perlu hubungi teman arisan.",
    isScam: true,
    explanation: "Curiga! Modus klasik 'Mamah Minta Pulsa' memanfaatkan rasa bakti anak. Selalu hubungi nomor lama langsung atau verifikasi dengan sandi keluarga.",
  },
];

// -----------------------------------------------------------------------------
// 4. DATA KAMUS JEBAKAN DIGITAL (10 ISTILAH LENGKAP)
// -----------------------------------------------------------------------------
interface GlossaryTerm {
  id: string;
  name: string;
  category: "Malware Android" | "Manipulasi Sosial" | "Identitas" | "Penipuan Web";
  tagColor: string;
  meaning: string;
  howItWorks: string;
  entryPoint: string;
  firstResponse: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "sniffing-apk",
    name: "Sniffing APK",
    category: "Malware Android",
    tagColor: "bg-rose-50 text-rose-800 border-rose-300",
    meaning: "Aplikasi Android berbahaya (.apk) yang dirancang untuk menyadap SMS masuk dan mencuri kode OTP perbankan korban.",
    howItWorks: "Malware meminta izin READ_SMS dan RECEIVE_SMS saat dipasang. Setelah aktif, setiap SMS perbankan yang masuk diteruskan ke server penipu tanpa disadari korban.",
    entryPoint: "File WhatsApp berkedok undangan pernikahan (.apk), foto resi paket kurir, surat tilang kepolisian, atau surat pemilu.",
    firstResponse: "Nyalakan Mode Pesawat (Airplane Mode) segera, copot kartu SIM, hapus aplikasi berbahaya lewat Pengaturan Aplikasi, lalu hubungi bank untuk memblokir akun m-Banking.",
  },
  {
    id: "social-engineering",
    name: "Social Engineering",
    category: "Manipulasi Sosial",
    tagColor: "bg-amber-50 text-amber-800 border-amber-300",
    meaning: "Seni memanipulasi psikologis manusia agar secara sukarela membocorkan informasi rahasia atau mentransfer sejumlah dana.",
    howItWorks: "Penyerang memanfaatkan kelemahan psikologis mendasar seperti rasa takut (ancaman rekening diblokir), panik, otoritas semu, atau harapan keuntungan instan.",
    entryPoint: "Panggilan telepon mengaku staf bank, pesan chat darurat teman yang meminjam uang, atau tawaran loker palsu bergaji fantastis.",
    firstResponse: "Ambil jeda minimal 5 menit sebelum bertindak. Jangan membuat keputusan finansial saat sedang panik atau terburu-buru. Verifikasi lewat kanal resmi independen.",
  },
  {
    id: "sim-swap",
    name: "SIM Swap Fraud",
    category: "Identitas",
    tagColor: "bg-rose-50 text-rose-800 border-rose-300",
    meaning: "Pengambilalihan nomor telepon seluler korban dengan mengajukan pergantian kartu SIM fisik baru ke gerai operator telekomunikasi.",
    howItWorks: "Pelaku menggunakan data KTP dan identitas palsu korban untuk mengklaim kartu SIM hilang di gerai seluler. Begitu SIM baru aktif, seluruh SMS OTP dialihkan ke ponsel pelaku.",
    entryPoint: "Kebocoran data pribadi (data breach) di internet yang memuat nomor NIK, nama ibu kandung, dan nomor ponsel korban.",
    firstResponse: "Jika sinyal seluler tiba-tiba 'No Service' di lokasi yang biasanya berjangkauan normal, segera hubungi call center operator seluler dan kunci seluruh m-Bankingmu.",
  },
  {
    id: "phishing",
    name: "Phishing Website",
    category: "Penipuan Web",
    tagColor: "bg-amber-50 text-amber-800 border-amber-300",
    meaning: "Situs web tiruan yang dibuat sangat mirip dengan portal perbankan, media sosial, atau marketplace asli untuk mencuri data kredensial login.",
    howItWorks: "Korban diarahkan ke halaman login palsu dengan tampilan identik. Kredensial (email, password, PIN) yang diketikkan korban akan langsung terekam di basis data penipu.",
    entryPoint: "Tautan pendek (bit.ly, tinyurl) yang disebarkan lewat email tagihan palsu, SMS promo diskon, atau pesan WhatsApp blast.",
    firstResponse: "Jangan pernah memasukkan kata sandi jika domain web berbeda dari alamat resmi. Segera ganti kata sandi akun utamamu bila terlanjur menginput kredensial.",
  },
  {
    id: "quishing",
    name: "Quishing (QR Phishing)",
    category: "Penipuan Web",
    tagColor: "bg-purple-50 text-purple-800 border-purple-300",
    meaning: "Penipuan menggunakan kode QR manipulatif yang menempel pada stiker QRIS pedagang atau tertera pada surat dokumen palsu.",
    howItWorks: "Penipu menempelkan stiker kode QR miliknya di atas QRIS resmi merchant di tempat umum, atau mengirimkan gambar QR berkedok konfirmasi pembayaran.",
    entryPoint: "Stiker QRIS di tempat ibadah, kafe, atau kiriman gambar kode QR lewat pesan instan WhatsApp.",
    firstResponse: "Periksa nama penerima yang muncul di layar konfirmasi aplikasi pembayaran sebelum memasukkan PIN. Pastikan nama merchant sesuai dengan nama toko fisik.",
  },
  {
    id: "smishing",
    name: "Smishing (SMS Phishing)",
    category: "Penipuan Web",
    tagColor: "bg-blue-50 text-blue-800 border-blue-300",
    meaning: "Serangan phishing yang diluncurkan menggunakan pesan singkat SMS dengan memalsukan ID pengirim (Sender ID spoofing).",
    howItWorks: "Pesan SMS mengabarkan promo poin hangus, tagihan kartu kredit darurat, atau tautan penarikan dana tunai yang mengarahkan korban ke web jebakan.",
    entryPoint: "SMS broadcast dengan nama pengirim yang dimanipulasi menyerupai nama instansi pemerintah atau perbankan.",
    firstResponse: "Abaikan tautan yang ada di SMS. Buka aplikasi resmi atau ketik manual alamat web resmi lembaga yang bersangkutan di perambanmu.",
  },
  {
    id: "typosquatting",
    name: "Typosquatting",
    category: "Penipuan Web",
    tagColor: "bg-indigo-50 text-indigo-800 border-indigo-300",
    meaning: "Pendaftaran nama domain web yang sangat mirip atau merupakan kesalahan ketik umum dari nama domain situs populer.",
    howItWorks: "Penipu mendaftarkan nama seperti 'g00gle.com' atau 'bca-klik.com' dan mengisinya dengan formulir login pencuri kredensial nasabah.",
    entryPoint: "Pencarian di mesin pencari atau link tautan yang dikirimkan melalui forum obrolan.",
    firstResponse: "Simpan alamat situs perbankan resmi di menu bookmark browser favoritmu untuk menghindari salah ketik alamat web.",
  },
  {
    id: "account-takeover",
    name: "Account Takeover (ATO)",
    category: "Identitas",
    tagColor: "bg-rose-50 text-rose-800 border-rose-300",
    meaning: "Kondisi ketika penyerang berhasil menguasai penuh akun digital korban dan mengubah kata sandi, email pemulihan, serta nomor verifikasi.",
    howItWorks: "Setelah mendapatkan kredensial dan kode OTP korban, pelaku masuk ke menu pengaturan akun dan mengganti nomor telepon serta email agar korban tidak bisa masuk kembali.",
    entryPoint: "Kombinasi kebocoran password (credential stuffing), phishing, atau penyadapan malware di ponsel.",
    firstResponse: "Gunakan fitur 'Keluarkan dari Semua Perangkat' (Logout all sessions), hubungi pusat bantuan aplikasi untuk verifikasi identitas fisik, dan bekukan akun perbankan tertaut.",
  },
  {
    id: "ransomware",
    name: "Ransomware",
    category: "Malware Android",
    tagColor: "bg-rose-50 text-rose-800 border-rose-300",
    meaning: "Perangkat lunak berbahaya yang mengenkripsi berkas dokumen penting korban sehingga tidak dapat dibuka, lalu menuntut tebusan uang.",
    howItWorks: "Program jahat mengunci file foto, video, dan dokumen menggunakan algoritma kriptografi kuat dan menampilkan layar tebusan pemerasan.",
    entryPoint: "Unduhan aplikasi modifikasi (mod apk) dari situs tidak resmi atau lampiran email dari pengirim tak dikenal.",
    firstResponse: "Putuskan koneksi internet seketika. Jangan membayar tebusan karena tidak ada jaminan berkas akan dipulihkan. Pulihkan data dari cadangan offline yang aman.",
  },
  {
    id: "loker-deposit",
    name: "Deposit Loker Palsu (Pig Butchering)",
    category: "Manipulasi Sosial",
    tagColor: "bg-amber-50 text-amber-800 border-amber-300",
    meaning: "Skema penipuan lowongan kerja online dengan imbalan komisi instan yang mensyaratkan transfer deposit uang bertahap.",
    howItWorks: "Korban diberikan tugas sederhana (like produk, follow akun) dan dibayar uang receh. Kemudian korban dibujuk memasukkan modal besar untuk 'misi VIP' yang akhirnya dibawa kabur pelaku.",
    entryPoint: "Pesan WhatsApp atau Telegram tawaran kerja lepas paruh waktu fleksibel dari rumah.",
    firstResponse: "Hentikan transaksi dan komunikasi seketika. Laporkan nomor rekening pelaku ke CekRekening.id dan simpan tangkapan layar bukti percakapan untuk laporan kepolisian.",
  },
];

// =============================================================================
// KOMPONEN UTAMA: HALAMAN BELAJAR
// =============================================================================
export default function Belajar() {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>("simulator");
  const [toastNotif, setToastNotif] = useState<AppNotification | null>(null);

  // Pantau notifikasi baru secara real-time dan tampilkan toast
  useEffect(() => {
    const handleNotifUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<AppNotification>;
      if (customEvent.detail) {
        setToastNotif(customEvent.detail);
        const timer = setTimeout(() => {
          setToastNotif((current) => (current?.id === customEvent.detail.id ? null : current));
        }, 5000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener(NOTIFICATION_EVENT, handleNotifUpdate as EventListener);
    return () => {
      window.removeEventListener(NOTIFICATION_EVENT, handleNotifUpdate as EventListener);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sinkronisasi bila ada query param ?tab=... (misal dari redirect atau search bar)
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["simulator", "modul", "kilat", "kamus"].includes(tabParam)) {
      setActiveSection(tabParam);
      setTimeout(() => {
        const element = document.getElementById(tabParam);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchParams]);

  // Observer untuk menandai tombol aktif saat halaman di-scroll
  useEffect(() => {
    const sectionIds = ["simulator", "modul", "kilat", "kamus"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* HEADER UTAMA HALAMAN BELAJAR (BERSIH TANPA TOMBOL PINTASAN ASING)    */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#DDE6ED] px-3 py-0.5 text-[11px] font-bold text-[#27374D] border border-[#9DB2BF]/60">
            <BookOpen className="h-3 w-3 text-[#526D82]" />
            <span>Pusat Literasi & Pelatihan JagaRuang</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#27374D] tracking-tight">
            Belajar Interaktif
          </h1>
          <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
            Kuasai insting perlindungan digitalmu melalui simulasi kasus nyata, modul pembelajaran terstruktur,
            tantangan refleks kilat 120 detik, dan kamus jebakan digital. Seluruh bagian tersaji langsung dalam satu alur belajar di bawah ini.
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* NAVIGASI PINDAH CEPAT (STICKY QUICK-SCROLL BAR)                       */}
      {/* ===================================================================== */}
      <div className="sticky top-16 z-20 -mx-1 px-1 py-1 bg-[#DDE6ED]/90 backdrop-blur-md">
        <nav
          aria-label="Pintas Navigasi Bagian Belajar"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-white border border-[#9DB2BF]/40 shadow-xs"
        >
          {/* Tombol Scroll 1: Simulator */}
          <button
            type="button"
            onClick={() => scrollToSection("simulator")}
            className={`flex items-center gap-2 shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeSection === "simulator"
                ? "bg-[#27374D] text-white shadow-sm border border-[#27374D]"
                : "text-[#526D82] hover:bg-[#DDE6ED]/60 hover:text-[#27374D]"
              }`}
          >
            <Compass className={`h-4 w-4 ${activeSection === "simulator" ? "text-amber-400" : "text-[#526D82]"}`} />
            <span>1. Simulator</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${activeSection === "simulator" ? "bg-white/20 text-white" : "bg-[#DDE6ED] text-[#27374D]"
                }`}
            >
              3 Kasus
            </span>
          </button>

          {/* Tombol Scroll 2: Modul */}
          <button
            type="button"
            onClick={() => scrollToSection("modul")}
            className={`flex items-center gap-2 shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeSection === "modul"
                ? "bg-[#27374D] text-white shadow-sm border border-[#27374D]"
                : "text-[#526D82] hover:bg-[#DDE6ED]/60 hover:text-[#27374D]"
              }`}
          >
            <BookOpen className={`h-4 w-4 ${activeSection === "modul" ? "text-sky-300" : "text-[#526D82]"}`} />
            <span>2. Modul</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${activeSection === "modul" ? "bg-white/20 text-white" : "bg-[#DDE6ED] text-[#27374D]"
                }`}
            >
              4 Panduan
            </span>
          </button>

          {/* Tombol Scroll 3: Kilat 2 Menit */}
          <button
            type="button"
            onClick={() => scrollToSection("kilat")}
            className={`flex items-center gap-2 shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeSection === "kilat"
                ? "bg-[#27374D] text-white shadow-sm border border-[#27374D]"
                : "text-[#526D82] hover:bg-[#DDE6ED]/60 hover:text-[#27374D]"
              }`}
          >
            <Clock className={`h-4 w-4 ${activeSection === "kilat" ? "text-amber-400" : "text-[#526D82]"}`} />
            <span>3. Kilat 2 Menit</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${activeSection === "kilat" ? "bg-amber-400 text-[#27374D]" : "bg-amber-100 text-amber-900 border border-amber-300"
                }`}
            >
              120 Dtk
            </span>
          </button>

          {/* Tombol Scroll 4: Kamus */}
          <button
            type="button"
            onClick={() => scrollToSection("kamus")}
            className={`flex items-center gap-2 shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeSection === "kamus"
                ? "bg-[#27374D] text-white shadow-sm border border-[#27374D]"
                : "text-[#526D82] hover:bg-[#DDE6ED]/60 hover:text-[#27374D]"
              }`}
          >
            <Search className={`h-4 w-4 ${activeSection === "kamus" ? "text-emerald-300" : "text-[#526D82]"}`} />
            <span>4. Kamus</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${activeSection === "kamus" ? "bg-white/20 text-white" : "bg-[#DDE6ED] text-[#27374D]"
                }`}
            >
              10 Istilah
            </span>
          </button>
        </nav>
      </div>

      {/* ===================================================================== */}
      {/* SELURUH BAGIAN DITAMPILKAN LANGSUNG DALAM SATU ALUR SCROLL            */}
      {/* ===================================================================== */}
      <div className="space-y-12">
        {/* Bagian 1: Simulator */}
        <section id="simulator" className="scroll-mt-32 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#9DB2BF]/30 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#27374D] text-white">
              <Compass className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#27374D]">
                Bagian 1: Simulator Kasus Interaktif
              </h2>
              <p className="text-xs text-[#526D82]">
                Latih insting dan refleks keputusanmu dalam simulasi rekayasa sosial nyata secara aman.
              </p>
            </div>
          </div>
          <SimulatorTab />
        </section>

        {/* Bagian 2: Modul */}
        <section id="modul" className="scroll-mt-32 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#9DB2BF]/30 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#27374D] text-white">
              <BookOpen className="h-4 w-4 text-sky-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#27374D]">
                Bagian 2: Modul Pembelajaran Mandiri
              </h2>
              <p className="text-xs text-[#526D82]">
                Artikel mendalam, pembedahan anatomi ancaman, dan checklist verifikasi mandiri.
              </p>
            </div>
          </div>
          <ModulTab />
        </section>

        {/* Bagian 3: Kilat 2 Menit */}
        <section id="kilat" className="scroll-mt-32 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#9DB2BF]/30 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#27374D] text-white">
              <Clock className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#27374D]">
                Bagian 3: Tantangan Kilat 120 Detik
              </h2>
              <p className="text-xs text-[#526D82]">
                Asah refleks membedakan pesan biasa vs manipulasi dalam 120 detik!
              </p>
            </div>
          </div>
          <KilatTab />
        </section>

        {/* Bagian 4: Kamus */}
        <section id="kamus" className="scroll-mt-32 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#9DB2BF]/30 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#27374D] text-white">
              <Search className="h-4 w-4 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#27374D]">
                Bagian 4: Kamus Istilah Jebakan & Modus Digital
              </h2>
              <p className="text-xs text-[#526D82]">
                Pahami istilah ancaman, cara kerja modus, dan respons pertolongan pertama.
              </p>
            </div>
          </div>
          <KamusTab />
        </section>
      </div>

      {/* Footer Catatan Kepatuhan Desain */}
      <Disclaimer />

      {/* Floating Toast Notifikasi Otomatis Target Progress & Rekomendasi */}
      {toastNotif && (
        <aside
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-[#27374D] text-white shadow-2xl border border-[#9DB2BF]/40 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-amber-300 shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-white truncate">{toastNotif.title}</h4>
                <button
                  type="button"
                  onClick={() => setToastNotif(null)}
                  className="text-[#9DB2BF] hover:text-white transition-colors cursor-pointer"
                  title="Tutup Notifikasi"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[11px] text-[#DDE6ED] mt-1 leading-relaxed">
                {toastNotif.message}
              </p>
              {toastNotif.link && (
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={toastNotif.link}
                    onClick={() => setToastNotif(null)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 hover:text-amber-200 hover:underline"
                  >
                    <span>Buka Rekomendasi</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <span className="text-[10px] text-[#9DB2BF]">Baru saja</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 1: TAB SIMULATOR
// =============================================================================
function SimulatorTab() {
  const [activeCase, setActiveCase] = useState<ScenarioCase | null>(null);
  const [simStep, setSimStep] = useState<"briefing" | "investigasi" | "debrief">("briefing");
  const [selectedEvidences, setSelectedEvidences] = useState<string[]>([]);
  const [chosenOption, setChosenOption] = useState<ScenarioChoice | null>(null);
  const navigate = useNavigate();

  const handleStartCase = (sc: ScenarioCase) => {
    setActiveCase(sc);
    setSimStep("briefing");
    setSelectedEvidences([]);
    setChosenOption(null);
  };

  const handleCloseModal = () => {
    setActiveCase(null);
  };

  const toggleEvidence = (evId: string) => {
    setSelectedEvidences((prev) =>
      prev.includes(evId) ? prev.filter((id) => id !== evId) : [...prev, evId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Intro Ringkas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-2xl border border-[#9DB2BF]/40">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
            Daftar Skenario Latih Interaktif
          </h2>
          <p className="text-xs text-[#526D82]">
            Pilih skenario simulasi di bawah untuk menguji refleks keputusanmu saat menghadapi rekayasa sosial nyata.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-[#526D82]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Dasar
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Menengah
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Kritis
          </span>
        </div>
      </div>

      {/* Grid 3 Skenario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SCENARIOS.map((sc) => (
          <div
            key={sc.id}
            className="flex flex-col justify-between rounded-2xl border border-[#9DB2BF]/50 bg-white p-5 shadow-xs hover:border-[#526D82] transition-all"
          >
            <div className="space-y-3.5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#526D82]">{sc.category}</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${sc.levelBadge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
                  {sc.levelLabel}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#27374D] leading-snug">{sc.title}</h3>
                <p className="text-xs text-[#526D82] leading-relaxed line-clamp-3">
                  {sc.description}
                </p>
              </div>

              {/* Metadata Stats */}
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#526D82] pt-1 border-t border-[#DDE6ED]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#526D82]" />
                  {sc.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-[#526D82]" />
                  {sc.stepsCount} Langkah
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-5">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center gap-1.5 text-xs font-bold"
                onClick={() => handleStartCase(sc)}
              >
                <span>Mulai Simulasi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ===================================================================== */}
      {/* MODAL / OVERLAY SIMULATOR INTERAKTIF                                  */}
      {/* ===================================================================== */}
      {activeCase && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#27374D]/70 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl rounded-3xl border border-[#9DB2BF]/60 bg-white p-6 sm:p-7 shadow-2xl my-8">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-[#9DB2BF]/30 pb-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#526D82] uppercase tracking-wider">
                  {activeCase.category}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#27374D]">
                  {activeCase.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D] transition-colors cursor-pointer"
                aria-label="Tutup simulator"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center gap-2 py-4">
              <div
                className={`flex-1 h-2 rounded-full transition-all ${simStep === "briefing" || simStep === "investigasi" || simStep === "debrief"
                    ? "bg-[#526D82]"
                    : "bg-[#DDE6ED]"
                  }`}
              />
              <div
                className={`flex-1 h-2 rounded-full transition-all ${simStep === "investigasi" || simStep === "debrief"
                    ? "bg-[#526D82]"
                    : "bg-[#DDE6ED]"
                  }`}
              />
              <div
                className={`flex-1 h-2 rounded-full transition-all ${simStep === "debrief" ? "bg-[#526D82]" : "bg-[#DDE6ED]"
                  }`}
              />
            </div>

            {/* KONTEN STEP 1: BRIEFING */}
            {simStep === "briefing" && (
              <div className="space-y-5 pt-2">
                <div className="rounded-2xl bg-[#DDE6ED]/50 p-4 border border-[#9DB2BF]/40">
                  <h4 className="text-xs font-bold text-[#27374D] uppercase tracking-wider mb-2">
                    Kartu Briefing Kasus:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#27374D] leading-relaxed">
                    {activeCase.briefing.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#526D82] text-white text-[10px] font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#526D82]">Estimasi waktu: {activeCase.duration}</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSimStep("investigasi")}
                    className="gap-1.5 text-xs font-bold"
                  >
                    <span>Mulai Investigasi Pesan</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* KONTEN STEP 2: INVESTIGASI & KEPUTUSAN */}
            {simStep === "investigasi" && (
              <div className="space-y-5 pt-1">
                {/* Tampilan Pesan WhatsApp Tiruan */}
                <div className="rounded-2xl border border-[#9DB2BF]/60 bg-[#DDE6ED]/40 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#9DB2BF]/30 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-[#526D82] text-white flex items-center justify-center font-bold text-xs">
                        {activeCase.senderName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#27374D]">{activeCase.senderName}</div>
                        <div className="text-[10px] text-[#526D82]">{activeCase.senderAddress}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#526D82]">Chat Masuk</span>
                  </div>

                  <div className="rounded-xl bg-white p-3.5 text-xs text-[#27374D] border border-[#9DB2BF]/40 space-y-2 shadow-xs">
                    <p className="leading-relaxed">{activeCase.messageText}</p>
                    {activeCase.attachmentName && (
                      <div className="flex items-center gap-2.5 rounded-lg border border-rose-200 bg-rose-50/60 p-2 text-rose-900">
                        <FileCode className="h-5 w-5 text-rose-600 shrink-0" />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-[11px] font-bold truncate">{activeCase.attachmentName}</div>
                          <div className="text-[9px] text-rose-700">{activeCase.attachmentSize} · Berkas APK</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Investigasi Bukti (Ketuk Bukti) */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#27374D]">
                    Langkah 1: Ketuk tanda kejanggalan yang kamu temukan:
                  </div>
                  <div className="space-y-2">
                    {activeCase.evidences.map((ev) => {
                      const isSelected = selectedEvidences.includes(ev.id);
                      return (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => toggleEvidence(ev.id)}
                          className={`w-full text-left rounded-xl p-3 text-xs border transition-all cursor-pointer flex items-start gap-2.5 ${isSelected
                              ? "border-[#526D82] bg-[#DDE6ED]/60 text-[#27374D] font-medium"
                              : "border-[#9DB2BF]/50 bg-white text-[#526D82] hover:border-[#526D82]"
                            }`}
                        >
                          <div
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px] mt-0.5 ${isSelected
                                ? "border-[#526D82] bg-[#526D82] text-white"
                                : "border-[#9DB2BF]"
                              }`}
                          >
                            {isSelected && "✓"}
                          </div>
                          <span>{ev.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Langkah 2: Pilihan Keputusan */}
                <div className="space-y-2 pt-2 border-t border-[#9DB2BF]/30">
                  <div className="text-xs font-bold text-[#27374D]">
                    Langkah 2: Tentukan keputusan tindakanmu:
                  </div>
                  <div className="space-y-2">
                    {activeCase.choices.map((choice) => (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => {
                          setChosenOption(choice);
                          setSimStep("debrief");
                          addNotification({
                            title: `Target Skenario: ${activeCase.title}`,
                            message: choice.isCorrect
                              ? `Luar biasa! Kamu berhasil menghindari jebakan ${activeCase.category} dan mengambil keputusan tepat. Rekomendasi: Pelajari langkah mitigasinya di Panduan Lindungi atau lanjutkan ke Skenario berikutnya.`
                              : `Skenario selesai! Refleks keputusanmu masih berisiko terjebak. Rekomendasi: Buka artikel pembedahan anatomi malware pada bagian Modul Belajar.`,
                            type: choice.isCorrect ? "sukses" : "waspada",
                            link: choice.isCorrect ? "/belajar#simulator" : "/belajar#modul",
                          });
                        }}
                        className="w-full text-left rounded-xl border border-[#9DB2BF]/50 bg-white p-3 text-xs font-semibold text-[#27374D] hover:bg-[#DDE6ED]/50 hover:border-[#526D82] transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span>{choice.label}</span>
                        <ChevronRight className="h-4 w-4 text-[#526D82] group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KONTEN STEP 3: DEBRIEF & HASIL EVALUASI */}
            {simStep === "debrief" && chosenOption && (
              <div className="space-y-5 pt-1">
                {/* Banner Status Keputusan */}
                <div
                  className={`rounded-2xl p-4 border ${chosenOption.isCorrect
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-rose-50 border-rose-300 text-rose-900"
                    }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {chosenOption.isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <span>Refleks Tepat! Kamu Berhasil Menghindari Tipuan</span>
                      </>
                    ) : (
                      <>
                        <OctagonAlert className="h-5 w-5 text-rose-600" />
                        <span>Pilihan Berisiko! Tipuan Berhasil Menjebakmu</span>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed">{chosenOption.feedback}</p>
                </div>

                {/* Flag Code & Intisari Pembelajaran */}
                <div className="rounded-2xl bg-[#DDE6ED]/50 p-4 border border-[#9DB2BF]/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#9DB2BF]/30 pb-3">
                    <span className="text-xs font-bold text-[#27374D]">
                      Kode Pelindung (Trust Flag):
                    </span>
                    <span className="font-mono text-xs font-extrabold text-[#27374D] bg-white px-2.5 py-1 rounded-lg border border-[#9DB2BF]/60">
                      {activeCase.flagCode}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#526D82] uppercase tracking-wider">
                      Intisari Keamanan Utama:
                    </span>
                    <p className="text-xs text-[#27374D] leading-relaxed">
                      {activeCase.learningPoint}
                    </p>
                  </div>
                </div>

                {/* Tombol Aksi Akhir */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSimStep("investigasi");
                      setChosenOption(null);
                    }}
                    className="w-full sm:w-auto text-xs"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    Ulangi Kasus Ini
                  </Button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleCloseModal();
                        navigate("/lindungi");
                      }}
                      className="flex-1 sm:flex-none text-xs"
                    >
                      Buka Panduan Lindungi
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleCloseModal}
                      className="flex-1 sm:flex-none text-xs font-bold"
                    >
                      Selesai
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 2: TAB MODUL (NON-SIMULATOR)
// =============================================================================
function ModulTab() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("jagaruang_modul_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCheck = (modulId: string, itemIdx: number, modulTitle: string, totalItems: number) => {
    const checkKey = `${modulId}_chk_${itemIdx}`;
    setCheckedItems((prev) => {
      const willBeChecked = !prev[checkKey];
      const next = { ...prev, [checkKey]: willBeChecked };
      try {
        localStorage.setItem("jagaruang_modul_checks", JSON.stringify(next));
      } catch {
        // no-op
      }

      // Jika item baru saja dicentang, cek apakah seluruh checklist pada modul ini selesai
      if (willBeChecked) {
        let allCompleted = true;
        for (let i = 0; i < totalItems; i++) {
          if (!next[`${modulId}_chk_${i}`]) {
            allCompleted = false;
            break;
          }
        }
        if (allCompleted) {
          addNotification({
            title: `Modul Selesai: ${modulTitle}`,
            message: `Luar biasa! Kamu telah menuntaskan seluruh checklist pencegahan untuk '${modulTitle}'. Rekomendasi: Uji refleksmu di Tantangan Kilat 120 Detik atau buat Sandi Keluarga.`,
            type: "sukses",
            link: "/sandi",
          });
        }
      }

      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-[#9DB2BF]/40 space-y-1">
        <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
          Modul Edukasi & Checklist Mandiri
        </h2>
        <p className="text-xs text-[#526D82]">
          Kumpulan panduan teknis dan daftar periksa (checklist) mandiri untuk memperkuat ketahanan digital sehari-hari.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {LEARNING_MODULES.map((modul) => {
          const Icon = modul.icon;
          return (
            <div
              key={modul.id}
              className="rounded-2xl border border-[#9DB2BF]/50 bg-white p-5 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header Modul */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#526D82]">{modul.category}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#526D82] bg-[#DDE6ED]/60 px-2.5 py-0.5 rounded-full">
                    <Clock className="h-3 w-3" />
                    {modul.duration}
                  </span>
                </div>

                {/* Title & Summary */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#27374D] leading-snug">{modul.title}</h3>
                    <p className="text-xs text-[#526D82] mt-1 leading-relaxed">{modul.summary}</p>
                  </div>
                </div>

                {/* Pembedahan Ancaman */}
                <div className="rounded-xl bg-[#DDE6ED]/40 p-3.5 border border-[#9DB2BF]/40 space-y-1.5">
                  <span className="text-[11px] font-bold text-[#27374D] uppercase tracking-wider block">
                    Pembedahan Anatomi Serangan:
                  </span>
                  <ul className="space-y-1 text-xs text-[#526D82] leading-relaxed list-disc list-inside">
                    {modul.threatDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {/* Checklist Verifikasi */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-[#27374D] uppercase tracking-wider block">
                    Checklist Tindakan Mandiri:
                  </span>
                  <div className="space-y-1.5">
                    {modul.checklistItems.map((chk, idx) => {
                      const checkKey = `${modul.id}_chk_${idx}`;
                      const isChecked = !!checkedItems[checkKey];
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleCheck(modul.id, idx, modul.title, modul.checklistItems.length)}
                          className={`w-full text-left rounded-xl p-2.5 text-xs border transition-all cursor-pointer flex items-start gap-2.5 ${isChecked
                              ? "bg-emerald-50/70 border-emerald-300 text-emerald-900 line-through opacity-85"
                              : "bg-white border-[#9DB2BF]/50 text-[#27374D] hover:border-[#526D82]"
                            }`}
                        >
                          <div
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px] mt-0.5 ${isChecked
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "border-[#9DB2BF]"
                              }`}
                          >
                            {isChecked && "✓"}
                          </div>
                          <span className="flex-1 leading-relaxed">{chk}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 3: TAB KILAT 2 MENIT (MICRO-LEARNING DRILL)
// =============================================================================
function KilatTab() {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "biasa" | "curiga">>({});

  // Timer 120 Detik
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setIsFinished(false);
    setTimeLeft(120);
    setCurrentIndex(0);
    setAnswers({});
  };

  const handleAnswer = (choice: "biasa" | "curiga") => {
    const currentItem = TRIAGE_DRILL_ITEMS[currentIndex];
    const newAnswers = { ...answers, [currentItem.id]: choice };
    setAnswers(newAnswers);

    if (currentIndex + 1 < TRIAGE_DRILL_ITEMS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsRunning(false);
      setIsFinished(true);
    }
  };

  // Hitung Skor
  const scoreResult = useMemo(() => {
    let correct = 0;
    TRIAGE_DRILL_ITEMS.forEach((item) => {
      const userChoice = answers[item.id];
      if (userChoice) {
        const isUserCorrect =
          (userChoice === "curiga" && item.isScam) ||
          (userChoice === "biasa" && !item.isScam);
        if (isUserCorrect) correct++;
      }
    });
    return {
      correct,
      total: TRIAGE_DRILL_ITEMS.length,
      percentage: Math.round((correct / TRIAGE_DRILL_ITEMS.length) * 100),
    };
  }, [answers]);

  // Notifikasi hasil & rekomendasi ketika tantangan kilat selesai
  useEffect(() => {
    if (isFinished) {
      const correct = scoreResult.correct;
      const total = scoreResult.total;
      const pct = scoreResult.percentage;
      addNotification({
        title: `Hasil Tantangan Kilat: Skor ${correct}/${total} (${pct}%)`,
        message:
          pct >= 80
            ? `Refleks keamananmu sangat tanggap! Rekomendasi: Pertahankan kewaspadaan dan uji kasus di Bagian Simulator Kasus Interaktif.`
            : `Tantangan selesai! Masih ada beberapa pesan manipulasi yang lolos deteksi. Rekomendasi: Buka Kamus Jebakan atau pelajari Modul Edukasi.`,
        type: pct >= 80 ? "sukses" : "waspada",
        link: pct >= 80 ? "/belajar#simulator" : "/belajar#kamus",
      });
    }
  }, [isFinished]);

  const currentItem = TRIAGE_DRILL_ITEMS[currentIndex];

  return (
    <div className="space-y-6">
      {/* ===================================================================== */}
      {/* 1. TAMPILAN STANDBY (PERSIS SEPERTI GAMBAR USER CARD KILAT)            */}
      {/* ===================================================================== */}
      {!isRunning && !isFinished && (
        <div className="mx-auto max-w-xl text-center">
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-[#27374D] text-white p-8 sm:p-10 shadow-lg space-y-6">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#526D82]/50 border border-[#9DB2BF]/40 text-amber-300 shadow-md">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#9DB2BF]">
                Tantangan Kilat
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                120 Detik
              </h2>
              <p className="text-sm sm:text-base text-[#DDE6ED]/90 max-w-md mx-auto leading-relaxed">
                Asah refleks membedakan pesan biasa vs manipulasi!
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleStart}
                className="w-full sm:w-auto min-w-[200px] rounded-2xl bg-[#DDE6ED] px-8 py-3.5 text-sm font-black text-[#27374D] hover:bg-white active:scale-98 transition-all shadow-md cursor-pointer"
              >
                Mulai Sekarang
              </button>
            </div>

            <p className="text-[11px] text-[#9DB2BF]/80 pt-1">
              *Terdapat 8 sampel pesan uji. Pilih dengan cepat & tepat tanpa menggunakan kata "pasti".
            </p>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. TAMPILAN SAAT KILAT SEDANG BERJALAN                                 */}
      {/* ===================================================================== */}
      {isRunning && currentItem && (
        <div className="mx-auto max-w-2xl space-y-5">
          {/* Header Bar Timer & Progress */}
          <div className="flex items-center justify-between rounded-2xl bg-white border border-[#9DB2BF]/50 p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500 animate-pulse" />
              <span className="text-sm font-black text-[#27374D]">
                Sisa Waktu: {timeLeft} Detik
              </span>
            </div>
            <div className="text-xs font-bold text-[#526D82]">
              Pesan {currentIndex + 1} dari {TRIAGE_DRILL_ITEMS.length}
            </div>
          </div>

          {/* Progress Bar Visual */}
          <div className="h-2 w-full rounded-full bg-[#DDE6ED] overflow-hidden">
            <div
              className="h-full bg-[#526D82] transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / TRIAGE_DRILL_ITEMS.length) * 100}%`,
              }}
            />
          </div>

          {/* Kartu Pesan yang Harus Diuji */}
          <div className="rounded-3xl border border-[#9DB2BF]/60 bg-white p-6 sm:p-7 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDE6ED] pb-3">
              <span className="text-xs font-extrabold text-[#526D82] uppercase tracking-wider">
                Sumber / Pengirim:
              </span>
              <span className="text-xs font-bold text-[#27374D] bg-[#DDE6ED]/60 px-2.5 py-1 rounded-md">
                {currentItem.source}
              </span>
            </div>

            <div className="rounded-2xl bg-[#DDE6ED]/40 p-5 border border-[#9DB2BF]/40">
              <p className="text-sm sm:text-base font-medium text-[#27374D] leading-relaxed">
                "{currentItem.text}"
              </p>
            </div>

            {/* 2 Tombol Aksi: Pesan Biasa vs Curiga (BUKAN 'Aman') */}
            <div className="grid grid-cols-2 gap-4 pt-3">
              <button
                type="button"
                onClick={() => handleAnswer("biasa")}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#9DB2BF]/60 bg-[#DDE6ED]/40 p-4 font-bold text-[#27374D] hover:bg-white hover:border-[#526D82] active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                <span className="text-sm">Pesan Biasa</span>
                <span className="text-[10px] font-normal text-[#526D82]">Tidak ada tanda mencurigakan</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnswer("curiga")}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-rose-200 bg-rose-50/40 p-4 font-bold text-rose-900 hover:bg-rose-50 hover:border-rose-400 active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <OctagonAlert className="h-6 w-6 text-rose-600" />
                <span className="text-sm">Curiga</span>
                <span className="text-[10px] font-normal text-rose-700">Terdapat tanda manipulasi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. TAMPILAN EVALUASI & DEBRIEF SETELAH SELESAI                         */}
      {/* ===================================================================== */}
      {isFinished && (
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-3xl border border-[#9DB2BF]/60 bg-white p-6 sm:p-8 shadow-md text-center space-y-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60">
              <Award className="h-7 w-7 text-amber-500" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#27374D]">Hasil Uji Refleks Kilat</h3>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Skor Ketepatan Keputusan: {scoreResult.correct} dari {scoreResult.total} Tepat ({scoreResult.percentage}%)
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleStart}
                className="gap-2 text-xs font-bold"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Uji Ulang Tantangan</span>
              </Button>
            </div>
          </div>

          {/* Review Rinci Setiap Pesan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#27374D] uppercase tracking-wider">
              Ulasan Rinci Setiap Pesan:
            </h4>
            <div className="space-y-3">
              {TRIAGE_DRILL_ITEMS.map((item, idx) => {
                const userChoice = answers[item.id];
                const isCorrect =
                  (userChoice === "curiga" && item.isScam) ||
                  (userChoice === "biasa" && !item.isScam);

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-4 border text-xs space-y-2 ${isCorrect
                        ? "bg-emerald-50/60 border-emerald-300"
                        : "bg-rose-50/60 border-rose-300"
                      }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#27374D]">
                        #{idx + 1} · {item.source}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${isCorrect
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                          }`}
                      >
                        {isCorrect ? "✓ Keputusan Tepat" : "✕ Kurang Tepat"}
                      </span>
                    </div>

                    <p className="text-[#27374D] font-medium leading-relaxed">"{item.text}"</p>
                    <p className="text-[#526D82] leading-relaxed border-t border-[#9DB2BF]/30 pt-1.5">
                      <strong>Penjelasan Teknis:</strong> {item.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 4: TAB KAMUS JEBAKAN (10 ISTILAH LENGKAP DENGAN SEARCH)
// =============================================================================
function KamusTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search query sync
  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", "Malware Android", "Manipulasi Sosial", "Identitas", "Penipuan Web"];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchQuery =
        term.name.toLowerCase().includes(query.toLowerCase()) ||
        term.meaning.toLowerCase().includes(query.toLowerCase()) ||
        term.howItWorks.toLowerCase().includes(query.toLowerCase());
      const matchCategory =
        selectedCategory === "Semua" || term.category === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [query, selectedCategory]);

  const handleSearchChange = (val: string) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      if (val.trim()) {
        updated.set("q", val);
      } else {
        updated.delete("q");
      }
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Search Bar Bar */}
      <div className="rounded-2xl border border-[#9DB2BF]/40 bg-white p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
              Kamus Istilah Jebakan & Modus Digital
            </h2>
            <p className="text-xs text-[#526D82]">
              Pahami istilah ancaman, cara kerja serangan, dan langkah pertolongan pertama saat menghadapi situasi mencurigakan.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari istilah, cara kerja..."
              className="w-full rounded-full border border-[#9DB2BF]/70 bg-[#DDE6ED]/50 px-3.5 py-2 pl-9 pr-8 text-xs text-[#27374D] placeholder:text-[#526D82]/70 focus:border-[#526D82] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#526D82]/20 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#526D82]" />
            {query && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#526D82] hover:text-[#27374D]"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all shrink-0 cursor-pointer ${selectedCategory === cat
                  ? "bg-[#27374D] text-white"
                  : "bg-[#DDE6ED]/60 text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Kartu Istilah */}
      {filteredTerms.length === 0 ? (
        <div className="rounded-2xl border border-[#9DB2BF]/40 bg-white p-10 text-center space-y-2">
          <HelpCircle className="h-8 w-8 text-[#526D82] mx-auto" />
          <p className="text-sm font-bold text-[#27374D]">Istilah tidak ditemukan</p>
          <p className="text-xs text-[#526D82]">
            Coba kata kunci lain atau ubah kategori filter di atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="rounded-2xl border border-[#9DB2BF]/50 bg-white p-5 shadow-xs space-y-3.5 flex flex-col justify-between hover:border-[#526D82] transition-all"
            >
              <div className="space-y-3">
                {/* Title & Tag */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-[#27374D] leading-snug">{term.name}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border shrink-0 ${term.tagColor}`}
                  >
                    {term.category}
                  </span>
                </div>

                {/* Arti */}
                <p className="text-xs text-[#27374D] leading-relaxed">{term.meaning}</p>

                {/* Cara Kerja */}
                <div className="rounded-xl bg-[#DDE6ED]/40 p-3 text-xs space-y-1 border border-[#9DB2BF]/30">
                  <span className="font-bold text-[#27374D] block">Cara Kerja Modus:</span>
                  <p className="text-[#526D82] leading-relaxed">{term.howItWorks}</p>
                </div>

                {/* Titik Masuk & Respons Pertama */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-[#526D82]">
                    <strong className="text-[#27374D]">Titik Masuk:</strong> {term.entryPoint}
                  </div>
                  <div className="text-[#526D82]">
                    <strong className="text-[#27374D]">Respons Pertama:</strong> {term.firstResponse}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#DDE6ED] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/cek")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#526D82] hover:text-[#27374D] transition-colors cursor-pointer"
                >
                  <Search className="h-3 w-3" />
                  <span>Cek Pesan / File Terkait</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/lindungi")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#526D82] hover:text-[#27374D] transition-colors cursor-pointer"
                >
                  <ShieldAlert className="h-3 w-3" />
                  <span>Panduan Lindungi</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
