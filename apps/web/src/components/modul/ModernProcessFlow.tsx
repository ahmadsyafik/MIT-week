import React from "react";

export interface ProcessFlowStep {
  number?: string | number; // e.g. "01" or 1
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  badgeVariant?: "low" | "medium" | "high" | "critical" | "safe" | "default";
  icon?: React.ReactNode;
  colorScheme?: "cyan" | "indigo" | "purple" | "pink" | "rose" | "emerald" | "amber";
  extraDetail?: React.ReactNode;
}

interface ModernProcessFlowProps {
  steps: ProcessFlowStep[];
  className?: string;
}

const COLOR_PRESETS = {
  cyan: {
    numColor: "text-cyan-500",
    glowShadow: "shadow-[0_12px_26px_-4px_rgba(6,182,212,0.4)]",
    borderColor: "border-cyan-300",
    bgHover: "hover:border-cyan-400",
    iconColor: "text-cyan-600",
    badgeBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
    accentBg: "bg-cyan-50/60",
    strokeColor: "#06B6D4",
  },
  indigo: {
    numColor: "text-indigo-500",
    glowShadow: "shadow-[0_12px_26px_-4px_rgba(99,102,241,0.4)]",
    borderColor: "border-indigo-300",
    bgHover: "hover:border-indigo-400",
    iconColor: "text-indigo-600",
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accentBg: "bg-indigo-50/60",
    strokeColor: "#6366F1",
  },
  purple: {
    numColor: "text-purple-500",
    glowShadow: "shadow-[0_12px_26px_-4px_rgba(168,85,247,0.4)]",
    borderColor: "border-purple-300",
    bgHover: "hover:border-purple-400",
    iconColor: "text-purple-600",
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
    accentBg: "bg-purple-50/60",
    strokeColor: "#8B5CF6",
  },
  pink: {
    numColor: "text-pink-500",
    glowShadow: "shadow-[0_12px_26px_-4px_rgba(236,72,153,0.4)]",
    borderColor: "border-pink-300",
    bgHover: "hover:border-pink-400",
    iconColor: "text-pink-600",
    badgeBg: "bg-pink-50 text-pink-800 border-pink-200",
    accentBg: "bg-pink-50/60",
    strokeColor: "#EC4899",
  },
  rose: {
    numColor: "text-rose-500",
    glowShadow: "shadow-[0_12px_26px_-4px_rgba(244,63,94,0.4)]",
    borderColor: "border-rose-300",
    bgHover: "hover:border-rose-400",
    iconColor: "text-rose-600",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200",
    accentBg: "bg-rose-50/60",
    strokeColor: "#F43F5E",
  },
  emerald: {
    numColor: "text-emerald-500",
    glowShadow: "shadow-[0_12px_26px_-4px_rgba(16,185,129,0.4)]",
    borderColor: "border-emerald-300",
    bgHover: "hover:border-emerald-400",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accentBg: "bg-emerald-50/60",
    strokeColor: "#10B981",
  },
  amber: {
    numColor: "text-amber-500",
    glowShadow: "shadow-[0_12px_26px_-4px_rgba(245,158,11,0.4)]",
    borderColor: "border-amber-300",
    bgHover: "hover:border-amber-400",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    accentBg: "bg-amber-50/60",
    strokeColor: "#F59E0B",
  },
};

const DEFAULT_CYCLE: (keyof typeof COLOR_PRESETS)[] = [
  "cyan",
  "indigo",
  "purple",
  "pink",
  "rose",
];

