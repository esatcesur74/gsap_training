import React, { useState } from "react";
import Gallery from "./components/Gallery";
import LogoDots from "./components/LogoDots";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <LogoDots onComplete={() => setLoaded(true)} loaded={loaded} />
      {loaded && (
        <div className="relative z-10">
          <Gallery />
        </div>
      )}
    </div>
  );
};
export default App;
