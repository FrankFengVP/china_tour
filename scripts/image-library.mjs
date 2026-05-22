/** Curated Unsplash URLs — semantic keys for province-city image matching */

export function img(photoId, w = 800) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=85&auto=format&fit=crop`;
}

export function dl(slug, w = 800) {
  return `https://unsplash.com/photos/${slug}/download?force=true&w=${w}`;
}

export const LIB = {
  karst: dl("uiLIZKss15Y"),
  lake: img("photo-1743402814792-ee8f4fcd0aa4"),
  park: img("photo-1747798678108-ba9a8606d58b"),
  oldTown: dl("MF82hCtqA04"),
  erhai: dl("B7vuVxoMosc"),
  mountain: img("photo-1549733171-76fb95f99322"),
  temple: img("photo-1762785832394-15dee98fce0b"),
  tibetanTemple: dl("87y8aw-40Fo"),
  tibetanMonastery: dl("9aq_ljSRxP4"),
  jungle: img("photo-1614104030967-5ca61a54247b"),
  panda: dl("JweY6BbVfBk"),
  elephant: dl("WPfepTPXvCg"),
  nightMarket: img("photo-1740235866552-ad088357bd87"),
  cantonTower: dl("MiYNFBx0cYA"),
  cantonTowerNight: dl("t2gngt3f2ao"),
  colonial: img("photo-1758087016914-b5404719b14e"),
  skyline: img("photo-1574504500022-de9a6309a501"),
  beach: img("photo-1773318901194-fd36e69f932d"),
  garden: img("photo-1556761915-3fd5f6f66407"),
  waterTown: img("photo-1747798678108-ba9a8606d58b"),
  historical: img("photo-1763622480507-4b9be29a172c"),
  palace: img("photo-1508804185872-d7badad00f7d"),
  buddha: img("photo-1593433685209-594e48905b95"),
  tulou: dl("Jm5WoKjRsQk"),
  turquoiseLake: dl("zroGv_2vYWc"),
  teaMountain: img("photo-1603248867985-bbc2a0ce91f2"),
  bambooRaft: dl("uiLIZKss15Y"),
  europeanStreet: img("photo-1765188988816-e73d143fed98"),
  themePark: img("photo-1695970911153-510493f1e47b"),
  coastalTown: img("photo-1773318901045-38e92a58482d"),
  springCity: img("photo-1773318901045-38e92a58482d"),

  noodles: dl("H5Hj8QV2Tx4"),
  chickenSoup: img("photo-1646530308114-d55c45994f0a"),
  hotpot: img("photo-1648977555545-4dd006e30d3f"),
  fish: img("photo-1544947950-fa07a98d237f"),
  seafood: dl("LO7rNP0LRro"),
  dimSum: dl("cCkL1MO5fxo"),
  pastry: img("photo-1630564510802-0cac202af38d"),
  streetFood: img("photo-1626804475297-41608ea09aeb"),
  stirFry: img("photo-1710508787399-e3dc878838a8"),
  beerSeafood: img("photo-1703945530505-2f06e3e1cf97"),
  oyster: dl("g7ue2JBhDro"),
  tea: img("photo-1603091694067-0724e5ed6492"),
  dumplings: img("photo-1544601284-7fe39c93d4d4"),
  noodlesBowl: img("photo-1555126634-323283e090fa"),
};

