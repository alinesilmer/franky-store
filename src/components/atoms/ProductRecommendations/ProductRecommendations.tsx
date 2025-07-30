"use client";
import type React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OfferCard from "../OfferCard/OfferCard";
import { PRODUCTS_DATA } from "../../../lib/productsData";
import styles from "./ProductRecommendations.module.scss";

interface ProductRecommendationsProps {
  currentProductId: string;
  category: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProductId,
  category,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filtrar productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = PRODUCTS_DATA.filter(
    (product) =>
      product.id !== currentProductId && product.category === category
  ).slice(0, 8); // Limitar a 8 productos

  const productsPerSlide = 4;
  const totalSlides = Math.ceil(relatedProducts.length / productsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * productsPerSlide;
    return relatedProducts.slice(startIndex, startIndex + productsPerSlide);
  };

  const handleProductClick = (productId: string) => {
    // Navegar al producto (esto se manejará desde el componente padre)
    window.location.href = `/products/${productId}`;
  };

  const handleAddToCart = (productId: string) => {
    console.log("Añadir al carrito:", productId);
  };

  const handleAddToFavorites = (productId: string) => {
    console.log("Añadir a favoritos:", productId);
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.productRecommendations}>
      <div className={styles.recommendationsHeader}>
        <h2 className={styles.recommendationsTitle}>También te puede gustar</h2>

        {totalSlides > 1 && (
          <div className={styles.carouselControls}>
            <button className={styles.carouselBtn} onClick={prevSlide}>
              <ChevronLeft size={20} />
            </button>
            <button className={styles.carouselBtn} onClick={nextSlide}>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.recommendationsCarousel}>
        <div className={styles.productsGrid}>
          {getCurrentProducts().map((product, index) => (
            <OfferCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
              onAddToFavorites={handleAddToFavorites}
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        {totalSlides > 1 && (
          <div className={styles.slideIndicators}>
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                className={`${styles.slideIndicator} ${
                  index === currentSlide ? styles.active : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRecommendations;
