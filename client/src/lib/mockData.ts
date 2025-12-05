import { RAW_DATA } from './rawData';

export interface Product {
  id: string;
  code: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  stock: 'high' | 'mid' | 'low' | 'none';
  image: string;
  category: string;
  attributes: {
    width?: string;
    ratio?: string;
    rim?: string;
    position?: string;
    type?: string;
    terrainType?: string;
    soilType?: string;
    usage?: string;
    model?: string;
    loadIndex?: string;
    speedIndex?: string;
    [key: string]: any;
  };
  isNew?: boolean;
  isHot?: boolean;
}

export const ORDERED_BRANDS = [
  "AMA OILS", "ATHENA", "ATHESIL", "B.G.P.", "BBB", "BEL-RAY", "BIKE SERVICE", "BOSCH", "BREMEN", "BRN", 
  "CC PROTECTORS", "CELIMO", "CORVEN", "DBH", "DCB", "DELTA", "DURTEC TIRES", "DZE", "EK CHAIN", "ELEVAN", 
  "EUROGRIP", "FERRAZZI", "FRI-MA", "HENGXIN", "HF", "HP", "IZ", "JAYCHEN", "JC", "JFW", "JRS", "KENDA", 
  "KIM", "KING TYRE", "LITTON BRAKES", "LOMASSILENS", "LUBERY", "MDA", "METZELER", "MITSUTOMO", "MK", 
  "MOTEGI", "MOTEX", "MOTOLITE", "MOTOMEL", "MOTUL", "NGK", "NGK BRASIL", "NGK JAPON", "NRC", "ORA", 
  "PEAKLIGHT", "PENETRIT", "PETRONAS", "PHILIPS", "PIETCARD ELECTRONICA", "PIRELLI", "PK-4", "PRENTEX", 
  "PROTERCAPAS", "RADIKAL", "REGENT", "REINF", "RIFFEL", "S-MARCA", "SERRANA", "SHELL", "SINTEPLAST", 
  "SKF", "SUOMY", "SUPER HORSE", "SUPERSPROX", "TBF", "TECHNOMOUSSE", "TOKUTORA", "TOPROL", "TURBOMAX", 
  "UNIFLEX IMP.", "UNIFLEX NAC.", "VARIAS", "VEDAMOTORS", "VERTIGO", "WEGA", "WEMBLEY", "WESKAN", "WIN", 
  "XPIRAL", "YAMALUBE"
];

export const ORDERED_TYPES = [
  "ACCESORIOS", "ACRILICOS Y FAROLES", "AMORTIGUADORES", "ARTICULOS DE LIMPIEZA", "BARRALES", "BATERIAS", 
  "BUJES", "BUJIAS", "CABLES", "CAMARAS", "CAPUCHONES DE BUJIAS", "CASCOS", "CUBIERTAS", "EJES", 
  "ELECTRONICA", "GOMAS", "HERRAMIENTAS", "INDUMENTARIA", "KIT DE VENTA", "LAMPARAS", "LUBRICANTES", 
  "MANUBRIOS Y COMPONENTES", "MERCHANDISING", "PARTES CUADRO", "PARTES MOTOR", "PARTES RUEDA", 
  "PARTES TRANSMISION", "PERNOS", "PRODUCTOS FUERA DE CATALOGO", "QUIMICA PROFESIONAL", "RESORTES", 
  "RETENES", "RODAMIENTOS"
];

