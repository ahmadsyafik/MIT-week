/**
 * API PUBLIK @jagaruang/core: ini yang dipakai Frontend.
 * Semua fungsi di bawah masih STUB (throw). Backend mengisinya sesuai
 * docs/backend/TASK_GUIDE.md. JANGAN ubah tanda tangan fungsi tanpa RFC.
 * Frontend memakai mock di apps/web/src/mocks sampai fungsi ini selesai.
 */
import type {
  ActionGuide,
  AnalysisResult,
  AnalyzeInput,
  CaseDebrief,
  CaseDefinition,
  CaseSession,
  LocalProgress,
  MalwareType,
  MaskResult,
  Modus,
  ReportChannel,
  TriageChoice,
  TriageMessage,
  TriageResult,
  WarningCard,
  RedFlag,
  PiiKind,
} from "@jagaruang/contracts";
import { DISCLAIMER } from "@jagaruang/contracts";
import { computeScore, scoreToBand } from "./scoring";

function notImplemented(task: string): never {
  throw new Error(`NOT_IMPLEMENTED: ${task}`);
}

/* Cek */
export function maskPii(text: string): MaskResult {
  const found: PiiKind[] = [];
  let masked = text || "";
  if (/\b(\+?62|0)8[1-9][0-9]{7,10}\b/.test(masked)) {
    masked = masked.replace(/\b(\+?62|0)8[1-9][0-9]{7,10}\b/g, "0812-XXXX-XXXX");
    found.push("phone");
  }
  if (/\b\d{10,16}\b/.test(masked)) {
    masked = masked.replace(/\b\d{10,16}\b/g, "[REKENING DISAMARKAN]");
    found.push("account");
  }
  return { masked, found };
}

export function analyze(input: AnalyzeInput): AnalysisResult {
  if (input.kind === "message") {
    return analyzeMessageCore(input.text);
  } else if (input.kind === "link") {
    return analyzeLinkCore(input.url);
  } else {
    return analyzeFileCore(input.fileName, input.source, input.permissions || []);
  }
}

