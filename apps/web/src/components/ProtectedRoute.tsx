import React from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  featureName?: string;
}

export default function ProtectedRoute({ children, featureName = "fitur ini" }: ProtectedRouteProps) {
  const { isAuthenticated, openLoginModal } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="py-12 max-w-xl mx-auto text-center space-y-6">
      <div className="rounded-3xl border border-[#9DB2BF]/60 bg-white p-8 space-y-5 shadow-sm text-[#27374D]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DDE6ED] text-[#526D82] border border-[#9DB2BF]/50">
          <Lock className="h-7 w-7 text-[#526D82]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#27374D] sm:text-2xl">
            Akses Khusus Pengguna
          </h2>
          <p className="text-sm text-[#526D82] leading-relaxed max-w-md mx-auto">
            Untuk membuka dan mencoba <strong>{featureName}</strong>, silakan masuk terlebih dahulu dengan nama panggilanmu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/login" className="w-full sm:w-auto">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#163172] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1E56A0] active:scale-98 transition-all shadow-sm w-full sm:w-auto min-w-[150px] cursor-pointer"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#9DB2BF] bg-[#DDE6ED]/60 px-6 py-2.5 text-sm font-bold text-[#27374D] hover:bg-[#DDE6ED] transition-colors w-full sm:w-auto min-w-[150px] cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </Link>
        </div>

        <div className="pt-3 border-t border-[#9DB2BF]/30 flex items-center justify-center gap-2 text-xs text-[#526D82]">
          <ShieldCheck className="h-4 w-4 text-[#526D82]" />
          <span>On-device & privat · Tanpa registrasi server</span>
        </div>
      </div>
    </div>
  );
}