export const ORDERED_SUBTYPES = [
  "RAYOS Y NIPLES", "ADHESIVOS-TRABAS-SELLADORES", "AGARRAMANOS", "ALARGA Y ACORTA AMORTIGUADORES", 
  "ALARMAS", "ALICATES", "AMORTIGUADORES TRASEROS", "ARANDELAS", "ARCOS POSAPIE", "BARBIJOS", 
  "BATERIAS CONVENCIONALES", "BATERIAS LIBRE MANTENIMIENTO", "BIELAS", "BOBINAS COMPETICION", 
  "BOBINAS DE ALIMENTACION", "BOBINAS DE ALTA", "BOCINAS", "BONIFICACIONES", "BUJES", "BUJES HORQUILLON", 
  "BUJES SEPARADORES", "BUJIAS ENCENDIDO", "BULBOS", "CABALLETES", "CABLES ACELERADOR", "CABLES BUJIAS", 
  "CABLES CEBADOR", "CABLES EMBRAGUE", "CABLES FRENO DELANTERO", "CABLES FRENO TRASERO", "CABLES VELOCIMETRO", 
  "CADENAS", "CADENAS DISTRIBUCION", "CAJA DE BUJIA", "CAJA DE LUBRICANTES", "CAJA NEGRA DIGITAL", 
  "CAJAS DE CAMBIOS", "CALIBRES", "CALZADOS", "CAMARAS ATV", "CAMARAS CICLOMOTOR", "CAMARAS MOTO", 
  "CAMARAS SCOOTER", "CAMPERAS", "CAPUCHONES DE BUJIAS", "CARBURADOR", "CDI NACIONAL", "CEPILLOS", 
  "CIGÜEÑALES", "CILINDROS", "CINTA ALTA TEMPERATURA", "CINTA DE AMARRE", "CODERA", "COMANDO Y MANGO ACELERADOR", 
  "COMPRESORES", "CONJUNTO DE VALVULAS", "CORONAS", "CORREA VARIADOR", "CORTACADENA", "CUBIERTAS + CAMARAS", 
  "CUBIERTAS ATV", "CUBIERTAS CICLOMOTOR", "CUBIERTAS MOTO", "CUBIERTAS SCOOTER", "CUBREMANOS", 
  "DEFENSAS MOTOR", "DELANTALES", "DESTELLADORES", "DESTORNILLADORES", "EJES CABALLETE", "EJES DELANTEROS", 
  "EJES HORQUILLON", "EJES PRIMARIOS", "EJES SECUNDARIOS", "EJES TRASEROS", "EJES VARIOS", "ELECTRONICA", 
  "ELEVADORES", "ELEVADORES Y ADAPTADORES", "EMBRAGUE", "EMBRAGUES", "EMBRAGUES Y CAMPANAS", 
  "ENCENDIDOS COMPETICION", "ENCENDIDOS ELECTRONICOS", "ESPEJOS", "ESTABILIZADORES", "ESTIRA CADENAS", 
  "EXTRACTORES", "FAROLES DE GIRO", "FAROLES DELANTEROS", "FAROLES TRASEROS", "FILTROS DE ACEITE", 
  "FILTROS DE AIRE", "FILTROS DE COMBUSTIBLE", "GOMAS CENTRIFUGO", "GOMAS VARIAS", "GUANTES", "GUARDAPOLVO", 
  "GUIAS DE VALVULA", "HERRAMIENTAS NEUMATICAS", "HORQUILLONES", "INSTALACIONES ELECTRICAS", "JUEGO AROS", 
  "JUEGO DE CABLES", "JUEGO DE CAMARAS", "JUEGO DE FILTROS", "JUEGO DE HERRAMIENTAS", "JUEGO DE RESORTES", 
  "JUEGO FAROS Y FAROLES DE GIRO", "JUEGO PUÑOS", "JUEGO TRAJES DE LLUVIA", "JUEGOS/LIOS DE CUBIERTAS", 
  "JUNTAS CABEZA CILINDRO (Juego)", "JUNTAS DE ADMISION", "JUNTAS DE ALTERNADOR", "JUNTAS DE BASE DE CILINDROS", 
  "JUNTAS DE CARTER", "JUNTAS DE EMBRAGUE", "JUNTAS DE ENCENDIDO", "JUNTAS DE ESCAPE", "JUNTAS DE MOTOR COMPLETO (Juego)", 
  "JUNTAS DE TAPA ARBOL DE LEVAS", "JUNTAS DE TAPA DE CABEZA DE CILINDROS", "JUNTAS DE TAPA DE CENTRIFUGO", 
  "JUNTAS DE TAPA DE CILINDROS", "JUNTAS DE TAPA DE DISTRIBUCION", "JUNTAS DE TAPA DE ENCENDIDO", 
  "JUNTAS DE TAPA DE VALVULAS", "KIT DE FRICCION", "KIT DE PISTON", "KIT DE REPARACION", "KIT DE SERVICIO", 
  "KIT DE TRANSMISIÓN", "KIT DISTRIBUCION", "KIT EMBRAGUE", "KIT TRANSMISION", "KIT TRANSMISION COMPLETO", 
  "LAMPARAS DELANTERAS", "LAMPARAS SIN CULOTE", "LAMPARAS STOP/GIRO/POS. 1 POLO", "LAMPARAS STOP/GIRO/POS. 2 POLO", 
  "LED", "LIMPIADORES", "LIMPIEZA CERA LUSTRE", "LIMPIEZA PASTA PULIR", "LINGAS Y TRABAS DE SEGURIDAD", 
  "LLAVE SACA BUJIAS", "LLAVEROS DE CONTACTO-CERRADURA", "LLAVES", "LUBRICANTES 2 TIEMPOS", "LUBRICANTES 4 TIEMPOS", 
  "LUBRICANTES CADENAS", "LUBRICANTES CAJAS Y DIFERENCIALES", "LUBRICANTES CENTRIFUGO", "LUBRICANTES CERRADURAS", 
  "LUBRICANTES COMPETICION", "LUBRICANTES FILTROS", "LUBRICANTES FRENOS", "LUBRICANTES GRASAS", 
  "LUBRICANTES HIDRAULICO", "LUBRICANTES MAXIMA COMPRESION", "LUBRICANTES MULTIUSO", "LUBRICANTES NAUTICA", 
  "LUBRICANTES REFRIGENTANTE-ANTICONGELANTE", "LUBRICANTES SUSPENSION", "MANUBRIOS", "MARTILLOS", "MAZA-RUEDA", 
  "MEDICION ELECTRICA", "MODULOS DE BOCINA", "MODULOS ECU", "MOTOR", "MOTOR DE ARRANQUE", "MOTORES ESTACIONARIOS", 
  "MOUSSE", "MULETA", "MULETAS", "ORING", "PALANCAS", "PANTALONES", "PASAPIE-PEDALINES-OTROS", 
  "PASTILLAS DE FRENO", "PEDAL FRENO", "PEDALES DE FRENO", "PERNOS HORADADOS", "PIÑONES", "PINTURAS", "PINZAS", 
  "PLAQUETAS PORTA CARBONES", "PLASTICOS CARENADOS - VARIOS", "PLASTICOS HORQUILLA", "POLAINAS", "PORTABAULES", 
  "PORTAEQUIPAJES", "PROTECTORES", "RECTIFICADORES", "REGULADORES", "RELAY DE ARRANQUE", "REMERAS", "REPUESTOS", 
  "RESORTES ARRANQUE", "RODAMIENTOS VARIOS", "RODILLERA", "ROMPEVIENTOS", "SEGUROS CORONA", "SEGUROS PIÑON", 
  "SENSORES", "SEPARADOR DISCO EMBRAGUE", "SHORT", "SOPORTE PLATO FRENO TRASERO", "SOPORTES", "SUSPENSION", 
  "TALLER/USO PROFESIONAL", "TAPAS DE CILINDRO", "TAPONES DE BARRAL", "TECNOLOGIA AGM", "TENSOR DISTRIBUCION", 
  "TORQUIMETROS", "TRAJES DE LLUVIA", "TRAVESAÑOS", "TROMPETA", "TUBOS", "UNIDAD DE CONTROL", "UNIONES DE CADENA", 
  "USO PROMOCIONAL", "VALVULAS", "VALVULAS DE ADMISION", "VALVULAS DE ESCAPE", "VARILLAS DE FRENO", "VARIOS", 
  "VISERAS", "VOLANTE MAGNETICO", "ZAPATAS DE FRENO"
];

