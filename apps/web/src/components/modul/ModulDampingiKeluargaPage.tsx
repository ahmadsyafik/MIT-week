import React, { useState } from "react";
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
} from "lucide-react";
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
}

export function ModulDampingiKeluargaPage({
  isRead,
  onBack,
  onToggleRead,
  onComplete,
  isCompleted = false,
  onNavigateTab,
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

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Tombol Kembali & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#526D82] hover:text-[#27374D] transition-colors"
        >
          ← Kembali ke Pembelajaran
        </button>
        <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Modul {data.id.toUpperCase()} · {data.readingTimeMinutes} Menit Baca
        </span>
      </div>

      {/* Header Banner - Warna Hangat & Empatik (Soft Blue/Sage Green) */}
      <header className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-[#1E293B] via-[#243348] to-[#1E3A4B] p-6 sm:p-10 text-white shadow-md relative overflow-hidden space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wide uppercase">
          <HeartHandshake className="h-3.5 w-3.5" />
          Dukungan Emosional & Pemulihan Keluarga
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
          {data.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
          {data.subtitle}
        </p>

        {/* Kutipan Anonim Korban */}
        <div className="pt-2">
          <div className="rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 p-5 space-y-2 relative">
            <Quote className="h-6 w-6 text-emerald-300/40 absolute top-4 right-4" />
            <p className="text-xs sm:text-sm text-slate-100 italic leading-relaxed">
              &ldquo;{data.anonymousQuote.quote}&rdquo;
            </p>
            <span className="block text-[11px] text-emerald-300 font-semibold">
              — {data.anonymousQuote.author}
            </span>
          </div>
        </div>
      </header>

      {/* Card Intisari Emas */}
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-black tracking-wide uppercase">
          <Heart className="h-4 w-4 text-emerald-600 fill-emerald-600" />
          <span>Prinsip Utama Pendamping</span>
        </div>
        <p className="text-base sm:text-lg font-bold text-emerald-950 leading-relaxed">
          &ldquo;{data.keyTakeaway}&rdquo;
        </p>
      </section>

      {/* SEKSI 1: 3 FASE PSIKOLOGIS KORBAN PENIPUAN */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.psychologicalPhases.map((phase) => (
            <div
              key={phase.order}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                  {phase.order}
                </span>
                <h3 className="text-sm font-bold text-[#27374D] leading-snug">
                  {phase.phaseName}
                </h3>
                <p className="text-xs text-[#526D82] leading-relaxed">
                  <strong>Tanda yang tampak:</strong> {phase.symptoms}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[11px] text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 leading-relaxed">
                  💚 <strong>Sikap terbaik:</strong> {phase.bestSupporterAttitude}
                </div>
                <div className="text-[10px] text-rose-800 bg-rose-50 p-2 rounded-lg leading-relaxed">
                  ⚠️ {phase.caution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 2: CHAT BUBBLE DIALOG (KONTRASTIF) */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
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
                  <p className="text-[11px] text-emerald-700 leading-relaxed pl-1">
                    💡 <em>Kenapa tepat:</em> {item.supportiveSpeech.reason}
                  </p>
                </div>

                {/* Harmful Speech */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-rose-800 flex items-center gap-1.5 uppercase">
                    <span className="text-xs">✕</span> Kalimat yang Menghakimi (Hindari)
                  </span>
                  <div className="rounded-2xl rounded-tl-xs bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-950 shadow-2xs leading-relaxed">
                    {item.harmfulSpeech.bubble}
                  </div>
                  <p className="text-[11px] text-rose-700 leading-relaxed pl-1">
                    ⚠️ <em>Dampak buruk:</em> {item.harmfulSpeech.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 3: SIMULASI RESPONS PENDAMPING (PICOCTF-STYLE) */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
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
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
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
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-[#27374D] text-white text-xs font-black flex items-center justify-center shrink-0">
                  {step.priority}
                </span>
                <h3 className="text-sm font-bold text-[#27374D]">{step.action}</h3>
              </div>
              <div className="pl-8 space-y-1 text-xs">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 font-bold text-[11px]">
                  Tujuan: {step.goal}
                </span>
                <p className="text-[#526D82] leading-relaxed">{step.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 5: INTEGRASI SANDI KELUARGA (CEGAH AI VOICE CLONING) */}
      <section className="rounded-3xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50 to-blue-50/50 p-6 sm:p-8 space-y-4 shadow-xs">
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
        <p className="text-xs sm:text-sm text-emerald-950 font-medium bg-white/80 p-4 rounded-2xl border border-emerald-200 leading-relaxed">
          💡 <strong>Bagaimana Sandi Keluarga Melindungi:</strong> {data.sandiKeluargaConnection.whySandiHelps}
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

      {/* CHECKLIST PRAKTIS PENDAMPING & SELESAI */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#27374D]">Checklist Praktis Pendamping</h2>
            <p className="text-xs text-[#526D82]">
              Langkah nyata untuk mendampingi keluarga ({allChecklistDone}/4 tindakan selesai)
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-[#27374D]">
            {Math.round((allChecklistDone / 4) * 100)}%
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

        {/* CTA Selesai Modul */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/sandi"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Praktik Buat Sandi Keluarga</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={handleComplete}
            disabled={effectiveIsCompleted}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              effectiveIsCompleted
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-[#27374D] text-white hover:bg-[#1E293B] shadow-sm"
            }`}
          >
            <Check className="h-4 w-4" />
            <span>{effectiveIsCompleted ? "Modul Selesai Dibaca" : "Tandai Modul Selesai"}</span>
          </button>
        </div>
      </section>

      {/* TAUTAN ANTARMODUL */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#27374D] uppercase tracking-wider">Modul Pendukung Terkait</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            to="/belajar?modul=m11"
            className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-950 font-bold transition-all flex items-center justify-between"
          >
            <span>🚨 Pusat Darurat: Cara Lapor (m11)</span>
            <ArrowRight className="h-4 w-4 text-rose-600" />
          </Link>
          <Link
            to="/belajar?modul=m5"
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#27374D] font-bold transition-all flex items-center justify-between"
          >
            <span>📞 Waspada Telepon Bank (m5)</span>
            <ChevronRight className="h-4 w-4 text-[#526D82]" />
          </Link>
          <Link
            to="/belajar?modul=m2"
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#27374D] font-bold transition-all flex items-center justify-between"
          >
            <span>🧠 Anatomi Sebuah Penipuan (m2)</span>
            <ChevronRight className="h-4 w-4 text-[#526D82]" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-xs text-[#526D82] space-y-2 pt-4 border-t border-[#9DB2BF]/30">
        <p className="leading-relaxed">
          Modul ini dikembangkan untuk membangun kesadaran empati di lingkungan keluarga. Penipuan digital dapat menimpa siapa saja, dan dukungan keluarga adalah benteng pertahanan terbaik.
        </p>
        <p className="text-[11px] text-slate-400">
          Terakhir diperbarui: {data.lastUpdated} · JagaRuang Modul Literasi & Pemulihan Keluarga
        </p>
      </footer>
    </div>
  );
}
