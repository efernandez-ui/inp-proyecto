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
  origin?: string;
  isNew?: boolean;
  attrs?: Record<string, any>;
}

export const PRODUCTS: Product[] = [
  {
    "id": 1,
    "brand": "PIRELLI",
    "title": "100/80-17 M/C 52H TL SPORT DEMON FRONT",
    "code": "001001010005",
    "price": 45466.2,
    "originalPrice": 50518,
    "image": "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/SportDemonD_min.jpg",
    "stock": {
      "BUE": 7,
      "CUYO": 5,
      "NEA": 6,
      "NOA": 0
    },
    "width": 100,
    "ratio": 80,
    "rim": 17,
    "type": "CUBIERTAS",
    "subtype": "CUBIERTAS MOTO",
    "origin": "Importado",
    "isNew": false,
    "attrs": {
      "MARCA": "PIRELLI",
      "MEDIDA": "100/80-17",
      "ANCHO": 100,
      "RELACION": 80,
      "RODADO": 17,
      "POSICION": "DELANTERA"
    }
  },
  {
    "id": 2,
    "brand": "PIRELLI",
    "title": "100/90-19 57H TL MT60",
    "code": "001001010011",
    "price": 100884.6,
    "originalPrice": 112094,
    "image": "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/MT60f_min.jpg",
    "stock": {
      "BUE": 10,
      "CUYO": 5,
      "NEA": 0,
      "NOA": 1
    },
    "width": 100,
    "ratio": 90,
    "rim": 19,
    "type": "CUBIERTAS",
    "subtype": "CUBIERTAS MOTO",
    "origin": "Importado",
    "isNew": false,
    "attrs": {
      "MARCA": "PIRELLI",
      "MEDIDA": "100/90-19",
      "ANCHO": 100,
      "RELACION": 90,
      "RODADO": 19,
      "POSICION": "DELANTERA"
    }
  },
  {
    "id": 3,
    "brand": "PIRELLI",
    "title": "110/80-18 58P MST MT21",
    "code": "001001010034",
    "price": 89995.5,
    "originalPrice": 99995,
    "image": "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_mt21-rear_min.jpg",
    "stock": {
      "BUE": 1,
      "CUYO": 1,
      "NEA": 3,
      "NOA": 0
    },
    "width": 110,
    "ratio": 80,
    "rim": 18,
    "type": "CUBIERTAS",
    "subtype": "CUBIERTAS MOTO",
    "origin": "Importado",
    "isNew": false,
    "attrs": {
      "MARCA": "PIRELLI",
      "MEDIDA": "110/80-18",
      "ANCHO": 110,
      "RELACION": 80,
      "RODADO": 18,
      "POSICION": "TRASERA"
    }
  },
  {
    "id": 4,
    "brand": "PIRELLI",
    "title": "110/90-19 62M NHS SCORPION MX EXTRA",
    "code": "001001010045",
    "price": 99858.6,
    "originalPrice": 110954,
    "image": "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_scorpion-mx-extra-rear_min.jpg",
    "stock": {
      "BUE": 2,
      "CUYO": 7,
      "NEA": 6,
      "NOA": 1
    },
    "width": 110,
    "ratio": 90,
    "rim": 19,
    "type": "CUBIERTAS",
    "subtype": "CUBIERTAS MOTO",
    "origin": "Importado",
    "isNew": false,
    "attrs": {
      "MARCA": "PIRELLI",
      "MEDIDA": "110/90-19",
      "ANCHO": 110,
      "RELACION": 90,
      "RODADO": 19,
      "POSICION": "TRASERA"
    }
  },
  {
    "id": 5,
    "brand": "PIRELLI",
    "title": "110/90-19 62M NHS SCORPION MX MIDSOFT 32",
    "code": "001001010048",
    "price": 48092.4,
    "originalPrice": 53436,
    "image": "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/06112017_scorpion-mx-midsoft-32-rear_min.jpg",
    "stock": {
      "BUE": 3,
      "CUYO": 5,
      "NEA": 10,
      "NOA": 4
    },
    "width": 110,
    "ratio": 90,
    "rim": 19,
    "type": "CUBIERTAS",
    "subtype": "CUBIERTAS MOTO",
    "origin": "Importado",
    "isNew": false,
    "attrs": {
      "MARCA": "PIRELLI",
      "MEDIDA": "110/90-19",
      "ANCHO": 110,
      "RELACION": 90,
      "RODADO": 19,
      "POSICION": "TRASERA"
    }
  },
  {
    "id": 19,
    "brand": "PIRELLI",
    "title": "2.50-17 M/C TL 38P SUPER CITY FRONT",
    "code": "001001010165",
    "price": 77564.7,
    "originalPrice": 86183,
    "image": "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-1_min.jpg",
    "stock": {
      "BUE": 6,
      "CUYO": 5,
      "NEA": 0,
      "NOA": 7
    },
    "width": 2.5,
    "ratio": 0,
    "rim": 17,
    "type": "CUBIERTAS",
    "subtype": "CUBIERTAS MOTO",
    "origin": "Importado",
    "isNew": false,
    "attrs": {
      "MARCA": "PIRELLI",
      "MEDIDA": "2.50-17",
      "ANCHO": 2.5,
      "RELACION": 0,
      "RODADO": 17,
      "POSICION": "DELANTERA"
    }
  },
  {
    "id": 31,
    "brand": "KENDA",
    "title": "110/100-18 64M TT K771 MILLVILLE KENDA",
    "code": "001001040001",
    "price": 62587.8,
    "originalPrice": 69542,
    "image": "https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/26012018_K771_min.jpg",
    "stock": {
      "BUE": 4,
      "CUYO": 10,
      "NEA": 0,
      "NOA": 4
    },
    "width": 110,
    "ratio": 100,
    "rim": 18,
    "type": "CUBIERTAS",
    "subtype": "CUBIERTAS MOTO",
    "origin": "Importado",
    "isNew": false,
    "attrs": {
      "MARCA": "KENDA",
      "MEDIDA": "110/100-18",
      "ANCHO": 110,
      "RELACION": 100,
      "RODADO": 18,
      "POSICION": "TRASERA"
    }
  },
  {
    "id": 100,
    "brand": "BATERIAS",
    "title": "BATERIA YUASA YTX9-BS",
    "code": "BAT-YUASA-YTX9",
    "price": 45000,
    "originalPrice": 50000,
    "image": "https://via.placeholder.com/200?text=Bateria+Yuasa",
    "stock": {
      "BUE": 10,
      "CUYO": 2,
      "NEA": 5,
      "NOA": 3
    },
    "width": 0,
    "ratio": 0,
    "rim": 0,
    "type": "ACCESORIOS",
    "subtype": "BATERIAS",
    "origin": "Importado",
    "isNew": true,
    "attrs": {
      "MARCA": "YUASA",
      "VOLTAJE": "12V",
      "AMPERAJE": "9AH"
    }
  }
];
