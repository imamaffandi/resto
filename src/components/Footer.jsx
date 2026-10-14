import { useRef, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";
import { site, socials } from "../constant";

const socialIcons = {
  instagram: InstagramLogo,
  tiktok: TiktokLogo,
  facebook: FacebookLogo,
  x: XLogo,
  whatsapp: WhatsappLogo,
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const validate = ({ name, email, message }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email so we can confirm.";
  if (!message.trim()) errors.message = "Add the date, time and number of guests.";
  return errors;
};

const Field = ({ label, name, type = "text", placeholder, autoComplete, error, multiline = false }) => {
  const id = `field-${name}`;
  const Control = multiline ? "textarea" : "input";
  return (
    <div data-field className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-bone">
        {label}
      </label>
      <Control
        id={id}
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? 4 : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full resize-none rounded-xl border bg-ink/60 px-4 py-3 text-bone transition-colors duration-200 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/70 ${
          error ? "border-danger" : "border-bone/15 hover:border-bone/30"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

const Footer = () => {
  const root = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [guestName, setGuestName] = useState("");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const [title] = q("[data-contact-title]");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.1,
              ease: "power4.out",
              scrollTrigger: { trigger: title, start: "top 85%", once: true },
            }),
        });

        gsap.from(q("[data-contact-reveal], [data-field], [data-submit]"), {
          autoAlpha: 0,
          y: 28,
          stagger: 0.07,
          scrollTrigger: { trigger: q("[data-contact-grid]")[0], start: "top 70%", once: true },
        });

        // Wordmark rises out of the bottom edge as the page ends
        gsap.fromTo(
          q("[data-wordmark]"),
          { yPercent: 45 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: q("footer")[0], start: "top bottom", end: "bottom bottom", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

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

    setStatus("sending");
    setGuestName(data.name.trim().split(" ")[0]);
    // TODO: send `data` to the reservations backend. Simulated until one exists.
    window.setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 700);
  };

  return (
    <div ref={root}>
      <section id="contact" className="mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40">
        <div data-contact-grid className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <h2
              data-contact-title
              className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] md:text-7xl"
            >
              Book a table
            </h2>
            <p data-contact-reveal className="mt-6 max-w-[40ch] leading-relaxed text-muted">
              Send us the date, time and number of guests. We confirm every booking by email.
            </p>
            <dl data-contact-reveal className="mt-12 grid grid-cols-2 gap-8 text-sm">
              <div>
                <dt className="text-muted">Find us</dt>
                <dd className="mt-2 leading-relaxed">
                  {site.city}
                  <br />
                  {site.country}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Open daily</dt>
                <dd className="mt-2 tabular-nums">{site.hours}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-media border border-bone/10 bg-forest p-6 md:col-span-6 md:col-start-7 md:p-10">
            {status === "sent" ? (
              <div role="status" className="flex min-h-[420px] flex-col items-start justify-center gap-5">
                <CheckCircle size={40} weight="light" className="text-brand" aria-hidden />
                <p className="font-display text-3xl font-medium tracking-[-0.02em]">Thanks, {guestName}.</p>
                <p className="max-w-[38ch] leading-relaxed text-muted">
                  Your request is in. Look out for an email from us confirming the table.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-2">
                  Make another booking
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Field label="Your name" name="name" placeholder="Dewi Lestari" autoComplete="name" error={errors.name} />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  error={errors.email}
                />
                <Field
                  label="Booking details"
                  name="message"
                  placeholder="Saturday 14 Nov, 19:30, four people"
                  error={errors.message}
                  multiline
                />
                <button data-submit type="submit" disabled={status === "sending"} className="btn-primary self-start disabled:opacity-70">
                  {status === "sending" ? "Sending" : "Send request"}
                  <ArrowUpRight size={16} weight="bold" aria-hidden />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="overflow-hidden border-t border-bone/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <ul className="flex gap-2">
            {socials.map(({ id, label, href }) => {
              const Icon = socialIcons[id];
              return (
                <li key={id}>
                  <a
                    href={href}
                    aria-label={label}
                    className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-muted transition-colors duration-300 hover:border-brand hover:text-brand"
                  >
                    <Icon size={18} aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {site.name}, {site.city}
          </p>
        </div>
        <p
          data-wordmark
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display text-[18vw] font-semibold leading-[0.78] tracking-[-0.06em] text-moss"
        >
          {site.name}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
