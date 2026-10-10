import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn, execSync } from 'node:child_process';

const ROOT = process.cwd();

export const PALETTE = {
  tealDark: '#134e4a',
  tealPrimary: '#0f766e',
  tealMid: '#14b8a6',
  tealLight: '#99f6e4',
  tealBg: '#f0fdfa',
  amber: '#f59e0b',
  white: '#ffffff',
};

export function writeAsset(relPath, content) {
  const fullPath = path.resolve(ROOT, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  return fullPath;
}

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

function generateAvatarSvg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1050" viewBox="0 0 840 1050" fill="none">
  <rect width="840" height="1050" fill="${tealLight}"/>
  <!-- Bentuk dekoratif 1: lingkaran besar di kanan atas -->
  <circle cx="680" cy="210" r="180" fill="${tealBg}" opacity="0.65"/>
  <!-- Bentuk dekoratif 2: gelombang/kapsul miring di kiri bawah -->
  <rect x="-60" y="680" width="380" height="180" rx="90" transform="rotate(-18 -60 680)" fill="${tealMid}" opacity="0.35"/>
  <circle cx="170" cy="240" r="28" fill="${amber}"/>
  <!-- Lingkaran halo belakang siluet -->
  <circle cx="420" cy="430" r="220" fill="${tealBg}"/>
  <!-- Siluet abstrak orang: bahu dan badan -->
  <path d="M160 1050C160 835 268 700 420 700C572 700 680 835 680 1050H160Z" fill="${tealPrimary}"/>
  <!-- Detail kerah / aksen bahu -->
  <path d="M335 712C362 748 390 766 420 766C450 766 478 748 505 712L465 1050H375L335 712Z" fill="${tealDark}"/>
  <!-- Siluet abstrak orang: leher dan kepala bulat -->
  <rect x="384" y="555" width="72" height="110" rx="36" fill="${tealDark}"/>
  <circle cx="420" cy="420" r="145" fill="${tealPrimary}"/>
  <!-- Aksen hijab/rambut abstrak minimalis tanpa fitur wajah -->
  <path d="M275 420C275 339.919 339.919 275 420 275C500.081 275 565 339.919 565 420C565 448 556 474 542 496C516 432 472 395 420 395C368 395 324 432 298 496C284 474 275 448 275 420Z" fill="${tealDark}"/>
  <circle cx="525" cy="785" r="14" fill="${white}" opacity="0.85"/>
</svg>
`;
}

// proj-1 (web): Landing Page Kedai Kopi Senja
function generateProj1Svg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" fill="none">
  <rect width="1280" height="800" fill="${tealBg}"/>
  <circle cx="1160" cy="120" r="160" fill="${tealLight}" opacity="0.45"/>
  <circle cx="120" cy="700" r="140" fill="${tealLight}" opacity="0.35"/>
  <!-- Browser Window -->
  <rect x="110" y="70" width="1060" height="660" rx="20" fill="${white}" stroke="${tealPrimary}" stroke-width="4"/>
  <path d="M110 90C110 78.9543 118.954 70 130 70H1150C1161.05 70 1170 78.9543 1170 90V126H110V90Z" fill="${tealDark}"/>
  <circle cx="146" cy="98" r="9" fill="${amber}"/>
  <circle cx="174" cy="98" r="9" fill="${tealMid}"/>
  <circle cx="202" cy="98" r="9" fill="${tealLight}"/>
  <rect x="250" y="86" width="520" height="24" rx="12" fill="${tealPrimary}"/>
  <!-- Hero Section inside browser -->
  <rect x="150" y="156" width="980" height="220" rx="14" fill="${tealLight}"/>
  <rect x="190" y="192" width="360" height="28" rx="8" fill="${tealDark}"/>
  <rect x="190" y="234" width="440" height="16" rx="6" fill="${tealPrimary}"/>
  <rect x="190" y="260" width="380" height="16" rx="6" fill="${tealPrimary}"/>
  <rect x="190" y="302" width="150" height="42" rx="10" fill="${amber}"/>
  <!-- Cup illustration in hero -->
  <circle cx="950" cy="266" r="78" fill="${tealBg}"/>
  <path d="M905 240H985V278C985 300.091 967.091 318 945 318C922.909 318 905 300.091 905 278V240Z" fill="${tealPrimary}"/>
  <path d="M985 250H998C1006.84 250 1014 257.163 1014 266C1014 274.837 1006.84 282 998 282H985V250Z" stroke="${tealDark}" stroke-width="8"/>
  <rect x="895" y="322" width="100" height="10" rx="5" fill="${tealDark}"/>
  <!-- 3 Menu Cards + Map Widget -->
  <rect x="150" y="404" width="220" height="286" rx="12" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="170" y="424" width="180" height="110" rx="8" fill="${tealMid}"/>
  <rect x="170" y="554" width="140" height="18" rx="5" fill="${tealDark}"/>
  <rect x="170" y="582" width="180" height="12" rx="4" fill="${tealPrimary}"/>
  <rect x="170" y="638" width="90" height="28" rx="6" fill="${amber}"/>

  <rect x="395" y="404" width="220" height="286" rx="12" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="415" y="424" width="180" height="110" rx="8" fill="${tealPrimary}"/>
  <rect x="415" y="554" width="150" height="18" rx="5" fill="${tealDark}"/>
  <rect x="415" y="582" width="170" height="12" rx="4" fill="${tealMid}"/>
  <rect x="415" y="638" width="90" height="28" rx="6" fill="${amber}"/>

  <rect x="640" y="404" width="220" height="286" rx="12" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="660" y="424" width="180" height="110" rx="8" fill="${tealMid}"/>
  <rect x="660" y="554" width="130" height="18" rx="5" fill="${tealDark}"/>
  <rect x="660" y="582" width="175" height="12" rx="4" fill="${tealPrimary}"/>
  <rect x="660" y="638" width="90" height="28" rx="6" fill="${amber}"/>

  <!-- Map Location Card -->
  <rect x="885" y="404" width="245" height="286" rx="12" fill="${tealLight}"/>
  <path d="M885 490L1130 560M960 404L1030 690" stroke="${white}" stroke-width="10"/>
  <circle cx="1010" cy="525" r="28" fill="${amber}"/>
  <circle cx="1010" cy="525" r="10" fill="${white}"/>
</svg>
`;
}

