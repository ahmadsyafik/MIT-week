import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

export interface BottomNavItem {
  to: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  end?: boolean;
}

interface MobileCurvedBottomNavProps {
  items: BottomNavItem[];
}

export default function MobileCurvedBottomNav({ items }: MobileCurvedBottomNavProps) {
  const location = useLocation();

  // Tentukan indeks aktif berdasarkan rute saat ini
  const activeIndex = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return 0;
    if (path.startsWith("/belajar")) return 1;
    if (path.startsWith("/cek")) return 2;
    if (path.startsWith("/lindungi")) return 3;
    if (path.startsWith("/sandi")) return 4;
    return 0;
  }, [location.pathname]);

  const activeItem = items[activeIndex] || items[0];
  const ActiveIcon = activeItem.icon;

  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="fixed bottom-0 left-0 right-0 z-40 h-[68px] bg-white border-t border-[#9DB2BF]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden select-none"
    >
      {/* =================================================================== */}
      {/* 1. CURVED NOTCH SCOOP (LEKUKAN MENGALIR MENGIKUTI POSISI AKTIF)     */}
      {/* =================================================================== */}
      <div
        className="absolute top-0 -translate-x-1/2 pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.34,1.35,0.64,1)] z-10"
        style={{ left: `calc(${activeIndex * 20}% + 10%)` }}
      >
        <svg
          width="88"
          height="24"
          viewBox="0 0 88 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Latar belakang cekungan lekukan: warna #DDE6ED selaras dengan latar belakang aplikasi */}
          <path
            d="M0,0 C18,0 24,20 44,20 C64,20 70,0 88,0 Z"
            fill="#DDE6ED"
          />
          {/* Garis batas tepi atas halus yang menyatu dengan border navbar */}
          <path
            d="M0,0 C18,0 24,20 44,20 C64,20 70,0 88,0"
            stroke="#9DB2BF"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      {/* =================================================================== */}
      {/* 2. FLOATING BUBBLE (LINGKARAN GELEMBUNG AKTIF MELAYANG DI ATAS DOK) */}
      {/* =================================================================== */}
      <div
        className="absolute -top-4 -translate-x-1/2 pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.34,1.35,0.64,1)] z-20 flex items-center justify-center"
        style={{ left: `calc(${activeIndex * 20}% + 10%)` }}
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#27374D] via-[#33475D] to-[#526D82] text-white shadow-lg shadow-[#27374D]/35 ring-[3.5px] ring-white">
          {/* Kilau refleksi gelembung (glossy bubble highlight) */}
          <div className="absolute top-1 left-2 h-3 w-5 rounded-full bg-white/20 blur-[0.5px] pointer-events-none" />
          <ActiveIcon key={activeIndex} className="h-5 w-5 text-white animate-in zoom-in-75 duration-200" />
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. 5 ITEM NAVIGASI TOUCH-FRIENDLY (DASHBOARD, BELAJAR, CEK, DLL.)  */}
      {/* =================================================================== */}
      <div className="relative z-10 flex h-full items-center justify-around">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="flex flex-1 flex-col items-center justify-center h-full min-h-[44px] transition-all relative cursor-pointer"
            >
              {/* Ikon tidak aktif (fades out saat item aktif karena naik ke gelembung) */}
              <div
                className={`flex h-6 w-6 items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "opacity-0 -translate-y-3 scale-50 pointer-events-none"
                    : "opacity-100 translate-y-0 text-[#526D82] hover:text-[#27374D]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Teks label modul navigasi */}
              <span
                className={`text-[10px] leading-tight tracking-tight transition-all duration-200 ${
                  isActive
                    ? "text-[#27374D] font-extrabold translate-y-1.5"
                    : "text-[#526D82] font-medium mt-1"
                }`}
              >
                {item.shortLabel}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

