import type { Product } from "../types/product";

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "password123";
export const CLIENT_USERNAME = "cliente";
export const CLIENT_PASSWORD = "clientepass";

const make = (p: Omit<Product, "image"> & { image: string }): Product => p;

import offer from "../assets/images/Offer1.jpg";
import offer2 from "../assets/images/Offer2.jpg";
import offer3 from "../assets/images/Offer3.jpg";
import offer4 from "../assets/images/Offer4.jpg";
import offer5 from "../assets/images/Offer5.jpg";

export const DUMMY_PRODUCTS: Product[] = [
  make({
    id: "1",
    name: 'Camiseta "Graffiti Vibes"',
    description:
      "Camiseta de algodón con estampado de graffiti. Perfecta para un look urbano y desenfadado.",
    price: 35,
    originalPrice: 45,
    image:
      offer,
    category: "Camisetas",
    brand: "Urban Store",
    colors: ["#000000", "#ffffff", "#e63946"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 132,
    inStock: true,
    isNew: true,
    isBestSeller: true,
    isFavorite: true,
    tags: ["urbano", "graffiti", "streetwear"],
    createdAt: "2025-07-20",
  }),
  make({
    id: "2",
    name: 'Sudadera "Urban Flow"',
    description:
      "Sudadera con capucha y diseño minimalista. Ideal para el día a día y para mantenerte abrigado con estilo.",
    price: 55,
    originalPrice: 72,
    image:
      offer2,
    category: "Sudaderas",
    brand: "Urban Store",
    colors: ["#2a9d8f", "#264653", "#f4a261"],
    sizes: ["M", "L", "XL"],
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
    isNew: true,
  }),
  make({
    id: "3",
    name: 'Gorra "Street King"',
    description:
      "Gorra snapback con bordado 3D. Un accesorio imprescindible para completar tu outfit urbano.",
    price: 25,
    originalPrice: 30,
    image:
      offer3,
    category: "Accesorios",
    brand: "Street King",
    colors: ["#000000", "#ffffff"],
    sizes: ["One Size"],
    rating: 4.2,
    reviewCount: 67,
    inStock: true,
  }),
  make({
    id: "4",
    name: 'Pantalón Cargo "Explorer"',
    description:
      "Pantalón cargo resistente con múltiples bolsillos para mayor funcionalidad y estilo.",
    price: 65,
    originalPrice: 80,
    image:
      offer4,
    category: "Pantalones",
    brand: "Explorer Gear",
    colors: ["#8d99ae", "#2b2d42"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 159,
    inStock: true,
    isBestSeller: true,
  }),
  make({
    id: "5",
    name: 'Chaqueta "Bomber Style"',
    description:
      "Chaqueta bomber con forro interior. Un clásico reinventado para un look moderno y atrevido.",
    price: 85,
    originalPrice: 110,
    image:
     offer5,
    category: "Chaquetas",
    brand: "Urban Store",
    colors: ["#1d3557", "#457b9d"],
    sizes: ["M", "L", "XL"],
    rating: 4.9,
    reviewCount: 276,
    inStock: true,
    isNew: true,
    isBestSeller: true,
  }),
];
