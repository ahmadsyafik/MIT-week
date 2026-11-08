import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  email?: string;
  joinedAt: string;
}

export interface StoredAccount {
  name: string;
  email: string;
  passwordHash: string;
  joinedAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  login: (emailOrName: string, password?: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  loginWithGoogle: () => { success: boolean };
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const STORAGE_USER_KEY = "jagaruang_user";
const STORAGE_ACCOUNTS_KEY = "jagaruang_registered_accounts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Abaikan bila peramban membatasi localStorage
    }
    return null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Ambil daftar akun terdaftar dari localStorage
  const getRegisteredAccounts = (): StoredAccount[] => {
    try {
      const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  // Pantau jika ada perubahan localStorage dari tab lain atau clearAll
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_USER_KEY || e.key === null) {
        try {
          const saved = localStorage.getItem(STORAGE_USER_KEY);
          setUser(saved ? JSON.parse(saved) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const register = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) return { success: false, error: "Nama pengguna wajib diisi" };
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { success: false, error: "Format email tidak valid" };
    }
    if (!password || password.length < 6) {
      return { success: false, error: "Kata sandi minimal 6 karakter" };
    }

    const accounts = getRegisteredAccounts();
    const exists = accounts.some((acc) => acc.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: "Email sudah terdaftar. Silakan langsung login." };
    }

    const newAccount: StoredAccount = {
      name: cleanName,
      email: cleanEmail,
      passwordHash: btoa(password), // Obfuscate sandi lokal
      joinedAt: new Date().toISOString(),
    };

    accounts.push(newAccount);
    try {
      localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {
      // localStorage error fallback
    }

    const profile: UserProfile = {
      name: cleanName,
      email: cleanEmail,
      joinedAt: newAccount.joinedAt,
    };

    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }

    setUser(profile);
    setIsLoginModalOpen(false);
    return { success: true };
  };

  const login = (emailOrName: string, password?: string): { success: boolean; error?: string } => {
    const cleanIdentifier = emailOrName.trim();
    if (!cleanIdentifier) {
      return { success: false, error: "Email atau nama pengguna wajib diisi" };
    }

    // Jika masuk dengan password
    if (password !== undefined && password !== "") {
      const accounts = getRegisteredAccounts();
      const matched = accounts.find(
        (acc) =>
          acc.email.toLowerCase() === cleanIdentifier.toLowerCase() ||
          acc.name.toLowerCase() === cleanIdentifier.toLowerCase()
      );

      if (matched) {
        if (matched.passwordHash !== btoa(password)) {
          return { success: false, error: "Kata sandi salah. Silakan periksa kembali." };
        }
        const profile: UserProfile = {
          name: matched.name,
          email: matched.email,
          joinedAt: matched.joinedAt,
        };
        try {
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(profile));
        } catch {
          // ignore
        }
        setUser(profile);
        setIsLoginModalOpen(false);
        return { success: true };
      }
    }

    // Fallback login instan / demo jika akun belum tersimpan
    const profile: UserProfile = {
      name: cleanIdentifier.includes("@") ? cleanIdentifier.split("@")[0] : cleanIdentifier,
      email: cleanIdentifier.includes("@") ? cleanIdentifier : undefined,
      joinedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }

    setUser(profile);
    setIsLoginModalOpen(false);
    return { success: true };
  };

  const loginWithGoogle = (): { success: boolean } => {
    const profile: UserProfile = {
      name: "Google Explorer",
      email: "user@gmail.com",
      joinedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
    setUser(profile);
    setIsLoginModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
    } catch {
      // Abaikan error storage
    }
    setUser(null);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginModalOpen,
        login,
        register,
        loginWithGoogle,
        logout,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}
