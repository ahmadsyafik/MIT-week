import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  BookOpen,
  Info,
  CheckSquare,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  Lock,
  ChevronDown,
  ChevronUp,
  Search,
  MessageSquare,
  UserCheck,
  Zap,
} from "lucide-react";
import { ModernProcessFlow } from "./ModernProcessFlow";
import { addNotification } from "../../lib/notificationService";
import { ModulDetailLayout, type ModulSectionItem } from "./ModulDetailLayout";
import {
  MODUL_ANATOMI_PENIPUAN,
  type InterventionPoint,
  type CaseStep,
  type GlossaryItem,
} from "../../data/modulAnatomiPenipuan";

interface ModulAnatomiPenipuanPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
  onSelectModule?: (moduleId: string) => void;
}

export function ModulAnatomiPenipuanPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
  onSelectModule,
}: ModulAnatomiPenipuanPageProps) {
  const data = MODUL_ANATOMI_PENIPUAN;

  // 1. Tab Alur Alternatif
  const [activeFlowTab, setActiveFlowTab] = useState<string>("undian");

  // 2. Case study step slider/stepper
  const [activeCaseStep, setActiveCaseStep] = useState<number>(0);

  // 3. Glossary popover state
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<GlossaryItem | null>(null);

  // 4. Checklist tersimpan lokal
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("jagaruang_modul_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Mini Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState<Record<number, boolean>>({});

  // 6. Accordion toggle for phases
  const [expandedPhase, setExpandedPhase] = useState<number>(1);

  // 7. Dropdown toggle Titik Henti pada Variasi Pola Alur Singkat
  const [expandedTitikHenti, setExpandedTitikHenti] = useState<Record<string, boolean>>({});

  const toggleTitikHenti = (key: string) => {
    setExpandedTitikHenti((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Sections config for Table of Contents
  const SECTIONS: ModulSectionItem[] = useMemo(
    () => [
      { id: "fase-alur", label: "1. 5 Fase Alur Penipuan" },
      { id: "studi-kasus", label: "2. Kronologi Kasus Nyata" },
      { id: "alur-alternatif", label: "3. Alur Ragam Skenario" },
      { id: "kamus-istilah", label: "4. Kamus Istilah Taktik" },
      { id: "red-flags", label: "5. 6 Tanda Kejanggalan" },
      { id: "pertolongan-pertama", label: "6. Pertolongan Pertama" },
      { id: "mini-kuis", label: "7. Mini Kuis Anatomi" },
      { id: "checklist", label: "8. Checklist Pencegahan" },
      { id: "intisari", label: "9. Intisari & Sumber Resmi" },
    ],
    []
  );

  const toggleCheck = (itemIdx: number) => {
    const key = `m2_chk_${itemIdx}`;
    setCheckedItems((prev) => {
      const nextVal = !prev[key];
      const updated = { ...prev, [key]: nextVal };
      try {
        localStorage.setItem("jagaruang_modul_checks", JSON.stringify(updated));
      } catch {
        // no-op
      }
      if (nextVal) {
        let allCompleted = true;
        for (let i = 0; i < data.checklist.length; i++) {
          if (!updated[`m2_chk_${i}`]) {
            allCompleted = false;
            break;
          }
        }
        if (allCompleted) {
          if (!isRead) onToggleRead();
          addNotification({
            title: `Checklist Selesai: ${data.title}`,
            message:
              "Selamat! Kamu telah memahami titik-titik intervensi untuk menghentikan penipuan sebelum terlambat.",
            type: "sukses",
            link: "/belajar?tab=modul",
          });
        }
      }
      return updated;
    });
  };

  const handleSelectQuiz = (questionId: number, phaseNumber: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: phaseNumber }));
    setShowQuizFeedback((prev) => ({ ...prev, [questionId]: true }));
  };

  const completedChecksCount = useMemo(() => {
    return data.checklist.filter((_, idx) => !!checkedItems[`m2_chk_${idx}`]).length;
  }, [checkedItems, data.checklist]);

  return (
    <ModulDetailLayout
      moduleId="m2"
      title={data.title}
      category="Dasar Keamanan"
      terakhirDiperbaruiLabel={data.lastUpdated}
      readingTime={data.readingTime}
      summary={data.opener.highlight}
      isRead={isRead}
      onBack={onBack}
      onToggleRead={onToggleRead}
      onNavigateTab={onNavigateTab}
      onSelectModule={onSelectModule}
      sections={SECTIONS}
      nextModule={{
        id: "m3",
        moduleNumber: 3,
        title: "Keamanan di WhatsApp & Per Kanal",
        desc: "Pelajari cara cek centang hijau resmi, broadcast, dan mitigasi pembajakan akun WhatsApp.",
      }}
    >
      {/* Box Penegasan Fokus Modul */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 text-xs sm:text-sm text-amber-900 leading-relaxed flex items-start gap-3 shadow-2xs">
        <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Fokus Modul: </strong>
          Modul ini membedah <em className="italic">bagaimana alur penipuan dijalankan dan di mana kamu bisa menghentikannya</em>.
          Untuk memahami sisi psikologi mengapa manusia mudah tertipu, pelajari modul rekanannya di{" "}
          <button
            onClick={() => onSelectModule ? onSelectModule("m1") : onNavigateTab("modul")}
            className="font-bold text-amber-950 underline hover:text-amber-800 cursor-pointer"
          >
            Apa Itu Rekayasa Sosial?
          </button>
          .
        </div>
      </div>

      {/* Section 1: Alur 5 Fase dengan Titik Intervensi Konkret */}
      <section id="fase-alur" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82] block mb-1">
              Bagian 1 · Anatomi Alur
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
              5 Fase Alur Penipuan & Titik Intervensi
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Kenali posisimu di setiap fase dan temukan cara berhenti sebelum eksekusi terjadi.
            </p>
          </div>
        </div>

        {/* Roadmap Visual 5 Fase Bergaya Zigzag Modern */}
        <ModernProcessFlow
          steps={data.phases.map((phase, idx) => {
            const icons = [
              <Search key={0} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <MessageSquare key={1} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <UserCheck key={2} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <Zap key={3} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <Lock key={4} className="h-6 w-6 sm:h-7 sm:w-7" />,
            ];
            return {
              number: phase.phaseNumber,
              title: phase.phaseName,
              subtitle: phase.technicalTerm,
              description: phase.summary,
              icon: icons[idx],
            };
          })}
        />

        <div className="space-y-3.5">
            {data.phases.map((phase: InterventionPoint) => {
              const isExpanded = expandedPhase === phase.phaseNumber;
              const isCritical = phase.difficulty === "kritis";

              return (
                <div
                  key={phase.phaseNumber}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? isCritical
                        ? "border-rose-300 bg-white shadow-sm ring-1 ring-rose-200"
                        : "border-sky-300 bg-white shadow-sm ring-1 ring-sky-200"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {/* Phase Header Bar */}
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? 0 : phase.phaseNumber)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-hidden"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div
                        className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl font-extrabold text-sm sm:text-base ${
                          isCritical
                            ? "bg-rose-600 text-white shadow-xs"
                            : "bg-[#27374D] text-white"
                        }`}
                      >
                        {phase.phaseNumber}
                      </div>
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-[#27374D]">
                          Fase {phase.phaseNumber}: {phase.phaseName}
                        </h3>
                        <p className="text-xs text-[#526D82] mt-0.5 italic">
                          Istilah teknis: {phase.technicalTerm}
                        </p>
                      </div>
                    </div>
                    <div className="text-slate-400 pl-2">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 p-4 sm:p-5 pt-3 space-y-3.5">
                      <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed">
                        {phase.summary}
                      </p>

                      {/* Contoh Pesan Nyata */}
                      <div className="rounded-xl bg-slate-50 border border-slate-200/90 p-3 sm:p-3.5 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Contoh Pesan di Fase Ini
                        </span>
                        <p className="text-xs sm:text-sm font-mono text-slate-800 italic leading-relaxed">
                          {phase.exampleSnippet}
                        </p>
                      </div>

                      {/* Titik Intervensi: Cara Berhenti di Sini */}
                      <div
                        className={`rounded-xl p-3 sm:p-4 border leading-relaxed text-xs sm:text-sm ${
                          isCritical
                            ? "bg-rose-50/70 border-rose-200 text-rose-950"
                            : "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              isCritical ? "text-rose-700" : "text-emerald-700"
                            }`}
                          />
                          <div>
                            <strong className="font-extrabold uppercase tracking-wide block mb-0.5">
                              Cara Berhenti di Titik Ini (Intervensi Konkret):
                            </strong>
                            <span>{phase.howToStop}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Satu Studi Kasus Utuh (Dissected Step by Step) */}
        <section id="studi-kasus" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82] block mb-1">
              Bagian 2 · Rekonstruksi Kasus
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#27374D] mt-2">
              {data.caseStudy.caseName}
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-1 leading-relaxed">
              {data.caseStudy.intro}
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {data.caseStudy.steps.map((st: CaseStep, idx: number) => (
              <button
                key={st.step}
                onClick={() => setActiveCaseStep(idx)}
                className={`rounded-xl p-2.5 text-left border transition-all text-xs ${
                  activeCaseStep === idx
                    ? "border-sky-500 bg-sky-50 text-sky-900 font-bold shadow-2xs"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="font-black text-[10px] text-slate-400">LANGKAH {st.step}</div>
                <div className="truncate mt-0.5">{st.title}</div>
              </button>
            ))}
          </div>

          {/* Active Step Detail Card */}
          {(() => {
            const currentStep = data.caseStudy.steps[activeCaseStep];
            return (
              <div className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                  <span className="text-xs font-extrabold text-[#27374D]">
                    Langkah {currentStep.step}: {currentStep.title}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Pengirim: <strong className="text-slate-800">{currentStep.sender}</strong>
                  </span>
                </div>

                {/* Pesan Skenario */}
                <div className="rounded-xl bg-white border border-slate-200 p-3.5 text-xs sm:text-sm font-mono text-slate-800 leading-relaxed shadow-2xs">
                  {currentStep.message}
                </div>

                {/* Tindakan Korban vs Dibalik Layar Pelaku */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-3 space-y-1">
                    <strong className="text-amber-900 font-bold block">
                      Respons Korban:
                    </strong>
                    <p className="text-amber-950 leading-relaxed">
                      {currentStep.victimAction}
                    </p>
                  </div>
                  <div className="rounded-xl bg-rose-50/70 border border-rose-200 p-3 space-y-1">
                    <strong className="text-rose-900 font-bold block">
                      Apa yang Terjadi di Belakang Layar:
                    </strong>
                    <p className="text-rose-950 leading-relaxed">
                      {currentStep.attackerBehindTheScenes}
                    </p>
                  </div>
                </div>

                {/* Tips Pencegahan di Titik Ini */}
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Langkah Penyelamat: </strong>
                    <span>{currentStep.safetyTip}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* Section 3: Dua Alur Lain yang Berbeda (Tabbed) */}
        <section id="alur-alternatif" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82] block mb-1">
              Bagian 3 · Variasi Pola
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
              Alur Singkat Lainnya: Tidak Semua Penipuan 5 Fase Penuh
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-1">
              Beberapa penipuan melompati fase profiling dan langsung mengeksekusi jebakan dalam 2-3 langkah.
            </p>
          </div>

          {/* Flow Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
            {data.alternativeFlows.map((fl) => (
              <button
                key={fl.id}
                onClick={() => setActiveFlowTab(fl.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeFlowTab === fl.id
                    ? "bg-[#27374D] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {fl.name}
              </button>
            ))}
          </div>

          {/* Active Alternative Flow Content */}
          {(() => {
            const flow =
              data.alternativeFlows.find((f) => f.id === activeFlowTab) ||
              data.alternativeFlows[0];
            return (
              <div className="space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">{flow.summary}</p>
                </div>

                <div className="space-y-3">
                  {flow.steps.map((st, i) => {
                    const stepKey = `${flow.id}_${i}`;
                    const isOpen = !!expandedTitikHenti[stepKey];

                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200/90 bg-[#FAF9F5] p-4 sm:p-5 space-y-2.5 transition-all"
                      >
                        <h4 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                          {st.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                          {st.description}
                        </p>

                        {/* Tombol Dropdown Titik Henti */}
                        <div className="pt-0.5">
                          <button
                            type="button"
                            onClick={() => toggleTitikHenti(stepKey)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#27374D] text-xs font-bold transition-all shadow-2xs cursor-pointer group"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{isOpen ? "Tutup titik henti" : "Titik henti"}</span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 text-[#526D82] transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Konten Dropdown Titik Henti */}
                          {isOpen && (
                            <div className="mt-2.5 rounded-xl bg-white border border-emerald-200 p-3 text-xs text-emerald-950 flex items-start gap-2.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-150">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="font-bold text-emerald-900">Titik Henti: </strong>
                                <span>{st.intervention}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </section>

        {/* Section 4: Kamus Istilah Inline Popover */}
        <section id="kamus-istilah" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82] block mb-1">
              Bagian 4 · Terminologi
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
              Kamus Istilah Awam (Sentuh Istilah untuk Penjelasan)
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Istilah teknis ini sering dipakai di berita. Berikut penjelasan bahasa Indonesianya yang sederhana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.glossary.map((item: GlossaryItem) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 space-y-2 hover:border-sky-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[#27374D]">{item.term}</h3>
                </div>
                <p className="text-xs text-[#526D82] leading-relaxed">
                  {item.simpleExplanation}
                </p>
                <div className="rounded-lg bg-white border border-slate-100 p-2 text-[11px] text-slate-700 font-mono">
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Tanda Kejanggalan (Red Flags 6 Poin) */}
        <section id="red-flags" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82] block mb-1">
              Bagian 5 · Deteksi Dini
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
              6 Tanda Kejanggalan Universal (Red Flags)
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Jika kamu melihat salah satu tanda ini, jangan lanjutkan interaksi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {data.redFlags.map((flag) => (
              <div
                key={flag.id}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 sm:p-5 space-y-2 shadow-2xs"
              >
                <h3 className="font-extrabold text-sm sm:text-base text-[#27374D]">
                  {flag.title}
                </h3>
                <p className="text-xs text-[#526D82] leading-relaxed">
                  {flag.explanation}
                </p>
                <div className="rounded-xl bg-white border border-slate-100 p-2.5 text-xs text-slate-700 flex items-start gap-2 shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-[#27374D]">Tindakan: </strong>
                    <span>{flag.whatToDo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Langkah Jika Sudah Terlanjur Jadi Korban (Emergency SOP) */}
        <section id="pertolongan-pertama" className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-rose-200/80 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
              Bagian 6 · Respons Darurat
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-rose-950 mt-1">
              Jika Sudah Terlanjur Mentransfer atau Memasang File (.apk)
            </h2>
            <p className="text-xs sm:text-sm text-rose-900/80 mt-0.5">
              Jangan panik. Lakukan tindakan berurutan ini sekarang juga dalam kurun waktu 1 - 2 jam pertama:
            </p>
          </div>

          <div className="space-y-3">
            {data.emergencySteps.map((step) => (
              <div
                key={step.order}
                className="rounded-2xl border border-rose-200 bg-white p-4 sm:p-5 space-y-2 shadow-2xs"
              >
                <h3 className="font-extrabold text-sm sm:text-base text-rose-950">
                  {step.order}. {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
                  {step.action}
                </p>
                {step.warning && (
                  <p className="text-[11px] text-slate-400 pl-8 italic">
                    {step.warning}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Mini Kuis Interaktif (Ini Fase Berapa?) */}
        <section id="mini-kuis" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82] block mb-1">
              Bagian 7 · Evaluasi Pemahaman
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#27374D] mt-1">
              Tebak: Berada di Fase Manakah Situasi Ini?
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Pilih jawaban untuk memeriksa apakah kamu sudah bisa mengenali fase penipuan secara instan.
            </p>
          </div>

          <div className="space-y-6">
            {data.quiz.map((q) => {
              const selectedPhase = quizAnswers[q.id];
              const isAnswered = showQuizFeedback[q.id];
              const selectedOption = q.options.find((opt) => opt.phase === selectedPhase);

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-4 sm:p-5 space-y-3"
                >
                  <p className="font-bold text-xs sm:text-sm text-[#27374D] leading-relaxed">
                    {q.id}. {q.scenario}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt) => {
                      const isChosen = selectedPhase === opt.phase;
                      return (
                        <button
                          key={opt.phase}
                          onClick={() => handleSelectQuiz(q.id, opt.phase)}
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

                  {isAnswered && selectedOption && (
                    <div
                      className={`rounded-xl p-3 text-xs leading-relaxed border ${
                        selectedOption.isCorrect
                          ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                          : "bg-rose-50 border-rose-200 text-rose-950"
                      }`}
                    >
                      <strong className="font-bold block mb-0.5">
                        {selectedOption.isCorrect ? "✓ Jawaban Benar!" : "✕ Masih Kurang Tepat"}
                      </strong>
                      <span>{selectedOption.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8: Checklist Tindakan Nyata */}
        <section id="checklist" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526D82] block mb-1">
                Bagian 8 · Panduan Mandiri
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#27374D]">
                Checklist 4 Tindakan Nyata &amp; Aman
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
                Semua tindakan di bawah dapat kamu lakukan secara mandiri tanpa berinteraksi dengan pelaku.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-800 self-start sm:self-auto">
              Progress: {completedChecksCount} / {data.checklist.length} Selesai
            </span>
          </div>

          <div className="space-y-3">
            {data.checklist.map((item, idx) => {
              const isChecked = !!checkedItems[`m2_chk_${idx}`];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(idx)}
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
                    <p className="text-[11px] text-[#526D82]">{item.whySafe}</p>
                    {item.verificationSource && (
                      <p className="text-[10px] text-slate-400 italic">
                        {item.verificationSource}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 9: Intisari Modul & Rujukan Sumber */}
        <section id="intisari" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
          <div className="rounded-2xl bg-gradient-to-r from-sky-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 block">
              INTISARI PERLINDUNGAN
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

