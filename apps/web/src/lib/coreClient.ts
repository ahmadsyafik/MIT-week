/**
 * SATU-SATUNYA pintu Frontend ke logika Backend.
 * - VITE_USE_MOCK !== "false"  -> pakai data tiruan (src/mocks)
 * - VITE_USE_MOCK === "false"  -> pakai @jagaruang/core asli
 * Frontend DILARANG mengimpor file di dalam packages/core/src secara langsung;
 * hanya lewat paket "@jagaruang/core".
 */
import * as core from "@jagaruang/core";
import {
  type AnalysisResult,
  type AnalyzeInput,
  type LocalProgress,
  STORAGE_SCHEMA_VERSION,
} from "@jagaruang/contracts";
import { mockAnalyze } from "../mocks/analysis";

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export function analyze(input: AnalyzeInput): AnalysisResult {
  return USE_MOCK ? mockAnalyze(input) : core.analyze(input);
}

const STORAGE_KEY = "jagaruang_progress";

const mockStorage = {
  load(): LocalProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // Abaikan bila akses localStorage dicegah browser
    }
    return {
      schemaVersion: STORAGE_SCHEMA_VERSION,
      lessonsDone: [],
      actionChecks: {},
      caseAttempts: [],
    };
  },
  save(progress: LocalProgress): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Abaikan bila storage penuh atau dibatasi
    }
  },
  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith("jagaruang")) {
          localStorage.removeItem(key);
        }
      }
    } catch {
      // Abaikan error storage
    }
  },
};

export const storage = {
  load: (): LocalProgress => (USE_MOCK ? mockStorage.load() : core.storage.load()),
  save: (p: LocalProgress): void => (USE_MOCK ? mockStorage.save(p) : core.storage.save(p)),
  clearAll: (): void => (USE_MOCK ? mockStorage.clearAll() : core.storage.clearAll()),
};
