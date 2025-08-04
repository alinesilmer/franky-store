import type { Product, OutfitCollection } from "../types/product"

import urbanvibes from "../assets/images/products/UrbanVibes.jpg"
import urbanvibes2 from "../assets/images/products/UrbanVibes2.jpg"
import shoes1 from "../assets/images/products/shoes1.jpg";
import shoes2 from "../assets/images/products/shoes2.jpg";
import shoes3 from "../assets/images/products/shoes3.jpg";
import shoes4 from "../assets/images/products/shoes4.jpg";
import buzo1 from "../assets/images/products/buzo.jpg"
import buzo2 from "../assets/images/products/buzo2.jpg"
import jean1 from "../assets/images/products/jean1.jpg"
import jean2 from "../assets/images/products/jean2.jpg"
import jean3 from "../assets/images/products/jean3.jpg"

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Remera Urban Vibes",
    description: "Remera de algodón premium con diseño urbano exclusivo",
    price: 45.99,
    originalPrice: undefined,
    category: "Remeras",         
    brand: "Urban Store",
    image: urbanvibes,
    images: [
      urbanvibes,
      urbanvibes2,
    ],
    colors: ["purple", "white", "black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isFavorite: false,
    tags: ["algodón", "urbano", "cómodo"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Buzo Retro Flow",
    description: "Buzo con capucha y diseño de graffiti auténtico",
    price: 89.99,
    originalPrice: 109.99,
    category: "Buzos",       
    brand: "Street Art Co.",
    image: buzo1,
    images: [
      buzo1,
      buzo2,
    ],
    colors: ["black", "gray", "blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isFavorite: true,
    tags: ["capucha", "graffiti", "streetwear"],
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Zapatillas Street Runner",
    description: "Zapatillas deportivas con diseño urbano y máxima comodidad",
    price: 125.0,
    originalPrice: 149.99,
    category: "Zapatillas",     
    brand: "Urban Kicks",
    image: shoes1,
    images: [
    shoes1,
    shoes2,
    shoes3,
    shoes4
    ],
    colors: ["white", "black", "gray", "blue"],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    isNew: true,
    isBestSeller: true,
    isFavorite: true,
    tags: ["deportivo", "cómodo", "urbano"],
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    name: "Jeans City Style",
    description: "Pantalón urbano con corte moderno y detalles únicos",
    price: 67.75,
    originalPrice: undefined,
    category: "Pantalones",         
    brand: "City Wear",
    image: jean1,
    images: [
      jean1,
      jean2,
      jean3,
    ],
    colors: ["black", "blue", "gray"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    isNew: false,
    isBestSeller: false,
    isFavorite: false,
    tags: ["moderno", "cómodo", "versátil"],
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Gorra Street King",
    description: "Gorra snapback con bordado exclusivo y ajuste perfecto",
    price: 32.5,
    originalPrice: 42.0,
    category: "Gorras",          
    brand: "King Caps",
    image: "https://i.pinimg.com/1200x/eb/dc/d0/ebdcd009310150015654699d5e79cdfd.jpg",
    images: [
      "https://i.pinimg.com/1200x/eb/dc/d0/ebdcd009310150015654699d5e79cdfd.jpg",
      "https://i.pinimg.com/1200x/93/ec/57/93ec575bfca9c6778a731a27dfde669c.jpg",
      "https://i.pinimg.com/1200x/6b/31/b9/6b31b9a6cb2f4390392efaaea4ff5374.jpg",
    ],
    colors: ["negro", "blanco", "rojo"],
    sizes: ["U"],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isFavorite: false,
    tags: ["snapback", "bordado", "ajustable"],
    createdAt: "2024-01-08",
  },
  {
    id: "6",
    name: "Reloj Urban Time",
    description: "Reloj digital con diseño futurista y múltiples funciones",
    price: 95.0,
    originalPrice: undefined,
    category: "Accesorios",    // matches your “Accesorios” filter ID
    brand: "Tech Time",
    image: "https://i.pinimg.com/736x/1a/01/95/1a01957c71c4bdd1f7e2549b05020d7d.jpg",
    images: [
      "https://i.pinimg.com/736x/1a/01/95/1a01957c71c4bdd1f7e2549b05020d7d.jpg",
      "https://i.pinimg.com/736x/71/be/af/71beaf76082b8efc0f12c48a59919f9d.jpg",
    ],
    colors: ["negro", "blanco", "gris"],
    sizes: ["U"],
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isFavorite: false,
    tags: ["digital", "resistente", "multifunción"],
    createdAt: "2024-01-18",
  },
];

import Outfit1 from "../assets/images/FullOutfit1.jpg";
import Outfit2 from "../assets/images/FullOutfit2.jpg";
import Outfit3 from "../assets/images/FullOutfit3.jpg";
import fulloutmodel from "../assets/images/fulloutmodel1.jpg"
import fulloutmodel2 from "../assets/images/fulloutmodel2.jpg"
import fulloutmodel3 from "../assets/images/fulloutmodel3.jpg"
import fulloutmodel4 from "../assets/images/fulloutmodel4.jpg"
import fulloutmodel5 from "../assets/images/fulloutmodel5.jpg"
import fulloutmodel6 from "../assets/images/fulloutmodel6.jpg"
import fulloutmodel7 from "../assets/images/fulloutmodel7.jpg"

export const OUTFIT_COLLECTIONS: OutfitCollection[] = [
  {
    id: "street-essentials",
    name: "Street Essentials",
    description: "Lo esencial para tu look urbano diario",
    heroImage:
      Outfit1,
    outfits: [
      {
        id: "outfit-1",
        name: "Urban Classic",
        image: fulloutmodel,
        totalPrice: 189.99,
        originalPrice: 229.99,
        items: ["Buzo", "Pantalón Cargo", "Zapatillas Street"],
      },
      {
        id: "outfit-2",
        name: "Street Comfort",
        image: fulloutmodel3,
        totalPrice: 159.99,
        originalPrice: 199.99,
        items: ["Remera", "Jean Baggy", "Sneakers"],
      },
      {
        id: "outfit-3",
        name: "Night Vibes",
        image: fulloutmodel7,
        totalPrice: 219.99,
        items: ["Buzo Premium", "Jean Baggy", "Botas Urban"],
      },
    ],
  },
  {
    id: "premium-collection",
    name: "Premium Collection",
    description: "Piezas exclusivas para ocasiones especiales",
    heroImage:
     Outfit2,
    outfits: [
      {
        id: "outfit-4",
        name: "Baseball Street",
        image: fulloutmodel4,
        totalPrice: 299.99,
        originalPrice: 359.99,
        items: ["Oversize Premium", "Bermuda", "Zapatillas"],
      },
      {
        id: "outfit-5",
        name: "Weekend Luxury",
        image: fulloutmodel5,
        totalPrice: 249.99,
        items: ["Camisa Luxury", "Jeans", "Sneakers"],
      },
    ],
  },
  {
    id: "seasonal-trends",
    name: "Tendencias de Temporada",
    description: "Los looks más actuales de la temporada",
    heroImage: Outfit3,
    outfits: [
      {
        id: "outfit-6",
        name: "Spring Fresh",
        image: fulloutmodel6,
        totalPrice: 179.99,
        items: ["Camiseta Oversize", "Joggings", "Sneakers"],
      },
      {
        id: "outfit-7",
        name: "Summer Vibes",
        image: fulloutmodel2,
        totalPrice: 139.99,
        originalPrice: 169.99,
        items: ["Remera Oversize", "Bermuda", "Sneakers"],
      },
    ],
  },
]
