// Placeholder copy, hours and social links: replace with the real ones before launch.

const photo = (id, width) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const site = {
  name: "Restaurant",
  city: "Malang, East Java",
  country: "Indonesia",
  hours: "11:00 - 22:00",
};

export const navLinks = [
  { id: "event", title: "Event" },
  { id: "menu", title: "Menu" },
  { id: "contact", title: "Contact" },
];

export const hero = {
  title: "Seasonal plates, long evenings.",
  body: "Seasonal produce from around East Java, cooked simply and served in a room made for staying late.",
  image: photo("1473093295043-cdd812d0e601", 1600),
  alt: "Pesto farfalle with cherry tomatoes and greens in a white bowl",
};

export const story = {
  text: "We cook with what the market brings in each week, keep the menu small, and give every plate the same care, from the first order at lunch to the last one at night.",
  image: photo("1442544213729-6a15f1611937", 900),
  alt: "Three cyclists riding past tall trees at sunrise",
};

export const event = {
  when: "Every Saturday, 19:00 - 22:00",
  title: "Acoustic nights on the terrace",
  body: "Local musicians, a shared-plates menu and the kitchen open late. Walk-ins are welcome, and groups can book ahead.",
  image: photo("1525201548942-d8732f6617a0", 1800),
  alt: "Musician playing an acoustic guitar by a sunlit window",
};

export const dishes = [
  { id: 1, name: "Salmon maki", note: "Salmon, cucumber, sesame, soy", price: 14.99, image: photo("1579584425555-c3ce17fd4351", 800) },
  { id: 2, name: "Garden bowl", note: "Avocado, chickpeas, sweet potato, greens", price: 9.99, image: photo("1512621776951-a57141f2eefd", 800) },
  { id: 3, name: "Broccoli soup", note: "Broccoli, cream, spring onion", price: 5.99, image: photo("1578859318509-62790b079366", 800) },
  { id: 4, name: "Seared salmon", note: "Crisp skin, sauteed greens, lime", price: 19.99, image: photo("1519708227418-c8fd9a32b7a2", 800) },
  { id: 5, name: "Vegetable thali", note: "Three curries, puri, pickles", price: 13.99, image: photo("1567337710282-00832b415979", 800) },
  { id: 6, name: "Sticky wings", note: "Soy glaze, chilli, spring onion", price: 8.99, image: photo("1602253057119-44d745d9b860", 800) },
  { id: 7, name: "Roast loin", note: "Grilled vegetables, beetroot, jus", price: 12.99, image: photo("1514326640560-7d063ef2aed5", 800) },
  { id: 8, name: "Grilled chicken salad", note: "Avocado, leaves, sesame dressing", price: 10.99, image: photo("1571805341302-f857308690e3", 800) },
  { id: 9, name: "Burrata and figs", note: "Fresh figs, peach, basil, olive oil", price: 7.99, image: photo("1606850246029-dd00bd5eff97", 800) },
  { id: 10, name: "Salmon poke", note: "Rice, edamame, nori, wakame", price: 11.99, image: photo("1602881917445-0b1ba001addf", 800) },
];

export const socials = [
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "tiktok", label: "TikTok", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "x", label: "X", href: "#" },
  { id: "whatsapp", label: "WhatsApp", href: "#" },
];
