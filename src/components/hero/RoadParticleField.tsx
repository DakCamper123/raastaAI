'use client';

/**
 * RAASTA.AI - RoadParticleField Component
 * Three.js perspective road particles flowing continuously in an infinite tunnel.
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/hooks/useTheme';

export function RoadParticleField({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, -50);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Geometry
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPrimary = new THREE.Color(isDark ? 0x00f0ff : 0x0077cc);
    const colorSecondary = new THREE.Color(isDark ? 0xffaa00 : 0xd97706);

    for (let i = 0; i < particleCount; i++) {
      // Create lanes (-8 to +8 meters wide, depth -100 to +10)
      const lane = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 0.4;
      const z = (Math.random() - 0.5) * 120 - 40;

      positions[i * 3] = lane;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color alternating between cyan and amber lane markers
      const c = Math.random() > 0.3 ? colorPrimary : colorSecondary;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move particle forward toward camera
        posArray[i * 3 + 2] += 0.4;

        // Reset to horizon once passed camera
        if (posArray[i * 3 + 2] > 10) {
          posArray[i * 3 + 2] = -100;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
