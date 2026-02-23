import { useRef } from "react";
import { galleryPages, photoMeta } from "../../data/galleryData";
import imgC from "../../assets/c.jpeg";


const photos = galleryPages[5].photos;

export default function MouseImageGallery() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const currentIndex = useRef(0);
  const steps = useRef(0);
  const nbOfImages = useRef(0);
  const maxNumberOfImages = 8;

  const getCurrentImages = () => {
    const images = [];
    const indexOfFirst = currentIndex.current - nbOfImages.current;
    for (let i = indexOfFirst; i < currentIndex.current; i++) {
      let idx = i;
      if (idx < 0) idx += photos.length;
      if (imageRefs.current[idx]) images.push(imageRefs.current[idx]);
    }
    return images;
  };

  const setZIndex = () => {
    const images = getCurrentImages();
    images.forEach((img, i) => {
      img.style.zIndex = i;
    });
  };

  const removeImage = () => {
    const images = getCurrentImages();
    if (images[0]) {
      images[0].style.display = "none";
      nbOfImages.current--;
    }
  };

  const moveImage = (x, y) => {
    const img = imageRefs.current[currentIndex.current];
    if (!img) return;
    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.display = "block";
    currentIndex.current++;
    nbOfImages.current++;
    setZIndex();

    if (nbOfImages.current >= maxNumberOfImages) {
      removeImage();
    }

    if (currentIndex.current >= photos.length) {
      currentIndex.current = 0;
      steps.current = -150;
    }
  };

  const handleMouseMove = (e) => {
    const { movementX, movementY } = e;
    steps.current += Math.abs(movementX) + Math.abs(movementY);

    if (steps.current >= currentIndex.current * 150) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      moveImage(x, y);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-screen w-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${imgC})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {photos.map((photo, index) => {
        const meta = photoMeta[photo.photoId];
        if (!meta) return null;
        return (
          <img
            key={photo.photoId}
            ref={(el) => (imageRefs.current[index] = el)}
            src={meta.src}
            alt=""
            style={{
              position: "absolute",
              display: "none",
              width: "25vw",
              height: "auto",
              objectFit: "cover",
              top: 0,
              left: 0,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </section>
  );
}
