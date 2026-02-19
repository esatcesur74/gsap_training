import { useTransform, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import personCutout from "../../assets/person-cutout2.png"
import { useState, useRef } from "react";



const ScaledImage = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
    const containerRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const maskSize = 80;
    const maskImage = useMotionTemplate`radial-gradient(circle ${maskSize}px at ${mouseX}px ${mouseY}px, black 0%, transparent 81%)`;


    const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }



    return (
        <motion.div style={{ scale, rotate }} className="relative h-screen bg-black grid grid-cols-3 overflow-visible">
            <div ref={containerRef} className="col-span-2 bg-black flex flex-col justify-center pl-16 relative">

                <p className="text-2xl cursor-default"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <span className="bg-gradient-to-b from-white via-slate-400 to-slate-900 bg-clip-text text-transparent">ekip® built by </span>
                    <span className="text-black">immigrants</span>
                    <span className="bg-gradient-to-b from-white via-slate-400 to-slate-900 bg-clip-text text-transparent"> for </span>
                    <span className="text-black">immigrants.</span>
                </p>


                <motion.div
                    className="absolute inset-0 flex flex-col justify-center pl-16 "
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        maskImage: maskImage,
                        WebkitMaskImage: maskImage,
                        pointerEvents: 'none'
                    }}
                >
                    <p className="text-2xl text-white cursor-default">
                        ekip® built by <span className="text-white">immigrants</span> for <span className="text-white">immigrants.</span>
                    </p>
                </motion.div>

            </div>

            <div>
                <img src={personCutout} className="absolute left-[83.33%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vh] max-w-none" />
            </div>

        </motion.div>
    );
};

export default ScaledImage;

