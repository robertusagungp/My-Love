import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface SanctuaryCanvasProps {
  currentAct: number;
  wishGranted: boolean;
  reducedMotion: boolean;
}

export const SanctuaryCanvas: React.FC<SanctuaryCanvasProps> = ({
  currentAct,
  wishGranted,
  reducedMotion,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  const sceneRef = useRef<{
    camera: THREE.PerspectiveCamera;
    starPoints: THREE.Points;
    roseCurveLine: THREE.Line;
    emberPoints: THREE.Points;
    burstGroup: THREE.Group;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth > 768,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x120307, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 18);

    // Soft circular glow texture generator
    const createGlowTexture = (colorStop1: string, colorStop2: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.28, colorStop1);
        grad.addColorStop(0.7, colorStop2);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const goldTexture = createGlowTexture('rgba(247, 212, 148, 0.95)', 'rgba(212, 155, 75, 0.25)');
    const maroonRoseTexture = createGlowTexture('rgba(218, 85, 115, 0.85)', 'rgba(107, 19, 43, 0.2)');

    // 1. Starlight Constellation Field
    const starCount = isMobile ? 420 : 850;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const r = 4 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 32;
      starScales[i] = 0.5 + Math.random() * 1.5;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.28 : 0.24,
      map: goldTexture,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 2. Velvet Maroon & Candlelight Floating Embers/Petals
    const emberCount = isMobile ? 160 : 320;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 28;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      size: isMobile ? 0.52 : 0.45,
      map: maroonRoseTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    // 3. Sacred Mathematical Rose Curve (Rhodonea: r = a * cos(k * theta))
    // Combining Natasha's name "Rosaline", her Maroon Rose, and UI Mathematics!
    const curvePoints: THREE.Vector3[] = [];
    const segments = 360;
    const k = 5; // 5-petal mathematical rose curve
    const radius = isMobile ? 4.2 : 5.6;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const r = radius * Math.cos(k * theta) + 1.6;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = Math.sin(theta * 3) * 0.85;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const roseCurveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const roseCurveMat = new THREE.LineBasicMaterial({
      color: 0xe5c384,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const roseCurveLine = new THREE.Line(roseCurveGeo, roseCurveMat);
    scene.add(roseCurveLine);

    // 4. Celebration Burst Group (for Act VII Make a Wish)
    const burstGroup = new THREE.Group();
    scene.add(burstGroup);

    sceneRef.current = {
      camera,
      starPoints,
      roseCurveLine,
      emberPoints,
      burstGroup,
    };

    // Pointer / Touch subtle parallax
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let animFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        pointer.x += (pointer.targetX - pointer.x) * 0.04;
        pointer.y += (pointer.targetY - pointer.y) * 0.04;

        starPoints.rotation.y = elapsed * 0.032 + pointer.x * 0.18;
        starPoints.rotation.x = pointer.y * 0.12;

        roseCurveLine.rotation.z = elapsed * 0.06;
        roseCurveLine.rotation.x = Math.sin(elapsed * 0.25) * 0.22 + pointer.y * 0.15;
        roseCurveLine.rotation.y = Math.cos(elapsed * 0.2) * 0.22 + pointer.x * 0.15;

        // Gentle upward drift of candlelight embers
        const posAttr = emberGeo.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < emberCount; i++) {
          let y = posAttr.getY(i) + 0.009;
          if (y > 12) y = -12;
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;

        burstGroup.rotation.y = elapsed * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      starGeo.dispose();
      starMat.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      roseCurveGeo.dispose();
      roseCurveMat.dispose();
      goldTexture.dispose();
      maroonRoseTexture.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  // Choreograph 3D Camera & Mathematical Rose visibility as Acts change
  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx) return;

    const actCameraTargets: Record<number, { z: number; y: number; curveOpacity: number }> = {
      1: { z: 18, y: 0, curveOpacity: 0.12 },
      2: { z: 11.5, y: 0.2, curveOpacity: 0.42 },
      3: { z: 13, y: -0.3, curveOpacity: 0.35 },
      4: { z: 9.5, y: 0.4, curveOpacity: 0.28 },
      5: { z: 12.5, y: 0, curveOpacity: 0.22 },
      6: { z: 15.5, y: 0.1, curveOpacity: 0.08 }, // Subtle during intimate letter
      7: { z: 10.5, y: 0.2, curveOpacity: 0.48 },
      8: { z: 12.0, y: 0, curveOpacity: 0.32 },
      9: { z: 11.0, y: 0, curveOpacity: 0.45 },
    };

    const target = actCameraTargets[currentAct] || actCameraTargets[2];
    const duration = reducedMotion ? 0.1 : 1.8;

    gsap.to(ctx.camera.position, {
      z: target.z,
      y: target.y,
      duration,
      ease: 'power3.inOut',
    });

    const mat = ctx.roseCurveLine.material as THREE.LineBasicMaterial;
    gsap.to(mat, {
      opacity: target.curveOpacity,
      duration,
      ease: 'power2.out',
    });
  }, [currentAct, reducedMotion]);

  // Trigger golden starburst when 29th Birthday Wish is made
  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx || !wishGranted) return;

    const mat = ctx.roseCurveLine.material as THREE.LineBasicMaterial;
    gsap.to(mat, {
      opacity: 0.72,
      duration: 1.2,
      yoyo: true,
      repeat: 1,
    });

    gsap.fromTo(
      ctx.roseCurveLine.scale,
      { x: 0.7, y: 0.7, z: 0.7 },
      { x: 1.25, y: 1.25, z: 1.25, duration: 2.2, ease: 'elastic.out(1, 0.5)' }
    );
  }, [wishGranted]);

  if (!webglSupported) {
    return <div className="sanctuary-fallback-bg" aria-hidden="true" />;
  }

  return <div ref={containerRef} className="sanctuary-webgl-canvas" aria-hidden="true" />;
};
