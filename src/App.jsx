import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

import Gallery from "./components/Gallery";
import LogoDots from "./components/LogoDots";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
        <LogoDots onComplete={() => setLoaded(true)} loaded={loaded} />
        {loaded && (
          <div className="relative z-10">
            <Gallery />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
