import { useState } from "react";
import { Product, isStockAvailable } from "@/lib/products";
import { Heart, ArrowRightLeft, Link as LinkIcon, Info, Bike, ShoppingCart, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { id, title, price, originalPrice, image, brand, stock, isNew, code } = product;
  const [quantity, setQuantity] = useState(1);
  const [addedQuantity, setAddedQuantity] = useState(0);

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  // Precio público = precio original, Precio lista = precio original + 10%
  const precioPublico = originalPrice;
  const precioLista = originalPrice ? originalPrice * 1.1 : price * 1.1;

  const handleAdd = () => {
    setAddedQuantity(prev => prev + quantity);
    setQuantity(1);
  };

  const handleRemove = () => {
    setAddedQuantity(0);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const regions = [
    { key: 'NOA', color: '#22c55e' },
    { key: 'NEA', color: '#f59e0b' },
    { key: 'BUE', color: '#f59e0b' },
    { key: 'CUYO', color: '#22c55e' }
  ];

  const getStockColor = (qty: number) => {
    if (!isStockAvailable(qty)) return '#ef4444';
    if (qty <= 3) return '#f59e0b';
    return '#22c55e';
  };

  const StockBars = () => (
    <div className={styles.stockBars}>
      {regions.map(region => {
        // @ts-ignore
        const qty = stock[region.key] || 0;
        return (
          <div key={region.key} className={styles.stockBarRegion}>
            <span className={styles.regionLabel}>{region.key === 'CUYO' ? 'CUY' : region.key}</span>
            <div 
              className={styles.stockBar} 
              style={{ backgroundColor: getStockColor(qty) }}
            />
          </div>
        );
      })}
    </div>
  );

  const ActionIcons = () => (
    <div className={styles.actionIcons}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><Heart className={styles.actionIcon} /></TooltipTrigger>
          <TooltipContent><p>Favoritos</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><ArrowRightLeft className={styles.actionIcon} /></TooltipTrigger>
          <TooltipContent><p>Comparar</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><LinkIcon className={styles.actionIcon} /></TooltipTrigger>
          <TooltipContent><p>Copiar Link</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><Bike className={styles.actionIcon} /></TooltipTrigger>
          <TooltipContent><p>Vehículos compatibles</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><Info className={styles.actionIcon} /></TooltipTrigger>
          <TooltipContent><p>Más información</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className={styles.listCard} data-testid={`card-product-${id}`}>
        {discount > 0 && (
          <div className={styles.listBadges}>
            <Badge className="bg-red-600 hover:bg-red-700 text-[11px] font-bold rounded-full px-2">{discount}%</Badge>
          </div>
        )}
        
        <div className={styles.listImageWrapper}>
          <img src={image} alt={title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
        </div>
        
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            <div className={styles.listInfo}>
              <div className={styles.listBrand}>{brand}</div>
              <h3 className={styles.listTitle}>{title}</h3>
              <div className={styles.codeInfo}>Cod: {code}</div>
              
              <div className={styles.presentacion}>
                <div className={styles.presentacionTitle}>PRESENTACIÓN</div>
                <ul className={styles.presentacionList}>
                  <li>1° Envase Botella 1 UNI</li>
                  <li>2° Envase Cajas 12 UNI</li>
                </ul>
              </div>

              <StockBars />
            </div>

            <div className={styles.listPriceSection}>
              <div className={styles.priceRow}>
                <span className={styles.priceLabelSmall}>PRECIO FINAL:</span>
                <span className={styles.priceFinal}>${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.priceLabelSmall}>PRECIO LISTA:</span>
                <span className={styles.priceStriked}>${precioLista.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.priceLabelSmall}>PRECIO PÚBLICO:</span>
                <span className={styles.pricePublico}>${precioPublico?.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                {discount > 0 && <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px] ml-2">{discount}%</Badge>}
              </div>

              {addedQuantity === 0 ? (
                <div className={styles.addSection}>
                  <button className={styles.addButton} onClick={handleAdd} data-testid={`button-add-${id}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    AGREGAR AL CARRO
                  </button>
                  <div className={styles.quantitySelector}>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <div className={styles.quantityControls}>
                      <button onClick={incrementQuantity} className={styles.quantityBtn} data-testid={`button-increment-${id}`}>
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button onClick={decrementQuantity} className={styles.quantityBtn} data-testid={`button-decrement-${id}`}>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.removeSection}>
                  <button className={styles.removeButton} onClick={handleRemove} data-testid={`button-remove-${id}`}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    QUITAR
                  </button>
                  <div className={styles.addedBadge}>{addedQuantity} UNI</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className={styles.gridCard} data-testid={`card-product-${id}`}>
      <div className={styles.sideActions}>
        <ActionIcons />
      </div>

      {discount > 0 && (
        <div className={styles.badges}>
          <Badge className="bg-red-600 hover:bg-red-700 text-[11px] font-bold rounded-full px-2.5 py-1">{discount}%</Badge>
        </div>
      )}

      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <button className={styles.navBtn + " " + styles.navBtnLeft}>‹</button>
          <img src={image} alt={title} className={styles.productImage} />
          <button className={styles.navBtn + " " + styles.navBtnRight}>›</button>
        </div>
        <div className={styles.imageDots}>
          <span className={styles.dot + " " + styles.dotActive}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.imageLogos}>
          <img src="https://via.placeholder.com/30x20/e5e7eb/9ca3af?text=e-bit" alt="e-bit" className={styles.logoSmall} />
          <img src="https://via.placeholder.com/40x20/e5e7eb/9ca3af?text=INTERCAP" alt="INTERCAP" className={styles.logoSmall} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>{brand}</div>
        <h3 className={styles.title} title={title}>{title}</h3>
        
        <div className={styles.code}>
          <span className={styles.codeLabel}>Cod:</span> {code}
        </div>

        <div className={styles.presentacion}>
          <ul className={styles.presentacionListCompact}>
            <li>1° Envase Botella 1 UNI</li>
            <li>2° Envase Cajas 10 UNI</li>
          </ul>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceLabel}>PRECIO FINAL:</div>
          <div className={styles.price}>
            ${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        
        <div className={styles.priceSecondary}>
          <div className={styles.priceLabel}>PRECIO LISTA:</div>
          <div className={styles.priceStrikedSmall}>
            ${precioLista.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className={styles.pricePublicoSection}>
          <div className={styles.priceLabel}>PRECIO PÚBLICO:</div>
          <div className={styles.pricePublicoRow}>
            <span className={styles.pricePublicoValue}>
              ${precioPublico?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {discount > 0 && <Badge className="bg-orange-500 hover:bg-orange-600 text-[9px] ml-1.5 px-1.5 py-0.5">{discount}%</Badge>}
          </div>
        </div>

        <StockBars />

        {addedQuantity === 0 ? (
          <div className={styles.addSectionGrid}>
            <button className={styles.addButtonGrid} onClick={handleAdd} data-testid={`button-add-${id}`}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              AGREGAR
            </button>
            <div className={styles.quantitySelectorGrid}>
              <span className={styles.quantityValue}>{quantity}</span>
              <div className={styles.quantityControls}>
                <button onClick={incrementQuantity} className={styles.quantityBtn} data-testid={`button-increment-${id}`}>
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button onClick={decrementQuantity} className={styles.quantityBtn} data-testid={`button-decrement-${id}`}>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.removeSectionGrid}>
            <button className={styles.removeButtonGrid} onClick={handleRemove} data-testid={`button-remove-${id}`}>
              <Trash2 className="w-4 h-4 mr-2" />
              QUITAR
            </button>
            <div className={styles.addedBadgeGrid}>{addedQuantity} UNI</div>
          </div>
        )}
      </div>
    </div>
  );
}
