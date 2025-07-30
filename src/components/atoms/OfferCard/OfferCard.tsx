"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../../components/atoms/Button/Button";
import { Heart, ShoppingCart, Star, Eye, Zap, Timer } from "lucide-react";
import type { Product } from "../../../types/product";
import styles from "./OfferCard.module.scss";

interface OfferCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onAddToFavorites: (productId: string) => void;
  animationDelay?: number;
}

const OfferCard: React.FC<OfferCardProps> = ({
  product,
  onProductClick,
  onAddToFavorites,
  animationDelay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora en segundos para ofertas flash

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), animationDelay * 1000);
    return () => clearTimeout(timer);
  }, [animationDelay]);

  useEffect(() => {
    if (product.originalPrice && product.originalPrice > product.price) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [product.originalPrice, product.price]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onAddToFavorites(product.id);
  };
  const handleCardClick = () => {
    onProductClick(product.id);
  };

  return (
    <div
      className={`${styles.offerCard} ${isVisible ? styles.visible : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={
        { "--animation-delay": `${animationDelay}s` } as React.CSSProperties
      }
    >
      {/* Badges */}
      <div className={styles.badges}>
        {product.isNew && (
          <span className={`${styles.badge} ${styles.newBadge}`}>
            <Zap size={12} />
            Nuevo
          </span>
        )}
        {product.isBestSeller && (
          <span className={`${styles.badge} ${styles.bestSellerBadge}`}>
            ⭐ Best Seller
          </span>
        )}
        {discountPercentage > 0 && (
          <span className={`${styles.badge} ${styles.discountBadge}`}>
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Imagen del producto */}
      <div className={styles.imageContainer}>
        <img
          src={product.images[0] || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className={styles.productImage}
        />

        {/* Overlay con acciones rápidas */}
        <div
          className={`${styles.imageOverlay} ${
            isHovered ? styles.visible : ""
          }`}
        >
          <button
            className={styles.quickViewBtn}
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product.id);
            }}
          >
            <Eye size={16} />
            <span>Vista Rápida</span>
          </button>
        </div>

        {/* Botón de favoritos */}
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
          onClick={handleFavoriteClick}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Timer para ofertas flash */}
        {discountPercentage > 0 && timeLeft > 0 && (
          <div className={styles.flashTimer}>
            <Timer size={12} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className={styles.productInfo}>
        <div className={styles.productHeader}>
          <h3 className={styles.productTitle}>{product.name}</h3>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? "#fdd835" : "none"}
                  color="#fdd835"
                />
              ))}
            </div>
            <span className={styles.ratingText}>({product.reviewCount})</span>
          </div>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {discountPercentage > 0 && (
            <div className={styles.savings}>
              ¡Ahorras ${(product.originalPrice! - product.price).toFixed(2)}!
            </div>
          )}
        </div>

        {/* Indicador de stock */}
        <div className={styles.stockIndicator}>
          {product.inStock ? (
            <span className={styles.inStock}>✓ En Stock</span>
          ) : (
            <span className={styles.outOfStock}>⚠ Agotado</span>
          )}
        </div>

        {/* Botones de acción */}
        <div className={styles.actionButtons}>
          <Button
            variant="primary"
            size="sm"
            disabled={!product.inStock}
            className={styles.addToCartBtn}
          >
            <ShoppingCart size={16} />
            <span>Añadir al Carrito</span>
          </Button>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div
        className={`${styles.shineEffect} ${isHovered ? styles.active : ""}`}
      />
    </div>
  );
};

export default OfferCard;
