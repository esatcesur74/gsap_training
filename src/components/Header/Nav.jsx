import { useState } from "react";
import { motion } from "framer-motion";
import { blur, translate, opacity } from "./anim";
import imgAD from "../../assets/ad.jpeg";
import imgZ from "../../assets/z.jpeg";
import imgAA from "../../assets/aa.jpeg";
import imgS from "../../assets/s.jpeg";

const links = [
  { title: "Gallery", href: "#gallery", src: imgAD },
  { title: "Shop", href: "#about", src: imgZ },
  { title: "Lookbook", href: "#lookbook", src: imgAA },
  { title: "Contact", href: "#contact", src: imgS },
];


function NavLink({ data, index, setSelectedLink, selectedLink }) {
  return (
    <motion.p
      onMouseOver={() => setSelectedLink({ isActive: true, index })}
      onMouseLeave={() => setSelectedLink({ isActive: false, index })}
      variants={blur}
      animate={
        selectedLink.isActive && selectedLink.index !== index ? "open" : "closed"
      }
      style={{
        margin: 0,
        display: "flex",
        overflow: "hidden",
        fontSize: "5vw",
        paddingRight: "2vw",
        paddingTop: "10px",
        fontWeight: 300,
      }}
    >
      <motion.a
        href={data.href}
        variants={translate}
        custom={[index * 0.05, (links.length - index) * 0.05]}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{
          color: "var(--color-text)",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        {data.title}
      </motion.a>
    </motion.p>
  );
}

export default function Nav({ closeMenu }) {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <div
      style={{ backgroundColor: "var(--color-bg)" }}
      className="w-full px-8 pb-12"
    >
      <div className="flex justify-between gap-12">

        <div className="flex flex-wrap mt-10">
          {links.map((link, i) => (
            <NavLink
              key={i}
              data={link}
              index={i}
              setSelectedLink={setSelectedLink}
              selectedLink={selectedLink}
            />
          ))}
        </div>

        <div
          className="relative mt-10 shrink-0 overflow-hidden"
          style={{ width: "30vw", height: "45vh" }}
        >
          <img
            src={links[selectedLink.index].src}
            alt=""
            className="w-full h-full object-contain transition-all duration-500"
            style={{
              opacity: selectedLink.isActive ? 1 : 0,
              transform: selectedLink.isActive ? "scale(1)" : "scale(0.95)",
            }}
          />
        </div>
      </div>

      <motion.div
        variants={opacity}
        initial="initial"
        animate="open"
        exit="closed"
        className="flex gap-8 mt-12 text-xs uppercase tracking-widest"
        style={{ color: "var(--color-text-muted)" }}
      >
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">Behance</a>
      </motion.div>
    </div>
  );
}