// proj-2 (web): Katalog Online Toko Batik Laras
function generateProj2Svg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" fill="none">
  <rect width="1280" height="800" fill="${tealBg}"/>
  <rect x="60" y="60" width="1160" height="680" rx="20" fill="${white}" stroke="${tealPrimary}" stroke-width="4"/>
  <!-- Top Browser Bar -->
  <path d="M60 80C60 68.9543 68.9543 60 80 60H1200C1211.05 60 1220 68.9543 1220 80V116H60V80Z" fill="${tealPrimary}"/>
  <circle cx="96" cy="88" r="8" fill="${amber}"/>
  <circle cx="122" cy="88" r="8" fill="${tealLight}"/>
  <circle cx="148" cy="88" r="8" fill="${white}"/>
  <rect x="380" y="76" width="520" height="24" rx="12" fill="${tealDark}"/>
  <!-- Header & Filter Pills -->
  <rect x="110" y="146" width="280" height="26" rx="8" fill="${tealDark}"/>
  <rect x="680" y="144" width="110" height="32" rx="16" fill="${tealPrimary}"/>
  <rect x="804" y="144" width="110" height="32" rx="16" fill="${tealLight}"/>
  <rect x="928" y="144" width="110" height="32" rx="16" fill="${tealLight}"/>
  <rect x="1052" y="144" width="118" height="32" rx="16" fill="${tealLight}"/>
  <!-- 6 Product Cards (2 rows x 3 cols) -->
  <g>
    <rect x="110" y="202" width="330" height="240" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
    <rect x="130" y="220" width="290" height="125" rx="10" fill="${tealLight}"/>
    <circle cx="220" cy="282" r="34" fill="${tealPrimary}" opacity="0.4"/>
    <circle cx="275" cy="282" r="34" fill="${tealMid}" opacity="0.5"/>
    <circle cx="330" cy="282" r="34" fill="${amber}" opacity="0.45"/>
    <rect x="130" y="362" width="180" height="16" rx="5" fill="${tealDark}"/>
    <rect x="130" y="392" width="110" height="28" rx="8" fill="${tealPrimary}"/>
    <rect x="330" y="392" width="90" height="28" rx="8" fill="${tealMid}"/>
  </g>
  <g>
    <rect x="475" y="202" width="330" height="240" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
    <rect x="495" y="220" width="290" height="125" rx="10" fill="${tealPrimary}"/>
    <path d="M530 245L585 320L640 245L695 320L750 245" stroke="${tealLight}" stroke-width="8" stroke-linecap="round"/>
    <rect x="495" y="362" width="200" height="16" rx="5" fill="${tealDark}"/>
    <rect x="495" y="392" width="110" height="28" rx="8" fill="${tealPrimary}"/>
    <rect x="695" y="392" width="90" height="28" rx="8" fill="${amber}"/>
  </g>
  <g>
    <rect x="840" y="202" width="330" height="240" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
    <rect x="860" y="220" width="290" height="125" rx="10" fill="${tealMid}"/>
    <rect x="935" y="242" width="140" height="80" rx="12" fill="${tealBg}" opacity="0.55"/>
    <rect x="860" y="362" width="160" height="16" rx="5" fill="${tealDark}"/>
    <rect x="860" y="392" width="110" height="28" rx="8" fill="${tealPrimary}"/>
    <rect x="1060" y="392" width="90" height="28" rx="8" fill="${tealMid}"/>
  </g>
  <g>
    <rect x="110" y="466" width="330" height="240" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
    <rect x="130" y="484" width="290" height="125" rx="10" fill="${tealDark}"/>
    <circle cx="275" cy="546" r="42" stroke="${amber}" stroke-width="8"/>
    <rect x="130" y="626" width="190" height="16" rx="5" fill="${tealDark}"/>
    <rect x="130" y="656" width="110" height="28" rx="8" fill="${tealPrimary}"/>
    <rect x="330" y="656" width="90" height="28" rx="8" fill="${tealMid}"/>
  </g>
  <g>
    <rect x="475" y="466" width="330" height="240" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
    <rect x="495" y="484" width="290" height="125" rx="10" fill="${tealLight}"/>
    <path d="M520 580Q640 490 760 580" stroke="${tealPrimary}" stroke-width="10" fill="none"/>
    <rect x="495" y="626" width="175" height="16" rx="5" fill="${tealDark}"/>
    <rect x="495" y="656" width="110" height="28" rx="8" fill="${tealPrimary}"/>
    <rect x="695" y="656" width="90" height="28" rx="8" fill="${tealMid}"/>
  </g>
  <g>
    <rect x="840" y="466" width="330" height="240" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
    <rect x="860" y="484" width="290" height="125" rx="10" fill="${tealPrimary}"/>
    <circle cx="1005" cy="546" r="36" fill="${tealLight}"/>
    <rect x="860" y="626" width="205" height="16" rx="5" fill="${tealDark}"/>
    <rect x="860" y="656" width="110" height="28" rx="8" fill="${tealPrimary}"/>
    <rect x="1060" y="656" width="90" height="28" rx="8" fill="${amber}"/>
  </g>
