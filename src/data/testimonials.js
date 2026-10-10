/**
 * Testimoni klien (testimonials.js)
 * Section mati secara default (site.sections.testimonials = false).
 *
 * Tiap item wajib memiliki:
 * - name: string (nama klien)
 * - quote: string (isi testimoni)
 *
 * Field opsional:
 * - role: string (jabatan atau nama perusahaan)
 * - photo: string path publik (contoh: "/images/placeholder-avatar.svg")
 */
// CONTOH SAJA. Section ini mati secara default (site.sections.testimonials = false).
// Jika array kosong, section otomatis tersembunyi walaupun diaktifkan.
export const testimonials = [
  {
    name: "Nama Klien (contoh)",
    role: "Jabatan, Perusahaan (contoh)",
    quote: "Teks testimoni contoh. Ganti dengan testimoni asli klien.",
    photo: "/images/placeholder-avatar.svg",
  },
];

export const testimonialsMeta = {
  label: "Testimoni",
  heading: "Kata Mereka tentang Saya",
};
