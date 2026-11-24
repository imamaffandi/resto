import { photos } from "../data/site";
import { Photo } from "./ui";
import { Kendil } from "./Illustrations";

// Editorial collage: two independently stacked columns of different weight, so frames
// stagger against each other without leaving holes. Collapses to one column on mobile.
const Experience = () => (
  <section aria-labelledby="suasana-title" className="relative overflow-hidden bg-ink py-20 text-rice md:py-32">
    <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
      <div className="flex flex-col md:col-span-5">
        <div data-rise-group className="title-wrap">
          <p data-rise className="kicker !text-sand">
            Suasana
          </p>
          <h2 id="suasana-title" data-split className="title mt-5">
            Tempat Berkumpul, Menikmati, dan <em className="font-normal text-sand">Berbagi Cerita.</em>
          </h2>
          <p data-rise className="mt-8 max-w-[42ch] leading-relaxed text-rice/75">
            Hidangan untuk dibagi di tengah meja, nasi yang terus mengepul, dan obrolan yang tidak perlu buru-buru
            selesai. Makan bersama memang paling enak.
          </p>
        </div>

        <div className="mt-14 hidden md:ml-auto md:block md:w-[80%]">
          <Photo photo={photos.table} width={600} ratio={3 / 4} sizes="30vw" className="aspect-[3/4] ring-sand/30" />
          <p className="mt-3 font-serif text-sm italic text-sand/80">Gbr. 03 · Meja kayu, piring-piring penuh</p>
        </div>

        <Kendil className="mt-12 hidden h-32 w-32 text-sand/60 md:block" />
      </div>

      <div className="flex flex-col md:col-span-7">
        <Photo
          photo={photos.interior}
          width={1100}
          ratio={4 / 3}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="aspect-[4/3] ring-sand/30"
        />
        <p className="mt-3 font-serif text-sm italic text-sand/80">Gbr. 02 · Ruang makan beratap kayu</p>

        <blockquote data-rise-group className="my-14 border-l border-sand/40 pl-6 md:my-20 md:ml-16 md:pl-10">
          <p data-rise className="font-serif text-2xl italic leading-snug text-sand md:text-[2rem]">
            “Mangan ora mangan, kumpul.”
          </p>
          <p data-rise className="mt-3 text-sm text-rice/60">
            Pepatah Jawa: makan atau tidak, yang penting berkumpul.
          </p>
        </blockquote>

        <div data-parallax="5" className="md:w-[88%]">
          <Photo
            photo={photos.spread}
            width={1000}
            ratio={16 / 10}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[16/10] ring-sand/30"
          />
          <p className="mt-3 font-serif text-sm italic text-sand/80">Gbr. 04 · Nasi dan lauk di atas daun pisang, untuk bersama</p>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
