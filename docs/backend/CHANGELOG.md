# Changelog: Backend (Logika & Data)

Format: `V2_03-11-2026` lalu daftar perubahan, merujuk ID tugas di [`TASK_GUIDE.md`](TASK_GUIDE.md).

## [Belum dirilis]

### Ditambahkan

- **BE-1.1**: Skema Zod untuk validasi konten (`src/content/schemas.ts`) dan loader konten nir-jaringan yang toleran terhadap item rusak (`src/content/loader.ts`). `RuleSchema` sudah dilengkapi field `negationPatterns?: string[]` untuk mendukung FR-1.9 (negasi OTP).
- **BE-1.2**: Berkas konten JSON dasar dengan domain rekaan (`.test`, `.invalid`, `example.com`), nomor fiktif, serta teks firstResponse dan panduan tanpa kata terlarang ("aman", "pasti", "100%").
- **BE-1.3**: Wrapper penyimpanan lokal ber-versi `storage.load`, `storage.save`, `storage.clearAll` (`src/storage/index.ts`) dengan try/catch menyeluruh, migrasi schemaVersion, penanganan saat localStorage mati/rusak, dan isolasi prefiks `jagaruang:`.
- Rangkaian pengujian unit untuk loader konten (`src/content/__tests__/loader.test.ts`) dan storage (`src/storage/__tests__/storage.test.ts`).

- Kerangka `@jagaruang/core`: tanda tangan API publik, `scoring.ts` (skor + label) beserta tes.
- **BE-2.1**: Implementasi `maskPii` (`src/analyzer/pii.ts`) untuk penyamaran data pribadi secara sekuensial (NIK 16 digit -> `[NIK]`, Rekening 10-16 digit -> `[REKENING]`, Nomor HP 08xx/+628xx -> `[NOMORHP]`, Email -> `[EMAIL]`) dengan regex linear bebas ReDoS.
- **BE-2.2**: 22 aturan lengkap L1-L5 di `src/content/rules.json` mencakup kategori pesan teks (permintaan uang, penyamaran, ancaman akun, tekanan waktu, data pribadi, tawaran berlebihan, channel tidak resmi, kerahasiaan), tautan (pemendek URL, TLD mencurigakan, IP address, typosquatting), dan berkas (APK chat, ekstensi ganda, file eksekutif bertopeng dokumen, makro, nama umpan).
- **BE-2.2**: Implementasi mesin analisa `analyze` (`src/analyzer/index.ts`) dengan pipeline pembatasan 5.000 karakter, normalisasi Unicode NFKC, penyamaran PII, evaluasi rule & pengecekan negasi (FR-1.9), skoring & penentuan band risiko, aturan khusus berkas dari toko resmi vs luar (FR-2.4), serta pemetaan otomatis modus dan jenis malware.
- **BE-2.3**: Pengujian unit komprehensif (34 uji kasus di `src/analyzer/__tests__/analyze.test.ts`) mencakup 5 skenario pesan penipuan, 5 skenario pesan sah, 5 skenario berkas & izin, edge cases (input kosong, pemotongan 5.000 karakter, uji ReDoS/performa < 1000ms), serta penyamaran multi-PII.

---

## Hasil uji analyzer (isi menjelang rilis; dipakai di README)

| #   | Kalimat uji (fiktif)                                                                                                                                    | Seharusnya                          | Hasil          | Status                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------- | ------------------------ |
| 1   | "Selamat! Anda terpilih kerja admin WFH. Gaji 8 juta per minggu. Transfer biaya admin Rp150.000 hari ini. Klik link daftar di: http://bit.ly/loker-wfh" | Sangat tinggi                       | sangat_tinggi  | Sesuai                   |
| 2   | "Selamat Anda menang undian 100 juta rupiah! Kirim foto KTP dan selfie KTP untuk klaim. Buka tautan di sini: http://hadiah-resmi.xyz/klaim"             | Tinggi / Sangat tinggi              | sangat_tinggi  | Sesuai                   |
| 3   | "Pinjaman dana cepat cair bunga rendah! Kirim nomor rekening, nama ibu kandung, dan PIN ATM Anda segera untuk verifikasi pencairan."                    | Tinggi / Sangat tinggi              | tinggi         | Sesuai                   |
| 4   | "Kami dari pihak bank, akun diblokir dan rekening dibekukan hari ini jika tidak konfirmasi kartu yang dinonaktifkan."                                   | Sangat tinggi                       | sangat_tinggi  | Sesuai                   |
| 5   | "Kerja paruh waktu dari rumah. Penghasilan 5 juta mudah hanya dengan kerja ringan gaji besar. Transfer fee registrasi Rp50.000 sekarang juga."          | Tinggi / Sangat tinggi              | sangat_tinggi  | Sesuai                   |
| 6   | "Jangan bagikan kode OTP ini kepada siapa pun termasuk pihak bank. Kode verifikasi Anda adalah 584910."                                                 | Belum terlihat / Waspada (bukan L5) | belum_terlihat | Sesuai                   |
| 7   | "Transaksi debit sebesar Rp50.000 di Mart Sejahtera berhasil pada 03/11/2026. Sisa saldo Anda aman tercatat."                                           | Belum terlihat                      | belum_terlihat | Sesuai                   |
| 8   | "Pesanan dengan nomor resi JKT998822 sedang diantar kurir ke alamat tujuan. Terima kasih telah berbelanja."                                             | Belum terlihat                      | belum_terlihat | Sesuai                   |
| 9   | "Halo kawan, nanti sore jadi kumpul di kafe kopi seberang kantor kan?"                                                                                  | Belum terlihat                      | belum_terlihat | Sesuai                   |
| 10  | "Pengumuman kerja bakti warga RT 05 akan diadakan hari Minggu pagi pukul 07.00. Harap membawa peralatan kebersihan masing-masing."                      | Belum terlihat                      | belum_terlihat | Sesuai                   |
| 11  | "Bu, tadi aku sudah transfer uang jajan ke rekening ya."                                                                                                | Belum terlihat (pesan keluarga sah) | waspada        | Meleset (False Positive) |
| 12  | "Halo kak, sil4kan cl1ck t4utan ini untuk mengambil kado hadiah"                                                                                        | Waspada / Tinggi (penipuan link)    | belum_terlihat | Meleset (False Negative) |

**Kasus yang meleset (dilaporkan terbuka):**
Terdapat **2 kasus meleset** yang dilaporkan terbuka:

1. **False Positive (#11)**: Pesan sah yang menggunakan kata "transfer" (seperti transfer uang ke keluarga/teman) memicu `MSG-PAYMENT-01` (L4) sehingga naik ke label `waspada`. Ini merupakan keterbatasan wajar dari pencocokan pola regex tanpa pemahaman konteks semantik percakapan.
2. **False Negative (#12)**: Teks penipuan dengan penyamaran huruf (_leetspeak/obfuscation_, misal `cl1ck t4utan`) tidak cocok dengan kamus pola dasar sehingga menghasilkan `belum_terlihat`. Ini akan diperkuat secara bertahap pada iterasi berikutnya.