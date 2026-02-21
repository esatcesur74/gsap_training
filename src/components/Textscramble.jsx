import { useState, useEffect, useRef, useMemo } from "react";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const TextScramble = ({ text = "", className = "" }) => {
  const safeText = useMemo(() => (text ?? "").toString(), [text]);

  const [displayText, setDisplayText] = useState(() =>
    "*".repeat(safeText.length)
  );
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);

  const clear = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const scramble = () => {
    if (isScrambling) return;
    if (!safeText.length) {
      setDisplayText("");
      return;
    }

    setIsScrambling(true);
    let iteration = 0;
    const originalText = safeText;

    clear();
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
        clear();
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, 30);
  };

  const hide = () => {
    clear();
    setDisplayText("*".repeat(safeText.length));
    setIsScrambling(false);
  };

  useEffect(() => {
    // text değişince reset + otomatik scramble
    setDisplayText("*".repeat(safeText.length));
    setIsScrambling(false);
    if (safeText.length) scramble();

    return () => clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeText]);

  return (
    <span className={className} onMouseEnter={scramble} onMouseLeave={hide}>
      {displayText}
    </span>
  );
};

export default TextScramble;