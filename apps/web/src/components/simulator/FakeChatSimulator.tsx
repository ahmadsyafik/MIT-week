import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
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
  ChevronDown,
  ChevronRight,
  Award,
  Send,
  Smartphone,
  Mail,
  ShoppingBag,
  Heart,
  MessageSquare,
  Users,
  FastForward,
  Eye,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";
import {
  FIVE_STEP_SCENARIOS,
  type FiveStepScenarioData,
  type ScenarioEnding,
} from "../../mocks/fiveStepScenarios";
import { PhoneCallSimulator } from "./PhoneCallSimulator";

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
  image?: {
    src: string;
    caption?: string;
    alt: string;
  };
  systemCard?: {
    type: "warning" | "danger" | "success" | "call" | "consequence";
    title: string;
    body: string;
  };
}

interface FullscreenWarningData {
  title: string;
  body: string;
  type: "warning" | "danger" | "info" | "success";
  consequence?: string;
  decisionIdToUnlock?: number | null;
  endingToActivate?: ScenarioEnding | null;
  systemName?: string;
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

  // Helper untuk membersihkan petunjuk teks seperti "(Berisiko)" atau "(Aman)"
  const cleanOptionLabel = (rawLabel: string): string => {
    return rawLabel
      .replace(/^Pilihan\s+[A-Z]\s*\((?:Berisiko|Aman)\)\s*[—–-]\s*/i, "")
      .replace(/\s*\((?:Berisiko|Aman)\)/gi, "")
      .trim();
  };

