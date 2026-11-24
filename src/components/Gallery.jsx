import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { lockScroll } from "../lib/scroll";
import { img, photos, PLACEHOLDER_PHOTOS } from "../data/site";
import { SectionHead, PlaceholderTag } from "./ui";

// Varied ratios give the masonry its rhythm; captions describe what is actually in each photo
const items = [
  { photo: photos.nasiDaun, ratio: 4 / 5, caption: "Nasi dan lauk pedas di atas daun pisang" },
  { photo: photos.wokFire, ratio: 1, caption: "Api besar di bawah wajan" },
  { photo: photos.gudeg, ratio: 3 / 4, caption: "Nasi, telur, dan lauk bumbu" },
  { photo: photos.cook, ratio: 4 / 3, caption: "Di balik meja hidangan" },
  { photo: photos.tofu, ratio: 4 / 5, caption: "Tahu dalam mangkuk tanah liat" },
  { photo: photos.feast, ratio: 1, caption: "Lauk, sambal, dan minuman" },
  { photo: photos.wok, ratio: 3 / 4, caption: "Masakan diaduk di atas api" },
  { photo: photos.ayamGoreng, ratio: 4 / 3, caption: "Ayam goreng bertabur kremes" },
  { photo: photos.kopi, ratio: 4 / 5, caption: "Segelas kopi di sore hari" },
];

const Lightbox = ({ index, onClose, onStep }) => {
  const dialog = useRef(null);
  const close = useRef(null);
  const item = items[index];
  const { src, srcSet, alt } = img(item.photo, 1600);

  useEffect(() => {
    lockScroll(true);
    close.current?.focus();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) gsap.fromTo(dialog.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
      // Keep Tab inside the dialog
      if (event.key === "Tab") {
        const focusables = dialog.current.querySelectorAll("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} dari ${items.length}: ${item.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-rice"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="font-sans text-xs uppercase tracking-label text-sand">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button ref={close} type="button" onClick={onClose} className="btn border border-rice/40 text-rice hover:bg-rice hover:text-ink">
          Tutup
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24" onClick={(event) => event.target === event.currentTarget && onClose()}>
        <img key={src} src={src} srcSet={srcSet} sizes="90vw" alt={alt} className="max-h-full max-w-full object-contain motion-safe:animate-[fadeIn_.4s_ease-out]" />
        <button type="button" onClick={() => onStep(-1)} aria-label="Foto sebelumnya" className="focus-ring absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-rice/40 font-serif text-2xl hover:bg-rice hover:text-ink md:left-6">
          ‹
        </button>
        <button type="button" onClick={() => onStep(1)} aria-label="Foto berikutnya" className="focus-ring absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-rice/40 font-serif text-2xl hover:bg-rice hover:text-ink md:right-6">
          ›
        </button>
      </div>
      <p className="px-5 py-5 text-center font-serif text-lg italic text-sand md:py-7">
        {item.caption}
        {PLACEHOLDER_PHOTOS && <span className="ml-3 font-sans text-[0.65rem] not-italic uppercase tracking-label text-sand/60">Foto contoh</span>}
      </p>
    </div>
  );
};

const Gallery = () => {
  const [open, setOpen] = useState(null);
  const triggers = useRef([]);

  const step = useCallback((delta) => setOpen((i) => (i + delta + items.length) % items.length), []);
  const lastOpened = useRef(null);
  useEffect(() => {
    if (open !== null) lastOpened.current = open;
  }, [open]);
  const closeBox = useCallback(() => {
    setOpen(null);
    // Hand focus back to the photo the visitor was last looking at
    requestAnimationFrame(() => triggers.current[lastOpened.current]?.focus({ preventScroll: true }));
  }, []);

  return (
    <section id="galeri" aria-labelledby="galeri-title" className="section-rule relative py-20 md:py-32">
      <div className="shell">
        <div data-rise-group className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead id="galeri-title" kicker="Galeri" title="Sepotong Cerita dari Pawon Kemepyar." className="w-full max-w-3xl md:flex-1" />
          <p data-rise className="max-w-[30ch] font-serif italic text-wood">
            Ketuk foto untuk melihat lebih besar.
          </p>
        </div>

        <ul className="mt-14 columns-2 gap-3 md:columns-3 md:gap-5">
          {items.map((item, index) => {
            const { src, srcSet, alt } = img(item.photo, 560, item.ratio);
            return (
              <li key={item.caption} className="mb-3 break-inside-avoid md:mb-5">
                <button
                  ref={(el) => (triggers.current[index] = el)}
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`Perbesar foto: ${item.caption}`}
                  className="focus-ring group block w-full text-left"
                >
                  <span data-clip className="photo block" style={{ aspectRatio: item.ratio }}>
                    <img
                      src={src}
                      srcSet={srcSet}
                      sizes="(min-width: 768px) 30vw, 50vw"
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      width="560"
                      height={Math.round(560 / item.ratio)}
                      className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                    />
                    <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
                    {PLACEHOLDER_PHOTOS && <PlaceholderTag className="absolute left-2 top-2" />}
                  </span>
                  <span className="mt-2 block font-serif text-sm italic text-wood">{item.caption}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {open !== null && <Lightbox index={open} onClose={closeBox} onStep={step} />}
    </section>
  );
};

export default Gallery;
