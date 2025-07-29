"use client";

import type React from "react";
import { useState } from "react";
import Card from "../../../components/atoms/Card/Card"; // Import the generic Card
import ProductDetailModal from "../../../components/molecules/ProductDetailModal/ProductDetailModal"; // Import the ProductDetailModal
import { DUMMY_PRODUCTS } from "../../../lib/auth"; // Corrected import path
import type { Product } from "../../../types/models"; // Import Product type
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className={styles.productsPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>NUESTROS PRODUCTOS</h1>
          <p>
            Explora nuestra colección completa de ropa urbana. Encuentra tu
            estilo.
          </p>
        </div>
      </section>
      <section className={styles.productsGridSection}>
        <div className="container">
          <div className={styles.productGrid}>
            {DUMMY_PRODUCTS.map((product) => (
              <Card
                key={product.id}
                imageSrc={product.image}
                imageAlt={product.name}
                onClick={() => setSelectedProduct(product)} // Open modal on click
              >
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
