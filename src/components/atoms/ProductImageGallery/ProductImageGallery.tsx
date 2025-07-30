"use client";
import type React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import styles from "./ProductImageGallery.module.scss";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className={styles.imageGallery}>
      {/* Imagen principal */}
      <div className={styles.mainImageContainer}>
        <div className={styles.mainImage}>
          <img
            src={
              images[currentImage] || "/placeholder.svg?height=600&width=600"
            }
            alt={`${productName} - Vista ${currentImage + 1}`}
            className={`${styles.image} ${isZoomed ? styles.zoomed : ""}`}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={prevImage}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={nextImage}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Botón de zoom */}
          <button
            className={styles.zoomBtn}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <ZoomIn size={16} />
          </button>

          {/* Indicador de imagen actual */}
          {images.length > 1 && (
            <div className={styles.imageCounter}>
              {currentImage + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className={styles.thumbnailContainer}>
          <div className={styles.thumbnailGrid}>
            {images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  index === currentImage ? styles.active : ""
                }`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image || "/placeholder.svg?height=100&width=100"}
                  alt={`${productName} - Miniatura ${index + 1}`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
