import { site } from "../data/site";
import { menuById } from "../data/menu";
import { SectionHead } from "./ui";
import { Bakaran, Kendil, Cobek, Blirik, Ornament } from "./Illustrations";

// Highlights are real menu items. Promotions only appear when site.promotions has entries.
const highlights = [
  { id: 1, Art: Bakaran, art: "Ilustrasi panggangan arang" },
  { id: 6, Art: Kendil, art: "Ilustrasi kendil tanah liat" },
  { id: 17, Art: Cobek, art: "Ilustrasi cobek dan cabai" },
];
const drinks = [21, 23, 20, 22, 24];

const Specials = () => (
  <section aria-labelledby="istimewa-title" className="section-rule relative py-20 md:py-32">
    <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-0">
      <div className="lg:col-span-8 lg:border-r lg:border-terra/40 lg:pr-12">
        <SectionHead id="istimewa-title" kicker="Sorotan menu" title="Yang Istimewa dari Pawon Kami." className="max-w-2xl" />

        {site.promotions.length > 0 && (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {site.promotions.map((promo) => (
              <li key={promo.title} className="border border-terra bg-terra/5 p-6 outline outline-1 outline-offset-[3px] outline-terra/40">
                {promo.period && <p className="label text-terra">{promo.period}</p>}
                <p className="mt-2 font-serif text-2xl italic">{promo.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-wood">{promo.body}</p>
              </li>
            ))}
          </ul>
        )}

        <ul data-rise-group className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {highlights.map(({ id, Art, art }) => {
            const dish = menuById[id];
            return (
              <li key={id} data-rise className="flex flex-col">
                <div className="flex aspect-square items-center justify-center border border-terra/30 bg-sand/20">
                  <Art className="h-[88%] w-[88%] text-ink/80" title={art} />
                </div>
                <p className="label mt-5 text-terra">{dish.categoryLabel}</p>
                <h3 className="mt-2 font-serif text-2xl font-medium italic leading-tight">{dish.name}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-wood">{dish.description}</p>
                <p className="mt-4 border-t border-terra/40 pt-3 font-serif text-lg text-terra">{dish.priceLabel}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Side column, like the "this week" box of a printed menu */}
      <aside aria-labelledby="minuman-title" className="lg:col-span-4 lg:pl-12">
        <div className="flex h-full flex-col border border-terra/50 p-1">
          <div className="flex flex-1 flex-col items-center border border-terra/25 px-6 py-10 text-center">
            <p className="font-serif text-lg italic text-terra">Teman ngobrol</p>
            <h3 id="minuman-title" className="display mt-3 text-5xl text-terra xl:text-6xl">
              Wedang &amp; Kopi
            </h3>
            <Blirik className="mt-6 h-36 w-36 text-ink/80" title="Ilustrasi cangkir blirik berisi wedang" />
            <Ornament className="mt-4 w-full" />
            <ul className="mt-6 w-full space-y-5 text-left">
              {drinks.map((id) => {
                const drink = menuById[id];
                return (
                  <li key={id}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-lg italic">{drink.name}</span>
                      <span aria-hidden className="flex-1 translate-y-[-0.25em] border-b border-dotted border-wood/50" />
                      <span className="font-serif text-terra">{drink.priceLabel}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </section>
);

export default Specials;
