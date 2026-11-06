import { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HERO_3D_CONFIG } from "./hero3d.config";

interface OrbitProps {
  reducedMotion?: boolean;
}

/**
 * Orbit Ring 3D Component
 * SATU cincin tipis (torus) dengan titik pusat SAMA PERSIS dengan HP [0, 0, 0].
 * Cincin melewati depan dan belakang HP dengan depth buffer Three.js yang benar.
 * Dilengkapi SATU partikel kecil bercahaya yang bergerak halus di sepanjang cincin.
 */
function OrbitComponent({ reducedMotion = false }: OrbitProps) {
  const { colors, dimensions, animation } = HERO_3D_CONFIG;

  const groupRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Mesh>(null);
  const particleAngle = useRef(0);

  // Animasi rotasi cincin dan pergerakan partikel
  useFrame((_, delta) => {
    if (reducedMotion) return;

    // 1. Rotasi sangat pelan pada kelompok cincin
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * animation.ringRotationSpeed;
    }

    // 2. Pergerakan partikel melintasi keliling cincin (parametric circle x, y)
    if (particleRef.current) {
      particleAngle.current += delta * animation.particleSpeed;
      const r = dimensions.orbitRadius;
      const x = r * Math.cos(particleAngle.current);
      const y = r * Math.sin(particleAngle.current);

      particleRef.current.position.set(x, y, 0);
    }
  });

  return (
    // Group cincin orbit berbagi titik pusat [0, 0, 0] dengan HP
    // Diberi rotasi kemiringan 3D sehingga memotong bidang depan (z > 0) dan belakang (z < 0)
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      rotation={[Math.PI / 3.2, 0.22, Math.PI / 5]}
    >
      {/* 1. Cincin Torus Tipis Tunggal */}
      <mesh receiveShadow={false} castShadow={false} renderOrder={1}>
        <torusGeometry
          args={[
            dimensions.orbitRadius,
            dimensions.orbitTubeRadius,
            24,
            128,
          ]}
        />
        <meshStandardMaterial
          color={colors.orbitRing}
          emissive={colors.orbitEmissive}
          emissiveIntensity={0.65}
          roughness={0.25}
          metalness={0.85}
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>

      {/* 2. SATU Partikel Kecil Bercahaya (Emerald Glow) */}
      <mesh
        ref={particleRef}
        position={[
          dimensions.orbitRadius,
          0,
          0,
        ]}
      >
        <sphereGeometry args={[dimensions.particleRadius, 16, 16]} />
        <meshStandardMaterial
          color={colors.orbitParticle}
          emissive={colors.orbitParticleGlow}
          emissiveIntensity={2.8}
          roughness={0.1}
          metalness={0.9}
        />
        {/* Titik Cahaya Halus Partikel */}
        <pointLight
          color={colors.orbitParticleGlow}
          intensity={0.9}
          distance={1.4}
        />
      </mesh>
    </group>
  );
}

export const Orbit = memo(OrbitComponent);