</svg>
`;
}

// proj-3 (web): Dashboard Tugas Kuliah
function generateProj3Svg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" fill="none">
  <rect width="1280" height="800" fill="${tealBg}"/>
  <!-- Browser Frame -->
  <rect x="80" y="60" width="1120" height="680" rx="20" fill="${white}" stroke="${tealDark}" stroke-width="4"/>
  <path d="M80 80C80 68.9543 88.9543 60 100 60H1180C1191.05 60 1200 68.9543 1200 80V114H80V80Z" fill="${tealDark}"/>
  <circle cx="116" cy="87" r="8" fill="${amber}"/>
  <circle cx="142" cy="87" r="8" fill="${tealMid}"/>
  <circle cx="168" cy="87" r="8" fill="${tealLight}"/>
  <!-- Sidebar -->
  <path d="M82 114H280V738H100C89.5 738 82 730 82 720V114Z" fill="${tealPrimary}"/>
  <rect x="112" y="150" width="136" height="24" rx="8" fill="${tealLight}"/>
  <rect x="112" y="206" width="116" height="16" rx="6" fill="${tealBg}" opacity="0.85"/>
  <rect x="112" y="242" width="128" height="16" rx="6" fill="${tealBg}" opacity="0.55"/>
  <rect x="112" y="278" width="104" height="16" rx="6" fill="${tealBg}" opacity="0.55"/>
  <rect x="112" y="314" width="120" height="16" rx="6" fill="${tealBg}" opacity="0.55"/>
  <!-- Top Metric Cards -->
  <rect x="320" y="148" width="260" height="120" rx="14" fill="${tealLight}"/>
  <rect x="348" y="174" width="90" height="36" rx="8" fill="${tealDark}"/>
  <rect x="348" y="226" width="160" height="14" rx="5" fill="${tealPrimary}"/>

  <rect x="605" y="148" width="260" height="120" rx="14" fill="${tealBg}" stroke="${tealMid}" stroke-width="3"/>
  <rect x="633" y="174" width="110" height="36" rx="8" fill="${tealPrimary}"/>
  <rect x="633" y="226" width="170" height="14" rx="5" fill="${tealDark}"/>

  <rect x="890" y="148" width="270" height="120" rx="14" fill="${tealBg}" stroke="${amber}" stroke-width="3"/>
  <rect x="918" y="174" width="80" height="36" rx="8" fill="${amber}"/>
  <rect x="918" y="226" width="180" height="14" rx="5" fill="${tealDark}"/>

  <!-- Task List Panel (Left) -->
  <rect x="320" y="298" width="490" height="404" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="350" y="328" width="200" height="22" rx="6" fill="${tealDark}"/>
  <!-- Task rows -->
  <rect x="350" y="374" width="430" height="62" rx="10" fill="${white}"/>
  <circle cx="384" cy="405" r="14" fill="${tealMid}"/>
  <rect x="414" y="392" width="220" height="14" rx="5" fill="${tealDark}"/>
  <rect x="414" y="414" width="130" height="10" rx="4" fill="${tealPrimary}"/>
  <rect x="690" y="393" width="68" height="24" rx="12" fill="${tealLight}"/>

  <rect x="350" y="452" width="430" height="62" rx="10" fill="${white}"/>
  <circle cx="384" cy="483" r="14" fill="${tealMid}"/>
  <rect x="414" y="470" width="250" height="14" rx="5" fill="${tealDark}"/>
  <rect x="414" y="492" width="150" height="10" rx="4" fill="${tealPrimary}"/>
  <rect x="690" y="471" width="68" height="24" rx="12" fill="${amber}"/>

  <rect x="350" y="530" width="430" height="62" rx="10" fill="${white}"/>
  <circle cx="384" cy="561" r="14" stroke="${tealPrimary}" stroke-width="4"/>
  <rect x="414" y="548" width="190" height="14" rx="5" fill="${tealDark}"/>
  <rect x="414" y="570" width="120" height="10" rx="4" fill="${tealPrimary}"/>
  <rect x="690" y="549" width="68" height="24" rx="12" fill="${tealLight}"/>

  <rect x="350" y="608" width="430" height="62" rx="10" fill="${white}"/>
  <circle cx="384" cy="639" r="14" stroke="${tealPrimary}" stroke-width="4"/>
  <rect x="414" y="626" width="210" height="14" rx="5" fill="${tealDark}"/>
  <rect x="414" y="648" width="140" height="10" rx="4" fill="${tealPrimary}"/>
  <rect x="690" y="627" width="68" height="24" rx="12" fill="${tealMid}"/>

  <!-- Progress Bar Chart Panel (Right) -->
  <rect x="835" y="298" width="325" height="404" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="865" y="328" width="170" height="22" rx="6" fill="${tealDark}"/>
  <!-- Vertical Bars -->
  <rect x="880" y="520" width="36" height="140" rx="8" fill="${tealMid}"/>
  <rect x="938" y="440" width="36" height="220" rx="8" fill="${tealPrimary}"/>
  <rect x="996" y="480" width="36" height="180" rx="8" fill="${tealMid}"/>
  <rect x="1054" y="390" width="36" height="270" rx="8" fill="${amber}"/>
  <line x1="865" y1="660" x2="1125" y2="660" stroke="${tealDark}" stroke-width="4" stroke-linecap="round"/>
</svg>
`;
}

