import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCheck,
  Trash2,
  OctagonAlert,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  ExternalLink,
} from "lucide-react";
import {
  type AppNotification,
  getNotifications,
  NOTIFICATION_EVENT,
} from "../lib/notificationService";

export type { AppNotification };

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getNotifications());

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Sinkronisasi bila ada event notifikasi baru secara real-time
  useEffect(() => {
    function handleUpdate() {
      setNotifications(getNotifications());
    }
    window.addEventListener(NOTIFICATION_EVENT, handleUpdate);
    return () => window.removeEventListener(NOTIFICATION_EVENT, handleUpdate);
  }, []);

  // Simpan ke localStorage saat berubah
  useEffect(() => {
    try {
      localStorage.setItem("jagaruang_notifications", JSON.stringify(notifications));
    } catch {
      // Abaikan jika quota error
    }
  }, [notifications]);

  // Tutup bila klik di luar dropdown atau tekan Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (item: AppNotification) => {
    // Tandai sudah dibaca
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setIsOpen(false);
    if (item.link) {
      if (item.link.includes("#")) {
        const [path, hash] = item.link.split("#");
        navigate(path || "/");
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      } else {
        navigate(item.link);
      }
    }
  };

  const getIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "kritis":
        return <OctagonAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />;
      case "waspada":
        return <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />;
      case "sukses":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />;
      default:
        return <Info className="h-4 w-4 text-[#526D82] shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Tombol Lonceng Notifikasi */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Notifikasi (${unreadCount} belum dibaca)`}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#9DB2BF]/50 bg-white text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D] transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526D82] cursor-pointer"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-black text-white ring-2 ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover / Dropdown Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Panel Notifikasi"
          className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-[#9DB2BF]/60 bg-white p-0 shadow-xl transition-all"
        >
          {/* Header Popover */}
          <div className="flex items-center justify-between border-b border-[#9DB2BF]/30 px-4 py-3 bg-slate-50/80 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#27374D]">Notifikasi & Target</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                  {unreadCount} baru
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  title="Tandai semua telah dibaca"
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-[#526D82] hover:bg-[#DDE6ED] hover:text-[#27374D] transition-colors cursor-pointer"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  <span>Baca Semua</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllNotifications}
                  title="Bersihkan semua notifikasi"
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* List Item Notifikasi */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#DDE6ED]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#526D82] space-y-1">
                <p className="font-semibold text-[#27374D]">Belum ada notifikasi baru</p>
                <p>Selesaikan skenario atau modul untuk menerima rekomendasi belajar.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`flex items-start gap-3 p-3.5 text-left transition-colors cursor-pointer hover:bg-[#DDE6ED]/40 ${
                    !item.read ? "bg-slate-50/70 font-medium" : "opacity-85"
                  }`}
                >
                  {getIcon(item.type)}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-xs truncate ${
                          !item.read ? "font-bold text-[#27374D]" : "text-[#526D82]"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[#9DB2BF] shrink-0">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-[#526D82] leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                    {item.link && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#27374D] hover:underline pt-0.5">
                        <span>Buka Tindakan</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </div>
                    )}
                  </div>
                  {!item.read && (
                    <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Popover */}
          <div className="border-t border-[#9DB2BF]/30 p-2.5 text-center bg-slate-50/50 rounded-b-2xl">
            <span className="text-[10px] text-[#526D82]">
              Notifikasi privasi disimpan 100% lokal di perangkatmu
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
