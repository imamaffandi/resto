import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";
import { story } from "../constant";

const Story = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const [text] = q("[data-story-text]");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Words light up at reading pace as the paragraph crosses the viewport
        SplitText.create(text, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: text, start: "top 75%", end: "bottom 45%", scrub: true },
              },
            ),
        });

        gsap.fromTo(
          q("[data-story-img]"),
          { yPercent: 10 },
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-28 md:grid-cols-12 md:gap-6 md:px-8 md:py-44"
    >
      <p
        data-story-text
        className="font-display text-3xl font-medium leading-[1.12] tracking-[-0.02em] md:col-span-8 md:text-5xl"
      >
        {story.text}
      </p>
      <div className="relative aspect-[3/4] overflow-hidden rounded-media bg-forest md:col-span-3 md:col-start-10 md:mt-48">
        <img
          data-story-img
          src={story.image}
          alt={story.alt}
          loading="lazy"
          width="900"
          height="1200"
          className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Story;
