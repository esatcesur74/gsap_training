import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <span
      onClick={toggleTheme}
      className="text-xs tracking-[0.2em] uppercase cursor-pointer"
      style={{ color: "inherit" }}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </span>
  );
}