// Helper to parse the raw data
function parseProducts(rawData: string): Product[] {
  const lines = rawData.trim().split('\n');
  // Skip header line if it exists (checking for "Tipo" or "Codigo")
  const startIndex = lines[0].includes('Tipo') ? 1 : 0;
  
  return lines.slice(startIndex).map((line, index) => {
    const cols = line.split('\t');
    
    // Basic mapping
    const code = cols[1];
    const title = cols[3];
    const image = cols[4];
    const brand = cols[8];
    const type = cols[6] || 'VARIOS'; // Rubro 1 / Type
    const isNew = cols[9] === 'VERDADERO';
    
    // Attributes parsing
    const attributes: any = {};
    
    // Start scanning for attributes from column 14
    for (let i = 14; i < cols.length; i += 2) {
      const key = cols[i];
      const value = cols[i + 1];
      
      if (!key || !value) continue;
      
      const normalizedKey = key.toUpperCase().trim();
      
      if (normalizedKey === 'RODADO') attributes.rim = value;
      if (normalizedKey === 'ANCHO') attributes.width = value;
      if (normalizedKey === 'RELACION DE ASPECTO') attributes.ratio = value;
      if (normalizedKey === 'POSICION') attributes.position = value;
      if (normalizedKey === 'TIPO DE TERRENO') attributes.terrainType = value;
      if (normalizedKey === 'TIPO DE SUELO') attributes.soilType = value;
      if (normalizedKey === 'USO') attributes.usage = value;
      if (normalizedKey === 'MODELO') attributes.model = value;
      if (normalizedKey === 'INDICE DE CARGA') attributes.loadIndex = value;
      if (normalizedKey === 'INDICE DE VELOCIDAD') attributes.speedIndex = value;
      
      // Keep generic type for backward compatibility if needed, or map from usage
      if (normalizedKey === 'USO' && !attributes.type) attributes.type = value;
    }

    // Generate price randomly between 50k and 200k since it's missing in some or parse if exists?
    // The file has "Peso máximo" at col 11, "Número de parte" at 12. Price doesn't seem to be explicit or is mixed.
    // Let's keep the random price logic for now as in the original code.
    const price = Math.floor(Math.random() * (200000 - 50000) + 50000);
    const hasDiscount = Math.random() > 0.8;

    return {
      id: `PROD-${index}`,
      code,
      title,
      brand: brand || 'GENERICO',
      price: hasDiscount ? Math.floor(price * 0.9) : price,
      originalPrice: hasDiscount ? price : undefined,
      stock: (Math.random() > 0.3 ? 'high' : (Math.random() > 0.5 ? 'low' : 'none')) as 'high' | 'mid' | 'low' | 'none',
      image: image && image.startsWith('http') ? image : 'https://placehold.co/400x400/png?text=No+Image',
      category: type,
      attributes: {
        width: attributes.width || 'N/A',
        ratio: attributes.ratio || 'N/A',
        rim: attributes.rim || 'N/A',
        position: attributes.position || 'Universal',
        type: attributes.type || 'Street',
        terrainType: attributes.terrainType || 'N/A',
        soilType: attributes.soilType || 'N/A',
        usage: attributes.usage || 'N/A',
        model: attributes.model || 'N/A',
        loadIndex: attributes.loadIndex || 'N/A',
        speedIndex: attributes.speedIndex || 'N/A',
        ...attributes
      },
      isNew: isNew || Math.random() > 0.9,
      isHot: Math.random() > 0.9,
    };
  }).filter(p => p.title); // Filter out empty lines
}

