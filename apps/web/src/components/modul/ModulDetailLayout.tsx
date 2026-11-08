import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "../ui";
import { addNotification } from "../../lib/notificationService";

export interface ModulSectionItem {
  id: string;
  label: string;
}

export interface NextModuleRecommendation {
  id: string;
  moduleNumber: number;
  title: string;
  desc: string;
}

export interface ModulDetailLayoutProps {
  moduleId: string;
  title: string;
  category?: string;
  terakhirDiperbaruiLabel?: string;
  readingTime: string;
  summary: string;
  isRead: boolean;
  onBack: () => void;
  onToggleRead: () => void;
  onNavigateTab: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
  onSelectModule?: (moduleId: string) => void;
  sections: ModulSectionItem[];
  nextModule?: NextModuleRecommendation;
  onFinishAndRecord?: () => void;
  children: React.ReactNode;
}

export function ModulDetailLayout({
  moduleId,
  title,
  category,
  terakhirDiperbaruiLabel = "November 2026",
  readingTime,
  summary,
  isRead,
  onBack,
  onToggleRead,
  onNavigateTab,
  onSelectModule,
  sections,
  nextModule,
  onFinishAndRecord,
  children,
}: ModulDetailLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || "");

  // Scroll listener untuk update progress bar & deteksi active section di viewport
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(currentProgress);
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSectionId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentSectionIndex = useMemo(() => {
    const idx = sections.findIndex((s) => s.id === activeSectionId);
    return idx >= 0 ? idx + 1 : 1;
  }, [sections, activeSectionId]);

  const handleDefaultFinishAndRecord = () => {
    if (onFinishAndRecord) {
      onFinishAndRecord();
    } else {
      if (!isRead) onToggleRead();
      addNotification({
        title: `Modul Selesai: ${title}`,
        message: `Pemahaman konsep '${title}' berhasil dicatat di profil belajarmu.`,
        type: "sukses",
        link: "/belajar?tab=simulator",
      });
    }
  };

  const handleGoToNextModule = () => {
    if (!nextModule) return;
    if (onSelectModule) {
      onSelectModule(nextModule.id);
    } else {
      window.location.href = `/belajar?tab=modul&module=${nextModule.id}`;
    }
  };

  return (
    <div className="relative w-full">
      {/* ===================================================================== */}
      {/* 1. STICKY TOP READING PROGRESS BAR (FULL-WIDTH SEAMLESS LIKE TOP NAVBAR) */}
      {/* ===================================================================== */}
      <div className="sticky top-16 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#9DB2BF]/40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="h-4 w-4 text-[#526D82] shrink-0" />
            <span className="text-xs font-bold text-[#27374D] truncate">
              {title}
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#526D82]">
              • Bagian {currentSectionIndex} dari {sections.length}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-black text-[#27374D] min-w-[36px] text-right">
              {Math.round(scrollProgress)}%
            </span>
            <div className="w-20 sm:w-28 h-2 bg-[#DDE6ED] rounded-full overflow-hidden border border-[#9DB2BF]/40">
              <div
                className="h-full bg-gradient-to-r from-[#526D82] to-[#27374D] transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-7 space-y-6">
        {/* ===================================================================== */}
        {/* 2. TOP BAR NAVIGASI                                                  */}
        {/* ===================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#9DB2BF]/40 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526D82] hover:text-[#27374D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Modul Pembelajaran</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#526D82] flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime}
          </span>
          <button
            type="button"
            onClick={onToggleRead}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isRead
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200"
            }`}
          >
            {isRead ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Selesai Dipelajari</span>
              </>
            ) : (
              <span>Tandai Selesai</span>
            )}
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. DUA KOLOM: KONTEN UTAMA (KIRI) + TABLE OF CONTENTS (KANAN)          */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* KOLOM KIRI (KONTEN MODUL UTAMA) */}
        <article className="lg:col-span-8 xl:col-span-9 space-y-10 min-w-0">
          {/* Header Modul Utama */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#27374D] leading-tight tracking-tight">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#526D82] leading-relaxed bg-[#DDE6ED]/30 p-4 sm:p-5 rounded-2xl border border-[#9DB2BF]/40 font-normal">
              {summary}
            </p>
          </div>

          {/* Render Sections (Children) */}
          {children}

          {/* ================================================================= */}
          {/* AKSI FOOTER TERARAH & KARTU MODUL BERIKUTNYA                     */}
          {/* ================================================================= */}
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-bold text-[#526D82] hover:text-[#27374D] flex items-center gap-1.5 cursor-pointer order-2 sm:order-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Daftar Modul</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleDefaultFinishAndRecord}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Selesai &amp; Catat Progres
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigateTab("simulator")}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  <span>Uji Kasus di Simulator</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* Kartu Modul Rekomendasi Berikutnya */}
            {nextModule && (
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#526D82]">
                    Langkah Pembelajaran Selanjutnya
                  </span>
                  <h4 className="text-sm font-bold text-[#27374D]">
                    Modul {nextModule.moduleNumber} · {nextModule.title}
                  </h4>
                  <p className="text-xs text-[#526D82]">
                    {nextModule.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGoToNextModule}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#27374D] text-white text-xs font-bold hover:bg-[#1e2a3a] transition-all shrink-0 cursor-pointer shadow-xs"
                >
                  <span>Buka Modul {nextModule.moduleNumber}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </article>

        {/* =================================================================== */}
        {/* KOLOM KANAN: STICKY MINI TABLE OF CONTENTS (DESKTOP ONLY)          */}
        {/* =================================================================== */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 space-y-4">
          <div className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <BookOpen className="h-4 w-4 text-[#526D82]" />
              <h3 className="text-xs font-bold text-[#27374D] uppercase tracking-wider">
                Daftar Isi Modul
              </h3>
            </div>

            <nav className="space-y-1 text-xs">
              {sections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all font-medium cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-[#27374D] text-white font-bold shadow-xs"
                        : "text-[#526D82] hover:bg-slate-100 hover:text-[#27374D]"
                    }`}
                  >
                    <span className="truncate">{sec.label}</span>
                    {isActive && <Check className="h-3.5 w-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </nav>

            {/* Quick Action Button di Sidebar */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => onNavigateTab("simulator")}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#27374D] text-xs font-bold text-center transition-colors block cursor-pointer"
              >
                Uji Kasus di Simulator →
              </button>
            </div>
          </div>
        </aside>
      </div>
      </div>
    </div>
  );
}

