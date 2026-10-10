/**
 * Konfigurasi situs utama (site.js)
 *
 * Field wajib:
 * - title: string (judul web)
 * - description: string (deskripsi SEO)
 * - lang: string ("id" | "en")
 * - theme.accent: string hex 6-digit (contoh: "#7456ff")
 * - theme.mode: "dark" | "light"
 * - sections: boolean per section (false = tidak dirender)
 * - order: array urutan section aktif
 * - brand.first & brand.second: string teks logo
 * - nav: array item { label, href, section, variant? }
 *
 * Field opsional:
 * - footer.credit.href: string (kosong = kredit tidak ditampilkan)
 */
export const site = {
  title: "Nadia Ramadhani — Web Developer & UI Designer",
  description:
    "Portofolio demo Nadia Ramadhani, mahasiswa Sistem Informasi yang membuat situs web dan desain antarmuka. Situs ini contoh template Flux dengan data fiktif.",
  lang: "id",
  url: "https://nadiascvdemo.netlify.app",
  ogImage: "/images/og.png",
  theme: {
    mode: "light", // "dark" | "light"
    accent: "#0f766e", // satu-satunya warna yang perlu diganti per klien
  },
  // false = section tidak dirender sama sekali
  sections: {
    hero: true,
    services: true,
    stats: true,
    projects: true,
    highlights: true,
    testimonials: false,
    skills: true,
    contact: true,
  },
  order: [
    "hero",
    "services",
    "stats",
    "projects",
    "highlights",
    "testimonials",
    "skills",
    "contact",
  ],
  brand: { first: "Nadia", second: "Ramadhani" }, // first = warna aksen, second = warna teks
  nav: [
    { label: "Home", href: "#home", section: "hero" },
    { label: "Layanan", href: "#services", section: "services" },
    { label: "Project", href: "#projects", section: "projects" },
    { label: "Tentang", href: "#about", section: "highlights" },
    { label: "Contact Me", href: "#contact", section: "contact", variant: "outline" },
  ],
  footer: {
    copyright: "© 2026 Nadia Ramadhani (tokoh fiktif). Situs demo template Flux, seluruh data hanya contoh.",
    backToTop: "Kembali ke atas",
    credit: { label: "Dibuat oleh Flux", href: "" }, // href kosong = tidak ditampilkan
  },
};