// proj-4 (ui): Prototipe Aplikasi Kos-Kosan
function generateProj4Svg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" fill="none">
  <rect width="1280" height="800" fill="${tealBg}"/>
  <rect x="90" y="240" width="1100" height="320" rx="40" fill="${tealLight}" opacity="0.4"/>
  <path d="M410 400H490" stroke="${amber}" stroke-width="6" stroke-dasharray="10 10" stroke-linecap="round"/>
  <path d="M790 400H870" stroke="${amber}" stroke-width="6" stroke-dasharray="10 10" stroke-linecap="round"/>

  <!-- Phone 1: Search & Listing -->
  <rect x="130" y="90" width="280" height="620" rx="36" fill="${white}" stroke="${tealDark}" stroke-width="8"/>
  <rect x="225" y="112" width="90" height="12" rx="6" fill="${tealDark}"/>
  <rect x="158" y="148" width="224" height="36" rx="18" fill="${tealBg}" stroke="${tealMid}" stroke-width="2"/>
  <rect x="158" y="204" width="224" height="150" rx="14" fill="${tealLight}"/>
  <rect x="174" y="314" width="120" height="22" rx="6" fill="${tealDark}"/>
  <rect x="158" y="372" width="224" height="150" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="174" y="388" width="192" height="80" rx="8" fill="${tealMid}"/>
  <rect x="174" y="482" width="140" height="18" rx="5" fill="${tealDark}"/>
  <rect x="158" y="544" width="224" height="120" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>

  <!-- Phone 2: Room Detail & Booking -->
  <rect x="500" y="65" width="280" height="650" rx="36" fill="${white}" stroke="${tealPrimary}" stroke-width="8"/>
  <rect x="595" y="87" width="90" height="12" rx="6" fill="${tealDark}"/>
  <rect x="528" y="122" width="224" height="190" rx="16" fill="${tealPrimary}"/>
  <circle cx="640" cy="217" r="46" fill="${tealLight}" opacity="0.5"/>
  <rect x="528" y="334" width="160" height="24" rx="6" fill="${tealDark}"/>
  <rect x="528" y="370" width="200" height="14" rx="5" fill="${tealMid}"/>
  <rect x="528" y="406" width="66" height="48" rx="10" fill="${tealBg}" stroke="${tealLight}" stroke-width="2"/>
  <rect x="607" y="406" width="66" height="48" rx="10" fill="${tealBg}" stroke="${tealLight}" stroke-width="2"/>
  <rect x="686" y="406" width="66" height="48" rx="10" fill="${tealBg}" stroke="${tealLight}" stroke-width="2"/>
  <rect x="528" y="476" width="224" height="110" rx="12" fill="${tealBg}"/>
  <rect x="528" y="614" width="224" height="54" rx="14" fill="${amber}"/>

  <!-- Phone 3: Payment Success -->
  <rect x="870" y="90" width="280" height="620" rx="36" fill="${white}" stroke="${tealDark}" stroke-width="8"/>
  <rect x="965" y="112" width="90" height="12" rx="6" fill="${tealDark}"/>
  <circle cx="1010" cy="260" r="68" fill="${tealLight}"/>
  <path d="M982 260L1002 280L1042 240" stroke="${tealDark}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="920" y="356" width="180" height="22" rx="6" fill="${tealDark}"/>
  <rect x="940" y="392" width="140" height="14" rx="5" fill="${tealPrimary}"/>
  <rect x="900" y="436" width="220" height="150" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="922" y="462" width="176" height="14" rx="4" fill="${tealPrimary}"/>
  <rect x="922" y="494" width="140" height="14" rx="4" fill="${tealMid}"/>
  <rect x="922" y="526" width="160" height="14" rx="4" fill="${tealDark}"/>
  <rect x="900" y="614" width="220" height="48" rx="12" fill="${tealPrimary}"/>
