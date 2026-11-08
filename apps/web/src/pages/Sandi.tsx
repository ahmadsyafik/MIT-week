import { useState, useEffect } from "react";
import {
  KeyRound,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Users,
  PhoneOff,
  CheckCircle2,
  Lock,
  HelpCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button, Disclaimer } from "../components/ui";
import { generateSafeword, storage } from "../lib/coreClient";

interface MixedSafewordRec {
  id: string;
  password: string;
}

const BASE_WORDS = [
  "Lentera",
  "Samudra",
  "Cempaka",
  "Guntur",
  "Elang",
  "Rembulan",
  "Kasturi",
  "Lembah",
  "Garuda",
  "Mentari",
  "Ombak",
  "Bintang",
  "Pelangi",
  "Melati",
  "Angin",
  "Kopi",
  "Danau",
  "Pohon",
  "Pusaka",
];

function generateMixedRecommendations(): MixedSafewordRec[] {
  const shuffle = () => [...BASE_WORDS].sort(() => 0.5 - Math.random());
  const w1 = shuffle();
  const w2 = shuffle();
  const w3 = shuffle();
  const w4 = shuffle();

  // Pattern 1: Kata1 + 2 Digit Angka + Kata2 (Kapital + Angka di Tengah)
  const num1 = Math.floor(10 + Math.random() * 89);
  const p1 = `${w1[0]}${num1}${w1[1]}`;

  // Pattern 2: kata1(lowercase) + 2 Digit Angka + Kata2 (Huruf Kecil + Angka + Kapital)
  const num2 = Math.floor(10 + Math.random() * 89);
  const p2 = `${w2[0].toLowerCase()}${num2}${w2[1]}`;

  // Pattern 3: Kata1 + Tahun 2026 + Kata2 (Kapital + 4 Angka)
  const p3 = `${w3[0]}2026${w3[1]}`;

  // Pattern 4: 2 Digit Angka + Kata1 + Kata2 (Angka di Awal + Kapital)
  const num4 = Math.floor(10 + Math.random() * 89);
  const p4 = `${num4}${w4[0]}${w4[1]}`;

  return [
    { id: "rec-1", password: p1 },
    { id: "rec-2", password: p2 },
    { id: "rec-3", password: p3 },
    { id: "rec-4", password: p4 },
  ];
}

const SOP_STEPS = [
  {
    step: 1,
    title: "Jangan Langsung Panik",
    desc: "Penipu sengaja membuat situasi terdengar genting (menangis, suara sirine, atau panik) agar korban tidak sempat berpikir jernih. Tarik napas dan tetap tenang.",
  },
  {
    step: 2,
    title: "Tanyakan Sandi Rahasia",
    desc: 'Ajukan pertanyaan sederhana: "Sebelum kita bicara lebih lanjut, apa kata sandi rahasia keluarga kita?". Penipu AI tidak akan pernah mengetahui kata ini.',
  },
  {
    step: 3,
    title: "Tolak & Verifikasi Mandiri",
    desc: "Jika penelepon mengelak, marah, atau beralasan tidak ingat, segera matikan telepon. Hubungi nomor asli kerabat yang bersangkutan lewat panggilan biasa.",
  },
];

