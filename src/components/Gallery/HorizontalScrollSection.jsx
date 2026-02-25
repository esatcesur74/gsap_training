import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryPages, photoMeta } from "../../data/galleryData";
import PhotoCard from "../PhotoCard";

gsap.registerPlugin(ScrollTrigger);

const photos = galleryPages[1].photos;
const firstFour = photos.slice(0, 4);
const lastTwo = photos.slice(4, 6);

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const ctx = gsap.context(() => {
      gsap.to(section, {
        x: () => -(section.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: () => `+=${section.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const renderPhoto = (photo) => {
    const meta = photoMeta[photo.photoId];
    if (!meta) return null;

    const offsetX = photo.offsetX ?? "0px"; // galleryData'dan
    const offsetY = photo.offsetY ?? "0px";

    return (
      <div
        key={photo.photoId}
        className="flex-shrink-0"
        style={{
          width: photo.width,
          transform: `translate(${offsetX}, ${offsetY})`,
        }}
      >
        <PhotoCard src={meta.src} data={meta} photoId={photo.photoId} />
      </div>
    );
  };

  return (
    <section ref={triggerRef} className="overflow-hidden">
      <div
        ref={sectionRef}
        className="flex h-screen items-center gap-[2vw] px-[2vw] will-change-transform"
        style={{ width: "fit-content" }}
      >
        {firstFour.map(renderPhoto)}

        <div className="flex-shrink-0 h-screen w-screen flex flex-col items-center justify-center gap-[2vh]">
          {[...Array(6)].map((_, i) => (
            <img
              key={i}
              src={`${import.meta.env.BASE_URL}logo2.svg`}
              alt="Logo"
              className="w-[40vw] h-auto"
              style={{ filter: "var(--logo-filter)" }}
            />
          ))}
        </div>

        {lastTwo.map(renderPhoto)}
      </div>
    </section>
  );
}