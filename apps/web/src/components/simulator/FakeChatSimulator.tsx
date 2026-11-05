import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Lock,
  CheckCheck,
  FileCode,
  Download,
  AlertOctagon,
  Sparkles,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  Send,
  Smartphone,
  Mail,
  ShoppingBag,
  Heart,
  MessageSquare,
  Users,
  Compass,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";
import {
  FIVE_STEP_SCENARIOS,
  type FiveStepScenarioData,
  type ScenarioEnding,
} from "../../mocks/fiveStepScenarios";

interface ChatMessage {
  id: string;
  sender: "attacker" | "user" | "system" | "bank" | "call";
  text?: string;
  timestamp: string;
  attachment?: {
    name: string;
    size?: string;
    type: "apk" | "pdf" | "jpg";
  };
  systemCard?: {
    type: "warning" | "danger" | "success" | "call" | "consequence";
    title: string;
    body: string;
  };
}

interface FakeChatSimulatorProps {
  scenarioId?: string;
  scenario?: {
    id: string;
    title?: string;
    category?: string;
    levelLabel?: string;
    levelBadge?: string;
    dotColor?: string;
  };
  onBack: () => void;
  onNavigateTab?: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function FakeChatSimulator({
  scenarioId,
  scenario,
  onBack,
  onNavigateTab,
}: FakeChatSimulatorProps) {
  // Ambil ID skenario aktif (default: k1)
  const activeId = (scenarioId || scenario?.id || "k1").toLowerCase();
  const currentScenario: FiveStepScenarioData =
    FIVE_STEP_SCENARIOS[activeId] || FIVE_STEP_SCENARIOS["k1"];

  // State simulasi
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentDecisionId, setCurrentDecisionId] = useState<number | null>(1);
  const [activeEnding, setActiveEnding] = useState<ScenarioEnding | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [copiedFlag, setCopiedFlag] = useState(false);
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);
  const [decisionHistory, setDecisionHistory] = useState<Array<{ decisionId: number; choice: "A" | "B" }>>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  const scrollToBottom = (smooth = true) => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    setShowScrollDown(distanceToBottom > 120);
  };

  // Reset & inisialisasi chat
  const initChat = () => {
    setCurrentDecisionId(1);
    setActiveEnding(null);
    setIsTyping(false);
    setCopiedFlag(false);
    setDecisionHistory([]);

    const initialMessages: ChatMessage[] = [
      {
        id: "msg-0",
        sender: "system",
        timestamp: "09:40",
        text: `🔒 Saluran komunikasi: ${currentScenario.channel} • Nomor asing (${currentScenario.senderAddress}). Berhati-hatilah terhadap tautan atau berkas.`,
      },
      {
        id: "msg-1",
        sender: currentScenario.channelType === "voice_call" ? "call" : "attacker",
        timestamp: "09:41",
        text: currentScenario.briefing.messageText,
        attachment: currentScenario.briefing.attachmentName
          ? {
              name: currentScenario.briefing.attachmentName,
              size: currentScenario.briefing.attachmentSize,
              type: currentScenario.briefing.attachmentType || "apk",
            }
          : undefined,
      },
    ];

    setMessages(initialMessages);
  };

  useEffect(() => {
    initChat();
  }, [activeId]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isTyping, currentDecisionId, activeEnding]);

  // Eksekusi Pilihan A (Berisiko) atau B (Aman) pada titik keputusan aktif
  const handleSelectOption = (choice: "A" | "B") => {
    if (!currentDecisionId || isTyping || activeEnding) return;

    const currentDecision = currentScenario.decisions[currentDecisionId];
    if (!currentDecision) return;

    const selectedOption = currentDecision.options[choice];
    setDecisionHistory((prev) => [...prev, { decisionId: currentDecisionId, choice }]);
    setCurrentDecisionId(null); // Kunci sementara
    setIsTyping(true);

    // 1. Tambahkan bubble chat dari sisi pengguna (kanan)
    const userMsg: ChatMessage = {
      id: `user-dec-${currentDecisionId}-${Date.now()}`,
      sender: "user",
      timestamp: "09:42",
      text: selectedOption.userReply,
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Beri jeda realistis lalu tampilkan kartu konsekuensi
    setTimeout(() => {
      const consequenceMsg: ChatMessage = {
        id: `conseq-dec-${currentDecisionId}`,
        sender: "system",
        timestamp: "09:43",
        systemCard: {
          type: choice === "A" ? "warning" : "success",
          title: choice === "A" ? "⚠️ Konsekuensi Tindakan Berisiko" : "🛡️ Konsekuensi Tindakan Aman & Hati-hati",
          body: selectedOption.consequence,
        },
      };
      setMessages((prev) => [...prev, consequenceMsg]);

      // 3. Tentukan langkah berikutnya (Lanjut ke keputusan lain atau Capai Ending)
      const next = selectedOption.nextStep;

      if (typeof next === "number") {
        // Melanjutkan ke titik keputusan berikutnya
        setTimeout(() => {
          const nextDecision = currentScenario.decisions[next];
          if (nextDecision) {
            // Jika ada pesan dialog balasan dari attacker/sistem
            const role = nextDecision.senderRole || (currentScenario.channelType === "voice_call" ? "call" : "attacker");
            const nextPromptMsg: ChatMessage = {
              id: `prompt-dec-${next}`,
              sender: role,
              timestamp: "09:44",
              text: nextDecision.scenarioPrompt,
            };
            setMessages((prev) => [...prev, nextPromptMsg]);
            setCurrentDecisionId(next);
          }
          setIsTyping(false);
        }, 1100);
      } else {
        // Capai salah satu Ending (EndingA, EndingB, EndingC, EndingD, EndingE)
        setTimeout(() => {
          const finalEnding = currentScenario.endings[next];
          setActiveEnding(finalEnding);
          setIsTyping(false);

          addNotification({
            title: `${finalEnding.title}: ${currentScenario.title}`,
            message: `Simulasi tuntas! Skor: ${finalEnding.score}/100 (${finalEnding.rank}). ${finalEnding.subtitle}.`,
            type: finalEnding.score >= 80 ? "sukses" : "waspada",
            link: "/belajar?tab=simulator",
          });
        }, 1200);
      }
    }, 900);
  };

  const handleCopyFlag = () => {
    if (currentScenario.flagCode) {
      navigator.clipboard?.writeText(currentScenario.flagCode);
      setCopiedFlag(true);
      setTimeout(() => setCopiedFlag(false), 2000);
    }
  };

  // Ikon kanal
  const ChannelIcon =
    currentScenario.channelType === "voice_call"
      ? Phone
      : currentScenario.channelType === "email"
      ? Mail
      : currentScenario.channelType === "social_dm"
      ? MessageSquare
      : currentScenario.channelType === "dating_app"
      ? Heart
      : currentScenario.channelType === "marketplace"
      ? ShoppingBag
      : Smartphone;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 select-none animate-fadeIn">
      {/* Top Bar Navigasi Skenario */}
      <div className="flex items-center justify-between border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#526D82] hover:text-[#27374D] cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Skenario</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Tombol Buka Bukti Investigasi */}
          <button
            type="button"
            onClick={() => setShowEvidenceDrawer((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#27374D] bg-[#DDE6ED] hover:bg-[#9DB2BF]/40 border border-[#9DB2BF]/60 transition-all cursor-pointer shadow-xs"
          >
            <Info className="h-3.5 w-3.5 text-[#526D82]" />
            <span>4 Tanda Kejanggalan (+40 Poin)</span>
            {showEvidenceDrawer ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          <button
            type="button"
            onClick={initChat}
            title="Ulangi simulasi dari awal"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-[#526D82] hover:text-[#27374D] bg-white border border-[#9DB2BF]/50 hover:bg-[#DDE6ED]/50 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Ulangi Kasus</span>
          </button>
        </div>
      </div>

      {/* Drawer 4 Bukti Investigasi Red Flags */}
      {showEvidenceDrawer && (
        <div className="rounded-2xl border-2 border-[#526D82]/30 bg-white p-4 sm:p-5 shadow-lg space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#DDE6ED] pb-2">
            <span className="text-xs font-black text-[#27374D] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>4 Bukti Investigasi Penting yang Perlu Kamu Kenali:</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Terverifikasi (+40 Poin)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {currentScenario.evidences.map((ev, idx) => (
              <div
                key={ev.id}
                className="rounded-xl border border-[#9DB2BF]/40 bg-[#DDE6ED]/30 p-3 space-y-1"
              >
                <div className="flex items-center gap-2 font-bold text-[#27374D]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#27374D] text-[10px] font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="line-clamp-1">{ev.label}</span>
                </div>
                <p className="text-[11px] text-[#526D82] leading-relaxed pl-7">{ev.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Container Simulator (Fake Chat Layout) */}
      <div className="rounded-3xl border border-[#9DB2BF]/60 bg-white shadow-xl overflow-hidden flex flex-col">
        {/* Chat App Header Bar */}
        <div className="bg-[#27374D] text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            {/* Avatar Pengirim */}
            <div className="relative">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-amber-600 to-rose-500 flex items-center justify-center font-bold text-white text-sm shadow-md ring-2 ring-white/20">
                <ChannelIcon className="h-5 w-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#27374D]" />
            </div>

            {/* Nama & Status Kontak */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-white tracking-wide truncate max-w-[200px] sm:max-w-none">
                  {currentScenario.senderName}
                </span>
                <span className="rounded-full bg-rose-500/25 text-rose-300 border border-rose-400/30 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider">
                  Nomor Asing
                </span>
              </div>
              <span className="text-[11px] text-[#DDE6ED]/70 flex items-center gap-1 font-mono">
                <span>{currentScenario.senderAddress}</span>
              </span>
            </div>
          </div>

          {/* Sisi Kanan Header: Info Skenario */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
              {currentScenario.id.toUpperCase()} · 5 Titik Keputusan
            </span>
          </div>
        </div>

        {/* Polaroid Context / Sub-banner */}
        <div className="bg-[#F0F4F8] border-b border-[#9DB2BF]/30 px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between gap-3 text-xs text-[#526D82]">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#526D82] shrink-0" />
            <p className="line-clamp-1 sm:line-clamp-none">
              <strong className="text-[#27374D]">{currentScenario.title}:</strong> {currentScenario.modus}
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#526D82] shrink-0 hidden md:inline">
            Scroll ke atas untuk memeriksa riwayat 💬
          </span>
        </div>

        {/* Scrollable Chat Area */}
        <div
          ref={chatScrollContainerRef}
          onScroll={handleScroll}
          className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[500px] sm:max-h-[580px] bg-[#EEF2F6] bg-opacity-70 scroll-smooth relative"
          style={{
            backgroundImage: `radial-gradient(#9DB2BF 0.65px, transparent 0.65px), radial-gradient(#9DB2BF 0.65px, #EEF2F6 0.65px)`,
            backgroundSize: "26px 26px",
            backgroundPosition: "0 0, 13px 13px",
          }}
        >
          {/* Tanggal Separator */}
          <div className="flex justify-center my-2">
            <span className="bg-white/80 backdrop-blur-xs text-[#526D82] text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs border border-[#9DB2BF]/40">
              Hari ini · Simulasi Kasus Nyata
            </span>
          </div>

          {/* Stream of Chat Messages */}
          {messages.map((msg) => {
            if (msg.sender === "system") {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  {msg.systemCard ? (
                    <div
                      className={`w-full max-w-lg rounded-2xl p-4 border text-xs shadow-md space-y-1.5 ${
                        msg.systemCard.type === "danger"
                          ? "bg-rose-50 border-rose-300 text-rose-900"
                          : msg.systemCard.type === "warning"
                          ? "bg-amber-50 border-amber-300 text-amber-900"
                          : "bg-emerald-50 border-emerald-300 text-emerald-900"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {msg.systemCard.type === "danger" ? (
                          <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0" />
                        ) : msg.systemCard.type === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        )}
                        <span>{msg.systemCard.title}</span>
                      </div>
                      <p className="leading-relaxed text-[11px] opacity-90 pl-6">
                        {msg.systemCard.body}
                      </p>
                    </div>
                  ) : (
                    <div className="max-w-md bg-white/90 backdrop-blur-xs rounded-xl px-3.5 py-1.5 border border-[#9DB2BF]/50 shadow-xs text-center">
                      <span className="text-[11px] text-[#526D82] font-medium leading-relaxed flex items-center justify-center gap-1.5">
                        <Lock className="h-3 w-3 text-amber-500 shrink-0 inline" />
                        <span>{msg.text}</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            }

            if (msg.sender === "bank") {
              return (
                <div key={msg.id} className="flex justify-center my-3">
                  <div className="w-full max-w-lg rounded-2xl p-4 bg-red-950 text-white border-2 border-red-500 shadow-xl space-y-2 animate-bounce-short">
                    <div className="flex items-center justify-between border-b border-red-800 pb-2">
                      <span className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider">
                        <AlertOctagon className="h-4 w-4 text-rose-400" />
                        NOTIFIKASI BANK: PERINGATAN MUTASI DANA
                      </span>
                      <span className="text-[10px] text-rose-300 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs text-rose-100 font-medium leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              );
            }

            if (msg.sender === "call") {
              return (
                <div key={msg.id} className="flex justify-center my-3">
                  <div className="w-full max-w-lg rounded-2xl p-4 bg-sky-950 text-white border-2 border-sky-400 shadow-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-sky-800 pb-2">
                      <span className="flex items-center gap-2 text-xs font-black text-sky-300 uppercase tracking-wider">
                        <Phone className="h-4 w-4 text-sky-300 animate-pulse" />
                        PANGGILAN SUARA MASUK: PETUGAS KEUANGAN
                      </span>
                      <span className="text-[10px] text-sky-200 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs text-sky-100 font-medium leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              );
            }

            // Pesan dari Attacker (Sisi Kiri)
            if (msg.sender === "attacker") {
              return (
                <div key={msg.id} className="flex items-end gap-2 max-w-[88%] sm:max-w-[78%]">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-600 to-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mb-1 shadow-xs">
                    ?
                  </div>

                  <div className="rounded-2xl rounded-bl-xs bg-white p-3.5 border border-[#9DB2BF]/50 shadow-sm space-y-2 text-[#27374D]">
                    {msg.text && (
                      <p className="text-xs sm:text-[13px] leading-relaxed font-normal">
                        {msg.text}
                      </p>
                    )}

                    {/* Lampiran Dokumen/File */}
                    {msg.attachment && (
                      <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 space-y-2 mt-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-rose-600 text-white flex flex-col items-center justify-center font-mono font-black text-[10px] shadow-xs">
                            <FileCode className="h-5 w-5" />
                            <span>{msg.attachment.type.toUpperCase()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-xs text-rose-950 truncate">
                              {msg.attachment.name}
                            </span>
                            <span className="block text-[10px] text-rose-700 font-medium">
                              {msg.attachment.size || "Berkas Lampiran"} · Tanda Bahaya Phishing
                            </span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
                            <Download className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <span className="text-[10px] text-[#526D82] font-mono">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Pesan dari User (Sisi Kanan)
            return (
              <div
                key={msg.id}
                className="flex items-end justify-end gap-2 max-w-[88%] sm:max-w-[78%] ml-auto"
              >
                <div className="rounded-2xl rounded-br-xs bg-[#27374D] p-3.5 text-white shadow-sm space-y-1">
                  <p className="text-xs sm:text-[13px] leading-relaxed font-normal">
                    {msg.text}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-[#DDE6ED]/70 font-mono">
                    <span>{msg.timestamp}</span>
                    <CheckCheck className="h-3.5 w-3.5 text-sky-400" />
                  </div>
                </div>

                <div className="h-7 w-7 rounded-full bg-[#526D82] text-white flex items-center justify-center text-xs font-bold shrink-0 mb-1 shadow-xs">
                  <span>K</span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 max-w-[50%]">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-600 to-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mb-1 shadow-xs">
                ?
              </div>
              <div className="rounded-2xl rounded-bl-xs bg-white px-4 py-2.5 border border-[#9DB2BF]/50 shadow-sm flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#526D82] animate-bounce" />
                <span
                  className="h-2 w-2 rounded-full bg-[#526D82] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-[#526D82] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
                <span className="text-[11px] text-[#526D82] ml-1 font-medium italic">
                  Pengirim sedang merespons...
                </span>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* KOTAK DEBRIEF AKHIR DENGAN 5 PILIHAN ENDING (A, B, C, D, E)        */}
          {/* ================================================================= */}
          {activeEnding && (
            <div className="pt-4 pb-2 animate-fadeIn space-y-4">
              <div
                className={`rounded-3xl border-2 p-5 sm:p-7 shadow-xl space-y-5 bg-white ${
                  activeEnding.rank === "Guardian"
                    ? "border-emerald-500 shadow-emerald-500/10"
                    : activeEnding.rank === "Penjaga"
                    ? "border-amber-500 shadow-amber-500/10"
                    : "border-rose-500 shadow-rose-500/10"
                }`}
              >
                {/* Header Ending & Badge Skor */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#DDE6ED] pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md ${
                        activeEnding.rank === "Guardian"
                          ? "bg-emerald-600"
                          : activeEnding.rank === "Penjaga"
                          ? "bg-amber-500"
                          : "bg-rose-600"
                      }`}
                    >
                      {activeEnding.rank === "Guardian" ? (
                        <ShieldCheck className="h-7 w-7" />
                      ) : activeEnding.rank === "Penjaga" ? (
                        <AlertTriangle className="h-7 w-7" />
                      ) : (
                        <ShieldAlert className="h-7 w-7" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border ${
                            activeEnding.rank === "Guardian"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : activeEnding.rank === "Penjaga"
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : "bg-rose-100 text-rose-800 border-rose-300"
                          }`}
                        >
                          Peringkat: {activeEnding.rank}
                        </span>
                        <span className="text-xs font-bold text-[#526D82]">
                          {activeEnding.pathDescription}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-[#27374D] mt-0.5">
                        {activeEnding.title}
                      </h3>
                      <p className="text-xs text-[#526D82] font-semibold">{activeEnding.subtitle}</p>
                    </div>
                  </div>

                  {/* Skor Besar */}
                  <div className="flex items-center justify-end sm:flex-col sm:items-end">
                    <span className="text-2xl sm:text-3xl font-black text-[#27374D]">
                      {activeEnding.score}
                      <span className="text-sm font-bold text-[#526D82]"> / 100</span>
                    </span>
                    <span className="text-[10px] text-[#526D82] font-bold">Skor Pertahanan</span>
                  </div>
                </div>

                {/* Komponen Poin Evaluasi */}
                <div className="rounded-2xl bg-[#DDE6ED]/40 p-4 border border-[#9DB2BF]/40 space-y-2">
                  <h4 className="text-xs font-black text-[#27374D] uppercase tracking-wider">
                    Rincian Komponen Skor Kasus:
                  </h4>
                  <div className="space-y-1.5 text-xs text-[#27374D]">
                    {activeEnding.scoreComponents.map((comp, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-[#DDE6ED] pb-1 last:border-none">
                        <span>{comp.label}</span>
                        <span className="font-mono font-black text-[#27374D]">{comp.points}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narasi Hasil Simulasi */}
                <div className="space-y-1.5 text-xs text-[#27374D] leading-relaxed">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#526D82] block">
                    Narasi Keputusanmu:
                  </span>
                  <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 italic">
                    "{activeEnding.narrative}"
                  </p>
                </div>

                {/* Red Flags yang Diajarkan */}
                <div className="rounded-2xl bg-amber-50/80 p-4 border border-amber-200 space-y-2">
                  <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>Tanda Bahaya (Red Flags) yang Diajarkan di Kasus Ini:</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-amber-900 leading-relaxed">
                    {currentScenario.debriefRedFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>

                {/* Jawaban Ideal dari Jaga (Mentor) */}
                <div className="rounded-2xl bg-[#27374D] text-white p-4 sm:p-5 shadow-md space-y-2 relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-amber-400 text-[#27374D] flex items-center justify-center font-black text-xs">
                      J
                    </div>
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                      Jawaban Ideal dari Jaga (Mentor Keamanan):
                    </span>
                  </div>
                  <p className="text-xs text-[#DDE6ED] leading-relaxed italic pl-8">
                    "{currentScenario.mentorAdvice}"
                  </p>
                </div>

                {/* Flag Bukti & Tombol Aksi */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DDE6ED]">
                  <div className="flex items-center gap-2 text-xs text-[#526D82]">
                    <span className="font-bold text-[#27374D]">Kode Bukti:</span>
                    <code className="bg-[#DDE6ED] px-2.5 py-1 rounded-md text-[11px] font-mono text-[#27374D] font-bold">
                      {currentScenario.flagCode}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyFlag}
                      className="text-[11px] text-amber-600 hover:text-amber-700 font-bold underline cursor-pointer"
                    >
                      {copiedFlag ? "Tersalin!" : "Salin"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={initChat}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#27374D] text-white hover:bg-[#1e2b3d] text-xs font-bold transition-all cursor-pointer shadow-md"
                    >
                      Ulangi Kasus (Uji Alur Lain)
                    </button>
                    <button
                      type="button"
                      onClick={onBack}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#DDE6ED] text-[#27374D] hover:bg-[#9DB2BF]/40 text-xs font-bold transition-all cursor-pointer border border-[#9DB2BF]/60"
                    >
                      Kembali ke Daftar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tombol Melayang Jump to Bottom jika user scroll ke atas */}
          {showScrollDown && (
            <div className="sticky bottom-2 flex justify-center pointer-events-none z-20">
              <button
                type="button"
                onClick={() => scrollToBottom(true)}
                className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#27374D]/90 hover:bg-[#27374D] text-white text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20 transition-all cursor-pointer animate-pulse"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                <span>Lihat Pesan Terbaru</span>
              </button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* =================================================================== */}
        {/* BOTTOM INTERACTIVE CHOICES DOCK (5 TITIK KEPUTUSAN: PILIHAN A & B)   */}
        {/* =================================================================== */}
        <div className="border-t border-[#9DB2BF]/50 bg-white p-4 sm:p-5 shadow-lg">
          {currentDecisionId && !activeEnding && !isTyping && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#27374D] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>
                    {currentScenario.decisions[currentDecisionId]?.stepTitle}: Tentukan Keputusanmu
                  </span>
                </span>
                <span className="text-[11px] text-[#526D82] font-semibold hidden sm:inline">
                  Tiap pilihan langsung menentukan jalur ending
                </span>
              </div>

              {/* 2 Pilihan Utama: Pilihan A (Berisiko) & Pilihan B (Aman) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* PILIHAN A (BERISIKO) */}
                <button
                  type="button"
                  onClick={() => handleSelectOption("A")}
                  className="group text-left p-4 rounded-2xl border-2 border-rose-200 bg-rose-50/50 hover:bg-rose-100 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 active:scale-[0.99]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-rose-600 text-white text-xs font-black shadow-xs">
                        A
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded-full">
                        Berisiko
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-bold text-[#27374D] group-hover:text-rose-950 transition-colors leading-snug">
                      {currentScenario.decisions[currentDecisionId]?.options.A.label}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#526D82] leading-tight italic">
                    Alasan: "{currentScenario.decisions[currentDecisionId]?.options.A.reason}"
                  </p>
                </button>

                {/* PILIHAN B (AMAN) */}
                <button
                  type="button"
                  onClick={() => handleSelectOption("B")}
                  className="group text-left p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 active:scale-[0.99]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-emerald-600 text-white text-xs font-black shadow-xs">
                        B
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">
                        Aman & Verifikasi
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-bold text-[#27374D] group-hover:text-emerald-950 transition-colors leading-snug">
                      {currentScenario.decisions[currentDecisionId]?.options.B.label}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#526D82] leading-tight italic">
                    Alasan: "{currentScenario.decisions[currentDecisionId]?.options.B.reason}"
                  </p>
                </button>
              </div>
            </div>
          )}

          {activeEnding && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526D82]">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  Simulasi tuntas ({activeEnding.title}). Kamu dapat menggulir ke atas untuk meninjau
                  kembali seluruh rekaman chat dan pilihan yang telah kamu ambil.
                </span>
              </span>
              <button
                type="button"
                onClick={initChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold cursor-pointer transition-all shadow-md shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Ulangi dari Awal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
