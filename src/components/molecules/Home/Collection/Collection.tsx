// src/components/pages/Collection/Collection.tsx
"use client";

import React, { useState } from "react";
import styles from "./Collection.module.scss";
import Card from "../../../atoms/Card/Card";
import ProductDetailModal from "../../../molecules/ProductDetailModal/ProductDetailModal";
import type { Product } from "../../../../types/models";
import { DUMMY_PRODUCTS } from "../../../../lib/auth";

const Collection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>NUEVA COLECCIÓN</h2>
        <p className={styles.subtitle}>
          Descubre lo último en moda urbana. Estilo fresco y auténtico para la
          calle.
        </p>

        <div className={styles.sliderWrapper}>
          <div className={styles.productGrid}>
            {DUMMY_PRODUCTS.map((product) => {
              const price =
                typeof product.price === "number"
                  ? product.price
                  : Number(product.price ?? 0);

              return (
                <Card
                  key={product.id}
                  imageSrc={product.image}
                  imageAlt={product.name}
                  onClick={() => setSelectedProduct(product)}
                >
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${price.toFixed(2)}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default Collection;
