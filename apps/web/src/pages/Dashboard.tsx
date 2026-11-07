import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  ArrowRight,
  FileCode,
  Users,
  Smartphone,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Disclaimer } from "../components/ui";
import { LEARNING_MODULES } from "./Belajar";

// Data Istilah Populer untuk Dashboard
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
  {
    id: "phishing-web",
    term: "Phishing Website",
    desc: "Situs tiruan pencuri kredensial & PIN bank",
    category: "Penipuan Web",
    date: "16 Nov 2026",
    icon: Globe,
    color: "bg-[#DDE6ED] text-[#27374D] border-[#9DB2BF]",
  },
];

export default function Dashboard() {
  // Status modul yang sudah dibaca (tersinkronisasi dengan localStorage dari Belajar.tsx)
  const [readModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("jagaruang_read_modules");
      return saved ? JSON.parse(saved) : ["m3", "m6"];
    } catch {
      return ["m3", "m6"];
    }
  });

  return (
    <div className="space-y-6">
      {/* =================================================================== */}
      {/* BARIS 1: WELCOME BACK & MODUL PEMBELAJARAN (KIRI) + PINTASAN SIMULATOR (KANAN) */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sisi Kiri (lg:col-span-7 xl:col-span-8): Welcome Back & Modul Pembelajaran */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
          {/* --------------------------------------------------------------- */}
          {/* 1. WELCOME BACK BANNER                                           */}
          {/* --------------------------------------------------------------- */}
          <div className="relative overflow-hidden rounded-3xl border border-[#9DB2BF]/50 bg-white p-7 sm:p-8 lg:p-9 shadow-xs flex-1 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 lg:gap-8">
              <div className="space-y-3 max-w-lg z-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#27374D] tracking-tight">
                  Welcome Back !
                </h1>
                <p className="text-sm sm:text-base text-[#526D82] leading-relaxed">
                  Latih insting pertahanan digitalmu hari ini melalui skenario interaktif dan analisis indikasi rekayasa sosial.
                </p>

                {/* Progress Bar Latihan */}
                <div className="pt-3 sm:pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-[#27374D]">Course Progress</span>
                    <span className="text-[#526D82] font-extrabold text-sm sm:text-base">82%</span>
                  </div>
                  <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#DDE6ED] border border-[#9DB2BF]/50 p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#526D82] to-[#27374D] transition-all duration-500 shadow-xs"
                      style={{ width: "82%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Ilustrasi Isometrik Buku & Topi Wisuda */}
              <div className="relative shrink-0 flex items-center justify-center sm:pr-4">
                <div className="relative flex h-36 w-36 sm:h-40 sm:w-40 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#DDE6ED] blur-2xl" />

                  {/* SVG Isometric Books & Graduation Hat */}
                  <svg viewBox="0 0 160 140" className="h-36 w-36 sm:h-40 sm:w-40 drop-shadow-md" fill="none">
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
          {/* 2. PINTASAN MENUJU MODUL PEMBELAJARAN                            */}
          {/* --------------------------------------------------------------- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[#27374D]">Modul Pembelajaran</h2>
              <Link to="/belajar?tab=modul" className="text-xs font-bold text-[#526D82] hover:text-[#27374D] transition-colors">
                Lihat Semua Modul →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LEARNING_MODULES.slice(0, 3).map((m) => {
                const isRead = readModules.includes(m.id);
                return (
                  <Link
                    key={m.id}
                    to={`/belajar?tab=modul&module=${m.id}`}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-[#526D82] hover:shadow-md transition-all cursor-pointer space-y-4"
                  >
                    {/* Judul & Deskripsi */}
                    <div className="space-y-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#27374D] leading-snug group-hover:text-blue-900 transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-xs text-[#526D82] leading-relaxed line-clamp-2">
                        {m.summary}
                      </p>
                    </div>

                    {/* Footer: Status di kiri pojok & Aksi Baca Modul di kanan */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      {isRead ? (
                        <span className="font-medium text-emerald-600">
                          Sudah dibaca
                        </span>
                      ) : (
                        <span className="font-medium text-[#526D82]">
                          Belum dibaca
                        </span>
                      )}
                      <span className="font-bold text-[#27374D] group-hover:underline flex items-center gap-0.5">
                        Baca Modul <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sisi Kanan (lg:col-span-5 xl:col-span-4): Pintasan Simulator Aktif */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
          {/* --------------------------------------------------------------- */}
          {/* 3. PINTASAN SIMULATOR AKTIF                                     */}
          {/* --------------------------------------------------------------- */}
          <div className="relative overflow-hidden rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between h-full space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#27374D]">Pintasan Simulator</h3>
            </div>

            {/* Gambar Cuplikan Chat Skenario K1 */}
            <div className="relative overflow-hidden rounded-2xl border border-[#9DB2BF]/40 bg-[#DDE6ED]/40 shadow-xs group/thumb flex-1 min-h-[160px] max-h-[220px]">
              <img
                src="/simulator/k1-chat-snippet.svg"
                alt="Cuplikan Chat Simulator K1"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-[1.02]"
              />
            </div>

            {/* Judul & Keterangan Skenario */}
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black text-[#27374D] tracking-tight">
                Undangan Pernikahan APK
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Simulasi keputusan saat menerima pesan berformat .apk dari nomor tak dikenal.
              </p>
            </div>

            {/* Info Status / Metadata Bar */}
            <div className="pt-3 border-t border-[#9DB2BF]/30 flex items-center justify-between text-xs text-[#526D82]">
              <div className="flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-[#9DB2BF]" />
                <span className="text-[11px] font-medium">Durasi: ~2 Menit</span>
              </div>
            </div>

            {/* Tombol Aksi Menuju Simulator */}
            <Link to="/belajar?tab=simulator&scenario=k1" className="block pt-1">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#27374D] hover:bg-[#1e2b3d] text-white py-2.5 px-4 text-xs font-bold transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                <span>Lanjutkan Simulasi</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* BARIS 2: ACTIVITIES (KIRI) + KAMUS & MODUS POPULER (KANAN)         */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sisi Kiri (lg:col-span-7 xl:col-span-8): Grafik Pembelajaran Mingguan */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
          {/* --------------------------------------------------------------- */}
          {/* 4. GRAFIK PEMBELAJARAN DALAM SEMINGGU (ACTIVITIES WAVE CHART)    */}
          {/* --------------------------------------------------------------- */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#27374D]">Activities</h3>
                <p className="text-xs text-[#526D82]">Grafik intensitas penyelesaian simulasi & latihan dalam seminggu</p>
              </div>

              {/* Legend Ringkas */}
              <div className="flex items-center gap-4 text-xs text-[#526D82]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#526D82]" />
                  <span>Skenario Selesai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#9DB2BF]" />
                  <span>Rata-rata Waktu</span>
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

                {/* Indikator Titik Puncak Hari Aktif */}
                <line x1="420" y1="30" x2="420" y2="150" stroke="#526D82" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.8" />
                <circle cx="420" cy="30" r="9" fill="#526D82" fillOpacity="0.25" />
                <circle cx="420" cy="30" r="5" fill="#526D82" stroke="#ffffff" strokeWidth="2" />
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

        {/* Sisi Kanan (lg:col-span-5 xl:col-span-4): Kamus & Modus Populer */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
          {/* --------------------------------------------------------------- */}
          {/* 5. RINGKASAN KAMUS KATA YANG POPULAR                            */}
          {/* --------------------------------------------------------------- */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs flex flex-col h-full">
            <div className="mb-3.5">
              <h3 className="text-base font-bold text-[#27374D]">Kamus & Modus Populer</h3>
            </div>

            {/* List 4 Istilah Populer */}
            <div className="space-y-2.5 flex-1 flex flex-col justify-start">
              {POPULAR_TERMS.map((term) => {
                const TermIcon = term.icon;
                return (
                  <Link
                    key={term.id}
                    to="/belajar?tab=kamus"
                    className="group flex items-center justify-between rounded-2xl border border-[#9DB2BF]/40 bg-white p-2.5 sm:p-3 hover:border-[#526D82] hover:bg-[#DDE6ED]/30 transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Thumbnail Ikon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#9DB2BF]/50 bg-[#DDE6ED] text-[#27374D]">
                        <TermIcon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#27374D] group-hover:text-[#526D82] transition-colors truncate">
                          {term.term}
                        </h4>
                        <p className="text-[10px] text-[#526D82] truncate">{term.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#9DB2BF] group-hover:text-[#27374D] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                );
              })}
            </div>

            {/* Tombol See All (Lihat Semua Kamus) */}
            <div className="pt-3 mt-3 border-t border-[#9DB2BF]/20">
              <Link
                to="/belajar?tab=kamus"
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

