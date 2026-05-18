const CityPage = (() => {
  const CITIES = ["beijing", "shanghai", "xian", "chengdu", "guilin", "hangzhou"];

  function getData(translations, city) {
    return translations?.cityDetail?.[city];
  }

  function renderAttractions(data) {
    const container = document.getElementById("attractions-list");
    if (!container || !data?.attractions) return;
    container.innerHTML = data.attractions
      .map(
        (a) => `
      <article class="detail-card">
        <h3>${a.name}</h3>
        <p>${a.desc}</p>
      </article>`
      )
      .join("");
  }

  function renderFoods(data) {
    const container = document.getElementById("food-list");
    if (!container || !data?.foods) return;
    container.innerHTML = data.foods
      .map(
        (f) => `
      <article class="detail-card detail-card--food">
        <h3>${f.name}</h3>
        <p>${f.desc}</p>
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
        return `<a href="${c}.html" class="more-city-link">${name}</a>`;
      })
      .join("");
  }

  function render(city) {
    const translations = I18n.getTranslations();
    const data = getData(translations, city);
    if (!data) return;

    const durationEl = document.getElementById("city-duration");
    if (durationEl && data.duration) durationEl.textContent = data.duration;

    renderAttractions(data);
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
