import { Info } from "lucide-react";
import { DISCLAIMER } from "@jagaruang/contracts";

export interface DisclaimerProps {
  className?: string;
  customText?: string;
}

export function Disclaimer({ className = "", customText }: DisclaimerProps) {
  return (
    <aside
      role="note"
      aria-label="Peringatan dan Batasan Analisis"
      className={`flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 text-xs text-slate-600 leading-relaxed ${className}`}
    >
      <Info className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" aria-hidden="true" />
      <p>{customText || DISCLAIMER}</p>
    </aside>
  );
}

