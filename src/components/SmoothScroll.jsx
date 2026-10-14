import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { setLenis } from "../lib/scroll";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return children;
};

export default SmoothScroll;
