import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap";
import { anchorTo, lockScroll } from "../lib/scroll";
import { navLinks } from "../lib/contact";
import { site } from "../data/site";
import { Flame } from "./Illustrations";

const Logo = ({ onNavigate }) => (
  <a
    href="#beranda"
    onClick={anchorTo("beranda", onNavigate)}
    className="focus-ring flex shrink-0 items-center gap-3 rounded-full"
    aria-label={`${site.name}, kembali ke beranda`}
  >
    <img src="/logo.jpg" alt="" width="52" height="52" className="logo-ink h-12 w-12 rounded-full md:h-[52px] md:w-[52px]" />
    <span className="hidden font-serif text-[0.95rem] font-semibold uppercase leading-[1.05] tracking-[0.08em] sm:block">
      Pawon
      <br />
      <span className="font-normal italic tracking-[0.04em] text-terra">Kemepyar</span>
    </span>
  </a>
);

// Oval, slightly rotated, like a rubber-stamped "reserved" mark
const ReserveStamp = ({ onNavigate }) => (
  <a
    href="#reservasi"
    onClick={anchorTo("reservasi", onNavigate)}
    className="focus-ring group relative inline-flex h-11 -rotate-[5deg] items-center gap-2 rounded-[50%] border-[1.5px] border-terra px-5 font-serif text-[1.05rem] font-semibold italic text-terra transition-colors duration-300 hover:bg-terra hover:text-rice md:h-12 md:px-7"
  >
    <span aria-hidden className="h-1 w-1 rounded-full bg-current" />
    Reservasi
    <span aria-hidden className="h-1 w-1 rounded-full bg-current" />
  </a>
);

const Navbar = () => {
  const header = useRef(null);
  const list = useRef(null);
  const indicator = useRef(null);
  const overlay = useRef(null);
  const toggle = useRef(null);
  const [active, setActive] = useState("beranda");
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    const nav = header.current;
    ScrollTrigger.create({ start: 24, end: "max", toggleClass: { targets: nav, className: "is-scrolled" } });

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Tuck away while reading down, return on any scroll up
      let hidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const shouldHide = self.direction === 1 && self.scroll() > 640;
          if (shouldHide === hidden) return;
          hidden = shouldHide;
          gsap.to(nav, { yPercent: hidden ? -110 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        },
      });
    });
  });

  // Track the section in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // One underline slides between links: follows hover, rests on the active section
  useLayoutEffect(() => {
    const target = list.current?.querySelector(`[data-link="${hovered ?? active}"]`);
    const bar = indicator.current;
    if (!bar) return;
    if (!target) {
      gsap.to(bar, { scaleX: 0, duration: 0.3 });
      return;
    }
    gsap.to(bar, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      scaleX: 1,
      duration: 0.55,
      ease: "power3.out",
    });
  }, [active, hovered]);

  // Mobile overlay: lock scroll, animate links in, close on Escape, return focus to the toggle
  useEffect(() => {
    if (!open) return undefined;
    lockScroll(true);
    // The header carries the close button: make sure it is showing even if it had tucked away
    gsap.to(header.current, { yPercent: 0, duration: 0.3, overwrite: "auto" });
    const links = overlay.current.querySelectorAll("[data-overlay-item]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      gsap.fromTo(overlay.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" });
      gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.06, delay: 0.25, ease: "power4.out" });
    }
    overlay.current.querySelector("a")?.focus({ preventScroll: true });
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggleButton = toggle.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      toggleButton?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header ref={header} className="nav-bar fixed inset-x-0 top-0 z-50">
        <nav aria-label="Navigasi utama" className="shell flex h-[72px] items-center justify-between gap-6 md:h-20">
          <Logo onNavigate={close} />

          <ul ref={list} className="relative hidden items-center gap-8 lg:flex" onMouseLeave={() => setHovered(null)}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  data-link={link.id}
                  onClick={anchorTo(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onFocus={() => setHovered(link.id)}
                  onBlur={() => setHovered(null)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={`focus-ring block py-2 font-sans text-[0.78rem] font-medium uppercase tracking-label transition-colors duration-300 ${
                    active === link.id ? "text-ink" : "text-wood hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <span
              ref={indicator}
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 origin-left scale-x-0 bg-terra"
            />
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ReserveStamp onNavigate={close} />
            </div>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              className="focus-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-terra font-serif text-[0.95rem] font-semibold italic text-rice transition-transform duration-300 hover:scale-105 lg:hidden"
            >
              <span aria-hidden className="absolute top-2.5 h-1 w-1 rounded-full bg-rice" />
              {open ? "Tutup" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="menu-overlay"
          ref={overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi"
          className="fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-rice px-6 pb-8 pt-28"
        >
          <div className="paper-frame !fixed" />
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.id} className="overflow-hidden border-b border-terra/30">
                <a
                  data-overlay-item
                  href={`#${link.id}`}
                  onClick={anchorTo(link.id, close)}
                  className="focus-ring flex items-baseline justify-between py-4 font-serif text-[2.6rem] font-medium leading-none tracking-[-0.02em]"
                >
                  {link.label}
                  <span className="font-sans text-xs tracking-label text-terra">0{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-end justify-between gap-4 pt-10">
            <a href="#reservasi" onClick={anchorTo("reservasi", close)} className="btn-solid">
              Reservasi Sekarang
            </a>
            <Flame className="h-12 w-10 text-terra" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
