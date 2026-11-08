import { useState, useEffect, useRef, useMemo } from "react";
import { NavLink, Outlet, useLocation, useNavigate, Link } from "react-router-dom";
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
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NotificationDropdown from "./NotificationDropdown";
import UserProfileDropdown from "./UserProfileDropdown";
import MobileCurvedBottomNav from "./MobileCurvedBottomNav";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", shortLabel: "Dashboard", icon: LayoutDashboard },
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
  const { user, isAuthenticated, logout } = useAuth();
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

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
    setRecommendations(getRandomRecommendations(SEARCH_POOL, 5));
  };

  const handleSelectRecommendation = (item: SearchItem) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(item.url);
  };

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
      setSearchQuery("");
    }
  };

  // KONDISI 1: LANDING PAGE PUBLIK (Rute /)
  const isLandingPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  if (isLandingPage) {
    return (
      <div className="flex min-h-screen flex-col bg-[#DDE6ED] text-[#27374D] font-sans antialiased">
        <header className="sticky top-0 z-30 border-b border-[#9DB2BF]/40 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-[#27374D]">
              <img src="/logo-blue.png" alt="Logo JagaRuang" className="h-9 w-9 object-contain" />
              <span className="text-lg font-black tracking-tight">JagaRuang.</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#526D82]">
              <a href="#beranda" className="hover:text-[#27374D] transition-colors">Home</a>
              <a href="#tiga-pilar" className="hover:text-[#27374D] transition-colors">Tiga Pilar</a>
              <a href="#modul" className="hover:text-[#27374D] transition-colors">Kasus & Modul</a>
              <a href="#testimoni" className="hover:text-[#27374D] transition-colors">Cerita Rekan</a>
              <a href="#faq" className="hover:text-[#27374D] transition-colors">FAQ</a>
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="hidden sm:inline text-xs font-semibold text-[#526D82]">
                    Halo, <strong className="text-[#27374D]">{user?.name || "Kawan"}</strong>
                  </span>
                  <NavLink
                    to="/dashboard"
                    className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-[#526D82] px-5 py-2 text-xs font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-sm"
                  >
                    <span>Buka Dashboard</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </NavLink>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </header>

        <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 page-transition-enter" key={location.pathname}>
          <Outlet />
        </main>

        <footer className="border-t border-[#9DB2BF]/40 bg-white mt-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#526D82]">
            <p className="max-w-xl leading-relaxed">
              Hasil hanyalah indikasi berbasis aturan dan bisa keliru. Seluruh analisis berjalan langsung di
              perangkatmu (on-device) tanpa server atau pelacak data.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink to="/keterbatasan" className="font-semibold text-[#27374D] underline underline-offset-4 hover:text-[#526D82]">
                Keterbatasan dan Privasi
              </NavLink>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // KONDISI 2: DASHBOARD PENGGUNA TERPROTEKSI
  return (
    <div className="flex min-h-screen bg-[#DDE6ED] text-[#27374D] font-sans antialiased selection:bg-[#526D82] selection:text-white">
      <aside
        id="app-sidebar"
        aria-label="Navigasi sidebar utama"
        className="hidden md:flex md:w-64 md:flex-col justify-between bg-[#526D82] text-white md:sticky md:top-0 md:h-screen border-r border-[#9DB2BF]/30 shrink-0"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex h-16 items-center justify-between border-b border-[#9DB2BF]/30 px-5 shrink-0 bg-[#526D82]">
            <NavLink to="/" className="flex items-center gap-3 font-bold text-white hover:text-[#DDE6ED] rounded-lg transition-colors">
              <img src="/logo-white.png" alt="Logo JagaRuang" className="h-9 w-9 object-contain drop-shadow-sm" />
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base tracking-tight text-white">JagaRuang</span>
                <span className="text-[10px] font-medium text-[#DDE6ED]/80">Guardians of Digital</span>
              </div>
            </NavLink>
          </div>

          <nav className="space-y-1 p-3.5" aria-label="Menu navigasi sidebar">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#27374D] text-white shadow-sm font-semibold border border-[#9DB2BF]/40"
                        : "text-[#DDE6ED] hover:bg-[#27374D]/30 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#DDE6ED]" : "text-[#DDE6ED]/80 group-hover:text-white"}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isActive ? "opacity-100 text-[#DDE6ED]" : "opacity-0 group-hover:opacity-60"}`} />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex-1 min-h-4" />

          <div className="p-3 border-t border-[#9DB2BF]/30 shrink-0">
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-[42px] w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#DDE6ED]/80 hover:bg-red-950/40 hover:text-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-[#DDE6ED]/70 shrink-0" />
              <span>Keluar dari Sesi</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#9DB2BF]/40 bg-white/95 px-4 sm:px-6 lg:px-7 backdrop-blur-md">
          <div className="flex items-center gap-3 md:hidden">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-[#27374D]">
              <img src="/logo-blue.png" alt="Logo JagaRuang" className="h-8 w-8 object-contain" />
              <span className="text-base font-black tracking-tight">JagaRuang</span>
            </NavLink>
          </div>

          <div ref={searchContainerRef} className="relative hidden sm:block w-72 md:w-80 lg:w-96">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-[#526D82] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Cari simulator, modul, istilah..."
                  className="h-10 w-full rounded-full border border-[#9DB2BF]/50 bg-[#DDE6ED]/40 pl-10 pr-4 text-xs font-medium text-[#27374D] placeholder:text-[#526D82]/70 focus:border-[#526D82] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#526D82]/20 transition-all"
                />
              </div>
            </form>

            {isSearchOpen && (
              <div className="absolute top-12 left-0 right-0 z-50 rounded-2xl border border-[#9DB2BF]/60 bg-white shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="p-2 border-b border-[#9DB2BF]/20 bg-[#DDE6ED]/20 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#526D82] uppercase tracking-wider">
                    {searchQuery.trim() ? "Hasil Pencarian Cepat" : "Rekomendasi Coba Fitur"}
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#9DB2BF]/15">
                  {displayedItems.length > 0 ? (
                    displayedItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectRecommendation(item)}
                        className="w-full text-left p-3 hover:bg-[#DDE6ED]/40 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#27374D] truncate">{item.title}</p>
                          <p className="text-[10px] text-[#526D82] truncate">{item.subtitle}</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DDE6ED] text-[#27374D] border border-[#9DB2BF]/40">
                          {item.badge}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-[#526D82]">
                      Tidak ada hasil yang cocok. Tekan Enter untuk cari di Kamus.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <NotificationDropdown />
            <UserProfileDropdown />
          </div>
        </header>

        <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-7 pb-24 md:pb-7 page-transition-enter" key={location.pathname}>
          <Outlet />
        </main>

        <footer className="border-t border-[#9DB2BF]/40 bg-white mt-auto mb-20 md:mb-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#526D82]">
            <p className="max-w-xl leading-relaxed">
              JagaRuang · Platform perlindungan dan edukasi siber masyarakat Indonesia.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink to="/keterbatasan" className="font-semibold text-[#27374D] underline underline-offset-4 hover:text-[#526D82]">
                Keterbatasan dan Privasi
              </NavLink>
            </div>
          </div>
        </footer>
      </div>

      <MobileCurvedBottomNav items={NAV_ITEMS} />
    </div>
  );
}
