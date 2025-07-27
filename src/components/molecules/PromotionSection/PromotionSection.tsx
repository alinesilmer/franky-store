"use client";

import type React from "react";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../atoms/Button/Button";
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
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-07-27%20123703-XM9P67Vlo8YJHSdtPEc1FKHApClmug.png",
  },
  {
    id: "promo2",
    name: "SUDADERA GRAFFITI",
    originalPrice: 35000,
    discountedPrice: 25000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "promo3",
    name: "PANTALÓN CARGO",
    originalPrice: 45000,
    discountedPrice: 30000,
    image: "/placeholder.svg?height=300&width=300",
  },
];

export const PromotionSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? PROMOTIONS.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === PROMOTIONS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentPromotion = PROMOTIONS[currentIndex];

  const itemVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className={styles.promotionSection}>
      <div className={styles.horizontalLine}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.modelImage}>
          {/* Usando <img> tag en lugar de Next/Image */}
          <img
            src="/placeholder.svg?height=500&width=400"
            alt="Modelo de ropa urbana"
            width={400}
            height={500}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.promotionCarousel}>
          <button
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <ChevronLeft size={48} />
          </button>
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentPromotion.id}
              custom={currentIndex}
              variants={itemVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className={styles.promotionItem}
            >
              <h3 className={styles.productName}>{currentPromotion.name}</h3>
              <div className={styles.productImageContainer}>
                {/* Usando <img> tag en lugar de Next/Image */}
                <img
                  src={currentPromotion.image || "/placeholder.svg"}
                  alt={currentPromotion.name}
                  width={300}
                  height={300}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className={styles.originalPrice}>
                ${currentPromotion.originalPrice.toLocaleString("es-ES")}
              </p>
              <p className={styles.discountedPrice}>
                ${currentPromotion.discountedPrice.toLocaleString("es-ES")}
              </p>
              <Button variant="secondary" className={styles.addToCartButton}>
                Añadir al Carrito
              </Button>
            </motion.div>
          </AnimatePresence>
          <button
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Siguiente"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
    </section>
  );
};
