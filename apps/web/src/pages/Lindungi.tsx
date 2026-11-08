import { useState, useEffect, useMemo } from "react";
import {
  ShieldCheck,
  Smartphone,
  OctagonAlert,
  KeyRound,
  Users,
  ExternalLink,
  Copy,
  Check,
  Share2,
  AlertTriangle,
  RotateCcw,
  PhoneCall,
  Globe,
  Sparkles,
} from "lucide-react";
import { Button, Disclaimer } from "../components/ui";
import {
  listActionGuides,
  listReportChannels,
  buildWarningCard,
  storage,
} from "../lib/coreClient";
import type { ActionCondition, ActionGuide, ReportChannel } from "@jagaruang/contracts";

const GUIDE_SUBTITLES: Record<ActionCondition, string> = {
  belum_klik:
    "Langkah pencegahan cepat sebelum membuka tautan atau mengunduh berkas mencurigakan.",
  sudah_install:
    "Tindakan isolasi darurat untuk memutus jaringan dan menghapus aplikasi berbahaya dari ponsel.",
  sudah_transfer:
    "Panduan cepat menghubungi bank dan mengamankan bukti transaksi untuk pembekuan rekening penampung.",
  akun_diretas:
    "Langkah pemulihan kendali akun, penggantian kredensial, dan peringatan darurat ke kontak terdekat.",
  orang_dekat_hampir_kena:
    "Panduan mendampingi kerabat secara tenang untuk memverifikasi kebenaran pesan sebelum bertindak.",
};

