/**
 * SATU-SATUNYA pintu Frontend ke logika Backend.
 * - VITE_USE_MOCK !== "false"  -> pakai data tiruan (src/mocks)
 * - VITE_USE_MOCK === "false"  -> pakai @jagaruang/core asli
 * Frontend DILARANG mengimpor file di dalam packages/core/src secara langsung;
 * hanya lewat paket "@jagaruang/core".
 */
import * as core from "@jagaruang/core";
import type { AnalysisResult, AnalyzeInput } from "@jagaruang/contracts";
import { mockAnalyze } from "../mocks/analysis";

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export function analyze(input: AnalyzeInput): AnalysisResult {
  return USE_MOCK ? mockAnalyze(input) : core.analyze(input);
}
