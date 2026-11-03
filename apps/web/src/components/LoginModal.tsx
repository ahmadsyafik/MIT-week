import React, { useState, useEffect, useRef } from "react";
import { X, ShieldCheck, UserCheck, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name.trim() || "Kawan JagaRuang");
  };

  const handleGuestLogin = () => {
    login("Tamu");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      onClick={closeLoginModal}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 transition-all sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          aria-label="Tutup jendela login"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Modal */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white font-extrabold shadow-xs">
            JR
          </div>
          <div>
            <h2 id="login-modal-title" className="text-xl font-bold text-slate-900">
              Masuk ke JagaRuang
            </h2>
            <p className="text-xs text-slate-500">Mulai eksplorasi aman tanpa registrasi rumit</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          Masukkan nama panggilan atau nama samaranmu untuk membuka menu navigasi dan seluruh fitur simulasi digital.
        </p>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user-name-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
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
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            />
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <Button type="submit" variant="primary" size="md" className="w-full justify-center">
              <span>Masuk Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleGuestLogin}
              className="w-full justify-center text-slate-700"
            >
              <UserCheck className="h-4 w-4 text-slate-500" />
              <span>Masuk Cepat sebagai Tamu</span>
            </Button>
          </div>
        </form>

        {/* Informasi Privasi */}
        <div className="mt-5 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong>100% On-Device:</strong> Data sesi hanya disimpan di memori peramban lokalmu. Tidak ada server, email, password, ataupun pelacak luar.
          </span>
        </div>
      </div>
    </div>
  );
}

