import { useState, useEffect, useRef, useMemo } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Search,
  ShieldAlert,
  BookOpen,
  KeyRound,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Smartphone,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import NotificationDropdown from "./NotificationDropdown";
import UserProfileDropdown from "./UserProfileDropdown";
import MobileCurvedBottomNav from "./MobileCurvedBottomNav";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", shortLabel: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/belajar", label: "Belajar", shortLabel: "Belajar", icon: BookOpen },
  { to: "/cek", label: "Cek Pesan & File", shortLabel: "Cek", icon: Search },
  { to: "/lindungi", label: "Panduan Lindungi", shortLabel: "Lindungi", icon: ShieldAlert },
  { to: "/sandi", label: "Sandi Keluarga", shortLabel: "Sandi", icon: KeyRound },
];

interface SearchItem {
  id: string;
  type: "simulator" | "modul" | "kamus";
  title: string;
  subtitle: string;
  url: string;
  badge: string;
}

const SEARCH_POOL: SearchItem[] = [
  // 8 Skenario Simulator
  { id: "sim-k1", type: "simulator", title: "Simulator K1 · Undangan APK", subtitle: "WhatsApp · File .apk penipuan", url: "/belajar?tab=simulator&scenario=k1", badge: "Simulator" },
  { id: "sim-k2", type: "simulator", title: "Simulator K2 · Lihat Foto Paket", subtitle: "WhatsApp · Ekstensi ganda .jpg.apk", url: "/belajar?tab=simulator&scenario=k2", badge: "Simulator" },
  { id: "sim-k3", type: "simulator", title: "Simulator K3 · Loker Admin WFH", subtitle: "Media Sosial · Jebakan deposit kerja", url: "/belajar?tab=simulator&scenario=k3", badge: "Simulator" },
  { id: "sim-k4", type: "simulator", title: "Simulator K4 · Telepon Palsu Bank", subtitle: "Panggilan Suara · Manipulasi OTP vishing", url: "/belajar?tab=simulator&scenario=k4", badge: "Simulator" },
  { id: "sim-k5", type: "simulator", title: "Simulator K5 · Investasi Bodong", subtitle: "Dating App · Jebakan Pig Butchering", url: "/belajar?tab=simulator&scenario=k5", badge: "Simulator" },
  { id: "sim-k6", type: "simulator", title: "Simulator K6 · Akun Ditangguhkan", subtitle: "Email · Trik phishing login darurat", url: "/belajar?tab=simulator&scenario=k6", badge: "Simulator" },
  { id: "sim-k7", type: "simulator", title: "Simulator K7 · Giveaway Palsu", subtitle: "Media Sosial · Pungutan pajak hadiah", url: "/belajar?tab=simulator&scenario=k7", badge: "Simulator" },
  { id: "sim-k8", type: "simulator", title: "Simulator K8 · Toko Online Fiktif", subtitle: "Marketplace · Pancingan diskon murah", url: "/belajar?tab=simulator&scenario=k8", badge: "Simulator" },

  // 12 Modul Pembelajaran
  { id: "mod-1", type: "modul", title: "Modul · Apa Itu Rekayasa Sosial?", subtitle: "Dasar Keamanan · Konsep dasar manipulasi", url: "/belajar?tab=modul&module=m1", badge: "Modul" },
  { id: "mod-2", type: "modul", title: "Modul · Anatomi Sebuah Penipuan", subtitle: "Dasar Keamanan · Pendekatan & eksploitasi", url: "/belajar?tab=modul&module=m2", badge: "Modul" },
  { id: "mod-3", type: "modul", title: "Modul · Keamanan di WhatsApp", subtitle: "Per Kanal · Cek akun centang hijau & broadcast", url: "/belajar?tab=modul&module=m3", badge: "Modul" },
  { id: "mod-4", type: "modul", title: "Modul · Keamanan Email & Phishing", subtitle: "Per Kanal · Cara bedah domain palsu", url: "/belajar?tab=modul&module=m4", badge: "Modul" },
  { id: "mod-5", type: "modul", title: "Modul · Waspada Telepon Bank", subtitle: "Per Kanal · Caller ID spoofing & vishing", url: "/belajar?tab=modul&module=m5", badge: "Modul" },
  { id: "mod-6", type: "modul", title: "Modul · 10 Ciri Pesan Phishing", subtitle: "Checklist Praktis · Checklist sebelum klik link", url: "/belajar?tab=modul&module=m6", badge: "Modul" },
  { id: "mod-7", type: "modul", title: "Modul · Checklist Sebelum Transfer", subtitle: "Checklist Praktis · Verifikasi rekening tujuan", url: "/belajar?tab=modul&module=m7", badge: "Modul" },
  { id: "mod-8", type: "modul", title: "Modul · Modus Penipuan Terbanyak", subtitle: "Pola Nyata · Data IASC & OJK", url: "/belajar?tab=modul&module=m8", badge: "Modul" },
  { id: "mod-9", type: "modul", title: "Modul · Penipuan QRIS & E-Wallet", subtitle: "Pola Nyata · QR palsu & tautan pembayaran", url: "/belajar?tab=modul&module=m9", badge: "Modul" },
  { id: "mod-10", type: "modul", title: "Modul · Pinjol Ilegal & Pencurian Data", subtitle: "Pola Nyata · Mengamankan kontak & izin HP", url: "/belajar?tab=modul&module=m10", badge: "Modul" },
  { id: "mod-11", type: "modul", title: "Modul · Cara Lapor Jika Jadi Korban", subtitle: "Setelah Kejadian · Bank, IASC & OJK", url: "/belajar?tab=modul&module=m11", badge: "Modul" },
  { id: "mod-12", type: "modul", title: "Modul · Dampingi Keluarga Korban", subtitle: "Setelah Kejadian · Komunikasi tanpa menyalahkan", url: "/belajar?tab=modul&module=m12", badge: "Modul" },

  // 10 Istilah Kamus
  { id: "kam-1", type: "kamus", title: "Kamus · Sniffing APK", subtitle: "Pencurian SMS OTP berkedok file .apk", url: "/belajar?tab=kamus&q=Sniffing", badge: "Kamus" },
  { id: "kam-2", type: "kamus", title: "Kamus · Social Engineering", subtitle: "Manipulasi psikologis panik & rasa bersalah", url: "/belajar?tab=kamus&q=Social+Engineering", badge: "Kamus" },
  { id: "kam-3", type: "kamus", title: "Kamus · Phishing & Typosquatting", subtitle: "Situs tiruan dengan kemiripan domain", url: "/belajar?tab=kamus&q=Phishing", badge: "Kamus" },
  { id: "kam-4", type: "kamus", title: "Kamus · Caller ID Spoofing", subtitle: "Memanipulasi nomor panggilan masuk bank", url: "/belajar?tab=kamus&q=Spoofing", badge: "Kamus" },
  { id: "kam-5", type: "kamus", title: "Kamus · OTP Hijacking", subtitle: "Teknik mencuri kode otorisasi 6 digit", url: "/belajar?tab=kamus&q=OTP", badge: "Kamus" },
  { id: "kam-6", type: "kamus", title: "Kamus · Pig Butchering Scam", subtitle: "Kedekatan emosional sebelum disedot investasinya", url: "/belajar?tab=kamus&q=Pig+Butchering", badge: "Kamus" },
  { id: "kam-7", type: "kamus", title: "Kamus · Fake Job Scam", subtitle: "Loker admin WFH yang memeras uang deposit", url: "/belajar?tab=kamus&q=Loker", badge: "Kamus" },
  { id: "kam-8", type: "kamus", title: "Kamus · SIM Swap Fraud", subtitle: "Pembajakan nomor kartu SIM operator", url: "/belajar?tab=kamus&q=SIM+Swap", badge: "Kamus" },
  { id: "kam-9", type: "kamus", title: "Kamus · Quishing (QR Phishing)", subtitle: "Kode QR palsu yang ditempel di kasir/ATM", url: "/belajar?tab=kamus&q=QR", badge: "Kamus" },
  { id: "kam-10", type: "kamus", title: "Kamus · Account Takeover (ATO)", subtitle: "Pengambilalihan akun perbankan & sosmed", url: "/belajar?tab=kamus&q=Account+Takeover", badge: "Kamus" },
];

