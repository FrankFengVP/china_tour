const NavProvinces = (() => {
  let bound = false;

  function escapeHtml(text) {
    const el = document.createElement("div");
    el.textContent = text;
    return el.innerHTML;
  }

  function cityHref(slug) {
    return document.body.dataset.city ? `${slug}.html` : `cities/${slug}.html`;
  }

  function render() {
    const menu = document.getElementById("nav-provinces-menu");
    if (!menu) return;

    const t = I18n.getTranslations();
    const order = t.provinceOrder || [];
    const provinceCities = t.provinceCities || {};

    menu.innerHTML = order
      .map((provId) => {
        const prov = t.provinces?.[provId];
        if (!prov) return "";

        const slugs = provinceCities[provId] || [];
        const cityLinks = slugs
          .map((slug) => {
            const name = t.cities?.[slug]?.name || slug;
            return `<li><a href="${cityHref(slug)}">${escapeHtml(name)}</a></li>`;
          })
          .join("");

        return `
      <div class="nav-province-group">
        <button type="button" class="nav-province-toggle" aria-expanded="false">
          <span class="nav-province-name">${escapeHtml(prov.name)}</span>
          <span class="nav-chevron" aria-hidden="true"></span>
        </button>
        <ul class="nav-province-cities" hidden>${cityLinks}</ul>
      </div>`;
      })
      .join("");

    if (!bound) bindEvents();
  }

  function bindEvents() {
    if (bound) return;
    bound = true;

    const root = document.querySelector(".nav-province-root-toggle");
    const panel = document.getElementById("nav-provinces-panel");

    root?.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = root.getAttribute("aria-expanded") === "true";
      setRootOpen(!open);
    });

    document.getElementById("nav-provinces-menu")?.addEventListener("click", (e) => {
      const cityLink = e.target.closest(".nav-province-cities a");
      if (cityLink) {
        setRootOpen(false);
        document.querySelector(".nav")?.classList.remove("open");
        document.getElementById("nav-toggle")?.classList.remove("active");
        return;
      }

      const toggle = e.target.closest(".nav-province-toggle");
      if (!toggle) return;
      e.preventDefault();
      e.stopPropagation();

      const group = toggle.closest(".nav-province-group");
      const list = group?.querySelector(".nav-province-cities");
      if (!list) return;

      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      list.hidden = open;

      document.querySelectorAll(".nav-province-toggle").forEach((btn) => {
        if (btn === toggle) return;
        btn.setAttribute("aria-expanded", "false");
        const otherList = btn.closest(".nav-province-group")?.querySelector(".nav-province-cities");
        if (otherList) otherList.hidden = true;
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item--provinces")) setRootOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setRootOpen(false);
    });

    function setRootOpen(open) {
      root?.setAttribute("aria-expanded", String(open));
      if (panel) panel.hidden = !open;
    }
  }

  function init() {
    document.addEventListener("languageChanged", render);
    render();
  }

  return { init, render };
})();
