import { useState } from "react";
import TextScramble from "./Textscramble";

export default function PhotoCard({ src, data, className = "", style }) {
  const [hovered, setHovered] = useState(false);
  const [showCoords, setShowCoords] = useState(false);

  return (
    <div
      className={`absolute ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowCoords(false);
      }}
    >
      <img src={src} alt="photo" className="w-full h-auto object-cover" />

      {hovered && (
        <div className="mt-1 space-y-0.5 text-amber-300/90 text-[0.55vw] font-normal tracking-wider">
          <div className="flex gap-3">
            <span className="text-white w-[4vw]">date</span>
            <TextScramble text={data.date} />
          </div>

          <div className="flex gap-3">
            <span className="text-white w-[4vw]">shot by</span>
            <TextScramble text={data.shotBy} />
          </div>

          <div
            className="flex gap-3"
            onMouseEnter={() => setShowCoords(true)}
            onMouseLeave={() => setShowCoords(false)}
          >
            <span className="text-white w-[4vw]">location</span>
            <TextScramble
              text={showCoords ? data.coords : data.location}
            />
          </div>

          <div className="flex gap-3">
            <span className="text-white w-[4vw]">model</span>
            <TextScramble text={data.model} />
          </div>

          <div className="flex gap-3">
            <span className="text-white w-[4vw]">campaign</span>
            <TextScramble text={data.campaign} />
          </div>
        </div>
      )}
    </div>
  );
}