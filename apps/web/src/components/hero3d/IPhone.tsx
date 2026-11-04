import { memo } from "react";
import { RoundedBox, Html } from "@react-three/drei";
import { ShieldCheck, AlertTriangle, Shield, CheckCircle2, Wifi, Battery } from "lucide-react";
import { HERO_3D_CONFIG } from "./hero3d.config";

interface IPhoneProps {
  scale?: number;
}

/**
 * Procedural iPhone 15/16 Pro 3D Model
 * Dibuat murni prosedural menggunakan Three.js geometries tanpa aset eksternal.
 * Menampilkan frame titanium, dynamic island, 3 kamera pro, serta layar HTML ultra-tajam.
 */
function IPhoneComponent({ scale = 1 }: IPhoneProps) {
  const { colors, dimensions } = HERO_3D_CONFIG;

  return (
    <group scale={scale}>
      {/* =================================================================== */}
      {/* 1. FRAME & CHASSIS TITANIUM (RoundedBox Utama)                      */}
      {/* =================================================================== */}
      <RoundedBox
        args={[dimensions.phoneWidth, dimensions.phoneHeight, dimensions.phoneDepth]}
        radius={dimensions.cornerRadius}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={colors.titaniumFrame}
          metalness={0.96}
          roughness={0.26}
          envMapIntensity={1.4}
        />
      </RoundedBox>

      {/* =================================================================== */}
      {/* 2. LAYAR DEPAN (Front Glass & Thin Bezel)                          */}
      {/* =================================================================== */}
      <RoundedBox
        args={[dimensions.screenWidth, dimensions.screenHeight, 0.02]}
        radius={dimensions.screenRadius}
        smoothness={4}
        position={[0, 0, dimensions.phoneDepth / 2 + 0.002]}
      >
        <meshStandardMaterial
          color={colors.screenGlass}
          metalness={0.12}
          roughness={0.14}
          envMapIntensity={1.0}
        />
      </RoundedBox>

      {/* Dynamic Island Capsule (Hitam Pekat di Atas Layar) */}
      <mesh position={[0, dimensions.phoneHeight / 2 - 0.32, dimensions.phoneDepth / 2 + 0.015]}>
        <capsuleGeometry args={[0.065, 0.32, 8, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* =================================================================== */}
      {/* 3. TOMBOL SAMPING TITANIUM (Action Button, Volume, Power)          */}
      {/* =================================================================== */}
      {/* Sisi Kiri: Action Button */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.02, 1.25, 0]}>
        <boxGeometry args={[0.035, 0.16, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.95} roughness={0.25} />
      </mesh>
      {/* Sisi Kiri: Volume Up */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.02, 0.82, 0]}>
        <boxGeometry args={[0.035, 0.34, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.95} roughness={0.25} />
      </mesh>
      {/* Sisi Kiri: Volume Down */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.02, 0.38, 0]}>
        <boxGeometry args={[0.035, 0.34, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.95} roughness={0.25} />
      </mesh>
      {/* Sisi Kanan: Power / Side Button */}
      <mesh position={[dimensions.phoneWidth / 2 + 0.02, 0.65, 0]}>
        <boxGeometry args={[0.035, 0.48, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.95} roughness={0.25} />
      </mesh>

      {/* =================================================================== */}
      {/* 4. SISI BELAKANG: FROSTED GLASS & CAMERA ISLAND                    */}
      {/* =================================================================== */}
      {/* Frosted Glass Back Plate */}
      <RoundedBox
        args={[dimensions.screenWidth, dimensions.screenHeight, 0.02]}
        radius={dimensions.screenRadius}
        smoothness={4}
        position={[0, 0, -dimensions.phoneDepth / 2 - 0.002]}
      >
        <meshStandardMaterial
          color={colors.backGlass}
          metalness={0.25}
          roughness={0.42}
          envMapIntensity={0.8}
        />
      </RoundedBox>

      {/* Camera Plateau Island (Rounded Square Bump di Sudut Kiri Belakang) */}
      <group position={[-0.45, 1.35, -dimensions.phoneDepth / 2 - 0.032]}>
        <RoundedBox args={[0.96, 0.96, 0.05]} radius={0.2} smoothness={4}>
          <meshStandardMaterial
            color={colors.cameraPlateau}
            metalness={0.4}
            roughness={0.32}
            envMapIntensity={1.0}
          />
        </RoundedBox>

        {/* 3 Lensa Kamera Pro (Cylinder + Titanium Ring + Shiny Lens Glass) */}
        {/* Lensa 1: Kiri Atas */}
        <CameraLens position={[-0.22, 0.22, -0.032]} />
        {/* Lensa 2: Kiri Bawah */}
        <CameraLens position={[-0.22, -0.22, -0.032]} />
        {/* Lensa 3: Kanan Tengah */}
        <CameraLens position={[0.22, 0, -0.032]} />

        {/* Flash True Tone */}
        <mesh position={[0.22, 0.26, -0.026]}>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color="#FEF3C7" />
        </mesh>
        {/* LiDAR Scanner Dot */}
        <mesh position={[0.22, -0.26, -0.026]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 5. LAYAR HP: UI HTML DREI (<Html transform>)                       */}
      {/* Razor-sharp, kontras tinggi, typography jelas setara 11-12px final  */}
      {/* =================================================================== */}
      <Html
        transform
        position={[0, -0.02, dimensions.phoneDepth / 2 + 0.015]}
        scale={0.0076} // Skala 3D agar container 270px pas memenuhi layar
        distanceFactor={7.5}
        zIndexRange={[100, 0]}
        style={{
          width: "266px",
          height: "550px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div className="w-[266px] h-[550px] bg-white rounded-[32px] p-3.5 flex flex-col justify-between shadow-inner select-none font-sans text-left overflow-hidden border border-[#9DB2BF]/30">
          {/* Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-bold text-[#27374D] px-2 pt-1">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 text-[#526D82]">
              <Wifi className="h-3 w-3" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Header Aplikasi: JagaRuang Mobile */}
          <div className="flex items-center justify-between bg-[#DDE6ED]/60 border border-[#9DB2BF]/50 rounded-2xl p-2.5 mt-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#526D82] text-white shadow-xs">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-[#27374D] leading-tight">
                  JagaRuang Mobile
                </h3>
                <p className="text-[10px] font-semibold text-[#526D82]">
                  Proteksi Aktif On-Device
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Aktif
            </span>
          </div>

          {/* KONTEN UTAMA: 2 KARTU FOKUS (MERAH & HIJAU) */}
          <div className="space-y-2.5 my-auto">
            {/* 1. KARTU PERINGATAN MERAH (Fokus Ancaman APK Palsu) */}
            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/90 p-3 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-rose-700">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider">
                    Peringatan Kritis
                  </span>
                </div>
                <span className="rounded-md bg-rose-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                  .apk Terdeteksi
                </span>
              </div>

              <div className="rounded-xl bg-white/90 border border-rose-200 p-2 space-y-0.5">
                <p className="text-[11px] font-bold text-[#27374D] truncate">
                  Undangan_Pernikahan.apk
                </p>
                <p className="text-[10px] text-rose-800 leading-snug">
                  Indikasi manipulasi berkas untuk mencuri SMS OTP perbankan.
                </p>
              </div>

              <div className="flex items-center justify-between text-[9px] font-bold text-rose-800 pt-0.5">
                <span>Rekomendasi: Jangan Pasang</span>
                <span className="underline">Tolak Pesan</span>
              </div>
            </div>

            {/* 2. KARTU STATUS HIJAU (Fokus Tautan Terverifikasi) */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/90 p-3 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider">
                    Tautan Aman
                  </span>
                </div>
                <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                  Terverifikasi
                </span>
              </div>

              <div className="rounded-xl bg-white/90 border border-emerald-200 p-2 space-y-0.5">
                <p className="text-[11px] font-bold text-[#27374D] truncate">
                  https://jagaruang.id
                </p>
                <p className="text-[10px] text-emerald-800 leading-snug">
                  Struktur domain valid. Bebas dari manipulasi homograf & TLD asing.
                </p>
              </div>

              <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-800 pt-0.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                <span>Siap diakses dengan aman</span>
              </div>
            </div>
          </div>

          {/* Footer Bar Layar HP */}
          <div className="pt-1 border-t border-[#9DB2BF]/30 flex items-center justify-between text-[9px] font-semibold text-[#526D82] px-1 pb-1">
            <span>Privat On-Device</span>
            <div className="h-1 w-16 bg-[#27374D] rounded-full mx-auto" />
            <span>Tanpa Server Luar</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

/**
 * Sub-komponen Lensa Kamera Pro
 */
function CameraLens({ position }: { position: [number, number, number] }) {
  const { colors } = HERO_3D_CONFIG;

  return (
    <group position={position}>
      {/* Outer Titanium Collar */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
        <meshStandardMaterial
          color={colors.cameraLensRing}
          metalness={0.96}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Inner Black Bezel */}
      <mesh position={[0, 0, -0.012]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.042, 24]} />
        <meshBasicMaterial color="#0A0F1D" />
      </mesh>
      {/* Shiny Glass Element */}
      <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.044, 24]} />
        <meshStandardMaterial
          color={colors.cameraLensGlass}
          metalness={0.9}
          roughness={0.06}
          envMapIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

export const IPhone = memo(IPhoneComponent);

