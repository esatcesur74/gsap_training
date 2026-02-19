import { useTransform, motion } from "framer-motion";

import imgA from "../../assets/a.jpeg";
import imgB from "../../assets/b.jpeg";
import imgC from "../../assets/c.jpeg";
import imgD from "../../assets/d.jpeg";
import imgE from "../../assets/e.jpeg";
import vid1 from "../../assets/vid1.mp4";

const ParallaxPlanes = ({ plane1, plane2, plane3, scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    return (
        <motion.div style={{ scale, rotate }} className="h-screen overflow-hidden flex items-center justify-center relative">
            <div ref={plane1} className="absolute inset-0">
                <img src={imgA} className="absolute w-[25vw] h-auto object-cover" style={{ top: "15%", left: "5%" }} />
                <img src={imgB} className="absolute w-[22vw] h-auto object-cover" style={{ top: "5%", left: "28%" }} />
            </div>
            <div ref={plane2} className="absolute inset-0">
                <img src={imgC} className="absolute w-[26vw] h-auto object-cover" style={{ top: "10%", left: "49%" }} />
                <img src={imgD} className="absolute w-[22vw] h-auto object-cover" style={{ top: "18%", left: "75%" }} />
            </div>
            <div ref={plane3} className="absolute inset-0">
                <img src={imgE} className="absolute w-[27vw] h-auto object-cover" style={{ top: "62%", left: "25%" }} />
                <video src={vid1} className="absolute w-[27vw] h-auto object-cover" style={{ top: "55%", left: "52%" }} autoPlay muted loop playsInline />
            </div>
        </motion.div>
    );
};

export default ParallaxPlanes;
