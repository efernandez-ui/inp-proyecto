export interface Category {
  id: string;
  nombre: string;
  subtipos: { id: string; nombre: string }[];
  marcas: { id: string; nombre: string }[];
}

export interface AttributeSchema {
  key: string;
  label: string;
  type: string;
}

export interface CategoryAttributes {
  categoria: string;
  atributos: AttributeSchema[];
}

export const CATALOG_HIERARCHY: Category[] = [
  {
    id: "accesorios",
    nombre: "ACCESORIOS",
    subtipos: [
      { id: "alarga-y-acorta-amortiguadores", nombre: "ALARGA Y ACORTA AMORTIGUADORES" },
      { id: "cinta-alta-temperatura", nombre: "CINTA ALTA TEMPERATURA" },
      { id: "cinta-de-amarre", nombre: "CINTA DE AMARRE" },
      { id: "defensas-motor", nombre: "DEFENSAS MOTOR" },
      { id: "espejos", nombre: "ESPEJOS" },
      { id: "lingas-y-trabas-de-seguridad", nombre: "LINGAS Y TRABAS DE SEGURIDAD" },
      { id: "portabaules", nombre: "PORTABAULES" },
      { id: "portaequipajes", nombre: "PORTAEQUIPAJES" },
      { id: "protectores", nombre: "PROTECTORES" },
      { id: "varios", nombre: "VARIOS" }
    ],
    marcas: [
      { id: "bremen", nombre: "BREMEN" },
      { id: "hp", nombre: "HP" },
      { id: "iz", nombre: "IZ" },
      { id: "jc", nombre: "JC" },
      { id: "jrs", nombre: "JRS" },
      { id: "mda", nombre: "MDA" },
      { id: "pietcard-electronica", nombre: "PIETCARD ELECTRONICA" },
      { id: "pk-4", nombre: "PK-4" },
      { id: "regent", nombre: "REGENT" }
    ]
  },
  {
    id: "acrilicos-y-faroles",
    nombre: "ACRILICOS Y FAROLES",
    subtipos: [
      { id: "faroles-de-giro", nombre: "FAROLES DE GIRO" },
      { id: "faroles-delanteros", nombre: "FAROLES DELANTEROS" },
      { id: "faroles-traseros", nombre: "FAROLES TRASEROS" }
    ],
    marcas: [
      { id: "jfw", nombre: "JFW" },
      { id: "peaklight", nombre: "PEAKLIGHT" }
    ]
  },
  {
    id: "amortiguadores",
    nombre: "AMORTIGUADORES",
    subtipos: [
      { id: "amortiguadores-traseros", nombre: "AMORTIGUADORES TRASEROS" },
      { id: "kit-de-servicio", nombre: "KIT DE SERVICIO" }
    ],
    marcas: [
      { id: "skf", nombre: "SKF" },
      { id: "xpiral", nombre: "XPIRAL" }
    ]
  },
  {
    id: "baterias",
    nombre: "BATERIAS",
    subtipos: [
      { id: "baterias-convencionales", nombre: "BATERIAS CONVENCIONALES" },
      { id: "baterias-libre-mantenimiento", nombre: "BATERIAS LIBRE MANTENIMIENTO" },
      { id: "tecnologia-agm", nombre: "TECNOLOGIA AGM" }
    ],
    marcas: [
      { id: "bosch", nombre: "BOSCH" },
      { id: "jrs", nombre: "JRS" },
      { id: "motolite", nombre: "MOTOLITE" }
    ]
  },
  {
    id: "bujias",
    nombre: "BUJIAS",
    subtipos: [
      { id: "bonificaciones", nombre: "BONIFICACIONES" },
      { id: "bujias-encendido", nombre: "BUJIAS ENCENDIDO" }
    ],
    marcas: [
      { id: "ferrazzi", nombre: "FERRAZZI" },
      { id: "ngk-brasil", nombre: "NGK BRASIL" },
      { id: "ngk-japon", nombre: "NGK JAPON" },
      { id: "wega", nombre: "WEGA" }
    ]
  },
  {
    id: "cables",
    nombre: "CABLES",
    subtipos: [
      { id: "cables-acelerador", nombre: "CABLES ACELERADOR" },
      { id: "cables-bujias", nombre: "CABLES BUJIAS" },
      { id: "cables-cebador", nombre: "CABLES CEBADOR" },
      { id: "cables-embrague", nombre: "CABLES EMBRAGUE" },
      { id: "cables-freno-delantero", nombre: "CABLES FRENO DELANTERO" },
      { id: "cables-freno-trasero", nombre: "CABLES FRENO TRASERO" },
      { id: "cables-velocimetro", nombre: "CABLES VELOCIMETRO" }
    ],
    marcas: [
      { id: "pietcard-electronica", nombre: "PIETCARD ELECTRONICA" },
      { id: "uniflex-imp", nombre: "UNIFLEX IMP." },
      { id: "uniflex-nac", nombre: "UNIFLEX NAC." }
    ]
  },
  {
    id: "camaras",
    nombre: "CAMARAS",
    subtipos: [
      { id: "camaras-atv", nombre: "CAMARAS ATV" },
      { id: "camaras-ciclomotor", nombre: "CAMARAS CICLOMOTOR" },
      { id: "camaras-moto", nombre: "CAMARAS MOTO" },
      { id: "camaras-scooter", nombre: "CAMARAS SCOOTER" },
      { id: "mousse", nombre: "MOUSSE" }
    ],
    marcas: [
      { id: "eurogrip", nombre: "EUROGRIP" },
      { id: "kenda", nombre: "KENDA" },
      { id: "mitsutomo", nombre: "MITSUTOMO" },
      { id: "pirelli", nombre: "PIRELLI" },
      { id: "riffel", nombre: "RIFFEL" },
      { id: "super-horse", nombre: "SUPER HORSE" },
      { id: "technomousse", nombre: "TECHNOMOUSSE" }
    ]
  },
  {
    id: "cascos",
    nombre: "CASCOS",
    subtipos: [
      { id: "repuestos", nombre: "REPUESTOS" },
      { id: "viseras", nombre: "VISERAS" }
    ],
    marcas: [
      { id: "suomy", nombre: "SUOMY" },
      { id: "vertigo", nombre: "VERTIGO" }
    ]
  },
  {
    id: "cubiertas",
    nombre: "CUBIERTAS",
    subtipos: [
      { id: "cubiertas-atv", nombre: "CUBIERTAS ATV" },
      { id: "cubiertas-ciclomotor", nombre: "CUBIERTAS CICLOMOTOR" },
      { id: "cubiertas-moto", nombre: "CUBIERTAS MOTO" },
      { id: "cubiertas-scooter", nombre: "CUBIERTAS SCOOTER" }
    ],
    marcas: [
      { id: "celimo", nombre: "CELIMO" },
      { id: "durtec-tires", nombre: "DURTEC TIRES" },
      { id: "eurogrip", nombre: "EUROGRIP" },
      { id: "kenda", nombre: "KENDA" },
      { id: "king-tyre", nombre: "KING TYRE" },
      { id: "metzeler", nombre: "METZELER" },
      { id: "pirelli", nombre: "PIRELLI" },
      { id: "super-horse", nombre: "SUPER HORSE" }
    ]
  },
  {
    id: "electronica",
    nombre: "ELECTRONICA",
    subtipos: [
      { id: "alarmas", nombre: "ALARMAS" },
      { id: "bobinas-competicion", nombre: "BOBINAS COMPETICION" },
      { id: "bobinas-de-alimentacion", nombre: "BOBINAS DE ALIMENTACION" },
      { id: "bobinas-de-alta", nombre: "BOBINAS DE ALTA" },
      { id: "bocinas", nombre: "BOCINAS" },
      { id: "cdi-nacional", nombre: "CDI NACIONAL" },
      { id: "destelladores", nombre: "DESTELLADORES" },
      { id: "encendidos-competicion", nombre: "ENCENDIDOS COMPETICION" },
      { id: "encendidos-electronicos", nombre: "ENCENDIDOS ELECTRONICOS" },
      { id: "estabilizadores", nombre: "ESTABILIZADORES" },
      { id: "instalaciones-electricas", nombre: "INSTALACIONES ELECTRICAS" },
      { id: "modulos-de-bocina", nombre: "MODULOS DE BOCINA" },
      { id: "modulos-ecu", nombre: "MODULOS ECU" },
      { id: "motor-de-arranque", nombre: "MOTOR DE ARRANQUE" },
      { id: "rectificadores", nombre: "RECTIFICADORES" },
      { id: "reguladores", nombre: "REGULADORES" },
      { id: "relay-de-arranque", nombre: "RELAY DE ARRANQUE" },
      { id: "sensores", nombre: "SENSORES" }
    ],
    marcas: [
      { id: "dze", nombre: "DZE" },
      { id: "ferrazzi", nombre: "FERRAZZI" },
      { id: "pietcard-electronica", nombre: "PIETCARD ELECTRONICA" },
      { id: "vedamotors", nombre: "VEDAMOTORS" }
    ]
  },
  {
    id: "frenos",
    nombre: "FRENOS",
    subtipos: [
      { id: "discos-de-freno", nombre: "DISCOS DE FRENO" },
      { id: "liquido-de-freno", nombre: "LIQUIDO DE FRENO" },
      { id: "mordazas", nombre: "MORDAZAS" },
      { id: "pastillas-de-freno", nombre: "PASTILLAS DE FRENO" },
      { id: "zapatas-de-freno", nombre: "ZAPATAS DE FRENO" }
    ],
    marcas: [
      { id: "brembo", nombre: "BREMBO" },
      { id: "ebc", nombre: "EBC" },
      { id: "ferodo", nombre: "FERODO" },
      { id: "galfer", nombre: "GALFER" }
    ]
  },
  {
    id: "herramientas",
    nombre: "HERRAMIENTAS",
    subtipos: [
      { id: "alicates", nombre: "ALICATES" },
      { id: "calibres", nombre: "CALIBRES" },
      { id: "cepillos", nombre: "CEPILLOS" },
      { id: "compresores", nombre: "COMPRESORES" },
      { id: "cortacadena", nombre: "CORTACADENA" },
      { id: "destornilladores", nombre: "DESTORNILLADORES" },
      { id: "elevadores", nombre: "ELEVADORES" },
      { id: "extractores", nombre: "EXTRACTORES" },
      { id: "juego-de-herramientas", nombre: "JUEGO DE HERRAMIENTAS" },
      { id: "llaves", nombre: "LLAVES" },
      { id: "martillos", nombre: "MARTILLOS" },
      { id: "torquimetros", nombre: "TORQUIMETROS" }
    ],
    marcas: [
      { id: "bike-service", nombre: "BIKE SERVICE" },
      { id: "bremen", nombre: "BREMEN" },
      { id: "elevan", nombre: "ELEVAN" },
      { id: "hp", nombre: "HP" },
      { id: "motegi", nombre: "MOTEGI" },
      { id: "wembley", nombre: "WEMBLEY" }
    ]
  },
  {
    id: "indumentaria",
    nombre: "INDUMENTARIA",
    subtipos: [
      { id: "calzados", nombre: "CALZADOS" },
      { id: "camperas", nombre: "CAMPERAS" },
      { id: "codera", nombre: "CODERA" },
      { id: "cubremanos", nombre: "CUBREMANOS" },
      { id: "guantes", nombre: "GUANTES" },
      { id: "pantalones", nombre: "PANTALONES" },
      { id: "polainas", nombre: "POLAINAS" },
      { id: "rodillera", nombre: "RODILLERA" },
      { id: "trajes-de-lluvia", nombre: "TRAJES DE LLUVIA" }
    ],
    marcas: [
      { id: "cc-protectors", nombre: "CC PROTECTORS" },
      { id: "delta", nombre: "DELTA" },
      { id: "mk", nombre: "MK" },
      { id: "protercapas", nombre: "PROTERCAPAS" },
      { id: "radikal", nombre: "RADIKAL" },
      { id: "serrana", nombre: "SERRANA" }
    ]
  },
  {
    id: "lamparas",
    nombre: "LAMPARAS",
    subtipos: [
      { id: "lamparas-delanteras", nombre: "LAMPARAS DELANTERAS" },
      { id: "lamparas-sin-culote", nombre: "LAMPARAS SIN CULOTE" },
      { id: "lamparas-stop-giro", nombre: "LAMPARAS STOP/GIRO" },
      { id: "led", nombre: "LED" }
    ],
    marcas: [
      { id: "bosch", nombre: "BOSCH" },
      { id: "philips", nombre: "PHILIPS" }
    ]
  },
  {
    id: "lubricantes",
    nombre: "LUBRICANTES",
    subtipos: [
      { id: "limpiadores", nombre: "LIMPIADORES" },
      { id: "lubricantes-2-tiempos", nombre: "LUBRICANTES 2 TIEMPOS" },
      { id: "lubricantes-4-tiempos", nombre: "LUBRICANTES 4 TIEMPOS" },
      { id: "lubricantes-transmision", nombre: "LUBRICANTES TRANSMISION" },
      { id: "refrigerantes", nombre: "REFRIGERANTES" }
    ],
    marcas: [
      { id: "castrol", nombre: "CASTROL" },
      { id: "lubery", nombre: "LUBERY" },
      { id: "motul", nombre: "MOTUL" },
      { id: "shell", nombre: "SHELL" },
      { id: "yamalube", nombre: "YAMALUBE" }
    ]
  },
  {
    id: "transmision",
    nombre: "TRANSMISION",
    subtipos: [
      { id: "cadenas", nombre: "CADENAS" },
      { id: "coronas", nombre: "CORONAS" },
      { id: "kit-de-transmision", nombre: "KIT DE TRANSMISION" },
      { id: "pinones", nombre: "PIÑONES" }
    ],
    marcas: [
      { id: "did", nombre: "DID" },
      { id: "jt-sprockets", nombre: "JT SPROCKETS" },
      { id: "reinf", nombre: "REINF" },
      { id: "riffel", nombre: "RIFFEL" }
    ]
  },
  {
    id: "filtros",
    nombre: "FILTROS",
    subtipos: [
      { id: "filtros-aceite", nombre: "FILTROS ACEITE" },
      { id: "filtros-aire", nombre: "FILTROS AIRE" },
      { id: "filtros-combustible", nombre: "FILTROS COMBUSTIBLE" }
    ],
    marcas: [
      { id: "hiflo", nombre: "HIFLO" },
      { id: "k-n", nombre: "K&N" },
      { id: "mann", nombre: "MANN" }
    ]
  },
  {
    id: "rodamientos",
    nombre: "RODAMIENTOS",
    subtipos: [
      { id: "rodamientos-varios", nombre: "RODAMIENTOS VARIOS" }
    ],
    marcas: [
      { id: "skf", nombre: "SKF" },
      { id: "tbf", nombre: "TBF" },
      { id: "toprol", nombre: "TOPROL" }
    ]
  }
];

