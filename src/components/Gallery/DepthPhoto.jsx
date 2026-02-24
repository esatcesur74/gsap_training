import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import PhotoCard from "../PhotoCard";
import { photoMeta } from "../../data/galleryData";

const MAX_PARALLAX_X = 40;
const MAX_PARALLAX_Y = 30;

export default function DepthPhoto({ photo, mouseRef }) {
  const elRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const onTick = () => {
      if (elRef.current && mouseRef.current) {
        const { x, y } = mouseRef.current;
        gsap.set(elRef.current, {
          x: x * photo.depth * MAX_PARALLAX_X,
          y: y * photo.depth * MAX_PARALLAX_Y,
        });
      }
    };

    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, [photo.depth, mouseRef]);

  const meta = photoMeta[photo.photoId];

  if (!meta) {
    return null;
  }

  const src =
    typeof meta.src === "string"
      ? meta.src
      : meta.src?.default ?? meta.src;

  const isVideo = photo.photoId.startsWith("vid") || /\.mp4(\?|#|$)/i.test(String(src));

  const scale = 0.85 + photo.depth * 0.2;

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div
      ref={elRef}
      className="absolute will-change-transform"
      style={{
        top: photo.position.top,
        left: photo.position.left,
        width: photo.width,
        zIndex: photo.zIndex || 1,
        transform: `scale(${scale})`,
      }}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            cursor: "pointer",
          }}
        />
      ) : (
        <PhotoCard src={src} data={meta} photoId={photo.photoId} />
      )}
    </div>
  );
}
