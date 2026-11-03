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
      <div className="rounded-3xl border border-[#526D82]/60 bg-[#27374D] p-8 space-y-5 shadow-lg text-[#DDE6ED]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#526D82]/30 text-teal-300 border border-[#526D82]">
          <Lock className="h-7 w-7 text-teal-300" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#DDE6ED] sm:text-2xl">
            Akses Khusus Pengguna
          </h2>
          <p className="text-sm text-[#9DB2BF] leading-relaxed max-w-md mx-auto">
            Untuk membuka dan mencoba <strong>{featureName}</strong>, silakan masuk terlebih dahulu dengan nama panggilanmu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={openLoginModal}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#DDE6ED] px-6 py-2.5 text-sm font-bold text-[#27374D] hover:bg-white active:scale-98 transition-all shadow-sm w-full sm:w-auto min-w-[150px] cursor-pointer"
          >
            <span>Masuk Sekarang</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <Link to="/" className="w-full sm:w-auto">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#526D82] bg-[#526D82]/20 px-6 py-2.5 text-sm font-semibold text-[#DDE6ED] hover:bg-[#526D82]/40 transition-colors w-full sm:w-auto min-w-[150px] cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </Link>
        </div>

        <div className="pt-3 border-t border-[#526D82]/40 flex items-center justify-center gap-2 text-xs text-[#9DB2BF]">
          <ShieldCheck className="h-4 w-4 text-teal-300" />
          <span>On-device & privat · Tanpa registrasi server</span>
        </div>
      </div>
    </div>
  );
}
