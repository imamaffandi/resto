import { site } from "../data/site";

// wa.me link with a prefilled message, or null while no WhatsApp number is configured
export const whatsappLink = (text = "") => {
  if (!site.whatsapp) return null;
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.whatsapp}${query}`;
};

export const instagramLink = () => (site.instagram ? `https://instagram.com/${site.instagram}` : null);

export const formatAddress = (address) =>
  address ? [address.street, address.locality, address.region, address.postalCode].filter(Boolean).join(", ") : null;

export const navLinks = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang Kami" },
  { id: "menu", label: "Menu" },
  { id: "galeri", label: "Galeri" },
  { id: "lokasi", label: "Lokasi" },
];
