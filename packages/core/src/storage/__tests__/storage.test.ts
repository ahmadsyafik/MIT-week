import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { storage, DEFAULT_PROGRESS, PROGRESS_KEY } from "../index";
import { STORAGE_SCHEMA_VERSION, type LocalProgress } from "@jagaruang/contracts";

function createMockLocalStorage(): Storage {
  let store: Record<string, string> = {};
  return {
    getItem(key: string): string | null {
      return store[key] ?? null;
    },
    setItem(key: string, value: string): void {
      store[key] = String(value);
    },
    removeItem(key: string): void {
      delete store[key];
    },
    clear(): void {
      store = {};
    },
    key(index: number): string | null {
      return Object.keys(store)[index] ?? null;
    },
    get length(): number {
      return Object.keys(store).length;
    },
  };
}

describe("BE-1.3 Storage", () => {
  let mockStorage: Storage;
  const originalLocalStorage = (globalThis as unknown as { localStorage?: Storage }).localStorage;

  beforeEach(() => {
    mockStorage = createMockLocalStorage();
    Object.defineProperty(globalThis, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it("save() + load() roundtrip", () => {
    const customProgress: LocalProgress = {
      schemaVersion: STORAGE_SCHEMA_VERSION,
      lessonsDone: ["lesson_1", "lesson_2"],
      actionChecks: {
        guide_belum_klik: ["s1", "s2"],
      },
      caseAttempts: [
        {
          caseId: "k1",
          score: 90,
          rank: "Guardian",
          flagCode: "TRUST{k1_pass}",
          finishedAt: "2026-11-03T10:00:00Z",
        },
      ],
      triageBest: {
        score: 10,
        total: 10,
        finishedAt: "2026-11-03T11:00:00Z",
      },
    };

    storage.save(customProgress);
    const loaded = storage.load();

    expect(loaded).toEqual(customProgress);
  });

  it("returns default progress when localStorage is empty", () => {
    const loaded = storage.load();
    expect(loaded).toEqual(DEFAULT_PROGRESS);
  });

  it("clearAll() hanya hapus kunci berawalan 'jagaruang:'", () => {
    mockStorage.setItem("jagaruang:progress", "some-data");
    mockStorage.setItem("jagaruang:temp", "other-data");
    mockStorage.setItem("user_theme", "dark");
    mockStorage.setItem("analytics_id", "xyz123");

    storage.clearAll();

    expect(mockStorage.getItem("jagaruang:progress")).toBeNull();
    expect(mockStorage.getItem("jagaruang:temp")).toBeNull();
    expect(mockStorage.getItem("user_theme")).toBe("dark");
    expect(mockStorage.getItem("analytics_id")).toBe("xyz123");
  });

  it("localStorage mati (mock localStorage throws) → load() return default, tidak throw", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Mock getItem throwing an error
    vi.spyOn(mockStorage, "getItem").mockImplementation(() => {
      throw new Error("SecurityError: localStorage is disabled");
    });

    let loaded: LocalProgress | undefined;
    expect(() => {
      loaded = storage.load();
    }).not.toThrow();

    expect(loaded).toEqual(DEFAULT_PROGRESS);
    expect(warnSpy).toHaveBeenCalled();
  });

  it("localStorage mati (mock localStorage throws) → save() tidak throw", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    vi.spyOn(mockStorage, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    expect(() => {
      storage.save(DEFAULT_PROGRESS);
    }).not.toThrow();

    expect(warnSpy).toHaveBeenCalled();
  });

  it("localStorage mati (mock localStorage throws) → clearAll() tidak throw", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    vi.spyOn(mockStorage, "removeItem").mockImplementation(() => {
      throw new Error("StorageError");
    });
    mockStorage.setItem("jagaruang:progress", "test");

    expect(() => {
      storage.clearAll();
    }).not.toThrow();
  });

  it("invalid JSON in localStorage → return default, console.warn, tidak throw", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    mockStorage.setItem(PROGRESS_KEY, "{ broken-json-syntax }");

    let loaded: LocalProgress | undefined;
    expect(() => {
      loaded = storage.load();
    }).not.toThrow();

    expect(loaded).toEqual(DEFAULT_PROGRESS);
    expect(warnSpy).toHaveBeenCalled();
  });

  it("different schemaVersion → return default (migration sederhana)", () => {
    mockStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({
        schemaVersion: 999,
        lessonsDone: ["old_lesson"],
        actionChecks: {},
        caseAttempts: [],
      }),
    );

    const loaded = storage.load();
    expect(loaded).toEqual(DEFAULT_PROGRESS);
    expect(loaded.lessonsDone).toEqual([]);
  });

  it("works safely when localStorage is completely undefined", () => {
    Object.defineProperty(globalThis, "localStorage", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const loaded = storage.load();
    expect(loaded).toEqual(DEFAULT_PROGRESS);

    expect(() => storage.save(DEFAULT_PROGRESS)).not.toThrow();
    expect(() => storage.clearAll()).not.toThrow();
  });
});