function getRandomRecommendations(pool: SearchItem[], count = 5): SearchItem[] {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Layout() {
  const { user, isAuthenticated, logout, openLoginModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<SearchItem[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Tutup dropdown search saat rute berpindah
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Listener klik di luar search box untuk menutup dropdown rekomendasi
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Saat input search diklik/fokus: buka dropdown dan refresh 5 rekomendasi acak baru
  const handleSearchFocus = () => {
    setIsSearchOpen(true);
    setRecommendations(getRandomRecommendations(SEARCH_POOL, 5));
  };

  const handleSelectRecommendation = (item: SearchItem) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(item.url);
  };

  // Filter hasil saat mengetik, atau tampilkan 5 rekomendasi acak saat kosong
  const displayedItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return recommendations.slice(0, 5);
    }
    const q = searchQuery.toLowerCase().trim();
    return SEARCH_POOL.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery, recommendations]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (displayedItems.length > 0) {
      handleSelectRecommendation(displayedItems[0]);
    } else if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/belajar?tab=kamus&q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // =========================================================================
  // KONDISI 1: PENGUNJUNG BELUM LOGIN (LANDING PAGE MODE PERSIS SEPERTI VIDEO)
  // Background: DDE6ED, Font: 27374D, Aksen Kontras: 526D82 & 9DB2BF
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-[#DDE6ED] text-[#27374D] font-sans antialiased selection:bg-[#526D82] selection:text-white">
        {/* Skip to Content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#27374D] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#526D82]"
        >
          Lewati ke konten utama
        </a>

        {/* Top Header Navbar untuk Landing Page (Persis seperti di video referensi) */}
        <header className="sticky top-0 z-40 border-b border-[#9DB2BF]/40 bg-white/95 backdrop-blur-md shadow-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
            {/* Logo Brand JagaRuang (Posisi Cerah: Logo Biru) */}
            <NavLink
              to="/"
              className="flex items-center gap-2.5 font-bold text-[#27374D] text-lg hover:text-[#526D82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526D82] rounded-md transition-colors"
            >
              <img
                src="/logo-blue.png"
                alt="Logo JagaRuang"
                className="h-9 w-9 object-contain shrink-0"
              />
              <div className="flex items-baseline gap-0.5">
                <span className="leading-tight font-black text-xl tracking-tight text-[#27374D]">
                  JagaRuang
                </span>
                <span className="font-extrabold text-[#526D82] text-xl">.</span>
              </div>
            </NavLink>

            {/* Nav Links Tengah (seperti Home, About, Pricing, Contact, Blog di video) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold text-[#526D82]">
              <a href="#beranda" className="hover:text-[#27374D] transition-colors">
                Home
              </a>
              <a href="#tiga-pilar" className="hover:text-[#27374D] transition-colors">
                Tiga Pilar
              </a>
              <a href="#modul" className="hover:text-[#27374D] transition-colors">
                Kasus & Modul
              </a>
              <a href="#testimoni" className="hover:text-[#27374D] transition-colors">
                Cerita Rekan
              </a>
              <a href="#faq" className="hover:text-[#27374D] transition-colors">
                FAQ
              </a>
            </nav>

            {/* Tombol Kanan (Login & Register / Mulai Sekarang) */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <NavLink
                to="/login"
                className="inline-flex min-h-[40px] items-center justify-center px-4 py-2 text-xs font-bold text-[#27374D] hover:text-[#526D82] transition-colors cursor-pointer"
              >
                <span>Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#526D82] px-5 py-2 text-xs font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-sm cursor-pointer"
              >
                <span>Register</span>
              </NavLink>
            </div>
          </div>
        </header>

        {/* Konten Landing Page dengan Animasi Transisi Halus */}
        <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 page-transition-enter" key={location.pathname}>
          <Outlet />
        </main>

        <LoginModal />

        {/* Footer Permanen */}
        <footer className="border-t border-[#9DB2BF]/40 bg-white mt-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#526D82]">
            <p className="max-w-xl leading-relaxed">
              Hasil hanyalah indikasi berbasis aturan dan bisa keliru. Seluruh analisis berjalan langsung di
              perangkatmu (on-device) tanpa server atau pelacak data.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink
                to="/keterbatasan"
                className="font-semibold text-[#27374D] underline underline-offset-4 hover:text-[#526D82]"
              >
                Keterbatasan dan Privasi
              </NavLink>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // KONDISI 2: PENGGUNA SUDAH LOGIN (DASHBOARD DENGAN PALET WARNA SESUAI INSTRUKSI)
  // Background: DDE6ED, Font: 27374D, Side bar: 526D82, Kontras: 9DB2BF
  // =========================================================================
  return (
    <div className="flex min-h-screen bg-[#DDE6ED] text-[#27374D] font-sans antialiased selection:bg-[#526D82] selection:text-white">
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#27374D] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#526D82]"
      >
        Lewati ke konten utama
      </a>

      {/* ===================================================================== */}
      {/* SIDEBAR: DESKTOP ONLY (PADA MOBILE SUDAH DIGANTIKAN BOTTOM NAVIGATION) */}
      {/* ===================================================================== */}
      <aside
        id="app-sidebar"
        aria-label="Navigasi sidebar utama"
        className="hidden md:flex md:w-64 md:flex-col justify-between bg-[#526D82] text-white md:sticky md:top-0 md:h-screen border-r border-[#9DB2BF]/30 shrink-0"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header Sidebar Brand: Logo & Title (Posisi Gelap: Logo Putih) */}
          <div className="flex h-16 items-center justify-between border-b border-[#9DB2BF]/30 px-5 shrink-0 bg-[#526D82]">
            <NavLink
              to="/"
              className="flex items-center gap-3 font-bold text-white hover:text-[#DDE6ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg transition-colors"
            >
              <img
                src="/logo-white.png"
                alt="Logo JagaRuang"
                className="h-9 w-9 object-contain shrink-0 drop-shadow-sm"
              />
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base tracking-tight text-white">JagaRuang</span>
                <span className="text-[10px] font-medium text-[#DDE6ED]/80">Guardians of Digital</span>
              </div>
            </NavLink>
          </div>

          {/* Menu Navigasi Utama di Sidebar */}
          <nav className="space-y-1 p-3.5" aria-label="Menu navigasi sidebar">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `group flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? "bg-[#27374D] text-white shadow-sm font-semibold border border-[#9DB2BF]/40"
                        : "text-[#DDE6ED] hover:bg-[#27374D]/30 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive ? "text-[#DDE6ED]" : "text-[#DDE6ED]/80 group-hover:text-white"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight
                        className={`h-3.5 w-3.5 shrink-0 transition-opacity ${
                          isActive ? "opacity-100 text-[#DDE6ED]" : "opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="flex-1 min-h-4" />

          {/* Bagian Footer Sidebar: Logout */}
          <div className="p-3 border-t border-[#9DB2BF]/30 shrink-0">
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-[42px] w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#DDE6ED]/80 hover:bg-red-950/40 hover:text-red-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-[#DDE6ED]/70 group-hover:text-red-300 shrink-0" />
              <span>Keluar dari Sesi</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* AREA KANAN: TOP BAR + DASHBOARD CONTENT (BACKGROUND: DDE6ED, FONT: 27374D) */}
      {/* ===================================================================== */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen bg-[#DDE6ED]">
        {/* Top Header Bar di atas Dashboard */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#9DB2BF]/40 bg-white/95 px-4 sm:px-6 backdrop-blur-md shadow-2xs">
          {/* Mobile Brand / Logo (Hamburger menu dihilangkan, navigasi mobile menggunakan bottom bar) */}
          <div className="flex items-center gap-2 md:hidden">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-[#27374D] text-base">
              <img
                src="/logo-blue.png"
                alt="Logo JagaRuang"
                className="h-7 w-7 object-contain shrink-0"
              />
              <span className="tracking-tight">JagaRuang</span>
            </NavLink>
          </div>

          {/* Search Input Bar & Dropdown Rekomendasi (di Desktop dan Tablet) */}
          <div ref={searchContainerRef} className="relative hidden md:flex flex-1 max-w-md items-center">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Cari modul, istilah, atau modus penipuan..."
                  className="w-full rounded-full border border-[#9DB2BF]/70 bg-[#DDE6ED]/50 px-4 py-2 pl-10 pr-4 text-xs sm:text-sm text-[#27374D] placeholder:text-[#526D82]/70 focus:border-[#526D82] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#526D82]/20 transition-all shadow-inner"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#526D82]" />
              </div>
            </form>

            {/* Dropdown Rekomendasi (Maks. 5 item, selalu refresh/acak saat dibuka kembali) */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-[#9DB2BF]/60 bg-white p-2.5 shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
                {/* Header Dropdown */}
                <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-[#9DB2BF]/30">
                  <span className="text-[11px] font-bold text-[#526D82] uppercase tracking-wider flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5 text-[#526D82]" />
                    {searchQuery.trim() ? "Hasil Pencarian Cepat" : "Rekomendasi Eksplorasi (Maks. 5)"}
                  </span>
                  {!searchQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => setRecommendations(getRandomRecommendations(SEARCH_POOL, 5))}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#526D82] hover:text-[#27374D] bg-[#DDE6ED]/60 hover:bg-[#DDE6ED] px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Acak Lagi</span>
                    </button>
                  )}
                </div>

                {/* Daftar Maksimal 5 Rekomendasi */}
                <div className="space-y-1">
                  {displayedItems.length > 0 ? (
                    displayedItems.map((item) => {
                      const Icon =
                        item.type === "simulator"
                          ? Smartphone
                          : item.type === "modul"
                          ? BookOpen
                          : HelpCircle;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectRecommendation(item)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#DDE6ED]/50 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs ${
                                item.type === "simulator"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : item.type === "modul"
                                  ? "bg-slate-100 text-[#27374D] border-[#9DB2BF]/50"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#27374D] group-hover:text-[#526D82] transition-colors truncate">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-[#526D82] truncate">{item.subtitle}</div>
                            </div>
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold border shrink-0 ${
                              item.type === "simulator"
                                ? "bg-amber-50 text-amber-800 border-amber-300"
                                : item.type === "modul"
                                ? "bg-slate-100 text-[#27374D] border-[#9DB2BF]/60"
                                : "bg-emerald-50 text-emerald-800 border-emerald-300"
                            }`}
                          >
                            {item.badge}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-3 text-center text-xs text-[#526D82]">
                      Tidak ada hasil yang cocok. Tekan Enter untuk cari di Kamus.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Header Controls (Notifikasi, Pesan, User Profile) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Interactive Dropdown */}
            <NotificationDropdown />

            {/* User Profile Pill Dropdown */}
            <UserProfileDropdown />
          </div>
        </header>

        {/* Konten Dashboard Utama (Background: DDE6ED, Font: 27374D) */}
        {/* pb-24 di mobile agar konten tidak tertutup bottom bar navigasi */}
        <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-7 pb-24 md:pb-7 page-transition-enter" key={location.pathname}>
          <Outlet />
        </main>

        <LoginModal />

        {/* Footer Permanen (diberi margin bawah di mobile agar tidak terpotong bottom nav) */}
        <footer className="border-t border-[#9DB2BF]/40 bg-white mt-auto mb-20 md:mb-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#526D82]">
            <p className="max-w-xl leading-relaxed">
              Hasil hanyalah indikasi berbasis aturan dan bisa keliru. Seluruh analisis berjalan langsung di
              perangkatmu (on-device) tanpa server atau pelacak data.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink
                to="/keterbatasan"
                className="font-semibold text-[#27374D] underline underline-offset-4 hover:text-[#526D82]"
              >
                Keterbatasan dan Privasi
              </NavLink>
            </div>
          </div>
        </footer>

        {/* =================================================================== */}
        {/* BOTTOM NAVIGATION BAR MOBILE DENGAN FLOATING BUBBLE & CURVED NOTCH  */}
        {/* 5 ITEM: DASHBOARD, BELAJAR, CEK, LINDUNGI, SANDI                    */}
        {/* =================================================================== */}
        <MobileCurvedBottomNav items={NAV_ITEMS} />
      </div>
    </div>
  );
}
