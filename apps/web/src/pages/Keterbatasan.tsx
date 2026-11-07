import { useState } from "react";
import {
  Trash2,
  CheckCircle2,
  Globe2,
  FileCode2,
  UserCheck,
  Cpu,
} from "lucide-react";
import { storage } from "../lib/coreClient";
import { useAuth } from "../context/AuthContext";
import { Disclaimer } from "../components/ui";

const PRIVACY_PILLARS = [
  {
    icon: Cpu,
    title: "100% Pemrosesan On-Device",
    desc: "Seluruh analisis pesan, tautan, dan izin berkas berjalan langsung di peramban (browser) pengguna tanpa mengirimkan data apa pun ke server eksternal.",
    highlight: "Zero-Server Transmission",
  },
  {
    icon: Globe2,
    title: "Tautan Tidak Pernah Dibuka",
    desc: "Sistem hanya mengevaluasi pola karakter teks URL (seperti domain typo, subdomain manipulatif, atau TLD mencurigakan). Browser tidak akan mengunjungi situs tersebut.",
    highlight: "Inspeksi Pola String Aman",
  },
  {
    icon: FileCode2,
    title: "Isi Berkas Tidak Pernah Dibaca",
    desc: "Pengecekan berkas hanya memeriksa nama dan ekstensi (misalnya format ganda mencurigakan seperti .pdf.apk). Isi file internal tidak pernah diunggah atau dieksekusi.",
    highlight: "Inspeksi Ekstensi Saja",
  },
  {
    icon: UserCheck,
    title: "Penyamaran Data Sensitif (PII)",
    desc: "Nomor telepon, nomor rekening bank, alamat email, dan NIK disamarkan secara otomatis saat ditampilkan untuk menjaga privasi pengguna.",
    highlight: "Masking Otomatis",
  },
];

