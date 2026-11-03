import { describe, it, expect } from "vitest";
import { analyze } from "../index";
import { maskPii } from "../pii";
import { DISCLAIMER, type AnalyzeInput } from "@jagaruang/contracts";

describe("BE-2 Analyzer Engine", () => {
  /* ───────────── Pesan scam (harus tinggi/sangat_tinggi) ───────────── */

  it("1. Loker palsu dengan permintaan transfer + tekanan waktu + link → sangat_tinggi, ≥4 flags", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Selamat! Anda terpilih kerja admin WFH. Gaji 8 juta per minggu. Transfer biaya admin Rp150.000 hari ini. Klik link daftar di: http://bit.ly/loker-wfh",
    };
    const result = analyze(input);

    expect(result.band).toBe("sangat_tinggi");
    expect(result.flags.length).toBeGreaterThanOrEqual(4);
    expect(result.modus).toContain("loker_palsu");
    expect(result.disclaimer).toBe(DISCLAIMER);
  });

  it("2. Hadiah undian dengan minta KTP + klik link → tinggi/sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Selamat Anda menang undian 100 juta rupiah! Kirim foto KTP dan selfie KTP untuk klaim. Buka tautan di sini: http://hadiah-resmi.xyz/klaim",
    };
    const result = analyze(input);

    expect(["tinggi", "sangat_tinggi"]).toContain(result.band);
    expect(result.modus).toContain("giveaway_palsu");
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("MSG-WINNING-L3");
    expect(ruleIds).toContain("MSG-KTP-REQUEST-L3");
  });

  it("3. Pinjaman online tanpa syarat dengan minta data rekening → tinggi/sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Pinjaman dana cepat cair bunga rendah! Kirim nomor rekening, nama ibu kandung, dan PIN ATM Anda segera untuk verifikasi pencairan.",
    };
    const result = analyze(input);

    expect(["tinggi", "sangat_tinggi"]).toContain(result.band);
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("MSG-PERSONAL-DATA-L3");
    expect(ruleIds).toContain("MSG-URGENCY-L3");
  });

  it("4. Pesan impersonasi bank dengan ancaman blokir akun → sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Kami dari pihak bank, akun diblokir dan rekening dibekukan hari ini jika tidak konfirmasi kartu yang dinonaktifkan.",
    };
    const result = analyze(input);

    expect(["tinggi", "sangat_tinggi"]).toContain(result.band);
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("MSG-IMPERSONATE-L4");
    expect(ruleIds).toContain("MSG-ACCOUNT-BLOCK-L4");
  });

  it("5. Penawaran kerja WFH gaji tidak realistis → tinggi/sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Kerja paruh waktu dari rumah. Penghasilan 5 juta mudah hanya dengan kerja ringan gaji besar. Transfer fee registrasi Rp50.000 sekarang juga.",
    };
    const result = analyze(input);

    expect(["tinggi", "sangat_tinggi"]).toContain(result.band);
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("MSG-SALARY-UNREALISTIC-L2");
    expect(ruleIds).toContain("MSG-PAYMENT-01");
  });

  /* ───────────── Pesan sah (TIDAK boleh tinggi/sangat_tinggi) ───────────── */

  it("6. 'Jangan bagikan kode OTP ini kepada siapa pun' — WAJIB bukan L5 trigger (FR-1.9)", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Jangan bagikan kode OTP ini kepada siapa pun termasuk pihak bank. Kode verifikasi Anda adalah 584910.",
    };
    const result = analyze(input);

    expect(["belum_terlihat", "waspada"]).toContain(result.band);
    const hasL5 = result.flags.some((f) => f.level === "L5");
    expect(hasL5).toBe(false);
  });

  it("7. Notifikasi transaksi bank fiktif standar → belum_terlihat", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Transaksi debit sebesar Rp50.000 di Mart Sejahtera berhasil pada 03/11/2026. Sisa saldo Anda aman tercatat.",
    };
    const result = analyze(input);

    expect(result.band).toBe("belum_terlihat");
    expect(result.flags.length).toBe(0);
  });

  it("8. Konfirmasi pengiriman toko online fiktif → belum_terlihat", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Pesanan dengan nomor resi JKT998822 sedang diantar kurir ke alamat tujuan. Terima kasih telah berbelanja.",
    };
    const result = analyze(input);

    expect(result.band).toBe("belum_terlihat");
  });

  it("9. Pesan teman biasa → belum_terlihat", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Halo kawan, nanti sore jadi kumpul di kafe kopi seberang kantor kan?",
    };
    const result = analyze(input);

    expect(result.band).toBe("belum_terlihat");
    expect(result.score).toBe(0);
  });

  it("10. Broadcast informasi komunitas tanpa permintaan data → belum_terlihat", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Pengumuman kerja bakti warga RT 05 akan diadakan hari Minggu pagi pukul 07.00. Harap membawa peralatan kebersihan masing-masing.",
    };
    const result = analyze(input);

    expect(["belum_terlihat", "waspada"]).toContain(result.band);
  });

  /* ───────────── Kasus file ───────────── */

  it("11. Undangan Pernikahan Digital.apk dari WhatsApp → sangat_tinggi (FR-2.4)", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "Undangan Pernikahan Digital.apk",
      source: "whatsapp",
      permissions: ["READ_SMS"],
    };
    const result = analyze(input);

    expect(result.band).toBe("sangat_tinggi");
    expect(result.modus).toContain("undangan_apk");
    expect(result.malwareTypes).toContain("sms_stealer");
  });

  it("12. CV_Pelamar.pdf dari email → belum_terlihat atau waspada", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "CV_Pelamar.pdf",
      source: "email",
      permissions: [],
    };
    const result = analyze(input);

    expect(["belum_terlihat", "waspada"]).toContain(result.band);
  });

  it("13. invoice.pdf.exe (ekstensi ganda) → sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "invoice.pdf.exe",
      source: "email",
      permissions: [],
    };
    const result = analyze(input);

    expect(result.band).toBe("sangat_tinggi");
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("FILE-DOUBLE-EXT-L4");
    expect(result.malwareTypes).toContain("trojan");
  });

  it("14. Izin READ_SMS dari toko_resmi → waspada (bukan sangat_tinggi)", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "Aplikasi_Resmi.apk",
      source: "toko_resmi",
      permissions: ["READ_SMS"],
    };
    const result = analyze(input);

    expect(result.band).toBe("waspada");
    const smsFlag = result.flags.find((f) => f.ruleId === "PERM-READ_SMS");
    expect(smsFlag).toBeDefined();
    expect(smsFlag?.verify).toContain("toko resmi");
  });

  it("15. Izin READ_SMS dari WhatsApp → sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "Foto_Paket.apk",
      source: "whatsapp",
      permissions: ["READ_SMS"],
    };
    const result = analyze(input);

    expect(result.band).toBe("sangat_tinggi");
    expect(result.malwareTypes).toContain("sms_stealer");
  });

  /* ───────────── Edge cases & PII ───────────── */

  it("16. Input kosong → hasil valid, score 0, band belum_terlihat, tidak throw", () => {
    // 16a. Message kosong
    const msgInput: AnalyzeInput = { kind: "message", text: "" };
    let msgResult: ReturnType<typeof analyze> | undefined;
    expect(() => {
      msgResult = analyze(msgInput);
    }).not.toThrow();
    expect(msgResult!.score).toBe(0);
    expect(msgResult!.band).toBe("belum_terlihat");
    expect(msgResult!.flags).toEqual([]);
    expect(msgResult!.modus).toEqual([]);
    expect(msgResult!.disclaimer).toBe(DISCLAIMER);

    // 16b. Link kosong (INTERFACES.md §4 Aturan #2)
    const linkInput: AnalyzeInput = { kind: "link", url: "" };
    let linkResult: ReturnType<typeof analyze> | undefined;
    expect(() => {
      linkResult = analyze(linkInput);
    }).not.toThrow();
    expect(linkResult!.score).toBe(0);
    expect(linkResult!.band).toBe("belum_terlihat");
    expect(linkResult!.flags).toEqual([]);
    expect(linkResult!.modus).toEqual([]);
    expect(linkResult!.disclaimer).toBe(DISCLAIMER);

    // 16c. File kosong tanpa permission
    const fileInput: AnalyzeInput = {
      kind: "file",
      fileName: "",
      source: "lainnya",
      permissions: [],
    };
    let fileResult: ReturnType<typeof analyze> | undefined;
    expect(() => {
      fileResult = analyze(fileInput);
    }).not.toThrow();
    expect(fileResult!.score).toBe(0);
    expect(fileResult!.band).toBe("belum_terlihat");
    expect(fileResult!.flags).toEqual([]);
    expect(fileResult!.modus).toEqual([]);
  });

  it("17. Input 5001 karakter → truncate ke 5000, tidak throw", () => {
    const longText = "Transfer biaya admin Rp100.000 sekarang juga. " + "x".repeat(5000);
    const input: AnalyzeInput = {
      kind: "message",
      text: longText,
    };
    const result = analyze(input);

    expect(result.displayText!.length).toBeLessThanOrEqual(5000);
    expect(result.flags.length).toBeGreaterThan(0);
  });

  it("18. Teks dengan NIK fiktif → piiMasked includes 'nik', teks disamarkan", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Mohon konfirmasi dengan NIK 3171012345670001 untuk melanjutkan.",
    };
    const result = analyze(input);

    expect(result.piiMasked).toContain("nik");
    expect(result.displayText).toContain("[NIK]");
    expect(result.displayText).not.toContain("3171012345670001");
  });

  it("19. Teks dengan email fiktif → piiMasked includes 'email'", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Kirimkan bukti transaksi Anda ke kontak admin@loker-palsu.test segera.",
    };
    const result = analyze(input);

    expect(result.piiMasked).toContain("email");
    expect(result.displayText).toContain("[EMAIL]");
  });

  it("20. Link dengan IP address → tinggi/sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "link",
      url: "http://192.168.1.100/login-bca",
    };
    const result = analyze(input);

    expect(["tinggi", "sangat_tinggi"]).toContain(result.band);
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("URL-IP-ADDRESS-L4");
  });

  it("21. Link bit.ly fiktif → minimal waspada", () => {
    const input: AnalyzeInput = {
      kind: "link",
      url: "https://bit.ly/promo-hadiah-2026",
    };
    const result = analyze(input);

    expect(["waspada", "tinggi", "sangat_tinggi"]).toContain(result.band);
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("URL-SHORTENER-L3");
  });

  it("22. Link dengan domain typosquatting (g0jek.test) → tinggi/sangat_tinggi", () => {
    const input: AnalyzeInput = {
      kind: "link",
      url: "https://g0jek.test/verifikasi-akun",
    };
    const result = analyze(input);

    expect(["tinggi", "sangat_tinggi"]).toContain(result.band);
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("URL-TYPOSQUATTING-L4");
    expect(result.modus).toContain("phishing_link");
  });

  it("Link sah tanpa tanda bahaya (https://example.com) → belum_terlihat dan modus kosong", () => {
    const input: AnalyzeInput = {
      kind: "link",
      url: "https://example.com/artikel-edukasi",
    };
    const result = analyze(input);

    expect(result.band).toBe("belum_terlihat");
    expect(result.score).toBe(0);
    expect(result.flags).toEqual([]);
    expect(result.modus).toEqual([]);
  });

  /* ───────────── Pengujian Tambahan ───────────── */

  it("23. Performa: memproses 5000 karakter dalam < 1000ms", () => {
    const input: AnalyzeInput = { kind: "message", text: "a".repeat(5000) };
    const start = performance.now();
    analyze(input);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(1000);
  });

  it("24. maskPii menyamarkan nomor HP Indonesia 08xx / +628xx", () => {
    const res1 = maskPii("Hubungi WhatsApp kami di 081234567890.");
    expect(res1.found).toContain("phone");
    expect(res1.masked).toBe("Hubungi WhatsApp kami di [NOMORHP].");

    const res2 = maskPii("CS resmi: +62812-3456-7890 hari ini.");
    expect(res2.found).toContain("phone");
    expect(res2.masked).toBe("CS resmi: [NOMORHP] hari ini.");
  });

  it("25. maskPii menyamarkan nomor rekening 10-16 digit", () => {
    const res = maskPii("Transfer biaya ke rekening 123456789012.");
    expect(res.found).toContain("account");
    expect(res.masked).toBe("Transfer biaya ke rekening [REKENING].");
  });

  it("26. maskPii dengan multi-data pribadi sekaligus", () => {
    const text =
      "NIK: 3171012345670001, Rek: 0000000000, HP: 081299998888, Email: test@example.com";
    const res = maskPii(text);
    expect(res.found).toContain("nik");
    expect(res.found).toContain("account");
    expect(res.found).toContain("phone");
    expect(res.found).toContain("email");
    expect(res.masked).toBe("NIK: [NIK], Rek: [REKENING], HP: [NOMORHP], Email: [EMAIL]");
  });

  it("27. File dokumen bermakro (.xlsm) memicu FILE-MACRO-DOC-L3", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "Laporan_Keuangan_2026.xlsm",
      source: "email",
      permissions: [],
    };
    const result = analyze(input);

    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("FILE-MACRO-DOC-L3");
    expect(result.malwareTypes).toContain("trojan");
  });

  it("28. File dengan nama umpan resi memicu FILE-BAIT-NAME-L2", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "Resi_Pengiriman_Paket.pdf",
      source: "email",
      permissions: [],
    };
    const result = analyze(input);

    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("FILE-BAIT-NAME-L2");
  });

  it("29. Permintaan OTP berbahaya tanpa negasi memicu MSG-OTP-SHARE-L5 (sangat_tinggi)", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Segera kirim kode OTP Anda sekarang untuk membatalkan transaksi.",
    };
    const result = analyze(input);

    expect(result.band).toBe("sangat_tinggi");
    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("MSG-OTP-SHARE-L5");
  });

  it("30. Permintaan merahasiakan dengan pola negasi OTP tidak memicu MSG-SECRET-L2", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Ingat! Jangan bagikan kode OTP Anda kepada siapa pun demi keamanan.",
    };
    const result = analyze(input);

    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).not.toContain("MSG-SECRET-L2");
    expect(ruleIds).not.toContain("MSG-OTP-SHARE-L5");
  });

  it("31. Pesan merahasiakan tanpa kaitan OTP memicu MSG-SECRET-L2", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Hadiah ini khusus untuk Anda, rahasiakan dari orang lain dan jangan beritahu siapa pun.",
    };
    const result = analyze(input);

    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("MSG-SECRET-L2");
  });

  it("32. Pesan WhatsApp-only memicu MSG-WA-ONLY-L2", () => {
    const input: AnalyzeInput = {
      kind: "message",
      text: "Konfirmasi lowongan hanya via wa atau hubungi whatsapp kami sekarang.",
    };
    const result = analyze(input);

    const ruleIds = result.flags.map((f) => f.ruleId);
    expect(ruleIds).toContain("MSG-WA-ONLY-L2");
  });

  it("33. Teks tanpa data pribadi tidak diubah oleh maskPii", () => {
    const original = "Halo, ini teks biasa tanpa nomor atau email.";
    const res = maskPii(original);
    expect(res.masked).toBe(original);
    expect(res.found).toEqual([]);
  });

  it("34. Izin ACCESSIBILITY dari sumber luar memicu malware RAT dan trojan", () => {
    const input: AnalyzeInput = {
      kind: "file",
      fileName: "Update_System.apk",
      source: "telegram",
      permissions: ["ACCESSIBILITY"],
    };
    const result = analyze(input);

    expect(result.band).toBe("sangat_tinggi");
    expect(result.malwareTypes).toContain("rat");
    expect(result.malwareTypes).toContain("trojan");
  });
});

