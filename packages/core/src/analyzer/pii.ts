import type { MaskResult, PiiKind } from "@jagaruang/contracts";

const NIK_REGEX = /(?<!\d)\d{16}(?!\d)/g;
const ACCOUNT_REGEX = /(?<!\d)(?!08|628)\d{10,16}(?!\d)/g;
const PHONE_REGEX = /(?:\+62|62|0)8(?:\d[- ]?){7,11}\d/g;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export function maskPii(text: string): MaskResult {
  if (!text || typeof text !== "string") {
    return { masked: text ?? "", found: [] };
  }

  const found: PiiKind[] = [];
  let masked = text;

  // 1. NIK: 16 digit berurutan -> "[NIK]"
  if (NIK_REGEX.test(masked)) {
    found.push("nik");
    masked = masked.replace(NIK_REGEX, "[NIK]");
  }

  // 2. Nomor rekening: 10-16 digit -> "[REKENING]"
  if (ACCOUNT_REGEX.test(masked)) {
    found.push("account");
    masked = masked.replace(ACCOUNT_REGEX, "[REKENING]");
  }

  // 3. Nomor HP Indonesia: 08xx / +628xx / 628xx, 9-13 digit -> "[NOMORHP]"
  if (PHONE_REGEX.test(masked)) {
    found.push("phone");
    masked = masked.replace(PHONE_REGEX, "[NOMORHP]");
  }

  // 4. Email: pola standar -> "[EMAIL]"
  if (EMAIL_REGEX.test(masked)) {
    found.push("email");
    masked = masked.replace(EMAIL_REGEX, "[EMAIL]");
  }

  return { masked, found };
}

