import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Beranda from "./pages/Beranda";
import Dashboard from "./pages/Dashboard";
import Belajar from "./pages/Belajar";
import Cek from "./pages/Cek";
import Lindungi from "./pages/Lindungi";
import Sandi from "./pages/Sandi";
import Keterbatasan from "./pages/Keterbatasan";
import Placeholder from "./pages/Placeholder";

/**
 * Komponen pembantu untuk mengarahkan (redirect) rute lama ke /belajar
 * dengan mempertahankan query parameter (seperti ?q=...) dan menyematkan parameter tab.
 */
function RedirectToBelajar({ defaultTab }: { defaultTab: string }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  if (!searchParams.has("tab")) {
    searchParams.set("tab", defaultTab);
  }
  return <Navigate to={`/belajar?${searchParams.toString()}`} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* Halaman Publik (Landing Page sebagai direktori awal ketika masuk) */}
          <Route index element={<Beranda />} />
          <Route path="keterbatasan" element={<Keterbatasan />} />

          {/* Halaman Dashboard Utama (Terproteksi) */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute featureName="Dashboard Utama">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Halaman Aplikasi yang Terproteksi (Hanya Ditampilkan untuk User yang Sudah Login) */}
          <Route
            path="cek"
            element={
              <ProtectedRoute featureName="Cek Pesan & Berkas">
                <Cek />
              </ProtectedRoute>
            }
          />

          {/* Rute Baru Belajar Interaktif (Menggabungkan Simulator Kasus, Modul, Kilat 2 Menit, Kamus) */}
          <Route
            path="belajar"
            element={
              <ProtectedRoute featureName="Belajar Interaktif">
                <Belajar />
              </ProtectedRoute>
            }
          />

          <Route
            path="lindungi"
            element={
              <ProtectedRoute featureName="Panduan Lindungi Diri & Sekitar">
                <Lindungi />
              </ProtectedRoute>
            }
          />

          <Route
            path="sandi"
            element={
              <ProtectedRoute featureName="Sandi Verifikasi Keluarga">
                <Sandi />
              </ProtectedRoute>
            }
          />

          {/* Redirect Otomatis Rute Lama ke /belajar dengan Query Param Tab yang Sesuai */}
          <Route path="modul-kasus" element={<RedirectToBelajar defaultTab="simulator" />} />
          <Route path="latih" element={<RedirectToBelajar defaultTab="simulator" />} />
          <Route path="modul" element={<RedirectToBelajar defaultTab="modul" />} />
          <Route path="kilat-2-menit" element={<RedirectToBelajar defaultTab="kilat" />} />
          <Route path="kilat" element={<RedirectToBelajar defaultTab="kilat" />} />
          <Route path="kamus-jebakan" element={<RedirectToBelajar defaultTab="kamus" />} />
          <Route path="kamus" element={<RedirectToBelajar defaultTab="kamus" />} />

          {/* Rute 404 */}
          <Route path="*" element={<Placeholder title="Halaman Tidak Ditemukan" task="404" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
