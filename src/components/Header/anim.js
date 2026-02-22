export const mountAnim = {
  initial: "initial",
  animate: "enter",
  exit: "exit",
};

// Stairs — staggered height reveal from bottom
export const height = {
  initial: { height: 0 },
  enter: (i) => ({
    height: "100%",
    transition: { duration: 0.5, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1] },
  }),
  exit: (i) => ({
    height: 0,
    transition: { duration: 0.3, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1] },
  }),
};

// Background overlay behind stairs
export const background = {
  initial: { opacity: 0 },
  enter: { opacity: 0.5, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Generic opacity fade
export const opacity = {
  initial: { opacity: 0 },
  enter: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Close button slides in from right
export const slideLeft = {
  initial: { x: 80, opacity: 0 },
  enter: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
  exit: { x: 80, opacity: 0, transition: { duration: 0.3 } },
};

// Menu links rotate in on X axis
export const rotateX = {
  initial: { rotateX: 90, opacity: 0 },
  enter: (i) => ({
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.33, 1, 0.68, 1] },
  }),
  exit: (i) => ({
    rotateX: 90,
    opacity: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};
