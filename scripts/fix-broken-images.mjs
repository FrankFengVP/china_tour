/**
 * Replace 404 image URLs in locale JSON files with verified alternatives.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { imageKey } from "./province-image-matcher.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const verifiedPath = path.join(__dirname, "verified-image-spill.json");
if (!fs.existsSync(verifiedPath)) {
  console.error("Run: node scripts/build-verified-spill.mjs first");
  process.exit(1);
}

const VERIFIED = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));
let spillIdx = 0;

async function isOk(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return res.ok;
  } catch {
    return false;
  }
}

function nextReplacement(avoidKeys) {
  for (let i = 0; i < VERIFIED.length; i++) {
    const url = VERIFIED[(spillIdx + i) % VERIFIED.length];
    const key = imageKey(url);
    if (!avoidKeys.has(key)) {
      spillIdx = (spillIdx + i + 1) % VERIFIED.length;
      return url;
    }
  }
  return VERIFIED[0];
}

async function fixObject(obj, usedKeys) {
  if (typeof obj === "string" && obj.includes("unsplash")) {
    if (await isOk(obj)) {
      usedKeys.add(imageKey(obj));
      return obj;
    }
    const rep = nextReplacement(usedKeys);
    usedKeys.add(imageKey(rep));
    console.log("FIX", imageKey(obj), "->", imageKey(rep));
    return rep;
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (const item of obj) out.push(await fixObject(item, usedKeys));
    return out;
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = await fixObject(v, usedKeys);
    return out;
  }
  return obj;
}

const files = [
  "locales/attraction-images.json",
  "locales/food-images.json",
  "locales/provinces-meta.json",
];

for (const rel of files) {
  const fp = path.join(ROOT, rel);
  const data = JSON.parse(fs.readFileSync(fp, "utf8"));
  const usedKeys = new Set();
  const fixed = await fixObject(data, usedKeys);
  fs.writeFileSync(fp, JSON.stringify(fixed, null, 2) + "\n");
  console.log("Updated", rel);
}
