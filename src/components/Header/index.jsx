import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Stairs from "./Stairs";
import Nav from "./Nav";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
      {/* Burger button */}
      {!menuIsOpen && (
        <div
          onClick={() => setMenuIsOpen(true)}
          className="fixed top-6 left-6 z-50 flex items-center gap-3 cursor-pointer group mix-blend-difference"
        >
          <div className="flex flex-col gap-1.5">
            <div
              className="w-10 h-[1px] transition-all duration-300 group-hover:w-6"
              style={{ backgroundColor: "#fff" }}
            />
            <div
              className="w-6 h-[1px] transition-all duration-300 group-hover:w-10"
              style={{ backgroundColor: "#fff" }}
            />
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase max-md:hidden"
            style={{ color: "#fff" }}
          >
            Menu
          </span>
        </div>
      )}

      {/* Stairs + Nav */}
      <AnimatePresence mode="wait">
        {menuIsOpen && (
          <>
            <Stairs />
            <Nav closeMenu={() => setMenuIsOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
