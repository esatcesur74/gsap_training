import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function LogoDots({ onComplete, loaded }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const explodedRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const img = new Image();
    img.src = "/ARBC.png";

    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      const logoWidth = 500;
      const logoHeight = (img.height / img.width) * logoWidth;
      tempCanvas.width = logoWidth;
      tempCanvas.height = logoHeight;
      tempCtx.drawImage(img, 0, 0, logoWidth, logoHeight);

      const imageData = tempCtx.getImageData(0, 0, logoWidth, logoHeight);
      const data = imageData.data;

      const targets = [];
      const gap = 3;

      for (let y = 0; y < logoHeight; y += gap) {
        for (let x = 0; x < logoWidth; x += gap) {
          const i = (y * logoWidth + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a > 128 && (r + g + b) < 200) {
            targets.push({
              x: x - logoWidth / 2,
              y: -(y - logoHeight / 2),
              z: (Math.random() - 0.5) * 100,
            });
          }
        }
      }

      const count = targets.length;
      const geometry = new THREE.BufferGeometry();

      const posArray = new Float32Array(count * 3);
      const targetArray = new Float32Array(count * 3);
      const startArray = new Float32Array(count * 3);
      const colorArray = new Float32Array(count * 3);

      const colorA = new THREE.Color("#ffffff");
      const colorB = new THREE.Color("#6c757d");
      const tempColor = new THREE.Color();

      for (let i = 0; i < count; i++) {
        targetArray[i * 3] = targets[i].x;
        targetArray[i * 3 + 1] = targets[i].y;
        targetArray[i * 3 + 2] = targets[i].z;

        const angle = Math.random() * Math.PI * 2;
        const radius = 400 + Math.random() * 600;
        startArray[i * 3] = Math.cos(angle) * radius;
        startArray[i * 3 + 1] = Math.sin(angle) * radius;
        startArray[i * 3 + 2] = (Math.random() - 0.5) * 500;

        posArray[i * 3] = startArray[i * 3];
        posArray[i * 3 + 1] = startArray[i * 3 + 1];
        posArray[i * 3 + 2] = startArray[i * 3 + 2];

        const t = (targets[i].x + logoWidth / 2) / logoWidth;
        tempColor.lerpColors(colorA, colorB, t);
        colorArray[i * 3] = tempColor.r;
        colorArray[i * 3 + 1] = tempColor.g;
        colorArray[i * 3 + 2] = tempColor.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

      const material = new THREE.PointsMaterial({
        size: 1.5,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        vertexColors: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // === MOUSE ===
      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", onMouseMove);

      // === ANİMASYON ===
      const duration = 3.0;
      const clock = new THREE.Clock();
      let assembled = false;

      const animate = () => {
        const elapsed = clock.getElapsedTime();
        const pos = geometry.attributes.position.array;

        if (!explodedRef.current) {
          const p = Math.min(elapsed / duration, 1.0);
          const eased = 1 - Math.pow(1 - p, 3);

          setProgress(Math.floor(eased * 100));

          for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            pos[ix] = startArray[ix] + (targetArray[ix] - startArray[ix]) * eased;
            pos[iy] = startArray[iy] + (targetArray[iy] - startArray[iy]) * eased;
            pos[iz] = startArray[iz] + (targetArray[iz] - startArray[iz]) * eased;

            if (eased > 0.9) {
              const drift = (eased - 0.9) * 10;
              const ox = targetArray[ix];
              const oy = targetArray[iy];
              const oz = targetArray[iz];
              pos[ix] = pos[ix] + (ox + Math.sin(elapsed * 0.3 + ox * 0.01) * 2 - pos[ix]) * drift;
              pos[iy] = pos[iy] + (oy + Math.cos(elapsed * 0.3 + oy * 0.01) * 2 - pos[iy]) * drift;
              pos[iz] = pos[iz] + (oz + Math.sin(elapsed * 0.5 + oz * 0.05) * 3 - pos[iz]) * drift;
            }
          }

          if (p >= 1 && !assembled) {
            assembled = true;
            setReady(true);
          }
        } else {
          for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            pos[ix] += (pos[ix] - 0) * 0.02;
            pos[iy] += (pos[iy] - 0) * 0.02;
            pos[iz] += (Math.random() - 0.5) * 2;
          }

          material.opacity *= 0.98;
          if (material.opacity < 0.01) {
            material.opacity = 0;
          }
        }

        geometry.attributes.position.needsUpdate = true;

        camera.position.x += (mouseX * 30 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 30 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      // === RESIZE ===
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        mount.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };
  }, []);

  const handleClick = () => {
    if (!ready || loaded) return;
    explodedRef.current = true;
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div
      ref={mountRef}
      onClick={handleClick}
      className={`fixed inset-0 w-full h-full z-50 cursor-pointer transition-opacity duration-700 ${
        loaded ? "opacity-0 pointer-events-none" : ""
      }`}
    >
      {!ready && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-light tracking-widest">
          {progress}%
        </div>
      )}

      {ready && !loaded && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-sm font-normal tracking-widest animate-pulse">
          CLICK TO ENTER
        </div>
      )}
    </div>
  );
}
