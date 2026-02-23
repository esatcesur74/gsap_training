import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function LogoDots({ onComplete, loaded }) {
  const mountRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const prevProgressRef = useRef(0);
  const [ready, setReady] = useState(false);

  const explodedRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;


    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1500
    );
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);


    let geometry = null;
    let material = null;
    let points = null;

    let animId = null;

    const img = new Image();
    img.src = import.meta.env.BASE_URL + "ARBC.png";

    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const logoWidth = 500;
      const logoHeight = (img.height / img.width) * logoWidth;

      tempCanvas.width = logoWidth;
      tempCanvas.height = logoHeight;
      tempCtx.drawImage(img, 0, 0, logoWidth, logoHeight);

      const imageData = tempCtx.getImageData(0, 0, logoWidth, logoHeight);
      const data = imageData.data;

      const targets = [];
      const gap = 2;

      for (let y = 0; y < logoHeight; y += gap) {
        for (let x = 0; x < logoWidth; x += gap) {
          const i = (y * logoWidth + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];


          if (a > 128 && r + g + b < 200) {
            targets.push({
              x: x - logoWidth / 2,
              y: -(y - logoHeight / 2),
              z: (Math.random() - 0.5) * 100,
            });
          }
        }
      }

      const count = targets.length;

      geometry = new THREE.BufferGeometry();

      const posArray = new Float32Array(count * 3);
      const targetArray = new Float32Array(count * 3);
      const startArray = new Float32Array(count * 3);
      const colorArray = new Float32Array(count * 3);
      const velocityArray = new Float32Array(count * 3);


      const isDark = document.documentElement.classList.contains("dark");
      const colorA = new THREE.Color(isDark ? "#ffffff" : "#5a141f");
      const colorB = new THREE.Color(isDark ? "#6c757d" : "#142954");
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


        const tx = targetArray[i * 3];
        const ty = targetArray[i * 3 + 1];
        const tz = targetArray[i * 3 + 2];
        const len = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1;
        const speed = 2 + Math.random() * 4;
        velocityArray[i * 3] = (tx / len) * speed;
        velocityArray[i * 3 + 1] = (ty / len) * speed;
        velocityArray[i * 3 + 2] = (tz / len) * speed;



      }

      geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

      material = new THREE.PointsMaterial({
        size: 1.5,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        vertexColors: true,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);


      const duration = 3.0;
      const clock = new THREE.Clock();
      let assembled = false;

      const animate = () => {
        const elapsed = clock.getElapsedTime();

        if (!geometry) return;

        const pos = geometry.attributes.position.array;

        if (!explodedRef.current) {
          const p = Math.min(elapsed / duration, 1.0);
          const eased = 1 - Math.pow(1 - p, 3);

          const newProg = Math.floor(eased * 100);
          if (newProg !== prevProgressRef.current) {
            prevProgressRef.current = newProg;
            setProgress(newProg);
          }




          for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            if (!assembled) {

              pos[ix] =
                startArray[ix] + (targetArray[ix] - startArray[ix]) * eased;
              pos[iy] =
                startArray[iy] + (targetArray[iy] - startArray[iy]) * eased;
              pos[iz] =
                startArray[iz] + (targetArray[iz] - startArray[iz]) * eased;


              if (eased > 0.9) {
                const drift = (eased - 0.9) * 10;
                const ox = targetArray[ix];
                const oy = targetArray[iy];
                const oz = targetArray[iz];

                pos[ix] =
                  pos[ix] +
                  (ox + Math.sin(elapsed * 0.3 + ox * 0.01) * 2 - pos[ix]) *
                  drift;
                pos[iy] =
                  pos[iy] +
                  (oy + Math.cos(elapsed * 0.3 + oy * 0.01) * 2 - pos[iy]) *
                  drift;
                pos[iz] =
                  pos[iz] +
                  (oz + Math.sin(elapsed * 0.5 + oz * 0.05) * 3 - pos[iz]) *
                  drift;
              }

              if (p >= 1 && !assembled) {
                assembled = true;
                setReady(true);
              }
            } else {

              const ox = targetArray[ix];
              const oy = targetArray[iy];
              const oz = targetArray[iz];

              pos[ix] +=
                (ox + Math.sin(elapsed * 0.3 + ox * 0.01) * 2 - pos[ix]) * 0.05;
              pos[iy] +=
                (oy + Math.cos(elapsed * 0.3 + oy * 0.01) * 2 - pos[iy]) * 0.05;
              pos[iz] +=
                (oz + Math.sin(elapsed * 0.5 + oz * 0.05) * 3 - pos[iz]) * 0.05;
            }
          }
        } else {
          for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            pos[ix] += velocityArray[ix];
            pos[iy] += velocityArray[iy];
            pos[iz] += velocityArray[iz];
          }


          if (material.opacity > 0) {
            material.opacity -= 0.016;
          }

        }

        geometry.attributes.position.needsUpdate = true;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };

      animate();
    };


    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);


    return () => {
      window.removeEventListener("resize", onResize);

      if (animId) cancelAnimationFrame(animId);

      if (points) scene.remove(points);

      if (geometry) geometry.dispose();
      if (material) material.dispose();

      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleClick = () => {
    if (!ready || loaded) return;
    explodedRef.current = true;

    setTimeout(() => {
      onComplete?.();
    }, 800);
  };

  return (
    <div
      ref={mountRef}
      onClick={handleClick}
      className={`fixed inset-0 w-full h-full z-50 cursor-pointer transition-opacity duration-700 ${loaded ? "opacity-0 pointer-events-none" : ""
        }`}
    >
      {!ready && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm font-light tracking-widest"
          style={{ color: "var(--color-text-muted)" }}
        >
          {progress}%
        </div>
      )}

      {ready && !loaded && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm font-normal tracking-widest animate-pulse"
          style={{ color: "var(--color-text)" }}
        >
          CLICK TO ENTER
        </div>
      )}
    </div>
  );
}