import { CheckCircle2, HelpCircle } from "lucide-react";
import type { RedFlag, Level } from "@jagaruang/contracts";

export interface FlagListProps {
  flags: RedFlag[];
  className?: string;
}

const LEVEL_STYLE: Record<Level, string> = {
  L1: "bg-slate-100 text-slate-700 border-slate-200",
  L2: "bg-amber-50 text-amber-800 border-amber-200",
  L3: "bg-orange-50 text-orange-800 border-orange-200",
  L4: "bg-red-50 text-red-800 border-red-200",
  L5: "bg-red-100 text-red-900 border-red-300 font-bold",
};

export function FlagList({ flags, className = "" }: FlagListProps) {
  if (flags.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center text-sm text-slate-500">
        Tidak ditemukan tanda mencurigakan dari aturan yang ada saat ini.
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-sm font-semibold text-slate-900">
        Tanda Peringatan Ditemukan ({flags.length})
      </h4>
      <div className="space-y-2.5">
        {flags.map((flag, idx) => (
          <div
            key={flag.ruleId || idx}
            className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs transition-colors hover:border-slate-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span
                className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold border ${
                  LEVEL_STYLE[flag.level] || "bg-slate-100 text-slate-800"
                }`}
              >
                Tingkat {flag.level}
              </span>
              <span className="text-xs text-slate-500 capitalize">
                Kategori: {flag.category.replace(/_/g, " ")}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="font-medium text-slate-900">Kenapa mencurigakan: </strong>
                  <span className="text-slate-700">{flag.why}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded bg-slate-50 p-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-600 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="font-medium text-slate-900">Cara verifikasi: </strong>
                  <span className="text-slate-700">{flag.verify}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

