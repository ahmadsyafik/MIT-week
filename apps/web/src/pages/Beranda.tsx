import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Compass,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  AlertCircle,
  FileCode,
  Users,
  Smartphone,
  CheckCircle2,
  OctagonAlert,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Disclaimer } from "../components/ui";

// Data Modul Pintasan (Item 6)
const MODULE_SHORTCUTS = [
  {
    id: "kasus-1",
    title: "Verifikasi Kontak & Sumber Resmi",
    category: "Skenario 1 · Dasar",
    author: "Tim Literasi JR",
    steps: 3,
    duration: "2 Mnt",
    progress: 100,
    accent: "from-emerald-50 to-emerald-100/40",
    badge: "Aman Selesai",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-300",
    dotColor: "bg-emerald-500",
    icon: CheckCircle2,
  },
  {
    id: "kasus-2",
    title: "Undangan APK & Modus Foto Paket",
    category: "Skenario 2 · Menengah",
    author: "Satgas Rekayasa Sosial",
    steps: 5,
    duration: "4 Mnt",
    progress: 60,
    accent: "from-amber-50 to-amber-100/40",
    badge: "Level Waspada",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
    dotColor: "bg-amber-500",
    icon: AlertTriangle,
  },
  {
    id: "kasus-3",
    title: "Loker WFH & Deposit Rekening",
    category: "Skenario 3 · Kritis",
    author: "Unit Anti-Phishing Forensik",
    steps: 4,
    duration: "3 Mnt",
    progress: 20,
    accent: "from-rose-50 to-rose-100/40",
    badge: "Risiko Kritis",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-300",
    dotColor: "bg-rose-500",
    icon: OctagonAlert,
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
    color: "bg-[#DDE6ED] text-[#27374D] border-[#9DB2BF]",
  },
  {
    id: "social-engineering",
    term: "Social Engineering",
    desc: "Manipulasi psikologis panik & rasa bersalah",
    category: "Manipulasi Sosial",
    date: "20 Nov 2026",
    icon: Users,
    color: "bg-[#DDE6ED] text-[#27374D] border-[#9DB2BF]",
  },
  {
    id: "sim-swap",
    term: "SIM Swap Fraud",
    desc: "Kloning nomor HP untuk bobol verifikasi bank",
    category: "Identitas",
    date: "18 Nov 2026",
    icon: Smartphone,
    color: "bg-[#DDE6ED] text-[#27374D] border-[#9DB2BF]",
  },
];

