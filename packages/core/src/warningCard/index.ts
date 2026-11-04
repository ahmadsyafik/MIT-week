import type { AnalysisResult, WarningCard } from "@jagaruang/contracts";
import { loadModus } from "../content/loader";

export function buildWarningCard(result: AnalysisResult): WarningCard {
  let namaModus = "modus tidak dikenali";
  if (result.modus && result.modus.length > 0) {
    const allModus = loadModus();
    const foundModus = allModus.find((m) => m.id === result.modus[0]);
    if (foundModus && foundModus.name) {
      namaModus = foundModus.name;
    }
  }

  const flagsToUse = (result.flags || [])
    .slice(0, 3)
    .map((f) => f.why)
    .filter((why): why is string => typeof why === "string" && why.trim().length > 0);

  const signsText = flagsToUse.length > 0 ? flagsToUse.join("; ") : "Tidak ada detail tanda spesifik";

  const text =
    `⚠️ Peringatan: Pesan/file ini menunjukkan tanda ${namaModus}.\n` +
    `Tanda yang ditemukan: ${signsText}.\n` +
    `Jangan klik, transfer, atau bagikan data pribadi. Verifikasi lewat kanal resmi.`;

  return { text };
}

