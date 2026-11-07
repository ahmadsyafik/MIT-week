import { useState } from "react";
import {
  MessageSquare,
  Link2,
  FileCheck,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  Check,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  INPUT_MAX_CHARS,
  type AnalysisResult,
  type AnalyzeInput,
  type Band,
} from "@jagaruang/contracts";
import { analyze } from "../lib/coreClient";
import {
  EXAMPLE_MESSAGE,
  EXAMPLE_LINK,
  EXAMPLE_FILE,
} from "../mocks/analysis";

type TabKind = "message" | "link" | "file";

const AVAILABLE_PERMISSIONS = [
  {
    id: "android.permission.RECEIVE_SMS",
    name: "Terima & Baca SMS (OTP)",
    desc: "android.permission.RECEIVE_SMS",
    badge: "Kritis",
  },
  {
    id: "android.permission.BIND_ACCESSIBILITY_SERVICE",
    name: "Layanan Aksesibilitas (Kontrol Otomatis)",
    desc: "android.permission.BIND_ACCESSIBILITY_SERVICE",
    badge: "Kritis",
  },
  {
    id: "android.permission.READ_CONTACTS",
    name: "Baca Kontak Pribadi Ponsel",
    desc: "android.permission.READ_CONTACTS",
    badge: "Sedang",
  },
  {
    id: "android.permission.SYSTEM_ALERT_WINDOW",
    name: "Tampil di Atas Aplikasi Lain (Screen Overlay)",
    desc: "android.permission.SYSTEM_ALERT_WINDOW",
    badge: "Tinggi",
  },
];

