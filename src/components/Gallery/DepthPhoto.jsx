import { useEffect, useRef } from "react";
import gsap from "gsap";
import PhotoCard from "../PhotoCard";
import { photoMeta } from "../../data/galleryData";

const MAX_PARALLAX_X = 40;
const MAX_PARALLAX_Y = 30;

export default function DepthPhoto({ photo, mouseRef }) {
  const elRef = useRef(null);

  useEffect(() => {
    let animId;

    const animate = () => {
      if (elRef.current && mouseRef.current) {
        const { x, y } = mouseRef.current;
        gsap.set(elRef.current, {
          x: x * photo.depth * MAX_PARALLAX_X,
          y: y * photo.depth * MAX_PARALLAX_Y,
        });
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [photo.depth, mouseRef]);

  const meta = photoMeta[photo.photoId];
  if (!meta) return null;

  const scale = 0.85 + photo.depth * 0.2;
  const opacity = 0.75 + photo.depth * 0.25;

  return (
    <div
      ref={elRef}
      className="absolute"
      style={{
        top: photo.position.top,
        left: photo.position.left,
        width: photo.width,
        opacity: opacity,
        transform: `scale(${scale})`,
      }}
    >
      <PhotoCard src={meta.src} data={meta} />
    </div>
  );
}
