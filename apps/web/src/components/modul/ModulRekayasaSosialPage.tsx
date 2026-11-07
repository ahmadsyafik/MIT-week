import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart,
  Globe,
  MessageSquare,
  PhoneCall,
  FileCode,
  Download,
  UserCheck,
  Send,
  Award,
  Zap,
  Lock,
  Camera,
  KeyRound,
  Smartphone,
  ChevronDown,
  RotateCcw,
  ExternalLink,
  BookOpen,
  Info,
  CheckSquare,
  Share2,
} from "lucide-react";
import { Button } from "../ui";
import { addNotification } from "../../lib/notificationService";
import {
  MODUL_REKAYASA_SOSIAL,
  type ScenarioHookChoice,
} from "../../data/modulRekayasaSosial";

interface ModulRekayasaSosialPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function ModulRekayasaSosialPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
}: ModulRekayasaSosialPageProps) {
  const data = MODUL_REKAYASA_SOSIAL;

  // ---------------------------------------------------------------------------
  // STATE INTERAKTIF
  // ---------------------------------------------------------------------------

  // 1. Hook Pembuka
  const [selectedHookChoice, setSelectedHookChoice] = useState<ScenarioHookChoice | null>(null);

  // 2. Accordion State untuk Prinsip & Jenis Serangan
  const [openPrincipleId, setOpenPrincipleId] = useState<string>("otoritas");
  const [openAttackTypeId, setOpenAttackTypeId] = useState<string>("phishing");

  // 3. Interactive Red Flag Spotter
  const [spottedRedFlags, setSpottedRedFlags] = useState<string[]>([]);
  const [activeRedFlagDetail, setActiveRedFlagDetail] = useState<{
    id: string;
    text: string;
    reason: string;
  } | null>(null);

  // 4. Checklist Interaktif Tersimpan Lokal
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("jagaruang_modul_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Mini Kuis State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, "A" | "B" | "C">>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // 6. Scroll Tracking & Progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("skenario-pembuka");

  // ---------------------------------------------------------------------------
  // SECTIONS CONFIG FOR TABLE OF CONTENTS & PROGRESS
  // ---------------------------------------------------------------------------
  const SECTIONS = useMemo(
    () => [
      { id: "skenario-pembuka", label: "1. Uji Refleks Pembuka" },
      { id: "definisi", label: "2. Apa Itu Rekayasa Sosial" },
      { id: "prinsip-psikologis", label: "3. 5 Trik Psikologis" },
      { id: "jenis-serangan", label: "4. 6 Ragam Modus" },
      { id: "anatomi", label: "5. Timeline 4 Tahap" },
      { id: "komparasi-pesan", label: "6. Deteksi Pesan Palsu" },
      { id: "red-flags", label: "7. 7 Tanda Bahaya" },
      { id: "checklist", label: "8. Checklist Perlindungan" },
      { id: "mitigasi-darurat", label: "9. Pertolongan Pertama" },
      { id: "mini-kuis", label: "10. Kuis Literasi" },
      { id: "sumber-resmi", label: "11. Sumber & Catatan" },
    ],
    []
  );

  // Scroll listener untuk progress bar & active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(currentProgress);
      }

      // Deteksi active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSectionId(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [SECTIONS]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ---------------------------------------------------------------------------
  // HANDLERS CHECKLIST & PROGRESS
  // ---------------------------------------------------------------------------
  const toggleCheck = (idx: number) => {
    const checkKey = `${data.id}_chk_${idx}`;
    setCheckedItems((prev) => {
      const willBeChecked = !prev[checkKey];
      const next = { ...prev, [checkKey]: willBeChecked };
      try {
        localStorage.setItem("jagaruang_modul_checks", JSON.stringify(next));
      } catch {
        // no-op
      }

      // Hitung apakah sudah lengkap
      let allDone = true;
      for (let i = 0; i < data.checklist.length; i++) {
        if (!next[`${data.id}_chk_${i}`]) {
          allDone = false;
          break;
        }
      }

      if (allDone && !isRead) {
        onToggleRead();
        addNotification({
          title: `Lencana Terbuka: ${data.badgeReward.title}`,
          message: `Selamat! Kamu telah mempraktikkan seluruh checklist perlindungan rekayasa sosial.`,
          type: "sukses",
          link: "/belajar?tab=modul&module=m1",
        });
      }

      return next;
    });
  };

  const completedChecksCount = useMemo(() => {
    return data.checklist.filter((_, idx) => !!checkedItems[`${data.id}_chk_${idx}`]).length;
  }, [data.checklist, checkedItems, data.id]);

  // ---------------------------------------------------------------------------
  // HANDLERS RED FLAG SPOTTER
  // ---------------------------------------------------------------------------
  const handleSpotRedFlag = (rf: { id: string; textSnippet: string; reason: string }) => {
    if (!spottedRedFlags.includes(rf.id)) {
      setSpottedRedFlags((prev) => [...prev, rf.id]);
    }
    setActiveRedFlagDetail({
      id: rf.id,
      text: rf.textSnippet,
      reason: rf.reason,
    });
  };

  // ---------------------------------------------------------------------------
  // HANDLERS QUIZ
  // ---------------------------------------------------------------------------
  const handleSelectQuizOption = (questionId: number, key: "A" | "B" | "C") => {
    if (showQuizResults) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: key }));
  };

  const quizScore = useMemo(() => {
    let correct = 0;
    data.quiz.forEach((q) => {
      const selected = quizAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (selected && correctOption && selected === correctOption.key) {
        correct += 1;
      }
    });
    return Math.round((correct / data.quiz.length) * 100);
  }, [data.quiz, quizAnswers]);

  const handleFinishQuiz = () => {
    setShowQuizResults(true);
    if (quizScore >= 75 && !isRead) {
      onToggleRead();
      addNotification({
        title: `Kuis Modul Berhasil: ${quizScore}/100`,
        message: `Pemahaman literasi anti-rekayasa sosialmu sangat tajam! Siap menguji refleks langsung di Simulator Skenario?`,
        type: "sukses",
        link: "/belajar?tab=simulator",
      });
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  const handleFinishAndRecord = () => {
    if (!isRead) onToggleRead();
    addNotification({
      title: `Modul Selesai: ${data.title}`,
      message: `Pemahaman konsep '${data.title}' berhasil dicatat di profil belajarmu.`,
      type: "sukses",
      link: "/belajar?tab=simulator",
    });
  };

  // Current section index for progress label
  const currentSectionIndex = useMemo(() => {
    const idx = SECTIONS.findIndex((s) => s.id === activeSectionId);
    return idx >= 0 ? idx + 1 : 1;
  }, [SECTIONS, activeSectionId]);

  return (
    <div className="relative w-full space-y-6">
      {/* ===================================================================== */}
      {/* 1. STICKY TOP READING PROGRESS BAR                                   */}
      {/* ===================================================================== */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-white/95 backdrop-blur-md border-b border-[#9DB2BF]/40 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="h-4 w-4 text-[#526D82] shrink-0" />
          <span className="text-xs font-bold text-[#27374D] truncate">
            {data.title}
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#526D82] bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            Bagian {currentSectionIndex} dari {SECTIONS.length}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] font-black text-[#27374D] min-w-[36px] text-right">
            {Math.round(scrollProgress)}%
          </span>
          <div className="w-20 sm:w-28 h-2 bg-[#DDE6ED] rounded-full overflow-hidden border border-[#9DB2BF]/40">
            <div
              className="h-full bg-gradient-to-r from-[#526D82] to-[#27374D] transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Bar Navigasi Sederhana */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526D82] hover:text-[#27374D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Modul Pembelajaran</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#526D82] flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {data.readingTime}
          </span>
          <button
            type="button"
            onClick={onToggleRead}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${isRead
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200"
              }`}
          >
            {isRead ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Selesai Dipelajari</span>
              </>
            ) : (
              <span>Tandai Selesai</span>
            )}
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* LAYOUT DUA KOLOM: KONTEN UTAMA (KIRI) + TABLE OF CONTENTS (KANAN)      */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* KOLOM KIRI (KONTEN MODUL UTAMA) */}
        <article className="lg:col-span-8 xl:col-span-9 space-y-10 min-w-0">
          {/* Header Modul Utama */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 text-[#526D82] border border-slate-200 px-3 py-0.5 text-xs font-bold">
                {data.category}
              </span>
              <span className="text-xs text-[#526D82]">
                Diperbarui: {data.terakhirDiperbaruiLabel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#27374D] leading-tight tracking-tight">
              {data.title}
            </h1>

            <p className="text-sm sm:text-base text-[#526D82] leading-relaxed bg-[#DDE6ED]/30 p-4 sm:p-5 rounded-2xl border border-[#9DB2BF]/40 font-normal">
              {data.summary}
            </p>
          </div>

          {/* ================================================================= */}
          {/* BAGIAN 1: HOOK PEMBUKA (SKENARIO INTERAKTIF)                     */}
          {/* ================================================================= */}
          <section id="skenario-pembuka" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 1 · Uji Refleks Spontan
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Bayangkan Kamu Menerima Pesan Ini Pagi Ini
              </h2>
            </div>

            {/* Mockup Balon Chat / SMS Masuk */}
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-4 sm:p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs text-amber-900 border-b border-amber-200/80 pb-2">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertOctagon className="h-4 w-4 text-amber-700 shrink-0" />
                  {data.scenarioHook.sender}
                </span>
                <span className="text-[11px] font-mono">{data.scenarioHook.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed font-sans">
                {data.scenarioHook.messageText}
              </p>
            </div>

            {/* Pertanyaan Keputusan */}
            <div className="space-y-3 pt-2">
              <p className="text-sm font-bold text-[#27374D]">
                👉 {data.scenarioHook.question}
              </p>

              <div className="space-y-2.5">
                {data.scenarioHook.choices.map((choice) => {
                  const isSelected = selectedHookChoice?.id === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => setSelectedHookChoice(choice)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${isSelected
                          ? choice.isCorrect
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-400/30 font-bold"
                            : "bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/30 font-bold"
                          : "bg-white border-slate-200 hover:border-[#526D82] hover:bg-slate-50 text-slate-800"
                        }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${isSelected
                            ? choice.isCorrect
                              ? "bg-emerald-600 text-white"
                              : "bg-rose-600 text-white"
                            : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {choice.id}
                      </span>
                      <span className="flex-1 leading-snug">{choice.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Umpan Balik Instan */}
            {selectedHookChoice && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border animate-fadeIn space-y-2 ${selectedHookChoice.isCorrect
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-rose-50 border-rose-300 text-rose-900"
                  }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {selectedHookChoice.isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span>Keputusan Tepat &amp; Kritis!</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
                      <span>Waspada! Respons Ini Berbahaya</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed pl-7">
                  {selectedHookChoice.feedback}
                </p>
              </div>
            )}

            {/* Callout Intisari Bagian 1 */}
            <div className="rounded-2xl bg-[#DDE6ED]/60 border border-[#9DB2BF]/40 p-4 flex items-start gap-3 text-xs text-[#27374D]">
              <Info className="h-4 w-4 text-[#526D82] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong className="text-[#27374D]">Intisari Skenario:</strong>{" "}
                {data.scenarioHook.callout}
              </p>
            </div>
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 2: APA ITU REKAYASA SOSIAL (DEFINISI & ANALOGI)            */}
          {/* ================================================================= */}
          <section id="definisi" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 2 · Fondasi Konsep
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Apa Sebenarnya Rekayasa Sosial Itu?
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              {data.definition.core}
            </p>

            {/* Kartu Analogi Visual Sederhana */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <Lock className="h-4 w-4 text-amber-300" />
                <span>Analogi Sederhana: Pintu Baja &amp; Penyamaran</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {data.definition.analogy}
              </p>
            </div>

            {/* Callout Intisari Bagian 2 */}
            <div className="rounded-2xl bg-[#DDE6ED]/60 border border-[#9DB2BF]/40 p-4 flex items-start gap-3 text-xs text-[#27374D]">
              <Info className="h-4 w-4 text-[#526D82] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong className="text-[#27374D]">Intisari Konsep:</strong>{" "}
                {data.definition.callout}
              </p>
            </div>
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 3: KENAPA KITA BISA TERTIPU (5 PRINSIP PSIKOLOGIS)        */}
          {/* ================================================================= */}
          <section id="prinsip-psikologis" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 3 · Psikologi Serangan
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                5 Pemicu Emosi yang Sering Dimanipulasi
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Penipu tidak menyerang kepintaranmu, melainkan naluri alamiah bawah sadar kita.
              </p>
            </div>

            {/* Accordion / List 5 Prinsip */}
            <div className="space-y-3">
              {data.principles.map((pr) => {
                const isOpen = openPrincipleId === pr.id;
                return (
                  <div
                    key={pr.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenPrincipleId(isOpen ? "" : pr.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-xl bg-[#DDE6ED] text-[#27374D] flex items-center justify-center font-bold shrink-0">
                          {pr.id === "otoritas" && <ShieldAlert className="h-4.5 w-4.5" />}
                          {pr.id === "urgensi" && <Clock className="h-4.5 w-4.5" />}
                          {pr.id === "rasa-takut" && <AlertTriangle className="h-4.5 w-4.5" />}
                          {pr.id === "iming-iming" && <Sparkles className="h-4.5 w-4.5" />}
                          {pr.id === "rasa-percaya" && <Heart className="h-4.5 w-4.5" />}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-[#27374D] truncate">
                            {pr.name}
                          </h3>
                          <span className="text-[11px] text-[#526D82] font-medium">
                            Label Modus: {pr.tag}
                          </span>
                        </div>
                      </div>

                      <ChevronDown
                        className={`h-4 w-4 text-[#526D82] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 space-y-3 animate-fadeIn">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {pr.explanation}
                        </p>
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs font-mono text-slate-800">
                          <span className="font-sans font-bold text-[#526D82] block text-[10px] uppercase mb-1">
                            Contoh Kalimat Manipulasi:
                          </span>
                          {pr.exampleMessage}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Callout Intisari Bagian 3 */}
            <div className="rounded-2xl bg-[#DDE6ED]/60 border border-[#9DB2BF]/40 p-4 flex items-start gap-3 text-xs text-[#27374D]">
              <Info className="h-4 w-4 text-[#526D82] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong className="text-[#27374D]">Intisari Psikologi:</strong> Saat emosimu dipicu (kepanikan mendadak atau rasa tergiur peluang besar), otak analitis melambat. Berhentilah sejenak sebelum mengambil tindakan.
              </p>
            </div>
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 4: JENIS-JENIS REKAYASA SOSIAL (ACCORDION KONTEKS INDO)    */}
          {/* ================================================================= */}
          <section id="jenis-serangan" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 4 · Ragam Modus di Indonesia
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                6 Wujud Rekayasa Sosial yang Paling Banyak Memakan Korban
              </h2>
            </div>

            <div className="space-y-3">
              {data.attackTypes.map((atk) => {
                const isOpen = openAttackTypeId === atk.id;
                return (
                  <div
                    key={atk.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenAttackTypeId(isOpen ? "" : atk.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-xl bg-slate-100 text-[#27374D] border border-slate-200 flex items-center justify-center font-bold shrink-0">
                          {atk.id === "phishing" && <Globe className="h-4.5 w-4.5 text-[#526D82]" />}
                          {atk.id === "smishing" && <MessageSquare className="h-4.5 w-4.5 text-[#526D82]" />}
                          {atk.id === "vishing" && <PhoneCall className="h-4.5 w-4.5 text-[#526D82]" />}
                          {atk.id === "pretexting" && <FileCode className="h-4.5 w-4.5 text-[#526D82]" />}
                          {atk.id === "baiting" && <Download className="h-4.5 w-4.5 text-[#526D82]" />}
                          {atk.id === "impersonation" && <UserCheck className="h-4.5 w-4.5 text-[#526D82]" />}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-[#27374D] truncate">
                            {atk.name}
                          </h3>
                          <span className="text-[11px] text-[#526D82]">Kanal: {atk.channel}</span>
                        </div>
                      </div>

                      <ChevronDown
                        className={`h-4 w-4 text-[#526D82] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 space-y-3 animate-fadeIn">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {atk.definition}
                        </p>
                        <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-950">
                          <span className="font-bold text-amber-900 block text-[10px] uppercase mb-1">
                            Kasus Nyata di Indonesia:
                          </span>
                          {atk.indonesiaExample}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Callout Intisari Bagian 4 */}
            <div className="rounded-2xl bg-[#DDE6ED]/60 border border-[#9DB2BF]/40 p-4 flex items-start gap-3 text-xs text-[#27374D]">
              <Info className="h-4 w-4 text-[#526D82] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong className="text-[#27374D]">Intisari Modus:</strong> Kanalnya bisa berbeda (SMS, telepon, WhatsApp, web), namun intinya sama: meminta data rahasia atau mentransfer uang.
              </p>
            </div>
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 5: ANATOMI PENIPUAN (TIMELINE 4 TAHAP VISUAL)              */}
          {/* ================================================================= */}
          <section id="anatomi" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 5 · Anatomi Serangan
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                4 Tahap Alur Terjadinya Penipuan
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Semua penipuan rekayasa sosial mengikuti siklus yang serupa dari awal hingga akhir.
              </p>
            </div>

            {/* Timeline Visual (Grid / Flex Horizontal di Desktop, Vertikal di Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative pt-2">
              {data.anatomy.map((step, idx) => {
                const badgeColor =
                  step.dangerLevel === "Kritis"
                    ? "bg-rose-100 text-rose-800 border-rose-300"
                    : step.dangerLevel === "Tinggi"
                      ? "bg-amber-100 text-amber-800 border-amber-300"
                      : step.dangerLevel === "Sedang"
                        ? "bg-sky-100 text-sky-800 border-sky-300"
                        : "bg-slate-100 text-slate-700 border-slate-300";

                return (
                  <div
                    key={step.step}
                    className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-3 shadow-2xs hover:border-[#526D82] transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#27374D] text-white text-xs font-black shadow-xs">
                          {step.step}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          {step.dangerLevel}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-[#27374D] leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-[#526D82] mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>

                    {idx < data.anatomy.length - 1 && (
                      <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Callout Intisari Bagian 5 */}
            <div className="rounded-2xl bg-[#DDE6ED]/60 border border-[#9DB2BF]/40 p-4 flex items-start gap-3 text-xs text-[#27374D]">
              <Info className="h-4 w-4 text-[#526D82] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong className="text-[#27374D]">Intisari Anatomi:</strong> Jika kamu bisa mengenali tanda kejanggalan di Tahap 1 atau Tahap 2, kamu bisa langsung memutus komunikasi sebelum penipu mencapai Tahap 4.
              </p>
            </div>
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 6: CONTOH PESAN ASLI VS PALSU (INTERACTIVE RED FLAG SPOTTER) */}
          {/* ================================================================= */}
          <section id="komparasi-pesan" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 6 · Spotter Interaktif
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Pembedahan Pesan: Asli vs Rekayasa Sosial
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Ketuk bagian teks yang bergaris putus-putus pada pesan penipu untuk meneliti red flag yang tersembunyi.
              </p>
            </div>

            {/* Counter Kejelian */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-xs font-bold text-[#27374D] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Kejelianmu Menemukan Red Flag:</span>
              </span>
              <span className="text-xs font-black text-[#526D82]">
                {spottedRedFlags.length} dari {data.comparison.fake.redFlags?.length || 4} Terungkap
              </span>
            </div>

            {/* Dua Mockup Chat Berdampingan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Sisi Kiri: Pesan Asli Institusi */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      {data.comparison.official.title}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      RESMI
                    </span>
                  </div>

                  <div className="text-[11px] text-emerald-800 font-mono">
                    {data.comparison.official.senderAddress}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 text-xs sm:text-[13px] text-slate-800 leading-relaxed font-sans shadow-2xs">
                    {data.comparison.official.messageBody}
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                  <span>✓ {data.comparison.official.ctaText}</span>
                </div>
              </div>

              {/* Sisi Kanan: Pesan Penipu Rekayasa Sosial */}
              <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/40 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                    <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                      {data.comparison.fake.title}
                    </span>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      PALSU
                    </span>
                  </div>

                  <div className="text-[11px] text-rose-800 font-mono">
                    <button
                      type="button"
                      onClick={() => {
                        const rf = data.comparison.fake.redFlags?.find((r) => r.id === "rf-sender");
                        if (rf) handleSpotRedFlag(rf);
                      }}
                      className="border-b-2 border-dashed border-rose-500 hover:bg-rose-100 px-1 rounded transition-colors text-left cursor-pointer font-bold"
                      title="Klik untuk meneliti kejanggalan pengirim"
                    >
                      {data.comparison.fake.senderAddress}
                    </button>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-rose-200/80 text-xs sm:text-[13px] text-slate-800 leading-relaxed font-sans shadow-2xs space-y-2">
                    <p>
                      PERINGATAN: Rekening Anda{" "}
                      <button
                        type="button"
                        onClick={() => {
                          const rf = data.comparison.fake.redFlags?.find((r) => r.id === "rf-urgency");
                          if (rf) handleSpotRedFlag(rf);
                        }}
                        className="bg-rose-100 text-rose-900 font-bold px-1 py-0.5 rounded border border-rose-300 hover:bg-rose-200 cursor-pointer underline decoration-dotted"
                      >
                        terancam ditutup hari ini!
                      </button>{" "}
                      Klik{" "}
                      <button
                        type="button"
                        onClick={() => {
                          const rf = data.comparison.fake.redFlags?.find((r) => r.id === "rf-link");
                          if (rf) handleSpotRedFlag(rf);
                        }}
                        className="bg-amber-100 text-amber-900 font-mono text-[11px] px-1 py-0.5 rounded border border-amber-300 hover:bg-amber-200 cursor-pointer underline decoration-dotted"
                      >
                        https://bca-pembaruan-tarif.com/login
                      </button>{" "}
                      untuk pembatalan kenaikan biaya transaksi. Hubungi segera{" "}
                      <button
                        type="button"
                        onClick={() => {
                          const rf = data.comparison.fake.redFlags?.find((r) => r.id === "rf-pressure");
                          if (rf) handleSpotRedFlag(rf);
                        }}
                        className="bg-rose-100 text-rose-900 font-bold px-1 py-0.5 rounded border border-rose-300 hover:bg-rose-200 cursor-pointer underline decoration-dotted"
                      >
                        sebelum saldo terpotong otomatis.
                      </button>
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-semibold text-rose-800 flex items-center gap-1">
                  <span>⚠ {data.comparison.fake.ctaText}</span>
                </div>
              </div>
            </div>

            {/* Popover / Detail Red Flag yang Terpilih */}
            {activeRedFlagDetail && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white animate-fadeIn space-y-2 border border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4" />
                    Penjelasan Red Flag: "{activeRedFlagDetail.text}"
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveRedFlagDetail(null)}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    Tutup ✕
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {activeRedFlagDetail.reason}
                </p>
              </div>
            )}
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 7: 7 TANDA KEJANGGALAN UTAMA (RED FLAGS)                   */}
          {/* ================================================================= */}
          <section id="red-flags" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 7 · Indikator Bahaya
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                7 Tanda Kejanggalan (Red Flags) yang Wajib Diwaspadai
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.redFlags.map((rf, idx) => (
                <div
                  key={rf.id}
                  className="rounded-2xl border border-amber-200/90 bg-amber-50/50 p-4 sm:p-5 space-y-2.5 shadow-2xs hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white text-xs font-black">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-amber-800 border border-amber-300">
                      {rf.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#27374D] leading-snug">
                    {rf.label}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {rf.explanation}
                  </p>
                </div>
              ))}
            </div>

            {/* Callout Intisari Bagian 7 */}
            <div className="rounded-2xl bg-[#DDE6ED]/60 border border-[#9DB2BF]/40 p-4 flex items-start gap-3 text-xs text-[#27374D]">
              <Info className="h-4 w-4 text-[#526D82] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong className="text-[#27374D]">Intisari Red Flag:</strong> Satu tanda kejanggalan saja sudah cukup menjadi alasan mutlak untuk menghentikan komunikasi dan menolak mentransfer apa pun.
              </p>
            </div>
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 8: CHECKLIST TINDAKAN MANDIRI INTERAKTIF                  */}
          {/* ================================================================= */}
          <section id="checklist" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 8 · Langkah Praktik
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Checklist Praktis Tindakan Mandiri
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Centang setiap poin setelah kamu mempraktikkan atau menyepakati langkah berikut.
              </p>
            </div>

            {/* Progress Checklist Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#27374D]">
                <span>Kemajuan Praktik Perlindungan:</span>
                <span className="text-[#526D82]">
                  {completedChecksCount} dari {data.checklist.length} Langkah Selesai
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${(completedChecksCount / data.checklist.length) * 100}%` }}
                />
              </div>
            </div>

            {/* List Checklist */}
            <div className="space-y-3">
              {data.checklist.map((chk, idx) => {
                const checkKey = `${data.id}_chk_${idx}`;
                const isChecked = !!checkedItems[checkKey];

                return (
                  <button
                    key={chk.id}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${isChecked
                        ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium"
                        : "bg-white border-slate-200 hover:border-[#526D82] text-slate-800"
                      }`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs mt-0.5 ${isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white"
                        }`}
                    >
                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <p className={`text-xs sm:text-sm font-bold leading-snug ${isChecked ? "line-through text-slate-500" : "text-[#27374D]"}`}>
                        {chk.task}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                        {chk.reason}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pesan Penyemangat Saat Lengkap */}
            {completedChecksCount === data.checklist.length && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 animate-fadeIn space-y-1">
                <div className="flex items-center gap-2 font-black text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                  <span>Hebat! Seluruh 4 Prinsip Pertahanan Mandiri Sudah Lengkap</span>
                </div>
                <p className="text-xs text-emerald-800 pl-7 leading-relaxed">
                  Refleks keamananmu sudah sangat baik. Pertahankan kebiasaan jeda 5 menit dan verifikasi independen setiap hari.
                </p>
              </div>
            )}
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 9: JIKA TERLANJUR JADI KORBAN (MITIGASI DARURAT)           */}
          {/* ================================================================= */}
          <section id="mitigasi-darurat" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                Bagian 9 · Penyelamatan Cepat
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Pertolongan Pertama Jika Terlanjur Jadi Korban
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Lakukan 5 langkah berurutan ini secepat mungkin untuk membatasi kerugian finansialmu.
              </p>
            </div>

            <div className="space-y-3">
              {data.emergencyMitigation.map((em) => (
                <div
                  key={em.step}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white text-xs font-black mt-0.5">
                      {em.step}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-[#27374D]">
                          {em.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                          {em.urgency}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {em.actionText}
                      </p>
                      {em.contactHelper && (
                        <p className="text-[11px] font-bold text-[#526D82] pt-1">
                          📌 {em.contactHelper}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 10: MINI KUIS LITERASI (4 SOAL INTERAKTIF)                */}
          {/* ================================================================= */}
          <section id="mini-kuis" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 10 · Evaluasi Pemahaman
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Mini Kuis Refleks Keputusan (4 Soal)
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Uji pemahamanmu sebelum menyelesaikan modul ini.
              </p>
            </div>

            <div className="space-y-6">
              {data.quiz.map((q, qIdx) => {
                const userChoice = quizAnswers[q.id];
                const isAnswered = !!userChoice;

                return (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-[#27374D] leading-snug">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isSelected = userChoice === opt.key;
                        let btnStyle = "bg-white border-slate-200 hover:border-[#526D82] text-slate-800";

                        if (showQuizResults) {
                          if (opt.isCorrect) {
                            btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                          } else if (isSelected && !opt.isCorrect) {
                            btnStyle = "bg-rose-100 border-rose-400 text-rose-950 font-bold line-through";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-[#27374D] border-[#27374D] text-white font-bold";
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            disabled={showQuizResults}
                            onClick={() => handleSelectQuizOption(q.id, opt.key)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="font-black shrink-0">{opt.key}.</span>
                            <span className="flex-1 leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showQuizResults && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal animate-fadeIn">
                        <strong className="text-[#27374D] block mb-0.5">Penjelasan Edukasi:</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tombol Selesai Kuis & Hasil */}
            {!showQuizResults ? (
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleFinishQuiz}
                  disabled={Object.keys(quizAnswers).length < data.quiz.length}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  Lihat Skor &amp; Pembahasan Kuis ({Object.keys(quizAnswers).length}/{data.quiz.length} Terjawab)
                </Button>
              </div>
            ) : (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#27374D] text-white space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                      Hasil Evaluasi Kuis
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black mt-0.5">
                      Skor Akhir: {quizScore} / 100
                    </h3>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetQuiz}
                    className="text-white border-white/30 hover:bg-white/10 text-xs self-start"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                    Ulangi Kuis
                  </Button>
                </div>

                {/* Badge Reward */}
                <div className="bg-white/10 p-4 rounded-xl border border-white/15 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-300">
                      Lencana Diberikan: {data.badgeReward.title}
                    </h4>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-normal">
                      {data.badgeReward.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ================================================================= */}
          {/* BAGIAN 11: INTISARI PERLINDUNGAN (TAKEAWAY)                       */}
          {/* ================================================================= */}
          <div className="rounded-3xl bg-[#27374D] text-white p-6 sm:p-8 space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="h-5 w-5" />
              <span>Intisari Perlindungan Utama</span>
            </div>
            <p className="text-base sm:text-lg font-black leading-relaxed text-white">
              "{data.takeaway}"
            </p>
          </div>

          {/* ================================================================= */}
          {/* BAGIAN 12: SUMBER RESMI, DISCLAIMER EDUKASI & TANGGAL             */}
          {/* ================================================================= */}
          <section id="sumber-resmi" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82]">
                Bagian 11 · Rujukan &amp; Verifikasi
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Daftar Sumber Resmi &amp; Kanal Pelaporan
              </h2>
            </div>

            {/* Disclaimer Edukasi Baru */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Disclaimer Edukasi:</strong> {data.disclaimerEdukasi}
              </p>
            </div>

            {/* List Sumber Resmi */}
            <div className="space-y-3">
              {data.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#27374D]">
                      {src.institution}
                    </h4>
                    <p className="text-slate-600 font-medium">
                      Layanan: {src.service} • {src.contact}
                    </p>
                    <p className="text-[11px] text-[#526D82]">{src.note}</p>
                  </div>

                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-[#526D82] hover:text-[#27374D] font-bold transition-colors shrink-0"
                  >
                    <span>Kunjungi Portal</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-xs text-[#526D82] border-t border-slate-100">
              Terakhir diperbarui: <strong>{data.terakhirDiperbaruiLabel}</strong>
            </div>
          </section>

          {/* ================================================================= */}
          {/* AKSI FOOTER TERARAH & KARTU MODUL BERIKUTNYA                     */}
          {/* ================================================================= */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-bold text-[#526D82] hover:text-[#27374D] flex items-center gap-1.5 cursor-pointer order-2 sm:order-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Daftar Modul</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleFinishAndRecord}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Selesai &amp; Catat Progres
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigateTab("simulator")}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  <span>Uji Kasus di Simulator</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* Kartu Modul Rekomendasi Berikutnya */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#526D82]">
                  Langkah Pembelajaran Selanjutnya
                </span>
                <h4 className="text-sm font-bold text-[#27374D]">
                  Modul 2 · Anatomi Sebuah Penipuan
                </h4>
                <p className="text-xs text-[#526D82]">
                  Pembedahan mendalam 5 fase siklus penipuan dari pengintaian hingga pemutusan jejak.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  // Berpindah ke modul 2
                  window.location.href = "/belajar?tab=modul&module=m2";
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#27374D] text-white text-xs font-bold hover:bg-[#1e2a3a] transition-all shrink-0 cursor-pointer shadow-xs"
              >
                <span>Buka Modul 2</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </article>

        {/* =================================================================== */}
        {/* KOLOM KANAN: STICKY MINI TABLE OF CONTENTS (DESKTOP ONLY)          */}
        {/* =================================================================== */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 space-y-4">
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <BookOpen className="h-4 w-4 text-[#526D82]" />
              <h3 className="text-xs font-bold text-[#27374D] uppercase tracking-wider">
                Daftar Isi Modul
              </h3>
            </div>

            <nav className="space-y-1 text-xs">
              {SECTIONS.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all font-medium cursor-pointer flex items-center justify-between ${isActive
                        ? "bg-[#27374D] text-white font-bold shadow-xs"
                        : "text-[#526D82] hover:bg-slate-100 hover:text-[#27374D]"
                      }`}
                  >
                    <span className="truncate">{sec.label}</span>
                    {isActive && <Check className="h-3.5 w-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </nav>

            {/* Quick Action Button di Sidebar */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => onNavigateTab("simulator")}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#27374D] text-xs font-bold text-center transition-colors block cursor-pointer"
              >
                Uji Kasus di Simulator →
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

