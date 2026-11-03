import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
  Search,
  Compass,
  ShieldAlert,
  BookOpen,
  Clock,
  KeyRound,
  ShieldCheck,
  ChevronRight,
  Bell,
  MessageSquare,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { Button } from "./ui";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/latih", label: "Modul Kasus", icon: Compass },
  { to: "/cek", label: "Cek Pesan & File", icon: Search },
  { to: "/lindungi", label: "Panduan Lindungi", icon: ShieldAlert },
  { to: "/kamus", label: "Kamus Jebakan", icon: BookOpen },
  { to: "/kilat", label: "Kilat 2 Menit", icon: Clock },
  { to: "/sandi", label: "Sandi Keluarga", icon: KeyRound },
];

export default function Layout() {
  const { user, isAuthenticated, logout, openLoginModal } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Tutup drawer sidebar mobile otomatis saat rute berpindah
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    closeSidebar();
    logout();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Arahkan ke Kamus atau Cek dengan query pencarian
      navigate(`/kamus?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // =========================================================================
  // KONDISI 1: PENGUNJUNG BELUM LOGIN (LANDING PAGE MODE TANPA SIDEBAR)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-[#27374D] text-[#DDE6ED] font-sans antialiased selection:bg-[#526D82] selection:text-white">
        {/* Skip to Content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#DDE6ED] focus:px-4 focus:py-2 focus:text-[#27374D] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9DB2BF]"
        >
          Lewati ke konten utama
        </a>

        {/* Top Header Sederhana untuk Landing Page */}
        <header className="sticky top-0 z-40 border-b border-[#526D82]/40 bg-[#27374D]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <NavLink
              to="/"
              className="flex items-center gap-2.5 font-bold text-[#DDE6ED] text-lg hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB2BF] rounded-md transition-colors"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#526D82] text-white font-extrabold text-sm shadow-md border border-[#9DB2BF]/30">
                JR
              </span>
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base sm:text-lg tracking-tight">JagaRuang</span>
                <span className="text-[10px] font-medium text-[#9DB2BF]">Cek. Latih. Lindungi.</span>
              </div>
            </NavLink>

            <div className="flex items-center gap-3">
              <NavLink
                to="/keterbatasan"
                className="hidden sm:inline-block text-xs font-medium text-[#9DB2BF] hover:text-[#DDE6ED] transition-colors"
              >
                Keterbatasan & Privasi
              </NavLink>
              <button
                type="button"
                onClick={openLoginModal}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#DDE6ED] px-4 py-2 text-xs font-semibold text-[#27374D] hover:bg-white active:bg-[#9DB2BF] transition-all shadow-sm cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Masuk</span>
              </button>
            </div>
          </div>
        </header>

        {/* Konten Landing Page */}
        <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          <Outlet />
        </main>

        <LoginModal />

        {/* Footer Permanen */}
        <footer className="border-t border-[#526D82]/40 bg-[#27374D] mt-auto">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#9DB2BF]">
            <p className="max-w-xl leading-relaxed">
              Hasil hanyalah indikasi berbasis aturan dan bisa keliru. Seluruh analisis berjalan langsung di
              perangkatmu (on-device) tanpa server atau pelacak data.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink
                to="/keterbatasan"
                className="font-medium text-[#DDE6ED] underline underline-offset-4 hover:text-white"
              >
                Keterbatasan dan Privasi
              </NavLink>
              <span aria-hidden="true" className="text-[#526D82]">·</span>
              <span>MIT-Week 2026</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // KONDISI 2: PENGGUNA SUDAH LOGIN (DASHBOARD PERSIS SEPERTI GAMBAR REFERENSI)
  // =========================================================================
  return (
    <div className="flex min-h-screen bg-[#27374D] text-[#DDE6ED] font-sans antialiased selection:bg-[#526D82] selection:text-white">
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#DDE6ED] focus:px-4 focus:py-2 focus:text-[#27374D] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9DB2BF]"
      >
        Lewati ke konten utama
      </a>

      {/* Backdrop Overlay untuk Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Tutup menu sidebar"
          onClick={closeSidebar}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") closeSidebar();
          }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* ===================================================================== */}
      {/* ITEM 5: SIDEBAR (PERSIS SEPERTI GAMBAR REFERENSI)                     */}
      {/* ===================================================================== */}
      <aside
        id="app-sidebar"
        aria-label="Navigasi sidebar utama"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-[#526D82]/40 bg-[#27374D] transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header Sidebar Brand: Logo & Title (mirip 'Shikbo Bhai' di gambar) */}
          <div className="flex h-16 items-center justify-between border-b border-[#526D82]/30 px-5 shrink-0">
            <NavLink
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 font-bold text-[#DDE6ED] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB2BF] rounded-lg transition-colors"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#526D82] to-[#27374D] text-[#DDE6ED] font-extrabold text-sm shadow-sm border border-[#9DB2BF]/40">
                JR
              </span>
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base tracking-tight text-[#DDE6ED]">JagaRuang</span>
                <span className="text-[10px] font-medium text-[#9DB2BF]">Guardians of Digital</span>
              </div>
            </NavLink>

            {/* Tombol Tutup Sidebar di Mobile */}
            <button
              type="button"
              onClick={closeSidebar}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-[#9DB2BF] hover:bg-[#526D82]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB2BF]"
              aria-label="Tutup sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Navigasi Utama */}
          <nav className="space-y-1 p-3.5" aria-label="Menu navigasi sidebar">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB2BF] ${
                      isActive
                        ? "bg-[#526D82] text-white shadow-sm font-semibold border border-[#9DB2BF]/30"
                        : "text-[#9DB2BF] hover:bg-[#526D82]/20 hover:text-[#DDE6ED]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive ? "text-[#DDE6ED]" : "text-[#9DB2BF] group-hover:text-[#DDE6ED]"
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

          {/* Spacer fleksibel */}
          <div className="flex-1 min-h-4" />

          {/* Kartu Promo / Tantangan di Bawah Sidebar (seperti 'Upgrade Plus 45% Discount' di gambar) */}
          <div className="p-3.5 shrink-0">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#526D82]/40 via-[#27374D] to-[#526D82]/30 p-4 border border-[#526D82]/50 text-center shadow-sm">
              <div className="mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#526D82]/50 text-yellow-300 border border-[#9DB2BF]/30 shadow-inner">
                <Sparkles className="h-6 w-6 text-amber-300 animate-pulse" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9DB2BF]">Tantangan Kilat</h4>
              <p className="mt-1 text-lg font-black text-[#DDE6ED]">120 Detik</p>
              <p className="mt-0.5 text-[11px] text-[#9DB2BF] leading-tight">
                Asah refleks membedakan pesan biasa vs manipulasi!
              </p>
              <NavLink
                to="/kilat"
                onClick={closeSidebar}
                className="mt-3 block w-full rounded-xl bg-[#DDE6ED] py-2 text-xs font-bold text-[#27374D] hover:bg-white active:scale-98 transition-all shadow-sm"
              >
                Mulai Sekarang
              </NavLink>
            </div>
          </div>

          {/* Bagian Footer Sidebar: Keterbatasan & Logout */}
          <div className="p-3 border-t border-[#526D82]/30 space-y-1 shrink-0">
            <NavLink
              to="/keterbatasan"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex min-h-[40px] items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB2BF] ${
                  isActive
                    ? "bg-[#526D82]/40 text-white font-semibold"
                    : "text-[#9DB2BF] hover:bg-[#526D82]/20 hover:text-[#DDE6ED]"
                }`
              }
            >
              <ShieldCheck className="h-4 w-4 text-[#9DB2BF] shrink-0" />
              <span>Keterbatasan & Privasi</span>
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-[42px] w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#9DB2BF] hover:bg-red-950/40 hover:text-red-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-[#9DB2BF] group-hover:text-red-400 shrink-0" />
              <span>Keluar dari Sesi</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* AREA KANAN: TOP BAR LENGKAP + DASHBOARD MAIN AREA + FOOTER           */}
      {/* ===================================================================== */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen bg-[#27374D]">
        {/* Top Header Bar di atas Dashboard (seperti pada gambar referensi) */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#526D82]/40 bg-[#27374D]/90 px-4 sm:px-6 backdrop-blur-md">
          {/* Mobile Hamburger + Title */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-[#9DB2BF] hover:bg-[#526D82]/20 hover:text-[#DDE6ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB2BF]"
              aria-label="Buka navigasi sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <NavLink to="/" className="flex items-center gap-2 font-bold text-[#DDE6ED] text-base">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#526D82] text-white font-extrabold text-xs">
                JR
              </span>
              <span>JagaRuang</span>
            </NavLink>
          </div>

          {/* Search Input Bar (di Desktop dan Tablet seperti di gambar) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari modul, istilah, atau modus penipuan..."
                className="w-full rounded-full border border-[#526D82]/60 bg-[#27374D]/80 px-4 py-2 pl-10 pr-4 text-xs sm:text-sm text-[#DDE6ED] placeholder:text-[#9DB2BF]/70 focus:border-[#DDE6ED] focus:bg-[#27374D] focus:outline-none focus:ring-2 focus:ring-[#9DB2BF]/30 transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9DB2BF]" />
            </div>
          </form>

          {/* Right Header Controls (Notifikasi, Pesan, User Profile seperti di gambar referensi) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Bell */}
            <button
              type="button"
              aria-label="Notifikasi modul baru"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#526D82]/50 bg-[#27374D] text-[#9DB2BF] hover:bg-[#526D82]/30 hover:text-[#DDE6ED] transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#27374D]" />
            </button>

            {/* Message / Guide Bookmark */}
            <NavLink
              to="/lindungi"
              aria-label="Panduan Lindungi Cepat"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#526D82]/50 bg-[#27374D] text-[#9DB2BF] hover:bg-[#526D82]/30 hover:text-[#DDE6ED] transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
            </NavLink>

            {/* User Profile Pill Dropdown (seperti 'Muntasir v' di gambar) */}
            <div className="flex items-center gap-2 rounded-full border border-[#526D82]/60 bg-[#526D82]/20 py-1 pl-1 pr-3 shadow-xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#526D82] text-white font-bold text-xs border border-[#9DB2BF]/40">
                {user?.name?.slice(0, 1).toUpperCase() || "U"}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#DDE6ED] max-w-[100px] truncate" title={user?.name}>
                  {user?.name}
                </span>
                <span className="text-[10px] text-[#9DB2BF] leading-none">Anggota On-Device</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#9DB2BF]" />
            </div>
          </div>
        </header>

        {/* Konten Dashboard Utama */}
        <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-7">
          <Outlet />
        </main>

        <LoginModal />

        {/* Footer Permanen */}
        <footer className="border-t border-[#526D82]/30 bg-[#27374D] mt-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#9DB2BF]">
            <p className="max-w-xl leading-relaxed">
              Hasil hanyalah indikasi berbasis aturan dan bisa keliru. Seluruh analisis berjalan langsung di
              perangkatmu (on-device) tanpa server atau pelacak data.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink
                to="/keterbatasan"
                className="font-medium text-[#DDE6ED] underline underline-offset-4 hover:text-white"
              >
                Keterbatasan dan Privasi
              </NavLink>
              <span aria-hidden="true" className="text-[#526D82]">·</span>
              <span>MIT-Week 2026</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
