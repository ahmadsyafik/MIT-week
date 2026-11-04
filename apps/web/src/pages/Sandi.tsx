import { useState, useEffect } from "react";
import {
  KeyRound,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Users,
  Mic,
  PhoneOff,
  CheckCircle2,
  Lock,
  HelpCircle,
} from "lucide-react";
import { Button, Disclaimer } from "../components/ui";
import { generateSafeword, storage } from "../lib/coreClient";

export default function Sandi() {
  const [wordCount, setWordCount] = useState<2 | 3>(3);
  const [currentSafeword, setCurrentSafeword] = useState<string>("");
  const [savedSafeword, setSavedSafeword] = useState<{ word: string; createdAt: string } | null>(null);
  const [allowSaveLocal, setAllowSaveLocal] = useState<boolean>(false); // DEFAULT MATI sesuai kontrak FE-5.2
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveStatusMessage, setSaveStatusMessage] = useState<string | null>(null);

  // Load safeword yang pernah disimpan di storage lokal
  useEffect(() => {
    const progress = storage.load();
    if (progress?.safeword) {
      setSavedSafeword(progress.safeword);
      setCurrentSafeword(progress.safeword.word);
      setAllowSaveLocal(true);
    } else {
      // Inisialisasi kata pertama saat membuka halaman
      setCurrentSafeword(generateSafeword(3));
    }
  }, []);

  const handleGenerateNew = () => {
    const newWord = generateSafeword(wordCount);
    setCurrentSafeword(newWord);
    setCopyFeedback(false);
    setSaveStatusMessage(null);

    // Jika pengguna sebelumnya mengaktifkan opsi simpan lokal, perbarui yang tersimpan
    if (allowSaveLocal) {
      const progress = storage.load();
      const updatedSafeword = {
        word: newWord,
        createdAt: new Date().toISOString(),
      };
      storage.save({
        ...progress,
        safeword: updatedSafeword,
      });
      setSavedSafeword(updatedSafeword);
      setSaveStatusMessage("Sandi baru berhasil diperbarui dan disimpan secara lokal.");
      setTimeout(() => setSaveStatusMessage(null), 3000);
    }
  };

  const handleCopy = async () => {
    if (!currentSafeword) return;
    try {
      await navigator.clipboard.writeText(currentSafeword);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {
      setCopyFeedback(false);
    }
  };

  const handleToggleSaveOption = (checked: boolean) => {
    setAllowSaveLocal(checked);
    const progress = storage.load();

    if (checked && currentSafeword) {
      const newSafewordData = {
        word: currentSafeword,
        createdAt: new Date().toISOString(),
      };
      storage.save({
        ...progress,
        safeword: newSafewordData,
      });
      setSavedSafeword(newSafewordData);
      setSaveStatusMessage("Sandi berhasil disimpan di perangkat ini.");
      setTimeout(() => setSaveStatusMessage(null), 3000);
    } else {
      // Jika checkbox dimatikan, hapus dari storage
      const { safeword, ...rest } = progress;
      storage.save(rest);
      setSavedSafeword(null);
      setSaveStatusMessage("Sandi dihapus dari penyimpanan perangkat lokal.");
      setTimeout(() => setSaveStatusMessage(null), 3000);
    }
  };

  const handleDeleteSaved = () => {
    const progress = storage.load();
    const { safeword, ...rest } = progress;
    storage.save(rest);
    setSavedSafeword(null);
    setAllowSaveLocal(false);
    setSaveStatusMessage("Sandi tersimpan berhasil dihapus permanen dari perangkat.");
    setTimeout(() => setSaveStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* ===================================================================== */}
      {/* HEADER HALAMAN SANDI KELUARGA                                         */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#DDE6ED] px-3 py-0.5 text-[11px] font-bold text-[#27374D] border border-[#9DB2BF]/60">
            <KeyRound className="h-3.5 w-3.5 text-[#526D82]" />
            <span>Fitur Perlindungan Kloning Suara AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#27374D] tracking-tight">
            Sandi Verifikasi Keluarga
          </h1>
          <p className="text-xs sm:text-sm text-[#526D82] max-w-3xl leading-relaxed">
            Antisipasi kejahatan kloning suara AI (*AI Voice Cloning*) dan telepon rekayasa darurat
            dengan menyepakati kata sandi rahasia keluarga secara lisan.
          </p>
        </div>

        {/* Peringatan Utama: Sepakati Langsung Lisan */}
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 text-amber-950 space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Aturan Emas Sandi Keluarga: Jangan Kirim Melalui Chat Digital</span>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            Sepakati kata sandi ini <strong>secara langsung (tatap muka / lisan)</strong> bersama orang tua atau anak.
            <strong> Jangan pernah mengirimkan kata sandi ini melalui pesan teks WhatsApp, SMS, atau media sosial</strong> yang rentan diretas atau diintip.
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* GENERATOR KATA SANDI KELUARGA                                         */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#9DB2BF]/30 pb-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
              Buat Kata Sandi Rahasia
            </h2>
            <p className="text-xs text-[#526D82]">
              Pilih kombinasi kata bahasa Indonesia yang mudah dihafal dan unik.
            </p>
          </div>

          {/* Opsi Jumlah Kata: 2 Kata vs 3 Kata */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#9DB2BF]/60 bg-[#DDE6ED]/50 p-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setWordCount(2);
                const nw = generateSafeword(2);
                setCurrentSafeword(nw);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                wordCount === 2
                  ? "bg-[#27374D] text-white shadow-xs"
                  : "text-[#526D82] hover:text-[#27374D]"
              }`}
            >
              2 Kata
            </button>
            <button
              type="button"
              onClick={() => {
                setWordCount(3);
                const nw = generateSafeword(3);
                setCurrentSafeword(nw);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                wordCount === 3
                  ? "bg-[#27374D] text-white shadow-xs"
                  : "text-[#526D82] hover:text-[#27374D]"
              }`}
            >
              3 Kata (Disarankan)
            </button>
          </div>
        </div>

        {/* Kotak Tampilan Visual Sandi Besar */}
        <div className="rounded-3xl border-2 border-[#526D82]/40 bg-[#DDE6ED]/40 p-8 sm:p-10 text-center space-y-4 shadow-inner">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#526D82]">
            Kata Sandi Rahasia Keluarga Kamu:
          </div>

          <div className="text-2xl sm:text-4xl md:text-5xl font-black text-[#27374D] tracking-tight selection:bg-[#526D82] selection:text-white">
            {currentSafeword || "Garuda Ombak Melompat"}
          </div>

          <p className="text-xs text-[#526D82] max-w-md mx-auto leading-relaxed">
            Hafalkan kata ini bersama anggota keluargamu. Gunakan kata ini sebagai pertanyaan verifikasi saat ada panggilan telepon darurat yang mencurigakan.
          </p>

          {/* Tombol Aksi: Acak Baru & Salin */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={handleGenerateNew}
              className="gap-2 text-xs font-bold"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Acak Sandi Baru</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleCopy}
              className="gap-2 text-xs font-bold"
            >
              {copyFeedback ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Kata Sandi</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Opsi Penyimpanan Lokal (DEFAULT MATI / FALSE SESUAI KONTRAK INTERFACES & TASK_GUIDE) */}
        <div className="rounded-2xl border border-[#9DB2BF]/50 bg-white p-4 sm:p-5 space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="save-local-checkbox"
              checked={allowSaveLocal}
              onChange={(e) => handleToggleSaveOption(e.target.checked)}
              className="h-4 w-4 rounded border-[#9DB2BF] text-[#27374D] focus:ring-[#526D82] mt-0.5 cursor-pointer"
            />
            <div className="space-y-1">
              <label
                htmlFor="save-local-checkbox"
                className="text-xs sm:text-sm font-bold text-[#27374D] cursor-pointer"
              >
                Simpan sandi ini di peramban perangkat ini (Opsional)
              </label>
              <p className="text-[11px] text-[#526D82] leading-relaxed">
                Secara bawaan privasi, sandi <strong>tidak disimpan sama sekali</strong> di perangkat untuk mencegah orang lain melihatnya.
                Bila opsi ini diaktifkan, sandi akan disimpan di memori lokal (localStorage) browser ini.
              </p>
            </div>
          </div>

          {/* Informasi Sandi Tersimpan & Tombol Hapus */}
          {savedSafeword && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[#DDE6ED] pt-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  Sandi tersimpan di perangkat ini: <strong>"{savedSafeword.word}"</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={handleDeleteSaved}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 cursor-pointer self-start sm:self-auto"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Hapus Sandi dari Perangkat</span>
              </button>
            </div>
          )}

          {saveStatusMessage && (
            <div className="text-[11px] font-bold text-[#526D82] animate-pulse">
              {saveStatusMessage}
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* PANDUAN PRAKTIS SAAT MENGHADAPI TELEPON DARURAT                       */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-5">
        <div className="space-y-1 border-b border-[#9DB2BF]/30 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-[#27374D]">
            SOP Tindakan 3 Langkah Saat Menerima Telepon Darurat
          </h3>
          <p className="text-xs text-[#526D82]">
            Gunakan alur verifikasi berikut saat menerima panggilan mencurigakan yang mengatasnamakan kerabat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Langkah 1 */}
          <div className="rounded-2xl border border-[#9DB2BF]/40 bg-[#DDE6ED]/30 p-5 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#27374D] text-white font-extrabold text-xs shadow-xs">
                01
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#27374D]">
                Jangan Langsung Panik
              </h4>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Penipu sengaja membuat situasi terdengar genting (menangis, suara sirine, atau panik) agar korban tidak sempat berpikir jernih. Tarik napas dan tetap tenang.
              </p>
            </div>
          </div>

          {/* Langkah 2 */}
          <div className="rounded-2xl border border-[#9DB2BF]/40 bg-[#DDE6ED]/30 p-5 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#27374D] text-white font-extrabold text-xs shadow-xs">
                02
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#27374D]">
                Tanyakan Sandi Rahasia
              </h4>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Ajukan pertanyaan sederhana: <em>"Sebelum kita bicara lebih lanjut, apa kata sandi rahasia keluarga kita?"</em>. Penipu AI tidak akan pernah mengetahui kata ini.
              </p>
            </div>
          </div>

          {/* Langkah 3 */}
          <div className="rounded-2xl border border-[#9DB2BF]/40 bg-[#DDE6ED]/30 p-5 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#27374D] text-white font-extrabold text-xs shadow-xs">
                03
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#27374D]">
                Tolak & Verifikasi Mandiri
              </h4>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Jika penelepon mengelak, marah, atau beralasan tidak ingat, segera matikan telepon. Hubungi nomor asli kerabat yang bersangkutan lewat panggilan biasa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ANATOMI ANCAMAN: BAGAIMANA AI VOICE CLONING BEKERJA                  */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-rose-600" />
          <h3 className="text-base sm:text-lg font-bold text-[#27374D]">
            Mengapa Suara di Telepon Bisa Terdengar Begitu Mirip?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
          Dengan kecerdasan buatan masa kini, pelaku kejahatan hanya membutuhkan rekaman suara berdurasi 3 detik
          (dari video TikTok, Instagram Reels, atau voice note WhatsApp) untuk meniru intonasi, timbre, dan gaya bicara seseorang.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="rounded-xl border border-[#9DB2BF]/40 bg-[#DDE6ED]/40 p-3.5 space-y-1 text-xs">
            <span className="font-bold text-[#27374D]">Kelemahan Penipu AI:</span>
            <p className="text-[#526D82] leading-relaxed">
              Pelaku hanya dapat meniru suara dan gaya bicara, tetapi tidak memiliki memori fakta pribadi atau kata sandi yang disepakati secara privat di dunia nyata.
            </p>
          </div>

          <div className="rounded-xl border border-[#9DB2BF]/40 bg-[#DDE6ED]/40 p-3.5 space-y-1 text-xs">
            <span className="font-bold text-[#27374D]">Tips untuk Keluarga Lansia:</span>
            <p className="text-[#526D82] leading-relaxed">
              Bila orang tua kesulitan menghafal kata acak baru, gunakan kata yang memiliki kenangan keluarga (misalnya nama panggilan hewan peliharaan masa kecil).
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Tetap Sesuai Kontrak */}
      <Disclaimer />
    </div>
  );
}

