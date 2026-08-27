/* ------------------------------------------------------------------
   ROYAL CANDLE — Real product layer ("La Boutique")
   Products added from the Atelier Manager live here.
   Storage: browser localStorage (key "rc-products").
   Production path: swap loadProducts/persistProducts with a cloud
   source (Supabase, Shopify, a CMS) — the rest of the site already
   consumes this exact shape.
------------------------------------------------------------------- */

/** Categories a real product can belong to.
    "boutique" = sold on its own; any other value also makes the
    product appear inside that configurator section. */
export type ProductCategory =
  | "candle"
  | "ribbon"
  | "holder"
  | "towel"
  | "extra"
  | "toy"
  | "cross"
  | "flower"
  | "boutique";

export interface CustomProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  /** Square photo of the product — URL or uploaded file (dataURL). */
  image: string;
  detail?: string;
  createdAt: number;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  candle: "Candles",
  ribbon: "Ribbons",
  holder: "Candle Holders",
  towel: "Towels & Blankets",
  extra: "Additional Candles",
  toy: "Keepsake Toys",
  cross: "Crosses & Chains",
  flower: "Flowers",
  boutique: "Boutique only",
};

const KEY = "rc-products";

export function loadProducts(): CustomProduct[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CustomProduct[]) : [];
  } catch {
    return [];
  }
}

export function persistProducts(list: CustomProduct[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export const newProductId = () => `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
