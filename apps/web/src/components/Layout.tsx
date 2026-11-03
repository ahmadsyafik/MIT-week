import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Home,
  Search,
  Compass,
  ShieldAlert,
  BookOpen,
  Clock,
  KeyRound,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { Button } from "./ui";

const NAV_ITEMS = [
  { to: "/", label: "Beranda", icon: Home, end: true },
  { to: "/cek", label: "Cek Pesan & File", icon: Search },
  { to: "/latih", label: "Latih Kasus", icon: Compass },
  { to: "/lindungi", label: "Lindungi", icon: ShieldAlert },
  { to: "/kamus", label: "Kamus Jebakan", icon: BookOpen },
  { to: "/kilat", label: "Kilat 2 Menit", icon: Clock },
  { to: "/sandi", label: "Sandi Keluarga", icon: KeyRound },
];

export default function Layout() {
  const { user, isAuthenticated, logout, openLoginModal } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Tutup drawer sidebar mobile otomatis saat rute berpindah
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    closeSidebar();
    logout();
  };

  // =========================================================================
  // KONDISI 1: PENGUNJUNG BELUM LOGIN (LANDING PAGE MODE TANPA SIDEBAR / NAVBAR)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        {/* Skip to Content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
        >
          Lewati ke konten utama
        </a>

        {/* Top Header Sederhana untuk Landing Page */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
            <NavLink
              to="/"
              className="flex items-center gap-2.5 font-bold text-slate-900 text-lg hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-extrabold text-sm shadow-xs">
                JR
              </span>
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base sm:text-lg">JagaRuang</span>
                <span className="text-[10px] font-normal text-slate-500">Cek. Latih. Lindungi.</span>
              </div>
            </NavLink>

            <div className="flex items-center gap-3">
              <NavLink
                to="/keterbatasan"
                className="hidden sm:inline-block text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Keterbatasan & Privasi
              </NavLink>
              <Button
                variant="primary"
                size="sm"
                onClick={openLoginModal}
                className="text-xs"
              >
                <LogIn className="h-3.5 w-3.5 mr-1.5" />
                <span>Masuk</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Konten Landing Page */}
        <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>

        <LoginModal />

        {/* Footer Permanen */}
        <footer className="border-t border-slate-200 bg-white mt-auto">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
            <p className="max-w-xl leading-relaxed">
              Hasil hanyalah indikasi berbasis aturan dan bisa keliru. Seluruh analisis berjalan langsung di
              perangkatmu (on-device) tanpa server atau pelacak data.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink
                to="/keterbatasan"
                className="font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
              >
                Keterbatasan dan Privasi
              </NavLink>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>MIT-Week 2026</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // KONDISI 2: PENGGUNA SUDAH LOGIN (DASHBOARD MODE DENGAN SIDEBAR LENGKAP)
  // =========================================================================
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
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
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* ===================================================================== */}
      {/* KOMPONEN SIDEBAR (DESKTOP: FIXED/STICKY, MOBILE: OFF-CANVAS DRAWER)   */}
      {/* ===================================================================== */}
      <aside
        id="app-sidebar"
        aria-label="Navigasi sidebar utama"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none"
        }`}
      >
        {/* Bagian Atas Sidebar: Logo & Profil */}
        <div className="flex flex-col">
          {/* Header Sidebar Brand */}
          <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
            <NavLink
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-2.5 font-bold text-slate-900 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-extrabold text-sm shadow-xs">
                JR
              </span>
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold text-base">JagaRuang</span>
                <span className="text-[10px] font-normal text-slate-500">Cek. Latih. Lindungi.</span>
              </div>
            </NavLink>

            {/* Tombol Tutup Sidebar di Mobile */}
            <button
              type="button"
              onClick={closeSidebar}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-label="Tutup sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Kartu Profil Pengguna */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-2.5 border border-slate-200/80">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-sm">
                <User className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-900" title={user?.name}>
                  {user?.name}
                </p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>Sesi On-Device</span>
                </p>
              </div>
            </div>
          </div>

          {/* Daftar Menu Navigasi Sidebar */}
          <nav className="space-y-1 p-3" aria-label="Menu navigasi sidebar">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight
                        className={`h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity ${
                          isActive ? "opacity-100 text-white" : "group-hover:opacity-60"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bagian Bawah Sidebar: Keterbatasan & Tombol Logout */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <NavLink
            to="/keterbatasan"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex min-h-[40px] items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                isActive
                  ? "bg-slate-100 text-slate-950 font-semibold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`
            }
          >
            <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Keterbatasan & Privasi</span>
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="flex min-h-[42px] w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 cursor-pointer"
          >
            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-600 shrink-0" />
            <span>Keluar dari Sesi</span>
          </button>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* AREA KANAN: TOP BAR MOBILE + MAIN CONTENT + FOOTER                   */}
      {/* ===================================================================== */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen">
        {/* Mobile Top Bar (Hanya tampil pada layar < md) */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xs md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            aria-label="Buka navigasi sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <NavLink to="/" className="flex items-center gap-2 font-bold text-slate-900 text-base">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white font-extrabold text-xs">
              JR
            </span>
            <span className="leading-tight">JagaRuang</span>
          </NavLink>

          {/* User Avatar Mini di Mobile Top Bar */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold"
            title={user?.name}
          >
            {user?.name?.slice(0, 1).toUpperCase() || "U"}
          </div>
        </header>

        {/* Konten Utama Halaman */}
        <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <LoginModal />

        {/* Footer Permanen */}
        <footer className="border-t border-slate-200 bg-white mt-auto">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
            <p className="max-w-xl leading-relaxed">
              Hasil hanyalah indikasi berbasis aturan dan bisa keliru. Seluruh analisis berjalan langsung di
              perangkatmu (on-device) tanpa server atau pelacak data.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <NavLink
                to="/keterbatasan"
                className="font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
              >
                Keterbatasan dan Privasi
              </NavLink>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>MIT-Week 2026</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
