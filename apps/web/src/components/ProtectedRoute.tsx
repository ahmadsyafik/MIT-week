import React from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button, Card } from "./ui";

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
    <div className="py-8 max-w-xl mx-auto text-center space-y-6">
      <Card className="p-8 space-y-5 border-slate-300 shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
          <Lock className="h-7 w-7 text-slate-700" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Akses Khusus Pengguna
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Untuk membuka dan mencoba <strong>{featureName}</strong>, silakan masuk terlebih dahulu dengan nama panggilanmu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={openLoginModal}
            className="w-full sm:w-auto min-w-[150px]"
          >
            <span>Masuk Sekarang</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto min-w-[150px]">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-slate-600" />
          <span>On-device & privat · Tanpa registrasi server</span>
        </div>
      </Card>
    </div>
  );
}

