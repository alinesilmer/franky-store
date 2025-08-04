"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../../../components/atoms/Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ProductsHero.module.scss";
// Vite turns these imports into URL strings
import Hero from "../../../../assets/images/ProductsHero1.jpg";
import Hero2 from "../../../../assets/images/ProductsHero2.jpg";
import Hero3 from "../../../../assets/images/ProductsHero3.jpg";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string; // <- URL string
  cta: string;
};

const ProductsHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides: Slide[] = [
    {
      id: 1,
      title: "Nueva Colección Urbana",
      subtitle: "Descubre el Estilo de la Calle",
      image: Hero,
      cta: "Explorar Colección",
    },
    {
      id: 2,
      title: "Streetwear Premium",
      subtitle: "Calidad que Marca la Diferencia",
      image: Hero2,
      cta: "Ver Productos",
    },
    {
      id: 3,
      title: "Tendencias de Temporada",
      subtitle: "Lo Último en Moda Urbana",
      image: Hero3,
      cta: "Comprar Ahora",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.heroSlide} ${
              index === currentSlide ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>{slide.title}</h1>
                <h2 className={styles.heroSubtitle}>{slide.subtitle}</h2>
                <div className={styles.heroActions}>
                  <Button variant="outline" size="lg">
                    {slide.cta}
                  </Button>
                  <Button variant="outline" size="lg">
                    Ver Catálogo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          className={`${styles.heroNav} ${styles.prevBtn}`}
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`${styles.heroNav} ${styles.nextBtn}`}
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </button>

        <div className={styles.heroIndicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide ? styles.active : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
