import { lazy, Suspense } from "react";
import { Hero3DFallback } from "./hero3d/Hero3DFallback";

// Lazy load komponen Hero3D Canvas untuk optimasi code splitting & TTFB
const Hero3DCanvas = lazy(() => import("./hero3d/Hero3DCanvas"));

/**
 * ThreeHeroCanvas
 * Drop-in replacement yang mengintegrasikan komposisi baru:
 * "iPhone sebagai hero, orbit sebagai aksesori halus"
 * menggunakan React Three Fiber (R3F) & Drei.
 */
export default function ThreeHeroCanvas() {
  return (
    <Suspense fallback={<Hero3DFallback />}>
      <Hero3DCanvas />
    </Suspense>
  );
}
