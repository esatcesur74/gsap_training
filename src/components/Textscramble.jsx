import { useState, useEffect, useRef } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const TextScramble = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState("*".repeat(text.length));
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef(null);

    const scramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const originalText = text;

        intervalRef.current = setInterval(() => {
            setDisplayText(
                originalText
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iteration) return originalText[index];
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            iteration += 1 / 3;

            if (iteration >= originalText.length) {
                clearInterval(intervalRef.current);
                setDisplayText(originalText);
                setIsScrambling(false);
            }
        }, 30);
    };

    const hide = () => {
        clearInterval(intervalRef.current);
        setDisplayText("*".repeat(text.length));
        setIsScrambling(false);

    };

    useEffect(() => {
        scramble();
    }, [text]);






    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <span
            className={className}
            onMouseEnter={scramble}
            onMouseLeave={hide}
        >
            {displayText}
        </span>
    );

};

export default TextScramble;
