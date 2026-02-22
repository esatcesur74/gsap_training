import { motion } from "framer-motion";
import { height, background, mountAnim } from "./anim";

export default function Stairs() {
  return (
    <div className="fixed inset-0 z-[60] flex items-end pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={height}
          {...mountAnim}
          custom={4 - i}
          className="w-1/5"
          style={{ backgroundColor: "var(--color-text)" }}
        />
      ))}
      <motion.div
        variants={background}
        {...mountAnim}
        className="absolute inset-0 bg-black"
      />
    </div>
  );
}
