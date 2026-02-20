import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ReactComponent as LogoSvg } from "../assets/vector.svg";

export default function LogoDots() {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const svg = wrap.querySelector("svg");
    if (!svg) return;

    const dots = Array.from(wrap.querySelectorAll("circle"));
    if (dots.length === 0) return;

    gsap.set(dots, { willChange: "transform" });

    dots.forEach((c) => {
      c.dataset.x0 = c.getAttribute("cx");
      c.dataset.y0 = c.getAttribute("cy");
      c.dataset.dx = (Math.random() * 2 - 1) * 2;
      c.dataset.dy = (Math.random() * 2 - 1) * 2;
    });

    // drift callback'ini sakla
    const driftFn = () => {
      const t = gsap.ticker.time;
      for (const c of dots) {
        const x0 = +c.dataset.x0;
        const y0 = +c.dataset.y0;
        const ox = Math.sin(t + x0 * 0.01) * (+c.dataset.dx);
        const oy = Math.cos(t + y0 * 0.01) * (+c.dataset.dy);
        c.setAttribute("cx", (x0 + ox).toFixed(2));
        c.setAttribute("cy", (y0 + oy).toFixed(2));
      }
    };
    gsap.ticker.add(driftFn);

    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;

      const radius = 80;
      const force = 18;

      for (const c of dots) {
        const x0 = +c.dataset.x0;
        const y0 = +c.dataset.y0;

        const dx = x0 - mx;
        const dy = y0 - my;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const p = 1 - dist / radius;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          c.setAttribute("cx", (x0 + nx * force * p).toFixed(2));
          c.setAttribute("cy", (y0 + ny * force * p).toFixed(2));
        }
      }
    };

    const onLeave = () => {
      // hızlı toparlanma
      for (const c of dots) {
        c.setAttribute("cx", c.dataset.x0);
        c.setAttribute("cy", c.dataset.y0);
      }
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      gsap.ticker.remove(driftFn);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                 w-[60vw] opacity-40 pointer-events-auto z-0"
    >
      <LogoSvg />
    </div>
  );
}