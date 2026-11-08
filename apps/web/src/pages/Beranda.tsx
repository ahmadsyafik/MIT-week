import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Compass,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  Smartphone,
  FileCode,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Disclaimer } from "../components/ui";
import ThreeHeroCanvas from "../components/ThreeHeroCanvas";

// Data Modul Pintasan / Pilihan Kasus di Landing Page
const MODULE_SHORTCUTS = [
  {
    id: "kasus-1",
    scenarioId: "k1",
    title: "Undangan APK Palsu",
    category: "Studi Kasus 1",
    author: "Tim Forensik JR",
    channel: "WhatsApp",
    steps: 4,
    duration: "3 Mnt",
    progress: 80,
    accent: "from-[#DDE6ED] to-[#9DB2BF]/30",
    coverImage: "/simulator/covers/undangan-digital.jpg",
    icon: Smartphone,
  },
  {
    id: "kasus-2",
    scenarioId: "k2",
    title: "Kurir Paket & Foto Resi",
    category: "Studi Kasus 2",
    author: "Satgas Rekayasa Sosial",
    channel: "WhatsApp",
    steps: 5,
    duration: "4 Mnt",
    progress: 40,
    accent: "from-[#DDE6ED] to-[#526D82]/20",
    coverImage: "/simulator/covers/paket.jpg",
    icon: Search,
  },
  {
    id: "kasus-3",
    scenarioId: "k3",
    title: "Loker WFH & Deposit",
    category: "Studi Kasus 3",
    author: "Unit Anti-Phishing",
    channel: "Media Sosial",
    steps: 4,
    duration: "3 Mnt",
    progress: 0,
    accent: "from-[#DDE6ED] to-[#9DB2BF]/40",
    coverImage: "/simulator/covers/work-from-home.jpg",
    icon: FileCode,
  },
];

// Data FAQ untuk Landing Page
const FAQ_ITEMS = [
  {
    q: "Apakah tautan yang saya periksa akan dibuka oleh server JagaRuang?",
    a: "Tidak pernah. Pemeriksaan tautan hanya menganalisis struktur string URL (ekstensi, karakter aneh, domain tiruan, dan TLD mencurigakan) langsung di dalam peramban perangkatmu (on-device).",
  },
  {
    q: "Apakah file APK atau dokumen saya dibaca atau diunggah ke internet?",
    a: "Sama sekali tidak. JagaRuang tidak pernah mengunggah atau membaca isi dokumenmu. Sistem hanya memeriksa nama dan ekstensi berkas untuk mendeteksi ekstensi ganda berbahaya (seperti .pdf.apk).",
  },
  {
    q: "Apakah saya harus mendaftar dengan email atau membuat password?",
    a: "Tidak perlu. Cukup masukkan nama panggilan atau alias saat masuk untuk menandai sesi belajar lokalmu di browser ini.",
  },
  {
    q: "Apakah JagaRuang menjamin keamanan 100% dari segala bentuk penipuan?",
    a: "Tidak ada sistem yang dapat menjamin keamanan mutlak. JagaRuang adalah platform edukasi berbasis aturan yang memberikan indikasi awal dan panduan mitigasi saat kamu merasa curiga.",
  },
];

