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
  RotateCcw,
  BookOpen,
  Info,
  CheckSquare,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  Lock,
  Smartphone,
  ChevronDown,
  ChevronUp,
  KeyRound,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "../ui";
import { addNotification } from "../../lib/notificationService";
import type {
  ChannelModuleData,
  ModusChannelItem,
  SecurityAuditStep,
  ChannelQuizQuestion,
} from "../../data/modulPerKanal";

interface ModulPerKanalPageProps {
  data: ChannelModuleData;
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function ModulPerKanalPage({
  data,
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
}: ModulPerKanalPageProps) {
  // 1. Modus Tab State
  const [activeModusId, setActiveModusId] = useState<string>(data.modi[0]?.id || "");

  // 2. Audit Checklist tersimpan lokal
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`jagaruang_audit_${data.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 3. Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState<Record<number, boolean>>({});

  // 4. Scroll progress
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

  const toggleAuditCheck = (stepId: string) => {
    setCheckedAuditItems((prev) => {
      const nextVal = !prev[stepId];
      const updated = { ...prev, [stepId]: nextVal };
      try {
        localStorage.setItem(`jagaruang_audit_${data.id}`, JSON.stringify(updated));
      } catch {
        // no-op
      }
      if (nextVal) {
        const allCompleted = data.auditChecklist.every((item) => updated[item.id]);
        if (allCompleted) {
          if (!isRead) onToggleRead();
          addNotification({
            title: `Audit Keamanan Selesai: ${data.channelName}`,
            message: `Keren! Akun ${data.channelName}-mu kini jauh lebih tahan dari upaya pembajakan dan penipuan.`,
            type: "sukses",
            link: "/belajar?tab=modul",
          });
        }
      }
      return updated;
    });
  };

  const handleSelectQuiz = (qId: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowQuizFeedback((prev) => ({ ...prev, [qId]: true }));
  };

  const completedAuditCount = useMemo(() => {
    return data.auditChecklist.filter((item) => !!checkedAuditItems[item.id]).length;
  }, [checkedAuditItems, data.auditChecklist]);

  const activeModus = useMemo(() => {
    return data.modi.find((m) => m.id === activeModusId) || data.modi[0];
  }, [activeModusId, data.modi]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] pb-24 text-[#27374D]">
      {/* Top Floating Progress Bar */}
      <div className="sticky top-0 z-40 h-1.5 w-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        {/* Navigation Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#526D82] shadow-2xs hover:bg-slate-50 hover:text-[#27374D] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Hub Belajar</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
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

        {/* Hero Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700">
            <Smartphone className="h-4 w-4" />
            <span>Modul Seri Keamanan Kanal #{data.id}</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#27374D]">
            {data.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#526D82]">
            Panduan praktis melindungi akun dari pembajakan kode, file APK berbahaya, hingga modus penyamaran kontak di platform percakapan.
          </p>
        </div>

        {/* Section 1: Kenapa Penipu Suka WhatsApp? */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              {data.openerWhyChannel.question}
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Tiga alasan utama kenapa ruang pesan instan menjadi sasaran empuk kejahatan rekayasa sosial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {data.openerWhyChannel.points.map((pt, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 space-y-2 shadow-2xs"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 font-extrabold text-xs text-emerald-900">
                  {i + 1}
                </div>
                <h3 className="font-bold text-sm text-[#27374D]">{pt.title}</h3>
                <p className="text-xs text-[#526D82] leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Bedah Dua Kode Rahasia (Side-by-Side Comparison) */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
              <KeyRound className="h-3.5 w-3.5 text-rose-700" />
              Perbedaan Kritis Dua Kode
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              {data.comparisonCards.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Kode SMS Registrasi */}
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-amber-200 px-2 py-0.5 text-[10px] font-black uppercase text-amber-950">
                  Kode Jenis A
                </span>
                <span className="text-xs font-bold text-amber-900">6 Digit SMS</span>
              </div>
              <h3 className="text-base font-extrabold text-amber-950">
                {data.comparisonCards.leftCard.heading}
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed">
                {data.comparisonCards.leftCard.channel}
              </p>
              <div className="rounded-xl bg-white border border-amber-200 p-3 text-xs text-slate-700 space-y-1">
                <strong className="block text-slate-900">Kapan dibutuhkan:</strong>
                <span>{data.comparisonCards.leftCard.rule}</span>
              </div>
              <div className="rounded-xl bg-rose-100/80 border border-rose-300 p-3 text-xs text-rose-950 font-medium">
                <strong className="block font-extrabold text-rose-900 mb-0.5">Bahaya Fatal Jika Diberikan:</strong>
                {data.comparisonCards.leftCard.dangerIfShared}
              </div>
            </div>

            {/* Card 2: PIN Verifikasi Dua Langkah */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-emerald-200 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-950">
                  Kode Jenis B
                </span>
                <span className="text-xs font-bold text-emerald-900">6 Digit PIN Rahasia</span>
              </div>
              <h3 className="text-base font-extrabold text-emerald-950">
                {data.comparisonCards.rightCard.heading}
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {data.comparisonCards.rightCard.channel}
              </p>
              <div className="rounded-xl bg-white border border-emerald-200 p-3 text-xs text-slate-700 space-y-1">
                <strong className="block text-slate-900">Kapan dibutuhkan:</strong>
                <span>{data.comparisonCards.rightCard.rule}</span>
              </div>
              <div className="rounded-xl bg-rose-100/80 border border-rose-300 p-3 text-xs text-rose-950 font-medium">
                <strong className="block font-extrabold text-rose-900 mb-0.5">Bahaya Fatal Jika Diberikan:</strong>
                {data.comparisonCards.rightCard.dangerIfShared}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#27374D] p-4 text-xs sm:text-sm font-bold text-white flex items-start gap-3">
            <Lock className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {data.comparisonCards.sharedGoldenRule}
            </p>
          </div>
        </section>

        {/* Section 3: Nuansa Centang Hijau Resmi vs Emoji */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              {data.badgeVerificationGuide.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Jangan terkecoh oleh tanda centang yang hanya berupa teks emoji di nama kontak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/30 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-emerald-950">
                  {data.badgeVerificationGuide.authentic.title}
                </h3>
              </div>
              <p className="text-xs font-semibold text-emerald-800">
                Letak: {data.badgeVerificationGuide.authentic.location}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.badgeVerificationGuide.authentic.howToSpot}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-300 bg-rose-50/30 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <AlertOctagon className="h-5 w-5 text-rose-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-rose-950">
                  {data.badgeVerificationGuide.fakeEmoji.title}
                </h3>
              </div>
              <p className="text-xs font-semibold text-rose-800">
                Letak: {data.badgeVerificationGuide.fakeEmoji.location}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.badgeVerificationGuide.fakeEmoji.howToSpot}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: 6 Modus WhatsApp Terbanyak (Tabs) */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              6 Modus Penipuan Utama di WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Pilih tab di bawah untuk membedah anatomi pesan, red flags, dan cara berhenti seketika.
            </p>
          </div>

          {/* Modus Tab Selector */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
            {data.modi.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModusId(m.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeModusId === m.id
                    ? "bg-[#27374D] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {m.shortLabel}
              </button>
            ))}
          </div>

          {/* Active Modus Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
              <div>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    activeModus.riskLevel === "kritis"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {activeModus.riskLevel === "kritis" ? "Risiko Kritis" : "Risiko Waspada"}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#27374D] mt-1">
                  {activeModus.name}
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">
                Profil Pelaku: <strong className="text-slate-800">{activeModus.senderProfile}</strong>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed">
              {activeModus.summary}
            </p>

            {/* Simulasi Pesan WhatsApp */}
            <div className="rounded-2xl bg-[#EFEAE2] p-4 space-y-2 border border-slate-300/80 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Contoh Pesan Chat yang Masuk:
              </span>
              <div className="max-w-md rounded-2xl rounded-tl-xs bg-white p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-xs">
                {activeModus.messageSnippet}
                <div className="mt-1 text-right text-[10px] text-slate-400">10:42 ✓✓</div>
              </div>
            </div>

            {/* Red Flags & How to Stop */}
            <div className="space-y-2">
              <strong className="text-xs font-bold text-slate-900 block">
                Ciri Kejanggalan (Red Flags):
              </strong>
              <ul className="space-y-1 list-disc pl-4 text-xs text-slate-700">
                {activeModus.redFlags.map((rf, idx) => (
                  <li key={idx}>{rf}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Cara Berhenti di Titik Ini: </strong>
                <span>{activeModus.howToStop}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Audit Keamanan WhatsApp 2 Menit */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
                Audit Keamanan WhatsApp 2 Menit
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                Buka WhatsApp di ponselmu sekarang dan ikuti 4 langkah audit mandiri ini.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Progress: {completedAuditCount} / {data.auditChecklist.length} Langkah Selesai
            </span>
          </div>

          <div className="space-y-3">
            {data.auditChecklist.map((step) => {
              const isChecked = !!checkedAuditItems[step.id];

              return (
                <div
                  key={step.id}
                  onClick={() => toggleAuditCheck(step.id)}
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
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={`text-xs sm:text-sm font-bold ${
                          isChecked ? "text-emerald-950 line-through" : "text-[#27374D]"
                        }`}
                      >
                        {step.title}
                      </p>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700">
                        {step.menuPath}
                      </span>
                    </div>
                    <p className="text-xs text-[#526D82] leading-relaxed">
                      {step.instruction}
                    </p>
                    {step.verificationNote && (
                      <p className="text-[10px] text-slate-400 italic">
                        {step.verificationNote}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Protokol Darurat Akun Dibajak */}
        <section className="mt-8 rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-rose-200/80 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-700" />
              SOP Darurat
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-rose-950 mt-2">
              {data.emergencyTakeover.title}
            </h2>
            <p className="text-xs sm:text-sm text-rose-900/80 mt-0.5">
              {data.emergencyTakeover.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            {data.emergencyTakeover.steps.map((st) => (
              <div
                key={st.order}
                className="rounded-2xl border border-rose-200 bg-white p-4 sm:p-5 space-y-1.5 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white font-extrabold text-xs">
                      {st.order}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-rose-950">
                      {st.title}
                    </h3>
                  </div>
                  <span className="rounded-md bg-rose-100 text-rose-900 text-[10px] font-bold px-2 py-0.5">
                    {st.urgency}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
                  {st.action}
                </p>
                {st.note && (
                  <p className="text-[10px] text-slate-400 pl-8 italic">{st.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Kuis Asli atau Palsu? */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              <HelpCircle className="h-3.5 w-3.5" />
              Uji Cepat Refleks WhatsApp (2 Soal)
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              Kuis: Asli atau Palsu?
            </h2>
          </div>

          <div className="space-y-6">
            {data.quiz.map((q) => {
              const selectedIdx = quizAnswers[q.id];
              const isAnswered = showQuizFeedback[q.id];
              const selectedOpt = q.options[selectedIdx];

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-4 sm:p-5 space-y-3"
                >
                  <p className="font-bold text-xs sm:text-sm text-[#27374D] leading-relaxed">
                    {q.id}. {q.messageScenario}
                  </p>
                  <p className="text-xs text-[#526D82] italic">
                    Profil Pengirim: {q.senderInfo}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedIdx === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuiz(q.id, optIdx)}
                          className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                            isChosen
                              ? opt.isReal
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
                        selectedOpt.isReal
                          ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                          : "bg-rose-50 border-rose-200 text-rose-950"
                      }`}
                    >
                      <strong className="font-bold block mb-0.5">
                        {selectedOpt.isReal ? "✓ Pilihan Tepat & Aman!" : "✕ Berisiko Tertipu!"}
                      </strong>
                      <span>{selectedOpt.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8: Intisari & Footer Rujukan */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
              INTISARI PERLINDUNGAN WHATSAPP
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
                  <strong className="text-slate-700">{src.name}</strong>
                  {src.note && <span className="block text-slate-400">{src.note}</span>}
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
              <span>Lanjut ke Modul Email Phishing</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

