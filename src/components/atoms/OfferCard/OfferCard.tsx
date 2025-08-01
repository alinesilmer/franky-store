"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Clock } from "lucide-react";
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
  onAddToCart,
  onAddToFavorites,
  animationDelay = 0,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 horas en segundos

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), animationDelay * 100);
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

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  const handleCardClick = () => {
    onProductClick(product.id);
  };

  return (
    <div
      className={`${styles.offerCard} ${isVisible ? styles.visible : ""}`}
      onClick={handleCardClick}
      style={
        {
          "--animation-delay": `${animationDelay * 0.1}s`,
        } as React.CSSProperties
      }
    >
      {/* Product Image Container */}
      <div className={styles.imageContainer}>
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>{discountPercentage}% off</div>
        )}

        {/* Favorite Button */}
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Product Image */}
        <div className={styles.imageWrapper}>
          <img
            src={product.images[0] || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            className={styles.productImage}
            loading="lazy"
          />
        </div>

        {/* Countdown Timer for Offers */}
        {discountPercentage > 0 && timeLeft > 0 && (
          <div className={styles.countdownTimer}>
            <Clock size={12} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        {/* Product Name */}
        <h3 className={styles.productName}>{product.name}</h3>

        {/* Price */}
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

        {/* Add to Cart Button */}
        <button
          className={styles.addToCartBtn}
          onClick={handleAddToCartClick}
          disabled={!product.inStock}
        >
          <ShoppingCart size={16} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