export default function Beranda() {
  const { isAuthenticated, openLoginModal } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 space-y-20 py-4" id="beranda">
      {/* ================================================================= */}
      {/* HERO SECTION DENGAN THREE.JS                                     */}
      {/* ================================================================= */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4 sm:pt-8">
        {/* Kolom Kiri: Tipografi Hero Tebal & CTA Pill */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#27374D] leading-[1.12]">
            Lindungi Dirimu Dari Tipuan Digital Dengan Aman!
          </h1>

          <p className="text-base sm:text-lg text-[#526D82] leading-relaxed max-w-xl">
            Kenali rekayasa sosial, deteksi tautan mencurigakan, dan asah refleks keamanan digitalmu secara
            mandiri — 100% on-device langsung di perambanmu tanpa server luar.
          </p>

          {/* Tombol Aksi Pill */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#526D82] px-8 py-3 text-sm font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-md"
              >
                <span>Buka Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#526D82] px-8 py-3 text-sm font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-md cursor-pointer"
              >
                <span>Mulai Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <a
              href="#tiga-pilar"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#9DB2BF] bg-white px-7 py-3 text-sm font-bold text-[#27374D] hover:bg-[#DDE6ED]/60 transition-all cursor-pointer shadow-xs"
            >
              Pelajari Fitur
            </a>
          </div>
        </div>

        {/* Kolom Kanan: Three.js Interactive 3D Smartphone Canvas */}
        <div className="lg:col-span-6 relative flex items-center justify-center overflow-visible">
          {/* Background Halo Glow di belakang 3D */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9DB2BF]/30 via-white/50 to-[#526D82]/20 blur-3xl" />

          <div className="relative w-full max-w-xl overflow-visible">
            <ThreeHeroCanvas />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* METRICS & CAPAIAN BAR                                             */}
      {/* ================================================================= */}
      <section id="metrik" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#9DB2BF]/30">
          <div className="p-2">
            <p className="text-3xl sm:text-4xl font-black text-[#27374D]">10K+</p>
            <p className="text-xs sm:text-sm font-semibold text-[#526D82] mt-1">Skenario Dianalisis</p>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <p className="text-3xl sm:text-4xl font-black text-[#27374D]">8K+</p>
            <p className="text-xs sm:text-sm font-semibold text-[#526D82] mt-1">Rekan Muda Berlatih</p>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <p className="text-3xl sm:text-4xl font-black text-[#27374D]">4.9 / 5</p>
            <p className="text-xs sm:text-sm font-semibold text-[#526D82] mt-1">Indeks Kepuasan Edukasi</p>
          </div>
          <div className="p-2 pt-4 md:pt-2">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600">100%</p>
            <p className="text-xs sm:text-sm font-semibold text-[#526D82] mt-1">On-Device &amp; Privat</p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* TIGA PILAR UTAMA                                                  */}
      {/* ================================================================= */}
      <section id="tiga-pilar" className="space-y-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#526D82]">Pendekatan Sistem</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#27374D]">Tiga Pilar JagaRuang</h2>
          <p className="text-sm text-[#526D82]">
            Sinergi antara analisis teknis berbasis aturan, pelatihan refleks keputusan, dan mitigasi darurat.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Pilar 1 */}
          <div className="group flex flex-col justify-between rounded-3xl border border-[#9DB2BF]/50 bg-white p-7 shadow-xs hover:border-[#526D82] hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60 group-hover:bg-[#526D82] group-hover:text-white transition-colors">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#27374D]">1. Cek Pesan &amp; Berkas</h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Deteksi indikasi rekayasa sosial, tautan mencurigakan, dan ekstensi berkas ganda berbahaya secara mandiri.
              </p>
            </div>
            <div className="pt-6">
              {isAuthenticated ? (
                <Link
                  to="/cek"
                  className="block w-full text-center rounded-full bg-[#526D82] py-2.5 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Periksa Sekarang
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-full bg-[#526D82] py-2.5 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Periksa Sekarang
                </button>
              )}
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="group flex flex-col justify-between rounded-3xl border border-[#9DB2BF]/50 bg-white p-7 shadow-xs hover:border-[#526D82] hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60 group-hover:bg-[#526D82] group-hover:text-white transition-colors">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#27374D]">2. Latih Keputusanmu</h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Simulasi interaktif bercabang dengan umpan balik langsung untuk melatih insting saat ditekan situasi darurat.
              </p>
            </div>
            <div className="pt-6">
              {isAuthenticated ? (
                <Link
                  to="/belajar?tab=simulator"
                  className="block w-full text-center rounded-full bg-[#526D82] py-2.5 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Mulai Latihan
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-full bg-[#526D82] py-2.5 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Mulai Latihan
                </button>
              )}
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="group flex flex-col justify-between rounded-3xl border border-[#9DB2BF]/50 bg-white p-7 shadow-xs hover:border-[#526D82] hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/60 group-hover:bg-[#526D82] group-hover:text-white transition-colors">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#27374D]">3. Lindungi Sekitarmu</h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Langkah mitigasi darurat berurutan, kanal lapor resmi terverifikasi, dan pembuatan kata sandi keluarga rahasia.
              </p>
            </div>
            <div className="pt-6">
              {isAuthenticated ? (
                <Link
                  to="/lindungi"
                  className="block w-full text-center rounded-full bg-[#526D82] py-2.5 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Buka Panduan
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="w-full rounded-full bg-[#526D82] py-2.5 text-xs font-bold text-white hover:bg-[#27374D] transition-colors"
                >
                  Buka Panduan
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* REKOMENDASI KASUS / MODUL SIMULASI POPULER                       */}
      {/* ================================================================= */}
      <section id="modul" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#526D82]">Pilihan Studi Kasus</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#27374D]">Modul Simulasi Populer</h2>
          </div>
          {isAuthenticated ? (
            <Link
              to="/belajar?tab=simulator"
              className="text-xs font-bold text-[#526D82] hover:text-[#27374D] flex items-center gap-1"
            >
              <span>Jelajahi Semua Modul</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={openLoginModal}
              className="text-xs font-bold text-[#526D82] hover:text-[#27374D] flex items-center gap-1 cursor-pointer"
            >
              <span>Jelajahi Semua Modul</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {MODULE_SHORTCUTS.map((m) => {
            const cardContent = (
              <>
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#DDE6ED]/40 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={m.coverImage}
                      alt={m.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {m.channel && (
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="rounded-full bg-black/50 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/20 shadow-xs">
                          {m.channel}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#27374D] group-hover:text-[#526D82] transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-[#526D82] mt-1">{m.author}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#9DB2BF]/30 mt-4 flex items-center justify-between text-xs text-[#526D82]">
                  <span>{m.steps} Pertanyaan</span>
                  <span className="font-bold text-[#27374D]">Est. {m.duration}</span>
                </div>
              </>
            );

            if (isAuthenticated) {
              return (
                <Link
                  key={m.id}
                  to={`/belajar?tab=simulator&scenario=${m.scenarioId}`}
                  className="group flex flex-col justify-between rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 hover:border-[#526D82] hover:shadow-lg transition-all cursor-pointer"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={m.id}
                onClick={openLoginModal}
                className="group flex flex-col justify-between rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 hover:border-[#526D82] hover:shadow-lg transition-all cursor-pointer"
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ ACCORDION                                                     */}
      {/* ================================================================= */}
      <section id="faq" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24">
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#526D82]">Tanya Jawab</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#27374D]">
            Got A Question For JagaRuang?
          </h2>
          <p className="text-sm text-[#526D82] leading-relaxed">
            Jawaban ringkas seputar batas analisis, keamanan on-device, dan cara penggunaan simulator.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#9DB2BF]/50 bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#27374D] hover:text-[#526D82] transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#526D82] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#526D82] leading-relaxed border-t border-[#9DB2BF]/20">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA BOTTOM BANNER                                                 */}
      {/* ================================================================= */}
      <section className="rounded-3xl bg-[#526D82] p-8 sm:p-12 text-center text-white space-y-5 shadow-md">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight max-w-xl mx-auto">
          Siap Mengasah Ketahanan Digitalmu Hari Ini?
        </h2>
        <p className="text-xs sm:text-sm text-[#DDE6ED] max-w-lg mx-auto leading-relaxed">
          Mulai eksplorasi aman tanpa instalasi aplikasi luar dan tanpa registrasi server.
        </p>
        <div className="pt-2">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#27374D] hover:bg-[#DDE6ED] active:scale-98 transition-all shadow-md"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={openLoginModal}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#27374D] hover:bg-[#DDE6ED] active:scale-98 transition-all shadow-md cursor-pointer"
            >
              <span>Masuk &amp; Mulai Simulasi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* Disclaimer Tetap Sesuai Kontrak */}
      <Disclaimer />
    </div>
  );
}
