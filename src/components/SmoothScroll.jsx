import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // DEBUG: log Lenis scroll position every 500ms
    let debugInterval = setInterval(() => {
      console.log("[LENIS] scroll:", Math.round(lenis.scroll), "limit:", Math.round(lenis.limit), "isScrolling:", lenis.isScrolling);
    }, 500);

    return () => {
      clearInterval(debugInterval);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return children;
}