function analyzeMessageCore(rawText: string): AnalysisResult {
  const text = (rawText || "").trim();
  const lower = text.toLowerCase();
  const flags: RedFlag[] = [];
  const modus: string[] = [];
  const { masked: displayText, found: piiMasked } = maskPii(text);

  if (/transfer|rekening|biaya\s*admin|saldo|kirim\s*uang|bayar|top\s*up|tagihan|pembayaran/i.test(lower)) {
    flags.push({
      ruleId: "MSG-PAYMENT-01",
      level: "L4",
      category: "permintaan_uang",
      why: "Pesan meminta transfer uang atau pembayaran biaya mendadak.",
      verify: "Lakukan verifikasi langsung secara tatap muka atau hubungi nomor resmi pihak terkait sebelum mengirim uang.",
    });
  }

  if (/hari\s*ini|segera|dalam\s*\d+\s*(menit|jam)|sekarang\s*juga|diblokir|batas\s*waktu|sebelum\s*hangus|darurat/i.test(lower)) {
    flags.push({
      ruleId: "MSG-PRESSURE-02",
      level: "L2",
      category: "tekanan_waktu",
      why: "Menggunakan kata-kata desakan waktu agar korban panik dan tidak sempat berpikir jernih.",
      verify: "Tarik napas dan tetap tenang. Lembaga resmi tidak akan menekan korban dengan batas waktu ekstrem beberapa menit.",
    });
  }

  if (/gaji\s*\d+|juta\s*\/\s*(minggu|bulan)|hadiah|selamat\s*anda\s*terpilih|pemenang|undian|menang|wfh|bonus\s*cuma/i.test(lower)) {
    flags.push({
      ruleId: "MSG-OFFER-03",
      level: "L3",
      category: "tawaran_berlebihan",
      why: "Menjanjikan uang atau hadiah besar tanpa keikutsertaan lomba resmi atau kualifikasi yang wajar.",
      verify: "Bandingkan dengan informasi di portal karir atau situs promo resmi perusahaan terkait.",
    });
    modus.push("loker_palsu");
  }

  if (/https?:\/\/[^\s]+|\.apk|\.xyz|\.top|bit\.ly|s\.id|tinyurl/i.test(lower)) {
    flags.push({
      ruleId: "MSG-LINK-04",
      level: "L3",
      category: "tautan",
      why: "Tautan tidak dikenal mengarahkan pengguna ke situs web berbahaya atau unduhan aplikasi luar.",
      verify: "Jangan klik tautan tersebut. Cari alamat situs resmi lewat mesin pencari terpercaya.",
    });
  }

  if (/bank\s*(mandiri|bca|bri|bni)|kurir|jne|j&t|sicepat|paket\s*anda|surat\s*tilang|bpjs|djp|pajak|polri/i.test(lower)) {
    flags.push({
      ruleId: "MSG-IMPERSONATE-05",
      level: "L3",
      category: "peniruan_identitas",
      why: "Pelaku berpura-pura menjadi institusi resmi atau kurir untuk mencuri kepercayaan korban.",
      verify: "Hubungi call center resmi institusi yang dicatut melalui nomor telepon resmi yang tertera di situs asli.",
    });
  }

  const isSafetyWarning = /jangan\s*(pernah\s*)?(bagikan|kasih|berikan|infokan)\s*(kode\s*)?(otp|pin)/i.test(lower);
  if (!isSafetyWarning && /\b(otp|pin|kode\s*rahasia|kode\s*verifikasi|password)\b/i.test(lower)) {
    flags.push({
      ruleId: "MSG-OTP-06",
      level: "L5",
      category: "data_sensitif",
      why: "Meminta kode OTP atau PIN rahasia untuk membobol akun perbankan/e-wallet korban.",
      verify: "Pihak bank atau penyedia layanan mana pun tidak pernah meminta kode OTP atau PIN Anda untuk alasan apa pun.",
    });
  }

  const { score, hasL5 } = computeScore(flags);
  const band = flags.length === 0 ? "belum_terlihat" : scoreToBand(score, hasL5);

  return {
    score: flags.length === 0 ? 0 : score,
    band,
    modus,
    malwareTypes: [],
    displayText,
    piiMasked,
    flags,
    disclaimer: DISCLAIMER,
  };
}

