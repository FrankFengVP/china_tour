/**
 * Fetch ~200 unique Unsplash photo IDs for province-city image spill pool.
 * Run: npm run fetch:image-spill
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const queries = [
  "china temple",
  "china mountain",
  "china beach",
  "china ancient town",
  "china garden",
  "chinese food",
  "china skyline",
  "china lake",
  "china tea",
  "china panda",
  "guilin karst",
  "shanghai bund",
  "forbidden city",
  "great wall china",
];

const ids = new Set();
for (const q of queries) {
  const res = await fetch(
    `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30`
  );
  if (!res.ok) {
    console.warn("Skip", q, res.status);
    continue;
  }
  const data = await res.json();
  for (const r of data.results || []) {
    const regular = r.urls?.regular || "";
    if (!regular.includes("images.unsplash.com/photo-")) continue;
    const m = regular.match(/photo-[\w-]+/);
    if (m) ids.add(m[0]);
    if (r.id) ids.add(`slug:${r.id}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

const urls = [...ids].map(
  (id) => `https://images.unsplash.com/${id}?w=800&q=85&auto=format&fit=crop`
);
const out = path.join(__dirname, "extra-image-spill.json");
fs.writeFileSync(out, JSON.stringify(urls, null, 2) + "\n");
console.log(`Wrote ${urls.length} URLs to ${out}`);
