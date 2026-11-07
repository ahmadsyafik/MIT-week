import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Smartphone,
  Copy,
  Check,
  PhoneCall,
  MessageCircle,
  Mail,
  ChevronRight,
  ExternalLink,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Camera,
  Mic,
  MapPin,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Info,
  Scale,
  RefreshCw,
} from "lucide-react";
import {
  MODUL_PINJOL_ILEGAL_DATA,
  validatePinjolData,
  PermissionItem,
} from "../../data/modulPinjolIlegal";

// Validasi build otomatis
validatePinjolData();

interface ModulPinjolIlegalPageProps {
  isRead?: boolean;
  onBack: () => void;
  onToggleRead?: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigateTab?: (tab: "simulator" | "modul" | "kilat" | "kamus") => void;
}

export function ModulPinjolIlegalPage({
  isRead,
  onBack,
  onToggleRead,
  onComplete,
  isCompleted = false,
  onNavigateTab,
}: ModulPinjolIlegalPageProps) {
  const effectiveIsCompleted = isRead ?? isCompleted;
  const handleComplete = onToggleRead || onComplete || (() => {});
  const data = MODUL_PINJOL_ILEGAL_DATA;

  // Tab utama: "Aku mau pinjam" (Edukasi & Pencegahan) vs "Aku sedang diteror" (Panel Darurat)
  const [activeTab, setActiveTab] = useState<"preventive" | "terror">("preventive");

  // State Simulasi Izin Aplikasi
  const [selectedPermission, setSelectedPermission] = useState<PermissionItem>(
    data.permissionsGuide[0]
  );
  const [permissionChoice, setPermissionChoice] = useState<"allowed" | "denied" | null>(null);

  // State Pemeriksa 3 Langkah "Cek Sebelum Pinjam"
  const [checkPerms, setCheckPerms] = useState<"camilan_only" | "has_contacts" | "">("");
  const [checkOjk, setCheckOjk] = useState<"verified" | "not_verified" | "">("");
  const [checkCost, setCheckCost] = useState<"transparent" | "hidden_fees" | "">("");

  // State Template Salin
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [copiedContactVal, setCopiedContactVal] = useState<string | null>(null);

  // State Kuis
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // State Checklist Praktis
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    chk1: false,
    chk2: false,
    chk3: false,
    chk4: false,
  });

  const allChecklistDone = Object.values(checkedItems).filter(Boolean).length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateId(id);
    setTimeout(() => setCopiedTemplateId(null), 2500);
  };

  const handleCopyContact = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedContactVal(val);
    setTimeout(() => setCopiedContactVal(null), 2000);
  };

  // Evaluasi 3 Langkah Cek
  const getCheckerResult = () => {
    if (!checkPerms || !checkOjk || !checkCost) return null;
    if (checkPerms === "has_contacts") {
      return {
        level: "danger",
        title: "Bahaya Tinggi: Jangan Pasang atau Lanjutkan!",
        desc: "Aplikasi meminta izin kontak/galeri. Ini ciri kuat pinjol ilegal yang akan memanfaatkan datamu untuk mempermalukan dan meneror kontakmu.",
      };
    }
    if (checkOjk === "not_verified" || checkCost === "hidden_fees") {
      return {
        level: "warning",
        title: "Waspada: Tunda & Verifikasi Mandiri Terlebih Dahulu",
        desc: "Status izin belum dipastikan di OJK atau ada potensi biaya terselubung. Hubungi WhatsApp OJK (081-157-157-157) sebelum menandatangani kontrak apa pun.",
      };
    }
    return {
      level: "success",
      title: "Indikasi Sesuai Batasan Resmi",
      desc: "Hanya meminta izin CAMILAN dan telah diverifikasi di OJK. Ingat: tidak adanya tanda bahaya bukan jaminan mutlak, selalu baca perjanjian kredit dengan cermat.",
    };
  };

  const checkerResult = getCheckerResult();

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Tombol Kembali & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#526D82] hover:text-[#27374D] transition-colors"
        >
          ← Kembali ke Daftar Modul
        </button>
        <span className="text-xs font-medium text-[#526D82] bg-white px-3 py-1 rounded-full border border-[#9DB2BF]/40">
          Modul {data.id.toUpperCase()} · {data.readingTimeMinutes} Menit Baca
        </span>
      </div>

      {/* Header Banner */}
      <header className="rounded-3xl border border-[#9DB2BF]/50 bg-gradient-to-br from-[#27374D] to-[#1E293B] p-6 sm:p-10 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Scale className="h-3.5 w-3.5" />
            Literasi Perlindungan Konsumen
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
            {data.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            {data.subtitle}
          </p>

          {/* Statistik Resmi Satgas PASTI */}
          <div className="pt-2 flex flex-wrap gap-4 text-xs">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2 border border-white/10">
              <span className="block text-slate-300 text-[11px]">Entitas Ditutup Satgas PASTI</span>
              <span className="text-lg font-black text-amber-300">
                {data.officialStats.blockedEntitiesCount.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] text-slate-400 block">
                s.d. {data.officialStats.asOf} (Sumber: {data.officialStats.source})
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2 border border-white/10">
              <span className="block text-slate-300 text-[11px]">Aduan Masyarakat</span>
              <span className="text-lg font-black text-rose-300">
                {data.officialStats.complaintsCount.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] text-slate-400 block">
                s.d. {data.officialStats.asOf} (Sumber: {data.officialStats.source})
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigasi Kebutuhan Pengguna */}
      <nav aria-label="Pilihan Situasi Pengguna" className="sticky top-4 z-30">
        <div className="grid grid-cols-2 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#9DB2BF]/60 shadow-md">
          <button
            onClick={() => setActiveTab("preventive")}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "preventive"
                ? "bg-[#27374D] text-white shadow-sm"
                : "text-[#526D82] hover:text-[#27374D]"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Aku Mau Pinjam (Pencegahan)</span>
          </button>
          <button
            onClick={() => setActiveTab("terror")}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "terror"
                ? "bg-rose-700 text-white shadow-sm animate-pulse"
                : "text-rose-700 hover:bg-rose-50"
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Aku Sedang Diteror (Panel Darurat)</span>
          </button>
        </div>
      </nav>

      {/* KONTEN TAB 1: AKU MAU PINJAM (PENCEGAHAN & EDUKASI) */}
      {activeTab === "preventive" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Card Intisari Golden Rule */}
          <section className="rounded-3xl border border-emerald-300/80 bg-emerald-50/70 p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-black tracking-wide uppercase">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>Prinsip Utama Perlindungan Data Peminjam</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-emerald-950 leading-relaxed">
              &ldquo;{data.keyTakeaway}&rdquo;
            </p>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Aturan OJK membatasi akses aplikasi pinjaman berizin hanya pada <strong>CAMILAN</strong> (Camera, Microphone, Location). Permintaan akses ke kontak atau galeri ponsel adalah sinyal bahaya utama pinjol ilegal.
            </p>
          </section>

          {/* SEKSI 1: SIMULATOR POP-UP IZIN PONSEL */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
                <Smartphone className="h-3.5 w-3.5 text-[#27374D]" />
                Simulasi Interaktif
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
                Simulator Izin Aplikasi: Mana yang Boleh & Mana yang Bahaya?
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
                Pilih jenis izin di bawah untuk melihat bagaimana izin tersebut disalahgunakan atau bagaimana regulasi mengaturnya.
              </p>
            </div>

            {/* Tombol Pemilih Izin */}
            <div className="flex flex-wrap gap-2">
              {data.permissionsGuide.map((perm) => (
                <button
                  key={perm.id}
                  onClick={() => {
                    setSelectedPermission(perm);
                    setPermissionChoice(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                    selectedPermission.id === perm.id
                      ? "bg-[#27374D] text-white border-[#27374D] shadow-xs"
                      : perm.status === "forbidden"
                      ? "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {perm.id === "contacts" && <Users className="h-3.5 w-3.5" />}
                  {perm.id === "storage" && <ImageIcon className="h-3.5 w-3.5" />}
                  {perm.id === "sms" && <MessageSquare className="h-3.5 w-3.5" />}
                  {perm.id === "camera" && <Camera className="h-3.5 w-3.5" />}
                  {perm.id === "microphone" && <Mic className="h-3.5 w-3.5" />}
                  {perm.id === "location" && <MapPin className="h-3.5 w-3.5" />}
                  <span>{perm.name}</span>
                </button>
              ))}
            </div>

            {/* Mockup Pop-up Izin Ponsel */}
            <div className="rounded-2xl border-2 border-[#9DB2BF]/60 bg-[#DDE6ED]/40 p-4 sm:p-6 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg border border-slate-200 space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-[#27374D]">
                    {selectedPermission.id === "contacts" && <Users className="h-6 w-6" />}
                    {selectedPermission.id === "storage" && <ImageIcon className="h-6 w-6" />}
                    {selectedPermission.id === "sms" && <MessageSquare className="h-6 w-6" />}
                    {selectedPermission.id === "camera" && <Camera className="h-6 w-6" />}
                    {selectedPermission.id === "microphone" && <Mic className="h-6 w-6" />}
                    {selectedPermission.id === "location" && <MapPin className="h-6 w-6" />}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#27374D]">
                    Izinkan Pinjaman Cepat mengakses {selectedPermission.name.toLowerCase()} Anda?
                  </h3>
                  <p className="text-[11px] text-[#526D82]">
                    Izin sistem: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">{selectedPermission.technicalName}</code>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setPermissionChoice("allowed")}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-[#27374D] text-white hover:bg-[#1E293B] cursor-pointer"
                  >
                    Izinkan
                  </button>
                  <button
                    onClick={() => setPermissionChoice("denied")}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    Jangan Izinkan
                  </button>
                </div>
              </div>

              {/* Umpan Balik Simulasi */}
              {permissionChoice && (
                <div className="mt-4 w-full max-w-md rounded-xl p-4 text-xs space-y-2 border animate-fadeIn bg-white">
                  <div className="flex items-center gap-2 font-bold">
                    {selectedPermission.status === "forbidden" ? (
                      <span className="text-rose-700 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Status Regulator: DILARANG KERAS (POJK)
                      </span>
                    ) : (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4" />
                        Status Regulator: DIPERBOLEHKAN (CAMILAN)
                      </span>
                    )}
                  </div>
                  <p className="text-[#27374D] leading-relaxed">
                    {selectedPermission.explanation}
                  </p>
                  <p className="text-rose-950 bg-rose-50 p-2 rounded-lg leading-relaxed">
                    <strong>Risiko jika diberikan:</strong> {selectedPermission.riskIfGranted}
                  </p>
                  <p className="text-[11px] text-[#526D82] italic">
                    {selectedPermission.legalContext}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SEKSI 2: PERBANDINGAN LEGAL VS ILEGAL */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
                <Scale className="h-3.5 w-3.5 text-[#27374D]" />
                Pedoman Komparasi
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
                Perbedaan Fintech Berizin OJK vs Pinjol Ilegal
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Pahami poin-poin krusial sebelum memutuskan mengajukan pendanaan digital.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-3 px-3 font-black text-[#27374D] w-1/4">Aspek</th>
                    <th className="py-3 px-3 font-black text-emerald-800 bg-emerald-50/50 w-3/8 rounded-t-lg">
                      Fintech Berizin OJK (Sah)
                    </th>
                    <th className="py-3 px-3 font-black text-rose-800 bg-rose-50/50 w-3/8 rounded-t-lg">
                      Pinjol Ilegal (Tanpa Izin)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.comparisonTable.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-[#27374D]">{item.feature}</td>
                      <td className="py-3 px-3 text-slate-700 bg-emerald-50/20 leading-relaxed">
                        {item.legalFintech}
                      </td>
                      <td className="py-3 px-3 text-rose-950 bg-rose-50/20 leading-relaxed font-medium">
                        {item.illegalPinjol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SEKSI 3: DUA POLA PERJALANAN KORBAN & TITIK KELUAR AMAN */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
                <AlertTriangle className="h-3.5 w-3.5 text-[#27374D]" />
                Dua Pola Kejadian Nyata
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
                Alur Jebakan & Titik Keluar Aman (Safe Exit)
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Pelajari alur agar kamu tahu persis kapan harus berhenti sebelum terlambat.
              </p>
            </div>

            <div className="space-y-6">
              {data.scenarios.map((scen) => (
                <div
                  key={scen.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#27374D] flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-[#27374D] text-white text-xs flex items-center justify-center font-black">
                        {scen.id === "pola_a" ? "A" : "B"}
                      </span>
                      {scen.title}
                    </h3>
                    <p className="text-xs text-[#526D82]">{scen.description}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {scen.steps.map((st) => (
                      <div
                        key={st.order}
                        className="rounded-xl bg-white p-4 border border-slate-200 space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#27374D]">
                            Tahap {st.order}: {st.phase}
                          </span>
                        </div>
                        <p className="text-xs text-[#526D82] leading-relaxed">{st.description}</p>
                        <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg leading-relaxed">
                          🛡️ {st.safeExitPoint}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEKSI 4: CEK SEBELUM PINJAM (OFFLINE CHECKER 100% LOKAL) */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-[#27374D]" />
                Alat Mandiri
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
                Pemeriksa 3 Langkah: Cek Sebelum Mengajukan
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Pemeriksaan ini berjalan 100% lokal di browsermu tanpa menyimpan nama aplikasi atau mengirim data apa pun ke server.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Langkah 1 */}
              <div className="rounded-2xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
                <span className="text-[11px] font-black text-[#526D82] uppercase">1. Izin Perangkat</span>
                <p className="text-xs font-bold text-[#27374D]">Izin apa saja yang diminta aplikasi?</p>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="perm_check"
                      checked={checkPerms === "camilan_only"}
                      onChange={() => setCheckPerms("camilan_only")}
                      className="text-[#27374D]"
                    />
                    <span>Hanya Kamera / Lokasi</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-rose-700 font-semibold">
                    <input
                      type="radio"
                      name="perm_check"
                      checked={checkPerms === "has_contacts"}
                      onChange={() => setCheckPerms("has_contacts")}
                      className="text-[#27374D]"
                    />
                    <span>Meminta Kontak / Galeri</span>
                  </label>
                </div>
              </div>

              {/* Langkah 2 */}
              <div className="rounded-2xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
                <span className="text-[11px] font-black text-[#526D82] uppercase">2. Status OJK</span>
                <p className="text-xs font-bold text-[#27374D]">Sudah cek di WhatsApp / Situs OJK?</p>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ojk_check"
                      checked={checkOjk === "verified"}
                      onChange={() => setCheckOjk("verified")}
                      className="text-[#27374D]"
                    />
                    <span>Terdaftar & Berizin Resmi</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-amber-700 font-semibold">
                    <input
                      type="radio"
                      name="ojk_check"
                      checked={checkOjk === "not_verified"}
                      onChange={() => setCheckOjk("not_verified")}
                      className="text-[#27374D]"
                    />
                    <span>Belum Dicek / Tidak Ditemukan</span>
                  </label>
                </div>
              </div>

              {/* Langkah 3 */}
              <div className="rounded-2xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
                <span className="text-[11px] font-black text-[#526D82] uppercase">3. Biaya & Tenor</span>
                <p className="text-xs font-bold text-[#27374D]">Apakah seluruh biaya transparan?</p>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cost_check"
                      checked={checkCost === "transparent"}
                      onChange={() => setCheckCost("transparent")}
                      className="text-[#27374D]"
                    />
                    <span>Bunga & Tenor Jelas di Awal</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-rose-700 font-semibold">
                    <input
                      type="radio"
                      name="cost_check"
                      checked={checkCost === "hidden_fees"}
                      onChange={() => setCheckCost("hidden_fees")}
                      className="text-[#27374D]"
                    />
                    <span>Ada Potongan Besar / Tenor Singkat</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Hasil Evaluasi Pemeriksa */}
            {checkerResult && (
              <div
                className={`rounded-2xl p-5 border text-xs space-y-2 animate-fadeIn ${
                  checkerResult.level === "danger"
                    ? "bg-rose-50 border-rose-300 text-rose-950"
                    : checkerResult.level === "warning"
                    ? "bg-amber-50 border-amber-300 text-amber-950"
                    : "bg-emerald-50 border-emerald-300 text-emerald-950"
                }`}
              >
                <div className="flex items-center gap-2 font-black text-sm">
                  {checkerResult.level === "danger" && <AlertTriangle className="h-4 w-4 text-rose-600" />}
                  {checkerResult.level === "warning" && <Info className="h-4 w-4 text-amber-600" />}
                  {checkerResult.level === "success" && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
                  <span>{checkerResult.title}</span>
                </div>
                <p className="leading-relaxed">{checkerResult.desc}</p>
                <p className="text-[11px] opacity-80 pt-1">
                  Catatan: Tidak adanya tanda bahaya bukan jaminan mutlak aplikasi aman. Tetap teliti membaca perjanjian.
                </p>
              </div>
            )}
          </section>

          {/* SEKSI 5: WASPADA PENCURIAN IDENTITAS (SLIK OJK) */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#27374D] flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              {data.whyTargetPersonalData.slikGuide.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
              {data.whyTargetPersonalData.slikGuide.description}
            </p>
            <div className="space-y-2 pt-2">
              {data.whyTargetPersonalData.slikGuide.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#27374D]">
                  <span className="h-5 w-5 rounded-full bg-[#DDE6ED] font-bold text-[11px] flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{st}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 italic">
              {data.whyTargetPersonalData.slikGuide.verificationNote}
            </p>
          </section>

          {/* SEKSI 6: KUIS "PINJOL LEGAL ATAU MENCURIGAKAN?" */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
                <HelpCircle className="h-3.5 w-3.5 text-[#27374D]" />
                Latihan Refleks
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
                Kuis: Pinjol Legal atau Mencurigakan?
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Uji kemampuan analisismu terhadap 4 skenario pinjaman online berikut.
              </p>
            </div>

            <div className="space-y-5">
              {data.quizList.map((q, idx) => (
                <div key={q.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3 bg-slate-50/50">
                  <p className="text-xs sm:text-sm font-bold text-[#27374D]">
                    {idx + 1}. {q.scenario}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      const isCorrect = optIdx === q.correctAnswerIndex;
                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                          className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            quizSubmitted
                              ? isCorrect
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                                : isSelected
                                ? "bg-rose-50 border-rose-300 text-rose-950"
                                : "bg-white border-slate-200 text-slate-600 opacity-60"
                              : isSelected
                              ? "bg-[#27374D] border-[#27374D] text-white"
                              : "bg-white border-slate-200 text-[#27374D] hover:bg-slate-100"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="text-xs p-3 rounded-xl bg-white border border-slate-200 text-[#526D82] leading-relaxed">
                      💡 <strong>Penjelasan:</strong> {q.options[q.correctAnswerIndex].explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < data.quizList.length}
                  className="px-5 py-2.5 rounded-xl bg-[#27374D] text-white text-xs font-bold hover:bg-[#1E293B] disabled:opacity-50 cursor-pointer"
                >
                  Periksa Jawaban Kuis
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#27374D] hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Ulangi Kuis
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      {/* KONTEN TAB 2: AKU SEDANG DITEROR (PANEL DARURAT TERSTRUKTUR) */}
      {activeTab === "terror" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Empati & Ketenangan */}
          <section className="rounded-3xl border border-rose-300/80 bg-rose-50/70 p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-rose-800 text-xs font-black tracking-wide uppercase">
              <ShieldAlert className="h-4 w-4 text-rose-700" />
              <span>{data.emergencyTerrorPanel.headline}</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-rose-950 leading-relaxed">
              {data.emergencyTerrorPanel.calmMessage}
            </p>
          </section>

          {/* 5 Langkah Tenang Menghadapi Teror */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
              5 Langkah Proteksi Menghadapi Penagihan Ilegal
            </h2>

            <div className="space-y-4">
              {data.emergencyTerrorPanel.steps.map((st) => (
                <div
                  key={st.order}
                  className="rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 bg-slate-50/40"
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-[#27374D]">
                    <span className="h-6 w-6 rounded-full bg-rose-700 text-white text-xs flex items-center justify-center font-black">
                      {st.order}
                    </span>
                    <span>{st.title}</span>
                  </div>
                  <p className="text-xs text-[#526D82] leading-relaxed pl-8">{st.desc}</p>
                  {st.caution && (
                    <div className="ml-8 text-[11px] font-semibold text-rose-800 bg-rose-50 p-2 rounded-lg">
                      ⚠️ {st.caution}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* TEMPLAT PESAN SIAP SALIN */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#526D82] uppercase tracking-wider">
                <Copy className="h-3.5 w-3.5 text-[#27374D]" />
                Templat Siap Salin
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#27374D]">
                Kirim Pesan Klarifikasi & Buat Kerangka Laporan
              </h2>
              <p className="text-xs sm:text-sm text-[#526D82]">
                Salin teks di bawah untuk meredam kekhawatiran kontak ponselmu atau melapor ke OJK.
              </p>
            </div>

            <div className="space-y-5">
              {data.emergencyTerrorPanel.messageTemplates.map((tpl) => (
                <div key={tpl.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#27374D] block">{tpl.target}</span>
                      <span className="text-[11px] text-[#526D82]">{tpl.purpose}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(tpl.templateText, tpl.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 text-[#27374D] hover:bg-slate-100 cursor-pointer shadow-xs"
                      aria-live="polite"
                    >
                      {copiedTemplateId === tpl.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Salin Teks</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-[#27374D] font-sans whitespace-pre-wrap leading-relaxed select-all">
                    {tpl.templateText}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* KONTAK RESMI SATGAS PASTI & OJK */}
          <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#27374D]">Kanal Pengaduan Resmi (Satgas PASTI / OJK)</h2>
            <p className="text-xs text-[#526D82]">
              Hubungi kanal resmi di bawah. Hindari mencari kontak call center lewat mesin pencari yang rentan iklan palsu.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {data.officialContacts.map((ct, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 p-4 space-y-2 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#27374D]">{ct.channel}</span>
                    <button
                      onClick={() => handleCopyContact(ct.value)}
                      className="text-[11px] text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedContactVal === ct.value ? "Tersalin!" : "Salin"}
                    </button>
                  </div>
                  <div className="text-sm font-black text-[#27374D]">{ct.value}</div>
                  <p className="text-[11px] text-[#526D82]">{ct.description}</p>
                  <p className="text-[10px] text-slate-400 italic">{ct.verificationNote}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* CHECKLIST PRAKTIS & PENYELESAIAN MODUL */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#27374D]">Checklist Praktis Tindakan Nyata</h2>
            <p className="text-xs text-[#526D82]">
              Centang langkah perlindungan yang siap atau sudah kamu terapkan ({allChecklistDone}/4 langkah)
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-[#27374D]">
            {Math.round((allChecklistDone / 4) * 100)}%
          </span>
        </div>

        <div className="space-y-3">
          {[
            { id: "chk1", label: "Periksa status izin fintech di WhatsApp resmi OJK 081-157-157-157 sebelum mengunduh." },
            { id: "chk2", label: "Tolak & uninstall aplikasi pinjol yang meminta akses kontak, galeri foto, atau SMS." },
            { id: "chk3", label: "Jika ditransfer sepihak, jangan gunakan dan jangan transfer ke rekening liar penagih." },
            { id: "chk4", label: "Simpan templat klarifikasi keluarga jika datamu disalahgunakan untuk menagih." },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer text-xs font-medium text-[#27374D]"
            >
              <input
                type="checkbox"
                checked={checkedItems[item.id] || false}
                onChange={(e) => setCheckedItems((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                className="mt-0.5 rounded text-[#27374D] focus:ring-[#27374D]"
              />
              <span className="leading-relaxed">{item.label}</span>
            </label>
          ))}
        </div>

        {/* CTA Utama & Selesai Modul */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/simulasi?skenario=pinjol"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#27374D] text-white text-xs font-bold hover:bg-[#1E293B] transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Uji Kasus di Simulator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={handleComplete}
            disabled={effectiveIsCompleted}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              effectiveIsCompleted
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
            }`}
          >
            <Check className="h-4 w-4" />
            <span>{effectiveIsCompleted ? "Modul Selesai Dibaca" : "Tandai Modul Selesai"}</span>
          </button>
        </div>
      </section>

      {/* TAUTAN ANTARMODUL & PUSAT DARURAT */}
      <section className="rounded-3xl border border-[#9DB2BF]/50 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#27374D] uppercase tracking-wider">Modul Terkait Lainnya</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <Link
            to="/belajar?modul=m11&jalur=pinjol"
            className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-950 font-bold transition-all flex items-center justify-between"
          >
            <span>🚨 Butuh Bantuan Darurat? Buka Pusat Darurat (m11)</span>
            <ArrowRight className="h-4 w-4 text-rose-600" />
          </Link>
          <Link
            to="/belajar?modul=m8"
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#27374D] font-bold transition-all flex items-center justify-between"
          >
            <span>📊 Pola Modus Penipuan Terbanyak di Indonesia (m8)</span>
            <ChevronRight className="h-4 w-4 text-[#526D82]" />
          </Link>
          <Link
            to="/belajar?modul=m2"
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#27374D] font-bold transition-all flex items-center justify-between"
          >
            <span>🧠 Anatomi Sebuah Penipuan (m2)</span>
            <ChevronRight className="h-4 w-4 text-[#526D82]" />
          </Link>
          <Link
            to="/belajar?modul=m9"
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#27374D] font-bold transition-all flex items-center justify-between"
          >
            <span>📱 Pola Penipuan QRIS & E-Wallet (m9)</span>
            <ChevronRight className="h-4 w-4 text-[#526D82]" />
          </Link>
        </div>
      </section>

      {/* FOOTER SUMBER & DISCLAIMER */}
      <footer className="text-xs text-[#526D82] space-y-3 pt-4 border-t border-[#9DB2BF]/30">
        <p className="leading-relaxed">{data.disclaimer}</p>
        <div className="space-y-1">
          <span className="font-bold text-[#27374D]">Sumber Resmi:</span>
          {data.sources.map((src, i) => (
            <p key={i} className="text-[11px]">
              • {src.agency} — <em>{src.title}</em> (Periode: {src.asOf})
            </p>
          ))}
          <p className="text-[11px] text-slate-400">
            Terakhir diperbarui: {data.lastUpdated} · JagaRuang Literasi Keuangan Digital
          </p>
        </div>
      </footer>
    </div>
  );
}
