import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError("Silakan masukkan Username atau Email Anda");
      return;
    }
    if (!password) {
      setError("Silakan masukkan kata sandi Anda");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(identifier, password);
      setIsLoading(false);
      if (res.success) {
        navigate("/");
      } else {
        setError(res.error || "Gagal masuk. Silakan periksa kembali data Anda.");
      }
    }, 300);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle();
      setIsLoading(false);
      navigate("/");
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 px-4 sm:px-6 page-transition-enter">
      {/* Container Utama Desain Split Desktop / Kartu Mobile (Sesuai Gambar 1 & Gambar 2/3) */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#9DB2BF]/40 overflow-hidden grid grid-cols-1 md:grid-cols-2 relative auth-card-enter">
        
        {/* Tombol Pintasan Kembali ke Beranda */}
        <Link
          to="/"
          className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/80 hover:bg-white text-[#27374D] backdrop-blur-xs shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </Link>

        {/* ================= SISI KIRI: BUBBLE DEKORASI BIRU (Sesuai Gambar 1) ================= */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-linear-to-br from-[#1E56A0] via-[#163172] to-[#0D1B2A] text-white overflow-hidden">
          {/* Bola / Gelembung 3D Biru */}
          <div className="absolute -top-14 -left-14 w-64 h-64 rounded-full bg-linear-to-tr from-[#00A8FF]/30 to-[#0052D4]/50 blur-xs shadow-2xl pointer-events-none transform -rotate-12 animate-bubble-float" />
          <div className="absolute top-1/3 -right-16 w-56 h-56 rounded-full bg-linear-to-bl from-[#3A86FF]/40 to-[#1E3A8A]/80 blur-xs shadow-2xl pointer-events-none animate-bubble-float [animation-delay:2s]" />
          <div className="absolute -bottom-16 left-12 w-60 h-60 rounded-full bg-linear-to-tr from-[#1E3A8A]/90 to-[#2563EB]/40 blur-xs shadow-2xl pointer-events-none animate-bubble-float [animation-delay:4s]" />
          
          {/* Efek Garis Cahaya */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/20 pointer-events-none" />

          {/* Konten Teks Sisi Kiri */}
          <div className="relative z-10 my-auto space-y-4 max-w-xs">
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight uppercase">
              Welcome <br />
              <span className="text-blue-200">JagaRuang</span>
            </h1>

            <p className="text-sm text-blue-100/80 leading-relaxed">
              Cek keaslian pesan, latih kewaspadaan dari tipuan digital, dan lindungi dirimu serta orang tersayang di ruang siber.
            </p>
          </div>

          {/* Footer Kecil Kiri */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-blue-200/70">
            <span>Privat & Aman</span>
            <span>MIT-Week 2026</span>
          </div>
        </div>

        {/* ================= SISI KANAN: FORM LOGIN (Sesuai Gambar 1 & Gambar 2/3) ================= */}
        <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12 bg-white relative">
          
          {/* Header Form */}
          <div className="space-y-1.5 mb-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163172]">
              Sign in
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82]">
              Masuk untuk melanjutkan latihan simulasi dan analisis aman.
            </p>
          </div>

          {/* Alert Error */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulir */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input User Name / Email */}
            <div>
              <label className="block text-xs font-bold text-[#27374D] uppercase tracking-wider mb-1.5">
                User Name / Email
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-[#526D82]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Ketik username atau email"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F6F8FA] border border-[#DDE6ED] rounded-xl text-sm text-[#27374D] placeholder:text-[#9DB2BF] focus:bg-white focus:border-[#1E56A0] focus:ring-2 focus:ring-[#1E56A0]/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-xs font-bold text-[#27374D] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-[#526D82]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-10 pr-16 py-2.5 bg-[#F6F8FA] border border-[#DDE6ED] rounded-xl text-sm text-[#27374D] placeholder:text-[#9DB2BF] focus:bg-white focus:border-[#1E56A0] focus:ring-2 focus:ring-[#1E56A0]/20 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-xs font-bold text-[#1E56A0] hover:text-[#163172] select-none flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 text-[#526D82] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#1E56A0] border-[#9DB2BF] focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <span className="text-[#1E56A0] hover:underline cursor-pointer font-medium">
                Forgot Password?
              </span>
            </div>

            {/* Tombol Utama Sign in */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#163172] hover:bg-[#1E56A0] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-60"
            >
              <span>{isLoading ? "Memproses..." : "Sign in"}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Garis Pemisah (Divider "Or") */}
            <div className="relative flex items-center justify-center py-2">
              <div className="grow border-t border-[#DDE6ED]" />
              <span className="shrink-0 px-3 text-xs text-[#9DB2BF] uppercase tracking-wider font-semibold">
                Or
              </span>
              <div className="grow border-t border-[#DDE6ED]" />
            </div>

            {/* Tombol Google Lonjong (Sesuai Permintaan Gambar 3) */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full border border-[#DDE6ED] bg-white hover:bg-[#F6F8FA] text-[#27374D] font-semibold text-xs transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              {/* Google SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Login with Google</span>
            </button>

            {/* Switch ke Register */}
            <p className="text-center text-xs text-[#526D82] pt-2">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-[#1E56A0] hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

