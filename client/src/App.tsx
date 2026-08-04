import { Router as WouterRouter, Switch, Route } from "wouter";
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

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <TooltipProvider>
      <WouterRouter base={base}>
        <Router />
      </WouterRouter>
    </TooltipProvider>
  );
}

export default App;
