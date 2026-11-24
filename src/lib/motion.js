import { gsap, ScrollTrigger, SplitText, MOTION_OK } from "./gsap";

// Play once and stay. Not `once: true`: those triggers kill themselves mid-refresh when the page
// loads already scrolled past them (reload, #anchor), which crashes ScrollTrigger's refresh loop.
const PLAY_ONCE = "play none none none";

// Declarative scroll motion. Mark elements in JSX, this wires them once for the whole page:
//   data-split        heading lines rise out of a mask
//   data-rise         fades up; siblings inside one [data-rise-group] stagger together
//   data-clip         photo frame wipes open, its <img> settles from a slight zoom
//   data-parallax="n" drifts n% against the scroll (decorative pieces only)
//   data-spin         rotates with scroll (the stamp)
export const initEditorialMotion = (root) => {
  const mm = gsap.matchMedia();

  mm.add(MOTION_OK, () => {
    const all = (selector) => gsap.utils.toArray(selector, root);

    all("[data-split]").forEach((el) => {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 105,
            duration: 1.1,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE },
            // Masks clip descenders at tight line-heights: drop them once the lines are in
            onComplete: () => self.revert(),
          }),
      });
    });

    all("[data-rise-group]").forEach((group) => {
      gsap.from(gsap.utils.toArray("[data-rise]", group), {
        autoAlpha: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: "top 82%", toggleActions: PLAY_ONCE },
      });
    });

    all("[data-clip]").forEach((frame) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 85%", toggleActions: PLAY_ONCE } });
      tl.fromTo(
        frame,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
      );
      const img = frame.querySelector("img");
      if (img) tl.from(img, { scale: 1.18, duration: 1.8, ease: "power3.out" }, 0);
    });

    all("[data-parallax]").forEach((el) => {
      const amount = Number(el.dataset.parallax) || 10;
      gsap.fromTo(
        el,
        { yPercent: amount },
        {
          yPercent: -amount,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    all("[data-spin]").forEach((el) => {
      gsap.to(el, {
        rotate: 220,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    });
  });

  // Web fonts change line breaks, so re-measure once they land
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => mm.revert();
};
