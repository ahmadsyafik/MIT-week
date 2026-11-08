import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Hash,
  Plus,
  Video,
  Users,
  Clock,
  MessageSquare,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ChevronRight,
  Volume1,
  X,
} from "lucide-react";
import type { FiveStepScenarioData } from "../../mocks/fiveStepScenarios";

// Audio synthesizer mandiri tanpa file eksternal (100% on-device Web Audio API)
class NativeCallAudio {
  private ctx: AudioContext | null = null;
  private ringTimer: number | null = null;
  private isRingingActive: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx || this.ctx.state === "closed") {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  playRingTone() {
    if (!this.isRingingActive) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(440, ctx.currentTime);
      osc2.frequency.setValueAtTime(480, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.2);
      osc2.stop(ctx.currentTime + 1.2);
    } catch {
      // Safe fallback
    }
  }

  startRinging() {
    this.stopRinging();
    this.isRingingActive = true;
    this.playRingTone();
    if (typeof window !== "undefined") {
      this.ringTimer = window.setInterval(() => {
        if (!this.isRingingActive) {
          this.stopRinging();
          return;
        }
        this.playRingTone();
      }, 3000);
    }
  }

  stopRinging() {
    this.isRingingActive = false;
    if (this.ringTimer !== null && typeof window !== "undefined") {
      window.clearInterval(this.ringTimer);
      this.ringTimer = null;
    }
  }

  playHangupTone() {
    this.stopRinging();
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Safe fallback
    }
  }

  playClick() {
    if (this.isRingingActive) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  cleanup() {
    this.stopRinging();
    if (this.ctx) {
      try {
        this.ctx.close().catch(() => {});
      } catch {}
      this.ctx = null;
    }
  }
}

export interface PhoneCallSimulatorProps {
  scenario: FiveStepScenarioData;
  onCompleteCall: (selectedChoice: "A" | "B" | "C", durationSeconds: number) => void;
  onDeclineCall?: () => void;
}

