import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryPage from "./GalleryPage";

import Header from "../Header";

import HorizontalScrollSection from "./HorizontalScrollSection";
import MouseImageGallery from "./MouseImageGallery";
import { galleryPages } from "../../data/galleryData";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Gallery mount olduktan sonra Lenis limit'i guncelle
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const lerp = (start, end, amount) => start + (end - start) * amount;

    let rafId = 0;
    const animate = () => {
      currentX = lerp(currentX, targetX, 0.05);
      currentY = lerp(currentY, targetY, 0.05);
      mouseRef.current = { x: currentX, y: currentY };
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main ref={containerRef}>
      <Header />
      

      <GalleryPage page={galleryPages[0]} pageIndex={0} mouseRef={mouseRef} />

      <div className="relative" style={{ marginTop: "-100vh" }}>
        <HorizontalScrollSection />
      </div>

      <MouseImageGallery />
    </main>
  );
}
