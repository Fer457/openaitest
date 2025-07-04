'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreePage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const material = new THREE.MeshNormalMaterial();
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = (i % 2) * 1.5 - 0.75;
      cube.position.y = Math.floor(i / 2) * 1.5 - 0.75;
      scene.add(cube);
      cubes.push(cube);
    }
    camera.position.z = 2;

    const animate = () => {
      cubes.forEach((cube, idx) => {
        cube.rotation.x += 0.01 + idx * 0.005;
        cube.rotation.y += 0.01 + idx * 0.005;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      cubes.forEach((cube) => {
        (cube.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
}
