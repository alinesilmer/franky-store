"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Collection.module.scss";

import OfferCard from "../../../../components/atoms/OfferCard/OfferCard";
import ProductDetailModal from "../../../../components/molecules/ProductDetailModal/ProductDetailModal";
import type { Product } from "../../../../types/product";
import { DUMMY_PRODUCTS } from "../../../../lib/auth";

const Collection: React.FC = () => {
  const [selected, setSelected] = useState<Product | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const CARD_PLUS_GAP = 320;
  const PAGE_WIDTH = CARD_PLUS_GAP * 3;

  const slide = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const dx = dir === "left" ? -PAGE_WIDTH : PAGE_WIDTH;
    trackRef.current.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>OFERTAS DEL MES</h2>
      <p className={styles.subtitle}>
        Descubre lo último en moda urbana. Estilo fresco y auténtico para la
        calle.
      </p>

      <div className={styles.carousel}>
        {/* viewport masks overflow */}
        <div className={styles.viewport}>
          <div className={styles.track} ref={trackRef}>
            {DUMMY_PRODUCTS.map((p, i) => (
              <OfferCard
                key={p.id}
                product={p}
                onProductClick={() => setSelected(p)}
                onAddToCart={(id) => console.log("Carrito →", id)}
                onAddToFavorites={(id) => console.log("Favorito →", id)}
                animationDelay={i}
                className={styles.cardShell}
              />
            ))}
          </div>
        </div>

        {/* arrows outside viewport */}
        <button
          className={`${styles.chevron} ${styles.left}`}
          aria-label="Anterior"
          onClick={() => slide("left")}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`${styles.chevron} ${styles.right}`}
          aria-label="Siguiente"
          onClick={() => slide("right")}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {selected && (
        <ProductDetailModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default Collection;
