"use client";

import React, { useState, useEffect } from "react";
import { Heart, Clock } from "lucide-react";
import { Button } from "../../../components/atoms/Button/Button"; // ✅ import
import type { Product } from "../../../types/product";
import styles from "./OfferCard.module.scss";

export interface OfferCardProps {
  product: Product;
  onProductClick: (id: string) => void;
  onAddToCart: (id: string) => void;
  onAddToFavorites: (id: string) => void;
  animationDelay?: number;
  className?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
  onAddToFavorites,
  animationDelay = 0,
  className,
}) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite ?? false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86_400);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), animationDelay * 100);
    return () => clearTimeout(t);
  }, [animationDelay]);

  useEffect(() => {
    if (product.originalPrice && product.originalPrice > product.price) {
      const i = setInterval(
        () => setTimeLeft((s) => (s > 0 ? s - 1 : 0)),
        1_000
      );
      return () => clearInterval(i);
    }
  }, [product.originalPrice, product.price]);

  const cover = product.images?.[0] ?? product.image;
  const discount =
    product.originalPrice && product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const fmt = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <article
      className={`${styles.offerCard} ${isVisible ? styles.visible : ""} ${
        className ?? ""
      }`}
      style={
        {
          "--animation-delay": `${animationDelay * 0.1}s`,
        } as React.CSSProperties
      }
      onClick={() => onProductClick(product.id)}
    >
      {/* ---------- Media ---------- */}
      <div className={styles.imageContainer}>
        {discount > 0 && (
          <span className={styles.discountBadge}>{discount}% OFF</span>
        )}

        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite((v) => !v);
            onAddToFavorites(product.id);
          }}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <div className={styles.imageWrapper}>
          <img
            src={cover}
            alt={product.name}
            className={styles.productImage}
            loading="lazy"
          />
        </div>

        {discount > 0 && timeLeft > 0 && (
          <div className={styles.countdownTimer} aria-live="polite">
            <Clock size={12} />
            <span>{fmt(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* ---------- Info ---------- */}
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>

        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={product.inStock === false}
          onClick={() => onAddToCart(product.id)}
          type="button"
        >
          {product.inStock === false ? "Sin stock" : "Ver más"}
        </Button>
      </div>
    </article>
  );
};

export default OfferCard;
