import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Landmark,
  Wallet,
  QrCode,
  Coins,
  MessageCircle,
  Smartphone,
  Copy,
  Check,
  PhoneCall,
  ExternalLink,
  Printer,
  Trash2,
  Users,
  ArrowRight,
  HelpCircle,
  Clock,
  ChevronRight,
  Info,
  Scale,
  FileText,
} from "lucide-react";
import {
  MODUL_PUSAT_DARURAT_DATA,
  validatePusatDaruratData,
} from "../../data/modulPusatDarurat";

// Validasi integritas build
validatePusatDaruratData();

interface ModulPusatDaruratPageProps {
  isRead?: boolean;
  onBack: () => void;
  onToggleRead?: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigateTab?: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function ModulPusatDaruratPage({
  isRead,
  onBack,
  onToggleRead,
  onComplete,
  isCompleted = false,
  onNavigateTab,
}: ModulPusatDaruratPageProps) {
  const effectiveIsCompleted = isRead ?? isCompleted;
  const handleComplete = onToggleRead || onComplete || (() => {});
  const data = MODUL_PUSAT_DARURAT_DATA;
  const [searchParams] = useSearchParams();

  // Mode Tampilan: "victim" (Aku korban sendiri) vs "supporter" (Aku membantu orang lain)
  const [viewRole, setViewRole] = useState<"victim" | "supporter">("victim");

  // State Wizard (Pertanyaan 1, 2, 3)
  const initialJalur = searchParams.get("jalur");
  const validJalurKeys = Object.keys(data.channelConfigs);
  const matchedJalur = initialJalur && validJalurKeys.includes(initialJalur) ? initialJalur : "bank";

  const [wizardStep, setWizardStep] = useState<number>(initialJalur ? 3 : 1);
  const [selectedChannel, setSelectedChannel] = useState<string>(matchedJalur);
  const [incidentTime, setIncidentTime] = useState<string>("< 10 menit");
  const [hasEvidence, setHasEvidence] = useState<boolean>(true);
  const [wizardFinished, setWizardFinished] = useState<boolean>(!!initialJalur);

  // State Generator Kronologi (HANYA lokal memori sesi, tidak disimpan di database/localStorage)
  const [kronoDate, setKronoDate] = useState<string>("");
  const [kronoAmount, setKronoAmount] = useState<string>("");
  const [kronoSuspectAccount, setKronoSuspectAccount] = useState<string>("");
  const [kronoBankName, setKronoBankName] = useState<string>("");
  const [kronoSummary, setKronoSummary] = useState<string>("");

  const [copiedKrono, setCopiedKrono] = useState<boolean>(false);
  const [copiedIascLink, setCopiedIascLink] = useState<boolean>(false);

  // Teks Kronologi Tergenerate
  const generatedChronologyText = `[KRONOLOGI LAPORAN PENIPUAN TRANSAKSI]\n\n` +
    `Waktu Kejadian: ${kronoDate || "[Tanggal & Jam Kejadian]"}\n` +
    `Estimasi Kerugian: ${kronoAmount ? `Rp ${kronoAmount}` : "[Nominal Transaksi]"}\n` +
    `Kanal / Saluran: ${data.channelConfigs[selectedChannel]?.label || "Transfer Bank"}\n` +
    `Rekening / Akun Tujuan Pelaku: ${kronoSuspectAccount || "[Nomor Rekening / Akun Pelaku]"} (${kronoBankName || "[Bank/E-Wallet Pelaku]"})\n\n` +
    `Ringkasan Kejadian:\n${kronoSummary || "[Tuliskan secara singkat alur penipuan, tautan/nomor kontak yang menghubungi, dan janji palsu yang diberikan pelaku]"}\n\n` +
    `Bukti Pendukung yang Tersedia:\n` +
    `- Tangkapan layar bukti transfer / mutasi perbankan\n` +
    `- Tangkapan layar riwayat percakapan / nomor pelaku\n` +
    `- Nomor tiket laporan pengaduan perbankan resmi (bila sudah ada)`;

  const handleCopyKrono = () => {
    navigator.clipboard.writeText(generatedChronologyText);
    setCopiedKrono(true);
    setTimeout(() => setCopiedKrono(false), 2500);
  };

  const handleClearKrono = () => {
    setKronoDate("");
    setKronoAmount("");
    setKronoSuspectAccount("");
    setKronoBankName("");
    setKronoSummary("");
  };

  const currentChannelConfig = data.channelConfigs[selectedChannel] || data.channelConfigs.bank;

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Tombol Navigasi Kembali */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#526D82] hover:text-[#27374D] transition-colors"
        >
          ← Kembali ke Pembelajaran
        </button>
        <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          🚨 Pusat Bantuan Darurat
        </span>
      </div>

      {/* Header Banner - Menenangkan & Jelas */}
      <header className="rounded-3xl border border-rose-300/60 bg-gradient-to-br from-[#27374D] to-[#1E293B] p-6 sm:p-10 text-white shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold tracking-wide uppercase">
          <Clock className="h-3.5 w-3.5" />
          Tindakan Cepat Tanggap
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
          {data.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
          {data.subtitle}
        </p>

        {/* Informasi Waktu & Prinsip Utama */}
        <div className="pt-2 p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase">
            <Info className="h-4 w-4" />
            <span>Fakta Kecepatan Pelaporan (Sumber: {data.timeContext.source})</span>
          </div>
          <p className="text-slate-100 leading-relaxed">
            {data.timeContext.goldenRule}
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-slate-300">
            <span>⏱️ Waktu Ideal OJK: <strong>{data.timeContext.idealReportingWindow}</strong></span>
            <span>📊 Rerata Korban Lapor: <strong>{data.timeContext.averageNationalReportTime}</strong></span>
          </div>
        </div>
      </header>

      {/* Tab Role: Korban Sendiri vs Pendamping */}
      <nav aria-label="Peran Pelapor" className="flex border-b border-[#9DB2BF]/40">
        <button
          onClick={() => setViewRole("victim")}
          className={`py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            viewRole === "victim"
              ? "border-rose-600 text-rose-700 bg-rose-50/50 rounded-t-xl"
              : "border-transparent text-[#526D82] hover:text-[#27374D]"
          }`}
        >
          <ShieldAlert className="h-4 w-4" />
          <span>Aku Korban Sendiri</span>
        </button>
        <button
          onClick={() => setViewRole("supporter")}
          className={`py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            viewRole === "supporter"
              ? "border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-xl"
              : "border-transparent text-[#526D82] hover:text-[#27374D]"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Aku Membantu Orang Lain (Pendamping)</span>
        </button>
      </nav>

      {/* DUA TOMBOL AKSI UTAMA PALING ATAS (PRIORITAS NOMOR SATU) */}
      <section className="rounded-3xl border-2 border-rose-300 bg-rose-50/40 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-black text-rose-800 uppercase tracking-wider block">
            Langkah Terpenting Saat Ini
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#27374D]">
            Dua Aksi Utama Penyelamatan Transaksi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Tombol 1: Bank Pengirim */}
          <div className="rounded-2xl bg-white border border-rose-200 p-5 space-y-3 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              1
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#27374D]">
                Hubungi Bank Pengirimmu
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Telepon nomor resmi call center yang tertera di balik kartu debit/ATM fisikmu atau di aplikasi m-banking resmi.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-rose-800 bg-rose-50 p-2.5 rounded-lg">
              ⚠️ Jangan cari nomor call center di Google / medsos karena rawan nomor penipu tiruan.
            </div>
          </div>

          {/* Tombol 2: IASC Portal */}
          <div className="rounded-2xl bg-white border border-rose-200 p-5 space-y-3 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              2
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#27374D]">
                Buka Portal Resmi IASC OJK
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Lapor langsung ke portal koordinasi penanganan penipuan lintas bank dan e-wallet.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Alamat Resmi Domain:</span>
              <code className="text-xs font-mono font-bold text-[#27374D] block select-all">
                {data.iascOfficialDomain}
              </code>
              <span className="text-[10px] text-rose-700 block">
                Periksa bilah alamat browsermu. Domain resmi HANYA <strong>iasc.ojk.go.id</strong>.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PERINGATAN SITUS TIRUAN (ANTI-PHISHING IASC) */}
      <section className="rounded-2xl border border-amber-300/80 bg-amber-50/70 p-4 sm:p-5 flex items-start gap-3 text-xs text-amber-950">
        <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="block font-bold">Peringatan Satgas PASTI: Waspada Situs Web IASC Tiruan!</strong>
          <p>
            Pelaporan resmi IASC <strong>hanya beralamat di {data.iascOfficialDomain}</strong>. Jangan pernah mengeklik tautan IASC dari pesan WhatsApp/SMS atau akun media sosial yang menawarkan "jasa pengembalian uang".
          </p>
        </div>
      </section>

      {/* WIZARD 3 LANGKAH (JIKA BELUM SELESAI / MEMILIH JALUR) */}
      {!wizardFinished ? (
        <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-[#526D82] uppercase">
              Wizard Panduan Cepat (Langkah {wizardStep} dari 3)
            </span>
            <button
              onClick={() => setWizardFinished(true)}
              className="text-xs text-blue-600 hover:underline cursor-pointer"
            >
              Lewati wizard, tampilkan semua langkah
            </button>
          </div>

          {/* Wizard Pertanyaan 1: Kanal Transaksi */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#27374D]">
                1. Kanal atau saluran apa yang dipakai dalam penipuan ini?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.values(data.channelConfigs).map((cfg) => (
                  <button
                    key={cfg.id}
                    onClick={() => {
                      setSelectedChannel(cfg.id);
                      setWizardStep(2);
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      selectedChannel === cfg.id
                        ? "bg-[#27374D] text-white border-[#27374D]"
                        : "bg-slate-50 border-slate-200 text-[#27374D] hover:bg-slate-100"
                    }`}
                  >
                    <span>{cfg.label}</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Pertanyaan 2: Waktu Insiden */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#27374D]">
                2. Berapa lama insiden penipuan ini baru saja terjadi?
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { label: "Kurang dari 10 - 30 menit yang lalu (Sangat Baru)", val: "< 10 menit" },
                  { label: "Beberapa jam yang lalu (Hari ini)", val: "beberapa jam" },
                  { label: "Kemarin atau lebih dari 24 jam yang lalu", val: "> 24 jam" },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => {
                      setIncidentTime(item.val);
                      setWizardStep(3);
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      incidentTime === item.val
                        ? "bg-[#27374D] text-white border-[#27374D]"
                        : "bg-slate-50 border-slate-200 text-[#27374D] hover:bg-slate-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Pertanyaan 3: Dokumen Bukti */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#27374D]">
                3. Apakah kamu sudah menyimpan bukti mutasi dan tangkapan layar?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setHasEvidence(true);
                    setWizardFinished(true);
                  }}
                  className="p-4 rounded-xl border border-slate-200 bg-emerald-50 text-emerald-950 font-bold text-xs hover:bg-emerald-100 cursor-pointer text-center"
                >
                  Sudah Ada Bukti Lengkap
                </button>
                <button
                  onClick={() => {
                    setHasEvidence(false);
                    setWizardFinished(true);
                  }}
                  className="p-4 rounded-xl border border-slate-200 bg-amber-50 text-amber-950 font-bold text-xs hover:bg-amber-100 cursor-pointer text-center"
                >
                  Belum, Perlu Panduan Pengumpulan
                </button>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* KANAL KHUSUS YANG TERPILIH */
        <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-slate-100 text-[#27374D]">
                {selectedChannel === "bank" && <Landmark className="h-5 w-5" />}
                {selectedChannel === "ewallet" && <Wallet className="h-5 w-5" />}
                {selectedChannel === "qris" && <QrCode className="h-5 w-5" />}
                {selectedChannel === "kripto" && <Coins className="h-5 w-5" />}
                {selectedChannel === "whatsapp" && <MessageCircle className="h-5 w-5" />}
                {selectedChannel === "apk" && <Smartphone className="h-5 w-5" />}
                {selectedChannel === "pinjol" && <AlertTriangle className="h-5 w-5" />}
              </span>
              <div>
                <span className="text-[11px] font-bold text-[#526D82] uppercase">Jalur Penipuan Terpilih</span>
                <h3 className="text-base font-bold text-[#27374D]">{currentChannelConfig.label}</h3>
              </div>
            </div>
            <button
              onClick={() => setWizardFinished(false)}
              className="text-xs text-blue-600 hover:underline cursor-pointer font-semibold"
            >
              Ganti Jalur
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-[#27374D]">
              Tindakan Langsung Jalur Ini: {currentChannelConfig.firstActionHeadline}
            </h4>
            <div className="space-y-1.5 pt-1 text-xs text-[#526D82]">
              {currentChannelConfig.specificInstructions.map((ins, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="h-4 w-4 rounded-full bg-slate-200 text-[#27374D] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{ins}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5 LANGKAH UNIVERSAL PELAPORAN DARURAT */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#526D82] uppercase tracking-wider">
            SOP Standar Nasional
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
            5 Langkah Terstruktur Menangani Insiden
          </h2>
        </div>

        <div className="space-y-4">
          {data.universalSteps.map((step) => (
            <div
              key={step.order}
              className="rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 bg-slate-50/50"
            >
              <div className="flex items-center gap-2 font-bold text-sm text-[#27374D]">
                <span className="h-6 w-6 rounded-full bg-[#27374D] text-white text-xs flex items-center justify-center font-black">
                  {step.order}
                </span>
                <span>{step.title}</span>
              </div>
              <p className="text-xs text-[#526D82] leading-relaxed pl-8">{step.desc}</p>
              <div className="ml-8 text-[11px] font-semibold text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                💡 {step.keyDetail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GENERATOR KRONOLOGI LOKAL (100% DI BROWSER, TANPA JARINGAN) */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
            <FileText className="h-3.5 w-3.5 text-emerald-700" />
            100% Lokal & Privasi Aman
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
            Generator Kronologi Laporan (Siap Salin)
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
            Ketik rincian kejadian di bawah untuk menghasilkan draf teks kronologi rapi yang siap disalin ke formulir IASC atau laporan kepolisian. Seluruh data diproses hanya di memori browser ini dan tidak dikirim ke server mana pun.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#27374D]">Tanggal & Jam Kejadian</label>
            <input
              type="text"
              placeholder="Contoh: 7 November 2026, pukul 14.30 WIB"
              value={kronoDate}
              onChange={(e) => setKronoDate(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#27374D]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#27374D]">Estimasi Nominal Kerugian (Rp)</label>
            <input
              type="text"
              placeholder="Contoh: 5.000.000"
              value={kronoAmount}
              onChange={(e) => setKronoAmount(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#27374D]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#27374D]">Bank / E-Wallet Tujuan Pelaku</label>
            <input
              type="text"
              placeholder="Contoh: Bank BCA / E-Wallet DANA"
              value={kronoBankName}
              onChange={(e) => setKronoBankName(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#27374D]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#27374D]">Nomor Rekening / Nomor Telepon Pelaku</label>
            <input
              type="text"
              placeholder="Contoh: 1234567890 an. [Nama Pemilik]"
              value={kronoSuspectAccount}
              onChange={(e) => setKronoSuspectAccount(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#27374D]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-[#27374D]">Ringkasan Alur Cerita Kejadian</label>
            <textarea
              rows={3}
              placeholder="Contoh: Menghubungi saya via WhatsApp mengaku kurir paket yang mengirimkan file APK surat undangan. Setelah dibuka, ada mutasi transfer keluar tanpa persetujuan."
              value={kronoSummary}
              onChange={(e) => setKronoSummary(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#27374D]"
            />
          </div>
        </div>

        {/* Hasil Teks Kronologi Tergenerate */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#27374D]">Pratinjau Draf Kronologi Siap Salin:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearKrono}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" /> Hapus Isian
              </button>
              <button
                onClick={handleCopyKrono}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#27374D] text-white hover:bg-[#1E293B] cursor-pointer shadow-xs"
                aria-live="polite"
              >
                {copiedKrono ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Kronologi Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin Kronologi</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-[#27374D] font-sans whitespace-pre-wrap leading-relaxed select-all">
            {generatedChronologyText}
          </pre>
          <p className="text-[10px] text-slate-400">
            Perhatian: Jangan gunakan generator ini pada komputer umum/warnet tanpa menghapus isian kembali.
          </p>
        </div>
      </section>

      {/* ALUR SETELAH MELAPOR & DATA EKSPEKTASI REALISTIS */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#526D82] uppercase tracking-wider">
            Transparansi Proses
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
            Apa yang Terjadi Setelah Kamu Melapor?
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82]">
            Tahapan penanganan resmi yang dilakukan oleh perbankan dan otoritas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {data.postReportWorkflow.map((wf) => (
            <div key={wf.order} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="h-6 w-6 rounded-full bg-[#27374D] text-white text-xs font-bold flex items-center justify-center">
                {wf.order}
              </span>
              <h4 className="text-xs font-bold text-[#27374D]">{wf.phase}</h4>
              <p className="text-[11px] text-[#526D82] leading-relaxed">{wf.description}</p>
              <span className="text-[10px] text-slate-400 italic block">{wf.realisticNote}</span>
            </div>
          ))}
        </div>

        {/* Data Realistis IASC */}
        <div className="rounded-2xl bg-blue-50/60 border border-blue-200 p-5 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <Scale className="h-4 w-4" />
            <span>Ekspektasi Realistis Penyelamatan Dana (Sumber: {data.realisticExpectations.source})</span>
          </div>
          <p className="text-blue-950 leading-relaxed">
            {data.realisticExpectations.explanation}
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-bold">
            <span className="text-emerald-800">
              Dana Berhasil Diamankan: {data.realisticExpectations.securedFundsTotal}
            </span>
            <span className="text-blue-800">
              Dana Telah Dikembalikan ke Korban: {data.realisticExpectations.returnedFundsTotal}
            </span>
            <span className="text-slate-500 font-normal">
              (Posisi per {data.realisticExpectations.asOf})
            </span>
          </div>
        </div>
      </section>

      {/* WASPADA PENIPUAN LAPIS KEDUA (RECOVERY SCAM) */}
      <section className="rounded-3xl border border-rose-300/80 bg-rose-50/60 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-rose-800 text-xs font-black tracking-wide uppercase">
          <ShieldAlert className="h-4 w-4 text-rose-700" />
          <span>Waspada Penipuan Lapis Kedua (Recovery Scam)</span>
        </div>
        <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
          Sindikat penipuan sering menargetkan kembali orang yang baru saja tertipu dengan menyamar sebagai &ldquo;jasa bantuan penarikan uang&rdquo; atau &ldquo;hacker pelacak dana&rdquo;.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {data.secondLayerScamWarning.map((scam, i) => (
            <div key={i} className="rounded-xl bg-white border border-rose-200 p-4 space-y-2 text-xs">
              <h4 className="font-bold text-[#27374D]">{scam.title}</h4>
              <p className="text-[#526D82] leading-relaxed">{scam.description}</p>
              <div className="space-y-1 pt-1">
                {scam.redFlags.map((rf, rIdx) => (
                  <div key={rIdx} className="text-[11px] text-rose-800 flex items-start gap-1.5 font-medium">
                    <span>❌</span>
                    <span>{rf}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TAB PENDAMPING (JIKA MEMILIH ROLE SUPPORTER) */}
      {viewRole === "supporter" && (
        <section className="rounded-3xl border border-blue-300/80 bg-blue-50/60 p-6 sm:p-8 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2 text-blue-800 text-xs font-black tracking-wide uppercase">
            <Users className="h-4 w-4 text-blue-700" />
            <span>{data.supporterGuide.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
            {data.supporterGuide.description}
          </p>
          <div className="p-3.5 rounded-xl bg-white border border-blue-200 text-xs text-blue-900 font-semibold leading-relaxed">
            ⚖️ <strong>Syarat Formal:</strong> {data.supporterGuide.legalPrerequisite}
          </div>
          <div className="space-y-2 pt-2">
            {data.supporterGuide.actionChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#27374D]">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CETAK / BAGIKAN RINGKASAN */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#27374D] hover:bg-slate-100 cursor-pointer shadow-xs"
        >
          <Printer className="h-4 w-4" />
          <span>Cetak Panduan Darurat Ini</span>
        </button>

        <button
          onClick={handleComplete}
          disabled={effectiveIsCompleted}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            effectiveIsCompleted
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
          }`}
        >
          <Check className="h-4 w-4" />
          <span>{effectiveIsCompleted ? "Panduan Selesai Dibaca" : "Tandai Selesai Dibaca"}</span>
        </button>
      </div>

      {/* FOOTER & DISCLAIMER */}
      <footer className="text-xs text-[#526D82] space-y-3 pt-4 border-t border-[#9DB2BF]/30">
        <p className="leading-relaxed">{data.disclaimer}</p>
        <p className="text-[11px] text-slate-400">
          Terakhir diperbarui: {data.lastUpdated} · JagaRuang Pusat Darurat Anti-Penipuan Digital
        </p>
      </footer>
    </div>
  );
}
