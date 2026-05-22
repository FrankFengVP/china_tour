/** Province structure and verified Unsplash image pool */
export const PROVINCE_ORDER = [
  "yunnan",
  "guangdong",
  "jiangsu",
  "shandong",
  "fujian",
];

export const PROVINCE_CITIES = {
  yunnan: ["kunming", "dali", "lijiang", "jinghong", "shangrila"],
  guangdong: ["guangzhou", "shenzhen", "zhuhai", "foshan", "shantou"],
  jiangsu: ["nanjing", "suzhou", "wuxi", "yangzhou", "changzhou"],
  shandong: ["qingdao", "jinan", "yantai", "weihai", "qufu"],
  fujian: ["xiamen", "fuzhou", "quanzhou", "wuyishan", "zhangzhou"],
};

export const ALL_PROVINCE_CITY_SLUGS = PROVINCE_ORDER.flatMap(
  (p) => PROVINCE_CITIES[p]
);

const Q = "?w=800&q=85&auto=format&fit=crop";
const HERO_Q = "?w=1200&q=85&auto=format&fit=crop";

export const IMG_POOL = [
  "photo-1773318901045-38e92a58482d",
  "photo-1549733171-76fb95f99322",
  "photo-1762785832394-15dee98fce0b",
  "photo-1743841422310-d940f1dc7e2c",
  "photo-1758087016914-b5404719b14e",
  "photo-1574504500022-de9a6309a501",
  "photo-1763622480507-4b9be29a172c",
  "photo-1593433685209-594e48905b95",
  "photo-1765188988816-e73d143fed98",
  "photo-1695970911153-510493f1e47b",
  "photo-1747798678108-ba9a8606d58b",
  "photo-1556761915-3fd5f6f66407",
  "photo-1648977555545-4dd006e30d3f",
  "photo-1555126634-323283e090fa",
  "photo-1544601284-7fe39c93d4d4",
  "photo-1570604127008-f644337cfb8b",
  "photo-1703945530505-2f06e3e1cf97",
  "photo-1614104030967-5ca61a54247b",
  "photo-1621916805571-2e804f82170c",
  "photo-1740235866552-ad088357bd87",
  "photo-1544947950-fa07a98d237f",
  "photo-1603091694067-0724e5ed6492",
  "photo-1508804185872-d7badad00f7d",
  "photo-1566487097168-e91a4f38bee2",
  "photo-1773318901194-fd36e69f932d",
];

export function imgUrl(id, hero = false) {
  return `https://images.unsplash.com/${id}${hero ? HERO_Q : Q}`;
}

export function imagesForCity(index) {
  const pick = (i) => IMG_POOL[(index * 7 + i) % IMG_POOL.length];
  return {
    hero: imgUrl(pick(0), true),
    card: imgUrl(pick(0)),
    attractions: [pick(1), pick(2), pick(3), pick(4)].map((id) => imgUrl(id)),
    foods: [pick(5), pick(6), pick(0)].map((id) => imgUrl(id)),
  };
}
