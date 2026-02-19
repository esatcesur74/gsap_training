import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useScroll } from "framer-motion";
import Lenis from "lenis";

import ParallaxPlanes from "./ParallaxPlanes";
import ScaledImage from "./ScaledImage";

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
                <ParallaxPlanes plane1={plane1} plane2={plane2} plane3={plane3} scrollYProgress={scrollYProgress} />
            </div>
            <ScaledImage scrollYProgress={scrollYProgress} />
        </main>
    );
}
