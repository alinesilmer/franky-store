"use client";
import type React from "react";
import { useState } from "react";
import styles from "./Collection.module.scss";
import OfferCard from "../../../../components/atoms/OfferCard/OfferCard";
import ProductDetailModal from "../../../../components/molecules/ProductDetailModal/ProductDetailModal";
import type { Product } from "../../../../types/models";
import { DUMMY_PRODUCTS } from "../../../../lib/auth";

const Collection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (productId: string) => {
    const product = DUMMY_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleAddToCart = (productId: string) => {
    console.log("Añadir al carrito:", productId);
    // Implementar lógica del carrito
  };

  const handleAddToFavorites = (productId: string) => {
    console.log("Añadir a favoritos:", productId);
    // Implementar lógica de favoritos
  };

  // Convertir DUMMY_PRODUCTS al formato esperado por OfferCard
  const convertedProducts = DUMMY_PRODUCTS.map((product) => ({
    ...product,
    images: [product.image],
    originalPrice: product.price * 1.3, // Simular precio original más alto
    reviewCount: Math.floor(Math.random() * 200) + 10,
    inStock: true,
    isBestSeller: Math.random() > 0.7,
    tags: ["urbano", "streetwear"],
    createdAt: "2024-01-15",
    category: "camisetas",
    brand: "Urban Store",
  }));

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
            {convertedProducts.map((product, index) => (
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
