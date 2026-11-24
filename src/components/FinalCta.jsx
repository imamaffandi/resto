import { whatsappLink } from "../lib/contact";
import { anchorTo } from "../lib/scroll";
import { Photo, PlaceholderTag } from "./ui";
import { photos, PLACEHOLDER_PHOTOS } from "../data/site";
import { Stamp } from "./Illustrations";

const FinalCta = () => {
  const wa = whatsappLink(`Halo Pawon Kemepyar, saya ingin bertanya.`);
  return (
    <section aria-labelledby="ajakan-title" className="relative pb-20 pt-4 md:pb-28">
      <div className="shell">
        <div className="relative">
          <Photo
            photo={photos.wokFire}
            width={1600}
            ratio={16 / 9}
            sizes="100vw"
            className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
            imgClassName="scale-105"
            tag={false}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25" />
            {PLACEHOLDER_PHOTOS && <PlaceholderTag className="absolute left-2 top-2" />}
          </Photo>

          <div data-rise-group className="title-wrap absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-rice">
            <p data-rise className="font-serif text-lg italic text-sand">
              Sampai jumpa di meja makan
            </p>
            <h2 id="ajakan-title" data-split className="title mt-4 w-full max-w-4xl">
              Hangatnya Suasana, Nikmatnya Hidangan.
            </h2>
            <p data-rise className="mt-6 max-w-[40ch] leading-relaxed text-rice/80">
              Temukan pengalaman bersantap yang nyaman bersama Pawon Kemepyar.
            </p>
            <div data-rise className="mt-9">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-paper">
                  Hubungi Kami
                </a>
              ) : (
                <a href="#reservasi" onClick={anchorTo("reservasi")} className="btn-paper">
                  Hubungi Kami
                </a>
              )}
            </div>
          </div>

          <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-4 h-28 w-28 text-terra md:-right-10 md:h-40 md:w-40">
            <div data-spin className="rounded-full bg-rice">
              <Stamp />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
