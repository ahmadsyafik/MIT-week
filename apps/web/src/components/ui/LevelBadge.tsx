import { Info, AlertTriangle, OctagonAlert } from "lucide-react";
import { type Band, BAND_LABEL } from "@jagaruang/contracts";

export interface LevelBadgeProps {
  band: Band;
  className?: string;
  showIcon?: boolean;
}

export function LevelBadge({ band, className = "", showIcon = true }: LevelBadgeProps) {
  const config = {
    belum_terlihat: {
      label: BAND_LABEL.belum_terlihat,
      // Biru-abu sesuai DESIGN_SYSTEM.md (TIDAK ADA hijau, centang, atau perisai)
      styles: "bg-slate-100 text-[#5b7083] border-[#5b7083]/30",
      icon: Info,
    },
    waspada: {
      label: BAND_LABEL.waspada,
      // Kuning
      styles: "bg-amber-50 text-[#b7791f] border-[#b7791f]/30",
      icon: AlertTriangle,
    },
    tinggi: {
      label: BAND_LABEL.tinggi,
      // Oranye
      styles: "bg-orange-50 text-[#c05621] border-[#c05621]/30",
      icon: AlertTriangle,
    },
    sangat_tinggi: {
      label: BAND_LABEL.sangat_tinggi,
      // Merah
      styles: "bg-red-50 text-[#c53030] border-[#c53030]/30",
      icon: OctagonAlert,
    },
  }[band];

  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${config.styles} ${className}`}
      role="status"
    >
      {showIcon && <IconComponent className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      <span>{config.label}</span>
    </span>
  );
}

