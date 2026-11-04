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
  ArrowLeft,
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
  Mail,
  PhoneCall,
  ListChecks,
  CheckSquare,
  BarChart3,
  CreditCard,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import { Card, Button, Disclaimer } from "../components/ui";
import {
  addNotification,
  NOTIFICATION_EVENT,
  type AppNotification,
} from "../lib/notificationService";

// =============================================================================
// TIPE & DATA STATIC UNTUK 4 PILAR BELAJAR
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
      "Misi: Temukan tanda kejanggalan pada pesan, lalu tentukan keputusan paling tepat dan aman.",
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
        feedback: "Pilihan berisiko tinggi! Membalas nomor penipu memastikan nomormu aktif dan membuka celah manipulasi lebih lanjut.",
        isCorrect: false,
      },
      {
        id: "c2",
        label: "Abaikan pesan, blokir nomor, dan hubungi call center resmi bank dari nomor di balik kartu debit fisik",
        score: 50,
        feedback: "Refleks Tepat! Selalu gunakan kanal resmi mandiri yang kamu inisiasi sendiri, jangan pernah membalas kontak yang datang mendadak.",
        isCorrect: true,
      },
    ],
    flagCode: "TRUST{K1_VERIFIED_CLEAN}",
    learningPoint: "Kanal verifikasi bank resmi selalu diinisiasi dari nomor resmi terdaftar (Halo BCA 1500888 atau akun WhatsApp centang hijau resmi Meta).",
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
    senderName: "Kurir J&T Express",
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
        feedback: "Langkah Tepat! Lacak paket hanya lewat aplikasi resmi atau situs resmi ekspedisi tanpa memasang aplikasi eksternal dari obrolan chat.",
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
// 2. DATA 12 MODUL PEMBELAJARAN (SESUAI GAMBAR DESAIN)
// -----------------------------------------------------------------------------
interface LearningModule {
  id: string;
  title: string;
  category: "Dasar Keamanan" | "Per Kanal" | "Checklist Praktis" | "Pola Kejadian Nyata" | "Setelah Kejadian";
  duration: string;
  icon: typeof HelpCircle;
  summary: string;
  concept: string;
  anatomy: string[];
  redFlags: string[];
  checklistItems: string[];
  takeaway: string;
}

