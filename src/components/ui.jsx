import { img, PLACEHOLDER_PHOTOS } from "../data/site";

// Ruled photo frame with responsive Unsplash sources and an honest "Foto contoh" tag while stand-ins are used
export const Photo = ({
  photo,
  width = 900,
  ratio,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
  imgClassName = "",
  eager = false,
  clip = true,
  tag = PLACEHOLDER_PHOTOS,
  imgProps,
  children,
}) => {
  const { src, srcSet, alt } = img(photo, width, ratio);
  return (
    <figure data-clip={clip ? "" : undefined} className={`photo ${className}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={ratio ? Math.round(width / ratio) : undefined}
        loading={eager ? "eager" : "lazy"}
        // React 18 passes the lowercase attribute straight to the DOM; it has no camelCase prop yet
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority={eager ? "high" : undefined}
        decoding="async"
        className={imgClassName}
        {...imgProps}
      />
      {tag && <PlaceholderTag />}
      {children}
    </figure>
  );
};

export const PlaceholderTag = ({ className = "absolute bottom-2 right-2" }) => (
  <span className={`${className} z-[1] bg-rice/90 px-2 py-0.5 font-sans text-[0.6rem] uppercase tracking-label text-wood`}>
    Foto contoh
  </span>
);

// Kicker + headline used at the top of most sections
export const SectionHead = ({ kicker, title, as: Tag = "h2", id, className = "", titleClassName = "" }) => (
  <div className={`title-wrap ${className}`}>
    {kicker && (
      <p data-rise className="kicker max-w-md">
        {kicker}
      </p>
    )}
    <Tag id={id} data-split className={`title mt-5 ${titleClassName}`}>
      {title}
    </Tag>
  </div>
);

// Visible stand-in for facts the restaurant hasn't supplied yet
export const Missing = ({ children = "Belum diisi" }) => <span className="placeholder">{children}</span>;
