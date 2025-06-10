'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ScrollScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(new THREE.BoxGeometry(), material);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 32), material);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.5, 32), material);
    cube.position.z = 0;
    sphere.position.z = -5;
    cone.position.z = -10;
    scene.add(cube, sphere, cone);
    const objects = [cube, sphere, cone];

    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      camera.position.z = 5 - Math.min(progress, 2) * 5;
    };
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      objects.forEach((obj) => {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}
