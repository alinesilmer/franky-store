"use client";
import type React from "react";
import { useState, useRef } from "react";
import { Button } from "../../../../components/atoms/Button/Button";
import { Eye } from "lucide-react";
import type { OutfitCollection } from "../../../../types/product";
import styles from "./OutfitCarousel.module.scss";

interface OutfitCarouselProps {
  collections: OutfitCollection[];
}

const OutfitCarousel: React.FC<OutfitCarouselProps> = ({ collections }) => {
  const [currentCollection, setCurrentCollection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentCol = collections[currentCollection];

  return (
    <section className={styles.outfitCarousel}>
      <div className={styles.container}>
        <div className={styles.carouselHeader}>
          <div className={styles.headerContent}>
            <h2 className={styles.carouselTitle}>Outfits Completos</h2>
          </div>

          <div className={styles.collectionTabs}>
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                className={`${styles.collectionTab} ${
                  index === currentCollection ? styles.active : ""
                }`}
                onClick={() => setCurrentCollection(index)}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.collectionSection}>
          <div className={styles.collectionInfo}>
            <div className={styles.collectionImage}>
              <img
                src={currentCol.heroImage || "/placeholder.svg"}
                alt={currentCol.name}
              />
              <div className={styles.collectionOverlay}>
                <h3 className={styles.collectionName}>{currentCol.name}</h3>
                <p className={styles.collectionDescription}>
                  {currentCol.description}
                </p>
                <Button variant="third" size="lg">
                  Ver Colección Completa
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.outfitsContainer}>
            <div className={styles.outfitsCarousel} ref={carouselRef}>
              {currentCol.outfits.map((outfit) => (
                <div key={outfit.id} className={styles.outfitCard}>
                  <div className={styles.outfitImage}>
                    <img
                      src={outfit.image || "/placeholder.svg"}
                      alt={outfit.name}
                    />
                    <div className={styles.outfitOverlay}>
                      <button className={styles.viewOutfitBtn}>
                        <Eye size={20} />
                        <span>Ver Outfit</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.outfitInfo}>
                    <h4 className={styles.outfitName}>{outfit.name}</h4>
                    <p className={styles.outfitPrice}>
                      <span className={styles.totalPrice}>
                        ${outfit.totalPrice}
                      </span>
                      {outfit.originalPrice && (
                        <span className={styles.originalPrice}>
                          ${outfit.originalPrice}
                        </span>
                      )}
                    </p>
                    <div className={styles.outfitItems}>
                      {outfit.items.slice(0, 3).map((item, index) => (
                        <span key={index} className={styles.itemTag}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutfitCarousel;