function analyzeLinkCore(rawUrl: string): AnalysisResult {
  const url = (rawUrl || "").trim();
  const lower = url.toLowerCase();
  const flags: RedFlag[] = [];
  const modus: string[] = [];

  if (/^http:\/\//i.test(url)) {
    flags.push({
      ruleId: "LNK-PROTO-01",
      level: "L2",
      category: "protokol_keamanan",
      why: "Tautan menggunakan protokol HTTP tanpa enkripsi SSL/TLS, data sensitif yang dikirim rentan disadap atau dipalsukan.",
      verify: "Situs layanan keuangan dan login resmi wajib menggunakan protokol aman berawalan https:// dengan sertifikat valid.",
    });
  }

  if (/\.(xyz|top|tk|ml|cf|gq|site|invalid|online|club|buzz|icu|vip|work|click)(\/|$|\?)/i.test(lower)) {
    flags.push({
      ruleId: "LNK-TLD-02",
      level: "L3",
      category: "domain_mencurigakan",
      why: "Domain menggunakan ekstensi TLD bebas/murah (.xyz, .top, .site, dll.) yang sering dimanfaatkan sindikat penipuan untuk membuat situs tiruan jangka pendek.",
      verify: "Periksa alamat domain instansi resmi yang umumnya menggunakan domain beridentitas jelas (.co.id, .id, atau .com resmi).",
    });
  }

  const bankCourierKeywords = ["mandiri", "bca", "bri", "bni", "klikbca", "jne", "jnt", "pos", "doku", "dana", "gopay", "shopee", "lazada", "tokopedia"];
  const isOfficialDomain = /(bankmandiri\.co\.id|bca\.co\.id|bri\.co\.id|bni\.co\.id|jne\.co\.id|shopee\.co\.id|tokopedia\.com)(\/|$)/i.test(lower);
  const hasBrandName = bankCourierKeywords.some((brand) => lower.includes(brand));
  if (hasBrandName && !isOfficialDomain) {
    flags.push({
      ruleId: "LNK-TYPO-03",
      level: "L5",
      category: "peniruan_domain",
      why: "Nama instansi/bank dicatut dalam susunan subdomain atau domain palsu untuk mengelabui korban (typosquatting).",
      verify: "Ketik alamat bank langsung di address bar peramban, jangan pernah membuka tautan perbankan dari pesan singkat.",
    });
    modus.push("phishing_perbankan");
  }

  if (/(verifikasi|login|unblock|blokir|klaim|hadiah|bansos|bantuan|update|aktivasi|auth)/i.test(lower)) {
    flags.push({
      ruleId: "LNK-PATH-04",
      level: "L3",
      category: "halaman_jebakan",
      why: "Jalur URL mengarahkan ke formulir pancingan untuk mencuri kredensial login atau data pribadi perbankan.",
      verify: "Pastikan Anda hanya login melalui aplikasi resmi atau alamat domain resmi terverifikasi.",
    });
  }

  if (/(bit\.ly|s\.id|tinyurl\.com|is\.gd|t\.co|cutt\.ly)/i.test(lower)) {
    flags.push({
      ruleId: "LNK-SHORT-05",
      level: "L2",
      category: "tautan_terselubung",
      why: "Tautan dipendekkan untuk menyamarkan alamat tujuan asli yang sebenarnya di balik tautan.",
      verify: "Gunakan fitur intip tautan (preview) sebelum membuka, atau abaikan jika dari pengirim yang tidak dikenal.",
    });
  }

  if (/(\.apk|\.exe|\.bat|\.zip)(\?|$)/i.test(lower) || lower.includes(".apk")) {
    flags.push({
      ruleId: "LNK-DOWNLOAD-06",
      level: "L5",
      category: "unduhan_berbahaya",
      why: "Tautan secara langsung memicu unduhan berkas paket aplikasi mentah (.apk) dari peramban web.",
      verify: "Batalkan pengunduhan segera. Jangan pernah memasang aplikasi Android dari tautan di luar Google Play Store.",
    });
    modus.push("apk_tagihan_kurir");
  }

  const { score, hasL5 } = computeScore(flags);
  const band = flags.length === 0 ? "belum_terlihat" : scoreToBand(score, hasL5);

  return {
    score: flags.length === 0 ? 0 : score,
    band,
    modus,
    malwareTypes: [],
    displayText: url,
    flags,
    disclaimer: DISCLAIMER,
  };
}

