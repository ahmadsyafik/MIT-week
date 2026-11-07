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
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCode,
  Globe,
  Award,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";
import {
  MODUL_EMAIL_PHISHING,
  type EmailMockAnnotation,
  type DomainComparisonQuiz,
} from "../../data/modulEmailPhishing";

interface ModulEmailPhishingPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function ModulEmailPhishingPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
}: ModulEmailPhishingPageProps) {
  const data = MODUL_EMAIL_PHISHING;

  // 1. Mock email selected annotation
  const [activeAnnotationId, setActiveAnnotationId] = useState<string>("ann-from");

  // 2. Quiz answers & feedback
  const [quizAnswers, setQuizAnswers] = useState<Record<number, "A" | "B">>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState<Record<number, boolean>>({});

  // 3. Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`jagaruang_chk_${data.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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
        const allCompleted = data.checklistItems.every((it) => updated[it.id]);
        if (allCompleted) {
          if (!isRead) onToggleRead();
          addNotification({
            title: `Checklist Selesai: ${data.title}`,
            message:
              "Hebat! Kamu telah menguasai cara membedah email palsu dan jebakan tautan terselubung.",
            type: "sukses",
            link: "/belajar?tab=modul",
          });
        }
      }
      return updated;
    });
  };

  const completedChecksCount = useMemo(() => {
    return data.checklistItems.filter((it) => !!checkedItems[it.id]).length;
  }, [checkedItems, data.checklistItems]);

  const activeAnnotation = useMemo(() => {
    return (
      data.mockEmail.annotations.find((ann) => ann.id === activeAnnotationId) ||
      data.mockEmail.annotations[0]
    );
  }, [activeAnnotationId, data.mockEmail.annotations]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] pb-24 text-[#27374D]">
      {/* Top Floating Progress Bar */}
      <div className="sticky top-0 z-40 h-1.5 w-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-sky-600 transition-all duration-150"
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
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
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-700">
            <Mail className="h-4 w-4" />
            <span>Modul Keamanan Digital #{data.id}</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#27374D]">
            {data.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#526D82]">
            Panduan membedah domain pengirim, membongkar hyperlink terselubung, dan mengenali trik manipulasi tampilan email phishing modern.
          </p>
        </div>

        {/* Section 1: Dua Kasus Berbeda yang Sering Tertukar */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
              Sering Tertukar
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              Dua Trik Manipulasi Berbeda: Display Name vs Karakter "@"
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Banyak orang mengira keduanya sama, padahal cara kerja teknis dan cara memeriksanya sangat berbeda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Case A */}
            <div className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-5 space-y-3 shadow-2xs">
              <span className="rounded-md bg-sky-100 text-sky-900 px-2 py-0.5 text-[10px] font-black uppercase">
                Kasus A: Display Name Spoofing
              </span>
              <h3 className="text-base font-extrabold text-[#27374D]">
                {data.twoCasesClarification.caseA.title}
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                {data.twoCasesClarification.caseA.concept}
              </p>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs font-mono text-slate-800">
                {data.twoCasesClarification.caseA.example}
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Cara Deteksi: </strong>
                  <span>{data.twoCasesClarification.caseA.howToDetect}</span>
                </div>
              </div>
            </div>

            {/* Case B */}
            <div className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-5 space-y-3 shadow-2xs">
              <span className="rounded-md bg-rose-100 text-rose-900 px-2 py-0.5 text-[10px] font-black uppercase">
                Kasus B: Karakter "@" Pada URL
              </span>
              <h3 className="text-base font-extrabold text-[#27374D]">
                {data.twoCasesClarification.caseB.title}
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                {data.twoCasesClarification.caseB.concept}
              </p>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs font-mono text-rose-700 font-bold break-all">
                {data.twoCasesClarification.caseB.example}
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Cara Deteksi: </strong>
                  <span>{data.twoCasesClarification.caseB.howToDetect}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Homograph Attack Explainer */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
              <Globe className="h-3.5 w-3.5 text-indigo-700" />
              Teknik Phishing Lanjutan
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              {data.homographAttack.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed">
            {data.homographAttack.explanation}
          </p>

          <div className="rounded-2xl bg-slate-900 p-4 sm:p-5 text-white space-y-2">
            <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">
              Contoh Visual Karakter Cyrillic vs Latin:
            </span>
            <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
              {data.homographAttack.exampleLatinVsCyrillic}
            </p>
          </div>

          <div className="rounded-xl bg-sky-50 border border-sky-200 p-3.5 text-xs text-sky-950 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Langkah Perlindungan: </strong>
              <span>{data.homographAttack.defenseTip}</span>
            </div>
          </div>
        </section>

        {/* Section 3: Visual Mock Email Phishing Interaktif */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-700" />
              Inspeksi Forensik Email
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              Simulasi Visual: Bedah Red Flag Email Phishing
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Klik salah satu tombol tanda merah di bawah untuk menyoroti kejanggalan pada email tiruan ini.
            </p>
          </div>

          {/* Annotation Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {data.mockEmail.annotations.map((ann) => (
              <button
                key={ann.id}
                onClick={() => setActiveAnnotationId(ann.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeAnnotationId === ann.id
                    ? "bg-rose-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {ann.title}
              </button>
            ))}
          </div>

          {/* Active Annotation Detail Box */}
          <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs sm:text-sm text-rose-950 space-y-1">
            <strong className="font-extrabold block text-rose-900">
              {activeAnnotation.title} ({activeAnnotation.status.toUpperCase()}):
            </strong>
            <p className="leading-relaxed">{activeAnnotation.description}</p>
          </div>

          {/* Visual Mock Email Client Container */}
          <div className="rounded-2xl border-2 border-slate-300 bg-white shadow-sm overflow-hidden text-xs sm:text-sm">
            {/* Email Header Bar */}
            <div className="bg-slate-100 border-b border-slate-200 p-4 space-y-2">
              <div
                className={`p-2 rounded-xl transition-all ${
                  activeAnnotationId === "ann-from"
                    ? "bg-rose-100/90 ring-2 ring-rose-500"
                    : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-500 text-xs">Dari:</span>
                  <span className="font-bold text-slate-900">
                    {data.mockEmail.fromDisplay}
                  </span>
                  <span className="font-mono text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    &lt;{data.mockEmail.fromRealEmail}&gt;
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-2">
                <span>Kepada: {data.mockEmail.to}</span>
                <span>{data.mockEmail.date}</span>
              </div>

              <div
                className={`px-2 py-1.5 rounded-xl transition-all ${
                  activeAnnotationId === "ann-urgency"
                    ? "bg-amber-100/90 ring-2 ring-amber-500"
                    : ""
                }`}
              >
                <span className="font-extrabold text-sm text-slate-900">
                  {data.mockEmail.subject}
                </span>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-5 sm:p-6 space-y-4 text-slate-700 leading-relaxed">
              {data.mockEmail.bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {/* Action Button & Hover Disguise */}
              <div
                className={`pt-2 pb-2 rounded-2xl p-4 transition-all ${
                  activeAnnotationId === "ann-link"
                    ? "bg-rose-100/90 ring-2 ring-rose-500"
                    : "bg-slate-50"
                }`}
              >
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 text-xs shadow-xs"
                >
                  {data.mockEmail.buttonText}
                </button>
                <div className="mt-2 text-[11px] font-mono text-slate-500">
                  Arah URL saat diarahkan kursor:{" "}
                  <span className="text-rose-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                    {data.mockEmail.buttonHoverUrl}
                  </span>
                </div>
              </div>

              {/* Attachment */}
              <div
                className={`rounded-2xl border p-3 flex items-center justify-between transition-all ${
                  activeAnnotationId === "ann-attach"
                    ? "border-rose-400 bg-rose-50/90 ring-2 ring-rose-500"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileCode className="h-5 w-5 text-rose-600" />
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-900 block">
                      {data.mockEmail.attachmentName}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {data.mockEmail.attachmentSize}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  Lampiran Bahaya
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Mini Kuis Interaktif (Mana yang Palsu?) */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
              <HelpCircle className="h-3.5 w-3.5" />
              Latihan Praktik picoCTF (2 Soal)
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              Kuis: Mana yang Palsu / Berbahaya?
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Pilih opsi yang menurutmu merupakan tautan/domain tiruan penipu.
            </p>
          </div>

          <div className="space-y-6">
            {data.domainQuizzes.map((quiz) => {
              const selectedOpt = quizAnswers[quiz.id];
              const isAnswered = showQuizFeedback[quiz.id];

              return (
                <div
                  key={quiz.id}
                  className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-4 sm:p-5 space-y-3"
                >
                  <p className="font-bold text-xs sm:text-sm text-[#27374D]">
                    {quiz.question}
                  </p>
                  <p className="text-xs text-[#526D82] italic">{quiz.context}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, [quiz.id]: "A" }));
                        setShowQuizFeedback((prev) => ({ ...prev, [quiz.id]: true }));
                      }}
                      className={`rounded-xl border p-3 text-left font-mono text-xs font-semibold transition-all ${
                        selectedOpt === "A"
                          ? quiz.optionA.isFake
                            ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                            : "border-rose-500 bg-rose-50 text-rose-950 font-bold"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      Opsi A: {quiz.optionA.text}
                    </button>

                    <button
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, [quiz.id]: "B" }));
                        setShowQuizFeedback((prev) => ({ ...prev, [quiz.id]: true }));
                      }}
                      className={`rounded-xl border p-3 text-left font-mono text-xs font-semibold transition-all ${
                        selectedOpt === "B"
                          ? quiz.optionB.isFake
                            ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                            : "border-rose-500 bg-rose-50 text-rose-950 font-bold"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      Opsi B: {quiz.optionB.text}
                    </button>
                  </div>

                  {isAnswered && (
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs leading-relaxed space-y-1">
                      <p>{selectedOpt === "A" ? quiz.optionA.explanation : quiz.optionB.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Indikator Autentikasi Teknis (SPF, DKIM, DMARC) */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              {data.technicalAuthIndicators.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              {data.technicalAuthIndicators.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {data.technicalAuthIndicators.standards.map((std, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 space-y-2 shadow-2xs"
              >
                <span className="font-mono text-xs font-black text-sky-800 block">
                  {std.name}
                </span>
                <p className="text-xs text-[#27374D] leading-relaxed">{std.role}</p>
                <div className="rounded-lg bg-white border border-slate-100 p-2 text-[11px] text-slate-600 italic">
                  💡 {std.simpleAnalogy}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Interactive Checklist */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
                Checklist Praktis Keamanan Email
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                Centang setiap langkah setelah kamu memahaminya.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 self-start sm:self-auto">
              {completedChecksCount} / {data.checklistItems.length} Langkah Selesai
            </span>
          </div>

          <div className="space-y-3">
            {data.checklistItems.map((item) => {
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
                    <p className="text-[11px] text-[#526D82]">{item.benefit}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {completedChecksCount === data.checklistItems.length && (
            <div className="rounded-2xl bg-emerald-100 border border-emerald-300 p-4 text-xs sm:text-sm text-emerald-950 flex items-center gap-3">
              <Award className="h-6 w-6 text-emerald-700 shrink-0" />
              <div>
                <strong className="font-extrabold block">Lencana: Pengawas Email Andal</strong>
                <span>Kamu telah menyelesaikan seluruh checklist perlindungan email phishing!</span>
              </div>
            </div>
          )}
        </section>

        {/* Section 7: Intisari & Footer */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-sky-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 block">
              INTISARI PERLINDUNGAN EMAIL
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
              <span>Lanjut ke Modul Telepon Bank (Vishing)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

