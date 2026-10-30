import {
  CATEGORY_CAP,
  COMBO_BONUS,
  COMBO_MIN_CATEGORIES,
  LEVEL_WEIGHT,
  SCORE_MAX,
  type Band,
  type Level,
} from "@jagaruang/contracts";

export interface ScoredFlag {
  category: string;
  level: Level;
}

/** Skor 0-100: bobot per level, batas per kategori, bonus kombinasi, override L5. */
export function computeScore(flags: ScoredFlag[]): { score: number; hasL5: boolean } {
  const perCategory = new Map<string, number>();
  let hasL5 = false;
  for (const f of flags) {
    if (f.level === "L5") hasL5 = true;
    perCategory.set(f.category, (perCategory.get(f.category) ?? 0) + LEVEL_WEIGHT[f.level]);
  }
  let total = 0;
  for (const pts of perCategory.values()) total += Math.min(pts, CATEGORY_CAP);
  if (perCategory.size >= COMBO_MIN_CATEGORIES) total += COMBO_BONUS;
  return { score: Math.min(total, SCORE_MAX), hasL5 };
}

/** 0-14 belum_terlihat, 15-39 waspada, 40-69 tinggi, 70-100 atau ada L5 sangat_tinggi. */
export function scoreToBand(score: number, hasL5 = false): Band {
  if (hasL5 || score >= 70) return "sangat_tinggi";
  if (score >= 40) return "tinggi";
  if (score >= 15) return "waspada";
  return "belum_terlihat";
}
