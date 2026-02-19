

import imgA from "../../assets/a.jpeg";
import imgB from "../../assets/b.jpeg";
import imgC from "../../assets/c.jpeg";
import imgD from "../../assets/d.jpeg";
import imgE from "../../assets/e.jpeg";
import vid1 from "../../assets/vid1.mp4";

const ParallaxPlanes = ({ plane1, plane2, plane3, }) => {

    return (
        <div className="w-[300vw] h-[300vh] relative -top-[100vh] -left-[100vw]">
            <div ref={plane1} className="absolute inset-0">
                <img src={imgA} className="absolute w-[25vw] h-auto object-cover" style={{ top: "8%", left: "10%" }} />
                <img src={imgB} className="absolute w-[22vw] h-auto object-cover" style={{ top: "12%", left: "70%" }} />


            </div>
            <div ref={plane2} className="absolute inset-0">
                <img src={imgC} className="absolute w-[26vw] h-auto object-cover" style={{ top: "40%", left: "38%" }} />

                <img src={imgD} className="absolute w-[22vw] h-auto object-cover" style={{ top: "70%", left: "15%" }} />

            </div>
            <div ref={plane3} className="absolute inset-0">
                <img src={imgE} className="absolute w-[27vw] h-auto object-cover" style={{ top: "55%", left: "65%" }} />

                <video src={vid1} className="absolute w-[27vw] h-auto object-cover" style={{ top: "80%", left: "45%" }} autoPlay muted loop playsInline />

            </div>
        </div>
    );
};

export default ParallaxPlanes;
