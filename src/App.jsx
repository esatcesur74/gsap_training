import React from "react";
import Gallery from "./components/Gallery";
import LogoDots from "./components/LogoDots";

const App = () => {
  return (
<div className="relative min-h-screen bg-black overflow-hidden">
  <LogoDots />
  <div className="relative z-10">
    <Gallery />
  </div>
</div>
  );
};

export default App;