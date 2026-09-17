import { useEffect, useMemo, useState } from "react";
import {
  Boxes, CalendarDays, ChevronRight, CircleCheck, ClipboardCheck, FileText,
  Info, LayoutGrid, List, MapPin, Package, RotateCcw, Search, ShoppingCart,
  Trash2, Truck, X,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { initialOrders, type Order, type OrderItem, type StockLevel } from "@/lib/orders-data";

const steps = ["Pedido recibido", "Pedido en análisis", "En preparación", "Facturado", "Enviado"];
const stepIcons = [FileText, Search, Package, ClipboardCheck, Truck];
const exchangeRate = 1350;
type Currency = "ARS" | "USD";
type Modal = { kind: "detail" | "invoice" | "pending"; orderId: string; step?: number } | { kind: "pending"; orderId: null } | null;

const formatMoney = (amount: number, currency: Currency) =>
  currency === "USD"
    ? `u$s ${(amount / exchangeRate).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$ ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const pendingQuantity = (item: OrderItem) => Math.max(0, item.requestedQty - item.allocatedQty);
const pendingKey = (orderId: string, sku: string) => `${orderId}_${sku}`;
const dateForInput = (date: string) => {
  const [day, month, year] = date.split(" ")[0].split("/");
  return `${year}-${month}-${day}`;
};

function StatusBadge({ order }: { order: Order }) {
  const colors = [
    "border-sky-200 bg-sky-50 text-sky-700",
    "border-indigo-200 bg-indigo-50 text-indigo-700",
    "border-amber-200 bg-amber-50 text-amber-700",
    "border-cyan-200 bg-cyan-50 text-cyan-700",
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  ];
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${colors[order.timelineStep - 1]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{order.statusLabel}
  </span>;
}

function StockIndicator({ level = "empty" }: { level?: StockLevel }) {
  const color = { high: "bg-emerald-500", medium: "bg-amber-400", low: "bg-orange-500", empty: "bg-slate-200" }[level];
  const label = { high: "Alto", medium: "Medio", low: "Bajo", empty: "Sin stock" }[level];
  return <span title={label} aria-label={label} className={`block h-1.5 w-8 rounded-full ${color}`} />;
}

function ModalFrame({ title, subtitle, onClose, children, wide = false }: { title: string; subtitle?: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-label={title} className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
      <div className="flex shrink-0 items-start justify-between gap-4 bg-intercap-blue-dark px-5 py-4 text-white">
        <div><h2 className="text-base font-bold sm:text-lg">{title}</h2>{subtitle && <p className="mt-1 text-xs text-slate-300">{subtitle}</p>}</div>
        <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg p-1 text-slate-300 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
      </div>
      {children}
    </section>
  </div>;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(() => initialOrders.map(order => ({ ...order, items: order.items.map(item => ({ ...item })) })));
  const [search, setSearch] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [currency, setCurrency] = useState<Currency>("ARS");
  const [modal, setModal] = useState<Modal>(null);
  const [depotFilter, setDepotFilter] = useState("all");
  const [pendingSearch, setPendingSearch] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filtered = useMemo(() => orders.filter(order => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [order.id, order.shortNum, order.carrier, order.trackingNum, order.destiny, ...order.items.flatMap(item => [item.name, item.sku, item.subcode ?? ""])].some(value => value.toLowerCase().includes(query));
    const matchesNumber = !numberFilter || `${order.id} ${order.shortNum}`.toLowerCase().includes(numberFilter.trim().toLowerCase());
    return matchesSearch && matchesNumber && (!dateFilter || dateForInput(order.date) === dateFilter);
  }), [orders, search, numberFilter, dateFilter]);

  const allPending = useMemo(() => orders.flatMap(order => order.timelineStep >= 4
    ? order.items.filter(item => pendingQuantity(item) > 0 && !item.pendingAction).map(item => ({ order, item }))
    : []), [orders]);
  const totalPending = allPending.reduce((sum, { item }) => sum + pendingQuantity(item), 0);
  const activeOrder = modal?.orderId ? orders.find(order => order.id === modal.orderId) : undefined;
  const visiblePending = allPending.filter(({ order, item }) =>
    (!modal?.orderId || modal.orderId === order.id) &&
    (!pendingSearch || `${order.id} ${order.shortNum} ${item.sku} ${item.subcode ?? ""} ${item.name}`.toLowerCase().includes(pendingSearch.toLowerCase()))
  );
  const selectedPending = allPending.filter(({ order, item }) =>
    (!modal?.orderId || modal.orderId === order.id) && selected[pendingKey(order.id, item.sku)]
  );
  const selectedVisibleCount = visiblePending.filter(({ order, item }) => selected[pendingKey(order.id, item.sku)]).length;
  const selectedTotal = selectedPending.reduce((sum, { item }) => sum + pendingQuantity(item) * item.unitPriceARS, 0);

  const openStep = (order: Order, step: number) => {
    if (step > order.timelineStep) return;
    setDepotFilter("all");
    setModal({ kind: step === 4 ? "invoice" : "detail", orderId: order.id, step });
  };
  const openPending = (orderId: string | null) => {
    setPendingSearch("");
    setSelected({});
    setModal({ kind: "pending", orderId });
  };
  const updatePendingQuantity = (orderId: string, sku: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) return;
    setOrders(current => current.map(order => order.id !== orderId ? order : {
      ...order, items: order.items.map(item => item.sku !== sku ? item : { ...item, requestedQty: item.allocatedQty + quantity }),
    }));
    setNotice(`Cantidad no entregada actualizada a ${quantity} unidades.`);
  };
  const actOnSelected = (action: "cart" | "cancelled") => {
    if (!selectedPending.length) { setNotice("Seleccioná al menos un producto no entregado."); return; }
    const keys = new Set(selectedPending.map(({ order, item }) => pendingKey(order.id, item.sku)));
    setOrders(current => current.map(order => ({ ...order, items: order.items.map(item => keys.has(pendingKey(order.id, item.sku)) ? { ...item, pendingAction: action } : item) })));
    if (action === "cart") setCartCount(count => count + keys.size);
    setSelected({});
    setNotice(action === "cart"
      ? `${keys.size} producto${keys.size === 1 ? "" : "s"} agregado${keys.size === 1 ? "" : "s"} al carrito de esta demostración.`
      : `Solicitud de baja de ${keys.size} producto${keys.size === 1 ? "" : "s"} registrada en esta demostración.`);
    setModal(null);
  };

  return <div className="min-h-screen bg-intercap-bg pt-24 font-sans text-intercap-blue-dark">
    <Header />
    <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-intercap-blue-main">Mi cuenta / Pedidos</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Pedidos y Seguimiento</h1>
          <p className="mt-2 text-sm text-slate-600">Consultá el estado de tus pedidos, comprobantes y productos no entregados.</p>
        </div>
        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-brand-blue-700">Datos de ejemplo</span>
      </div>

      <section aria-label="Filtros de pedidos" className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-[190px] flex-1 text-xs font-bold text-slate-600">Buscar pedido, producto o guía
            <span className="relative mt-1.5 block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Código, SKU, transporte..." className="h-10 w-full rounded-lg border border-slate-300 pl-9 pr-3 text-sm font-medium text-intercap-blue-dark outline-none focus:border-intercap-blue-main focus:ring-2 focus:ring-intercap-blue-main/15" /></span>
          </label>
          <label className="text-xs font-bold text-slate-600">Número de pedido
            <input value={numberFilter} onChange={event => setNumberFilter(event.target.value)} placeholder="PED-2026..." className="mt-1.5 block h-10 w-full rounded-lg border border-slate-300 px-3 text-sm font-medium text-intercap-blue-dark outline-none focus:border-intercap-blue-main sm:w-44" />
          </label>
          <label className="text-xs font-bold text-slate-600">Fecha
            <input type="date" value={dateFilter} onChange={event => setDateFilter(event.target.value)} className="mt-1.5 block h-10 w-full rounded-lg border border-slate-300 px-3 text-sm font-medium text-intercap-blue-dark outline-none focus:border-intercap-blue-main sm:w-44" />
          </label>
          <button type="button" onClick={() => { setSearch(""); setNumberFilter(""); setDateFilter(""); }} className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-xs font-bold text-slate-600 hover:bg-slate-50"><RotateCcw className="h-4 w-4" />Limpiar</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-500">Mostrando <strong className="text-intercap-blue-dark">{filtered.length}</strong> de {orders.length} pedidos</span>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-slate-200 p-0.5" aria-label="Moneda">
              {(["ARS", "USD"] as const).map(value => <button key={value} type="button" onClick={() => setCurrency(value)} className={`rounded-md px-2.5 py-1.5 text-xs font-bold ${currency === value ? "bg-intercap-blue-dark text-white" : "text-slate-500 hover:bg-slate-50"}`}>{value}</button>)}
            </div>
            <div className="flex rounded-lg border border-slate-200 p-0.5" aria-label="Vista">
              <button type="button" onClick={() => setView("cards")} aria-label="Vista en tarjetas" aria-pressed={view === "cards"} className={`rounded-md p-1.5 ${view === "cards" ? "bg-intercap-blue-dark text-white" : "text-slate-500"}`}><LayoutGrid className="h-4 w-4" /></button>
              <button type="button" onClick={() => setView("table")} aria-label="Vista en tabla" aria-pressed={view === "table"} className={`rounded-md p-1.5 ${view === "table" ? "bg-intercap-blue-dark text-white" : "text-slate-500"}`}><List className="h-4 w-4" /></button>
            </div>
            <button type="button" onClick={() => openPending(null)} className="flex h-9 items-center gap-2 rounded-lg bg-amber-400 px-3 text-xs font-bold text-amber-950 transition hover:bg-amber-500"><Boxes className="h-4 w-4" />Productos no entregados<span className="rounded-full bg-amber-950 px-1.5 py-0.5 text-[10px] text-white">{totalPending} u.</span></button>
          </div>
        </div>
      </section>

      {!filtered.length ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">No hay pedidos que coincidan con los filtros.</div> : view === "cards" ?
        <div className="space-y-4">{filtered.map(order => <OrderCard key={order.id} order={order} currency={currency} onStep={step => openStep(order, step)} onPending={() => openPending(order.id)} />)}</div> :
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[900px] text-left text-xs"><thead className="bg-intercap-blue-dark text-white"><tr>{["Pedido / Fecha", "Sucursal destino", "Estado", "Transporte / Guía", "Bultos / Peso", "Monto", "Acciones"].map(label => <th key={label} className="px-4 py-3 font-bold">{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{filtered.map(order => <tr key={order.id} className="hover:bg-blue-50/40"><td className="px-4 py-4"><strong className="block text-intercap-blue-dark">{order.id}</strong><span className="text-slate-500">{order.date}</span></td><td className="px-4 py-4">{order.destiny}</td><td className="px-4 py-4"><StatusBadge order={order} /></td><td className="px-4 py-4">{order.carrier}<span className="block font-mono text-intercap-blue-main">{order.trackingNum}</span></td><td className="px-4 py-4">{order.bultos} bultos / {order.weightKg} kg</td><td className="px-4 py-4 font-bold">{formatMoney(order.totalARS, currency)}</td><td className="px-4 py-4"><div className="flex gap-2"><button type="button" onClick={() => openStep(order, order.timelineStep)} className="rounded-lg bg-intercap-blue-main px-2.5 py-1.5 font-bold text-white">Detalle</button><button type="button" onClick={() => openPending(order.id)} className="rounded-lg bg-amber-100 px-2.5 py-1.5 font-bold text-amber-800">No entregados</button></div></td></tr>)}</tbody></table></div>}

      {cartCount > 0 && <p className="mt-4 text-xs text-slate-500">{cartCount} producto{cartCount === 1 ? "" : "s"} enviado{cartCount === 1 ? "" : "s"} al carrito de esta demostración.</p>}
    </main>
    <Footer />
    {modal?.kind === "detail" && activeOrder && <DetailModal order={activeOrder} step={modal.step ?? activeOrder.timelineStep} currency={currency} depotFilter={depotFilter} onDepotFilter={setDepotFilter} onInvoice={() => setModal({ kind: "invoice", orderId: activeOrder.id, step: 4 })} onClose={() => setModal(null)} />}
    {modal?.kind === "invoice" && activeOrder && <InvoiceModal order={activeOrder} currency={currency} onClose={() => setModal(null)} />}
    {modal?.kind === "pending" && <ModalFrame title={modal.orderId ? `No entregados · ${modal.orderId}` : "Productos no entregados"} subtitle="Seleccioná artículos para agregarlos al carrito o solicitar su baja." wide onClose={() => setModal(null)}>
      <div className="overflow-y-auto p-4 sm:p-5">
        {!modal.orderId && <label className="mb-4 block max-w-sm text-xs font-bold text-slate-600">Buscar en todos los pedidos<input value={pendingSearch} onChange={event => setPendingSearch(event.target.value)} placeholder="Pedido, código o producto..." className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-intercap-blue-main" /></label>}
        <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[800px] text-left text-xs"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-3 py-3"><input type="checkbox" aria-label="Seleccionar todos los productos visibles" checked={visiblePending.length > 0 && selectedVisibleCount === visiblePending.length} onChange={event => setSelected(current => ({ ...current, ...Object.fromEntries(visiblePending.map(({ order, item }) => [pendingKey(order.id, item.sku), event.target.checked])) }))} /></th><th className="px-3 py-3">Código / Pedido</th><th className="px-3 py-3">Descripción</th><th className="px-3 py-3">Stock regional</th><th className="px-3 py-3">Sustituto</th><th className="px-3 py-3 text-center">No entregado</th><th className="px-3 py-3 text-right">Importe</th></tr></thead><tbody className="divide-y divide-slate-100">{visiblePending.map(({ order, item }) => <tr key={pendingKey(order.id, item.sku)} className="align-top"><td className="px-3 py-4"><input type="checkbox" aria-label={`Seleccionar ${item.name}`} checked={!!selected[pendingKey(order.id, item.sku)]} onChange={event => setSelected(current => ({ ...current, [pendingKey(order.id, item.sku)]: event.target.checked }))} /></td><td className="px-3 py-4 font-mono"><strong className="block">{item.sku}</strong><span className="block text-slate-500">{item.subcode}</span><span className="block text-intercap-blue-main">{order.shortNum}</span></td><td className="px-3 py-4 font-semibold">{item.name}</td><td className="px-3 py-4"><div className="flex gap-2">{(["noa", "nea", "bue", "cuy"] as const).map(region => <div key={region} className="text-center text-[9px] font-bold uppercase text-slate-500">{region}<StockIndicator level={item.stockRegional?.[region]} /></div>)}</div></td><td className="px-3 py-4">{item.substitute ? <details className="max-w-44 text-[11px]"><summary className="cursor-pointer font-bold text-intercap-blue-main">Ver sustituto</summary><p className="mt-1 text-slate-600">{item.substitute.name}<br />{item.substitute.stock}<br />{formatMoney(item.substitute.priceARS, currency)}</p></details> : <span className="text-slate-400">No disponible</span>}</td><td className="px-3 py-4 text-center"><input type="number" min={1} aria-label={`Cantidad no entregada de ${item.name}`} defaultValue={pendingQuantity(item)} onBlur={event => { const quantity = Number(event.currentTarget.value); if (Number.isInteger(quantity) && quantity >= 1) updatePendingQuantity(order.id, item.sku, quantity); else event.currentTarget.value = String(pendingQuantity(item)); }} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur(); }} className="w-16 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-center font-bold text-rose-700 outline-none focus:border-rose-400" /></td><td className="px-3 py-4 text-right font-bold">{formatMoney(pendingQuantity(item) * item.unitPriceARS, currency)}</td></tr>)}</tbody></table>{!visiblePending.length && <p className="p-8 text-center text-sm text-slate-500">No hay productos no entregados para mostrar.</p>}</div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:px-5"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => actOnSelected("cart")} className="inline-flex items-center gap-2 rounded-lg bg-intercap-blue-main px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-blue-700"><ShoppingCart className="h-4 w-4" />Agregar al carrito</button><button type="button" onClick={() => actOnSelected("cancelled")} className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-700"><Trash2 className="h-4 w-4" />Solicitar baja</button></div><span className="text-sm font-bold text-intercap-blue-dark">Seleccionado: {formatMoney(selectedTotal, currency)}</span></div>
    </ModalFrame>}
    {notice && <div role="status" className="fixed bottom-5 right-5 z-[80] flex max-w-sm items-start gap-3 rounded-xl bg-intercap-blue-dark px-4 py-3 text-sm font-medium text-white shadow-xl"><CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{notice}<button type="button" onClick={() => setNotice("")} aria-label="Cerrar aviso" className="ml-1 text-white/70"><X className="h-4 w-4" /></button></div>}
  </div>;
}

function OrderCard({ order, currency, onStep, onPending }: { order: Order; currency: Currency; onStep: (step: number) => void; onPending: () => void }) {
  const pending = order.timelineStep >= 4 ? order.items.filter(item => !item.pendingAction).reduce((sum, item) => sum + pendingQuantity(item), 0) : 0;
  return <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
      <div className="flex flex-wrap items-center gap-2.5"><span className="rounded-lg bg-intercap-blue-dark px-3 py-1.5 text-xs font-black tracking-wide text-white">{order.id}</span><span className="text-xs font-bold text-slate-500">{order.shortNum}</span><StatusBadge order={order} /></div>
      <span className="flex items-center gap-1.5 text-xs text-slate-500"><CalendarDays className="h-3.5 w-3.5" />{order.date} hs</span>
    </div>
    <div className="grid gap-5 pt-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="overflow-x-auto pb-2"><div className="relative flex min-w-[540px] justify-between px-4 pt-1"><div className="absolute left-9 right-9 top-4 h-1 rounded-full bg-slate-200"><div className="h-full rounded-full bg-intercap-blue-main" style={{ width: `${((order.timelineStep - 1) / 4) * 100}%` }} /></div>{steps.map((label, index) => { const step = index + 1; const Icon = stepIcons[index]; const reached = step <= order.timelineStep; const current = step === order.timelineStep; return <button key={label} type="button" onClick={() => onStep(step)} disabled={!reached} title={reached ? `Ver detalle: ${label}` : "Etapa pendiente"} className={`relative z-10 flex w-24 flex-col items-center gap-1 text-center ${reached ? "cursor-pointer" : "cursor-not-allowed opacity-45"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${current ? "border-intercap-blue-main bg-white text-intercap-blue-main ring-4 ring-blue-100" : reached ? "border-intercap-blue-main bg-intercap-blue-main text-white" : "border-slate-200 bg-white text-slate-300"}`}><Icon className="h-4 w-4" /></span><span className={`text-[10px] leading-tight ${current ? "font-black text-intercap-blue-main" : reached ? "font-bold text-slate-700" : "text-slate-400"}`}>{label}</span><span className="text-[9px] leading-tight text-slate-400">{order.timelineLogs[index]?.time ?? ""}</span></button>; })}</div></div>
      <div className="flex flex-col justify-between gap-3 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center xl:flex-col xl:items-stretch"><div className="min-w-0 text-xs"><p className="flex items-start gap-1.5 font-semibold text-slate-700"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-intercap-blue-main" />{order.destiny}</p><p className="mt-1 flex items-center gap-1.5 text-slate-500"><Truck className="h-3.5 w-3.5 shrink-0" />{order.carrier}</p><p className="mt-1 font-mono text-intercap-blue-main">Guía: {order.trackingNum}</p></div><div className="flex flex-wrap items-end justify-between gap-2"><strong className="text-sm font-black">{formatMoney(order.totalARS, currency)}</strong><button type="button" onClick={onPending} disabled={order.timelineStep < 4} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${pending > 0 ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "bg-slate-100 text-slate-500"}`}><Boxes className="h-3.5 w-3.5" />{pending > 0 ? `${pending} no entregados` : "Sin pendientes"}<ChevronRight className="h-3 w-3" /></button></div></div>
    </div>
  </article>;
}

