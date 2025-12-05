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
      category: 'Cubiertas',
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

export const FILTERS = {
  brands: Array.from(new Set(PRODUCTS.map(p => p.brand))).sort(),
  widths: getUniqueValues('width'),
  ratios: getUniqueValues('ratio'),
  rims: getUniqueValues('rim'),
  terrainTypes: getUniqueValues('terrainType'),
  usages: getUniqueValues('usage'),
  models: getUniqueValues('model'),
  positions: getUniqueValues('position'),
};
