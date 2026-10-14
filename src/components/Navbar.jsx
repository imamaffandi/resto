import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap";
import { navLinks, site } from "../constant";
import { anchorTo } from "../lib/scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  useGSAP(() => {
    const nav = navRef.current;

    ScrollTrigger.create({
      start: 40,
      end: "max",
      toggleClass: { targets: nav, className: "is-scrolled" },
    });

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(nav, { autoAlpha: 0, duration: 1, delay: 0.9 });

      // Tuck the bar away while reading down, bring it back on any scroll up
      let hidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const shouldHide = self.direction === 1 && self.scroll() > 480;
          if (shouldHide === hidden) return;
          hidden = shouldHide;
          gsap.to(nav, { yPercent: hidden ? -100 : 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        },
      });
    });
  });

  // IntersectionObserver keeps the active link correct regardless of pin spacers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ["home", ...navLinks.map((link) => link.id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={navRef} className="nav fixed inset-x-0 top-0 z-40 border-b border-transparent">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <a href="#home" onClick={anchorTo("home")} className="focus-ring rounded-sm font-display text-xl font-semibold tracking-[-0.02em]">
          {site.name}
        </a>
        <ul className="flex items-center gap-5 text-sm md:gap-9">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={anchorTo(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`focus-ring group relative rounded-sm py-1 transition-colors duration-300 ${isActive ? "text-bone" : "text-muted hover:text-bone"}`}
                >
                  {link.title}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
