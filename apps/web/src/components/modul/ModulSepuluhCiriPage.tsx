import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";
import { ModulDetailLayout, type ModulSectionItem } from "./ModulDetailLayout";
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
  onSelectModule?: (moduleId: string) => void;
}

export function ModulSepuluhCiriPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
  onSelectModule,
}: ModulSepuluhCiriPageProps) {
  const data = MODUL_SEPULUH_CIRI;

  // 1. Collapsible categories state
  const [openCategoryId, setOpenCategoryId] = useState<string>("cat-psikologis");

  // 2. Capstone Quiz multi-select state
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

  // Sections config for Table of Contents
  const SECTIONS: ModulSectionItem[] = useMemo(
    () => [
      { id: "ambang-batas", label: "1. Aturan Ambang Batas" },
      { id: "sepuluh-ciri", label: "2. 10 Ciri Red Flag" },
      { id: "capstone-quiz", label: "3. Uji Capstone 5 Kasus" },
      { id: "checklist", label: "4. Checklist Refleks Digital" },
      { id: "intisari", label: "5. Intisari & Sumber Resmi" },
    ],
    []
  );

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

  return (
    <ModulDetailLayout
      moduleId="m6"
      title={data.title}
      category="Checklist Praktis"
      terakhirDiperbaruiLabel={data.lastUpdated}
      readingTime={data.readingTime}
      summary="Kompilasi 10 indikator universal untuk mendeteksi penipuan di semua kanal (Email, WhatsApp, SMS, Telepon) disertai evaluasi kuis capstone diagnostik."
      isRead={isRead}
      onBack={onBack}
      onToggleRead={onToggleRead}
      onNavigateTab={onNavigateTab}
      onSelectModule={onSelectModule}
      sections={SECTIONS}
      nextModule={{
        id: "m7",
        moduleNumber: 7,
        title: "Checklist Sebelum Transfer",
        desc: "Langkah verifikasi independen rekening dan transaksi sebelum menekan tombol kirim.",
      }}
    >
      {/* Section 1: Aturan Ambang Batas (1 Ciri vs 2 Ciri) */}
      <section
        id="ambang-batas"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-4 scroll-mt-32"
      >
        <h2 className="text-base sm:text-lg font-extrabold text-[#27374D]">
          Aturan Ambang Batas Kewaspadaan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="rounded-2xl border border-amber-300 bg-amber-50/50 p-4 space-y-1">
            <span className="font-black uppercase text-amber-900 text-xs block">
              Tingkat 1: Satu Ciri Terlihat
            </span>
            <p className="text-amber-950 leading-relaxed font-medium">
              {data.thresholdRule.oneTrait}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-300 bg-rose-50/50 p-4 space-y-1">
            <span className="font-black uppercase text-rose-900 text-xs block">
              Tingkat 2: Dua Ciri Atau Lebih Terlihat
            </span>
            <p className="text-rose-950 leading-relaxed font-bold">
              {data.thresholdRule.twoOrMoreTraits}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 10 Ciri Terbagi ke dalam 3 Kategori (Collapsible) */}
      <section
        id="sepuluh-ciri"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
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
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "border-indigo-300 bg-white shadow-xs ring-1 ring-indigo-200"
                    : "border-slate-200 bg-[#FFFDF9] hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenCategoryId(isOpen ? "" : cat.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-hidden cursor-pointer"
                >
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                      {cat.categoryName}
                    </h3>
                    <p className="text-xs text-[#526D82] mt-0.5">
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
                  <div className="border-t border-slate-100 p-4 sm:p-5 pt-3 space-y-3.5">
                    <div className="grid grid-cols-1 gap-3.5">
                      {cat.traits.map((tr: TraitItem) => (
                        <div
                          key={tr.id}
                          className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-2xs"
                        >
                          <h4 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                            {tr.number}. {tr.name}
                          </h4>

                          <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
                            {tr.summary}
                          </p>

                          {tr.nuanceExplanation && (
                            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950 leading-relaxed">
                              {tr.nuanceExplanation}
                            </div>
                          )}

                          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs font-mono text-slate-800 leading-relaxed shadow-2xs">
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
      <section
        id="capstone-quiz"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
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
                          className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
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
                    className="rounded-xl bg-[#27374D] hover:bg-[#1E293B] text-white text-xs font-bold px-4 py-2 shadow-2xs transition-colors cursor-pointer"
                  >
                    Kirim Evaluasi Kasus #{quiz.id}
                  </button>
                ) : (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 leading-relaxed space-y-1">
                    <strong className="flex items-center gap-1.5 text-slate-900 font-bold">
                      {quiz.isPhishing ? (
                        <>
                          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                          <span>Hasil: Ini Adalah Pesan Phishing!</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>Hasil: Ini Adalah Pesan Notifikasi Resmi!</span>
                        </>
                      )}
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
      <section
        id="checklist"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-5 scroll-mt-32"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Checklist Praktis Refleks Digital
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Pastikan prinsip ini menjadi kebiasaan refleksmu sehari-hari.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-800 self-start sm:self-auto">
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
      <section
        id="intisari"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="rounded-2xl bg-gradient-to-r from-indigo-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 block">
            INTISARI CAPSTONE PHISHING
          </span>
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            "{data.takeaway}"
          </p>
        </div>

        <div className="space-y-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
          <div>
            <span className="font-bold text-slate-700">Sumber Rujukan Literasi:</span>
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
      </section>
    </ModulDetailLayout>
  );
}
