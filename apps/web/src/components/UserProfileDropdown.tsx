import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  LogOut,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Tutup dropdown bila klik di luar atau tekan tombol Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/");
  };

  const initial = user?.name ? user.name.slice(0, 1).toUpperCase() : "T";
  const displayName = user?.name || "Tamu";

  return (
    <div ref={dropdownRef} className="relative">
      {/* Tombol Profil Pill Interaktif */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu profil pengguna"
        className="flex items-center gap-2 rounded-full border border-[#9DB2BF]/60 bg-white py-1 pl-1 pr-3 shadow-2xs hover:border-[#526D82] hover:bg-slate-50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526D82]/40"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#526D82] text-white font-bold text-xs shadow-xs shrink-0">
          {initial}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span
            className="text-xs font-bold text-[#27374D] max-w-[110px] truncate leading-tight"
            title={displayName}
          >
            {displayName}
          </span>
          <span className="text-[10px] text-[#526D82] leading-none">
            Anggota On-Device
          </span>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#526D82] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu Dropdown Profil */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Menu Opsi Akun"
          className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-[#9DB2BF]/50 bg-white p-2.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Header Profil Singkat di Dalam Dropdown */}
          <div className="flex items-center gap-3 p-2 border-b border-slate-100 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#27374D] text-white font-black text-sm shadow-xs shrink-0">
              {initial}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#27374D] truncate">
                {displayName}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-[#526D82] font-medium">
                  Sesi Aktif di Perangkat
                </span>
              </div>
            </div>
          </div>

          {/* Opsi Menu Tambahan */}
          <div className="py-1 space-y-0.5">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#27374D] hover:bg-slate-50 transition-colors"
            >
              <span>Halaman Depan (Landing)</span>
              <ExternalLink className="h-3 w-3 text-[#526D82]" />
            </NavLink>
            <NavLink
              to="/keterbatasan"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#27374D] hover:bg-slate-50 transition-colors"
            >
              <span>Keterbatasan &amp; Privasi</span>
              <ExternalLink className="h-3 w-3 text-[#526D82]" />
            </NavLink>
          </div>

          {/* Tombol Logout / Keluar Sesi */}
          <div className="border-t border-slate-100 pt-1 mt-1">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer text-left"
            >
              <LogOut className="h-4 w-4 shrink-0 text-rose-500" />
              <span>Keluar dari Sesi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

