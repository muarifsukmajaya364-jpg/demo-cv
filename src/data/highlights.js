/**
 * Keunggulan / Nilai Tambah (highlights.js)
 *
 * Field wajib:
 * - heading: string (judul section)
 * - items[].title: string
 * - items[].description: string
 * - items[].icon: string (terdaftar di src/lib/icons.js, contoh: "message-circle" | "lightbulb" | "target" | "clock")
 */
export const highlights = {
  heading: "Kenapa Pilih Saya",
  items: [
    {
      title: "Komunikatif",
      description:
        "Brief dipahami dengan jelas dan progres selalu dikabarkan.",
      icon: "message-circle",
    },
    {
      title: "Teliti",
      description:
        "Detail dicek berulang, dari ejaan sampai jarak antar elemen.",
      icon: "target",
    },
    {
      title: "Cepat Belajar",
      description:
        "Teknologi baru dipelajari sampai bisa dipakai di proyek nyata.",
      icon: "lightbulb",
    },
    {
      title: "Tepat Waktu",
      description: "Pekerjaan selesai sesuai tenggat yang disepakati.",
      icon: "clock",
    },
  ],
};
