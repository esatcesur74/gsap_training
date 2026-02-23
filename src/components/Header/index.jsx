import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./Nav";
import ThemeToggle from "../ThemeToggle";
import { height } from "./anim";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: menuIsOpen ? "var(--color-bg)" : "transparent" }}
    >

      <div
        className="flex items-center justify-between px-8 py-5"
      >

        <img
          src="/ARBC.svg"
          alt="Logo"
          className="h-6"
          style={{ filter: "var(--logo-filter)" }}
        />



        <div
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer"
        >
          <div
            className="relative w-[22px] h-[10px]"
          >
            <span
              className="absolute left-0 w-full h-[1px] transition-all duration-700"
              style={{
                backgroundColor: "var(--color-text)",
                top: menuIsOpen ? "50%" : "0%",
                transform: menuIsOpen ? "rotate(45deg)" : "rotate(0deg)",
                transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            />
            <span
              className="absolute left-0 w-full h-[1px] transition-all duration-700"
              style={{
                backgroundColor: "var(--color-text)",
                bottom: menuIsOpen ? "50%" : "0%",
                transform: menuIsOpen ? "rotate(-45deg)" : "rotate(0deg)",
                transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            />
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color:"var(--color-text)"}}
          >
            {menuIsOpen ? "Close" : "Menu"}
          </span>
        </div>


        <ThemeToggle />
      </div>

      <motion.div
        variants={height}
        initial="initial"
        animate={menuIsOpen ? "enter" : "exit"}
        className="overflow-hidden"
      >
        <AnimatePresence>
          {menuIsOpen && <Nav closeMenu={() => setMenuIsOpen(false)} />}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
