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
  ChevronRight,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { addNotification } from "../../lib/notificationService";

export interface ScenarioEvidence {
  id: string;
  label: string;
  isRedFlag: boolean;
  explanation: string;
}

export interface ScenarioChoice {
  id: string;
  label: string;
  score: number;
  feedback: string;
  isCorrect: boolean;
}

export interface ScenarioCase {
  id: string;
  title: string;
  category: string;
  channel: string;
  levelLabel: string;
  levelBadge: string;
  dotColor: string;
  duration: string;
  stepsCount: number;
  description: string;
  icon?: any;
  bgImage?: string;
  centerImage?: string;
  storyCards?: string[];
  senderName: string;
  senderAddress: string;
  messageText: string;
  attachmentName?: string;
  attachmentSize?: string;
  briefing: string[];
  evidences: ScenarioEvidence[];
  choices: ScenarioChoice[];
  flagCode: string;
  learningPoint: string;
}

type BranchType = null | "A" | "B" | "B1" | "B2" | "C";

interface ChatMessage {
  id: string;
  sender: "attacker" | "user" | "system" | "bank" | "call";
  text?: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: "apk";
  };
  systemCard?: {
    type: "warning" | "danger" | "success" | "call";
    title: string;
    body: string;
  };
}

interface FakeChatSimulatorProps {
  scenario: ScenarioCase;
  onBack: () => void;
  onNavigateTab?: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function FakeChatSimulator({
  scenario,
  onBack,
  onNavigateTab,
}: FakeChatSimulatorProps) {
  // Chat stream messages state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeBranch, setActiveBranch] = useState<BranchType>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedFlag, setCopiedFlag] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Deteksi scroll ke atas/bawah
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    setShowScrollDown(distanceToBottom > 120);
  };

