/** HTML snippets for province dropdown nav */
export const NAV_PROVINCES_INDEX = `        <li class="nav-item nav-item--provinces">
          <button type="button" class="nav-province-root-toggle" aria-expanded="false" aria-controls="nav-provinces-panel">
            <span data-i18n="nav.provinces">热门省份</span>
            <span class="nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="nav-provinces-panel" id="nav-provinces-panel" hidden>
            <div id="nav-provinces-menu" class="nav-provinces-menu"></div>
          </div>
        </li>`;

export const NAV_PROVINCES_CITY = NAV_PROVINCES_INDEX;
