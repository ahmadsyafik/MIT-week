import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HERO_3D_CONFIG } from "./hero3d.config";
import { HeroScene } from "./HeroScene";
import { Hero3DFallback } from "./Hero3DFallback";

/**
 * Hero3DCanvas Component
 * Wrapper R3F Canvas utama dengan optimasi performa tinggi:
 * - IntersectionObserver: Auto-pause rendering saat canvas di luar viewport
 * - Tab visibility listener: Auto-pause saat tab browser tidak aktif
 * - WebGL availability check dengan graceful fallback
 * - Anti-aliasing, tone mapping ACESFilmic, dan dpr=[1, 2]
 * - aria-hidden="true" untuk aksesibilitas screen reader
 */
export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // 1. Cek Ketersediaan WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // 2. Deteksi Ukuran Layar Mobile (< 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3. IntersectionObserver & Tab Visibility (Auto-Pause Render Saat Tidak Terlihat)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Viewport Visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Tab Visibility (document.hidden)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        // Cek kembali posisi scroll saat tab aktif
        if (container) {
          const rect = container.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(inView);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Jika perangkat tidak mendukung WebGL
  if (!hasWebGL) {
    return <Hero3DFallback />;
  }

  const { camera } = HERO_3D_CONFIG;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center select-none"
      style={{ overflow: "visible", isolation: "isolate" }}
      aria-hidden="true"
    >
      <Suspense fallback={<Hero3DFallback />}>
        <Canvas
          frameloop={isVisible ? "always" : "never"} // Pause total saat di luar layar
          camera={{
            position: camera.position,
            fov: camera.fov,
            near: camera.near,
            far: camera.far,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.18,
          }}
          className="!w-full !h-full !overflow-visible"
          style={{ background: "transparent" }}
        >
          <HeroScene isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