const LEARNING_MODULES: LearningModule[] = [
  {
    id: "m1",
    title: "Apa Itu Rekayasa Sosial?",
    category: "Dasar Keamanan",
    duration: "4 menit baca",
    icon: HelpCircle,
    summary: "Kenapa orang bisa percaya pada pesan palsu — konsep dasarnya.",
    concept: "Rekayasa sosial (social engineering) adalah teknik manipulasi psikologis di mana pelaku tidak meretas sistem komputer atau kode enkripsi rumit, melainkan mengeksploitasi pikiran dan emosi manusia. Penipu memanfaatkan kecenderungan alami manusia: rasa percaya, kepatuhan terhadap figur otoritas, kepanikan, rasa bersalah, atau keinginan mendapatkan keuntungan instan.",
    anatomy: [
      "Pancingan Awal (Approach): Penipu menghubungi korban lewat kanal yang akrab (WhatsApp, SMS, telepon) menggunakan skenario darurat.",
      "Pembangunan Rasa Percaya (Trust Building): Menggunakan kop surat, seragam, atau data pribadi korban yang bocor agar tampak meyakinkan.",
      "Manipulasi Emosi (Emotional Trigger): Memicu kepanikan mendadak ('rekening akan diblokir') atau iming-iming hadiah besar.",
      "Eksploitasi Tindakan (Action): Korban diarahkan mengambil tindakan fatal: mengirimkan OTP, mentransfer uang, atau mengklik tautan/file.",
    ],
    redFlags: [
      "Adanya batas waktu sangat sempit yang memicu kepanikan (urgensi palsu).",
      "Permintaan data rahasia seperti PIN, kata sandi, kode OTP, atau foto KTP.",
      "Ketidakcocokan antara pengirim yang mengaku institusi resmi dengan nomor seluler pribadi biasa.",
    ],
    checklistItems: [
      "Tarik napas dan jeda minimal 5 menit sebelum membalas pesan yang bernada mendesak.",
      "Verifikasi kontak pengirim melalui kanal resmi yang dicari secara mandiri.",
      "Jangan pernah membagikan kode OTP atau PIN kepada siapapun dengan alasan apapun.",
      "Ingatkan keluarga terdekat untuk tidak mudah percaya pada kontak baru yang meminta dana.",
    ],
    takeaway: "Kunci pertahanan rekayasa sosial bukan teknologi canggih, melainkan jeda berpikir: verifikasi independen sebelum bertindak.",
  },
  {
    id: "m2",
    title: "Anatomi Sebuah Penipuan",
    category: "Dasar Keamanan",
    duration: "5 menit baca",
    icon: Share2,
    summary: "Tahapan umum modus: pendekatan, bangun percaya, eksploitasi.",
    concept: "Setiap tipuan digital mengikuti pola siklus yang konsisten. Memahami fase-fase ini membantu kamu menyadari jebakan sebelum mencapai tahap eksploitasi finansial atau pencurian data pribadi.",
    anatomy: [
      "Fase 1 - Pengintaian (Reconnaissance): Mengumpulkan data nomor kontak, nama, dan riwayat belanja dari kebocoran data internet.",
      "Fase 2 - Umpan Pertama (Baiting): Menyodorkan tawaran menarik atau ancaman yang memicu respons instingtif cepat.",
      "Fase 3 - Penanaman Sugesti (Pretexting): Membangun cerita palsu yang logis agar korban merasa terikat.",
      "Fase 4 - Eksekusi (The Hook): Mengarahkan korban ke formulir phishing, file APK sniffer, atau transfer rekening nominee.",
      "Fase 5 - Pemutusan Jejak (Disappearance): Memblokir kontak korban seketika setelah dana atau akses akun didapatkan.",
    ],
    redFlags: [
      "Permintaan transfer biaya administrasi untuk mencairkan hadiah yang tidak pernah diikuti.",
      "Instruksi untuk merahasiakan komunikasi dari pihak keluarga atau petugas bank.",
      "Perubahan nomor rekening tujuan transfer dari rekening berbadan hukum menjadi rekening perorangan.",
    ],
    checklistItems: [
      "Kenali tanda awal pada fase umpan sebelum terbujuk ke fase sugesti penipu.",
      "Tanyakan bukti legalitas dan konfirmasi ke situs resmi instansi terkait.",
      "Periksa nama pemilik rekening tujuan di portal CekRekening.id sebelum transaksi.",
      "Simpan tangkapan layar bukti interaksi sebagai dokumentasi mandiri jika mencurigakan.",
    ],
    takeaway: "Semua penipuan memiliki fase yang serupa: putus interaksi di fase umpan sebelum masuk ke fase eksekusi kerugian.",
  },
  {
    id: "m3",
    title: "Keamanan di WhatsApp",
    category: "Per Kanal",
    duration: "3 menit baca",
    icon: Smartphone,
    summary: "Cara cek centang hijau, broadcast, dan akun bercentang biru.",
    concept: "WhatsApp adalah pintu masuk utama penipuan digital di Indonesia. Penipu sering memalsukan profil bisnis, memanfaatkan emotikon centang palsu, atau membajak akun rekan dekat untuk meminta dana darurat.",
    anatomy: [
      "Centang Hijau Palsu: Penipu memasang emoji centang hijau di dalam nama tampilan akun personal mereka.",
      "Pesan Teruskan (Forwarded Many Times): Informasi palsu disebarkan berulang kali untuk membangun ilusi kebenaran.",
      "Pengambilalihan Akun (Account Hijacking): Mengirim chat berpura-pura kasir minimarket salah kirim voucher dan meminta 6 digit kode SMS registrasi WhatsApp.",
    ],
    redFlags: [
      "Centang hijau berada di dalam teks nama kontak, bukan lencana resmi WhatsApp di header percakapan.",
      "Permintaan kode 6 digit SMS dengan dalih apapun dari teman atau kontak keluarga.",
      "Pesan blast dari nomor tak dikenal yang menawarkan promo atau file dokumen.",
    ],
    checklistItems: [
      "Aktifkan Verifikasi Dua Langkah (Two-Step Verification) dengan PIN 6 digit di WhatsApp.",
      "Jangan pernah membagikan kode SMS 6 digit registrasi WhatsApp kepada siapapun.",
      "Kunci privasi grup WhatsApp agar hanya kontak tersimpan yang dapat menambahkanmu ke grup.",
      "Verifikasi suara langsung jika ada rekan di WhatsApp yang tiba-tiba meminjam dana.",
    ],
    takeaway: "Centang hijau resmi tidak bisa dipalsukan di header obrolan; jangan pernah serahkan kode 6 digit SMS WhatsApp.",
  },
  {
    id: "m4",
    title: "Keamanan Email & Phishing",
    category: "Per Kanal",
    duration: "4 menit baca",
    icon: Mail,
    summary: "Membaca header, domain pengirim, dan lampiran mencurigakan.",
    concept: "Email phishing dirancang menyerupai email resmi dari Google, bank, atau marketplace. Memeriksa domain asli pengirim dan header email adalah garis pertahanan pertama yang paling efektif.",
    anatomy: [
      "Domain Typo (Typosquatting): Pengirim menggunakan alamat seperti 'security@bca-verifikasi.com' bukan domain asli 'bca.co.id'.",
      "Tautan Palsu (Hyperlink Disguise): Teks tautan tertulis 'www.bank.com' tetapi ketika kursor diarahkan, tautan mengarah ke server peretas.",
      "Lampiran Berbahaya: File terlampir berupa file .html, .zip, atau .exe yang disamarkan sebagai bukti transfer (invoice).",
    ],
    redFlags: [
      "Domain pengirim menggunakan domain gratisan (@gmail.com) untuk mengabarkan urusan perbankan korporasi.",
      "Sapaan umum tanpa nama (misal: 'Yth. Pengguna yang Terhormat' bukan nama lengkapmu).",
      "Tuntutan klik tautan segera untuk menghindari penutupan akun dalam hitungan jam.",
    ],
    checklistItems: [
      "Arahkan kursor di atas tautan sebelum mengklik untuk melihat alamat URL tujuan sebenarnya.",
      "Bandingkan domain pengirim dengan domain resmi yang tercantum di kartu debit/kreditmu.",
      "Jangan unduh lampiran berformat .zip, .iso, atau .html dari pengirim yang tidak dikenal.",
      "Tandai email sebagai 'Laporkan Phishing' di penyedia email untuk memblokir pengirim serupa.",
    ],
    takeaway: "Selalu cek domain di balik tanda '@' pengirim dan jangan klik tautan di email yang meminta reset kredensial mendadak.",
  },
  {
    id: "m5",
    title: "Waspada Telepon Mengaku Bank",
    category: "Per Kanal",
    duration: "3 menit baca",
    icon: PhoneCall,
    summary: "Ciri vishing dan kenapa caller ID bisa dipalsukan.",
    concept: "Vishing (Voice Phishing) adalah penipuan via telepon di mana pelaku menggunakan teknik Caller ID Spoofing agar layar ponselmu menampilkan nomor resmi call center bank.",
    anatomy: [
      "Spoofing Caller ID: Memanfaatkan gateway VoIP internet untuk memalsukan nomor pemanggil menjadi 1500xxx atau 140xx.",
      "Skenario Darurat: Memberitahukan adanya transaksi di luar negeri atau kenaikan tarif biaya transaksi bulanan secara sepihak.",
      "Pengalihan ke Mesin Otomatis Palsu: Korban diminta menekan angka PIN atau menyebutkan kode OTP ke 'mesin perekam sistem'.",
    ],
    redFlags: [
      "Penelepon meminta nomor CVV (3 angka di belakang kartu debit/kredit), PIN, atau kode OTP.",
      "Penelepon melarang menutup telepon atau berkonsultasi dengan orang lain saat panggilan berlangsung.",
      "Penelepon bersikeras menghubungkan ke 'pihak kepolisian' dalam satu sambungan panggilan yang sama.",
    ],
    checklistItems: [
      "Tutup panggilan telepon sepihak jika penelepon menyinggung data rahasia perbankan.",
      "Telepon balik nomor resmi bank dari perangkat terpisah atau nomor yang tertera di kartu fisik.",
      "Ingat prinsip dasar: Bank resmi TIDAK PERNAH meminta kode OTP atau PIN nasabah.",
      "Gunakan aplikasi identifikasi nomor untuk memeriksa ulasan komunitas terhadap nomor pemanggil.",
    ],
    takeaway: "Nomor di layar telepon bisa dipalsukan; bank resmi tidak pernah meminta CVV, PIN, atau kode OTP lewat telepon.",
  },
  {
    id: "m6",
    title: "10 Ciri Pesan Phishing yang Wajib Dicek",
    category: "Checklist Praktis",
    duration: "3 menit baca",
    icon: ListChecks,
    summary: "Checklist interaktif sebelum klik tautan atau buka lampiran.",
    concept: "Kompilasi 10 indikator universal red flag pada pesan digital untuk membedakan pesan biasa dari manipulasi rekayasa sosial.",
    anatomy: [
      "1. Urgensi ancaman waktu sempit yang memaksa keputusan panik.",
      "2. Iming-iming hadiah undian yang tidak pernah didaftarkan sebelumnya.",
      "3. Domain web yang mengandung karakter aneh atau ekstensi tak lazim (.xyz, .top, .vip).",
      "4. Nomor seluler biasa yang mengaku perwakilan lembaga resmi.",
      "5. Kesalahan ejaan, tata bahasa kaku, atau campuran istilah yang tidak konsisten.",
    ],
    redFlags: [
      "File berekstensi .apk, .exe, .scr, atau .vbs yang dikirimkan via ruang obrolan chat.",
      "Permintaan untuk merahasiakan pembicaraan dari pihak keluarga atau kolega.",
      "Tautan pendek (shortener link) yang menyembunyikan domain tujuan sesungguhnya.",
    ],
    checklistItems: [
      "Cek apakah kamu memang sedang menunggu transaksi atau kiriman paket yang dimaksud.",
      "Periksa domain tautan sebelum diklik (apakah sesuai domain resmi institusi).",
      "Pastikan tidak ada permintaan kode verifikasi rahasia (OTP) atau PIN.",
      "Gunakan fitur 'Cek Pesan & File' di JagaRuang untuk memindai indikasi red flag secara on-device.",
    ],
    takeaway: "Cukup temukan 1 dari 10 ciri red flag untuk mengambil keputusan berhenti dan memverifikasi mandiri.",
  },
  {
    id: "m7",
    title: "Checklist Sebelum Transfer",
    category: "Checklist Praktis",
    duration: "2 menit baca",
    icon: CheckSquare,
    summary: "Langkah verifikasi sebelum kirim uang ke rekening baru.",
    concept: "Langkah preventif wajib sebelum menekan tombol konfirmasi transfer uang di aplikasi perbankan atau dompet digital untuk nomor tujuan baru.",
    anatomy: [
      "Tekanan Emosional: Penjual atau lawan bicara menuntut transfer dalam hitungan menit dengan alasan barang akan dilepas ke pembeli lain.",
      "Penggunaan Rekening Nominee: Rekening penampung berbeda dari nama toko atau nama entitas yang bertransaksi.",
      "Permintaan Kode Unik Mencurigakan: Meminta nominal dengan kode unik yang sebenarnya adalah nominal top-up dompet digital pelaku.",
    ],
    redFlags: [
      "Nama pemilik rekening tujuan sama sekali berbeda dari nama pemilik toko online.",
      "Penjual menolak opsi transaksi lewat rekening bersama (escrow) marketplace resmi.",
      "Ada riwayat pelaporan nomor rekening di portal CekRekening.id.",
    ],
    checklistItems: [
      "Cari nomor rekening di CekRekening.id dan cek apakah ada laporan penipuan aktif.",
      "Cek nomor HP penjual di aplikasi identifikasi kontak publik.",
      "Pastikan transaksi dilakukan di dalam sistem escrow marketplace resmi jika berbelanja daring.",
      "Konfirmasi dua arah lewat panggilan video singkat jika transfer ditujukan untuk bantuan keluarga.",
    ],
    takeaway: "Uang yang sudah ditransfer ke penipu hampir mustahil ditarik kembali; luangkan 2 menit verifikasi sebelum kirim.",
  },
  {
    id: "m8",
    title: "Pola Modus Penipuan Terbanyak di Indonesia",
    category: "Pola Kejadian Nyata",
    duration: "3 menit baca",
    icon: BarChart3,
    summary: "Ringkasan data IASC/OJK — tanpa menyebut identitas korban.",
    concept: "Berdasarkan rangkuman data Indonesia Anti-Scam Centre (IASC) dan Satgas OJK, mayoritas kerugian digital berasal dari 3 kategori utama: manipulasi rekayasa sosial, loker fiktif berbayar, dan malware pencuri OTP.",
    anatomy: [
      "Peringkat 1: Modus Penipuan Belanja & Undian Palsu (38% kasus laporan).",
      "Peringkat 2: Modus Loker Kerja Lepas / Review Video Berbayar Deposit (27% kasus).",
      "Peringkat 3: Modus Malware Berkas APK (Kurir Paket, Undangan, Surat Tilang) (21% kasus).",
      "Peringkat 4: Modus Investasi Bodong & Pinjaman Ilegal (14% kasus).",
    ],
    redFlags: [
      "Skema komisi bertingkat yang mengharuskan deposit modal sebelum reward dapat ditarik.",
      "Pengiriman berkas aplikasi Android di luar toko resmi Google Play Store.",
      "Akun media sosial jualan yang menonaktifkan kolom komentar publik.",
    ],
    checklistItems: [
      "Pahami 3 pola teratas sehingga kamu langsung waspada saat pola serupa muncul.",
      "Edukasi orang tua dan kerabat yang belum paham bahaya pemasangan berkas APK.",
      "Simpan nomor kontak kanal lapor resmi IASC OJK di ponselmu.",
      "Bagikan Kartu Peringatan JagaRuang ke grup obrolan keluarga.",
    ],
    takeaway: "Pola penipuan selalu berulang; mengenali statistik modusnya membuatmu selangkah lebih maju dari pelaku.",
  },
  {
    id: "m9",
    title: "Pola Penipuan QRIS & E-Wallet",
    category: "Pola Kejadian Nyata",
    duration: "3 menit baca",
    icon: QrCode,
    summary: "Bagaimana kode QR dan link pembayaran disalahgunakan.",
    concept: "Kode QR memudahkan transaksi instan, namun kemudahan ini dimanfaatkan penipu dengan menempelkan kode QR palsu atau mengirimkan tautan transfer berkedok link penerimaan saldo (disbursement).",
    anatomy: [
      "Penempelan Fisik QRIS Palsu: Menimpa QRIS pedagang resmi dengan stiker QRIS penipu di kasir atau kotak amal.",
      "Tautan Permintaan Transfer Berkedok Penerimaan: Pelaku mengirimkan link transfer dengan nominal saldo, meminta korban mengetik PIN agar 'saldo masuk'.",
      "Manipulasi Bukti Transfer QRIS: Menggunakan tangkapan layar editan atau struk palsu untuk mengklaim barang sudah dibayar.",
    ],
    redFlags: [
      "Nama merchant yang muncul di aplikasi tidak sama dengan nama toko tempat kamu berbelanja.",
      "Pihak lain meminta kamu mengetikkan PIN e-wallet untuk menerima kiriman uang (menerima uang TIDAK butuh PIN).",
      "Stiker QRIS tampak bertumpuk atau ada bekas stiker tempelan baru di atas kode lama.",
    ],
    checklistItems: [
      "Selalu cocokkan nama merchant di layar ponsel dengan nama merchant fisik sebelum memasukkan PIN.",
      "Ingat aturan baku: memasukkan PIN di dompet digital artinya MENGELUARKAN dana, bukan menerima dana.",
      "Tolak kiriman link tautan QRIS dari orang tidak dikenal yang menjanjikan pengembalian dana (refund).",
      "Periksa mutasi saldo di aplikasi merchant secara real-time sebelum menyerahkan barang dagangan.",
    ],
    takeaway: "Menerima dana tidak pernah membutuhkan PIN; periksa nama merchant sebelum memindai QRIS.",
  },
  {
    id: "m10",
    title: "Pola Pinjaman Online Ilegal",
    category: "Pola Kejadian Nyata",
    duration: "3 menit baca",
    icon: CreditCard,
    summary: "Ciri pinjol ilegal dan kenapa data pribadi jadi sasaran.",
    concept: "Pinjaman online (pinjol) ilegal beroperasi tanpa izin OJK dan menggunakan metode penagihan teror dengan menyedot seluruh kontak buku telepon di ponsel korban.",
    anatomy: [
      "Permintaan Akses Kontak & Galeri: Aplikasi meminta izin READ_CONTACTS dan READ_EXTERNAL_STORAGE yang tidak diizinkan untuk pinjol resmi.",
      "Pencairan Dana Tanpa Persetujuan: Mentransfer dana kecil secara sepihak ke rekening korban dan menuntut bunga mencekik dalam 7 hari.",
      "Penyebaran Data & Teror Kontak: Mengirimkan pesan penagihan intimidasi ke seluruh nomor telepon yang ada di kontak ponsel korban.",
    ],
    redFlags: [
      "Penawaran pinjaman cepat tanpa syarat melalui pesan blast WhatsApp atau SMS.",
      "Aplikasi tidak terdaftar di direktori resmi Otoritas Jasa Keuangan (OJK).",
      "Aplikasi meminta izin akses ke kontak, galeri foto, riwayat panggilan, dan lokasi GPS.",
    ],
    checklistItems: [
      "Cek legalitas pinjol di portal OJK (ojk.go.id) atau WhatsApp resmi OJK 081-157-157-157.",
      "Jangan berikan izin akses Kontak atau Galeri pada aplikasi keuangan apapun di ponselmu.",
      "Jika terlanjur ditransfer dana sepihak oleh pinjol ilegal, jangan gunakan uangnya dan laporkan ke Satgas OJK.",
      "Gunakan fitur blokir panggilan dari nomor tak dikenal jika menerima teror penagihan ilegal.",
    ],
    takeaway: "Pinjol resmi OJK hanya boleh meminta akses kamera, mikrofon, dan lokasi (CAMILAN); tolak akses kontak dan galeri.",
  },
  {
    id: "m11",
    title: "Cara Lapor Jika Sudah Jadi Korban",
    category: "Setelah Kejadian",
    duration: "5 menit baca",
    icon: AlertTriangle,
    summary: "Langkah ke bank, IASC OJK, dan mengamankan akun.",
    concept: "Jika kamu atau orang terdekat baru saja menjadi korban penipuan digital, waktu 1 - 2 jam pertama (golden period) sangat menentukan keberhasilan pemblokiran rekening pelaku.",
    anatomy: [
      "Menit 0 - 30: Pelaku sedang mencoba memindahkan dana hasil kejahatan ke rekening nominee lain atau mencairkannya ke dompet kripto.",
      "Menit 30 - 60: Peluang pemblokiran saldo oleh bank pengirim dan bank penerima masih terbuka lebar.",
      "Jam 1 - 24: Proses dokumentasi berkas laporan polisi dan pengajuan pembekuan permanen rekening pelaku.",
    ],
    redFlags: [
      "Menunda pelaporan karena merasa malu atau mengira dana sudah pasti hilang tanpa harapan.",
      "Mempercayai oknum di media sosial yang menawarkan jasa 'recovery dana penipuan' (penipuan lapis kedua).",
      "Menghapus bukti obrolan atau nomor kontak pelaku.",
    ],
    checklistItems: [
      "Hubungi call center bank pengirim seketika untuk meminta penahanan transaksi dan blokir rekening tujuan.",
      "Simpan semua tangkapan layar bukti transfer, riwayat chat, nomor HP, dan nomor rekening pelaku.",
      "Buat laporan pengaduan resmi di portal IASC OJK (iasc.ojk.go.id) dan CekRekening.id.",
      "Datang ke kantor kepolisian terdekat (SPKT) untuk membuat Surat Tanda Penerimaan Laporan (STPL).",
      "Ubah kata sandi m-Banking, email utama, dan aktifkan kembali keamanan dua langkah.",
    ],
    takeaway: "Jangan ragu bertindak di menit-menit awal: segera hubungi bank untuk membekukan rekening penampung sebelum dana dilarikan.",
  },
  {
    id: "m12",
    title: "Cara Mendampingi Keluarga yang Kena Tipu",
    category: "Setelah Kejadian",
    duration: "4 menit baca",
    icon: Heart,
    summary: "Ngomong ke keluarga yang kena tipu tanpa menyalahkan.",
    concept: "Korban penipuan digital mengalami trauma psikologis yang berat, rasa bersalah, dan malu. Pendampingan tanpa menyalahkan adalah kunci agar korban mau terbuka dan dapat menyelamatkan aset yang tersisa.",
    anatomy: [
      "Fase Syok: Korban merasa bingung, tidak percaya bahwa orang yang mereka ajak bicara selama ini adalah penipu.",
      "Fase Menyalahkan Diri: Korban merasa bersalah, takut dimarahi keluarga, dan cenderung menyembunyikan besarnya kerugian.",
      "Fase Kerentanan Lanjutan: Penipu sering menghubungi korban kembali berpura-pura menjadi polisi atau pengacara untuk menipu lagi.",
    ],
    redFlags: [
      "Menghardik atau berkata 'Kan sudah kubilang jangan percaya!' yang membuat korban menutup diri.",
      "Membiarkan korban sendirian memegang ponsel tanpa mengamankan akses akun perbankan.",
      "Tidak memeriksa apakah ada malware yang masih aktif berjalan di ponsel korban.",
    ],
    checklistItems: [
      "Tunjukkan empati terlebih dahulu: 'Penipuan ini memang sangat canggih dan banyak korban lainnya, yang penting kita amankan sisanya sekarang.'",
      "Ambil alih pengamanan perangkat: aktifkan mode pesawat, cabut SIM card jika ada malware, dan ganti kredensial penting.",
      "Temani korban ke kantor bank dan kantor polisi untuk proses pelaporan agar korban merasa didukung.",
      "Sepakati Sandi Keluarga untuk mencegah modus penipuan kloning suara atau telepon darurat berikutnya.",
    ],
    takeaway: "Dukungan emosional yang suportif membuat korban mau bertindak cepat menyelamatkan akun sebelum kerugian meluas.",
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
    explanation: "Curiga! Domain mandiri-verifikasi.xyz bukan situs resmi Bank Mandiri (bankmandiri.co.id). Bank tidak pernah meminta PIN lewat tautan web.",
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
    source: "Panggilan Tak Terjawab +62 21-1500888",
    text: "[Voice Phishing] Penelepon mengaku dari Fraud BCA mengabarkan kartu kredit Anda terpakai Rp 12 juta di luar negeri dan meminta membacakan 3 angka CVV di belakang kartu.",
    isScam: true,
    explanation: "Curiga! Caller ID bisa dipalsukan (Spoofing). Petugas bank asli tidak pernah meminta nomor CVV atau kode OTP.",
  },
  {
    id: "t7",
    source: "SMS dari 'TELKOMSEL'",
    text: "Paket Internet Combo Sakti 25GB Anda akan berakhir besok. Perpanjang melalui *363# atau aplikasi MyTelkomsel.",
    isScam: false,
    explanation: "Pesan Biasa. Notifikasi resmi masa aktif paket tanpa tautan mencurigakan, mengarahkan ke USSD resmi *363#.",
  },
  {
    id: "t8",
    source: "WhatsApp dari +62 895-3412-9812",
    text: "Mamah minta tolong belikan pulsa Rp 100.000 ke nomor ini ya nak, nomor mamah yang lama sedang gangguan dan perlu hubungi teman arisan.",
    isScam: true,
    explanation: "Curiga! Modus klasik 'Mamah Minta Pulsa' memanfaatkan rasa bakti anak. Selalu hubungi nomor lama langsung atau verifikasi dengan Sandi Keluarga.",
  },
  {
    id: "t9",
    source: "WhatsApp Grup Komunitas",
    text: "Guys, ada promo subsidi pulsa pemerintah Rp 500.000 untuk semua operator! Daftarnya klik di sini ya: https://subsidi-pulsa-kominfo.free-claim.top",
    isScam: true,
    explanation: "Curiga! Domain .free-claim.top adalah situs jebakan phishing penjerat data identitas. Informasi resmi pemerintah hanya memakai domain .go.id.",
  },
  {
    id: "t10",
    source: "Notifikasi Aplikasi Bank Mandiri",
    text: "Pembayaran QRIS di Kopi Kenangan sebesar Rp 28.000 berhasil pada 04/11/2026 14:20 WIB. Saldo rekening Anda telah disesuaikan.",
    isScam: false,
    explanation: "Pesan Biasa. Notifikasi mutasi resmi in-app dari aplikasi bank setelah transaksi mandiri.",
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
  prevention: string;
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
    prevention: "Kunci opsi 'Install Unknown Apps' di pengaturan ponsel dan tolak semua berkas .apk dari chat.",
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
    prevention: "Terapkan prinsip 'Zero Trust': verifikasi mandiri setiap permintaan mendadak.",
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
    prevention: "Beralih dari SMS OTP ke aplikasi autentikator (TOTP) seperti Google Authenticator.",
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
    prevention: "Periksa domain secara teliti di bilah alamat browser sebelum mengetikkan password.",
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
    prevention: "Selalu konfirmasi nama toko ke kasir sebelum menekan tombol bayar.",
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
    prevention: "Jangan pernah mengklik link di dalam SMS; buka aplikasi resmi secara mandiri.",
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
    prevention: "Gunakan bookmark browser untuk situs sensitif seperti internet banking.",
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
    prevention: "Gunakan pengelola kata sandi (password manager) dan kata sandi unik untuk tiap akun.",
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
    prevention: "Rutin mencadangkan data penting ke media penyimpanan eksternal offline.",
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
    prevention: "Ingat rumus mutlak: pekerjaan legal tidak pernah meminta deposit uang.",
  },
];

