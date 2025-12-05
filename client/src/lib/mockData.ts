
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
    ratio?: string; // Aspect Ratio / Talón
    rim?: string;   // Rodado
    position?: 'Delantera' | 'Trasera' | 'Ambas';
    type?: 'Street' | 'Enduro' | 'Cross' | 'Scooter';
  };
  isNew?: boolean;
  isHot?: boolean;
}

const BRANDS = ['Pirelli', 'Michelin', 'Dunlop', 'Metzeler', 'Rinaldi', 'Horng Fortune', 'Super City'];
const RIMS = ['10', '12', '14', '17', '18', '19', '21'];
const WIDTHS = ['2.75', '3.00', '80', '90', '100', '110', '120', '130', '140', '150', '160'];
const RATIOS = ['80', '90', '100', '70', '60'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMockProducts(count: number): Product[] {
  return Array.from({ length: count }).map((_, i) => {
    const brand = getRandomItem(BRANDS);
    const rim = getRandomItem(RIMS);
    const width = getRandomItem(WIDTHS);
    const ratio = getRandomItem(RATIOS);
    const type = getRandomItem(['Street', 'Enduro', 'Cross', 'Scooter']);
    
    const price = Math.floor(Math.random() * (150000 - 25000) + 25000);
    const hasDiscount = Math.random() > 0.7;
    
    return {
      id: `PROD-${i + 1000}`,
      code: `${brand.substring(0, 3).toUpperCase()}-${width}-${rim}-${i}`,
      title: `Cubierta ${brand} ${width}/${ratio}-${rim} ${type}`,
      brand,
      price: hasDiscount ? Math.floor(price * 0.85) : price,
      originalPrice: hasDiscount ? price : undefined,
      stock: getRandomItem(['high', 'high', 'mid', 'low', 'none'] as const),
      image: 'https://placehold.co/400x400/png?text=Tire', // Will replace with nicer placeholder in component if needed
      category: 'Cubiertas',
      attributes: {
        width,
        ratio,
        rim,
        type: type as any,
        position: getRandomItem(['Delantera', 'Trasera', 'Ambas'] as const),
      },
      isNew: Math.random() > 0.8,
      isHot: Math.random() > 0.9,
    };
  });
}

export const PRODUCTS = generateMockProducts(100);

// Helper to get unique values for filters
export const getUniqueValues = (field: keyof Product['attributes']) => {
  const values = new Set<string>();
  PRODUCTS.forEach(p => {
    if (p.attributes[field]) {
      values.add(p.attributes[field] as string);
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
};