const ANALYZER_TEST_CASES = [
  {
    caseText: "File 'Undangan_Pernikahan.apk' dikirim via WhatsApp",
    category: "Malware APK",
    expected: "Risiko Kritis",
    expectedColor: "bg-rose-50 text-rose-700 border-rose-200",
    result: "Risiko Kritis",
    resultColor: "bg-rose-50 text-rose-700 border-rose-200",
    status: "Sesuai",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    caseText: "Loker WFH gaji 8 juta/minggu, transfer admin Rp150.000",
    category: "Loker Palsu",
    expected: "Risiko Kritis",
    expectedColor: "bg-rose-50 text-rose-700 border-rose-200",
    result: "Risiko Kritis",
    resultColor: "bg-rose-50 text-rose-700 border-rose-200",
    status: "Sesuai",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    caseText: "Paket Anda tertunda, konfirmasi resi di http://jnt-lacak.invalid",
    category: "Tautan Phishing",
    expected: "Level Waspada",
    expectedColor: "bg-amber-50 text-amber-700 border-amber-200",
    result: "Level Waspada",
    resultColor: "bg-amber-50 text-amber-700 border-amber-200",
    status: "Sesuai",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    caseText: "Pesan percakapan biasa: 'Halo Kak, besok rapat jam berapa ya?'",
    category: "Pesan Normal",
    expected: "Belum Terlihat Bahaya",
    expectedColor: "bg-slate-100 text-[#526D82] border-[#9DB2BF]/40",
    result: "Belum Terlihat Bahaya",
    resultColor: "bg-slate-100 text-[#526D82] border-[#9DB2BF]/40",
    status: "Sesuai",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export default function Keterbatasan() {
  const [clearedMessage, setClearedMessage] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleClearData = () => {
    if (
      window.confirm(
        "Apakah kamu yakin ingin menghapus seluruh progres latihan, daftar checklist tindakan, dan notifikasi lokal di peramban ini?"
      )
    ) {
      storage.clearAll();
      try {
        localStorage.removeItem("jagaruang_notifications");
      } catch {
        // ignore
      }
      logout();
      setClearedMessage("Semua data lokal di perambanmu telah berhasil dibersihkan.");
      setTimeout(() => setClearedMessage(null), 6000);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      {/* Header Banner Halaman */}
      <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#27374D]">
            Keterbatasan & Kebijakan Privasi
          </h1>

          <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed max-w-3xl">
            Prinsip kejujuran teknis sejak awal: JagaRuang dirancang sebagai sarana edukasi literasi digital mandiri
            yang beroperasi secara <strong>100% On-Device</strong>, tanpa pengumpulan data pribadi, tanpa pelacak, dan
            mengutamakan keselamatan privasi pengguna.
          </p>
        </div>
      </div>

      {/* Callout Disclaimer Utama */}
      <Disclaimer />

      {/* 1. Empat Pilar Perlindungan Privasi (Grid 2x2 Modern) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
            1. Perlindungan Privasi (100% On-Device)
          </h2>
          <p className="text-xs text-[#526D82] mt-0.5">
            Komitmen keamanan arsitektur: data pengguna tidak pernah meninggalkan peramban.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRIVACY_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/50">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-sm font-bold text-[#27374D] pt-1">{p.title}</h3>
                  <p className="text-xs text-[#526D82] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Keterbatasan Teknis Analisis Berbasis Aturan */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
            2. Keterbatasan Teknis & Sifat Analisis
          </h2>
          <p className="text-xs text-[#526D82] mt-0.5">
            Pahami batasan heuristik agar tidak salah mengartikan hasil indikasi sebagai garansi mutlak.
          </p>
        </div>

        <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#DDE6ED]/30 p-4 border border-[#9DB2BF]/40 space-y-1.5">
              <h4 className="text-xs font-bold text-[#27374D]">
                Hasil Adalah Indikasi Probabilistik
              </h4>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Algoritma bekerja berdasarkan kecocokan 22 aturan heuristik bertingkat (L1–L5). Hasil analisis dapat
                keliru (false positive maupun false negative) saat menghadapi pola manipulasi baru.
              </p>
            </div>

            <div className="rounded-2xl bg-[#DDE6ED]/30 p-4 border border-[#9DB2BF]/40 space-y-1.5">
              <h4 className="text-xs font-bold text-[#27374D]">
                Bukan Bukti Bebas Risiko
              </h4>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Status <em>"Belum terlihat tanda bahaya"</em> bukan bukti bahwa pesan atau tautan terjamin 100% aman.
                Selalu lakukan verifikasi silang mandiri ke saluran resmi sebelum mengambil tindakan.
              </p>
            </div>

            <div className="rounded-2xl bg-[#DDE6ED]/30 p-4 border border-[#9DB2BF]/40 space-y-1.5">
              <h4 className="text-xs font-bold text-[#27374D]">
                Bukan Antivirus & Bukan Saluran Lapor
              </h4>
              <p className="text-xs text-[#526D82] leading-relaxed">
                JagaRuang adalah platform edukasi interaktif untuk mengasah insting dan refleks keputusan, bukan
                perangkat lunak antivirus sistem dan bukan saluran pelaporan hukum berwajib.
              </p>
            </div>

            <div className="rounded-2xl bg-[#DDE6ED]/30 p-4 border border-[#9DB2BF]/40 space-y-1.5">
              <h4 className="text-xs font-bold text-[#27374D]">
                Semua Contoh Bersifat Fiktif
              </h4>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Seluruh skenario latihan, nama perusahaan, nomor kontak contoh, dan domain menggunakan standar pengujian
                aman seperti <code>.invalid</code>, <code>.test</code>, atau <code>example.com</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Transparansi Uji Analyzer */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
            3. Transparansi Uji Analyzer
          </h2>
          <p className="text-xs text-[#526D82] mt-0.5">
            Hasil pengujian langsung terhadap set uji kalimat fiktif untuk akuntabilitas sistem.
          </p>
        </div>

        <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#9DB2BF]/30 bg-slate-50/80 text-[#27374D] font-bold">
                <tr>
                  <th className="px-5 py-3.5">Kasus Uji (Fiktif)</th>
                  <th className="px-4 py-3.5">Kategori</th>
                  <th className="px-4 py-3.5">Ekspektasi</th>
                  <th className="px-4 py-3.5">Hasil Sistem</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#9DB2BF]/20 text-[#27374D]">
                {ANALYZER_TEST_CASES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#DDE6ED]/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium max-w-xs">{item.caseText}</td>
                    <td className="px-4 py-3.5 text-[#526D82]">{item.category}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold border ${item.expectedColor}`}>
                        {item.expected}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold border ${item.resultColor}`}>
                        {item.result}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${item.statusColor}`}>
                        <CheckCircle2 className="h-3 w-3" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Pengelolaan Penyimpanan Lokal & Reset */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#27374D]">
            4. Pengelolaan Penyimpanan Lokal (Kendali Pengguna)
          </h2>
          <p className="text-xs text-[#526D82] mt-0.5">
            Anda memiliki kendali 100% untuk memeriksa atau menghapus seluruh jejak latihan di browser ini.
          </p>
        </div>

        <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <h3 className="text-sm font-bold text-[#27374D]">
                Bersihkan Seluruh Jejak Data Lokal
              </h3>
              <p className="text-xs text-[#526D82] leading-relaxed">
                Tindakan ini akan menghapus riwayat modul yang telah selesai, centang checklist panduan tindakan,
                riwayat notifikasi, serta sandi keluarga yang disimpan di <code>localStorage</code> peramban Anda.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearData}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 border border-rose-200 hover:bg-rose-100 hover:text-rose-800 active:scale-98 transition-all cursor-pointer shadow-xs shrink-0"
            >
              <Trash2 className="h-4 w-4" />
              <span>Hapus Semua Data Lokal</span>
            </button>
          </div>

          {clearedMessage && (
            <div
              role="status"
              className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-800"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{clearedMessage}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
