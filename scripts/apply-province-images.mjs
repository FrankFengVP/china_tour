import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PROVINCE_CITY_IMAGES } from "./province-city-images-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES = path.join(__dirname, "..", "locales");

const attrPath = path.join(LOCALES, "attraction-images.json");
const foodPath = path.join(LOCALES, "food-images.json");
const metaPath = path.join(LOCALES, "provinces-meta.json");

const attr = JSON.parse(fs.readFileSync(attrPath, "utf8"));
const food = JSON.parse(fs.readFileSync(foodPath, "utf8"));
const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));

for (const [slug, imgs] of Object.entries(PROVINCE_CITY_IMAGES)) {
  attr.attractionImages[slug] = imgs.attractions;
  food.foodImages[slug] = imgs.foods;
  meta.heroImages[slug] = imgs.hero;
  meta.cardImages[slug] = imgs.hero.replace(/w=1200/, "w=800").replace(/w=800&q=85&auto=format&fit=crop/, "w=800&q=85&auto=format&fit=crop");
}

fs.writeFileSync(attrPath, JSON.stringify(attr, null, 2) + "\n");
fs.writeFileSync(foodPath, JSON.stringify(food, null, 2) + "\n");
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");

console.log(`Updated images for ${Object.keys(PROVINCE_CITY_IMAGES).length} province cities.`);
