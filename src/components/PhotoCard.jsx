import { useState } from "react";
import TextScramble from "./Textscramble";

export default function PhotoCard({ src, data, photoId, className = "", style }) {
  const [hovered, setHovered] = useState(false);
  const [showCoords, setShowCoords] = useState(false);

  
  const faceRegions = data?.faceRegions || (data?.faceRegion ? [data.faceRegion] : []);

 
  const metaAbove = data?.metaPosition === "above";

  const metaBlock = hovered && data && (
    <div
      className={`${metaAbove ? "mb-1" : "mt-1"} space-y-0.5 text-[0.55vw] font-normal tracking-wider`}
      style={{ color: "var(--color-accent)" }}
    >
      {data.date && (
        <div className="flex gap-3">
          <span style={{ color: "var(--color-text)" }} className="w-[4vw]">date</span>
          <TextScramble text={data.date} />
        </div>
      )}
      {data.shotBy && (
        <div className="flex gap-3">
          <span style={{ color: "var(--color-text)" }} className="w-[4vw]">shot by</span>
          <TextScramble text={data.shotBy} />
        </div>
      )}
      {data.location && (
        <div
          className="flex gap-3"
          onMouseEnter={() => setShowCoords(true)}
          onMouseLeave={() => setShowCoords(false)}
        >
          <span style={{ color: "var(--color-text)" }} className="w-[4vw]">location</span>
          <TextScramble text={showCoords && data.coords ? data.coords : data.location} />
        </div>
      )}
      {data.model && (
        <div className="flex gap-3">
          <span style={{ color: "var(--color-text)" }} className="w-[4vw]">model</span>
          <TextScramble text={data.model} />
        </div>
      )}
      {data.campaign && (
        <div className="flex gap-3">
          <span style={{ color: "var(--color-text)" }} className="w-[4vw]">campaign</span>
          <TextScramble text={data.campaign} />
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowCoords(false);
      }}
    >
      {metaAbove && metaBlock}

      <div className="relative overflow-hidden">
        <img
          src={src}
          alt="photo"
          className="w-full h-auto object-cover"
        />

        {faceRegions.map((face, i) => {
          const clipId = `face-${photoId}-${i}`;
          return (
            <div key={i}>
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                    <ellipse
                      cx={face.cx / 100}
                      cy={face.cy / 100}
                      rx={face.rx / 100}
                      ry={face.ry / 100}
                      transform={`rotate(${face.angle || 0} ${face.cx / 100} ${face.cy / 100})`}
                    />
                  </clipPath>
                </defs>
              </svg>
              <img
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: "url(#pixelate) brightness(0.7)",
                  clipPath: `url(#${clipId})`,
                  WebkitClipPath: `url(#${clipId})`,
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {!metaAbove && metaBlock}
    </div>
  );
}
