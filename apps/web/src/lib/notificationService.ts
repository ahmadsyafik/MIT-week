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
const STORAGE_KEY = "jagaruang_notifications";

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
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
    title: "Target Progres: Skenario 1 Selesai",
    message: "Selamat! Kamu menyelesaikan 'Verifikasi Kontak Resmi'. Rekomendasi: Lanjutkan ke Skenario 2 (Undangan APK) atau coba tantangan Kilat 120 Dtk.",
    time: "25 menit lalu",
    type: "sukses",
    read: false,
    link: "/belajar#simulator",
  },
  {
    id: "notif-3",
    title: "Rekomendasi Belajar: Proteksi SIM Swap",
    message: "Lindungi SMS OTP perbankanmu dengan mengaktifkan PIN proteksi kartu SIM dan beralih ke aplikasi autentikator.",
    time: "1 jam lalu",
    type: "info",
    read: true,
    link: "/belajar#modul",
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

