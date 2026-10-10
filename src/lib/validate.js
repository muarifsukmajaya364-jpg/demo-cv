import fs from 'fs';
import path from 'path';
import { icons } from './icons.js';
import { sectionKeys } from './sections.js';

function checkImageExists(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return true;
  if (!imagePath.startsWith('/')) return true; // abaikan URL eksternal atau relative khusus
  const clean = imagePath.replace(/^\//, '');
  const absPath = path.resolve(process.cwd(), 'public', clean);
  return fs.existsSync(absPath);
}

export function validateData(allData) {
  if (!allData || typeof allData !== 'object') {
    throw new Error('[DATA] Data konfigurasi tidak valid atau tidak disediakan.');
  }

  const {
    site,
    profile,
    services,
    stats,
    projects,
    highlights,
    testimonials,
    skills,
    contact,
    ui,
  } = allData;

  const errors = [];
  const warnings = [];

  // 1. SITE
  if (!site) {
    errors.push('[src/data/site.js] Objek site tidak ditemukan. Pastikan site diekspor.');
  } else {
    if (!site.title || typeof site.title !== 'string' || !site.title.trim()) {
      errors.push('[src/data/site.js] title: Judul website (title) tidak boleh kosong. Isi title di src/data/site.js.');
    }
    if (!site.description || typeof site.description !== 'string' || !site.description.trim()) {
      errors.push('[src/data/site.js] description: Deskripsi website (description) tidak boleh kosong. Isi description di src/data/site.js.');
    }
    if (!site.lang || typeof site.lang !== 'string' || !site.lang.trim()) {
      errors.push('[src/data/site.js] lang: Kode bahasa (lang) tidak boleh kosong. Isi lang di src/data/site.js (contoh: "id").');
    }
    const accent = site.theme?.accent;
    if (!accent || !/^#[0-9a-fA-F]{6}$/.test(accent)) {
      errors.push(`[src/data/site.js] theme.accent: Format warna aksen "${accent}" tidak valid. Gunakan format hex 6 digit (contoh: "#RRGGBB").`);
    }
    const mode = site.theme?.mode;
    if (mode !== 'dark' && mode !== 'light') {
      errors.push(`[src/data/site.js] theme.mode: Mode tema "${mode}" tidak valid. Gunakan "dark" atau "light".`);
    }

    if (site.sections && typeof site.sections === 'object') {
      for (const [secKey, secVal] of Object.entries(site.sections)) {
        if (!sectionKeys.includes(secKey)) {
          errors.push(`[src/data/site.js] sections: Section "${secKey}" tidak dikenal. Gunakan salah satu dari: ${sectionKeys.join(', ')}.`);
        }
        if (typeof secVal !== 'boolean') {
          errors.push(`[src/data/site.js] sections.${secKey}: Nilai harus bertipe boolean (true atau false).`);
        }
      }
    } else {
      errors.push('[src/data/site.js] sections: Objek sections wajib disediakan.');
    }

    if (!Array.isArray(site.order)) {
      errors.push('[src/data/site.js] order: Urutan section (order) harus berupa array.');
    } else {
      const seenOrder = new Set();
      for (const item of site.order) {
        if (!sectionKeys.includes(item)) {
          errors.push(`[src/data/site.js] order: Section "${item}" tidak dikenal. Gunakan salah satu dari: ${sectionKeys.join(', ')}.`);
        }
        if (seenOrder.has(item)) {
          errors.push(`[src/data/site.js] order: Duplikasi section "${item}" di dalam array order. Hapus salah satu.`);
        }
        seenOrder.add(item);
      }
      if (site.sections && typeof site.sections === 'object') {
        for (const [key, isEnabled] of Object.entries(site.sections)) {
          if (isEnabled === true && !site.order.includes(key)) {
            errors.push(`[src/data/site.js] order: Section "${key}" bernilai true di sections tetapi tidak ada di order. Tambahkan "${key}" ke dalam order.`);
          }
        }
      }
    }

    if (Array.isArray(site.nav)) {
      site.nav.forEach((item, idx) => {
        if (!item.label || typeof item.label !== 'string' || !item.label.trim()) {
          errors.push(`[src/data/site.js] nav[${idx}].label: Label navigasi tidak boleh kosong.`);
        }
        if (!item.href || typeof item.href !== 'string' || !item.href.startsWith('#')) {
          errors.push(`[src/data/site.js] nav[${idx}].href: Nilai href "${item.href}" harus diawali dengan tanda "#".`);
        }
        if (item.section && !sectionKeys.includes(item.section)) {
          errors.push(`[src/data/site.js] nav[${idx}].section: Section "${item.section}" tidak dikenal.`);
        }
      });
    }
  }

  // 2. PROFILE
  if (!profile) {
    errors.push('[src/data/profile.js] Objek profile tidak ditemukan.');
  } else {
    if (!profile.name || typeof profile.name !== 'string' || !profile.name.trim()) {
      errors.push('[src/data/profile.js] name: Nama profil (name) tidak boleh kosong. Isi name di src/data/profile.js.');
    }
    if (!profile.role || typeof profile.role !== 'string' || !profile.role.trim()) {
      errors.push('[src/data/profile.js] role: Bidang profesi (role) tidak boleh kosong. Isi role di src/data/profile.js.');
    }
    if (!profile.bio || typeof profile.bio !== 'string' || !profile.bio.trim()) {
      errors.push('[src/data/profile.js] bio: Bio ringkas (bio) tidak boleh kosong. Isi bio di src/data/profile.js.');
    }
    if (profile.photo && typeof profile.photo === 'string' && profile.photo.trim() !== '') {
      if (!profile.photoAlt || typeof profile.photoAlt !== 'string' || !profile.photoAlt.trim()) {
        errors.push('[src/data/profile.js] photoAlt: photoAlt wajib diisi bila photo terisi untuk keperluan aksesibilitas.');
      }
      if (!checkImageExists(profile.photo)) {
        errors.push(`[src/data/profile.js] photo: File gambar tidak ditemukan: ${profile.photo}. Pastikan file ada di folder public/.`);
      }
    }
  }

  // 3. SERVICES
  if (Array.isArray(services)) {
    services.forEach((item, idx) => {
      if (!item.title || typeof item.title !== 'string' || !item.title.trim()) {
        errors.push(`[src/data/services.js] services[${idx}].title: Judul layanan tidak boleh kosong.`);
      }
      if (!item.description || typeof item.description !== 'string' || !item.description.trim()) {
        errors.push(`[src/data/services.js] services[${idx}].description: Deskripsi layanan tidak boleh kosong.`);
      }
      if (!item.icon || !Object.prototype.hasOwnProperty.call(icons, item.icon)) {
        errors.push(`[src/data/services.js] services[${idx}].icon: Ikon "${item.icon}" tidak valid atau tidak terdaftar di src/lib/icons.js.`);
      }
    });
  }

  // 4. STATS
  if (Array.isArray(stats)) {
    stats.forEach((item, idx) => {
      if (!item.value || typeof item.value !== 'string' || !item.value.trim()) {
        errors.push(`[src/data/stats.js] stats[${idx}].value: Nilai statistik tidak boleh kosong.`);
      }
      if (!item.label || typeof item.label !== 'string' || !item.label.trim()) {
        errors.push(`[src/data/stats.js] stats[${idx}].label: Label statistik tidak boleh kosong.`);
      }
    });
  }

  // 5. HIGHLIGHTS
  if (highlights?.items && Array.isArray(highlights.items)) {
    highlights.items.forEach((item, idx) => {
      if (!item.title || typeof item.title !== 'string' || !item.title.trim()) {
        errors.push(`[src/data/highlights.js] items[${idx}].title: Judul highlight tidak boleh kosong.`);
      }
      if (!item.description || typeof item.description !== 'string' || !item.description.trim()) {
        errors.push(`[src/data/highlights.js] items[${idx}].description: Deskripsi highlight tidak boleh kosong.`);
      }
      if (!item.icon || !Object.prototype.hasOwnProperty.call(icons, item.icon)) {
        errors.push(`[src/data/highlights.js] items[${idx}].icon: Ikon "${item.icon}" tidak valid atau tidak terdaftar di src/lib/icons.js.`);
      }
    });
  }

  // 6. PROJECTS
  if (Array.isArray(projects)) {
    const seenIds = new Set();
    projects.forEach((item, idx) => {
      if (!item.id || typeof item.id !== 'string' || !item.id.trim()) {
        errors.push(`[src/data/projects.js] projects[${idx}].id: ID project tidak boleh kosong.`);
      } else {
        if (seenIds.has(item.id)) {
          errors.push(`[src/data/projects.js] projects[${idx}].id: ID project "${item.id}" duplikat. Setiap project harus memiliki id unik.`);
        }
        seenIds.add(item.id);
      }
      if (!item.title || typeof item.title !== 'string' || !item.title.trim()) {
        errors.push(`[src/data/projects.js] projects[${idx}].title: Judul project tidak boleh kosong.`);
      }
      if (!item.category || typeof item.category !== 'string' || !item.category.trim()) {
        errors.push(`[src/data/projects.js] projects[${idx}].category: Kategori project tidak boleh kosong.`);
      }
      if (!item.categoryLabel || typeof item.categoryLabel !== 'string' || !item.categoryLabel.trim()) {
        errors.push(`[src/data/projects.js] projects[${idx}].categoryLabel: Label kategori project tidak boleh kosong.`);
      }
      if (item.image && typeof item.image === 'string' && item.image.trim() !== '') {
        if (!item.imageAlt || typeof item.imageAlt !== 'string' || !item.imageAlt.trim()) {
          errors.push(`[src/data/projects.js] projects[${idx}].imageAlt: imageAlt wajib diisi bila image terisi.`);
        }
        if (!checkImageExists(item.image)) {
          errors.push(`[src/data/projects.js] image: File gambar tidak ditemukan: ${item.image}. Pastikan file ada di folder public/.`);
        }
      }
    });
  }

  // 7. TESTIMONIALS
  if (Array.isArray(testimonials)) {
    testimonials.forEach((item, idx) => {
      if (!item.name || typeof item.name !== 'string' || !item.name.trim()) {
        errors.push(`[src/data/testimonials.js] testimonials[${idx}].name: Nama pemberi testimoni tidak boleh kosong.`);
      }
      if (!item.quote || typeof item.quote !== 'string' || !item.quote.trim()) {
        errors.push(`[src/data/testimonials.js] testimonials[${idx}].quote: Isi kutipan testimoni (quote) tidak boleh kosong.`);
      }
      if (item.photo && typeof item.photo === 'string' && item.photo.trim() !== '') {
        if (!checkImageExists(item.photo)) {
          errors.push(`[src/data/testimonials.js] photo: File gambar tidak ditemukan: ${item.photo}. Pastikan file ada di folder public/.`);
        }
      }
    });
  }

  // 8. SKILLS
  if (Array.isArray(skills)) {
    skills.forEach((item, idx) => {
      if (!item.name || typeof item.name !== 'string' || !item.name.trim()) {
        errors.push(`[src/data/skills.js] skills[${idx}].name: Nama skill tidak boleh kosong.`);
      }
      if (!item.short || typeof item.short !== 'string' || !item.short.trim()) {
        errors.push(`[src/data/skills.js] skills[${idx}].short: Singkatan skill (short) tidak boleh kosong.`);
      } else if (item.short.trim().length > 3) {
        errors.push(`[src/data/skills.js] skills[${idx}].short: Singkatan "${item.short}" maksimal 3 karakter.`);
      }
    });
  }

  // 9. UI
  if (!ui || typeof ui !== 'object') {
    errors.push('[src/data/ui.js] Objek ui wajib diekspor dari src/data/ui.js.');
  } else {
    const requiredUiKeys = [
      'skipLink',
      'navLabel',
      'menuOpen',
      'menuClose',
      'carouselPrev',
      'carouselNext',
      'carouselItem',
      'carouselPagination',
      'servicesPrev',
      'servicesNext',
      'servicesItem',
      'statsSectionLabel',
      'filterLabel',
      'filterAll',
      'testimonialsPrev',
      'testimonialsNext',
      'testimonialsItem',
      'backToTop',
      'notFoundHeading',
      'notFoundTitle',
      'notFoundDesc',
      'notFoundBack',
    ];
    for (const key of requiredUiKeys) {
      if (!ui[key] || typeof ui[key] !== 'string' || !ui[key].trim()) {
        errors.push(`[src/data/ui.js] ui.${key}: Key "${key}" wajib ada dan tidak boleh kosong.`);
      }
    }
  }

  // PERINGATAN (WARNINGS)
  if (Array.isArray(projects) && projects.length > 12) {
    warnings.push(`Jumlah project (${projects.length}) melebihi rekomendasi maksimal 12.`);
  }
  if (profile?.bio && profile.bio.length > 400) {
    warnings.push(`Bio profil (${profile.bio.length} karakter) melebihi batas yang disarankan 400 karakter.`);
  }
  if (Array.isArray(projects)) {
    projects.forEach((p) => {
      if (p.title && p.title.length > 60) {
        warnings.push(`Judul project "${p.title}" (${p.title.length} karakter) melebihi batas 60 karakter.`);
      }
    });
  }
  if (Array.isArray(stats) && stats.length !== 4) {
    warnings.push(`Jumlah item statistik (${stats.length}) bukan 4 item.`);
  }
  if (Array.isArray(skills) && skills.length > 12) {
    warnings.push(`Jumlah item skills (${skills.length}) melebihi rekomendasi maksimal 12.`);
  }

  // Tampilkan peringatan jika ada
  warnings.forEach((w) => {
    console.warn(`[DATA][peringatan] ${w}`);
  });

  // Jika ada error, lempar Error sekaligus dalam daftar bernomor
  if (errors.length > 0) {
    const list = errors.map((err, i) => `${i + 1}. ${err}`).join('\n');
    throw new Error(`[DATA] Ditemukan ${errors.length} kesalahan data:\n${list}`);
  }
}
