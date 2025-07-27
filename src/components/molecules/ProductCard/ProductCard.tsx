"use client";

import type React from "react";
import { Button } from "../../atoms/Button/Button";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onNavigate?: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
}) => {
  const handleProductClick = () => {
    if (onNavigate) {
      onNavigate(`/products/${product.id}`);
    }
  };

  return (
    <div className={styles.productCard}>
      <a href="#" onClick={handleProductClick} className={styles.imageLink}>
        {/* Usando <img> tag en lugar de Next/Image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          style={{ objectFit: "cover" }}
          className={styles.productImage}
        />
      </a>
      <div className={styles.info}>
        <h3 className={styles.productName}>
          <a href="#" onClick={handleProductClick}>
            {product.name}
          </a>
        </h3>
        <p className={styles.productPrice}>
          ${product.price.toLocaleString("es-ES")}
        </p>
        <Button variant="primary" className={styles.addToCartButton}>
          Añadir al Carrito
        </Button>
      </div>
    </div>
  );
};
