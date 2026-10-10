/**
 * Informasi kontak pemilik portofolio (contact.js)
 * Field kosong ("") = baris tidak ditampilkan.
 *
 * Field wajib:
 * - heading: string (judul section kontak)
 * - labels: objek label { whatsapp, email, instagram, location }
 * - cta: objek teks tombol { label, emailLabel }
 *
 * Field opsional (boleh kosong ""):
 * - description: string
 * - whatsapp: string nomor telepon (contoh: "6281234567890")
 * - email: string email
 * - instagram: string handle atau url (contoh: "nadia.ramadhani")
 * - location: string teks lokasi
 */
// Field kosong ("") = baris tidak ditampilkan.
export const contact = {
  heading: "Hubungi Saya",
  description:
    "Untuk magang, kolaborasi, atau proyek kecil, hubungi saya lewat kontak di bawah.",
  whatsapp: "",
  email: "nadia.demo@example.com",
  instagram: "",
  location: "Yogyakarta, DI Yogyakarta (GMT+7)",
  labels: { whatsapp: "WhatsApp", email: "Email", instagram: "Instagram", location: "Lokasi" },
  cta: { label: "Chat via WhatsApp", emailLabel: "Kirim Email" },
};
