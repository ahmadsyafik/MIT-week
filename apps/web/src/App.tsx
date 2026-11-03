import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Beranda from "./pages/Beranda";
import Cek from "./pages/Cek";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Beranda />} />
        <Route path="cek" element={<Cek />} />
        <Route path="latih" element={<Placeholder title="Latih" task="FE-3.x" />} />
        <Route path="lindungi" element={<Placeholder title="Lindungi" task="FE-4.x" />} />
        <Route path="kamus" element={<Placeholder title="Kamus Jebakan" task="FE-3.x" />} />
        <Route path="kilat" element={<Placeholder title="Kilat 2 Menit" task="FE-5.x" />} />
        <Route path="sandi" element={<Placeholder title="Sandi Keluarga" task="FE-5.x" />} />
        <Route path="keterbatasan" element={<Placeholder title="Keterbatasan dan Privasi" task="FE-1.x" />} />
        <Route path="*" element={<Placeholder title="Halaman tidak ditemukan" task="-" />} />
      </Route>
    </Routes>
  );
}
