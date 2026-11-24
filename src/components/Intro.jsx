import { photos, site } from "../data/site";
import { Photo, SectionHead, Missing } from "./ui";
import { Ornament, Cobek } from "./Illustrations";

const Intro = () => (
  <section id="tentang" aria-labelledby="tentang-title" className="relative py-20 md:py-32">
    <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-6 lg:col-span-7">
        <Photo
          photo={photos.tungku}
          width={1000}
          ratio={4 / 5}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="aspect-[4/5] md:mr-6"
        />
        <p className="mt-3 flex gap-3 font-serif text-sm italic text-wood">
          <span className="not-italic text-terra">Gbr. 01</span>
          Tungku dan panci di atas api: rupa pawon di banyak rumah Jawa.
        </p>
      </div>

      <div data-rise-group className="flex flex-col md:col-span-6 md:pt-24 lg:col-span-5">
        <SectionHead id="tentang-title" kicker="Tentang Kami" title="Lebih dari Sekadar Tempat Makan." />

        <p data-rise className="dropcap mt-10 text-[1.05rem] leading-relaxed text-ink/85">
          Dalam bahasa Jawa, <em className="font-serif">pawon</em> berarti dapur: ruang paling hangat di rumah, tempat
          api dinyalakan, masakan dijaga, dan orang-orang berkumpul sebelum hidangan sampai di meja. Dari kata itulah nama
          kami berasal.
        </p>
        <p data-rise className="mt-5 text-[1.05rem] leading-relaxed text-ink/85">
          Ayam yang dibakar di atas arang, sambal yang datang bertiga, gorengan dalam keranjang untuk dibagi, menu ramah
          anak, dan wedang hangat untuk menutup hari. Datang berdua atau bersama keluarga besar, mejanya kami siapkan.
        </p>

        <dl data-rise className="mt-10 grid grid-cols-1 border-y border-terra/40 sm:grid-cols-2">
          <div className="py-5 sm:border-r sm:border-terra/40 sm:pr-6">
            <dt className="font-serif text-2xl italic text-terra">Pawon</dt>
            <dd className="mt-1 text-sm leading-relaxed text-wood">(bahasa Jawa) dapur; tempat memasak di rumah.</dd>
          </div>
          <div className="border-t border-terra/40 py-5 sm:border-t-0 sm:pl-6">
            <dt className="font-serif text-2xl italic text-terra">Kemepyar</dt>
            <dd className="mt-1 text-sm leading-relaxed text-wood">
              {site.nameMeaning ?? <Missing>Arti nama dari pemilik, belum diisi</Missing>}
            </dd>
          </div>
        </dl>

        <div className="mt-12 flex items-end gap-6">
          <Ornament className="flex-1" />
          <Cobek className="h-24 w-24 shrink-0 text-wood/80" />
        </div>
      </div>
    </div>
  </section>
);

export default Intro;
