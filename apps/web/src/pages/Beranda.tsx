import { Link } from "react-router-dom";
import { Search, Compass, ShieldAlert, BookOpen, Clock, KeyRound, ArrowRight, Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button, Card, CardTitle, CardDescription, Disclaimer } from "../components/ui";

const PILLARS = [
  {
    title: "1. Cek Pesan & Berkas",
    desc: "Deteksi indikasi rekayasa sosial, tautan mencurigakan, dan ekstensi berkas berbahaya secara mandiri.",
    icon: Search,
    to: "/cek",
    cta: "Periksa Sekarang",
  },
  {
    title: "2. Latih Keputusanmu",
    desc: "Simulasi skenario interaktif bercabang (undangan APK, loker palsu, kurir paket) dalam hitungan menit.",
    icon: Compass,
    to: "/latih",
    cta: "Mulai Latihan",
  },
  {
    title: "3. Lindungi Sekitarmu",
    desc: "Panduan tindakan darurat berurutan, kanal lapor resmi, dan buat kartu peringatan untuk keluarga.",
    icon: ShieldAlert,
    to: "/lindungi",
    cta: "Buka Panduan",
  },
];

const FEATURES = [
  {
    title: "Kamus Jebakan Digital",
    desc: "Kenali 10 jenis malware dan modus tipuan digital yang kerap mengincar anak muda.",
    to: "/kamus",
    icon: BookOpen,
  },
  {
    title: "Kilat 2 Menit",
    desc: "Uji kecepatan refleks membedakan pesan biasa vs pesan mencurigakan dalam 120 detik.",
    to: "/kilat",
    icon: Clock,
  },
  {
    title: "Sandi Keluarga",
    desc: "Buat kata rahasia verifikasi bersama keluarga untuk mengantisipasi kloning suara atau telepon darurat palsu.",
    to: "/sandi",
    icon: KeyRound,
  },
];

export default function Beranda() {
  const { user, isAuthenticated, openLoginModal } = useAuth();

  return (
    <div className="space-y-10 py-2">
      {/* ======================================================== */}
      {/* TAMPILAN HERO BERDASARKAN STATUS LOGIN                   */}
      {/* ======================================================== */}
      {isAuthenticated ? (
        /* KONDISI A: PENGGUNA SUDAH LOGIN (DASHBOARD AREA) */
        <section className="space-y-4 max-w-3xl mx-auto pt-2 sm:pt-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <UserCheck className="h-4 w-4 text-slate-700" />
                  <span>Sesi Aktif di Perangkat Ini</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Halo, {user?.name}! 👋
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Semua fitur analisis dan simulasi telah terbuka. Pilih langkah yang ingin kamu lakukan hari ini:
                </p>
              </div>

              <div className="flex shrink-0">
                <Link to="/cek">
                  <Button variant="primary" size="md">
                    <span>Mulai Cek Pesan</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-slate-600">
              <div className="rounded-lg bg-slate-50 p-3 flex items-start gap-2.5">
                <Search className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">Analisis Cepat</strong>
                  Punya pesan atau file meragukan? Salin ke menu Cek.
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 flex items-start gap-2.5">
                <Compass className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">Asah Naluri</strong>
                  Mainkan 3 skenario interaktif berbasis kasus nyata.
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">Privasi Terjaga</strong>
                  Semua pengujian berjalan 100% on-device di browsermu.
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* KONDISI B: PENGUNJUNG UMUM (LANDING PAGE VIEW) */
        <section className="space-y-4 text-center max-w-2xl mx-auto pt-4 sm:pt-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
            Studi Kasus: MIT-Week 2026 · Guardians of the Digital Space
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
            Cek. Latih. Lindungi.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Platform interaktif untuk membantu anak muda Indonesia mengenali tipuan digital, mengasah insting keputusan,
            dan tahu tindakan tepat saat situasi terasa janggal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button size="lg" className="min-w-[160px]" onClick={openLoginModal}>
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Masuk Sekarang</span>
            </Button>
            <a href="#tiga-pilar">
              <Button variant="outline" size="lg" className="min-w-[160px]">
                Pelajari Fitur
              </Button>
            </a>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            *Tanpa pendaftaran email atau server. Cukup masukkan nama panggilan untuk memulai.
          </p>
        </section>
      )}

      {/* ======================================================== */}
      {/* 3 PILAR UTAMA                                            */}
      {/* ======================================================== */}
      <section id="tiga-pilar" className="space-y-4 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Tiga Pilar Utama</h2>
          <p className="text-sm text-slate-500">Kombinasi analisis teknis, pelatihan insting, dan panduan mitigasi.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="flex flex-col justify-between hover:border-slate-400 transition-all">
                <div className="space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{p.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">{p.desc}</CardDescription>
                </div>
                <div className="pt-4 mt-auto">
                  {isAuthenticated ? (
                    <Link to={p.to}>
                      <Button variant="secondary" size="sm" className="w-full">
                        {p.cta}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={openLoginModal}
                    >
                      <span>{p.cta}</span>
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* FITUR PENDUKUNG                                          */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Fitur Pendukung</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const content = (
              <Card className="h-full hover:border-slate-400 group-hover:shadow-sm transition-all p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-slate-100 p-2 text-slate-700 group-hover:bg-slate-200 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-normal">{f.desc}</p>
                  </div>
                </div>
              </Card>
            );

            return isAuthenticated ? (
              <Link key={f.title} to={f.to} className="group block">
                {content}
              </Link>
            ) : (
              <button
                key={f.title}
                type="button"
                onClick={openLoginModal}
                className="group block text-left w-full cursor-pointer"
              >
                {content}
              </button>
            );
          })}
        </div>
      </section>

      {/* Disclaimer Tetap */}
      <Disclaimer />
    </div>
  );
}
