import { useEffect, memo } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { HERO_3D_CONFIG } from "./hero3d.config";

interface IPhoneProps {
  scale?: number;
}

/**
 * Procedural iPhone 15/16 Pro 3D Model
 * - Dimensi body & bezel hitam samping dijaga presisi
 * - Z-depth smartphone dan layar dimajukan agar tampak tebal berisi (3D solid)
 * - Tampilan isi layar dimaksimalkan lebarnya (full width) menutup layar dengan rapi
 * - Dynamic Island floating item diposisikan HORIZONTAL (lebar melintang, bukan vertikal)
 */
function IPhoneComponent({ scale = 1 }: IPhoneProps) {
  const { colors, dimensions } = HERO_3D_CONFIG;

  // Muat tekstur screenshot dashboard mobile
  const texture = useTexture("/dashboard-screen.png", (tex) => {
    const t = Array.isArray(tex) ? tex[0] : tex;
    t.colorSpace = THREE.SRGBColorSpace;
    t.generateMipmaps = true;
    t.anisotropy = 4;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
  });

  useEffect(() => {
    if (texture) {
      const tex = Array.isArray(texture) ? texture[0] : texture;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.anisotropy = 4;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(1, 1);
      tex.offset.set(0, 0);
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    }
  }, [texture]);

  return (
    <group scale={scale}>
      {/* 1. Body & Frame Titanium iPhone (Tebal & Berisi) */}
      <RoundedBox
        args={[dimensions.phoneWidth, dimensions.phoneHeight, dimensions.phoneDepth]}
        radius={dimensions.cornerRadius}
        smoothness={6}
      >
        <meshStandardMaterial
          color={colors.titaniumFrame}
          metalness={0.9}
          roughness={0.32}
        />
      </RoundedBox>

      {/* 2. Bezel Layar Hitam Samping (Dipertahankan Utuh di Sekeliling Layar) */}
      <RoundedBox
        args={[dimensions.screenWidth + 0.02, dimensions.screenHeight + 0.02, 0.01]}
        radius={dimensions.screenRadius}
        smoothness={6}
        position={[0, 0, dimensions.phoneDepth / 2 + 0.002]}
      >
        <meshBasicMaterial color={colors.screenBezel} />
      </RoundedBox>

      {/* 3. Bidang Layar HP: Dashboard Mobile JagaRuang (Dimajukan Z & Maksimal Width Layar) */}
      <mesh position={[0, 0, dimensions.phoneDepth / 2 + 0.008]}>
        <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
        {texture ? (
          <meshBasicMaterial
            map={Array.isArray(texture) ? texture[0] : texture}
            toneMapped={false}
          />
        ) : (
          <meshBasicMaterial color={colors.screenBg} />
        )}
      </mesh>

      {/* 4. Dynamic Island HORIZONTAL (Floating Item Hitam Horizontal di Atas Layar) */}
      <group position={[0, dimensions.phoneHeight / 2 - 0.24, dimensions.phoneDepth / 2 + 0.016]}>
        {/* Kapsul Hitam Horizontal: dirotasi 90 derajat (Math.PI / 2) pada sumbu Z agar mendatar */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.046, 0.36, 6, 12]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Lensa Kamera Depan Kecil */}
        <mesh position={[-0.11, 0, 0.002]}>
          <circleGeometry args={[0.016, 12]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
      </group>

      {/* 5. Tombol Samping iPhone */}
      {/* Action Button */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.015, 1.25, 0]}>
        <boxGeometry args={[0.03, 0.15, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.9} roughness={0.35} />
      </mesh>
      {/* Volume Up */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.015, 0.82, 0]}>
        <boxGeometry args={[0.03, 0.32, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.9} roughness={0.35} />
      </mesh>
      {/* Volume Down */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.015, 0.40, 0]}>
        <boxGeometry args={[0.03, 0.32, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.9} roughness={0.35} />
      </mesh>
      {/* Power Button */}
      <mesh position={[dimensions.phoneWidth / 2 + 0.015, 0.65, 0]}>
        <boxGeometry args={[0.03, 0.5, 0.06]} />
        <meshStandardMaterial color={colors.titaniumFrame} metalness={0.9} roughness={0.35} />
      </mesh>

      {/* 6. Punggung Belakang iPhone & Kamera Pro */}
      <RoundedBox
        args={[dimensions.screenWidth, dimensions.screenHeight, 0.005]}
        radius={dimensions.screenRadius}
        smoothness={6}
        position={[0, 0, -dimensions.phoneDepth / 2 - 0.001]}
      >
        <meshStandardMaterial color={colors.backGlass} roughness={0.45} />
      </RoundedBox>

      {/* Modul Kamera Belakang */}
      <group position={[-0.45, 1.35, -dimensions.phoneDepth / 2 - 0.025]}>
        <RoundedBox args={[1.0, 1.0, 0.04]} radius={0.2} smoothness={6}>
          <meshStandardMaterial color={colors.cameraPlateau} roughness={0.35} />
        </RoundedBox>
        {/* 3 Lensa Pro */}
        <CameraLens position={[-0.24, 0.24, -0.025]} />
        <CameraLens position={[-0.24, -0.24, -0.025]} />
        <CameraLens position={[0.24, 0, -0.025]} />
        {/* Flash & LiDAR */}
        <mesh position={[0.24, 0.26, -0.022]}>
          <circleGeometry args={[0.06, 12]} />
          <meshBasicMaterial color="#FEF3C7" />
        </mesh>
        <mesh position={[0.24, -0.26, -0.022]}>
          <circleGeometry args={[0.045, 12]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
      </group>
    </group>
  );
}

function CameraLens({ position }: { position: [number, number, number] }) {
  const { colors } = HERO_3D_CONFIG;
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.03, 20]} />
        <meshStandardMaterial color={colors.cameraLensRing} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.015]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.032, 20]} />
        <meshBasicMaterial color={colors.cameraLensGlass} />
      </mesh>
    </group>
  );
}

export const IPhone = memo(IPhoneComponent);
