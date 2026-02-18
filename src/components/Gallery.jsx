import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";

import imgA from "../assets/a.jpeg";
import imgB from "../assets/b.jpeg";
import imgC from "../assets/c.jpeg";
import imgD from "../assets/d.jpeg";
import imgE from "../assets/e.jpeg";
import vid1 from "../assets/vid1.mp4";

const Section1 = ({ plane1, plane2, plane3, scrollYProgress }) => {
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

const Section2 = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

    return (
        <motion.div style={{ scale, rotate }} className="relative h-screen">
            <img src={imgC} className="w-full h-full object-cover" />
        </motion.div>
    );
};

export default function Gallery() {
    const plane1 = useRef(null);
    const plane2 = useRef(null);
    const plane3 = useRef(null);
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"],
    });

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    useEffect(() => {
        let xForce = 0, yForce = 0;
        let xPos = 0, yPos = 0;
        const maxDist = 60;
        const speed = 0.01;
        const easing = 0.08;
        let requestId = null;

        const lerp = (start, end, amount) => start * (1 - amount) + end * amount;

        const animate = () => {
            xForce = lerp(xForce, 0, easing);
            yForce = lerp(yForce, 0, easing);
            xPos = Math.max(-maxDist, Math.min(maxDist, xPos + xForce));
            yPos = Math.max(-maxDist, Math.min(maxDist, yPos + yForce));
            gsap.set(plane1.current, { x: xPos, y: yPos });
            gsap.set(plane2.current, { x: xPos * 0.5, y: yPos * 0.5 });
            gsap.set(plane3.current, { x: xPos * 0.25, y: yPos * 0.25 });
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
        <main ref={container} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <Section1 plane1={plane1} plane2={plane2} plane3={plane3} scrollYProgress={scrollYProgress} />
            </div>
            <Section2 scrollYProgress={scrollYProgress} />
        </main>
    );
}