"use client";

import type React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PromotionSection.module.scss";
import offer from "../assets/images/Offer1.jpg";
import offer2 from "../assets/images/Offer2.jpg";
import offer3 from "../assets/images/Offer3.jpg";
import offer4 from "../assets/images/Offer4.jpg";

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
    image: offer,
  },
  {
    id: "promo2",
    name: "SUDADERA GRAFFITI",
    originalPrice: 35000,
    discountedPrice: 25000,
    image: offer2,
  },
  {
    id: "promo3",
    name: "PANTALÓN CARGO",
    originalPrice: 45000,
    discountedPrice: 30000,
    image: offer3,
  },
  {
    id: "promo4",
    name: "ZAPATILLAS RETRO",
    originalPrice: 50000,
    discountedPrice: 38000,
    image: offer4,
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
