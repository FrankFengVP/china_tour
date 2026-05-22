/**
 * Build verified-image-spill.json — only URLs that return HTTP 200 on GET.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

export function toImgUrl(photoId, w = 800) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=80&fm=jpg&fit=crop`;
}

export function toDlUrl(slug, w = 800) {
  return `https://unsplash.com/photos/${slug}/download?force=true&w=${w}`;
}

async function isOk(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return res.ok;
  } catch {
    return false;
  }
}

async function filterOk(urls) {
  const ok = [];
  const batch = 25;
  for (let i = 0; i < urls.length; i += batch) {
    const chunk = urls.slice(i, i + batch);
    const results = await Promise.all(
      chunk.map(async (url) => ((await isOk(url)) ? url : null))
    );
    ok.push(...results.filter(Boolean));
    process.stdout.write(`\rChecked ${Math.min(i + batch, urls.length)}/${urls.length}, OK: ${ok.length}`);
  }
  console.log();
  return ok;
}

const SEED = [
  toDlUrl("uiLIZKss15Y"),
  toDlUrl("MF82hCtqA04"),
  toDlUrl("B7vuVxoMosc"),
  toDlUrl("zroGv_2vYWc"),
  toDlUrl("pVEzaThl6Lg"),
  toDlUrl("AwSAMWFosSY"),
  toDlUrl("87y8aw-40Fo"),
  toDlUrl("9aq_ljSRxP4"),
  toDlUrl("JweY6BbVfBk"),
  toDlUrl("WPfepTPXvCg"),
  toDlUrl("MiYNFBx0cYA"),
  toDlUrl("t2gngt3f2ao"),
  toDlUrl("lhg1L-DuLxs"),
  toDlUrl("9t76Ay2HkMI"),
  toDlUrl("Jm5WoKjRsQk"),
  toDlUrl("H5Hj8QV2Tx4"),
  toDlUrl("cCkL1MO5fxo"),
  toDlUrl("LO7rNP0LRro"),
  toDlUrl("g7ue2JBhDro"),
  toDlUrl("tm4Y0NAUA48"),
  toDlUrl("8Q7A52nyRyI"),
  toDlUrl("x0jiDSAlwWc"),
  toImgUrl("photo-1508804185872-d7badad00f7d"),
  toImgUrl("photo-1758087016914-b5404719b14e"),
  toImgUrl("photo-1574504500022-de9a6309a501"),
  toImgUrl("photo-1763622480507-4b9be29a172c"),
  toImgUrl("photo-1762785832394-15dee98fce0b"),
  toImgUrl("photo-1743841422310-d940f1dc7e2c"),
  toImgUrl("photo-1669382485231-ef86d9fa986f"),
  toImgUrl("photo-1566487097168-e91a4f38bee2"),
  toImgUrl("photo-1773318901045-38e92a58482d"),
  toImgUrl("photo-1773318901194-fd36e69f932d"),
  toImgUrl("photo-1773318901379-aac92fdf5611"),
  toImgUrl("photo-1549733171-76fb95f99322"),
  toImgUrl("photo-1747798678108-ba9a8606d58b"),
  toImgUrl("photo-1743402814792-ee8f4fcd0aa4"),
  toImgUrl("photo-1769532890957-f4384215681d"),
  toImgUrl("photo-1556761915-3fd5f6f66407"),
  toImgUrl("photo-1740235866552-ad088357bd87"),
  toImgUrl("photo-1695970911153-510493f1e47b"),
  toImgUrl("photo-1614104030967-5ca61a54247b"),
  toImgUrl("photo-1603248867985-bbc2a0ce91f2"),
  toImgUrl("photo-1646530308114-d55c45994f0a"),
  toImgUrl("photo-1648977555545-4dd006e30d3f"),
  toImgUrl("photo-1544947950-fa07a98d237f"),
  toImgUrl("photo-1630564510802-0cac202af38d"),
  toImgUrl("photo-1555126634-323283e090fa"),
  toImgUrl("photo-1544601284-7fe39c93d4d4"),
  toImgUrl("photo-1710508787399-e3dc878838a8"),
  toImgUrl("photo-1703945530505-2f06e3e1cf97"),
  toImgUrl("photo-1626804475297-41608ea09aeb"),
  toImgUrl("photo-1593433685209-594e48905b95"),
  toImgUrl("photo-1725076021478-173130f22f06"),
  toImgUrl("photo-1765188988816-e73d143fed98"),
  toImgUrl("photo-1609088399054-7661a95fe0e2"),
  toImgUrl("photo-1602917381237-e46b6c517705"),
  toImgUrl("photo-1598538982410-c86b30005fb4"),
  toImgUrl("photo-1742689502100-981418fbde01"),
  toImgUrl("photo-1570604127008-f644337cfb8b"),
  toImgUrl("photo-1621916805571-2e804f82170c"),
  toImgUrl("photo-1603091694067-0724e5ed6492"),
  toImgUrl("photo-1624174838145-c052490eb1d8"),
  toImgUrl("photo-1597490101653-8db754021a89"),
  toImgUrl("photo-1506158669146-619067262a00"),
  toImgUrl("photo-1547981609-4b6bfe67ca0b"),
  toImgUrl("photo-1614555383820-941c466f1b52"),
  toImgUrl("photo-1699173563249-8ab319163034"),
  toImgUrl("photo-1547150492-da7ff1742941"),
  toImgUrl("photo-1604844252839-f9c364adacdd"),
  toImgUrl("photo-1569165755139-296fac054979"),
  toImgUrl("photo-1567266565245-c08dc046815f"),
  toImgUrl("photo-1584872589930-e99fe5bf4408"),
  toImgUrl("photo-1609088399054-7661a95fe0e2"),
  toImgUrl("photo-1593433685209-594e48905b95"),
  toImgUrl("photo-1602917381237-e46b6c517705"),
  toImgUrl("photo-1769532890957-f4384215681d"),
];

function collectFromLocales() {
  const urls = [];
  function walk(o) {
    if (typeof o === "string" && o.includes("unsplash")) urls.push(o);
    else if (o && typeof o === "object") for (const v of Object.values(o)) walk(v);
  }
  for (const f of ["attraction-images.json", "food-images.json"]) {
    walk(JSON.parse(fs.readFileSync(path.join(ROOT, "locales", f), "utf8")));
  }
  return urls;
}

const candidates = [...new Set([...SEED, ...collectFromLocales()])];
console.log(`Verifying ${candidates.length} candidate URLs...`);
const verified = await filterOk(candidates);

const queries = ["china travel", "china temple", "chinese food", "guilin", "great wall"];
const extra = [];
for (const q of queries) {
  try {
    const res = await fetch(
      `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=20`
    );
    if (!res.ok) continue;
    const data = await res.json();
    for (const r of data.results || []) {
      const regular = r.urls?.regular || "";
      if (regular.includes("images.unsplash.com/photo-")) {
        const m = regular.match(/photo-[\w-]+/);
        if (m) extra.push(toImgUrl(m[0]));
      }
      if (r.id) extra.push(toDlUrl(r.id));
    }
  } catch {
    /* skip */
  }
  await new Promise((r) => setTimeout(r, 200));
}

if (extra.length) {
  console.log(`Verifying ${extra.length} search extras...`);
  const more = await filterOk(extra.filter((u) => !verified.includes(u)));
  verified.push(...more);
}

const unique = [...new Set(verified)];
const outPath = path.join(__dirname, "verified-image-spill.json");
fs.writeFileSync(outPath, JSON.stringify(unique, null, 2) + "\n");
console.log(`Wrote ${unique.length} verified URLs to ${outPath}`);
