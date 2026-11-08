import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  joinedAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  login: (name: string) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const STORAGE_KEY = "jagaruang_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Abaikan bila peramban membatasi localStorage
    }
    return null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Pantau jika ada perubahan localStorage dari tab lain atau clearAll
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          setUser(saved ? JSON.parse(saved) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (name: string) => {
    const cleanName = name.trim() || "Kawan JagaRuang";
    const profile: UserProfile = {
      name: cleanName,
      joinedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Penyimpanan lokal mungkin dinonaktifkan
    }
    setUser(profile);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
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