function analyzeFileCore(
  fileName: string,
  source: "whatsapp" | "telegram" | "email" | "toko_resmi" | "lainnya",
  permissions: string[]
): AnalysisResult {
  const name = (fileName || "").trim();
  const lower = name.toLowerCase();
  const flags: RedFlag[] = [];
  const modus: string[] = [];
  const malwareTypes: string[] = [];

  const isApk = lower.endsWith(".apk") || lower.includes(".apk");
  if (isApk) {
    flags.push({
      ruleId: "FILE-EXT-01",
      level: "L5",
      category: "ekstensi_berkas",
      why: "Berkas berekstensi .apk adalah paket aplikasi Android mentah yang dapat mengeksekusi kode perusak atau pencuri data di perangkatmu.",
      verify: "Jangan pasang berkas ini. Instalasi aplikasi Android yang aman hanya dilakukan melalui Google Play Store resmi.",
    });
    modus.push("apk_tagihan_kurir");
  }

  const isDoubleExt = /\.(pdf|jpg|jpeg|png|doc|docx|xls|xlsx|mp4)\.apk$/i.test(lower);
  if (isDoubleExt) {
    flags.push({
      ruleId: "FILE-DOUBLE-02",
      level: "L4",
      category: "ekstensi_ganda",
      why: "Trik ekstensi ganda digunakan untuk mengelabui korban agar mengira file adalah dokumen atau foto, padahal merupakan program aplikasi jahat.",
      verify: "Perhatikan akhiran nama berkas paling kanan (.apk). Sistem Android membaca ekstensi terakhir sebagai jenis file eksekusi.",
    });
  }

  if (/(undangan|resi|paket|tilang|bpjs|foto|surat|pajak|tagihan)/i.test(lower)) {
    flags.push({
      ruleId: "FILE-NAME-03",
      level: "L2",
      category: "rekayasa_sosial",
      why: "Nama berkas menggunakan kata pancingan psikologis (undangan, resi, tilang) untuk memicu rasa panik atau penasaran agar segera dibuka.",
      verify: "Instansi resmi (Polri/ekspedisi) tidak pernah mengirim surat tilang atau resi paket berformat aplikasi .apk lewat chat.",
    });
  }

  if (source !== "toko_resmi" && isApk) {
    const sourceLabel = source === "whatsapp" ? "WhatsApp" : source === "telegram" ? "Telegram" : source === "email" ? "Email" : "Situs Web";
    flags.push({
      ruleId: "FILE-SOURCE-04",
      level: "L3",
      category: "sumber_pengunduhan",
      why: `Berkas aplikasi diterima dari jalur pesan tidak resmi (${sourceLabel}) tanpa pemeriksaan keamanan toko aplikasi (sideloading).`,
      verify: "Hanya unduh dan pasang aplikasi dari toko resmi terverifikasi seperti Google Play Store atau Apple App Store.",
    });
  }

  const hasSmsPerm = permissions.some((p) => p.includes("RECEIVE_SMS") || p.includes("READ_SMS"));
  if (hasSmsPerm) {
    flags.push({
      ruleId: "FILE-PERM-SMS-05",
      level: "L5",
      category: "izin_berbahaya",
      why: "Izin membaca/menerima SMS memungkinkan aplikasi memotong dan mencuri kode OTP perbankan atau e-wallet Anda tanpa disadari.",
      verify: "Tolak pemberian izin SMS pada aplikasi yang bukan aplikasi pesan SMS utama bawaan ponsel Anda.",
    });
    malwareTypes.push("malware_sms_forwarder");
  }

  const hasAccessibility = permissions.some((p) => p.includes("ACCESSIBILITY"));
  if (hasAccessibility) {
    flags.push({
      ruleId: "FILE-PERM-ACC-06",
      level: "L5",
      category: "izin_berbahaya",
      why: "Layanan aksesibilitas memberi kontrol mutlak kepada aplikasi untuk membaca seluruh ketukan tombol (keylogger) dan layar ponsel.",
      verify: "Jangan pernah mengaktifkan izin Aksesibilitas untuk aplikasi pihak ketiga yang tidak tepercaya.",
    });
    malwareTypes.push("malware_overlay");
  }

  const hasContacts = permissions.some((p) => p.includes("READ_CONTACTS"));
  if (hasContacts) {
    flags.push({
      ruleId: "FILE-PERM-CONTACTS-07",
      level: "L3",
      category: "izin_berbahaya",
      why: "Izin membaca kontak dapat digunakan malware untuk menyebarkan pesan jebakan ke daftar keluarga dan kerabat Anda.",
      verify: "Pertimbangkan apakah fungsi aplikasi benar-benar membutuhkan akses ke seluruh kontak pribadi Anda.",
    });
  }

  const hasOverlay = permissions.some((p) => p.includes("SYSTEM_ALERT_WINDOW"));
  if (hasOverlay) {
    flags.push({
      ruleId: "FILE-PERM-OVERLAY-08",
      level: "L4",
      category: "izin_berbahaya",
      why: "Aplikasi dapat menampilkan layar tiruan di atas aplikasi lain (screen overlay) untuk mencegat login m-banking.",
      verify: "Nonaktifkan izin tampil di atas aplikasi lain pada pengaturan privasi ponsel Anda.",
    });
  }

  let { score, hasL5 } = computeScore(flags);
  let band = flags.length === 0 ? "belum_terlihat" : scoreToBand(score, hasL5);

  if (source === "toko_resmi" && !isApk && !isDoubleExt) {
    if (band === "sangat_tinggi" || band === "tinggi") {
      band = "waspada";
      score = Math.min(score, 38);
    }
  }

  return {
    score: flags.length === 0 ? 0 : score,
    band,
    modus,
    malwareTypes,
    displayText: `${name} [Sumber: ${source}]`,
    flags,
    disclaimer: DISCLAIMER,
  };
}

