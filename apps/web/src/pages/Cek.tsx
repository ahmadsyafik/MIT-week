import { useState } from "react";
import {
  MessageSquare,
  Link2,
  FileCheck,
  ShieldAlert,
  AlertCircle,
  Check,
} from "lucide-react";
import { INPUT_MAX_CHARS, type AnalysisResult, type AnalyzeInput, type Band } from "@jagaruang/contracts";
import { analyze } from "../lib/coreClient";
import { EXAMPLE_MESSAGE } from "../mocks/analysis";

type TabKind = "message" | "link" | "file";

function formatCategoryName(category: string): string {
  const map: Record<string, string> = {
    permintaan_uang: "Permintaan Uang",
    tekanan_waktu: "Tekanan Waktu",
    tawaran_berlebihan: "Tawaran Berlebihan",
    tautan: "Tautan",
    urgensi: "Urgensi",
    ekstensi_berbahaya: "Ekstensi Berkas",
    izin_berbahaya: "Izin Aplikasi",
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
      return "#EA580C";
    case "tinggi":
      return "#F97316";
    case "waspada":
      return "#EAB308";
    case "belum_terlihat":
    default:
      return "#3B82F6";
  }
}

function getRiskBandInfo(band: Band) {
  switch (band) {
    case "sangat_tinggi":
      return {
        title: "Risiko Sangat Tinggi",
        badgeStyle: "bg-[#C2410C]/35 text-[#FB923C] border border-[#EA580C]/40",
        activeColor: "text-[#EA580C]",
        activeBg: "bg-[#EA580C]",
        summary:
          "Pesan ini menunjukkan pola penipuan yang kuat: iming-iming kerja, tekanan waktu, dan permintaan transfer dana di muka.",
      };
    case "tinggi":
      return {
        title: "Risiko Tinggi",
        badgeStyle: "bg-[#EA580C]/25 text-[#FB923C] border border-[#EA580C]/40",
        activeColor: "text-[#F97316]",
        activeBg: "bg-[#F97316]",
        summary:
          "Pesan ini memiliki pola mencurigakan dengan indikasi manipulasi psikologis atau pengalihan rute akun.",
      };
    case "waspada":
      return {
        title: "Waspada",
        badgeStyle: "bg-[#CA8A04]/25 text-[#FDE047] border border-[#EAB308]/40",
        activeColor: "text-[#EAB308]",
        activeBg: "bg-[#EAB308]",
        summary:
          "Ditemukan anomali bahasa atau permintaan yang tidak biasa. Lakukan verifikasi sebelum bertindak.",
      };
    case "belum_terlihat":
    default:
      return {
        title: "Belum Terlihat Bahaya",
        badgeStyle: "bg-slate-700/50 text-slate-300 border border-slate-600",
        activeColor: "text-emerald-600",
        activeBg: "bg-emerald-600",
        summary:
          "Tidak ditemukan indikasi manipulasi mencurigakan berdasarkan aturan saat ini. Tetap berhati-hati dalam membagikan informasi.",
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
  const [error, setError] = useState<string | null>(null);

  function handleAnalyze(input: AnalyzeInput) {
    setError(null);
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
      setError("Masukkan tautan (URL) terlebih dahulu.");
      return;
    }
    handleAnalyze({ kind: "link", url });
  }

  function handleCheckFile() {
    if (!fileName.trim()) {
      setError("Masukkan atau pilih nama berkas terlebih dahulu.");
      return;
    }
    handleAnalyze({
      kind: "file",
      fileName,
      source,
      permissions,
    });
  }

  const loadExample = () => {
    setActiveTab("message");
    setText(EXAMPLE_MESSAGE);
    handleAnalyze({ kind: "message", text: EXAMPLE_MESSAGE });
  };

  const bandInfo = result ? getRiskBandInfo(result.band) : null;
  const currentBandIdx = result
    ? result.band === "belum_terlihat"
      ? 0
      : result.band === "waspada"
      ? 1
      : result.band === "tinggi"
      ? 2
      : 3
    : -1;

  // Donut Gauge math
  const gaugeRadius = 38;
  const circumference = 2 * Math.PI * gaugeRadius; // ~238.76
  const gaugeOffset = result
    ? circumference - (circumference * Math.min(100, Math.max(0, result.score))) / 100
    : circumference;

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Header Kotak Putih: Judul & Tab Navigasi */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-7 shadow-xs space-y-5">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#27374D]">
            Cek Indikasi Tipuan Digital
          </h1>
          <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
            Tempel pesan, tautan, atau periksa ekstensi berkas. Semua analisis diproses langsung di perangkatmu.
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
            onClick={() => {
              setActiveTab("message");
              setError(null);
            }}
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
            onClick={() => {
              setActiveTab("link");
              setError(null);
            }}
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
            onClick={() => {
              setActiveTab("file");
              setError(null);
            }}
          >
            <FileCheck className="h-4 w-4" />
            <span>Berkas & Izin</span>
          </button>
        </div>
      </div>

      {/* Warning Privasi (Gold / Amber Banner Sesuai Gambar) */}
      <div className="flex items-start gap-2.5 rounded-xl bg-[#FFFBF0] border border-[#FDE68A] p-3 sm:p-3.5 text-xs text-[#92400E] shadow-2xs">
        <div className="flex h-4 w-4 shrink-0 items-center justify-center text-amber-600 mt-0.5">
          <ShieldAlert className="h-4 w-4" />
        </div>
        <p className="leading-relaxed">
          <strong className="font-bold text-[#78350F]">Perlindungan Privasi —</strong> Hindari memasukkan data sensitif (seperti password atau nomor kartu). Sistem ini menyamarkan nomor telepon dan rekening bank secara otomatis.
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
              className="rounded-xl bg-black px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              Periksa Pesan
            </button>
            <button
              type="button"
              onClick={loadExample}
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
              placeholder="https://loker-resmi.invalid/daftar"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <p className="text-[11px] text-slate-500">
              Tautan tidak akan dibuka atau dikunjungi oleh peramban. Sistem hanya memeriksa susunan teks domain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCheckLink}
              className="rounded-xl bg-black px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              Periksa Tautan
            </button>
            <button
              type="button"
              onClick={() => {
                const sample = "http://undangan-nikah.example.com.apk-download.invalid";
                setUrl(sample);
                handleAnalyze({ kind: "link", url: sample });
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Coba tautan contoh
            </button>
          </div>
        </div>
      )}

      {/* Input Tab: File & Izin */}
      {activeTab === "file" && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="space-y-3">
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
                Hanya membaca nama dan ekstensi berkas. Isi file tidak dibaca atau diunggah.
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
                <option value="whatsapp">WhatsApp / Telegram (Pesan Langsung)</option>
                <option value="email">Email</option>
                <option value="toko_resmi">Toko Aplikasi Resmi (Play Store / App Store)</option>
                <option value="lainnya">Situs Web / Lainnya</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCheckFile}
              className="rounded-xl bg-black px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              Periksa Berkas
            </button>
            <button
              type="button"
              onClick={() => {
                setFileName("Surat_Tilang_Elektronik.apk");
                setSource("whatsapp");
                setPermissions(["android.permission.RECEIVE_SMS"]);
                handleAnalyze({
                  kind: "file",
                  fileName: "Surat_Tilang_Elektronik.apk",
                  source: "whatsapp",
                  permissions: ["android.permission.RECEIVE_SMS"],
                });
              }}
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
      {/* HASIL ANALISIS (PERSIS TAMPILAN GAMBAR REFERENSI DESAIN)            */}
      {/* =================================================================== */}
      {result && bandInfo && (
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
          {/* Header Kartu Hasil Analisis */}
          <div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
              INDIKASI RISIKO
            </span>
          </div>

          {/* Hero Box Charcoal Gelap (Donut Gauge + Status Badge & Deskripsi) */}
          <div className="rounded-2xl bg-[#1E1E1E] p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 shadow-md">
            {/* Donut Circular Gauge */}
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                {/* Track Lingkaran Abu Gelap */}
                <circle
                  cx="50"
                  cy="50"
                  r={gaugeRadius}
                  stroke="#2E2E32"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress Lingkaran Oranye/Merah */}
                <circle
                  cx="50"
                  cy="50"
                  r={gaugeRadius}
                  stroke={getGaugeColor(result.band)}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={gaugeOffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Angka Skor di Tengah Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-black text-white leading-none tracking-tight">
                  {result.score}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium mt-0.5">dari 100</span>
              </div>
            </div>

            {/* Informasi Tingkat Risiko & Ringkasan Narasi */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${bandInfo.badgeStyle}`}>
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{bandInfo.title}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {bandInfo.summary}
              </p>
            </div>
          </div>

          {/* 4-Segment Scale Bar (Horizontal) */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-4 gap-2">
              {/* Segment 1: Aman */}
              <div className="space-y-1.5 text-center">
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    currentBandIdx === 0 ? bandInfo.activeBg : "bg-slate-200"
                  }`}
                />
                <span
                  className={`text-[11px] block transition-colors ${
                    currentBandIdx === 0 ? `font-bold ${bandInfo.activeColor}` : "text-slate-400 font-medium"
                  }`}
                >
                  Aman
                </span>
              </div>

              {/* Segment 2: Waspada */}
              <div className="space-y-1.5 text-center">
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    currentBandIdx === 1 ? bandInfo.activeBg : "bg-slate-200"
                  }`}
                />
                <span
                  className={`text-[11px] block transition-colors ${
                    currentBandIdx === 1 ? `font-bold ${bandInfo.activeColor}` : "text-slate-400 font-medium"
                  }`}
                >
                  Waspada
                </span>
              </div>

              {/* Segment 3: Berisiko */}
              <div className="space-y-1.5 text-center">
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    currentBandIdx === 2 ? bandInfo.activeBg : "bg-slate-200"
                  }`}
                />
                <span
                  className={`text-[11px] block transition-colors ${
                    currentBandIdx === 2 ? `font-bold ${bandInfo.activeColor}` : "text-slate-400 font-medium"
                  }`}
                >
                  Berisiko
                </span>
              </div>

              {/* Segment 4: Sangat Tinggi */}
              <div className="space-y-1.5 text-center">
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    currentBandIdx === 3 ? bandInfo.activeBg : "bg-slate-200"
                  }`}
                />
                <span
                  className={`text-[11px] block transition-colors ${
                    currentBandIdx === 3 ? `font-bold ${bandInfo.activeColor}` : "text-slate-400 font-medium"
                  }`}
                >
                  Sangat Tinggi
                </span>
              </div>
            </div>
          </div>

          {/* Daftar Tanda Peringatan Ditemukan (Grid 2 Kolom) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-slate-900">
              Tanda Peringatan Ditemukan ({result.flags.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {result.flags.map((flag, idx) => (
                <div
                  key={flag.ruleId || idx}
                  className="rounded-2xl border border-amber-200/60 bg-[#FFFDF9] p-4 sm:p-5 space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {/* Baris Atas: Label Kategori */}
                    <div className="text-xs text-slate-400">
                      Kategori: <span className="font-medium text-slate-600">{formatCategoryName(flag.category)}</span>
                    </div>

                    {/* Kenapa Mencurigakan */}
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="font-bold text-slate-900">Kenapa mencurigakan: </strong>
                      <span>{flag.why}</span>
                    </div>
                  </div>

                  {/* Cara Verifikasi (White Inset Box) */}
                  <div className="rounded-xl bg-white border border-slate-100 p-3 sm:p-3.5 flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-2xs mt-auto">
                    <Check className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-slate-900">Cara verifikasi: </strong>
                      <span>{flag.verify}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
