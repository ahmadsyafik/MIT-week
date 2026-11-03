import { DISCLAIMER, type AnalysisResult, type AnalyzeInput } from "@jagaruang/contracts";

/** Contoh FIKTIF. Domain memakai .invalid/.test/example.com. */
export const EXAMPLE_MESSAGE =
  "Selamat! Anda terpilih jadi admin WFH. Gaji 8 juta/minggu. Transfer biaya admin Rp150.000 ke rekening 0000000000 hari ini. Info: http://loker-resmi.invalid/daftar";

export function mockAnalyze(_input: AnalyzeInput): AnalysisResult {
  return {
    score: 85,
    band: "sangat_tinggi",
    modus: ["loker_palsu"],
    malwareTypes: [],
    displayText: EXAMPLE_MESSAGE,
    flags: [
      {
        ruleId: "MSG-PAYMENT-01",
        level: "L4",
        category: "permintaan_uang",
        why: "Lowongan kerja yang sah tidak meminta biaya dari pelamar.",
        verify: "Cari lowongan di situs resmi perusahaan, bukan dari nomor yang menghubungimu.",
      },
      {
        ruleId: "MSG-PRESSURE-02",
        level: "L2",
        category: "tekanan_waktu",
        why: "Kata 'hari ini' dipakai untuk membuatmu terburu-buru.",
        verify: "Tenang dulu. Tanyakan ke orang tepercaya sebelum membalas.",
      },
      {
        ruleId: "MSG-OFFER-03",
        level: "L3",
        category: "tawaran_berlebihan",
        why: "Gaji sangat besar untuk pekerjaan ringan adalah umpan umum.",
        verify: "Bandingkan dengan gaji pasaran untuk posisi serupa.",
      },
      {
        ruleId: "MSG-LINK-04",
        level: "L2",
        category: "tautan",
        why: "Domain tidak dikenal dan bukan situs perusahaan.",
        verify: "Jangan klik. Cari situs resmi lewat mesin pencari.",
      },
    ],
    disclaimer: DISCLAIMER,
  };
}
