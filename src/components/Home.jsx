import { useRef } from "react";
import { ArrowDownRight } from "@phosphor-icons/react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";
import { hero } from "../constant";
import { anchorTo } from "../lib/scroll";

const Home = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const [title] = q("[data-hero-title]");
      const [frame] = q("[data-hero-frame]");
      const [img] = q("[data-hero-img]");
      const reveal = q("[data-hero-reveal]");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, (context) => {
        let cancelled = false;
        gsap.set(title, { autoAlpha: 0 });
        gsap.set(reveal, { autoAlpha: 0, y: 24 });
        gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" });

        // Split only after fonts load so line breaks are measured on the real face
        const intro = context.add(() => {
          if (cancelled) return;
          const split = SplitText.create(title, { type: "lines", mask: "lines" });
          gsap
            .timeline()
            .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" })
            .from(img, { scale: 1.35, duration: 2, ease: "power3.out" }, 0)
            .set(title, { autoAlpha: 1 }, 0.35)
            .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "power4.out" }, 0.35)
            .to(reveal, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.8);
        });
        document.fonts.ready.then(intro);

        // Photo drifts slower than the page as the hero scrolls away
        gsap.to(q("[data-hero-parallax]"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          cancelled = true;
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-end gap-10 px-4 pb-8 pt-24 md:grid-cols-12 md:gap-6 md:px-8 md:pb-10"
    >
      <div className="md:col-span-6 md:pb-4">
        <h1
          data-hero-title
          className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] [text-wrap:balance] md:text-6xl xl:text-7xl"
        >
          {hero.title}
        </h1>
        <p data-hero-reveal className="mt-6 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
          {hero.body}
        </p>
        <div data-hero-reveal className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#contact" onClick={anchorTo("contact")} className="btn-primary">
            Reserve a table
            <ArrowDownRight size={16} weight="bold" aria-hidden />
          </a>
          <a href="#menu" onClick={anchorTo("menu")} className="btn-ghost">
            See the menu
          </a>
        </div>
      </div>

      <div className="md:col-span-6">
        <div data-hero-frame className="relative h-[52dvh] overflow-hidden rounded-media bg-forest md:h-[calc(100dvh-8.5rem)]">
          <div data-hero-parallax className="absolute inset-x-0 -top-[10%] h-[120%]">
            <img
              data-hero-img
              src={hero.image}
              alt={hero.alt}
              {...{ fetchpriority: "high" }} // React 18.2 has no typed prop for this yet
              width="1600"
              height="1200"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
