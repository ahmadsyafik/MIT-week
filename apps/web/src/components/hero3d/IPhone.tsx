import { useEffect, memo } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { HERO_3D_CONFIG } from "./hero3d.config";

interface IPhoneProps {
  scale?: number;
}

/**
 * Procedural iPhone 15/16 Pro 3D Model
 * - Frame Titanium Natural abu hangat dengan sudut membulat elegan (radius 0.44)
 * - Bezel tipis simetris di sekeliling layar
 * - Dynamic Island kapsul di status bar atas
 * - Tombol Action, Volume Up/Down, dan Power terpisah
 * - Punggung kamera 3 lensa Pro (tanpa logo Apple)
 * - Layar HP diisi SS Beranda JagaRuang (1170x2532 HD) dengan pemetaan proporsional presisi,
 *   filtering anisotropi 16x untuk ketajaman maksimal tanpa resolusi rendah, dan emissive glow.
 */
function IPhoneComponent({ scale = 1 }: IPhoneProps) {
  const { colors, dimensions } = HERO_3D_CONFIG;

  // 1. Muat Tekstur SS Beranda JagaRuang HD (Fitted 1170x2532)
  const texture = useTexture("/dashboard-screen.png");

  // Optimasi ketajaman tekstur (16x Anisotropic filtering + Linear Mipmaps)
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.anisotropy = 16; // Ketajaman kristal di segala sudut rotasi
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    }
  }, [texture]);

  return (
    <group scale={scale}>
      {/* =================================================================== */}
      {/* 1. FRAME & CHASSIS TITANIUM NATURAL (RoundedBox Utama)              */}
      {/* Sudut membulat besar (radius 0.44 = ~0.2 dari lebar 2.18)           */}
      {/* =================================================================== */}
      <RoundedBox
        args={[dimensions.phoneWidth, dimensions.phoneHeight, dimensions.phoneDepth]}
        radius={dimensions.cornerRadius}
        smoothness={8}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={colors.titaniumFrame}
          metalness={1.0}
          roughness={0.3}
          clearcoat={0.35}
          clearcoatRoughness={0.2}
          reflectivity={0.9}
        />
      </RoundedBox>

      {/* =================================================================== */}
      {/* 2. BEZEL LAYAR HITAM INSET (Simetris tipis 0.06 di semua sisi)      */}
      {/* =================================================================== */}
      <RoundedBox
        args={[dimensions.screenWidth + 0.02, dimensions.screenHeight + 0.02, 0.01]}
        radius={dimensions.screenRadius}
        smoothness={8}
        position={[0, 0, dimensions.phoneDepth / 2 + 0.001]}
      >
        <meshBasicMaterial color={colors.screenBezel} />
      </RoundedBox>

      {/* Latar Dasar Layar #DDE6ED (Mencegah Layar Hitam Jika Tekstur Berkedip) */}
      <mesh position={[0, 0, dimensions.phoneDepth / 2 + 0.003]}>
        <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
        <meshBasicMaterial color={colors.screenBg} />
      </mesh>

      {/* =================================================================== */}
      {/* 3. LAYAR MENYALA: SS BERANDA JAGARUANG HD (1170 x 2532)             */}
      {/* Proporsional 1:1, tajam bebas blur, emissive OLED pendaran terang   */}
      {/* =================================================================== */}
      {texture && (
        <mesh position={[0, 0, dimensions.phoneDepth / 2 + 0.007]}>
          <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
          <meshPhysicalMaterial
            map={texture}
            emissiveMap={texture}
            emissive="#FFFFFF"
            emissiveIntensity={0.65}
            roughness={0.12}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
          />
        </mesh>
      )}

      {/* =================================================================== */}
      {/* 4. DYNAMIC ISLAND (Kapsul Hitam di Status Bar Atas)                 */}
      {/* Pas di antara jam 09:41 dan baterai, tidak menutupi logo JR         */}
      {/* =================================================================== */}
      <group position={[0, dimensions.phoneHeight / 2 - 0.25, dimensions.phoneDepth / 2 + 0.012]}>
        {/* Kapsul Hitam Dynamic Island */}
        <mesh>
          <capsuleGeometry args={[0.055, 0.36, 8, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Titik Lensa Kamera Depan Kecil */}
        <mesh position={[-0.11, 0, 0.002]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 5. TOMBOL SAMPING TITANIUM TERPISAH                                  */}
      {/* Kiri: Action Button, Volume Up, Volume Down                          */}
      {/* Kanan: Power / Side Button                                           */}
      {/* =================================================================== */}
      {/* Action Button (Kiri Atas) */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.018, 1.28, 0]}>
        <boxGeometry args={[0.032, 0.16, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={1.0} roughness={0.3} />
      </mesh>
      {/* Volume Up (Kiri) */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.018, 0.84, 0]}>
        <boxGeometry args={[0.032, 0.34, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={1.0} roughness={0.3} />
      </mesh>
      {/* Volume Down (Kiri) */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.018, 0.40, 0]}>
        <boxGeometry args={[0.032, 0.34, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={1.0} roughness={0.3} />
      </mesh>
      {/* Power Button (Kanan) */}
      <mesh position={[dimensions.phoneWidth / 2 + 0.018, 0.65, 0]}>
        <boxGeometry args={[0.032, 0.52, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={1.0} roughness={0.3} />
      </mesh>

      {/* =================================================================== */}
      {/* 6. PUNGGUNG HP: FROSTED GLASS & MODUL 3 LENSA PRO                   */}
      {/* Terlihat saat HP miring/tilt, tanpa logo Apple                      */}
      {/* =================================================================== */}
      {/* Frosted Glass Back Plate */}
      <RoundedBox
        args={[dimensions.screenWidth, dimensions.screenHeight, 0.01]}
        radius={dimensions.screenRadius}
        smoothness={8}
        position={[0, 0, -dimensions.phoneDepth / 2 - 0.001]}
      >
        <meshStandardMaterial
          color={colors.backGlass}
          metalness={0.25}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Camera Plateau Island (Rounded Square di Pojok Kiri Atas) */}
      <group position={[-0.45, 1.38, -dimensions.phoneDepth / 2 - 0.032]}>
        <RoundedBox args={[1.05, 1.05, 0.05]} radius={0.22} smoothness={8}>
          <meshStandardMaterial
            color={colors.cameraPlateau}
            metalness={0.45}
            roughness={0.3}
          />
        </RoundedBox>

        {/* 3 Lensa Kamera Pro */}
        <CameraLens position={[-0.24, 0.24, -0.032]} />
        <CameraLens position={[-0.24, -0.24, -0.032]} />
        <CameraLens position={[0.24, 0, -0.032]} />

        {/* True Tone LED Flash */}
        <mesh position={[0.24, 0.28, -0.026]}>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color="#FEF3C7" />
        </mesh>
        {/* LiDAR Scanner Dot */}
        <mesh position={[0.24, -0.28, -0.026]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Sub-komponen Lensa Kamera Pro (Ring Logam + Kaca Gelap)
 */
function CameraLens({ position }: { position: [number, number, number] }) {
  const { colors } = HERO_3D_CONFIG;

  return (
    <group position={position}>
      {/* Outer Titanium Collar */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.04, 28]} />
        <meshStandardMaterial
          color={colors.cameraLensRing}
          metalness={1.0}
          roughness={0.22}
        />
      </mesh>
      {/* Inner Black Bezel */}
      <mesh position={[0, 0, -0.012]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.042, 28]} />
        <meshBasicMaterial color="#0A0F1D" />
      </mesh>
      {/* Shiny Glass Element */}
      <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.044, 28]} />
        <meshPhysicalMaterial
          color={colors.cameraLensGlass}
          metalness={0.9}
          roughness={0.05}
          clearcoat={1.0}
        />
      </mesh>
    </group>
  );
}

export const IPhone = memo(IPhoneComponent);
