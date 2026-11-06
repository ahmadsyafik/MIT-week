import { useEffect, useMemo, memo } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { HERO_3D_CONFIG } from "./hero3d.config";

interface IPhoneProps {
  scale?: number;
}

/**
 * Membuat ShapeGeometry dengan 4 sudut membulat presisi dan koordinat UV [0, 1]
 * Mencegah sudut siku-siku (90 derajat) planeGeometry menonjol keluar dari bodi melengkung ponsel
 */
function createRoundedRectGeometry(width: number, height: number, radius: number): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2, h / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, (3 * Math.PI) / 2, false);
  shape.closePath();

  const geom = new THREE.ShapeGeometry(shape, 12);
  const pos = geom.attributes.position;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uvs[i * 2] = (pos.getX(i) + w / 2) / w;
    uvs[i * 2 + 1] = (pos.getY(i) + h / 2) / h;
  }
  geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  return geom;
}

/**
 * Procedural iPhone 15/16 Pro 3D Model
 * - Dimensi body & bezel hitam samping dijaga presisi
 * - Z-depth smartphone dan layar dimajukan agar tampak tebal berisi (3D solid)
 * - Tampilan isi layar dimaksimalkan lebarnya (full width) menutup layar dengan rapi
 * - Sudut layar membulat menggunakan ShapeGeometry presisi (bebas glitch sudut tajam)
 */
function IPhoneComponent({ scale = 1 }: IPhoneProps) {
  const { colors, dimensions } = HERO_3D_CONFIG;

  // Geometry layar ber-sudut membulat (menghindari sudut siku menembus bodi)
  const screenGeometry = useMemo(
    () => createRoundedRectGeometry(dimensions.screenWidth, dimensions.screenHeight, dimensions.screenRadius),
    [dimensions.screenWidth, dimensions.screenHeight, dimensions.screenRadius]
  );

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
        args={[dimensions.screenWidth + 0.04, dimensions.screenHeight + 0.04, 0.004]}
        radius={dimensions.screenRadius + 0.02}
        smoothness={6}
        position={[0, 0, dimensions.phoneDepth / 2 + 0.002]}
      >
        <meshBasicMaterial color={colors.screenBezel} />
      </RoundedBox>

      {/* 3. Bidang Layar HP: ShapeGeometry Membulat Presisi (Berada Rata & Tepat di Depan Bezel) */}
      <mesh geometry={screenGeometry} position={[0, 0, dimensions.phoneDepth / 2 + 0.006]}>
        {texture ? (
          <meshBasicMaterial
            map={Array.isArray(texture) ? texture[0] : texture}
            transparent
            toneMapped={false}
          />
        ) : (
          <meshBasicMaterial color={colors.screenBg} />
        )}
      </mesh>

      {/* 4. Earpiece Speaker Slit di Bezel Atas Layar */}
      <mesh position={[0, dimensions.screenHeight / 2 + 0.035, dimensions.phoneDepth / 2 + 0.008]}>
        <boxGeometry args={[0.28, 0.018, 0.008]} />
        <meshBasicMaterial color="#050910" />
      </mesh>

      {/* 5. Tombol Samping iPhone */}
      {/* Action Button */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.015, 1.25, 0]}>
        <boxGeometry args={[0.03, 0.15, 0.06]} />
        <meshStandardMaterial color={colors.titaniumHighlight} metalness={0.85} roughness={0.32} />
      </mesh>
      {/* Volume Up */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.015, 0.82, 0]}>
        <boxGeometry args={[0.03, 0.32, 0.06]} />
        <meshStandardMaterial color={colors.titaniumHighlight} metalness={0.85} roughness={0.32} />
      </mesh>
      {/* Volume Down */}
      <mesh position={[-dimensions.phoneWidth / 2 - 0.015, 0.40, 0]}>
        <boxGeometry args={[0.03, 0.32, 0.06]} />
        <meshStandardMaterial color={colors.titaniumHighlight} metalness={0.85} roughness={0.32} />
      </mesh>
      {/* Power Button */}
      <mesh position={[dimensions.phoneWidth / 2 + 0.015, 0.65, 0]}>
        <boxGeometry args={[0.03, 0.5, 0.06]} />
        <meshStandardMaterial color={colors.titaniumHighlight} metalness={0.85} roughness={0.32} />
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
