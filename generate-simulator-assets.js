const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'apps/web/public/simulator');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// ============================================================================
// 1. GAMBAR PENDUKUNG PENIPU (SUPPORTING EVIDENCE ASSETS)
// ============================================================================

// K1: Kartu Undangan Pernikahan Digital
const k1InviteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FCF9F5" />
      <stop offset="100%" stop-color="#EFE8DE" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B8860B" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA7A1E" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bgGrad)" rx="16" />
  <rect x="18" y="18" width="564" height="364" fill="none" stroke="url(#goldGrad)" stroke-width="2" rx="12" opacity="0.7" />
  <rect x="26" y="26" width="548" height="348" fill="none" stroke="#8B7355" stroke-width="0.8" stroke-dasharray="4,3" rx="8" opacity="0.5" />

  <path d="M 32 50 C 32 32, 50 32, 50 32" stroke="url(#goldGrad)" stroke-width="2" fill="none" />
  <path d="M 568 50 C 568 32, 550 32, 550 32" stroke="url(#goldGrad)" stroke-width="2" fill="none" />
  <path d="M 32 350 C 32 368, 50 368, 50 368" stroke="url(#goldGrad)" stroke-width="2" fill="none" />
  <path d="M 568 350 C 568 368, 550 368, 550 368" stroke="url(#goldGrad)" stroke-width="2" fill="none" />

  <text x="300" y="65" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#AA7A1E" letter-spacing="4">THE WEDDING INVITATION</text>
  <text x="300" y="88" text-anchor="middle" font-family="serif" font-size="14" font-style="italic" fill="#6B5B45">Walimatul 'Ursy - Save The Date</text>

  <circle cx="300" cy="135" r="28" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
  <text x="300" y="143" text-anchor="middle" font-family="serif" font-size="22" font-weight="bold" fill="#8B6508">D &amp; S</text>

  <text x="300" y="195" text-anchor="middle" font-family="serif" font-size="24" font-weight="bold" fill="#27374D">Dimas Prasetyo, S.Kom</text>
  <text x="300" y="220" text-anchor="middle" font-family="serif" font-size="18" font-style="italic" fill="#B8860B">&amp;</text>
  <text x="300" y="248" text-anchor="middle" font-family="serif" font-size="24" font-weight="bold" fill="#27374D">Sarah Maharani, S.Ds</text>

  <line x1="220" y1="268" x2="380" y2="268" stroke="url(#goldGrad)" stroke-width="1" opacity="0.5" />
  <text x="300" y="290" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#526D82">Minggu, 15 November 2026</text>
  <text x="300" y="310" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7A6B58">Grand Ballroom Kartika • Jakarta Selatan</text>

  <rect x="80" y="335" width="440" height="34" rx="8" fill="#27374D" />
  <text x="300" y="356" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">Konfirmasi Kehadiran &amp; QR Meja: Undangan_Digital.apk</text>