export const PRODUCTS = parseProducts(RAW_DATA);

// Helper to get unique values for filters
export const getUniqueValues = (field: keyof Product['attributes']) => {
  const values = new Set<string>();
  PRODUCTS.forEach(p => {
    if (p.attributes[field] && p.attributes[field] !== 'N/A') {
      // Some fields might have multiple values separated by semicolon (e.g. usage)
      const vals = (p.attributes[field] as string).split(';');
      vals.forEach(v => values.add(v.trim()));
    }
  });
  return Array.from(values).sort((a, b) => {
    // Try numeric sort
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return a.localeCompare(b);
  });
};

// Helper to sort based on predefined order
const sortWithPriority = (items: string[], priorityList: string[]) => {
  return items.sort((a, b) => {
    const idxA = priorityList.indexOf(a);
    const idxB = priorityList.indexOf(b);
    
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    
    return a.localeCompare(b);
  });
};

export const FILTERS = {
  brands: sortWithPriority(Array.from(new Set(PRODUCTS.map(p => p.brand))), ORDERED_BRANDS),
  types: sortWithPriority(Array.from(new Set(PRODUCTS.map(p => p.category))), ORDERED_TYPES),
  widths: getUniqueValues('width'),
  ratios: getUniqueValues('ratio'),
  rims: getUniqueValues('rim'),
  terrainTypes: getUniqueValues('terrainType'),
  usages: getUniqueValues('usage'),
  models: getUniqueValues('model'),
  positions: getUniqueValues('position'),
};
