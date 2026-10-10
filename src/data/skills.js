/**
 * Daftar keahlian dan software (skills.js)
 * Maksimal 12 skill disarankan.
 *
 * Tiap item wajib memiliki:
 * - name: string (nama software / keahlian)
 * - short: string (singkatan badge, maksimal 3 karakter)
 */
// short = teks singkat di badge. Tanpa logo merek, jadi aman secara lisensi.
export const skills = [
  { name: "Figma", short: "Fg" },
  { name: "HTML & CSS", short: "Hc" },
  { name: "JavaScript", short: "Js" },
  { name: "Astro", short: "As" },
  { name: "Git", short: "Gt" },
  { name: "Notion", short: "No" },
  { name: "Canva", short: "Cv" },
  { name: "Excel", short: "Xl" },
];

export const skillsMeta = { heading: "Tools dan Skill" };
