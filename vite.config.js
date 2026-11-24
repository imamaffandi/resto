import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { site } from "./src/data/site.js";
import { readFileSync } from "node:fs";

const menuData = JSON.parse(readFileSync(new URL("./src/data/menu.json", import.meta.url), "utf8"));

// Build-time SEO from the same data the page uses: Restaurant JSON-LD, canonical/OG URLs,
// robots.txt and sitemap.xml. Unverified facts (null in site.js) are simply left out.
const seo = () => {
  const base = site.url?.replace(/\/$/, "") ?? null;

  const jsonLd = () => {
    const prices = menuData.menu.map((i) => i.price);
    const data = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: site.name,
      servesCuisine: site.cuisine,
      priceRange: `Rp${Math.min(...prices).toLocaleString("id-ID")} - Rp${Math.max(...prices).toLocaleString("id-ID")}`,
      acceptsReservations: true,
      hasMenu: {
        "@type": "Menu",
        hasMenuSection: [...new Set(menuData.menu.map((i) => i.category))].map((category) => ({
          "@type": "MenuSection",
          name: category,
          hasMenuItem: menuData.menu
            .filter((i) => i.category === category)
            .map((i) => ({
              "@type": "MenuItem",
              name: i.name,
              description: i.description,
              offers: { "@type": "Offer", price: i.price, priceCurrency: menuData.currency },
            })),
        })),
      },
    };
    if (base) {
      data.url = base;
      data.logo = `${base}/logo.jpg`;
      data.image = `${base}/logo.jpg`;
      data.hasMenu.url = `${base}/#menu`;
    }
    if (site.address) {
      data.address = {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country ?? "ID",
      };
    }
    if (site.phone) data.telephone = site.phone;
    if (site.mapsUrl) data.hasMap = site.mapsUrl;
    if (site.instagram) data.sameAs = [`https://instagram.com/${site.instagram}`];
    return JSON.stringify(data);
  };

  return {
    name: "pawon-seo",
    transformIndexHtml(html) {
      const tags = [`<script type="application/ld+json">${jsonLd()}</script>`];
      if (base) {
        tags.push(
          `<link rel="canonical" href="${base}/" />`,
          `<meta property="og:url" content="${base}/" />`,
        );
        html = html.replace('content="/logo.jpg"', `content="${base}/logo.jpg"`);
      }
      return html.replace(/<!-- seo:head[^>]*-->/, tags.join("\n    "));
    },
    generateBundle() {
      const robots = base ? `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n` : "User-agent: *\nAllow: /\n";
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      if (!base) {
        this.warn("site.url is not set in src/data/site.js: sitemap.xml and canonical URL were skipped.");
        return;
      }
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${base}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
      });
    },
  };
};

export default defineConfig({
  plugins: [react(), seo()],
});
