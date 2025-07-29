import { type Product } from "../types/models";

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "password123";
export const CLIENT_USERNAME = "cliente";
export const CLIENT_PASSWORD = "clientepass";

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: 'Camiseta "Graffiti Vibes"',
    price: 35.0,
    image: "https://i.pinimg.com/1200x/38/cd/89/38cd8911b8381c6e46508fe22b13225d.jpg",
    description: "Camiseta de algodón con estampado de graffiti. Perfecta para un look urbano y desenfadado.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff", "#e63946"],
    rating: 4.5,
    isNew: true,
  },
  {
    id: "2",
    name: 'Sudadera "Urban Flow"',
    price: 55.0,
    image: "https://i.pinimg.com/1200x/29/6e/3d/296e3d42d0063684c865d160fa0edaec.jpg",
    description: "Sudadera con capucha y diseño minimalista. Ideal para el día a día y para mantenerte abrigado con estilo.",
    sizes: ["M", "L", "XL"],
    colors: ["#2a9d8f", "#264653", "#f4a261"],
    rating: 4.8,
    isNew: true,
  },
  {
    id: "3",
    name: 'Gorra "Street King"',
    price: 25.0,
    image: "https://i.pinimg.com/1200x/7c/1e/09/7c1e0985cb7578ce8d2b70354f30b66f.jpg",
    description: "Gorra snapback con bordado 3D. Un accesorio imprescindible para completar tu outfit urbano.",
    sizes: ["One Size"],
    colors: ["#000000", "#ffffff"],
    rating: 4.2,
    isNew: false,
  },
  {
    id: "4",
    name: 'Pantalón Cargo "Explorer"',
    price: 65.0,
    image: "https://i.pinimg.com/1200x/45/c4/12/45c4124392e77995898be819258547a0.jpg",
    description: "Pantalón cargo resistente para el día a día. Con múltiples bolsillos para mayor funcionalidad y estilo.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#8d99ae", "#2b2d42"],
    rating: 4.7,
    isNew: false,
  },
  {
    id: "5",
    name: 'Chaqueta "Bomber Style"',
    price: 85.0,
    image: "https://i.pinimg.com/1200x/77/f2/6c/77f26c15e222aa70e92ded86caa01c3f.jpg",
    description: "Chaqueta bomber con forro interior. Un clásico reinventado para un look moderno y atrevido.",
    sizes: ["M", "L", "XL"],
    colors: ["#1d3557", "#457b9d"],
    rating: 4.9,
    isNew: true,
  },
];
