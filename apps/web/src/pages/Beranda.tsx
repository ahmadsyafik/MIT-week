import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Compass,
  ShieldAlert,
  BookOpen,
  Clock,
  KeyRound,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Users,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Disclaimer } from "../components/ui";

// Data Modul Pintasan (Item 6)
const MODULE_SHORTCUTS = [
  {
    id: "kasus-1",
    title: "Undangan APK Palsu",
    category: "Studi Kasus 1",
    author: "Tim Forensik JR",
    steps: 4,
    duration: "3 Mnt",
    progress: 80,
    accent: "from-blue-500/20 to-indigo-500/10",
    badge: "Level Waspada",
    icon: Smartphone,
  },
  {
    id: "kasus-2",
    title: "Kurir Paket & Foto Resi",
    category: "Studi Kasus 2",
    author: "Satgas Rekayasa Sosial",
    steps: 5,
    duration: "4 Mnt",
    progress: 40,
    accent: "from-teal-500/20 to-emerald-500/10",
    badge: "Risiko Tinggi",
    icon: Search,
  },
  {
    id: "kasus-3",
    title: "Loker WFH & Deposit",
    category: "Studi Kasus 3",
    author: "Unit Anti-Phishing",
    steps: 4,
    duration: "3 Mnt",
    progress: 0,
    accent: "from-purple-500/20 to-pink-500/10",
    badge: "Risiko Sangat Tinggi",
    icon: FileCode,
  },
];