export const ATTRIBUTE_SCHEMA_BY_CATEGORY: Record<string, CategoryAttributes> = {
  cubiertas: {
    categoria: "CUBIERTAS",
    atributos: [
      { key: "ancho", label: "Ancho", type: "number" },
      { key: "relacion", label: "Relación", type: "number" },
      { key: "rodado", label: "Rodado", type: "number" }
    ]
  },
  camaras: {
    categoria: "CAMARAS",
    atributos: [
      { key: "ancho", label: "Ancho", type: "number" },
      { key: "relacion", label: "Relación", type: "number" },
      { key: "rodado", label: "Rodado", type: "number" }
    ]
  },
  baterias: {
    categoria: "BATERIAS",
    atributos: [
      { key: "voltaje", label: "Voltaje (V)", type: "number" },
      { key: "amperaje", label: "Amperaje (Ah)", type: "number" }
    ]
  },
  transmision: {
    categoria: "TRANSMISION",
    atributos: [
      { key: "dientes", label: "Dientes", type: "number" },
      { key: "paso", label: "Paso", type: "text" }
    ]
  },
  filtros: {
    categoria: "FILTROS",
    atributos: [
      { key: "aplicacion", label: "Aplicación", type: "text" }
    ]
  },
  lubricantes: {
    categoria: "LUBRICANTES",
    atributos: [
      { key: "viscosidad", label: "Viscosidad", type: "text" },
      { key: "capacidad", label: "Capacidad (L)", type: "number" }
    ]
  },
  indumentaria: {
    categoria: "INDUMENTARIA",
    atributos: [
      { key: "talle", label: "Talle", type: "text" },
      { key: "color", label: "Color", type: "text" }
    ]
  }
};