function formatCategoryName(category: string): string {
  const map: Record<string, string> = {
    permintaan_uang: "Permintaan Uang",
    tekanan_waktu: "Tekanan Waktu",
    tawaran_berlebihan: "Tawaran Berlebihan",
    tautan: "Tautan Mencurigakan",
    urgensi: "Urgensi",
    ekstensi_berkas: "Ekstensi Berkas",
    ekstensi_berbahaya: "Ekstensi Berkas",
    ekstensi_ganda: "Ekstensi Ganda",
    rekayasa_sosial: "Rekayasa Sosial",
    sumber_pengunduhan: "Sumber Pengunduhan",
    izin_berbahaya: "Izin Aplikasi",
    protokol_keamanan: "Protokol Keamanan",
    domain_mencurigakan: "Domain Berisiko",
    peniruan_domain: "Peniruan Merk / Domain",
    halaman_jebakan: "Halaman Jebakan Login",
    pemendek_tautan: "Pemendek Tautan",
    unduhan_berbahaya: "Unduhan Langsung Berbahaya",
  };
  if (map[category]) return map[category];
  return category
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getGaugeColor(band: Band): string {
  switch (band) {
    case "sangat_tinggi":
      return "#DC2626"; // Merah
    case "tinggi":
      return "#F97316"; // Orange
    case "waspada":
      return "#EAB308"; // Kuning
    case "belum_terlihat":
    default:
      return "#10B981"; // Emerald green
  }
}

function getRiskBandInfo(band: Band, kind?: TabKind) {
  switch (band) {
    case "sangat_tinggi":
      return {
        title: "Risiko Sangat Tinggi",
        badgeStyle: "bg-red-500/20 text-red-300 border border-red-500/35",
        activeColor: "text-red-400",
        activeBg: "bg-red-500",
        Icon: ShieldAlert,
        summary:
          kind === "link"
            ? "Tautan ini terindikasi sangat berbahaya: meniru domain institusi/bank resmi (typosquatting), memicu unduhan paket aplikasi mentah (.apk), atau mengarah ke laman phishing."
            : kind === "file"
            ? "Berkas ini terindikasi malware berbahaya tingkat tinggi: menggunakan format paket Android mentah (.apk) serta meminta izin kritis seperti penyadapan SMS/OTP dan kendali aksesibilitas."
            : "Pesan ini menunjukkan pola penipuan yang sangat kuat: iming-iming imbalan berlebihan, desakan waktu, atau permintaan transfer dana di muka.",
      };
    case "tinggi":
      return {
        title: "Risiko Tinggi",
        badgeStyle: "bg-orange-500/20 text-orange-300 border border-orange-500/35",
        activeColor: "text-orange-400",
        activeBg: "bg-orange-500",
        Icon: AlertTriangle,
        summary:
          kind === "link"
            ? "Tautan mencurigakan: menggunakan pemendek tautan untuk menyamarkan alamat asli, menggunakan TLD berisiko tinggi, atau memuat jalur pancingan login."
            : kind === "file"
            ? "Berkas berisiko: diterima melalui pesan langsung tanpa verifikasi toko aplikasi resmi (sideloading) atau meminta izin sensitif seperti kontak atau screen overlay."
            : "Pesan ini memiliki pola mencurigakan dengan indikasi manipulasi psikologis, desakan waktu mendadak, atau rekayasa sosial.",
      };
    case "waspada":
      return {
        title: "Waspada",
        badgeStyle: "bg-amber-500/20 text-amber-300 border border-amber-500/35",
        activeColor: "text-amber-400",
        activeBg: "bg-amber-500",
        Icon: AlertCircle,
        summary:
          kind === "link"
            ? "Tautan perlu diwaspadai karena menggunakan protokol tanpa enkripsi (HTTP) atau alamat situs yang belum lazim. Verifikasi sebelum membukanya."
            : kind === "file"
            ? "Nama berkas memuat kata pancingan psikologis (undangan, resi, tilang) atau meminta izin tambahan yang perlu diperiksa kegunaannya."
            : "Ditemukan anomali bahasa atau kata-kata yang tidak biasa. Lakukan verifikasi identitas pengirim sebelum bertindak.",
      };
    case "belum_terlihat":
    default:
      return {
        title: "Belum Terlihat Bahaya",
        badgeStyle: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/35",
        activeColor: "text-emerald-400",
        activeBg: "bg-emerald-500",
        Icon: ShieldCheck,
        summary:
          kind === "link"
            ? "Tidak ditemukan pola peniruan domain atau tautan berbahaya berdasarkan basis aturan saat ini. Tetap pastikan alamat situs sebelum memasukkan kata sandi."
            : kind === "file"
            ? "Ekstensi dan izin yang dicantumkan belum menunjukkan tanda bahaya khas paket malware. Tetap prioritaskan unduhan dari Google Play Store resmi."
            : "Tidak ditemukan indikasi penipuan atau manipulasi mencurigakan berdasarkan aturan saat ini. Tetap jaga kerahasiaan data pribadimu.",
      };
  }
}

export default function Cek() {
  const [activeTab, setActiveTab] = useState<TabKind>("message");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [source, setSource] = useState<"whatsapp" | "telegram" | "email" | "toko_resmi" | "lainnya">("whatsapp");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [lastInput, setLastInput] = useState<AnalyzeInput | null>(null);
  const [expandedFlags, setExpandedFlags] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  function toggleFlag(idx: number) {
    setExpandedFlags((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  }

  function handleTabChange(tab: TabKind) {
    setActiveTab(tab);
    setError(null);
    setResult(null);
    setLastInput(null);
    setExpandedFlags({});
  }

  function handleAnalyze(input: AnalyzeInput) {
    setError(null);
    setLastInput(input);
    setExpandedFlags({});
    try {
      const res = analyze(input);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan analisis.");
    }
  }

  function handleCheckMessage() {
    if (!text.trim()) {
      setError("Isi pesan terlebih dahulu, atau gunakan tombol 'Coba contoh fiktif'.");
      return;
    }
    handleAnalyze({ kind: "message", text });
  }

  function handleCheckLink() {
    if (!url.trim()) {
      setError("Masukkan tautan (URL) terlebih dahulu, atau gunakan tombol 'Coba tautan contoh'.");
      return;
    }
    handleAnalyze({ kind: "link", url });
  }

  function handleCheckFile() {
    if (!fileName.trim()) {
      setError("Masukkan atau pilih nama berkas terlebih dahulu, atau gunakan tombol 'Coba berkas contoh'.");
      return;
    }
    handleAnalyze({
      kind: "file",
      fileName,
      source,
      permissions,
    });
  }

  const loadExampleMessage = () => {
    setText(EXAMPLE_MESSAGE);
    handleAnalyze({ kind: "message", text: EXAMPLE_MESSAGE });
  };

  const loadExampleLink = () => {
    setUrl(EXAMPLE_LINK);
    handleAnalyze({ kind: "link", url: EXAMPLE_LINK });
  };

  const loadExampleFile = () => {
    setFileName(EXAMPLE_FILE.fileName);
    setSource(EXAMPLE_FILE.source);
    setPermissions(EXAMPLE_FILE.permissions);
    handleAnalyze({
      kind: "file",
      fileName: EXAMPLE_FILE.fileName,
      source: EXAMPLE_FILE.source,
      permissions: EXAMPLE_FILE.permissions,
    });
  };

  const currentKind: TabKind = lastInput?.kind || activeTab;
  const bandInfo = result ? getRiskBandInfo(result.band, currentKind) : null;

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Header Kotak Putih: Judul & Tab Navigasi */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-5">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#27374D]">
            Cek Indikasi Tipuan Digital
          </h1>
          <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
            Tempel pesan, tautan, atau periksa ekstensi berkas. Semua analisis diproses langsung di perangkatmu tanpa kirim data ke server luar.
          </p>
        </div>

        {/* Tabs Navigasi Kategori Cek */}
        <div className="flex border-b border-[#9DB2BF]/30 gap-6 pt-1" role="tablist" aria-label="Kategori Pemeriksaan">
          <button
            role="tab"
            type="button"
            aria-selected={activeTab === "message"}
            className={`flex items-center gap-2 pb-2.5 text-xs sm:text-sm font-bold transition-all min-h-[42px] cursor-pointer border-b-2 -mb-px ${
              activeTab === "message"
                ? "border-[#27374D] text-[#27374D]"
                : "border-transparent text-[#526D82] hover:text-[#27374D]"
            }`}
            onClick={() => handleTabChange("message")}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Pesan</span>
          </button>

          <button
            role="tab"
            type="button"
            aria-selected={activeTab === "link"}
            className={`flex items-center gap-2 pb-2.5 text-xs sm:text-sm font-bold transition-all min-h-[42px] cursor-pointer border-b-2 -mb-px ${
              activeTab === "link"
                ? "border-[#27374D] text-[#27374D]"
                : "border-transparent text-[#526D82] hover:text-[#27374D]"
            }`}
            onClick={() => handleTabChange("link")}
          >
            <Link2 className="h-4 w-4" />
            <span>Tautan</span>
          </button>

          <button
            role="tab"
            type="button"
            aria-selected={activeTab === "file"}
            className={`flex items-center gap-2 pb-2.5 text-xs sm:text-sm font-bold transition-all min-h-[42px] cursor-pointer border-b-2 -mb-px ${
              activeTab === "file"
                ? "border-[#27374D] text-[#27374D]"
                : "border-transparent text-[#526D82] hover:text-[#27374D]"
            }`}
            onClick={() => handleTabChange("file")}
          >
            <FileCheck className="h-4 w-4" />
            <span>Berkas & Izin</span>
          </button>
        </div>
      </div>

      {/* Warning Privasi */}
      <div className="flex items-start gap-2.5 rounded-xl bg-[#FFFBF0] border border-[#FDE68A] p-3 sm:p-3.5 text-xs text-[#92400E] shadow-2xs">
        <div className="flex h-4 w-4 shrink-0 items-center justify-center text-amber-600 mt-0.5">
          <ShieldAlert className="h-4 w-4" />
        </div>
        <p className="leading-relaxed">
          <strong className="font-bold text-[#78350F]">Perlindungan Privasi —</strong> Hindari memasukkan data sensitif (seperti password atau nomor kartu). Sistem ini menyamarkan nomor telepon dan rekening bank secara otomatis pada hasil deteksi.
        </p>
      </div>

      {/* Input Tab: Pesan */}
      {activeTab === "message" && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <label htmlFor="message-input" className="text-slate-500">
                TEKS PESAN / CHAT
              </label>
              <span className="font-mono text-slate-400 font-medium">
                {text.length} / {INPUT_MAX_CHARS} karakter
              </span>
            </div>
            <textarea
              id="message-input"
              rows={4}
              maxLength={INPUT_MAX_CHARS}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tempel pesan yang terasa mencurigakan di sini..."
              className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCheckMessage}
              className="rounded-xl bg-[#27374D] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#1E293B] transition-colors shadow-xs cursor-pointer"
            >
              Periksa Pesan
            </button>
            <button
              type="button"
              onClick={loadExampleMessage}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Coba contoh fiktif
            </button>
          </div>
        </div>
      )}

      {/* Input Tab: Link */}
      {activeTab === "link" && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="space-y-2">
            <label htmlFor="url-input" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              ALAMAT TAUTAN (URL)
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Contoh: http://mandiri-verifikasi.xyz/unblock-pin"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <p className="text-[11px] text-slate-500">
              Tautan tidak akan dibuka atau dikunjungi oleh peramban. Sistem menganalisis protokol, domain, pemendek link, dan kata kunci berbahaya secara luring.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCheckLink}
              className="rounded-xl bg-[#27374D] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#1E293B] transition-colors shadow-xs cursor-pointer"
            >
              Periksa Tautan
            </button>
            <button
              type="button"
              onClick={loadExampleLink}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Coba tautan contoh
            </button>
          </div>
        </div>
      )}

      {/* Input Tab: File & Izin */}
      {activeTab === "file" && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="file-name" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                NAMA BERKAS & EKSTENSI
              </label>
              <input
                id="file-name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Contoh: Undangan_Pernikahan.pdf.apk"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <p className="text-[11px] text-slate-500">
                Hanya membaca nama dan ekstensi berkas. Isi file tidak dibaca atau diunggah ke server manapun.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="file-source" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                SUMBER DITERIMA
              </label>
              <select
                id="file-source"
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white text-slate-800 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="whatsapp">WhatsApp / Telegram (Pesan Langsung / Sideload)</option>
                <option value="email">Email</option>
                <option value="toko_resmi">Toko Aplikasi Resmi (Google Play Store / App Store)</option>
                <option value="lainnya">Situs Web / Unduhan Peramban</option>
              </select>
            </div>

            {/* Selector Izin Android */}
            <div className="space-y-2 pt-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                IZIN APLIKASI YANG DIMINTA (PILIH YANG SESUAI)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AVAILABLE_PERMISSIONS.map((perm) => {
                  const isChecked = permissions.includes(perm.id);
                  return (
                    <label
                      key={perm.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? "border-[#27374D] bg-[#27374D]/5 text-[#27374D] shadow-2xs"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPermissions([...permissions, perm.id]);
                          } else {
                            setPermissions(permissions.filter((p) => p !== perm.id));
                          }
                        }}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#27374D] focus:ring-[#27374D]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold text-slate-900">{perm.name}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              perm.badge === "Kritis"
                                ? "bg-red-100 text-red-700"
                                : perm.badge === "Tinggi"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {perm.badge}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                          {perm.desc}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCheckFile}
              className="rounded-xl bg-[#27374D] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#1E293B] transition-colors shadow-xs cursor-pointer"
            >
              Periksa Berkas
            </button>
            <button
              type="button"
              onClick={loadExampleFile}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Coba berkas contoh
            </button>
          </div>
        </div>
      )}

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs sm:text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =================================================================== */}
      {/* HASIL ANALISIS                                                      */}
      {/* =================================================================== */}
      {result && bandInfo && (
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
          {/* Header Kartu Hasil Analisis */}
          <div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
              INDIKASI RISIKO
            </span>
          </div>

          {/* Hero Box Charcoal Gelap (Visual Indikator Ikon & Persenan + Status Badge & Deskripsi) */}
          <div className="rounded-2xl bg-[#1E1E1E] p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center gap-5 sm:gap-6 shadow-md border border-white/5">
            {/* Visual Indikator Skor Berbasis Ikon & Persenan (Tanpa Brush Mengganggu) */}
            <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 shrink-0 items-center justify-center">
              {/* Cincin Lingkaran Luar dengan Ambient Halo Sesuai Tingkat Risiko */}
              <div
                className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                  result.band === "sangat_tinggi"
                    ? "border-red-500/50 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                    : result.band === "tinggi"
                    ? "border-orange-500/50 bg-orange-950/20 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                    : result.band === "waspada"
                    ? "border-amber-500/50 bg-amber-950/20 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                    : "border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                }`}
              />

              {/* Plat Tengah Elevated Charcoal dengan Ikon & Persenan Bersih */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-[#18181B] shadow-[inset_0_2px_4px_rgba(255,255,255,0.08),0_6px_20px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col items-center justify-center text-center z-10 p-2 select-none">
                {/* Ikon Indikator Risiko */}
                <bandInfo.Icon
                  className={`h-6 w-6 sm:h-7 sm:w-7 mb-1 shrink-0 ${
                    result.band === "sangat_tinggi"
                      ? "text-red-400 animate-bounce-short"
                      : result.band === "tinggi"
                      ? "text-orange-400"
                      : result.band === "waspada"
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                />

                {/* Angka Skor dalam Persenan */}
                <span className="text-xl sm:text-2xl font-black text-white leading-none tracking-tight">
                  {result.score}%
                </span>

                {/* Label Subtitle */}
                <span className="text-[8px] sm:text-[9px] text-neutral-400 font-bold uppercase tracking-wider mt-1">
                  {result.band === "belum_terlihat" ? "Aman" : "Risiko"}
                </span>
              </div>
            </div>

            {/* Informasi Tingkat Risiko, Progress Meter Persenan & Ringkasan Narasi */}
            <div className="flex-1 space-y-3 text-center sm:text-left w-full">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${bandInfo.badgeStyle}`}>
                  <bandInfo.Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{bandInfo.title}</span>
                </span>
                <span className="text-xs font-mono font-bold text-neutral-300">
                  Tingkat Risiko: <strong className="text-white">{result.score}%</strong>
                </span>
              </div>

              {/* Bar Meter Persenan Ramping & Modern */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      result.band === "sangat_tinggi"
                        ? "bg-gradient-to-r from-orange-500 via-rose-500 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                        : result.band === "tinggi"
                        ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                        : result.band === "waspada"
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                        : "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, result.score))}%` }}
                  />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {bandInfo.summary}
              </p>
            </div>
          </div>

          {/* Daftar Tanda Peringatan Ditemukan ATAU Kondisi Bersih */}
          {result.flags.length === 0 ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-emerald-950">
                  Tidak Ditemukan Tanda Bahaya Mencurigakan
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed font-normal">
                  Pemeriksaan aturan luring tidak mendeteksi indikator pemerasan, manipulasi teks, domain mencurigakan, atau paket aplikasi berisiko tinggi.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900">
                Tanda Peringatan Ditemukan
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
                {result.flags.map((flag, idx) => {
                  const isExpanded = !!expandedFlags[idx];
                  return (
                    <div
                      key={flag.ruleId || idx}
                      className="rounded-2xl border border-amber-200/70 bg-[#FFFDF9] p-4 sm:p-5 space-y-3 shadow-2xs transition-all h-fit"
                    >
                      <div className="space-y-2.5">
                        {/* Baris Atas: Label Kategori */}
                        <div className="text-xs text-slate-400">
                          Kategori:{" "}
                          <span className="font-medium text-slate-600">
                            {formatCategoryName(flag.category)}
                          </span>
                        </div>

                        {/* Kenapa Mencurigakan */}
                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <strong className="font-bold text-slate-900">Kenapa mencurigakan: </strong>
                          <span>{flag.why}</span>
                        </div>
                      </div>

                      {/* Tombol Tampilkan / Sembunyikan Cara Verifikasi & Konten Collapsible */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => toggleFlag(idx)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-1.5 transition-all shadow-2xs cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? "Tutup cara verifikasi" : "Cara verifikasi"}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5 text-slate-500" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                          )}
                        </button>

                        {/* Konten Cara Verifikasi yang Muncul ke Bawah Setelah Diklik */}
                        {isExpanded && (
                          <div className="rounded-xl bg-white border border-slate-100 p-3 sm:p-3.5 flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-2xs mt-2.5 transition-all animate-in fade-in slide-in-from-top-1 duration-200">
                            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold text-slate-900">Cara verifikasi: </strong>
                              <span>{flag.verify}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Disclaimer Wajib di Bawah */}
          {result.disclaimer && (
            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-2 border-t border-slate-100">
              {result.disclaimer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
