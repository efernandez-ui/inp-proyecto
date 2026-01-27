import { useState } from "react";
import { Link, useRoute } from "wouter";
import { 
  ChevronRight, 
  ShoppingCart, 
  Check, 
  Share2, 
  Facebook, 
  Twitter, 
  Mail, 
  Search,
  Menu,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Mock Data based on the provided URL
const PRODUCT = {
  id: "001001010165",
  title: "2.50-17 M/C TL 38P SUPER CITY FRONT",
  brand: "PIRELLI",
  code: "001001010165",
  price: 77564.70,
  listPrice: 86183.00,
  publicPrice: 86183.00,
  stock: {
    main: true, // NOS
    secondary: false, // ROS
    tertiary: true, // SUC
    quaternary: true // EXT
  },
  images: [
    "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-1_min.jpg",
    "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-2_min.jpg",
    "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-3_min.jpg",
    "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-4_min.jpg",
    "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-5_min.jpg",
    "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-6_min.jpg"
  ],
  attributes: {
    producto: "CUBIERTA",
    marca: "PIRELLI",
    clase: "Motocicleta",
    construccion: "Diagonal",
    rodado: "17",
    medida: "2.50-17",
    codificacion: "Pulgadas",
    ancho: "2.50",
    ancho_mm: "63.5",
    relacion_aspecto: "100",
    relacion_aspecto_mm: "63.5",
    terreno: "ON",
    suelo: "TIERRA;ASFALTO",
    uso: "URBANO",
    modelo: "SUPER CITY",
    posicion: "Delantera",
    montaje: "Uso sin cámara",
    indice_carga: "38 (132 kg)",
    indice_velocidad: "P (150 km/H)",
    origen: "Brasil"
  },
  characteristics: {
    tipo: "CUBIERTAS",
    nro_parte: "2911000",
    subtipo: "CUBIERTAS MOTO",
    origen: "Importado",
    marca: "PIRELLI"
  },
  description: "Cubiertas Pirelli Super City 2.50-17 está pensada para ofrecerte un manejo seguro, estable y duradero en entornos urbanos. Con rodado 18 y construcción diagonal tanto delantera como trasera, estas cubiertas sin cámara se adaptan perfectamente a superficies de asfalto, brindando una excelente tracción y confort de marcha. Con la calidad y el prestigio de Pirelli, esta opción es ideal para quienes buscan un rendimiento confiable y parejo en sus trayectos diarios.",
  applications: [
    { marca: "CORVEN", modelo: "ENERGY", version: "-", cilindrada: "110", motor: "4T", desde: "2006", hasta: "2015" },
    { marca: "CORVEN", modelo: "ENERGY", version: "-", cilindrada: "125", motor: "4T", desde: "2014", hasta: "2024" },
    { marca: "CORVEN", modelo: "ENERGY", version: "R2", cilindrada: "110", motor: "4T", desde: "2016", motor_type: "4T", hasta: "2024" },
    { marca: "GUERRERO", modelo: "GN", version: "KEOKEN", cilindrada: "110", motor: "4T", desde: "2016", hasta: "2024" },
    { marca: "HONDA", modelo: "WAVE", version: "DX", cilindrada: "110", motor: "4T", desde: "2013", hasta: "2024" },
    { marca: "HONDA", modelo: "WAVE", version: "NEW", cilindrada: "110", motor: "4T", desde: "2014", hasta: "2024" },
    { marca: "HONDA", modelo: "WAVE", version: "NF", cilindrada: "100", motor: "4T", desde: "2003", hasta: "2024" },
    { marca: "HONDA", modelo: "WAVE", version: "S", cilindrada: "110", motor: "4T", desde: "2014", hasta: "2024" },
    { marca: "MOTOMEL", modelo: "CA", version: "-", cilindrada: "110", motor: "4T", desde: "2016", hasta: "2024" },
    { marca: "YAMAHA", modelo: "CRYPTON", version: "T", cilindrada: "100", motor: "4T", desde: "2000", hasta: "2012" },
    { marca: "ZANELLA", modelo: "DELIVERY", version: "-", cilindrada: "110", motor: "4T", desde: "2016", hasta: "2024" },
  ],
  substitutes: [
    { id: "001001010166", title: "2.50-17 M/C REINF. 43P CITY DEMON", img: "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010166-1_min.jpg", price: 104087.67 },
    { id: "001001010166", title: "2.50-17 M/C REINF. 43P CITY DEMON", img: "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010166-1_min.jpg", price: 104087.67 },
    { id: "001001010166", title: "2.50-17 M/C REINF. 43P CITY DEMON", img: "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010166-1_min.jpg", price: 104087.67 },
    { id: "001001010166", title: "2.50-17 M/C REINF. 43P CITY DEMON", img: "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010166-1_min.jpg", price: 104087.67 },
  ]
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
};

export default function ProductDetail() {
  const [activeImage, setActiveImage] = useState(PRODUCT.images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-[#002855] text-white py-2 px-4 text-xs">
        <div className="container mx-auto flex items-center gap-2">
          <span>BUSCADOR POR MOTO</span>
          <ChevronRight className="h-3 w-3" />
          <span>Honda</span>
          <ChevronRight className="h-3 w-3" />
          <span>Wave</span>
          <ChevronRight className="h-3 w-3" />
          <span>Cilindrada</span>
          <ChevronRight className="h-3 w-3" />
          <span>...</span>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Gallery Thumbnails */}
            <div className="md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`border-2 rounded p-1 w-16 h-16 flex-shrink-0 bg-white hover:border-[#009ee3] transition-colors ${activeImage === img ? 'border-[#009ee3]' : 'border-transparent'}`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="md:col-span-6 flex items-center justify-center p-4 bg-white relative group">
               <img 
                src={activeImage} 
                alt={PRODUCT.title} 
                className="max-h-[500px] w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute bottom-4 right-4">
                <img src="https://www.intercap.com.ar/TiendaVirtual/javax.faces.resource/spacer/dot_clear.gif.jsf?ln=primefaces&v=6.1" alt="" className="h-10 opacity-50" /> 
                {/* Placeholder for watermark/logo if needed */}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h2 className="text-[#009ee3] font-bold text-sm uppercase tracking-wide mb-1">{PRODUCT.brand}</h2>
                <h1 className="text-2xl font-bold text-gray-800 leading-tight">{PRODUCT.title}</h1>
                <p className="text-gray-500 text-sm mt-1">Cod: {PRODUCT.code}</p>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>1° Envase: Botella 1 Uni</p>
                <p>2° Envase: Caja 12 Uni</p>
                <p>3° Envase: Pallet 840 Uni</p>
              </div>

              <div className="border-t border-b border-gray-100 py-4 space-y-2">
                <div>
                  <span className="text-gray-500 text-sm block">PRECIO C/IVA:</span>
                  <span className="text-4xl font-bold text-[#009ee3]">{formatPrice(PRODUCT.price)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">PRECIO LISTA:</span>
                   <span className="line-through text-gray-400">{formatPrice(PRODUCT.listPrice)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">PRECIO PUBLICO:</span>
                   <span className="text-[#f58634] font-bold">{formatPrice(PRODUCT.publicPrice)}</span>
                </div>
              </div>

              {/* Stock Indicators */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-gray-500">ROS</span>
                  <div className={`w-3 h-3 rounded-full ${PRODUCT.stock.main ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-gray-500">NQN</span>
                  <div className={`w-3 h-3 rounded-full ${PRODUCT.stock.secondary ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-gray-500">SUE</span>
                  <div className={`w-3 h-3 rounded-full ${PRODUCT.stock.tertiary ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-gray-500">CCY</span>
                  <div className={`w-3 h-3 rounded-full ${PRODUCT.stock.quaternary ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-[#007cc3] hover:bg-[#006bb3] text-white font-bold h-12 text-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  AGREGAR AL CARRITO
                </Button>
                <div className="w-20 bg-gray-100 border border-gray-300 rounded flex items-center justify-center font-bold text-gray-700">
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full h-full bg-transparent text-center focus:outline-none p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Attributes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
             <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Atributos</h3>
             <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {Object.entries(PRODUCT.attributes).map(([key, value]) => (
                  <div key={key} className="contents">
                    <div className="text-gray-500 uppercase text-xs py-1">{key.replace(/_/g, " ")}:</div>
                    <div className="font-medium text-gray-800 py-1">{value}</div>
                  </div>
                ))}
             </div>
          </div>

          {/* Right Column: Description & Characteristics */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Descripción</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {PRODUCT.description}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Características</h3>
              <div className="space-y-3 text-sm">
                 {Object.entries(PRODUCT.characteristics).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                      <span className="text-gray-500 capitalize">{key.replace(/_/g, " ")}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
          <h3 className="text-lg font-medium text-gray-700 mb-6 border-b pb-2">Aplicaciones Por Motocicleta</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-bold text-gray-700">Marca</TableHead>
                  <TableHead className="font-bold text-gray-700">Modelo</TableHead>
                  <TableHead className="font-bold text-gray-700">Versión</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Cilindrada</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Tipo Motor</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Año Desde</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Año Hasta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PRODUCT.applications.map((app, idx) => (
                  <TableRow key={idx} className="hover:bg-blue-50">
                    <TableCell className="font-medium">{app.marca}</TableCell>
                    <TableCell>{app.modelo}</TableCell>
                    <TableCell>{app.version}</TableCell>
                    <TableCell className="text-center">{app.cilindrada}</TableCell>
                    <TableCell className="text-center">{app.motor}</TableCell>
                    <TableCell className="text-center">{app.desde}</TableCell>
                    <TableCell className="text-center">{app.hasta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Banner Section */}
        <div className="w-full mb-12 rounded-lg overflow-hidden bg-black relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop" 
            alt="Pirelli Banner" 
            className="w-full h-64 object-cover opacity-60"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white">
            <div className="bg-yellow-500 text-black px-2 py-1 text-xs font-bold w-fit mb-4">PIRELLI</div>
            <h2 className="text-4xl font-bold italic mb-2">SUPER CITY</h2>
            <p className="text-xl font-light uppercase tracking-widest mb-6">Perdura en el tiempo<br/>y en el asfalto</p>
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black border-none w-fit">VER MÁS</Button>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full mb-12">
           <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-gray-900 flex items-center justify-center relative group">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/88zH3u_i5-o?si=jQi9AV03t_J1nJiM" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
           </div>
        </div>

        {/* Substitutes Section */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-gray-700 mb-6 border-b pb-2">Sustitutos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PRODUCT.substitutes.map((sub, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded p-4 flex flex-col items-center hover:shadow-md transition-shadow">
                <Badge className="self-end bg-red-500 mb-2">HOT</Badge>
                <img src={sub.img} alt={sub.title} className="h-32 object-contain mb-4" />
                <p className="text-xs text-gray-500 text-center mb-1">{sub.id}</p>
                <h4 className="text-sm font-medium text-center line-clamp-2 h-10 mb-2">{sub.title}</h4>
                <p className="text-[#009ee3] font-bold mt-auto">{formatPrice(sub.price)}</p>
                <Button size="sm" className="w-full mt-2 bg-[#007cc3] text-xs">VER</Button>
              </div>
            ))}
             {/* Duplicate to fill row */}
             <div className="bg-white border border-gray-200 rounded p-4 flex flex-col items-center hover:shadow-md transition-shadow">
                <img src={PRODUCT.substitutes[0].img} alt={PRODUCT.substitutes[0].title} className="h-32 object-contain mb-4 mt-6" />
                <p className="text-xs text-gray-500 text-center mb-1">{PRODUCT.substitutes[0].id}</p>
                <h4 className="text-sm font-medium text-center line-clamp-2 h-10 mb-2">{PRODUCT.substitutes[0].title}</h4>
                <p className="text-[#009ee3] font-bold mt-auto">{formatPrice(PRODUCT.substitutes[0].price)}</p>
                <Button size="sm" className="w-full mt-2 bg-[#007cc3] text-xs">VER</Button>
              </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
