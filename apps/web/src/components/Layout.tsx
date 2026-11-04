import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  Search,
  Compass,
  ShieldAlert,
  BookOpen,
  Clock,
  KeyRound,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import NotificationDropdown from "./NotificationDropdown";

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
      navigate(`/kamus?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // =========================================================================
  // KONDISI 1: PENGUNJUNG BELUM LOGIN (LANDING PAGE MODE)
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

        {/* Top Header Sederhana untuk Landing Page */}
        <header className="sticky top-0 z-40 border-b border-[#9DB2BF]/40 bg-white/95 backdrop-blur-md shadow-xs">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <NavLink
              to="/"
              className="flex items-center gap-2.5 font-bold text-[#27374D] text-lg hover:text-[#526D82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526D82] rounded-md transition-colors"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#526D82] text-white font-extrabold text-sm shadow-sm">
                JR
              </span>
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base sm:text-lg tracking-tight text-[#27374D]">
                  JagaRuang
                </span>
                <span className="text-[10px] font-medium text-[#526D82]">Cek. Latih. Lindungi.</span>
              </div>
            </NavLink>

            <div className="flex items-center gap-3">
              <NavLink
                to="/keterbatasan"
                className="hidden sm:inline-block text-xs font-semibold text-[#526D82] hover:text-[#27374D] transition-colors"
              >
                Keterbatasan & Privasi
              </NavLink>
              <button
                type="button"
                onClick={openLoginModal}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#526D82] px-4 py-2 text-xs font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-sm cursor-pointer"
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
        <footer className="border-t border-[#9DB2BF]/40 bg-white mt-auto">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#526D82]">
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
              <span aria-hidden="true" className="text-[#9DB2BF]">·</span>
              <span>MIT-Week 2026</span>
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
          className="fixed inset-0 z-40 bg-[#27374D]/60 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* ===================================================================== */}
      {/* SIDEBAR: WARNA 526D82 SESUAI INSTRUKSI                                */}
      {/* ===================================================================== */}
      <aside
        id="app-sidebar"
        aria-label="Navigasi sidebar utama"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between bg-[#526D82] text-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 shadow-lg md:shadow-none border-r border-[#9DB2BF]/30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header Sidebar Brand: Logo & Title */}
          <div className="flex h-16 items-center justify-between border-b border-[#9DB2BF]/30 px-5 shrink-0 bg-[#526D82]">
            <NavLink
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 font-bold text-white hover:text-[#DDE6ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg transition-colors"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#27374D] text-[#DDE6ED] font-extrabold text-sm shadow-md border border-[#9DB2BF]/40">
                JR
              </span>
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base tracking-tight text-white">JagaRuang</span>
                <span className="text-[10px] font-medium text-[#DDE6ED]/80">Guardians of Digital</span>
              </div>
            </NavLink>

            {/* Tombol Tutup Sidebar di Mobile */}
            <button
              type="button"
              onClick={closeSidebar}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-[#DDE6ED] hover:bg-[#27374D]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Tutup sidebar"
            >
              <X className="h-5 w-5" />
            </button>
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
                  onClick={closeSidebar}
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

          {/* Bagian Footer Sidebar: Keterbatasan & Logout */}
          <div className="p-3 border-t border-[#9DB2BF]/30 space-y-1 shrink-0">
            <NavLink
              to="/keterbatasan"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex min-h-[40px] items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive
                    ? "bg-[#27374D]/40 text-white font-semibold"
                    : "text-[#DDE6ED]/80 hover:bg-[#27374D]/30 hover:text-white"
                }`
              }
            >
              <ShieldCheck className="h-4 w-4 text-[#DDE6ED]/70 shrink-0" />
              <span>Keterbatasan & Privasi</span>
            </NavLink>

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
          {/* Mobile Hamburger + Title */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526D82]"
              aria-label="Buka navigasi sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <NavLink to="/" className="flex items-center gap-2 font-bold text-[#27374D] text-base">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#526D82] text-white font-extrabold text-xs">
                JR
              </span>
              <span>JagaRuang</span>
            </NavLink>
          </div>

          {/* Search Input Bar (di Desktop dan Tablet) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari modul, istilah, atau modus penipuan..."
                className="w-full rounded-full border border-[#9DB2BF]/70 bg-[#DDE6ED]/50 px-4 py-2 pl-10 pr-4 text-xs sm:text-sm text-[#27374D] placeholder:text-[#526D82]/70 focus:border-[#526D82] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#526D82]/20 transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#526D82]" />
            </div>
          </form>

          {/* Right Header Controls (Notifikasi Dropdown, User Profile) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Interactive Dropdown */}
            <NotificationDropdown />

            {/* User Profile Pill Dropdown */}
            <div className="flex items-center gap-2 rounded-full border border-[#9DB2BF]/60 bg-white py-1 pl-1 pr-3 shadow-2xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#526D82] text-white font-bold text-xs shadow-xs">
                {user?.name?.slice(0, 1).toUpperCase() || "U"}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#27374D] max-w-[100px] truncate" title={user?.name}>
                  {user?.name}
                </span>
                <span className="text-[10px] text-[#526D82] leading-none">Anggota On-Device</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#526D82]" />
            </div>
          </div>
        </header>

        {/* Konten Dashboard Utama (Background: DDE6ED, Font: 27374D) */}
        <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-7">
          <Outlet />
        </main>

        <LoginModal />

        {/* Footer Permanen */}
        <footer className="border-t border-[#9DB2BF]/40 bg-white mt-auto">
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
              <span aria-hidden="true" className="text-[#9DB2BF]">·</span>
              <span>MIT-Week 2026</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
