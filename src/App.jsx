import { useEffect } from "react";
import { Navbar, Home, Story, Event, Menu, Footer, SmoothScroll } from "./components";
import { ScrollTrigger } from "./lib/gsap";

const App = () => {
  // Web fonts change text metrics, so re-measure every trigger once they land
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Home />
        <Story />
        <Event />
        <Menu />
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default App;
