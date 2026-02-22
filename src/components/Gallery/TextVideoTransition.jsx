
import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


function ScrollOpacityText({ text, className, style, ariaHidden = false }) {
  const rootRef = useRef(null);
  const charsRef = useRef([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    
    charsRef.current = charsRef.current.slice(0, text.length);

    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t?.trigger && root.contains(t.trigger)) t.kill();
      });

      gsap.set(charsRef.current, { opacity: 0.15 });

      gsap.to(charsRef.current, {
        opacity: 1,
        ease: "none",
        stagger: 0.015, 
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={style}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => (charsRef.current[i] = el)}
          style={{ display: "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </div>
  );
}


function InfiniteRow({ dir = "right", speed = 60, color = "black" }) {
  const line = useMemo(
    () =>
      "MADE IN MOTHERLAND   MADE IN MOTHERLAND   MADE IN MOTHERLAND   MADE IN MOTHERLAND   MADE IN MOTHERLAND   MADE IN MOTHERLAND   ",
    []
  );

  return (
    <div className="infinite-row-clip" style={{ ["--dur"]: `${speed}s` }}>
      <div className={`infinite-row-track ${dir}`}>
        <ScrollOpacityText
          text={line}
          className="infinite-text-row"
          style={{ color }}
        />
        <ScrollOpacityText
          text={line}
          className="infinite-text-row"
          style={{ color }}
          ariaHidden
        />
      </div>
    </div>
  );
}

export default function InfiniteText5Rows() {
  return (
    <div className="infinite-text-wrap">
      <style>{`
        /* wrap can be whatever you already have; kept minimal */
        .infinite-text-wrap{
          width:100%;
          overflow:hidden;
        }

        .infinite-row-clip {
          overflow: hidden;
          width: 100%;
        }

        .infinite-row-track {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(0,0,0);
          animation: row-right var(--dur, 60s) linear infinite;
        }

        .infinite-row-track.left {
          animation-name: row-left;
        }

        /* YOUR STYLE (unchanged) */
        .infinite-text-row {
          display: flex;
          white-space: nowrap;
          font-size: 230px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--color-text);
        }

        /* seamless loop: 2 identical blocks, move by half */
        @keyframes row-right {
          from { transform: translate3d(-50%,0,0); }
          to   { transform: translate3d(0,0,0); }
        }
        @keyframes row-left {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }

        @media (prefers-reduced-motion: reduce){
          .infinite-row-track{ animation:none; }
        }
      `}</style>

      <InfiniteRow dir="right" speed={70} color="#003399" />
      <InfiniteRow dir="left" speed={60} color="#ffcc00" />
      <InfiniteRow dir="right" speed={70} color="#003399" />
      <InfiniteRow dir="left" speed={60} color="#ffcc00" />
      <InfiniteRow dir="right" speed={70} color="#003399" />
    </div>
  );
}