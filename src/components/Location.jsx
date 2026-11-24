import { site } from "../data/site";
import { formatAddress, instagramLink, whatsappLink } from "../lib/contact";
import { SectionHead, Missing } from "./ui";
import { MapSketch } from "./Illustrations";

const Row = ({ label, children }) => (
  <div data-rise className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-terra/35 py-5 sm:grid-cols-[9rem_1fr]">
    <dt className="label pt-1">{label}</dt>
    <dd className="font-serif text-lg leading-snug">{children}</dd>
  </div>
);

const Location = () => {
  const address = formatAddress(site.address);
  const wa = whatsappLink();
  const ig = instagramLink();

  return (
    <section id="lokasi" aria-labelledby="lokasi-title" className="section-rule relative py-20 md:py-32">
      <div className="shell grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
        <div data-rise-group className="md:col-span-5">
          <SectionHead id="lokasi-title" kicker="Lokasi & jam buka" title="Kunjungi Pawon Kemepyar." />

          <dl className="mt-10 border-t border-terra/35">
            <Row label="Alamat">{address ? <address className="not-italic">{address}</address> : <Missing />}</Row>
            <Row label="Jam buka">
              {site.hours ? (
                <ul>
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="tabular-nums text-terra">
                        {h.open}–{h.close}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Missing />
              )}
            </Row>
            <Row label="Telepon">{site.phone ? <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="focus-ring hover:text-terra">{site.phone}</a> : <Missing />}</Row>
            <Row label="WhatsApp">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="focus-ring underline decoration-terra/50 underline-offset-4 hover:text-terra">
                  Kirim pesan
                </a>
              ) : (
                <Missing />
              )}
            </Row>
            <Row label="Instagram">
              {ig ? (
                <a href={ig} target="_blank" rel="noopener noreferrer" className="focus-ring underline decoration-terra/50 underline-offset-4 hover:text-terra">
                  @{site.instagram}
                </a>
              ) : (
                <Missing />
              )}
            </Row>
          </dl>

          <div data-rise className="mt-10 flex flex-wrap gap-4">
            {site.mapsUrl ? (
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-solid">
                Petunjuk Arah
              </a>
            ) : (
              <span className="btn cursor-not-allowed border border-dashed border-terra/50 text-wood/70" aria-disabled="true">
                Petunjuk Arah (tautan belum diatur)
              </span>
            )}
          </div>
        </div>

        <div className="md:col-span-7 md:pl-6">
          <div className="h-full min-h-[340px] border border-terra/60 p-1">
            {site.mapsEmbedUrl ? (
              <iframe
                title={`Peta lokasi ${site.name}`}
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[340px] w-full border-0 grayscale-[35%] sepia-[15%]"
              />
            ) : (
              <div className="flex h-full min-h-[340px] flex-col items-center justify-center gap-6 border border-terra/25 bg-sand/20 p-8 text-center">
                <MapSketch className="w-full max-w-sm text-wood/60" />
                <p className="max-w-[36ch] font-serif italic text-wood">
                  Peta akan tampil di sini setelah alamat dan tautan Google Maps restoran diisi.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