</svg>
`;
}

// proj-5 (ui): Redesain Aplikasi Perpustakaan Kampus
function generateProj5Svg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" fill="none">
  <rect width="1280" height="800" fill="${tealBg}"/>
  <circle cx="920" cy="400" r="310" fill="${tealLight}" opacity="0.45"/>

  <!-- Left Phone (Before) -->
  <rect x="200" y="90" width="300" height="620" rx="36" fill="${white}" stroke="${tealDark}" stroke-width="6" opacity="0.85"/>
  <rect x="305" y="114" width="90" height="10" rx="5" fill="${tealDark}" opacity="0.5"/>
  <rect x="226" y="148" width="248" height="44" rx="6" fill="${tealLight}"/>
  <rect x="226" y="204" width="118" height="72" rx="6" fill="${tealBg}" stroke="${tealPrimary}" stroke-width="2"/>
  <rect x="356" y="204" width="118" height="72" rx="6" fill="${tealBg}" stroke="${tealPrimary}" stroke-width="2"/>
  <rect x="226" y="288" width="248" height="48" rx="6" fill="${tealLight}" opacity="0.6"/>
  <rect x="226" y="348" width="248" height="48" rx="6" fill="${tealLight}" opacity="0.6"/>
  <rect x="226" y="408" width="248" height="48" rx="6" fill="${tealLight}" opacity="0.6"/>
  <rect x="226" y="468" width="248" height="48" rx="6" fill="${tealLight}" opacity="0.6"/>
  <rect x="226" y="528" width="248" height="48" rx="6" fill="${tealLight}" opacity="0.6"/>
  <rect x="226" y="596" width="248" height="76" rx="8" fill="${tealPrimary}" opacity="0.5"/>

  <!-- Transformation Arrow -->
  <circle cx="640" cy="400" r="48" fill="${amber}"/>
  <path d="M618 400H662M646 382L664 400L646 418" stroke="${white}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Right Phone (After) -->
  <rect x="780" y="90" width="300" height="620" rx="36" fill="${white}" stroke="${tealPrimary}" stroke-width="8"/>
  <rect x="885" y="114" width="90" height="12" rx="6" fill="${tealDark}"/>
  <rect x="810" y="150" width="240" height="42" rx="21" fill="${tealBg}" stroke="${tealMid}" stroke-width="3"/>
  <rect x="810" y="214" width="240" height="190" rx="18" fill="${tealPrimary}"/>
  <rect x="834" y="238" width="76" height="106" rx="10" fill="${tealLight}"/>
  <rect x="928" y="246" width="98" height="18" rx="6" fill="${white}"/>
  <rect x="928" y="276" width="78" height="14" rx="5" fill="${tealLight}"/>
  <rect x="928" y="316" width="98" height="28" rx="8" fill="${amber}"/>
  <rect x="810" y="428" width="112" height="120" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <circle cx="866" cy="472" r="22" fill="${tealMid}"/>
  <rect x="832" y="510" width="68" height="14" rx="4" fill="${tealDark}"/>

  <rect x="938" y="428" width="112" height="120" rx="14" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <circle cx="994" cy="472" r="22" fill="${tealPrimary}"/>
  <rect x="960" y="510" width="68" height="14" rx="4" fill="${tealDark}"/>

  <rect x="810" y="580" width="240" height="58" rx="16" fill="${tealDark}"/>
  <circle cx="930" cy="666" r="6" fill="${tealMid}"/>
</svg>
`;
}