export default function Sandi() {
  const [recommendations, setRecommendations] = useState<MixedSafewordRec[]>(() =>
    generateMixedRecommendations()
  );
  const [currentSafeword, setCurrentSafeword] = useState<string>("");
  const [savedSafeword, setSavedSafeword] = useState<{ word: string; createdAt: string } | null>(null);
  const [allowSaveLocal, setAllowSaveLocal] = useState<boolean>(false); // DEFAULT MATI sesuai kontrak FE-5.2
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveStatusMessage, setSaveStatusMessage] = useState<string | null>(null);
  const [openSteps, setOpenSteps] = useState<number[]>([0]);

  const toggleStep = (idx: number) => {
    setOpenSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Load safeword yang pernah disimpan di storage lokal
  useEffect(() => {
    const progress = storage.load();
    if (progress?.safeword) {
      setSavedSafeword(progress.safeword);
      setCurrentSafeword(progress.safeword.word);
      setAllowSaveLocal(true);
    } else {
      // Inisialisasi kata pertama dengan rekomendasi sandi 3 kata
      const initial = generateSafeword(3);
      setCurrentSafeword(initial);
    }
  }, []);

  const handleRefreshRecommendations = () => {
    const newRecs = generateMixedRecommendations();
    setRecommendations(newRecs);
    setSaveStatusMessage("4 opsi rekomendasi sandi campuran baru berhasil dibuat.");
    setTimeout(() => setSaveStatusMessage(null), 2500);
  };

  const handleSelectRecommendation = (word: string) => {
    setCurrentSafeword(word);
    setCopyFeedback(false);
    setSaveStatusMessage("Sandi rekomendasi berhasil ditetapkan sebagai sandi keluarga!");
    setTimeout(() => setSaveStatusMessage(null), 3000);

    if (allowSaveLocal) {
      const progress = storage.load();
      const updatedSafeword = {
        word,
        createdAt: new Date().toISOString(),
      };
      storage.save({
        ...progress,
        safeword: updatedSafeword,
      });
      setSavedSafeword(updatedSafeword);
    }
  };

  const handleGenerateNew = () => {
    const newWord = generateSafeword(3);
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
      setSaveStatusMessage("Sandi baru 3 kata berhasil diperbarui dan disimpan secara lokal.");
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-7 space-y-6">
      {/* ===================================================================== */}
      {/* HEADER HALAMAN SANDI KELUARGA                                         */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#27374D] tracking-tight">
            Sandi Verifikasi Keluarga
          </h1>
          <p className="text-xs sm:text-sm text-[#526D82] max-w-3xl leading-relaxed">
            Antisipasi kejahatan kloning suara AI dan telepon rekayasa darurat
            dengan menyepakati kata sandi rahasia keluarga secara lisan.
          </p>
        </div>

        {/* Peringatan Utama: Sepakati Langsung Lisan */}
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 text-amber-950 space-y-2 shadow-2xs">
          <h4 className="font-bold text-xs sm:text-sm text-amber-900">
            Aturan Emas Sandi Keluarga: Jangan Kirim Melalui Chat Digital
          </h4>
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
        <div className="border-b border-[#9DB2BF]/30 pb-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
              Buat Kata Sandi Rahasia
            </h2>
            <p className="text-xs text-[#526D82]">
              Pilih kombinasi kata bahasa Indonesia yang mudah dihafal dan unik.
            </p>
          </div>
        </div>

        {/* Kotak Tampilan Visual Sandi Besar */}
        <div className="rounded-3xl border-2 border-[#526D82]/40 bg-[#DDE6ED]/40 p-8 sm:p-10 text-center space-y-4 shadow-inner">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#526D82]">
            Kata Sandi Rahasia Keluarga Kamu:
          </div>

          <div className="text-2xl sm:text-4xl md:text-5xl font-black font-mono text-[#27374D] tracking-tight selection:bg-[#526D82] selection:text-white py-1">
            {currentSafeword || "Lentera Samudra Cempaka"}
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

        {/* =================================================================== */}
        {/* REKOMENDASI SANDI CAMPURAN: 2X2 DENGAN RADIUS TIPIS                 */}
        {/* =================================================================== */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#DDE6ED] pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#526D82]" />
                <h3 className="text-sm sm:text-base font-bold text-[#27374D]">
                  Pilihan Rekomendasi Sandi Campuran (Huruf & Angka)
                </h3>
              </div>
              <p className="text-xs text-[#526D82]">
                Kombinasi acak huruf kapital, huruf kecil, dan angka yang sulit ditebak. Klik <strong>Tetapkan Sandi</strong> pada opsi yang kamu pilih.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={handleRefreshRecommendations}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#9DB2BF]/60 bg-white hover:bg-slate-50 text-[11px] font-bold text-[#27374D] cursor-pointer shadow-2xs"
                title="Dapatkan 4 rekomendasi kombinasi baru"
              >
                <RefreshCw className="h-3 w-3 text-[#526D82]" />
                <span>Acak Opsi Baru</span>
              </button>
            </div>
          </div>

          {/* Rekomendasi 2x2 (2 Atas, 2 Bawah) dengan Radius Tipis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendations.map((rec) => {
              const isSelected = currentSafeword === rec.password;
              return (
                <div
                  key={rec.id}
                  className={`flex items-center justify-between gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-xl border transition-all ${isSelected
                    ? "bg-[#27374D]/5 border-[#27374D] ring-2 ring-[#27374D] shadow-sm"
                    : "bg-white border-[#9DB2BF]/50 hover:border-[#526D82] hover:bg-[#DDE6ED]/20 shadow-2xs"
                    }`}
                >
                  {/* Teks Sandi Campuran Bersih (Monospace Bold) */}
                  <div className="font-mono font-black text-sm sm:text-base text-[#27374D] tracking-wider select-all truncate">
                    {rec.password}
                  </div>

                  {/* Tombol Aksi Tetapkan dengan Radius Tipis */}
                  <button
                    type="button"
                    onClick={() => handleSelectRecommendation(rec.password)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs ${isSelected
                      ? "bg-[#27374D] text-white ring-1 ring-[#27374D]"
                      : "bg-white border border-[#9DB2BF]/60 text-[#27374D] hover:bg-[#27374D] hover:text-white"
                      }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Ditetapkan</span>
                      </>
                    ) : (
                      <>
                        <span>Tetapkan Sandi</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
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
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="space-y-1 border-b border-[#9DB2BF]/30 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-[#27374D]">
            SOP Tindakan 3 Langkah Saat Menerima Telepon Darurat
          </h3>
          <p className="text-xs text-[#526D82]">
            Gunakan alur verifikasi berikut saat menerima panggilan mencurigakan yang mengatasnamakan kerabat.
          </p>
        </div>

        <div className="space-y-2.5">
          {SOP_STEPS.map((item, idx) => {
            const isOpen = openSteps.includes(idx);
            return (
              <div
                key={item.step}
                className="rounded-2xl border border-[#9DB2BF]/40 bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleStep(idx)}
                  className="w-full p-4 sm:px-5 sm:py-3.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#27374D] hover:text-[#526D82] hover:bg-[#DDE6ED]/20 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="text-[#27374D] font-extrabold">{item.step}.</span>
                    <span>{item.title}</span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-[#526D82] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                      }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-[#526D82] leading-relaxed border-t border-[#9DB2BF]/20 bg-[#DDE6ED]/15">
                    <p>{item.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ANATOMI ANCAMAN: BAGAIMANA AI VOICE CLONING BEKERJA                  */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div>
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