/* Konten */
export function listMalwareTypes(): MalwareType[] {
  return notImplemented("BE-3.1 listMalwareTypes");
}
export function listModus(): Modus[] {
  return notImplemented("BE-3.1 listModus");
}
export function listCases(): CaseDefinition[] {
  return notImplemented("BE-3.2 listCases");
}
export function listActionGuides(): ActionGuide[] {
  return notImplemented("BE-4.1 listActionGuides");
}
export function listReportChannels(): ReportChannel[] {
  return notImplemented("BE-4.1 listReportChannels");
}

/* Latih */
export function startCase(_caseId: string): CaseSession {
  return notImplemented("BE-3.3 startCase");
}
export function tapEvidence(_s: CaseSession, _evidenceId: string): CaseSession {
  return notImplemented("BE-3.3 tapEvidence");
}
export function useHint(_s: CaseSession): CaseSession {
  return notImplemented("BE-3.3 useHint");
}
export function chooseOption(_s: CaseSession, _optionId: string): CaseSession {
  return notImplemented("BE-3.3 chooseOption");
}
export function getDebrief(_s: CaseSession): CaseDebrief {
  return notImplemented("BE-3.3 getDebrief");
}

/* Kilat 2 Menit */
export function pickTriageMessages(_count?: number, _seed?: number): TriageMessage[] {
  return notImplemented("BE-5.1 pickTriageMessages");
}
export function scoreTriage(
  _messages: TriageMessage[],
  _answers: Record<string, TriageChoice | null>,
): TriageResult {
  return notImplemented("BE-5.1 scoreTriage");
}

/* Lindungi / Sandi / Kartu */
export function generateSafeword(_wordCount?: 2 | 3): string {
  return notImplemented("BE-5.2 generateSafeword");
}
export function buildWarningCard(_result?: AnalysisResult): WarningCard {
  return {
    text: `JagaRuang: Yuk, Jaga Keluarga dari Penipuan Digital!

Halo Keluarga & Sahabat tersayang,
Akhir-akhir ini makin banyak modus penipuan online yang menyasar siapa saja, termasuk orang-orang terdekat kita. Yuk, kenali tandanya bersama-sama.

Ciri-ciri Pesan Mencurigakan:
Biasanya pelaku berpura-pura jadi orang yang kita kenal atau pihak resmi seperti bank atau kurir, lalu:
- Mendesak kita buru-buru transfer uang
- Mengirim file aneh berformat .apk
- Mengarahkan ke link yang bukan situs resmi

Apa yang Harus Kita Lakukan?
1. Jangan langsung klik link atau pasang file yang dikirim, sekalipun dari nomor yang kita kenal.
2. Jangan pernah kasih tahu kode OTP, PIN, atau data rekening ke siapa pun, walau mengaku dari bank sekalipun.
3. Cek dulu baru percaya. Kalau ragu, telepon langsung ke call center resmi atau tanya tatap muka ke orang yang bersangkutan.

Semua pengecekan di JagaRuang diproses langsung di perangkatmu, datamu aman dan tidak dikirim ke mana-mana. Yuk saling ingatkan, karena menjaga satu sama lain dimulai dari hal kecil seperti ini.

#JagaRuang #CekLatihLindungi #GuardiansOfTheDigitalSpace`,
  };
}

/* Penyimpanan lokal */
export const storage = {
  load(): LocalProgress {
    return notImplemented("BE-1.3 storage.load");
  },
  save(_p: LocalProgress): void {
    return notImplemented("BE-1.3 storage.save");
  },
  clearAll(): void {
    return notImplemented("BE-1.3 storage.clearAll");
  },
};