// proj-6 (doc): Riset Pengguna Aplikasi Belajar
function generateProj6Svg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" fill="none">
  <rect width="1280" height="800" fill="${tealBg}"/>
  <rect x="110" y="80" width="1060" height="640" rx="24" fill="${tealLight}" opacity="0.4"/>

  <!-- Left Sheet -->
  <rect x="160" y="110" width="460" height="580" rx="16" fill="${white}" stroke="${tealPrimary}" stroke-width="4"/>
  <rect x="200" y="154" width="240" height="26" rx="8" fill="${tealDark}"/>
  <rect x="200" y="194" width="320" height="14" rx="5" fill="${tealMid}"/>
  <rect x="200" y="236" width="380" height="110" rx="12" fill="${tealBg}" stroke="${tealLight}" stroke-width="2"/>
  <circle cx="250" cy="291" r="30" fill="${tealPrimary}"/>
  <rect x="298" y="264" width="180" height="16" rx="5" fill="${tealDark}"/>
  <rect x="298" y="292" width="240" height="12" rx="4" fill="${tealPrimary}"/>
  <rect x="298" y="314" width="190" height="12" rx="4" fill="${tealMid}"/>

  <rect x="200" y="366" width="380" height="110" rx="12" fill="${tealBg}" stroke="${tealLight}" stroke-width="2"/>
  <circle cx="250" cy="421" r="30" fill="${tealMid}"/>
  <rect x="298" y="394" width="200" height="16" rx="5" fill="${tealDark}"/>
  <rect x="298" y="422" width="230" height="12" rx="4" fill="${tealPrimary}"/>
  <rect x="298" y="444" width="160" height="12" rx="4" fill="${tealMid}"/>

  <rect x="200" y="496" width="380" height="140" rx="12" fill="${tealLight}" opacity="0.45"/>
  <rect x="228" y="524" width="150" height="18" rx="5" fill="${tealDark}"/>
  <rect x="228" y="556" width="320" height="12" rx="4" fill="${tealPrimary}"/>
  <rect x="228" y="580" width="290" height="12" rx="4" fill="${tealPrimary}"/>
  <rect x="228" y="604" width="210" height="12" rx="4" fill="${amber}"/>

  <!-- Right Sheet -->
  <rect x="660" y="110" width="460" height="580" rx="16" fill="${white}" stroke="${tealPrimary}" stroke-width="4"/>
  <rect x="700" y="154" width="220" height="26" rx="8" fill="${tealDark}"/>
  <circle cx="805" cy="305" r="76" stroke="${tealLight}" stroke-width="28"/>
  <path d="M805 229A76 76 0 1 1 734 332" stroke="${tealPrimary}" stroke-width="28" stroke-linecap="round"/>
  <path d="M805 229A76 76 0 0 1 881 305" stroke="${amber}" stroke-width="28" stroke-linecap="round"/>
  <rect x="925" y="255" width="22" height="22" rx="6" fill="${tealPrimary}"/>
  <rect x="960" y="260" width="110" height="12" rx="4" fill="${tealDark}"/>
  <rect x="925" y="295" width="22" height="22" rx="6" fill="${amber}"/>
  <rect x="960" y="300" width="95" height="12" rx="4" fill="${tealDark}"/>
  <rect x="925" y="335" width="22" height="22" rx="6" fill="${tealLight}"/>
  <rect x="960" y="340" width="105" height="12" rx="4" fill="${tealDark}"/>

  <rect x="700" y="428" width="380" height="220" rx="14" fill="${tealBg}"/>
  <rect x="730" y="460" width="280" height="24" rx="8" fill="${tealPrimary}"/>
  <rect x="730" y="502" width="220" height="24" rx="8" fill="${tealMid}"/>
  <rect x="730" y="544" width="310" height="24" rx="8" fill="${tealDark}"/>
  <rect x="730" y="586" width="175" height="24" rx="8" fill="${amber}"/>
</svg>
`;
}

// proj-7 (doc): Dokumentasi API Sistem Absensi
function generateProj7Svg() {
  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" fill="none">
  <rect width="1280" height="800" fill="${tealBg}"/>
  <rect x="90" y="65" width="1100" height="670" rx="20" fill="${white}" stroke="${tealPrimary}" stroke-width="4"/>
  <!-- Left Docs Sidebar -->
  <path d="M92 85C92 74 100 67 110 67H350V733H110C100 733 92 725 92 715V85Z" fill="${tealBg}"/>
  <line x1="350" y1="67" x2="350" y2="733" stroke="${tealLight}" stroke-width="3"/>
  <rect x="124" y="114" width="160" height="24" rx="6" fill="${tealDark}"/>
  <rect x="124" y="168" width="190" height="14" rx="5" fill="${tealPrimary}"/>
  <rect x="124" y="200" width="170" height="14" rx="5" fill="${tealMid}"/>
  <rect x="124" y="232" width="180" height="14" rx="5" fill="${tealMid}"/>
  <rect x="124" y="264" width="150" height="14" rx="5" fill="${tealMid}"/>
  <rect x="124" y="316" width="160" height="20" rx="6" fill="${tealDark}"/>
  <rect x="124" y="356" width="185" height="14" rx="5" fill="${tealMid}"/>
  <rect x="124" y="388" width="165" height="14" rx="5" fill="${tealMid}"/>

  <!-- Main Documentation Sheet -->
  <rect x="396" y="110" width="320" height="30" rx="8" fill="${tealDark}"/>
  <rect x="396" y="164" width="740" height="58" rx="12" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="416" y="178" width="84" height="30" rx="8" fill="${tealPrimary}"/>
  <rect x="520" y="185" width="280" height="16" rx="5" fill="${tealDark}"/>
  <rect x="396" y="240" width="740" height="58" rx="12" fill="${tealBg}" stroke="${tealLight}" stroke-width="3"/>
  <rect x="416" y="254" width="84" height="30" rx="8" fill="${amber}"/>
  <rect x="520" y="261" width="320" height="16" rx="5" fill="${tealDark}"/>

  <rect x="396" y="326" width="220" height="18" rx="5" fill="${tealDark}"/>
  <rect x="396" y="358" width="680" height="12" rx="4" fill="${tealPrimary}"/>
  <rect x="396" y="382" width="620" height="12" rx="4" fill="${tealMid}"/>

  <!-- Code Block Container -->
  <rect x="396" y="422" width="740" height="268" rx="16" fill="${tealDark}"/>
  <circle cx="430" cy="454" r="7" fill="${amber}"/>
  <circle cx="452" cy="454" r="7" fill="${tealMid}"/>
  <circle cx="474" cy="454" r="7" fill="${tealLight}"/>
  <rect x="430" y="490" width="140" height="14" rx="4" fill="${tealLight}"/>
  <rect x="460" y="518" width="240" height="14" rx="4" fill="${tealMid}"/>
  <rect x="490" y="546" width="320" height="14" rx="4" fill="${white}" opacity="0.85"/>
  <rect x="490" y="574" width="280" height="14" rx="4" fill="${amber}"/>
  <rect x="460" y="602" width="200" height="14" rx="4" fill="${tealMid}"/>
  <rect x="430" y="630" width="110" height="14" rx="4" fill="${tealLight}"/>
</svg>
`;
}