// =============================================================================
// KOMPONEN UTAMA: HALAMAN BELAJAR
// =============================================================================
export default function Belajar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tab yang aktif
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const p = searchParams.get("tab");
    return p && ["simulator", "modul", "kilat", "kamus"].includes(p) ? (p as TabType) : "simulator";
  });

  // State tampilan subhalaman khusus (null = cover)
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [kilatMode, setKilatMode] = useState<"cover" | "drill">("cover");
  const [activeGlossaryId, setActiveGlossaryId] = useState<string | null>(null);

  // Status modul yang sudah dibaca (disimpan di localStorage, default m3 dan m6 sesuai referensi)
  const [readModules, setReadModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("jagaruang_read_modules");
      return saved ? JSON.parse(saved) : ["m3", "m6"];
    } catch {
      return ["m3", "m6"];
    }
  });

  // Toast Notifikasi Mengambang Real-time
  const [toastNotif, setToastNotif] = useState<AppNotification | null>(null);

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

  // Sinkronisasi bila query param URL berubah
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["simulator", "modul", "kilat", "kamus"].includes(tabParam)) {
      if (tabParam !== activeTab) {
        setActiveTab(tabParam as TabType);
        // Reset subhalaman saat berganti tab agar membuka cover terlebih dahulu
        setActiveScenarioId(null);
        setActiveModuleId(null);
        setKilatMode("cover");
        setActiveGlossaryId(null);
      }
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setActiveScenarioId(null);
    setActiveModuleId(null);
    setKilatMode("cover");
    setActiveGlossaryId(null);
    setSearchParams({ tab });
  };

  const handleMarkModuleRead = (modulId: string) => {
    setReadModules((prev) => {
      const isAlreadyRead = prev.includes(modulId);
      const next = isAlreadyRead ? prev.filter((id) => id !== modulId) : [...prev, modulId];
      try {
        localStorage.setItem("jagaruang_read_modules", JSON.stringify(next));
      } catch {
        // no-op
      }
      return next;
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ===================================================================== */}
      {/* HEADER UTAMA HALAMAN BELAJAR (SESUAI DOKUMEN & REFERENSI VISUAL)      */}
      {/* ===================================================================== */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#526D82]">Belajar</div>
        <h1 className="text-3xl font-black text-[#27374D] tracking-tight">Belajar</h1>
        <p className="text-xs sm:text-sm text-[#526D82] max-w-2xl leading-relaxed">
          Gabungan Modul, Kilat 2 Menit, dan Kamus dalam satu tempat — supaya navigasinya ringkas di layar kecil.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* HORIZONTAL TAB BAR (4 TAB UTAMA)                                      */}
      {/* ===================================================================== */}
      <div className="border-b border-[#9DB2BF]/40">
        <nav
          aria-label="Pilihan Tab Belajar"
          className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1"
        >
          {/* Tab 1: Simulator */}
          <button
            type="button"
            onClick={() => handleTabChange("simulator")}
            className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 cursor-pointer ${
              activeTab === "simulator"
                ? "text-[#27374D] font-black"
                : "text-[#526D82] hover:text-[#27374D]"
            }`}
          >
            <span>Simulator</span>
            {activeTab === "simulator" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#27374D] rounded-full" />
            )}
          </button>

          {/* Tab 2: Modul */}
          <button
            type="button"
            onClick={() => handleTabChange("modul")}
            className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 cursor-pointer ${
              activeTab === "modul"
                ? "text-[#27374D] font-black"
                : "text-[#526D82] hover:text-[#27374D]"
            }`}
          >
            <span>Modul</span>
            {activeTab === "modul" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#27374D] rounded-full" />
            )}
          </button>

          {/* Tab 3: Kilat 2 Menit */}
          <button
            type="button"
            onClick={() => handleTabChange("kilat")}
            className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 cursor-pointer ${
              activeTab === "kilat"
                ? "text-[#27374D] font-black"
                : "text-[#526D82] hover:text-[#27374D]"
            }`}
          >
            <span>Kilat 2 Menit</span>
            {activeTab === "kilat" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#27374D] rounded-full" />
            )}
          </button>

          {/* Tab 4: Kamus */}
          <button
            type="button"
            onClick={() => handleTabChange("kamus")}
            className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 cursor-pointer ${
              activeTab === "kamus"
                ? "text-[#27374D] font-black"
                : "text-[#526D82] hover:text-[#27374D]"
            }`}
          >
            <span>Kamus</span>
            {activeTab === "kamus" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#27374D] rounded-full" />
            )}
          </button>
        </nav>
      </div>

      {/* ===================================================================== */}
      {/* KONTEN AKTIF BERDASARKAN TAB YANG DIPILIH                             */}
      {/* ===================================================================== */}
      <div>
        {/* PILAR 1: SIMULATOR */}
        {activeTab === "simulator" && (
          <div>
            {!activeScenarioId ? (
              <SimulatorCover onSelectScenario={(id) => setActiveScenarioId(id)} />
            ) : (
              <SimulatorPage
                scenarioId={activeScenarioId}
                onBack={() => setActiveScenarioId(null)}
                onNavigateTab={handleTabChange}
              />
            )}
          </div>
        )}

        {/* PILAR 2: MODUL PEMBELAJARAN (PERSIS SEPERTI GAMBAR USER) */}
        {activeTab === "modul" && (
          <div>
            {!activeModuleId ? (
              <ModulCover
                readModules={readModules}
                onSelectModule={(id) => setActiveModuleId(id)}
                onGoToKilat={() => handleTabChange("kilat")}
              />
            ) : (
              <ModulPage
                moduleId={activeModuleId}
                isRead={readModules.includes(activeModuleId)}
                onBack={() => setActiveModuleId(null)}
                onToggleRead={() => handleMarkModuleRead(activeModuleId)}
                onNavigateTab={handleTabChange}
              />
            )}
          </div>
        )}

        {/* PILAR 3: KILAT 2 MENIT */}
        {activeTab === "kilat" && (
          <div>
            {kilatMode === "cover" ? (
              <KilatCover onStart={() => setKilatMode("drill")} />
            ) : (
              <KilatPage
                onExit={() => setKilatMode("cover")}
                onNavigateTab={handleTabChange}
              />
            )}
          </div>
        )}

        {/* PILAR 4: KAMUS JEBAKAN */}
        {activeTab === "kamus" && (
          <div>
            {!activeGlossaryId ? (
              <KamusCover onSelectTerm={(id) => setActiveGlossaryId(id)} />
            ) : (
              <KamusPage
                termId={activeGlossaryId}
                onBack={() => setActiveGlossaryId(null)}
                onNavigateTab={handleTabChange}
              />
            )}
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* FLOATING TOAST NOTIFIKASI OTOMATIS                                    */}
      {/* ===================================================================== */}
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

      {/* Footer Catatan Kepatuhan Desain */}
      <Disclaimer />
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 1: COVER & PAGE SIMULATOR (BAGIAN 1)
// =============================================================================

function SimulatorCover({ onSelectScenario }: { onSelectScenario: (id: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Header Cover Simulator */}
      <div className="bg-white p-5 rounded-2xl border border-[#9DB2BF]/40 space-y-1">
        <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
          Simulator Skenario Kasus Interaktif
        </h2>
        <p className="text-xs text-[#526D82]">
          Latih insting dan refleks keputusanmu dalam simulasi rekayasa sosial nyata secara aman tanpa risiko.
        </p>
      </div>

      {/* Grid 3 Kartu Skenario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SCENARIOS.map((sc) => (
          <div
            key={sc.id}
            onClick={() => onSelectScenario(sc.id)}
            className="flex flex-col justify-between rounded-2xl border border-[#9DB2BF]/50 bg-white p-5 shadow-xs hover:border-[#526D82] hover:shadow-md transition-all cursor-pointer group"
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
                <h3 className="text-base font-bold text-[#27374D] leading-snug group-hover:text-blue-900 transition-colors">
                  {sc.title}
                </h3>
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
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectScenario(sc.id);
                }}
              >
                <span>Mulai Simulasi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulatorPage({
  scenarioId,
  onBack,
  onNavigateTab,
}: {
  scenarioId: string;
  onBack: () => void;
  onNavigateTab: (tab: TabType) => void;
}) {
  const sc = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  const [step, setStep] = useState<"briefing" | "investigasi" | "debrief">("briefing");
  const [selectedEvidences, setSelectedEvidences] = useState<string[]>([]);
  const [chosenOption, setChosenOption] = useState<ScenarioChoice | null>(null);
  const navigate = useNavigate();

  const toggleEvidence = (evId: string) => {
    setSelectedEvidences((prev) =>
      prev.includes(evId) ? prev.filter((id) => id !== evId) : [...prev, evId]
    );
  };

  const handleSelectChoice = (choice: ScenarioChoice) => {
    setChosenOption(choice);
    setStep("debrief");
    addNotification({
      title: `Target Skenario: ${sc.title}`,
      message: choice.isCorrect
        ? `Luar biasa! Kamu berhasil menghindari jebakan ${sc.category} dan mengambil keputusan tepat. Rekomendasi: Pelajari langkah mitigasinya di Panduan Lindungi atau lanjutkan ke Skenario berikutnya.`
        : `Skenario selesai! Refleks keputusanmu masih berisiko terjebak. Rekomendasi: Buka artikel pembedahan anatomi malware pada bagian Modul Belajar.`,
      type: choice.isCorrect ? "sukses" : "waspada",
      link: choice.isCorrect ? "/belajar?tab=simulator" : "/belajar?tab=modul",
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Kembali */}
      <div className="flex items-center justify-between border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526D82] hover:text-[#27374D] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Skenario</span>
        </button>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${sc.levelBadge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
          {sc.levelLabel}
        </span>
      </div>

      {/* Main Box Halaman Khusus Skenario */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-[#DDE6ED] pb-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === "briefing" ? "bg-[#27374D] text-white" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              1
            </span>
            <span className="text-xs font-bold text-[#27374D]">Briefing Kasus</span>
          </div>
          <ChevronRight className="h-4 w-4 text-[#9DB2BF]" />
          <div className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === "investigasi"
                  ? "bg-[#27374D] text-white"
                  : step === "debrief"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-[#526D82]"
              }`}
            >
              2
            </span>
            <span className="text-xs font-bold text-[#27374D]">Investigasi & Keputusan</span>
          </div>
          <ChevronRight className="h-4 w-4 text-[#9DB2BF]" />
          <div className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === "debrief" ? "bg-[#27374D] text-white" : "bg-slate-100 text-[#526D82]"
              }`}
            >
              3
            </span>
            <span className="text-xs font-bold text-[#27374D]">Debrief & Evaluasi</span>
          </div>
        </div>

        {/* STEP 1: BRIEFING */}
        {step === "briefing" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#526D82]">
                {sc.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">{sc.title}</h2>
              <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">{sc.description}</p>
            </div>

            <div className="rounded-2xl bg-[#DDE6ED]/40 p-4 sm:p-5 border border-[#9DB2BF]/40 space-y-3">
              <span className="text-xs font-bold text-[#27374D] uppercase tracking-wider block">
                Petunjuk Misi Simulasi:
              </span>
              <ul className="space-y-2 text-xs text-[#27374D]">
                {sc.briefing.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#27374D] border border-[#9DB2BF]/50">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed mt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="md"
                className="gap-2 text-xs font-bold"
                onClick={() => setStep("investigasi")}
              >
                <span>Mulai Investigasi Pesan</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: INVESTIGASI */}
        {step === "investigasi" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#9DB2BF]/50 bg-slate-50/70 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#9DB2BF]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27374D] text-white text-xs font-bold">
                    {sc.senderName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#27374D]">{sc.senderName}</div>
                    <div className="text-[10px] text-[#526D82]">{sc.senderAddress}</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#526D82] bg-white px-2 py-0.5 rounded-full border border-[#9DB2BF]/40">
                  Pesan Masuk
                </span>
              </div>

              <div className="rounded-xl bg-white p-3.5 text-xs text-[#27374D] border border-[#9DB2BF]/40 space-y-2.5 shadow-xs">
                <p className="leading-relaxed">{sc.messageText}</p>
                {sc.attachmentName && (
                  <div className="flex items-center gap-2.5 rounded-lg border border-rose-200 bg-rose-50/60 p-2.5 text-rose-900">
                    <FileCode className="h-5 w-5 text-rose-600 shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-[11px] font-bold truncate">{sc.attachmentName}</div>
                      <div className="text-[9px] text-rose-700">{sc.attachmentSize} · Berkas Installer APK</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Langkah 1: Ketuk Tanda Kejanggalan */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-[#27374D]">
                Langkah 1: Ketuk tanda kejanggalan yang kamu temukan:
              </div>
              <div className="space-y-2">
                {sc.evidences.map((ev) => {
                  const isSelected = selectedEvidences.includes(ev.id);
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => toggleEvidence(ev.id)}
                      className={`w-full text-left rounded-xl p-3 text-xs border transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? "border-[#526D82] bg-[#DDE6ED]/60 text-[#27374D] font-medium"
                          : "border-[#9DB2BF]/50 bg-white text-[#526D82] hover:border-[#526D82]"
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px] mt-0.5 ${
                          isSelected
                            ? "border-[#526D82] bg-[#526D82] text-white"
                            : "border-[#9DB2BF]"
                        }`}
                      >
                        {isSelected && "✓"}
                      </div>
                      <span className="leading-relaxed">{ev.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Langkah 2: Pilihan Keputusan */}
            <div className="space-y-2.5 pt-3 border-t border-[#9DB2BF]/30">
              <div className="text-xs font-bold text-[#27374D]">
                Langkah 2: Tentukan keputusan tindakanmu:
              </div>
              <div className="space-y-2">
                {sc.choices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => handleSelectChoice(choice)}
                    className="w-full text-left rounded-xl border border-[#9DB2BF]/50 bg-white p-3.5 text-xs font-semibold text-[#27374D] hover:bg-[#DDE6ED]/50 hover:border-[#526D82] transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span>{choice.label}</span>
                    <ChevronRight className="h-4 w-4 text-[#526D82] group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DEBRIEF */}
        {step === "debrief" && chosenOption && (
          <div className="space-y-6">
            <div
              className={`rounded-2xl p-4 sm:p-5 border ${
                chosenOption.isCorrect
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

            {/* Intisari Pembelajaran */}
            <div className="rounded-2xl bg-[#DDE6ED]/50 p-4 sm:p-5 border border-[#9DB2BF]/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#9DB2BF]/30 pb-3">
                <span className="text-xs font-bold text-[#27374D]">
                  Kode Pelindung (Trust Flag):
                </span>
                <span className="font-mono text-xs font-extrabold text-[#27374D] bg-white px-2.5 py-1 rounded-lg border border-[#9DB2BF]/60">
                  {sc.flagCode}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#526D82] uppercase tracking-wider">
                  Intisari Keamanan Utama:
                </span>
                <p className="text-xs text-[#27374D] leading-relaxed">{sc.learningPoint}</p>
              </div>
            </div>

            {/* Tombol Aksi Akhir */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStep("investigasi");
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
                  onClick={() => navigate("/lindungi")}
                  className="flex-1 sm:flex-none text-xs"
                >
                  Buka Panduan Lindungi
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onBack}
                  className="flex-1 sm:flex-none text-xs font-bold"
                >
                  Selesai & Kembali ke Skenario
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 2: COVER & PAGE MODUL PEMBELAJARAN (BAGIAN 2)
// =============================================================================

function ModulCover({
  readModules,
  onSelectModule,
  onGoToKilat,
}: {
  readModules: string[];
  onSelectModule: (id: string) => void;
  onGoToKilat: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    "Semua",
    "Dasar Keamanan",
    "Per Kanal",
    "Checklist Praktis",
    "Pola Kejadian Nyata",
    "Setelah Kejadian",
  ];

  const filteredModules = useMemo(() => {
    if (selectedCategory === "Semua") return LEARNING_MODULES;
    return LEARNING_MODULES.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Modul Pembelajaran dengan tombol Kilat 2 Menit di kanan (persis gambar) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">Modul Pembelajaran</h2>
          <p className="text-xs sm:text-sm text-[#526D82]">
            Materi dasar yang bisa dibaca kapan saja, dikelompokkan per bab — bukan skenario simulasi.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToKilat}
          className="inline-flex items-center gap-2 rounded-xl bg-[#27374D] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1f2d3f] transition-all shadow-xs shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Kilat 2 Menit</span>
        </button>
      </div>

      {/* Category Filter Pills (persis gambar: Semua, Dasar Keamanan, Per Kanal, ...) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#27374D] text-white shadow-xs"
                : "bg-white border border-[#9DB2BF]/50 text-[#526D82] hover:bg-[#DDE6ED]/60 hover:text-[#27374D]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid 12 Kartu Modul Pembelajaran (3 Kolom persis gambar) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {filteredModules.map((m) => {
          const Icon = m.icon;
          const isRead = readModules.includes(m.id);
          return (
            <div
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-[#526D82] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Baris Atas: Ikon di kiri, Status Baca di kanan */}
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-[#526D82] border border-slate-200 group-hover:bg-[#DDE6ED]/60 group-hover:text-[#27374D] transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>

                  {isRead ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60">
                      Sudah dibaca
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">
                      Belum dibaca
                    </span>
                  )}
                </div>

                {/* Kategori Modul (Huruf Kapital Ringkas) */}
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#526D82]">
                  {m.category}
                </div>

                {/* Judul & Deskripsi */}
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#27374D] leading-snug group-hover:text-blue-900 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#526D82] leading-relaxed line-clamp-2">
                    {m.summary}
                  </p>
                </div>
              </div>

              {/* Footer: Waktu Baca */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#526D82]">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3 w-3" />
                  <span>{m.duration}</span>
                </span>
                <span className="text-[11px] font-bold text-[#27374D] group-hover:underline flex items-center gap-0.5">
                  Baca Modul <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModulPage({
  moduleId,
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
}: {
  moduleId: string;
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: TabType) => void;
}) {
  const m = LEARNING_MODULES.find((mod) => mod.id === moduleId) || LEARNING_MODULES[0];
  const Icon = m.icon;

  // Checklist interaktif yang tersimpan lokal
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("jagaruang_modul_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCheck = (itemIdx: number) => {
    const checkKey = `${m.id}_chk_${itemIdx}`;
    setCheckedItems((prev) => {
      const willBeChecked = !prev[checkKey];
      const next = { ...prev, [checkKey]: willBeChecked };
      try {
        localStorage.setItem("jagaruang_modul_checks", JSON.stringify(next));
      } catch {
        // no-op
      }

      // Jika seluruh checklist selesai, tandai modul sudah dibaca & buat notifikasi
      if (willBeChecked) {
        let allCompleted = true;
        for (let i = 0; i < m.checklistItems.length; i++) {
          if (!next[`${m.id}_chk_${i}`]) {
            allCompleted = false;
            break;
          }
        }
        if (allCompleted) {
          if (!isRead) onToggleRead();
          addNotification({
            title: `Modul Selesai: ${m.title}`,
            message: `Luar biasa! Kamu telah menuntaskan seluruh checklist pencegahan untuk '${m.title}'. Rekomendasi: Uji refleksmu di Tantangan Kilat 120 Detik atau buat Sandi Keluarga.`,
            type: "sukses",
            link: "/sandi",
          });
        }
      }

      return next;
    });
  };

  const handleFinishAndNotify = () => {
    if (!isRead) onToggleRead();
    addNotification({
      title: `Modul Selesai Dibaca: ${m.title}`,
      message: `Pemahaman materi '${m.title}' telah dicatat. Rekomendasi: Lanjutkan ke modul berikutnya atau uji pemahaman di Simulator Skenario Kasus.`,
      type: "sukses",
      link: "/belajar?tab=simulator",
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Navigasi Khusus Modul */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526D82] hover:text-[#27374D] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Modul Pembelajaran</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#526D82] flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {m.duration}
          </span>
          <button
            type="button"
            onClick={onToggleRead}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isRead
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200"
            }`}
          >
            {isRead ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Sudah Dibaca</span>
              </>
            ) : (
              <span>Tandai Selesai Dibaca</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Container Pembelajaran Khusus */}
      <article className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-8">
        {/* Header Bab Modul */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#526D82]">
                {m.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#27374D] leading-tight">
                {m.title}
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#526D82] leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {m.summary}
          </p>
        </div>

        {/* Bagian 1: Konsep & Prinsip Utama */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[#27374D] flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#27374D] text-white text-xs">
              1
            </span>
            <span>Konsep & Prinsip Utama</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed pl-8">
            {m.concept}
          </p>
        </div>

        {/* Bagian 2: Pembedahan Anatomi Serangan */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[#27374D] flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#27374D] text-white text-xs">
              2
            </span>
            <span>Tahapan Alur / Anatomi Penipuan</span>
          </h2>
          <div className="pl-8 space-y-2">
            {m.anatomy.map((stepItem, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#DDE6ED]/40 p-3.5 border border-[#9DB2BF]/40 text-xs text-[#27374D] leading-relaxed flex items-start gap-2.5"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#27374D] text-white text-[10px] font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span>{stepItem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bagian 3: Ciri & Red Flag yang Wajib Diwaspadai */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[#27374D] flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#27374D] text-white text-xs">
              3
            </span>
            <span>Tanda Kejanggalan (Red Flags)</span>
          </h2>
          <ul className="pl-8 space-y-2 text-xs sm:text-sm text-[#27374D]">
            {m.redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2 rounded-xl bg-amber-50/70 p-3 border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bagian 4: Checklist Tindakan Mandiri */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[#27374D] flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#27374D] text-white text-xs">
              4
            </span>
            <span>Checklist Praktis Tindakan Mandiri</span>
          </h2>
          <p className="text-xs text-[#526D82] pl-8">
            Centang setiap poin setelah kamu mempraktikkan langkah perlindungan berikut:
          </p>
          <div className="pl-8 space-y-2">
            {m.checklistItems.map((chk, idx) => {
              const checkKey = `${m.id}_chk_${idx}`;
              const isChecked = !!checkedItems[checkKey];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(idx)}
                  className={`w-full text-left rounded-xl p-3 text-xs border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium line-through opacity-85"
                      : "bg-white border-[#9DB2BF]/60 text-[#27374D] hover:border-[#526D82]"
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px] mt-0.5 ${
                      isChecked
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

        {/* Bagian 5: Intisari Keamanan Utama */}
        <div className="rounded-2xl bg-[#27374D] text-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
            <ShieldCheck className="h-4 w-4" />
            <span>Intisari Perlindungan</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-[#DDE6ED]">
            {m.takeaway}
          </p>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#DDE6ED]">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="w-full sm:w-auto text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Kembali ke Daftar Modul
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigateTab("simulator")}
              className="flex-1 sm:flex-none text-xs"
            >
              Uji Kasus di Simulator
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleFinishAndNotify}
              className="flex-1 sm:flex-none text-xs font-bold"
            >
              Selesai & Catat Progres
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 3: COVER & PAGE KILAT 2 MENIT (BAGIAN 3)
// =============================================================================

function KilatCover({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-6">
      {/* Tampilan Standby Cover Tantangan Kilat */}
      <div className="mx-auto max-w-xl text-center">
        <div className="rounded-3xl border border-[#9DB2BF]/50 bg-[#27374D] text-white p-8 sm:p-10 shadow-lg space-y-6">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#526D82]/50 border border-[#9DB2BF]/40 text-amber-300 shadow-md">
              <Sparkles className="h-8 w-8 animate-pulse" />
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
              Asah refleks insting membedakan pesan biasa vs manipulasi sebelum kamu tertipu!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#DDE6ED] pt-2">
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5 text-amber-300" />
              120 Detik Timer
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              <ListChecks className="h-3.5 w-3.5 text-sky-300" />
              10 Pesan Uji
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              On-Device
            </span>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto rounded-2xl bg-[#DDE6ED] px-8 py-3.5 text-sm font-black text-[#27374D] hover:bg-white active:scale-98 transition-all shadow-md cursor-pointer"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Petunjuk Tambahan */}
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-5 border border-[#9DB2BF]/40 space-y-2 text-xs text-[#526D82]">
        <span className="font-bold text-[#27374D] block">Aturan Main Tantangan:</span>
        <ul className="list-disc list-inside space-y-1">
          <li>Kamu akan dihadapkan pada 10 pesan yang masuk secara berurutan.</li>
          <li>Tentukan dengan cepat apakah pesan tersebut adalah "Pesan Biasa" atau "Curiga".</li>
          <li>Waktu terus berjalan selama 120 detik. Asah refleks insting pertahananmu!</li>
        </ul>
      </div>
    </div>
  );
}

function KilatPage({
  onExit,
  onNavigateTab,
}: {
  onExit: () => void;
  onNavigateTab: (tab: TabType) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "biasa" | "curiga">>({});
  const [isFinished, setIsFinished] = useState(false);

  // Timer Countdown
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (!isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFinished, timeLeft]);

  const handleAnswer = (choice: "biasa" | "curiga") => {
    const currentItem = TRIAGE_DRILL_ITEMS[currentIndex];
    const newAnswers = { ...answers, [currentItem.id]: choice };
    setAnswers(newAnswers);

    if (currentIndex + 1 < TRIAGE_DRILL_ITEMS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
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

  // Notifikasi hasil & rekomendasi ketika tantangan selesai
  useEffect(() => {
    if (isFinished) {
      const correct = scoreResult.correct;
      const total = scoreResult.total;
      const pct = scoreResult.percentage;
      addNotification({
        title: `Hasil Tantangan Kilat: Skor ${correct}/${total} (${pct}%)`,
        message:
          pct >= 80
            ? `Refleks keamananmu sangat tanggap! Rekomendasi: Pertahankan kewaspadaan dan uji kasus di Simulator Skenario Kasus.`
            : `Tantangan selesai! Masih ada beberapa pesan manipulasi yang lolos deteksi. Rekomendasi: Buka Kamus Jebakan atau pelajari Modul Pembelajaran.`,
        type: pct >= 80 ? "sukses" : "waspada",
        link: pct >= 80 ? "/belajar?tab=simulator" : "/belajar?tab=kamus",
      });
    }
  }, [isFinished]);

  const currentItem = TRIAGE_DRILL_ITEMS[currentIndex];

  const handleRestart = () => {
    setTimeLeft(120);
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Header Drill */}
      <div className="flex items-center justify-between border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526D82] hover:text-[#27374D] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Keluar dari Tantangan</span>
        </button>

        {!isFinished && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#526D82]">
              Soal {currentIndex + 1} dari {TRIAGE_DRILL_ITEMS.length}
            </span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                timeLeft <= 20
                  ? "bg-rose-100 text-rose-800 animate-pulse"
                  : "bg-[#27374D] text-white"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tampilan Pertanyaan Aktif */}
      {!isFinished && currentItem && (
        <div className="mx-auto max-w-xl space-y-6">
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#DDE6ED] pb-3">
              <span className="text-xs font-bold text-[#526D82]">{currentItem.source}</span>
              <span className="text-[10px] font-semibold text-[#526D82] bg-slate-100 px-2 py-0.5 rounded-full">
                Uji Refleks #{currentIndex + 1}
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 text-xs sm:text-sm text-[#27374D] leading-relaxed font-medium">
              "{currentItem.text}"
            </div>

            <p className="text-[11px] text-[#526D82] text-center">
              Apakah pesan di atas adalah pesan biasa atau manipulasi mencurigakan?
            </p>

            {/* 2 Pilihan Tombol Keputusan */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleAnswer("biasa")}
                className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 p-4 text-center font-bold text-emerald-900 hover:bg-emerald-100 hover:border-emerald-600 transition-all cursor-pointer flex flex-col items-center gap-2 group shadow-xs"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-xs sm:text-sm">Pesan Biasa</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnswer("curiga")}
                className="rounded-2xl border-2 border-rose-500 bg-rose-50/50 p-4 text-center font-bold text-rose-900 hover:bg-rose-100 hover:border-rose-600 transition-all cursor-pointer flex flex-col items-center gap-2 group shadow-xs"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white group-hover:scale-105 transition-transform">
                  <OctagonAlert className="h-5 w-5" />
                </div>
                <span className="text-xs sm:text-sm">Curiga (Manipulasi)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tampilan Selesai & Hasil Evaluasi */}
      {isFinished && (
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-sm text-center space-y-6">
            <div className="flex justify-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  scoreResult.percentage >= 80
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                <Award className="h-8 w-8" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#526D82]">
                Hasil Evaluasi Tantangan Kilat
              </div>
              <h2 className="text-3xl font-black text-[#27374D]">
                Skor: {scoreResult.correct} dari {scoreResult.total} Tepat
              </h2>
              <p className="text-xs text-[#526D82]">
                Tingkat Akurasi Refleks: {scoreResult.percentage}%
              </p>
            </div>

            {/* Ulasan Jawaban per Soal */}
            <div className="text-left space-y-3 pt-3 border-t border-[#DDE6ED]">
              <span className="text-xs font-bold text-[#27374D] block">
                Ulasan Refleks Keputusanmu:
              </span>
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {TRIAGE_DRILL_ITEMS.map((item, idx) => {
                  const userChoice = answers[item.id];
                  const isCorrect =
                    (userChoice === "curiga" && item.isScam) ||
                    (userChoice === "biasa" && !item.isScam);
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl p-4 border text-xs space-y-2 ${
                        isCorrect
                          ? "bg-emerald-50/60 border-emerald-300"
                          : "bg-rose-50/60 border-rose-300"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-[#27374D]">
                          #{idx + 1} · {item.source}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${
                            isCorrect
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {isCorrect ? "✓ Keputusan Tepat" : "✕ Kurang Tepat"}
                        </span>
                      </div>
                      <p className="text-[#27374D] font-medium leading-relaxed">
                        "{item.text}"
                      </p>
                      <p className="text-[#526D82] text-[11px] leading-relaxed pt-1 border-t border-slate-200">
                        {item.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tombol Aksi Akhir */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#DDE6ED]">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestart}
                className="w-full sm:w-auto text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Ulangi Tantangan
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigateTab("kamus")}
                  className="flex-1 sm:flex-none text-xs"
                >
                  Pelajari di Kamus
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onExit}
                  className="flex-1 sm:flex-none text-xs font-bold"
                >
                  Kembali ke Menu Utama
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SUB-KOMPONEN 4: COVER & PAGE KAMUS JEBAKAN (BAGIAN 4)
// =============================================================================

function KamusCover({ onSelectTerm }: { onSelectTerm: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    "Semua",
    "Malware Android",
    "Manipulasi Sosial",
    "Identitas",
    "Penipuan Web",
  ];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchCat = selectedCategory === "Semua" || term.category === selectedCategory;
      const matchSearch =
        term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.meaning.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Kamus Cover */}
      <div className="bg-white p-5 rounded-2xl border border-[#9DB2BF]/40 space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
          Kamus Istilah Jebakan & Modus Digital
        </h2>
        <p className="text-xs sm:text-sm text-[#526D82]">
          Pahami 10 istilah ancaman, cara kerja manipulasi, dan respons pertolongan pertama saat terlanjur terpapar.
        </p>
      </div>

      {/* Kontrol Pencarian & Kategori Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#526D82]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari istilah, singkatan, atau nama modus..."
            className="w-full rounded-2xl border border-[#9DB2BF]/60 bg-white py-2.5 pl-10 pr-4 text-xs text-[#27374D] placeholder:text-[#9DB2BF] focus:outline-none focus:ring-2 focus:ring-[#526D82]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#27374D] text-white shadow-xs"
                  : "bg-white border border-[#9DB2BF]/50 text-[#526D82] hover:bg-[#DDE6ED]/60 hover:text-[#27374D]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Kartu Istilah Kamus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            onClick={() => onSelectTerm(term.id)}
            className="rounded-2xl border border-[#9DB2BF]/50 bg-white p-5 shadow-xs hover:border-[#526D82] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${term.tagColor}`}
                >
                  {term.category}
                </span>
                <span className="text-[11px] font-bold text-[#27374D] group-hover:underline flex items-center gap-0.5">
                  Pelajari Modus <ChevronRight className="h-3 w-3" />
                </span>
              </div>

              <h3 className="text-base font-bold text-[#27374D] group-hover:text-blue-900 transition-colors">
                {term.name}
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed line-clamp-3">
                {term.meaning}
              </p>
            </div>

            <div className="pt-2 border-t border-[#DDE6ED] flex items-center justify-between text-[11px] text-[#526D82]">
              <span className="truncate">Titik Masuk: {term.entryPoint.slice(0, 35)}...</span>
              <span className="text-[#27374D] font-bold shrink-0">Buka Detail →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KamusPage({
  termId,
  onBack,
  onNavigateTab,
}: {
  termId: string;
  onBack: () => void;
  onNavigateTab: (tab: TabType) => void;
}) {
  const term = GLOSSARY_TERMS.find((t) => t.id === termId) || GLOSSARY_TERMS[0];
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top Bar Navigasi Khusus Kamus */}
      <div className="flex items-center justify-between border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526D82] hover:text-[#27374D] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Kamus Istilah</span>
        </button>

        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${term.tagColor}`}
        >
          {term.category}
        </span>
      </div>

      {/* Main Container Halaman Khusus Istilah */}
      <article className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#526D82]">
            Kamus Jebakan Digital
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#27374D]">{term.name}</h1>
          <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed bg-[#DDE6ED]/40 p-4 rounded-2xl border border-[#9DB2BF]/40">
            {term.meaning}
          </p>
        </div>

        {/* Section 1: Cara Kerja Modus */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#27374D]">
            Tahapan Cara Kerja Modus:
          </h2>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-[#27374D] leading-relaxed">
            {term.howItWorks}
          </div>
        </div>

        {/* Section 2: Titik Masuk Utama */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#27374D]">
            Titik Masuk Utama (Entry Point):
          </h2>
          <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-200 text-xs text-amber-950 leading-relaxed">
            {term.entryPoint}
          </div>
        </div>

        {/* Section 3: Pertolongan Pertama / Respons Cepat */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
            <OctagonAlert className="h-4 w-4" />
            <span>Pertolongan Pertama Jika Terlanjur Terpapar:</span>
          </h2>
          <div className="rounded-2xl bg-rose-50/70 p-4 border border-rose-200 text-xs text-rose-950 leading-relaxed">
            {term.firstResponse}
          </div>
        </div>

        {/* Section 4: Langkah Pencegahan Mandiri */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#27374D] flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Langkah Pencegahan Utama:</span>
          </h2>
          <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
            {term.prevention}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#DDE6ED]">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="w-full sm:w-auto text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Kembali ke Daftar Kamus
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/cek")}
              className="flex-1 sm:flex-none text-xs"
            >
              Uji Cek Pesan & Berkas
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigateTab("simulator")}
              className="flex-1 sm:flex-none text-xs font-bold"
            >
              Latihan di Simulator
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
