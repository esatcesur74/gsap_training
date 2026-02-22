import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import GalleryPage from "./GalleryPage";
import ThemeToggle from "../ThemeToggle";
import Header from "../Header";
import ParallaxScrollSection from "./ParallaxScrollSection";
import HorizontalScrollSection from "./HorizontalScrollSection";
import MouseImageGallery from "./MouseImageGallery";
import { galleryPages } from "../../data/galleryData";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

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

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef}>
      <Header />
      <ThemeToggle />

      <GalleryPage page={galleryPages[0]} pageIndex={0} mouseRef={mouseRef} />

      <ParallaxScrollSection />

      <div className="relative" style={{ marginTop: "-100vh" }}>
        <HorizontalScrollSection />
      </div>

      {galleryPages.slice(3, 5).map((page, i) => (
        <GalleryPage
          key={page.id}
          page={page}
          pageIndex={i + 3}
          mouseRef={mouseRef}
        />
      ))}

      <MouseImageGallery />
    </main>
  );
}
