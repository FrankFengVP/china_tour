import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const citiesDir = path.join(__dirname, "..", "cities");

const oldNav = `        <li><a href="../index.html#provinces" data-i18n="nav.provinces">热门省份</a></li>`;
const newNav = `        <li class="nav-item nav-item--provinces">
          <button type="button" class="nav-province-root-toggle" aria-expanded="false" aria-controls="nav-provinces-panel">
            <span data-i18n="nav.provinces">热门省份</span>
            <span class="nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="nav-provinces-panel" id="nav-provinces-panel" hidden>
            <div id="nav-provinces-menu" class="nav-provinces-menu"></div>
          </div>
        </li>`;

for (const file of fs.readdirSync(citiesDir)) {
  if (!file.endsWith(".html")) continue;
  const fp = path.join(citiesDir, file);
  let html = fs.readFileSync(fp, "utf8");
  let changed = false;
  if (html.includes(oldNav)) {
    html = html.replace(oldNav, newNav);
    changed = true;
  }
  if (html.includes('../index.html#provinces" class="back-link"')) {
    html = html.replaceAll('../index.html#provinces" class="back-link"', '../index.html" class="back-link"');
    changed = true;
  }
  if (!html.includes("provinces.js")) {
    html = html.replace(
      '<script src="../js/city.js"></script>',
      '<script src="../js/provinces.js"></script>\n  <script src="../js/city.js"></script>'
    );
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(fp, html);
    console.log("patched", file);
  }
}