export const ATTRIBUTE_VALUES: Record<string, Record<string, (string | number)[]>> = {
  cubiertas: {
    ancho: [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
    relacion: [55, 60, 70, 80, 90, 100],
    rodado: [12, 14, 15, 16, 17, 18, 19, 21]
  },
  camaras: {
    ancho: [60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    relacion: [60, 70, 80, 90, 100],
    rodado: [12, 14, 15, 16, 17, 18, 19, 21]
  },
  baterias: {
    voltaje: [6, 12],
    amperaje: [3, 4, 5, 6, 7, 8, 9, 10, 12, 14]
  },
  transmision: {
    dientes: [12, 13, 14, 15, 16, 36, 38, 40, 42, 44, 46, 48, 50],
    paso: ["420", "428", "520", "525", "530"]
  },
  filtros: {
    aplicacion: ["Honda", "Yamaha", "Suzuki", "Kawasaki", "BMW", "KTM"]
  },
  lubricantes: {
    viscosidad: ["5W-30", "10W-40", "15W-50", "20W-50"],
    capacidad: [0.5, 1, 2, 4]
  },
  indumentaria: {
    talle: ["XS", "S", "M", "L", "XL", "XXL"],
    color: ["Negro", "Blanco", "Rojo", "Azul", "Amarillo"]
  }
};

export function getSubtiposForCategories(categoryIds: string[]): { id: string; nombre: string }[] {
  if (categoryIds.length === 0) {
    return CATALOG_HIERARCHY.flatMap(cat => cat.subtipos);
  }
  return CATALOG_HIERARCHY
    .filter(cat => categoryIds.includes(cat.id))
    .flatMap(cat => cat.subtipos);
}

export function getMarcasForCategories(categoryIds: string[]): { id: string; nombre: string }[] {
  if (categoryIds.length === 0) {
    const allMarcas = new Map<string, { id: string; nombre: string }>();
    CATALOG_HIERARCHY.forEach(cat => {
      cat.marcas.forEach(m => allMarcas.set(m.id, m));
    });
    return Array.from(allMarcas.values());
  }
  
  const marcas = new Map<string, { id: string; nombre: string }>();
  CATALOG_HIERARCHY
    .filter(cat => categoryIds.includes(cat.id))
    .forEach(cat => {
      cat.marcas.forEach(m => marcas.set(m.id, m));
    });
  return Array.from(marcas.values());
}

export function getAttributesForCategory(categoryId: string): CategoryAttributes | null {
  return ATTRIBUTE_SCHEMA_BY_CATEGORY[categoryId] || null;
}