</svg>`;

// K2: Foto Resi Paket Kurir
const k2ResiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="resiBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F4F4F6" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="#E2E8F0" rx="16" />
  
  <rect x="30" y="25" width="540" height="350" fill="url(#resiBg)" rx="10" stroke="#CBD5E1" stroke-width="1.5" />
  
  <rect x="30" y="25" width="540" height="60" fill="#DC2626" rx="10" />
  <rect x="30" y="65" width="540" height="20" fill="#DC2626" />
  <text x="50" y="62" font-family="sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="1">J&amp;X EXPRESS LOGISTICS</text>
  <text x="550" y="62" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FEF2F2">SURAT BUKTI PENGIRIMAN</text>

  <rect x="45" y="100" width="510" height="36" fill="#FEE2E2" stroke="#FCA5A5" rx="6" />
  <circle cx="65" cy="118" r="8" fill="#DC2626" />
  <text x="65" y="122" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">!</text>
  <text x="85" y="122" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991B1B">STATUS: GAGAL KIRIM — ALAMAT TIDAK DITEMUKAN / PENERIMA TIDAK DI RUMAH</text>

  <g transform="translate(45, 150)">
    <rect x="0" y="0" width="300" height="45" fill="#FFFFFF" stroke="#E2E8F0" />
    <path d="M10 5 v35 M15 5 v35 M22 5 v35 M26 5 v35 M34 5 v35 M42 5 v35 M48 5 v35 M58 5 v35 M64 5 v35 M74 5 v35 M82 5 v35 M94 5 v35 M102 5 v35 M114 5 v35 M122 5 v35 M134 5 v35 M144 5 v35 M156 5 v35 M166 5 v35 M178 5 v35 M190 5 v35 M204 5 v35 M218 5 v35 M230 5 v35 M244 5 v35 M256 5 v35 M270 5 v35 M284 5 v35" stroke="#1E293B" stroke-width="2.5" />
    <text x="150" y="58" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#475569">NO. RESI: JX-88492019-ID</text>
  </g>

  <g transform="translate(370, 150)">
    <rect x="0" y="0" width="185" height="65" fill="#F8FAFC" stroke="#E2E8F0" rx="6" />
    <text x="10" y="20" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748B">BERAT / TIPE:</text>
    <text x="10" y="38" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1E293B">1.4 KG (ELEKTRONIK)</text>
    <text x="10" y="54" font-family="sans-serif" font-size="10" fill="#DC2626">KURIR: EDI WAHYUDI</text>
  </g>

  <rect x="45" y="225" width="510" height="85" fill="#F8FAFC" stroke="#E2E8F0" rx="6" />
  <text x="60" y="248" font-family="sans-serif" font-size="11" font-weight="bold" fill="#334155">Penerima: +62 877-4409-XXXX (Nama disamarkan)</text>
  <text x="60" y="268" font-family="sans-serif" font-size="11" fill="#64748B">Alamat Tujuan: Jl. Mawar No. 14, RT 03/05 (Catatan kurir: Gang tidak tertera di GPS)</text>
  <text x="60" y="292" font-family="sans-serif" font-size="11" font-weight="bold" fill="#DC2626">Catatan Sistem: Buka file lampiran Foto_Resi_Paket.jpg.apk untuk verifikasi GPS ulang</text>

  <circle cx="500" cy="335" r="28" fill="none" stroke="#DC2626" stroke-width="2" stroke-dasharray="3,2" opacity="0.6" />
  <text x="500" y="338" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#DC2626" opacity="0.7">VERIFIKASI KURIR</text>
</svg>`;

// K3: ID Card HRD & Surat Penugasan Freelance
const k3LokerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="#F1F5F9" rx="16" />

  <rect x="40" y="30" width="240" height="340" fill="url(#cardGrad)" rx="16" stroke="#3B82F6" stroke-width="2" />
  <rect x="120" y="42" width="80" height="10" rx="5" fill="#334155" />
  
  <text x="160" y="85" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" letter-spacing="2">GLOBAL MEDIA</text>
  <text x="160" y="100" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#60A5FA">TALENT ACQUISITION TEAM</text>

  <circle cx="160" cy="160" r="42" fill="#E2E8F0" stroke="#60A5FA" stroke-width="3" />
  <circle cx="160" cy="148" r="16" fill="#64748B" />
  <path d="M 132 188 C 132 170, 188 170, 188 188 Z" fill="#64748B" />

  <text x="160" y="226" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Clarissa Aurelia</text>
  <text x="160" y="244" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#93C5FD">Senior HR Talent Partner</text>
  <text x="160" y="260" text-anchor="middle" font-family="monospace" font-size="9" fill="#94A3B8">ID: GM-2026-HR4902</text>

  <rect x="65" y="280" width="190" height="28" rx="6" fill="#2563EB" />
  <text x="160" y="298" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF">OFFICIAL RECRUITER</text>

  <g transform="translate(305, 30)">
    <rect width="255" height="340" fill="#FFFFFF" rx="12" stroke="#CBD5E1" stroke-width="1.5" />
    <rect x="20" y="20" width="215" height="40" fill="#EFF6FF" rx="6" />
    <text x="30" y="44" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1E40AF">PROGRAM FREELANCE WFH</text>
    
    <text x="20" y="85" font-family="sans-serif" font-size="10" font-weight="bold" fill="#475569">POSISI: Reviewer Media &amp; Optimasi Toko</text>
    <text x="20" y="105" font-family="sans-serif" font-size="10" font-weight="bold" fill="#16A34A">GAJI: Rp 350.000 - Rp 1.500.000 / Hari</text>
    <text x="20" y="125" font-family="sans-serif" font-size="9" fill="#64748B">Sistem: Kerja Remote dari Ponsel (1-2 Jam)</text>

    <line x1="20" y1="140" x2="235" y2="140" stroke="#E2E8F0" />
    
    <text x="20" y="165" font-family="sans-serif" font-size="9" font-weight="bold" fill="#334155">Tahapan Verifikasi:</text>
    <text x="20" y="185" font-family="sans-serif" font-size="9" fill="#64748B">1. Konfirmasi ID Telegram Mitra</text>
    <text x="20" y="205" font-family="sans-serif" font-size="9" fill="#64748B">2. Pembayaran Slot Admin: Rp 150.000</text>
    <text x="20" y="225" font-family="sans-serif" font-size="9" fill="#64748B">3. Pencairan Bonus Langsung Masuk Rekening</text>

    <rect x="20" y="250" width="215" height="48" fill="#FEF2F2" stroke="#FCA5A5" rx="6" />
    <text x="127" y="270" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#991B1B">PERHATIAN: BIAYA ADMIN REFUNDABLE</text>
    <text x="127" y="286" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#B91C1C">Ditransfer kembali 100% setelah tugas 1 selesai</text>
  </g>
