"use client";

import type React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PromotionSection.module.scss";

interface PromotionItem {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
}

const PROMOTIONS: PromotionItem[] = [
  {
    id: "promo1",
    name: "CAMPERA URBAN",
    originalPrice: 29000,
    discountedPrice: 18000,
    image:
      "https://i.pinimg.com/736x/92/0a/b6/920ab628bb7f66b9e762ed4968757615.jpg",
  },
  {
    id: "promo2",
    name: "SUDADERA GRAFFITI",
    originalPrice: 35000,
    discountedPrice: 25000,
    image:
      "https://i.pinimg.com/736x/5e/df/df/5edfdf6f4b6c1e227b8494388b053ac2.jpg",
  },
  {
    id: "promo3",
    name: "PANTALÓN CARGO",
    originalPrice: 45000,
    discountedPrice: 30000,
    image:
      "https://i.pinimg.com/736x/24/d5/11/24d5110b08173bd516292d3149569c4d.jpg",
  },
  {
    id: "promo4",
    name: "ZAPATILLAS RETRO",
    originalPrice: 50000,
    discountedPrice: 38000,
    image:
      "https://i.pinimg.com/736x/5d/e3/98/5de398fa561154137add1af1170adf79.jpg",
  },
];

export const PromotionSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i === 0 ? PROMOTIONS.length - 1 : i - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((i) => (i === PROMOTIONS.length - 1 ? 0 : i + 1));
  };

  const current = PROMOTIONS[currentIndex];

  // Rotate ONLY the product, not the hanger/rail

  return (
    <section className={styles.promotionSection}>
      <div className={styles.horizontalLine} />
      <div className={styles.contentWrapper}>
        <div className={styles.modelImage}>
          <img
            src="/images/model-urban.png"
            alt="Modelo urbano"
            width={700}
            height={520}
            loading="lazy"
          />
        </div>

        <div className={styles.promotionCardWrapper}>
          <h3 className={styles.productName}>{current.name}</h3>

          {/* Arrows positioned relative to wrapper, outside the card */}
          <button
            className={`${styles.navButton} ${styles.left}`}
            onClick={handlePrev}
            aria-label="Anterior"
            type="button"
          >
            <ChevronLeft size={36} />
          </button>

          <div className={styles.promotionCard}>
            <div className={styles.rail} aria-hidden="true" />
            <img
              src="/images/hanger.png"
              alt=""
              className={styles.hangerImage}
              aria-hidden="true"
            />

            <div className={styles.productStage}>
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  className={styles.productImage}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ willChange: "transform, opacity" }}
                />
              </AnimatePresence>
            </div>

            <p className={styles.originalPrice}>
              ${current.originalPrice.toLocaleString("es-ES")}
            </p>
          </div>

          <button
            className={`${styles.navButton} ${styles.right}`}
            onClick={handleNext}
            aria-label="Siguiente"
            type="button"
          >
            <ChevronRight size={36} />
          </button>

          <p className={styles.discountedPrice}>
            ${current.discountedPrice.toLocaleString("es-ES")}
          </p>
        </div>
      </div>
      <div className={styles.horizontalLine} />
    </section>
  );
};
