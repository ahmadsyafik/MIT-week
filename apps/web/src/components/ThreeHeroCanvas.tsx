import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cek ketersediaan WebGL
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 520;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Pencahayaan (Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x526d82, 3.5, 10);
    blueLight.position.set(-4, -2, 3);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x9db2bf, 2.5, 8);
    cyanLight.position.set(3, 4, 3);
    scene.add(cyanLight);

    // 4. Texture Layar HP (Render dinamis simulasi aplikasi JagaRuang)
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 1024;
    const ctx = screenCanvas.getContext("2d");

    function updateScreenCanvas(tick: number) {
      if (!ctx) return;
      // Background Layar
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 1024);

      // Status Bar
      ctx.fillStyle = "#27374D";
      ctx.font = "bold 24px Inter, sans-serif";
      ctx.fillText("09:41", 40, 50);
      ctx.fillText("100%", 410, 50);

      // Header App
      ctx.fillStyle = "#526D82";
      ctx.beginPath();
      ctx.roundRect(32, 80, 448, 80, 20);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px Inter, sans-serif";
      ctx.fillText("JagaRuang Mobile", 110, 130);

      // Icon Shield
      ctx.fillStyle = "#DDE6ED";
      ctx.beginPath();
      ctx.arc(72, 120, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#27374D";
      ctx.font = "bold 22px Inter, sans-serif";
      ctx.fillText("JR", 58, 128);

      // Greeting Card
      ctx.fillStyle = "#F8FAFC";
      ctx.beginPath();
      ctx.roundRect(32, 185, 448, 120, 24);
      ctx.fill();
      ctx.strokeStyle = "#9DB2BF";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#27374D";
      ctx.font = "bold 26px Inter, sans-serif";
      ctx.fillText("Create Your", 60, 230);
      ctx.fillText("Digital Safety Shield", 60, 265);

      // Alert Banner (Simulasi Deteksi APK)
      const alertPulse = Math.sin(tick * 3) * 0.15 + 0.85;
      ctx.fillStyle = `rgba(197, 48, 48, ${alertPulse * 0.15})`;
      ctx.beginPath();
      ctx.roundRect(32, 330, 448, 160, 24);
      ctx.fill();
      ctx.strokeStyle = "#c53030";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#c53030";
      ctx.font = "bold 22px Inter, sans-serif";
      ctx.fillText("⚠️ Pesan Mencurigakan Terdeteksi", 60, 375);

      ctx.fillStyle = "#27374D";
      ctx.font = "19px Inter, sans-serif";
      ctx.fillText('"Undangan_Pernikahan.apk"', 60, 415);
      ctx.fillStyle = "#526D82";
      ctx.font = "16px Inter, sans-serif";
      ctx.fillText("Indikasi Sniffing SMS OTP (Level Tinggi)", 60, 445);

      // 2 Action Cards (Recommended)
      ctx.fillStyle = "#F1F5F9";
      ctx.beginPath();
      ctx.roundRect(32, 515, 215, 180, 20);
      ctx.fill();
      ctx.strokeStyle = "#CBD5E1";
      ctx.stroke();

      ctx.fillStyle = "#27374D";
      ctx.font = "bold 20px Inter, sans-serif";
      ctx.fillText("Simulator", 52, 560);
      ctx.font = "15px Inter, sans-serif";
      ctx.fillStyle = "#526D82";
      ctx.fillText("Latih Refleks", 52, 595);
      ctx.fillText("4 Skenario Cepat", 52, 625);

      ctx.fillStyle = "#526D82";
      ctx.beginPath();
      ctx.roundRect(52, 645, 90, 30, 8);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Inter, sans-serif";
      ctx.fillText("Coba", 78, 665);

      // Action Card 2
      ctx.fillStyle = "#F1F5F9";
      ctx.beginPath();
      ctx.roundRect(265, 515, 215, 180, 20);
      ctx.fill();
      ctx.strokeStyle = "#CBD5E1";
      ctx.stroke();

      ctx.fillStyle = "#27374D";
      ctx.font = "bold 20px Inter, sans-serif";
      ctx.fillText("Kamus Jebakan", 285, 560);
      ctx.font = "15px Inter, sans-serif";
      ctx.fillStyle = "#526D82";
      ctx.fillText("10 Modus Siber", 285, 595);
      ctx.fillText("SMS & Rekayasa", 285, 625);

      ctx.fillStyle = "#27374D";
      ctx.beginPath();
      ctx.roundRect(285, 645, 90, 30, 8);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Inter, sans-serif";
      ctx.fillText("Buka", 312, 665);

      // Bottom Checklist
      ctx.fillStyle = "#E2E8F0";
      ctx.beginPath();
      ctx.roundRect(32, 720, 448, 130, 20);
      ctx.fill();
      ctx.fillStyle = "#27374D";
      ctx.font = "bold 20px Inter, sans-serif";
      ctx.fillText("Verifikasi Mandiri On-Device", 60, 765);
      ctx.font = "16px Inter, sans-serif";
      ctx.fillStyle = "#526D82";
      ctx.fillText("✓ Link tidak pernah dibuka", 60, 800);
      ctx.fillText("✓ Data pribadi otomatis disamarkan", 60, 830);

      // Home Bar Bawah
      ctx.fillStyle = "#27374D";
      ctx.beginPath();
      ctx.roundRect(170, 995, 172, 10, 5);
      ctx.fill();
    }

    updateScreenCanvas(0);
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;

    // 5. Membuat Model Smartphone 3D
    const phoneGroup = new THREE.Group();

    // Body Smartphone (Bahan Metalik Elegan #27374D / Abu-abu gelap)
    const phoneWidth = 2.4;
    const phoneHeight = 4.8;
    const phoneDepth = 0.22;

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x27374d,
      roughness: 0.2,
      metalness: 0.8,
    });

    const bodyGeometry = new THREE.BoxGeometry(phoneWidth, phoneHeight, phoneDepth);
    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);

    // Bezel Layar (Front Face)
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenGeometry = new THREE.PlaneGeometry(phoneWidth * 0.94, phoneHeight * 0.94);
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = phoneDepth / 2 + 0.005;
    phoneGroup.add(screenMesh);

    // Dynamic Island / Kamera Depan
    const notchGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.02);
    const notchMaterial = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const notchMesh = new THREE.Mesh(notchGeometry, notchMaterial);
    notchMesh.position.set(0, phoneHeight / 2 - 0.2, phoneDepth / 2 + 0.01);
    phoneGroup.add(notchMesh);

    // 6. Elemen 3D Melayang Pendukung (Floating Security Rings & Badges)
    // Cincin Pelindung Holografik
    const ringGeo = new THREE.TorusGeometry(3.1, 0.03, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x526d82,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.8;
    ringMesh.rotation.y = Math.PI / 8;
    phoneGroup.add(ringMesh);

    const innerRingGeo = new THREE.TorusGeometry(2.7, 0.02, 16, 80);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x9db2bf,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.6,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = -Math.PI / 3.2;
    phoneGroup.add(innerRingMesh);

    // Partikel Floating Orbs (Nodes)
    const orbGroup = new THREE.Group();
    const orbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const orbMat1 = new THREE.MeshStandardMaterial({ color: 0x526d82, roughness: 0.2, metalness: 0.8 });
    const orbMat2 = new THREE.MeshStandardMaterial({ color: 0x9db2bf, roughness: 0.1, metalness: 0.9 });

    const orb1 = new THREE.Mesh(orbGeo, orbMat1);
    orb1.position.set(1.9, 1.8, 0.8);
    orbGroup.add(orb1);

    const orb2 = new THREE.Mesh(orbGeo, orbMat2);
    orb2.position.set(-1.8, -1.2, 0.9);
    orbGroup.add(orb2);

    const orb3 = new THREE.Mesh(orbGeo, orbMat1);
    orb3.position.set(1.7, -1.9, -0.6);
    orbGroup.add(orb3);

    phoneGroup.add(orbGroup);

    // Posisi awal smartphone (sedikit miring perspektif seperti di video)
    phoneGroup.rotation.x = 0.12;
    phoneGroup.rotation.y = -0.25;
    phoneGroup.rotation.z = -0.05;
    scene.add(phoneGroup);

    // 7. Mouse Interactivity (Parallax Tilt)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = -0.25;
    let targetRotationX = 0.12;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = -0.25 + x * 0.45;
      targetRotationX = 0.12 - y * 0.35;
    };

    window.addEventListener("mousemove", handlePointerMove);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Update texture canvas berkala untuk denyut alert
      if (Math.floor(elapsed * 10) % 2 === 0) {
        updateScreenCanvas(elapsed);
        screenTexture.needsUpdate = true;
      }

      // Smooth Lerp untuk interaktivitas mouse
      phoneGroup.rotation.y += (targetRotationY - phoneGroup.rotation.y) * 0.05;
      phoneGroup.rotation.x += (targetRotationX - phoneGroup.rotation.x) * 0.05;

      // Animasi melayang halus (Idle floating)
      phoneGroup.position.y = Math.sin(elapsed * 1.5) * 0.12;
      phoneGroup.position.x = Math.cos(elapsed * 1.2) * 0.06;

      // Rotasi pelan cincin & orb
      ringMesh.rotation.z = elapsed * 0.18;
      innerRingMesh.rotation.z = -elapsed * 0.22;
      orbGroup.rotation.y = elapsed * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      orbGeo.dispose();
      orbMat1.dispose();
      orbMat2.dispose();
      screenTexture.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-3xl bg-[#DDE6ED] border border-[#9DB2BF]/60 p-6 text-center text-[#27374D]">
        <div className="space-y-2">
          <p className="text-sm font-bold">Simulasi 3D Berjalan di Perangkatmu</p>
          <p className="text-xs text-[#526D82]">Akselerasi grafis otomatis disesuaikan dengan browser.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-[480px] sm:h-[540px] md:h-[600px] w-full items-center justify-center cursor-grab active:cursor-grabbing select-none"
      title="Gerakkan kursor untuk mengarahkan model 3D smartphone"
    />
  );
}

