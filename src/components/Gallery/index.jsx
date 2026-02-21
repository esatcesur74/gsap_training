import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import GalleryPage from "./GalleryPage";
import ThemeToggle from "../ThemeToggle";
import { galleryPages } from "../../data/galleryData";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // === MOUSE TRACKING ===
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

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.05);
      currentY = lerp(currentY, targetY, 0.05);
      mouseRef.current = { x: currentX, y: currentY };
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // === LENIS SMOOTH SCROLL + SCROLLTRIGGER ===
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Scroll snap to each page
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (galleryPages.length - 1),
        duration: { min: 0.3, max: 0.6 },
        ease: "power2.inOut",
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main ref={containerRef}>
      <ThemeToggle />
      {galleryPages.map((page) => (
        <GalleryPage key={page.id} page={page} mouseRef={mouseRef} />
      ))}
    </main>
  );
}
