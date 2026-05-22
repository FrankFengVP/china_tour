/**
 * Lightweight i18n for static site
 */
const I18n = (() => {
  const STORAGE_KEY = "china-tour-lang";
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["zh", "en", "ja", "ko"];

  let currentLang = DEFAULT_LANG;
  let translations = {};

  function getBasePath() {
    const script = document.querySelector('script[src*="i18n.js"]');
    return script?.dataset?.base || "";
  }

  function getNested(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  async function loadLocale(lang) {
    const base = getBasePath();
    const [mainRes, detailRes, attractionImagesRes, foodImagesRes] = await Promise.all([
      fetch(`${base}locales/${lang}.json`),
      fetch(`${base}locales/city-detail-${lang}.json`),
      fetch(`${base}locales/attraction-images.json`),
      fetch(`${base}locales/food-images.json`),
    ]);

    if (!mainRes.ok) throw new Error(`Failed to load locale: ${lang}`);
    const main = await mainRes.json();
    const detail = detailRes.ok ? await detailRes.json() : {};
    const attractionImages = attractionImagesRes.ok ? await attractionImagesRes.json() : {};
    const foodImages = foodImagesRes.ok ? await foodImagesRes.json() : {};
    return { ...main, ...detail, ...attractionImages, ...foodImages };
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getNested(translations, key);
      if (value != null) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = value;
        } else {
          el.textContent = value;
        }
      }
    });

    document.querySelectorAll("[data-i18n-list]").forEach((ul) => {
      const key = ul.getAttribute("data-i18n-list");
      const items = getNested(translations, key);
      if (Array.isArray(items)) {
        ul.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
      }
    });

    const city = document.body.dataset.city;
    if (city) {
      const title = getNested(translations, `cityDetail.${city}.metaTitle`);
      const desc = getNested(translations, `cityDetail.${city}.metaDescription`);
      if (title) document.title = title;
      if (desc) {
        let meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", desc);
      }
    } else {
      const title = getNested(translations, "meta.title");
      const desc = getNested(translations, "meta.description");
      if (title) document.title = title;
      if (desc) {
        let meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", desc);
      }
    }

    const langMap = { zh: "zh-CN", en: "en", ja: "ja", ko: "ko" };
    document.documentElement.lang = langMap[currentLang] || currentLang;

    if (city && typeof CityPage !== "undefined") {
      CityPage.render(city);
    }
  }

  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    translations = await loadLocale(lang);
    applyTranslations();

    const select = document.getElementById("lang-select");
    if (select) select.value = lang;

    document.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { lang } })
    );
  }

  async function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    let lang = saved || DEFAULT_LANG;
    await setLanguage(lang);

    const select = document.getElementById("lang-select");
    if (select) {
      select.addEventListener("change", (e) => setLanguage(e.target.value));
    }

    if (document.body.dataset.city && typeof CityPage !== "undefined") {
      CityPage.init();
    }
  }

  return {
    init,
    setLanguage,
    getLang: () => currentLang,
    getTranslations: () => translations,
    getNested,
  };
})();
