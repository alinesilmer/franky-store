import type React from "react";
import { ProductCard } from "../../../components/molecules/ProductCard/ProductCard";
import { DUMMY_PRODUCTS } from "../../../lib/auth"; // Usamos los productos dummy
import styles from "./Products.module.scss";

interface ProductsProps {
  onNavigate: (path: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onNavigate }) => {
  return (
    <div className={styles.productsPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>NUESTROS PRODUCTOS</h1>
          <p>
            Explora nuestra colección completa de ropa urbana. Encuentra tu
            estilo.
          </p>
        </div>
      </section>

      <section className={styles.productsGridSection}>
        <div className="container">
          <div className={styles.productGrid}>
            {DUMMY_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
            {/* Añadir más productos dummy si es necesario para llenar la cuadrícula */}
            {DUMMY_PRODUCTS.map((product) => (
              <ProductCard
                key={`dup-${product.id}`}
                product={{ ...product, id: `dup-${product.id}` }}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
