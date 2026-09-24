import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle, Boxes, CalendarDays, ChevronRight, CircleCheck, ClipboardCheck, FileText,
  Info, Package, Search, ShoppingCart,
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
    <section role="dialog" aria-modal="true" aria-label={title} className={`orders-modal flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${wide ? "max-w-[1500px]" : "max-w-3xl"}`}>
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
  const [numberFilter, setNumberFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const currency: Currency = "ARS";
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
    const matchesNumber = !numberFilter || `${order.id} ${order.shortNum}`.toLowerCase().includes(numberFilter.trim().toLowerCase());
    return matchesNumber && (!dateFilter || dateForInput(order.date) === dateFilter);
  }), [orders, numberFilter, dateFilter]);

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
    setModal({ kind: "detail", orderId: order.id, step });
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

  return <div className="orders-page min-h-screen bg-intercap-bg pt-24 font-sans text-intercap-blue-dark">
    <Header />
    <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6">
      <section aria-label="Filtros de pedidos" className="orders-toolbar mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <input aria-label="Número de pedido" value={numberFilter} onChange={event => setNumberFilter(event.target.value)} placeholder="Número de pedido" className="h-8 w-full rounded-lg border border-slate-300 px-3 text-xs font-medium text-intercap-blue-dark outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 sm:w-40" />
          <input aria-label="Fecha" type="date" value={dateFilter} onChange={event => setDateFilter(event.target.value)} className="h-8 w-full rounded-lg border border-slate-300 px-3 text-xs font-medium text-intercap-blue-dark outline-none focus:border-intercap-blue-main sm:w-36" />
          <button type="button" className="flex h-8 items-center gap-1.5 rounded-lg bg-indigo-900 px-4 text-xs font-bold text-white transition hover:bg-indigo-800"><Search className="h-3.5 w-3.5" />Buscar</button>
          <span className="ml-auto text-xs font-medium text-slate-500">Mostrando <strong className="text-intercap-blue-dark">{filtered.length}</strong> registros</span>
          <button type="button" onClick={() => openPending(null)} className="flex h-8 items-center gap-2 rounded-lg bg-amber-400 px-3 text-xs font-bold text-amber-950 transition hover:bg-amber-500"><Boxes className="h-4 w-4" />Productos no entregados<span className="rounded-full bg-amber-950 px-1.5 py-0.5 text-[10px] text-white">{totalPending} u.</span></button>
        </div>
      </section>

      {!filtered.length ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">No hay pedidos que coincidan con los filtros.</div> :
        <div className="space-y-4">{filtered.map(order => <OrderCard key={order.id} order={order} onStep={step => openStep(order, step)} onPending={() => openPending(order.id)} />)}</div>}

      {cartCount > 0 && <p className="mt-4 text-xs text-slate-500">{cartCount} producto{cartCount === 1 ? "" : "s"} enviado{cartCount === 1 ? "" : "s"} al carrito de esta demostración.</p>}
    </main>
    <Footer />
    {modal?.kind === "detail" && activeOrder && <DetailModal order={activeOrder} step={modal.step ?? activeOrder.timelineStep} currency={currency} depotFilter={depotFilter} onDepotFilter={setDepotFilter} onClose={() => setModal(null)} />}
    {modal?.kind === "invoice" && activeOrder && <InvoiceModal order={activeOrder} currency={currency} onClose={() => setModal(null)} />}
    {modal?.kind === "pending" && <ModalFrame title={modal.orderId ? `No entregados · ${modal.orderId}` : "Productos no entregados"} subtitle="Seleccioná artículos para agregarlos al carrito o solicitar su baja." wide onClose={() => setModal(null)}>
      <div className="overflow-y-auto p-4 sm:p-5">
        {!modal.orderId && <label className="mb-4 block max-w-sm text-xs font-bold text-slate-600">Buscar en todos los pedidos<input value={pendingSearch} onChange={event => setPendingSearch(event.target.value)} placeholder="Pedido, código o producto..." className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-intercap-blue-main" /></label>}
        <div className="overflow-x-auto rounded-xl border border-slate-200 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><table className="w-full min-w-[1400px] table-fixed text-left text-xs"><colgroup><col className="w-[3%]" /><col className="w-[13%]" /><col className="w-[38%]" /><col className="w-[14%]" /><col className="w-[12%]" /><col className="w-[9%]" /><col className="w-[11%]" /></colgroup><thead className="bg-slate-50 text-slate-600"><tr><th className="px-3 py-3"><input type="checkbox" aria-label="Seleccionar todos los productos visibles" checked={visiblePending.length > 0 && selectedVisibleCount === visiblePending.length} onChange={event => setSelected(current => ({ ...current, ...Object.fromEntries(visiblePending.map(({ order, item }) => [pendingKey(order.id, item.sku), event.target.checked])) }))} /></th><th className="whitespace-nowrap px-3 py-3">Código</th><th className="whitespace-nowrap px-3 py-3">Descripción</th><th className="whitespace-nowrap px-3 py-3">Stock regional</th><th className="whitespace-nowrap px-3 py-3">Sustituto</th><th className="whitespace-nowrap px-3 py-3 text-center">No entregado</th><th className="whitespace-nowrap px-3 py-3 text-right">Importe</th></tr></thead><tbody className="divide-y divide-slate-100">{visiblePending.map(({ order, item }) => <tr key={pendingKey(order.id, item.sku)} className="align-middle"><td className="px-3 py-4"><input type="checkbox" aria-label={`Seleccionar ${item.name}`} checked={!!selected[pendingKey(order.id, item.sku)]} onChange={event => setSelected(current => ({ ...current, [pendingKey(order.id, item.sku)]: event.target.checked }))} /></td><td className="whitespace-nowrap px-3 py-4 font-mono"><strong className="block">{item.sku}</strong>{item.subcode && <span className="block text-slate-500">{item.subcode}</span>}</td><td className="whitespace-normal break-words px-3 py-4 font-semibold leading-5">{item.name}</td><td className="px-3 py-4"><div className="flex gap-2">{(["noa", "nea", "bue", "cuy"] as const).map(region => <div key={region} className="text-center text-[9px] font-bold uppercase text-slate-500">{region}<StockIndicator level={item.stockRegional?.[region]} /></div>)}</div></td><td className="whitespace-nowrap px-3 py-4">{item.substitute ? <details className="text-[11px]"><summary className="cursor-pointer whitespace-nowrap font-bold text-intercap-blue-main">Ver sustituto</summary><p className="mt-1 text-slate-600">{item.substitute.name}<br />{item.substitute.stock}<br />{formatMoney(item.substitute.priceARS, currency)}</p></details> : <span className="whitespace-nowrap text-slate-400">No disponible</span>}</td><td className="whitespace-nowrap px-3 py-4 text-center"><input type="number" min={1} aria-label={`Cantidad no entregada de ${item.name}`} defaultValue={pendingQuantity(item)} onBlur={event => { const quantity = Number(event.currentTarget.value); if (Number.isInteger(quantity) && quantity >= 1) updatePendingQuantity(order.id, item.sku, quantity); else event.currentTarget.value = String(pendingQuantity(item)); }} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur(); }} className="w-16 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-center font-bold text-rose-700 outline-none focus:border-rose-400" /></td><td className="whitespace-nowrap px-3 py-4 text-right font-bold">{formatMoney(pendingQuantity(item) * item.unitPriceARS, currency)}</td></tr>)}</tbody></table>{!visiblePending.length && <p className="p-8 text-center text-sm text-slate-500">No hay productos no entregados para mostrar.</p>}</div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:px-5"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => actOnSelected("cart")} className="inline-flex items-center gap-2 rounded-lg bg-intercap-blue-main px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-blue-700"><ShoppingCart className="h-4 w-4" />Agregar al carrito</button><button type="button" onClick={() => actOnSelected("cancelled")} className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-700"><Trash2 className="h-4 w-4" />Solicitar baja</button></div><span className="text-sm font-bold text-intercap-blue-dark">Seleccionado: {formatMoney(selectedTotal, currency)}</span></div>
    </ModalFrame>}
    {notice && <div role="status" className="fixed bottom-5 right-5 z-[80] flex max-w-sm items-start gap-3 rounded-xl bg-intercap-blue-dark px-4 py-3 text-sm font-medium text-white shadow-xl"><CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{notice}<button type="button" onClick={() => setNotice("")} aria-label="Cerrar aviso" className="ml-1 text-white/70"><X className="h-4 w-4" /></button></div>}
  </div>;
}

