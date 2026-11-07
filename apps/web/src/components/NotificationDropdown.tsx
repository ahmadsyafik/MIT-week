import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Lightbulb,
  TrendingUp,
  Wrench,
  ShieldAlert,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  type AppNotification,
  getNotifications,
  NOTIFICATION_EVENT,
} from "../lib/notificationService";

export type { AppNotification };

type NotificationTab = "today" | "this_week" | "earlier";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NotificationTab>("today");
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
      localStorage.setItem("jagaruang_notifications_v3", JSON.stringify(notifications));
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

  const handleNotificationClick = (item: AppNotification) => {
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

  // Ikon lingkaran garis halus sesuai gambar referensi (Lightbulb, TrendingUp, Wrench, Shield)
  const getItemIcon = (item: AppNotification) => {
    const titleLower = item.title.toLowerCase();
    const type = item.type;

    if (
      titleLower.includes("analysis") ||
      titleLower.includes("analisis") ||
      titleLower.includes("data") ||
      titleLower.includes("report") ||
      type === "sukses"
    ) {
      return <TrendingUp className="w-4 h-4 text-slate-700" />;
    }
    if (
      titleLower.includes("maintenance") ||
      titleLower.includes("pemeliharaan") ||
      titleLower.includes("system") ||
      titleLower.includes("sistem") ||
      type === "waspada"
    ) {
      return <Wrench className="w-4 h-4 text-slate-700" />;
    }
    if (
      titleLower.includes("smarter") ||
      titleLower.includes("ai") ||
      titleLower.includes("smart") ||
      titleLower.includes("rekomendasi") ||
      titleLower.includes("belajar") ||
      type === "info"
    ) {
      return <Lightbulb className="w-4 h-4 text-slate-700" />;
    }
    if (
      type === "kritis" ||
      titleLower.includes("malware") ||
      titleLower.includes("threat") ||
      titleLower.includes("peringatan")
    ) {
      return <ShieldAlert className="w-4 h-4 text-slate-700" />;
    }
    return <Sparkles className="w-4 h-4 text-slate-700" />;
  };

  // Helper pemformat teks agar angka/metrik/waktu tercetak tebal (bold) persis gambar referensi
  const renderFormattedMessage = (text: string) => {
    const parts = text.split(
      /(\d+%(?:\s+kritis)?|\d{1,3}(?:,\d{3})*\+?|\d{1,2}:\d{2}(?:\s*(?:AM|PM|UTC|WIB))?)/gi
    );
    return parts.map((part, i) => {
      if (
        /^(\d+%(?:\s+kritis)?|\d{1,3}(?:,\d{3})*\+?|\d{1,2}:\d{2}(?:\s*(?:AM|PM|UTC|WIB))?)$/i.test(
          part
        )
      ) {
        return (
          <strong key={i} className="font-bold text-slate-800">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Filter notifikasi sesuai tab aktif
  const filteredNotifications = notifications.filter((item) => {
    const timeLower = item.time.toLowerCase();
    if (activeTab === "today") {
      return (
        timeLower.includes("h ago") ||
        timeLower.includes("m ago") ||
        timeLower.includes("jam") ||
        timeLower.includes("menit") ||
        timeLower.includes("baru saja") ||
        timeLower.includes("today") ||
        timeLower.includes("hari ini")
      );
    }
    if (activeTab === "this_week") {
      return (
        timeLower.includes("d ago") ||
        timeLower.includes("hari") ||
        timeLower.includes("kemarin") ||
        timeLower.includes("yesterday")
      );
    }
    if (activeTab === "earlier") {
      return (
        timeLower.includes("w ago") ||
        timeLower.includes("minggu") ||
        timeLower.includes("bulan") ||
        timeLower.includes("earlier") ||
        (!timeLower.includes("h ago") &&
          !timeLower.includes("m ago") &&
          !timeLower.includes("jam") &&
          !timeLower.includes("menit") &&
          !timeLower.includes("baru saja") &&
          !timeLower.includes("today") &&
          !timeLower.includes("hari ini") &&
          !timeLower.includes("d ago") &&
          !timeLower.includes("hari") &&
          !timeLower.includes("kemarin") &&
          !timeLower.includes("yesterday"))
      );
    }
    return true;
  });

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

      {/* Popover / Dropdown Menu Sesuai Referensi Gambar User */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Notification Center"
          className="absolute right-0 top-12 z-50 w-80 sm:w-[380px] rounded-3xl border border-slate-200/90 bg-white shadow-2xl p-4 sm:p-5 text-left font-sans select-none animate-fadeIn"
        >
          {/* Header: AI Notification Center & See All */}
          <div className="flex items-center justify-between pb-3 sm:pb-3.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              AI Notification Center
            </h3>
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200/90 hover:border-slate-300 rounded-lg px-2.5 py-1 transition-all shadow-2xs cursor-pointer"
            >
              See All
            </button>
          </div>

          {/* Tab Filter: Today | This Week | Earlier */}
          <div className="bg-slate-100/80 p-1 rounded-xl flex items-center justify-between gap-1 mb-3">
            {(
              [
                { id: "today", label: "Today" },
                { id: "this_week", label: "This Week" },
                { id: "earlier", label: "Earlier" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-center py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-700 font-medium"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List Notifikasi */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100/90 pr-0.5">
            {filteredNotifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-700">
                  No notifications in {activeTab === "today" ? "Today" : activeTab === "this_week" ? "This Week" : "Earlier"}
                </p>
                <p>All updates are processed.</p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`flex items-start gap-3.5 py-3.5 cursor-pointer hover:bg-slate-50/70 -mx-1 px-1 rounded-xl transition-colors ${
                    !item.read ? "bg-slate-50/40" : "opacity-90"
                  }`}
                >
                  {/* Lingkaran Ikon Garis Halus */}
                  <div className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-2xs mt-0.5">
                    {getItemIcon(item)}
                  </div>

                  {/* Konten Notifikasi */}
                  <div className="flex-1 min-w-0 space-y-1">
                    {/* Judul & Waktu */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {/* Titik Ungu Khas AI Notification Center */}
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-[11px] sm:text-xs text-slate-400 font-medium shrink-0 tabular-nums">
                        {item.time}
                      </span>
                    </div>

                    {/* Deskripsi Teks dengan Angka / Highlight Bold */}
                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                      {renderFormattedMessage(item.message)}
                    </p>

                    {item.link && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline pt-0.5">
                        <span>Buka Detail</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
