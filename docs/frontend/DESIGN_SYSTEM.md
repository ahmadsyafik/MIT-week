# DESIGN_SYSTEM.md: Aturan Visual & Teks

## 1. Warna level risiko

| Band | Label | Warna | Token (`index.css`) | Ikon |
|---|---|---|---|---|
| `belum_terlihat` | Belum terlihat tanda bahaya | biru-abu | `--color-lvl-info` | **info (i)** |
| `waspada` | Waspada | kuning | `--color-lvl-waspada` | peringatan |
| `tinggi` | Risiko tinggi | oranye | `--color-lvl-tinggi` | peringatan |
| `sangat_tinggi` | Risiko sangat tinggi | merah | `--color-lvl-kritis` | stop |

**Larangan:** hijau, centang, dan ikon perisai untuk level terendah (menyiratkan "aman"). Warna **tidak boleh jadi satu-satunya** penanda: selalu sertakan label teks.

## 2. Tampilan hasil
- Tampilkan **meter level** dan daftar alasan. **Jangan** tampilkan persentase "87% penipuan".
- `disclaimer` dari hasil tampil **permanen** di bawah setiap hasil.
- Teks `why`/`verify` ditampilkan apa adanya dari core.

## 3. Bahasa
- Indonesia santai namun sopan, kalimat pendek.
- Istilah teknis selalu diberi arti (mis. "APK: file pemasang aplikasi Android").
- **Kata terlarang di teks UI:** "aman" (sebagai klaim), "pasti", "100%". Gunakan "Belum terlihat tanda bahaya", "Pesan biasa", "Curiga".

## 4. Tipografi & tata letak
- Font: Inter Variable (Fontsource, self-host). Tidak ada Google Fonts.
- Responsif mulai **360 px**; gunakan `max-w-5xl`, grid/flex. Target sentuh ≥ 44 px.
- Kontras teks ≥ 4.5:1. Fokus keyboard terlihat. Semua input punya label.

## 5. Keamanan UI
- Highlight red flag dengan elemen `<mark>` dari `span`. **Tanpa** `dangerouslySetInnerHTML`.
- Tidak ada tautan yang bisa diklik ke situs nyata di konten kasus. Tampilkan domain fiktif sebagai teks.