</svg>`;

// K4: Surat Anomali Transaksi Bank
const k4BankSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#F8FAFC" rx="16" />
  
  <rect x="40" y="25" width="520" height="350" fill="#FFFFFF" rx="8" stroke="#94A3B8" stroke-width="1.5" />
  
  <rect x="40" y="25" width="520" height="55" fill="#0F172A" rx="8" />
  <rect x="40" y="60" width="520" height="20" fill="#0F172A" />
  <text x="60" y="58" font-family="sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" letter-spacing="2">PUSAT KEAMANAN TRANSAKSI NASIONAL</text>
  <text x="540" y="58" text-anchor="end" font-family="sans-serif" font-size="10" font-weight="bold" fill="#38BDF8">FRAUD INVESTIGATION</text>

  <rect x="60" y="95" width="480" height="45" fill="#FEF2F2" stroke="#EF4444" rx="6" />
  <text x="80" y="118" font-family="sans-serif" font-size="12" font-weight="bold" fill="#B91C1C">NOTIFIKASI ANOMALI: TRANSFER MENCURIGAKAN DITANGGUHKAN</text>
  <text x="80" y="132" font-family="sans-serif" font-size="10" fill="#991B1B">Nilai Transaksi: Rp 4.500.000 ke Rekening Penerima: 88290-XXXX (Bank Swasta)</text>

  <g transform="translate(60, 155)">
    <rect width="480" height="95" fill="#F1F5F9" rx="6" />
    <text x="20" y="25" font-family="sans-serif" font-size="11" font-weight="bold" fill="#334155">Nomor Tiket Kasus: TR-SEC/2026-XI/88219</text>
    <text x="20" y="45" font-family="sans-serif" font-size="10" fill="#64748B">Waktu Deteksi: 09:42:15 WIB • Status: Menunggu Otorisasi Pembatalan</text>
    <text x="20" y="65" font-family="sans-serif" font-size="10" fill="#64748B">Petugas Investigator: Tim Reaksi Cepat Perlindungan Nasabah</text>
    <text x="20" y="85" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0284C7">Instruksi: Sebutkan 6 digit kode SMS pembatalan untuk mengamankan saldo</text>
  </g>

  <rect x="60" y="265" width="480" height="50" fill="#FFFBEB" stroke="#F59E0B" rx="6" />
  <text x="75" y="286" font-family="sans-serif" font-size="10" font-weight="bold" fill="#B45309">PERHATIAN SISTEM KEAMANAN:</text>
  <text x="75" y="302" font-family="sans-serif" font-size="9" fill="#92400E">Jika dalam 15 menit kode SMS tidak dikonfirmasi, saldo Rp 4.500.000 akan terpotong permanen.</text>

  <circle cx="480" cy="340" r="24" fill="none" stroke="#DC2626" stroke-width="2" stroke-dasharray="3,2" />
  <text x="480" y="343" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="#DC2626">FRAUD ALERT</text>
</svg>`;

// K5: Portofolio Trading Kripto
const k5TradingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.0" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="#0F172A" rx="16" />

  <rect x="30" y="20" width="540" height="45" fill="#1E293B" rx="8" />
  <text x="50" y="48" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">CRYPTOX GLOBAL TRADING</text>
  <rect x="450" y="30" width="105" height="24" rx="12" fill="#065F46" />
  <text x="502" y="46" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#34D399">VIP MEMBER 3</text>

  <g transform="translate(30, 80)">
    <rect width="540" height="90" fill="#1E293B" rx="10" stroke="#334155" />
    <text x="25" y="30" font-family="sans-serif" font-size="11" fill="#94A3B8">TOTAL ESTIMATED BALANCE (USDT)</text>
    <text x="25" y="62" font-family="sans-serif" font-size="26" font-weight="900" fill="#FFFFFF">$ 14,850.20</text>
    <text x="210" y="62" font-family="sans-serif" font-size="15" font-weight="bold" fill="#10B981">+32.4% (Today)</text>
    <text x="25" y="80" font-family="sans-serif" font-size="10" fill="#64748B">Setara: Rp 234.630.000 (Withdrawal Sukses)</text>
  </g>

  <g transform="translate(30, 185)">
    <rect width="540" height="150" fill="#1E293B" rx="10" stroke="#334155" />
    <text x="25" y="25" font-family="sans-serif" font-size="11" font-weight="bold" fill="#CBD5E1">BTC/USDT SIGNAL CHART (2 HOURS PROFIT)</text>
    
    <path d="M 30 115 Q 120 120, 200 95 T 350 60 T 450 30 T 510 20 L 510 135 L 30 135 Z" fill="url(#chartBg)" />
    <path d="M 30 115 Q 120 120, 200 95 T 350 60 T 450 30 T 510 20" fill="none" stroke="#10B981" stroke-width="3.5" stroke-linecap="round" />
    
    <circle cx="510" cy="20" r="5" fill="#10B981" stroke="#FFFFFF" stroke-width="2" />
    <text x="440" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#34D399">+ Rp 14.500.000</text>
  </g>

  <text x="300" y="365" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94A3B8">Tangkapan layar profit harian yang dikirimkan oleh kenalan daring</text>
