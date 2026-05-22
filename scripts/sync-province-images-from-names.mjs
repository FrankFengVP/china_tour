/**
 * Regenerate province images with GLOBAL uniqueness (200 slots, no repeated assets).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ALL_PROVINCE_CITY_SLUGS } from "./province-config.mjs";
import {
  POOLS,
  FOOD_POOL,
  ATTRACTION_CATEGORY,
  HERO_CATEGORY,
  img,
  dl,
} from "./global-image-pool.mjs";
import { imageKey } from "./province-image-matcher.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const zhDetail = JSON.parse(
  fs.readFileSync(path.join(ROOT, "locales", "city-detail-provinces-zh.json"), "utf8")
);

function collectUrls(obj, out) {
  if (typeof obj === "string" && obj.includes("unsplash")) out.add(obj);
  else if (obj && typeof obj === "object")
    for (const v of Object.values(obj)) collectUrls(v, out);
}

const localeUrls = new Set();
for (const f of ["attraction-images.json", "food-images.json", "provinces-meta.json"]) {
  collectUrls(JSON.parse(fs.readFileSync(path.join(ROOT, "locales", f), "utf8")), localeUrls);
}

const verifiedPath = path.join(__dirname, "verified-image-spill.json");
if (!fs.existsSync(verifiedPath)) {
  console.error("Missing verified-image-spill.json — run: node scripts/build-verified-spill.mjs");
  process.exit(1);
}
const verifiedSpill = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));

const MASTER_SPILL = [
  ...new Set([...verifiedSpill, ...Object.values(POOLS).flat(), ...FOOD_POOL, ...localeUrls]),
];

const NAMED_FOOD = {
  过桥米线: dl("H5Hj8QV2Tx4"),
  汽锅鸡: img("photo-1646530308114-d55c45994f0a"),
  野生菌火锅: img("photo-1648977555545-4dd006e30d3f"),
  乳扇: img("photo-1630564510802-0cac202af38d"),
  酸辣鱼: img("photo-1544947950-fa07a98d237f"),
  喜洲粑粑: dl("cCkL1MO5fxo"),
};

const globalUsed = new Set();
let foodPoolIdx = 0;

function pickAny(preferred = []) {
  for (const url of [...preferred, ...MASTER_SPILL]) {
    const key = imageKey(url);
    if (!globalUsed.has(key)) {
      globalUsed.add(key);
      return url;
    }
  }
  throw new Error(`All images used (${globalUsed.size})`);
}

function pickFromPool(poolKey) {
  const pool = POOLS[poolKey] || POOLS.lake;
  return pickAny(pool);
}

function pickFood(name) {
  if (NAMED_FOOD[name]) {
    const url = NAMED_FOOD[name];
    const key = imageKey(url);
    if (!globalUsed.has(key)) {
      globalUsed.add(key);
      return url;
    }
  }
  while (foodPoolIdx < FOOD_POOL.length * 3) {
    const url = FOOD_POOL[foodPoolIdx % FOOD_POOL.length];
    foodPoolIdx += 1;
    const key = imageKey(url);
    if (!globalUsed.has(key)) {
      globalUsed.add(key);
      return url;
    }
  }
  return pickFromPool("market");
}

const PROVINCE_CITY_IMAGES = {};
const errors = [];

for (const slug of ALL_PROVINCE_CITY_SLUGS) {
  const detail = zhDetail.cityDetail?.[slug];
  if (!detail) continue;

  const pageUsed = new Set();
  const mark = (url) => {
    const key = imageKey(url);
    pageUsed.add(key);
    return url;
  };

  const heroCat = HERO_CATEGORY[slug] || "spring";
  const hero = mark(pickFromPool(heroCat).replace(/w=\d+/, "w=1200"));

  const attractions = detail.attractions.map((a) => {
    const cat = ATTRACTION_CATEGORY[a.name] || "lake";
    return mark(pickFromPool(cat));
  });

  const foods = detail.foods.map((f) => mark(pickFood(f.name)));

  if (pageUsed.size !== 8) errors.push(`${slug}: page has ${pageUsed.size}/8 unique`);

  PROVINCE_CITY_IMAGES[slug] = { hero, attractions, foods };
}

if (errors.length) {
  console.error("Page-level duplicates:\n", errors.join("\n"));
  process.exit(1);
}

const globalKeys = [...globalUsed];
console.log(`Global unique assets: ${globalKeys.length} (target ≥200)`);

const outPath = path.join(__dirname, "province-city-images-data.mjs");
fs.writeFileSync(
  outPath,
  `/** AUTO-GENERATED — global unique images */\nexport { img, dl } from "./image-library.mjs";\n\nexport const PROVINCE_CITY_IMAGES = ${JSON.stringify(PROVINCE_CITY_IMAGES, null, 2)};\n`
);

const { execSync } = await import("child_process");
execSync("node scripts/apply-province-images.mjs", { cwd: ROOT, stdio: "inherit" });
execSync("node scripts/patch-city-heroes.mjs", { cwd: ROOT, stdio: "inherit" });
console.log("Done.");
