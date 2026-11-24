import { useRef, useState } from "react";
import { site } from "../data/site";
import { whatsappLink } from "../lib/contact";
import { SectionHead, Missing } from "./ui";
import { Stamp, Blirik } from "./Illustrations";

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const PHONE = /^(\+?62|0)8\d{7,12}$/;

const validate = (data) => {
  const errors = {};
  if (!data.nama.trim()) errors.nama = "Mohon isi nama Anda.";
  if (!PHONE.test(data.whatsapp.replace(/[\s-]/g, ""))) errors.whatsapp = "Masukkan nomor WhatsApp yang aktif, mis. 0812 3456 7890.";
  if (!data.tanggal) errors.tanggal = "Pilih tanggal kunjungan.";
  else if (data.tanggal < todayISO()) errors.tanggal = "Tanggal sudah lewat.";
  if (!data.jam) errors.jam = "Pilih jam kedatangan.";
  if (!data.jumlah) errors.jumlah = "Berapa orang yang datang?";
  return errors;
};

const buildMessage = (d) =>
  [
    `Halo ${site.name}, saya ingin reservasi tempat:`,
    "",
    `Nama: ${d.nama.trim()}`,
    `No. WhatsApp: ${d.whatsapp.trim()}`,
    `Tanggal: ${formatDate(d.tanggal)}`,
    `Jam: ${d.jam}`,
    `Jumlah: ${d.jumlah} orang`,
    d.catatan.trim() ? `Catatan: ${d.catatan.trim()}` : null,
    "",
    "Mohon konfirmasinya. Terima kasih.",
  ]
    .filter((line) => line !== null)
    .join("\n");

// Bordered tag sitting on the top edge of the input, like a label pinned to a menu card
const Field = ({ label, name, error, hint, children, className = "" }) => (
  <div className={`relative pt-4 ${className}`}>
    <label
      htmlFor={`f-${name}`}
      className="absolute left-4 top-0 z-[1] border border-terra/60 bg-rice px-2.5 py-0.5 font-serif text-[0.95rem] italic text-terra"
    >
      {label}
    </label>
    {children}
    {hint && !error && <p className="mt-1.5 text-xs text-wood/80">{hint}</p>}
    {error && (
      <p id={`f-${name}-error`} className="mt-1.5 text-sm text-terra-deep">
        {error}
      </p>
    )}
  </div>
);

const inputClass = (error) =>
  `w-full border bg-sand/25 px-4 pb-3 pt-5 text-base text-ink transition-colors duration-200 placeholder:text-wood/50 focus:bg-rice focus:outline-none focus:ring-2 focus:ring-terra/60 ${
    error ? "border-terra-deep" : "border-terra/25 hover:border-terra/50"
  }`;

const control = (name, error) => ({
  id: `f-${name}`,
  name,
  "aria-invalid": Boolean(error),
  "aria-describedby": error ? `f-${name}-error` : undefined,
  className: inputClass(error),
});

