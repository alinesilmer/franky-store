"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../../../components/atoms/Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ProductsHero.module.scss";

const ProductsHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Nueva Colección Urbana",
      subtitle: "Descubre el Estilo de la Calle",
      image:
        "https://i.pinimg.com/1200x/3e/f4/6d/3ef46d22d547b59deb3f0bd27a7e6623.jpg",
      cta: "Explorar Colección",
    },
    {
      id: 2,
      title: "Streetwear Premium",
      subtitle: "Calidad que Marca la Diferencia",
      image:
        "https://i.pinimg.com/736x/d2/6f/57/d26f57a4d38442abf14add9b91592ba0.jpg",
      cta: "Ver Productos",
    },
    {
      id: 3,
      title: "Tendencias de Temporada",
      subtitle: "Lo Último en Moda Urbana",
      image:
        "https://i.pinimg.com/1200x/96/c7/1d/96c71d3ee7683b477ed2ff97d67352ac.jpg",
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
