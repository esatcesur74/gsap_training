import { useState } from "react";
import { motion } from "framer-motion";
import { blur, translate, opacity } from "./anim";
import ad from "../../assets/ad.jpeg";

const links = [

  { title: "Gallery", href: "#gallery", src: ad },
  { title: "Shop", href: "#about", src: "/images/nav-about.jpg" },
  { title: "Lookbook", href: "#lookbook", src: "/images/nav-lookbook.jpg" },
  { title: "Contact", href: "#contact", src: "/images/nav-contact.jpg" },
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
      <div className="flex justify-between items-start">
       
        <div className="flex flex-wrap max-w-[60%] mt-10">
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

        
        <div className="relative w-[400px] h-[300px] mt-10 overflow-hidden">
          <img
            src={links[selectedLink.index].src}
            alt=""
            className="w-full h-full object-cover transition-all duration-300"
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