/** Hero candidates per city (first unused on page wins) */
export const CITY_HERO_CANDIDATES = {
  kunming: [LIB.springCity, LIB.karst, LIB.lake],
  dali: [LIB.oldTown, LIB.erhai, LIB.mountain],
  lijiang: [LIB.oldTown, LIB.mountain, dl("zroGv_2vYWc")],
  jinghong: [LIB.jungle, dl("WPfepTPXvCg"), dl("t2gngt3f2ao")],
  shangrila: [LIB.tibetanTemple, dl("9aq_ljSRxP4"), dl("pVEzaThl6Lg")],
  guangzhou: [LIB.cantonTower, LIB.colonial, LIB.temple],
  shenzhen: [LIB.skyline, img("photo-1602917381237-e46b6c517705"), LIB.beach],
  zhuhai: [LIB.beach, LIB.nightMarket, LIB.themePark],
  foshan: [LIB.temple, LIB.garden, LIB.oldTown],
  shantou: [LIB.oldTown, LIB.beach, LIB.colonial],
  nanjing: [LIB.historical, LIB.temple, img("photo-1743841422310-d940f1dc7e2c")],
  suzhou: [LIB.garden, LIB.mountain, LIB.waterTown],
  wuxi: [LIB.buddha, LIB.park, LIB.oldTown],
  yangzhou: [LIB.garden, LIB.lake, LIB.temple],
  changzhou: [LIB.temple, LIB.themePark, img("photo-1743841422310-d940f1dc7e2c")],
  qingdao: [LIB.beach, LIB.colonial, LIB.mountain],
  jinan: [LIB.lake, LIB.park, LIB.temple],
  yantai: [LIB.beach, img("photo-1609088399054-7661a95fe0e2"), LIB.mountain],
  weihai: [img("photo-1609088399054-7661a95fe0e2"), LIB.beach, LIB.historical],
  qufu: [LIB.historical, LIB.palace, LIB.temple],
  xiamen: [LIB.coastalTown, LIB.beach, LIB.garden],
  fuzhou: [LIB.oldTown, LIB.mountain, LIB.beach],
  quanzhou: [LIB.temple, LIB.oldTown, LIB.mountain],
  wuyishan: [LIB.teaMountain, LIB.bambooRaft, LIB.mountain],
  zhangzhou: [LIB.tulou, img("photo-1621916805571-2e804f82170c"), LIB.beach],
};

/** Three distinct food images per city (generic placeholder names) */
export const CITY_FOOD_DEFAULTS = {
  kunming: [LIB.noodles, LIB.chickenSoup, LIB.hotpot],
  dali: [LIB.pastry, LIB.fish, img("photo-1740235866552-ad088357bd87")],
  lijiang: [LIB.stirFry, LIB.noodlesBowl, LIB.streetFood],
  jinghong: [LIB.stirFry, LIB.hotpot, LIB.streetFood],
  shangrila: [LIB.pastry, LIB.noodlesBowl, LIB.chickenSoup],
  guangzhou: [LIB.dimSum, LIB.dumplings, LIB.stirFry],
  shenzhen: [LIB.dimSum, LIB.streetFood, LIB.stirFry],
  zhuhai: [LIB.seafood, LIB.fish, LIB.oyster],
  foshan: [LIB.dimSum, LIB.pastry, LIB.dumplings],
  shantou: [LIB.seafood, LIB.streetFood, LIB.noodlesBowl],
  nanjing: [LIB.noodlesBowl, LIB.dumplings, LIB.chickenSoup],
  suzhou: [LIB.fish, LIB.tea, LIB.pastry],
  wuxi: [LIB.chickenSoup, LIB.fish, LIB.noodlesBowl],
  yangzhou: [LIB.dumplings, LIB.fish, LIB.pastry],
  changzhou: [LIB.noodlesBowl, LIB.dumplings, LIB.stirFry],
  qingdao: [LIB.seafood, LIB.beerSeafood, LIB.oyster],
  jinan: [LIB.noodlesBowl, LIB.chickenSoup, LIB.pastry],
  yantai: [LIB.seafood, LIB.oyster, LIB.fish],
  weihai: [LIB.seafood, LIB.fish, LIB.beerSeafood],
  qufu: [LIB.pastry, LIB.noodlesBowl, LIB.dumplings],
  xiamen: [LIB.oyster, LIB.seafood, LIB.fish],
  fuzhou: [LIB.chickenSoup, LIB.fish, LIB.dimSum],
  quanzhou: [LIB.fish, LIB.oyster, LIB.streetFood],
  wuyishan: [LIB.tea, LIB.chickenSoup, LIB.stirFry],
  zhangzhou: [LIB.oyster, LIB.stirFry, LIB.dumplings],
};

// Legacy export for scripts that still import CITY_HERO
export const CITY_HERO = Object.fromEntries(
  Object.entries(CITY_HERO_CANDIDATES).map(([k, v]) => [k, v[0]])
);
