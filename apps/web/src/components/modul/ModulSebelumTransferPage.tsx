import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  CheckSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Share2,
  Check,
  MessageCircle,
  Clock,
  CreditCard,
  Send,
  Lock,
} from "lucide-react";
import { ModernProcessFlow } from "./ModernProcessFlow";
import { addNotification } from "../../lib/notificationService";
import { ModulDetailLayout, type ModulSectionItem } from "./ModulDetailLayout";
import {
  MODUL_SEBELUM_TRANSFER,
  type ChatBubbleSimulation,
  type FaqItem,
  type TransferQuizItem,
} from "../../data/modulSebelumTransfer";

interface ModulSebelumTransferPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
  onSelectModule?: (moduleId: string) => void;
}

export function ModulSebelumTransferPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
  onSelectModule,
}: ModulSebelumTransferPageProps) {
  const data = MODUL_SEBELUM_TRANSFER;

  // 1. Stepper active step
  const [activeStep, setActiveStep] = useState<number>(1);

  // 2. Chat simulation tapped bubble
  const [tappedBubbleId, setTappedBubbleId] = useState<string | null>(null);

  // 3. FAQ open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 4. Checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`jagaruang_chk_${data.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Quiz answers state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  // 6. Copy summary feedback
  const [copiedSummary, setCopiedSummary] = useState(false);

  // 7. Dropdown toggle untuk Modus Tambahan (Bahaya) & Red Flags Bernuansa (Saran Tindakan)
  const [expandedDanger, setExpandedDanger] = useState<Record<number, boolean>>({});
  const [expandedAdvice, setExpandedAdvice] = useState<Record<string, boolean>>({});

  const toggleDanger = (idx: number) => {
    setExpandedDanger((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleAdvice = (id: string) => {
    setExpandedAdvice((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Sections config for Table of Contents
  const SECTIONS: ModulSectionItem[] = useMemo(
    () => [
      { id: "alur-jebakan", label: "1. Alur Jebakan Transaksi" },
      { id: "modus-tambahan", label: "2. 5 Modus Tambahan" },
      { id: "red-flags", label: "3. Red Flags Bernuansa" },
      { id: "simulasi-chat", label: "4. Simulasi Chat WhatsApp" },
      { id: "studi-kasus", label: "5. Kronologi Kasus Nyata" },
      { id: "langkah-darurat", label: "6. Langkah Darurat Korban" },
      { id: "checklist", label: "7. Checklist Verifikasi" },
      { id: "faqs", label: "8. Tanya Jawab (FAQ)" },
      { id: "mini-kuis", label: "9. Mini Kuis (3 Soal)" },
      { id: "intisari", label: "10. Intisari & Rujukan" },
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
            title: `Checklist Selesai: ${data.title}`,
            message:
              "Selamat! Kamu telah menguasai seluruh langkah verifikasi sebelum transfer dana digital.",
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

  const awarenessPercent = Math.round(
    (completedChecksCount / data.checklist.length) * 100
  );

  const handleCopySummary = () => {
    const textToCopy = `🛡️ TIPS AMAN SEBELUM TRANSFER (JagaRuang) 🛡️\n\n"${data.takeaway}"\n\n1. Selalu cek rekening di CekRekening.id sebelum transfer.\n2. Tolak ajakan pindah transaksi ke WhatsApp dari marketplace resmi.\n3. Jangan percaya foto struk transfer sebelum cek mutasi m-Banking milikmu.\n4. Konfirmasi dua arah lewat video call jika transfer ditujukan untuk keluarga.\n\nEdukasi lengkap: JagaRuang.id`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <ModulDetailLayout
      moduleId="m7"
      title={data.title}
      category="Checklist Praktis"
      terakhirDiperbaruiLabel={data.lastUpdated}
      readingTime={data.readingTime}
      summary="Panduan verifikasi praktis bagi masyarakat umum sebelum menekan tombol konfirmasi transfer uang antarbank atau pembayaran QRIS."
      isRead={isRead}
      onBack={onBack}
      onToggleRead={onToggleRead}
      onNavigateTab={onNavigateTab}
      onSelectModule={onSelectModule}
      sections={SECTIONS}
      nextModule={{
        id: "m8",
        moduleNumber: 8,
        title: "Pola Modus Penipuan Terbanyak di Indonesia",
        desc: "Dasbor edukasi data laporan IASC / Satgas PASTI dan taktik rekayasa sosial nasional.",
      }}
    >
      {/* Box Peringatan Rekening Baru */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-5 space-y-2.5 shadow-2xs">
        <strong className="text-xs sm:text-sm font-bold text-amber-950 block">
          {data.whyNewAccountRisk.heading}
        </strong>
        <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-sm text-amber-900 leading-relaxed">
          {data.whyNewAccountRisk.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </div>

      {/* Section 1: Stepper / Timeline Visual Anatomi Transfer */}
      <section
        id="alur-jebakan"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            Alur Jebakan Transaksi (Tekanan → Rekening Asing → Lenyap)
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
            Pilih setiap tahapan untuk melihat apa yang sedang direncanakan pelaku.
          </p>
        </div>

        {/* Alur Stepper Visual Modern (Zigzag Roadmap) */}
        <ModernProcessFlow
          steps={data.stepperTimeline.map((st, idx) => {
            const icons = [
              <Clock key={0} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <CreditCard key={1} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <Send key={2} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <Lock key={3} className="h-6 w-6 sm:h-7 sm:w-7" />,
            ];
            return {
              number: st.step,
              title: st.title,
              subtitle: st.shortDesc,
              description: st.accordionDetails,
              icon: icons[idx],
            };
          })}
        />
      </section>

      {/* Section 2: 5 Modus Tambahan yang Sering Menjebak */}
      <section
        id="modus-tambahan"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            {data.additionalAnatomyModus.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
            Cermati trik-trik yang sering mengecoh penjual maupun pembeli online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {data.additionalAnatomyModus.items.map((it, idx) => {
            const isDangerOpen = !!expandedDanger[idx];

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4 sm:p-5 space-y-2.5 shadow-2xs"
              >
                <h3 className="font-extrabold text-sm text-[#27374D]">{it.name}</h3>
                <p className="text-xs text-[#526D82] leading-relaxed">{it.desc}</p>

                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => toggleDanger(idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#27374D] text-xs font-bold transition-all shadow-2xs cursor-pointer group"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    <span>{isDangerOpen ? "Tutup bahaya" : "Bahaya"}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-[#526D82] transition-transform duration-200 ${
                        isDangerOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDangerOpen && (
                    <div className="mt-2.5 rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-950 flex items-start gap-2 shadow-xs animate-in fade-in slide-in-from-top-1 duration-150">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{it.danger}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Red Flags Bernuansa (Kuning vs Merah) */}
      <section
        id="red-flags"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            Tanda Kejanggalan Bernuansa (Red Flags)
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
            Tidak semua kejanggalan adalah penipuan pasti. Ketahui perbedaannya agar tidak salah langkah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.redFlagsNuanced.map((rf) => {
            const isAdviceOpen = !!expandedAdvice[rf.id];

            return (
              <div
                key={rf.id}
                className={`rounded-2xl border p-4 sm:p-5 space-y-2.5 shadow-2xs ${
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

                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => toggleAdvice(rf.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#27374D] text-xs font-bold transition-all shadow-2xs cursor-pointer group"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{isAdviceOpen ? "Tutup saran tindakan" : "Saran tindakan"}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-[#526D82] transition-transform duration-200 ${
                        isAdviceOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isAdviceOpen && (
                    <div className="mt-2.5 rounded-xl bg-white border border-slate-200 p-2.5 text-xs text-slate-800 flex items-start gap-2 shadow-2xs animate-in fade-in slide-in-from-top-1 duration-150">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="font-bold">Saran Tindakan: </strong>
                        <span>{rf.advice}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: Simulasi Chat Penjual (Ketuk Gelembung Mencurigakan) */}
      <section
        id="simulasi-chat"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-5 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            {data.chatSimulation.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
            {data.chatSimulation.subtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-[#E5DDD5] p-4 sm:p-6 space-y-3 border border-slate-300">
          {data.chatSimulation.bubbles.map((b: ChatBubbleSimulation) => {
            const isSelected = tappedBubbleId === b.id;
            const isSeller = b.sender === "penjual";

            return (
              <div
                key={b.id}
                className={`flex flex-col ${isSeller ? "items-start" : "items-end"}`}
              >
                <div
                  onClick={() => {
                    if (b.isSuspicious) {
                      setTappedBubbleId(isSelected ? null : b.id);
                    }
                  }}
                  className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed transition-all cursor-pointer shadow-xs ${
                    isSeller
                      ? isSelected
                        ? "bg-rose-100 border-2 border-rose-500 text-rose-950 font-medium"
                        : "bg-white text-slate-800 hover:ring-2 hover:ring-slate-300"
                      : "bg-[#DCF8C6] text-slate-800"
                  } ${isSeller ? "rounded-tl-xs" : "rounded-tr-xs"}`}
                >
                  <span className="text-[10px] font-bold block mb-0.5 text-slate-400 uppercase">
                    {isSeller ? "Penjual Toko" : "Anda (Pembeli)"}
                  </span>
                  <p>{b.text}</p>
                  {b.isSuspicious && !isSelected && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-rose-700 font-bold underline">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span>Ketuk untuk periksa tanda bahaya</span>
                    </span>
                  )}
                </div>

                {isSelected && b.redFlagExplanation && (
                  <div className="mt-2 max-w-md rounded-xl bg-rose-50 border border-rose-300 p-3 text-xs text-rose-950 leading-relaxed shadow-sm">
                    {b.redFlagExplanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 5: Studi Kasus Fiktif */}
      <section
        id="studi-kasus"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            {data.caseStudyFictional.title}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed italic bg-slate-50 border border-slate-200 p-4 rounded-2xl">
          "{data.caseStudyFictional.story}"
        </p>

        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-extrabold text-slate-800 block">
            Pelajaran Penting Kasus Ini:
          </span>
          <ul className="space-y-1 list-disc pl-4 text-xs text-[#526D82]">
            {data.caseStudyFictional.lessons.map((les, i) => (
              <li key={i}>{les}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 6: Kalau Terlanjur Transfer (Langkah Darurat) */}
      <section
        id="langkah-darurat"
        className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-rose-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-rose-950">
            {data.emergencyIfTransferred.title}
          </h2>
        </div>

        <div className="space-y-3">
          {data.emergencyIfTransferred.steps.map((st) => (
            <div
              key={st.order}
              className="rounded-2xl border border-rose-200 bg-white p-4 sm:p-5 space-y-1.5 shadow-2xs"
            >
              <h3 className="font-extrabold text-sm sm:text-base text-rose-950">
                {st.order}. {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {st.detail}
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

      {/* Section 7: Interactive Checklist Sebelum Transfer */}
      <section
        id="checklist"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-5 scroll-mt-32"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Sebelum Pencet 'Kirim', Cek 5 Hal Ini Dulu
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Luangkan 2 menit verifikasi sebelum konfirmasi transfer keluar.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-800 block">
              Kewaspadaan: {awarenessPercent}% ({completedChecksCount}/{data.checklist.length})
            </span>
          </div>
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
                  <p className="text-[11px] text-[#526D82]">{item.why}</p>
                  {item.privacyNote && (
                    <p className="text-[10px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 leading-relaxed mt-1">
                      {item.privacyNote}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {completedChecksCount === data.checklist.length && (
          <div className="rounded-2xl bg-emerald-100 border border-emerald-300 p-4 text-xs sm:text-sm text-emerald-950 flex items-center gap-3">
            <Award className="h-6 w-6 text-emerald-700 shrink-0" />
            <div>
              <strong className="font-extrabold block">Lencana: Penjaga Transfer Terpercaya</strong>
              <span>Kamu telah menyelesaikan seluruh checklist perlindungan transfer dana digital!</span>
            </div>
          </div>
        )}
      </section>

      {/* Section 8: FAQ Accordion */}
      <section
        id="faqs"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="space-y-2.5">
          {data.faqs.map((faq: FaqItem, idx: number) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF9] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#27374D] focus:outline-hidden cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-slate-400 pl-2">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 p-4 pt-2 text-xs sm:text-sm text-[#526D82] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 9: Mini Kuis (3 Soal) */}
      <section
        id="mini-kuis"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            Kuis: Apa Tindakanmu?
          </h2>
        </div>

        <div className="space-y-6">
          {data.quizzes.map((q: TransferQuizItem) => {
            const selectedIdx = quizAnswers[q.id];
            const isAnswered = showFeedback[q.id];
            const selectedOpt = q.options[selectedIdx];

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-4 sm:p-5 space-y-3"
              >
                <p className="font-bold text-xs sm:text-sm text-[#27374D] leading-relaxed">
                  {q.id}. {q.question}
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isChosen = selectedIdx === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                          setShowFeedback((prev) => ({ ...prev, [q.id]: true }));
                        }}
                        className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all cursor-pointer ${
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
                      {selectedOpt.isCorrect ? "✓ Keputusan Tepat!" : "✕ Kurang Aman"}
                    </strong>
                    <span>{selectedOpt.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 10: Intisari & Bagikan ke Keluarga */}
      <section
        id="intisari"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-[#27374D] p-5 sm:p-6 text-white space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
            INTISARI PERLINDUNGAN SEBELUM TRANSFER
          </span>
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            "{data.takeaway}"
          </p>
          <div className="pt-2">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              {copiedSummary ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Ringkasan Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span>Bagikan Ringkasan ke Keluarga</span>
                </>
              )}
            </button>
          </div>
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
