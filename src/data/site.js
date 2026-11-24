// Single source of truth for Pawon Kemepyar's facts.
// Used by the page AND by vite.config.js (SEO tags, JSON-LD, sitemap), so keep it plain data.
//
// Anything set to `null` is NOT verified yet. The page renders a visible "belum diisi" placeholder
// for it, and leaves it out of the structured data. Fill these in before launch:
//   address, hours, whatsapp, phone, instagram, mapsUrl, mapsEmbedUrl, url

export const site = {
  name: "Pawon Kemepyar",
  tagline: "Masakan Nusantara dari Pawon",
  cuisine: ["Indonesian", "Javanese"],

  // "Pawon" is Javanese for kitchen. What "Kemepyar" means to the owners is theirs to tell:
  // one or two sentences here replace the placeholder in the "Tentang Kami" section.
  nameMeaning: null,

  // Public URL of the deployed site, e.g. "https://pawonkemepyar.com". Needed for canonical, OG and sitemap.
  url: null,

  address: null, // { street: "Jl. ...", locality: "Kota", region: "Provinsi", postalCode: "00000", country: "ID" }
  hours: null, // [{ days: "Senin - Jumat", open: "10:00", close: "21:00" }, ...]
  whatsapp: null, // international format, digits only, e.g. "6281234567890"
  phone: null, // display format, e.g. "0812-3456-7890"
  instagram: null, // handle without "@", e.g. "pawonkemepyar"
  mapsUrl: null, // Google Maps share link, used by the "Petunjuk Arah" button
  mapsEmbedUrl: null, // Google Maps "Embed a map" src URL, renders the map iframe

  // Promotions and announcements. Leave empty when nothing is running: the section hides the slot.
  // { title: "...", body: "...", period: "1 - 31 Desember" }
  promotions: [],
};

// All photos below are TEMPORARY stand-ins from Unsplash (free licence). They show Indonesian food
// and kitchens, but not Pawon Kemepyar's own dishes or room. While this flag is true the page
// labels them "Foto contoh". Replace with the restaurant's own photos, then set it to false.
export const PLACEHOLDER_PHOTOS = true;

const unsplash = (id) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  hero: { src: unsplash("1791559219438-e07803de6d1a"), alt: "Hidangan rumahan Indonesia di atas meja: ayam goreng, sayur, dan sambal" },
  tungku: { src: unsplash("1567538777399-fd9847a66b13"), alt: "Dua panci hitam di atas tungku tradisional dalam dapur kayu" },
  interior: { src: unsplash("1632762346768-80b093fc5f38"), alt: "Ruang makan beratap kayu dengan lampu hangat" },
  flame: { src: unsplash("1723967052599-93403a001bb1"), alt: "Api besar menyala di bawah panci di dapur" },
  wok: { src: unsplash("1681889870636-3f58e5288e03"), alt: "Tangan mengaduk masakan di wajan di atas kompor" },
  wokFire: { src: unsplash("1696785129061-6939a4c2a1fe"), alt: "Juru masak di depan wajan yang berapi" },
  cook: { src: unsplash("1716801574215-7454fb71a471"), alt: "Juru masak berdiri di balik meja penuh hidangan" },
  table: { src: unsplash("1682139710677-cb02f6bc4211"), alt: "Meja kayu dengan beberapa piring hidangan" },
  spread: { src: unsplash("1658218615127-40b7068bbae5"), alt: "Nasi dan lauk di atas daun pisang untuk disantap bersama" },
  feast: { src: unsplash("1707896543059-ce6884f5c0d2"), alt: "Meja dengan aneka lauk, sambal, dan minuman" },
  tofu: { src: unsplash("1680169590313-9a14f3cd8148"), alt: "Tahu dalam mangkuk tanah liat dengan cabai dan bawang" },
  ayamBakar: { src: unsplash("1630315500315-43112e2bfd88"), alt: "Ayam bakar dengan sambal di atas piring" },
  gudeg: { src: unsplash("1707529332935-bfa3925f15ac"), alt: "Nasi, telur, dan lauk bumbu di atas daun pisang" },
  ayamGoreng: { src: unsplash("1628430044262-fb84cffbb744"), alt: "Ayam goreng bertabur kremes di piring keramik" },
  gorengan: { src: unsplash("1625060829572-462facbecc7a"), alt: "Gorengan renyah di atas piring putih" },
  nasiDaun: { src: unsplash("1791012833696-f167d14d6cdf"), alt: "Nasi putih dengan lauk pedas di atas daun pisang" },
  sayur: { src: unsplash("1677029969063-23ecbb98d0af"), alt: "Mangkuk sayur berkuah di atas meja kayu" },
  esTeh: { src: unsplash("1741241858511-13978ec7a067"), alt: "Segelas es teh dengan es batu" },
  kopi: { src: unsplash("1559496417-e7f25cb247f3"), alt: "Segelas kopi hitam di bawah cahaya sore" },
};

// Unsplash serves any width on request: build src + srcset from one id
export const img = (photo, width, ratio) => {
  const h = ratio ? `&h=${Math.round(width / ratio)}` : "";
  const at = (w) => `${photo.src}?auto=format&fit=crop&q=72&w=${w}${ratio ? `&h=${Math.round(w / ratio)}` : ""}`;
  return {
    src: `${photo.src}?auto=format&fit=crop&q=72&w=${width}${h}`,
    srcSet: [0.5, 1, 1.5, 2].map((m) => `${at(Math.round(width * m))} ${Math.round(width * m)}w`).join(", "),
    alt: photo.alt,
  };
};