export default function Beranda() {
  const { user, isAuthenticated, openLoginModal } = useAuth();
  const [selectedCalendarTab, setSelectedCalendarTab] = useState<"prev" | "month" | "year">("month");
  const [selectedDayInfo, setSelectedDayInfo] = useState<string | null>(null);

  // =========================================================================
  // KONDISI 1: PENGUNJUNG BELUM LOGIN (LANDING PAGE VIEW)
  // Background: DDE6ED, Font: 27374D, Aksen: 526D82, Kontras: 9DB2BF
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="space-y-12 py-4">
        {/* Hero Section */}
        <section className="space-y-5 text-center max-w-3xl mx-auto pt-6 sm:pt-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-[#27374D] border border-[#9DB2BF]/60 shadow-xs">
            Studi Kasus: MIT-Week 2026 · Guardians of the Digital Space
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#27374D] sm:text-4xl md:text-5xl leading-tight">
            Cek. Latih. Lindungi.
          </h1>
          <p className="text-base sm:text-lg text-[#526D82] leading-relaxed max-w-2xl mx-auto">
            Platform interaktif untuk membantu anak muda mengenali tipuan digital, mengasah insting keputusan,
            dan tahu tindakan mitigasi tepat saat menghadapi situasi mencurigakan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={openLoginModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#526D82] px-6 py-3 text-sm font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Masuk Sekarang</span>
            </button>
            <a
              href="#tiga-pilar"
              className="inline-flex items-center justify-center rounded-xl border border-[#9DB2BF] bg-white px-6 py-3 text-sm font-semibold text-[#27374D] hover:bg-[#DDE6ED]/60 transition-all cursor-pointer shadow-xs"
            >
              Pelajari Fitur
            </a>
          </div>

          <p className="text-xs text-[#526D82] pt-2">
            *Privasi 100% on-device di perambanmu. Tidak memerlukan email, password, ataupun registrasi server.
          </p>
        </section>

        {/* 3 Pilar Utama */}
        <section id="tiga-pilar" className="space-y-6 pt-4 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#27374D] sm:text-2xl">Tiga Pilar Utama</h2>
            <p className="text-sm text-[#526D82]">Kombinasi analisis teknis, pelatihan insting, dan panduan mitigasi.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl border border-[#9DB2BF]/50 bg-white p-6 shadow-xs hover:border-[#526D82] transition-all">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#27374D]">1. Cek Pesan & Berkas</h3>
                <p className="text-xs text-[#526D82] leading-relaxed">
                  Deteksi indikasi rekayasa sosial, tautan mencurigakan, dan ekstensi berkas berbahaya secara mandiri di perangkat.
                </p>
              </div>
              <div className="pt-5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-xl bg-[#526D82] py-2 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Periksa Sekarang
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#9DB2BF]/50 bg-white p-6 shadow-xs hover:border-[#526D82] transition-all">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#27374D]">2. Latih Keputusanmu</h3>
                <p className="text-xs text-[#526D82] leading-relaxed">
                  Simulasi skenario bercabang (undangan APK, loker palsu, kurir paket) untuk menguji refleks keputusanmu.
                </p>
              </div>
              <div className="pt-5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-xl bg-[#526D82] py-2 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Mulai Latihan
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#9DB2BF]/50 bg-white p-6 shadow-xs hover:border-[#526D82] transition-all">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#27374D]">3. Lindungi Sekitarmu</h3>
                <p className="text-xs text-[#526D82] leading-relaxed">
                  Panduan tindakan darurat berurutan, kanal lapor resmi terverifikasi, dan pembuatan kartu peringatan keluarga.
                </p>
              </div>
              <div className="pt-5">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-xl bg-[#526D82] py-2 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
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
  // Background: DDE6ED, Font: 27374D, Side bar: 526D82, Kontras: 9DB2BF
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
          <div className="relative overflow-hidden rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2 max-w-md z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#DDE6ED] px-3 py-0.5 text-[11px] font-bold text-[#27374D] border border-[#9DB2BF]/60">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span>Sesi Aktif Digital Guardian</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#27374D] tracking-tight">
                  Welcome Back !
                </h1>
                <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
                  Latih insting pertahanan digitalmu hari ini melalui skenario interaktif dan analisis indikasi rekayasa sosial.
                </p>

                {/* Progress Bar Latihan */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#27374D]">Course Progress</span>
                    <span className="text-[#526D82] font-extrabold">82%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#DDE6ED] border border-[#9DB2BF]/50 p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#526D82] to-[#27374D] transition-all duration-500 shadow-xs"
                      style={{ width: "82%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Ilustrasi Isometrik Buku & Topi Wisuda */}
              <div className="relative shrink-0 flex items-center justify-center sm:pr-4">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#DDE6ED] blur-xl" />

                  {/* SVG Isometric Books & Graduation Hat */}
                  <svg viewBox="0 0 160 140" className="h-32 w-32 drop-shadow-md" fill="none">
                    {/* Shadow Bawah */}
                    <ellipse cx="80" cy="120" rx="55" ry="14" fill="#9DB2BF" opacity="0.4" />

                    {/* Buku Dasar (Buku 1 - Slate Dark) */}
                    <path d="M40 95 L80 115 L120 95 L80 75 Z" fill="#27374D" />
                    <path d="M40 95 L80 115 L80 123 L40 103 Z" fill="#1e2a3a" />
                    <path d="M120 95 L80 115 L80 123 L120 103 Z" fill="#27374D" />

                    {/* Buku Tengah (Buku 2 - Slate Blue) */}
                    <path d="M44 82 L80 100 L116 82 L80 64 Z" fill="#526D82" />
                    <path d="M44 82 L80 100 L80 108 L44 90 Z" fill="#415668" />
                    <path d="M116 82 L80 100 L80 108 L116 90 Z" fill="#526D82" />

                    {/* Buku Atas (Buku 3 - Soft Light Accent) */}
                    <path d="M48 69 L80 85 L112 69 L80 53 Z" fill="#9DB2BF" />
                    <path d="M48 69 L80 85 L80 93 L48 77 Z" fill="#889da9" />
                    <path d="M112 69 L80 85 L80 93 L112 77 Z" fill="#9DB2BF" />

                    {/* Topi Wisuda Isometrik */}
                    <path d="M80 20 L125 38 L80 56 L35 38 Z" fill="#27374D" stroke="#526D82" strokeWidth="2" />
                    <path d="M60 48 L80 56 L100 48 L100 62 C100 68 60 68 60 62 Z" fill="#1e2a3a" />
                    {/* Tali Rumbai Emas */}
                    <circle cx="80" cy="38" r="3" fill="#f59e0b" />
                    <path d="M80 38 Q110 42 118 60" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                    <rect x="115" y="58" width="6" height="8" rx="2" fill="#d97706" />
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
              <h2 className="text-base sm:text-lg font-bold text-[#27374D]">Modul Pembelajaran</h2>
              <Link to="/latih" className="text-xs font-bold text-[#526D82] hover:text-[#27374D] transition-colors">
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
                    className="group flex flex-col justify-between rounded-2xl border border-[#9DB2BF]/50 bg-white p-4 hover:border-[#526D82] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="space-y-3">
                      {/* Ilustrasi Thumbnail Modul */}
                      <div className={`flex h-28 w-full items-center justify-center rounded-xl bg-gradient-to-br ${m.accent} border border-[#9DB2BF]/40 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#526D82] border border-[#9DB2BF]/50 shadow-xs">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold border shadow-2xs ${m.badgeColor}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${m.dotColor}`} />
                          {m.badge}
                        </span>
                      </div>

                      {/* Judul & Keterangan */}
                      <div>
                        <h3 className="text-sm font-bold text-[#27374D] group-hover:text-[#526D82] transition-colors line-clamp-1">
                          {m.title}
                        </h3>
                        <p className="text-[11px] text-[#526D82] mt-0.5">{m.author}</p>
                      </div>
                    </div>

                    {/* Stats Bawah: Langkah, Durasi, Progres */}
                    <div className="pt-4 border-t border-[#9DB2BF]/30 mt-3 flex items-center justify-between text-[11px] text-[#526D82]">
                      <div className="flex items-center gap-1">
                        <Compass className="h-3.5 w-3.5 text-[#9DB2BF]" />
                        <span>{m.steps} Kasus</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3.5 w-3.5 text-[#9DB2BF]" />
                        <span>{m.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-[#27374D]">
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
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#27374D]">Activities</h3>
                <p className="text-xs text-[#526D82]">Grafik intensitas penyelesaian simulasi & latihan dalam seminggu</p>
              </div>

              {/* Legend Indikator Skenario Merah Kuning Hijau */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200" />
                  <span className="font-semibold text-rose-800">Bahaya</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200" />
                  <span className="font-semibold text-amber-800">Waspada</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                  <span className="font-semibold text-emerald-800">Aman</span>
                </div>
              </div>
            </div>

            {/* SVG Wave Graph Container */}
            <div className="relative pt-4 pb-2">
              <svg viewBox="0 0 600 160" className="w-full h-36 sm:h-44 overflow-visible" preserveAspectRatio="none">
                <defs>
                  {/* Gradient Area di bawah kurva gelombang */}
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#526D82" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#9DB2BF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#DDE6ED" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Garis Horizontal Grid Tipis */}
                <line x1="0" y1="30" x2="600" y2="30" stroke="#9DB2BF" strokeOpacity="0.35" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="600" y2="75" stroke="#9DB2BF" strokeOpacity="0.35" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#9DB2BF" strokeOpacity="0.35" strokeDasharray="3 3" />

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

                {/* Garis Kurva Utama Bergelombang (Stroke: 526D82) */}
                <path
                  d="M 0 110 
                     C 60 100, 100 120, 160 110 
                     C 220 100, 260 115, 320 85 
                     C 360 65, 390 30, 420 30 
                     C 450 30, 480 65, 520 70 
                     C 550 75, 580 90, 600 95"
                  fill="none"
                  stroke="#526D82"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Indikator Titik Skenario Hijau (Rabu: Selesai Aman) */}
                <circle cx="160" cy="110" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="160" cy="110" r="9" fill="#10b981" fillOpacity="0.2" />

                {/* Indikator Titik Skenario Kuning (Kamis: Waspada) */}
                <circle cx="320" cy="85" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <circle cx="320" cy="85" r="9" fill="#f59e0b" fillOpacity="0.2" />

                {/* Indikator Titik Puncak Skenario Merah (Jumat: Kritis) */}
                <line x1="420" y1="30" x2="420" y2="150" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.8" />
                <circle cx="420" cy="30" r="10" fill="#f43f5e" fillOpacity="0.25" />
                <circle cx="420" cy="30" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Sumbu X: Hari dalam Seminggu */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#526D82] pt-2 px-1">
                <span className="hover:text-[#27374D] cursor-pointer">Sen</span>
                <span className="hover:text-[#27374D] cursor-pointer">Sel</span>
                <span className="hover:text-[#27374D] cursor-pointer">Rab</span>
                <span className="hover:text-[#27374D] cursor-pointer">Kam</span>
                {/* Pill Aktif Hari Ini */}
                <span className="rounded-full bg-[#526D82] px-3 py-1 font-bold text-white shadow-xs">
                  Jum
                </span>
                <span className="hover:text-[#27374D] cursor-pointer">Sab</span>
                <span className="hover:text-[#27374D] cursor-pointer">Min</span>
              </div>
            </div>

            {/* Metrik Capaian Seminggu */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#9DB2BF]/30 text-center">
              <div className="rounded-xl bg-[#DDE6ED]/50 p-2.5 border border-[#9DB2BF]/40">
                <p className="text-[10px] text-[#526D82]">Total Latihan</p>
                <p className="text-base font-extrabold text-[#27374D]">45 Menit</p>
              </div>
              <div className="rounded-xl bg-[#DDE6ED]/50 p-2.5 border border-[#9DB2BF]/40">
                <p className="text-[10px] text-[#526D82]">Kasus Diuji</p>
                <p className="text-base font-extrabold text-[#27374D]">8 Skenario</p>
                {/* Indikator Merah Kuning Hijau */}
                <div className="mt-1 flex items-center justify-center gap-1.5 text-[9px] font-bold">
                  <span className="inline-flex items-center gap-0.5 text-rose-600" title="3 Skenario Kritis">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" /> 3
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-0.5 text-amber-600" title="3 Skenario Waspada">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> 3
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-0.5 text-emerald-600" title="2 Skenario Aman">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 2
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-[#DDE6ED]/50 p-2.5 border border-[#9DB2BF]/40">
                <p className="text-[10px] text-[#526D82]">Pesan Divalidasi</p>
                <p className="text-base font-extrabold text-[#27374D]">14 Pesan</p>
              </div>
              <div className="rounded-xl bg-[#DDE6ED]/50 p-2.5 border border-[#9DB2BF]/40">
                <p className="text-[10px] text-[#526D82]">Sandi Keluarga</p>
                <p className="text-base font-extrabold text-[#27374D]">Aktif</p>
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
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            {/* Header Bulan & Tombol Navigasi */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#9DB2BF]/50 text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D] transition-colors"
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h3 className="text-sm sm:text-base font-bold text-[#27374D]">November 2026</h3>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#9DB2BF]/50 text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D] transition-colors"
                aria-label="Bulan berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Filter Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#DDE6ED]/60 p-1 border border-[#9DB2BF]/50 text-[10px] font-bold text-center">
              <button
                type="button"
                onClick={() => setSelectedCalendarTab("prev")}
                className={`py-1.5 rounded-lg transition-colors ${
                  selectedCalendarTab === "prev"
                    ? "bg-[#526D82] text-white shadow-xs"
                    : "text-[#526D82] hover:text-[#27374D]"
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
                    : "text-[#526D82] hover:text-[#27374D]"
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
                    : "text-[#526D82] hover:text-[#27374D]"
                }`}
              >
                1 Tahun
              </button>
            </div>

            {/* Grid Kalender Hari */}
            <div className="space-y-1">
              <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#526D82] pb-1">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Tanggal */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold">
                {/* Baris 1: 27-30 (bulan lalu), 1, 2 */}
                <span className="py-1.5 text-[#9DB2BF] opacity-50">27</span>
                <span className="py-1.5 text-[#9DB2BF] opacity-50">28</span>
                <span className="py-1.5 text-[#9DB2BF] opacity-50">29</span>
                <span className="py-1.5 text-[#9DB2BF] opacity-50">30</span>
                <span className="py-1.5 text-[#9DB2BF] opacity-50">31</span>
                <span className="py-1.5 text-[#27374D]">1</span>
                <span className="py-1.5 text-[#27374D]">2</span>

                {/* Baris 2: 3, 4 (Merah Waspada), 5, 6, 7, 8, 9 */}
                <span className="py-1.5 text-[#27374D]">3</span>
                {/* Tanggal 4: Kotak Merah Simulasi Belum Selesai */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 4 Nov: Simulasi APK Kurir Belum Diselesaikan")}
                  className="rounded-lg bg-rose-500 font-bold text-white shadow-xs hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Skenario Risiko Kritis"
                >
                  4
                </button>
                <span className="py-1.5 text-[#27374D]">5</span>
                <span className="py-1.5 text-[#27374D]">6</span>
                <span className="py-1.5 text-[#27374D]">7</span>
                <span className="py-1.5 text-[#27374D]">8</span>
                <span className="py-1.5 text-[#27374D]">9</span>

                {/* Baris 3: 10, 11, 12, 13 (Selesai), 14, 15, 16 */}
                <span className="py-1.5 text-[#27374D]">10</span>
                <span className="py-1.5 text-[#27374D]">11</span>
                <span className="py-1.5 text-[#27374D]">12</span>
                {/* Tanggal 13: Kotak Selesai */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 13 Nov: Kasus Phishing Perbankan (Level Waspada)")}
                  className="rounded-lg bg-amber-500 font-bold text-white shadow-xs hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Skenario Level Waspada"
                >
                  13
                </button>
                <span className="py-1.5 text-[#27374D]">14</span>
                <span className="py-1.5 text-[#27374D]">15</span>
                <span className="py-1.5 text-[#27374D]">16</span>

                {/* Baris 4: 17, 18, 19, 20, 21, 22, 23 */}
                <span className="py-1.5 text-[#27374D]">17</span>
                <span className="py-1.5 text-[#27374D]">18</span>
                {/* Tanggal 19 */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 19 Nov: Latihan Refleks Selesai (Tingkat Aman)")}
                  className="rounded-lg bg-emerald-600 font-bold text-white shadow-xs hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Skenario Selesai Aman"
                >
                  19
                </button>
                {/* Tanggal 20 */}
                <button
                  type="button"
                  onClick={() => setSelectedDayInfo("Tgl 20 Nov: Verifikasi Ekstensi Berkas Selesai (Tingkat Aman)")}
                  className="rounded-lg bg-emerald-600 font-bold text-white shadow-xs hover:scale-105 transition-transform flex items-center justify-center py-1.5"
                  title="Skenario Selesai Aman"
                >
                  20
                </button>
                <span className="py-1.5 text-[#27374D]">21</span>
                <span className="py-1.5 text-[#27374D]">22</span>
                <span className="py-1.5 text-[#27374D]">23</span>

                {/* Baris 5: 24 s.d 30 */}
                <span className="py-1.5 text-[#27374D]">24</span>
                <span className="py-1.5 text-[#27374D]">25</span>
                <span className="py-1.5 text-[#27374D]">26</span>
                <span className="py-1.5 text-[#27374D]">27</span>
                <span className="py-1.5 text-[#27374D]">28</span>
                <span className="py-1.5 text-[#27374D]">29</span>
                <span className="py-1.5 text-[#27374D]">30</span>
              </div>
            </div>

            {/* Legend Kalender Indikator Merah Kuning Hijau */}
            <div className="flex items-center justify-between text-[10px] text-[#526D82] px-1 pt-1 border-t border-[#9DB2BF]/20">
              <span className="flex items-center gap-1 font-semibold text-rose-700">
                <span className="h-2 w-2 rounded-full bg-rose-500" /> Kritis
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-700">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Waspada
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-600" /> Aman
              </span>
            </div>

            {/* Info Klik Tanggal */}
            {selectedDayInfo && (
              <div className="rounded-xl bg-[#DDE6ED] p-2.5 border border-[#9DB2BF]/60 text-xs text-[#27374D] flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="leading-snug">{selectedDayInfo}</span>
              </div>
            )}

            {/* Pintasan Simulator Aktif */}
            <div className="rounded-2xl border border-[#9DB2BF]/50 bg-[#DDE6ED]/40 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#526D82]">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Pintasan Simulator Aktif</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-700 border border-rose-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" /> Skenario Kritis
                </span>
              </div>
              <p className="text-xs text-[#27374D] font-extrabold">
                Kasus 1: Skenario Undangan Pernikahan APK
              </p>
              <p className="text-[11px] text-[#526D82] leading-tight">
                Simulasi keputusan saat menerima pesan berformat .apk dari nomor tak dikenal.
              </p>
              <Link to="/latih" className="block pt-1">
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#526D82] py-2 text-xs font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-xs"
                >
                  Lanjutkan Simulasi
                </button>
              </Link>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* 3. RINGKASAN KAMUS KATA YANG POPULAR (UPCOMING TASK LIST)        */}
          {/* --------------------------------------------------------------- */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#27374D]">Kamus & Modus Populer</h3>
              <span className="text-[11px] text-[#526D82]">Diperbarui Mingguan</span>
            </div>

            {/* List Istilah */}
            <div className="space-y-3">
              {POPULAR_TERMS.map((term) => {
                const TermIcon = term.icon;
                return (
                  <Link
                    key={term.id}
                    to="/kamus"
                    className="group flex items-center justify-between rounded-2xl border border-[#9DB2BF]/40 bg-white p-3 hover:border-[#526D82] hover:bg-[#DDE6ED]/30 transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Thumbnail Ikon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#9DB2BF]/50 bg-[#DDE6ED] text-[#27374D]">
                        <TermIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#27374D] group-hover:text-[#526D82] transition-colors truncate">
                          {term.term}
                        </h4>
                        <p className="text-[10px] text-[#526D82] truncate">{term.desc}</p>
                        <p className="text-[9px] text-[#9DB2BF] font-semibold mt-0.5">
                          {term.category} · {term.date}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#9DB2BF] group-hover:text-[#27374D] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                );
              })}
            </div>

            {/* Tombol See All (Lihat Semua Kamus) */}
            <div className="pt-1">
              <Link
                to="/kamus"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526D82] hover:text-[#27374D] transition-colors"
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
