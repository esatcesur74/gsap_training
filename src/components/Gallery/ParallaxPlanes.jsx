import BrandScramble from "../BrandScramble";


import imgA from "../../assets/a.jpeg";
import imgB from "../../assets/b.jpeg";
import imgC from "../../assets/c.jpeg";
import imgD from "../../assets/d.jpeg";
import imgE from "../../assets/e.jpeg";
import vid1 from "../../assets/vid1.mp4";


const photoData = {
  imgA: {
    date: "20 may 2025",
    shotBy: "Akif Akgun",
    location: "Oppsal / Oslo",
    coords: null,
    model: "Ali Azzaro",
    campaign: "Tugra Caps / 2025",
  },
  imgB: {
    date: "16 january 2026",
    shotBy: "Life Jumanson",
    location: "Majorstuen / Oslo",
    coords: "59.927481, 10.719930",
    model: "Rayan",
    campaign: "Comme De Immigres",
  },
  imgC: {
    date: "18 january 2026",
    shotBy: "Bashir Mohammed",
    location: "Tøyen / Oslo",
    coords: "59.918239, 10.773224",
    model: "Richard",
    campaign: "Comme des Immigres",
  },
  imgD: {
    date: "8 January 2026",
    shotBy: "Akif Akgun",
    location: "Tøyen / Oslo",
    coords: "59.918239, 10.773224",
    model: "Babou",
    campaign: "Hooligan Sweaters",
  },
  imgE: {
    date: "06 july 2026",
    shotBy: "Siar Esat Cesur",
    location: "Nice / France",
    coords: null,
    model: "Melih",
    campaign: null,
  },
  imgF: {
    date: null,
    shotBy: "Akif Akgun",
    location: "Amsterdam / Netherlands",
    coords: null,
    model: "Esat",
    campaign: "Eu Tee",
  },
  imgG: {
    date: null,
    shotBy: "Ali Ezzawi",
    location: "Grønland / Oslo",
    coords: null,
    model: "Ekip",
    campaign: "Ekip Eu Tee",
  },
};




const ParallaxPlanes = ({ plane1, plane2, plane3, }) => {

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* PARALLAX CONTENT 
            <img
                src="/ARBC.png"
                className="absolute left-1/2 top-1/2 
             -translate-x-1/2 -translate-y-1/2
             w-[60vw]
             image-rendering-pixelated
             pointer-events-none"
            />
            */}


      <div
        className="w-[900vw] h-[900vh] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >


        <div ref={plane1} className="absolute inset-0" style={{ transform: "translateZ(50px)" }}>
          <img src={imgA} className="absolute w-[25vw] h-auto object-cover" style={{ top: "8%", left: "10%", transform: "scale(1.05)" }} />
          <img src={imgB} className="absolute w-[22vw] h-auto object-cover" style={{ top: "12%", left: "70%", transform: "scale(0.95)" }} />
        </div>


        <div ref={plane2} className="absolute inset-0" style={{ transform: "translateZ(0px)" }}>
          <img src={imgC} className="absolute w-[26vw] h-auto object-cover" style={{ top: "40%", left: "38%" }} />
          <img src={imgD} className="absolute w-[22vw] h-auto object-cover" style={{ top: "70%", left: "15%", opacity: 0.9 }} />
          <BrandScramble />
        </div>


        <div ref={plane3} className="absolute inset-0" style={{ transform: "translateZ(-50px)" }}>
          <img src={imgE} className="absolute w-[27vw] h-auto object-cover" style={{ top: "55%", left: "6%", opacity: 0.85, transform: "scale(0.9)" }} />
          <video src={vid1} className="absolute w-[27vw] h-auto object-cover" style={{ top: "80%", left: "45%", opacity: 0.8, transform: "scale(0.85)" }} autoPlay muted loop playsInline />
        </div>


      </div>
    </div>
  );
};

export default ParallaxPlanes;
