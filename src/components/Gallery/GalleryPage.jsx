// GalleryPage.jsx
import DepthPhoto from "./DepthPhoto";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage({ page, pageIndex, mouseRef }) {
  const marqueeWrapRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);

  // half white / half black pattern (repeat to make it long)
  const marqueeContent = useMemo(() => {
    const Chunk = () => (
      <>
        <span className="text-white">MADE IN </span>
        <span className="text-black">MOTHERLAND</span>
      </>
    );

    // repeat enough to fill wide screens
    return (
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <Chunk key={i} />
        ))}
      </>
    );
  }, []);

  useEffect(() => {
    if (pageIndex !== 0) return;

    const wrap = marqueeWrapRef.current;
    const t1 = firstTextRef.current;
    const t2 = secondTextRef.current;
    if (!wrap || !t1 || !t2) return;

    let xPercent = 0;
    let direction = -1;
    const speed = 0.12;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
      },
    });

    const tick = () => {
      xPercent += speed * direction;

      if (xPercent <= -100) xPercent = 0;
      if (xPercent >= 0) xPercent = -100;

      gsap.set(t1, { xPercent });
      gsap.set(t2, { xPercent: xPercent + 100 });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [pageIndex]);

  return (
    <section className="h-screen w-screen relative overflow-hidden">
      {/* PHOTOS */}
      <div className="relative z-10">
        {page?.photos?.map((photo) => (
          <DepthPhoto key={photo.photoId} photo={photo} mouseRef={mouseRef} />
        ))}
      </div>

      {/* MARQUEE OVER IMAGES (ONLY FIRST PAGE) */}
      {pageIndex === 0 && (
        <div className="absolute inset-0 z-[0] pointer-events-none">
          <div className="absolute top-[calc(100vh-350px)] left-0 w-full overflow-hidden">
            <div ref={marqueeWrapRef} className="relative whitespace-nowrap">
              <p
                ref={firstTextRef}
                className="relative m-0 text-[230px] font-medium pr-[50px] leading-none "
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
              >
                {marqueeContent}
              </p>

              <p
                ref={secondTextRef}
                className="absolute left-full top-0 m-0 text-[230px] font-medium pr-[50px] leading-none "
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
              >
                {marqueeContent}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}