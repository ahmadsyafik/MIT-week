import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Shield, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { to: "/cek", label: "Cek" },
  { to: "/latih", label: "Latih" },
  { to: "/lindungi", label: "Lindungi" },
  { to: "/kamus", label: "Kamus Jebakan" },
  { to: "/kilat", label: "Kilat 2 Menit" },
  { to: "/sandi", label: "Sandi Keluarga" },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Skip to Content (Aksesibilitas Keyboard) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
      >
        Lewati ke konten utama
      </a>

      {/* Header & Navigasi */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 font-bold text-slate-900 text-lg hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-extrabold text-sm">
              JR
            </span>
            <div className="flex flex-col">
              <span className="leading-tight">JagaRuang</span>
              <span className="text-[10px] font-normal text-slate-500">Cek. Latih. Lindungi.</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama desktop">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    isActive
                      ? "bg-slate-100 text-slate-950 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button (min-h 44px untuk touch target nyaman) */}
          <button
            type="button"
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 shadow-lg space-y-1"
            aria-label="Navigasi utama mobile"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center min-h-[44px] rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Konten Utama */}
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>

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
