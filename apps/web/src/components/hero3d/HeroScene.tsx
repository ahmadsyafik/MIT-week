import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { IPhone } from "./IPhone";
import { Orbit } from "./Orbit";
import { FloatingCards } from "./FloatingCards";
import { HERO_3D_CONFIG } from "./hero3d.config";

interface HeroSceneProps {
  isMobile?: boolean;
}

/**
 * Hero 3D Scene Composition (Optimized for low INP & high FPS)
 * - Float pelan & tenang
 * - Damping kursor mouse yang ringan tanpa membebani main thread
 * - Menggunakan direct light tanpa render-texture/lightformer berat untuk menjaga INP tetap rendah
 */
export function HeroScene({ isMobile = false }: HeroSceneProps) {
  const { animation, lighting, responsive } = HERO_3D_CONFIG;

  const tiltGroupRef = useRef<THREE.Group>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entranceScale, setEntranceScale] = useState<number>(animation.entranceInitialScale);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const target = isMobile ? responsive.mobileScale : responsive.desktopScale;
    const timer = setTimeout(() => setEntranceScale(target), 30);
    return () => clearTimeout(timer);
  }, [isMobile, responsive.desktopScale, responsive.mobileScale]);

  // Tilt interaktif dengan lerp ringan
  useFrame((state, delta) => {
    if (!tiltGroupRef.current) return;

    if (reducedMotion || isMobile) {
      tiltGroupRef.current.rotation.x = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.x,
        animation.initialRotationX,
        4,
        delta
      );
      tiltGroupRef.current.rotation.y = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.y,
        animation.initialRotationY,
        4,
        delta
      );
      return;
    }

    const targetX = animation.initialRotationX - state.pointer.y * animation.maxTiltX;
    const targetY = animation.initialRotationY + state.pointer.x * animation.maxTiltY;

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

  return (
    <>
      {/* 1. Pencahayaan Efisien (Tanpa Lightformer berat) */}
      <ambientLight intensity={lighting.ambientIntensity} />
      <directionalLight
        position={lighting.directionalPos}
        intensity={lighting.directionalIntensity}
      />
      <directionalLight
        position={lighting.fillLightPos}
        intensity={lighting.fillLightIntensity}
        color="#9DB2BF"
      />
      <directionalLight
        position={lighting.rimLightPos}
        intensity={lighting.rimLightIntensity}
        color={lighting.rimLightColor}
      />

      {/* 2. Group Utama Hero Float */}
      <Float
        speed={reducedMotion ? 0 : animation.floatSpeed}
        rotationIntensity={reducedMotion ? 0 : animation.rotationIntensity}
        floatIntensity={reducedMotion ? 0 : animation.floatIntensity}
        floatingRange={animation.floatingRange}
      >
        <group
          ref={tiltGroupRef}
          position={[0, 0.08, 0]}
          rotation={[animation.initialRotationX, animation.initialRotationY, 0]}
          scale={entranceScale}
        >
          {/* IPhone Pro Hero */}
          <IPhone scale={1.0} />

          {/* Cincin Orbit */}
          <Orbit reducedMotion={reducedMotion} />

          {/* Kartu Notifikasi */}
          <FloatingCards reducedMotion={reducedMotion} />
        </group>
      </Float>

      {/* 3. Bayangan Kontak di Bawah HP */}
      <ContactShadows
        position={[0, -2.55, 0]}
        opacity={lighting.contactShadowOpacity}
        scale={6.0}
        blur={lighting.contactShadowBlur}
        far={4.0}
        color="#27374D"
      />
    </>
  );
}
