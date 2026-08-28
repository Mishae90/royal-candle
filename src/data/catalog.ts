/* ------------------------------------------------------------------
   ROYAL CANDLE — Configurator data model
   Every option is a record: id / name / price / swatches / description
   / compatibility. Adding a new option = adding one record.
   Real (uploaded) products can join any section via the `custom`
   fields of a configuration — see src/data/products.ts.
------------------------------------------------------------------- */

import type { CustomProduct } from "./products";

export interface OptionDef {
  id: string;
  name: string;
  price: number; // added to total
  desc?: string;
  swatch?: string; // primary colour
  swatch2?: string; // highlight colour
  detail?: string; // small spec line
  /** candle ids this option is compatible with (holders only) */
  candles?: string[];
}

export interface CandleConfig {
  candle: string;
  ribbon: string;
  bow: string;
  nameOn: boolean;
  childName: string;
  nameColor: "gold" | "taupe" | "rose";
  nameFont: "script" | "caps";
  dateText: string;
  holder: string;
  towel: string;
  extra: string;
  toy: string;
  cross: string;
  flower: string;
  /** id of a real (uploaded) candle used as the base — replaces the built-in candle price */
  customCandle?: string | null;
  /** categoryId -> id of a real (uploaded) accessory added on top of built-ins */
  customExtras?: Record<string, string>;
}

export const DEFAULT_CONFIG: CandleConfig = {
  candle: "classic",
  ribbon: "champagne",
  bow: "bow",
  nameOn: false,
  childName: "",
  nameColor: "gold",
  nameFont: "script",
  dateText: "",
  holder: "none",
  towel: "none",
  extra: "none",
  toy: "none",
  cross: "none",
  flower: "none",
};

export const NAME_PRICE = 12;

export const CANDLES: OptionDef[] = [
  { id: "classic", name: "The Classic Taper", price: 49, desc: "A slender ivory taper, 40 cm of quiet presence.", swatch: "#f6f0e2", swatch2: "#fffdf5", detail: "Ivory beeswax blend · 40 cm" },
  { id: "royal", name: "The Royal Column", price: 69, desc: "Our grand column candle — a cathedral in miniature.", swatch: "#f4ecdc", swatch2: "#fcf7ea", detail: "Ivory beeswax blend · 45 cm · wide" },
  { id: "blush", name: "The Blush", price: 54, desc: "Wax tinted the softest dusty rose.", swatch: "#f2e0da", swatch2: "#faf0ec", detail: "Rose-tinted wax · 40 cm" },
  { id: "celeste", name: "The Céleste", price: 54, desc: "A whisper of powder blue, like morning sky.", swatch: "#e3edf3", swatch2: "#f3f8fb", detail: "Blue-tinted wax · 40 cm" },
];

export const RIBBONS: OptionDef[] = [
  { id: "ivory", name: "Satin Ivory", price: 8, swatch: "#ece3d0", swatch2: "#f8f1e2", detail: "Italian satin" },
  { id: "champagne", name: "Satin Champagne", price: 9, swatch: "#dcc49a", swatch2: "#ecdcbc", detail: "Italian satin" },
  { id: "rose", name: "Silk Dusty Rose", price: 10, swatch: "#d9afa6", swatch2: "#ead0c9", detail: "Pure silk" },
  { id: "powder", name: "Silk Powder Blue", price: 10, swatch: "#aec6d8", swatch2: "#d2e1ec", detail: "Pure silk" },
  { id: "lavender", name: "Silk Lavender", price: 10, swatch: "#c3b5d3", swatch2: "#dcd3e7", detail: "Pure silk" },
  { id: "taupe", name: "Grosgrain Warm Taupe", price: 8, swatch: "#b4a48d", swatch2: "#cfc2ac", detail: "Silk grosgrain" },
];

export const BOW_STYLES: OptionDef[] = [
  { id: "bow", name: "Classic Bow", price: 0, desc: "A hand-tied bow resting at the side." },
  { id: "band", name: "Double Band", price: 0, desc: "Two clean bands with a gold pinstripe." },
  { id: "knot", name: "Ribbon Knot", price: 0, desc: "A soft knot with two falling tails." },
];

export const HOLDERS: OptionDef[] = [
  { id: "none", name: "No holder", price: 0, desc: "The candle stands simply on its own." },
  { id: "glass", name: "Crystal Glass Cylinder", price: 18, desc: "Hand-blown crystal that gathers the flame's light.", candles: ["classic", "blush", "celeste"] },
  { id: "brass", name: "Champagne Brass Dish", price: 24, desc: "A satin-brass dish, weighted and warm." },
  { id: "ceramic", name: "Ivory Ceramic Base", price: 21, desc: "Glazed ceramic in soft ivory." },
];