// Data Istilah Populer (Item 3)
const POPULAR_TERMS = [
  {
    id: "sniffing-apk",
    term: "Sniffing APK",
    desc: "Pencurian SMS OTP berkedok file resi/surat",
    category: "Malware Android",
    date: "22 Nov 2026",
    icon: FileCode,
    color: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  },
  {
    id: "social-engineering",
    term: "Social Engineering",
    desc: "Manipulasi psikologis panik & rasa bersalah",
    category: "Manipulasi Sosial",
    date: "20 Nov 2026",
    icon: Users,
    color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
  {
    id: "sim-swap",
    term: "SIM Swap Fraud",
    desc: "Kloning nomor HP untuk bobol verifikasi bank",
    category: "Identitas",
    date: "18 Nov 2026",
    icon: Smartphone,
    color: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  },
];

export default function Beranda() {
  const { user, isAuthenticated, openLoginModal } = useAuth();
  const [selectedCalendarTab, setSelectedCalendarTab] = useState<"prev" | "month" | "year">("month");
  const [selectedDayInfo, setSelectedDayInfo] = useState<string | null>(null);

  // =========================================================================
  // KONDISI 1: PENGUNJUNG BELUM LOGIN (LANDING PAGE VIEW BERSIH)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="space-y-12 py-4">
        {/* Hero Section */}
        <section className="space-y-5 text-center max-w-3xl mx-auto pt-6 sm:pt-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#526D82]/30 px-3.5 py-1 text-xs font-semibold text-[#DDE6ED] border border-[#526D82]">
            Studi Kasus: MIT-Week 2026 · Guardians of the Digital Space
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#DDE6ED] sm:text-4xl md:text-5xl leading-tight">
            Cek. Latih. Lindungi.
          </h1>
          <p className="text-base sm:text-lg text-[#9DB2BF] leading-relaxed max-w-2xl mx-auto">
            Platform interaktif untuk membantu anak muda mengenali tipuan digital, mengasah insting keputusan,
            dan tahu tindakan mitigasi tepat saat menghadapi situasi mencurigakan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={openLoginModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DDE6ED] px-6 py-3 text-sm font-bold text-[#27374D] hover:bg-white active:scale-98 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Masuk Sekarang</span>
            </button>
            <a
              href="#tiga-pilar"
              className="inline-flex items-center justify-center rounded-xl border border-[#526D82] bg-[#27374D]/80 px-6 py-3 text-sm font-semibold text-[#DDE6ED] hover:bg-[#526D82]/30 transition-all cursor-pointer"
            >
              Pelajari Fitur
            </a>
          </div>

          <p className="text-xs text-[#9DB2BF] pt-2">
            *Privasi 100% on-device di perambanmu. Tidak memerlukan email, password, ataupun registrasi server.
          </p>
        </section>

        {/* 3 Pilar Utama */}
        <section id="tiga-pilar" className="space-y-6 pt-4 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#DDE6ED] sm:text-2xl">Tiga Pilar Utama</h2>
            <p className="text-sm text-[#9DB2BF]">Kombinasi analisis teknis, pelatihan insting, dan panduan mitigasi.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl border border-[#526D82]/50 bg-[#27374D] p-5 shadow-sm hover:border-[#9DB2BF] transition-all">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#526D82]/40 text-[#DDE6ED] border border-[#526D82]">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#DDE6ED]">1. Cek Pesan & Berkas</h3>
                <p className="text-xs text-[#9DB2BF] leading-relaxed">
                  Deteksi indikasi rekayasa sosial, tautan mencurigakan, dan ekstensi berkas berbahaya secara mandiri di perangkat.
                </p>
              </div>
              <div className="pt-5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-lg bg-[#526D82]/30 py-2 text-xs font-semibold text-[#DDE6ED] hover:bg-[#526D82] border border-[#526D82] transition-colors"
                >
                  Periksa Sekarang
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#526D82]/50 bg-[#27374D] p-5 shadow-sm hover:border-[#9DB2BF] transition-all">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#526D82]/40 text-[#DDE6ED] border border-[#526D82]">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#DDE6ED]">2. Latih Keputusanmu</h3>
                <p className="text-xs text-[#9DB2BF] leading-relaxed">
                  Simulasi skenario bercabang (undangan APK, loker palsu, kurir paket) untuk menguji refleks keputusanmu.
                </p>
              </div>
              <div className="pt-5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-lg bg-[#526D82]/30 py-2 text-xs font-semibold text-[#DDE6ED] hover:bg-[#526D82] border border-[#526D82] transition-colors"
                >
                  Mulai Latihan
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#526D82]/50 bg-[#27374D] p-5 shadow-sm hover:border-[#9DB2BF] transition-all">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#526D82]/40 text-[#DDE6ED] border border-[#526D82]">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#DDE6ED]">3. Lindungi Sekitarmu</h3>
                <p className="text-xs text-[#9DB2BF] leading-relaxed">
                  Panduan tindakan darurat berurutan, kanal lapor resmi terverifikasi, dan pembuatan kartu peringatan keluarga.
                </p>
              </div>
              <div className="pt-5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-lg bg-[#526D82]/30 py-2 text-xs font-semibold text-[#DDE6ED] hover:bg-[#526D82] border border-[#526D82] transition-colors"
                >
                  Buka Panduan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Tetap */}
        <Disclaimer />
      </div>
    );
  }

  // =========================================================================
  // KONDISI 2: PENGGUNA SUDAH LOGIN (PERSIS SEPERTI GAMBAR REFERENSI USER)
  // Grid:
  // Kolom Kiri:
  //   1. Banner "Welcome Back !" (dengan progres)
  //   6. Pintasan menuju modul (3 kartu modul)
  //   4. Grafik pembelajaran dalam seminggu (Activities wave chart)
  // Kolom Kanan:
  //   2. Ringkasan atau pintasan simulator (Kalender jadwal simulasi)
  //   3. Ringkasan kamus kata yang sedang popular (Upcoming Task / Modus Populer)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Grid Dashboard 2 Kolom (Persis seperti layout di referensi) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =================================================================== */}
        {/* SISI KIRI (lg:col-span-7 xl:col-span-8): ITEM 1, 6, 4               */}
        {/* =================================================================== */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* --------------------------------------------------------------- */}
          {/* 1. WELCOME BACK BANNER                                           */}
          {/* --------------------------------------------------------------- */}
          <div className="relative overflow-hidden rounded-3xl border border-[#526D82]/50 bg-gradient-to-r from-[#27374D] via-[#526D82]/25 to-[#27374D] p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2 max-w-md z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#526D82]/40 px-3 py-0.5 text-[11px] font-bold text-[#DDE6ED] border border-[#9DB2BF]/30">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  <span>Sesi Aktif Digital Guardian</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#DDE6ED] tracking-tight">
                  Welcome Back !
                </h1>
                <p className="text-xs sm:text-sm text-[#9DB2BF] leading-relaxed">
                  Latih insting pertahanan digitalmu hari ini melalui skenario interaktif dan analisis indikasi rekayasa sosial.
                </p>

                {/* Progress Bar Latihan */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#DDE6ED]">Course Progress</span>
                    <span className="text-teal-300 font-bold">82%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#27374D] border border-[#526D82]/60 p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500 shadow-xs"
                      style={{ width: "82%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Ilustrasi Isometrik Buku & Topi Wisuda (Persis seperti di gambar) */}
              <div className="relative shrink-0 flex items-center justify-center sm:pr-4">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  {/* Lingkaran Glow Aksen */}
                  <div className="absolute inset-0 rounded-full bg-teal-500/10 blur-xl" />

                  {/* SVG Isometric Books & Graduation Hat */}
                  <svg viewBox="0 0 160 140" className="h-32 w-32 drop-shadow-lg" fill="none">
                    {/* Shadow Bawah */}
                    <ellipse cx="80" cy="120" rx="55" ry="14" fill="#1b2635" opacity="0.6" />

                    {/* Buku Dasar (Buku 1 - Ungu) */}
                    <path d="M40 95 L80 115 L120 95 L80 75 Z" fill="#4338ca" />
                    <path d="M40 95 L80 115 L80 123 L40 103 Z" fill="#312e81" />
                    <path d="M120 95 L80 115 L80 123 L120 103 Z" fill="#3730a3" />

                    {/* Buku Tengah (Buku 2 - Biru) */}
                    <path d="M44 82 L80 100 L116 82 L80 64 Z" fill="#0284c7" />
                    <path d="M44 82 L80 100 L80 108 L44 90 Z" fill="#0369a1" />
                    <path d="M116 82 L80 100 L80 108 L116 90 Z" fill="#075985" />

                    {/* Buku Atas (Buku 3 - Oranye) */}
                    <path d="M48 69 L80 85 L112 69 L80 53 Z" fill="#f97316" />
                    <path d="M48 69 L80 85 L80 93 L48 77 Z" fill="#ea580c" />
                    <path d="M112 69 L80 85 L80 93 L112 77 Z" fill="#c2410c" />

                    {/* Topi Wisuda / Perisai Wisuda Isometrik */}
                    <path d="M80 20 L125 38 L80 56 L35 38 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <path d="M60 48 L80 56 L100 48 L100 62 C100 68 60 68 60 62 Z" fill="#312e81" />
                    {/* Tali Rumbai Emas */}
                    <circle cx="80" cy="38" r="3" fill="#fbbf24" />
                    <path d="M80 38 Q110 42 118 60" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
                    <rect x="115" y="58" width="6" height="8" rx="2" fill="#f59e0b" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* 6. PINTASAN MENUJU MODUL (3 KARTU KURSUS PERSIS SEPERTI GAMBAR)  */}
          {/* --------------------------------------------------------------- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[#DDE6ED]">Modul Pembelajaran</h2>
              <Link to="/latih" className="text-xs font-semibold text-teal-300 hover:text-white transition-colors">
                Lihat Semua Kasus →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MODULE_SHORTCUTS.map((m) => {
                const Icon = m.icon;
                return (
                  <Link
                    key={m.id}
                    to="/latih"
                    className="group flex flex-col justify-between rounded-2xl border border-[#526D82]/50 bg-[#27374D] p-4 hover:border-[#9DB2BF] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="space-y-3">
                      {/* Ilustrasi Thumbnail Modul */}
                      <div className={`flex h-28 w-full items-center justify-center rounded-xl bg-gradient-to-br ${m.accent} border border-[#526D82]/40 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#27374D]/90 text-teal-300 border border-[#526D82]/60 shadow-sm">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="absolute top-2 right-2 rounded-full bg-[#27374D]/80 px-2 py-0.5 text-[9px] font-bold text-[#9DB2BF] border border-[#526D82]/50">
                          {m.badge}
                        </span>
                      </div>

                      {/* Judul & Keterangan */}
                      <div>
                        <h3 className="text-sm font-bold text-[#DDE6ED] group-hover:text-teal-300 transition-colors line-clamp-1">
                          {m.title}
                        </h3>
                        <p className="text-[11px] text-[#9DB2BF] mt-0.5">{m.author}</p>
                      </div>
                    </div>

                    {/* Stats Bawah: Langkah, Durasi, Progres (seperti di gambar) */}
                    <div className="pt-4 border-t border-[#526D82]/30 mt-3 flex items-center justify-between text-[11px] text-[#9DB2BF]">
                      <div className="flex items-center gap-1">
                        <Compass className="h-3.5 w-3.5 text-[#526D82]" />
                        <span>{m.steps} Kasus</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#526D82]" />
                        <span>{m.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-teal-300">
                        <span>{m.progress}%</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* 4. GRAFIK PEMBELAJARAN DALAM SEMINGGU (ACTIVITIES WAVE CHART)    */}
          {/* --------------------------------------------------------------- */}
          <div className="rounded-3xl border border-[#526D82]/50 bg-[#27374D] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#DDE6ED]">Activities</h3>
                <p className="text-xs text-[#9DB2BF]">Grafik intensitas penyelesaian simulasi & latihan dalam seminggu</p>
              </div>

              {/* Legend Ringkas */}
              <div className="flex items-center gap-4 text-xs text-[#9DB2BF]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  <span>Skenario Selesai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#526D82]" />
                  <span>Rata-rata Waktu</span>
                </div>
              </div>
            </div>

            {/* SVG Wave Graph Container (Persis seperti grafik di gambar referensi) */}
            <div className="relative pt-4 pb-2">
              <svg viewBox="0 0 600 160" className="w-full h-36 sm:h-44 overflow-visible" preserveAspectRatio="none">
                <defs>
                  {/* Gradient Area di bawah kurva gelombang */}
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
                    <stop offset="60%" stopColor="#526D82" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#27374D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Garis Horizontal Grid Tipis */}
                <line x1="0" y1="30" x2="600" y2="30" stroke="#526D82" strokeOpacity="0.25" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="600" y2="75" stroke="#526D82" strokeOpacity="0.25" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#526D82" strokeOpacity="0.25" strokeDasharray="3 3" />

                {/* Area Fill Berbentuk Gelombang */}
                <path
                  d="M 0 110 
                     C 60 100, 100 120, 160 110 
                     C 220 100, 260 115, 320 85 
                     C 360 65, 390 30, 420 30 
                     C 450 30, 480 65, 520 70 
                     C 550 75, 580 90, 600 95 
                     L 600 150 L 0 150 Z"
                  fill="url(#waveGradient)"
                />

                {/* Garis Kurva Utama Bergelombang (Stroke) */}
                <path
                  d="M 0 110 
                     C 60 100, 100 120, 160 110 
                     C 220 100, 260 115, 320 85 
                     C 360 65, 390 30, 420 30 
                     C 450 30, 480 65, 520 70 
                     C 550 75, 580 90, 600 95"
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Indikator Titik Puncak Hari Aktif (seperti pin bulat di 'May' pada gambar) */}
                <line x1="420" y1="30" x2="420" y2="150" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.8" />
                <circle cx="420" cy="30" r="9" fill="#2dd4bf" fillOpacity="0.25" />
                <circle cx="420" cy="30" r="5" fill="#2dd4bf" stroke="#27374D" strokeWidth="2" />
              </svg>

              {/* Sumbu X: Hari dalam Seminggu / Bulan (dengan pill aktif seperti May di gambar) */}
              <div className="flex items-center justify-between text-[11px] font-medium text-[#9DB2BF] pt-2 px-1">
                <span className="hover:text-[#DDE6ED] cursor-pointer">Sen</span>
                <span className="hover:text-[#DDE6ED] cursor-pointer">Sel</span>
                <span className="hover:text-[#DDE6ED] cursor-pointer">Rab</span>
                <span className="hover:text-[#DDE6ED] cursor-pointer">Kam</span>
                {/* Pill Aktif Hari Ini (seperti pill hijau 'May' di referensi) */}
                <span className="rounded-full bg-teal-400 px-3 py-1 font-bold text-[#27374D] shadow-sm">
                  Jum
                </span>
                <span className="hover:text-[#DDE6ED] cursor-pointer">Sab</span>
                <span className="hover:text-[#DDE6ED] cursor-pointer">Min</span>
              </div>
            </div>

            {/* Metrik Capaian Seminggu */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#526D82]/30 text-center">
              <div className="rounded-xl bg-[#27374D] p-2.5 border border-[#526D82]/40">
                <p className="text-[10px] text-[#9DB2BF]">Total Latihan</p>
                <p className="text-base font-bold text-[#DDE6ED]">45 Menit</p>
              </div>
              <div className="rounded-xl bg-[#27374D] p-2.5 border border-[#526D82]/40">
                <p className="text-[10px] text-[#9DB2BF]">Kasus Diuji</p>
                <p className="text-base font-bold text-teal-300">8 Skenario</p>
              </div>
              <div className="rounded-xl bg-[#27374D] p-2.5 border border-[#526D82]/40">
                <p className="text-[10px] text-[#9DB2BF]">Pesan Divalidasi</p>
                <p className="text-base font-bold text-[#DDE6ED]">14 Pesan</p>
              </div>
              <div className="rounded-xl bg-[#27374D] p-2.5 border border-[#526D82]/40">
                <p className="text-[10px] text-[#9DB2BF]">Sandi Keluarga</p>
                <p className="text-base font-bold text-emerald-400">Aktif</p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SISI KANAN (lg:col-span-5 xl:col-span-4): ITEM 2 & 3                 */}
        {/* =================================================================== */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* --------------------------------------------------------------- */}
          {/* 2. RINGKASAN ATAU PINTASAN SIMULATOR (KALENDER AKTIVITAS)       */}
          {/* --------------------------------------------------------------- */}
          <div className="rounded-3xl border border-[#526D82]/50 bg-[#27374D] p-5 sm:p-6 shadow-sm space-y-4">
            {/* Header Bulan & Tombol Navigasi */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#526D82]/50 text-[#9DB2BF] hover:bg-[#526D82]/30 hover:text-white transition-colors"
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h3 className="text-sm sm:text-base font-bold text-[#DDE6ED]">November 2026</h3>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#526D82]/50 text-[#9DB2BF] hover:bg-[#526D82]/30 hover:text-white transition-colors"
                aria-label="Bulan berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Filter Tabs (seperti '3 month ago, 6 months ago, 1 Year Ago' di referensi) */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#27374D]/80 p-1 border border-[#526D82]/50 text-[10px] font-semibold text-center">
              <button
                type="button"
                onClick={() => setSelectedCalendarTab("prev")}
                className={`py-1.5 rounded-lg transition-colors ${
                  selectedCalendarTab === "prev"
                    ? "bg-[#526D82] text-white shadow-xs"
                    : "text-[#9DB2BF] hover:text-[#DDE6ED]"
                }`}
              >
                3 Hari Lalu
              </button>
              <button
                type="button"
                onClick={() => setSelectedCalendarTab("month")}
                className={`py-1.5 rounded-lg transition-colors ${
                  selectedCalendarTab === "month"
                    ? "bg-[#526D82] text-white shadow-xs"
                    : "text-[#9DB2BF] hover:text-[#DDE6ED]"
                }`}
              >
                Bulan Ini
              </button>
              <button
                type="button"
                onClick={() => setSelectedCalendarTab("year")}
                className={`py-1.5 rounded-lg transition-colors ${
                  selectedCalendarTab === "year"
                    ? "bg-[#526D82] text-white shadow-xs"
                    : "text-[#9DB2BF] hover:text-[#DDE6ED]"
                }`}
              >
                1 Tahun
              </button>
            </div>

            {/* Grid Kalender Hari */}
            <div className="space-y-1">
              <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#9DB2BF] pb-1">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Tanggal: Persis dengan kotak merah di tanggal 4 dan kotak hijau di tanggal 13, 19, 20 */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium">
                {/* Baris 1: 27-30 (bulan lalu), 1, 2 */}
                <span className="py-1.5 text-[#526D82] opacity-40">27</span>
                <span className="py-1.5 text-[#526D82] opacity-40">28</span>
                <span className="py-1.5 text-[#526D82] opacity-40">29</span>
                <span className="py-1.5 text-[#526D82] opacity-40">30</span>
                <span className="py-1.5 text-[#526D82] opacity-40">31</span>
                <span className="py-1.5 text-[#9DB2BF]">1</span>
                <span className="py-1.5 text-[#9DB2BF]">2</span>

                {/* Baris 2: 3, 4 (Merah/Waspada seperti di gambar!), 5, 6, 7, 8, 9 */}
                <span className="py-1.5 text-[#9DB2BF]">3</span>
                {/* Tanggal 4: Kotak Merah / Level Waspada Simulasi */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 4 Nov: Simulasi APK Kurir Belum Diselesaikan")}
                  className="rounded-lg bg-red-600 font-bold text-white shadow-sm hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Simulasi Kasus Belum Selesai"
                >
                  4
                </button>
                <span className="py-1.5 text-[#9DB2BF]">5</span>
                <span className="py-1.5 text-[#9DB2BF]">6</span>
                <span className="py-1.5 text-[#9DB2BF]">7</span>
                <span className="py-1.5 text-[#9DB2BF]">8</span>
                <span className="py-1.5 text-[#9DB2BF]">9</span>

                {/* Baris 3: 10, 11, 12, 13 (Teal/Selesai seperti di gambar!), 14, 15, 16 */}
                <span className="py-1.5 text-[#9DB2BF]">10</span>
                <span className="py-1.5 text-[#9DB2BF]">11</span>
                <span className="py-1.5 text-[#9DB2BF]">12</span>
                {/* Tanggal 13: Kotak Hijau/Teal Selesai */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 13 Nov: Kasus Phishing Perbankan Berhasil Diidentifikasi")}
                  className="rounded-lg bg-teal-500 font-bold text-[#27374D] shadow-sm hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Simulasi Berhasil Diselesaikan"
                >
                  13
                </button>
                <span className="py-1.5 text-[#9DB2BF]">14</span>
                <span className="py-1.5 text-[#9DB2BF]">15</span>
                <span className="py-1.5 text-[#9DB2BF]">16</span>

                {/* Baris 4: 17, 18, 19 (Teal), 20 (Teal), 21, 22, 23 */}
                <span className="py-1.5 text-[#9DB2BF]">17</span>
                <span className="py-1.5 text-[#9DB2BF]">18</span>
                {/* Tanggal 19: Kotak Hijau/Teal Selesai */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 19 Nov: Latihan Refleks Kilat 2 Menit (Skor 9/10)")}
                  className="rounded-lg bg-teal-500 font-bold text-[#27374D] shadow-sm hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Latihan Refleks Selesai"
                >
                  19
                </button>
                {/* Tanggal 20: Kotak Hijau/Teal Selesai */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 20 Nov: Verifikasi Ekstensi Berkas Ganda")}
                  className="rounded-lg bg-teal-500 font-bold text-[#27374D] shadow-sm hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Verifikasi Selesai"
                >
                  20
                </button>
                <span className="py-1.5 text-[#9DB2BF]">21</span>
                <span className="py-1.5 text-[#9DB2BF]">22</span>
                <span className="py-1.5 text-[#9DB2BF]">23</span>

                {/* Baris 5: 24 s.d 30 */}
                <span className="py-1.5 text-[#9DB2BF]">24</span>
                <span className="py-1.5 text-[#9DB2BF]">25</span>
                <span className="py-1.5 text-[#9DB2BF]">26</span>
                <span className="py-1.5 text-[#9DB2BF]">27</span>
                <span className="py-1.5 text-[#9DB2BF]">28</span>
                <span className="py-1.5 text-[#9DB2BF]">29</span>
                <span className="py-1.5 text-[#9DB2BF]">30</span>
              </div>
            </div>

            {/* Info Klik Tanggal */}
            {selectedDayInfo && (
              <div className="rounded-xl bg-[#526D82]/30 p-2.5 border border-[#526D82] text-xs text-[#DDE6ED] flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-300 shrink-0" />
                <span className="leading-snug">{selectedDayInfo}</span>
              </div>
            )}

            {/* Pintasan Simulator Aktif */}
            <div className="rounded-2xl border border-[#526D82]/60 bg-[#27374D]/90 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <CalendarIcon className="h-4 w-4" />
                <span>Pintasan Simulator Aktif</span>
              </div>
              <p className="text-xs text-[#DDE6ED] font-bold">
                Kasus 1: Skenario Undangan Pernikahan APK
              </p>
              <p className="text-[11px] text-[#9DB2BF] leading-tight">
                Simulasi keputusan saat menerima pesan berformat .apk dari nomor tak dikenal.
              </p>
              <Link to="/latih" className="block pt-1">
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#DDE6ED] py-2 text-xs font-bold text-[#27374D] hover:bg-white active:scale-98 transition-all shadow-sm"
                >
                  Lanjutkan Simulasi
                </button>
              </Link>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* 3. RINGKASAN KAMUS KATA YANG POPULAR (UPCOMING TASK LIST)        */}
          {/* --------------------------------------------------------------- */}
          <div className="rounded-3xl border border-[#526D82]/50 bg-[#27374D] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#DDE6ED]">Kamus & Modus Populer</h3>
              <span className="text-[11px] text-[#9DB2BF]">Diperbarui Mingguan</span>
            </div>

            {/* List Istilah Mirip Daftar Upcoming Task di Referensi */}
            <div className="space-y-3">
              {POPULAR_TERMS.map((term) => {
                const TermIcon = term.icon;
                return (
                  <Link
                    key={term.id}
                    to="/kamus"
                    className="group flex items-center justify-between rounded-2xl border border-[#526D82]/40 bg-[#27374D] p-3 hover:border-[#9DB2BF] hover:bg-[#526D82]/15 transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Thumbnail Ikon */}
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${term.color}`}>
                        <TermIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#DDE6ED] group-hover:text-teal-300 transition-colors truncate">
                          {term.term}
                        </h4>
                        <p className="text-[10px] text-[#9DB2BF] truncate">{term.desc}</p>
                        <p className="text-[9px] text-[#526D82] font-semibold mt-0.5">
                          {term.category} · {term.date}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#9DB2BF] group-hover:text-[#DDE6ED] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                );
              })}
            </div>

            {/* Tombol See All (Lihat Semua Kamus) */}
            <div className="pt-1">
              <Link
                to="/kamus"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white transition-colors"
              >
                <span>Lihat Semua Istilah & Modus (10)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Tetap Sesuai Kontrak */}
      <Disclaimer />
    </div>
  );
}
