import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DepthPhoto from "./DepthPhoto";
import InfiniteTextScroll from "./InfiniteTextScroll";

export default function GalleryPage({ page, pageIndex, mouseRef }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div ref={container} className="relative" style={{ height: pageIndex === 0 ? "200vh" : "100vh" }}>
      <motion.section
        style={pageIndex === 0 ? { scale, rotate, borderRadius } : {}}
        className="h-screen w-screen sticky top-0 overflow-hidden"
      >
        {page?.photos?.map((photo) => (
          <DepthPhoto key={photo.photoId} photo={photo} mouseRef={mouseRef} />
        ))}
        {pageIndex === 0 && <InfiniteTextScroll />}
      </motion.section>
    </div>
  );
}