</svg>`;

// K6: Email Peringatan Penangguhan Akun
const k6VoucherSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#F8FAFC" rx="16" />
  <rect x="35" y="25" width="530" height="350" fill="#FFFFFF" rx="12" stroke="#CBD5E1" stroke-width="1.5" />
  
  <rect x="35" y="25" width="530" height="60" fill="#1E293B" rx="12" />
  <rect x="35" y="65" width="530" height="20" fill="#1E293B" />
  <text x="55" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">CLOUD AUTH SECURITY CENTER</text>
  <text x="545" y="60" text-anchor="end" font-family="monospace" font-size="11" fill="#EF4444">URGENT ACTION REQUIRED</text>

  <rect x="55" y="105" width="490" height="40" fill="#FEF2F2" stroke="#FCA5A5" rx="6" />
  <text x="70" y="129" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991B1B">PERINGATAN: Akun Anda akan dinonaktifkan dalam 24 jam</text>

  <g transform="translate(55, 160)">
    <text x="0" y="20" font-family="sans-serif" font-size="11" fill="#475569">Kepada Pengguna Layanan,</text>
    <text x="0" y="42" font-family="sans-serif" font-size="11" fill="#475569">Kami mendeteksi aktivitas login yang tidak wajar dari lokasi asing (IP: 198.51.100.24).</text>
    <text x="0" y="62" font-family="sans-serif" font-size="11" fill="#475569">Untuk mempertahankan akses data dan dokumen Anda, segera verifikasi identitas akun.</text>

    <rect x="120" y="85" width="250" height="36" rx="18" fill="#DC2626" />
    <text x="245" y="107" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">VERIFIKASI AKUN SEKARANG</text>

    <text x="245" y="145" text-anchor="middle" font-family="monospace" font-size="9" fill="#94A3B8">Tautan: http://login-keamanan-akun-update.xyz/verify-auth</text>
  </g>
</svg>`;

// K7: Surat Pengumuman Pemenang Giveaway Hadiah
const k7SecuritySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="partyGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#partyGrad)" rx="16" />
  
  <rect x="25" y="25" width="550" height="350" fill="#FFFFFF" rx="14" />
  <rect x="25" y="25" width="550" height="50" fill="#FEF3C7" rx="14" />
  <rect x="25" y="55" width="550" height="20" fill="#FEF3C7" />
  <text x="300" y="55" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="900" fill="#92400E" letter-spacing="2">SURAT RESMI PEMENANG GEBYAR UNDIAN</text>

  <circle cx="300" cy="120" r="32" fill="#FEF08A" stroke="#EAB308" stroke-width="2" />
  <text x="300" y="128" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="black" fill="#854D0E">1ST</text>

  <text x="300" y="180" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1E293B">SELAMAT! NOMOR ANDA TERPILIH</text>
  <text x="300" y="202" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#059669">Mendapatkan 1 Unit iPhone 15 Pro Max (256 GB)</text>

  <rect x="60" y="225" width="480" height="70" fill="#F1F5F9" rx="8" />
  <text x="80" y="250" font-family="sans-serif" font-size="11" font-weight="bold" fill="#334155">Kode Klaim Hadiah: GBYR-8829-WIN</text>
  <text x="80" y="275" font-family="sans-serif" font-size="10" fill="#64748B">Syarat Pencairan: Transfer biaya materai dan asuransi pengiriman Rp 350.000</text>

  <rect x="120" y="312" width="360" height="34" rx="8" fill="#4F46E5" />
  <text x="300" y="333" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">KLAIM HADIAH LEWAT KUPON RESMI</text>
