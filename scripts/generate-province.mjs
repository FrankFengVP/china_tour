import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  PROVINCE_ORDER,
  PROVINCE_CITIES,
  ALL_PROVINCE_CITY_SLUGS,
} from "./province-config.mjs";
import { PROVINCE_CITY_IMAGES } from "./province-city-images-data.mjs";
import { CITIES, PROVINCE_LABELS } from "./province-city-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LOCALES = path.join(ROOT, "locales");
const CITIES_DIR = path.join(ROOT, "cities");

const LANGS = ["zh", "en", "ja", "ko"];
const cityBySlug = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

function buildProvinceMeta() {
  const cityToProvince = {};
  for (const p of PROVINCE_ORDER) {
    for (const slug of PROVINCE_CITIES[p]) cityToProvince[slug] = p;
  }
  const heroImages = {};
  const cardImages = {};
  for (const slug of ALL_PROVINCE_CITY_SLUGS) {
    const imgs = PROVINCE_CITY_IMAGES[slug];
    heroImages[slug] = imgs.hero;
    cardImages[slug] = imgs.hero.replace(/w=1200/, "w=800");
  }
  return {
    provinceOrder: PROVINCE_ORDER,
    provinceCities: PROVINCE_CITIES,
    cityToProvince,
    heroImages,
    cardImages,
  };
}

function buildAttractionImages() {
  const out = {};
  for (const slug of ALL_PROVINCE_CITY_SLUGS) {
    out[slug] = PROVINCE_CITY_IMAGES[slug].attractions;
  }
  return out;
}

function buildFoodImages() {
  const out = {};
  for (const slug of ALL_PROVINCE_CITY_SLUGS) {
    out[slug] = PROVINCE_CITY_IMAGES[slug].foods;
  }
  return out;
}

function buildProvincesLocale(lang) {
  const labels = PROVINCE_LABELS[lang];
  const provinces = {
    sectionTitle: labels.sectionTitle,
    sectionSubtitle: labels.sectionSubtitle,
  };
  for (const p of PROVINCE_ORDER) {
    provinces[p] = { name: labels[p].name, desc: labels[p].desc };
  }
  const cities = { learnMore: lang === "zh" ? "了解更多" : lang === "en" ? "Learn More" : lang === "ja" ? "詳しく見る" : "자세히 보기" };
  for (const c of CITIES) {
    const card = c[lang];
    cities[c.slug] = {
      name: card.name,
      tagline: card.tagline,
      desc: card.desc,
      highlights: card.highlights,
    };
  }
  return { provinces, cities };
}

function buildCityDetailLocale(lang) {
  const cityDetail = {};
  for (const c of CITIES) {
    cityDetail[c.slug] = c[lang].detail;
  }
  return { cityDetail };
}

