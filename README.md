# Flux Portfolio Template

Template website portofolio modern, cepat, dan ramah aksesibilitas yang dibangun dengan **Astro**. Didesain khusus untuk freelancer, profesional kreatif, dan pengembang yang membutuhkan kehadiran web berkualitas tinggi dengan konfigurasi data yang sangat mudah dipelajari.

---

## Daftar Isi
- [Tentang demo ini](#tentang-demo-ini)
- [Apa ini](#apa-ini)
- [Quick Start](#quick-start)
- [Struktur Proyek](#struktur-proyek)
- [Ganti Klien dalam 10 Menit](#ganti-klien-dalam-10-menit)
- [Tabel Field Data](#tabel-field-data)
- [Ganti Warna dan Mode](#ganti-warna-dan-mode)
- [Urutan dan Toggle Section](#urutan-dan-toggle-section)
- [Ganti Favicon dan OG Image](#ganti-favicon-dan-og-image)
- [Panduan Deploy](#panduan-deploy)
- [Domain Sendiri](#domain-sendiri)
- [Error `[DATA]` dan Cara Membacanya](#error-data-dan-cara-membacanya)
- [FAQ Singkat](#faq-singkat)

---

## Tentang demo ini

Repositori ini adalah **Demo 1 (`flux-demo1-porto-pelajar`)** — etalase portofolio pelajar/mahasiswa untuk **Flux Portfolio Template**:

- **Data Fiktif:** Menampilkan tokoh rekaan **Nadia Ramadhani** (mahasiswa Sistem Informasi semester 5 di Yogyakarta, *Web Developer & UI Designer*). Seluruh biodata, proyek (7 karya pada kategori Situs Web, Desain UI, serta Riset & Dokumen), angka statistik, dan kontak (`nadia.demo@example.com`) adalah fiktif dan hanya digunakan sebagai contoh tampilan.
- **Tema & Warna Aksen:** Menggunakan mode terang (`theme.mode: "light"`) dengan warna aksen teal **`#0f766e`** (`theme.accent: "#0f766e"`), 7 section aktif (`hero`, `services`, `stats`, `projects`, `highlights`, `skills`, `contact`), dan section `testimonials` dinonaktifkan (`false`).
- **Cara Menjalankan:**
  ```bash
  npm install
  npm run dev                  # Server pengembangan lokal (http://localhost:4321)
  node scripts/demo-assets.mjs # Regenerasi aset gambar SVG, favicon, og.png, & robots.txt
  npm run build                # Build statis produksi ke dist/
  npm run check                # Pengujian statis & dinamis otomatis
  ```
- **Tautan ke Template:** Situs demo ini merupakan salinan data-only dari [**Flux Portfolio Template (`cv_for_sale`)**](../cv_for_sale/README.md) tanpa perubahan pada komponen maupun kode inti template. Dokumentasi lengkap penggunaan template tersedia pada bagian-bagian di bawah ini.

---

## Apa ini

Flux Portfolio Template adalah template situs portofolio statis berbasis Astro yang dirancang dengan prinsip:
- **Performa Ekstrem:** HTML murni dan CSS tokenized tanpa framework JS runtime besar, skor Lighthouse mencapai 100/100 di perangkat seluler.
- **Aksesibilitas Standar WCAG AA:** Kontras warna terverifikasi, kontrol keyboard lengkap, ARIA landmark yang tepat, dan dukungan preferensi `prefers-reduced-motion`.
- **Pengelolaan Data Terpusat:** Konten sepenuhnya terpisah dari tampilan dan dikelola dalam file JavaScript sederhana di folder `src/data/`.
- **Validasi Data Otomatis:** Memiliki sistem pengecekan data saat build yang memberikan pesan kesalahan spesifik berbahasa Indonesia jika ada konfigurasi yang kurang atau keliru.

---

## Quick Start

### Kebutuhan Sistem
- **Node.js**: Versi `node >= 22.12.0` (sesuai spesifikasi di `package.json`).
- **NPM**: Bawaan dari instalasi Node.js.

### Perintah Utama
1. **Instal dependensi:**
   ```bash
   npm install
   ```
2. **Jalankan server pengembangan lokal:**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:4321`.
3. **Bangun situs untuk produksi:**
   ```bash
   npm run build
   ```
4. **Pratinjau hasil build:**
   ```bash
   npm run preview
   ```
5. **Jalankan pengujian otomatis:**
   ```bash
   npm run check
   ```

---

## Struktur Proyek

```text
├── public/                  # Aset publik statis (favicon, robots.txt, gambar)
│   ├── favicon.svg          # Favicon vektor 32x32
│   ├── robots.txt           # Pengaturan perayapan mesin pencari
│   └── images/              # Gambar placeholder avatar dan karya
├── src/
│   ├── components/          # Komponen tampilan modular Astro
│   ├── data/                # Data konten aktif situs
│   │   ├── _starter/        # Template data awal netral untuk klien baru
│   │   ├── site.js          # Konfigurasi situs, tema, dan navigasi
│   │   ├── profile.js       # Profil personal, bio, dan aksi utama
│   │   ├── services.js      # Layanan yang ditawarkan
│   │   ├── stats.js         # Angka statistik dan pencapaian
│   │   ├── projects.js      # Galeri karya dan proyek terpilih
│   │   ├── highlights.js    # Nilai tambah dan keunggulan
│   │   ├── testimonials.js  # Ulasan dan testimoni klien
│   │   ├── skills.js        # Keahlian dan perangkat lunak
│   │   ├── contact.js       # Informasi kontak dan media sosial
│   │   └── ui.js            # String teks antarmuka terpusat
│   ├── layouts/
│   │   └── Base.astro       # Layout dasar HTML, meta SEO, & JSON-LD
│   ├── lib/                 # Utilitas helper, ikon, dan validasi data
│   │   ├── carousel.js      # Logika interaksi carousel aksesibel
│   │   ├── icons.js         # Glyph SVG generik berbasis bentuk dasar
│   │   ├── links.js         # Generator tautan WhatsApp, email, dan sosmed
│   │   └── validate.js      # Skrip verifikasi integritas data
│   ├── pages/
│   │   ├── index.astro      # Halaman utama portofolio
│   │   └── 404.astro        # Halaman galat 404 (tidak ditemukan)
│   └── styles/
│       ├── tokens.css       # Design token (warna, spasi, tipografi)
│       └── global.css       # Gaya global, reset, dan aksesibilitas
├── scripts/
│   └── check.mjs            # Otomasi pengujian statis dan dinamis via CDP
├── package.json             # Konfigurasi proyek dan dependensi
├── NOTICE.md                # Catatan atribusi lisensi pihak ketiga
├── SERAH-TERIMA.md          # Dokumen serah terima situs ke klien
└── README.md                # Dokumentasi petunjuk penggunaan
```

---

## Ganti Klien dalam 10 Menit

Untuk menyiapkan portofolio baru bagi klien:
1. **Salin Data Starter:**
   Salin semua file dari `src/data/_starter/` ke `src/data/` (menimpa file yang ada).
2. **Atur Profil Utama (`src/data/profile.js`):**
   Ubah nama, peran (`role`), deskripsi singkat (`bio`), dan tautan media sosial.
3. **Masukkan Karya Klien (`src/data/projects.js`):**
   Isi judul karya, kategori, deskripsi singkat, dan path gambarnya.
4. **Sesuaikan Keahlian (`src/data/skills.js`):**
   Ganti daftar keahlian dan singkatan badge sesuai keahlian klien.
5. **Atur Kontak Klien (`src/data/contact.js`):**
   Isi nomor WhatsApp (format angka internasional tanpa `+`, misal `62812...`) atau email.
6. **Ganti Gambar Aset (`public/images/`):**
   Letakkan foto profil (`photo`) dan gambar karya di folder `public/images/`.
7. **Pilih Warna Aksen (`src/data/site.js`):**
   Ubah `theme.accent` dengan warna hex brand klien (misal `#7456ff` atau `#10b981`).
8. **Aktifkan / Matikan Section (`src/data/site.js`):**
   Ubah nilai `sections` menjadi `true` atau `false` sesuai kebutuhan klien.
9. **Uji dan Bangun:**
   Jalankan `npm run build` atau `npm run check`. Jika ada data yang salah, pesan `[DATA]` akan memberitahu letak perbaikannya.

---

## Tabel Field Data

| File Data | Field Utama | Tipe | Status | Contoh / Keterangan |
|---|---|---|---|---|
| `site.js` | `title` | string | Wajib | `"Nama Klien — Profesi"` |
| `site.js` | `description` | string | Wajib | Deskripsi ringkas untuk meta tag SEO |
| `site.js` | `lang` | string | Wajib | `"id"` atau `"en"` |
| `site.js` | `url` | string | Opsional | URL domain final (misal: `"https://klien.com"`) |
| `site.js` | `ogImage` | string | Opsional | Path gambar thumbnail OG (misal: `"/images/og.png"`) |
| `site.js` | `theme.accent` | string hex | Wajib | Format `#RRGGBB` 6-digit (misal: `"#7456ff"`) |
| `site.js` | `theme.mode` | string | Wajib | `"dark"` atau `"light"` |
| `site.js` | `sections` | object | Wajib | Boolean per section (`hero`, `services`, dll.) |
| `site.js` | `order` | array | Wajib | Urutan tampilan nama section aktif |
| `profile.js` | `name` | string | Wajib | Nama depan / panggilan |
| `profile.js` | `nameHighlight` | string | Opsional | Nama belakang / bagian yang diberi warna aksen |
| `profile.js` | `role` | string | Wajib | Profesi atau keahlian utama (maks. 60 karakter) |
| `profile.js` | `bio` | string | Wajib | Ringkasan pengalaman (maks. 400 karakter disarankan) |
| `profile.js` | `photo` | string | Opsional | Path foto profil (misal: `"/images/avatar.webp"`) |
| `services.js` | `services[]` | array | Wajib | Objek `{ id, title, description, icon }` |
| `stats.js` | `stats[]` | array | Wajib | Tepat 4 objek `{ value, label, highlight? }` |
| `projects.js` | `projects[]` | array | Wajib | Objek `{ id, title, category, categoryLabel, image, imageAlt, link }` |
| `highlights.js` | `items[]` | array | Wajib | Objek `{ title, description, icon }` |
| `testimonials.js` | `testimonials[]` | array | Opsional | Objek `{ name, role, quote, photo }` |
| `skills.js` | `skills[]` | array | Wajib | Objek `{ name, short }` (maks. 12 disarankan) |
| `contact.js` | `whatsapp` | string | Opsional | Nomor WA internasional tanpa tanda plus (misal: `"62812345678"`) |
| `contact.js` | `email` | string | Opsional | Alamat email aktif klien |
| `ui.js` | `ui` | object | Wajib | Kumpulan teks label sistem antarmuka |

### Daftar Ikon Generik (`src/lib/icons.js`)
Berikut adalah daftar glyph ikon SVG bawaan yang dapat digunakan langsung pada properti `icon` di `services.js`, `highlights.js`, atau komponen lain tanpa dependensi eksternal:

| Kategori | Nama Ikon | Rekomendasi Penggunaan |
|---|---|---|
| **Layanan & Web** | `code` | Pengembangan web, rekayasa perangkat lunak |
| | `layout` | Desain layout, tata letak, antarmuka |
| | `pen-tool` | Desain vektor, UI/UX, ilustrasi |
| | `file-text` | Dokumentasi, kepenulisan teknis, riset |
| | `globe` | Jaringan web, internasionalisasi, domain |
| | `palette` | Desain grafis, seni visual, pemilihan warna |
| | `bar-chart` | Analitik data, statistik, metrik bisnis |
| | `shopping-bag` | E-commerce, toko online, produk komersial |
| | `megaphone` | Pemasaran digital, periklanan, publikasi |
| | `camera` | Fotografi produk, fotografi still-life |
| | `film` | Motion graphics, video animasi, multimedia |
| **Keunggulan & Umum** | `message` / `message-circle` | Komunikasi, konsultasi, diskusi |
| | `lightbulb` | Pemecahan masalah, inovasi kreatif |
| | `target` | Berorientasi tujuan, strategi brand |
| | `clock` | Ketepatan waktu, efisiensi pengerjaan |
| | `graduation-cap` | Latar pendidikan, sertifikasi, akademik |
| | `quote` | Kutipan testimoni |
| | `map-pin` | Lokasi domisili |
| **Sosial & Aksi** | `instagram`, `whatsapp`, `discord`, `email` | Akun media sosial dan saluran kontak |
| | `arrow-right`, `arrow-up`, `external-link` | Tombol aksi dan tautan eksternal |
| | `chevron-left`, `chevron-right` | Kontrol geser carousel |

---

## Ganti Warna dan Mode

Warna aksen situs ditentukan melalui token CSS adaptif. Cukup ubah satu baris di `src/data/site.js`:
```javascript
export const site = {
  theme: {
    mode: "dark",    // Pilihan: "dark" atau "light"
    accent: "#7456ff", // Ganti dengan kode warna hex 6 digit brand klien
  },
  // ...
};
```
Sistem secara otomatis menyesuaikan warna turunan seperti latar interaktif, efek sorot, border, dan teks aksen kontras tinggi sesuai mode gelap maupun terang.

---

## Urutan dan Toggle Section

Anda dapat mengaktifkan atau menonaktifkan section apa pun tanpa menyentuh kode HTML. Buka `src/data/site.js`:

```javascript
export const site = {
  sections: {
    hero: true,
    services: true,
    stats: true,
    projects: true,
    highlights: true,
    testimonials: false, // ubah true jika klien memiliki ulasan
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
};
```
- Jika suatu section diset `false`, komponen tersebut tidak akan dirender ke dalam HTML final sama sekali.
- Urutan tampilan elemen di halaman utama akan secara presisi mengikuti array `order`.

---

## Ganti Favicon dan OG Image

### Favicon
1. Buka file `public/favicon.svg`.
2. Ganti konten vektor dengan logo atau simbol geometris milik klien.
3. Favicon otomatis terbaca di browser dengan format SVG tajam di semua resolusi layar.

### Open Graph & Social Share Image
1. Siapkan gambar rasio 1200x630 piksel (format PNG/WebP/JPG).
2. Simpan di folder `public/images/og.png`.
3. Di `src/data/site.js`, isi properti domain dan path gambar:
   ```javascript
   export const site = {
     url: "https://namaklien.com",
     ogImage: "/images/og.png",
     // ...
   };
   ```
4. Template otomatis membuat tag `og:image`, `twitter:image`, `canonical`, dan skema terstruktur `JSON-LD Person`.

---

## Panduan Deploy

Situs ini menghasilkan berkas statis murni di folder `dist/` setelah `npm run build`.

### 1. Vercel
- Hubungkan repositori GitHub ke Vercel.
- Framework Preset: **Astro**.
- Build Command: `npm run build`.
- Output Directory: `dist`.

### 2. Netlify
- Hubungkan repositori ke Netlify.
- Build command: `npm run build`.
- Publish directory: `dist`.

### 3. Cloudflare Pages
- Buat proyek Pages baru dari repositori Git.
- Build preset: **Astro**.
- Build command: `npm run build`.
- Build output directory: `dist`.

> **Catatan Lisensi & ToS:** Sebagian platform hosting memberlakukan aturan khusus untuk tier gratis (misalnya non-komersial). Sebelum mempublikasikan situs komersial milik klien, selalu periksa Ketentuan Layanan (Terms of Service) terbaru dari penyedia hosting yang Anda pilih.

---

## Domain Sendiri

1. Beli domain di registrar pilihan Anda atau klien.
2. Pada panel DNS registrar, tambahkan konfigurasi sesuai penyedia hosting:
   - **CNAME Record**: Arahkan subdomain (misal `www`) ke domain yang diberikan hosting (misal `cname.vercel-dns.com`).
   - **A Record**: Arahkan apex domain (`@`) ke alamat IP server penyedia hosting.
3. Masukkan domain kustom pada pengaturan hosting untuk mengaktifkan sertifikat SSL (HTTPS) gratis secara otomatis.

---

## Error `[DATA]` dan Cara Membacanya

Template ini dilengkapi sistem validasi ketat di `src/lib/validate.js`. Jika Anda lupa mengisi field wajib atau memasukkan format data yang salah, proses build akan berhenti dengan pesan yang jelas:

```text
[DATA] Ditemukan 1 kesalahan data:
1. [src/data/site.js] theme.accent: Format warna aksen "#abc" tidak valid. Gunakan format hex 6 digit (contoh: "#RRGGBB").
```

Setiap pesan mencantumkan:
- File sumber konfigurasi.
- Nama field yang bermasalah.
- Penjelasan dan contoh format yang benar.

---

## FAQ Singkat

**T: Bagaimana jika klien belum memiliki ulasan testimoni?**  
J: Tetapkan `sections.testimonials: false` di `src/data/site.js`. Section tidak akan muncul dan navigasi tetap rapi.

**T: Mengapa tidak menggunakan framework JavaScript seperti React atau Vue?**  
J: Situs portofolio statis bekerja paling optimal dengan HTML/CSS murni. Ini menghemat konsumsi kuota pengguna, mempercepat pemuatan halaman hingga instan, dan menjamin skor performa 100/100 di perangkat seluler.

**T: Bagaimana cara mengganti font Poppins?**  
J: Jika ingin mengganti font, perbarui import `@fontsource` di `src/layouts/Base.astro` dan sesuaikan token `--font-sans` di `src/styles/tokens.css`.
