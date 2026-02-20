import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import BrandScramble from "../BrandScramble";
import ParallaxPlanes from "./ParallaxPlanes";

export default function Gallery() {
    const plane1 = useRef(null);
    const plane2 = useRef(null);
    const plane3 = useRef(null);

    useEffect(() => {
        const panRangeX = window.innerWidth * 1;
        const panRangeY = window.innerHeight * 1;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        const smoothing = 0.001;

        const lerp = (start, end, amount) => start * (1 - amount) + end * amount;
        let requestId;

        const animate = () => {
            currentX = lerp(currentX, targetX, smoothing);
            currentY = lerp(currentY, targetY, smoothing);

            gsap.set(plane1.current, { x: currentX, y: currentY });
            gsap.set(plane2.current, { x: currentX * 0.6, y: currentY * 0.6 });
            gsap.set(plane3.current, { x: currentX * 0.3, y: currentY * 0.3 });

            requestId = requestAnimationFrame(animate);
        };

        requestId = requestAnimationFrame(animate);

        function handleMouseMove(e) {
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
            targetX = -normalizedX * panRangeX;
            targetY = -normalizedY * panRangeY;
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(requestId);
        };
    }, []);







    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);




    return (
        <main className="h-screen overflow-hidden relative">
            <ParallaxPlanes plane1={plane1} plane2={plane2} plane3={plane3} />
        </main>
    );


}
