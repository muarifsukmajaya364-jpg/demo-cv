/**
 * Konfigurasi situs utama (site.js - Data Starter)
 */
export const site = {
  title: "Rani Putri — Mahasiswa Informatika",
  description: "Portofolio Rani Putri, Mahasiswa Informatika dan pengembang web pemula dari Kota Anda.",
  lang: "id",
  url: "",
  ogImage: "",
  theme: {
    mode: "dark", // "dark" | "light"
    accent: "#7456ff", // warna aksen utama
  },
  sections: {
    hero: true,
    services: true,
    stats: true,
    projects: true,
    highlights: true,
    testimonials: false, // ubah true jika memiliki testimoni klien
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
  brand: { first: "Rani", second: "Putri" },
  nav: [
    { label: "Home", href: "#home", section: "hero" },
    { label: "About", href: "#about", section: "highlights" },
    { label: "Project", href: "#projects", section: "projects" },
    { label: "Contact Me", href: "#contact", section: "contact", variant: "outline" },
  ],
  footer: {
    copyright: "© {year} {name}. Seluruh hak cipta dilindungi.",
    backToTop: "Kembali ke atas",
    credit: { label: "Dibuat oleh Flux", href: "" },
  },
};
