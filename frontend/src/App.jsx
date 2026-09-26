import { useEffect } from "react";

import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import HorizontalScroll from "./components/HorizontalScroll";
import Outro from "./components/Outro";

import { initBirthdayAnimations } from "./animations/birthdayAnimations";


function App() {
  useEffect(() => {
    const cleanup = initBirthdayAnimations();

    return cleanup;
  }, []);

  return (
    <main className="relative w-full">
      <div
        id="birthday-container"
        className="relative h-full w-full bg-[#edf1e8]"
      >
        <Hero />

        <Marquee />

        <HorizontalScroll />

        <Outro />

     
      </div>
    </main>
  );
}

export default App;