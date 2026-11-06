// hero3d.config.ts - Centralized configuration for Hero 3D iPhone & Orbit Scene
// All visual parameters, speeds, dimensions, and colors are gathered here for easy tuning.

export const HERO_3D_CONFIG = {
  // 1. FEATURE TOGGLES
  features: {
    enableFloatingCards: true, // Toggle 2 kartu notifikasi melayang
    enableParticle: true,      // Toggle SATU partikel emerald glow pada cincin
  },

  // 2. PALET WARNA (Titanium Natural, Slate-50 / DDE6ED Screen, Emerald & Red Accents)
  colors: {
    // Midnight Space Black Frame (sesuai mockup UI ponsel JagaRuang #0E1726)
    titaniumFrame: "#0E1726",
    titaniumHighlight: "#223763",
    titaniumDark: "#080D15",
    // Screen (F3F5F8 latar bersih dashboard mockup)
    screenBg: "#F3F5F8",
    screenBezel: "#080D15",
    // Back matte frosted glass
    backGlass: "#0E1726",
    cameraPlateau: "#080D15",
    cameraLensRing: "#27374D",
    cameraLensGlass: "#050910",
    // Orbit ring (Slate kebiruan berdimensi 3D)
    orbitRing: "#7E92A2",
    orbitEmissive: "#3B4E5E",
    orbitParticle: "#D1FAE5",
    orbitParticleGlow: "#10B981",  // Emerald Glow
    // UI Accents
    accentEmerald: "#059669",
    accentEmeraldBg: "#ECFDF5",
    accentEmeraldBorder: "#A7F3D0",
    accentRed: "#DC2626",
    accentRedBg: "#FEF2F2",
    accentRedBorder: "#FECACA",
    slateFont: "#27374D",
    slateSubtext: "#526D82",
    slateBorder: "#9DB2BF",
  },

  // 3. DIMENSI MODEL (Ketebalan Z Ditingkatkan 0.30 & Lebar Layar Maksimal)
  dimensions: {
    phoneWidth: 2.18,  // Skala relatif
    phoneHeight: 4.58,
    phoneDepth: 0.30,  // Dimajukan Z-depth agar tampak lebih tebal dan berisi
    cornerRadius: 0.44, // Radius besar untuk sudut membulat iPhone
    screenWidth: 2.04,  // Bezel 0.07 per sisi
    screenHeight: 4.44, // Bezel 0.07 atas/bawah
    screenRadius: 0.40, // Mengikuti kelengkungan body
    // Cincin Orbit
    orbitRadius: 1.68,
    orbitTubeRadius: 0.022,
    particleRadius: 0.055,
  },

  // 4. ANIMASI & GERAK TENANG
  animation: {
    floatSpeed: 1.2,
    floatIntensity: 0.35,
    rotationIntensity: 0.12,
    floatingRange: [-0.06, 0.06] as [number, number],
    // Pose awal (HP miring ~ -8 derajat di sumbu Y)
    initialRotationY: -0.14,
    initialRotationX: 0.04,
    maxTiltX: 0.22,
    maxTiltY: 0.25,
    tiltDamping: 0.07,
    ringRotationSpeed: 0.13,
    particleSpeed: 0.75,
    entranceInitialScale: 0.92,
  },

  // 5. PENCAHAYAAN & SHADOWS
  lighting: {
    ambientIntensity: 0.85,
    directionalIntensity: 1.9,
    directionalPos: [4, 6, 4] as [number, number, number],
    fillLightIntensity: 0.6,
    fillLightPos: [-4, 2, 2] as [number, number, number],
    rimLightIntensity: 1.6,
    rimLightPos: [5, 5, -3] as [number, number, number],
    rimLightColor: "#C5D3E0",
    contactShadowOpacity: 0.35,
    contactShadowBlur: 2.2,
  },

  // 6. KAMERA & PERSPEKTIF
  camera: {
    fov: 38,
    position: [0, 0, 8.0] as [number, number, number],
    near: 0.1,
    far: 50,
  },

  // 7. RESPONSIVE SCALE
  responsive: {
    desktopScale: 1.0,
    tabletScale: 0.88,
    mobileScale: 0.75,
  },
} as const;

export type Hero3DConfig = typeof HERO_3D_CONFIG;
