import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Beranda from "./pages/Beranda";
import Cek from "./pages/Cek";
import Keterbatasan from "./pages/Keterbatasan";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* Halaman Publik (Dapat Diakses Tanpa Login) */}
          <Route index element={<Beranda />} />
          <Route path="keterbatasan" element={<Keterbatasan />} />

          {/* Halaman Aplikasi yang Terproteksi (Hanya Ditampilkan untuk User yang Sudah Login) */}
          <Route
            path="cek"
            element={
              <ProtectedRoute featureName="Cek Pesan & Berkas">
                <Cek />
              </ProtectedRoute>
            }
          />
          <Route
            path="latih"
            element={
              <ProtectedRoute featureName="Latih Kasus Interaktif">
                <Placeholder title="Latih Kasus Interaktif" task="FE-3.x" />
              </ProtectedRoute>
            }
          />
          <Route
            path="lindungi"
            element={
              <ProtectedRoute featureName="Panduan Lindungi Diri & Sekitar">
                <Placeholder title="Lindungi Diri & Sekitar" task="FE-4.x" />
              </ProtectedRoute>
            }
          />
          <Route
            path="kamus"
            element={
              <ProtectedRoute featureName="Kamus Jebakan Digital">
                <Placeholder title="Kamus Jebakan Digital" task="FE-3.x" />
              </ProtectedRoute>
            }
          />
          <Route
            path="kilat"
            element={
              <ProtectedRoute featureName="Refleks Kilat 2 Menit">
                <Placeholder title="Kilat 2 Menit" task="FE-5.x" />
              </ProtectedRoute>
            }
          />
          <Route
            path="sandi"
            element={
              <ProtectedRoute featureName="Sandi Verifikasi Keluarga">
                <Placeholder title="Sandi Keluarga" task="FE-5.x" />
              </ProtectedRoute>
            }
          />

          {/* Rute 404 */}
          <Route path="*" element={<Placeholder title="Halaman Tidak Ditemukan" task="404" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
