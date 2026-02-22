import { motion, useAnimate } from "framer-motion";
import { useRef } from "react";
import { slideLeft, rotateX, opacity, mountAnim } from "./anim";

const links = [
  { title: "Home", href: "#" },
  { title: "Gallery", href: "#gallery" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

function NavLink({ data, index, closeMenu }) {
  const [scope, animate] = useAnimate();
  const outer = useRef(null);
  const inner = useRef(null);

  const animateIn = async (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1;

    await animate(outer.current, { top: `${direction * 100}%` }, { duration: 0 });
    await animate(inner.current, { top: `${-1 * direction * 100}%` }, { duration: 0 });
    animate([outer.current, inner.current], { top: "0%" }, { duration: 0.3 });
  };

  const animateOut = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1;

    animate(outer.current, { top: `${direction * 100}%` }, { duration: 0.3 });
    animate(inner.current, { top: `${-1 * direction * 100}%` }, { duration: 0.3 });
  };

  return (
    <motion.div
      variants={rotateX}
      {...mountAnim}
      custom={index}
      ref={scope}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
      className="relative overflow-hidden border-t"
      style={{
        borderColor: "rgba(255,255,255,0.15)",
        perspective: "120px",
        transformOrigin: "bottom",
      }}
    >
      <a
        href={data.href}
        onClick={closeMenu}
        className="block text-[5vw] max-md:text-[10vw] uppercase font-light tracking-wider py-[1.5vh] px-[4vw]"
        style={{ color: "var(--color-bg)" }}
      >
        {data.title}
      </a>

      {/* Direction-aware hover fill */}
      <div
        ref={outer}
        className="absolute inset-0 pointer-events-none"
        style={{ top: "100%", backgroundColor: "var(--color-accent)" }}
      >
        <div
          ref={inner}
          className="absolute inset-0 flex items-center"
          style={{ top: "-100%" }}
        >
          <span
            className="block text-[5vw] max-md:text-[10vw] uppercase font-light tracking-wider py-[1.5vh] px-[4vw]"
            style={{ color: "var(--color-text)" }}
          >
            {data.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Nav({ closeMenu }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col justify-between"
      style={{ backgroundColor: "var(--color-text)" }}
    >
      {/* Close button */}
      <div className="flex justify-end p-8">
        <motion.svg
          variants={slideLeft}
          {...mountAnim}
          onClick={closeMenu}
          className="cursor-pointer"
          width="48"
          height="48"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.5 1.5L67 67" style={{ stroke: "var(--color-bg)" }} />
          <path d="M66.5 1L1 66.5" style={{ stroke: "var(--color-bg)" }} />
        </motion.svg>
      </div>

      {/* Links */}
      <div className="flex-1 flex flex-col justify-center px-[8vw]">
        {links.map((link, i) => (
          <NavLink key={i} data={link} index={i} closeMenu={closeMenu} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        variants={opacity}
        {...mountAnim}
        custom={0.5}
        className="flex gap-8 p-8 text-sm uppercase tracking-widest"
        style={{ color: "var(--color-bg)", opacity: 0.6 }}
      >
        <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Behance</a>
      </motion.div>
    </div>
  );
}
