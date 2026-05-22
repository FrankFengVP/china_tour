/** Curated Unsplash images per province city (hero + 4 attractions + 3 foods) */

export function img(photoId, w = 800) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=85&auto=format&fit=crop`;
}

export function dl(slug, w = 800) {
  return `https://unsplash.com/photos/${slug}/download?force=true&w=${w}`;
}

export const PROVINCE_CITY_IMAGES = {
  kunming: {
    hero: img("photo-1773318901045-38e92a58482d", 1200),
    attractions: [
      dl("uiLIZKss15Y"),
      img("photo-1743402814792-ee8f4fcd0aa4"),
      img("photo-1747798678108-ba9a8606d58b"),
      img("photo-1762785832394-15dee98fce0b"),
    ],
    foods: [
      dl("H5Hj8QV2Tx4"),
      img("photo-1646530308114-d55c45994f0a"),
      img("photo-1648977555545-4dd006e30d3f"),
    ],
  },
  dali: {
    hero: dl("B7vuVxoMosc", 1200),
    attractions: [
      dl("MF82hCtqA04"),
      dl("B7vuVxoMosc"),
      img("photo-1549733171-76fb95f99322"),
      img("photo-1762785832394-15dee98fce0b"),
    ],
    foods: [
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1544601284-7fe39c93d4d4"),
      img("photo-1630564510802-0cac202af38d"),
    ],
  },
  lijiang: {
    hero: dl("MF82hCtqA04", 1200),
    attractions: [
      dl("MF82hCtqA04"),
      dl("B7vuVxoMosc"),
      img("photo-1549733171-76fb95f99322"),
      img("photo-1773318901045-38e92a58482d"),
    ],
    foods: [
      img("photo-1555126634-323283e090fa"),
      img("photo-1544601284-7fe39c93d4d4"),
      img("photo-1710508787399-e3dc878838a8"),
    ],
  },
  jinghong: {
    hero: img("photo-1566487097168-e91a4f38bee2", 1200),
    attractions: [
      img("photo-1614104030967-5ca61a54247b"),
      img("photo-1566487097168-e91a4f38bee2"),
      img("photo-1703945530505-2f06e3e1cf97"),
      img("photo-1773318901045-38e92a58482d"),
    ],
    foods: [
      img("photo-1710508787399-e3dc878838a8"),
      img("photo-1648977555545-4dd006e30d3f"),
      img("photo-1740235866552-ad088357bd87"),
    ],
  },
  shangrila: {
    hero: img("photo-1762785832394-15dee98fce0b", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1747798678108-ba9a8606d58b"),
      dl("MF82hCtqA04"),
      img("photo-1549733171-76fb95f99322"),
    ],
    foods: [
      img("photo-1630564510802-0cac202af38d"),
      img("photo-1555126634-323283e090fa"),
      img("photo-1646530308114-d55c45994f0a"),
    ],
  },
  guangzhou: {
    hero: img("photo-1758087016914-b5404719b14e", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1758087016914-b5404719b14e"),
      img("photo-1574504500022-de9a6309a501"),
      img("photo-1740235866552-ad088357bd87"),
    ],
    foods: [
      dl("cCkL1MO5fxo"),
      img("photo-1544601284-7fe39c93d4d4"),
      img("photo-1630564510802-0cac202af38d"),
    ],
  },
  shenzhen: {
    hero: img("photo-1574504500022-de9a6309a501", 1200),
    attractions: [
      img("photo-1574504500022-de9a6309a501"),
      img("photo-1758087016914-b5404719b14e"),
      img("photo-1765188988816-e73d143fed98"),
      img("photo-1695970911153-510493f1e47b"),
    ],
    foods: [
      img("photo-1703945530505-2f06e3e1cf97"),
      dl("g7ue2JBhDro"),
      img("photo-1740235866552-ad088357bd87"),
    ],
  },
  zhuhai: {
    hero: img("photo-1773318901194-fd36e69f932d", 1200),
    attractions: [
      img("photo-1773318901194-fd36e69f932d"),
      img("photo-1743402814792-ee8f4fcd0aa4"),
      img("photo-1574504500022-de9a6309a501"),
      img("photo-1765188988816-e73d143fed98"),
    ],
    foods: [
      dl("LO7rNP0LRro"),
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1624174838145-c052490eb1d8"),
    ],
  },
  foshan: {
    hero: img("photo-1762785832394-15dee98fce0b", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1758087016914-b5404719b14e"),
      img("photo-1508804185872-d7badad00f7d"),
      img("photo-1740235866552-ad088357bd87"),
    ],
    foods: [
      dl("cCkL1MO5fxo"),
      img("photo-1630564510802-0cac202af38d"),
      img("photo-1544601284-7fe39c93d4d4"),
    ],
  },
  shantou: {
    hero: img("photo-1740235866552-ad088357bd87", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1773318901194-fd36e69f932d"),
      img("photo-1758087016914-b5404719b14e"),
      img("photo-1703945530505-2f06e3e1cf97"),
    ],
    foods: [
      img("photo-1626804475297-41608ea09aeb"),
      dl("LO7rNP0LRro"),
      img("photo-1555126634-323283e090fa"),
    ],
  },
  nanjing: {
    hero: img("photo-1763622480507-4b9be29a172c", 1200),
    attractions: [
      img("photo-1763622480507-4b9be29a172c"),
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1508804185872-d7badad00f7d"),
      img("photo-1747798678108-ba9a8606d58b"),
    ],
    foods: [
      img("photo-1555126634-323283e090fa"),
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1646530308114-d55c45994f0a"),
    ],
  },
  suzhou: {
    hero: img("photo-1556761915-3fd5f6f66407", 1200),
    attractions: [
      img("photo-1556761915-3fd5f6f66407"),
      img("photo-1747798678108-ba9a8606d58b"),
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1695970911153-510493f1e47b"),
    ],
    foods: [
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1603248867985-bbc2a0ce91f2"),
      img("photo-1630564510802-0cac202af38d"),
    ],
  },
  wuxi: {
    hero: img("photo-1747798678108-ba9a8606d58b", 1200),
    attractions: [
      img("photo-1747798678108-ba9a8606d58b"),
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1556761915-3fd5f6f66407"),
      img("photo-1695970911153-510493f1e47b"),
    ],
    foods: [
      img("photo-1646530308114-d55c45994f0a"),
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1555126634-323283e090fa"),
    ],
  },
  yangzhou: {
    hero: img("photo-1556761915-3fd5f6f66407", 1200),
    attractions: [
      img("photo-1747798678108-ba9a8606d58b"),
      img("photo-1556761915-3fd5f6f66407"),
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1703945530505-2f06e3e1cf97"),
    ],
    foods: [
      img("photo-1603091694067-0724e5ed6492"),
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1630564510802-0cac202af38d"),
    ],
  },
  changzhou: {
    hero: img("photo-1765188988816-e73d143fed98", 1200),
    attractions: [
      img("photo-1765188988816-e73d143fed98"),
      img("photo-1556761915-3fd5f6f66407"),
      img("photo-1747798678108-ba9a8606d58b"),
      img("photo-1695970911153-510493f1e47b"),
    ],
    foods: [
      img("photo-1555126634-323283e090fa"),
      img("photo-1544601284-7fe39c93d4d4"),
      img("photo-1710508787399-e3dc878838a8"),
    ],
  },
  qingdao: {
    hero: img("photo-1773318901194-fd36e69f932d", 1200),
    attractions: [
      img("photo-1773318901194-fd36e69f932d"),
      img("photo-1574504500022-de9a6309a501"),
      img("photo-1758087016914-b5404719b14e"),
      img("photo-1549733171-76fb95f99322"),
    ],
    foods: [
      dl("LO7rNP0LRro"),
      img("photo-1703945530505-2f06e3e1cf97"),
      img("photo-1624174838145-c052490eb1d8"),
    ],
  },
  jinan: {
    hero: img("photo-1743402814792-ee8f4fcd0aa4", 1200),
    attractions: [
      img("photo-1743402814792-ee8f4fcd0aa4"),
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1508804185872-d7badad00f7d"),
      img("photo-1747798678108-ba9a8606d58b"),
    ],
    foods: [
      img("photo-1555126634-323283e090fa"),
      img("photo-1646530308114-d55c45994f0a"),
      img("photo-1630564510802-0cac202af38d"),
    ],
  },
  yantai: {
    hero: img("photo-1549733171-76fb95f99322", 1200),
    attractions: [
      img("photo-1773318901194-fd36e69f932d"),
      img("photo-1549733171-76fb95f99322"),
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1758087016914-b5404719b14e"),
    ],
    foods: [
      dl("LO7rNP0LRro"),
      img("photo-1624174838145-c052490eb1d8"),
      img("photo-1544947950-fa07a98d237f"),
    ],
  },
  weihai: {
    hero: img("photo-1773318901194-fd36e69f932d", 1200),
    attractions: [
      img("photo-1773318901194-fd36e69f932d"),
      img("photo-1743402814792-ee8f4fcd0aa4"),
      img("photo-1549733171-76fb95f99322"),
      img("photo-1763622480507-4b9be29a172c"),
    ],
    foods: [
      dl("LO7rNP0LRro"),
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1703945530505-2f06e3e1cf97"),
    ],
  },
  qufu: {
    hero: img("photo-1762785832394-15dee98fce0b", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1763622480507-4b9be29a172c"),
      img("photo-1508804185872-d7badad00f7d"),
      img("photo-1556761915-3fd5f6f66407"),
    ],
    foods: [
      img("photo-1630564510802-0cac202af38d"),
      img("photo-1555126634-323283e090fa"),
      img("photo-1544601284-7fe39c93d4d4"),
    ],
  },
  xiamen: {
    hero: img("photo-1773318901194-fd36e69f932d", 1200),
    attractions: [
      img("photo-1773318901194-fd36e69f932d"),
      img("photo-1758087016914-b5404719b14e"),
      dl("MF82hCtqA04"),
      img("photo-1762785832394-15dee98fce0b"),
    ],
    foods: [
      dl("g7ue2JBhDro"),
      dl("LO7rNP0LRro"),
      img("photo-1544947950-fa07a98d237f"),
    ],
  },
  fuzhou: {
    hero: img("photo-1743402814792-ee8f4fcd0aa4", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      img("photo-1743402814792-ee8f4fcd0aa4"),
      img("photo-1508804185872-d7badad00f7d"),
      img("photo-1747798678108-ba9a8606d58b"),
    ],
    foods: [
      img("photo-1646530308114-d55c45994f0a"),
      img("photo-1544947950-fa07a98d237f"),
      img("photo-1555126634-323283e090fa"),
    ],
  },
  quanzhou: {
    hero: img("photo-1762785832394-15dee98fce0b", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      dl("MF82hCtqA04"),
      img("photo-1508804185872-d7badad00f7d"),
      img("photo-1758087016914-b5404719b14e"),
    ],
    foods: [
      img("photo-1544947950-fa07a98d237f"),
      dl("g7ue2JBhDro"),
      img("photo-1624174838145-c052490eb1d8"),
    ],
  },
  wuyishan: {
    hero: img("photo-1603248867985-bbc2a0ce91f2", 1200),
    attractions: [
      img("photo-1549733171-76fb95f99322"),
      img("photo-1614104030967-5ca61a54247b"),
      img("photo-1747798678108-ba9a8606d58b"),
      img("photo-1648977555545-4dd006e30d3f"),
    ],
    foods: [
      img("photo-1603248867985-bbc2a0ce91f2"),
      img("photo-1646530308114-d55c45994f0a"),
      img("photo-1710508787399-e3dc878838a8"),
    ],
  },
  zhangzhou: {
    hero: img("photo-1762785832394-15dee98fce0b", 1200),
    attractions: [
      img("photo-1762785832394-15dee98fce0b"),
      dl("MF82hCtqA04"),
      img("photo-1508804185872-d7badad00f7d"),
      img("photo-1773318901045-38e92a58482d"),
    ],
    foods: [
      img("photo-1624174838145-c052490eb1d8"),
      img("photo-1710508787399-e3dc878838a8"),
      img("photo-1544601284-7fe39c93d4d4"),
    ],
  },
};
