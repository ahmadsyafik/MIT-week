import type {
  AnalysisResult,
  AnalyzeInput,
  RedFlag,
} from "@jagaruang/contracts";
import { DISCLAIMER, INPUT_MAX_CHARS } from "@jagaruang/contracts";
import { computeScore, scoreToBand } from "../scoring";
import { maskPii } from "./pii";
import { loadRules, loadModus, loadPermissions } from "../content/loader";

export function analyze(input: AnalyzeInput): AnalysisResult {
  // 1. Tentukan teks yang akan dianalisis berdasarkan input.kind
  let rawText = "";
  if (input.kind === "message") {
    rawText = input.text ?? "";
  } else if (input.kind === "link") {
    rawText = input.url ?? "";
  } else if (input.kind === "file") {
    rawText = input.fileName ?? "";
  }

  // 2. Batasi ke INPUT_MAX_CHARS (truncate, jangan throw)
  const truncatedRaw = rawText.slice(0, INPUT_MAX_CHARS);

  // Edge case: input kosong tanpa permission (INTERFACES.md §4 Aturan #2)
  if (!truncatedRaw.trim() && (input.kind !== "file" || (!input.permissions || input.permissions.length === 0))) {
    return {
      score: 0,
      band: "belum_terlihat",
      flags: [],
      modus: [],
      malwareTypes: [],
      displayText: "",
      piiMasked: [],
      disclaimer: DISCLAIMER,
    };
  }

  // 3. Normalisasi: toLowerCase + NFKC normalize + trim whitespace berlebih
  const normalizedText = truncatedRaw
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // 4. maskPii -> dapatkan displayText + piiMasked
  const piiResult = maskPii(truncatedRaw);
  const displayText = piiResult.masked;
  const piiMasked = piiResult.found;

  const textToMatch = piiResult.masked.normalize("NFKC").toLowerCase();
  const rawTextToMatch = normalizedText;

  // 5. Jalankan rules yang relevan sesuai input.kind
  const allRules = loadRules();
  const flags: RedFlag[] = [];

  if (input.kind === "message") {
    // Jalankan semua rules tanpa context khusus file
    for (const rule of allRules) {
      if (rule.context) continue;

      const ruleRegex = new RegExp(rule.pattern, "i");
      const matched = ruleRegex.test(textToMatch) || ruleRegex.test(rawTextToMatch);

      if (matched) {
        // 6. Cek negationPatterns
        let isNegated = false;
        if (rule.negationPatterns && rule.negationPatterns.length > 0) {
          isNegated = rule.negationPatterns.some(
            (neg) =>
              new RegExp(neg, "i").test(rawTextToMatch) ||
              new RegExp(neg, "i").test(textToMatch),
          );
        }

        if (!isNegated) {
          flags.push({
            ruleId: rule.id,
            level: rule.level,
            category: rule.category,
            why: rule.why,
            verify: rule.verify,
          });
        }
      }
    }
  } else if (input.kind === "link") {
    // Jalankan URL rules + message rules pada string URL tanpa context file
    for (const rule of allRules) {
      if (rule.context) continue;

      const isUrlRule = rule.id.startsWith("URL-") || rule.category === "tautan";
      const isMsgRule = rule.id.startsWith("MSG-");
      if (!isUrlRule && !isMsgRule) continue;

      const ruleRegex = new RegExp(rule.pattern, "i");
      const matched = ruleRegex.test(textToMatch) || ruleRegex.test(rawTextToMatch);

      if (matched) {
        let isNegated = false;
        if (rule.negationPatterns && rule.negationPatterns.length > 0) {
          isNegated = rule.negationPatterns.some(
            (neg) =>
              new RegExp(neg, "i").test(rawTextToMatch) ||
              new RegExp(neg, "i").test(textToMatch),
          );
        }

        if (!isNegated) {
          flags.push({
            ruleId: rule.id,
            level: rule.level,
            category: rule.category,
            why: rule.why,
            verify: rule.verify,
          });
        }
      }
    }
  } else if (input.kind === "file") {
    const fileName = input.fileName || "";
    const isFromTokoResmi = input.source === "toko_resmi";

    // Jalankan FILE rules pada fileName
    for (const rule of allRules) {
      if (!rule.id.startsWith("FILE-")) continue;

      if (rule.id === "FILE-APK-CHAT-L5") {
        if (/\.apk$/i.test(fileName) && !isFromTokoResmi) {
          flags.push({
            ruleId: rule.id,
            level: rule.level,
            category: rule.category,
            why: rule.why,
            verify: rule.verify,
          });
        }
      } else if (rule.id === "FILE-DOUBLE-EXT-L4") {
        if (new RegExp(rule.pattern, "i").test(fileName)) {
          flags.push({
            ruleId: rule.id,
            level: rule.level,
            category: rule.category,
            why: rule.why,
            verify: rule.verify,
          });
        }
      } else if (rule.id === "FILE-EXEC-AS-DOC-L4") {
        const isExec = new RegExp(rule.pattern, "i").test(fileName);
        const hasDocBait = /(undangan|resi|tilang|dokumen|doc|foto|invoice|tagihan|slip|bukti|ktp|surat)/i.test(
          fileName,
        );
        const isDoubleExt = /\.(pdf|jpg|png|docx?|xlsx?)\.(exe|apk|bat|cmd|vbs|js|scr)$/i.test(
          fileName,
        );
        if (isExec && (hasDocBait || isDoubleExt)) {
          flags.push({
            ruleId: rule.id,
            level: rule.level,
            category: rule.category,
            why: rule.why,
            verify: rule.verify,
          });
        }
      } else if (rule.id === "FILE-MACRO-DOC-L3") {
        if (new RegExp(rule.pattern, "i").test(fileName)) {
          flags.push({
            ruleId: rule.id,
            level: rule.level,
            category: rule.category,
            why: rule.why,
            verify: rule.verify,
          });
        }
      } else if (rule.id === "FILE-BAIT-NAME-L2") {
        if (new RegExp(rule.pattern, "i").test(fileName)) {
          flags.push({
            ruleId: rule.id,
            level: rule.level,
            category: rule.category,
            why: rule.why,
            verify: rule.verify,
          });
        }
      }
    }

    // Jalankan PERMISSION rules pada permissions[]
    const allPermissions = loadPermissions();
    const permMap = new Map(allPermissions.map((p) => [p.id, p]));

    for (const permId of input.permissions || []) {
      const p = permMap.get(permId);
      if (p) {
        let verify =
          "Aplikasi wajar tidak membutuhkan izin ini untuk fungsi dasarnya. Tolak atau cabut izin di pengaturan perangkat.";
        if (isFromTokoResmi && p.level === "L5") {
          verify =
            "Izin sensitif ini berasal dari toko resmi. Periksa apakah aplikasi memang membutuhkan akses ini untuk fitur utamanya sebelum memberi izin.";
        }
        flags.push({
          ruleId: `PERM-${p.id}`,
          level: p.level,
          category: "izin_berbahaya",
          why: p.why,
          verify,
        });
      }
    }
  }

  // 7. computeScore(flags) -> { score, hasL5 }
  const { score, hasL5 } = computeScore(flags);

  // 8. scoreToBand(score, hasL5) -> band
  let band = scoreToBand(score, hasL5);

  // Penyesuaian band untuk URL spesifik berisiko tinggi
  if (flags.some((f) => f.ruleId === "URL-IP-ADDRESS-L4" || f.ruleId === "URL-TYPOSQUATTING-L4")) {
    if (band === "belum_terlihat" || band === "waspada") {
      band = "tinggi";
    }
  }

  // ATURAN KHUSUS FILE (FR-2.4):
  // - source === "toko_resmi" + izin L5: band MAKSIMAL "waspada" (override)
  // - source !== "toko_resmi" + izin L5: langsung "sangat_tinggi"
  if (input.kind === "file") {
    const isFromTokoResmi = input.source === "toko_resmi";
    const hasL5Perm = flags.some(
      (f) => f.ruleId.startsWith("PERM-") && f.level === "L5",
    );
    const hasL5NonPerm = flags.some(
      (f) => !f.ruleId.startsWith("PERM-") && f.level === "L5",
    );
    const hasDoubleExt = flags.some((f) => f.ruleId === "FILE-DOUBLE-EXT-L4");

    if (isFromTokoResmi) {
      if (!hasL5NonPerm && !hasDoubleExt) {
        // Izin L5 dari toko resmi dibatasi maksimal waspada
        if (hasL5Perm) {
          band = "waspada";
        } else if (score < 15) {
          band = "belum_terlihat";
        } else if (score < 40) {
          band = "waspada";
        }
      }
    } else {
      if (hasL5Perm || hasL5NonPerm || hasDoubleExt) {
        band = "sangat_tinggi";
      }
    }
  }

  // 9. Petakan modus dan malwareTypes dari rules yang aktif
  const modusSet = new Set<string>();
  const malwareSet = new Set<string>();

  const activeRuleIds = new Set(flags.map((f) => f.ruleId));
  const fullText = (truncatedRaw + " " + (input.kind === "file" ? input.fileName : "")).toLowerCase();

  // Deteksi modus
  if (
    activeRuleIds.has("MSG-PAYMENT-01") ||
    activeRuleIds.has("MSG-SALARY-UNREALISTIC-L2") ||
    /loker|lowongan|admin wfh|kerja paruh waktu/i.test(fullText)
  ) {
    if (activeRuleIds.has("MSG-PAYMENT-01") || activeRuleIds.has("MSG-SALARY-UNREALISTIC-L2")) {
      modusSet.add("loker_palsu");
    }
  }

  if (
    activeRuleIds.has("MSG-WINNING-L3") ||
    /selamat.*menang|undian berhadiah|pemenang/i.test(fullText)
  ) {
    modusSet.add("giveaway_palsu");
  }

  if (
    (activeRuleIds.has("FILE-APK-CHAT-L5") || (input.kind === "file" && /\.apk$/i.test(input.fileName))) &&
    /undangan|nikah|resepsi/i.test(fullText)
  ) {
    modusSet.add("undangan_apk");
  }

  if (
    (activeRuleIds.has("FILE-APK-CHAT-L5") || (input.kind === "file" && /\.apk$/i.test(input.fileName))) &&
    /paket|foto|resi|kurir|tilang|surat-jalan/i.test(fullText)
  ) {
    modusSet.add("foto_paket_apk");
  }

  if (
    activeRuleIds.has("URL-TYPOSQUATTING-L4") ||
    activeRuleIds.has("URL-IP-ADDRESS-L4") ||
    activeRuleIds.has("URL-SHORTENER-L3") ||
    activeRuleIds.has("URL-SUSPICIOUS-TLD-L2") ||
    activeRuleIds.has("MSG-ACCOUNT-BLOCK-L4") ||
    (input.kind === "link" && flags.length > 0)
  ) {
    modusSet.add("phishing_link");
  }

  // Petakan malwareTypes berdasarkan modus dan indikator
  const allModus = loadModus();
  const modusMap = new Map(allModus.map((m) => [m.id, m]));

  for (const mId of modusSet) {
    const m = modusMap.get(mId);
    if (m?.malwareTypeId) {
      malwareSet.add(m.malwareTypeId);
    }
  }

  if (activeRuleIds.has("PERM-READ_SMS")) {
    malwareSet.add("sms_stealer");
  }
  if (activeRuleIds.has("PERM-ACCESSIBILITY")) {
    malwareSet.add("rat");
    malwareSet.add("trojan");
  }
  if (
    activeRuleIds.has("FILE-DOUBLE-EXT-L4") ||
    activeRuleIds.has("FILE-EXEC-AS-DOC-L4") ||
    activeRuleIds.has("FILE-APK-CHAT-L5")
  ) {
    malwareSet.add("trojan");
  }
  if (activeRuleIds.has("FILE-MACRO-DOC-L3")) {
    malwareSet.add("trojan");
  }
  if (
    activeRuleIds.has("URL-TYPOSQUATTING-L4") ||
    activeRuleIds.has("URL-IP-ADDRESS-L4")
  ) {
    malwareSet.add("phishing");
  }

  // 10. Return AnalysisResult
  return {
    score,
    band,
    flags,
    modus: Array.from(modusSet),
    malwareTypes: Array.from(malwareSet),
    displayText,
    piiMasked,
    disclaimer: DISCLAIMER,
  };
}
