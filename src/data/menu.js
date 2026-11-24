// Menu content comes from menu.json (names, prices, categories). This file only adds:
// - Indonesian translations of the English descriptions, keyed by item id (no new claims added)
// - Indonesian category labels and the stand-in photo shown when an item is hovered
import data from "./menu.json";
import { photos } from "./site";

const descriptionsId = {
  1: "Ayam kampung dibakar di atas arang, diolesi bumbu Jawa manis-gurih dan kecap manis yang berasap.",
  2: "Nasi pandan hangat dengan suwiran daging sapi renyah, tempe kecap, dan telur kampung setengah matang.",
  3: "Potongan daging sapi dimasak perlahan dalam santan kental, lengkuas, dan ketumbar sangrai.",
  4: "Gurame utuh digoreng renyah, disajikan dengan daun kemangi segar dan dua pilihan sambal.",
  5: "Iga sapi empuk dalam kuah rempah Jawa yang bening namun kaya, dengan daun bawang dan jeruk nipis.",
  6: "Gudeg nangka muda manis-gurih klasik, disajikan dengan krecek, telur rebus, dan ayam bumbu.",
  7: "Bebek digoreng saat dipesan hingga keemasan dan sangat renyah, dengan remah bumbu dan sambal korek pedas.",
  8: "Sekeranjang besar kremes bumbu, tempe goreng, tahu, dan jagung muda untuk dinikmati bersama.",
  9: "Tahu dan tempe berbumbu digoreng keemasan, disajikan dengan saus kacang manis-pedas.",
  10: "Irisan tipis tempe berbalut adonan daun bawang, digoreng sebentar agar bagian tengahnya tetap lembut.",
  11: "Perkedel jagung manis dan daun-daunan, renyah di luar dan lembut di dalam.",
  12: "Bakwan sayur renyah berisi kubis, wortel, dan tauge.",
  13: "Pisang matang digoreng dengan adonan tipis, disiram karamel gula aren dan parutan keju.",
  14: "Nasi putih yang dimasak segar sepanjang hari.",
  15: "Nasi gurih beraroma santan, dikukus bersama serai dan daun salam.",
  16: "Sayur asem segar berkuah asam dengan jagung, melinjo, kacang tanah, dan labu siam.",
  17: "Timun, kubis, dan daun kemangi segar dengan sambal terasi, sambal bawang, dan sambal ijo.",
  18: "Potongan ayam gurih tidak pedas yang ramah anak, sedikit renyah, dengan saus tomat terpisah.",
  19: "Telur dadar tebal dan lembut dengan daun bawang, bawang merah, dan sedikit kecap manis.",
  20: "Es teh Jawa yang menyegarkan dengan seiris jeruk nipis.",
  21: "Wedang jahe geprek yang menghangatkan, dimaniskan gula aren dengan sedikit serai.",
  22: "Minuman asam jawa dan gula aren yang dingin, manis-asam, pas untuk siang yang panas.",
  23: "Kopi tubruk tradisional dari bubuk kopi kasar yang diseduh panas, pekat dan bersahaja.",
  24: "Air dan daging kelapa muda dingin dengan perasan jeruk nipis segar.",
  25: "Bubur sumsum lembut dari tepung beras dengan siraman gula aren hangat dan santan kental.",
};

export const categories = [
  { key: "Signature & Hearty Mains", id: "utama", label: "Hidangan Utama", photo: photos.ayamBakar },
  { key: "Kriuk, Kremes & Family Sharables", id: "kriuk", label: "Kriuk & Kremes", photo: photos.gorengan },
  { key: "Sides, Sambals & Kids' Picks", id: "pendamping", label: "Pendamping & Sambal", photo: photos.nasiDaun },
  { key: "Drinks & Sweet Closers", id: "minuman", label: "Minuman & Penutup", photo: photos.esTeh },
];

// A closer stand-in for the few items with a matching photo; everything else uses its category's photo
const itemPhotos = {
  1: photos.ayamBakar,
  6: photos.gudeg,
  7: photos.ayamGoreng,
  8: photos.gorengan,
  9: photos.tofu,
  16: photos.sayur,
  20: photos.esTeh,
  23: photos.kopi,
};

const byKey = Object.fromEntries(categories.map((c) => [c.key, c]));

export const menu = data.menu.map((item) => {
  const category = byKey[item.category];
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    priceLabel: item.price_formatted,
    description: descriptionsId[item.id] ?? item.description,
    categoryId: category?.id ?? "lainnya",
    categoryLabel: category?.label ?? item.category,
    photo: itemPhotos[item.id] ?? category?.photo ?? photos.table,
  };
});

export const menuById = Object.fromEntries(menu.map((item) => [item.id, item]));

export const priceRange = {
  min: Math.min(...data.menu.map((i) => i.price)),
  max: Math.max(...data.menu.map((i) => i.price)),
};

export const rupiah = (n) => `Rp${n.toLocaleString("id-ID")}`;
