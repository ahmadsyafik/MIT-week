import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Beranda from "./pages/Beranda";
import Cek from "./pages/Cek";
import Keterbatasan from "./pages/Keterbatasan";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Beranda />} />
        <Route path="cek" element={<Cek />} />
        <Route path="latih" element={<Placeholder title="Latih Kasus Interaktif" task="FE-3.x" />} />
        <Route path="lindungi" element={<Placeholder title="Lindungi Diri & Sekitar" task="FE-4.x" />} />
        <Route path="kamus" element={<Placeholder title="Kamus Jebakan Digital" task="FE-3.x" />} />
        <Route path="kilat" element={<Placeholder title="Kilat 2 Menit" task="FE-5.x" />} />
        <Route path="sandi" element={<Placeholder title="Sandi Keluarga" task="FE-5.x" />} />
        <Route path="keterbatasan" element={<Keterbatasan />} />
        <Route path="*" element={<Placeholder title="Halaman Tidak Ditemukan" task="404" />} />
      </Route>
    </Routes>
  );
}
