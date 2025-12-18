import { Product } from "@/lib/products";
import { Heart, ArrowRightLeft, Link as LinkIcon, Info, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { id, title, price, originalPrice, image, brand, stock, isNew, code, width, ratio, rim, type, subtype } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Battery Icon Component
  const BatteryIcon = ({ level }: { level: number }) => {
    if (level === 0) {
        return (
            <div className={styles.batteryIcon}>
                <div className={`${styles.batteryEmpty} ${styles.batteryTop}`}></div>
            </div>
        )
    }

    let fillClass = styles.batteryHigh;
    if (level >= 4 && level < 8) {
        fillClass = styles.batteryMid;
    } else if (level < 4) {
        fillClass = styles.batteryLow;
    }

    return (
      <div className={styles.batteryIcon}>
        <div className={`${styles.batteryFill} ${fillClass}`}></div>
        <div className={`${styles.batteryTop}`} style={{backgroundColor: level >= 8 ? 'rgb(34 197 94)' : level >= 4 ? 'rgb(234 179 8)' : 'rgb(234 88 12)'}}></div>
      </div>
    );
  };

  const regions = ['NOA', 'NEA', 'BUE', 'CUYO'];

  const StockTable = () => (
    <div className={styles.stockTable}>
      {regions.map(region => {
        // @ts-ignore
        const qty = stock[region] || 0;
        return (
          <div key={region} className={styles.stockRegion}>
             <span className={styles.regionLabel}>{region === 'CUYO' ? 'CUY' : region}</span>
             <BatteryIcon level={qty} />
          </div>
        );
      })}
    </div>
  );

  const ActionIcons = () => (
      <div className={styles.actionIcons}>
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
  )

  const isHot = discount > 15;

  if (viewMode === 'list') {
    return (
      <div className={`${styles.listCard} sm:flex-row flex flex-col`}>
        {(isNew || isHot || discount > 0) && (
            <div className={styles.listBadges}>
              {discount > 0 && <Badge className="bg-red-600 hover:bg-red-700 text-[10px] font-bold">{discount}% OFF</Badge>}
              {isNew && <Badge className="bg-blue-500 hover:bg-blue-600 text-[10px] font-bold">NUEVO</Badge>}
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
                
                <div className={styles.listStatusSection}>
                    <div className="flex items-center gap-1">
                        {/* @ts-ignore */}
                        {Object.values(stock).some(v => v > 0) ? (
                            <>
                                <div className={`${styles.statusDot} ${styles.statusDotGreen}`}></div>
                                <span className={styles.statusText}>EN STOCK</span>
                            </>
                        ) : (
                            <>
                                <div className={`${styles.statusDot} ${styles.statusDotRed}`}></div>
                                <span className={styles.statusText}>SIN STOCK</span>
                            </>
                        )}
                    </div>
                    <span className={styles.separator}>|</span>
                    <div className={styles.codeInfo}>Cod: <span className="text-gray-600">{code}</span></div>
                </div>

                <div className={styles.listSpecs}>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>Rodado:</span> 
                        <span className={styles.specValue}>{rim || 'N/A'}"</span>
                    </div>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>Ancho:</span> 
                        <span className={styles.specValue}>{width || 'N/A'}</span>
                    </div>
                    {type && (
                      <div className={styles.specItem}>
                          <span className={styles.specLabel}>Tipo:</span> 
                          <span className={styles.specValue}>{type}</span>
                      </div>
                    )}
                </div>
             </div>

             <div className={styles.listPrice}>
                {originalPrice && originalPrice > price && (
                    <div className={styles.listPriceOriginal}>${originalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</div>
                )}
                <div className={styles.listPriceFinal}>
                    ${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </div>
             </div>
          </div>
          
          <div className={styles.listButtons}>
             <button className={styles.detailsBtn}>Ver Detalles</button>
             <button className={styles.cartBtn}>AGREGAR AL CARRITO</button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className={styles.gridCard}>
      <button className={styles.favoriteBtn}>
         <Heart className="w-5 h-5" />
      </button>

      {(isNew || isHot || discount > 0) && (
          <div className={styles.badges}>
            {discount > 0 && <Badge className="bg-red-600 hover:bg-red-700 text-[10px] font-bold px-1.5 h-5">{discount}%</Badge>}
            {isNew && <Badge className="bg-blue-500 hover:bg-blue-600 text-[10px] font-bold px-1.5 h-5">NEW</Badge>}
          </div>
      )}

      <div className={styles.imageWrapper}>
         <div className={styles.imageContainer}>
            <img 
            src={image} 
            alt={title} 
            className={styles.productImage}
            />
         </div>
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>{brand}</div>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>
        
        <div className={styles.code}>
            <span className={styles.codeLabel}>Cod:</span> {code}
        </div>

        <div className={styles.priceSection}>
           <div className={styles.priceLabel}>Precio final:</div>
           <div className={styles.price}>
             ${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
           </div>
        </div>
        
        {originalPrice && originalPrice > price && (
            <div className={styles.originalPrice}>
                <div className={styles.originalPriceLabel}>Precio público:</div>
                <div className={styles.originalPriceValue}>
                    ${originalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            </div>
        )}

        <StockTable />
        
        <ActionIcons />

        <button className={styles.addButton}>
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  );
}
