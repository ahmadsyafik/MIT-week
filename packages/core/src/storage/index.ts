import type { LocalProgress } from "@jagaruang/contracts";
import { STORAGE_SCHEMA_VERSION } from "@jagaruang/contracts";

export const PREFIX = "jagaruang:";
export const PROGRESS_KEY = `${PREFIX}progress`;

export const DEFAULT_PROGRESS: LocalProgress = {
  schemaVersion: STORAGE_SCHEMA_VERSION,
  lessonsDone: [],
  actionChecks: {},
  caseAttempts: [],
};

function getDefaultProgress(): LocalProgress {
  return {
    schemaVersion: STORAGE_SCHEMA_VERSION,
    lessonsDone: [],
    actionChecks: {},
    caseAttempts: [],
  };
}

function getStorage(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
    if (typeof localStorage !== "undefined") {
      return localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

export const storage = {
  load(): LocalProgress {
    try {
      const ls = getStorage();
      if (!ls) {
        return getDefaultProgress();
      }
      const raw = ls.getItem(PROGRESS_KEY);
      if (!raw) {
        return getDefaultProgress();
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        console.warn("[storage] Invalid JSON data in localStorage");
        return getDefaultProgress();
      }
      if (parsed.schemaVersion !== STORAGE_SCHEMA_VERSION) {
        return getDefaultProgress();
      }
      return parsed as LocalProgress;
    } catch (err) {
      console.warn("[storage] Failed to load progress from localStorage:", err);
      return getDefaultProgress();
    }
  },

  save(p: LocalProgress): void {
    try {
      const ls = getStorage();
      if (!ls) {
        console.warn("[storage] localStorage not available");
        return;
      }
      ls.setItem(PROGRESS_KEY, JSON.stringify(p));
    } catch (err) {
      console.warn("[storage] Failed to save progress to localStorage:", err);
    }
  },

  clearAll(): void {
    try {
      const ls = getStorage();
      if (!ls) {
        return;
      }
      const keysToRemove: string[] = [];
      for (let i = 0; i < ls.length; i++) {
        const key = ls.key(i);
        if (key && key.startsWith(PREFIX)) {
          keysToRemove.push(key);
        }
      }
      for (const key of keysToRemove) {
        ls.removeItem(key);
      }
    } catch (err) {
      console.warn("[storage] Failed to clear localStorage:", err);
    }
  },
};

