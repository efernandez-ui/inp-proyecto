export interface Product {
  id: number;
  brand: string;
  title: string;
  code: string;
  price: number;
  originalPrice: number;
  image: string;
  stock: {
    BUE: number;
    CUYO: number;
    NEA: number;
    NOA: number;
  };
  width: number | string;
  ratio: number | string;
  rim: number | string;
  type?: string;
  subtype?: string;
  origin?: 'Nacional' | 'Importado';
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  {id:1, brand:'PIRELLI', title:'100/80-17 M/C 52H TL SPORT DEMON FRONT', code:'001001010005', price:45466.2, originalPrice:50518, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/SportDemonD_min.jpg', stock:{BUE:7, CUYO:5, NEA:6, NOA:0}, width:100, ratio:80, rim:17, type: 'Calle', subtype: 'Sport', origin: 'Importado'},
  {id:2, brand:'PIRELLI', title:'100/90-19 57H TL MT60', code:'001001010011', price:100884.6, originalPrice:112094, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/MT60f_min.jpg', stock:{BUE:10, CUYO:5, NEA:0, NOA:1}, width:100, ratio:90, rim:19, type: 'Off-Road', subtype: 'Enduro', origin: 'Importado'},
  {id:3, brand:'PIRELLI', title:'110/80-18 58P MST MT21', code:'001001010034', price:89995.5, originalPrice:99995, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_mt21-rear_min.jpg', stock:{BUE:1, CUYO:1, NEA:3, NOA:0}, width:110, ratio:80, rim:18, type: 'Off-Road', subtype: 'Rally', origin: 'Importado'},
  {id:4, brand:'PIRELLI', title:'110/90-19 62M NHS SCORPION MX EXTRA', code:'001001010045', price:99858.6, originalPrice:110954, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_scorpion-mx-extra-rear_min.jpg', stock:{BUE:2, CUYO:7, NEA:6, NOA:1}, width:110, ratio:90, rim:19, type: 'Off-Road', subtype: 'Motocross', origin: 'Importado', isNew: true},
  {id:5, brand:'PIRELLI', title:'110/90-19 62M NHS SCORPION MX MIDSOFT 32', code:'001001010048', price:48092.4, originalPrice:53436, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_scorpion-mx-midsoft-32-rear_min.jpg', stock:{BUE:3, CUYO:5, NEA:10, NOA:4}, width:110, ratio:90, rim:19, type: 'Off-Road', subtype: 'Motocross', origin: 'Importado'},
  {id:6, brand:'PIRELLI', title:'120/100-18 M/C 68M MST SCORPION XC MID HARD', code:'001001010051', price:80875.8, originalPrice:89862, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_scorpion-xc-hd-midhard-rear_min.jpg', stock:{BUE:10, CUYO:5, NEA:4, NOA:9}, width:120, ratio:100, rim:18, type: 'Off-Road', subtype: 'Enduro', origin: 'Importado'},
  {id:7, brand:'PIRELLI', title:'120/100-18 NHS MT16 GARACROSS', code:'001001010054', price:103221.9, originalPrice:114691, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_mt16-garacross-rear_min.jpg', stock:{BUE:4, CUYO:8, NEA:8, NOA:9}, width:120, ratio:100, rim:18, type: 'Off-Road', subtype: 'Cross', origin: 'Importado'},
  {id:8, brand:'PIRELLI', title:'120/70ZR17 M/C (58W) TL ANGEL ST FRONT', code:'001001010062', price:158599.8, originalPrice:176222, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/AngelST-Delantera-1_min.jpg', stock:{BUE:6, CUYO:7, NEA:4, NOA:10}, width:120, ratio:70, rim:17, type: 'Calle', subtype: 'Touring', origin: 'Importado'},
  {id:9, brand:'PIRELLI', title:'120/70ZR17 M/C (58W) TL DIABLO', code:'001001010065', price:99154.8, originalPrice:110172, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/04042023-001001010065-1_min.jpg', stock:{BUE:1, CUYO:3, NEA:0, NOA:6}, width:120, ratio:70, rim:17, type: 'Calle', subtype: 'Sport', origin: 'Importado', isNew: true},
  {id:10, brand:'PIRELLI', title:'120/70-17 M/C 58H TL SPORT DEMON FRONT', code:'001001010068', price:83093.4, originalPrice:92326, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/SportDemonD_min.jpg', stock:{BUE:1, CUYO:5, NEA:9, NOA:6}, width:120, ratio:70, rim:17, type: 'Calle', subtype: 'Sport', origin: 'Importado'},
  {id:11, brand:'PIRELLI', title:'120/90-16 M/C 63S TL CITY DEMON', code:'001001010079', price:73972.8, originalPrice:82192, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_city-demon-rear_min.jpg', stock:{BUE:8, CUYO:4, NEA:2, NOA:7}, width:120, ratio:90, rim:16, type: 'Calle', subtype: 'City', origin: 'Nacional'},
  {id:12, brand:'PIRELLI', title:'120/90-17 64S MT66 FRONT', code:'001001010082', price:70476.3, originalPrice:78307, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/MT66-Delantera_min.jpg', stock:{BUE:9, CUYO:8, NEA:8, NOA:9}, width:120, ratio:90, rim:17, type: 'Calle', subtype: 'Custom', origin: 'Nacional'},
  {id:13, brand:'PIRELLI', title:'130/70ZR16 TL M/C (61W) DIABLO FRONT', code:'001001010093', price:123037.2, originalPrice:136708, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/04042023-001001010093-1_min.jpg', stock:{BUE:5, CUYO:10, NEA:2, NOA:3}, width:130, ratio:70, rim:16, type: 'Calle', subtype: 'Sport', origin: 'Importado'},
  {id:14, brand:'PIRELLI', title:'130/80-17 65H TL DP MT60', code:'001001010098', price:51543.9, originalPrice:57271, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/MT60r_min.jpg', stock:{BUE:5, CUYO:0, NEA:4, NOA:1}, width:130, ratio:80, rim:17, type: 'Off-Road', subtype: 'Trail', origin: 'Nacional'},
  {id:15, brand:'PIRELLI', title:'140/90-15 M/C 70H TL (TT) MT66', code:'001001010124', price:134942.4, originalPrice:149936, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/MT66-Trasera_min.jpg', stock:{BUE:4, CUYO:1, NEA:10, NOA:0}, width:140, ratio:90, rim:15, type: 'Calle', subtype: 'Custom', origin: 'Importado'},
  {id:16, brand:'PIRELLI', title:'160/60ZR17 M/C (69W) TL DIABLO ROSSO II', code:'001001010135', price:104365.8, originalPrice:115962, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/09052022_001001010135-1_min.jpg', stock:{BUE:9, CUYO:4, NEA:3, NOA:7}, width:160, ratio:60, rim:17, type: 'Calle', subtype: 'Sport', origin: 'Importado'},
  {id:17, brand:'PIRELLI', title:'160/60ZR17 M/C (69W) TL ANGEL ST', code:'001001010136', price:86539.5, originalPrice:96155, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/17112021_001001010136-1_min.jpg', stock:{BUE:0, CUYO:2, NEA:7, NOA:2}, width:160, ratio:60, rim:17, type: 'Calle', subtype: 'Touring', origin: 'Importado'},
  {id:18, brand:'PIRELLI', title:'180/55ZR17 M/C (73W) TL ANGEL GT REAR (A)', code:'001001010142', price:132096.6, originalPrice:146774, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/AngelGT-Trasera-1_min.jpg', stock:{BUE:7, CUYO:10, NEA:6, NOA:4}, width:180, ratio:55, rim:17, type: 'Calle', subtype: 'Touring', origin: 'Importado'},
  {id:31, brand:'KENDA', title:'110/100-18 64M TT K771 MILLVILLE KENDA', code:'001001040001', price:62587.8, originalPrice:69542, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/26012018_K771_min.jpg', stock:{BUE:4, CUYO:10, NEA:0, NOA:4}, width:110, ratio:100, rim:18, type: 'Off-Road', subtype: 'Motocross', origin: 'Importado'},
  {id:32, brand:'KENDA', title:'80/100-21 (3.00-21) 4PR 51M TT K257D MX/OFF ROAD KENDA', code:'001001040003', price:49690.8, originalPrice:55212, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/18072018_k257-F_min.jpg', stock:{BUE:4, CUYO:7, NEA:9, NOA:7}, width:80, ratio:100, rim:21, type: 'Off-Road', subtype: 'Motocross', origin: 'Importado'},
  {id:55, brand:'SUPER HORSE', title:'2.25-17 38L REINF TT HDMA001-1', code:'001001150001', price:157112.1, originalPrice:174569, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06122021_001001150001-1_min.jpg', stock:{BUE:4, CUYO:9, NEA:9, NOA:9}, width:2.25, ratio:0, rim:17, type: 'Calle', subtype: 'City', origin: 'Nacional'},
  {id:70, brand:'CELIMO', title:'150/60-17 66S TL HD-608 CELIMO', code:'001001160011', price:81904.5, originalPrice:91005, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12062024_001001160011-1_min.jpg', stock:{BUE:4, CUYO:6, NEA:1, NOA:2}, width:150, ratio:60, rim:17, type: 'Calle', subtype: 'Sport', origin: 'Nacional'},
  {id:73, brand:'KING TYRE', title:'140/70ZR17 66W K97 UHP C. DUAL KING TYRE', code:'001001180004', price:130825.8, originalPrice:145362, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/18072018_kingtire_k97-R_min.jpg', stock:{BUE:2, CUYO:6, NEA:10, NOA:5}, width:140, ratio:70, rim:17, type: 'Calle', subtype: 'Sport', origin: 'Importado'},
  {id:79, brand:'EUROGRIP', title:'100/90-17 M/C 55P TL BEAMER YS+ REAR EUROGRIP', code:'001001200007', price:79636.5, originalPrice:88485, image:'https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/28022025_001001200007-1_min.jpg', stock:{BUE:6, CUYO:3, NEA:5, NOA:0}, width:100, ratio:90, rim:17, type: 'Calle', subtype: 'City', origin: 'Importado'},
];

export const FILTERS = {
  brands: Array.from(new Set(PRODUCTS.map(p => p.brand))).sort(),
  types: ['Calle', 'Off-Road'],
  subtypes: ['Sport', 'Touring', 'City', 'Custom', 'Enduro', 'Motocross', 'Rally', 'Trail', 'Cross'],
  widths: Array.from(new Set(PRODUCTS.map(p => p.width))).sort((a: any, b: any) => parseFloat(a) - parseFloat(b)),
  ratios: Array.from(new Set(PRODUCTS.map(p => p.ratio))).filter(r => r !== 0).sort((a: any, b: any) => parseFloat(a) - parseFloat(b)),
  rims: Array.from(new Set(PRODUCTS.map(p => p.rim))).sort((a: any, b: any) => parseFloat(a) - parseFloat(b)),
  origins: ['Nacional', 'Importado'],
};
