import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { IPhone } from "./IPhone";
import { Orbit } from "./Orbit";
import { FloatingCards } from "./FloatingCards";
import { HERO_3D_CONFIG } from "./hero3d.config";

interface HeroSceneProps {
  isMobile?: boolean;
}

/**
 * Hero 3D Scene Composition
 * Mengintegrasikan iPhone Pro sebagai hero sentral, SATU cincin orbit halus,
 * dan 3 kartu notifikasi melayang dengan pencahayaan studio procedural dan contact shadows.
 */
export function HeroScene({ isMobile = false }: HeroSceneProps) {
  const { animation, lighting, responsive } = HERO_3D_CONFIG;

  const tiltGroupRef = useRef<THREE.Group>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entranceScale, setEntranceScale] = useState(0.85);

  // 1. Cek Preferensi Aksesibilitas (prefers-reduced-motion)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 2. Animasi Masuk (Entrance Animation: Scale dari 0.85 ke target)
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceScale(isMobile ? responsive.mobileScale : responsive.desktopScale);
    }, 40);
    return () => clearTimeout(timer);
  }, [isMobile, responsive.desktopScale, responsive.mobileScale]);

  // 3. Cursor Tilt Halus dengan Damping / Lerp (Maks ~15 Derajat)
  useFrame((state, delta) => {
    if (!tiltGroupRef.current) return;

    // Jika reduced motion aktif atau di perangkat mobile sentuh, gunakan pose statis elegan
    if (reducedMotion || isMobile) {
      tiltGroupRef.current.rotation.x = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.x,
        0.05,
        4,
        delta
      );
      tiltGroupRef.current.rotation.y = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.y,
        -0.12,
        4,
        delta
      );
      return;
    }

    // Hitung rotasi target dari posisi kursor (state.pointer range: -1 s.d. 1)
    const targetX = -state.pointer.y * animation.maxTiltX;
    const targetY = state.pointer.x * animation.maxTiltY;

    // Terapkan lerp damping halus
    tiltGroupRef.current.rotation.x = THREE.MathUtils.damp(
      tiltGroupRef.current.rotation.x,
      targetX,
      1 / animation.tiltDamping,
      delta
    );
    tiltGroupRef.current.rotation.y = THREE.MathUtils.damp(
      tiltGroupRef.current.rotation.y,
      targetY,
      1 / animation.tiltDamping,
      delta
    );
  });

  // Skala responsif keseluruhan
  const currentScale = isMobile ? responsive.mobileScale : responsive.desktopScale;

  return (
    <>
      {/* =================================================================== */}
      {/* 1. PENCAHAYAAN STUDIO & REFLEKSI PROCEDURAL (100% On-Device)        */}
      {/* Menggunakan Lightformer agar titanium memantulkan highlight tajam   */}
      {/* =================================================================== */}
      <ambientLight intensity={lighting.ambientIntensity} />
      <directionalLight
        position={lighting.directionalPos}
        intensity={lighting.directionalIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={lighting.fillLightPos}
        intensity={lighting.fillLightIntensity}
        color="#9DB2BF"
      />
      <pointLight position={[0, -2, -3]} intensity={0.4} color="#526D82" />

      {/* Procedural Environment Studio Reflections */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          {/* Softbox Utama Atas */}
          <Lightformer
            form="rect"
            intensity={3.5}
            position={[0, 6, -8]}
            scale={[12, 6, 1]}
            target={[0, 0, 0]}
          />
          {/* Rim Light Kiri */}
          <Lightformer
            form="rect"
            intensity={2}
            position={[-6, 2, -1]}
            scale={[10, 3, 1]}
            rotation-y={Math.PI / 2}
          />
          {/* Rim Light Kanan */}
          <Lightformer
            form="rect"
            intensity={2}
            position={[6, 2, -1]}
            scale={[10, 3, 1]}
            rotation-y={-Math.PI / 2}
          />
          {/* Ambient Glow Lingkaran Titanium */}
          <Lightformer
            form="ring"
            color="#DDE6ED"
            intensity={1.2}
            scale={6}
            position={[0, 4, 2]}
          />
        </group>
      </Environment>

      {/* =================================================================== */}
      {/* 2. GROUP UTAMA HERO DENGAN FLOAT & TILT INTERAKTIF                  */}
      {/* =================================================================== */}
      <Float
        speed={reducedMotion ? 0 : animation.floatSpeed}
        rotationIntensity={reducedMotion ? 0 : animation.rotationIntensity}
        floatIntensity={reducedMotion ? 0 : animation.floatIntensity}
        floatingRange={animation.floatingRange}
      >
        <group
          ref={tiltGroupRef}
          position={[0, 0.1, 0]}
          scale={entranceScale}
        >
          {/* IPHONE PRO HERO (Titik Pusat [0, 0, 0]) */}
          <IPhone scale={1.0} />

          {/* SATU CINCIN ORBIT (Titik Pusat Sama [0, 0, 0]) */}
          <Orbit reducedMotion={reducedMotion} />

          {/* KARTU NOTIFIKASI MELAYANG (Parallax Berbeda) */}
          <FloatingCards reducedMotion={reducedMotion} />
        </group>
      </Float>

      {/* =================================================================== */}
      {/* 3. BAYANGAN LEMBUT DI LANTAI (Grounding ContactShadows)             */}
      {/* =================================================================== */}
      <ContactShadows
        position={[0, -2.55, 0]}
        opacity={lighting.contactShadowOpacity}
        scale={7.5}
        blur={lighting.contactShadowBlur}
        far={4.5}
        color="#27374D"
      />
    </>
  );
}