export default function Lindungi() {
  const [guides, setGuides] = useState<ActionGuide[]>([]);
  const [channels, setChannels] = useState<ReportChannel[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<ActionCondition>("belum_klik");
  const [checkedSteps, setCheckedSteps] = useState<Record<string, string[]>>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Load guides, channels, dan checklist tersimpan lokal
  useEffect(() => {
    const loadedGuides = listActionGuides();
    const loadedChannels = listReportChannels();
    setGuides(loadedGuides);
    setChannels(loadedChannels);

    const progress = storage.load();
    if (progress && progress.actionChecks) {
      setCheckedSteps(progress.actionChecks);
    }
  }, []);

  const activeGuide = useMemo(() => {
    return guides.find((g) => g.condition === selectedCondition) || guides[0];
  }, [guides, selectedCondition]);

  const channelMap = useMemo(() => {
    const map = new Map<string, ReportChannel>();
    channels.forEach((c) => map.set(c.id, c));
    return map;
  }, [channels]);

  // Toggle checklist step
  const handleToggleStep = (guideId: string, stepId: string) => {
    setCheckedSteps((prev) => {
      const currentList = prev[guideId] || [];
      const updatedList = currentList.includes(stepId)
        ? currentList.filter((id) => id !== stepId)
        : [...currentList, stepId];

      const newChecks = { ...prev, [guideId]: updatedList };

      // Simpan ke storage lokal
      const progress = storage.load();
      storage.save({
        ...progress,
        actionChecks: newChecks,
      });

      return newChecks;
    });
  };

  const handleResetChecklist = (guideId: string) => {
    setCheckedSteps((prev) => {
      const newChecks = { ...prev, [guideId]: [] };
      const progress = storage.load();
      storage.save({
        ...progress,
        actionChecks: newChecks,
      });
      return newChecks;
    });
  };

  // Kartu Peringatan
  const warningCard = useMemo(() => {
    return buildWarningCard();
  }, []);

  const handleCopyCard = async () => {
    try {
      await navigator.clipboard.writeText(warningCard.text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      // Fallback bila clipboard dicegah browser
      setCopySuccess(false);
    }
  };

  const handleShareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Peringatan Waspada Penipuan Digital - JagaRuang",
          text: warningCard.text,
        });
        setShareFeedback("Berhasil dibagikan!");
        setTimeout(() => setShareFeedback(null), 2500);
      } catch (err) {
        // Abaikan bila pengguna membatalkan dialog share
      }
    } else {
      // Fallback ke copy jika Web Share API tidak tersedia di desktop
      handleCopyCard();
      setShareFeedback("Teks tersalin ke clipboard untuk dibagikan!");
      setTimeout(() => setShareFeedback(null), 2500);
    }
  };

  // Statistik langkah selesai
  const activeCompletedCount = activeGuide
    ? (checkedSteps[activeGuide.id] || []).length
    : 0;
  const activeTotalCount = activeGuide ? activeGuide.steps.length : 0;
  const progressPercent = activeTotalCount > 0
    ? Math.round((activeCompletedCount / activeTotalCount) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-7 space-y-6">
      {/* ===================================================================== */}
      {/* HEADER HALAMAN PANDUAN LINDUNGI                                       */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#27374D] tracking-tight">
            Panduan Lindungi Diri & Sekitar
          </h1>
          <p className="text-xs sm:text-sm text-[#526D82] max-w-3xl leading-relaxed">
            Panduan tindakan darurat berurutan untuk memutus akses pelaku kejahatan siber,
            daftar kanal pelaporan resmi terverifikasi, dan generator kartu peringatan keluarga.
          </p>
        </div>

        {/* =================================================================== */}
        {/* KALIMAT PEMBUKA LAYAR DARURAT (SESUAI ATURAN KETAT FE-4.1)          */}
        {/* Menekankan melapor secepat mungkin, JANGAN menjanjikan dana kembali. */}
        {/* =================================================================== */}
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 sm:p-5 text-rose-950 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-900/95 leading-relaxed">
              <strong className="font-bold text-rose-950">Catatan Penting:</strong> Pelaporan resmi bertujuan untuk memutus akses pelaku dan membekukan rekening penampung.{" "}
              <strong>Tidak ada pihak yang dapat menjamin dana pasti kembali</strong>, namun melapor segera memperbesar peluang pencegahan kerugian finansial yang lebih besar.
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5 PILIHAN KONDISI (PILIH SITUASI YANG DIHADAPI)                       */}
      {/* ===================================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-[#27374D]">
            Langkah 1: Pilih Kondisi yang Sedang Kamu Hadapi
          </h2>
          <span className="text-xs text-[#526D82]">Pilih salah satu di bawah:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Kondisi 1: Belum Klik */}
          <button
            type="button"
            onClick={() => setSelectedCondition("belum_klik")}
            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedCondition === "belum_klik"
                ? "bg-[#27374D] text-white border-[#27374D] shadow-md ring-2 ring-[#526D82]/40"
                : "bg-white text-[#27374D] border-[#9DB2BF]/50 hover:border-[#526D82]"
            }`}
          >
            <div className="mb-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                  selectedCondition === "belum_klik"
                    ? "bg-emerald-500/30 text-emerald-300"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs font-extrabold leading-snug">Belum Diklik</div>
            <p
              className={`text-[11px] mt-1 leading-tight line-clamp-2 ${
                selectedCondition === "belum_klik" ? "text-[#DDE6ED]" : "text-[#526D82]"
              }`}
            >
              Baru menerima pesan / link mencurigakan tapi belum dibuka
            </p>
          </button>

          {/* Kondisi 2: Sudah Install APK */}
          <button
            type="button"
            onClick={() => setSelectedCondition("sudah_install")}
            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedCondition === "sudah_install"
                ? "bg-[#27374D] text-white border-[#27374D] shadow-md ring-2 ring-[#526D82]/40"
                : "bg-white text-[#27374D] border-[#9DB2BF]/50 hover:border-[#526D82]"
            }`}
          >
            <div className="mb-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                  selectedCondition === "sudah_install"
                    ? "bg-amber-500/30 text-amber-300"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                <Smartphone className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs font-extrabold leading-snug">Sudah Pasang APK</div>
            <p
              className={`text-[11px] mt-1 leading-tight line-clamp-2 ${
                selectedCondition === "sudah_install" ? "text-[#DDE6ED]" : "text-[#526D82]"
              }`}
            >
              Terlanjur klik dan memasang berkas aplikasi .apk di ponsel
            </p>
          </button>

          {/* Kondisi 3: Sudah Transfer */}
          <button
            type="button"
            onClick={() => setSelectedCondition("sudah_transfer")}
            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedCondition === "sudah_transfer"
                ? "bg-[#27374D] text-white border-[#27374D] shadow-md ring-2 ring-[#526D82]/40"
                : "bg-white text-[#27374D] border-[#9DB2BF]/50 hover:border-[#526D82]"
            }`}
          >
            <div className="mb-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                  selectedCondition === "sudah_transfer"
                    ? "bg-rose-500/30 text-rose-300"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                <OctagonAlert className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs font-extrabold leading-snug">Sudah Transfer</div>
            <p
              className={`text-[11px] mt-1 leading-tight line-clamp-2 ${
                selectedCondition === "sudah_transfer" ? "text-[#DDE6ED]" : "text-[#526D82]"
              }`}
            >
              Terlanjur mengirim dana ke rekening perorangan penipu
            </p>
          </button>

          {/* Kondisi 4: Akun Diretas */}
          <button
            type="button"
            onClick={() => setSelectedCondition("akun_diretas")}
            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedCondition === "akun_diretas"
                ? "bg-[#27374D] text-white border-[#27374D] shadow-md ring-2 ring-[#526D82]/40"
                : "bg-white text-[#27374D] border-[#9DB2BF]/50 hover:border-[#526D82]"
            }`}
          >
            <div className="mb-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                  selectedCondition === "akun_diretas"
                    ? "bg-purple-500/30 text-purple-300"
                    : "bg-purple-50 text-purple-700 border border-purple-200"
                }`}
              >
                <KeyRound className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs font-extrabold leading-snug">Akun Diretas</div>
            <p
              className={`text-[11px] mt-1 leading-tight line-clamp-2 ${
                selectedCondition === "akun_diretas" ? "text-[#DDE6ED]" : "text-[#526D82]"
              }`}
            >
              WhatsApp, email, atau akun dompet digital diambil alih
            </p>
          </button>

          {/* Kondisi 5: Orang Dekat Hampir Kena */}
          <button
            type="button"
            onClick={() => setSelectedCondition("orang_dekat_hampir_kena")}
            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedCondition === "orang_dekat_hampir_kena"
                ? "bg-[#27374D] text-white border-[#27374D] shadow-md ring-2 ring-[#526D82]/40"
                : "bg-white text-[#27374D] border-[#9DB2BF]/50 hover:border-[#526D82]"
            }`}
          >
            <div className="mb-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                  selectedCondition === "orang_dekat_hampir_kena"
                    ? "bg-sky-500/30 text-sky-300"
                    : "bg-sky-50 text-sky-700 border border-sky-200"
                }`}
              >
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs font-extrabold leading-snug">Bantu Kerabat</div>
            <p
              className={`text-[11px] mt-1 leading-tight line-clamp-2 ${
                selectedCondition === "orang_dekat_hampir_kena" ? "text-[#DDE6ED]" : "text-[#526D82]"
              }`}
            >
              Orang tua atau kerabat sedang bingung menerima pesan panik
            </p>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CHECKLIST BERURUTAN TINDAKAN (TERSIMPAN DI LOCAL STORAGE)              */}
      {/* ===================================================================== */}
      {activeGuide && (
        <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#9DB2BF]/30 pb-4">
            <div className="space-y-1 max-w-xl">
              <h3 className="text-lg sm:text-xl font-black text-[#27374D]">
                {activeGuide.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
                {GUIDE_SUBTITLES[selectedCondition] ||
                  "Ikuti langkah pencegahan berikut secara runtut demi keamanan akun dan perangkatmu."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#526D82]">
                Progres: {activeCompletedCount}/{activeTotalCount} Selesai ({progressPercent}%)
              </span>
              <button
                type="button"
                onClick={() => handleResetChecklist(activeGuide.id)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#526D82] hover:text-[#27374D] cursor-pointer"
                title="Reset checklist kondisi ini"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="h-2 w-full rounded-full bg-[#DDE6ED] overflow-hidden">
            <div
              className="h-full bg-[#526D82] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* List Langkah Berurutan */}
          <div className="space-y-3">
            {activeGuide.steps.map((step) => {
              const currentChecks = checkedSteps[activeGuide.id] || [];
              const isChecked = currentChecks.includes(step.id);
              const relatedChannel = step.channelId ? channelMap.get(step.channelId) : null;

              return (
                <div
                  key={step.id}
                  className={`rounded-2xl border p-4 transition-all ${
                    isChecked
                      ? "bg-emerald-50/50 border-emerald-300/80 text-emerald-950"
                      : "bg-[#DDE6ED]/30 border-[#9DB2BF]/50 hover:border-[#526D82]"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Checkbox Tombol */}
                    <button
                      type="button"
                      onClick={() => handleToggleStep(activeGuide.id, step.id)}
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-all cursor-pointer mt-0.5 ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                          : "border-[#9DB2BF] bg-white text-transparent hover:border-[#526D82]"
                      }`}
                      aria-label={`Tandai langkah ${step.order} selesai`}
                    >
                      {isChecked ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
                    </button>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-[#27374D]">
                          Langkah {step.order}
                        </span>
                      </div>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isChecked ? "line-through opacity-80" : "text-[#27374D]"
                        }`}
                      >
                        {step.text}
                      </p>

                      {/* Tautan Langsung ke Kanal Lapor Terkait Bila Ada */}
                      {relatedChannel && (
                        <div className="pt-1.5 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold text-[#526D82]">
                            Kanal Terkait:
                          </span>
                          {relatedChannel.url ? (
                            <a
                              href={relatedChannel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#9DB2BF]/60 px-2.5 py-1 text-xs font-bold text-[#27374D] hover:bg-[#DDE6ED] transition-colors shadow-2xs"
                            >
                              <Globe className="h-3.5 w-3.5 text-[#526D82]" />
                              <span>{relatedChannel.name}</span>
                              <ExternalLink className="h-3 w-3 text-[#526D82]" />
                            </a>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#9DB2BF]/60 px-2.5 py-1 text-xs font-bold text-[#27374D] shadow-2xs">
                              <PhoneCall className="h-3.5 w-3.5 text-[#526D82]" />
                              <span>{relatedChannel.name} ({relatedChannel.contact})</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* KANAL LAPOR RESMI TERVERIFIKASI (FE-4.1)                              */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#9DB2BF]/30 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-bold text-[#27374D]">
              Kanal Lapor Resmi Terverifikasi
            </h3>
            <p className="text-xs text-[#526D82]">
              Daftar portal dan kontak bantuan resmi pemerintah dan regulator keuangan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {channels.map((chan) => (
            <div
              key={chan.id}
              className="rounded-2xl border border-[#9DB2BF]/50 bg-[#DDE6ED]/30 p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#27374D]">{chan.name}</h4>
                {chan.contact && (
                  <p className="text-[11px] text-[#526D82] font-medium leading-relaxed">
                    {chan.contact}
                  </p>
                )}
              </div>

              {chan.url && (
                <div className="pt-2">
                  <a
                    href={chan.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white border border-[#9DB2BF]/60 py-2 text-xs font-bold text-[#27374D] hover:bg-[#DDE6ED] hover:border-[#526D82] transition-colors shadow-2xs"
                  >
                    <span>Kunjungi Portal Resmi</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* GENERATOR KARTU PERINGATAN KELUARGA (FE-4.2)                          */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="border-b border-[#9DB2BF]/30 pb-3">
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold text-[#526D82] uppercase tracking-wider">
              <span>Kartu Peringatan untuk Orang Sekitar</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#27374D]">
              Bagikan Peringatan Singkat ke Grup Chat
            </h3>
          </div>
        </div>

        {/* Tampilan Kotak Pesan Siap Salin */}
        <div className="rounded-2xl border border-[#9DB2BF]/60 bg-[#DDE6ED]/40 p-4 sm:p-5">
          <pre className="font-sans text-xs text-[#27374D] whitespace-pre-wrap leading-normal select-all">
            {warningCard.text}
          </pre>
        </div>

        {/* Tombol Aksi: Salin & Share API */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-[#526D82]">
            {shareFeedback}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCard}
              className="gap-1.5 text-xs font-bold"
            >
              {copySuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#526D82]" />
                  <span>Salin Teks Pesan</span>
                </>
              )}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleShareCard}
              className="gap-1.5 text-xs font-bold"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Bagikan Sekarang</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer Tetap Sesuai Kontrak */}
      <Disclaimer />
    </div>
  );
}

