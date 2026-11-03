import { NavLink, Outlet } from "react-router-dom";

const NAV = [
  { to: "/cek", label: "Cek" },
  { to: "/latih", label: "Latih" },
  { to: "/lindungi", label: "Lindungi" },
  { to: "/kamus", label: "Kamus" },
  { to: "/kilat", label: "Kilat 2 Menit" },
  { to: "/sandi", label: "Sandi Keluarga" },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3" aria-label="Navigasi utama">
          <NavLink to="/" className="mr-2 text-lg font-bold">
            JagaRuang
          </NavLink>
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `text-sm ${isActive ? "font-semibold underline" : "text-slate-600"}`}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 text-sm text-slate-600">
          Hasil hanyalah indikasi dan bisa keliru. Semua analisis berjalan di perangkatmu.{" "}
          <NavLink to="/keterbatasan" className="underline">
            Keterbatasan dan Privasi
          </NavLink>
        </div>
      </footer>
    </div>
  );
}
