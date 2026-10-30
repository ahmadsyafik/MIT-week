import { useState } from "react";
import { BAND_LABEL, type AnalysisResult } from "@jagaruang/contracts";
import { analyze, USE_MOCK } from "../lib/coreClient";
import { EXAMPLE_MESSAGE } from "../mocks/analysis";

/** Irisan vertikal minimal untuk membuktikan alur FE -> core. Frontend menggantinya. */
export default function Cek() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run(value: string) {
    setError(null);
    if (!value.trim()) {
      setError("Isi pesan dulu, atau tekan 'Coba contoh'.");
      return;
    }
    try {
      setResult(analyze({ kind: "message", text: value }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Cek Pesan</h1>
      <p className="mt-1 text-sm text-slate-600">Jangan tempel data pribadi sungguhan. Semua analisis berjalan di perangkatmu.</p>
      <textarea
        className="mt-3 w-full rounded border p-2"
        rows={5}
        maxLength={5000}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Isi pesan"
      />
      <div className="mt-2 flex gap-2">
        <button className="rounded bg-slate-900 px-3 py-1.5 text-white" onClick={() => run(text)}>
          Cek
        </button>
        <button
          className="rounded border px-3 py-1.5"
          onClick={() => {
            setText(EXAMPLE_MESSAGE);
            run(EXAMPLE_MESSAGE);
          }}
        >
          Coba contoh
        </button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      {result && (
        <div className="mt-4 rounded border bg-white p-3">
          <p className="font-semibold">{BAND_LABEL[result.band]}</p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {result.flags.map((f) => (
              <li key={f.ruleId}>{f.why}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-600">{result.disclaimer}</p>
        </div>
      )}
      {USE_MOCK && <p className="mt-4 text-xs text-slate-400">[mode data tiruan aktif]</p>}
    </section>
  );
}
