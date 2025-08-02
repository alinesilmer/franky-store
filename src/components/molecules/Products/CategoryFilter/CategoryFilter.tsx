// CategoryFilter.tsx
"use client";

import React from "react";
import styles from "./CategoryFilter.module.scss";

export interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoryFilterProps {
  /** currently active category */
  selectedCategory: string;
  /** notify parent of a new category selection */
  onCategoryChange: (categoryId: string) => void;
}

const CATEGORIES: Category[] = [
  {
    id: "todos",
    name: "Todos",
    image:
      "https://i.pinimg.com/1200x/70/96/ff/7096ff5fa092279eca064bad51de94fc.jpg",
  },
  {
    id: "Remeras",
    name: "Remeras",
    image:
      "https://i.pinimg.com/1200x/ce/cb/61/cecb61bb3ac59033815b5b7234c13c9d.jpg",
  },
  {
    id: "Buzos",
    name: "Buzos",
    image:
      "https://i.pinimg.com/1200x/27/57/df/2757dfee972ab472a7dbd0e3436f22eb.jpg",
  },
  {
    id: "Gorras",
    name: "Gorras",
    image:
      "https://i.pinimg.com/736x/b2/ee/ae/b2eeae93eb325fbc6f0b96f872ae8e22.jpg",
  },
  {
    id: "Pantalones",
    name: "Pantalones",
    image:
      "https://i.pinimg.com/1200x/93/d9/07/93d90707220ab58c7731f4d3b21cfc8a.jpg",
  },
  {
    id: "Camisas",
    name: "Camisas",
    image:
      "https://i.pinimg.com/1200x/68/16/33/681633761ea74d65e2e8eaa0ea0a79fb.jpg",
  },
  {
    id: "Zapatillas",
    name: "Zapatillas",
    image:
      "https://i.pinimg.com/1200x/60/1f/de/601fde622773a2b8f438fdc0976284b9.jpg",
  },
  {
    id: "Accesorios",
    name: "Accesorios",
    image:
      "https://i.pinimg.com/736x/5d/7d/8b/5d7d8b574a078a241cd762a73755afd0.jpg",
  },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <section className={styles.productCategoryPreview}>
      <div className={styles.sliderWrapper}>
        <div className={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              <div className={styles.imageContainer}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={styles.categoryImage}
                />
              </div>
              <button
                className={`${styles.categoryNameButton} ${
                  selectedCategory === category.id ? styles.active : ""
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
