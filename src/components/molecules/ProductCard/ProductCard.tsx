"use client";
import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "../../../types/product";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  onProductClick: (id: string) => void;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
  onToggleFavorite,
}) => {
  const discountPct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div
      className={styles.productCard}
      onClick={() => onProductClick(product.id)}
    >
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <img
          src={product.images[0] ?? "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
        />
        {discountPct > 0 && (
          <span className={styles.discountBadge}>-{discountPct}%</span>
        )}
      </div>

      {/* Información */}
      <div className={styles.info}>
        <h3 className={styles.title}>{product.name}</h3>

        <div className={styles.price}>
          <span className={styles.current}>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className={styles.original}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cartBtn}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
          >
            <ShoppingCart size={16} />
            <span>Comprar</span>
          </button>
          <button
            className={`${styles.favBtn} ${
              product.isFavorite ? styles.favActive : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
