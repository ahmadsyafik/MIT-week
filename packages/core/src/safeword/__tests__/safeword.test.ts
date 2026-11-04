import { describe, it, expect, vi } from "vitest";
import { generateSafeword } from "../index";
import wordlist from "../../content/wordlist.json";

describe("BE-5.2 generateSafeword", () => {
  it("1. wordCount=2 → return string dengan tepat 2 kata (split(' ').length === 2)", () => {
    const word = generateSafeword(2);
    expect(word.split(" ").length).toBe(2);
  });

  it("2. wordCount=3 → return string dengan tepat 3 kata", () => {
    const word = generateSafeword(3);
    expect(word.split(" ").length).toBe(3);
  });

  it("3. setiap kata ada di wordlist: split(' ').every(w => wordlist.includes(w))", () => {
    const word = generateSafeword(3);
    const words = word.split(" ");
    expect(words.every((w) => wordlist.includes(w))).toBe(true);
  });

  it("4. 10 panggilan berurutan ada variasi hasil — tidak semua identik", () => {
    const results = new Set<string>();
    for (let i = 0; i < 10; i++) {
      results.add(generateSafeword(2));
    }
    expect(results.size).toBeGreaterThanOrEqual(2);
  });

  it("5. tidak throw jika crypto di-mock undefined", () => {
    vi.stubGlobal("crypto", undefined);
    expect(() => generateSafeword()).not.toThrow();
    const fallbackWord = generateSafeword(2);
    expect(fallbackWord.split(" ").length).toBe(2);
    vi.unstubAllGlobals();
  });
});

