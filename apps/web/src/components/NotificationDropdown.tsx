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

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "kritis" | "waspada" | "sukses" | "info";
  read: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    title: "Peringatan Malware APK",
    message: "Terdeteksi modus baru manipulasi berkedok file APK surat tilang dan resi paket. Jangan buka berkas .apk di luar Play Store!",
    time: "10 menit lalu",
    type: "kritis",
    read: false,
    link: "/cek",
  },
  {
    id: "notif-2",
    title: "Skenario Perlu Dilanjutkan",
    message: "Skenario 'Kurir Paket & Manipulasi Resi' belum selesai. Lanjutkan pengujian keputusanmu.",
    time: "2 jam lalu",
    type: "waspada",
    read: false,
    link: "/belajar?tab=simulator",
  },
  {
    id: "notif-3",
    title: "Simulasi Berhasil",
    message: "Selamat! Kamu telah menyelesaikan Skenario 'Verifikasi Kontak Resmi' dengan skor sempurna 100.",
    time: "Kemarin",
    type: "sukses",
    read: true,
    link: "/belajar?tab=simulator",
  },
  {
    id: "notif-4",
    title: "Inisiasi Sandi Keluarga",
    message: "Lindungi orang terdekat dari kloning suara AI dengan membuat kata sandi rahasia keluarga sekarang.",
    time: "2 hari lalu",
    type: "info",
    read: true,
    link: "/sandi",
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem("jagaruang_notifications");
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      navigate(item.link);
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
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-black text-white ring-2 ring-white">
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
              <span className="text-sm font-bold text-[#27374D]">Notifikasi</span>
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
            </div>
          </div>

          {/* List Notifikasi */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#9DB2BF]/20">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#526D82]">
                <Bell className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                <span>Tidak ada notifikasi aktif saat ini.</span>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`group flex items-start gap-3 p-3.5 transition-colors cursor-pointer ${
                    item.read
                      ? "bg-white hover:bg-slate-50 text-slate-700"
                      : "bg-[#DDE6ED]/30 hover:bg-[#DDE6ED]/60 text-[#27374D]"
                  }`}
                >
                  {getIcon(item.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs font-bold truncate ${
                          item.read ? "text-[#27374D]" : "text-[#27374D] font-extrabold"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#526D82] line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    {item.link && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#526D82] group-hover:text-[#27374D] group-hover:underline">
                        Buka terkait <ExternalLink className="h-2.5 w-2.5" />
                      </span>
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
          <div className="border-t border-[#9DB2BF]/30 p-2.5 bg-slate-50/80 rounded-b-2xl text-center">
            <span className="text-[10px] text-[#526D82]">
              Notifikasi disinkronkan secara lokal di perambanmu (On-Device).
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

