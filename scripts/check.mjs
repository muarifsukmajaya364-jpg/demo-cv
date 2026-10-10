import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import net from 'net';

// Helper to find Chrome executable
function getChromePath() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    path.join(process.env.PROGRAMFILES || '', 'Google\\Chrome\\Application\\chrome.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google\\Chrome\\Application\\chrome.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return null;
}

// Find a free TCP port
function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

async function main() {
  const reportsDir = path.resolve('_brief/reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  const reportPath = path.join(reportsDir, 'check-latest.txt');

  const rows = [];
  function log(status, category, detail, value) {
    const line = `${status} | ${category} | ${detail} | ${value}`;
    rows.push(line);
    console.log(line);
  }

  let hasFail = false;

  console.log('--- [A] PENGUJIAN STATIS ---');

  // A.1: npm run build
  try {
    const buildOut = execSync('npm run build', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    const warnings = (buildOut.match(/warn|warning/gi) || []).length;
    if (warnings > 0) {
      log('WARN', 'build', 'npm run build memiliki warning', warnings);
    } else {
      log('PASS', 'build', 'npm run build sukses tanpa warning', 0);
    }
  } catch (err) {
    hasFail = true;
    log('FAIL', 'build', 'npm run build gagal', err.status || 1);
  }

  // A.2: Hex di src
  function getAllFiles(dir, exts = ['.astro', '.js', '.css', '.html']) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(getAllFiles(p, exts));
      } else if (exts.includes(path.extname(item.name))) {
        files.push(p);
      }
    }
    return files;
  }

  const srcFiles = getAllFiles('src');
  const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;
  let hexViolations = [];

  for (const file of srcFiles) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (rel === 'src/styles/tokens.css' || rel === 'src/data/site.js' || rel === 'src/data/_starter/site.js') {
        continue;
      }
      if (rel === 'src/layouts/Base.astro' && (line.includes('themeColor') || line.includes('theme-color'))) {
        continue;
      }
      const matches = line.match(hexRegex);
      if (matches) {
        for (const m of matches) {
          hexViolations.push(`${rel}:${i + 1} (${m})`);
        }
      }
    }
  }

  if (hexViolations.length > 0) {
    hasFail = true;
    log('FAIL', 'hex', `Hex ditemukan di luar tokens.css, site.js, Base.astro (${hexViolations.join(', ')})`, hexViolations.length);
  } else {
    log('PASS', 'hex', 'Tidak ada nilai hex ilegal di src', 0);
  }

  // A.3: style=, !important, console.log, TODO
  let styleViolations = [];
  let importantViolations = [];
  let consoleViolations = [];
  let todoViolations = [];

  for (const file of srcFiles) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // style=
      if (line.includes('style=')) {
        if (rel === 'src/layouts/Base.astro' && line.includes('<html') && line.includes('--accent:')) {
          // Allowed single inline style
        } else {
          styleViolations.push(`${rel}:${i + 1}`);
        }
      }

      // !important
      if (line.includes('!important')) {
        importantViolations.push(`${rel}:${i + 1}`);
      }

      // console.log
      if (line.includes('console.log')) {
        consoleViolations.push(`${rel}:${i + 1}`);
      }

      // TODO
      if (line.includes('TODO')) {
        todoViolations.push(`${rel}:${i + 1}`);
      }
    }
  }

  if (styleViolations.length > 0) {
    hasFail = true;
    log('FAIL', 'inline-style', `Atribut style= ilegal ditemukan (${styleViolations.join(', ')})`, styleViolations.length);
  } else {
    log('PASS', 'inline-style', 'Hanya 1 style= di <html> Base.astro', 1);
  }

  if (importantViolations.length > 0) {
    hasFail = true;
    log('FAIL', 'important', `!important ditemukan di src (${importantViolations.join(', ')})`, importantViolations.length);
  } else {
    log('PASS', 'important', 'Tidak ada !important di src', 0);
  }

  if (consoleViolations.length > 0) {
    log('WARN', 'console-log', `console.log ditemukan di src (${consoleViolations.join(', ')})`, consoleViolations.length);
  } else {
    log('PASS', 'console-log', 'Tidak ada console.log di src', 0);
  }

  if (todoViolations.length > 0) {
    log('WARN', 'todo', `TODO ditemukan di src (${todoViolations.join(', ')})`, todoViolations.length);
  } else {
    log('PASS', 'todo', 'Tidak ada TODO di src', 0);
  }

  // A.4: dependencies di package.json
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const deps = Object.keys(pkg.dependencies || {}).sort();
    const expected = ['@fontsource/poppins', 'astro'].sort();
    const match = deps.length === expected.length && deps.every((d, idx) => d === expected[idx]);
    if (match) {
      log('PASS', 'dependencies', 'Dependensi package.json persis astro dan @fontsource/poppins', deps.length);
    } else {
      hasFail = true;
      log('FAIL', 'dependencies', `Dependensi tidak sesuai: ${deps.join(', ')}`, deps.length);
    }
  } catch (err) {
    hasFail = true;
    log('FAIL', 'dependencies', 'Gagal membaca package.json', 1);
  }

  console.log('\n--- [B] PENGUJIAN DINAMIS (CDP HEADLESS CHROME) ---');

  const chromePath = getChromePath();
  if (!chromePath) {
    hasFail = true;
    log('FAIL', 'chrome', 'Chrome binary tidak ditemukan di sistem', 0);
    fs.writeFileSync(reportPath, rows.join('\n') + '\n', 'utf8');
    process.exit(1);
  }

  const port = await getFreePort();
  const cdpPort = await getFreePort();

  let previewProcess = null;
  let chromeProcess = null;
  let ws = null;

  try {
    // Start preview server
    const astroCli = path.resolve('node_modules', 'astro', 'bin', 'astro.mjs');
    previewProcess = spawn(process.execPath, [astroCli, 'preview', '--port', String(port), '--host', '127.0.0.1'], {
      stdio: 'pipe',
      shell: false,
    });

    // Wait until preview server is responding
    let serverReady = false;
    for (let attempts = 0; attempts < 30; attempts++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/`);
        if (res.status === 200) {
          serverReady = true;
          break;
        }
      } catch (e) {}
    }

    if (!serverReady) {
      throw new Error(`Astro preview gagal dijalankan di port ${port}`);
    }

    // Start Headless Chrome
    chromeProcess = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${cdpPort}`,
      '--no-sandbox',
      '--disable-gpu',
      'about:blank',
    ], { shell: false });

    // Wait for CDP
    let debuggerUrl = null;
    for (let attempts = 0; attempts < 25; attempts++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
        const json = await res.json();
        debuggerUrl = json.webSocketDebuggerUrl;
        if (debuggerUrl) break;
      } catch (e) {}
    }

    if (!debuggerUrl) {
      throw new Error(`CDP debugger URL tidak dapat diakses di port ${cdpPort}`);
    }

    ws = new WebSocket(debuggerUrl);
    let msgId = 1;
    const callbacks = new Map();
    ws.onmessage = e => {
      const d = JSON.parse(e.data);
      if (d.id && callbacks.has(d.id)) {
        callbacks.get(d.id)(d);
        callbacks.delete(d.id);
      }
    };
    await new Promise(r => ws.onopen = r);

    const send = (method, params = {}) => new Promise(r => {
      const i = msgId++;
      callbacks.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

    const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
    const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
    const sendSession = (method, params = {}) => new Promise(r => {
      const i = msgId++;
      callbacks.set(i, r);
      ws.send(JSON.stringify({ id: i, sessionId, method, params }));
    });

    await sendSession('Page.enable');
    await sendSession('DOM.enable');

    const viewports = [
      { w: 375, h: 667, mobile: true },
      { w: 768, h: 900, mobile: false },
      { w: 1024, h: 900, mobile: false },
      { w: 1440, h: 900, mobile: false },
      { w: 1920, h: 900, mobile: false },
    ];

    for (const vp of viewports) {
      const { w, h, mobile } = vp;
      await sendSession('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile,
      });

      await sendSession('Page.navigate', { url: `http://127.0.0.1:${port}/` });
      await new Promise(r => setTimeout(r, 600));

      // B.5: scrollWidth - innerWidth == 0
      const scrollCheck = await sendSession('Runtime.evaluate', {
        expression: `document.documentElement.scrollWidth - window.innerWidth`,
        returnByValue: true,
      });
      const overflow = scrollCheck.result.result.value;
      if (overflow > 0) {
        hasFail = true;
        log('FAIL', 'horizontal-scroll', `Overflow horizontal pada viewport ${w}px`, `${overflow}px`);
      } else {
        log('PASS', 'horizontal-scroll', `Bebas overflow horizontal pada viewport ${w}px`, `0px`);
      }

      // B.6: Tepi kiri dan kanan .container sejajar navbar (toleransi 1px)
      const containerCheck = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const navContainer = document.querySelector('.navbar .container, header .container');
          if (!navContainer) return { error: 'nav container not found' };
          const navRect = navContainer.getBoundingClientRect();
          const containers = Array.from(document.querySelectorAll('.container'));
          const deviations = [];

          containers.forEach((c, idx) => {
            if (c === navContainer) return;
            // Ignore hidden containers
            if (c.offsetParent === null && c.clientHeight === 0) return;
            const r = c.getBoundingClientRect();
            const diffLeft = Math.abs(r.left - navRect.left);
            const diffRight = Math.abs(r.right - navRect.right);
            if (diffLeft > 1 || diffRight > 1) {
              const parentSection = c.closest('section, footer, div');
              const id = parentSection ? (parentSection.id || parentSection.className) : idx;
              deviations.push(\`\${id} (dL:\${diffLeft.toFixed(1)}px, dR:\${diffRight.toFixed(1)}px)\`);
            }
          });

          return {
            total: containers.length,
            deviations
          };
        })()`,
        returnByValue: true,
      });

      const cRes = containerCheck.result.result.value;
      if (cRes.deviations && cRes.deviations.length > 0) {
        hasFail = true;
        log('FAIL', 'container-align', `Container tidak sejajar navbar pada viewport ${w}px (${cRes.deviations.join(', ')})`, cRes.deviations.length);
      } else {
        log('PASS', 'container-align', `Semua .container sejajar navbar pada viewport ${w}px`, 0);
      }

      // B.7: Scroll pelan dan verifikasi <img> complete & naturalWidth > 0
      const imgLoadCheck = await sendSession('Runtime.evaluate', {
        expression: `(async () => {
          const imgs = Array.from(document.querySelectorAll('img'));
          for (const img of imgs) {
            img.scrollIntoView({ behavior: 'instant', block: 'center' });
            await new Promise(r => setTimeout(r, 60));
          }
          await Promise.all(imgs.map(img => {
            if (img.complete && img.naturalWidth > 0) return Promise.resolve();
            return new Promise(resolve => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
              setTimeout(resolve, 800);
            });
          }));

          const broken = [];
          imgs.forEach((img, i) => {
            if (!img.complete || img.naturalWidth === 0) {
              const src = img.getAttribute('src') || '';
              const alt = img.getAttribute('alt') || '';
              broken.push(img.className || alt || src || \`img-\${i}\`);
            }
          });

          return { total: imgs.length, broken };
        })()`,
        awaitPromise: true,
        returnByValue: true,
      });

      const imgRes = imgLoadCheck.result.result.value;
      if (imgRes.broken.length > 0) {
        hasFail = true;
        log('FAIL', 'img-loading', `Gambar gagal dimuat pada viewport ${w}px (${imgRes.broken.join(', ')})`, imgRes.broken.length);
      } else {
        log('PASS', 'img-loading', `Semua <img> termuat lengkap pada viewport ${w}px`, imgRes.total);
      }

      // B.8: Rasio render vs atribut width/height (toleransi 3%)
      const ratioCheck = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const imgs = Array.from(document.querySelectorAll('img[width][height]'));
          const warnings = [];

          imgs.forEach((img, i) => {
            const attrW = parseFloat(img.getAttribute('width'));
            const attrH = parseFloat(img.getAttribute('height'));
            if (!attrW || !attrH) return;
            const r = img.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            const attrRatio = attrW / attrH;
            const renderRatio = r.width / r.height;
            const diffPct = Math.abs(renderRatio - attrRatio) / attrRatio * 100;

            if (diffPct > 3) {
              const ident = img.className || img.getAttribute('alt') || \`img-\${i}\`;
              warnings.push(\`\${ident} (attr:\${attrRatio.toFixed(3)}, render:\${renderRatio.toFixed(3)}, selisih:\${diffPct.toFixed(1)}%)\`);
            }
          });

          return warnings;
        })()`,
        returnByValue: true,
      });

      const ratioWarns = ratioCheck.result.result.value || [];
      if (ratioWarns.length > 0) {
        hasFail = true;
        log('FAIL', 'img-aspect-ratio', `Rasio render berbeda dari atribut pada viewport ${w}px (${ratioWarns.join(', ')})`, ratioWarns.length);
      } else {
        log('PASS', 'img-aspect-ratio', `Rasio render sesuai atribut width/height pada viewport ${w}px`, 0);
      }

      // B.8b: Pengukuran presisi img.hero__img via getBoundingClientRect()
      // (768/1024/1440/1920: 420x525 tol 1px; 375: rasio 0.800 tol 0.005)
      const heroImgCheck = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const img = document.querySelector('img.hero__img');
          if (!img) return { error: 'img.hero__img tidak ditemukan' };
          const r = img.getBoundingClientRect();
          return {
            width: r.width,
            height: r.height,
            ratio: r.width / r.height
          };
        })()`,
        returnByValue: true,
      });

      const hRes = heroImgCheck?.result?.result?.value;
      if (!hRes || hRes.error) {
        hasFail = true;
        log('FAIL', 'hero-img-dims', `img.hero__img tidak ditemukan pada viewport ${w}px`, 0);
      } else if (w === 375) {
        const diffRatio = Math.abs(hRes.ratio - 0.800);
        if (diffRatio <= 0.005) {
          log('PASS', 'hero-img-dims', `Rasio img.hero__img ${hRes.ratio.toFixed(4)} sesuai target 0.800 (tol 0.005) pada viewport 375px (${hRes.width.toFixed(1)}x${hRes.height.toFixed(1)})`, hRes.ratio.toFixed(3));
        } else {
          hasFail = true;
          log('FAIL', 'hero-img-dims', `Rasio img.hero__img ${hRes.ratio.toFixed(4)} menyimpang dari 0.800 pada viewport 375px`, hRes.ratio.toFixed(3));
        }
      } else {
        const diffW = Math.abs(hRes.width - 420);
        const diffH = Math.abs(hRes.height - 525);
        if (diffW <= 1 && diffH <= 1) {
          log('PASS', 'hero-img-dims', `Dimensi img.hero__img ${hRes.width.toFixed(1)}x${hRes.height.toFixed(1)} sesuai 420x525 (tol 1px) pada viewport ${w}px`, `${hRes.width.toFixed(0)}x${hRes.height.toFixed(0)}`);
        } else {
          hasFail = true;
          log('FAIL', 'hero-img-dims', `Dimensi img.hero__img ${hRes.width.toFixed(1)}x${hRes.height.toFixed(1)} menyimpang dari 420x525 pada viewport ${w}px`, `${hRes.width.toFixed(1)}x${hRes.height.toFixed(1)}`);
        }
      }

      // B.9: Tepat 1 <h1>, header, main, footer (footer belum ada: WARN)
      const landmarkCheck = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          return {
            h1Count: document.querySelectorAll('h1').length,
            headerCount: document.querySelectorAll('header').length,
            mainCount: document.querySelectorAll('main').length,
            footerCount: document.querySelectorAll('footer').length
          };
        })()`,
        returnByValue: true,
      });

      const lm = landmarkCheck.result.result.value;
      if (lm.h1Count !== 1) {
        hasFail = true;
        log('FAIL', 'landmarks', `Jumlah <h1> harus tepat 1 pada viewport ${w}px`, lm.h1Count);
      }
      if (lm.headerCount !== 1) {
        hasFail = true;
        log('FAIL', 'landmarks', `Jumlah <header> harus tepat 1 pada viewport ${w}px`, lm.headerCount);
      }
      if (lm.mainCount !== 1) {
        hasFail = true;
        log('FAIL', 'landmarks', `Jumlah <main> harus tepat 1 pada viewport ${w}px`, lm.mainCount);
      }
      if (lm.footerCount === 0) {
        log('WARN', 'landmarks', `<footer> belum ada sebelum Tahap 6 pada viewport ${w}px`, 0);
      } else if (lm.footerCount === 1) {
        log('PASS', 'landmarks', `Tepat satu <footer> pada viewport ${w}px`, 1);
      } else {
        hasFail = true;
        log('FAIL', 'landmarks', `Lebih dari satu <footer> pada viewport ${w}px`, lm.footerCount);
      }
      if (lm.h1Count === 1 && lm.headerCount === 1 && lm.mainCount === 1 && lm.footerCount <= 1) {
        log('PASS', 'landmarks', `Struktur landmark utama valid pada viewport ${w}px`, 1);
      }

      // B.10: [data-carousel] CDP click next & prev jump test (~40px from bottom)
      const carouselsData = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const list = Array.from(document.querySelectorAll('[data-carousel]'));
          return list.map((c, idx) => {
            const nextBtn = c.querySelector('[data-carousel-next]');
            const prevBtn = c.querySelector('[data-carousel-prev]');
            const parent = c.closest('section');
            const id = parent ? parent.id : \`carousel-\${idx}\`;
            return {
              id,
              hasNext: Boolean(nextBtn && nextBtn.offsetParent !== null),
              hasPrev: Boolean(prevBtn && prevBtn.offsetParent !== null)
            };
          });
        })()`,
        returnByValue: true,
      });

      const cList = carouselsData.result.result.value || [];
      for (const car of cList) {
        if (!car.hasNext) continue;

        // Position nextBtn ~40px from viewport bottom
        await sendSession('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('${car.id}');
            const btn = sec.querySelector('[data-carousel-next]');
            const r = btn.getBoundingClientRect();
            const btnAbsoluteTop = r.top + window.scrollY;
            const targetScroll = btnAbsoluteTop - (window.innerHeight - 40 - r.height);
            window.scrollTo({ top: targetScroll, behavior: 'instant' });
          })()`,
        });
        await new Promise(r => setTimeout(r, 200));

        const beforeNext = await sendSession('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('${car.id}');
            const btn = sec.querySelector('[data-carousel-next]');
            const r = btn.getBoundingClientRect();
            const items = Array.from(sec.querySelectorAll('[data-carousel-item]'));
            const activeCards = items.filter(it => it.getAttribute('data-active') === 'true');
            const activeIdx = items.findIndex(it => it.getAttribute('data-active') === 'true');
            return {
              scrollY: window.scrollY,
              activeIdx,
              activeCount: activeCards.length,
              disabled: Boolean(btn.disabled),
              x: r.left + r.width / 2,
              y: r.top + r.height / 2,
              distFromBottom: window.innerHeight - r.bottom
            };
          })()`,
          returnByValue: true,
        });
        const bN = beforeNext.result.result.value;

        if (bN.activeCount !== 1) {
          hasFail = true;
          log('FAIL', 'carousel-active', `Jumlah kartu aktif tidak tepat satu sebelum next pada ${car.id} di ${w}px`, bN.activeCount);
        }

        // CDP click next
        await sendSession('Input.dispatchMouseEvent', { type: 'mousePressed', x: bN.x, y: bN.y, button: 'left', clickCount: 1 });
        await sendSession('Input.dispatchMouseEvent', { type: 'mouseReleased', x: bN.x, y: bN.y, button: 'left', clickCount: 1 });
        await new Promise(r => setTimeout(r, 400));

        const afterNext = await sendSession('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('${car.id}');
            const items = Array.from(sec.querySelectorAll('[data-carousel-item]'));
            const activeCards = items.filter(it => it.getAttribute('data-active') === 'true');
            const activeIdx = items.findIndex(it => it.getAttribute('data-active') === 'true');
            return { scrollY: window.scrollY, activeIdx, activeCount: activeCards.length };
          })()`,
          returnByValue: true,
        });
        const aN = afterNext.result.result.value;
        const deltaNext = Math.abs(aN.scrollY - bN.scrollY);

        if (deltaNext > 0) {
          hasFail = true;
          log('FAIL', 'carousel-jump', `Next click loncat pada ${car.id} di ${w}px (idx:${bN.activeIdx}->${aN.activeIdx})`, `${deltaNext}px`);
        } else {
          log('PASS', 'carousel-jump', `Next click aman pada ${car.id} di ${w}px (idx:${bN.activeIdx}->${aN.activeIdx})`, `delta=0px`);
        }

        if (aN.activeCount !== 1) {
          hasFail = true;
          log('FAIL', 'carousel-active', `Jumlah kartu aktif tidak tepat satu setelah next pada ${car.id} di ${w}px`, aN.activeCount);
        }

        if (!bN.disabled && aN.activeIdx === bN.activeIdx) {
          hasFail = true;
          log('FAIL', 'carousel-nav', `Index tidak berubah setelah next pada ${car.id} di ${w}px padahal tombol next aktif`, `idx:${bN.activeIdx}`);
        }

        // Test prev button
        const beforePrev = await sendSession('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('${car.id}');
            const btn = sec.querySelector('[data-carousel-prev]');
            const r = btn.getBoundingClientRect();
            const items = Array.from(sec.querySelectorAll('[data-carousel-item]'));
            const activeCards = items.filter(it => it.getAttribute('data-active') === 'true');
            const activeIdx = items.findIndex(it => it.getAttribute('data-active') === 'true');
            return {
              scrollY: window.scrollY,
              activeIdx,
              activeCount: activeCards.length,
              disabled: Boolean(btn.disabled),
              x: r.left + r.width / 2,
              y: r.top + r.height / 2
            };
          })()`,
          returnByValue: true,
        });
        const bP = beforePrev.result.result.value;

        if (bP.activeCount !== 1) {
          hasFail = true;
          log('FAIL', 'carousel-active', `Jumlah kartu aktif tidak tepat satu sebelum prev pada ${car.id} di ${w}px`, bP.activeCount);
        }

        await sendSession('Input.dispatchMouseEvent', { type: 'mousePressed', x: bP.x, y: bP.y, button: 'left', clickCount: 1 });
        await sendSession('Input.dispatchMouseEvent', { type: 'mouseReleased', x: bP.x, y: bP.y, button: 'left', clickCount: 1 });
        await new Promise(r => setTimeout(r, 400));

        const afterPrev = await sendSession('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('${car.id}');
            const items = Array.from(sec.querySelectorAll('[data-carousel-item]'));
            const activeCards = items.filter(it => it.getAttribute('data-active') === 'true');
            const activeIdx = items.findIndex(it => it.getAttribute('data-active') === 'true');
            return { scrollY: window.scrollY, activeIdx, activeCount: activeCards.length };
          })()`,
          returnByValue: true,
        });
        const aP = afterPrev.result.result.value;
        const deltaPrev = Math.abs(aP.scrollY - bP.scrollY);

        if (deltaPrev > 0) {
          hasFail = true;
          log('FAIL', 'carousel-jump', `Prev click loncat pada ${car.id} di ${w}px (idx:${aN.activeIdx}->${aP.activeIdx})`, `${deltaPrev}px`);
        } else {
          log('PASS', 'carousel-jump', `Prev click aman pada ${car.id} di ${w}px (idx:${aN.activeIdx}->${aP.activeIdx})`, `delta=0px`);
        }

        if (aP.activeCount !== 1) {
          hasFail = true;
          log('FAIL', 'carousel-active', `Jumlah kartu aktif tidak tepat satu setelah prev pada ${car.id} di ${w}px`, aP.activeCount);
        }

        if (!bP.disabled && aP.activeIdx === bP.activeIdx) {
          hasFail = true;
          log('FAIL', 'carousel-nav', `Index tidak berubah setelah prev pada ${car.id} di ${w}px padahal tombol prev aktif`, `idx:${bP.activeIdx}`);
        }
      }
    }

    // B.11: Navigasi navbar dari halaman /404
    await sendSession('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await sendSession('Page.navigate', { url: `http://127.0.0.1:${port}/404` });
    await new Promise(r => setTimeout(r, 1000));

    const linkInfoRes = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const logo = document.querySelector('.navbar__logo');
        const links = Array.from(document.querySelectorAll('.navbar__nav-desktop [data-nav-link]'));
        const all = [logo, ...links].filter(Boolean);
        return all.map((el, idx) => ({
          idx,
          href: el.getAttribute('href'),
          label: el.textContent.trim() || 'logo'
        }));
      })()`,
      returnByValue: true
    });
    const navItems = linkInfoRes?.result?.result?.value || [];

    let nav404Errors = [];
    for (const item of navItems) {
      if (!item.href || !item.href.startsWith('/#')) {
        nav404Errors.push(`Link ${item.label} href="${item.href}" tidak diawali "/#"`);
        continue;
      }

      // Pastikan berada di /404 sebelum klik
      await sendSession('Page.navigate', { url: `http://127.0.0.1:${port}/404` });
      await new Promise(r => setTimeout(r, 600));

      const coordRes = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const all = [document.querySelector('.navbar__logo'), ...Array.from(document.querySelectorAll('.navbar__nav-desktop [data-nav-link]'))].filter(Boolean);
          const el = all[${item.idx}];
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        })()`,
        returnByValue: true
      });
      const coords = coordRes?.result?.result?.value;
      if (!coords) {
        nav404Errors.push(`Gagal menemukan elemen ${item.label} di /404`);
        continue;
      }

      await sendSession('Input.dispatchMouseEvent', { type: 'mousePressed', x: coords.x, y: coords.y, button: 'left', clickCount: 1 });
      await sendSession('Input.dispatchMouseEvent', { type: 'mouseReleased', x: coords.x, y: coords.y, button: 'left', clickCount: 1 });
      await new Promise(r => setTimeout(r, 800));

      const pageState = await sendSession('Runtime.evaluate', {
        expression: `({
          url: window.location.href,
          pathname: window.location.pathname,
          hash: window.location.hash,
          hasHero: Boolean(document.querySelector('.hero'))
        })`,
        returnByValue: true
      });
      const st = pageState?.result?.result?.value || {};
      const expectedPrefix = `http://127.0.0.1:${port}/#`;
      if (!st.url?.startsWith(expectedPrefix) && !(st.pathname === '/' && Boolean(st.hash))) {
        nav404Errors.push(`URL akhir untuk ${item.label} bukan "/#": ${st.url}`);
      }
      if (!st.hasHero) {
        nav404Errors.push(`Halaman index (hero) tidak termuat setelah klik ${item.label}`);
      }
    }

    if (nav404Errors.length > 0) {
      hasFail = true;
      log('FAIL', 'nav-404', `Navigasi /404 gagal (${nav404Errors.join('; ')})`, nav404Errors.length);
    } else {
      log('PASS', 'nav-404', `Semua link navbar di /404 mengarah ke "/#" dan memuat halaman index (${navItems.length} link)`, navItems.length);
    }

  } catch (err) {
    hasFail = true;
    log('FAIL', 'dynamic-test', `Error saat pengujian dinamis: ${err.message}`, 1);
  } finally {
    if (ws) ws.close();
    if (chromeProcess?.pid) {
      try { execSync(`taskkill /PID ${chromeProcess.pid} /T /F`, { stdio: 'ignore' }); } catch (e) { chromeProcess.kill(); }
    }
    if (previewProcess?.pid) {
      try { execSync(`taskkill /PID ${previewProcess.pid} /T /F`, { stdio: 'ignore' }); } catch (e) { previewProcess.kill(); }
    }
  }

  // Write report
  fs.writeFileSync(reportPath, rows.join('\n') + '\n', 'utf8');
  console.log(`\nLaporan selesai ditulis ke ${reportPath}`);

  if (hasFail) {
    console.error('Pengujian gagal (terdapat status FAIL).');
    process.exit(1);
  } else {
    console.log('Semua pengujian lolos tanpa FAIL.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal check error:', err);
  process.exit(1);
});