  // State simulasi
  const isVoiceCallScenario =
    currentScenario.channelType === "voice_call" || activeId === "k4";
  const [showPhoneCallOverlay, setShowPhoneCallOverlay] = useState(isVoiceCallScenario);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentDecisionId, setCurrentDecisionId] = useState<number | null>(null);
  const [activeEnding, setActiveEnding] = useState<ScenarioEnding | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("Pengirim sedang mengetik...");
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    src: string;
    caption?: string;
    alt: string;
  } | null>(null);
  const [activeFullscreenWarning, setActiveFullscreenWarning] = useState<FullscreenWarningData | null>(null);
  const [decisionHistory, setDecisionHistory] = useState<Array<{ decisionId: number; choice: "A" | "B" | "C" }>>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const fastForwardActionRef = useRef<(() => void) | null>(null);

  // Fungsi untuk menutup peringatan selayar penuh HP & membuka keputusan berikutnya
  const handleDismissFullscreenWarning = () => {
    if (!activeFullscreenWarning) return;
    const { decisionIdToUnlock, endingToActivate } = activeFullscreenWarning;
    setActiveFullscreenWarning(null);

    if (decisionIdToUnlock !== null && decisionIdToUnlock !== undefined) {
      setCurrentDecisionId(decisionIdToUnlock);
    } else if (endingToActivate) {
      setActiveEnding(endingToActivate);
      addNotification({
        title: `${endingToActivate.title}: ${currentScenario.title}`,
        message: `Simulasi tuntas! Skor: ${endingToActivate.score}/100 (${endingToActivate.rank}). ${endingToActivate.subtitle}.`,
        type: endingToActivate.score >= 80 ? "sukses" : "waspada",
        link: "/belajar?tab=simulator",
      });
    }
  };

  // Helper pengatur timer yang aman terhadap unmount & reset
  const addTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      fn();
      timeoutIdsRef.current = timeoutIdsRef.current.filter((tid) => tid !== id);
    }, ms);
    timeoutIdsRef.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
    fastForwardActionRef.current = null;
  };

  const handleFastForward = () => {
    if (fastForwardActionRef.current) {
      const action = fastForwardActionRef.current;
      clearAllTimeouts();
      action();
    }
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  // Auto-scroll yang stabil & aman (hanya scroll box chat internal, tidak menggeser window / viewport)
  const scrollToBottom = (force = false, smooth = true) => {
    const container = chatScrollContainerRef.current;
    if (!container) return;

    if (force || isNearBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    // Pengguna dianggap di dasar jika jarak ke bawah <= 50px
    const nearBottom = distanceToBottom <= 50;
    isNearBottomRef.current = nearBottom;
    setShowScrollDown(distanceToBottom > 80);
  };

  // Penanganan ketika simulasi telepon suara selesai diangkat & diputuskan
  const handlePhoneCallComplete = (choice: "A" | "B" | "C", durationSec: number) => {
    setShowPhoneCallOverlay(false);
    clearAllTimeouts();

    const decision1 = currentScenario.decisions[1];
    const selectedOption = decision1?.options[choice];
    if (!selectedOption) return;

    const durMins = Math.floor(durationSec / 60)
      .toString()
      .padStart(2, "0");
    const durSecs = (durationSec % 60).toString().padStart(2, "0");
    const durationText = `${durMins}:${durSecs}`;

    const isRisky = choice === "A" || selectedOption.type === "risky";

    // 1. Pesan sistem ringkasan panggilan selesai
    const initialSystemMsg: ChatMessage = {
      id: "msg-0",
      sender: "system",
      timestamp: "09:40",
      text: `Saluran komunikasi: Panggilan Telepon Seluler • ${currentScenario.senderAddress}. Berhati-hatilah terhadap permintaan kode OTP.`,
    };

    const callSummaryCard: ChatMessage = {
      id: `call-summary-${Date.now()}`,
      sender: "system",
      timestamp: "09:41",
      systemCard: {
        type: choice === "C" ? "success" : choice === "B" ? "warning" : "danger",
        title: "Panggilan Suara Masuk Selesai",
        body: `Panggilan suara masuk dari ${currentScenario.senderName} (${currentScenario.senderAddress}) telah diakhiri. Durasi sambungan: ${durationText}. Respons: ${choice === "C" ? "Tolak & putus telepon langsung (Aman)" : choice === "B" ? "Minta ID resmi & verifikasi mandiri" : "Sebutkan kode OTP via telepon (Berisiko)"}.`,
      },
    };

    // 2. Transkripsi suara apa yang dibicarakan penipu di awal telepon
    const transcriptMsg: ChatMessage = {
      id: `call-transcript-${Date.now()}`,
      sender: "call",
      timestamp: "09:41",
      text: "Selamat siang Bapak/Ibu nasabah, saya dari Divisi Keamanan Bank X. Sistem kami mendeteksi anomali transfer mencurigakan sebesar Rp4.500.000 keluar dari rekening Anda. Demi membatalkan transaksi tidak sah ini, kami telah mengirimkan 6 digit kode OTP via SMS. Mohon sebutkan kodenya sekarang juga!",
    };

    // 3. Gambar pendukung (Surat notifikasi jika ada)
    const supportingImageMsg: ChatMessage | null = currentScenario.briefing.supportingImage
      ? {
          id: `call-img-${Date.now()}`,
          sender: "call",
          timestamp: "09:41",
          image: currentScenario.briefing.supportingImage,
        }
      : null;

    // 4. Balasan ucapan pengguna
    const userMsg: ChatMessage = {
      id: `user-dec-1-${Date.now()}`,
      sender: "user",
      timestamp: "09:42",
      text: selectedOption.userReply,
    };

    // 5. Reaksi penipu
    const attackerReplyMsg: ChatMessage | null = selectedOption.attackerReply
      ? {
          id: `reply-dec-1-${Date.now()}`,
          sender: "call",
          timestamp: "09:42",
          text: selectedOption.attackerReply,
        }
      : null;

    // 6. Kartu konsekuensi edukatif
    const consequenceMsg: ChatMessage = {
      id: `conseq-dec-1-${Date.now()}`,
      sender: "system",
      timestamp: "09:43",
      systemCard: {
        type: isRisky ? "danger" : "success",
        title: isRisky ? "Konsekuensi Tindakan Berisiko" : "Konsekuensi Tindakan Aman & Waspada",
        body: selectedOption.consequence,
      },
    };

    const initialMsgs: ChatMessage[] = [initialSystemMsg, callSummaryCard, transcriptMsg];
    if (supportingImageMsg) initialMsgs.push(supportingImageMsg);
    initialMsgs.push(userMsg);
    if (attackerReplyMsg) initialMsgs.push(attackerReplyMsg);
    initialMsgs.push(consequenceMsg);

    setMessages(initialMsgs);
    setDecisionHistory([{ decisionId: 1, choice }]);

    const next = selectedOption.nextStep;

    if (typeof next === "string" && currentScenario.endings[next]) {
      const finalEnding = currentScenario.endings[next];
      addTimeout(() => {
        setActiveEnding(finalEnding);
        addNotification({
          title: `Simulasi Selesai: ${currentScenario.title}`,
          message: `Skor Pertahanan: ${finalEnding.score}/100 — ${finalEnding.title}`,
          type: finalEnding.score >= 80 ? "sukses" : "waspada",
          link: "/belajar?tab=simulator",
        });
      }, 500);
    } else if (typeof next === "number" && currentScenario.decisions[next]) {
      const nextDecision = currentScenario.decisions[next];
      addTimeout(() => {
        if (nextDecision.senderRole === "system" || nextDecision.senderRole === "bank") {
          const warningTitle =
            nextDecision.senderRole === "bank"
              ? "Notifikasi Kritis Keamanan Perbankan"
              : "Peringatan Sistem Keamanan Akun";
          const systemBadge =
            nextDecision.senderRole === "bank"
              ? "SISTEM NOTIFIKASI RESMI PERBANKAN"
              : "KEAMANAN SISTEM OPERASI PERANGKAT";
          setMessages((prev) => [
            ...prev,
            {
              id: `sys-next-${next}-${Date.now()}`,
              sender: (nextDecision.senderRole as "system" | "bank") || "system",
              timestamp: "09:44",
              text: nextDecision.scenarioPrompt,
              systemCard: {
                type: nextDecision.senderRole === "bank" ? "danger" : "warning",
                title: warningTitle,
                body: nextDecision.scenarioPrompt,
              },
            },
          ]);
          setActiveFullscreenWarning({
            title: warningTitle,
            body: nextDecision.scenarioPrompt,
            type: nextDecision.senderRole === "bank" ? "danger" : "warning",
            consequence: selectedOption.consequence,
            decisionIdToUnlock: next,
            systemName: systemBadge,
          });
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `sms-next-${next}-${Date.now()}`,
              sender: "attacker",
              timestamp: "09:44",
              text: nextDecision.scenarioPrompt,
            },
          ]);
          setCurrentDecisionId(next);
        }
      }, 800);
    }
  };

  // Reset & inisialisasi chat dengan alur pembuka bertahap dan alami
  const initChat = () => {
    clearAllTimeouts();
    setCurrentDecisionId(null);
    setActiveFullscreenWarning(null);
    setActiveEnding(null);
    setIsTyping(false);
    isNearBottomRef.current = true;
    setShowScrollDown(false);
    setDecisionHistory([]);

    if (isVoiceCallScenario) {
      setShowPhoneCallOverlay(true);
      setMessages([]);
      return;
    }

    const initialSystemMsg: ChatMessage = {
      id: "msg-0",
      sender: "system",
      timestamp: "09:40",
      text: `Saluran komunikasi: ${currentScenario.channel} • Nomor asing (${currentScenario.senderAddress}). Berhati-hatilah terhadap tautan atau berkas.`,
    };

    setMessages([initialSystemMsg]);

    const addl = currentScenario.briefing.additionalMessages || [];
    const senderRole = currentScenario.channelType === "voice_call" ? "call" : "attacker";

    const openingGreetingMsg: ChatMessage = {
      id: `msg-open-greet-${Date.now()}`,
      sender: senderRole,
      timestamp: "09:40",
      text: addl[0] || `Halo kak, mohon maaf mengganggu waktunya sebentar.`,
    };

    const mainMessage: ChatMessage = {
      id: `msg-open-main-${Date.now()}`,
      sender: senderRole,
      timestamp: "09:41",
      text: currentScenario.briefing.messageText,
      attachment: currentScenario.briefing.attachmentName
        ? {
            name: currentScenario.briefing.attachmentName,
            size: currentScenario.briefing.attachmentSize,
            type: currentScenario.briefing.attachmentType || "apk",
          }
        : undefined,
    };

    const supportingImageMsg: ChatMessage | null = currentScenario.briefing.supportingImage
      ? {
          id: `msg-open-img-${Date.now()}`,
          sender: senderRole,
          timestamp: "09:41",
          image: currentScenario.briefing.supportingImage,
        }
      : null;

    const followUpMsg: ChatMessage | null = addl[1]
      ? {
          id: `msg-open-follow-${Date.now()}`,
          sender: senderRole,
          timestamp: "09:41",
          text: addl[1],
        }
      : null;

    // Aksi lompat instan jika pengguna ingin mempercepat pembukaan
    fastForwardActionRef.current = () => {
      const allMsgs = [initialSystemMsg, openingGreetingMsg];
      if (supportingImageMsg) allMsgs.push(supportingImageMsg);
      allMsgs.push(mainMessage);
      if (followUpMsg) allMsgs.push(followUpMsg);
      setMessages(allMsgs);
      setIsTyping(false);
      setCurrentDecisionId(1);
      fastForwardActionRef.current = null;
    };

    // Alur pembukaan bertahap:
    // 1. Tanda mengetik sapaan pertama
    addTimeout(() => {
      setIsTyping(true);
      setTypingText(`${currentScenario.senderName} sedang mengetik...`);
    }, 400);

    // 2. Balon sapaan pertama masuk
    addTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, openingGreetingMsg]);
    }, 1500);

    if (supportingImageMsg) {
      // 3. Penipu mengunggah foto bukti / gambar pendukung
      addTimeout(() => {
        setIsTyping(true);
        setTypingText(`${currentScenario.senderName} sedang mengirim gambar pendukung...`);
      }, 2100);

      addTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, supportingImageMsg]);
      }, 3400);

      // 4. Penipu mengirim pesan utama dan lampiran berkas
      addTimeout(() => {
        setIsTyping(true);
        setTypingText(`${currentScenario.senderName} sedang mengirim berkas...`);
      }, 4000);

      addTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, mainMessage]);
      }, 5300);

      if (followUpMsg) {
        // 5. Pesan pengiring/dorongan psikologis
        addTimeout(() => {
          setIsTyping(true);
          setTypingText(`${currentScenario.senderName} sedang mengetik...`);
        }, 5900);

        addTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, followUpMsg]);
          setCurrentDecisionId(1);
          fastForwardActionRef.current = null;
        }, 7200);
      } else {
        addTimeout(() => {
          setIsTyping(false);
          setCurrentDecisionId(1);
          fastForwardActionRef.current = null;
        }, 5800);
      }
    } else {
      // Alur tanpa gambar pendukung
      addTimeout(() => {
        setIsTyping(true);
        setTypingText(`${currentScenario.senderName} sedang mengirim berkas...`);
      }, 2200);

      addTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, mainMessage]);
      }, 3800);

      if (followUpMsg) {
        addTimeout(() => {
          setIsTyping(true);
          setTypingText(`${currentScenario.senderName} sedang mengetik...`);
        }, 4400);

        addTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, followUpMsg]);
          setCurrentDecisionId(1);
          fastForwardActionRef.current = null;
        }, 5700);
      } else {
        addTimeout(() => {
          setIsTyping(false);
          setCurrentDecisionId(1);
          fastForwardActionRef.current = null;
        }, 4400);
      }
    }
  };

  useEffect(() => {
    initChat();
  }, [activeId]);

  useEffect(() => {
    if (currentDecisionId || activeEnding) {
      const timer = setTimeout(() => {
        scrollToBottom(true, true);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      scrollToBottom(false, true);
    }
  }, [messages, isTyping, currentDecisionId, activeEnding]);

  // Eksekusi Pilihan A, B, atau C dengan percakapan dua arah yang mengalir
  const handleSelectOption = (choice: "A" | "B" | "C") => {
    if (!currentDecisionId || isTyping || activeEnding) return;

    const currentDecision = currentScenario.decisions[currentDecisionId];
    if (!currentDecision) return;

    const selectedOption = currentDecision.options[choice];
    if (!selectedOption) return;

    clearAllTimeouts();
    setDecisionHistory((prev) => [...prev, { decisionId: currentDecisionId, choice }]);
    const currentId = currentDecisionId;
    setCurrentDecisionId(null); // Kunci dock saat respon sedang berjalan

    // 1. Tambahkan bubble chat dari sisi pengguna (kanan)
    const userMsg: ChatMessage = {
      id: `user-dec-${currentId}-${Date.now()}`,
      sender: "user",
      timestamp: "09:42",
      text: selectedOption.userReply,
    };
    setMessages((prev) => [...prev, userMsg]);
    isNearBottomRef.current = true;
    setShowScrollDown(false);
    scrollToBottom(true, true);

    // Tentukan respon lawan bicara (attacker/call/bank/system)
    const role = currentScenario.channelType === "voice_call" ? "call" : "attacker";
    let replyText = selectedOption.attackerReply;

    const next = selectedOption.nextStep;
    const isRisky = choice === "A" || selectedOption.type === "risky";
    const nextDecision = typeof next === "number" ? currentScenario.decisions[next] : null;

    if (!replyText && nextDecision) {
      const promptMatch = nextDecision.scenarioPrompt.match(/["“](.+?)["”]/);
      if (promptMatch && promptMatch[1]) {
        replyText = promptMatch[1];
      } else if (nextDecision.senderRole === "attacker" || !nextDecision.senderRole) {
        replyText = nextDecision.scenarioPrompt;
      }
    }

    const replyMsg: ChatMessage | null = replyText
      ? {
          id: `reply-dec-${currentId}-${Date.now()}`,
          sender: role,
          timestamp: "09:43",
          text: replyText,
        }
      : null;

    // Kartu evaluasi edukatif / konsekuensi tindakan
    const consequenceMsg: ChatMessage = {
      id: `conseq-dec-${currentId}-${Date.now()}`,
      sender: "system",
      timestamp: "09:43",
      systemCard: {
        type: isRisky ? "warning" : "success",
        title: isRisky ? "Konsekuensi Tindakan Berisiko" : "Konsekuensi Tindakan Aman & Hati-hati",
        body: selectedOption.consequence,
      },
    };

    // Prompt tambahan bila langkah berikutnya merupakan notifikasi sistem/bank
    let additionalPromptMsg: ChatMessage | null = null;
    let warningTitle = "Peringatan Sistem Keamanan Perangkat";
    let systemBadgeName = "KEAMANAN SISTEM PERANGKAT";

    if (
      nextDecision &&
      nextDecision.senderRole &&
      nextDecision.senderRole !== "attacker" &&
      nextDecision.senderRole !== role
    ) {
      if (nextDecision.senderRole === "bank") {
        warningTitle = "Notifikasi Kritis Keamanan Perbankan";
        systemBadgeName = "SISTEM NOTIFIKASI RESMI PERBANKAN";
      } else if (nextDecision.scenarioPrompt.toLowerCase().includes("play protect")) {
        warningTitle = "Peringatan Google Play Protect";
        systemBadgeName = "GOOGLE PLAY PROTECT • ANDROID";
      } else if (
        nextDecision.scenarioPrompt.toLowerCase().includes("browser") ||
        nextDecision.scenarioPrompt.toLowerCase().includes("chrome")
      ) {
        warningTitle = "Peringatan Keamanan Browser";
        systemBadgeName = "SISTEM DETEKSI PHISHING BROWSER";
      } else {
        warningTitle = "Peringatan Sistem Keamanan Perangkat";
        systemBadgeName = "KEAMANAN SISTEM OPERASI PERANGKAT";
      }

      additionalPromptMsg = {
        id: `prompt-dec-${next}-${Date.now()}`,
        sender: nextDecision.senderRole || "system",
        timestamp: "09:44",
        text: nextDecision.scenarioPrompt,
        systemCard: {
          type: nextDecision.senderRole === "bank" ? "danger" : "warning",
          title: warningTitle,
          body: nextDecision.scenarioPrompt,
        },
      };
    }

    const finalEnding = typeof next === "string" ? currentScenario.endings[next] : null;

    // Aksi percepat jika pengguna menekan tombol percepat
    fastForwardActionRef.current = () => {
      setMessages((prev) => {
        const msgs = [...prev];
        if (replyMsg && !msgs.some((m) => m.id === replyMsg.id)) msgs.push(replyMsg);
        if (additionalPromptMsg && !msgs.some((m) => m.id === additionalPromptMsg.id)) msgs.push(additionalPromptMsg);
        if (!msgs.some((m) => m.id === consequenceMsg.id)) msgs.push(consequenceMsg);
        return msgs;
      });
      setIsTyping(false);

      if (additionalPromptMsg) {
        // Tampilkan peringatan selayar penuh HP secara instan
        setActiveFullscreenWarning({
          title: warningTitle,
          body: additionalPromptMsg.text || nextDecision?.scenarioPrompt || "Peringatan sistem terdeteksi.",
          type: nextDecision?.senderRole === "bank" ? "danger" : "warning",
          consequence: selectedOption.consequence,
          decisionIdToUnlock: typeof next === "number" ? next : null,
          endingToActivate: finalEnding,
          systemName: systemBadgeName,
        });
      } else if (typeof next === "number") {
        setCurrentDecisionId(next);
      } else if (finalEnding) {
        setActiveEnding(finalEnding);
        addNotification({
          title: `${finalEnding.title}: ${currentScenario.title}`,
          message: `Simulasi tuntas! Skor: ${finalEnding.score}/100 (${finalEnding.rank}). ${finalEnding.subtitle}.`,
          type: finalEnding.score >= 80 ? "sukses" : "waspada",
          link: "/belajar?tab=simulator",
        });
      }
      fastForwardActionRef.current = null;
    };

    // Alur percakapan realistis:
    // 1. Lawan bicara membaca dan mulai mengetik respon (500ms)
    addTimeout(() => {
      setIsTyping(true);
      setTypingText(`${currentScenario.senderName} sedang merespons...`);
    }, 500);

    // 2. Balasan lawan bicara masuk (2200ms)
    addTimeout(() => {
      setIsTyping(false);
      if (replyMsg) {
        setMessages((prev) => [...prev, replyMsg]);
      }
    }, 2200);

    // 3. Jeda membaca narasi, lalu catatan evaluasi/sistem muncul (3800ms)
    addTimeout(() => {
      setMessages((prev) => {
        const msgs = [...prev];
        if (additionalPromptMsg) msgs.push(additionalPromptMsg);
        msgs.push(consequenceMsg);
        return msgs;
      });

      // Jika langkah berikutnya adalah peringatan sistem atau bank, buka overlay selayar penuh HP!
      if (additionalPromptMsg) {
        setActiveFullscreenWarning({
          title: warningTitle,
          body: additionalPromptMsg.text || nextDecision?.scenarioPrompt || "Peringatan sistem terdeteksi.",
          type: nextDecision?.senderRole === "bank" ? "danger" : "warning",
          consequence: selectedOption.consequence,
          decisionIdToUnlock: typeof next === "number" ? next : null,
          endingToActivate: finalEnding,
          systemName: systemBadgeName,
        });
      }
    }, 3800);

    // 4. Buka titik keputusan berikutnya atau tampilkan layar evaluasi akhir (5300ms)
    // HANYA jika TIDAK ada overlay peringatan sistem (karena jika ada overlay, menunggu klik di mana saja oleh pengguna!)
    addTimeout(() => {
      if (!additionalPromptMsg) {
        if (typeof next === "number") {
          setCurrentDecisionId(next);
        } else if (finalEnding) {
          setActiveEnding(finalEnding);
          addNotification({
            title: `${finalEnding.title}: ${currentScenario.title}`,
            message: `Simulasi tuntas! Skor: ${finalEnding.score}/100 (${finalEnding.rank}). ${finalEnding.subtitle}.`,
            type: finalEnding.score >= 80 ? "sukses" : "waspada",
            link: "/belajar?tab=simulator",
          });
        }
      }
      fastForwardActionRef.current = null;
    }, 5300);
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
      </div>

      {/* Main Container Simulator (Mockup Layar Smartphone Nyata) */}
      <div
        className={`relative rounded-[28px] sm:rounded-[36px] border-4 sm:border-[6px] border-[#27374D] bg-[#27374D] shadow-[0_20px_60px_rgba(39,55,77,0.25)] overflow-hidden flex flex-col ${
          activeFullscreenWarning ? "min-h-[660px] sm:min-h-[740px]" : ""
        }`}
      >
        {/* Mock Phone Status Bar */}
        <div className="bg-[#1e2b3d] text-white/70 px-5 py-1.5 flex items-center justify-between text-[11px] font-semibold border-b border-white/10 select-none shrink-0">
          <span className="font-mono text-[10px]">09:41</span>
          <div className="w-16 h-3 bg-black/60 rounded-full mx-auto flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span>5G</span>
            <span>88%</span>
          </div>
        </div>

        {/* Full-Screen System Security Warning Overlay (Selayar Penuh HP Simulator) */}
        {activeFullscreenWarning && (
          <div
            role="button"
            tabIndex={0}
            onClick={handleDismissFullscreenWarning}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleDismissFullscreenWarning();
            }}
            className="absolute inset-0 z-40 bg-[#0c121e]/95 backdrop-blur-md text-white flex flex-col justify-between p-5 sm:p-7 cursor-pointer select-none animate-fadeIn overflow-y-auto"
            title="Klik di mana saja pada layar HP untuk melanjutkan ke pilihan keputusan"
          >
            {/* Header Bilah Sistem Atas */}
            <div className="flex items-center justify-between pt-2 pb-2.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-black text-amber-300 uppercase">
                  {activeFullscreenWarning.systemName || "PERINGATAN SISTEM KEAMANAN"}
                </span>
              </div>
              <span className="text-[10px] text-white/50 font-mono">Peringatan Kritis OS</span>
            </div>

            {/* Area Tengah: Ikon Perisai Peringatan, Judul, & Pesan Sistem */}
            <div className="flex-1 flex flex-col justify-center items-center text-center py-6 sm:py-8 space-y-5 max-w-md mx-auto w-full">
              {/* Ikon Perisai Peringatan Berdenyut */}
              <div className="relative">
                <div
                  className={`w-20 h-20 sm:w-22 sm:h-22 rounded-3xl flex items-center justify-center shadow-2xl transition-all ${
                    activeFullscreenWarning.type === "danger"
                      ? "bg-rose-500/20 border-2 border-rose-400/60 text-rose-400 shadow-[0_0_50px_rgba(244,63,94,0.4)]"
                      : "bg-amber-500/20 border-2 border-amber-400/60 text-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.4)]"
                  }`}
                >
                  {activeFullscreenWarning.type === "danger" ? (
                    <AlertOctagon className="w-10 h-10 sm:w-11 sm:h-11 text-rose-400 animate-bounce-short" />
                  ) : (
                    <AlertTriangle className="w-10 h-10 sm:w-11 sm:h-11 text-amber-400 animate-bounce-short" />
                  )}
                </div>
                <div
                  className={`absolute -inset-2.5 rounded-3xl border animate-ping pointer-events-none opacity-40 ${
                    activeFullscreenWarning.type === "danger"
                      ? "border-rose-400"
                      : "border-amber-400"
                  }`}
                />
              </div>

              {/* Judul Peringatan */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {activeFullscreenWarning.title}
                </h3>
                <p className="text-xs text-white/70 max-w-xs mx-auto">
                  Sistem operasi mendeteksi aktivitas mencurigakan yang memerlukan tindakanmu.
                </p>
              </div>

              {/* Kotak Pesan Dialog Sistem (Persis Tampilan Peringatan di Screenshot) */}
              <div
                className={`w-full border-2 rounded-2xl p-4 sm:p-5 text-left shadow-2xl space-y-2.5 ${
                  activeFullscreenWarning.type === "danger"
                    ? "bg-rose-950/80 border-rose-400/50 text-rose-50"
                    : "bg-[#1e293b]/95 border-amber-400/50 text-white"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Pesan Sistem Keamanan Perangkat:</span>
                </div>
                <p className="text-xs sm:text-[13px] leading-relaxed font-semibold text-white/95">
                  {activeFullscreenWarning.body}
                </p>
              </div>

              {/* Catatan Konsekuensi Tindakan Sebelumnya (jika ada) */}
              {activeFullscreenWarning.consequence && (
                <div className="w-full bg-black/40 border border-white/10 rounded-xl p-3 sm:p-3.5 text-left text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300/90 text-[11px]">
                    <AlertOctagon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Konsekuensi Tindakan Sebelumnya:</span>
                  </div>
                  <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed">
                    {activeFullscreenWarning.consequence}
                  </p>
                </div>
              )}
            </div>

            {/* Instruksi & Tombol Aksi di Bawah */}
            <div className="space-y-3 pt-2 pb-2 shrink-0 text-center">
              {/* Petunjuk Ketuk Di Mana Saja */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium shadow-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Ketuk di mana saja pada layar HP untuk melanjutkan</span>
              </div>

              {/* Tombol Lanjutkan ke Pilihan Keputusan */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismissFullscreenWarning();
                }}
                className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(245,158,11,0.35)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lanjutkan ke Pilihan Keputusan</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        )}

        {showPhoneCallOverlay && isVoiceCallScenario ? (
          <PhoneCallSimulator
            scenario={currentScenario}
            onCompleteCall={handlePhoneCallComplete}
            onDeclineCall={() => handlePhoneCallComplete("C", 0)}
          />
        ) : (
          <>
            {/* Chat App Header Bar */}
            <div className="bg-[#27374D] text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between shadow-md z-10 shrink-0">
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
                  <span className="font-bold text-xs sm:text-sm text-white tracking-wide truncate max-w-[200px] sm:max-w-none">
                    {currentScenario.senderName}
                  </span>
                  <span className="text-[11px] text-[#DDE6ED]/70 flex items-center gap-1 font-mono">
                    <span>{currentScenario.senderAddress}</span>
                  </span>
                </div>
              </div>

              {/* Tombol Pintasan Buka Ulang Layar Telepon jika skenario telepon */}
              {isVoiceCallScenario && (
                <button
                  type="button"
                  onClick={() => setShowPhoneCallOverlay(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer shadow-xs ml-auto"
                  title="Tampilkan kembali simulasi layar telepon interaktif"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Layar Telepon</span>
                </button>
              )}
            </div>

        {/* Scrollable Chat Area dengan Wallpaper Doodle Realistis */}
        <div
          ref={chatScrollContainerRef}
          onScroll={handleScroll}
          className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[580px] sm:max-h-[660px] bg-[#EFEAE2] overscroll-contain relative"
          style={{
            backgroundImage: `url('/simulator/chat-doodle-pattern.svg')`,
            backgroundRepeat: "repeat",
            backgroundSize: "240px 240px",
          }}
        >
          {/* Tanggal Separator */}
          <div className="flex justify-center my-2">
            <span className="bg-white/80 backdrop-blur-xs text-[#526D82] text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs border border-[#9DB2BF]/40">
              Hari ini
            </span>
          </div>

          {/* Stream of Chat Messages */}
          {messages.map((msg) => {
            if (msg.sender === "system") {
              return (
                <div key={msg.id} className="w-full my-2.5 animate-fadeIn">
                  {msg.systemCard ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setActiveFullscreenWarning({
                          title: msg.systemCard!.title,
                          body: msg.systemCard!.body,
                          type: msg.systemCard!.type === "call" || msg.systemCard!.type === "consequence" ? "warning" : msg.systemCard!.type,
                          consequence: undefined,
                          decisionIdToUnlock: null,
                          systemName: "DETAIL PERINGATAN SISTEM",
                        });
                      }}
                      className={`w-full rounded-2xl p-4 sm:p-5 border text-xs shadow-md space-y-2 cursor-pointer transition-all hover:ring-2 hover:ring-amber-400/40 hover:shadow-lg ${
                        msg.systemCard.type === "danger"
                          ? "bg-rose-50 border-rose-300 text-rose-900"
                          : msg.systemCard.type === "warning"
                          ? "bg-amber-50 border-amber-300 text-amber-900"
                          : "bg-emerald-50 border-emerald-300 text-emerald-900"
                      }`}
                      title="Klik kartu ini untuk melihat peringatan selayar penuh HP"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-[13px]">
                          {msg.systemCard.type === "danger" ? (
                            <AlertOctagon className="h-4.5 w-4.5 text-rose-600 shrink-0" />
                          ) : msg.systemCard.type === "warning" ? (
                            <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                          )}
                          <span>{msg.systemCard.title}</span>
                        </div>
                        <span className="text-[10px] opacity-75 font-mono inline-flex items-center gap-1 bg-white/40 px-2 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" />
                          <span>Perbesar Layar</span>
                        </span>
                      </div>
                      <p className="leading-relaxed text-[11px] sm:text-xs opacity-90 pl-6.5">
                        {msg.systemCard.body}
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="max-w-md bg-white/90 backdrop-blur-xs rounded-xl px-3.5 py-1.5 border border-[#9DB2BF]/50 shadow-xs text-center">
                        <span className="text-[11px] text-[#526D82] font-medium leading-relaxed flex items-center justify-center gap-1.5">
                          <Lock className="h-3 w-3 text-amber-500 shrink-0 inline" />
                          <span>{msg.text}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (msg.sender === "bank") {
              return (
                <div key={msg.id} className="w-full my-3 animate-bounce-short">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setActiveFullscreenWarning({
                        title: "Notifikasi SMS Resmi Perbankan",
                        body: msg.text || "",
                        type: "danger",
                        consequence: undefined,
                        decisionIdToUnlock: null,
                        systemName: "SISTEM NOTIFIKASI RESMI PERBANKAN",
                      });
                    }}
                    className="w-full rounded-2xl p-4 sm:p-5 bg-red-950 text-white border-2 border-red-500 shadow-xl space-y-2 cursor-pointer transition-all hover:ring-2 hover:ring-red-400/40 hover:shadow-2xl"
                    title="Klik kartu ini untuk melihat peringatan selayar penuh HP"
                  >
                    <div className="flex items-center justify-between border-b border-red-800 pb-2">
                      <span className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider">
                        <AlertOctagon className="h-4 w-4 text-rose-400" />
                        NOTIFIKASI BANK: PERINGATAN MUTASI DANA
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-rose-300 font-mono">{msg.timestamp}</span>
                        <span className="text-[10px] text-rose-300/80 font-mono inline-flex items-center gap-1 bg-red-900/50 px-2 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" />
                          <span>Perbesar Layar</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-[13px] text-rose-100 font-medium leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              );
            }

            if (msg.sender === "call") {
              return (
                <div key={msg.id} className="w-full my-3">
                  <div className="w-full rounded-2xl p-4 sm:p-5 bg-sky-950 text-white border-2 border-sky-400 shadow-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-sky-800 pb-2">
                      <span className="flex items-center gap-2 text-xs font-black text-sky-300 uppercase tracking-wider">
                        <Phone className="h-4 w-4 text-sky-300 animate-pulse" />
                        PANGGILAN SUARA MASUK: PETUGAS KEUANGAN
                      </span>
                      <span className="text-[10px] text-sky-200 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-sky-100 font-medium leading-relaxed">{msg.text}</p>
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

                    {/* Gambar / Foto Bukti Pendukung */}
                    {msg.image && (
                      <div className="rounded-xl overflow-hidden border border-[#9DB2BF]/50 bg-[#F8FAFC] mt-1 shadow-xs">
                        <div
                          className="relative cursor-pointer group/img overflow-hidden"
                          onClick={() => setActiveLightboxImage(msg.image!)}
                        >
                          <img
                            src={msg.image.src}
                            alt={msg.image.alt || "Gambar Pendukung"}
                            className="w-full max-h-[220px] object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-black/75 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-md">
                              <Eye className="h-3.5 w-3.5 text-amber-300" />
                              <span>Klik untuk perbesar</span>
                            </span>
                          </div>
                          <div className="absolute top-2 right-2">
                            <span className="bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/20">
                              Foto Lampiran
                            </span>
                          </div>
                        </div>
                        {msg.image.caption && (
                          <div className="px-3 py-1.5 bg-white border-t border-[#9DB2BF]/30 flex items-center justify-between text-[11px] text-[#526D82]">
                            <span className="font-medium truncate">{msg.image.caption}</span>
                            <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-bold ml-2 shrink-0">
                              Bukti Skenario
                            </span>
                          </div>
                        )}
                      </div>
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
            <div className="flex items-center justify-between max-w-full">
              <div className="flex items-end gap-2 max-w-[80%]">
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
                    {typingText}
                  </span>
                </div>
              </div>

              {/* Tombol Percepat Dialog jika pengguna ingin cepat */}
              {fastForwardActionRef.current && (
                <button
                  type="button"
                  onClick={handleFastForward}
                  title="Lewati jeda mengetik"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#526D82] hover:text-[#27374D] bg-white/90 hover:bg-white border border-[#9DB2BF]/50 shadow-xs cursor-pointer transition-all ml-2"
                >
                  <FastForward className="h-3 w-3 text-amber-600" />
                  <span>Percepat</span>
                </button>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* KOTAK EVALUASI AKHIR RINGKAS & JELAS (TIDAK TERBELIT-BELIT)       */}
          {/* ================================================================= */}
          {activeEnding && (
            <div className="pt-2 pb-2 animate-fadeIn">
              <div
                className={`rounded-2xl border p-4 sm:p-5 shadow-md space-y-3 bg-white ${
                  activeEnding.score >= 80
                    ? "border-emerald-300 bg-emerald-50/20"
                    : activeEnding.score >= 50
                    ? "border-amber-300 bg-amber-50/20"
                    : "border-rose-300 bg-rose-50/20"
                }`}
              >
                {/* Header Ending & Skor */}
                <div className="flex items-center justify-between gap-3 border-b border-[#9DB2BF]/30 pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-white shadow-xs shrink-0 ${
                        activeEnding.score >= 80
                          ? "bg-emerald-600"
                          : activeEnding.score >= 50
                          ? "bg-amber-500"
                          : "bg-rose-600"
                      }`}
                    >
                      {activeEnding.score >= 80 ? (
                        <ShieldCheck className="h-6 w-6" />
                      ) : activeEnding.score >= 50 ? (
                        <AlertTriangle className="h-6 w-6" />
                      ) : (
                        <ShieldAlert className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      {activeEnding.subtitle && (
                        <span className="text-xs font-semibold text-[#526D82] block">
                          {activeEnding.subtitle}
                        </span>
                      )}
                      <h3 className="text-sm sm:text-base font-black text-[#27374D] mt-0.5">
                        {activeEnding.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skor Besar */}
                  <div className="text-right shrink-0">
                    <span className="text-2xl sm:text-3xl font-black text-[#27374D]">
                      {activeEnding.score}
                      <span className="text-xs font-bold text-[#526D82]"> / 100</span>
                    </span>
                    <span className="block text-[10px] text-[#526D82] font-semibold">Skor Pertahanan</span>
                  </div>
                </div>

                {/* Intisari Evaluasi (Ringkas & Padat) */}
                <div className="rounded-xl bg-white/90 p-3.5 border border-[#9DB2BF]/30 space-y-1">
                  <span className="font-bold text-[11px] text-[#526D82] uppercase tracking-wider block">
                    Evaluasi Keputusanmu:
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#27374D] leading-relaxed">
                    {activeEnding.narrative}
                  </p>
                </div>

                {/* Tombol Aksi Bersih */}
                <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#9DB2BF]/20">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={onBack}
                      className="flex-1 sm:flex-none px-4 py-1.5 rounded-xl bg-[#27374D] hover:bg-[#1e2b3d] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      Kembali ke Daftar Kasus
                    </button>
                    <button
                      type="button"
                      onClick={initChat}
                      className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-white border border-[#9DB2BF]/60 text-[#526D82] hover:text-[#27374D] text-xs font-semibold transition-all cursor-pointer"
                    >
                      Ulangi Kasus
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
                onClick={() => {
                  isNearBottomRef.current = true;
                  setShowScrollDown(false);
                  scrollToBottom(true, true);
                }}
                className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#27374D]/90 hover:bg-[#27374D] text-white text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20 transition-all cursor-pointer animate-pulse"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                <span>Lihat Pesan Terbaru</span>
              </button>
            </div>
          )}

          {/* =================================================================== */}
          {/* BOTTOM INTERACTIVE CHOICES DOCK (TITIK KEPUTUSAN NETRAL A, B, C)    */}
          {/* =================================================================== */}
          {!activeEnding && (
            <div className="relative -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 mt-6 border-t border-[#9DB2BF]/50 bg-[#F8FAFC] p-4 sm:p-5 shadow-lg">
              {currentDecisionId && !isTyping && (
                <div className="space-y-3 pt-1.5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-black text-[#27374D] uppercase tracking-wider">
                      {currentScenario.decisions[currentDecisionId]?.stepTitle}: Tentukan Keputusanmu
                    </span>
                  </div>

                  {/* Grid Pilihan Netral (Mendukung 2 atau 3 Pilihan Tanpa Clue Merah / Hijau) */}
                  {(() => {
                    const dec = currentScenario.decisions[currentDecisionId];
                    if (!dec) return null;
                    const availableKeys = (["A", "B", "C"] as const).filter(
                      (key) => dec.options[key] !== undefined
                    );
                    const gridClass =
                      availableKeys.length === 3
                        ? "grid grid-cols-1 md:grid-cols-3 gap-3.5"
                        : "grid grid-cols-1 sm:grid-cols-2 gap-3.5";

                    return (
                      <div className={gridClass}>
                        {availableKeys.map((key) => {
                          const opt = dec.options[key]!;
                          const cleanLabel = cleanOptionLabel(opt.label);

                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleSelectOption(key)}
                              className="group relative text-left p-4 sm:p-4.5 rounded-2xl border-2 border-[#9DB2BF]/50 bg-white hover:bg-[#27374D] hover:border-[#27374D] text-[#27374D] hover:text-white transition-all duration-250 ease-out cursor-pointer flex items-center gap-3.5 sm:gap-4 shadow-xs hover:shadow-xl hover:shadow-[#27374D]/30 hover:scale-[1.03] hover:-translate-y-1.5 active:scale-[0.98] z-0 hover:z-10"
                            >
                              {/* Badge Huruf Bulat (Lingkaran Putih saat Hover, persis Gambar 1) */}
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/40 group-hover:bg-white group-hover:text-[#27374D] group-hover:border-white text-xs font-black transition-all duration-200 shadow-2xs group-hover:shadow-md shrink-0">
                                {key}
                              </span>

                              {/* Teks Opsi Jawaban */}
                              <p className="flex-1 text-xs sm:text-[13px] font-bold leading-snug transition-colors duration-200">
                                {cleanLabel}
                              </p>

                              {/* Panah Indikator Halus saat Hover */}
                              <ChevronRight className="h-4 w-4 text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              )}

              {(!currentDecisionId || isTyping) && (
                <div className="flex items-center justify-between py-2 px-1 text-xs text-[#526D82] animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                    <span className="font-semibold italic">
                      {isTyping ? typingText : "Menunggu respons percakapan..."}
                    </span>
                  </div>
                  {fastForwardActionRef.current && (
                    <button
                      type="button"
                      onClick={handleFastForward}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all cursor-pointer shadow-2xs"
                    >
                      <FastForward className="h-3.5 w-3.5 text-amber-700" />
                      <span>Lewati Mengetik</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

        <div ref={chatEndRef} className="h-0 w-full" />
      </div>
    </>
  )}

      {/* Bilah Navigasi Smartphone / Dekorasi Tombol Home HP (Non-clickable, Visual Saja) */}
      <div
        aria-hidden="true"
        className="bg-[#1e2b3d] text-white/50 px-6 py-2 sm:py-2.5 flex items-center justify-center select-none pointer-events-none border-t border-white/10 shrink-0"
      >
        <div className="w-full max-w-xs flex items-center justify-between px-6">
          {/* Tombol Back / Kembali */}
          <div className="flex items-center justify-center w-6 h-6">
            <svg className="w-3.5 h-3.5 fill-current opacity-70" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </div>

          {/* Tombol Home Utama (Lingkaran Navigasi HP) */}
          <div className="flex items-center justify-center w-7 h-7">
            <div className="w-4 h-4 rounded-full border-2 border-white/70 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
          </div>

          {/* Tombol Recent Apps / Multitasking */}
          <div className="flex items-center justify-center w-6 h-6">
            <div className="w-3 h-3 rounded-xs border-2 border-white/70" />
          </div>
        </div>
      </div>
    </div>

      {/* Lightbox Modal untuk Memeriksa Foto / Dokumen Pendukung Penipu */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal Lightbox */}
            <div className="flex items-center justify-between bg-[#27374D] text-white px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white tracking-wide truncate">
                    {activeLightboxImage.caption || "Foto Bukti Terlampir"}
                  </h4>
                  <p className="text-[10px] text-[#DDE6ED]/70 font-mono">
                    Tangkapan Layar &amp; Dokumen Penipu
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightboxImage(null)}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Konten Gambar Full Lightbox */}
            <div className="p-4 sm:p-6 bg-[#F1F5F9] flex items-center justify-center max-h-[70vh] overflow-auto">
              <img
                src={activeLightboxImage.src}
                alt={activeLightboxImage.alt}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-2xl shadow-lg border border-[#9DB2BF]/30 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
