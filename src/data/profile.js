/**
 * Data profil pemilik portofolio (profile.js)
 *
 * Field wajib:
 * - name: string (nama depan/panggilan)
 * - role: string (profesi/bidang, max 60 char disarankan)
 * - bio: string (ringkasan diri, max 400 char disarankan)
 *
 * Field opsional / boleh kosong (""):
 * - greeting: string (salam pembuka)
 * - intro: string (kata pengantar)
 * - nameHighlight: string (bagian nama yang disorot warna aksen)
 * - photo: string path publik (contoh: "/images/avatar.svg")
 * - photoAlt: string (wajib jika photo terisi)
 * - cta.primary / secondary: { label, href } (href kosong = tombol tidak tampil)
 * - social: tautan akun sosial media (kosong = ikon tidak tampil)
 */
// Field kosong ("") = elemen terkait tidak ditampilkan.
export const profile = {
  greeting: "Halo, salam kenal",
  intro: "Saya",
  name: "Nadia",
  nameHighlight: "Ramadhani", // bagian nama yang diberi warna aksen
  role: "Web Developer & UI Designer",
  bio: "Mahasiswa Sistem Informasi semester 5 di Yogyakarta. Saya membuat situs web yang rapi dan mudah dipakai, dari landing page UMKM sampai dashboard tugas kuliah, sambil terus belajar desain antarmuka dan dokumentasi yang jelas.",
  photo: "/images/avatar.svg",
  photoAlt: "Foto profil Nadia Ramadhani",
  cta: {
    primary: { label: "Lihat Karya", href: "#projects" },
    secondary: { label: "", href: "" },
  },
  socialLabel: "Temukan saya di",
  social: {
    instagram: "",
    discord: "",
    whatsapp: "",
    email: "",
  },
};
