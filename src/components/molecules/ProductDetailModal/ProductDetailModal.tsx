"use client";

import React, { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import Modal from "../../atoms/Modal/Modal";
import { Button } from "../../atoms/Button/Button";
import type { Product } from "../../../types/product";
import styles from "./ProductDetailModal.module.scss";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<Props> = ({ product, onClose }) => {
  /* ---------------- state for selections ---------------- */
  const [size, setSize] = useState<string | null>(product.sizes?.[0] ?? null);
  const [color, setColor] = useState<string | null>(
    product.colors?.[0] ?? null
  );

  /* ---------------- helpers ---------------- */
  const rating = product.rating ?? 0;
  const primaryImage =
    product.image || product.images?.[0] || "/placeholder.svg";

  const renderStars = (value: number) =>
    Array.from({ length: 5 }, (_, i) => {
      const n = i + 1;
      if (value >= n) return <Star key={n} fill="currentColor" size={20} />;
      if (value >= n - 0.5)
        return <StarHalf key={n} fill="currentColor" size={20} />;
      return <Star key={n} size={20} />;
    });

  /* ---------------- JSX ---------------- */
  return (
    <Modal title={product.name} onClose={onClose}>
      <div className={styles.productDetail}>
        {/* ---------- Image ---------- */}
        <div className={styles.imageContainer}>
          <img src={primaryImage} alt={product.name} className={styles.image} />
        </div>

        {/* ---------- Info ---------- */}
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>

          <p className={styles.price}>
            ${product.price.toFixed(2)}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={styles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </p>

          <div className={styles.rating}>
            {renderStars(rating)}
            <span className={styles.ratingText}>({rating.toFixed(1)} / 5)</span>
          </div>

          <p className={styles.description}>
            {product.description ||
              "Prenda de alta calidad. Disponible en varias tallas y colores."}
          </p>

          {/* ---------- Options ---------- */}
          <div className={styles.options}>
            {!!product.sizes?.length && (
              <div className={styles.optionGroup}>
                <span className={styles.optionLabel}>Talles:</span>
                <div className={styles.optionValues}>
                  {product.sizes.map((s) => (
                    <span
                      key={s}
                      className={`${styles.optionValue} ${
                        s === size ? styles.active : ""
                      }`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!!product.colors?.length && (
              <div className={styles.optionGroup}>
                <span className={styles.optionLabel}>Colores:</span>
                <div className={styles.optionValues}>
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className={`${styles.colorSwatch} ${
                        c === color ? styles.active : ""
                      }`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ---------- CTA ---------- */}
          <Button
            variant="primary"
            size="lg"
            onClick={() => console.log("Add:", { id: product.id, size, color })}
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
