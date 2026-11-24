import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";
import { anchorTo } from "../lib/scroll";
import { photos } from "../data/site";
import { menu, priceRange, rupiah } from "../data/menu";
import { Photo } from "./ui";
import { Tungku } from "./Illustrations";

const Diamond = () => (
  <span aria-hidden className="mx-[0.18em] inline-flex h-[0.42em] w-[0.42em] translate-y-[-0.08em] rotate-45 items-center justify-center bg-terra align-middle">
    <span className="h-[30%] w-[30%] bg-rice" />
  </span>
);

const WORDMARK = (
  <>
    Pawon <Diamond /> Kemepyar <Diamond />{" "}
  </>
);

const Hero = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, (context) => {
        let cancelled = false;
        const [title] = q("[data-hero-title]");
        gsap.set(title, { autoAlpha: 0 });
        gsap.set(q("[data-hero-reveal]"), { autoAlpha: 0, y: 22 });
        gsap.set(q("[data-hero-frame]"), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(q("[data-hero-rule]"), { scaleX: 0 });

        // Split once fonts are in so the lines are measured on the real face
        const intro = context.add(() => {
          if (cancelled) return;
          const split = SplitText.create(title, { type: "lines", mask: "lines" });
          gsap
            .timeline({ defaults: { ease: "power4.out" }, onComplete: () => split.revert() })
            .to(q("[data-hero-rule]"), { scaleX: 1, duration: 1.2, stagger: 0.1, ease: "power3.inOut" })
            .from(q("[data-hero-mark]"), { yPercent: 100, duration: 1.3 }, 0.1)
            .to(q("[data-hero-frame]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" }, 0.3)
            .from(q("[data-hero-img]"), { scale: 1.3, duration: 2.2, ease: "power3.out" }, 0.3)
            .set(title, { autoAlpha: 1 }, 0.5)
            .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.5)
            .to(q("[data-hero-reveal]"), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.9)
            .from(q("[data-hero-seal]"), { scale: 0.6, rotate: -40, autoAlpha: 0, duration: 1.1, ease: "back.out(1.6)" }, 1.1);
        });
        document.fonts.ready.then(intro);

        gsap.to(q("[data-hero-img]"), {
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
    <section id="beranda" ref={root} aria-labelledby="hero-title" className="relative pt-[84px] md:pt-[104px]">
      <div className="shell">
        {/* Running wordmark, the way the logo's name would run across a printed banner */}
        <div aria-hidden className="relative overflow-hidden py-3 md:py-5">
          <div data-hero-mark className="flex w-max motion-safe:animate-[marquee_38s_linear_infinite]">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className="display whitespace-nowrap pr-[0.2em] text-[22vw] text-terra sm:text-[17vw] lg:text-[12.5rem] xl:text-[14rem]"
              >
                {WORDMARK}
                {WORDMARK}
              </p>
            ))}
          </div>
        </div>

        <div data-hero-rule className="rule origin-right" />
        <div className="flex items-center justify-between gap-4 py-3">
          <p data-hero-reveal className="label">
            Masakan Nusantara · Dapur Jawa
          </p>
          <p data-hero-reveal className="hidden font-serif italic text-terra sm:block">
            {menu.length} hidangan, {rupiah(priceRange.min)} – {rupiah(priceRange.max)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 pb-16 pt-6 md:pb-24 md:pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col [container-type:inline-size] lg:col-span-5 lg:pt-6">
            <p data-hero-reveal className="kicker">
              Selamat datang di pawon kami
            </p>
            <h1
              id="hero-title"
              data-hero-title
              className="mt-6 font-serif text-[min(15.5cqi,5.3rem)] md:text-[min(11cqi,5.3rem)] lg:text-[min(15.5cqi,5.3rem)] font-medium leading-[0.95] tracking-[-0.03em] [text-wrap:balance]"
            >
              Rasa Tradisi, <em className="font-normal text-terra">Hangatnya</em> Kebersamaan.
            </h1>
            <p data-hero-reveal className="mt-7 max-w-[40ch] text-[1.05rem] leading-relaxed text-wood">
              Selamat datang di Pawon Kemepyar. Ayam bakar dari arang, gudeg yang legit, gorengan yang kemruyuk, dan
              wedang hangat, untuk disantap pelan-pelan bersama orang-orang terdekat.
            </p>
            <div data-hero-reveal className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#reservasi" onClick={anchorTo("reservasi")} className="btn-solid">
                Reservasi Sekarang
              </a>
              <a href="#menu" onClick={anchorTo("menu")} className="btn-line">
                Lihat Menu
              </a>
            </div>
            <Tungku className="mt-auto hidden h-36 w-36 self-end text-wood/80 lg:block" />
          </div>

          <div className="relative lg:col-span-7">
            <div data-hero-frame className="relative">
              <Photo
                photo={photos.hero}
                width={1100}
                ratio={5 / 4}
                eager
                clip={false}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[5/4]"
                imgClassName="origin-center"
                imgProps={{ "data-hero-img": "" }}
              />
            </div>
            {/* The logo, unaltered, set like a wax seal on the corner of the photograph */}
            <div
              data-hero-seal
              className="absolute -bottom-8 -left-3 h-28 w-28 rounded-full bg-rice p-1.5 shadow-[0_10px_30px_-12px_rgba(29,27,24,0.5)] ring-1 ring-terra/40 md:-left-10 md:h-36 md:w-36"
            >
              <img src="/logo.jpg" alt="Logo Pawon Kemepyar" width="144" height="144" className="logo-ink h-full w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
