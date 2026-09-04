import { MessageCircle } from "lucide-react";
import { Router as WouterRouter, Switch, Route, useLocation } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import AdminHome from "@/pages/admin-home";
import SellerHome from "@/pages/seller-home";
import Catalog from "@/pages/catalog";
import ProductDetail from "@/pages/product-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/admin" component={AdminHome} />
      <Route path="/vendedor" component={SellerHome} />
      <Route path="/catalogo" component={Catalog} />
      <Route path="/producto/:id" component={ProductDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function WhatsAppFloatButton() {
  const [location] = useLocation();
  const isCatalogView = location.startsWith("/catalogo");

  if (isCatalogView) return null;

  return (
    <a
      href="https://api.whatsapp.com/send?phone=5493482440801"
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.6} />
    </a>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <TooltipProvider>
      <WouterRouter base={base}>
        <Router />
        <WhatsAppFloatButton />
      </WouterRouter>
    </TooltipProvider>
  );
}

export default App;
