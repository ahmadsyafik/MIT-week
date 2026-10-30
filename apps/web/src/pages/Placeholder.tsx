export default function Placeholder({ title, task }: { title: string; task: string }) {
  return (
    <section>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-600">Halaman ini belum dikerjakan (tugas {task}).</p>
    </section>
  );
}
