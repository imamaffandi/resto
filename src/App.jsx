import { useEffect, useRef } from "react";
import {
  Navbar,
  Hero,
  Intro,
  Menu,
  Experience,
  Reservation,
  Kitchen,
  Specials,
  Gallery,
  Location,
  FinalCta,
  Footer,
  MobileReserve,
  SmoothScroll,
} from "./components";
import { initEditorialMotion } from "./lib/motion";
import { scrollToId } from "./lib/scroll";

const App = () => {
  const page = useRef(null);

  useEffect(() => initEditorialMotion(page.current), []);

  // Honour a #section in the URL on first load, after layout and pin spacers settle
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const timer = window.setTimeout(() => scrollToId(id), 300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <a href="#main" className="focus-ring sr-only z-50 bg-terra px-4 py-2 text-rice focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Langsung ke konten
      </a>
      <Navbar />
      <div ref={page}>
        <div className="paper">
          <div className="paper-frame" />
          <main id="main">
            <Hero />
            <Intro />
            <Menu />
            <Experience />
            <Reservation />
            <Kitchen />
            <Specials />
            <Gallery />
            <Location />
            <FinalCta />
          </main>
        </div>
        <Footer />
      </div>
      <MobileReserve />
    </SmoothScroll>
  );
};

export default App;
