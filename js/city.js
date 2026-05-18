const CityPage = (() => {
  const CITIES = ["beijing", "shanghai", "xian", "chengdu", "guilin", "hangzhou"];

  function escapeHtml(text) {
    const el = document.createElement("div");
    el.textContent = text;
    return el.innerHTML;
  }

  function getData(translations, city) {
    return translations?.cityDetail?.[city];
  }

  function getAttractionImage(translations, city, attraction, index) {
    if (attraction.image) return attraction.image;
    const images = translations?.attractionImages?.[city];
    return images?.[index] || "";
  }

  function renderAttractions(data, city) {
    const container = document.getElementById("attractions-list");
    if (!container || !data?.attractions) return;
    const translations = I18n.getTranslations();

    container.innerHTML = data.attractions
      .map((a, index) => {
        const img = getAttractionImage(translations, city, a, index);
        const imageHtml = img
          ? `<div class="detail-card-image"><img src="${img}" alt="${escapeHtml(a.name)}" loading="lazy"></div>`
          : "";
        return `
      <article class="detail-card detail-card--attraction">
        ${imageHtml}
        <div class="detail-card-body">
          <h3>${escapeHtml(a.name)}</h3>
          <p>${escapeHtml(a.desc)}</p>
        </div>
      </article>`;
      })
      .join("");
  }

  function renderFoods(data) {
    const container = document.getElementById("food-list");
    if (!container || !data?.foods) return;
    container.innerHTML = data.foods
      .map(
        (f) => `
      <article class="detail-card detail-card--food">
        <div class="detail-card-body">
          <h3>${escapeHtml(f.name)}</h3>
          <p>${escapeHtml(f.desc)}</p>
        </div>
      </article>`
      )
      .join("");
  }

  function renderMoreCities(translations, currentCity) {
    const container = document.getElementById("more-cities");
    if (!container) return;
    const others = CITIES.filter((c) => c !== currentCity);
    container.innerHTML = others
      .map((c) => {
        const name = translations?.cities?.[c]?.name || c;
        return `<a href="${c}.html" class="more-city-link">${escapeHtml(name)}</a>`;
      })
      .join("");
  }

  function render(city) {
    const translations = I18n.getTranslations();
    const data = getData(translations, city);
    if (!data) return;

    const durationEl = document.getElementById("city-duration");
    if (durationEl && data.duration) durationEl.textContent = data.duration;

    renderAttractions(data, city);
    renderFoods(data);
    renderMoreCities(translations, city);
  }

  function init() {
    const city = document.body.dataset.city;
    if (!city) return;

    document.addEventListener("languageChanged", () => render(city));
    render(city);
  }

  return { init, render };
})();
