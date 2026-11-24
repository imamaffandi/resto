import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { categories, menu, priceRange, rupiah } from "../data/menu";
import { img, PLACEHOLDER_PHOTOS } from "../data/site";
import { SectionHead, PlaceholderTag } from "./ui";
import { Cobek } from "./Illustrations";

const ALL = "semua";
const tabs = [...categories.map(({ id, label }) => ({ id, label })), { id: ALL, label: "Semua Menu" }];

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Large photo beside the list: shows the hovered dish, otherwise the category's lead photo
const Preview = ({ item, fallback, categoryLabel }) => {
  const photo = item?.photo ?? fallback;
  const { src, srcSet, alt } = img(photo, 640, 4 / 5);
  return (
    <figure className="photo aspect-[16/10] md:aspect-[4/5]">
      <img
        key={src}
        src={src}
        srcSet={srcSet}
        sizes="(min-width: 768px) 30vw, 100vw"
        alt={alt}
        loading="lazy"
        width="640"
        height="800"
        className="motion-safe:animate-[fadeIn_.5s_ease-out]"
      />
      {PLACEHOLDER_PHOTOS && <PlaceholderTag className="absolute right-2 top-2" />}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-16 text-rice">
        <span className="block font-sans text-[0.65rem] uppercase tracking-label opacity-80">{item ? item.categoryLabel : "Kategori"}</span>
        <span className="mt-1 block font-serif text-2xl italic">{item ? item.name : categoryLabel}</span>
      </figcaption>
    </figure>
  );
};

const MenuItem = ({ item, onPreview }) => (
  <li
    data-menu-item
    onMouseEnter={() => onPreview(item)}
    className="group break-inside-avoid border-b border-dashed border-terra/35 py-5 first:pt-0 md:first:pt-5"
  >
    <div className="flex items-baseline gap-3">
      <h3 className="font-serif text-[1.3rem] font-medium leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-terra">
        {item.name}
      </h3>
      <span aria-hidden className="min-w-[1.5rem] flex-1 translate-y-[-0.3em] border-b border-dotted border-wood/50" />
      <p className="shrink-0 font-serif text-lg tabular-nums text-terra">{item.priceLabel}</p>
    </div>
    <p className="mt-1.5 max-w-[46ch] text-[0.95rem] leading-relaxed text-wood">{item.description}</p>
  </li>
);

const Menu = () => {
  const [category, setCategory] = useState(categories[0].id);
  const [preview, setPreview] = useState(null);
  const listRef = useRef(null);
  const first = useRef(true);

  const items = useMemo(() => (category === ALL ? menu : menu.filter((i) => i.categoryId === category)), [category]);
  const activeCategory = categories.find((c) => c.id === category);
  const lead = activeCategory?.photo ?? categories[0].photo;

  // Re-deal the list on every filter change (not on first paint: the scroll reveal handles that)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPreview(null);
    if (reduceMotion()) return;
    gsap.fromTo(
      listRef.current.querySelectorAll("[data-menu-item]"),
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.035, ease: "power3.out", overwrite: true },
    );
  }, [category]);

  const onTabKey = (event) => {
    const index = tabs.findIndex((t) => t.id === category);
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = tabs[(index + step + tabs.length) % tabs.length];
    setCategory(next.id);
    event.currentTarget.querySelector(`#tab-${next.id}`)?.focus();
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="section-rule relative py-20 md:py-32">
      <div className="shell">
        <div data-rise-group className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <p aria-hidden data-rise className="display text-[30vw] leading-[0.8] text-terra md:col-span-5 md:text-[10rem] xl:text-[12rem]">
            Menu
          </p>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHead id="menu-title" kicker="Dari dapur ke meja" title="Dari Pawon, Menuju Meja Anda." />
            <p data-rise className="mt-6 max-w-[44ch] leading-relaxed text-wood">
              {menu.length} hidangan dalam empat bagian, dari {rupiah(priceRange.min)} sampai {rupiah(priceRange.max)}.
              Harga dapat berubah sewaktu-waktu; konfirmasi di tempat.
            </p>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-6 border-y border-terra/40 py-3">
          <div
            role="tablist"
            aria-label="Kategori menu"
            onKeyDown={onTabKey}
            className="no-scrollbar -mx-1 flex flex-1 gap-2 overflow-x-auto px-1 py-1"
          >
            {tabs.map((tab) => {
              const selected = tab.id === category;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setCategory(tab.id)}
                  className={`focus-ring min-h-[44px] shrink-0 border px-4 font-serif text-[1.05rem] italic transition-colors duration-300 ${
                    selected ? "border-terra bg-terra text-rice" : "border-terra/40 text-ink hover:border-terra hover:text-terra"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <Cobek className="hidden h-14 w-14 shrink-0 text-wood/70 md:block" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Preview item={preview} fallback={lead} categoryLabel={activeCategory?.label ?? "Semua Menu"} />
            </div>
          </div>

          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${category}`}
            className="md:col-span-8"
            onMouseLeave={() => setPreview(null)}
          >
            <ul ref={listRef} className="lg:columns-2 lg:gap-12 lg:[column-rule:1px_solid_rgb(166_83_55_/_0.35)]">
              {items.map((item) => (
                <MenuItem key={item.id} item={item} onPreview={setPreview} />
              ))}
            </ul>

            {category !== ALL && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <p className="font-serif italic text-wood">
                  Menampilkan {items.length} dari {menu.length} hidangan.
                </p>
                <button type="button" onClick={() => setCategory(ALL)} className="btn-line">
                  Lihat Menu Lengkap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