export function PhoneCallSimulator({
  scenario,
  onCompleteCall,
  onDeclineCall,
}: PhoneCallSimulatorProps) {
  const [callPhase, setCallPhase] = useState<"incoming" | "active" | "ended">("incoming");
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dialogueStep, setDialogueStep] = useState(1);
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadInput, setKeypadInput] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<"A" | "B" | "C" | null>(null);
  const [userVoiceText, setUserVoiceText] = useState<string | null>(null);
  const [attackerVoiceReply, setAttackerVoiceReply] = useState<string | null>(null);

  const audioRef = useRef<NativeCallAudio | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const dialogueTimerRef = useRef<number | null>(null);

  // Inisialisasi audio synth mandiri
  useEffect(() => {
    audioRef.current = new NativeCallAudio();

    return () => {
      // Pastikan audio dimatikan total saat komponen unmount atau sesi telepon selesai
      audioRef.current?.cleanup();
      audioRef.current = null;
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      if (dialogueTimerRef.current) {
        clearInterval(dialogueTimerRef.current);
        dialogueTimerRef.current = null;
      }
    };
  }, []);

  // Update ringtone status: HANYA berdering selama sesi panggilan masuk & suara aktif
  useEffect(() => {
    if (callPhase === "incoming" && soundEnabled) {
      audioRef.current?.startRinging();
    } else {
      audioRef.current?.stopRinging();
    }
  }, [soundEnabled, callPhase]);

  // Hentikan dering jika tab browser tidak aktif / diminimalkan
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current?.stopRinging();
      } else if (callPhase === "incoming" && soundEnabled) {
        audioRef.current?.startRinging();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [callPhase, soundEnabled]);

  // Transkripsi suara dialog penipu bank
  const dialogueLines = [
    {
      step: 1,
      speaker: scenario.senderName,
      text: "Selamat siang Bapak/Ibu nasabah, saya dari Divisi Keamanan Bank X.",
      time: "00:01",
    },
    {
      step: 2,
      speaker: scenario.senderName,
      text: "Sistem kami baru saja mendeteksi anomali transfer mencurigakan sebesar Rp4.500.000 keluar dari rekening Anda.",
      time: "00:03",
    },
    {
      step: 3,
      speaker: scenario.senderName,
      text: "Demi membatalkan transaksi tidak sah ini, kami telah mengirimkan 6-digit kode OTP ke nomor SMS Anda. Mohon sebutkan kodenya sekarang juga agar kami blokir transaksinya!",
      time: "00:06",
    },
  ];

  // Helper pembersih label opsi
  const cleanOptionLabel = (rawLabel: string): string => {
    return rawLabel
      .replace(/^Pilihan\s+[A-Z]\s*\((?:Berisiko|Aman)\)\s*[—–-]\s*/i, "")
      .replace(/\s*\((?:Berisiko|Aman)\)/gi, "")
      .replace(/^[A-C]\.\s*[-–—]?\s*/i, "")
      .trim();
  };

  // 1. Aksi Menjawab Panggilan (Interaktif oleh User)
  const handleAnswerCall = () => {
    audioRef.current?.stopRinging();
    audioRef.current?.playClick();
    setCallPhase("active");
    setDurationSeconds(1);

    // Jalankan timer durasi panggilan
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = window.setInterval(() => {
      setDurationSeconds((prev) => prev + 1);
    }, 1000);

    // Progresi dialog penipu otomatis bertahap
    dialogueTimerRef.current = window.setInterval(() => {
      setDialogueStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 2800);
  };

  // 2. Aksi Menolak Panggilan Masuk (Langsung safe)
  const handleDeclineIncoming = () => {
    audioRef.current?.playHangupTone();
    setCallPhase("ended");
    setSelectedChoice("C");
    setUserVoiceText("Panggilan ditolak seketika oleh pengguna.");
    setAttackerVoiceReply("[Panggilan Ditolak] Nomor asing yang meminta OTP langsung dihentikan sebelum tersambung.");
    // Tidak otomatis menutup atau mengulang, menunggu pengguna menekan tombol selesai
  };

  // 3. Aksi Memilih Opsi A, B, atau C saat panggilan aktif
  const handleSelectDecision = (choice: "A" | "B" | "C") => {
    if (callPhase === "ended") return;

    const dec = scenario.decisions[1];
    const opt = dec?.options[choice];
    if (!opt) return;

    audioRef.current?.playHangupTone();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (dialogueTimerRef.current) clearInterval(dialogueTimerRef.current);

    setSelectedChoice(choice);
    setUserVoiceText(opt.userReply);
    setAttackerVoiceReply(opt.attackerReply || opt.consequence);
    setCallPhase("ended");
    // Tidak otomatis menutup atau mengulang, menunggu pengguna menekan tombol selesai
  };

  // Format durasi MM:SS
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const decision1 = scenario.decisions[1];
  const availableChoices = useMemo(() => {
    if (!decision1) return [];
    const keys = (["A", "B", "C"] as const).filter((k) => decision1.options[k] !== undefined);
    // Fisher-Yates shuffle acak bebas pola
    const shuffled = [...keys];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [scenario.id]);

  return (
    <div className="relative w-full min-h-[720px] sm:min-h-[790px] flex-1 bg-[#121214] text-white flex flex-col justify-between overflow-hidden font-sans select-none animate-fadeIn">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top Bar Informasi Mockup & Toggle Suara */}
      <div className="relative z-10 px-6 py-2.5 flex items-center justify-between text-xs text-white/70 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full text-white/75 font-semibold font-sans">
            <span>Kanal Suara Aman (HD)</span>
          </span>
        </div>

        {/* Toggle Suara Nada Dering */}
        <button
          type="button"
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            audioRef.current?.playClick();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-[10px] font-medium transition-all cursor-pointer"
          title={soundEnabled ? "Matikan Nada Dering" : "Aktifkan Nada Dering"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3 h-3 text-emerald-400" />
              <span>Dering: Nyala</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 text-white/50" />
              <span>Dering: Senyap</span>
            </>
          )}
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 1. LAYAR PANGGILAN MASUK (INCOMING CALL - SEPERTI VIDEO REFERENSI)      */}
      {/* ===================================================================== */}
      {callPhase === "incoming" && (
        <div className="relative z-10 flex-1 flex flex-col justify-between px-6 py-10 sm:py-16 animate-fadeIn">
          {/* Info Penelepon Bersih & Minimalis */}
          <div className="text-center pt-8 sm:pt-14 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {scenario.senderName}
            </h2>
          </div>

          {/* Area Tengah Lapang Minimalis Modern persis iOS di Video Referensi */}
          <div className="flex-1" />

          {/* Tombol Aksi Cepat Bagian Atas (Ingatkan Saya / Pesan seperti iOS di Video) */}
          <div className="grid grid-cols-2 gap-10 max-w-xs mx-auto w-full mb-8 sm:mb-12">
            <button
              type="button"
              onClick={() => audioRef.current?.playClick()}
              className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-13 h-13 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <Clock className="w-5 h-5 text-white/90" />
              </div>
              <span className="text-[11px] font-medium">Ingatkan Saya</span>
            </button>

            <button
              type="button"
              onClick={() => audioRef.current?.playClick()}
              className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-13 h-13 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <MessageSquare className="w-5 h-5 text-white/90" />
              </div>
              <span className="text-[11px] font-medium">Pesan</span>
            </button>
          </div>

          {/* Area Interaktif Mengangkat Panggilan (Slide to answer / Tap to answer) */}
          <div className="space-y-4 max-w-sm mx-auto w-full pb-2">
            {/* Kapsul Geser / Ketuk untuk Menjawab yang Mewah */}
            <div
              onClick={handleAnswerCall}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleAnswerCall();
              }}
              className="group relative w-full h-16 sm:h-18 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 p-1.5 flex items-center justify-between cursor-pointer shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Tombol Hijau Berdenyut di Kiri */}
              <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.9)] transition-all shrink-0">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 animate-phone-shake" />
              </div>

              {/* Shimmering Text "Geser atau Ketuk untuk Menjawab" */}
              <div className="flex-1 text-center pr-4 relative overflow-hidden">
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide block">
                  Ketuk untuk Menjawab
                </span>
                <span className="text-[10px] text-white/60 flex items-center justify-center gap-1 mt-0.5">
                  <span>geser untuk mengangkat</span>
                  <ChevronRight className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <ChevronRight className="w-3 h-3 text-emerald-400 animate-pulse -ml-2" />
                </span>
                {/* Efek Garis Kilau Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep pointer-events-none" />
              </div>
            </div>

            {/* Alternatif Tombol Tolak Merah Bersih */}
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={handleDeclineIncoming}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <PhoneOff className="w-4 h-4 text-rose-400" />
                <span>Tolak Panggilan (Abaikan Penipu)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. LAYAR PANGGILAN AKTIF / SUDAH DIANGKAT (ACTIVE CALL IN-PROGRESS)   */}
      {/* ===================================================================== */}
      {callPhase === "active" && (
        <div className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-6 py-6 sm:py-8 animate-fadeIn overflow-y-auto">
          {/* Header Status Panggilan & Timer Berjalan */}
          <div className="text-center space-y-1.5 pt-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {scenario.senderName}
            </h2>

            {/* Timer Durasi & Status Berbicara */}
            <div className="flex items-center justify-center gap-2">
              <span className="font-sans font-bold tabular-nums text-xs sm:text-sm text-emerald-400 tracking-wider bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-500/30">
                {formatTimer(durationSeconds)}
              </span>

              {/* Sound Equalizer Gelombang Audio Berbicara */}
              <div className="flex items-center gap-1 h-6 px-2 bg-white/5 rounded-full">
                <span className="w-1 bg-emerald-400 rounded-full animate-eq-1" />
                <span className="w-1 bg-emerald-400 rounded-full animate-eq-2" />
                <span className="w-1 bg-emerald-400 rounded-full animate-eq-3" />
                <span className="w-1 bg-emerald-400 rounded-full animate-eq-4" />
                <span className="text-[10px] text-white/70 ml-1 font-medium font-sans">Bicara</span>
              </div>
            </div>
          </div>

          {/* Kotak Transkripsi Suara Langsung (Real-time Speech-to-Text Transkripsi) */}
          <div className="my-3 sm:my-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 shadow-xl space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider font-sans">
                Transkripsi Suara Panggilan
              </span>
              <span className="text-[10px] text-white/60 font-sans font-medium">
                Kanal Telepon Langsung
              </span>
            </div>

            {/* Bubble Dialog Penipu yang Sedang Bicara */}
            <div className="space-y-2.5 max-h-52 sm:max-h-60 overflow-y-auto pr-1">
              {dialogueLines
                .filter((line) => line.step <= dialogueStep)
                .map((line) => (
                  <div
                    key={line.step}
                    className="text-xs sm:text-[13px] leading-relaxed animate-fadeIn"
                  >
                    <span className="font-bold text-rose-300 text-[11px] sm:text-xs mr-1.5">
                      [Petugas Bank]:
                    </span>
                    <span className="text-white/90 font-medium">{line.text}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* 6 Tombol Bulat iOS In-Call (Sesuai Video Referensi pada detik 00:04) */}
          <div className="grid grid-cols-3 gap-y-4 gap-x-6 max-w-xs mx-auto w-full py-3">
            {/* Mute Button */}
            <button
              type="button"
              onClick={() => {
                setIsMuted(!isMuted);
                audioRef.current?.playClick();
              }}
              className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-all cursor-pointer group"
            >
              <div
                className={`w-13 h-13 rounded-full flex items-center justify-center transition-all ${
                  isMuted ? "bg-white text-[#121214]" : "bg-white/10 group-hover:bg-white/20 text-white"
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </div>
              <span className="text-[10px] font-medium">{isMuted ? "Bisu: Aktif" : "Bisu"}</span>
            </button>

            {/* Keypad Button */}
            <button
              type="button"
              onClick={() => {
                setShowKeypad(!showKeypad);
                audioRef.current?.playClick();
              }}
              className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-all cursor-pointer group"
            >
              <div
                className={`w-13 h-13 rounded-full flex items-center justify-center transition-all ${
                  showKeypad ? "bg-sky-500 text-white" : "bg-white/10 group-hover:bg-white/20 text-white"
                }`}
              >
                <Hash className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Keypad</span>
            </button>

            {/* Speaker Button */}
            <button
              type="button"
              onClick={() => {
                setIsSpeaker(!isSpeaker);
                audioRef.current?.playClick();
              }}
              className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-all cursor-pointer group"
            >
              <div
                className={`w-13 h-13 rounded-full flex items-center justify-center transition-all ${
                  isSpeaker ? "bg-emerald-500 text-white" : "bg-white/10 group-hover:bg-white/20 text-white"
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Speaker</span>
            </button>

            {/* Add Call Button */}
            <button
              type="button"
              onClick={() => audioRef.current?.playClick()}
              className="flex flex-col items-center gap-1.5 text-white/40 hover:text-white/60 transition-all cursor-not-allowed group"
            >
              <div className="w-13 h-13 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Tambah</span>
            </button>

            {/* FaceTime Button */}
            <button
              type="button"
              onClick={() => audioRef.current?.playClick()}
              className="flex flex-col items-center gap-1.5 text-white/40 hover:text-white/60 transition-all cursor-not-allowed group"
            >
              <div className="w-13 h-13 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">FaceTime</span>
            </button>

            {/* Contacts Button */}
            <button
              type="button"
              onClick={() => audioRef.current?.playClick()}
              className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-all cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Kontak</span>
            </button>
          </div>

          {/* Modal Mini Keypad jika tombol keypad ditekan */}
          {showKeypad && (
            <div className="my-2 p-3 bg-black/70 rounded-2xl border border-white/20 max-w-xs mx-auto w-full animate-fadeIn font-sans">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-white/70 font-sans font-medium">
                  Input: {keypadInput || "(kosong)"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowKeypad(false)}
                  className="text-white/50 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-sans tabular-nums">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      audioRef.current?.playClick();
                      setKeypadInput((prev) => (prev + d).slice(0, 10));
                    }}
                    className="py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PILIHAN GANDA SIMULATOR A, B, C (POP-OUT ELEVATED SEPERTI GAMBAR 1) */}
          {/* ================================================================= */}
          <div className="mt-3 pt-4 border-t border-white/15 space-y-2.5">
            <div>
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Tentukan Respons Bicaramu:
              </span>
            </div>

            {/* Grid 3 Opsi Jawaban Pop-Out Menonjol saat disentuh kursor (Diacak Bebas Pola) */}
            <div className="space-y-2.5">
              {availableChoices.map((originalChoice, index) => {
                const displayLetter = (["A", "B", "C"] as const)[index] || originalChoice;
                const opt = decision1?.options[originalChoice];
                if (!opt) return null;
                const cleanText = cleanOptionLabel(opt.label);

                return (
                  <button
                    key={`${originalChoice}-${index}`}
                    type="button"
                    onClick={() => handleSelectDecision(originalChoice)}
                    className="group w-full text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-[#27374D] border-2 border-white/60 hover:bg-[#27374D] hover:text-white hover:border-sky-400 transition-all duration-200 ease-out cursor-pointer flex items-center gap-3.5 shadow-md hover:shadow-2xl hover:shadow-sky-500/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] z-0 hover:z-10"
                  >
                    {/* Badge Huruf A, B, C (Tampilan berurutan rapi untuk pengguna) */}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27374D] text-white group-hover:bg-white group-hover:text-[#27374D] text-xs font-black transition-all duration-200 shrink-0 shadow-sm group-hover:shadow-md">
                      {displayLetter}
                    </span>

                    {/* Teks Pilihan Jawaban */}
                    <p className="flex-1 text-xs sm:text-[13px] font-bold leading-snug">
                      {cleanText}
                    </p>

                    {/* Panah Indikator saat Hover */}
                    <ChevronRight className="w-4 h-4 text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tombol Merah Akhiri Panggilan (End Call) di Bagian Bawah */}
          <div className="flex items-center justify-center pt-4 pb-2">
            <button
              type="button"
              onClick={() => {
                const safeKey =
                  (["A", "B", "C"] as const).find((k) => decision1?.options[k]?.type === "safe") || "C";
                handleSelectDecision(safeKey);
              }}
              title="Tutup Panggilan Langsung (Refleks Aman)"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(225,29,72,0.6)] hover:shadow-[0_0_35px_rgba(225,29,72,0.9)] transition-all cursor-pointer hover:scale-110 active:scale-95"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. LAYAR PANGGILAN SELESAI / DITUTUP (CALL ENDED - MENUNGGU PERINTAH)  */}
      {/* ===================================================================== */}
      {callPhase === "ended" && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 sm:py-16 text-center space-y-5 animate-fadeIn">
          {/* Ikon Merah Panggilan Berakhir */}
          <div className="w-20 h-20 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-xl animate-bounce-short">
            <PhoneOff className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
              Panggilan Berakhir
            </h3>
            <p className="text-xs text-white/70 font-sans font-medium">
              Durasi: {formatTimer(durationSeconds)} • Sambungan Terputus
            </p>
          </div>

          {/* Teks Ucapan Pengguna & Respons Penipu */}
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 text-left text-xs space-y-2.5 font-sans">
            {userVoiceText && (
              <div>
                <span className="font-bold text-sky-300 block mb-0.5">
                  Respons Kamu:
                </span>
                <p className="text-white/90 italic leading-relaxed">
                  "{userVoiceText}"
                </p>
              </div>
            )}

            {attackerVoiceReply && (
              <div className="pt-2 border-t border-white/10">
                <span className="font-bold text-rose-300 block mb-0.5">
                  Reaksi Penelpon:
                </span>
                <p className="text-white/80 text-[11px] leading-relaxed">
                  {attackerVoiceReply}
                </p>
              </div>
            )}
          </div>

          {/* Tombol Interaktif Pengguna untuk Melanjutkan (Menunggu Perintah Selanjutnya) */}
          <div className="pt-3 flex flex-col items-center gap-2.5 w-full max-w-md">
            <button
              type="button"
              onClick={() => {
                if (selectedChoice === "C" && onDeclineCall) {
                  onDeclineCall();
                } else {
                  onCompleteCall(selectedChoice || "C", durationSeconds);
                }
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] font-sans"
            >
              <span>Lanjutkan ke Ringkasan Skenario</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

