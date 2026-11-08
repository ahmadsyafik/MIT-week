import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  HeartHandshake,
  Users,
  ShieldCheck,
  Check,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  RefreshCw,
  KeyRound,
  Smartphone,
  Quote,
  Sparkles,
  WifiOff,
  CreditCard,
  Lock,
  AlertTriangle,
  Lightbulb,
  X,
  ShieldAlert,
  PhoneCall,
  Brain,
} from "lucide-react";
import { ModernProcessFlow } from "./ModernProcessFlow";
import { ModulDetailLayout, type ModulSectionItem } from "./ModulDetailLayout";
import {
  MODUL_DAMPINGI_KELUARGA_DATA,
  SimulationChallenge,
} from "../../data/modulDampingiKeluarga";

interface ModulDampingiKeluargaPageProps {
  isRead?: boolean;
  onBack: () => void;
  onToggleRead?: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigateTab?: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
  onSelectModule?: (moduleId: string) => void;
}

export function ModulDampingiKeluargaPage({
  isRead,
  onBack,
  onToggleRead,
  onComplete,
  isCompleted = false,
  onNavigateTab,
  onSelectModule,
}: ModulDampingiKeluargaPageProps) {
  const effectiveIsCompleted = isRead ?? isCompleted;
  const handleComplete = onToggleRead || onComplete || (() => {});
  const data = MODUL_DAMPINGI_KELUARGA_DATA;

  // State Simulasi Respon Pendamping (gaya picoCTF)
  const [selectedSimOption, setSelectedSimOption] = useState<number | null>(null);
  const [simSubmitted, setSimSubmitted] = useState<boolean>(false);

  // State Checklist Praktis
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    chk1: false,
    chk2: false,
    chk3: false,
    chk4: false,
  });

  const allChecklistDone = Object.values(checkedItems).filter(Boolean).length;
  const currentSim = data.simulationChallenges[0];

  const SECTIONS: ModulSectionItem[] = useMemo(
    () => [
      { id: "fase-psikologis", label: "1. 3 Fase Emosi Korban" },
      { id: "script-komunikasi", label: "2. Script Kalimat Terlarang vs Penguat" },
      { id: "simulasi-respons", label: "3. Latihan Refleks Empati" },
      { id: "prioritas-teknis", label: "4. Urutan Pengamanan Perangkat" },
      { id: "sandi-keluarga", label: "5. Integrasi Sandi Keluarga" },
      { id: "checklist", label: "6. Checklist & Rujukan Modul" },
    ],
    []
  );

  return (
    <ModulDetailLayout
      moduleId="m12"
      title={data.title}
      category="Setelah Kejadian & Pendampingan"
      terakhirDiperbaruiLabel={data.lastUpdated}
      readingTime={`${data.readingTimeMinutes} Menit Baca`}
      summary={data.subtitle}
      isRead={effectiveIsCompleted}
      onBack={onBack}
      onToggleRead={handleComplete}
      onNavigateTab={onNavigateTab || (() => {})}
      onSelectModule={onSelectModule}
      sections={SECTIONS}
      nextModule={{
        id: "m1",
        moduleNumber: 1,
        title: "Apa Itu Rekayasa Sosial?",
        desc: "Mulai kembali dari dasar: pelajari psikologi eksploitasi emosi manusia dan cara membangun jeda berpikir kritis.",
      }}
    >
      {/* Kutipan Korban & Prinsip Utama */}
      <div className="space-y-4">
        <div className="rounded-2xl bg-slate-900 border border-slate-700/60 p-5 sm:p-6 text-white shadow-2xs relative overflow-hidden">
          <Quote className="h-8 w-8 text-emerald-400/20 absolute top-4 right-4" />
          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed pr-8">
            &ldquo;{data.anonymousQuote.quote}&rdquo;
          </p>
          <span className="block text-[11px] text-emerald-400 font-semibold pt-2">
            — {data.anonymousQuote.author}
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-300/80 bg-emerald-50/70 p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
          <Heart className="h-5 w-5 text-emerald-600 fill-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="block font-bold text-emerald-900 text-xs uppercase tracking-wider">
              Prinsip Emas Pendamping Keluarga
            </strong>
            <p className="font-semibold text-emerald-950">
              &ldquo;{data.keyTakeaway}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* SEKSI 1: 3 FASE PSIKOLOGIS KORBAN PENIPUAN */}
      <section id="fase-psikologis" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
            <Users className="h-3.5 w-3.5 text-blue-600" />
            Dinamika Kejiwaan
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
            Memahami 3 Fase Emosi Korban Penipuan
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82]">
            Mengetahui apa yang dirasakan korban membantumu merespons dengan bijak tanpa memperparah trauma.
          </p>
        </div>

        {/* 3 Fase Visual Bergaya Zigzag Modern */}
        <ModernProcessFlow
          steps={data.psychologicalPhases.map((phase, idx) => {
            const icons = [
              <ShieldAlert key={0} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <Heart key={1} className="h-6 w-6 sm:h-7 sm:w-7" />,
              <Sparkles key={2} className="h-6 w-6 sm:h-7 sm:w-7" />,
            ];
            return {
              number: phase.order,
              title: phase.phaseName,
              subtitle: `Tanda: ${phase.symptoms}`,
              description: phase.bestSupporterAttitude,
              icon: icons[idx],
              extraDetail: (
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="text-emerald-900 bg-emerald-50 p-2 rounded-xl border border-emerald-200 leading-relaxed flex items-start gap-1.5">
                    <Heart className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div><strong>Sikap Terbaik:</strong> {phase.bestSupporterAttitude}</div>
                  </div>
                  <div className="text-rose-800 bg-rose-50 p-1.5 rounded-lg leading-relaxed flex items-start gap-1.5 text-[10px]">
                    <AlertTriangle className="h-3 w-3 text-rose-600 shrink-0 mt-0.5" />
                    <span>{phase.caution}</span>
                  </div>
                </div>
              ),
            };
          })}
        />
      </section>

      {/* SEKSI 2: CHAT BUBBLE DIALOG (KONTRASTIF) */}
      <section id="script-komunikasi" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
            <MessageCircle className="h-3.5 w-3.5 text-blue-600" />
            Panduan Komunikasi
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
            Script Percakapan: Apa yang Harus Dikatakan vs Dihindari
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82]">
            Bandingkan kalimat pendukung yang menenangkan dengan kata-kata menghakimi yang merusak hubungan.
          </p>
        </div>

        <div className="space-y-6">
          {data.dialogueComparisons.map((item, idx) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-slate-50/30">
              <span className="text-xs font-bold text-[#27374D] block border-b border-slate-200 pb-2">
                Situasi {idx + 1}: {item.situation}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Supportive Speech */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5 uppercase">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Kalimat yang Membantu (Ucapkan)
                  </span>
                  <div className="rounded-2xl rounded-tl-xs bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-950 shadow-2xs leading-relaxed">
                    {item.supportiveSpeech.bubble}
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-relaxed pl-1 flex items-start gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><em>Kenapa tepat:</em> {item.supportiveSpeech.reason}</span>
                  </p>
                </div>

                {/* Harmful Speech */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-rose-800 flex items-center gap-1.5 uppercase">
                    <X className="h-3.5 w-3.5 text-rose-600 shrink-0" /> Kalimat yang Menghakimi (Hindari)
                  </span>
                  <div className="rounded-2xl rounded-tl-xs bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-950 shadow-2xs leading-relaxed">
                    {item.harmfulSpeech.bubble}
                  </div>
                  <p className="text-[11px] text-rose-700 leading-relaxed pl-1 flex items-start gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span><em>Dampak buruk:</em> {item.harmfulSpeech.impact}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 3: SIMULASI RESPONS PENDAMPING (PICOCTF-STYLE) */}
      <section id="simulasi-respons" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Simulasi Respons Empati
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
            Latihan Refleks: Pilih Respons Terbaik
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82]">
            Uji responsmu saat berhadapan langsung dengan anggota keluarga yang sedang syok.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-slate-50/50">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#526D82]">Skenario Kasus:</span>
            <p className="text-xs sm:text-sm text-[#27374D] leading-relaxed">
              {currentSim.context}
            </p>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#27374D] italic">
              {currentSim.victimStatement}
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-bold text-[#27374D]">Pilih kalimat respons yang kamu berikan:</span>
            {currentSim.options.map((opt, oIdx) => {
              const isSelected = selectedSimOption === oIdx;
              return (
                <button
                  key={oIdx}
                  disabled={simSubmitted}
                  onClick={() => setSelectedSimOption(oIdx)}
                  className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    simSubmitted
                      ? opt.isBest
                        ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                        : isSelected
                        ? "bg-rose-50 border-rose-300 text-rose-950"
                        : "bg-white border-slate-200 text-slate-500 opacity-60"
                      : isSelected
                      ? "bg-[#27374D] text-white border-[#27374D]"
                      : "bg-white border-slate-200 text-[#27374D] hover:bg-slate-100"
                  }`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Feedback Simulasi */}
          {simSubmitted && selectedSimOption !== null && (
            <div
              className={`p-4 rounded-xl text-xs leading-relaxed space-y-1 animate-fadeIn ${
                currentSim.options[selectedSimOption].isBest
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-950"
                  : "bg-amber-50 border border-amber-200 text-amber-950"
              }`}
            >
              <strong>Evaluasi:</strong> {currentSim.options[selectedSimOption].feedback}
            </div>
          )}

          <div className="pt-2 flex justify-end">
            {!simSubmitted ? (
              <button
                onClick={() => setSimSubmitted(true)}
                disabled={selectedSimOption === null}
                className="px-5 py-2.5 rounded-xl bg-[#27374D] text-white text-xs font-bold hover:bg-[#1E293B] disabled:opacity-50 cursor-pointer"
              >
                Kirim Respons
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedSimOption(null);
                  setSimSubmitted(false);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#27374D] hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Ulangi Simulasi
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SEKSI 4: PRIORITAS LANGKAH PENGAMANAN PERANGKAT (TEKNIS BERURUTAN) */}
      <section id="prioritas-teknis" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
            <Smartphone className="h-3.5 w-3.5 text-blue-600" />
            Protokol Teknis Darurat
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
            Urutan Prioritas Pengamanan Perangkat Korban
          </h2>
          <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
            Urutan tindakan sangat krusial dalam hitungan menit pertama. Perhatikan perbedaan jelas antara mode pesawat vs cabut SIM card.
          </p>
        </div>

        <div className="space-y-3">
          {data.deviceSecurityPriority.map((step) => (
            <div
              key={step.priority}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-sm font-bold text-[#27374D]">
                {step.priority}. {step.action}
              </h3>
              <div className="space-y-1 text-xs">
                <p className="text-blue-900 font-bold text-[11px]">
                  Tujuan: {step.goal}
                </p>
                <p className="text-[#526D82] leading-relaxed">{step.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 5: INTEGRASI SANDI KELUARGA (CEGAH AI VOICE CLONING) */}
      <section id="sandi-keluarga" className="rounded-3xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50 to-blue-50/50 p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-32">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-black tracking-wide uppercase">
          <KeyRound className="h-4 w-4 text-emerald-700" />
          <span>Proteksi Masa Depan</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
          {data.sandiKeluargaConnection.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
          {data.sandiKeluargaConnection.voiceCloneContext}
        </p>
        <p className="text-xs sm:text-sm text-emerald-950 font-medium bg-white/80 p-4 rounded-2xl border border-emerald-200 leading-relaxed flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
          <span><strong>Bagaimana Sandi Keluarga Melindungi:</strong> {data.sandiKeluargaConnection.whySandiHelps}</span>
        </p>
        <div className="pt-2">
          <Link
            to={data.sandiKeluargaConnection.actionUrl}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-xs cursor-pointer"
          >
            <span>Buka Fitur Pembuat Sandi Keluarga Sekarang</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* SEKSI 6: CHECKLIST PRAKTIS PENDAMPING & RUJUKAN MODUL */}
      <section id="checklist" className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-32">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#27374D]">Checklist Praktis Pendamping</h2>
            <p className="text-xs text-[#526D82]">
              Langkah nyata untuk mendampingi keluarga ({allChecklistDone}/4 tindakan selesai)
            </p>
          </div>
          <span className="text-xs font-bold text-[#27374D]">
            {Math.round((allChecklistDone / 4) * 100)}% Selesai
          </span>
        </div>

        <div className="space-y-3">
          {[
            { id: "chk1", label: "Tahan emosi dan jangan menghakimi korban saat pertama kali mendengar cerita kejadian." },
            { id: "chk2", label: "Amankan ponsel segera: mode pesawat untuk hentikan malware, cabut SIM card jika rawan OTP." },
            { id: "chk3", label: "Bantu ketik draf kronologi dan dampingi saat melapor ke bank serta portal iasc.ojk.go.id." },
            { id: "chk4", label: "Ajak keluarga membuat Sandi Keluarga untuk menangkal telepon penipuan AI di masa depan." },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer text-xs font-medium text-[#27374D]"
            >
              <input
                type="checkbox"
                checked={checkedItems[item.id] || false}
                onChange={(e) => setCheckedItems((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                className="mt-0.5 rounded text-[#27374D] focus:ring-[#27374D]"
              />
              <span className="leading-relaxed">{item.label}</span>
            </label>
          ))}
        </div>

        {/* Rujukan Antarmodul */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-xs font-bold text-[#27374D] uppercase tracking-wider">Modul Pendukung Terkait</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button
              onClick={() => onSelectModule ? onSelectModule("m11") : onBack()}
              className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-950 font-bold transition-all flex items-center justify-between text-left cursor-pointer"
            >
              <span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" /> Cara Lapor (m11)</span>
              <ArrowRight className="h-4 w-4 text-rose-600 shrink-0" />
            </button>
            <button
              onClick={() => onSelectModule ? onSelectModule("m5") : onBack()}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#27374D] font-bold transition-all flex items-center justify-between text-left cursor-pointer"
            >
              <span className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-[#526D82] shrink-0" /> Telepon Bank (m5)</span>
              <ChevronRight className="h-4 w-4 text-[#526D82] shrink-0" />
            </button>
            <button
              onClick={() => onSelectModule ? onSelectModule("m2") : onBack()}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#27374D] font-bold transition-all flex items-center justify-between text-left cursor-pointer"
            >
              <span className="flex items-center gap-2"><Brain className="h-4 w-4 text-[#526D82] shrink-0" /> Anatomi Penipuan (m2)</span>
              <ChevronRight className="h-4 w-4 text-[#526D82] shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-xs text-[#526D82] space-y-2 pt-4 border-t border-[#9DB2BF]/30">
        <p className="leading-relaxed">
          Modul ini dikembangkan untuk membangun kesadaran empati di lingkungan keluarga. Penipuan digital dapat menimpa siapa saja, dan dukungan keluarga adalah benteng pertahanan terbaik.
        </p>
        <p className="text-[11px] text-slate-400">
          JagaRuang Modul Literasi & Pemulihan Keluarga
        </p>
      </footer>
    </ModulDetailLayout>
  );
}