function OrderCard({ order, onStep, onPending }: { order: Order; onStep: (step: number) => void; onPending: () => void }) {
  const pending = order.timelineStep >= 4 ? order.items.filter(item => !item.pendingAction).reduce((sum, item) => sum + pendingQuantity(item), 0) : 0;
  const hasMultipleDepots = new Set(order.items.map(item => item.fulfillmentDepot).filter(Boolean)).size > 1;
  return <article className="order-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
    <div className="grid items-center gap-5 xl:grid-cols-[330px_minmax(0,1fr)_auto]">
      <div className="flex flex-wrap items-center gap-2.5 xl:border-r xl:border-slate-100 xl:pr-5">
        <span className="rounded-lg bg-intercap-blue-dark px-3 py-1.5 text-xs font-black tracking-wide text-white">{order.id}</span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-slate-500"><CalendarDays className="h-3.5 w-3.5 text-intercap-blue-main" />{order.date.split(" ")[0]}</span>
        <StatusBadge order={order} />
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="relative flex min-w-[650px] justify-between px-4 pt-1">
          <div className="absolute left-9 right-9 top-4 h-1 rounded-full bg-slate-200"><div className="h-full rounded-full bg-intercap-blue-main" style={{ width: `${((order.timelineStep - 1) / 4) * 100}%` }} /></div>
          {steps.map((label, index) => {
            const step = index + 1;
            const Icon = stepIcons[index];
            const reached = step <= order.timelineStep;
            const current = step === order.timelineStep;
            const hasTwoInvoices = ["PED-2026-8842", "PED-2026-8850"].includes(order.id) && step === 4;
            const showMultipleDepots = hasMultipleDepots && step === 3;
            const showMultipleShipments = (order.shipments?.length ?? 0) > 1 && step === 5;
            return <button key={label} type="button" onClick={() => onStep(step)} disabled={!reached} title={hasTwoInvoices ? "Ver las 2 facturas" : reached ? `Ver detalle: ${label}` : "Etapa pendiente"} className={`relative z-10 flex w-24 flex-col items-center gap-1 text-center ${reached ? "cursor-pointer" : "cursor-not-allowed opacity-45"}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${current ? "active-order-step border-intercap-blue-main bg-white text-intercap-blue-main ring-4 ring-blue-100" : reached ? "border-intercap-blue-main bg-intercap-blue-main text-white" : "border-slate-200 bg-white text-slate-300"}`}><Icon className="h-4 w-4" /></span>
              <span className={`text-[10px] leading-tight ${current ? "font-black text-intercap-blue-main" : reached ? "font-bold text-slate-700" : "text-slate-400"}`}>{label}</span>
              {showMultipleDepots && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700">En varios depósitos</span>}
              {hasTwoInvoices && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700">2 facturas</span>}
              {showMultipleShipments && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700">2 repartos</span>}
            </button>;
          })}
        </div>
      </div>

      <button type="button" onClick={onPending} disabled={order.timelineStep < 4} className={`inline-flex justify-self-start items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold xl:justify-self-end ${pending > 0 ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "bg-slate-100 text-slate-500"}`}><Boxes className="h-3.5 w-3.5" />{pending > 0 ? `${pending} no entregados` : "Sin pendientes"}<ChevronRight className="h-3 w-3" /></button>
    </div>
  </article>;
}

function DetailModal({ order, step, currency, depotFilter, onDepotFilter, onClose }: { order: Order; step: number; currency: Currency; depotFilter: string; onDepotFilter: (value: string) => void; onClose: () => void }) {
  const depots = Array.from(new Set(order.items.map(item => item.fulfillmentDepot).filter((depot): depot is string => !!depot)));
  const items = order.items.filter(item => (step === 3 || !item.isPreviousPending) && (depotFilter === "all" || item.fulfillmentDepot === depotFilter));
  const totalWithVat = items.reduce((sum, item) => sum + item.requestedQty * item.unitPriceARS, 0) * 1.21;
  const heading = steps[step - 1];
  return <ModalFrame title={heading} wide onClose={onClose}>
    {step === 1 ? <ReceivedOrderContent order={order} currency={currency} /> : step === 4 ? <InvoicedOrderContent order={order} currency={currency} /> : <>
    <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
      {step === 2 ? <OrderSummary order={order} /> : step !== 3 && step !== 5 && <>
        <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs sm:grid-cols-3"><div><span className="font-bold text-slate-500">Destino</span><p className="mt-1 font-semibold">{order.destiny}</p></div><div><span className="font-bold text-slate-500">Transporte</span><p className="mt-1 font-semibold">{order.carrier}</p></div><div><span className="font-bold text-slate-500">Guía</span><p className="mt-1 font-mono font-semibold text-intercap-blue-main">{order.trackingNum}</p></div></div>
        <div><h3 className="text-sm font-bold">Historial del pedido</h3><ol className="mt-3 space-y-2">{order.timelineLogs.slice(0, step).map((log, index) => <li key={log.time} className="flex gap-3 text-xs"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-intercap-blue-main">{index + 1}</span><span><strong className="text-intercap-blue-dark">{log.title}</strong><span className="ml-2 text-slate-400">{log.time}</span><span className="block text-slate-600">{log.desc}</span></span></li>)}</ol></div>
      </>}
      {step === 5 ? <><div><h3 className="text-sm font-bold">Datos de reparto</h3>{order.shipments?.length ? <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[900px] table-fixed text-left text-xs"><colgroup><col className="w-[10%]" /><col className="w-[13%]" /><col className="w-[15%]" /><col className="w-[12%]" /><col className="w-[22%]" /><col className="w-[22%]" /><col className="w-[6%]" /></colgroup><thead className="bg-slate-100 text-[10px] font-black uppercase text-slate-600"><tr>{["Nro. reparto", "Fecha", "Remito", "Sucursal", "Dirección de entrega", "Transporte", "Bultos"].map(label => <th key={label} className="border-r border-slate-200 px-3 py-3 last:border-r-0">{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-200">{order.shipments.map(shipment => <tr key={shipment.distributionNumber} className="align-middle"><td className="border-r border-slate-200 px-3 py-4 text-center font-bold">{shipment.distributionNumber}</td><td className="border-r border-slate-200 px-3 py-4 text-center">{shipment.date}</td><td className="border-r border-slate-200 px-3 py-4 text-center font-mono">{shipment.deliveryNote}</td><td className="border-r border-slate-200 px-3 py-4">{shipment.branch}</td><td className="border-r border-slate-200 px-3 py-4 font-semibold">{shipment.address}</td><td className="border-r border-slate-200 px-3 py-4 font-semibold">{shipment.carrier}</td><td className="px-3 py-4 text-center font-bold">{shipment.packages}</td></tr>)}</tbody></table></div> : <div className="mt-3 grid gap-3 rounded-xl border border-slate-200 p-4 text-xs sm:grid-cols-3">{[["Nro. reparto", order.id === "PED-2026-8842" ? "86566" : order.trackingNum.replace(/\D/g, "")], ["Fecha", order.date.split(" ")[0]], ["Remito", `RX0012-${order.id.split("-")[2]}`], ["Sucursal", order.branch], ["Dirección de entrega", order.destiny], ["Transporte", order.carrier], ["Bultos", String(order.bultos)], ["Peso", `${order.weightKg} kg`]].map(([label, value]) => <div key={label}><span className="font-semibold text-slate-500">{label}</span><p className="mt-1 font-bold">{value}</p></div>)}</div>}</div><p className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-brand-blue-700"><Info className="h-4 w-4" />Los datos informados son de carácter orientativo.</p></> : <>
        {step === 3 && depots.length > 0 && <div><h3 className="text-sm font-bold">{depots.length > 1 ? "Preparación en varios depósitos" : "Preparación en depósito"}</h3><div className={`mt-3 grid gap-3 ${depots.length > 1 ? "sm:grid-cols-2" : ""}`}>{depots.map((depot, index) => <button key={depot} type="button" onClick={() => onDepotFilter(depot)} className={`rounded-xl border p-4 text-left text-xs transition ${index % 2 === 0 ? "border-sky-200 bg-sky-50 hover:border-sky-400" : "border-amber-200 bg-amber-50 hover:border-amber-400"} ${depotFilter === depot ? "ring-2 ring-intercap-blue-main/25" : ""}`}><strong className="flex items-center gap-2 text-intercap-blue-dark"><Package className={`h-4 w-4 ${index % 2 === 0 ? "text-sky-600" : "text-amber-600"}`} />{depot}</strong><span className="mt-1 block text-slate-600">{order.items.filter(item => item.fulfillmentDepot === depot).reduce((sum, item) => sum + item.requestedQty, 0)} unidades en preparación</span></button>)}</div></div>}
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold">{step === 3 ? "Ítems en preparación" : "Ítems del pedido"}</h3>
            <div className="flex items-center gap-2">
              {depotFilter !== "all" && <button type="button" onClick={() => onDepotFilter("all")} className="text-xs font-bold text-intercap-blue-main">Ver todos los ítems</button>}
              <span className="text-xs text-slate-500">Precios en {currency}</span>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[900px] table-fixed text-left text-xs">
              <colgroup>
                <col className="w-[16%]" /><col className="w-[39%]" /><col className="w-[10%]" /><col className="w-[17.5%]" /><col className="w-[17.5%]" />
              </colgroup>
              <thead className="bg-slate-100 font-bold text-slate-600">
                <tr>
                  <th className="px-3 py-3">Código</th>
                  <th className="px-3 py-3">Descripción</th>
                  <th className="whitespace-nowrap px-3 py-3 text-center">Cantidad</th>
                  <th className="whitespace-nowrap px-3 py-3 text-right">Precio unitario</th>
                  <th className="whitespace-nowrap px-3 py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => <tr key={item.sku} className="align-middle">
                  <td className="px-3 py-3 font-mono font-semibold">{item.sku}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{item.name}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">{item.requestedQty}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">{formatMoney(item.unitPriceARS, currency)}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right font-bold">{formatMoney(item.requestedQty * item.unitPriceARS, currency)}</td>
                </tr>)}
              </tbody>
              {step === 2 && <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td colSpan={4} className="px-3 py-3 text-right text-xs font-bold text-slate-600">Total con IVA (21%):</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right text-sm font-black text-intercap-blue-main">{formatMoney(totalWithVat, currency)}</td>
                </tr>
              </tfoot>}
            </table>
          </div>
        </div>
      </>}
    </div>
    </>}
  </ModalFrame>;
}

function ReceivedOrderContent({ order, currency }: { order: Order; currency: Currency }) {
  const items = order.items.filter(item => !item.isPreviousPending);
  const total = items.reduce((sum, item) => sum + item.requestedQty * item.unitPriceARS, 0);

  return <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
    <div>
      <h3 className="text-sm font-bold text-intercap-blue-dark">Presupuesto</h3>
      <div className="mt-3"><OrderSummary order={order} /></div>
    </div>

    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[900px] table-fixed text-left text-xs">
        <colgroup><col className="w-[20%]" /><col className="w-[43%]" /><col className="w-[12%]" /><col className="w-[10%]" /><col className="w-[15%]" /></colgroup>
        <thead className="bg-slate-100 font-bold text-slate-600"><tr><th className="px-3 py-3">Código</th><th className="px-3 py-3">Descripción</th><th className="whitespace-nowrap px-3 py-3">Presentación</th><th className="whitespace-nowrap px-3 py-3 text-center">Cantidad</th><th className="whitespace-nowrap px-3 py-3 text-right">Precio unitario</th></tr></thead>
        <tbody className="divide-y divide-slate-100">{items.map(item => <tr key={item.sku} className="align-middle"><td className="px-3 py-3 font-mono"><strong className="block">{item.sku}</strong>{item.subcode && <span className="block text-slate-400">({item.subcode})</span>}</td><td className="px-3 py-3 font-semibold text-slate-700">{item.name}</td><td className="whitespace-nowrap px-3 py-3">{item.presentation ?? "Uni 1 Uni"}</td><td className="whitespace-nowrap px-3 py-3 text-center">{item.requestedQty}</td><td className="whitespace-nowrap px-3 py-3 text-right font-semibold">{formatMoney(item.unitPriceARS, currency)}</td></tr>)}</tbody>
      </table>
    </div>

    <div className="flex justify-end rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"><span className="mr-2 text-slate-500">Importe total:</span><strong>{formatMoney(total, currency)}</strong></div>
    <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800"><AlertTriangle className="h-4 w-4 shrink-0" /><span>El importe total a facturar puede estar sujeto a percepciones u otros impuestos.</span></div>
    <div className="flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-700"><Info className="h-4 w-4 shrink-0" /><span>Los precios están expresados en pesos y con I.V.A. incluido.</span></div>
  </div>;
}

function OrderSummary({ order }: { order: Order }) {
  return <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs lg:grid-cols-[1fr_1.4fr]">
    <dl className="grid grid-cols-[110px_1fr] content-start gap-x-4 gap-y-3">
      <dt className="font-semibold text-slate-500">Nro. pedido</dt><dd className="font-bold">{order.id}</dd>
      <dt className="font-semibold text-slate-500">Fecha</dt><dd className="font-bold">{order.date.split(" ")[0]}</dd>
      <dt className="font-semibold text-slate-500">Cliente</dt><dd className="font-bold">{order.customerName ?? "Cliente Para Operaciones de Contado"}</dd>
      <dt className="font-semibold text-slate-500">Dirección de entrega</dt><dd className="font-bold">Dirección 2 Test - (3560) RECONQUISTA - Santa Fe</dd>
    </dl>
    <label className="font-semibold text-slate-600">Notas
      <textarea aria-label="Notas del pedido" className="mt-1.5 block h-24 w-full resize-none rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal text-intercap-blue-dark outline-none transition focus:border-intercap-blue-main focus:ring-2 focus:ring-blue-100" />
    </label>
  </div>;
}

function InvoicedOrderContent({ order, currency }: { order: Order; currency: Currency }) {
  const simulatedInvoices = [
    {
      type: "Factura A 0020", number: "0020-00075892", date: "21/09/2026",
      subtotal: 593995.32, perception: 14849.88, iva: 124739.02, total: 733584.22,
      items: [
        { code: "001001150001", subcode: "HDMA001-1", description: "2.25-17 38L REINF TT HDMA001-1", quantity: 10, unitPrice: 13047.35, total: 130473.54 },
        { code: "001001200009", subcode: "3MCY81186BEC11 EUROG", description: "100/80-16 M/C 50P TL BEE CONNECT FRONT/REAR EUROGRIP", quantity: 1, unitPrice: 50111.89, total: 50111.89, selectedOrderItem: true },
        { code: "001001230010", subcode: "1012200", description: "120/90-17 M/C 64S TOURANCE", quantity: 1, unitPrice: 176517.92, total: 176517.92 },
        { code: "005005220016", subcode: "HD30", description: "KIT CILINDRO MOTEGI ALUMINIO HONDA CG125 TITAN 2000 (D.56.5MM-PERNO 15MM)", quantity: 4, unitPrice: 29626.98, total: 118507.93 },
      ],
    },
    {
      type: "Factura A 0032", number: "0032-00035290", date: "23/09/2026",
      subtotal: 454575.22, perception: 11364.38, iva: 95460.80, total: 561400.40,
      items: [
        { code: "001001150032", subcode: "HDMA069", description: "4.10-18 66L REINF TT HDMA069", quantity: 1, unitPrice: 41085.27, total: 41085.27 },
        { code: "001001160003", subcode: "HD-565", description: "110/70-17 54S TL HD-565 CELIMO", quantity: 1, unitPrice: 39208.86, total: 39208.86 },
        { code: "001001200002", subcode: "3MCY9056717532", description: "150/60ZR17 M/C 66W TL PROTORQ EXTREME HR REAR EUROGRIP", quantity: 1, unitPrice: 97067.14, total: 97067.14, selectedOrderItem: true },
        { code: "001001200027", subcode: "3MCY81378RHD11", description: "130/70-18 M/C 63H TL ROADHOUND REAR EUROGRIP", quantity: 2, unitPrice: 111784.86, total: 223569.72 },
      ],
    },
  ];
  const newOrderInvoices = [
    {
      type: "Factura A 0018", number: "0018-00108525", date: "10/08/2026", subtotal: 434238.17, perception: 10855.95, iva: 91190.02, total: 536284.14,
      items: [
        { code: "001001010414", subcode: "2706300", description: "100/90-18 M/C 56P TL SUPER CITY REAR", presentation: "Uni 1 Uni", quantity: 2, unitPrice: 88536.82, total: 177073.63, selectedOrderItem: true },
        { code: "007001020102", subcode: "890087", description: "BUJIA NGK JAPON CR7HIX (IRIDIUM)", presentation: "Caj 1 Uni", quantity: 6, unitPrice: 7215.27, total: 43291.64 },
        { code: "018004130003", subcode: "", description: "GUANTES RADIKAL RIDE WINTER ROJO TALLE L", presentation: "Uni 1 Uni", quantity: 1, unitPrice: 27309.09, total: 27309.09 },
        { code: "018007130003", subcode: "", description: "CAMPERA RADIKAL CONCEPT NEGRO TALLE L", presentation: "Uni 1 Uni", quantity: 2, unitPrice: 76260.23, total: 152520.46 },
        { code: "028007060011", subcode: "BS2251", description: "TRABA PISTON ROSCA DE 12MM DE ALTA RESISTENCIA BIKE SERVICE", presentation: "Bol 1 Uni", quantity: 1, unitPrice: 7815.35, total: 7815.35 },
        { code: "FACT0002", subcode: "", description: "Fast Tucumán", presentation: "Uni 1 Uni", quantity: 1, unitPrice: 26228, total: 26228 },
      ],
    },
    {
      type: "Factura A 0021", number: "0021-00149756", date: "10/08/2026", subtotal: 224109.61, perception: 5602.74, iva: 47063.02, total: 276775.37,
      items: [
        { code: "001001270005", subcode: "UB-311", description: "2.75-17 47P TT UB-311 MONSTER DURTEC TIRES", presentation: "Uni 1 Uni", quantity: 2, unitPrice: 17849.81, total: 35699.62, selectedOrderItem: true },
        { code: "001001270010", subcode: "UB-311", description: "2.75-18 48P TT UB-311 MONSTER DURTEC TIRES", presentation: "Uni 1 Uni", quantity: 2, unitPrice: 18594.85, total: 37189.69, selectedOrderItem: true },
        { code: "001001270015", subcode: "UB-311", description: "3.00-18 52P TT UB-311 MONSTER DURTEC TIRES", presentation: "Uni 1 Uni", quantity: 2, unitPrice: 22288.98, total: 44577.95, selectedOrderItem: true },
        { code: "005036290004", subcode: "S4V0210200062", description: "FILTRO DE AIRE VEDAMOTORS HONDA XRE 300", presentation: "Uni 1 Uni", quantity: 2, unitPrice: 4436.67, total: 8873.33, selectedOrderItem: true },
        { code: "018004130034", subcode: "", description: "GUANTES RADIKAL RIDE FUSE AMARILLO TALLE XL", presentation: "Uni 1 Uni", quantity: 2, unitPrice: 21427.31, total: 42854.62, selectedOrderItem: true },
        { code: "020007010038", subcode: "3019", description: "3019 (VA x 3031-3038-3042-3040-3025-3029-3027-3034) BOBINA ALIM. ENCENDIDO GILERA SMASH/FUTURA 110/ZANELLA ZB 110/SWING/MOTOMEL BIT 110 (VARIAS 110 CC)", presentation: "Caj 1 Uni", quantity: 2, unitPrice: 9125.42, total: 18250.85, selectedOrderItem: true },
        { code: "028005060008", subcode: "BS2462", description: "EXTRACTOR DE VOLANTE MAGNETICO M26 x P1.0 BIKE SERVICE CON BOLILLA ANTIFRICCION", presentation: "Bol 1 Uni", quantity: 2, unitPrice: 18331.78, total: 36663.55, selectedOrderItem: true },
        { code: "VAR0001", subcode: "", description: "Flete cargo Intercap", presentation: "Uni 1 Uni", quantity: 1, unitPrice: 0, total: 0 },
      ],
    },
  ];
  const invoices = order.id === "PED-2026-8850" ? newOrderInvoices : order.id === "PED-2026-8842" ? simulatedInvoices : simulatedInvoices.slice(0, 1);
  const [activeTab, setActiveTab] = useState(0);
  const invoice = invoices[activeTab];

  return <div className="space-y-4 overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-5">
    <div className="flex gap-1 overflow-x-auto border-b border-slate-300 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Comprobantes del pedido">
      {invoices.map((item, index) => <button key={item.number} type="button" role="tab" aria-selected={activeTab === index} onClick={() => setActiveTab(index)} className={`-mb-px shrink-0 rounded-t-xl border px-5 py-3 text-xs font-bold transition sm:text-sm ${activeTab === index ? "border-slate-300 border-b-white bg-white text-intercap-blue-dark" : "border-transparent bg-slate-100 text-slate-500 hover:border-slate-200 hover:text-intercap-blue-main"}`}>Comprobante - {item.type.replace("Factura A", 'Factura "A"')}</button>)}
    </div>

    <div className="grid gap-5 px-1 text-xs lg:grid-cols-[1fr_1fr]">
      <dl className="grid grid-cols-[110px_1fr] content-start gap-x-3 gap-y-2">
        <dt className="font-bold text-slate-500">Comprobante:</dt><dd className="font-mono font-bold text-intercap-blue-dark">{invoice.number}</dd>
        <dt className="font-bold text-slate-500">Nro. pedido:</dt><dd className="font-bold text-intercap-blue-dark">{order.id}</dd>
        <dt className="font-bold text-slate-500">Fecha:</dt><dd className="font-medium text-slate-700">{invoice.date}</dd>
        <dt className="font-bold text-slate-500">Cliente:</dt><dd className="font-bold text-slate-700">{order.customerName ?? "INTERFLOORING SA"}</dd>
        <dt className="font-bold text-slate-500">Dirección:</dt><dd className="font-medium text-slate-700">Dirección 2 Test - (3560) RECONQUISTA - Santa Fe</dd>
      </dl>
      <label className="font-bold text-slate-500">Notas:
        <textarea aria-label="Notas del comprobante" placeholder="Observaciones de la factura..." className="mt-1.5 block h-20 w-full resize-none rounded-md border border-slate-300 bg-white p-3 text-sm font-normal text-intercap-blue-dark outline-none transition placeholder:text-slate-400 focus:border-intercap-blue-main focus:ring-2 focus:ring-blue-100" />
      </label>
    </div>

    <div className="overflow-x-auto rounded-md border border-slate-300"><table className="w-full min-w-[900px] table-fixed text-left text-xs"><colgroup><col className="w-[15%]" /><col className="w-[42%]" /><col className="w-[11%]" /><col className="w-[8%]" /><col className="w-[12%]" /><col className="w-[12%]" /></colgroup><thead className="bg-slate-100 text-[10px] font-black uppercase text-slate-600"><tr><th className="border-r border-slate-300 px-3 py-3">Código</th><th className="border-r border-slate-300 px-3 py-3">Descripción</th><th className="whitespace-nowrap border-r border-slate-300 px-3 py-3 text-center">Presentación</th><th className="whitespace-nowrap border-r border-slate-300 px-3 py-3 text-center">Cantidad</th><th className="whitespace-nowrap border-r border-slate-300 px-3 py-3 text-right">Precio unitario</th><th className="whitespace-nowrap px-3 py-3 text-right">Total</th></tr></thead><tbody className="divide-y divide-slate-200">{invoice.items.map(item => <tr key={item.code} className="align-middle"><td className="border-r border-slate-200 px-3 py-3 font-mono"><strong className="block">{item.selectedOrderItem && <span className="mr-1 text-intercap-blue-main">*</span>}{item.code}</strong>{item.subcode && <span className="block text-slate-400">({item.subcode})</span>}</td><td className="border-r border-slate-200 px-3 py-3 font-semibold text-slate-700">{item.description}</td><td className="whitespace-nowrap border-r border-slate-200 px-3 py-3 text-center">{(item as { presentation?: string }).presentation ?? "Uni 1 Uni"}</td><td className="whitespace-nowrap border-r border-slate-200 px-3 py-3 text-center">{item.quantity}</td><td className="whitespace-nowrap border-r border-slate-200 px-3 py-3 text-right">{formatMoney(item.unitPrice, currency)}</td><td className="whitespace-nowrap px-3 py-3 text-right font-bold">{formatMoney(item.total, currency)}</td></tr>)}</tbody></table></div>

    <div className="rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-right text-xs"><span className="mr-1 font-semibold">Sub-total:</span><strong className="text-sm">{formatMoney(invoice.subtotal, currency)}</strong></div>
    <div className="grid gap-4 text-xs md:grid-cols-3">
      <div className="rounded-md border border-slate-300 p-2"><h4 className="px-1 pb-2 font-bold text-slate-700">Percepciones</h4><div className="flex min-h-12 items-center justify-between rounded bg-slate-50 px-3 py-2"><span>Percepción I.B. Tucumán</span><strong>{formatMoney(invoice.perception, currency)}</strong></div></div>
      <div className="rounded-md border border-slate-300 p-2"><h4 className="px-1 pb-2 font-bold text-slate-700">Impuestos</h4><div className="flex min-h-12 items-center justify-between rounded bg-slate-50 px-3 py-2"><span>IVA tasa general 21%</span><strong>{formatMoney(invoice.iva, currency)}</strong></div></div>
      <div className="rounded-md border border-slate-300 p-2"><h4 className="px-1 pb-2 font-bold text-slate-700">Totales</h4><div className="flex min-h-12 items-center justify-between rounded bg-slate-50 px-3 py-2 text-sm"><strong>Totales</strong><strong className="text-base text-intercap-blue-dark">{formatMoney(invoice.total, currency)}</strong></div></div>
    </div>
    <p className="text-xs font-medium text-slate-600"><span className="mr-1 font-black text-intercap-blue-main">*</span>Ítem correspondiente al pedido seleccionado.</p>
    <p className="flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-700"><Info className="h-4 w-4 shrink-0" />Los datos informados son de carácter orientativo.</p>
  </div>;
}

function InvoiceModal({ order, currency, onClose }: { order: Order; currency: Currency; onClose: () => void }) {
  const items = order.items.filter(item => !item.isPreviousPending || order.isMultiDepot);
  const subtotal = items.reduce((sum, item) => sum + item.allocatedQty * item.unitPriceARS, 0);
  return <ModalFrame title={`Comprobante · Factura A 0020-000${order.id.split("-")[2]}`} subtitle={`Pedido ${order.id} · ${order.date.split(" ")[0]}`} wide onClose={onClose}>
    <div className="space-y-5 overflow-y-auto p-5 sm:p-6"><div className="grid gap-3 text-xs sm:grid-cols-2"><p><strong>Cliente:</strong> HERRERA CRISTIAN FERNANDO</p><p><strong>Condición:</strong> {order.paymentTerms}</p></div><div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[680px] text-left text-xs"><thead className="bg-slate-100 text-slate-600"><tr>{["Código", "Descripción", "Cantidad", "Precio unitario", "Total"].map(label => <th key={label} className="px-3 py-3 font-bold">{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{items.map(item => <tr key={item.sku}><td className="px-3 py-3 font-mono">{item.sku}<span className="block text-slate-400">{item.subcode}</span></td><td className="px-3 py-3 font-semibold">{item.name}</td><td className="px-3 py-3">{item.allocatedQty}</td><td className="px-3 py-3">{formatMoney(item.unitPriceARS, currency)}</td><td className="px-3 py-3 font-bold">{formatMoney(item.allocatedQty * item.unitPriceARS, currency)}</td></tr>)}</tbody></table></div><div className="ml-auto max-w-xs space-y-2 rounded-xl bg-slate-50 p-4 text-xs"><div className="flex justify-between"><span>Subtotal</span><strong>{formatMoney(subtotal, currency)}</strong></div><div className="flex justify-between"><span>IVA 21%</span><strong>{formatMoney(subtotal * .21, currency)}</strong></div><div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black"><span>Total</span><span>{formatMoney(subtotal * 1.21, currency)}</span></div></div><p className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-brand-blue-700"><Info className="h-4 w-4" />Comprobante ilustrativo generado con los datos de ejemplo del simulador.</p></div>
  </ModalFrame>;
}