export const TOWELS: OptionDef[] = [
  { id: "none", name: "None", price: 0 },
  { id: "ivory-towel", name: "Ivory Baptism Towel", price: 26, desc: "Organic cotton, embroidered gold cross.", swatch: "#f1e9d8", swatch2: "#faf5e9" },
  { id: "blush-towel", name: "Blush Hooded Towel", price: 32, desc: "Hooded towel in dusty rose cotton.", swatch: "#efd9d3", swatch2: "#f8ebe7" },
  { id: "celeste-towel", name: "Céleste Towel Set", price: 32, desc: "Powder blue set with satin binding.", swatch: "#dce9f1", swatch2: "#eef5f9" },
];

export const EXTRAS: OptionDef[] = [
  { id: "none", name: "None", price: 0 },
  { id: "tapers", name: "Twin Taper Pair", price: 16, desc: "Two slender attendant tapers for the godparents." },
];

export const TOYS: OptionDef[] = [
  { id: "none", name: "None", price: 0 },
  { id: "bear", name: "The Christening Bear", price: 19, desc: "A hand-sewn bear in cream velvet, ribbon at his neck." },
  { id: "dove-charm", name: "The Dove Charm", price: 14, desc: "A porcelain dove resting on the ribbon — the Spirit, gently kept." },
];

export const CROSSES: OptionDef[] = [
  { id: "none", name: "None", price: 0 },
  { id: "orthodox", name: "Orthodox Cross Pendant", price: 22, desc: "The three-bar cross in champagne gold, hung from the ribbon." },
  { id: "latin", name: "Classic Cross Pendant", price: 18, desc: "A slender Latin cross in brushed gold." },
  { id: "pearl-cross", name: "Pearl Strand with Cross", price: 26, desc: "A strand of river pearls embracing the candle, cross at centre." },
];

export const FLOWERS: OptionDef[] = [
  { id: "none", name: "None", price: 0 },
  { id: "blush-bloom", name: "Blush Blossom Cluster", price: 15, desc: "Silk roses in dusty pink, gathered at the bow.", swatch: "#e2b3a9", swatch2: "#f3d9d2" },
  { id: "ivory-bloom", name: "Ivory Blossom Crown", price: 15, desc: "Cream blossoms circling the candle's crown.", swatch: "#efe4cd", swatch2: "#faf3e2" },
  { id: "powder-cascade", name: "Powder Blue Cascade", price: 15, desc: "Pale blue blossoms falling down the side.", swatch: "#b9cfdf", swatch2: "#dbe8f1" },
  { id: "lavender-whisper", name: "Lavender Whisper", price: 15, desc: "Sprigs of soft lavender and tiny pearls.", swatch: "#c9bbda", swatch2: "#e2d9ec" },
];

export const GROUPS: Record<string, OptionDef[]> = {
  candle: CANDLES,
  ribbon: RIBBONS,
  bow: BOW_STYLES,
  holder: HOLDERS,
  towel: TOWELS,
  extra: EXTRAS,
  toy: TOYS,
  cross: CROSSES,
  flower: FLOWERS,
};

export function getOption(group: string, id: string): OptionDef | undefined {
  return GROUPS[group]?.find((o) => o.id === id);
}

export function computeTotal(c: CandleConfig, products?: CustomProduct[]): number {
  const find = (id?: string | null) => products?.find((p) => p.id === id);
  let total = 0;
  const customCandle = find(c.customCandle);
  total += customCandle ? customCandle.price : getOption("candle", c.candle)?.price ?? 0;
  total += getOption("ribbon", c.ribbon)?.price ?? 0;
  if (c.nameOn) total += NAME_PRICE;
  total += getOption("holder", c.holder)?.price ?? 0;
  total += getOption("towel", c.towel)?.price ?? 0;
  total += getOption("extra", c.extra)?.price ?? 0;
  total += getOption("toy", c.toy)?.price ?? 0;
  total += getOption("cross", c.cross)?.price ?? 0;
  total += getOption("flower", c.flower)?.price ?? 0;
  if (c.customExtras) {
    Object.values(c.customExtras).forEach((id) => {
      const p = find(id);
      if (p) total += p.price;
    });
  }
  return total;
}

