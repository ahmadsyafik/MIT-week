import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  PhoneOff,
  Video,
  Layers,
  HelpCircle,
  CheckSquare,
  Award,
  Info,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";
import { ModulDetailLayout, type ModulSectionItem } from "./ModulDetailLayout";
import {
  MODUL_TELEPON_BANK,
  type CallSimulationStep,
} from "../../data/modulTeleponBank";

interface ModulTeleponBankPageProps {
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
  onSelectModule?: (moduleId: string) => void;
}

export function ModulTeleponBankPage({
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
  onSelectModule,
}: ModulTeleponBankPageProps) {
  const data = MODUL_TELEPON_BANK;

  // 1. Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`jagaruang_chk_${data.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 2. Dialog simulation step choices
  const [selectedChoices, setSelectedChoices] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  // Sections config for Table of Contents
  const SECTIONS: ModulSectionItem[] = useMemo(
    () => [
      { id: "caller-id-spoofing", label: "1. Caller ID Spoofing" },
      { id: "aturan-verifikasi", label: "2. Aturan Wajib Verifikasi" },
      { id: "varian-vishing", label: "3. Varian Vishing Modern" },
      { id: "crowd-apps", label: "4. Aplikasi Crowd-Reported" },
      { id: "simulasi-telepon", label: "5. Simulasi Percakapan" },
      { id: "checklist", label: "6. Checklist Perlindungan" },
      { id: "intisari", label: "7. Intisari & Sumber Resmi" },
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
              "Hebat! Kamu telah memahami cara melindungi diri dari ancaman telepon bank palsu (vishing).",
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

  return (
    <ModulDetailLayout
      moduleId="m5"
      title={data.title}
      category="Per Kanal & Skenario"
      terakhirDiperbaruiLabel={data.lastUpdated}
      readingTime={data.readingTime}
      summary="Memahami teknologi Caller ID Spoofing, varian panggilan video manipulatif, serta langkah verifikasi independen saat menerima telepon mengatasnamakan bank."
      isRead={isRead}
      onBack={onBack}
      onToggleRead={onToggleRead}
      onNavigateTab={onNavigateTab}
      onSelectModule={onSelectModule}
      sections={SECTIONS}
      nextModule={{
        id: "m6",
        moduleNumber: 6,
        title: "10 Ciri Pesan Phishing yang Wajib Dicek",
        desc: "Checklist interaktif dan taktik mengenali tanda-tanda pesan phising secara akurat.",
      }}
    >
      {/* TOP CONTRAST WARNING BOX */}
      <div className="rounded-3xl border-2 border-rose-600 bg-slate-900 p-6 sm:p-7 text-white shadow-md space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-400">
          <AlertOctagon className="h-5 w-5 text-rose-400 shrink-0" />
          <span>PRINSIP UTAMA PERBANKAN</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-white leading-snug tracking-wide">
          {data.topBannerGoldenRule.main}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {data.topBannerGoldenRule.sub}
        </p>
      </div>

      {/* Section 1: Diagram Alur Sederhana Caller ID Spoofing */}
      <section
        id="caller-id-spoofing"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-5 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            {data.callerIdSpoofingDiagram.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.callerIdSpoofingDiagram.steps.map((st) => (
            <div
              key={st.order}
              className="relative rounded-2xl border border-slate-200 bg-[#FFFDF9] p-5 space-y-2 shadow-2xs"
            >
              <h3 className="font-extrabold text-sm text-[#27374D]">
                {st.order}. {st.label}
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                {st.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Kesimpulan Kunci: </strong>
            Nomor 1500xxx atau nama 'Bank Resmi' yang muncul di layar ponselmu BUKAN BUKTI bahwa penelepon adalah petugas bank. Nomor tersebut dapat dimanipulasi dengan mudah lewat gateway VoIP internet.
          </p>
        </div>
      </section>

      {/* Section 2: Aturan Verifikasi Independen */}
      <section
        id="aturan-verifikasi"
        className="rounded-3xl border border-rose-200 bg-rose-50/30 p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-rose-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-rose-950">
            {data.independentVerificationRule.title}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-rose-900 font-bold leading-relaxed">
          {data.independentVerificationRule.warning}
        </p>

        <div className="space-y-2">
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wide block">
            3 Sumber Nomor Verifikasi yang Benar-Benar Aman:
          </span>
          <div className="space-y-2">
            {data.independentVerificationRule.safeChannels.map((ch, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white border border-rose-200 p-3 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 shadow-2xs"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{ch}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Varian Vishing Modern (WhatsApp & Video Call) */}
      <section
        id="varian-vishing"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            {data.modernVariants.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
            Penipu kini tidak hanya memakai panggilan telepon kabel biasa, melainkan juga aplikasi pesan instan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.modernVariants.items.map((it, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-5 space-y-3 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs">
                {idx === 0 ? (
                  <PhoneOff className="h-4 w-4" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
                <span>{it.type}</span>
              </div>
              <p className="text-xs text-[#526D82] leading-relaxed">{it.modus}</p>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Respons Aman: </strong>
                  <span>{it.howToRespond}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Aplikasi Identifikasi Nomor (Truecaller / GetContact) */}
      <section
        id="crowd-apps"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            {data.crowdReportedApps.title}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed">
          {data.crowdReportedApps.howItWorks}
        </p>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Catatan Privasi Penting: </strong>
            <span>{data.crowdReportedApps.privacyCaveat}</span>
          </div>
        </div>
      </section>

      {/* Section 5: Simulasi Percakapan Telepon Bertahap */}
      <section
        id="simulasi-telepon"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
            {data.dialogSimulation.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
            {data.dialogSimulation.intro}
          </p>
        </div>

        <div className="space-y-6">
          {data.dialogSimulation.steps.map((st: CallSimulationStep) => {
            const selectedIdx = selectedChoices[st.step];
            const isAnswered = showFeedback[st.step];
            const selectedOpt = st.options[selectedIdx];

            return (
              <div
                key={st.step}
                className="rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-5 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#27374D]">
                    Langkah Dialog #{st.step}
                  </span>
                  <span className="font-mono">{st.speaker}</span>
                </div>

                {/* Bubble Panggilan */}
                <div className="rounded-2xl bg-slate-900 text-white p-4 text-xs sm:text-sm font-mono leading-relaxed">
                  {st.dialogText}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {st.options.map((opt, optIdx) => {
                    const isChosen = selectedIdx === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setSelectedChoices((prev) => ({
                            ...prev,
                            [st.step]: optIdx,
                          }));
                          setShowFeedback((prev) => ({
                            ...prev,
                            [st.step]: true,
                          }));
                        }}
                        className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                          isChosen
                            ? opt.isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                              : "border-rose-500 bg-rose-50 text-rose-950 font-bold"
                            : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
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
                      {selectedOpt.isCorrect
                        ? "✓ Keputusan Tepat!"
                        : "✕ Pilihan Berbahaya!"}
                    </strong>
                    <span>{selectedOpt.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 6: Interactive Checklist */}
      <section
        id="checklist"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-5 scroll-mt-32"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#27374D]">
              Checklist Perlindungan Telepon Palsu
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] mt-0.5">
              Pastikan kamu memegang 4 prinsip tindakan ini saat ponsel berdering.
            </p>
          </div>
          <span className="text-xs font-bold text-rose-800 self-start sm:self-auto">
            {completedChecksCount} / {data.checklist.length} Langkah Selesai
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
                  <p className="text-[11px] text-[#526D82]">{item.why}</p>
                </div>
              </div>
            );
          })}
        </div>

        {completedChecksCount === data.checklist.length && (
          <div className="rounded-2xl bg-emerald-100 border border-emerald-300 p-4 text-xs sm:text-sm text-emerald-950 flex items-center gap-3">
            <Award className="h-6 w-6 text-emerald-700 shrink-0" />
            <div>
              <strong className="font-extrabold block">Lencana: Penjaga Telepon Tangguh</strong>
              <span>Kamu telah menyelesaikan seluruh checklist mitigasi vishing telepon bank!</span>
            </div>
          </div>
        )}
      </section>

      {/* Section 7: Intisari & Footer Rujukan */}
      <section
        id="intisari"
        className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32"
      >
        <div className="rounded-2xl bg-gradient-to-r from-rose-900 to-[#27374D] p-5 sm:p-6 text-white space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">
            INTISARI PERLINDUNGAN TELEPON
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
