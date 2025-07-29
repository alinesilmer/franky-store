"use client";

import type React from "react";
import { Star, StarHalf } from "lucide-react";
import Modal from "../../atoms/Modal/Modal";
import type { Product } from "../../../types/models";
import styles from "./ProductDetailModal.module.scss";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<Star key={i} fill="currentColor" size={20} />);
      } else if (rating >= i - 0.5) {
        stars.push(<StarHalf key={i} fill="currentColor" size={20} />);
      } else {
        stars.push(<Star key={i} size={20} />);
      }
    }
    return stars;
  };

  return (
    <Modal title={product.name} onClose={onClose}>
      <div className={styles.productDetail}>
        <div className={styles.imageContainer}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <div className={styles.rating}>
            {renderStars(product.rating)}
            <span className={styles.ratingText}>
              ({product.rating.toFixed(1)} / 5)
            </span>
          </div>
          <p className={styles.description}>
            {product.description ||
              "Prenda de alta calidad. Disponible en varias tallas y colores."}
          </p>

          <div className={styles.options}>
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Talles:</span>
              <div className={styles.optionValues}>
                {product.sizes.map((size) => (
                  <span key={size} className={styles.optionValue}>
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Colores:</span>
              <div className={styles.optionValues}>
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className={styles.colorSwatch}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className={styles.addToCartBtn}>Agregar al Carrito</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
