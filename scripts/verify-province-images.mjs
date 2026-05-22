import { PROVINCE_CITY_IMAGES } from "./province-city-images-data.mjs";
import { imageKey } from "./province-image-matcher.mjs";

let dupCities = 0;
let fail = 0;

for (const [slug, imgs] of Object.entries(PROVINCE_CITY_IMAGES)) {
  const all = [imgs.hero, ...imgs.attractions, ...imgs.foods];
  const keys = all.map(imageKey);
  if (new Set(keys).size !== keys.length) {
    dupCities++;
    console.error(`DUPLICATE in ${slug}: ${all.length} images, ${new Set(keys).size} unique assets`);
  }
}

const allUrls = new Set();
for (const imgs of Object.values(PROVINCE_CITY_IMAGES)) {
  [imgs.hero, ...imgs.attractions, ...imgs.foods].forEach((u) => allUrls.add(u));
}

for (const url of allUrls) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    if (!res.ok) {
      fail++;
      console.error("FAIL", res.status, url);
    }
  } catch (e) {
    fail++;
    console.error("ERR", url, e.message);
  }
}

for (const [slug, imgs] of Object.entries(PROVINCE_CITY_IMAGES)) {
  const keys = [imgs.hero, ...imgs.attractions, ...imgs.foods].map(imageKey);
  if (new Set(keys).size !== 8) dupCities++;
}

console.log(
  `Cities: ${Object.keys(PROVINCE_CITY_IMAGES).length}, duplicate pages: ${dupCities}, URLs checked: ${allUrls.size}, failed: ${fail}`
);
process.exit(dupCities > 0 || fail > 0 ? 1 : 0);