function cityHtml(slug, heroUrl) {
  const cap = slug.charAt(0).toUpperCase() + slug.slice(1);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-adsense-account" content="ca-pub-7089048762846337">
  <meta name="description" content="">
  <title>${cap} Travel Guide | Discover China</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/city.css">
  <script src="../js/analytics.js"></script>
</head>
<body data-city="${slug}" data-province-city="true">
  <header class="header" id="header">
    <nav class="nav container">
      <a href="../index.html" class="logo">
        <span class="logo-icon">中</span>
        <span class="logo-text" data-i18n="meta.title">探索中国</span>
      </a>
      <ul class="nav-links">
        <li><a href="../index.html" data-i18n="nav.home">首页</a></li>
        <li><a href="../index.html#cities" data-i18n="nav.cities">热门城市</a></li>
        <li class="nav-item nav-item--provinces">
          <button type="button" class="nav-province-root-toggle" aria-expanded="false" aria-controls="nav-provinces-panel">
            <span data-i18n="nav.provinces">热门省份</span>
            <span class="nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="nav-provinces-panel" id="nav-provinces-panel" hidden>
            <div id="nav-provinces-menu" class="nav-provinces-menu"></div>
          </div>
        </li>
        <li><a href="../index.html#tips" data-i18n="nav.tips">旅行贴士</a></li>
        <li><a href="../index.html#about" data-i18n="nav.about">关于</a></li>
      </ul>
      <div class="nav-actions">
        <div class="lang-switcher">
          <label for="lang-select" class="sr-only" data-i18n="lang.label">语言</label>
          <select id="lang-select" aria-label="Language">
            <option value="en" selected>English</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
        </div>
        <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </header>

  <main>
    <section class="city-hero">
      <div class="city-hero-bg">
        <img src="${heroUrl}" alt="${cap}">
        <div class="city-hero-overlay"></div>
      </div>
      <div class="city-hero-content">
        <a href="../index.html" class="back-link" data-i18n="cityDetail.backHome">返回首页</a>
        <p class="city-hero-tagline" data-i18n="cities.${slug}.tagline"></p>
        <h1 class="city-hero-title" data-i18n="cities.${slug}.name"></h1>
        <p class="city-hero-duration">
          <span data-i18n="cityDetail.duration">建议行程</span>：
          <strong id="city-duration"></strong>
        </p>
      </div>
    </section>

    <div class="city-content">
      <div class="container">
        <section class="city-section">
          <h2 data-i18n="cityDetail.overview">城市概览</h2>
          <p class="city-intro" data-i18n="cityDetail.${slug}.intro"></p>
        </section>

        <section class="city-section">
          <div class="info-grid">
            <div class="info-box">
              <h3 data-i18n="cityDetail.bestTime">最佳旅行时间</h3>
              <p data-i18n="cityDetail.${slug}.bestTime"></p>
            </div>
            <div class="info-box">
              <h3 data-i18n="cityDetail.transport">交通指南</h3>
              <p data-i18n="cityDetail.${slug}.transport"></p>
            </div>
          </div>
        </section>

        <section class="city-section">
          <h2 data-i18n="cityDetail.attractions">必游景点</h2>
          <div id="attractions-list" class="detail-cards"></div>
        </section>

        <section class="city-section">
          <h2 data-i18n="cityDetail.food">特色美食</h2>
          <div id="food-list" class="detail-cards"></div>
        </section>

        <section class="city-section">
          <h2 data-i18n="cityDetail.moreCities">探索更多城市</h2>
          <div id="more-cities" class="more-cities"></div>
        </section>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <p data-i18n="footer.copyright">© 2026 探索中国</p>
      <p data-i18n="footer.madeWith">用 ❤️ 为中国旅游而建</p>
    </div>
  </footer>

  <script src="../js/i18n.js" data-base="../"></script>
  <script src="../js/city.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function mergeJsonFile(filePath, mergeKey, newData) {
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (mergeKey === "attractionImages" || mergeKey === "foodImages") {
    existing[mergeKey] = { ...existing[mergeKey], ...newData };
  } else if (mergeKey === "cityDetail") {
    existing.cityDetail = { ...existing.cityDetail, ...newData.cityDetail };
  }
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + "\n", "utf8");
}

// provinces-meta.json
fs.writeFileSync(
  path.join(LOCALES, "provinces-meta.json"),
  JSON.stringify(buildProvinceMeta(), null, 2) + "\n"
);

// provinces-{lang}.json
for (const lang of LANGS) {
  fs.writeFileSync(
    path.join(LOCALES, `provinces-${lang}.json`),
    JSON.stringify(buildProvincesLocale(lang), null, 2) + "\n"
  );
  fs.writeFileSync(
    path.join(LOCALES, `city-detail-provinces-${lang}.json`),
    JSON.stringify(buildCityDetailLocale(lang), null, 2) + "\n"
  );
}

// merge images into existing
const attrNew = buildAttractionImages();
const foodNew = buildFoodImages();
mergeJsonFile(path.join(LOCALES, "attraction-images.json"), "attractionImages", attrNew);
mergeJsonFile(path.join(LOCALES, "food-images.json"), "foodImages", foodNew);

// HTML files
const meta = buildProvinceMeta();
for (const slug of ALL_PROVINCE_CITY_SLUGS) {
  const htmlPath = path.join(CITIES_DIR, `${slug}.html`);
  fs.writeFileSync(htmlPath, cityHtml(slug, meta.heroImages[slug]));
}

console.log(`Generated ${ALL_PROVINCE_CITY_SLUGS.length} city pages and locale files.`);
