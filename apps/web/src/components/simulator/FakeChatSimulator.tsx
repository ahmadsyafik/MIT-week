import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Video,
  Info,
  Camera,
  Mic,
  Flame,
  ThumbsUp,
  Search,
  Store,
  MapPin,
  Tag,
  User,
  MessageCircle,
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

const FB_MARKETPLACE_ITEMS = [
  {
    id: "iphone15",
    title: "iPhone 15 Pro Max 256GB Segel Baru Garansi Resmi",
    price: "Rp 3.500.000",
    normalPrice: "Rp 21.999.000",
    location: "Jakarta Pusat • 2 jam lalu",
    modelName: "iPhone 15 Pro Max",
    badge: "Promo 80%",
    specs: "256 GB • Natural Titanium • Segel BNIB",
    color: "from-slate-700 via-slate-800 to-slate-950",
    image: "/simulator/marketplace/iphone-15-promax.jpg",
  },
  {
    id: "s24ultra",
    title: "Samsung Galaxy S24 Ultra 512GB Fullset Mulus",
    price: "Rp 4.200.000",
    normalPrice: "Rp 20.499.000",
    location: "Jakarta Barat • 30 menit lalu",
    modelName: "Samsung Galaxy S24 Ultra",
    badge: "Flash Sale",
    specs: "512 GB • Titanium Black • Garansi SEIN",
    color: "from-zinc-800 via-neutral-900 to-black",
    image: "/simulator/marketplace/samsung-s24-ultra.jpg",
  },
  {
    id: "xiaomi14",
    title: "Xiaomi 14 Ultra Leica Garansi Resmi Mulus",
    price: "Rp 2.900.000",
    normalPrice: "Rp 14.999.000",
    location: "Jakarta Selatan • 1 jam lalu",
    modelName: "Xiaomi 14 Ultra",
    badge: "Diskon Toko",
    specs: "512 GB • Leica Quad Camera • Mulus 99%",
    color: "from-neutral-700 via-neutral-800 to-zinc-900",
    image: "/simulator/marketplace/xiaomi-14-ultra.jpg",
  },
  {
    id: "iphone14",
    title: "iPhone 14 Pro 128GB Deep Purple Baterai 100%",
    price: "Rp 2.800.000",
    normalPrice: "Rp 14.500.000",
    location: "Tangerang • 3 jam lalu",
    modelName: "iPhone 14 Pro",
    badge: "Promo Khusus",
    specs: "128 GB • Deep Purple • Fullset OEM",
    color: "from-purple-900 via-purple-950 to-slate-950",
    image: "/simulator/marketplace/iphone-14-pro.jpg",
  },
  {
    id: "pixel8",
    title: "Google Pixel 8 Pro 256GB Mint Garansi Toko",
    price: "Rp 3.100.000",
    normalPrice: "Rp 15.000.000",
    location: "Bekasi • 4 jam lalu",
    modelName: "Google Pixel 8 Pro",
    badge: "Stok Terakhir",
    specs: "256 GB • Mint Green • All Operator",
    color: "from-teal-800 via-teal-950 to-slate-950",
    image: "/simulator/marketplace/google-pixel-8-pro.jpg",
  },
  {
    id: "ipadair",
    title: "iPad Air 5 M1 WiFi 256GB Space Grey Like New",
    price: "Rp 3.800.000",
    normalPrice: "Rp 16.299.000",
    location: "Depok • 5 jam lalu",
    modelName: "iPad Air 5 M1",
    badge: "Cuci Gudang",
    specs: "256 GB • Apple M1 Chip • Free Case",
    color: "from-slate-600 via-slate-800 to-slate-900",
    image: "/simulator/marketplace/ipad-air-5.jpg",
  },
];

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

  // Helper untuk membersihkan petunjuk teks seperti "(Berisiko)" atau "(Aman)" dan awalan huruf "A. "
  const cleanOptionLabel = (rawLabel: string): string => {
    return rawLabel
      .replace(/^Pilihan\s+[A-Z]\s*\((?:Berisiko|Aman)\)\s*[—–-]\s*/i, "")
      .replace(/\s*\((?:Berisiko|Aman)\)/gi, "")
      .replace(/^[A-C]\.\s*[-–—]?\s*/i, "")
      .trim();
  };

  // State simulasi
  const isVoiceCallScenario =
    currentScenario.channelType === "voice_call" || activeId === "k4";

  // Deteksi skenario Dating App (K5 Pig Butchering)
  const isDatingApp =
    currentScenario.channelType === "dating_app" || activeId === "k5";

  // Deteksi skenario Marketplace FB (K8 Toko Online Fiktif)
  const isMarketplace =
    currentScenario.channelType === "marketplace" || activeId === "k8";

  // Deteksi mode antarmuka: Instagram DM (Media Sosial) vs WhatsApp (Chat Standar)
  const isInstagramDM =
    !isDatingApp &&
    !isMarketplace &&
    (currentScenario.channelType === "social_dm" ||
      currentScenario.senderAddress?.toLowerCase().includes("instagram") ||
      activeId === "k3" ||
      activeId === "k7");
  const [showPhoneCallOverlay, setShowPhoneCallOverlay] = useState(isVoiceCallScenario);
  const [showDatingMatchOverlay, setShowDatingMatchOverlay] = useState(isDatingApp);
  const [showMarketplaceOverlay, setShowMarketplaceOverlay] = useState(isMarketplace);
  const [selectedMarketplaceItem, setSelectedMarketplaceItem] = useState<(typeof FB_MARKETPLACE_ITEMS)[0]>(
    FB_MARKETPLACE_ITEMS[0]
  );
  const [datingRejectShaking, setDatingRejectShaking] = useState(false);
  const [datingRejectTooltip, setDatingRejectTooltip] = useState(false);
  const [isDatingMatchCelebrating, setIsDatingMatchCelebrating] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentDecisionId, setCurrentDecisionId] = useState<number | null>(null);
  const [sessionKey, setSessionKey] = useState(0);

  // Acak urutan tombol opsi jawaban agar tidak monoton (jawaban aman/benar tidak selalu C dan salah tidak selalu A)
  const shuffledOptionKeys = useMemo(() => {
    if (!currentDecisionId) return [];
    const dec = currentScenario.decisions[currentDecisionId];
    if (!dec) return [];
    const originalKeys = (["A", "B", "C"] as const).filter(
      (key) => dec.options[key] !== undefined
    );
    // Fisher-Yates shuffle acak bebas pola
    const shuffled = [...originalKeys];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentDecisionId, currentScenario.id, sessionKey]);

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
      text: "Waspadai panggilan yang meminta kode OTP atau data pribadi.",
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

  // Penanganan tombol tolak (X) pada mode Find a Match Dating App
  // Sesuai permintaan pengguna: tombol silang TIDAK BERFUNGSI untuk melanjutkan
  const handleDatingReject = () => {
    setDatingRejectShaking(true);
    setDatingRejectTooltip(true);
    setTimeout(() => setDatingRejectShaking(false), 500);
    setTimeout(() => setDatingRejectTooltip(false), 3000);
  };

  // Penanganan tombol Love pada mode Find a Match Dating App
  // Sesuai permintaan: tombol Love BERFUNGSI dan langsung lanjut ke fake chat
  const handleDatingMatch = () => {
    setIsDatingMatchCelebrating(true);
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch {
      // Audio optional
    }

    addTimeout(() => {
      setShowDatingMatchOverlay(false);
      setIsDatingMatchCelebrating(false);
      startDatingChatFlow();
    }, 800);
  };

  // Alur pembukaan obrolan khusus Dating App setelah Match berhasil
  const startDatingChatFlow = () => {
    clearAllTimeouts();
    setCurrentDecisionId(null);
    setActiveFullscreenWarning(null);
    setActiveEnding(null);
    setIsTyping(false);
    isNearBottomRef.current = true;
    setShowScrollDown(false);

    const initialSystemMsg: ChatMessage = {
      id: "msg-dating-sys-0",
      sender: "system",
      timestamp: "09:38",
      text: "Waspadai bujuk rayu investasi kripto dari kenalan baru.",
    };

    setMessages([initialSystemMsg]);

    const addl = currentScenario.briefing.additionalMessages || [];
    const openingGreetingMsg: ChatMessage = {
      id: `msg-open-greet-${Date.now()}`,
      sender: "attacker",
      timestamp: "09:39",
      text: addl[0] || `Hai kamu! Gimana harinya? Sibuk banget ya belakangan ini?`,
    };

    const mainMessage: ChatMessage = {
      id: `msg-open-main-${Date.now()}`,
      sender: "attacker",
      timestamp: "09:41",
      text: currentScenario.briefing.messageText,
      attachment: currentScenario.briefing.attachmentName
        ? {
          name: currentScenario.briefing.attachmentName,
          size: currentScenario.briefing.attachmentSize,
          type: currentScenario.briefing.attachmentType || "jpg",
        }
        : undefined,
    };

    const supportingImageMsg: ChatMessage | null = currentScenario.briefing.supportingImage
      ? {
        id: `msg-open-img-${Date.now()}`,
        sender: "attacker",
        timestamp: "09:41",
        image: currentScenario.briefing.supportingImage,
      }
      : null;

    const followUpMsg: ChatMessage | null = addl[1]
      ? {
        id: `msg-open-follow-${Date.now()}`,
        sender: "attacker",
        timestamp: "09:41",
        text: addl[1],
      }
      : null;

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

    addTimeout(() => {
      setIsTyping(true);
      setTypingText(`Siska sedang mengetik...`);
    }, 400);

    addTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, openingGreetingMsg]);
    }, 1600);

    addTimeout(() => {
      setIsTyping(true);
      setTypingText(`Siska mengirim foto profit kripto...`);
    }, 2400);

    addTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => {
        const msgs = [...prev];
        if (supportingImageMsg) msgs.push(supportingImageMsg);
        msgs.push(mainMessage);
        return msgs;
      });
    }, 3900);

    if (followUpMsg) {
      addTimeout(() => {
        setIsTyping(true);
        setTypingText(`Siska sedang mengetik...`);
      }, 4500);

      addTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, followUpMsg]);
        setCurrentDecisionId(1);
        fastForwardActionRef.current = null;
      }, 5800);
    } else {
      addTimeout(() => {
        setIsTyping(false);
        setCurrentDecisionId(1);
        fastForwardActionRef.current = null;
      }, 4500);
    }
  };

  // Penanganan ketika pengguna memilih produk di Facebook Marketplace
  const handleSelectMarketplaceItem = (item: (typeof FB_MARKETPLACE_ITEMS)[0]) => {
    setSelectedMarketplaceItem(item);
    setShowMarketplaceOverlay(false);
    startMarketplaceMessengerChatFlow(item);
  };

  // Alur pembukaan obrolan Facebook Messenger setelah pengguna memilih produk di Marketplace
  const startMarketplaceMessengerChatFlow = (item: (typeof FB_MARKETPLACE_ITEMS)[0]) => {
    clearAllTimeouts();
    setCurrentDecisionId(null);
    setActiveFullscreenWarning(null);
    setActiveEnding(null);
    setIsTyping(false);
    isNearBottomRef.current = true;
    setShowScrollDown(false);

    const initialSystemMsg: ChatMessage = {
      id: "msg-fb-sys-0",
      sender: "system",
      timestamp: "10:15",
      text: "Waspadai transaksi langsung di luar rekening bersama resmi.",
    };

    const userInquiryMsg: ChatMessage = {
      id: "msg-fb-user-inquiry",
      sender: "user",
      timestamp: "10:15",
      text: `Halo, apakah ${item.title} ini masih ada?`,
    };

    setMessages([initialSystemMsg, userInquiryMsg]);

    const addl = currentScenario.briefing.additionalMessages || [];
    const openingGreetingMsg: ChatMessage = {
      id: `msg-fb-greet-${Date.now()}`,
      sender: "attacker",
      timestamp: "10:16",
      text: addl[0] || `Halo kak, terima kasih sudah menghubungi admin toko elektronik cuci gudang resmi!`,
    };

    const mainMessage: ChatMessage = {
      id: `msg-fb-main-${Date.now()}`,
      sender: "attacker",
      timestamp: "10:17",
      text: `Stok promo flash sale ${item.modelName} tinggal 1 unit kak dan banyak yang antre. Kalau mau, langsung transfer sekarang ke rekening admin ya biar kami kirim hari ini!`,
    };

    const supportingImageMsg: ChatMessage = {
      id: `msg-fb-img-${Date.now()}`,
      sender: "attacker",
      timestamp: "10:17",
      image: {
        src: item.image,
        caption: `Foto_${item.modelName.replace(/\s+/g, "_")}_Segel.jpg`,
        alt: `Foto Unit ${item.title}`,
      },
    };

    const followUpMsg: ChatMessage | null = addl[1]
      ? {
        id: `msg-fb-follow-${Date.now()}`,
        sender: "attacker",
        timestamp: "10:17",
        text: addl[1],
      }
      : null;

    fastForwardActionRef.current = () => {
      const allMsgs = [initialSystemMsg, userInquiryMsg, openingGreetingMsg];
      if (supportingImageMsg) allMsgs.push(supportingImageMsg);
      allMsgs.push(mainMessage);
      if (followUpMsg) allMsgs.push(followUpMsg);
      setMessages(allMsgs);
      setIsTyping(false);
      setCurrentDecisionId(1);
      fastForwardActionRef.current = null;
    };

    addTimeout(() => {
      setIsTyping(true);
      setTypingText(`${currentScenario.senderName} sedang mengetik...`);
    }, 400);

    addTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, openingGreetingMsg]);
    }, 1600);

    addTimeout(() => {
      setIsTyping(true);
      setTypingText(`${currentScenario.senderName} mengirim foto unit ${item.modelName}...`);
    }, 2400);

    addTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => {
        const msgs = [...prev];
        if (supportingImageMsg) msgs.push(supportingImageMsg);
        msgs.push(mainMessage);
        return msgs;
      });
    }, 3900);

    if (followUpMsg) {
      addTimeout(() => {
        setIsTyping(true);
        setTypingText(`${currentScenario.senderName} sedang mengetik pesan lanjutan...`);
      }, 4500);

      addTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, followUpMsg]);
        setCurrentDecisionId(1);
        fastForwardActionRef.current = null;
      }, 5800);
    } else {
      addTimeout(() => {
        setIsTyping(false);
        setCurrentDecisionId(1);
        fastForwardActionRef.current = null;
      }, 4500);
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
    setSessionKey((prev) => prev + 1);

    if (isVoiceCallScenario) {
      setShowPhoneCallOverlay(true);
      setMessages([]);
      return;
    }

    if (isDatingApp) {
      setShowDatingMatchOverlay(true);
      setIsDatingMatchCelebrating(false);
      setMessages([]);
      return;
    }

    if (isMarketplace) {
      setShowMarketplaceOverlay(true);
      setMessages([]);
      return;
    }

    const initialSystemMsg: ChatMessage = {
      id: "msg-0",
      sender: "system",
      timestamp: "09:40",
      text: "Nomor tidak dikenal. Waspadai berkas atau tautan mencurigakan.",
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
    const isRisky = selectedOption.type === "risky";
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
    <div className="w-full max-w-4xl mx-auto space-y-4 select-none animate-fadeIn font-sans">
      {/* Top Bar Navigasi Skenario */}
      <div className="flex items-center justify-between border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#526D82] hover:text-[#27374D] cursor-pointer transition-colors font-sans"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Skenario</span>
        </button>
      </div>

      {/* Main Container Simulator (Mockup Layar Smartphone Nyata) */}
      <div className="isolate relative z-0 rounded-[28px] sm:rounded-[36px] border-4 sm:border-[6px] border-[#27374D] bg-[#27374D] shadow-[0_20px_60px_rgba(39,55,77,0.25)] overflow-hidden flex flex-col font-sans">
        {/* Mock Phone Status Bar */}
        <div className="bg-[#1e2b3d] text-white/70 px-5 py-1.5 flex items-center justify-between text-[11px] font-semibold border-b border-white/10 select-none shrink-0 font-sans">
          <span className="font-semibold text-[10px] font-sans">09:41</span>
          <div className="w-16 h-3 bg-black/60 rounded-full mx-auto flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-[10px] font-sans">
            <span>5G</span>
            <span>88%</span>
          </div>
        </div>

        {/* Modal Popup Otomatis Peringatan Sistem (Membuat Chat di Belakang Blur) */}
        {activeFullscreenWarning && (
          <div
            role="button"
            tabIndex={0}
            onClick={handleDismissFullscreenWarning}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleDismissFullscreenWarning();
            }}
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer select-none animate-fadeIn"
          >
            {/* Kartu Popup Dialog Bersih & Simpel (Native Mobile Alert Style) */}
            <div
              onClick={(e) => {
                // Klik pada kartu juga menutup popup dan melanjutkan
                handleDismissFullscreenWarning();
              }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-in zoom-in-95 duration-200"
            >
              {/* Ikon Peringatan Simpel & Bersih */}
              <div className="flex justify-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs ${activeFullscreenWarning.type === "danger"
                      ? "bg-rose-100 text-rose-600"
                      : "bg-amber-100 text-amber-600"
                    }`}
                >
                  {activeFullscreenWarning.type === "danger" ? (
                    <AlertOctagon className="w-7 h-7 text-rose-600" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-amber-600" />
                  )}
                </div>
              </div>

              {/* Judul & Isi Pesan Peringatan */}
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                  {activeFullscreenWarning.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {activeFullscreenWarning.body}
                </p>
              </div>

              {/* Tombol Lanjutkan ke Pilihan Keputusan */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissFullscreenWarning();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-[#27374D] hover:bg-[#1e2b3d] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan ke Pilihan Keputusan</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {showPhoneCallOverlay && isVoiceCallScenario ? (
          <PhoneCallSimulator
            scenario={currentScenario}
            onCompleteCall={handlePhoneCallComplete}
            onDeclineCall={() => handlePhoneCallComplete("C", 0)}
          />
        ) : showDatingMatchOverlay && isDatingApp ? (
          /* ===================================================================== */
          /* LAYAR DATING APP: "FIND A MATCH" POLOSAN (SESUAI PERMINTAAN USER)     */
          /* ===================================================================== */
          <div className="relative w-full min-h-[620px] sm:min-h-[700px] bg-gradient-to-b from-[#220c10] via-[#16080a] to-[#0d0406] text-white flex flex-col justify-between overflow-hidden font-sans select-none animate-fadeIn p-4 sm:p-6">
            {/* Top Bar Minimalis */}
            <div className="flex items-center justify-between text-xs pb-3 shrink-0">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
                title="Kembali ke Daftar Skenario"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Daftar Skenario</span>
              </button>
            </div>

            {/* Area Tengah Polosan: Teks "Find a match" dan Tombol X & Love */}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 sm:space-y-14 my-auto">
              {/* Teks "Find a match" Bersih & Polosan (Tanpa Foto & Tanpa Nama) */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans drop-shadow-md">
                Find a match
              </h2>

              {/* Dua Tombol Aksi: Silang (Tidak Berfungsi) & Love (Berfungsi Langsung ke Chat) */}
              <div className="flex items-center justify-center gap-8 sm:gap-12">
                {/* Tombol Silang (X) - TIDAK BERFUNGSI SESUAI PERMINTAAN USER */}
                <button
                  type="button"
                  onClick={handleDatingReject}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 hover:bg-white/15 border-2 border-white/20 text-white/50 hover:text-white/70 flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95 ${datingRejectShaking ? "animate-shake border-rose-500 text-rose-400 bg-rose-500/20" : ""
                    }`}
                  title="Tolak Profil (Tidak Berfungsi)"
                >
                  <X className="w-8 h-8 sm:w-9 sm:h-9" />
                </button>

                {/* Tombol Love (Hati Hijau) - BERFUNGSI LANGSUNG LANJUT KE FAKE CHAT */}
                <button
                  type="button"
                  onClick={handleDatingMatch}
                  className="relative group w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:shadow-[0_0_50px_rgba(16,185,129,0.95)] hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/40"
                  title="Match & Lanjut ke Obrolan"
                >
                  <Heart className="w-9 h-9 sm:w-11 sm:h-11 fill-white text-white group-hover:scale-110 transition-transform" />
                  <span className="absolute inset-0 rounded-full border-2 border-emerald-300 animate-ping opacity-30 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Ruang Bawah Kosong Simetris */}
            <div className="pb-4" />

            {/* Modal Perayaan Match Sesaat */}
            {isDatingMatchCelebrating && (
              <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-rose-500 flex items-center justify-center text-white shadow-2xl animate-bounce-short">
                  <Heart className="w-10 h-10 fill-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-widest text-emerald-400 uppercase font-sans">
                    IT'S A MATCH!
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
                    Match Berhasil!
                  </h3>
                  <p className="text-xs text-white/70 font-sans">
                    Membuka ruang obrolan...
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : showMarketplaceOverlay && isMarketplace ? (
          /* ===================================================================== */
          /* LAYAR FACEBOOK MARKETPLACE PERSIS APLIKASI ASLI (MODEL HP)           */
          /* ===================================================================== */
          <div className="relative w-full min-h-[620px] sm:min-h-[700px] bg-white text-slate-900 flex flex-col justify-between overflow-hidden font-sans select-none animate-fadeIn">
            {/* Top Bar Facebook Marketplace Persis Aplikasi FB */}
            <div className="bg-white px-4 pt-3.5 pb-2.5 border-b border-slate-200/80 shrink-0">
              {/* Baris Judul Marketplace & 3 Ikon Bulat Khas FB (Messenger, Profil, Cari) */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight font-sans">
                  Marketplace
                </h1>
                <div className="flex items-center gap-2">
                  {/* Ikon Messenger */}
                  <div
                    className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-900 transition-colors cursor-pointer"
                    title="Facebook Messenger"
                  >
                    <MessageCircle className="w-5 h-5 fill-slate-900" />
                  </div>
                  {/* Ikon Profil Akun */}
                  <div
                    className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-900 transition-colors cursor-pointer"
                    title="Profil Saya"
                  >
                    <User className="w-5 h-5 fill-slate-900 text-slate-900" />
                  </div>
                  {/* Ikon Pencarian */}
                  <div
                    className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-900 transition-colors cursor-pointer"
                    title="Cari di Marketplace"
                  >
                    <Search className="w-4.5 h-4.5 text-slate-900 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Baris Kategori Tabs Persis Screenshot: Sell, For you, Local, More ▾ */}
              <div className="flex items-center gap-2 pt-1 pb-1 overflow-x-auto no-scrollbar text-xs font-bold select-none">
                <span className="px-3 py-1.5 rounded-full text-slate-700 hover:bg-slate-100 cursor-default shrink-0">
                  Jual
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#E7F3FF] text-[#1877F2] cursor-default shrink-0">
                  Untuk Anda
                </span>
                <span className="px-3 py-1.5 rounded-full text-slate-700 hover:bg-slate-100 cursor-default shrink-0">
                  Lokal / Terdekat
                </span>
                <span className="px-3 py-1.5 rounded-full text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-default shrink-0">
                  <span>Lainnya</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </span>
              </div>
            </div>

            {/* Baris Judul Feed Persis Screenshot: Today's picks + Location Pin */}
            <div className="flex items-center justify-between px-3.5 pt-3 pb-1.5 shrink-0">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-sans">
                Pilihan hari ini
              </h2>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#1877F2]">
                <MapPin className="w-3.5 h-3.5 fill-[#1877F2] text-[#1877F2]" />
                <span>Jabodetabek</span>
              </div>
            </div>

            {/* Grid 3 Kolom Listing Smartphone Murah (3 dan 3 Sesuai Permintaan User) */}
            <div className="flex-1 overflow-y-auto px-2.5 sm:px-3 pb-3 space-y-2 max-h-[500px] sm:max-h-[560px]">
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                {FB_MARKETPLACE_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectMarketplaceItem(item)}
                    className="group cursor-pointer flex flex-col text-left transition-transform active:scale-[0.98]"
                  >
                    {/* Gambar Kotak Smartphone (Aspect Square Flush Berisi Foto Nyata) */}
                    <div className="relative w-full aspect-square bg-slate-900 rounded-md overflow-hidden shadow-2xs group-hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />

                      {/* Badge Diskon Khas FB Marketplace */}
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-rose-600/90 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-black uppercase tracking-wider shadow-xs">
                        {item.badge}
                      </span>

                      {/* Tag Memori / Spesifikasi */}
                      <div className="absolute bottom-1 left-1 right-1 text-center">
                        <span className="inline-block max-w-full text-[8px] text-white font-bold bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs truncate shadow-xs">
                          {item.specs.split("•")[0].trim()}
                        </span>
                      </div>
                    </div>

                    {/* Label Bawah Format FB Marketplace */}
                    <div className="pt-1 px-0.5 space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1 text-[11px] sm:text-xs font-black text-slate-900 leading-tight">
                        <span>{item.price}</span>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 line-through font-normal">
                          {item.normalPrice}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-800 truncate leading-tight">
                        {item.modelName}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 font-normal truncate leading-tight">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Guidance Info Banner Khas FB Messenger */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-[#1877F2] shrink-0 font-medium select-none shadow-xs">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-[#1877F2] text-[#1877F2]" />
                <span className="text-slate-700 font-medium text-[11px] sm:text-xs">
                  Ketuk salah satu HP murah di atas untuk chat penjual via <b>Facebook Messenger</b>
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#1877F2] shrink-0" />
            </div>
          </div>
        ) : (
          <>
            {/* Header Bilah Aplikasi Chat (Beralih Dinamis: Instagram DM vs Dating App vs WhatsApp) */}
            {isInstagramDM ? (
              /* ============================================================= */
              /* HEADER KHAS INSTAGRAM DIRECT MESSAGE (MODERN & OTENTIK)      */
              /* ============================================================= */
              <div className="bg-white text-slate-900 border-b border-slate-200/80 px-3.5 py-2.5 sm:px-5 sm:py-3 flex items-center justify-between shadow-2xs z-10 shrink-0 select-none">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Tombol Back Mini Khas Instagram */}
                  <button
                    type="button"
                    onClick={onBack}
                    className="p-1 -ml-1 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Kembali ke Daftar Skenario"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  {/* Avatar Pengirim dengan Instagram Story Gradient Ring & Dot Online */}
                  <div className="relative">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-xs">
                      <div className="h-full w-full rounded-full bg-white p-[1.5px]">
                        <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs overflow-hidden">
                          <ChannelIcon className="h-4.5 w-4.5 text-slate-700" />
                        </div>
                      </div>
                    </div>
                    {/* Dot Aktif Online Hijau Instagram */}
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  {/* Info Akun / Handle Instagram */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight truncate max-w-[150px] sm:max-w-none">
                        {currentScenario.senderName}
                      </span>
                      {/* Centang Biru Terverifikasi Instagram */}
                      <span className="inline-flex items-center text-sky-500 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 fill-sky-500 text-white" />
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal truncate max-w-[180px] sm:max-w-none">
                      {currentScenario.senderAddress?.replace(/^DM Instagram:\s*/i, "") || "Aktif sekarang"}
                    </span>
                  </div>
                </div>

                {/* Tombol Aksi Kanan Khas Instagram DM: Telepon, Video Call, Info */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 text-slate-700">
                  <button
                    type="button"
                    className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                    title="Panggilan Suara"
                  >
                    <Phone className="h-4.5 w-4.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                    title="Panggilan Video"
                  >
                    <Video className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                    title="Informasi Profil & Laporkan"
                  >
                    <Info className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ) : isDatingApp ? (
              /* ============================================================= */
              /* HEADER RESMI DATING APP (MODERN & KHAS TINDER/BUMBLE)         */
              /* ============================================================= */
              <div className="bg-white text-slate-900 border-b border-rose-100 px-3.5 py-2.5 sm:px-5 sm:py-3 flex items-center justify-between shadow-2xs z-10 shrink-0 select-none">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Tombol Back Mini */}
                  <button
                    type="button"
                    onClick={onBack}
                    className="p-1 -ml-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Kembali ke Daftar Skenario"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  {/* Avatar Siska dengan Pink/Rose Gradient Ring & Dot Online */}
                  <div className="relative">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full p-[2px] bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 shadow-xs">
                      <div className="h-full w-full rounded-full bg-white p-[1.5px]">
                        <div className="h-full w-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                          <img
                            src="/simulator/covers/dating-apps.jpg"
                            alt="Siska"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Dot Aktif Online Hijau */}
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  {/* Info Akun Siska */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight truncate max-w-[150px] sm:max-w-none">
                        {currentScenario.senderName}
                      </span>
                      {/* Centang Biru Terverifikasi */}
                      <span className="inline-flex items-center text-sky-500 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 fill-sky-500 text-white" />
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-rose-500 font-medium flex items-center gap-1">
                      <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
                      <span>Baru saja cocok hari ini</span>
                    </span>
                  </div>
                </div>

                {/* Tombol Pintasan Buka Kembali Kartu Match */}
                <button
                  type="button"
                  onClick={() => setShowDatingMatchOverlay(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  title="Lihat Profil Match"
                >
                  <Flame className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  <span className="hidden sm:inline">Kartu Match</span>
                </button>
              </div>
            ) : isMarketplace ? (
              /* ============================================================= */
              /* HEADER RESMI FACEBOOK MESSENGER (BLUE ACCENTS & STORE INFO)   */
              /* ============================================================= */
              <div className="bg-white text-slate-900 border-b border-slate-200/80 px-3.5 py-2.5 sm:px-5 sm:py-3 flex items-center justify-between shadow-2xs z-10 shrink-0 select-none">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Avatar Toko Facebook Messenger */}
                  <div className="relative">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-[#0084FF] to-sky-400 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white">
                      <Store className="h-5 w-5 text-white" />
                    </div>
                    {/* Dot Aktif Online Hijau */}
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  {/* Info Toko / Seller */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight truncate max-w-[150px] sm:max-w-none">
                        {currentScenario.senderName}
                      </span>
                      {/* Centang Biru Toko Terverifikasi */}
                      <span className="inline-flex items-center text-sky-500 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 fill-sky-500 text-white" />
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal truncate max-w-[180px] sm:max-w-none">
                      Aktif sekarang • Di Facebook Marketplace
                    </span>
                  </div>
                </div>

                {/* Tombol Aksi Kanan: Telepon */}
                <div className="flex items-center gap-2 text-slate-700">
                  <button
                    type="button"
                    className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all cursor-pointer text-slate-600"
                    title="Panggilan Telepon"
                  >
                    <Phone className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* ============================================================= */
              /* HEADER RESMI WHATSAPP (DEFAULT UNTUK UNDANGAN APK / KURIR)   */
              /* ============================================================= */
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
                    <span className="font-bold text-xs sm:text-sm text-white tracking-wide truncate max-w-[200px] sm:max-w-none font-sans">
                      {currentScenario.senderName}
                    </span>
                    <span className="text-[11px] text-[#DDE6ED]/75 flex items-center gap-1 font-medium font-sans">
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
            )}

            {/* Scrollable Chat Area (Putih Bersih untuk IG & Dating App & FB Marketplace, Wallpaper Doodle untuk WA) */}
            <div
              ref={chatScrollContainerRef}
              onScroll={handleScroll}
              className={`p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[580px] sm:max-h-[660px] overscroll-contain relative ${isInstagramDM || isDatingApp || isMarketplace ? "bg-white" : "bg-[#EFEAE2]"
                }`}
              style={
                isInstagramDM || isDatingApp || isMarketplace
                  ? { backgroundColor: "#ffffff" }
                  : {
                    backgroundImage: `url('/simulator/chat-doodle-pattern.svg')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "240px 240px",
                  }
              }
            >
              {/* Banner Preview Produk Facebook Marketplace yang Sedang Ditanyakan */}
              {isMarketplace && selectedMarketplaceItem && (
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-3.5 mb-3 shadow-xs animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center shrink-0 shadow-xs border border-slate-200">
                      <img
                        src={selectedMarketplaceItem.image}
                        alt={selectedMarketplaceItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                        {selectedMarketplaceItem.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-sm sm:text-base font-black text-[#0084FF]">
                          {selectedMarketplaceItem.price}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through">
                          {selectedMarketplaceItem.normalPrice}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                        {selectedMarketplaceItem.specs} • {selectedMarketplaceItem.location}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Banner Profil Instagram Khas Saat Buka Percakapan DM */}
              {isInstagramDM && (
                <div className="flex flex-col items-center justify-center text-center py-5 mb-2 space-y-2 border-b border-slate-100 select-none animate-fadeIn">
                  <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full p-[2.5px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-sm">
                    <div className="h-full w-full rounded-full bg-white p-[2px]">
                      <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-lg">
                        <ChannelIcon className="h-8 w-8 text-slate-700" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-center gap-1">
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                        {currentScenario.senderName}
                      </h4>
                      <CheckCircle2 className="h-4 w-4 fill-sky-500 text-white" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium font-sans">
                      {currentScenario.senderAddress?.replace(/^DM Instagram:\s*/i, "")}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Instagram • 14,2 rb pengikut • Akun Bisnis
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-default shadow-2xs">
                      Lihat Profil
                    </span>
                  </div>
                </div>
              )}

              {/* Banner Kecocokan Match Khas Dating App */}
              {isDatingApp && (
                <div className="my-3 mx-auto max-w-sm text-center p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-rose-50/90 via-pink-50/40 to-white border border-rose-200/80 shadow-xs space-y-2.5 animate-fadeIn select-none font-sans">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 text-white shadow-md mx-auto">
                    <Heart className="h-6 w-6 fill-white" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-black text-slate-900 font-sans flex items-center justify-center">
                      <span>Kalian Berdua Saling Cocok!</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Kamu dan Siska saling menyukai di <b>Find a match</b> hari ini. Mulai percakapan sekarang!
                    </p>
                  </div>
                </div>
              )}

              {/* Tanggal Separator */}
              <div className="flex justify-center my-2">
                {isInstagramDM ? (
                  <span className="text-slate-400 text-[11px] font-semibold select-none">
                    Hari ini 09:41
                  </span>
                ) : (
                  <span className="bg-white/80 backdrop-blur-xs text-[#526D82] text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs border border-[#9DB2BF]/40">
                    Hari ini
                  </span>
                )}
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
                          className={`w-full rounded-2xl p-4 sm:p-5 border text-xs shadow-md space-y-2 cursor-pointer transition-all hover:ring-2 hover:ring-amber-400/40 hover:shadow-lg ${msg.systemCard.type === "danger"
                              ? "bg-rose-50 border-rose-300 text-rose-900"
                              : msg.systemCard.type === "warning"
                                ? "bg-amber-50 border-amber-300 text-amber-900"
                                : "bg-emerald-50 border-emerald-300 text-emerald-900"
                            }`}
                          title="Klik kartu ini untuk membaca detail peringatan"
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
                          </div>
                          <p className="leading-relaxed text-[11px] sm:text-xs opacity-90 pl-6.5">
                            {msg.systemCard.body}
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div
                            className={`max-w-md rounded-full px-3.5 py-1 text-center shadow-2xs border ${isInstagramDM || isDatingApp || isMarketplace
                                ? "bg-slate-100/90 border-slate-200/80 text-slate-500"
                                : "bg-[#FFECCD]/85 border-[#E6C994]/60 text-[#6B5327]"
                              }`}
                          >
                            <span className="text-[10.5px] sm:text-[11px] font-medium leading-tight flex items-center justify-center gap-1.5">
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
                        title="Klik kartu ini untuk membaca detail notifikasi"
                      >
                        <div className="flex items-center justify-between border-b border-red-800 pb-2">
                          <span className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider">
                            <AlertOctagon className="h-4 w-4 text-rose-400" />
                            NOTIFIKASI BANK: PERINGATAN MUTASI DANA
                          </span>
                          <span className="text-[10px] text-rose-300 font-medium font-sans">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-rose-100 font-medium leading-relaxed font-sans">{msg.text}</p>
                      </div>
                    </div>
                  );
                }

                if (msg.sender === "call") {
                  return (
                    <div key={msg.id} className="w-full my-3">
                      <div className="w-full rounded-2xl p-4 sm:p-5 bg-sky-950 text-white border-2 border-sky-400 shadow-xl space-y-2 font-sans">
                        <div className="flex items-center justify-between border-b border-sky-800 pb-2">
                          <span className="flex items-center gap-2 text-xs font-black text-sky-300 uppercase tracking-wider font-sans">
                            <Phone className="h-4 w-4 text-sky-300 animate-pulse" />
                            PANGGILAN SUARA MASUK: PETUGAS KEUANGAN
                          </span>
                          <span className="text-[10px] text-sky-200 font-medium font-sans">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-sky-100 font-medium leading-relaxed font-sans">{msg.text}</p>
                      </div>
                    </div>
                  );
                }

                // Pesan dari Attacker (Sisi Kiri)
                if (msg.sender === "attacker") {
                  if (isInstagramDM) {
                    return (
                      <div key={msg.id} className="flex items-end gap-2 max-w-[86%] sm:max-w-[78%] animate-fadeIn">
                        {/* Mini Avatar Pengirim Khas Instagram DM */}
                        <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0 mb-1 overflow-hidden ring-1 ring-slate-200 shadow-2xs">
                          <ChannelIcon className="h-4 w-4 text-slate-600" />
                        </div>

                        <div className="space-y-1.5 max-w-full">
                          {/* Bubble Abu-abu Khas Instagram */}
                          <div className="rounded-[22px] rounded-bl-sm bg-[#EFEFEF] px-4 py-2.5 text-[#262626] text-xs sm:text-[13px] leading-relaxed shadow-none">
                            {msg.text && (
                              <p className="leading-relaxed font-normal">
                                {msg.text}
                              </p>
                            )}

                            {/* Gambar / Foto Bukti Pendukung */}
                            {msg.image && (
                              <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white mt-2 shadow-xs">
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
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-black/75 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-md">
                                      <Eye className="h-3.5 w-3.5 text-white" />
                                      <span>Perbesar</span>
                                    </span>
                                  </div>
                                </div>
                                {msg.image.caption && (
                                  <div className="px-3 py-2 bg-white flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100">
                                    <span className="font-medium truncate">{msg.image.caption}</span>
                                    <span className="text-[10px] text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full font-bold ml-2 shrink-0">
                                      Bukti DM
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Lampiran Dokumen/File */}
                            {msg.attachment && (
                              <div className="rounded-2xl border border-rose-200 bg-white p-3 space-y-2 mt-2 shadow-xs">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-500 to-rose-600 text-white flex flex-col items-center justify-center font-black text-[9px] shadow-xs shrink-0 font-sans">
                                    <FileCode className="h-4.5 w-4.5" />
                                    <span>{msg.attachment.type.toUpperCase()}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="block font-bold text-xs text-slate-900 truncate">
                                      {msg.attachment.name}
                                    </span>
                                    <span className="block text-[10px] text-rose-600 font-semibold">
                                      {msg.attachment.size || "Berkas"} · Tanda Bahaya Phishing
                                    </span>
                                  </div>
                                  <div className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                                    <Download className="h-4 w-4" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (isMarketplace) {
                    return (
                      <div key={msg.id} className="flex items-end gap-2 max-w-[86%] sm:max-w-[78%] animate-fadeIn">
                        {/* Mini Store Avatar */}
                        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#0084FF] to-sky-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mb-1 shadow-2xs">
                          <Store className="h-4 w-4 text-white" />
                        </div>

                        <div className="space-y-1 max-w-full">
                          {/* Bubble Abu-abu Khas Facebook Messenger */}
                          <div className="rounded-[20px] rounded-bl-xs bg-[#F0F2F5] px-4 py-2.5 text-slate-900 text-xs sm:text-[13px] leading-relaxed shadow-none">
                            {msg.text && (
                              <p className="leading-relaxed font-normal">
                                {msg.text}
                              </p>
                            )}

                            {/* Gambar / Foto Unit HP Marketplace */}
                            {msg.image && (
                              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white mt-2 shadow-xs">
                                <div
                                  className="relative cursor-pointer group/img overflow-hidden"
                                  onClick={() => setActiveLightboxImage(msg.image!)}
                                >
                                  <img
                                    src={msg.image.src}
                                    alt={msg.image.alt || "Foto Unit HP Marketplace"}
                                    className="w-full max-h-[260px] object-cover object-center transition-transform duration-300 group-hover/img:scale-105"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-black/75 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-md">
                                      <Eye className="h-3.5 w-3.5 text-white" />
                                      <span>Perbesar Foto</span>
                                    </span>
                                  </div>
                                </div>
                                {msg.image.caption && (
                                  <div className="px-3 py-2 bg-white flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100 font-sans">
                                    <span className="font-semibold truncate">{msg.image.caption}</span>
                                    <span className="text-[10px] text-[#0084FF] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full font-bold ml-2 shrink-0">
                                      Foto Unit HP
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Lampiran Dokumen/File */}
                            {msg.attachment && (
                              <div className="rounded-2xl border border-rose-200 bg-white p-3 space-y-2 mt-2 shadow-xs">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-500 to-rose-600 text-white flex flex-col items-center justify-center font-black text-[9px] shadow-xs shrink-0 font-sans">
                                    <FileCode className="h-4.5 w-4.5" />
                                    <span>{msg.attachment.type.toUpperCase()}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="block font-bold text-xs text-slate-900 truncate">
                                      {msg.attachment.name}
                                    </span>
                                    <span className="block text-[10px] text-rose-600 font-semibold">
                                      {msg.attachment.size || "Berkas"} · Tanda Bahaya
                                    </span>
                                  </div>
                                  <div className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                                    <Download className="h-4 w-4" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium pl-1 select-none font-sans">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  // Default WhatsApp Bubble (Undangan APK, Kurir, dsb)
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
                                <span className="bg-black/60 text-white text-[9px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/20 font-sans">
                                  Foto Lampiran
                                </span>
                              </div>
                            </div>
                            {msg.image.caption && (
                              <div className="px-3 py-1.5 bg-white border-t border-[#9DB2BF]/30 flex items-center justify-between text-[11px] text-[#526D82] font-sans">
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
                          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 space-y-2 mt-2 font-sans">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-rose-600 text-white flex flex-col items-center justify-center font-black text-[10px] shadow-xs font-sans">
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
                          <span className="text-[10px] text-[#526D82] font-medium font-sans">{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Pesan dari User (Sisi Kanan)
                if (isInstagramDM) {
                  return (
                    <div
                      key={msg.id}
                      className="flex flex-col items-end max-w-[85%] sm:max-w-[76%] ml-auto animate-fadeIn space-y-0.5 font-sans"
                    >
                      <div className="rounded-[22px] rounded-br-sm bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#D946EF] px-4 py-2.5 text-white shadow-xs font-sans">
                        <p className="text-xs sm:text-[13px] leading-relaxed font-normal font-sans">
                          {msg.text}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium pr-1.5 select-none font-sans">
                        Dilihat
                      </span>
                    </div>
                  );
                }

                if (isMarketplace) {
                  return (
                    <div
                      key={msg.id}
                      className="flex flex-col items-end max-w-[85%] sm:max-w-[76%] ml-auto animate-fadeIn space-y-0.5 font-sans"
                    >
                      <div className="rounded-[20px] rounded-br-xs bg-[#0084FF] px-4 py-2.5 text-white shadow-xs font-sans">
                        <p className="text-xs sm:text-[13px] leading-relaxed font-normal font-sans">
                          {msg.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 pr-1 text-[10px] text-slate-400 font-medium">
                        <span>{msg.timestamp}</span>
                        <CheckCircle2 className="h-3 w-3 text-[#0084FF]" />
                      </div>
                    </div>
                  );
                }

                // Default WhatsApp User Bubble
                return (
                  <div
                    key={msg.id}
                    className="flex items-end justify-end gap-2 max-w-[88%] sm:max-w-[78%] ml-auto font-sans"
                  >
                    <div className="rounded-2xl rounded-br-xs bg-[#27374D] p-3.5 text-white shadow-sm space-y-1 font-sans">
                      <p className="text-xs sm:text-[13px] leading-relaxed font-normal font-sans">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-end gap-1 text-[10px] text-[#DDE6ED]/70 font-medium font-sans">
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
                    {isInstagramDM ? (
                      <>
                        <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0 mb-0.5 overflow-hidden ring-1 ring-slate-200 shadow-2xs">
                          <ChannelIcon className="h-4 w-4 text-slate-600" />
                        </div>
                        <div className="rounded-[22px] rounded-bl-sm bg-[#EFEFEF] px-4 py-2 flex items-center gap-1.5 shadow-none">
                          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                          <span
                            className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                          <span className="text-[11px] text-slate-500 ml-1.5 font-medium">
                            {typingText}
                          </span>
                        </div>
                      </>
                    ) : isMarketplace ? (
                      <>
                        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#0084FF] to-sky-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mb-0.5 shadow-2xs">
                          <Store className="h-4 w-4 text-white" />
                        </div>
                        <div className="rounded-[20px] rounded-bl-xs bg-[#F0F2F5] px-4 py-2 flex items-center gap-1.5 shadow-none">
                          <span className="h-2 w-2 rounded-full bg-[#0084FF] animate-bounce" />
                          <span
                            className="h-2 w-2 rounded-full bg-[#0084FF] animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="h-2 w-2 rounded-full bg-[#0084FF] animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                          <span className="text-[11px] text-slate-500 ml-1.5 font-medium">
                            {typingText}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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
                    className={`rounded-2xl border p-4 sm:p-5 shadow-md space-y-3 bg-white ${activeEnding.score >= 80
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
                          className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-white shadow-xs shrink-0 ${activeEnding.score >= 80
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
                <div
                  className={`relative -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 mt-6 border-t p-4 sm:p-5 shadow-lg ${isInstagramDM || isDatingApp || isMarketplace
                      ? "border-slate-200 bg-white"
                      : "border-[#9DB2BF]/50 bg-[#F8FAFC]"
                    }`}
                >
                  {/* Bilah Input Visual Palsu Khas Instagram DM */}
                  {isInstagramDM && (
                    <div className="flex items-center gap-2 mb-3.5 select-none opacity-95">
                      <div className="h-8 w-8 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs cursor-default">
                        <Camera className="h-4 w-4" />
                      </div>
                      <div className="flex-1 flex items-center justify-between rounded-full bg-[#EFEFEF] border border-slate-200/80 px-4 py-2 text-xs text-slate-400">
                        <span>Kirim pesan...</span>
                        <div className="flex items-center gap-2.5 text-slate-500">
                          <Mic className="h-4 w-4" />
                          <ImageIcon className="h-4 w-4" />
                          <Heart className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bilah Input Visual Palsu Khas Dating App */}
                  {isDatingApp && (
                    <div className="flex items-center gap-2 mb-3.5 select-none opacity-95">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs cursor-default">
                        <Heart className="h-4 w-4 fill-white" />
                      </div>
                      <div className="flex-1 flex items-center justify-between rounded-full bg-[#FFF5F5] border border-rose-200/80 px-4 py-2 text-xs text-slate-500">
                        <span className="text-slate-400">Kirim pesan ke Siska...</span>
                        <div className="flex items-center gap-2.5 text-rose-400">
                          <ImageIcon className="h-4 w-4 text-slate-400" />
                          <Send className="h-4 w-4 text-rose-500" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bilah Input Visual Palsu Khas Facebook Messenger */}
                  {isMarketplace && (
                    <div className="flex items-center gap-2 mb-3.5 select-none opacity-95">
                      <div className="flex items-center gap-1.5 text-[#0084FF] shrink-0">
                        <div className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center text-[#0084FF] hover:bg-sky-100 cursor-default">
                          <Camera className="h-4 w-4" />
                        </div>
                        <div className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center text-[#0084FF] hover:bg-sky-100 cursor-default">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                        <div className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center text-[#0084FF] hover:bg-sky-100 cursor-default">
                          <Mic className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-between rounded-full bg-[#F0F2F5] px-4 py-2 text-xs text-slate-500">
                        <span className="text-slate-400 truncate">Tulis pesan ke penjual...</span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center text-[#0084FF] hover:bg-sky-100 shrink-0 cursor-default">
                        <ThumbsUp className="h-4 w-4 fill-[#0084FF]" />
                      </div>
                    </div>
                  )}

                  {currentDecisionId && !isTyping && (
                    <div className="space-y-3 pt-1.5 animate-fadeIn">
                      <div>
                        <span
                          className={`text-xs font-black uppercase tracking-wider ${isInstagramDM || isDatingApp || isMarketplace ? "text-slate-800" : "text-[#27374D]"
                            }`}
                        >
                          {currentScenario.decisions[currentDecisionId]?.stepTitle}: Tentukan Keputusanmu
                        </span>
                      </div>

                      {/* Grid Pilihan Netral (Diacak Bebas Pola, Mendukung 2 atau 3 Pilihan) */}
                      {(() => {
                        const dec = currentScenario.decisions[currentDecisionId];
                        if (!dec) return null;
                        const displayLetters = ["A", "B", "C"] as const;
                        const gridClass =
                          shuffledOptionKeys.length === 3
                            ? "grid grid-cols-1 md:grid-cols-3 gap-3.5"
                            : "grid grid-cols-1 sm:grid-cols-2 gap-3.5";

                        return (
                          <div className={gridClass}>
                            {shuffledOptionKeys.map((originalKey, index) => {
                              const displayLetter = displayLetters[index] || originalKey;
                              const opt = dec.options[originalKey];
                              if (!opt) return null;
                              const cleanLabel = cleanOptionLabel(opt.label);

                              return (
                                <button
                                  key={`${originalKey}-${index}`}
                                  type="button"
                                  onClick={() => handleSelectOption(originalKey)}
                                  className={`group relative text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all duration-250 ease-out cursor-pointer flex items-center gap-3.5 sm:gap-4 shadow-xs hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1.5 active:scale-[0.98] z-0 hover:z-10 ${isInstagramDM
                                      ? "border-slate-200 bg-white hover:bg-slate-900 text-slate-900 hover:text-white hover:border-slate-900 hover:shadow-purple-500/15"
                                      : isMarketplace
                                        ? "border-slate-200 bg-white hover:bg-[#0084FF] hover:border-[#0084FF] text-slate-900 hover:text-white hover:shadow-[#0084FF]/25"
                                        : "border-[#9DB2BF]/50 bg-white hover:bg-[#27374D] hover:border-[#27374D] text-[#27374D] hover:text-white hover:shadow-[#27374D]/30"
                                    }`}
                                >
                                  {/* Badge Huruf Bulat Tampilan (A, B, C berurutan rapi untuk pengguna) */}
                                  <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all duration-200 shadow-2xs group-hover:shadow-md shrink-0 ${isInstagramDM
                                        ? "bg-slate-100 text-slate-800 border border-slate-200 group-hover:bg-white group-hover:text-slate-900 group-hover:border-white"
                                        : isMarketplace
                                          ? "bg-sky-100 text-[#0084FF] border border-sky-200 group-hover:bg-white group-hover:text-[#0084FF] group-hover:border-white"
                                          : "bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/40 group-hover:bg-white group-hover:text-[#27374D] group-hover:border-white"
                                      }`}
                                  >
                                    {displayLetter}
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
                  <p className="text-[10px] text-[#DDE6ED]/75 font-sans">
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
