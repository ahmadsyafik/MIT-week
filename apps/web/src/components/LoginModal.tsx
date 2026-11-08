import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, UserCheck, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoginModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setName("");
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLoginModalOpen) {
        closeLoginModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleSuccessfulAuth = () => {
    if (location.pathname === "/" || location.pathname === "/keterbatasan") {
      navigate("/dashboard");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name.trim() || "Kawan JagaRuang");
    handleSuccessfulAuth();
  };

  const handleGuestLogin = () => {
    login("Tamu");
    handleSuccessfulAuth();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#27374D]/60 backdrop-blur-xs transition-opacity"
      onClick={closeLoginModal}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-[#9DB2BF]/50 transition-all sm:p-7 text-[#27374D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute right-4 top-4 rounded-xl p-2 text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526D82]"
          aria-label="Tutup jendela login"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Modal (Posisi Cerah: Logo Biru) */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/logo-blue.png"
            alt="Logo JagaRuang"
            className="h-8 w-8 object-contain shrink-0"
          />
          <div>
            <h2 id="login-modal-title" className="text-xl font-bold text-[#27374D]">
              Masuk ke JagaRuang
            </h2>
            <p className="text-xs text-[#526D82]">Eksplorasi modul & simulator aman tanpa registrasi rumit</p>
          </div>
        </div>

        <p className="text-sm text-[#526D82] leading-relaxed mb-5">
          Masukkan nama panggilan atau nama samaranmu untuk membuka dashboard, modul pembelajaran, dan seluruh simulator interaktif.
        </p>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user-name-input" className="block text-xs font-bold uppercase tracking-wider text-[#27374D] mb-1.5">
              Nama Panggilan / Samaran
            </label>
            <input
              id="user-name-input"
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Rian / Kawan Digital"
              maxLength={25}
              className="w-full rounded-xl border border-[#9DB2BF] bg-[#DDE6ED]/40 px-3.5 py-2.5 text-sm text-[#27374D] placeholder:text-[#526D82]/60 focus:border-[#526D82] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#526D82]/20 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#526D82] px-4 py-2 text-sm font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-sm cursor-pointer"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#9DB2BF] bg-[#DDE6ED]/50 px-4 py-2 text-sm font-bold text-[#27374D] hover:bg-[#DDE6ED] transition-colors cursor-pointer"
            >
              <UserCheck className="h-4 w-4 text-[#526D82]" />
              <span>Masuk Cepat sebagai Tamu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
