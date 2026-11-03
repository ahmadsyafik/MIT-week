import { describe, expect, it } from "vitest";
import { computeScore, scoreToBand } from "./scoring";

describe("scoreToBand", () => {
  it.each([
    [0, "belum_terlihat"],
    [14, "belum_terlihat"],
    [15, "waspada"],
    [39, "waspada"],
    [40, "tinggi"],
    [69, "tinggi"],
    [70, "sangat_tinggi"],
    [100, "sangat_tinggi"],
  ])("skor %i -> %s", (score, band) => {
    expect(scoreToBand(score)).toBe(band);
  });

  it("L5 selalu override ke sangat_tinggi", () => {
    expect(scoreToBand(5, true)).toBe("sangat_tinggi");
  });
});

describe("computeScore", () => {
  it("membatasi 40 poin per kategori", () => {
    const flags = [
      { category: "tekanan", level: "L4" as const },
      { category: "tekanan", level: "L4" as const },
    ];
    expect(computeScore(flags).score).toBe(40);
  });

  it("memberi bonus +10 bila dari >= 3 kategori", () => {
    const flags = [
      { category: "a", level: "L2" as const },
      { category: "b", level: "L2" as const },
      { category: "c", level: "L2" as const },
    ];
    expect(computeScore(flags).score).toBe(40);
  });

  it("tidak melebihi 100 dan menandai L5", () => {
    const flags = ["a", "b", "c"].map((category) => ({ category, level: "L5" as const }));
    const r = computeScore(flags);
    expect(r.score).toBe(100);
    expect(r.hasL5).toBe(true);
  });
});
