import { Link } from "react-router-dom";

export default function Beranda() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Cek. Latih. Lindungi.</h1>
      <p className="mt-2 max-w-prose text-slate-700">
        Ragu dengan sebuah pesan, link, atau file? Cek tanda bahayanya, latih instingmu, dan tahu langkah berikutnya.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/cek" className="rounded bg-slate-900 px-4 py-2 text-white">
          Mulai Cek
        </Link>
        <Link to="/latih" className="rounded border px-4 py-2">
          Mulai kasus cepat (3 menit)
        </Link>
      </div>
      <p className="mt-8 text-sm text-slate-500">[Kerangka awal] Frontend mengisi halaman ini sesuai docs/frontend/TASK_GUIDE.md.</p>
    </section>
  );
}
