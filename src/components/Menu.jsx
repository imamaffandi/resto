import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { dishes } from "../constant";

const Menu = () => {
  const wrap = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: vertical scroll pans the dish row. Mobile and reduced motion: native swipe row.
      mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        const distance = () => Math.max(0, track.current.scrollWidth - wrap.current.clientWidth);

        const pan = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Photos slide inside their frames against the pan for depth
        gsap.utils.toArray("[data-dish]", wrap.current).forEach((card) => {
          gsap.fromTo(
            card.querySelector("[data-dish-img]"),
            { xPercent: -7, scale: 1.18 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: pan, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });
    },
    { scope: wrap },
  );

  return (
    <section
      id="menu"
      ref={wrap}
      aria-label="Menu"
      tabIndex={0}
      className="menu-wrap relative w-full snap-x snap-mandatory scroll-px-4 overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand md:snap-none md:overflow-hidden"
    >
      <div ref={track} className="flex w-max items-stretch gap-4 px-4 py-24 md:h-[100dvh] md:items-center md:gap-8 md:px-8 md:py-0">
        <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-end md:w-[32vw] md:pr-10">
          <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] md:text-7xl">On the menu</h2>
          <p className="mt-5 max-w-[34ch] leading-relaxed text-muted">
            Ten plates we cook every day, from light bowls to slow-cooked mains.
          </p>
        </div>

        {dishes.map((dish, index) => (
          <article
            key={dish.id}
            data-dish
            className={`w-[72vw] shrink-0 snap-start md:w-[22vw] ${index % 2 ? "md:mt-28" : "md:mb-28"}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-media bg-forest">
              <img
                data-dish-img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
                width="800"
                height="1000"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-medium tracking-[-0.01em] md:text-2xl">{dish.name}</h3>
              <p className="tabular-nums text-brand">${dish.price.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{dish.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Menu;
