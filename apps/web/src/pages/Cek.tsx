import { useState } from "react";
import { AlertCircle, MessageSquare, Link as LinkIcon, FileCheck } from "lucide-react";
import { INPUT_MAX_CHARS, type AnalysisResult, type AnalyzeInput } from "@jagaruang/contracts";
import { analyze, USE_MOCK } from "../lib/coreClient";
import { EXAMPLE_MESSAGE } from "../mocks/analysis";
import { Button, Card, RiskMeter, FlagList, Disclaimer } from "../components/ui";

type TabKind = "message" | "link" | "file";

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
      setError("Isi pesan terlebih dahulu, atau gunakan tombol 'Coba contoh'.");
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

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Cek Indikasi Tipuan Digital
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base leading-relaxed">
          Tempel pesan, tautan, atau periksa ekstensi berkas. Semua analisis diproses langsung di perambanmu.
        </p>
      </div>

      {/* Tabs Navigasi Kategori Cek */}
      <div className="flex border-b border-slate-200 gap-1" role="tablist" aria-label="Kategori Pemeriksaan">
        <button
          role="tab"
          aria-selected={activeTab === "message"}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors min-h-[44px] cursor-pointer ${
            activeTab === "message"
              ? "border-slate-900 text-slate-900 font-semibold"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => {
            setActiveTab("message");
            setError(null);
          }}
        >
          <MessageSquare className="h-4 w-4" />
          Pesan
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "link"}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors min-h-[44px] cursor-pointer ${
            activeTab === "link"
              ? "border-slate-900 text-slate-900 font-semibold"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => {
            setActiveTab("link");
            setError(null);
          }}
        >
          <LinkIcon className="h-4 w-4" />
          Tautan
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "file"}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors min-h-[44px] cursor-pointer ${
            activeTab === "file"
              ? "border-slate-900 text-slate-900 font-semibold"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => {
            setActiveTab("file");
            setError(null);
          }}
        >
          <FileCheck className="h-4 w-4" />
          Berkas & Izin
        </button>
      </div>

      {/* Warning privasi di atas input */}
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200/80 p-3 text-xs text-amber-900">
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
        <span>
          <strong>Perlindungan Privasi:</strong> Hindari memasukkan data sensitif pribadi (seperti password atau nomor kartu).
          Sistem menyamarkan nomor telepon dan rekening bank secara otomatis.
        </span>
      </div>

      {/* Input Tab: Pesan */}
      {activeTab === "message" && (
        <Card className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <label htmlFor="message-input" className="font-medium text-slate-700">
                Teks Pesan / Chat
              </label>
              <span>{text.length} / {INPUT_MAX_CHARS} karakter</span>
            </div>
            <textarea
              id="message-input"
              rows={5}
              maxLength={INPUT_MAX_CHARS}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tempel pesan yang terasa mencurigakan di sini..."
              className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button onClick={handleCheckMessage}>Periksa Pesan</Button>
            <Button variant="outline" onClick={loadExample}>Coba contoh fiktif</Button>
          </div>
        </Card>
      )}

      {/* Input Tab: Link */}
      {activeTab === "link" && (
        <Card className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="url-input" className="font-medium text-xs text-slate-700">
              Alamat Tautan (URL)
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://loker-resmi.invalid/daftar"
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <p className="text-[11px] text-slate-500">
              Tautan tidak akan dibuka atau dikunjungi oleh peramban. Sistem hanya memeriksa susunan teks domain.
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <Button onClick={handleCheckLink}>Periksa Tautan</Button>
            <Button
              variant="outline"
              onClick={() => {
                const sample = "http://undangan-nikah.example.com.apk-download.invalid";
                setUrl(sample);
                handleAnalyze({ kind: "link", url: sample });
              }}
            >
              Coba tautan contoh
            </Button>
          </div>
        </Card>
      )}

      {/* Input Tab: File & Izin */}
      {activeTab === "file" && (
        <Card className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="file-name" className="font-medium text-xs text-slate-700">
                Nama Berkas & Ekstensi
              </label>
              <input
                id="file-name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Contoh: Undangan_Pernikahan.pdf.apk"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <p className="text-[11px] text-slate-500">
                Hanya membaca nama dan ekstensi berkas. Isi file tidak dibaca atau diunggah.
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="file-source" className="font-medium text-xs text-slate-700">
                Sumber Diterima
              </label>
              <select
                id="file-source"
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 p-2 text-sm bg-white"
              >
                <option value="whatsapp">WhatsApp / Telegram (Pesan Langsung)</option>
                <option value="email">Email</option>
                <option value="toko_resmi">Toko Aplikasi Resmi (Play Store / App Store)</option>
                <option value="lainnya">Situs Web / Lainnya</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button onClick={handleCheckFile}>Periksa Berkas</Button>
            <Button
              variant="outline"
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
            >
              Coba berkas contoh
            </Button>
          </div>
        </Card>
      )}

      {error && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Hasil Analisis */}
      {result && (
        <Card className="space-y-5 border-slate-300 bg-white shadow-sm">
          <RiskMeter band={result.band} />

          {result.displayText && (
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Teks yang Dianalisis
              </span>
              <p className="font-mono text-xs text-slate-800 break-words leading-relaxed">
                {result.displayText}
              </p>
            </div>
          )}

          <FlagList flags={result.flags} />

          <Disclaimer />
        </Card>
      )}

      {USE_MOCK && (
        <p className="text-xs text-slate-400 text-center">
          Mode data tiruan (mock) aktif — aman digunakan selama modul logika inti Backend sedang disiapkan.
        </p>
      )}
    </div>
  );
}