// 2.3: favicon.svg (32x32 persegi membulat #0f766e dengan huruf N putih dari path)
function generateFaviconSvg() {
  const { tealPrimary, white } = PALETTE;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="7" fill="${tealPrimary}"/>
  <path d="M8 24V8H12.2L19.8 18.2V8H24V24H19.8L12.2 13.8V24H8Z" fill="${white}"/>
</svg>
`;
}

// 2.3: robots.txt
function generateRobotsTxt() {
  return `User-agent: *\nDisallow: /\n`;
}

// 2.4: og.png (1200x630 via Chrome headless)
async function generateOgPng() {
  const chromePath = getChromePath();
  if (!chromePath) {
    throw new Error('Chrome binary tidak ditemukan untuk membuat og.png');
  }

  const font400Url = pathToFileURL(
    path.resolve(ROOT, 'node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff2')
  ).href;
  const font600Url = pathToFileURL(
    path.resolve(ROOT, 'node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2')
  ).href;
  const font700Url = pathToFileURL(
    path.resolve(ROOT, 'node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2')
  ).href;

  const { tealDark, tealPrimary, tealMid, tealLight, tealBg, amber, white } = PALETTE;

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: url('${font400Url}') format('woff2');
  }
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    src: url('${font600Url}') format('woff2');
  }
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    src: url('${font700Url}') format('woff2');
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: ${tealBg};
    font-family: 'Poppins', sans-serif;
    color: ${tealDark};
  }
  .canvas {
    position: relative;
    width: 1200px;
    height: 630px;
    padding: 72px 84px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${tealBg};
  }
  .deco-circle {
    position: absolute;
    right: -80px;
    top: -80px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: ${tealLight};
    opacity: 0.55;
  }
  .deco-pill {
    position: absolute;
    right: 90px;
    bottom: 68px;
    width: 220px;
    height: 220px;
    border-radius: 36px;
    background: ${white};
    border: 4px solid ${tealPrimary};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    background: ${white};
    border: 2px solid ${tealMid};
    color: ${tealPrimary};
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.02em;
    z-index: 1;
  }
  .badge-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${amber};
  }
  .main {
    z-index: 1;
    max-width: 760px;
  }
  .title {
    font-size: 72px;
    font-weight: 700;
    line-height: 1.12;
    color: ${tealDark};
    margin-bottom: 20px;
  }
  .title span {
    color: ${tealPrimary};
  }
  .subtitle {
    font-size: 34px;
    font-weight: 600;
    color: ${tealPrimary};
  }
  .bottom-bar {
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .accent-line {
    width: 84px;
    height: 8px;
    border-radius: 4px;
    background: ${tealPrimary};
  }
  .amber-line {
    width: 28px;
    height: 8px;
    border-radius: 4px;
    background: ${amber};
  }
</style>
</head>
<body>
  <div class="canvas">
    <div class="deco-circle"></div>
    <div class="badge">
      <span class="badge-dot"></span>
      <span>Demo template Flux</span>
    </div>
    <div class="main">
      <h1 class="title">Nadia <span>Ramadhani</span></h1>
      <p class="subtitle">Web Developer &amp; UI Designer</p>
    </div>
    <div class="bottom-bar">
      <div class="accent-line"></div>
      <div class="amber-line"></div>
    </div>
    <div class="deco-pill">
      <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="${tealPrimary}"/>
        <path d="M8 24V8H12.2L19.8 18.2V8H24V24H19.8L12.2 13.8V24H8Z" fill="${white}"/>
      </svg>
    </div>
  </div>
</body>
</html>`;

  const tmpDir = path.resolve(ROOT, '_brief');
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmpHtmlPath = path.join(tmpDir, 'tmp-og.html');
  const outPngPath = path.resolve(ROOT, 'public/images/og.png');
  fs.mkdirSync(path.dirname(outPngPath), { recursive: true });
  fs.writeFileSync(tmpHtmlPath, html, 'utf8');

  const fileUrl = pathToFileURL(tmpHtmlPath).href;

  await new Promise((resolve, reject) => {
    const child = spawn(
      chromePath,
      [
        '--headless=new',
        `--screenshot=${outPngPath}`,
        '--window-size=1200,630',
        '--force-device-scale-factor=1',
        '--hide-scrollbars',
        '--no-sandbox',
        '--disable-gpu',
        fileUrl,
      ],
      { stdio: 'ignore', shell: false }
    );

    const timer = setTimeout(() => {
      if (child.pid) {
        try {
          execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: 'ignore' });
        } catch (e) {
          child.kill();
        }
      }
      reject(new Error('Timeout 30 detik saat membuat og.png'));
    }, 30000);

    child.on('exit', code => {
      clearTimeout(timer);
      if (code === 0 && fs.existsSync(outPngPath)) {
        resolve();
      } else {
        reject(new Error(`Chrome keluar dengan kode ${code}`));
      }
    });

    child.on('error', err => {
      clearTimeout(timer);
      reject(err);
    });
  });

  if (fs.existsSync(tmpHtmlPath)) {
    fs.unlinkSync(tmpHtmlPath);
  }
}

