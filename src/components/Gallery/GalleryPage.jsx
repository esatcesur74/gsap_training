import DepthPhoto from "./DepthPhoto";

export default function GalleryPage({ page, mouseRef }) {
  return (
    <section className="h-screen w-screen relative overflow-hidden">
      {page.photos.map((photo) => (
        <DepthPhoto
          key={photo.photoId}
          photo={photo}
          mouseRef={mouseRef}
        />
      ))}
    </section>
  );
}
