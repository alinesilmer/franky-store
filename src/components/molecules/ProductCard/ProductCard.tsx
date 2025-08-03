"use client";
import React from "react";
import { ShoppingCart, Heart, Pencil, Trash2 } from "lucide-react";
import type { Product } from "../../../types/product";
import styles from "./ProductCard.module.scss";
import { Button } from "../../atoms/Button/Button";

interface ProductCardProps {
  product: Product;
  onProductClick: (id: string) => void;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit?: (productId: string) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
  onToggleFavorite,
  onEdit,
  onDelete,
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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onProductClick(product.id);
      }}
    >
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <img
          src={product.image ?? "/placeholder.svg"}
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
          {/* Comprar */}
          <Button
            variant="third"
            size="sm"
            className={styles.cartBtn}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
          >
            <ShoppingCart size={16} />
            <span>Comprar</span>
          </Button>

          {/* Editar (opcional) */}
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product.id);
              }}
              aria-label={`Editar ${product.name}`}
              type="button"
            >
              <Pencil size={16} />
            </Button>
          )}

          {/* Eliminar (opcional) */}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
              aria-label={`Eliminar ${product.name}`}
              type="button"
            >
              <Trash2 size={16} />
            </Button>
          )}

          {/* Favorito */}
          <button
            type="button"
            className={`${styles.favBtn} ${
              product.isFavorite ? styles.favActive : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            aria-pressed={product.isFavorite}
            aria-label={`${
              product.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            } ${product.name}`}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
