import wordlist from "../content/wordlist.json";

export function generateSafeword(wordCount: 2 | 3 = 2): string {
  const indices: number[] = [];
  try {
    const buf = new Uint32Array(wordCount);
    crypto.getRandomValues(buf);
    for (const val of buf) indices.push(val % wordlist.length);
  } catch {
    // fallback jika crypto tidak tersedia
    for (let i = 0; i < wordCount; i++) {
      indices.push(Math.floor(Math.random() * wordlist.length));
    }
  }
  return indices.map((i) => wordlist[i]).join(" ");
}

