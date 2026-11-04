import { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ShieldCheck, AlertTriangle, KeyRound } from "lucide-react";

interface FloatingCardsProps {
  reducedMotion?: boolean;
}

/**
 * Floating Parallax Notification Cards
 * 3 kartu notifikasi kecil yang melayang di sekitar HP dengan kedalaman z dan parallax berbeda:
 * 1. Hijau (Kiri Atas / Depan): Tautan Terverifikasi
 * 2. Merah (Kanan Bawah / Depan): Peringatan Berkas .apk
 * 3. Slate-Biru (Kanan Atas / Belakang): Sandi Keluarga Aktif
 */
function FloatingCardsComponent({ reducedMotion = false }: FloatingCardsProps) {
  const card1Ref = useRef<THREE.Group>(null);
  const card2Ref = useRef<THREE.Group>(null);
  const card3Ref = useRef<THREE.Group>(null);

  // Parallax / osilasi halus dengan fase berbeda per kartu
  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    // Kartu 1 (Kiri Atas): osilasi pelan fase 0
    if (card1Ref.current) {
      card1Ref.current.position.y = 1.45 + Math.sin(t * 1.5) * 0.08;
      card1Ref.current.rotation.z = Math.sin(t * 1.2) * 0.03;
    }

    // Kartu 2 (Kanan Bawah): osilasi fase berlawanan
    if (card2Ref.current) {
      card2Ref.current.position.y = -1.35 + Math.cos(t * 1.4) * 0.08;
      card2Ref.current.rotation.z = -Math.cos(t * 1.1) * 0.03;
    }

    // Kartu 3 (Kanan Atas): osilasi lebih pelan di layer belakang
    if (card3Ref.current) {
      card3Ref.current.position.y = 1.65 + Math.sin(t * 1.1 + 1.5) * 0.06;
    }
  });

  return (
    <group>
      {/* =================================================================== */}
      {/* 1. KARTU HIJAU (Kiri Atas / Depan z: 0.7)                           */}
      {/* =================================================================== */}
      <group ref={card1Ref} position={[-2.35, 1.45, 0.7]} rotation={[0.05, 0.18, -0.04]}>
        <Html
          transform
          scale={0.009}
          distanceFactor={7.5}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="flex items-center gap-2.5 rounded-2xl border-2 border-emerald-400 bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur-md select-none w-[205px]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shadow-2xs">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-[#27374D]">Tautan Aman</span>
                <span className="rounded bg-emerald-600 px-1.5 py-0.2 text-[8px] font-extrabold text-white">
                  0 Red Flag
                </span>
              </div>
              <p className="text-[9.5px] font-semibold text-[#526D82] truncate">
                Domain resmi terverifikasi
              </p>
            </div>
          </div>
        </Html>
      </group>

      {/* =================================================================== */}
      {/* 2. KARTU MERAH (Kanan Bawah / Depan z: 0.85)                         */}
      {/* =================================================================== */}
      <group ref={card2Ref} position={[2.25, -1.35, 0.85]} rotation={[-0.04, -0.16, 0.04]}>
        <Html
          transform
          scale={0.009}
          distanceFactor={7.5}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="flex items-center gap-2.5 rounded-2xl border-2 border-rose-400 bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur-md select-none w-[215px]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 shadow-2xs">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-[#27374D]">Peringatan Berkas</span>
                <span className="rounded bg-rose-600 px-1.5 py-0.2 text-[8px] font-extrabold text-white">
                  Waspada
                </span>
              </div>
              <p className="text-[9.5px] font-semibold text-rose-800 truncate">
                Ekstensi ganda .pdf.apk
              </p>
            </div>
          </div>
        </Html>
      </group>

      {/* =================================================================== */}
      {/* 3. KARTU SLATE-BIRU (Kanan Atas / Belakang z: -0.45)                */}
      {/* =================================================================== */}
      <group ref={card3Ref} position={[2.2, 1.65, -0.45]} rotation={[0.08, -0.14, -0.02]}>
        <Html
          transform
          scale={0.0085}
          distanceFactor={7.5}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="flex items-center gap-2.5 rounded-2xl border border-[#9DB2BF]/70 bg-white/90 px-3.5 py-2.5 shadow-md backdrop-blur-md select-none w-[195px]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#DDE6ED] text-[#27374D] shadow-2xs">
              <KeyRound className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-[#27374D]">Sandi Keluarga</span>
                <span className="rounded bg-[#526D82] px-1.5 py-0.2 text-[8px] font-extrabold text-white">
                  Aktif
                </span>
              </div>
              <p className="text-[9.5px] font-semibold text-[#526D82] truncate">
                Verifikasi darurat siap
              </p>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

export const FloatingCards = memo(FloatingCardsComponent);

