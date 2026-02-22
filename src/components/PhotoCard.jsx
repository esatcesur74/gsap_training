import { useState, useRef, useEffect } from "react";
import TextScramble from "./Textscramble";

function findBestPosition(cardRect, fieldCount) {
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  const allCards = document.querySelectorAll("[data-photo-card]");
  const otherRects = [];
  allCards.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (Math.abs(r.top - cardRect.top) < 2 && Math.abs(r.left - cardRect.left) < 2) return;
    otherRects.push(r);
  });

  // Dynamic dimensions based on viewport (matches text-[0.55vw] sizing)
  const metaW = vw * 0.16;
  const lineH = vw * 0.012;
  const metaH = lineH * fieldCount + 4;

  // Positions must match getMetaStyle CSS:
  // below  → top:100%, left:0      → starts at bottom-left of card
  // above  → bottom:100%, left:0   → ends at top-left of card
  // right  → top:0, left:100%      → starts at top-right of card
  // left   → top:0, right:100%     → starts at top-left of card going left
  const directions = {
    below: { x: cardRect.left, y: cardRect.bottom + 4, w: metaW, h: metaH },
    above: { x: cardRect.left, y: cardRect.top - metaH - 4, w: metaW, h: metaH },
    right: { x: cardRect.right + 8, y: cardRect.top, w: metaW, h: metaH },
    left:  { x: cardRect.left - metaW - 8, y: cardRect.top, w: metaW, h: metaH },
  };

  function overlapScore(area) {
    let penalty = 0;
    // Heavy penalty for going outside viewport
    if (area.y + area.h > vh) penalty += 100000;
    if (area.y < 0) penalty += 100000;
    if (area.x + area.w > vw) penalty += 100000;
    if (area.x < 0) penalty += 100000;
    // Overlap with other cards
    for (const r of otherRects) {
      const ox = Math.max(0, Math.min(area.x + area.w, r.right) - Math.max(area.x, r.left));
      const oy = Math.max(0, Math.min(area.y + area.h, r.bottom) - Math.max(area.y, r.top));
      penalty += ox * oy;
    }
    return penalty;
  }

  let best = "below";
  let bestScore = Infinity;
  for (const [dir, area] of Object.entries(directions)) {
    const score = overlapScore(area);
    if (score < bestScore) {
      bestScore = score;
      best = dir;
    }
  }
  return best;
}

function getMetaStyle(pos) {
  switch (pos) {
    case "above": return { bottom: "100%", left: 0, marginBottom: 4 };
    case "right": return { top: 0, left: "100%", marginLeft: 8 };
    case "left":  return { top: 0, right: "100%", marginRight: 8 };
    default:      return { top: "100%", left: 0, marginTop: 4 };
  }
}

export default function PhotoCard({ src, data, photoId, className = "", style }) {
  const [hovered, setHovered] = useState(false);
  const [showCoords, setShowCoords] = useState(false);
  const [metaPos, setMetaPos] = useState("below");
  const cardRef = useRef(null);

  const faceRegions = data?.faceRegions || (data?.faceRegion ? [data.faceRegion] : []);

  useEffect(() => {
    if (!hovered || !cardRef.current || !data) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Count how many metadata fields will actually render
    let fields = 0;
    if (data.date) fields++;
    if (data.shotBy) fields++;
    if (data.location) fields++;
    if (data.model) fields++;
    if (data.campaign) fields++;
    setMetaPos(findBestPosition(rect, fields || 3));
  }, [hovered, data]);

  return (
    <div
      ref={cardRef}
      data-photo-card
      className={`${className} relative`}
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

      {hovered && data && (
        <div
          className="absolute z-20 space-y-0.5 text-[0.55vw] max-md:text-[1.8vw] font-normal tracking-wider whitespace-nowrap"
          style={{ color: "var(--color-accent)", ...getMetaStyle(metaPos) }}
        >
          {data.date && (
            <div className="flex gap-3">
              <span style={{ color: "var(--color-text)" }} className="w-[4vw] max-md:w-[10vw]">date</span>
              <TextScramble text={data.date} />
            </div>
          )}
          {data.shotBy && (
            <div className="flex gap-3">
              <span style={{ color: "var(--color-text)" }} className="w-[4vw] max-md:w-[10vw]">shot by</span>
              <TextScramble text={data.shotBy} />
            </div>
          )}
          {data.location && (
            <div
              className="flex gap-3"
              onMouseEnter={() => setShowCoords(true)}
              onMouseLeave={() => setShowCoords(false)}
            >
              <span style={{ color: "var(--color-text)" }} className="w-[4vw] max-md:w-[10vw]">location</span>
              <TextScramble text={showCoords && data.coords ? data.coords : data.location} />
            </div>
          )}
          {data.model && (
            <div className="flex gap-3">
              <span style={{ color: "var(--color-text)" }} className="w-[4vw] max-md:w-[10vw]">model</span>
              <TextScramble text={data.model} />
            </div>
          )}
          {data.campaign && (
            <div className="flex gap-3">
              <span style={{ color: "var(--color-text)" }} className="w-[4vw] max-md:w-[10vw]">campaign</span>
              <TextScramble text={data.campaign} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