const Reservation = () => {
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null); // { message, link, name }
  const [copied, setCopied] = useState(false);
  const statusRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const nextErrors = validate(data);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.elements[firstInvalid].focus();
      return;
    }
    const message = buildMessage(data);
    const link = whatsappLink(message);
    if (link) window.open(link, "_blank", "noopener");
    setCopied(false);
    setResult({ message, link, name: data.nama.trim().split(" ")[0] });
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result.message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="reservasi" aria-labelledby="reservasi-title" className="section-rule relative overflow-hidden py-20 md:py-32">
      <div className="shell grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
        <div data-rise-group className="relative md:col-span-5">
          <div aria-hidden className="pointer-events-none absolute right-0 top-10 hidden h-36 w-36 text-terra/60 lg:block xl:h-44 xl:w-44">
            <div data-spin>
              <Stamp />
            </div>
          </div>
          <SectionHead id="reservasi-title" kicker="Reservasi" title="Siapkan Tempat untuk Anda." />
          <p data-rise className="dropcap mt-10 leading-relaxed text-ink/85">
            Isi formulir ini dan pesan reservasi Anda akan tersusun otomatis di WhatsApp. Kirimkan, lalu tunggu balasan
            dari tim kami. Meja baru terpesan setelah kami mengonfirmasi ketersediaannya.
          </p>

          <dl data-rise className="mt-10 grid grid-cols-2 gap-6 border-t border-terra/40 pt-6 text-sm">
            <div>
              <dt className="label">WhatsApp</dt>
              <dd className="mt-2 font-serif text-lg">
                {site.whatsapp ? (
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="focus-ring underline decoration-terra/50 underline-offset-4 hover:text-terra">
                    {site.phone ?? `+${site.whatsapp}`}
                  </a>
                ) : (
                  <Missing />
                )}
              </dd>
            </div>
            <div>
              <dt className="label">Jam buka</dt>
              <dd className="mt-2 font-serif text-lg">
                {site.hours ? (
                  site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.open}–{h.close}
                    </span>
                  ))
                ) : (
                  <Missing />
                )}
              </dd>
            </div>
          </dl>
          <Blirik className="mt-12 hidden h-40 w-40 text-wood/75 md:block" />
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <div className="border border-terra/60 p-1">
            <div className="border border-terra/30 bg-rice p-6 md:p-10">
              {result ? (
                <div ref={statusRef} tabIndex={-1} role="status" className="focus:outline-none">
                  <p className="kicker">Hampir selesai</p>
                  <p className="mt-4 font-serif text-3xl font-medium leading-tight">Terima kasih, {result.name}.</p>
                  {result.link ? (
                    <p className="mt-4 leading-relaxed text-wood">
                      Pesan reservasi sudah kami siapkan di WhatsApp. Pastikan Anda <strong className="text-ink">menekan kirim</strong> di
                      sana. Reservasi <strong className="text-ink">belum terkonfirmasi</strong> sampai tim Pawon Kemepyar membalas pesan
                      Anda.
                    </p>
                  ) : (
                    <p className="mt-4 leading-relaxed text-wood">
                      Nomor WhatsApp restoran belum diatur di situs ini, jadi pesan belum bisa dikirim otomatis. Salin pesan di bawah dan
                      kirimkan langsung ke restoran. Reservasi <strong className="text-ink">belum terkonfirmasi</strong> sampai restoran
                      membalas.
                    </p>
                  )}
                  <pre className="mt-6 whitespace-pre-wrap border border-dashed border-terra/40 bg-sand/25 p-4 font-sans text-sm leading-relaxed text-ink/85">
                    {result.message}
                  </pre>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {result.link && (
                      <a href={result.link} target="_blank" rel="noopener noreferrer" className="btn-solid">
                        Buka WhatsApp lagi
                      </a>
                    )}
                    <button type="button" onClick={copy} className="btn-line">
                      {copied ? "Tersalin" : "Salin pesan"}
                    </button>
                    <button type="button" onClick={() => setResult(null)} className="btn font-sans text-sm not-italic text-wood underline underline-offset-4">
                      Ubah data
                    </button>
                  </div>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
                  <Field label="Nama" name="nama" error={errors.nama}>
                    <input type="text" autoComplete="name" placeholder="Nama lengkap" {...control("nama", errors.nama)} />
                  </Field>
                  <Field label="Nomor WhatsApp" name="whatsapp" error={errors.whatsapp}>
                    <input type="tel" inputMode="tel" autoComplete="tel" placeholder="0812 3456 7890" {...control("whatsapp", errors.whatsapp)} />
                  </Field>
                  <Field label="Tanggal kunjungan" name="tanggal" error={errors.tanggal}>
                    <input type="date" min={todayISO()} {...control("tanggal", errors.tanggal)} />
                  </Field>
                  <Field label="Jam kunjungan" name="jam" error={errors.jam}>
                    <input type="time" step="900" {...control("jam", errors.jam)} />
                  </Field>
                  <Field label="Jumlah pengunjung" name="jumlah" error={errors.jumlah} className="sm:col-span-2">
                    <select defaultValue="" {...control("jumlah", errors.jumlah)}>
                      <option value="" disabled>
                        Pilih jumlah orang
                      </option>
                      {Array.from({ length: 19 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} orang
                        </option>
                      ))}
                      <option value="20+">20 orang atau lebih</option>
                    </select>
                  </Field>
                  <Field label="Catatan tambahan" name="catatan" hint="Opsional: kursi bayi, acara khusus, alergi." className="sm:col-span-2">
                    <textarea rows={3} placeholder="Ada yang perlu kami siapkan?" {...control("catatan")} className={`${inputClass()} resize-none`} />
                  </Field>
                  <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[34ch] text-xs leading-relaxed text-wood">
                      Reservasi dikonfirmasi oleh restoran melalui WhatsApp, bukan otomatis.
                    </p>
                    <button type="submit" className="btn-solid">
                      Reservasi Sekarang
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
