import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const meta = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "locales", "provinces-meta.json"), "utf8")
);
const citiesDir = path.join(__dirname, "..", "cities");

for (const slug of Object.keys(meta.heroImages)) {
  const fp = path.join(citiesDir, `${slug}.html`);
  if (!fs.existsSync(fp)) continue;
  const hero = meta.heroImages[slug];
  let html = fs.readFileSync(fp, "utf8");
  html = html.replace(
    /<img src="[^"]+" alt="[^"]*">\s*\n\s*<div class="city-hero-overlay">/,
    `<img src="${hero}" alt="${slug}">\n        <div class="city-hero-overlay">`
  );
  fs.writeFileSync(fp, html);
  console.log("hero", slug);
}
