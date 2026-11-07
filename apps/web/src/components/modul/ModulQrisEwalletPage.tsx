import React, { useState, useEffect, useMemo } from "react";
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
  QrCode,
  Store,
  ShoppingBag,
  ArrowDownRight,
  ArrowUpRight,
  Lock,
  Printer,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";
import {
  MODUL_QRIS_EWALLET,
  type CashierHotspot,
  type QrisModusCard,
  type QrisQuizItem,
} from "../../data/modulQrisEwallet";

interface ModulQrisEwalletPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function ModulQrisEwalletPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
}: ModulQrisEwalletPageProps) {
  const data = MODUL_QRIS_EWALLET;

  // 1. Role tab state: "pembeli" vs "penjual"
  const [activeRole, setActiveRole] = useState<"pembeli" | "penjual">("pembeli");

  // 2. Hotspot inspection state
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>("spot-stiker");

  // 3. Mockup decision state
  const [mockupDecision, setMockupDecision] = useState<"bayar" | "batal" | null>(null);

  // 4. Seller screenshot simulation decision
  const [sellerSimulationChoice, setSellerSimulationChoice] = useState<number | null>(null);

  // 5. Checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`jagaruang_chk_${data.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 6. Mini Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, "aman" | "mencurigakan">>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState<Record<number, boolean>>({});

  // 7. Poster print / copy feedback
  const [copiedPoster, setCopiedPoster] = useState(false);

  // 8. Emergency drawer state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // 9. Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(Math.min(100, Math.round((totalScroll / windowHeight) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const nextVal = !prev[id];
      const updated = { ...prev, [id]: nextVal };
      try {
        localStorage.setItem(`jagaruang_chk_${data.id}`, JSON.stringify(updated));
      } catch {
        // no-op
      }
      return updated;
    });
  };

  const handleCopyPoster = () => {
    const posterText = `🏪 POSTER PANDUAN PEDAGANG AMAN QRIS (JagaRuang) 🏪\n\n${data.merchantPrintPoster.points.map((p) => `${p.rule}\nAlasan: ${p.why}`).join("\n\n")}\n\nEdukasi resmi sistem pembayaran: JagaRuang.id`;
    navigator.clipboard.writeText(posterText);
    setCopiedPoster(true);
    setTimeout(() => setCopiedPoster(false), 2500);
  };

  const currentChecklist = useMemo(() => {
    return activeRole === "pembeli" ? data.checklistBuyer : data.checklistSeller;
  }, [activeRole, data.checklistBuyer, data.checklistSeller]);

  const completedChecksCount = useMemo(() => {
    return currentChecklist.filter((it) => !!checkedItems[it.id]).length;
  }, [checkedItems, currentChecklist]);

  const selectedHotspot = useMemo(() => {
    return (
      data.cashierHotspots.find((h) => h.id === selectedHotspotId) ||
      data.cashierHotspots[0]
    );
  }, [selectedHotspotId, data.cashierHotspots]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] pb-24 text-[#27374D]">
      {/* Top Floating Progress Bar */}
      <div className="sticky top-0 z-40 h-1.5 w-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        {/* Navigation Bar & Quick Emergency Toggle */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#526D82] shadow-2xs hover:bg-slate-50 hover:text-[#27374D] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Hub Belajar</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEmergencyOpen(!isEmergencyOpen)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-800 shadow-2xs hover:bg-rose-100 transition-colors"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
              <span>{isEmergencyOpen ? "Tutup SOP Darurat" : "Jika Sudah Terlanjur"}</span>
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              <Clock className="h-3.5 w-3.5" />
              {data.readingTime}
            </span>

            <button
              onClick={onToggleRead}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shadow-2xs ${
                isRead
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <CheckCircle2
                className={`h-4 w-4 ${isRead ? "text-emerald-600 fill-emerald-100" : "text-slate-400"}`}
              />
              <span>{isRead ? "Tuntas Dibaca" : "Tandai Selesai"}</span>
            </button>
          </div>
        </div>

        {/* Quick Emergency Protocol Drawer */}
        {isEmergencyOpen && (
          <div className="mb-8 rounded-3xl border-2 border-rose-400 bg-rose-50/70 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-rose-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-600" />
                <h3 className="font-extrabold text-base text-rose-950">
                  Langkah Darurat: Jika Terlanjur Memindai QRIS Palsu / Terbagi PIN
                </h3>
              </div>
              <button
                onClick={() => setIsEmergencyOpen(false)}
                className="text-xs font-bold text-rose-800 hover:underline"
              >
                Tutup
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.emergencySteps.map((st) => (
                <div
                  key={st.order}
                  className="rounded-2xl border border-rose-200 bg-white p-4 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white font-extrabold text-xs">
                      {st.order}
                    </span>
                    <strong className="text-xs sm:text-sm font-bold text-rose-950">
                      {st.title}
                    </strong>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-7">{st.action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700">
            <QrCode className="h-4 w-4" />
            <span>Modul Transaksi Digital #{data.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#27374D]">
            {data.title}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#526D82]">
            {data.opener.highlight}
          </p>
          <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-4 text-xs sm:text-sm text-blue-950 leading-relaxed flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
            <p>{data.opener.explanation}</p>
          </div>
        </div>

        {/* Section 1: Prinsip Arah Uang (Membayar vs Menerima) */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">
              <Lock className="h-3.5 w-3.5" />
              Aturan Dasar
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              {data.moneyDirectionPrinciple.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box Membayar */}
            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/30 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-black text-rose-900 text-xs uppercase">
                  <ArrowUpRight className="h-4 w-4 text-rose-600" />
                  Membayar (Uang Keluar)
                </span>
                <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                  Wajib PIN
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.moneyDirectionPrinciple.payingExplanation}
              </p>
            </div>

            {/* Box Menerima */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/30 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-black text-emerald-900 text-xs uppercase">
                  <ArrowDownRight className="h-4 w-4 text-emerald-600" />
                  Menerima (Uang Masuk)
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Tanpa PIN / OTP
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.moneyDirectionPrinciple.receivingExplanation}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#27374D] p-4 text-xs sm:text-sm font-semibold text-white flex items-start gap-3">
            <Lock className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {data.moneyDirectionPrinciple.goldenRulePinOtp}
            </p>
          </div>
        </section>

        {/* Section 2: Pilihan Peran (Tab: Aku Pembeli vs Aku Penjual) */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
                Pilih Sudut Pandang Peranmu
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                Konten dan checklist di bawah akan disesuaikan dengan kebutuhan peranmu.
              </p>
            </div>
            {/* Role Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setActiveRole("pembeli")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeRole === "pembeli"
                    ? "bg-[#27374D] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Aku Pembeli</span>
              </button>
              <button
                onClick={() => setActiveRole("penjual")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeRole === "penjual"
                    ? "bg-[#27374D] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Store className="h-4 w-4" />
                <span>Aku Penjual / Kasir</span>
              </button>
            </div>
          </div>

          {/* ROLLED CONTENT: JIKA AKU PEMBELI */}
          {activeRole === "pembeli" && (
            <div className="space-y-8">
              {/* Interactive SVG Meja Kasir & Kotak Amal Hotspot */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-base text-[#27374D]">
                  Inspeksi Titik Rawan: Meja Kasir & Kotak Amal
                </h3>
                <p className="text-xs text-[#526D82]">
                  Pilih salah satu titik pemeriksaan di bawah untuk melihat potensi manipulasi fisik:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {data.cashierHotspots.map((h: CashierHotspot) => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHotspotId(h.id)}
                      className={`rounded-2xl border p-3 text-left text-xs font-semibold transition-all ${
                        selectedHotspotId === h.id
                          ? "border-blue-600 bg-blue-50/70 text-blue-950 font-bold shadow-2xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-black text-[10px] text-slate-400 mb-0.5">TITIK TINJAU</div>
                      <div>{h.title}</div>
                    </button>
                  ))}
                </div>

                {/* Hotspot Active Explanation */}
                <div className="rounded-2xl border border-blue-200 bg-[#FFFDF9] p-5 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm">
                    <Info className="h-4 w-4 text-blue-700" />
                    <span>{selectedHotspot.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Cara Periksa: </strong>
                    {selectedHotspot.inspectionTip}
                  </p>
                  <p className="text-xs text-blue-900 leading-relaxed font-medium">
                    💡 {selectedHotspot.safetyAdvice}
                  </p>
                </div>
              </div>

              {/* Mockup Layar Konfirmasi Pembayaran QRIS */}
              <div className="rounded-3xl border-2 border-slate-300 bg-slate-900 p-6 text-white space-y-4">
                <div className="border-b border-slate-700 pb-3">
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">
                    Simulasi Layar Ponsel Pembeli
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1">
                    {data.merchantMockupSimulation.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {data.merchantMockupSimulation.intro}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-800 p-4 space-y-2 border border-slate-700 text-xs sm:text-sm">
                  <div className="text-slate-400 text-xs">Merchant Penerima Dana:</div>
                  <div className="font-mono text-amber-300 font-black text-sm sm:text-base">
                    {data.merchantMockupSimulation.displayedMerchantName}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700 text-xs">
                    <span className="text-slate-400">Total Nominal:</span>
                    <span className="font-extrabold text-white">{data.merchantMockupSimulation.amount}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => setMockupDecision("bayar")}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      mockupDecision === "bayar"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    }`}
                  >
                    Lanjut Bayar & Ketik PIN
                  </button>
                  <button
                    onClick={() => setMockupDecision("batal")}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      mockupDecision === "batal"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    }`}
                  >
                    Batalkan Transaksi
                  </button>
                </div>

                {mockupDecision && (
                  <div
                    className={`rounded-2xl p-4 text-xs leading-relaxed border ${
                      mockupDecision === "batal"
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                        : "bg-rose-950/80 border-rose-500 text-rose-200"
                    }`}
                  >
                    {mockupDecision === "batal"
                      ? data.merchantMockupSimulation.explanationIfCancelled
                      : data.merchantMockupSimulation.explanationIfPaid}
                  </div>
                )}
              </div>

              {/* 4 Modus Utama untuk Pembeli */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-base text-[#27374D]">
                  4 Modus Penipuan yang Mengincar Pembeli
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.buyerModusList.map((m: QrisModusCard) => (
                    <div
                      key={m.id}
                      className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-5 space-y-3 shadow-2xs"
                    >
                      <h4 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                        {m.title}
                      </h4>
                      <p className="text-xs text-[#526D82] leading-relaxed">
                        {m.shortSummary}
                      </p>
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-[11px] font-mono text-slate-800">
                        {m.sampleScenario}
                      </div>
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-950 flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Cara Berhenti: </strong>
                          <span>{m.howToStop}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ROLLED CONTENT: JIKA AKU PENJUAL */}
          {activeRole === "penjual" && (
            <div className="space-y-8">
              {/* Simulasi Kasir: Pembeli Menunjukkan Layar Berhasil */}
              <div className="rounded-3xl border border-slate-200 bg-[#FFFDF9] p-6 space-y-4 shadow-xs">
                <div className="border-b border-slate-200 pb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    <Store className="h-3.5 w-3.5 text-amber-700" />
                    Simulasi Keputusan Kasir
                  </span>
                  <h3 className="text-base font-extrabold text-[#27374D] mt-2">
                    {data.sellerScreenshotSimulation.title}
                  </h3>
                  <p className="text-xs text-[#526D82] mt-0.5 leading-relaxed">
                    {data.sellerScreenshotSimulation.situation}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.sellerScreenshotSimulation.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSellerSimulationChoice(idx)}
                      className={`rounded-2xl border p-4 text-left text-xs font-semibold transition-all ${
                        sellerSimulationChoice === idx
                          ? opt.isSafe
                            ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                            : "border-rose-500 bg-rose-50 text-rose-950 font-bold"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {opt.action}
                    </button>
                  ))}
                </div>

                {sellerSimulationChoice !== null && (
                  <div
                    className={`rounded-2xl p-4 text-xs leading-relaxed border ${
                      data.sellerScreenshotSimulation.options[sellerSimulationChoice].isSafe
                        ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                        : "bg-rose-50 border-rose-200 text-rose-950"
                    }`}
                  >
                    {data.sellerScreenshotSimulation.options[sellerSimulationChoice].explanation}
                  </div>
                )}
              </div>

              {/* Modus Penjual Cards */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-base text-[#27374D]">
                  2 Modus yang Sering Merugikan Pedagang
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.sellerModusList.map((m: QrisModusCard) => (
                    <div
                      key={m.id}
                      className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-5 space-y-3 shadow-2xs"
                    >
                      <h4 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                        {m.title}
                      </h4>
                      <p className="text-xs text-[#526D82] leading-relaxed">
                        {m.shortSummary}
                      </p>
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-[11px] font-mono text-slate-800">
                        {m.sampleScenario}
                      </div>
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-950 flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Tindakan Kasir: </strong>
                          <span>{m.howToStop}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Poster Panduan Pedagang Siap Cetak / Salin */}
              <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Printer className="h-5 w-5 text-blue-700" />
                    <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                      {data.merchantPrintPoster.title}
                    </h4>
                  </div>
                  <button
                    onClick={handleCopyPoster}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors shadow-2xs"
                  >
                    {copiedPoster ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Salin Teks Poster</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {data.merchantPrintPoster.points.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-blue-200 bg-white p-4 space-y-1 text-xs shadow-2xs"
                    >
                      <strong className="text-blue-950 font-bold block">{p.rule}</strong>
                      <p className="text-slate-600">{p.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Red Flags Khusus Sesuai Peran */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Tanda Kejanggalan (Red Flags) untuk {activeRole === "pembeli" ? "Pembeli" : "Penjual"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {(activeRole === "pembeli" ? data.redFlagsBuyer : data.redFlagsSeller).map(
              (rf: any) => (
                <div
                  key={rf.id}
                  className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 sm:p-5 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{rf.title}</span>
                  </div>
                  <p className="text-xs text-[#526D82] leading-relaxed">
                    {rf.explanation}
                  </p>
                  {rf.isSupportingOnly && rf.supportingNote && (
                    <p className="text-[10px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 leading-relaxed italic">
                      {rf.supportingNote}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </section>

        {/* Section 4: Interactive Checklist */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
                Checklist Praktis {activeRole === "pembeli" ? "Pembeli" : "Penjual"}
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                Pastikan prinsip ini kamu lakukan di setiap transaksi.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
              {completedChecksCount} / {currentChecklist.length} Selesai
            </span>
          </div>

          <div className="space-y-3">
            {currentChecklist.map((item) => {
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
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Latihan Kuis "Aman atau Mencurigakan?" */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
              <HelpCircle className="h-3.5 w-3.5" />
              Latihan Refleks Cepat (3 Kasus)
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              Kuis: Aman atau Mencurigakan?
            </h2>
          </div>

          <div className="space-y-6">
            {data.quizQuestions.map((q: QrisQuizItem) => {
              const selectedDecision = quizAnswers[q.id];
              const isAnswered = showQuizFeedback[q.id];
              const selectedOpt = q.options.find((opt) => opt.decision === selectedDecision);

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-5 space-y-3 shadow-2xs"
                >
                  <p className="font-bold text-xs sm:text-sm text-[#27374D] leading-relaxed">
                    Kasus #{q.id}: {q.situation}
                  </p>
                  <p className="text-xs text-slate-500 italic">Konteks: {q.context}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, idx) => {
                      const isChosen = selectedDecision === opt.decision;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.decision }));
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
                          {opt.label}
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
                        {selectedOpt.isCorrect ? "✓ Keputusan Tepat!" : "✕ Kurang Aman!"}
                      </strong>
                      <span>{selectedOpt.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Intisari & Rujukan Sumber */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 block">
              INTISARI PERLINDUNGAN QRIS & E-WALLET
            </span>
            <p className="text-sm sm:text-base font-semibold leading-relaxed">
              "{data.takeaway}"
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-slate-700">Sumber Rujukan Literasi:</span>
              <span>Terakhir Diperbarui: {data.lastUpdated}</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
              {data.sources.map((src, i) => (
                <li key={i}>
                  <strong className="text-slate-700">{src.organization}</strong>: {src.title}
                  {src.url && (
                    <span className="block text-slate-400 font-mono text-[10px]">
                      {src.url} // TODO: verifikasi manual di situs resmi Bank Indonesia
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-slate-400 leading-relaxed pt-2">
              {data.disclaimer}
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] hover:text-[#27374D]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Daftar Modul</span>
            </button>

            <button
              onClick={() => onNavigateTab("modul")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#27374D] px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-[#1E293B] transition-colors"
            >
              <span>Lanjut ke Modul Pinjaman Online Ilegal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>

      {/* STICKY BOTTOM BAR: "CEK 5 DETIK SEBELUM BAYAR" */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-[#27374D]/95 backdrop-blur-md border-t border-slate-700 p-3 sm:p-3.5 text-white shadow-lg">
        <div className="mx-auto max-w-4xl px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              5s
            </span>
            <div className="text-xs leading-tight">
              <strong className="font-extrabold text-amber-300 block">
                Cek 5 Detik Sebelum Bayar QRIS:
              </strong>
              <span className="text-slate-200">
                1. Baca nama merchant di layar · 2. Cek nominal · 3. JANGAN ketik PIN untuk 'terima' uang
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              const text = "🛡️ Cek 5 Detik Sebelum Bayar QRIS:\n1. Baca nama merchant di layar HP\n2. Cek nominalnya tepat\n3. Jangan pernah masukkan PIN untuk 'menerima' uang!\n(JagaRuang.id)";
              navigator.clipboard.writeText(text);
              addNotification({
                title: "Ringkasan Tersalin",
                message: "Tips 5 detik sebelum bayar QRIS berhasil disalin ke clipboard.",
                type: "info",
                link: "/belajar?tab=modul",
              });
            }}
            className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 text-[11px] font-bold text-white transition-colors"
          >
            Salin Tips
          </button>
        </div>
      </div>
    </div>
  );
}