  // Auto-scroll when messages update
  const scrollToBottom = (smooth = true) => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  };

  // Initialize opening conversation
  useEffect(() => {
    initChat();
  }, [scenario]);

  const initChat = () => {
    setActiveBranch(null);
    setIsTyping(false);
    setIsCompleted(false);
    setCopiedFlag(false);

    const initialMessages: ChatMessage[] = [
      {
        id: "msg-0",
        sender: "system",
        timestamp: "09:40",
        text: "🔒 Pesan ini berasal dari kontak yang tidak tersimpan (+62 812-7788-9901). Harap waspada terhadap berkas atau tautan asing.",
      },
      {
        id: "msg-1",
        sender: "attacker",
        timestamp: "09:41",
        text: "Halo kak! Apa kabar? Mohon maaf lahir batin ya kak mengabari mendadak lewat WA... 🙏",
      },
      {
        id: "msg-2",
        sender: "attacker",
        timestamp: "09:41",
        text: "Alhamdulillah bulan depan kami sekeluarga bermaksud melangsungkan akad dan resepsi pernikahan. Kami sangat mengharapkan kehadiran kak sekeluarga.",
      },
      {
        id: "msg-3",
        sender: "attacker",
        timestamp: "09:42",
        text: "Undangan digital resmi beserta denah lokasi dan barcode buku tamu sudah dirangkum di berkas ini ya kak, mohon dibuka dan mohon doanya ya kak 🙏",
        attachment: {
          name: scenario.attachmentName || "Surat_Undangan_Pernikahan_Digital.apk",
          size: scenario.attachmentSize || "7.8 MB",
          type: "apk",
        },
      },
    ];

    setMessages(initialMessages);
  };

  // Effect to scroll down smoothly whenever messages or typing state change
  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isTyping, activeBranch]);

  // Handle Main Choices [A], [B], [C]
  const handleSelectChoice = (branch: "A" | "B" | "C") => {
    if (activeBranch !== null) return;
    setActiveBranch(branch);
    setIsTyping(true);

    if (branch === "A") {
      // User picks A: gegabah / langsung unduh & pasang
      const userMsg: ChatMessage = {
        id: `user-a-${Date.now()}`,
        sender: "user",
        timestamp: "09:43",
        text: "Wah selamat ya kak! Iya ini aku unduh dan pasang aplikasinya sekarang ya biar tahu tanggal dan tempatnya.",
      };
      setMessages((prev) => [...prev, userMsg]);

      // Delay 1: Attacker responds enthusiastically asking to grant permissions
      setTimeout(() => {
        const attackerReply: ChatMessage = {
          id: `atk-a-1`,
          sender: "attacker",
          timestamp: "09:43",
          text: "Alhamdulillah terima kasih banyak kak! Oh iya, kalau nanti pas pasang muncul notifikasi 'Izinkan sumber tidak dikenal' atau 'Akses SMS', di-klik IZINKAN / BOLEHKAN saja ya kak biar musik dan denahnya bisa terbuka normal 🙏",
        };
        setMessages((prev) => [...prev, attackerReply]);

        // Delay 2: Android permission alert system card
        setTimeout(() => {
          const systemAlert: ChatMessage = {
            id: `sys-a-perm`,
            sender: "system",
            timestamp: "09:44",
            systemCard: {
              type: "warning",
              title: "⚠️ Peringatan Sistem Android: Izin Berbahaya Diminta",
              body: "Aplikasi 'Undangan Pernikahan' meminta hak akses penuh: READ_SMS & RECEIVE_SMS (Membaca dan menyadap pesan SMS masuk secara latar belakang).",
            },
          };
          setMessages((prev) => [...prev, systemAlert]);

          // Delay 3: User installs and notices glitch
          setTimeout(() => {
            const userMsg2: ChatMessage = {
              id: `user-a-2`,
              sender: "user",
              timestamp: "09:44",
              text: "Kak, sudah aku instal dan izinkan, tapi kok layarnya blank putih terus langsung menutup sendiri ya?",
            };
            setMessages((prev) => [...prev, userMsg2]);

            // Delay 4: Attacker stalls and blocks
            setTimeout(() => {
              const attackerReply2: ChatMessage = {
                id: `atk-a-2`,
                sender: "attacker",
                timestamp: "09:45",
                text: "Oh itu sedang sinkronisasi data kak, tunggu 5 menit ya jangan dibuka dulu...",
              };
              setMessages((prev) => [...prev, attackerReply2]);

              // Delay 5: Bank SMS OTP Sniffed Notification & Resolution
              setTimeout(() => {
                const bankAlert: ChatMessage = {
                  id: `bank-alert-a`,
                  sender: "bank",
                  timestamp: "09:46",
                  systemCard: {
                    type: "danger",
                    title: "🚨 NOTIFIKASI BANK (SMS DI-INTERCEPT): TRANSFER BERHASIL",
                    body: "SMS DARI BANK: Transfer dana Rp 7.500.000 ke VA 8820199042 BERHASIL menggunakan kode OTP 829103. Sisa saldo tabungan Anda: Rp 14.500.",
                  },
                };
                setMessages((prev) => [...prev, bankAlert]);
                setIsTyping(false);
                setIsCompleted(true);

                addNotification({
                  title: `Hasil Skenario A: ${scenario.title}`,
                  message:
                    "Peringatan! Berkas .apk yang dipasang menyadap SMS OTP perbankan Anda. Segera amankan perangkat dan blokir rekening.",
                  type: "waspada",
                  link: "/belajar?tab=simulator",
                });
              }, 1200);
            }, 1000);
          }, 1100);
        }, 1000);
      }, 900);
    } else if (branch === "B") {
      // User picks B: ragu / tanya format & minta foto biasa
      const userMsg: ChatMessage = {
        id: `user-b-${Date.now()}`,
        sender: "user",
        timestamp: "09:43",
        text: "Halo kak, mohon maaf ini siapa ya? Kok undangannya format .apk bukan link website atau foto JPG biasa? HP saya ada proteksi keamanan dan tidak bisa buka file instalasi aplikasi seperti ini. Boleh minta dikirim foto undangannya saja?",
      };
      setMessages((prev) => [...prev, userMsg]);

      // Delay 1: Attacker tries guilt-tripping & emotional manipulation
      setTimeout(() => {
        const attackerReply: ChatMessage = {
          id: `atk-b-1`,
          sender: "attacker",
          timestamp: "09:44",
          text: "Waduh kak, ini bukan foto biasa... Ini undangan digital interaktif ada barcode khusus nama kak untuk akses pintu resepsi dan ada lagu iringannya, makanya vendor kami buat dalam bentuk aplikasi APK. Gak ada virus sama sekali kok kak, saya jamin aman 100%. Tolong dicoba buka dulu ya kak, masa acara nikahan sahabat sendiri gak mau buka...",
        };
        setMessages((prev) => [...prev, attackerReply]);
        setIsTyping(false);
      }, 1000);
    } else if (branch === "C") {
      // User picks C: waspada penuh / tolak & verifikasi mandiri
      const userMsg: ChatMessage = {
        id: `user-c-${Date.now()}`,
        sender: "user",
        timestamp: "09:43",
        text: "Maaf, nomor ini tidak ada di daftar kontak saya dan saya tidak pernah membuka berkas .apk dari chat WhatsApp. Saya akan konfirmasi langsung ke nomor telepon pribadi rekan/keluarga saya via panggilan suara biasa.",
      };
      setMessages((prev) => [...prev, userMsg]);

      // Delay 1: Attacker panics / silent
      setTimeout(() => {
        const systemNotice: ChatMessage = {
          id: `sys-c-tick`,
          sender: "system",
          timestamp: "09:44",
          text: "⏱️ Pengirim tidak merespons. Status pesan hanya centang satu dan foto profil pengirim mendadak hilang.",
        };
        setMessages((prev) => [...prev, systemNotice]);

        // Delay 2: Out-of-band call confirmation card
        setTimeout(() => {
          const callEvent: ChatMessage = {
            id: `call-c-outband`,
            sender: "call",
            timestamp: "09:45",
            systemCard: {
              type: "success",
              title: "📞 Panggilan Verifikasi Mandiri (Out-of-Band) Berhasil",
              body: "Kamu menghubungi nomor asli temanmu via panggilan GSM. Temanmu kaget dan menjawab: 'Hah? Aku gak lagi nikah bulan depan, dan nomor WA-ku tetap yang ini kok. Jangan dibuka sama sekali, itu penipuan yang lagi marak mencatut nama orang!'",
            },
          };
          setMessages((prev) => [...prev, callEvent]);

          // Delay 3: User blocks & reports
          setTimeout(() => {
            const blockNotice: ChatMessage = {
              id: `sys-c-block`,
              sender: "system",
              timestamp: "09:45",
              text: "🛡️ Kamu berhasil memblokir nomor +62 812-7788-9901 dan melaporkannya sebagai Spam/Phishing ke kanal AduanNomor Komdigi.",
            };
            setMessages((prev) => [...prev, blockNotice]);
            setIsTyping(false);
            setIsCompleted(true);

            addNotification({
              title: `Hasil Skenario C: ${scenario.title}`,
              message:
                "Luar biasa! Kamu menerapkan prinsip Zero-Trust dan verifikasi Out-of-Band dengan sempurna. Ancaman berhasil digagalkan!",
              type: "sukses",
              link: "/belajar?tab=simulator",
            });
          }, 1000);
        }, 1100);
      }, 1000);
    }
  };

  // Sub-choices for branch B (B1: Tetap tolak, B2: Goyah & pasang)
  const handleSubChoiceB = (subChoice: "B1" | "B2") => {
    setActiveBranch(subChoice);
    setIsTyping(true);

    if (subChoice === "B1") {
      const userMsg: ChatMessage = {
        id: `user-b1-${Date.now()}`,
        sender: "user",
        timestamp: "09:45",
        text: "Tetap tidak bisa kak. Standar keamanan tidak mengizinkan instalasi APK di luar Google Play Store. Jika memang ingin mengundang, silakan kirim tautan website resmi atau kartu gambar biasa.",
      };
      setMessages((prev) => [...prev, userMsg]);

      setTimeout(() => {
        const attackerAngry: ChatMessage = {
          id: `atk-b1-angry`,
          sender: "attacker",
          timestamp: "09:46",
          text: "Yaudah kalau gak percaya! Sombong banget sekarang...",
        };
        const systemBlocked: ChatMessage = {
          id: `sys-b1-block`,
          sender: "system",
          timestamp: "09:46",
          text: "🚫 Pengirim memblokir Anda. Berkas .apk tidak sempat terpasang di perangkat.",
        };
        setMessages((prev) => [...prev, attackerAngry, systemBlocked]);
        setIsTyping(false);
        setIsCompleted(true);

        addNotification({
          title: `Hasil Skenario B: ${scenario.title}`,
          message:
            "Hebat! Kamu berhasil mempertahankan pendirian dan menolak manipulasi rasa sungkan. Perangkatmu tetap terlindungi.",
          type: "sukses",
          link: "/belajar?tab=simulator",
        });
      }, 1000);
    } else {
      // B2: Goyah dan pasang
      const userMsg: ChatMessage = {
        id: `user-b2-${Date.now()}`,
        sender: "user",
        timestamp: "09:45",
        text: "Aduh yaudah deh kak, karena gak enak hati aku coba instal aplikasinya ya...",
      };
      setMessages((prev) => [...prev, userMsg]);

      setTimeout(() => {
        const systemAlert: ChatMessage = {
          id: `sys-b2-perm`,
          sender: "system",
          timestamp: "09:46",
          systemCard: {
            type: "danger",
            title: "🚨 Terjebak Manipulasi Emosional: Malware Aktif",
            body: "Karena rasa sungkan, kamu mengizinkan instalasi APK. Malware Trojan ATS langsung menyadap SMS perbankan dan data OTP kamu telah bocor ke server pelaku.",
          },
        };
        setMessages((prev) => [...prev, systemAlert]);
        setIsTyping(false);
        setIsCompleted(true);

        addNotification({
          title: `Hasil Skenario B: ${scenario.title}`,
          message:
            "Sayang sekali! Rasa sungkan membuat pertahananmu runtuh. Pelaku memanfaatkan rasa tidak enak hati untuk melancarkan serangan.",
          type: "waspada",
          link: "/belajar?tab=simulator",
        });
      }, 1100);
    }
  };

  const handleCopyFlag = () => {
    if (scenario.flagCode) {
      navigator.clipboard?.writeText(scenario.flagCode);
      setCopiedFlag(true);
      setTimeout(() => setCopiedFlag(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 select-none">
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
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold border ${scenario.levelBadge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${scenario.dotColor}`} />
            {scenario.levelLabel}
          </span>
          <button
            type="button"
            onClick={initChat}
            title="Ulangi simulasi dari awal"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#526D82] hover:text-[#27374D] bg-white border border-[#9DB2BF]/50 hover:bg-[#DDE6ED]/50 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Main Container Simulator (Fake Chat Layout bergaya Visual Novel / Messenger) */}
      <div className="rounded-3xl border border-[#9DB2BF]/60 bg-white shadow-xl overflow-hidden flex flex-col">
        {/* Chat App Header Bar (Gaya WhatsApp / Secure Messenger) */}
        <div className="bg-[#27374D] text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            {/* Avatar Pengirim */}
            <div className="relative">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-amber-600 to-rose-500 flex items-center justify-center font-bold text-white text-sm shadow-md ring-2 ring-white/20">
                <span>?</span>
              </div>
              {/* Online/Alert Status Badge */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#27374D]" />
            </div>

            {/* Nama & Status Kontak */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-white tracking-wide">
                  {scenario.senderAddress}
                </span>
                <span className="rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider">
                  Tidak Ada di Kontak
                </span>
              </div>
              <span className="text-[11px] text-[#DDE6ED]/70 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online · Terakhir dilihat 09:42</span>
              </span>
            </div>
          </div>

          {/* Sisi Kanan Header: Info Skenario */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400/30">
              Kasus K1 · Phishing APK
            </span>
          </div>
        </div>

        {/* Polaroid Context / Briefing Banner (Sesuai Gaya Visual Referensi Pengguna) */}
        <div className="bg-[#F0F4F8] border-b border-[#9DB2BF]/30 px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between gap-3 text-xs text-[#526D82]">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-[#526D82] shrink-0" />
            <p className="line-clamp-1 sm:line-clamp-none">
              <strong className="text-[#27374D]">Misi Simulasi:</strong> Analisis pesan
              undangan masuk dan pilih respons di panel bawah untuk melihat dampaknya.
            </p>
          </div>
          <span className="text-[11px] font-mono font-medium text-[#526D82] shrink-0">
            Scroll ke atas untuk lihat riwayat 💬
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
              Hari ini
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
                      <p className="leading-relaxed text-[11px] opacity-90">
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
                        {msg.systemCard?.title || "PERINGATAN BANK"}
                      </span>
                      <span className="text-[10px] text-rose-300 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-rose-100 font-medium leading-relaxed">
                      {msg.systemCard?.body}
                    </p>
                  </div>
                </div>
              );
            }

            if (msg.sender === "call") {
              return (
                <div key={msg.id} className="flex justify-center my-3">
                  <div className="w-full max-w-lg rounded-2xl p-4 bg-emerald-900 text-white border-2 border-emerald-400 shadow-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-emerald-700 pb-2">
                      <span className="flex items-center gap-2 text-xs font-black text-emerald-300 uppercase tracking-wider">
                        <Phone className="h-4 w-4 text-emerald-300" />
                        {msg.systemCard?.title}
                      </span>
                      <span className="text-[10px] text-emerald-200 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                      {msg.systemCard?.body}
                    </p>
                  </div>
                </div>
              );
            }

            // Attacker Bubble (Left)
            if (msg.sender === "attacker") {
              return (
                <div key={msg.id} className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
                  {/* Avatar Attacker */}
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-600 to-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mb-1 shadow-xs">
                    ?
                  </div>

                  {/* Speech Bubble */}
                  <div className="rounded-2xl rounded-bl-xs bg-white p-3.5 border border-[#9DB2BF]/50 shadow-sm space-y-2 text-[#27374D]">
                    {msg.text && (
                      <p className="text-xs sm:text-[13px] leading-relaxed font-normal">
                        {msg.text}
                      </p>
                    )}

                    {/* Lampiran Kartu Berkas APK WhatsApp */}
                    {msg.attachment && (
                      <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 space-y-2 mt-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-rose-600 text-white flex flex-col items-center justify-center font-mono font-black text-[10px] shadow-xs">
                            <FileCode className="h-5 w-5" />
                            <span>APK</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-xs text-rose-950 truncate">
                              {msg.attachment.name}
                            </span>
                            <span className="block text-[10px] text-rose-700 font-medium">
                              {msg.attachment.size} · Berkas Paket Aplikasi Android
                            </span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
                            <Download className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-800 bg-rose-100/70 px-2.5 py-1 rounded-md">
                          <AlertTriangle className="h-3 w-3 text-rose-600 shrink-0" />
                          <span>Tanda Bahaya: Ekstensi mentah .apk dikirim langsung via chat</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <span className="text-[10px] text-[#526D82] font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // User Bubble (Right)
            return (
              <div
                key={msg.id}
                className="flex items-end justify-end gap-2 max-w-[85%] sm:max-w-[75%] ml-auto"
              >
                {/* Speech Bubble */}
                <div className="rounded-2xl rounded-br-xs bg-[#27374D] p-3.5 text-white shadow-sm space-y-1">
                  <p className="text-xs sm:text-[13px] leading-relaxed font-normal">
                    {msg.text}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-[#DDE6ED]/70 font-mono">
                    <span>{msg.timestamp}</span>
                    <CheckCheck className="h-3.5 w-3.5 text-sky-400" />
                  </div>
                </div>

                {/* Avatar User */}
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
                  Sedang mengetik...
                </span>
              </div>
            </div>
          )}

          {/* KOTAK DEBRIEF & SOLUSI YANG SESUAI PILIHAN (MUNCUL DI DALAM CHAT) */}
          {isCompleted && (
            <div className="pt-4 pb-2 animate-fadeIn">
              {activeBranch === "A" && (
                <div className="rounded-3xl border-2 border-rose-400 bg-white p-5 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md">
                      <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 uppercase tracking-wide border border-rose-300">
                          Hasil Pilihan A · Skor 0 / 100
                        </span>
                        <span className="text-xs font-bold text-rose-600">Pelanggaran Kritis</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#27374D] mt-0.5">
                        Penyelesaian Alur A: Rekening Berhasil Dibobol Malware ATS
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-[#27374D]">
                    <p className="leading-relaxed">
                      <strong>Mengapa ini terjadi:</strong> Kamu tergoda rasa penasaran dan langsung
                      memasang berkas .apk. Pelaku menyelipkan <em>Trojan Perbankan SMS Sniffer</em>.
                      Saat kamu memberikan izin <code>READ_SMS</code>, malware langsung membaca kode OTP
                      transaksi perbankan secara diam-diam tanpa sepengetahuanmu.
                    </p>

                    <div className="rounded-2xl bg-rose-50 p-4 border border-rose-200 space-y-2">
                      <h4 className="font-black text-rose-950 uppercase tracking-wider text-[11px]">
                        Langkah Penyelamatan Darurat (Solusi Skenario A):
                      </h4>
                      <ol className="list-decimal list-inside space-y-1.5 text-rose-900 leading-relaxed">
                        <li>
                          <strong>Segera Nyalakan Mode Pesawat (Airplane Mode)</strong> untuk memutus
                          koneksi internet dan transmisi data malware ke server penipu.
                        </li>
                        <li>
                          <strong>Hubungi Call Center Resmi Bank</strong> (misal via telepon kabel atau HP
                          lain) untuk segera memblokir akun m-banking dan membekukan rekening.
                        </li>
                        <li>
                          <strong>Pindahkan SIM Card ke HP Lain (Dumbphone/Ponsel Aman)</strong> agar SMS
                          dan OTP tidak lagi diterima oleh sistem Android yang terinfeksi.
                        </li>
                        <li>
                          <strong>Lakukan Reset Pabrik (Factory Reset)</strong> pada ponsel untuk
                          membersihkan malware yang tertanam hingga ke akar sistem.
                        </li>
                      </ol>
                    </div>
                  </div>

                  {/* Flag Code & Aksi */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DDE6ED]">
                    <div className="flex items-center gap-2 text-xs text-[#526D82]">
                      <span className="font-bold text-[#27374D]">Flag Bukti:</span>
                      <code className="bg-[#DDE6ED] px-2.5 py-1 rounded-md text-[11px] font-mono text-[#27374D] font-bold">
                        {scenario.flagCode}
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
                        Coba Pilihan Lain (B atau C)
                      </button>
                      <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#DDE6ED] text-[#27374D] hover:bg-[#9DB2BF]/40 text-xs font-bold transition-all cursor-pointer border border-[#9DB2BF]/60"
                      >
                        Selesai & Keluar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {(activeBranch === "B" || activeBranch === "B1" || activeBranch === "B2") && (
                <div className="rounded-3xl border-2 border-amber-400 bg-white p-5 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-3 border-b border-amber-100 pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
                      {activeBranch === "B1" ? (
                        <ShieldCheck className="h-6 w-6" />
                      ) : (
                        <ShieldAlert className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 uppercase tracking-wide border border-amber-300">
                          Hasil Pilihan B · Skor {activeBranch === "B1" ? "80 / 100" : "40 / 100"}
                        </span>
                        <span className="text-xs font-bold text-amber-700">
                          {activeBranch === "B1"
                            ? "Waspada Tinggi (Lolos Uji Manipulasi)"
                            : "Goyah karena Rasa Sungkan"}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#27374D] mt-0.5">
                        {activeBranch === "B1"
                          ? "Penyelesaian Alur B: Sukses Menolak Trik Manipulasi Guilt-Tripping"
                          : "Penyelesaian Alur B: Rasa Sungkan Menjadi Pintu Masuk Peretasan"}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-[#27374D]">
                    <p className="leading-relaxed">
                      <strong>Analisis Alur B:</strong> Pelaku menggunakan taktik rekayasa sosial{" "}
                      <em>Guilt-Tripping</em> (memanfaatkan rasa sungkan dan pertemanan) untuk memaksamu
                      mengabaikan akal sehat. Pelaku berdalih bahwa undangan APK tersebut memiliki barcode
                      khusus dan musik.
                    </p>

                    <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 space-y-2">
                      <h4 className="font-black text-amber-950 uppercase tracking-wider text-[11px]">
                        Solusi & Kaidah Keamanan (Solusi Skenario B):
                      </h4>
                      <ul className="list-disc list-inside space-y-1.5 text-amber-900 leading-relaxed">
                        <li>
                          <strong>Prinsip Nol Toleransi Berkas APK:</strong> Tidak ada resepsi pernikahan
                          yang sah yang mewajibkan tamu memasang installer aplikasi .apk. Undangan resmi
                          selalu berupa link web aman atau kartu gambar/video biasa.
                        </li>
                        <li>
                          <strong>Abaikan Rasa Sungkan:</strong> Penipu sengaja memposisikan diri seolah
                          sahabat akrab agar kamu merasa tidak enak hati menolak.
                        </li>
                        <li>
                          <strong>Blokir & Laporkan:</strong> Segera laporkan nomor ke pihak penyedia pesan
                          instan sebagai nomor penipuan agar akun pelaku dinonaktifkan.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Flag Code & Aksi */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DDE6ED]">
                    <div className="flex items-center gap-2 text-xs text-[#526D82]">
                      <span className="font-bold text-[#27374D]">Flag Bukti:</span>
                      <code className="bg-[#DDE6ED] px-2.5 py-1 rounded-md text-[11px] font-mono text-[#27374D] font-bold">
                        {scenario.flagCode}
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
                        Coba Pilihan Lain (A atau C)
                      </button>
                      <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#DDE6ED] text-[#27374D] hover:bg-[#9DB2BF]/40 text-xs font-bold transition-all cursor-pointer border border-[#9DB2BF]/60"
                      >
                        Selesai & Keluar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeBranch === "C" && (
                <div className="rounded-3xl border-2 border-emerald-400 bg-white p-5 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-3 border-b border-emerald-100 pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 uppercase tracking-wide border border-emerald-300">
                          Hasil Pilihan C · Skor 100 / 100
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          Pertahanan Sempurna (S-Rank)
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#27374D] mt-0.5">
                        Penyelesaian Alur C: Terapkan Verifikasi Out-of-Band & Zero-Trust
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-[#27374D]">
                    <p className="leading-relaxed">
                      <strong>Keputusan Terbaik:</strong> Kamu menerapkan strategi pertahanan siber paling
                      efektif: <em>Out-of-Band Verification</em> (verifikasi melalui saluran alternatif
                      terpisah). Dengan menelepon teman secara langsung lewat nomor seluler biasa, kamu
                      berhasil membongkar bahwa pelaku hanya mencatut nama orang lain.
                    </p>

                    <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 space-y-2">
                      <h4 className="font-black text-emerald-950 uppercase tracking-wider text-[11px]">
                        Solusi & Tindakan Lanjutan (Solusi Skenario C):
                      </h4>
                      <ul className="list-disc list-inside space-y-1.5 text-emerald-900 leading-relaxed">
                        <li>
                          <strong>Verifikasi Mandiri:</strong> Selalu konfirmasi informasi sensitif atau
                          undangan yang mencurigakan ke pihak terkait via telepon langsung.
                        </li>
                        <li>
                          <strong>Laporkan Nomor Penipu:</strong> Laporkan nomor tersebut ke layanan resmi
                          Komdigi via <code>aduannomor.id</code> agar nomor telepon pelaku diblokir oleh
                          seluruh operator seluler di Indonesia.
                        </li>
                        <li>
                          <strong>Edukasi Lingkungan Sekitar:</strong> Beri tahu keluarga atau grup percakapan
                          bahwa sedang beredar modus pencatutan nama untuk penyebaran malware APK pernikahan.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Flag Code & Aksi */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DDE6ED]">
                    <div className="flex items-center gap-2 text-xs text-[#526D82]">
                      <span className="font-bold text-[#27374D]">Flag Bukti:</span>
                      <code className="bg-[#DDE6ED] px-2.5 py-1 rounded-md text-[11px] font-mono text-[#27374D] font-bold">
                        {scenario.flagCode}
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
                        Coba Pilihan Lain (A atau B)
                      </button>
                      <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                      >
                        Selesai & Lanjut Modul
                      </button>
                    </div>
                  </div>
                </div>
              )}
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

          {/* Anchor untuk auto-scroll */}
          <div ref={chatEndRef} />
        </div>

        {/* BOTTOM INTERACTIVE CHOICES DOCK (PILIHAN A, B, C) */}
        <div className="border-t border-[#9DB2BF]/50 bg-white p-4 sm:p-5 shadow-lg">
          {activeBranch === null && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#27374D] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Pilih Tindakanmu (Tentukan Alur Skenario):</span>
                </span>
                <span className="text-[11px] text-[#526D82] font-medium hidden sm:inline">
                  Tiap pilihan memiliki alur & konsekuensi berbeda
                </span>
              </div>

              {/* 3 Tombol Pilihan A, B, C */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* PILIHAN A */}
                <button
                  type="button"
                  onClick={() => handleSelectChoice("A")}
                  className="group text-left p-3.5 rounded-2xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 active:scale-[0.99]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-rose-600 text-white text-xs font-black shadow-xs">
                        A
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                        Gegabah / Pasang
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#27374D] group-hover:text-rose-950 transition-colors leading-snug">
                      Langsung unduh dan pasang berkas .apk undangan
                    </p>
                  </div>
                  <span className="text-[10px] text-[#526D82] leading-tight">
                    Penasaran ingin melihat siapa yang menikah dan denah acaranya.
                  </span>
                </button>

                {/* PILIHAN B */}
                <button
                  type="button"
                  onClick={() => handleSelectChoice("B")}
                  className="group text-left p-3.5 rounded-2xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 active:scale-[0.99]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-amber-500 text-white text-xs font-black shadow-xs">
                        B
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        Ragu / Minta Foto
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#27374D] group-hover:text-amber-950 transition-colors leading-snug">
                      Tanyakan kenapa format .apk & minta foto/web biasa
                    </p>
                  </div>
                  <span className="text-[10px] text-[#526D82] leading-tight">
                    Ragu karena undangan semestinya link website atau file gambar.
                  </span>
                </button>

                {/* PILIHAN C */}
                <button
                  type="button"
                  onClick={() => handleSelectChoice("C")}
                  className="group text-left p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 active:scale-[0.99]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-emerald-600 text-white text-xs font-black shadow-xs">
                        C
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                        Waspada / Verifikasi
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#27374D] group-hover:text-emerald-950 transition-colors leading-snug">
                      Tolak buka file & verifikasi mandiri via telepon biasa
                    </p>
                  </div>
                  <span className="text-[10px] text-[#526D82] leading-tight">
                    Waspada tinggi terhadap nomor asing dan potensi malware APK.
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Sub-pilihan untuk alur B (jika pelaku mendesak / guilt-tripping) */}
          {activeBranch === "B" && !isCompleted && !isTyping && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>Pelaku Mendesak dengan Rasa Sungkan! Tindakanmu selanjutnya:</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSubChoiceB("B1")}
                  className="p-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-left transition-all cursor-pointer space-y-1"
                >
                  <span className="text-xs font-black text-emerald-900 block">
                    B.1) Tetap Tegas Menolak:
                  </span>
                  <p className="text-xs text-emerald-800">
                    "Maaf aturan HP saya melarang APK selain dari Play Store. Kirim foto/link web atau
                    saya tidak bisa hadir."
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => handleSubChoiceB("B2")}
                  className="p-3 rounded-2xl border-2 border-rose-300 bg-rose-50 hover:bg-rose-100 text-left transition-all cursor-pointer space-y-1"
                >
                  <span className="text-xs font-black text-rose-900 block">
                    B.2) Goyah karena Tidak Enak Hati:
                  </span>
                  <p className="text-xs text-rose-800">
                    "Merasa tidak enak karena mengaku sahabat lama, lalu mencoba mengunduh APK."
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Status saat alur selesai */}
          {isCompleted && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526D82]">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>
                  Alur simulasi untuk pilihan <strong>{activeBranch}</strong> telah selesai. Kamu dapat
                  scroll ke atas untuk membaca kembali seluruh obrolan.
                </span>
              </span>
              <button
                type="button"
                onClick={initChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold cursor-pointer transition-all shadow-md shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Coba Pilihan Lainnya</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
