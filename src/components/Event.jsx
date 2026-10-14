import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { event } from "../constant";

const Event = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      const mm = gsap.matchMedia();
      mm.add({ isDesktop: "(min-width: 768px)", motionOk: MOTION_OK }, (context) => {
        const { isDesktop, motionOk } = context.conditions;
        if (!motionOk) return;

        // Pin the section while the framed photo opens up to full bleed, then bring in the details
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=110%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          })
          .fromTo(
            q("[data-event-frame]"),
            { clipPath: isDesktop ? "inset(14% 20% 14% 20% round 28px)" : "inset(12% 5% 12% 5% round 24px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", duration: 1 },
          )
          .fromTo(q("[data-event-img]"), { scale: 1.3 }, { scale: 1, ease: "none", duration: 1 }, 0)
          .from(q("[data-event-line]"), { yPercent: 60, autoAlpha: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" }, 0.55);
      });
    },
    { scope: root },
  );

  return (
    <section id="event" ref={root} className="relative h-[100dvh] overflow-hidden bg-ink">
      <div data-event-frame className="absolute inset-0 overflow-hidden">
        <img
          data-event-img
          src={event.image}
          alt={event.alt}
          loading="lazy"
          width="1800"
          height="1200"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/0" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-4 pb-12 md:px-8 md:pb-16">
        <div className="max-w-xl">
          <p data-event-line className="text-sm font-medium uppercase tracking-[0.16em] text-brand">
            {event.when}
          </p>
          <h2
            data-event-line
            className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl"
          >
            {event.title}
          </h2>
          <p data-event-line className="mt-5 max-w-[46ch] leading-relaxed text-bone/80">
            {event.body}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Event;
