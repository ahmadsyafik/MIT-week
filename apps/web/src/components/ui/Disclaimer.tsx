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
      className={`flex items-start gap-2.5 rounded-2xl border border-[#9DB2BF]/50 bg-white p-4 text-xs text-[#526D82] leading-relaxed shadow-xs ${className}`}
    >
      <Info className="h-4 w-4 shrink-0 text-[#526D82] mt-0.5" aria-hidden="true" />
      <p className="leading-relaxed">{customText || DISCLAIMER}</p>
    </aside>
  );
}
