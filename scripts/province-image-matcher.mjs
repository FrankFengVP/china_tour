import { LIB, CITY_FOOD_DEFAULTS } from "./image-library.mjs";
import { ATTRACTION_CANDIDATES } from "./province-attraction-images.mjs";

/** Same Unsplash photo may appear with different width params — dedupe by asset id */
export function imageKey(url) {
  const m = url.match(/photo-[\w-]+/) || url.match(/photos\/([^/]+)\/download/);
  return m ? (m[0].startsWith("photo-") ? m[0] : m[1]) : url;
}

/** Fallback pool when name unknown or all candidates taken */
const GLOBAL_FALLBACK = [
  LIB.park,
  LIB.lake,
  LIB.oldTown,
  LIB.temple,
  LIB.mountain,
  LIB.beach,
  LIB.garden,
  LIB.colonial,
  LIB.historical,
  LIB.skyline,
  LIB.nightMarket,
  u("photo-1570604127008-f644337cfb8b"),
  u("photo-1621916805571-2e804f82170c"),
  u("photo-1603091694067-0724e5ed6492"),
  u("photo-1742689502100-981418fbde01"),
];

function u(id) {
  return `https://images.unsplash.com/${id}?w=800&q=85&auto=format&fit=crop`;
}

export function pickUnique(candidates, usedKeys) {
  for (const url of candidates) {
    if (!url) continue;
    const key = imageKey(url);
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      return url;
    }
  }
  for (const url of GLOBAL_FALLBACK) {
    const key = imageKey(url);
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      return url;
    }
  }
  throw new Error("Image pool exhausted for page");
}

export function pickAttractionImage(name, used) {
  const candidates = ATTRACTION_CANDIDATES[name] || [];
  return pickUnique(candidates, used);
}

const GENERIC_FOOD = /^(地方小吃|特色主食|传统名菜)$/;

export function pickFoodImage(name, citySlug, index, used) {
  if (GENERIC_FOOD.test(name)) {
    const defaults = CITY_FOOD_DEFAULTS[citySlug] || [
      LIB.stirFry,
      LIB.noodlesBowl,
      LIB.streetFood,
    ];
    return pickUnique(defaults, used);
  }

  const foodCandidates = [];
  if (/米线|拉面|刀削|面条|米粉/.test(name)) foodCandidates.push(LIB.noodles, LIB.noodlesBowl);
  if (/汽锅|鸡/.test(name)) foodCandidates.push(LIB.chickenSoup);
  if (/菌|火锅/.test(name)) foodCandidates.push(LIB.hotpot);
  if (/乳扇|粑粑|饼|点心|早茶|包/.test(name)) foodCandidates.push(LIB.pastry, LIB.dimSum);
  if (/酸辣鱼|鱼/.test(name)) foodCandidates.push(LIB.fish);
  if (/海鲜|啤/.test(name)) foodCandidates.push(LIB.seafood, LIB.beerSeafood);
  if (/茶/.test(name)) foodCandidates.push(LIB.tea);
  if (/小吃/.test(name)) foodCandidates.push(LIB.streetFood);
  if (/主食/.test(name)) foodCandidates.push(LIB.noodlesBowl, LIB.dumplings);
  if (/名菜/.test(name)) foodCandidates.push(LIB.stirFry);

  foodCandidates.push(LIB.stirFry, LIB.noodlesBowl, LIB.streetFood, LIB.dumplings, LIB.fish);
  return pickUnique(foodCandidates, used);
}
