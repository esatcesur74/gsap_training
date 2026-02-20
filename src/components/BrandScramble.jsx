import { useState, useEffect } from "react";
import TextScramble from "./Textscramble";

const words = ["ekip", "team", "équipe", "команда", "チーム", "فريق"];


const BrandScramble = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute flex flex-col items-center justify-center pointer-events-none" style={{ top: "45%", left: "20%", width: "30vw" }}>
            <span className="text-[2vw] font-normal text-white tracking-[0.3em] leading-[0.75]"><TextScramble text={words[currentIndex]} /><span className="text-[0.9vw] align-super">®</span></span>
            <span className="text-[2vw] font-normal text-white/80 tracking-[0.5em] leading-[0.75]"><TextScramble text={words[currentIndex]} /><span className="text-[0.9vw] align-super">®</span></span>
            <span className="text-[2vw] font-normal text-white/50 tracking-[0.7em] leading-[0.75]"><TextScramble text={words[currentIndex]} /><span className="text-[0.9vw] align-super">®</span></span>
            <span className="text-[2vw] font-normal text-white/30 tracking-[0.9em] leading-[0.75]"><TextScramble text={words[currentIndex]} /><span className="text-[0.9vw] align-super">®</span></span>
            <span className="text-[2vw] font-normal text-white/10 tracking-[1.1em] leading-[0.75]"><TextScramble text={words[currentIndex]} /><span className="text-[0.9vw] align-super">®</span></span>
        </div>
    );

};

export default BrandScramble;
