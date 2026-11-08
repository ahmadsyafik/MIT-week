import { type Band, BAND_LABEL } from "@jagaruang/contracts";
import { LevelBadge } from "./LevelBadge";

export interface RiskMeterProps {
  band: Band;
  className?: string;
}

const BANDS_ORDER: Band[] = ["belum_terlihat", "waspada", "tinggi", "sangat_tinggi"];

export function RiskMeter({ band, className = "" }: RiskMeterProps) {
  const currentIndex = BANDS_ORDER.indexOf(band);

  const getSegmentStyle = (index: number) => {
    const isCurrent = index === currentIndex;
    const isFilled = index <= currentIndex;

    if (!isFilled) {
      return "bg-slate-200 opacity-40";
    }

    switch (index) {
      case 0:
        return "bg-[#5b7083] text-white"; // Biru-abu
      case 1:
        return "bg-[#b7791f] text-white"; // Kuning
      case 2:
        return "bg-[#c05621] text-white"; // Oranye
      case 3:
        return "bg-[#c53030] text-white"; // Merah
      default:
        return "bg-slate-300";
    }
  };

  return (
    <div className={`space-y-3 ${className}`} aria-label={`Tingkat risiko: ${BAND_LABEL[band]}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Indikasi Risiko
        </span>
        <LevelBadge band={band} />
      </div>

      {/* 4-segment meter bar: TIDAK ADA angka persentase */}
      <div className="grid grid-cols-4 gap-1.5" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={4}>
        {BANDS_ORDER.map((b, idx) => (
          <div
            key={b}
            className={`h-2.5 rounded-full transition-all duration-300 ${getSegmentStyle(idx)}`}
            title={BAND_LABEL[b]}
          />
        ))}
      </div>

      <div className="flex justify-between text-[11px] text-slate-500">
        <span>Belum terlihat tanda bahaya</span>
        <span>Risiko sangat tinggi</span>
      </div>
    </div>
  );
}

