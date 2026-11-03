import { useState } from "react";
import { ShieldCheck, HardDrive, EyeOff, AlertTriangle, Trash2, CheckCircle2 } from "lucide-react";
import { storage } from "../lib/coreClient";
import { Button, Card, CardTitle, CardDescription, Disclaimer } from "../components/ui";

export default function Keterbatasan() {
  const [clearedMessage, setClearedMessage] = useState<string | null>(null);

  const handleClearData = () => {
    if (window.confirm("Apakah kamu yakin ingin menghapus seluruh progres latihan dan data lokal di peramban ini?")) {
      storage.clearAll();
      setClearedMessage("Semua data lokal di perambanmu telah berhasil dibersihkan.");
      setTimeout(() => setClearedMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Keterbatasan dan Privasi
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Prinsip kejujuran sistem sejak awal: memahami apa yang dapat dan tidak dapat dilakukan oleh JagaRuang.
        </p>
      </div>

      <Disclaimer />

      {/* 1. Privasi & Pemrosesan di Perangkat */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <EyeOff className="h-5 w-5 text-slate-600" aria-hidden="true" />
          1. Privasi 100% di Perangkatmu (On-Device)
        </h2>
        <Card className="space-y-3">
          <ul className="space-y-2.5 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Tanpa Pengiriman Data:</strong> Seluruh proses analisis pesan, tautan, dan izin berkas berjalan
                langsung di browser pengguna. Tidak ada data yang dikirim ke server aplikasi atau pihak ketiga mana pun.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Tautan Tidak Pernah Dibuka:</strong> Sistem hanya mengecek pola karakter string URL (struktur domain,
                tld, subdomain mencurigakan). Browser tidak akan mengunjungi situs tersebut.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Isi Berkas Tidak Dibaca:</strong> Pengecekan file hanya memeriksa nama dan ekstensi (misal: ekstensi ganda
                seperti <code>.pdf.apk</code>). Konten asli di dalam berkas tidak dibaca.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Penyamaran Data Otomatis:</strong> Nomor telepon, rekening bank, email, dan NIK disamarkan secara otomatis
                saat ditampilkan untuk perlindungan privasi tambahan.
              </span>
            </li>
          </ul>
        </Card>
      </section>

      {/* 2. Keterbatasan Analisis */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-slate-600" aria-hidden="true" />
          2. Keterbatasan Analisis Berbasis Aturan
        </h2>
        <Card className="space-y-3">
          <ul className="space-y-2.5 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Hasil adalah Indikasi:</strong> Algoritma bekerja berdasarkan aturan heuristik (22 aturan bertingkat L1–L5).
                Hasil analisis dapat keliru (bisa terjadi false positive maupun false negative).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Bukan Klaim Terpercaya:</strong> Status <em>"Belum terlihat tanda bahaya"</em> bukan berarti sesuatu
                pasti dapat dipercaya sepenuhnya. Selalu verifikasi langsung melalui kontak atau situs resmi.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Bukan Antivirus & Bukan Saluran Pelaporan:</strong> JagaRuang adalah alat edukasi literasi digital interaktif,
                bukan perangkat lunak antivirus pengganti sistem proteksi perangkat, dan bukan saluran pengaduan hukum resmi.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span>
                <strong>Skenario Fiktif:</strong> Seluruh contoh simulasi dan domain menggunakan domain pengujian yang tidak aktif
                (seperti <code>.invalid</code>, <code>.test</code>, atau <code>example.com</code>).
              </span>
            </li>
          </ul>
        </Card>
      </section>

      {/* 3. Hasil Uji Analyzer Transparan */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-slate-600" aria-hidden="true" />
          3. Transparansi Uji Analyzer
        </h2>
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Kasus Uji (Fiktif)</th>
                <th className="px-4 py-2.5 font-semibold">Ekspektasi</th>
                <th className="px-4 py-2.5 font-semibold">Hasil Uji</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3">Undangan nikah file .apk di WhatsApp</td>
                <td className="px-4 py-3">Risiko sangat tinggi</td>
                <td className="px-4 py-3">Risiko sangat tinggi</td>
                <td className="px-4 py-3 font-medium text-slate-800">Sesuai</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Lowongan kerja minta uang transfer admin</td>
                <td className="px-4 py-3">Risiko sangat tinggi</td>
                <td className="px-4 py-3">Risiko sangat tinggi</td>
                <td className="px-4 py-3 font-medium text-slate-800">Sesuai</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Pesan umum: "Halo, apa kabar?"</td>
                <td className="px-4 py-3">Belum terlihat bahaya</td>
                <td className="px-4 py-3">Belum terlihat bahaya</td>
                <td className="px-4 py-3 font-medium text-slate-800">Sesuai</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* 4. Pengelolaan Data Lokal */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-slate-600" aria-hidden="true" />
          4. Pengelolaan Penyimpanan Lokal
        </h2>
        <Card className="space-y-4">
          <p className="text-sm text-slate-600">
            Aplikasi hanya menyimpan data progres simulasi dan daftar centang panduan tindakan di dalam
            <code>localStorage</code> peramban Anda. Anda memiliki kendali penuh untuk menghapusnya kapan saja.
          </p>

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="text-red-700 border-red-200 hover:bg-red-50 hover:text-red-800"
              onClick={handleClearData}
            >
              <Trash2 className="h-4 w-4" />
              Hapus semua data lokal
            </Button>
          </div>

          {clearedMessage && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{clearedMessage}</span>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}