export interface SummaryLine {
  label: string;
  value: string;
  price: number;
}

export function summaryLines(c: CandleConfig, products?: CustomProduct[]): SummaryLine[] {
  const lines: SummaryLine[] = [];
  const find = (id?: string | null) => products?.find((p) => p.id === id);
  const customCandle = find(c.customCandle);
  const candle = getOption("candle", c.candle);
  if (customCandle) lines.push({ label: "Candle", value: `${customCandle.name} (atelier)`, price: customCandle.price });
  else if (candle) lines.push({ label: "Candle", value: candle.name, price: candle.price });
  const ribbon = getOption("ribbon", c.ribbon);
  const bow = getOption("bow", c.bow);
  if (ribbon) lines.push({ label: "Ribbon", value: `${ribbon.name} · ${bow?.name ?? ""}`, price: ribbon.price });
  if (c.nameOn)
    lines.push({
      label: "Personalisation",
      value: c.childName.trim() ? `“${c.childName.trim()}”${c.dateText.trim() ? " · " + c.dateText.trim() : ""}` : "Name engraving",
      price: NAME_PRICE,
    });
  const holder = getOption("holder", c.holder);
  if (holder && holder.id !== "none") lines.push({ label: "Holder", value: holder.name, price: holder.price });
  const towel = getOption("towel", c.towel);
  if (towel && towel.id !== "none") lines.push({ label: "Towel", value: towel.name, price: towel.price });
  const extra = getOption("extra", c.extra);
  if (extra && extra.id !== "none") lines.push({ label: "Candles", value: extra.name, price: extra.price });
  const toy = getOption("toy", c.toy);
  if (toy && toy.id !== "none") lines.push({ label: "Keepsake", value: toy.name, price: toy.price });
  const cross = getOption("cross", c.cross);
  if (cross && cross.id !== "none") lines.push({ label: "Cross & Chain", value: cross.name, price: cross.price });
  const flower = getOption("flower", c.flower);
  if (flower && flower.id !== "none") lines.push({ label: "Flowers", value: flower.name, price: flower.price });
  if (c.customExtras) {
    Object.entries(c.customExtras).forEach(([cat, id]) => {
      const p = find(id);
      if (p) {
        const labelMap: Record<string, string> = {
          candle: "Candle",
          ribbon: "Ribbon",
          holder: "Holder",
          towel: "Towel",
          extra: "Candles",
          toy: "Keepsake",
          cross: "Cross & Chain",
          flower: "Flowers",
          boutique: "Boutique",
        };
        lines.push({ label: labelMap[cat] ?? "Atelier", value: `${p.name} (atelier)`, price: p.price });
      }
    });
  }
  return lines;
}

export const fmt = (n: number): string => `€${n.toLocaleString("en-IE")}`;

/** Signature designs shown across the site — each maps to a full config. */
export interface SignatureDesign {
  id: string;
  name: string;
  story: string;
  price: number;
  config: CandleConfig;
}

export const SIGNATURE_DESIGNS: SignatureDesign[] = [
  {
    id: "sofia",
    name: "The Sofia",
    story: "Dusty rose silk, blush blossoms and the Christening Bear — our most loved composition for a daughter.",
    price: 0,
    config: { ...DEFAULT_CONFIG, candle: "blush", ribbon: "rose", nameOn: true, childName: "Sofia", nameColor: "rose", nameFont: "script", dateText: "12 · V · 2025", toy: "bear", flower: "blush-bloom", cross: "orthodox", holder: "ceramic" },
  },
  {
    id: "alexander",
    name: "The Alexander",
    story: "The Royal Column with champagne satin, an Orthodox cross and pearl strand — solemn, luminous, timeless.",
    price: 0,
    config: { ...DEFAULT_CONFIG, candle: "royal", ribbon: "champagne", nameOn: true, childName: "Alexander", nameColor: "gold", nameFont: "caps", cross: "pearl-cross", holder: "brass" },
  },
  {
    id: "anamaria",
    name: "The Anamaria",
    story: "Powder blue silk and a lavender whisper of flowers, with the little dove charm resting on the bow.",
    price: 0,
    config: { ...DEFAULT_CONFIG, candle: "celeste", ribbon: "powder", bow: "knot", nameOn: true, childName: "Anamaria", nameColor: "taupe", nameFont: "script", toy: "dove-charm", flower: "powder-cascade", towel: "celeste-towel" },
  },
];

SIGNATURE_DESIGNS.forEach((d) => (d.price = computeTotal(d.config)));