function DetailModal({ order, step, currency, depotFilter, onDepotFilter, onInvoice, onClose }: { order: Order; step: number; currency: Currency; depotFilter: string; onDepotFilter: (value: string) => void; onInvoice: () => void; onClose: () => void }) {
  const depots = Array.from(new Set(order.items.map(item => item.fulfillmentDepot).filter((depot): depot is string => !!depot)));
  const items = order.items.filter(item => (step === 3 || !item.isPreviousPending) && (depotFilter === "all" || item.fulfillmentDepot === depotFilter));
  const heading = steps[step - 1];
  return <ModalFrame title={`${order.id} · ${heading}`} subtitle={`${order.date} hs · ${order.branch} · Cuenta corriente N° 4092`} wide onClose={onClose}>
    <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs sm:grid-cols-3"><div><span className="font-bold text-slate-500">Destino</span><p className="mt-1 font-semibold">{order.destiny}</p></div><div><span className="font-bold text-slate-500">Transporte</span><p className="mt-1 font-semibold">{order.carrier}</p></div><div><span className="font-bold text-slate-500">Guía</span><p className="mt-1 font-mono font-semibold text-intercap-blue-main">{order.trackingNum}</p></div></div>
      <div><h3 className="text-sm font-bold">Historial del pedido</h3><ol className="mt-3 space-y-2">{order.timelineLogs.slice(0, step).map((log, index) => <li key={log.time} className="flex gap-3 text-xs"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-intercap-blue-main">{index + 1}</span><span><strong className="text-intercap-blue-dark">{log.title}</strong><span className="ml-2 text-slate-400">{log.time}</span><span className="block text-slate-600">{log.desc}</span></span></li>)}</ol></div>
      {step === 5 ? <><div><h3 className="text-sm font-bold">Datos de reparto</h3><div className="mt-3 grid gap-3 rounded-xl border border-slate-200 p-4 text-xs sm:grid-cols-3">{[["Nro. reparto", order.id === "PED-2026-8842" ? "86566" : order.trackingNum.replace(/\D/g, "")], ["Fecha", order.date.split(" ")[0]], ["Remito", `RX0012-${order.id.split("-")[2]}`], ["Sucursal", order.branch], ["Dirección de entrega", order.destiny], ["Transporte", order.carrier], ["Bultos", String(order.bultos)], ["Peso", `${order.weightKg} kg`]].map(([label, value]) => <div key={label}><span className="font-semibold text-slate-500">{label}</span><p className="mt-1 font-bold">{value}</p></div>)}</div></div><p className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-brand-blue-700"><Info className="h-4 w-4" />Los datos informados son de carácter orientativo.</p></> : <>
        {step === 3 && order.isMultiDepot && <div><h3 className="text-sm font-bold">Preparación en varios depósitos</h3><div className="mt-3 grid gap-3 sm:grid-cols-2">{depots.map(depot => <button key={depot} type="button" onClick={() => onDepotFilter(depot)} className={`rounded-xl border p-4 text-left text-xs ${depotFilter === depot ? "border-intercap-blue-main bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 bg-white hover:border-blue-300"}`}><strong className="flex items-center gap-2 text-intercap-blue-dark"><Package className="h-4 w-4 text-intercap-blue-main" />{depot}</strong><span className="mt-1 block text-slate-600">{order.items.filter(item => item.fulfillmentDepot === depot).reduce((sum, item) => sum + item.requestedQty, 0)} unidades en preparación</span></button>)}</div></div>}
        <div><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-bold">{step === 3 ? "Ítems en preparación" : "Ítems del pedido"}</h3><div className="flex items-center gap-2">{depotFilter !== "all" && <button type="button" onClick={() => onDepotFilter("all")} className="text-xs font-bold text-intercap-blue-main">Ver todos los ítems</button>}<span className="text-xs text-slate-500">Precios en {currency}</span></div></div><div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[620px] text-left text-xs"><thead className="bg-slate-100 font-bold text-slate-600"><tr><th className="px-3 py-3">Código / Descripción</th><th className="px-3 py-3 text-center">Ped.</th>{step >= 3 && <th className="px-3 py-3 text-center">Asign.</th>}<th className="px-3 py-3 text-right">Precio unit.</th><th className="px-3 py-3 text-right">Subtotal</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map(item => <tr key={item.sku}><td className="px-3 py-3"><strong className="block font-mono">{item.sku}</strong><span className="block text-slate-600">{item.name}</span>{item.isPreviousPending && <span className="text-[10px] font-bold text-intercap-blue-main">Consolidado de {item.originOrder}</span>}</td><td className="px-3 py-3 text-center">{item.requestedQty}</td>{step >= 3 && <td className="px-3 py-3 text-center font-bold">{item.allocatedQty}</td>}<td className="px-3 py-3 text-right">{formatMoney(item.unitPriceARS, currency)}</td><td className="px-3 py-3 text-right font-bold">{formatMoney(item.requestedQty * item.unitPriceARS, currency)}</td></tr>)}</tbody></table></div></div>
      </>}
    </div>
    {step >= 4 && <div className="border-t border-slate-200 bg-slate-50 p-4 text-right"><button type="button" onClick={onInvoice} className="rounded-lg bg-intercap-blue-main px-4 py-2 text-xs font-bold text-white">Ver comprobante</button></div>}
  </ModalFrame>;
}

function InvoiceModal({ order, currency, onClose }: { order: Order; currency: Currency; onClose: () => void }) {
  const items = order.items.filter(item => !item.isPreviousPending || order.isMultiDepot);
  const subtotal = items.reduce((sum, item) => sum + item.allocatedQty * item.unitPriceARS, 0);
  return <ModalFrame title={`Comprobante · Factura A 0020-000${order.id.split("-")[2]}`} subtitle={`Pedido ${order.id} · ${order.date.split(" ")[0]}`} wide onClose={onClose}>
    <div className="space-y-5 overflow-y-auto p-5 sm:p-6"><div className="grid gap-3 text-xs sm:grid-cols-2"><p><strong>Cliente:</strong> HERRERA CRISTIAN FERNANDO</p><p><strong>Condición:</strong> {order.paymentTerms}</p></div><div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[680px] text-left text-xs"><thead className="bg-slate-100 text-slate-600"><tr>{["Código", "Descripción", "Cantidad", "Precio unit.", "Total"].map(label => <th key={label} className="px-3 py-3 font-bold">{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{items.map(item => <tr key={item.sku}><td className="px-3 py-3 font-mono">{item.sku}<span className="block text-slate-400">{item.subcode}</span></td><td className="px-3 py-3 font-semibold">{item.name}</td><td className="px-3 py-3">{item.allocatedQty}</td><td className="px-3 py-3">{formatMoney(item.unitPriceARS, currency)}</td><td className="px-3 py-3 font-bold">{formatMoney(item.allocatedQty * item.unitPriceARS, currency)}</td></tr>)}</tbody></table></div><div className="ml-auto max-w-xs space-y-2 rounded-xl bg-slate-50 p-4 text-xs"><div className="flex justify-between"><span>Subtotal</span><strong>{formatMoney(subtotal, currency)}</strong></div><div className="flex justify-between"><span>IVA 21%</span><strong>{formatMoney(subtotal * .21, currency)}</strong></div><div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black"><span>Total</span><span>{formatMoney(subtotal * 1.21, currency)}</span></div></div><p className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-brand-blue-700"><Info className="h-4 w-4" />Comprobante ilustrativo generado con los datos de ejemplo del simulador.</p></div>
  </ModalFrame>;
}
