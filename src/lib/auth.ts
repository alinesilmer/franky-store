import type { Product } from "../types/product";

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "password123";
export const CLIENT_USERNAME = "cliente";
export const CLIENT_PASSWORD = "clientepass";

const make = (p: Omit<Product, "image"> & { image: string }): Product => p;

export const DUMMY_PRODUCTS: Product[] = [
  make({
    id: "1",
    name: 'Camiseta "Graffiti Vibes"',
    description:
      "Camiseta de algodón con estampado de graffiti. Perfecta para un look urbano y desenfadado.",
    price: 35,
    originalPrice: 45,
    image:
      "https://i.pinimg.com/736x/03/75/a1/0375a1d05f1602de63eb75e9f8c1ed33.jpg",
    images: [
      "https://i.pinimg.com/736x/03/75/a1/0375a1d05f1602de63eb75e9f8c1ed33.jpg",
      "https://i.pinimg.com/736x/67/b1/89/67b189c4abc.jpg",
    ],
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
      "https://i.pinimg.com/1200x/29/6e/3d/296e3d42d0063684c865d160fa0edaec.jpg",
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
      "https://i.pinimg.com/1200x/7c/1e/09/7c1e0985cb7578ce8d2b70354f30b66f.jpg",
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
      "https://i.pinimg.com/1200x/45/c4/12/45c4124392e77995898be819258547a0.jpg",
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
      "https://i.pinimg.com/1200x/77/f2/6c/77f26c15e222aa70e92ded86caa01c3f.jpg",
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
