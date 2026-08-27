import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CheckIcon } from "./components/Ornaments";
import { StoreProvider, useStore } from "./context/StoreContext";
import Admin from "./pages/Admin";
import Baptism from "./pages/Baptism";
import Boutique from "./pages/Boutique";
import Cart from "./pages/Cart";
import { Checkout, Confirmation } from "./pages/Checkout";
import Configurator from "./pages/Configurator";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Story from "./pages/Story";

const TITLES: Record<string, string> = {
  home: "Royal Candle — Personalised Baptism Candles | Luxury Christening Atelier",
  create: "Create Your Candle — Royal Candle Atelier",
  baptism: "A Sacred Beginning — The Meaning of Baptism | Royal Candle",
  gallery: "The Royal Gallery — Baptism Candles & Ceremonies | Royal Candle",
  story: "Our Story — The Baptism Candle Atelier | Royal Candle",
  faq: "Questions & Answers — Royal Candle",
  contact: "Contact the Atelier — Royal Candle",
  cart: "Your Cart — Royal Candle",
  checkout: "Checkout — Royal Candle",
  confirmation: "Order Confirmed — Royal Candle",
  boutique: "La Boutique — Candles & Keepsakes | Royal Candle",
  admin: "Atelier Manager — Royal Candle",
};

function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="fade-soft pointer-events-none fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 lg:bottom-8" role="status">
      <div className="flex items-center gap-3 border border-gold-soft bg-espresso px-5 py-3.5 text-ivory shadow-luxe">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-espresso">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        <p className="text-[13px] font-medium tracking-wide">{toast}</p>
      </div>
    </div>
  );
}

function Shell() {
  const { page } = useStore();

  useEffect(() => {
    document.title = TITLES[page] ?? TITLES.home;
  }, [page]);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <div className="grain-layer" aria-hidden="true" />
      <Header />
      {page === "home" && <Home />}
      {page === "create" && <Configurator />}
      {page === "baptism" && <Baptism />}
      {page === "gallery" && <Gallery />}
      {page === "story" && <Story />}
      {page === "faq" && <Faq />}
      {page === "contact" && <Contact />}
      {page === "cart" && <Cart />}
      {page === "checkout" && <Checkout />}
      {page === "confirmation" && <Confirmation />}
      {page === "boutique" && <Boutique />}
      {page === "admin" && <Admin />}
      <Footer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
