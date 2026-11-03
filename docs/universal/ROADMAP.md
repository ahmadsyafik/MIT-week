# ROADMAP.md: Rencana 10 Hari per Peran

Mengikuti rencana di PRD bagian 13. Fitur Could (F9 Kilat 2 Menit, F10 Sandi Keluarga) dipangkas lebih dulu bila waktu mepet. Inti: Cek, Latih, Lindungi, Coba contoh, Keterbatasan.

| Hari | Backend (`packages/core`) | Frontend (`apps/web`) | Development |
|---|---|---|---|
| 1 | Skema Zod + kerangka JSON konten, `storage` | Router, Layout, design tokens, Beranda | Scaffold repo, branch, CI, kontrak v0.1 |
| 2-3 | `maskPii`, `analyze` (teks, URL, file, izin) + tes | Halaman Cek (3 tab), Coba contoh (dengan mock) | **Deploy awal** (Vercel) |
| 4-6 | Case engine + 3 kasus, Kamus (10 entri), briefing | Latih (briefing, investigasi, keputusan, debrief), Kamus (kartu geser) | Merge berkala, ganti mock -> core |
| 7 | Action guides + `contacts.json`, `buildWarningCard` | Lindungi (checklist, kanal), Kartu Peringatan | Uji integrasi |
| 8 | Triage, `generateSafeword` | Kilat 2 Menit, Sandi Keluarga, Keterbatasan, polish | Uji alur penuh |
| 9 | Perbaiki bug, rapikan set uji | Responsif 360 px, aksesibilitas, pemindai kata terlarang | Uji dari HP + jaringan lain |
| 10 | README bagian Backend, hasil uji | README bagian Frontend | README akhir, video demo, rilis `main`, **cadangan waktu** |
