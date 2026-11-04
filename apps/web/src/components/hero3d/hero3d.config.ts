// hero3d.config.ts - Centralized configuration for Hero 3D iPhone & Orbit Scene
// All visual parameters, speeds, dimensions, and colors are gathered here for easy tuning.

export const HERO_3D_CONFIG = {
  // 1. PALET WARNA (Sesuai Design System JagaRuang: Slate, Emerald, Red)
  colors: {
    // Titanium natural frame (iPhone 15/16 Pro style)
    titaniumFrame: "#8D96A0",
    titaniumDark: "#475569",
    // Screen glass
    screenGlass: "#0A0D14",
    screenBezel: "#07090E",
    // Back matte frosted glass
    backGlass: "#27374D",
    cameraPlateau: "#1E293B",
    cameraLensRing: "#94A3B8",
    cameraLensGlass: "#0F172A",
    // Orbit ring
    orbitRing: "#9DB2BF",
    orbitEmissive: "#526D82",
    orbitParticle: "#DDE6ED",
    orbitParticleGlow: "#10B981", // Emerald accent
    // UI Accents
    accentEmerald: "#059669",
    accentEmeraldBg: "#ECFDF5",
    accentRed: "#DC2626",
    accentRedBg: "#FEF2F2",
    slateFont: "#27374D",
    slateSubtext: "#526D82",
  },

  // 2. DIMENSI MODEL (Procedural iPhone Pro 3D Units)
  dimensions: {
    phoneWidth: 2.2,
    phoneHeight: 4.4,
    phoneDepth: 0.22,
    cornerRadius: 0.24,
    screenWidth: 2.06,
    screenHeight: 4.26,
    screenRadius: 0.2,
    orbitRadius: 2.7,
    orbitTubeRadius: 0.016,
    particleRadius: 0.065,
  },

  // 3. ANIMASI & INTERAKSI
  animation: {
    // Drei Float parameters
    floatSpeed: 1.6, // Kecepatan osilasi vertikal
    floatIntensity: 0.45, // Jarak ayunan mengambang
    rotationIntensity: 0.2, // Ayunan rotasi mengambang
    floatingRange: [-0.08, 0.08] as [number, number],
    // Cursor Tilt (Maksimal ~12-15 derajat = 0.22 - 0.26 radian)
    maxTiltX: 0.22,
    maxTiltY: 0.26,
    tiltDamping: 0.08, // Kehalusan transisi kursor (lerp)
    // Orbit speed
    ringRotationSpeed: 0.06, // Rotasi pelan cincin
    particleSpeed: 0.85, // Kecepatan partikel melintasi cincin
  },

  // 4. PENCAHAYAAN (LIGHTING & SHADOWS)
  lighting: {
    ambientIntensity: 0.7,
    directionalIntensity: 1.8,
    directionalPos: [4, 6, 4] as [number, number, number],
    fillLightIntensity: 0.6,
    fillLightPos: [-4, 2, 2] as [number, number, number],
    contactShadowOpacity: 0.45,
    contactShadowBlur: 2.4,
  },

  // 5. KAMERA & PERSPEKTIF
  camera: {
    fov: 38, // FOV lebih kecil untuk look profesional tanpa distorsi fish-eye
    position: [0, 0, 8.4] as [number, number, number],
    near: 0.1,
    far: 50,
  },

  // 6. RESPONSIVE SCALE
  responsive: {
    desktopScale: 1.0,
    tabletScale: 0.88,
    mobileScale: 0.74,
  },
} as const;

export type Hero3DConfig = typeof HERO_3D_CONFIG;

