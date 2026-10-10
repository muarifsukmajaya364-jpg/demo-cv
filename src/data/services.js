/**
 * Layanan yang ditawarkan (services.js)
 *
 * Tiap item wajib memiliki:
 * - id: string unik
 * - title: string
 * - description: string
 * - icon: nama icon yang terdaftar di src/lib/icons.js
 */
export const services = [
  {
    id: "web",
    title: "Pengembangan Web",
    description:
      "Landing page, situs profil, dan aplikasi web sederhana dengan kode bersih yang cepat dibuka di HP.",
    icon: "code",
  },
  {
    id: "ui",
    title: "Desain Antarmuka",
    description:
      "Wireframe dan prototipe di Figma dengan alur yang jelas, lengkap dengan panduan warna dan komponen.",
    icon: "pen-tool",
  },
  {
    id: "docs",
    title: "Dokumentasi & Riset",
    description:
      "Laporan, dokumentasi teknis, dan riset pengguna yang tersusun rapi dan siap dipresentasikan.",
    icon: "file-text",
  },
];

export const servicesMeta = {
  label: "Apa yang Saya Tawarkan",
  heading: "Desain Profesional yang Berorientasi pada Kebutuhan Klien",
};
