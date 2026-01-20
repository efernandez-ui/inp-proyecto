import filtersFlat from "../../../attached_assets/filters_flat_1768909468458.json";

/**
 * Normalizes strings for comparison
 */
export const normalize = (str: any): string => {
  if (str === undefined || str === null) return "";
  return String(str).trim().toLowerCase();
};

/**
 * Gets all available categories from the flat structure
 */
export const getCategories = (): string[] => {
  return Object.keys(filtersFlat).sort();
};

/**
 * Gets subtypes for a specific category
 */
export const getSubtypes = (category: string): string[] => {
  if (!category || !(filtersFlat as any)[category]) return [];
  return Object.keys((filtersFlat as any)[category]).sort();
};

/**
 * Gets the schema for category + subtype
 */
export const getFilterSchema = (category: string, subtype: string): any => {
  if (!category || !subtype || !(filtersFlat as any)[category] || !(filtersFlat as any)[category][subtype]) {
    return { brandFilter: false, productFilter: false, attributes: [] };
  }
  return (filtersFlat as any)[category][subtype];
};

/**
 * Extracts available options for Marca and dynamic attributes
 */
export const getAvailableOptions = (products: any[], currentSelection: any, schema: any): any => {
  const options = {
    brands: new Set<string>(),
    attributes: {} as any
  };

  // Initialize attribute collectors
  schema.attributes.forEach((attrKey: string) => {
    options.attributes[attrKey] = {
      values: new Set<any>(),
      isNumeric: attrKey.toLowerCase().includes("(mm)") || 
                 attrKey.toLowerCase().includes("(cm)") || 
                 attrKey.toLowerCase().includes("(cc)") || 
                 attrKey.toLowerCase().includes("(kg)") ||
                 attrKey.toLowerCase().includes("(v)") ||
                 attrKey.toLowerCase().includes("(amp)")
    };
  });

  // Filter products by current Category and Subtype first
  const baseProducts = products.filter(p => 
    normalize(p.type) === normalize(currentSelection.categoria) &&
    normalize(p.subtype) === normalize(currentSelection.subtipo)
  );

  baseProducts.forEach(p => {
    if (p.brand) options.brands.add(p.brand);
    
    // Check dynamic attributes
    if (p.attributes) {
      schema.attributes.forEach((attrKey: string) => {
        const val = p.attributes[attrKey];
        if (val !== undefined && val !== null) {
          options.attributes[attrKey].values.add(val);
        }
      });
    }
  });

  // Convert Sets to sorted Arrays
  return {
    brands: Array.from(options.brands).sort(),
    attributes: Object.keys(options.attributes).reduce((acc: any, key: string) => {
      const attr = options.attributes[key];
      const values = Array.from(attr.values).sort((a: any, b: any) => {
        if (typeof a === 'number' && typeof b === 'number') return a - b;
        return String(a).localeCompare(String(b));
      });
      
      acc[key] = {
        values,
        isNumeric: attr.isNumeric,
        range: attr.isNumeric && values.length > 0 ? {
          min: Math.min(...values.filter(v => typeof v === 'number') as number[]),
          max: Math.max(...values.filter(v => typeof v === 'number') as number[])
        } : null
      };
      return acc;
    }, {})
  };
};

/**
 * Applies all filters to the product list
 */
export const applyFilters = (products: any[], selection: any): any[] => {
  return products.filter(p => {
    // 1) Category
    if (selection.categoria && normalize(p.type) !== normalize(selection.categoria)) return false;
    
    // 2) Subtype
    if (selection.subtipo && normalize(p.subtype) !== normalize(selection.subtipo)) return false;
    
    // 3) Marca
    if (selection.marca && selection.marca !== "all_brands" && normalize(p.brand) !== normalize(selection.marca)) return false;
    
    // 4) Attributes
    if (selection.attributes) {
      for (const [key, filterVal] of Object.entries(selection.attributes)) {
        if (!filterVal) continue;
        const productVal = p.attributes ? p.attributes[key] : undefined;
        
        if (productVal === undefined || productVal === null) return false;

        // Numeric range or simple equality
        if (typeof filterVal === 'object' && (filterVal as any).min !== undefined) {
          const { min, max } = filterVal as any;
          if (min !== undefined && productVal < min) return false;
          if (max !== undefined && productVal > max) return false;
        } else {
          if (normalize(productVal) !== normalize(filterVal)) return false;
        }
      }
    }

    return true;
  });
};
