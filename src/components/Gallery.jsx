import { useEffect, useRef } from "react";
import gsap from "gsap";

import imgA from "../assets/a.jpeg";
import imgB from "../assets/b.jpeg";
import imgC from "../assets/c.jpeg";
import imgD from "../assets/d.jpeg";
import imgE from "../assets/e.jpeg";
import vid1 from "../assets/vid1.mp4";

export default function Gallery() {
    const plane1 = useRef(null);
    const plane2 = useRef(null);
    const plane3 = useRef(null);

    useEffect(() => {
        let xForce = 0;
        let yForce = 0;
        const speed = 0.01;
        const easing = 0.08;
        let requestId = null;

        const lerp = (start, end, amount) => start * (1 - amount) + end * amount;

        const animate = () => {
            xForce = lerp(xForce, 0, easing);
            yForce = lerp(yForce, 0, easing);

            gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
            gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
            gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });

            if (Math.abs(xForce) < 0.01) xForce = 0;
            if (Math.abs(yForce) < 0.01) yForce = 0;

            if (xForce !== 0 || yForce !== 0) {
                requestId = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(requestId);
                requestId = null;
            }
        };

function handleMouseMove(e) {
    xForce += e.movementX * speed;
    yForce += e.movementY * speed;
    
    xForce = Math.max(-5, Math.min(5, xForce));
    yForce = Math.max(-5, Math.min(5, yForce));
    
    if (!requestId) requestId = requestAnimationFrame(animate);
}

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (requestId) cancelAnimationFrame(requestId);
        };
    }, []);

    return (
        <main className="relative w-full h-screen overflow-hidden">
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
        </main>
    );
}