</svg>`;

// K8: Katalog Flash Sale Gadget Palsu
const k8FlashSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#18181B" rx="16" />
  <rect x="25" y="20" width="550" height="45" fill="#EF4444" rx="8" />
  <text x="45" y="48" font-family="sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" letter-spacing="2">FLASH SALE CUCI GUDANG 70%</text>
  <text x="555" y="48" text-anchor="end" font-family="monospace" font-size="12" font-weight="bold" fill="#FEF08A">BERAKHIR: 00:14:59</text>

  <g transform="translate(40, 85)">
    <rect width="245" height="235" fill="#27272A" rx="10" stroke="#3F3F46" />
    <rect x="20" y="20" width="205" height="110" fill="#3F3F46" rx="6" />
    <text x="122" y="80" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#A1A1AA">FOTO GADGET PRO 512GB</text>
    <text x="20" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Flagship Pro Smartphone</text>
    <text x="20" y="178" font-family="sans-serif" font-size="11" text-decoration="line-through" fill="#71717A">Rp 19.999.000</text>
    <text x="20" y="202" font-family="sans-serif" font-size="16" font-weight="900" fill="#EF4444">Rp 4.500.000</text>
    <rect x="150" y="185" width="75" height="26" rx="13" fill="#EF4444" />
    <text x="187" y="202" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF">BELI</text>
  </g>

  <g transform="translate(315, 85)">
    <rect width="245" height="235" fill="#27272A" rx="10" stroke="#3F3F46" />
    <rect x="20" y="20" width="205" height="110" fill="#3F3F46" rx="6" />
    <text x="122" y="80" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#A1A1AA">FOTO LAPTOP SLIM 16GB</text>
    <text x="20" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Ultra Slim Laptop Core i7</text>
    <text x="20" y="178" font-family="sans-serif" font-size="11" text-decoration="line-through" fill="#71717A">Rp 16.500.000</text>
    <text x="20" y="202" font-family="sans-serif" font-size="16" font-weight="900" fill="#EF4444">Rp 3.800.000</text>
    <rect x="150" y="185" width="75" height="26" rx="13" fill="#EF4444" />
    <text x="187" y="202" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF">BELI</text>
  </g>

  <rect x="40" y="335" width="520" height="32" rx="6" fill="#F59E0B" />
  <text x="300" y="355" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#78350F">PERINGATAN: Promo hanya berlaku via transfer bank langsung (Non-Rekber)</text>
</svg>`;

// ============================================================================
// 2. CHAT SNIPPET COVERS UNTUK SIMULATOR (CARD PREVIEWS DI HALAMAN BELAJAR)
// ============================================================================

