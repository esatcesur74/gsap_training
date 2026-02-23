import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InfiniteTextScroll() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);

useEffect(() => {
    
    if (secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });
    }

    
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          direction.current = e.direction * -1;
        },
      },
      x: "-500px",
    });

    let rafId;
    const animate = () => {
      
      const velocity = ScrollTrigger.getAll()[0]?.getVelocity() || 0;
      
      
      const normalizedVelocity = Math.min(Math.abs(velocity) / 3000, 1);
      
      
      const speed = 0.05 + normalizedVelocity * 0.5;

      if (xPercent.current < -100) {
        xPercent.current = 0;
      } else if (xPercent.current > 0) {
        xPercent.current = -100;
      }

      gsap.set(firstText.current, { xPercent: xPercent.current });
      gsap.set(secondText.current, { xPercent: xPercent.current });
      xPercent.current += speed * direction.current;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <div className="absolute bottom-[10%] left-0 w-full overflow-hidden z-10 pointer-events-none">
      <div ref={slider} className="relative whitespace-nowrap">
        <p
          ref={firstText}
          className="relative inline-block pr-[50px]"
          style={{
            fontSize: "clamp(80px, 12vw, 230px)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          MADE IN MOTHERLAND 
        </p>
        <p
          ref={secondText}
          className="absolute top-0 left-full inline-block pr-[50px]"
          style={{
            fontSize: "clamp(80px, 12vw, 230px)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          MADE IN MOTHERLAND 
        </p>
      </div>
    </div>
  );
}
