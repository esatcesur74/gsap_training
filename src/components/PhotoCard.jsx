import { useState } from "react";
import TextScramble from "./Textscramble";

export default function PhotoCard({ src, data, className = "", style }) {
  const [hovered, setHovered] = useState(false);
  const [showCoords, setShowCoords] = useState(false);

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
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt="photo"
          className="w-full h-auto object-cover"
        />
               {data?.faceRegion && (
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "url(#pixelate) brightness(0.7)",
              clipPath: `ellipse(${data.faceRegion.rx}% ${data.faceRegion.ry}% at ${data.faceRegion.cx}% ${data.faceRegion.cy}%)`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
          />
        )}

      </div>

      {hovered && data && (
        <div
          className="mt-1 space-y-0.5 text-[0.55vw] font-normal tracking-wider"
          style={{ color: "var(--color-accent)" }}
        >
          <div className="flex gap-3">
            <span style={{ color: "var(--color-text)" }} className="w-[4vw]">date</span>
            <TextScramble text={data.date} />
          </div>

          <div className="flex gap-3">
            <span style={{ color: "var(--color-text)" }} className="w-[4vw]">shot by</span>
            <TextScramble text={data.shotBy} />
          </div>

          <div
            className="flex gap-3"
            onMouseEnter={() => setShowCoords(true)}
            onMouseLeave={() => setShowCoords(false)}
          >
            <span style={{ color: "var(--color-text)" }} className="w-[4vw]">location</span>
            <TextScramble
              text={showCoords && data.coords ? data.coords : data.location}
            />
          </div>

          <div className="flex gap-3">
            <span style={{ color: "var(--color-text)" }} className="w-[4vw]">model</span>
            <TextScramble text={data.model} />
          </div>

          {data.campaign && (
            <div className="flex gap-3">
              <span style={{ color: "var(--color-text)" }} className="w-[4vw]">campaign</span>
              <TextScramble text={data.campaign} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