async function verifyDataAssetPaths() {
  const { site } = await import('../src/data/site.js');
  const { profile } = await import('../src/data/profile.js');
  const { projects } = await import('../src/data/projects.js');

  const items = [
    { source: 'profile.photo', urlPath: profile.photo },
    ...projects.map((p, i) => ({ source: `projects[${i}].image (${p.id})`, urlPath: p.image })),
    { source: 'site.ogImage', urlPath: site.ogImage },
  ];

  let okCount = 0;
  for (const item of items) {
    const rel = path.join('public', item.urlPath.replace(/^\//, ''));
    const full = path.resolve(ROOT, rel);
    const exists = fs.existsSync(full);
    const size = exists ? fs.statSync(full).size : 0;
    if (exists && size > 0) okCount++;
    process.stdout.write(
      `[PATH-CHECK] ${item.source} -> ${item.urlPath} -> ${exists ? `OK (${size} bytes)` : 'MISSING'}\n`
    );
  }
  process.stdout.write(`[PATH-CHECK] Total cocok: ${okCount}/${items.length}\n`);
  if (okCount !== items.length) {
    process.exitCode = 1;
  }
}

function scanSvgFiles() {
  const svgPaths = [
    'public/favicon.svg',
    'public/images/avatar.svg',
    'public/images/proj-1.svg',
    'public/images/proj-2.svg',
    'public/images/proj-3.svg',
    'public/images/proj-4.svg',
    'public/images/proj-5.svg',
    'public/images/proj-6.svg',
    'public/images/proj-7.svg',
  ];

  let textCount = 0;
  let imageCount = 0;
  let scriptCount = 0;

  for (const rel of svgPaths) {
    const content = fs.readFileSync(path.resolve(ROOT, rel), 'utf8');
    const t = (content.match(/<text[\s>]/gi) || []).length;
    const im = (content.match(/<image[\s>]/gi) || []).length;
    const sc = (content.match(/<script[\s>]/gi) || []).length;
    textCount += t;
    imageCount += im;
    scriptCount += sc;
    process.stdout.write(
      `[SVG-SCAN] ${rel}: <text>=${t}, <image>=${im}, <script>=${sc}\n`
    );
  }
  process.stdout.write(
    `[SVG-SCAN] Total (${svgPaths.length} berkas): <text>=${textCount} | <image>=${imageCount} | <script>=${scriptCount}\n`
  );
  if (textCount > 0 || imageCount > 0 || scriptCount > 0) {
    process.exitCode = 1;
  }
}

async function main() {
  writeAsset('public/images/avatar.svg', generateAvatarSvg());
  writeAsset('public/images/proj-1.svg', generateProj1Svg());
  writeAsset('public/images/proj-2.svg', generateProj2Svg());
  writeAsset('public/images/proj-3.svg', generateProj3Svg());
  writeAsset('public/images/proj-4.svg', generateProj4Svg());
  writeAsset('public/images/proj-5.svg', generateProj5Svg());
  writeAsset('public/images/proj-6.svg', generateProj6Svg());
  writeAsset('public/images/proj-7.svg', generateProj7Svg());
  writeAsset('public/favicon.svg', generateFaviconSvg());
  writeAsset('public/robots.txt', generateRobotsTxt());
  await generateOgPng();
  await verifyDataAssetPaths();
  scanSvgFiles();
}

main();

