export type StockLevel = "high" | "medium" | "low" | "empty";

export type OrderItem = {
  sku: string;
  subcode?: string;
  name: string;
  requestedQty: number;
  allocatedQty: number;
  unitPriceARS: number;
  stockRegional?: Partial<Record<"noa" | "nea" | "bue" | "cuy", StockLevel>>;
  fulfillmentDepot?: string;
  isPreviousPending?: boolean;
  originOrder?: string;
  substitute?: { sku: string; name: string; stock: string; priceARS: number } | null;
  pendingAction?: "cart" | "cancelled";
};

export type Order = {
  id: string;
  shortNum: string;
  branch: string;
  date: string;
  timelineStep: number;
  statusKey: string;
  statusLabel: string;
  isMultiDepot?: boolean;
  destiny: string;
  carrier: string;
  trackingNum: string;
  bultos: number;
  weightKg: number;
  paymentTerms: string;
  totalARS: number;
  items: OrderItem[];
  timelineLogs: { time: string; title: string; desc: string }[];
};

// Example records transcribed from the supplied order tracking simulator.
export const initialOrders: Order[] = [
            {
                id: 'PED-2026-8810',
                shortNum: '#10247',
                branch: 'Suc Noa',
                date: '06/08/2026 09:15',
                timelineStep: 3,
                statusKey: 'EN_PREPARACION',
                statusLabel: 'En Preparación',
                isMultiDepot: true,
                destiny: 'Depósito Central - Retiro en Mostrador',
                carrier: 'Retiro en Depósito Central',
                trackingNum: 'S/N (Retiro Cliente)',
                bultos: 5,
                weightKg: 42.0,
                paymentTerms: 'Transferencia InPay (Aprobado)',
                totalARS: 2100000,
                items: [
                    { 
                        sku: '028009080009', 
                        subcode: 'BRE.M67.053-EXB',
                        name: 'TUBO HEXAGONAL 16MM ENC. 1/2 BREMEN', 
                        requestedQty: 100, 
                        allocatedQty: 50, 
                        unitPriceARS: 4520,
                        stockRegional: { noa: 'medium', nea: 'medium', bue: 'low', cuy: 'medium' },
                        fulfillmentDepot: 'Dep. BSAS',
                        substitute: null
                    },
                    { 
                        sku: '020010070059', 
                        subcode: 'DZE.1687.BAJ',
                        name: '1687 CDI DIGITAL DZE BAJAJ ROUSER 135LS', 
                        requestedQty: 15, 
                        allocatedQty: 15, 
                        unitPriceARS: 66666,
                        stockRegional: { noa: 'high', nea: 'high', bue: 'high', cuy: 'high' },
                        fulfillmentDepot: 'Dep. Cuyo',
                        substitute: null
                    },
                    {
                        sku: '023010420012',
                        subcode: 'NGK.CPR8EA-9.EX',
                        name: 'BUJÍA NGK CPR8EA-9 HONDA GLH 150 / WAVE S',
                        requestedQty: 25,
                        allocatedQty: 25,
                        unitPriceARS: 3850,
                        fulfillmentDepot: 'Dep. BSAS',
                        isPreviousPending: true,
                        originOrder: 'Ped. #10241'
                    },
                    {
                        sku: '025091020044',
                        subcode: 'DID.428H.132L.EX',
                        name: 'TRANSMISIÓN REFORZADA DID CADENA 428H x 132',
                        requestedQty: 8,
                        allocatedQty: 8,
                        unitPriceARS: 31200,
                        fulfillmentDepot: 'Dep. BSAS',
                        isPreviousPending: true,
                        originOrder: 'Ped. #10244'
                    },
                    {
                        sku: '021004050011',
                        subcode: 'MOT.5100.10W40.4L',
                        name: 'ACEITE MOTUL 5100 10W40 SEMISINTÉTICO 4L',
                        requestedQty: 12,
                        allocatedQty: 12,
                        unitPriceARS: 28400,
                        fulfillmentDepot: 'Dep. BSAS',
                        isPreviousPending: true,
                        originOrder: 'Ped. #10244'
                    },
                    {
                        sku: '026011030090',
                        subcode: 'BATT.YTZ7S.BS.EX',
                        name: 'BATERÍA GEL BS BATTERY YTZ7S (FZ5L-BS)',
                        requestedQty: 6,
                        allocatedQty: 6,
                        unitPriceARS: 52100,
                        fulfillmentDepot: 'Dep. BSAS',
                        isPreviousPending: true,
                        originOrder: 'Ped. #10239'
                    },
                    {
                        sku: '029012010022',
                        subcode: 'PROT.MAN.MX.ALU',
                        name: 'CUBRE MANOS MOTOCROSS ALUMINIO CON ALMA',
                        requestedQty: 10,
                        allocatedQty: 10,
                        unitPriceARS: 19500,
                        fulfillmentDepot: 'Dep. BSAS',
                        isPreviousPending: true,
                        originOrder: 'Ped. #10239'
                    }
                ],
                timelineLogs: [
                    { time: '06/08/2026 09:15', title: 'Pedido Recibido vía Web', desc: 'Pago confirmado por pasarela InPay.' },
                    { time: '06/08/2026 10:00', title: 'Pedido en análisis', desc: 'Validación de crédito y crédito comercial.' },
                    { time: '06/08/2026 11:30', title: 'En Preparación', desc: 'Personal picking recolectando repuestos.' }
                ]
            },
            {
                id: 'PED-2026-8650',
                shortNum: '#10249',
                branch: 'Suc Cuyo',
                date: '20/07/2026 16:45',
                timelineStep: 4,
                statusKey: 'FACTURADO',
                statusLabel: 'Facturado',
                destiny: 'Sucursal Rosario Centro',
                carrier: 'Expreso Lancioni',
                trackingNum: '8810294-A',
                bultos: 1,
                weightKg: 8.2,
                paymentTerms: 'Cuenta Corriente 30 Días',
                totalARS: 620000,
                items: [
                    { 
                        sku: '020011010089', 
                        subcode: 'DZE.2393.YAM',
                        name: '2393 TCI C/NEGRA DIGITAL YAMAHA XJ 400', 
                        requestedQty: 10, 
                        allocatedQty: 5, 
                        unitPriceARS: 88000,
                        stockRegional: { noa: 'low', nea: 'low', bue: 'medium', cuy: 'empty' },
                        substitute: null
                    }
                ],
                timelineLogs: [
                    { time: '20/07/2026 16:45', title: 'Pedido Recibido', desc: 'Solicitud con 2 SKUs en catálogo.' },
                    { time: '20/07/2026 17:15', title: 'Pedido en análisis', desc: 'Análisis de stock y sucursales.' },
                    { time: '21/07/2026 08:00', title: 'En Preparación', desc: 'Armado en depósito.' },
                    { time: '21/07/2026 09:30', title: 'Facturado', desc: 'Factura A generada. Listo para salida de transporte.' }
                ]
            },
            {
                id: 'PED-2026-8842',
                shortNum: '#10246',
                branch: 'Suc Cuyo',
                date: '05/08/2026 14:32',
                timelineStep: 5,
                statusKey: 'ENVIADO',
                statusLabel: 'Enviado',
                destiny: 'Sucursal Rosario Centro (Pellegrini 1420)',
                carrier: 'Expreso Lancioni',
                trackingNum: '8842910-B',
                bultos: 3,
                weightKg: 18.5,
                paymentTerms: 'Cuenta Corriente 30 Días',
                totalARS: 1240500,
                items: [
                    { 
                        sku: '028009080010', 
                        subcode: 'BRE.M67.054-EXB',
                        name: 'TUBO HEXAGONAL 17MM ENC. 1/2 BREMEN', 
                        requestedQty: 20, 
                        allocatedQty: 10, 
                        unitPriceARS: 3066.67,
                        stockRegional: { noa: 'medium', nea: 'medium', bue: 'high', cuy: 'low' },
                        substitute: { sku: '028009080010-HD', name: 'TUBO HEXAGONAL 17MM HEAVY DUTY BREMEN', stock: 'Disponible en BUE/NOA', priceARS: 3066.67 }
                    },
                    { 
                        sku: '028009080018', 
                        subcode: 'BRE.A12.018-EXB',
                        name: 'JUEGO DE BOCALLAVES 1/2 BREMEN (24 PIEZAS)', 
                        requestedQty: 7, 
                        allocatedQty: 5, 
                        unitPriceARS: 57500,
                        stockRegional: { noa: 'empty', nea: 'low', bue: 'medium', cuy: 'empty' },
                        substitute: { sku: '028009080018-PRO', name: 'JUEGO DE BOCALLAVES 1/2 PROFESSIONAL BREMEN (26 PZS)', stock: 'Disponible en NEA', priceARS: 58000 }
                    },
                    { 
                        sku: '020010070030', 
                        subcode: 'DZE.1562.HON',
                        name: '1562 CDI DIGITAL DZE HONDA CG TITAN 125KS', 
                        requestedQty: 12, 
                        allocatedQty: 12, 
                        unitPriceARS: 31250,
                        stockRegional: { noa: 'high', nea: 'high', bue: 'high', cuy: 'high' },
                        substitute: null 
                    }
                ],
                timelineLogs: [
                    { time: '05/08/2026 14:32', title: 'Pedido Ingresado en Sistema B2B', desc: 'Validación de crédito aprobada automáticamente.' },
                    { time: '05/08/2026 15:00', title: 'Pedido en análisis', desc: 'Análisis de stock.' },
                    { time: '05/08/2026 17:10', title: 'En Preparación', desc: 'Embalado en 3 cajas registradas.' },
                    { time: '06/08/2026 09:15', title: 'Facturado', desc: 'Factura A N° 0004-0008912 emitida.' },
                    { time: '06/08/2026 15:40', title: 'Enviado', desc: 'Despachado a Expreso Lancioni.' }
                ]
            },
            {
                id: 'PED-2026-8790',
                shortNum: '#10248',
                branch: 'Suc Nea',
                date: '28/07/2026 11:20',
                timelineStep: 5,
                statusKey: 'ENVIADO',
                statusLabel: 'Enviado',
                destiny: 'Sucursal Rosario Centro',
                carrier: 'Andreani Logistics',
                trackingNum: 'AND-99120412',
                bultos: 2,
                weightKg: 12.0,
                paymentTerms: 'Cuenta Corriente 30 Días',
                totalARS: 850300,
                items: [
                    { 
                        sku: '020010070058', 
                        subcode: 'DZE.1686.YAM',
                        name: '1686 CDI DIGITAL DZE YAMAHA NEW CRYPTON 110', 
                        requestedQty: 15, 
                        allocatedQty: 10, 
                        unitPriceARS: 42500,
                        stockRegional: { noa: 'high', nea: 'low', bue: 'medium', cuy: 'empty' },
                        substitute: { sku: '020010070058-EVO', name: 'CDI DIGITAL EVOLUTION YAMAHA NEW CRYPTON', stock: 'Disponible en BUE', priceARS: 43000 }
                    }
                ],
                timelineLogs: [
                    { time: '28/07/2026 11:20', title: 'Pedido Recibido', desc: 'Aprobación automática Cta Cte.' },
                    { time: '28/07/2026 12:00', title: 'Pedido en análisis', desc: 'Análisis de crédito.' },
                    { time: '28/07/2026 15:00', title: 'En Preparación', desc: 'Armado.' },
                    { time: '29/07/2026 10:00', title: 'Facturado', desc: 'Factura emitida.' },
                    { time: '29/07/2026 16:00', title: 'Enviado', desc: 'Guía AND-99120412' }
                ]
            }
        ];
