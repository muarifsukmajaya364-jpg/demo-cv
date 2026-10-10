/**
 * Daftar karya dan project (projects.js)
 * Maksimal 12 project disarankan.
 *
 * Tiap item wajib memiliki:
 * - id: string unik (kebab-case)
 * - title: string (judul project, max 60 char disarankan)
 * - category: string (contoh: "web" | "ui" | "doc")
 * - categoryLabel: string (label kategori tampilan)
 *
 * Field opsional:
 * - description: string (ringkasan karya)
 * - image: string path publik (contoh: "/images/proj-1.svg")
 * - imageAlt: string (wajib jika image terisi)
 * - link: string URL eksternal (kosong = tanpa tombol tautan)
 */
// Filter kategori hanya tampil jika jumlah project > 6.
export const projects = [
  {
    id: "kopi-senja",
    title: "Landing Page Kedai Kopi Senja",
    category: "web",
    categoryLabel: "Situs Web",
    description:
      "Landing page responsif untuk kedai kopi lokal, lengkap dengan menu dan peta lokasi.",
    image: "/images/proj-1.svg",
    imageAlt: "Ilustrasi jendela browser berisi halaman kedai kopi",
    link: "",
  },
  {
    id: "batik-laras",
    title: "Katalog Online Toko Batik Laras",
    category: "web",
    categoryLabel: "Situs Web",
    description:
      "Katalog produk dengan filter motif dan tombol pesan lewat WhatsApp.",
    image: "/images/proj-2.svg",
    imageAlt: "Ilustrasi katalog produk berbentuk kartu",
    link: "",
  },
  {
    id: "dashboard-tugas",
    title: "Dashboard Tugas Kuliah",
    category: "web",
    categoryLabel: "Situs Web",
    description:
      "Aplikasi web kecil untuk mencatat tugas, tenggat, dan progres tiap mata kuliah.",
    image: "/images/proj-3.svg",
    imageAlt: "Ilustrasi dashboard dengan daftar tugas dan grafik",
    link: "",
  },
  {
    id: "app-kos",
    title: "Prototipe Aplikasi Kos-Kosan",
    category: "ui",
    categoryLabel: "Desain UI",
    description:
      "Alur cari kos, booking, dan pembayaran dalam satu prototipe Figma.",
    image: "/images/proj-4.svg",
    imageAlt: "Ilustrasi tiga layar ponsel berurutan",
    link: "",
  },
  {
    id: "redesain-perpus",
    title: "Redesain Aplikasi Perpustakaan Kampus",
    category: "ui",
    categoryLabel: "Desain UI",
    description:
      "Tampilan dan alur peminjaman buku dibuat lebih singkat dan mudah dipahami.",
    image: "/images/proj-5.svg",
    imageAlt: "Ilustrasi dua layar ponsel sebelum dan sesudah",
    link: "",
  },
  {
    id: "riset-belajar",
    title: "Riset Pengguna Aplikasi Belajar",
    category: "doc",
    categoryLabel: "Riset & Dokumen",
    description:
      "Wawancara 12 mahasiswa dan ringkasan temuan untuk perbaikan fitur.",
    image: "/images/proj-6.svg",
    imageAlt: "Ilustrasi lembar riset dengan diagram",
    link: "",
  },
  {
    id: "dok-api",
    title: "Dokumentasi API Sistem Absensi",
    category: "doc",
    categoryLabel: "Riset & Dokumen",
    description:
      "Dokumentasi endpoint, contoh permintaan, dan panduan integrasi untuk tim kampus.",
    image: "/images/proj-7.svg",
    imageAlt: "Ilustrasi lembar dokumentasi berisi blok kode",
    link: "",
  },
];

export const projectsMeta = {
  label: "Karya Saya",
  heading: "Project Terbaru",
  viewLabel: "Lihat Detail",
  allLabel: "Semua",
  cta: {
    heading: "Punya project di pikiranmu?",
    description: "Saya terbuka untuk project freelance.",
    moreLabel: "Project Lainnya",
    moreHref: "",
    emailLabel: "Kirim Email",
  },
};
