export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "kritis" | "waspada" | "sukses" | "info";
  read: boolean;
  link?: string;
}

export const NOTIFICATION_EVENT = "jagaruang_notification_updated";
const STORAGE_KEY = "jagaruang_notifications_v3";

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    title: "Your AI Just Got Smarter",
    message: "Adaptive learning speed increased by 27%. New feature: AI-driven trend forecasting",
    time: "1h ago",
    type: "info",
    read: false,
    link: "/cek",
  },
  {
    id: "notif-2",
    title: "Data Analysis Completed",
    message: "Your AI has processed 10,000+ records and identified key trends.",
    time: "3h ago",
    type: "sukses",
    read: false,
    link: "/belajar#simulator",
  },
  {
    id: "notif-3",
    title: "System Maintenance",
    message: "Performance tuning & security updates will be applied at 2:00 AM UTC",
    time: "5h ago",
    type: "waspada",
    read: true,
    link: "/sandi",
  },
  {
    id: "notif-4",
    title: "Threat Pattern Updated",
    message: "Detection rule Anti-APK Trojan v4.2 active with 99.4% precision.",
    time: "2d ago",
    type: "kritis",
    read: true,
    link: "/cek",
  },
  {
    id: "notif-5",
    title: "Family Voice Vault Active",
    message: "AI clone barrier successfully generated for 3 registered contacts.",
    time: "4d ago",
    type: "info",
    read: true,
    link: "/sandi",
  },
  {
    id: "notif-6",
    title: "Weekly Scam Intelligence Report",
    message: "Processed 64,933 IASC reports on fake marketplace bank transfers.",
    time: "1w ago",
    type: "sukses",
    read: true,
    link: "/belajar#modul",
  },
];

export function getNotifications(): AppNotification[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

export function addNotification(
  notif: Omit<AppNotification, "id" | "time" | "read"> & { id?: string; time?: string }
): AppNotification {
  const existing = getNotifications();
  const newEntry: AppNotification = {
    id: notif.id || `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: notif.title,
    message: notif.message,
    type: notif.type,
    read: false,
    time: notif.time || "Baru saja",
    link: notif.link,
  };

  // Jangan duplikasi bila judul sama persis dalam waktu dekat
  const filtered = existing.filter((item) => item.title !== notif.title);
  const updated = [newEntry, ...filtered].slice(0, 20);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Abaikan jika quota error
  }

  // Pancarkan event agar komponen NotificationDropdown dan UI lainnya update real-time
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(NOTIFICATION_EVENT, { detail: newEntry }));
  }

  return newEntry;
}

