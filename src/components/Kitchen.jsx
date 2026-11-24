import { photos } from "../data/site";
import { menuById } from "../data/menu";
import { Photo } from "./ui";
import { Flame } from "./Illustrations";

// The dish names on the menu are built from everyday Javanese words for taste and sound
const words = [
  { word: "Kemruyuk", meaning: "renyah sampai terdengar bunyinya saat digigit", dishes: [7, 8] },
  { word: "Nyamleng", meaning: "enak, mantap, bikin ingin menambah", dishes: [2, 11] },
  { word: "Legit", meaning: "manis-gurih yang dalam dan meresap", dishes: [6, 25] },
  { word: "Sruput", meaning: "diseruput pelan-pelan selagi hangat", dishes: [5] },
];

const Kitchen = () => (
  <section aria-labelledby="dapur-title" className="relative py-20 md:py-32">
    <div className="shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
      <div data-rise-group className="md:col-span-6">
        <div className="bg-terra p-6 text-rice [container-type:inline-size] md:p-10">
          <p data-rise className="kicker !text-rice">
            Dari dapur kami
          </p>
          <h2 id="dapur-title" data-split className="display mt-6 text-[min(17cqi,6.4rem)] leading-[0.88]">
            Setiap Hidangan Punya Cerita.
          </h2>
        </div>
        <p data-rise className="dropcap mt-10 text-[1.05rem] leading-relaxed text-ink/85">
          Nama-nama di menu kami memakai kata-kata Jawa sehari-hari untuk rasa dan bunyi makanan. Kemruyuk, nyamleng,
          legit, sruput: kata yang biasa terdengar di meja makan rumah. Anggap saja petunjuk kecil tentang apa yang
          menunggu di piring Anda.
        </p>
      </div>

      <div className="relative md:col-span-5 md:col-start-8">
        <Photo
          photo={photos.flame}
          width={800}
          ratio={3 / 4}
          sizes="(min-width: 768px) 40vw, 100vw"
          className="aspect-[3/4]"
        />
        <div aria-hidden data-parallax="18" className="absolute -left-6 -top-8 hidden h-24 w-20 text-terra md:block">
          <Flame className="h-full w-full" />
        </div>
      </div>
    </div>

    <div className="shell mt-16 md:mt-24">
      <ul data-rise-group className="grid grid-cols-1 border-t border-terra/50 sm:grid-cols-2 lg:grid-cols-4">
        {words.map(({ word, meaning, dishes }, index) => (
          <li
            key={word}
            data-rise
            className={`border-b border-terra/50 py-7 sm:px-6 ${index % 2 ? "sm:border-l" : ""} ${index > 0 ? "lg:border-l" : "lg:pl-0"} sm:first:pl-0`}
          >
            <p className="font-sans text-xs tracking-label text-terra">0{index + 1}</p>
            <p className="mt-3 font-serif text-3xl italic">{word}</p>
            <p className="mt-2 text-sm leading-relaxed text-wood">{meaning}.</p>
            <p className="mt-4 font-serif text-sm italic text-terra">
              {dishes.map((id) => menuById[id].name).join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Kitchen;
