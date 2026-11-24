import { site } from "../data/site";
import { formatAddress, instagramLink, navLinks, whatsappLink } from "../lib/contact";
import { anchorTo } from "../lib/scroll";
import { Missing } from "./ui";

const Heading = ({ children }) => <h2 className="font-serif text-lg italic text-sand">{children}</h2>;

const Footer = () => {
  const address = formatAddress(site.address);
  const wa = whatsappLink();
  const ig = instagramLink();
  const linkClass = "focus-ring underline decoration-sand/40 underline-offset-4 hover:text-sand";

  return (
    <footer className="relative mx-2 mb-2 overflow-hidden bg-ink text-rice md:mx-4 md:mb-4 xl:mx-6 [&_.placeholder]:text-sand/70">
      <div className="shell grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-4">
          {/* Logo shown as supplied, on its own paper disc so the black linework stays legible */}
          <div className="h-28 w-28 rounded-full bg-rice p-1">
            <img src="/logo.jpg" alt="Logo Pawon Kemepyar" width="112" height="112" loading="lazy" className="h-full w-full rounded-full" />
          </div>
          <p className="mt-6 max-w-[34ch] leading-relaxed text-rice/70">
            Masakan Nusantara dari pawon: ayam bakar arang, gudeg, gorengan untuk dibagi, dan wedang hangat untuk
            menutup hari.
          </p>
        </div>

        <nav aria-label="Navigasi footer" className="md:col-span-2">
          <Heading>Halaman</Heading>
          <ul className="mt-4 space-y-2 text-sm">
            {[...navLinks, { id: "reservasi", label: "Reservasi" }].map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={anchorTo(link.id)} className="focus-ring text-rice/75 hover:text-sand">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <Heading>Kunjungi</Heading>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-rice/75">
            <div>{address ? <address className="not-italic">{address}</address> : <Missing>Alamat belum diisi</Missing>}</div>
            <div>
              {site.hours ? (
                site.hours.map((h) => (
                  <p key={h.days}>
                    {h.days} · {h.open}–{h.close}
                  </p>
                ))
              ) : (
                <Missing>Jam buka belum diisi</Missing>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <Heading>Hubungi</Heading>
          <ul className="mt-4 space-y-2 text-sm text-rice/75">
            <li>
              WhatsApp:{" "}
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {site.phone ?? `+${site.whatsapp}`}
                </a>
              ) : (
                <Missing />
              )}
            </li>
            <li>
              Instagram:{" "}
              {ig ? (
                <a href={ig} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  @{site.instagram}
                </a>
              ) : (
                <Missing />
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="shell">
        <div className="flex flex-col gap-2 border-t border-rice/15 py-6 text-xs text-rice/55 sm:flex-row sm:justify-between">
          <p>
          &copy; {new Date().getFullYear()} {site.name}. Semua hak dilindungi.
        </p>
          <p>Harga dapat berubah sewaktu-waktu.</p>
        </div>
      </div>

      <p
        aria-hidden
        className="display select-none whitespace-nowrap pb-2 text-center text-[10.6vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(215_196_165_/_0.35)]"
      >
        Pawon Kemepyar
      </p>
    </footer>
  );
};

export default Footer;
