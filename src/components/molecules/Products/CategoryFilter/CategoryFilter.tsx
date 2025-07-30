"use client";
import type React from "react";
import { Shirt, Footprints, Crown, Watch, Package } from "lucide-react";
import styles from "./CategoryFilter.module.scss";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    {
      id: "todos",
      name: "Todos",
      icon: Package,
      description: "Ver todo",
      color: "#fdd835",
    },
    {
      id: "camisetas",
      name: "Camisetas",
      icon: Shirt,
      description: "Estilo urbano",
      color: "#ff6b6b",
    },
    {
      id: "sudaderas",
      name: "Sudaderas",
      icon: Shirt,
      description: "Comodidad total",
      color: "#4ecdc4",
    },
    {
      id: "zapatillas",
      name: "Zapatillas",
      icon: Footprints,
      description: "Pisada fuerte",
      color: "#45b7d1",
    },
    {
      id: "pantalones",
      name: "Pantalones",
      icon: Shirt,
      description: "Estilo completo",
      color: "#96ceb4",
    },
    {
      id: "gorras",
      name: "Gorras",
      icon: Crown,
      description: "Toque final",
      color: "#feca57",
    },
    {
      id: "accesorios",
      name: "Accesorios",
      icon: Watch,
      description: "Detalles únicos",
      color: "#ff9ff3",
    },
  ];

  return (
    <div className={styles.categoryFilter}>
      <div className={styles.container}>
        <div className={styles.categoryHeader}>
          <h2 className={styles.categoryTitle}>Explora por Categoría</h2>
          <p className={styles.categorySubtitle}>
            Encuentra exactamente lo que buscas
          </p>
        </div>

        <div className={styles.categoryGrid}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                className={`${styles.categoryCard} ${
                  isActive ? styles.active : ""
                }`}
                onClick={() => onCategoryChange(category.id)}
                style={
                  { "--category-color": category.color } as React.CSSProperties
                }
              >
                <div className={styles.categoryIcon}>
                  <IconComponent size={32} />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryDescription}>
                    {category.description}
                  </p>
                </div>
                <div className={styles.categoryIndicator} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
