import {
  DISCLAIMER,
  type AnalysisResult,
  type AnalyzeInput,
  type RedFlag,
  type PiiKind,
} from "@jagaruang/contracts";
import { computeScore, scoreToBand } from "@jagaruang/core";

/** Contoh FIKTIF untuk Pesan, Link, dan Berkas. Domain memakai .invalid/.test/example.com. */
export const EXAMPLE_MESSAGE =
  "Selamat! Anda terpilih jadi admin WFH. Gaji 8 juta/minggu. Transfer biaya admin Rp150.000 ke rekening 0000000000 hari ini. Info: http://loker-resmi.invalid/daftar";

export const EXAMPLE_LINK =
  "http://mandiri-verifikasi.xyz/unblock-pin-rekening";

export const EXAMPLE_FILE = {
  fileName: "Undangan_Pernikahan.pdf.apk",
  source: "whatsapp" as const,
  permissions: [
    "android.permission.RECEIVE_SMS",
    "android.permission.BIND_ACCESSIBILITY_SERVICE",
  ],
};

export function mockAnalyze(input: AnalyzeInput): AnalysisResult {
  if (input.kind === "message") {
    return analyzeMessage(input.text);
  } else if (input.kind === "link") {
    return analyzeLink(input.url);
  } else {
    return analyzeFile(input.fileName, input.source, input.permissions || []);
  }
}

