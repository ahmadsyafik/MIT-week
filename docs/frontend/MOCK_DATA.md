# MOCK_DATA.md: Bekerja Tanpa Menunggu Backend

## Prinsip
Selama `VITE_USE_MOCK=true`, `src/lib/coreClient.ts` memakai `src/mocks/*`. Mock **harus mengikuti tipe** di `@jagaruang/contracts` sehingga TypeScript memberi tahu bila kontrak berubah.

## Berkas
| Berkas | Isi | Status |
|---|---|---|
| `src/mocks/analysis.ts` | `mockAnalyze`, `EXAMPLE_MESSAGE` (loker palsu fiktif, sangat tinggi) | ✅ ada |
| `src/mocks/malware.ts` | beberapa `MalwareType` | _(tambah)_ |
| `src/mocks/cases.ts` | 1 `CaseDefinition` contoh + sesi | _(tambah)_ |
| `src/mocks/actionGuides.ts` | 3 `ActionGuide` + `ReportChannel` | _(tambah)_ |
| `src/mocks/triage.ts` | beberapa `TriageMessage` | _(tambah)_ |

## Cara menambah fungsi ke `coreClient.ts`
```ts
import * as core from "@jagaruang/core";
import { mockListMalwareTypes } from "../mocks/malware";

export function listMalwareTypes() {
  return USE_MOCK ? mockListMalwareTypes() : core.listMalwareTypes();
}
```

## Aturan
- Semua data **fiktif**; domain `example.com`/`.test`/`.invalid`; tidak ada nomor/rekening nyata.
- Mock mencakup **minimal satu** contoh tiap band (termasuk `belum_terlihat` dengan teks "tetap verifikasi jika ragu").
- Saat kontrak berubah (RFC), perbarui mock agar sejalan.
