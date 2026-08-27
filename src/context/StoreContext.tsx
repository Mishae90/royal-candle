import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { computeTotal } from "../data/catalog";
import type { CandleConfig, SummaryLine } from "../data/catalog";

export type Page =
  | "home"
  | "create"
  | "baptism"
  | "gallery"
  | "story"
  | "faq"
  | "contact"
  | "cart"
  | "checkout"
  | "confirmation";

export interface CartItem {
  id: string;
  config: CandleConfig;
  qty: number;
}

export interface SavedDesign {
  id: string;
  label: string;
  config: CandleConfig;
  createdAt: number;
}

export interface PlacedOrder {
  number: string;
  email: string;
  name: string;
  total: number;
  lines: { itemLines: SummaryLine[]; qty: number; total: number }[];
  shipping: string;
}

interface StoreValue {
  page: Page;
  navigate: (p: Page) => void;
  cart: CartItem[];
  addToCart: (config: CandleConfig) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  saved: SavedDesign[];
  saveDesign: (config: CandleConfig, label?: string) => void;
  deleteDesign: (id: string) => void;
  draft: CandleConfig | null;
  setDraft: (c: CandleConfig | null) => void;
  toast: string | null;
  notify: (msg: string) => void;
  order: PlacedOrder | null;
  placeOrder: (info: { email: string; name: string; shipping: string }, lines: PlacedOrder["lines"]) => PlacedOrder;
}

const StoreContext = createContext<StoreValue | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode — ignore */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>(() => load<CartItem[]>("rc-cart", []));
  const [saved, setSaved] = useState<SavedDesign[]>(() => load<SavedDesign[]>("rc-saved", []));
  const [draft, setDraft] = useState<CandleConfig | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => persist("rc-cart", cart), [cart]);
  useEffect(() => persist("rc-saved", saved), [saved]);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback(
    (config: CandleConfig) => {
      setCart((prev) => [...prev, { id: uid(), config, qty: 1 }]);
      notify("Your candle has been added to the cart");
    },
    [notify],
  );

  const removeItem = useCallback((id: string) => setCart((prev) => prev.filter((i) => i.id !== id)), []);
  const setQty = useCallback(
    (id: string, qty: number) =>
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(9, qty)) } : i))),
    [],
  );
  const clearCart = useCallback(() => setCart([]), []);

  const saveDesign = useCallback(
    (config: CandleConfig, label?: string) => {
      const fallback = config.childName.trim() ? `Design for ${config.childName.trim()}` : `Design ${Date.now().toString().slice(-4)}`;
      setSaved((prev) => [{ id: uid(), label: label?.trim() || fallback, config, createdAt: Date.now() }, ...prev].slice(0, 12));
      notify("Design saved — return to it any time");
    },
    [notify],
  );

  const deleteDesign = useCallback((id: string) => setSaved((prev) => prev.filter((d) => d.id !== id)), []);

  const placeOrder = useCallback(
    (info: { email: string; name: string; shipping: string }, lines: PlacedOrder["lines"]) => {
      const num = `RC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const total = lines.reduce((s, l) => s + l.total * l.qty, 0) + (info.shipping === "express" ? 14 : 0);
      const placed: PlacedOrder = { number: num, email: info.email, name: info.name, total, lines, shipping: info.shipping };
      setOrder(placed);
      setCart([]);
      return placed;
    },
    [],
  );

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + computeTotal(i.config) * i.qty, 0), [cart]);

  const value: StoreValue = {
    page,
    navigate,
    cart,
    addToCart,
    removeItem,
    setQty,
    clearCart,
    cartCount,
    cartTotal,
    saved,
    saveDesign,
    deleteDesign,
    draft,
    setDraft,
    toast,
    notify,
    order,
    placeOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
