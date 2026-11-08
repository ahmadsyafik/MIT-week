const WORDS_POOL = [
  "Garuda", "Kopi", "Bintang", "Melati", "Ombak", "Gunung", "Lentera",
  "Pelangi", "Rembulan", "Bambu", "Samudra", "Pohon", "Mentari", "Elang",
  "Cempaka", "Danau", "Lembah", "Hujan", "Awan", "Kasturi", "Angin",
  "Hangat", "Biru", "Cepat", "Tenang", "Tinggi", "Manis", "Hijau",
  "Terang", "Kuat", "Jernih", "Megah", "Lincah", "Sejuk", "Kokoh",
  "Melompat", "Terbang", "Menyala", "Mengalir", "Tumbuh", "Berlayar", "Bersinar",
  "Menjaga", "Melangkah", "Melindungi"
];

export function mockGenerateSafeword(wordCount: 2 | 3 = 3): string {
  const count = wordCount === 2 ? 2 : 3;
  const shuffled = [...WORDS_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join(" ");
}

