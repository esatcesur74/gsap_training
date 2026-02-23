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

  console.log("----");
  console.log("PHOTO ID:", photo.photoId);
  console.log("META:", meta);

  if (!meta) {
    return null;
  }

  const src =
    typeof meta.src === "string"
      ? meta.src
      : meta.src?.default ?? meta.src;

  const isVideo = photo.photoId === "vid3" || /\.mp4(\?|#|$)/i.test(String(src));

  console.log("IS VIDEO:", isVideo);

  const scale = 0.85 + photo.depth * 0.2;

  return (
    <div
      ref={elRef}
      className="absolute"
      style={{
        top: photo.position.top,
        left: photo.position.left,
        width: photo.width,
        zIndex: photo.zIndex || 1,
        transform: `scale(${scale})`,
      }}
    >
      {isVideo ? (
        <>
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            controls
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              background: "red", 
            }}
            onError={(e) => console.log("VIDEO ERROR:", e)}
            onLoadedData={() => console.log("VIDEO LOADED")}
          />
        </>
      ) : (
        <>
          {console.log("🖼 RENDERING IMAGE")}
          <PhotoCard src={src} data={meta} photoId={photo.photoId} />
        </>
      )}
    </div>
  );
}