function analyzeMessage(rawText: string): AnalysisResult {
  const text = (rawText || "").trim();
  const lower = text.toLowerCase();
  const flags: RedFlag[] = [];
  const modus: string[] = [];
  const piiMasked: PiiKind[] = [];

  // Penyamaran data pribadi (PII) untuk tampilan
  let displayText = text;
  if (/\b(\+?62|0)8[1-9][0-9]{7,10}\b/.test(displayText)) {
    displayText = displayText.replace(
      /\b(\+?62|0)8[1-9][0-9]{7,10}\b/g,
      "0812-XXXX-XXXX"
    );
    piiMasked.push("phone");
  }
  if (/\b\d{10,16}\b/.test(displayText)) {
    displayText = displayText.replace(
      /\b\d{10,16}\b/g,
      "[REKENING DISAMARKAN]"
    );
    piiMasked.push("account");
  }

  // 1. Permintaan Uang / Transfer
  if (
    /transfer|rekening|biaya\s*admin|saldo|kirim\s*uang|bayar|top\s*up|tagihan|pembayaran/i.test(
      lower
    )
  ) {
    flags.push({
      ruleId: "MSG-PAYMENT-01",
      level: "L4",
      category: "permintaan_uang",
      why: "Pesan meminta transfer uang atau pembayaran biaya mendadak.",
      verify:
        "Lakukan verifikasi langsung secara tatap muka atau hubungi nomor resmi pihak terkait sebelum mengirim uang.",
    });
  }

  // 2. Tekanan Waktu / Urgensi
  if (
    /hari\s*ini|segera|dalam\s*\d+\s*(menit|jam)|sekarang\s*juga|diblokir|batas\s*waktu|sebelum\s*hangus|darurat/i.test(
      lower
    )
  ) {
    flags.push({
      ruleId: "MSG-PRESSURE-02",
      level: "L2",
      category: "tekanan_waktu",
      why: "Menggunakan kata-kata desakan waktu agar korban panik dan tidak sempat berpikir jernih.",
      verify:
        "Tarik napas dan tetap tenang. Lembaga resmi tidak akan menekan korban dengan batas waktu ekstrem beberapa menit.",
    });
  }

  // 3. Tawaran Berlebihan / Hadiah / Loker Palsu
  if (
    /gaji\s*\d+|juta\s*\/\s*(minggu|bulan)|hadiah|selamat\s*anda\s*terpilih|pemenang|undian|menang|wfh|bonus\s*cuma/i.test(
      lower
    )
  ) {
    flags.push({
      ruleId: "MSG-OFFER-03",
      level: "L3",
      category: "tawaran_berlebihan",
      why: "Menjanjikan uang atau hadiah besar tanpa keikutsertaan lomba resmi atau kualifikasi yang wajar.",
      verify:
        "Bandingkan dengan informasi di portal karir atau situs promo resmi perusahaan terkait.",
    });
    modus.push("loker_palsu");
  }

  // 4. Tautan Tidak Dikenal Dalam Pesan
  if (/https?:\/\/[^\s]+|\.apk|\.xyz|\.top|bit\.ly|s\.id|tinyurl/i.test(lower)) {
    flags.push({
      ruleId: "MSG-LINK-04",
      level: "L3",
      category: "tautan",
      why: "Tautan tidak dikenal mengarahkan pengguna ke situs web berbahaya atau unduhan aplikasi luar.",
      verify:
        "Jangan klik tautan tersebut. Cari alamat situs resmi lewat mesin pencari terpercaya.",
    });
  }

  // 5. Peniruan Pihak Resmi / Bank / Kurir
  if (
    /bank\s*(mandiri|bca|bri|bni)|kurir|jne|j&t|sicepat|paket\s*anda|surat\s*tilang|bpjs|djp|pajak|polri/i.test(
      lower
    )
  ) {
    flags.push({
      ruleId: "MSG-IMPERSONATE-05",
      level: "L3",
      category: "peniruan_identitas",
      why: "Pelaku berpura-pura menjadi institusi resmi atau kurir untuk mencuri kepercayaan korban.",
      verify:
        "Hubungi call center resmi institusi yang dicatut melalui nomor telepon resmi yang tertera di situs asli.",
    });
  }

  // 6. Pencurian OTP / PIN (dengan proteksi negasi "jangan bagikan kode OTP")
  const isSafetyWarning =
    /jangan\s*(pernah\s*)?(bagikan|kasih|berikan|infokan)\s*(kode\s*)?(otp|pin)/i.test(
      lower
    );
  if (
    !isSafetyWarning &&
    /\b(otp|pin|kode\s*rahasia|kode\s*verifikasi|password)\b/i.test(lower)
  ) {
    flags.push({
      ruleId: "MSG-OTP-06",
      level: "L5",
      category: "data_sensitif",
      why: "Meminta kode OTP atau PIN rahasia untuk membobol akun perbankan/e-wallet korban.",
      verify:
        "Pihak bank atau penyedia layanan mana pun tidak pernah meminta kode OTP atau PIN Anda untuk alasan apa pun.",
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

function analyzeLink(rawUrl: string): AnalysisResult {
  const url = (rawUrl || "").trim();
  const lower = url.toLowerCase();
  const flags: RedFlag[] = [];
  const modus: string[] = [];

  // 1. Protokol Tidak Terenkripsi (HTTP)
  if (/^http:\/\//i.test(url)) {
    flags.push({
      ruleId: "LNK-PROTO-01",
      level: "L2",
      category: "protokol_keamanan",
      why: "Tautan menggunakan protokol HTTP tanpa enkripsi SSL/TLS, data sensitif yang dikirim rentan disadap atau dipalsukan.",
      verify:
        "Situs layanan keuangan dan login resmi wajib menggunakan protokol aman berawalan https:// dengan sertifikat valid.",
    });
  }

  // 2. Ekstensi TLD Berisiko Tinggi
  if (
    /\.(xyz|top|tk|ml|cf|gq|site|invalid|online|club|buzz|icu|vip|work|click)(\/|$|\?)/i.test(
      lower
    )
  ) {
    flags.push({
      ruleId: "LNK-TLD-02",
      level: "L3",
      category: "domain_mencurigakan",
      why: "Domain menggunakan ekstensi TLD bebas/murah (.xyz, .top, .site, dll.) yang sering dimanfaatkan sindikat penipuan untuk membuat situs tiruan jangka pendek.",
      verify:
        "Periksa alamat domain instansi resmi yang umumnya menggunakan domain beridentitas jelas (.co.id, .id, atau .com resmi).",
    });
  }

  // 3. Typosquatting / Pencatutan Merk Bank atau Ekspedisi
  const bankCourierKeywords = [
    "mandiri",
    "bca",
    "bri",
    "bni",
    "klikbca",
    "jne",
    "jnt",
    "pos",
    "doku",
    "dana",
    "gopay",
    "shopee",
    "lazada",
    "tokopedia",
  ];
  const isOfficialDomain =
    /(bankmandiri\.co\.id|bca\.co\.id|bri\.co\.id|bni\.co\.id|jne\.co\.id|shopee\.co\.id|tokopedia\.com)(\/|$)/i.test(
      lower
    );
  const hasBrandName = bankCourierKeywords.some((brand) =>
    lower.includes(brand)
  );
  if (hasBrandName && !isOfficialDomain) {
    flags.push({
      ruleId: "LNK-TYPO-03",
      level: "L5",
      category: "peniruan_domain",
      why: "Nama instansi/bank dicatut dalam susunan subdomain atau domain palsu untuk mengelabui korban (typosquatting).",
      verify:
        "Ketik alamat bank langsung di address bar peramban, jangan pernah membuka tautan perbankan dari pesan singkat.",
    });
    modus.push("phishing_perbankan");
  }

  // 4. Kata Kunci Pancingan Login / Verifikasi Akun
  if (
    /(verifikasi|login|unblock|blokir|klaim|hadiah|bansos|bantuan|update|aktivasi|auth)/i.test(
      lower
    )
  ) {
    flags.push({
      ruleId: "LNK-PATH-04",
      level: "L3",
      category: "halaman_jebakan",
      why: "Jalur URL mengarahkan ke formulir pancingan untuk mencuri kredensial login atau data pribadi perbankan.",
      verify:
        "Pastikan Anda hanya login melalui aplikasi resmi atau alamat domain resmi terverifikasi.",
    });
  }

  // 5. URL Shortener / Pemendek Tautan
  if (/(bit\.ly|s\.id|tinyurl\.com|is\.gd|t\.co|cutt\.ly)/i.test(lower)) {
    flags.push({
      ruleId: "LNK-SHORT-05",
      level: "L2",
      category: "tautan_terselubung",
      why: "Tautan dipendekkan untuk menyamarkan alamat tujuan asli yang sebenarnya di balik tautan.",
      verify:
        "Gunakan fitur intip tautan (preview) sebelum membuka, atau abaikan jika dari pengirim yang tidak dikenal.",
    });
  }

  // 6. Unduhan Berkas Eksekutabel / APK Lewat Link
  if (
    /(\.apk|\.exe|\.bat|\.zip)(\?|$)/i.test(lower) ||
    lower.includes(".apk")
  ) {
    flags.push({
      ruleId: "LNK-DOWNLOAD-06",
      level: "L5",
      category: "unduhan_berbahaya",
      why: "Tautan secara langsung memicu unduhan berkas paket aplikasi mentah (.apk) dari peramban web.",
      verify:
        "Batalkan pengunduhan segera. Jangan pernah memasang aplikasi Android dari tautan di luar Google Play Store.",
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

function analyzeFile(
  fileName: string,
  source: "whatsapp" | "telegram" | "email" | "toko_resmi" | "lainnya",
  permissions: string[]
): AnalysisResult {
  const name = (fileName || "").trim();
  const lower = name.toLowerCase();
  const flags: RedFlag[] = [];
  const modus: string[] = [];
  const malwareTypes: string[] = [];

  // 1. Ekstensi Berbahaya Paket Android (.apk)
  const isApk = lower.endsWith(".apk") || lower.includes(".apk");
  if (isApk) {
    flags.push({
      ruleId: "FILE-EXT-01",
      level: "L5",
      category: "ekstensi_berkas",
      why: "Berkas berekstensi .apk adalah paket aplikasi Android mentah yang dapat mengeksekusi kode perusak atau pencuri data di perangkatmu.",
      verify:
        "Jangan pasang berkas ini. Instalasi aplikasi Android yang aman hanya dilakukan melalui Google Play Store resmi.",
    });
    modus.push("apk_tagihan_kurir");
  }

  // 2. Manipulasi Ekstensi Ganda (Double Extension Trick)
  const isDoubleExt =
    /\.(pdf|jpg|jpeg|png|doc|docx|xls|xlsx|mp4)\.apk$/i.test(lower);
  if (isDoubleExt) {
    flags.push({
      ruleId: "FILE-DOUBLE-02",
      level: "L4",
      category: "ekstensi_ganda",
      why: "Trik ekstensi ganda digunakan untuk mengelabui korban agar mengira file adalah dokumen atau foto, padahal merupakan program aplikasi jahat.",
      verify:
        "Perhatikan akhiran nama berkas paling kanan (.apk). Sistem Android membaca ekstensi terakhir sebagai jenis file eksekusi.",
    });
  }

  // 3. Umpan Rekayasa Sosial Pada Nama Berkas
  if (/(undangan|resi|paket|tilang|bpjs|foto|surat|pajak|tagihan)/i.test(lower)) {
    flags.push({
      ruleId: "FILE-NAME-03",
      level: "L2",
      category: "rekayasa_sosial",
      why: "Nama berkas menggunakan kata pancingan psikologis (undangan, resi, tilang) untuk memicu rasa panik atau penasaran agar segera dibuka.",
      verify:
        "Instansi resmi (Polri/ekspedisi) tidak pernah mengirim surat tilang atau resi paket berformat aplikasi .apk lewat chat.",
    });
  }

  // 4. Sumber Pengunduhan Tidak Resmi
  if (source !== "toko_resmi" && isApk) {
    const sourceLabel =
      source === "whatsapp"
        ? "WhatsApp"
        : source === "telegram"
        ? "Telegram"
        : source === "email"
        ? "Email"
        : "Situs Web";
    flags.push({
      ruleId: "FILE-SOURCE-04",
      level: "L3",
      category: "sumber_pengunduhan",
      why: `Berkas aplikasi diterima dari jalur pesan tidak resmi (${sourceLabel}) tanpa pemeriksaan keamanan toko aplikasi (sideloading).`,
      verify:
        "Hanya unduh dan pasang aplikasi dari toko resmi terverifikasi seperti Google Play Store atau Apple App Store.",
    });
  }

  // 5. Izin Berbahaya: SMS / OTP Interception
  const hasSmsPerm = permissions.some(
    (p) => p.includes("RECEIVE_SMS") || p.includes("READ_SMS")
  );
  if (hasSmsPerm) {
    flags.push({
      ruleId: "FILE-PERM-SMS-05",
      level: "L5",
      category: "izin_berbahaya",
      why: "Izin membaca/menerima SMS memungkinkan aplikasi memotong dan mencuri kode OTP perbankan atau e-wallet Anda tanpa disadari.",
      verify:
        "Tolak pemberian izin SMS pada aplikasi yang bukan aplikasi pesan SMS utama bawaan ponsel Anda.",
    });
    malwareTypes.push("malware_sms_forwarder");
  }

  // 6. Izin Berbahaya: Layanan Aksesibilitas
  const hasAccessibility = permissions.some((p) => p.includes("ACCESSIBILITY"));
  if (hasAccessibility) {
    flags.push({
      ruleId: "FILE-PERM-ACC-06",
      level: "L5",
      category: "izin_berbahaya",
      why: "Layanan aksesibilitas memberi kontrol mutlak kepada aplikasi untuk membaca seluruh ketukan tombol (keylogger) dan layar ponsel.",
      verify:
        "Jangan pernah mengaktifkan izin Aksesibilitas untuk aplikasi pihak ketiga yang tidak tepercaya.",
    });
    malwareTypes.push("malware_overlay");
  }

  // 7. Izin Berbahaya: Akses Kontak
  const hasContacts = permissions.some((p) => p.includes("READ_CONTACTS"));
  if (hasContacts) {
    flags.push({
      ruleId: "FILE-PERM-CONTACTS-07",
      level: "L3",
      category: "izin_berbahaya",
      why: "Izin membaca kontak dapat digunakan malware untuk menyebarkan pesan jebakan ke daftar keluarga dan kerabat Anda.",
      verify:
        "Pertimbangkan apakah fungsi aplikasi benar-benar membutuhkan akses ke seluruh kontak pribadi Anda.",
    });
  }

  // 8. Izin Berbahaya: Screen Overlay
  const hasOverlay = permissions.some((p) =>
    p.includes("SYSTEM_ALERT_WINDOW")
  );
  if (hasOverlay) {
    flags.push({
      ruleId: "FILE-PERM-OVERLAY-08",
      level: "L4",
      category: "izin_berbahaya",
      why: "Aplikasi dapat menampilkan layar tiruan di atas aplikasi lain (screen overlay) untuk mencegat login m-banking.",
      verify:
        "Nonaktifkan izin tampil di atas aplikasi lain pada pengaturan privasi ponsel Anda.",
    });
  }

  let { score, hasL5 } = computeScore(flags);
  let band = flags.length === 0 ? "belum_terlihat" : scoreToBand(score, hasL5);

  // Aturan Kombinasi FR-2.4: Sumber toko resmi + izin saja dibatasi ke "waspada"
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