// Helper untuk membuat SVG Chat Snippet yang presisi dan realistis
function makeChatSnippetSvg({
  channelName = "WhatsApp",
  senderName = "+62 812-7788-9901",
  senderStatus = "Nomor tak dikenal • Terakhir dilihat 11:40",
  message = "Kak, kami mengundang ke pernikahan kami, buka undangan digital di aplikasi ini ya.",
  badge = "Skenario K1",
  attachment = null,
  photoPreview = null,
  warning = null
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" width="100%" height="100%">
  <defs>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#27374D" />
      <stop offset="100%" stop-color="#1E2B3D" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.1" />
    </filter>
    <pattern id="chatDoodle" width="240" height="240" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="#27374D" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity="0.11">
        <!-- Chat Bubble -->
        <path d="M 18 16 h 18 a 4 4 0 0 1 4 4 v 9 a 4 4 0 0 1 -4 4 h -10 l -5 4 v -4 a 4 4 0 0 1 -3 -4 v -9 a 4 4 0 0 1 4 -4 z" />
        <line x1="23" y1="23" x2="33" y2="23" />
        <!-- Coffee Cup -->
        <path d="M 78 18 h 16 v 10 a 5 5 0 0 1 -5 5 h -6 a 5 5 0 0 1 -5 -5 z" />
        <path d="M 94 21 a 3 3 0 0 1 3 3 a 3 3 0 0 1 -3 3" />
        <line x1="75" y1="36" x2="97" y2="36" />
        <!-- Magnifying Glass -->
        <circle cx="145" cy="24" r="7" />
        <line x1="150" y1="29" x2="157" y2="36" />
        <!-- Paper Plane -->
        <path d="M 198 34 l 18 -9 l -9 18 l -3 -6 l -6 -3 z" />
        <line x1="216" y1="25" x2="204" y2="28" />
        <!-- Headphones -->
        <path d="M 22 78 a 10 10 0 0 1 20 0" />
        <rect x="20" y="77" width="4" height="7" rx="1.5" />
        <rect x="40" y="77" width="4" height="7" rx="1.5" />
        <!-- Clock -->
        <circle cx="92" cy="78" r="9" />
        <polyline points="92 73 92 78 96 80" />
        <!-- Padlock -->
        <rect x="150" y="77" width="13" height="10" rx="2" />
        <path d="M 153 77 v -4 a 3.5 3.5 0 0 1 7 0 v 4" />
        <!-- Mail Envelope -->
        <rect x="202" y="75" width="16" height="12" rx="2" />
        <polyline points="203 76 210 82 217 76" />
        <!-- Heart -->
        <path d="M 26 132 c -4 -6 -11 0 -5 7 l 5 6 l 5 -6 c 6 -7 -1 -13 -5 -7 z" />
        <!-- Shield -->
        <path d="M 85 125 h 16 v 6 c 0 6 -8 11 -8 11 c 0 0 -8 -5 -8 -11 z" />
        <!-- Camera -->
        <rect x="142" y="126" width="18" height="13" rx="2.5" />
        <circle cx="151" cy="132.5" r="3.5" />
        <!-- Music Note -->
        <ellipse cx="203" cy="136" rx="2.5" ry="2" />
        <line x1="205.5" y1="136" x2="205.5" y2="124" />
        <ellipse cx="214" cy="133" rx="2.5" ry="2" />
        <line x1="216.5" y1="133" x2="216.5" y2="121" />
        <line x1="205.5" y1="124" x2="216.5" y2="121" />
        <!-- Smartphone -->
        <rect x="25" y="180" width="11" height="17" rx="2" />
        <!-- Star -->
        <polygon points="90,178 92,183 97,183 93,186 95,191 90,188 85,191 87,186 83,183 88,183" />
        <!-- Cloud -->
        <path d="M 145 186 a 3.5 3.5 0 0 1 6 -1.5 a 5 5 0 0 1 9 1.5 a 3.5 3.5 0 0 1 1 6 h -15 a 3.5 3.5 0 0 1 -1 -6 z" />
        <!-- Lightbulb -->
        <path d="M 204 180 a 4.5 4.5 0 0 1 7 4.5 c -1 1.5 -1.8 2.5 -1.8 4 h -3.4 c 0 -1.5 -0.8 -2.5 -1.8 -4 a 4.5 4.5 0 0 1 0 -4.5 z" />
        <!-- Accents -->
        <path d="M 58 48 v 5 M 55.5 50.5 h 5" stroke-width="1" />
        <path d="M 182 50 v 5 M 179.5 52.5 h 5" stroke-width="1" />
        <path d="M 60 148 v 5 M 57.5 150.5 h 5" stroke-width="1" />
        <circle cx="118" cy="46" r="1.5" />
        <circle cx="125" cy="105" r="1.5" />
        <circle cx="58" cy="100" r="1.2" />
        <circle cx="118" cy="155" r="1.5" />
        <circle cx="65" cy="208" r="1.5" />
      </g>
    </pattern>
  </defs>

  <!-- Background Wallpaper Chat Doodle Halus -->
  <rect width="480" height="320" fill="#EFEAE2" rx="20" />
  <rect width="480" height="320" fill="url(#chatDoodle)" rx="20" />

  <!-- Top Phone Chat Header Bar -->
  <rect width="480" height="54" fill="url(#headerGrad)" rx="0" />
  
  <!-- Avatar -->
  <circle cx="30" cy="27" r="16" fill="#F59E0B" />
  <text x="30" y="32" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">?</text>

  <!-- Sender Text Info -->
  <text x="56" y="23" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">${senderName}</text>
  <text x="56" y="39" font-family="sans-serif" font-size="9" fill="#9DB2BF">${senderStatus}</text>

  <!-- Chat Message Bubble Container -->
  <g transform="translate(20, 68)" filter="url(#shadow)">
    <!-- Main Bubble -->
    <rect width="380" height="${attachment || photoPreview ? '195' : '110'}" fill="#FFFFFF" rx="14" />
    
    <!-- Bubble tail -->
    <path d="M -8 14 L 0 8 L 0 24 Z" fill="#FFFFFF" />

    <!-- Chat Text Content -->
    <text x="14" y="24" font-family="sans-serif" font-size="11.5" fill="#1F2937">${message.slice(0, 48)}</text>
    <text x="14" y="42" font-family="sans-serif" font-size="11.5" fill="#1F2937">${message.slice(48, 100)}</text>
    ${message.length > 100 ? `<text x="14" y="60" font-family="sans-serif" font-size="11.5" fill="#1F2937">${message.slice(100, 150)}</text>` : ''}

    ${photoPreview ? `
    <!-- Photo Attachment Preview Mini -->
    <g transform="translate(14, ${message.length > 100 ? '72' : '54'})">
      <rect width="352" height="62" rx="8" fill="#F1F5F9" stroke="#E2E8F0" />
      <rect x="6" y="6" width="50" height="50" rx="6" fill="#3B82F6" opacity="0.8" />
      <text x="31" y="35" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#FFFFFF">IMG</text>
      <text x="68" y="26" font-family="sans-serif" font-size="10.5" font-weight="bold" fill="#1E293B">${photoPreview.name}</text>
      <text x="68" y="44" font-family="sans-serif" font-size="9" fill="#64748B">${photoPreview.sub}</text>
    </g>
    ` : ''}

    ${attachment ? `
    <!-- File APK/Dokumen Card Box -->
    <g transform="translate(14, ${photoPreview ? '124' : (message.length > 100 ? '72' : '56')})">
      <rect width="352" height="52" rx="10" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.2" />
      <rect x="8" y="8" width="36" height="36" rx="6" fill="#DC2626" />
      <text x="26" y="24" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF">APK</text>
      <path d="M20 28 L26 34 L32 28 M26 24 L26 34" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" />
      
      <text x="54" y="24" font-family="sans-serif" font-size="10.5" font-weight="bold" fill="#991B1B">${attachment.name}</text>
      <text x="54" y="38" font-family="sans-serif" font-size="9" fill="#DC2626">${attachment.size} • Berkas Installer Mentah</text>
    </g>
    ` : ''}

    <text x="366" y="${attachment || photoPreview ? '186' : '102'}" text-anchor="end" font-family="sans-serif" font-size="9" fill="#9CA3AF">09:41</text>
  </g>

  ${warning ? `
  <!-- Bottom Warning Banner -->
  <g transform="translate(20, 276)">
    <rect width="440" height="28" rx="6" fill="#FFFBEB" stroke="#FDE68A" />
    <text x="14" y="18" font-family="sans-serif" font-size="9.5" font-weight="bold" fill="#B45309">Peringatan: ${warning}</text>
  </g>
  ` : ''}
</svg>`;
}

// K1 Chat Snippet SVG
const k1SnippetSvg = makeChatSnippetSvg({
  channelName: "WhatsApp",
  senderName: "+62 812-7788-9901",
  senderStatus: "Nomor tak dikenal • Terakhir dilihat 11:40",
  message: "Kak, kami mengundang ke pernikahan kami, buka undangan digital di aplikasi ini ya.",
  badge: "Skenario K1",
  attachment: { name: "Undangan_Pernikahan_Digital.apk", size: "7.8 MB" },
  warning: "Ekstensi .apk di chat berisiko pencurian OTP"
});

// K2 Chat Snippet SVG
const k2SnippetSvg = makeChatSnippetSvg({
  channelName: "WhatsApp",
  senderName: "+62 877-4409-1234",
  senderStatus: "Kurir Ekspedisi Paket • Online",
  message: "Paket Anda tertahan di gudang sortir karena alamat kurang jelas. Cek foto buktinya ya kak:",
  badge: "Skenario K2",
  photoPreview: { name: "Foto_Bukti_Resi_Paket.jpg", sub: "Foto Resi & Paket Tertahan (Gagal Kirim)" },
  attachment: { name: "Foto_Resi_Paket.jpg.apk", size: "6.4 MB" },
  warning: "Ekstensi ganda .jpg.apk berbahaya menyamar gambar"
});

// K3 Chat Snippet SVG
const k3SnippetSvg = makeChatSnippetSvg({
  channelName: "Media Sosial",
  senderName: "Clarissa Aurelia (HR Global)",
  senderStatus: "Recruiter Digital • Aktif sekarang",
  message: "Selamat Anda lolos seleksi sebagai Admin WFH paruh waktu gaji Rp 5.000.000/bulan.",
  badge: "Skenario K3",
  photoPreview: { name: "ID_Card_HRD_Clarissa.jpg", sub: "Bukti ID Card Resmi & Penawaran Kontrak" },
  attachment: { name: "Panduan_Tugas_Deposit.apk", size: "5.1 MB" },
  warning: "Loker meminta biaya deposit di muka adalah modus penipuan"
});

// K4 Chat Snippet SVG
const k4SnippetSvg = makeChatSnippetSvg({
  channelName: "Panggilan Telepon",
  senderName: "Pusat Investigasi Fraud Bank",
  senderStatus: "Panggilan Masuk • Spoofing 1500888",
  message: "Terdeteksi transaksi mencurigakan Rp 4.500.000. Sebutkan 6 digit SMS verifikasi untuk blokir.",
  badge: "Skenario K4",
  photoPreview: { name: "Surat_Notifikasi_Anomali.jpg", sub: "Peringatan Transaksi Ilegal Bank Nasional" },
  warning: "Pihak bank resmi tidak pernah meminta kode OTP via telepon"
});

// K5 Chat Snippet SVG
const k5SnippetSvg = makeChatSnippetSvg({
  channelName: "Dating App / Telegram",
  senderName: "Rian (Crypto Trader)",
  senderStatus: "Kenalan Daring • Terakhir dilihat 2 mnt lalu",
  message: "Hari ini portofolioku naik lagi 32% kak! Coba ikut sinyal grup VIP ini, modal cepat balik:",
  badge: "Skenario K5",
  photoPreview: { name: "Screenshot_Profit_Harian.jpg", sub: "Saldo Portofolio $14,850 USDT (+32.4%)" },
  warning: "Iming-iming return tinggi tanpa risiko adalah skema Ponzi"
});

// K6 Chat Snippet SVG
const k6SnippetSvg = makeChatSnippetSvg({
  channelName: "Email",
  senderName: "Security Cloud Auth",
  senderStatus: "service-security@auth-update-center.xyz",
  message: "Akun Anda terdeteksi login mencurigakan. Buka lampiran formulir pemulihan identitas:",
  badge: "Skenario K6",
  attachment: { name: "Formulir_Pemulihan_Akun.pdf.apk", size: "4.8 MB" },
  warning: "Domain pengirim mencurigakan di luar domain resmi"
});

// K7 Chat Snippet SVG
const k7SnippetSvg = makeChatSnippetSvg({
  channelName: "Media Sosial",
  senderName: "Official Gebyar Hadiah",
  senderStatus: "Akun Bisnis • Centang Palsu",
  message: "Selamat! Nomor HP kamu terpilih menang iPhone 15 Pro Max. Buka kupon klaim berikut:",
  badge: "Skenario K7",
  photoPreview: { name: "Sertifikat_Pemenang_Kupon.jpg", sub: "Surat Undian Pemenang Hadiah Gebyar" },
  warning: "Hadiah asli tidak meminta transfer biaya administrasi diawal"
});

// K8 Chat Snippet SVG
const k8SnippetSvg = makeChatSnippetSvg({
  channelName: "Marketplace / Iklan",
  senderName: "Toko Elektronik Grosir ID",
  senderStatus: "Seller Fast Response • Online",
  message: "Harga promo Rp 4.500.000 khusus transfer langsung ke rekening admin toko ya kak:",
  badge: "Skenario K8",
  photoPreview: { name: "Katalog_Promo_CuciGudang.jpg", sub: "Diskon 70% Flagship Smartphone (Promo Kilat)" },
  warning: "Menghindari rekening bersama (rekber) adalah red flag fatal"
});

// ============================================================================
// SIMPAN KE DIREKTORI PUBLIC/SIMULATOR
// ============================================================================

// Simpan Gambar Pendukung Skenario (Supporting Images)
fs.writeFileSync(path.join(dir, 'k1-invitation.svg'), k1InviteSvg);
fs.writeFileSync(path.join(dir, 'k2-resi-kurir.svg'), k2ResiSvg);
fs.writeFileSync(path.join(dir, 'k3-loker-id.svg'), k3LokerSvg);
fs.writeFileSync(path.join(dir, 'k4-bank-notice.svg'), k4BankSvg);
fs.writeFileSync(path.join(dir, 'k5-trading-profit.svg'), k5TradingSvg);
fs.writeFileSync(path.join(dir, 'k6-voucher-hadiah.svg'), k6VoucherSvg);
fs.writeFileSync(path.join(dir, 'k7-security-warning.svg'), k7SecuritySvg);
fs.writeFileSync(path.join(dir, 'k8-flash-sale.svg'), k8FlashSvg);

// Simpan Chat Snippet Covers Skenario
fs.writeFileSync(path.join(dir, 'k1-chat-snippet.svg'), k1SnippetSvg);
fs.writeFileSync(path.join(dir, 'k2-chat-snippet.svg'), k2SnippetSvg);
fs.writeFileSync(path.join(dir, 'k3-chat-snippet.svg'), k3SnippetSvg);
fs.writeFileSync(path.join(dir, 'k4-chat-snippet.svg'), k4SnippetSvg);
fs.writeFileSync(path.join(dir, 'k5-chat-snippet.svg'), k5SnippetSvg);
fs.writeFileSync(path.join(dir, 'k6-chat-snippet.svg'), k6SnippetSvg);
fs.writeFileSync(path.join(dir, 'k7-chat-snippet.svg'), k7SnippetSvg);
fs.writeFileSync(path.join(dir, 'k8-chat-snippet.svg'), k8SnippetSvg);

console.log('All supporting images and chat snippets created successfully!');
