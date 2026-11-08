import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Info,
  CheckSquare,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Award,
  BarChart3,
  TrendingUp,
  Share2,
  Check,
  Smartphone,
  PhoneCall,
  DollarSign,
  Briefcase,
  FileCode,
  Lock,
  Layers,
  Cpu,
  Building2,
  Copy,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui";
import { addNotification } from "../../lib/notificationService";
import { ModulDetailLayout, type ModulSectionItem } from "./ModulDetailLayout";
import {
  MODUL_POLA_MODUS_NASIONAL,
  type TopModusItem,
  type IascOverviewItem,
  calculateDynamicPercentage,
  isDataOlderThan90Days,
} from "../../data/modulPolaModusNasional";

interface ModulPolaModusNasionalPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
  onSelectModule?: (moduleId: string) => void;
}

export function ModulPolaModusNasionalPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
  onSelectModule,
}: ModulPolaModusNasionalPageProps) {
  const data = MODUL_POLA_MODUS_NASIONAL;

  // 1. Accordion "Cara Membaca Angka Ini"
  const [isHowToReadOpen, setIsHowToReadOpen] = useState(false);

  // 2. Personal Diagnostic Quiz
  const [personalQuizAnswer, setPersonalQuizAnswer] = useState<string | null>(() => {
    try {
      return localStorage.getItem("jagaruang_personal_modus_choice");
    } catch {
      return null;
    }
  });

  // 3. Highlighted modus card id
  const [highlightedModusId, setHighlightedModusId] = useState<string>("belanja");

  // 4. Copy share feedback per modus
  const [copiedModusId, setCopiedModusId] = useState<string | null>(null);

  // 5. Quiz latihan "Modus Yang Mana?"
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState<Record<number, boolean>>({});

  // 6. Interactive Checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`jagaruang_chk_${data.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sections config for Table of Contents
  const SECTIONS: ModulSectionItem[] = useMemo(
    () => [
      { id: "hero-stats", label: "1. Statistik Laporan Nasional" },
      { id: "kuis-personal", label: "2. Deteksi Kerentanan Diri" },
      { id: "diagram-modus", label: "3. Peringkat Modus Terbanyak" },
      { id: "kartu-modus", label: "4. Bedah 4 Modus Utama" },
      { id: "bahaya-apk", label: "5. Modus File APK Undangan" },
      { id: "modus-ai", label: "6. Tren Modus Berbasis AI" },
      { id: "pinjol-ilegal", label: "7. Entitas Keuangan Ilegal" },
      { id: "red-flags", label: "8. Red Flags Lintas Modus" },
      { id: "latihan-refleks", label: "9. Latihan 'Modus yang Mana?'" },
      { id: "checklist", label: "10. Checklist Tindakan Nyata" },
      { id: "sop-darurat", label: "11. SOP Darurat Korban" },
      { id: "intisari", label: "12. Intisari & Sumber Resmi" },
    ],
    []
  );

  // 7. Animated Counters for Hero Stats (Respects prefers-reduced-motion)
  const [animatedTotalLaporan, setAnimatedTotalLaporan] = useState(0);
  const latestIascReport = data.iascOverviewEntries[data.iascOverviewEntries.length - 2]; // 702342
  const targetTotal = latestIascReport.totalLaporan || 702342;

  // Animasi hitung naik (Counter animation)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAnimatedTotalLaporan(targetTotal);
      return;
    }

    let start = 0;
    const duration = 1200; // 1.2 detik
    const stepTime = 25;
    const increment = Math.ceil(targetTotal / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetTotal) {
        setAnimatedTotalLaporan(targetTotal);
        clearInterval(timer);
      } else {
        setAnimatedTotalLaporan(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetTotal]);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const nextVal = !prev[id];
      const updated = { ...prev, [id]: nextVal };
      try {
        localStorage.setItem(`jagaruang_chk_${data.id}`, JSON.stringify(updated));
      } catch {
        // no-op
      }
      if (nextVal) {
        const allCompleted = data.interactiveChecklist.every((it) => updated[it.id]);
        if (allCompleted) {
          if (!isRead) onToggleRead();
          addNotification({
            title: `Checklist Selesai: ${data.title}`,
            message:
              "Hebat! Kamu telah memahami pola modus nasional dan tindakan nyata untuk melindungi orang terdekat.",
            type: "sukses",
            link: "/belajar?tab=modul",
          });
        }
      }
      return updated;
    });
  };

  const handleSelectPersonalQuiz = (optId: string, targetModusId: string) => {
    setPersonalQuizAnswer(optId);
    setHighlightedModusId(targetModusId);
    try {
      localStorage.setItem("jagaruang_personal_modus_choice", optId);
    } catch {
      // no-op
    }

    // Scroll to the modus card smoothly
    const elem = document.getElementById(`modus-card-${targetModusId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCopyModusCard = (modus: TopModusItem) => {
    const text = `⚠️ WASPADA POLA PENIPUAN: ${modus.name.toUpperCase()} ⚠️\n\n${modus.shortSummary}\n\n🚨 Ciri Kejanggalan:\n${modus.specificRedFlags.map((rf) => `- ${rf}`).join("\n")}\n\n🛡️ Cara Berhenti: ${modus.howToStop}\n\nEdukasi lengkap data resmi: JagaRuang.id`;
    navigator.clipboard.writeText(text);
    setCopiedModusId(modus.id);
    setTimeout(() => setCopiedModusId(null), 2500);
  };

  const completedChecksCount = useMemo(() => {
    return data.interactiveChecklist.filter((it) => !!checkedItems[it.id]).length;
  }, [checkedItems, data.interactiveChecklist]);

  // Cek kesegaran data modus per 31 Mei 2026
  const isDataStale = isDataOlderThan90Days(data.modusDataset.meta.asOf);

  return (
    <ModulDetailLayout
      moduleId="m8"
      title={data.title}
      category="Pola Kejadian Nyata"
      terakhirDiperbaruiLabel={data.lastUpdated}
      readingTime={data.readingTime}
      summary="Dasbor edukasi data laporan kejahatan keuangan digital IASC / Satgas PASTI dan pola modus penipuan terbanyak di Indonesia."
      isRead={isRead}
      onBack={onBack}
      onToggleRead={onToggleRead}
      onNavigateTab={onNavigateTab}
      onSelectModule={onSelectModule}
      sections={SECTIONS}
      nextModule={{
        id: "m9",
        moduleNumber: 9,
        title: "Pola Penipuan QRIS & E-Wallet",
        desc: "Pola penipuan kode QR, manipulasi transfer e-wallet, dan keamanan transaksi penjual & pembeli.",
      }}
    >
      {/* Hero Quote Card */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2 shadow-xs">
        <p className="text-sm sm:text-base font-semibold leading-relaxed">
          "{data.opener.quote}"
        </p>
        <p className="text-xs text-blue-200 leading-relaxed pt-1">
          {data.opener.explanation}
        </p>
      </div>

      {isDataStale && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Kesegaran Data: </strong>
            Data per 31 Mei 2026 mungkin sudah bergerak. Tinjau pembaruan kuartal ketiga di bawah ini.
          </div>
        </div>
      )}

      {/* Section 1: Hero Stats Angka Besar & Accordion */}
      <section id="hero-stats" className="space-y-4 scroll-mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Total Laporan */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-blue-800">
                TOTAL LAPORAN MASYARAKAT
              </span>
              <span className="font-mono text-[11px]">per 30 Sep 2026</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#27374D] tracking-tight">
              {animatedTotalLaporan.toLocaleString("id-ID")}
            </div>
            <p className="text-xs text-[#526D82] leading-relaxed">
              Total laporan yang masuk ke Indonesia Anti-Scam Centre sejak 22 November 2024.
            </p>
          </div>

          {/* Card 2: Dana Diamankan */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-emerald-800">
                DANA KORBAN BERHASIL DIAMANKAN
              </span>
              <span className="font-mono text-[11px]">per 31 Okt 2026</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 tracking-tight">
              Rp 825,2 Miliar
            </div>
            <p className="text-xs text-[#526D82] leading-relaxed">
              Dana kejahatan di rekening penampung yang berhasil dibekukan atas koordinasi perbankan.
            </p>
          </div>
        </div>

        {/* Cara Membaca Angka Ini (Accordion) */}
        <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs">
          <button
            onClick={() => setIsHowToReadOpen(!isHowToReadOpen)}
            className="w-full flex items-center justify-between text-left focus:outline-hidden cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Info className="h-5 w-5 text-blue-700 shrink-0" />
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#27374D]">
                  {data.howToReadData.title}
                </h2>
                <p className="text-xs text-[#526D82] mt-0.5">
                  Laporan ≠ Seluruh Kasus ≠ Nilai Kerugian. Sentuh untuk membaca prinsip pembacaan data.
                </p>
              </div>
            </div>
            <span className="text-slate-400 pl-3">
              {isHowToReadOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </span>
          </button>

          {isHowToReadOpen && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {data.howToReadData.guidelines.map((g, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 space-y-1 text-xs"
                >
                  <strong className="font-extrabold text-[#27374D] block text-xs sm:text-sm">
                    {g.title}
                  </strong>
                  <p className="text-[#526D82] leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

        {/* Section 2: Kuis Pembuka Personal "Pernah Menerima yang Mana?" */}
        <section id="kuis-personal" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              {data.personalDiagnosticQuiz.question}
            </h2>
            <p className="text-xs text-[#526D82] mt-0.5">
              Pilih salah satu di bawah ini. Sistem akan menyorot modus yang paling relevan dengan situasi yang pernah kamu hadapi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.personalDiagnosticQuiz.options.map((opt) => {
              const isSelected = personalQuizAnswer === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectPersonalQuiz(opt.id, opt.targetModusId)}
                  className={`rounded-2xl border p-4 text-left text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 text-blue-950 font-bold shadow-2xs ring-1 ring-blue-300"
                      : "border-slate-200 bg-[#FFFDF9] text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <ChevronRight className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {personalQuizAnswer && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-950 flex items-center justify-between">
              <span>
                ✓ Kartu modus terkait telah disorot di bawah. Silakan cermati rincian dan cara berhentinya!
              </span>
              <button
                onClick={() => {
                  setPersonalQuizAnswer(null);
                  localStorage.removeItem("jagaruang_personal_modus_choice");
                }}
                className="text-[11px] underline text-emerald-800 hover:text-emerald-950"
              >
                Reset Pilihan
              </button>
            </div>
          )}
        </section>

        {/* Section 3: Diagram Batang Horizontal Interaktif */}
        <section id="diagram-modus" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
                  Peringkat Modus dengan Laporan Terbanyak
                </h2>
                <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                  Klik pada batang grafik untuk langsung membuka rincian kartu modusnya.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-[#526D82]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  Alasan / Cerita
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Cara / Teknik
                </span>
              </div>
            </div>
          </div>

          {/* Accessible Table for Screen Readers (sr-only) */}
          <div className="sr-only">
            <table>
              <caption>
                Data Peringkat Modus Terbanyak per 31 Mei 2026 (Sumber IASC / Satgas PASTI)
              </caption>
              <thead>
                <tr>
                  <th>Peringkat</th>
                  <th>Nama Modus</th>
                  <th>Tipe</th>
                  <th>Jumlah Laporan</th>
                  <th>Persentase terhadap Total Laporan (579.459)</th>
                </tr>
              </thead>
              <tbody>
                {data.modusDataset.items.map((it) => {
                  const pct = calculateDynamicPercentage(
                    it.laporanCount,
                    data.modusDataset.totalLaporanRef
                  );
                  return (
                    <tr key={it.id}>
                      <td>{it.rank}</td>
                      <td>{it.name}</td>
                      <td>{it.categoryTypeLabel}</td>
                      <td>{it.laporanCount}</td>
                      <td>{pct.displayPercent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Visual Interactive Horizontal Bar Chart */}
          <div className="space-y-4">
            {data.modusDataset.items.map((item) => {
              const { displayPercent, rawPercent } = calculateDynamicPercentage(
                item.laporanCount,
                data.modusDataset.totalLaporanRef
              );
              // Max width proportional scale (relative to the #1 rank which is ~13.4%)
              const maxPct = calculateDynamicPercentage(
                data.modusDataset.items[0].laporanCount,
                data.modusDataset.totalLaporanRef
              ).rawPercent;
              const barWidth = Math.min(100, Math.round((rawPercent / maxPct) * 100));
              const isSelected = highlightedModusId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setHighlightedModusId(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHighlightedModusId(item.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Peringkat ${item.rank}: ${item.name}, jumlah laporan ${item.laporanCount.toLocaleString("id-ID")}, porsi ${displayPercent}`}
                  className={`rounded-2xl border p-4 transition-all cursor-pointer select-none focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/40 shadow-xs ring-1 ring-blue-300"
                      : "border-slate-200 bg-[#FFFDF9] hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#27374D] text-white font-extrabold text-[10px]">
                        #{item.rank}
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <strong className="font-black text-sm text-[#27374D]">
                        {item.laporanCount.toLocaleString("id-ID")} Laporan
                      </strong>
                      <span className="text-[11px] font-bold text-blue-700 ml-1.5">
                        ({displayPercent})
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar Graphic */}
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        item.categoryType === "alasan" ? "bg-blue-600" : "bg-amber-600"
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart Caption & Data Source */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-[#526D82] space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-1 font-bold text-slate-700">
              <span>Periode Data: {data.modusDataset.meta.period}</span>
              <span>Data per: {data.modusDataset.meta.asOf}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {data.modusDataset.notes}
            </p>
            <p className="text-[10px] text-slate-400 italic">
              Persentase dihitung otomatis oleh sistem dari jumlah laporan per modus terhadap total laporan periode tersebut ({data.modusDataset.totalLaporanRef.toLocaleString("id-ID")}).
            </p>
          </div>
        </section>

        {/* Section 4: Kartu Penjelasan per Modus (4 Modus) */}
        <section id="kartu-modus" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Bedah Detail 4 Modus Teratas & Cara Berhenti
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Pelajari anatomi pesan, red flags khusus, dan langkah pencegahan pada tiap modus.
            </p>
          </div>

          <div className="space-y-6">
            {data.modusDataset.items.map((modus) => {
              const isHighlighted = highlightedModusId === modus.id;
              const isCopied = copiedModusId === modus.id;

              return (
                <div
                  id={`modus-card-${modus.id}`}
                  key={modus.id}
                  className={`rounded-3xl border bg-white p-6 sm:p-8 shadow-xs transition-all space-y-5 ${
                    isHighlighted
                      ? "ring-2 ring-blue-500 border-blue-400"
                      : "border-slate-200"
                  }`}
                >
                  {/* Modus Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#27374D] text-white font-black text-sm">
                        #{modus.rank}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base sm:text-lg text-[#27374D]">
                            {modus.name}
                          </h3>
                        </div>
                        <span className="text-xs text-[#526D82]">
                          Kategori: <strong className="text-slate-800">{modus.categoryTypeLabel}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyModusCard(modus)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="h-3.5 w-3.5 text-slate-500" />
                            <span>Bagikan ke Keluarga</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed">
                    {modus.shortSummary}
                  </p>

                  {/* Contoh Pesan Tiruan */}
                  <div className="rounded-2xl bg-[#FAF9F5] border border-slate-200/90 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold uppercase tracking-wider text-[10px]">
                        Contoh Pesan Tiruan:
                      </span>
                      <span className="font-mono text-[11px] truncate max-w-[200px] sm:max-w-none">
                        {modus.sampleSender}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-mono text-slate-800 italic leading-relaxed">
                      {modus.sampleMessage}
                    </p>
                  </div>

                  {/* Red Flags Khusus */}
                  <div className="space-y-2">
                    <strong className="text-xs font-bold text-slate-900 block">
                      Tanda Kejanggalan Khusus ({modus.specificRedFlags.length} Red Flags):
                    </strong>
                    <div className="grid grid-cols-1 gap-2">
                      {modus.specificRedFlags.map((rf, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-rose-50/50 border border-rose-200/80 p-2.5 text-xs text-rose-950 flex items-start gap-2"
                        >
                          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                          <span>{rf}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cara Berhenti di Sini */}
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Cara Berhenti di Titik Ini: </strong>
                      <span>{modus.howToStop}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Teknik Khusus File APK Berbahaya */}
        <section id="bahaya-apk" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              {data.specialApkTechnique.title}
            </h2>
            <p className="text-xs sm:text-sm text-rose-700 font-semibold mt-0.5">
              {data.specialApkTechnique.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {data.specialApkTechnique.explanation}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide block">
              3 Dampak Fatal Jika File APK Terpasang di Ponsel:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.specialApkTechnique.realRisks.map((risk, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-rose-100 bg-rose-50/40 p-3.5 text-xs text-slate-800 space-y-1 shadow-2xs"
                >
                  <span className="font-black text-rose-700">#{idx + 1}</span>
                  <p className="leading-relaxed">{risk}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs sm:text-sm text-emerald-950 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Langkah Pencegahan Mutlak: </strong>
              <span>{data.specialApkTechnique.defenseAdvice}</span>
            </div>
          </div>
        </section>

        {/* Section 6: Modus Berbasis AI (1.379 Laporan) */}
        <section id="modus-ai" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Deepfake & Kloning Suara pada Penipuan Digital
            </h2>
            <p className="text-xs text-[#526D82] mt-0.5">
              Berdasarkan laporan khusus Satgas PASTI (1 Jan - 30 Jun 2026), tanpa persentase spekulatif.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {data.aiScams.breakdownSummary.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-3.5 text-slate-800 flex items-start gap-2 shadow-2xs"
              >
                <span className="text-purple-600 font-bold">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-xs font-extrabold text-slate-900 block">
              Tips Menghadapi Modus AI:
            </span>
            <div className="space-y-2">
              {data.aiScams.defenseTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-purple-50/50 border border-purple-200 p-3 text-xs text-purple-950 flex items-start gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Pinjaman Ilegal & Satgas PASTI (25.875 Pengaduan) */}
        <section id="pinjol-ilegal" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Satgas PASTI & Pemisahan dari Data IASC
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed">
            {data.illegalEntities.scopeSummary}
          </p>

          <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 text-xs sm:text-sm text-amber-950 leading-relaxed space-y-1">
            <strong className="block font-bold">Catatan Taksonomi Penting:</strong>
            <p>{data.illegalEntities.differenceFromIasc}</p>
          </div>
        </section>

        {/* Section 8: Red Flags Umum & Tanda Sinyal Lemah */}
        <section id="red-flags" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Tanda Bahaya Umum (Red Flags) Lintas Modus
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Kompilasi tanda yang paling sering muncul di ribuan laporan masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {data.generalRedFlags.map((rf) => (
              <div
                key={rf.id}
                className={`rounded-2xl border p-4 sm:p-5 space-y-2 shadow-2xs ${
                  rf.severity === "merah"
                    ? "border-rose-200 bg-rose-50/30"
                    : "border-amber-200 bg-amber-50/30"
                }`}
              >
                <h3 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                  {rf.title}
                </h3>
                <p className="text-xs text-[#526D82] leading-relaxed">
                  {rf.explanation}
                </p>
                {rf.isWeakSignal && rf.weakSignalNote && (
                  <p className="text-[10px] text-amber-900 bg-white p-2 rounded-lg border border-amber-200 leading-relaxed italic">
                    {rf.weakSignalNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Latihan Refleks "Modus yang Mana?" */}
        <section id="latihan-refleks" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Tebak: Pesan Ini Masuk Modus Apa?
            </h2>
          </div>

          <div className="space-y-6">
            {data.quizPractice.map((q) => {
              const selectedAnswer = quizAnswers[q.id];
              const isAnswered = showQuizFeedback[q.id];
              const selectedOpt = q.options.find((opt) => opt.categoryName === selectedAnswer);

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-5 space-y-3"
                >
                  <p className="font-bold text-xs sm:text-sm text-[#27374D] leading-relaxed">
                    Kasus #{q.id}: {q.scenario}
                  </p>
                  <p className="text-xs text-slate-500 italic">Pengirim: {q.sender}</p>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt, idx) => {
                      const isChosen = selectedAnswer === opt.categoryName;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.categoryName }));
                            setShowQuizFeedback((prev) => ({ ...prev, [q.id]: true }));
                          }}
                          className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                            isChosen
                              ? opt.isCorrect
                                ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                                : "border-rose-500 bg-rose-50 text-rose-950 font-bold"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {opt.categoryName}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && selectedOpt && (
                    <div
                      className={`rounded-xl p-3 text-xs leading-relaxed border ${
                        selectedOpt.isCorrect
                          ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                          : "bg-rose-50 border-rose-200 text-rose-950"
                      }`}
                    >
                      <strong className="font-bold block mb-0.5">
                        {selectedOpt.isCorrect ? "✓ Tepat Sekali!" : "✕ Masih Kurang Tepat"}
                      </strong>
                      <span>{selectedOpt.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 10: Interactive Checklist Tindakan Nyata */}
        <section id="checklist" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-5 scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
                Checklist 5 Tindakan Nyata
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                Langkah konkret membentengi diri dan keluarga dari modus teratas.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-800 self-start sm:self-auto">
              {completedChecksCount} / {data.interactiveChecklist.length} Langkah Selesai
            </span>
          </div>

          <div className="space-y-3">
            {data.interactiveChecklist.map((item) => {
              const isChecked = !!checkedItems[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all flex items-start gap-3.5 select-none ${
                    isChecked
                      ? "border-emerald-300 bg-emerald-50/50 shadow-2xs"
                      : "border-slate-200 bg-[#FFFDF9] hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isChecked
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                  >
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-xs sm:text-sm font-bold ${
                        isChecked ? "text-emerald-950 line-through" : "text-[#27374D]"
                      }`}
                    >
                      {item.action}
                    </p>
                    <p className="text-[11px] text-[#526D82]">{item.reason}</p>
                    {item.verificationNote && (
                      <p className="text-[10px] text-slate-400 italic">
                        {item.verificationNote}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {completedChecksCount === data.interactiveChecklist.length && (
            <div className="rounded-2xl bg-emerald-100 border border-emerald-300 p-4 text-xs sm:text-sm text-emerald-950 flex items-center gap-3">
              <Award className="h-6 w-6 text-emerald-700 shrink-0" />
              <div>
                <strong className="font-extrabold block">Lencana: Pengamat Pola Nasional</strong>
                <span>Kamu telah menyelesaikan seluruh checklist perlindungan modus penipuan terbanyak!</span>
              </div>
            </div>
          )}
        </section>

        {/* Section 11: Langkah Jika Terlanjur Jadi Korban (SOP Darurat) */}
        <section id="sop-darurat" className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32">
          <div className="border-b border-rose-200/80 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-rose-950">
              Jika Sudah Terlanjur Jadi Korban Penipuan Digital
            </h2>
            <p className="text-xs sm:text-sm text-rose-900/80 mt-0.5">
              Lakukan tindakan berurutan ini secepat mungkin tanpa menyalahkan diri sendiri.
            </p>
          </div>

          <div className="space-y-3">
            {data.emergencySteps.map((st) => (
              <div
                key={st.order}
                className="rounded-2xl border border-rose-200 bg-white p-4 sm:p-5 space-y-1.5 shadow-2xs"
              >
                <h3 className="font-extrabold text-sm sm:text-base text-rose-950">
                  {st.order}. {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {st.action}
                </p>
                <p className="text-[11px] text-blue-900 bg-blue-50/60 p-2 rounded-lg border border-blue-200 pl-3 leading-relaxed flex items-start gap-1.5">
                  <Info className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{st.twoReportingChannels}</span>
                </p>
                {st.verificationNote && (
                  <p className="text-[10px] text-slate-400 italic">
                    {st.verificationNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 12: Intisari & Tautan Antarmodul */}
        <section id="intisari" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 block">
              INTISARI POLA NASIONAL
            </span>
            <p className="text-sm sm:text-base font-semibold leading-relaxed">
              "{data.takeaway}"
            </p>
          </div>

          {/* Tautan Antarmodul Terkait */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-700 block">
              Pelajari Lebih Lanjut Modul Terkait:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => onSelectModule ? onSelectModule("m2") : onNavigateTab("modul")}
                className="rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-3 text-left transition-colors space-y-1 cursor-pointer"
              >
                <strong className="text-xs text-slate-900 block truncate">
                  Anatomi Sebuah Penipuan
                </strong>
                <p className="text-[11px] text-slate-500">
                  Pelajari 5 fase alur dan titik intervensi konkret.
                </p>
              </button>

              <button
                onClick={() => onSelectModule ? onSelectModule("m3") : onNavigateTab("modul")}
                className="rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-3 text-left transition-colors space-y-1 cursor-pointer"
              >
                <strong className="text-xs text-slate-900 block truncate">
                  Keamanan di WhatsApp
                </strong>
                <p className="text-[11px] text-slate-500">
                  Lindungi kanal obrolan utama dari pengambilalihan akun.
                </p>
              </button>

              <button
                onClick={() => onSelectModule ? onSelectModule("m1") : onNavigateTab("modul")}
                className="rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-3 text-left transition-colors space-y-1 cursor-pointer"
              >
                <strong className="text-xs text-slate-900 block truncate">
                  Apa Itu Rekayasa Sosial?
                </strong>
                <p className="text-[11px] text-slate-500">
                  Pahami sisi psikologi mengapa manusia mudah tertipu.
                </p>
              </button>
            </div>
          </div>

          {/* Rujukan Sumber Resmi & Disclaimer */}
          <div className="space-y-3 pt-3 text-xs text-slate-500 border-t border-slate-100">
            <div>
              <span className="font-bold text-slate-700">Sumber Rujukan Data Publik:</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
              {data.sourcesList.map((src, i) => (
                <li key={i}>
                  <strong className="text-slate-700">{src.title}</strong> — {src.organization} ({src.period})
                  <span className="block text-slate-400 font-mono text-[10px]">
                    {src.url}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-slate-400 leading-relaxed pt-2">
              {data.disclaimer}
            </p>
          </div>
        </section>
    </ModulDetailLayout>
  );
}

