import React, { useState, useEffect, useMemo } from "react";
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
  Award,
  ListChecks,
  Gift,
  Lock,
  Globe,
  FileCode,
  Phone,
  UserX,
  Languages,
  Radio,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";
import {
  MODUL_SEPULUH_CIRI,
  type TraitCategory,
  type TraitItem,
  type CapstoneQuizMessage,
} from "../../data/modulSepuluhCiri";

interface ModulSepuluhCiriPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function ModulSepuluhCiriPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
}: ModulSepuluhCiriPageProps) {
  const data = MODUL_SEPULUH_CIRI;

  // 1. Collapsible categories state
  const [openCategoryId, setOpenCategoryId] = useState<string>("cat-psikologis");

  // 2. Capstone Quiz multi-select state
  // quizId -> array of selected traitIds
  const [userSelectedFlags, setUserSelectedFlags] = useState<Record<number, string[]>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<number, boolean>>({});

  // 3. Checklist state
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
        const allCompleted = data.checklist.every((it) => updated[it.id]);
        if (allCompleted) {
          if (!isRead) onToggleRead();
          addNotification({
            title: `Capstone Selesai: ${data.title}`,
            message:
              "Luar biasa! Kamu telah menuntaskan seluruh 10 ciri red flag universal dan capstone kuis.",
            type: "sukses",
            link: "/belajar?tab=modul",
          });
        }
      }
      return updated;
    });
  };

  const completedChecksCount = useMemo(() => {
    return data.checklist.filter((it) => !!checkedItems[it.id]).length;
  }, [checkedItems, data.checklist]);

  // Quiz toggle flag
  const toggleQuizOption = (quizId: number, traitId: string) => {
    if (submittedQuiz[quizId]) return;
    setUserSelectedFlags((prev) => {
      const current = prev[quizId] || [];
      const updated = current.includes(traitId)
        ? current.filter((id) => id !== traitId)
        : [...current, traitId];
      return { ...prev, [quizId]: updated };
    });
  };

  const handleSubmitQuiz = (quizId: number) => {
    setSubmittedQuiz((prev) => ({ ...prev, [quizId]: true }));
  };

  // Diagnostic reflection: which traits missed?
  const quizDiagnostic = useMemo(() => {
    let score = 0;
    const missedTraits: string[] = [];

    data.capstoneQuizzes.forEach((q) => {
      if (submittedQuiz[q.id]) {
        const selected = userSelectedFlags[q.id] || [];
        const actual = q.actualRedFlagIds;

        const isExact =
          selected.length === actual.length &&
          actual.every((id) => selected.includes(id));

        if (isExact) {
          score += 20; // 5 questions * 20 = 100
        } else {
          // Find missed traits
          actual.forEach((id) => {
            if (!selected.includes(id)) {
              missedTraits.push(id);
            }
          });
        }
      }
    });

    return { score, missedTraits };
  }, [data.capstoneQuizzes, submittedQuiz, userSelectedFlags]);

  const getTraitIcon = (iconName: TraitItem["iconName"]) => {
    switch (iconName) {
      case "clock":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "gift":
        return <Gift className="h-4 w-4 text-rose-600" />;
      case "lock":
        return <Lock className="h-4 w-4 text-rose-600" />;
      case "globe":
        return <Globe className="h-4 w-4 text-sky-600" />;
      case "link":
        return <ExternalLink className="h-4 w-4 text-indigo-600" />;
      case "file":
        return <FileCode className="h-4 w-4 text-red-600" />;
      case "phone":
        return <Phone className="h-4 w-4 text-amber-600" />;
      case "user":
        return <UserX className="h-4 w-4 text-slate-600" />;
      case "spell":
        return <Languages className="h-4 w-4 text-teal-600" />;
      case "alert":
      default:
        return <AlertOctagon className="h-4 w-4 text-rose-600" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] pb-24 text-[#27374D]">
      {/* Top Floating Progress Bar */}
      <div className="sticky top-0 z-40 h-1.5 w-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-sky-600 to-indigo-600 transition-all duration-150"
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800">
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
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-700">
            <ListChecks className="h-4 w-4" />
            <span>Modul Capstone Rangkuman #{data.id}</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#27374D]">
            {data.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#526D82]">
            Kompilasi 10 indikator universal untuk mendeteksi penipuan di semua kanal (Email, WhatsApp, SMS, Telepon) disertai evaluasi kuis capstone diagnostik.
          </p>
        </div>

        {/* Section 1: Aturan Ambang Batas (1 Ciri vs 2 Ciri) */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-extrabold text-[#27374D]">
            Aturan Ambang Batas Kewaspadaan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl border border-amber-300 bg-amber-50/50 p-4 space-y-1">
              <span className="font-black uppercase text-amber-900 text-xs block">
                🟡 Tingkat 1: Satu Ciri Terlihat
              </span>
              <p className="text-amber-950 leading-relaxed font-medium">
                {data.thresholdRule.oneTrait}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-300 bg-rose-50/50 p-4 space-y-1">
              <span className="font-black uppercase text-rose-900 text-xs block">
                🔴 Tingkat 2: Dua Ciri Atau Lebih Terlihat
              </span>
              <p className="text-rose-950 leading-relaxed font-bold">
                {data.thresholdRule.twoOrMoreTraits}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 10 Ciri Terbagi ke dalam 3 Kategori (Collapsible) */}
        <section className="mt-8 space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              10 Ciri Red Flag Terbagi dalam 3 Kategori
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Buka kategori di bawah untuk mempelajari rincian ciri dan contoh pesan nyata anonim.
            </p>
          </div>

          <div className="space-y-4">
            {data.categories.map((cat: TraitCategory) => {
              const isOpen = openCategoryId === cat.id;

              return (
                <div
                  key={cat.id}
                  className={`rounded-3xl border transition-all ${
                    isOpen
                      ? "border-indigo-300 bg-white shadow-xs ring-1 ring-indigo-200"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenCategoryId(isOpen ? "" : cat.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-hidden"
                  >
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#27374D]">
                        {cat.categoryName}
                      </h3>
                      <p className="text-xs text-[#526D82] mt-1">
                        {cat.categorySummary}
                      </p>
                    </div>
                    <div className="text-slate-400 pl-3">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-5 sm:p-6 pt-3 space-y-4">
                      <div className="grid grid-cols-1 gap-3.5">
                        {cat.traits.map((tr: TraitItem) => (
                          <div
                            key={tr.id}
                            className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 sm:p-5 space-y-2.5 shadow-2xs"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#27374D] font-black text-xs text-white">
                                  {tr.number}
                                </span>
                                <div className="p-1 rounded-md bg-white border border-slate-200">
                                  {getTraitIcon(tr.iconName)}
                                </div>
                                <h4 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                                  {tr.name}
                                </h4>
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  tr.severity === "bahaya"
                                    ? "bg-rose-100 text-rose-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {tr.severity === "bahaya" ? "Bahaya Kritis" : "Perlu Waspada"}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
                              {tr.summary}
                            </p>

                            {tr.nuanceExplanation && (
                              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950 leading-relaxed">
                                {tr.nuanceExplanation}
                              </div>
                            )}

                            <div className="rounded-xl bg-white border border-slate-200 p-3 text-xs font-mono text-slate-800 leading-relaxed shadow-2xs">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                                Contoh Pesan:
                              </span>
                              {tr.exampleSnippet}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Capstone Quiz (5 Pesan Campuran Gaya picoCTF) */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
              <Sparkles className="h-3.5 w-3.5" />
              Tantangan Uji Capstone Akhir (5 Kasus Campuran)
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D] mt-2">
              Uji Deteksi Pesan: Mana yang Red Flag?
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Sebagian pesan di bawah adalah asli, sebagian adalah penipuan. Tandai ciri red flag yang kamu temukan, lalu tekan 'Kirim Evaluasi'.
            </p>
          </div>

          <div className="space-y-6">
            {data.capstoneQuizzes.map((quiz: CapstoneQuizMessage) => {
              const selected = userSelectedFlags[quiz.id] || [];
              const isSubmitted = submittedQuiz[quiz.id];

              return (
                <div
                  key={quiz.id}
                  className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-5 space-y-3.5 shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-xs text-[#27374D]">
                      Kasus #{quiz.id} · Kanal {quiz.channel}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Pengirim: {quiz.senderInfo}
                    </span>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200 p-4 text-xs sm:text-sm font-mono text-slate-800 leading-relaxed shadow-2xs">
                    {quiz.content}
                  </div>

                  {/* Options Checkboxes */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-700 block">
                      Tandai ciri yang terdapat pada pesan di atas (atau kosongkan jika pesan resmi):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quiz.options.map((opt) => {
                        const isChecked = selected.includes(opt.traitId);
                        return (
                          <button
                            key={opt.traitId}
                            onClick={() => toggleQuizOption(quiz.id, opt.traitId)}
                            disabled={isSubmitted}
                            className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                              isChecked
                                ? "border-indigo-500 bg-indigo-50 text-indigo-950 font-bold"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            } ${isSubmitted ? "opacity-90 cursor-default" : ""}`}
                          >
                            <div
                              className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ${
                                isChecked
                                  ? "bg-indigo-600 border-indigo-600 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isChecked && <CheckSquare className="h-3 w-3" />}
                            </div>
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {!isSubmitted ? (
                    <button
                      onClick={() => handleSubmitQuiz(quiz.id)}
                      className="rounded-xl bg-[#27374D] hover:bg-[#1E293B] text-white text-xs font-bold px-4 py-2 shadow-2xs transition-colors"
                    >
                      Kirim Evaluasi Kasus #{quiz.id}
                    </button>
                  ) : (
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 leading-relaxed space-y-1">
                      <strong className="block text-slate-900 font-bold">
                        {quiz.isPhishing
                          ? "🚨 Hasil: Ini Adalah Pesan Phishing!"
                          : "✅ Hasil: Ini Adalah Pesan Notifikasi Resmi!"}
                      </strong>
                      <p>{quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Diagnostic Reflection Card */}
          {Object.keys(submittedQuiz).length === data.capstoneQuizzes.length && (
            <div className="rounded-2xl border-2 border-indigo-400 bg-indigo-50/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-black text-sm">
                <Award className="h-5 w-5 text-indigo-700" />
                <span>Skor Evaluasi Capstone: {quizDiagnostic.score} / 100</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
                {quizDiagnostic.score >= 80
                  ? "Luar biasa! Matamu sudah sangat awas mengenali kombinasi red flags lintas kanal."
                  : "Bagus! Kamu sudah memahami konsep dasarnya. Terus asah refleksmu pada ciri yang sempat terlewat di bawah ini."}
              </p>
              {quizDiagnostic.missedTraits.length > 0 && (
                <div className="rounded-xl bg-white border border-indigo-200 p-3 text-xs text-slate-700 space-y-1">
                  <strong className="block text-slate-900 font-bold">
                    Refleksi: Ciri yang Paling Sering Terlewat Olehmu:
                  </strong>
                  <p>
                    Perhatikan kembali tanda urgensi waktu dan ekstensi domain tidak lazim. Penipu sering menyelipkannya di antara sapaan yang tampak formal.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Section 4: Interactive Checklist */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
                Checklist Praktis Refleks Digital
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                Pastikan prinsip ini menjadi kebiasaan refleksmu sehari-hari.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 self-start sm:self-auto">
              {completedChecksCount} / {data.checklist.length} Selesai
            </span>
          </div>

          <div className="space-y-3">
            {data.checklist.map((item) => {
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
                    {item.hasLinkToCek && (
                      <Link
                        to="/cek"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 mt-1"
                      >
                        <span>Buka Fitur Cek Pesan & File Sekarang</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Intisari & Footer Rujukan */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 block">
              INTISARI CAPSTONE PHISHING
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
              <span>Lanjut ke Modul Checklist Sebelum Transfer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