export function ModernProcessFlow({ steps, className = "" }: ModernProcessFlowProps) {
  const count = steps.length;

  // Grid template classes based on step count
  const gridColsClass =
    count === 3
      ? "md:grid-cols-3"
      : count === 4
      ? "md:grid-cols-4"
      : count === 5
      ? "md:grid-cols-5"
      : "md:grid-cols-4";

  // Calculate SVG polyline coordinates based on column count
  // In an area of 100% width x 100% height (viewBox 0 0 1000 160):
  // Column centers for N items: x = (idx + 0.5) * (1000 / count)
  // Top center y = 62, Bottom center y = 104
  const polylinePoints = steps
    .map((_, idx) => {
      const x = Math.round((idx + 0.5) * (1000 / count));
      const isTop = idx % 2 === 0;
      const y = isTop ? 62 : 106;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ============================================================== */}
      {/* DESKTOP VIEW: STAGGERED ZIGZAG ROADMAP (INSPIRASI PINTEREST)    */}
      {/* ============================================================== */}
      <div className="hidden md:block">
        {/* Top Zone: Zigzag Icon & Number Arena */}
        <div className="relative h-44 mb-3">
          {/* SVG Connecting Track */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
            viewBox="0 0 1000 160"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="modernFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="25%" stopColor="#6366F1" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="75%" stopColor="#EC4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="url(#modernFlowGradient)"
              strokeWidth="5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Staggered Floating Cards Row */}
          <div className={`grid ${gridColsClass} h-full relative z-10 gap-3 sm:gap-4`}>
            {steps.map((st, idx) => {
              const colorKey = st.colorScheme || DEFAULT_CYCLE[idx % DEFAULT_CYCLE.length];
              const preset = COLOR_PRESETS[colorKey] || COLOR_PRESETS.cyan;
              const isTop = idx % 2 === 0;
              const formattedNum =
                typeof st.number !== "undefined"
                  ? String(st.number).padStart(2, "0")
                  : String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center group cursor-default ${
                    isTop ? "justify-start pt-1" : "justify-end pb-1"
                  }`}
                >
                  {/* Number Tag */}
                  <span
                    className={`text-2xl sm:text-3xl font-black italic tracking-tighter mb-1.5 transition-transform duration-300 group-hover:scale-110 select-none ${preset.numColor}`}
                  >
                    {formattedNum}
                  </span>

                  {/* 3D Floating Squircle Card with Ambient Glow */}
                  <div
                    className={`h-16 w-16 sm:h-18 sm:w-18 rounded-2xl sm:rounded-3xl bg-white border-2 ${preset.borderColor} ${preset.glowShadow} flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/80" />
                    <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${preset.iconColor}`}>
                      {st.icon || (
                        <span className="text-base sm:text-lg font-black">{idx + 1}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Zone: Content Descriptions (Cleanly Aligned) */}
        <div className={`grid ${gridColsClass} gap-3 sm:gap-4 items-stretch`}>
          {steps.map((st, idx) => {
            const colorKey = st.colorScheme || DEFAULT_CYCLE[idx % DEFAULT_CYCLE.length];
            const preset = COLOR_PRESETS[colorKey] || COLOR_PRESETS.cyan;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:border-[#526D82] transition-all space-y-3"
              >
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-[#27374D] leading-snug">
                    {st.title}
                  </h3>

                  {st.subtitle && (
                    <p className={`text-[11px] font-semibold ${preset.numColor} leading-tight`}>
                      {st.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-[#526D82] leading-relaxed">
                    {st.description}
                  </p>
                </div>

                {st.extraDetail && (
                  <div className="pt-2 border-t border-slate-100">{st.extraDetail}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE VIEW: VERTICAL STEPPED TIMELINE WITH GLOWING SQUIRCLES */}
      {/* ============================================================== */}
      <div className="md:hidden space-y-4 relative pl-3">
        {/* Continuous Gradient Line */}
        <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-rose-400" />

        {steps.map((st, idx) => {
          const colorKey = st.colorScheme || DEFAULT_CYCLE[idx % DEFAULT_CYCLE.length];
          const preset = COLOR_PRESETS[colorKey] || COLOR_PRESETS.cyan;
          const formattedNum =
            typeof st.number !== "undefined"
              ? String(st.number).padStart(2, "0")
              : String(idx + 1).padStart(2, "0");

          return (
            <div
              key={idx}
              className="relative flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs"
            >
              {/* Floating Squircle on the Track */}
              <div
                className={`h-11 w-11 shrink-0 rounded-2xl bg-white border-2 ${preset.borderColor} ${preset.glowShadow} flex items-center justify-center relative z-10`}
              >
                <div className={`relative z-10 ${preset.iconColor}`}>
                  {st.icon || (
                    <span className="text-xs font-black">{formattedNum}</span>
                  )}
                </div>
              </div>

              {/* Text Body */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#27374D] leading-snug">
                  {st.title}
                </h4>
                {st.subtitle && (
                  <p className={`text-[11px] font-semibold ${preset.numColor}`}>
                    {st.subtitle}
                  </p>
                )}
                <p className="text-xs text-[#526D82] leading-relaxed">
                  {st.description}
                </p>
                {st.extraDetail && <div className="pt-1">{st.extraDetail}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
