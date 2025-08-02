"use client";
import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Star, ThumbsUp, Filter } from "lucide-react";
import styles from "./ProductReviews.module.scss";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

type SortKey = "recent" | "helpful" | "rating";

const ProductReviews: React.FC<ProductReviewsProps> = ({
  rating,
  reviewCount,
}) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("recent");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  // Close lightbox on Esc
  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: "1",
      userName: "AraceliRodriguez_",
      userAvatar:
        "https://i.pinimg.com/736x/85/e6/a4/85e6a44df5b80d4709386d37baef1e17.jpg",
      rating: 5,
      date: "13 Oct 2024",
      title: "Excelente calidad y diseño",
      comment:
        "La dedicación de Franky Store a la sostenibilidad y las prácticas éticas resuena fuertemente con los consumidores conscientes, posicionando la marca como una opción responsable en el mundo de la moda.",
      helpful: 12,
      images: [
        "https://i.pinimg.com/736x/d9/96/20/d99620e997953a2b6ebc06b901cb6a79.jpg",
        "https://i.pinimg.com/736x/77/89/1f/77891fd33d7b239e42d77f15b6edab98.jpg",
      ],
    },
    {
      id: "2",
      userName: "Pauu_12",
      userAvatar:
        "https://i.pinimg.com/736x/a1/f1/ba/a1f1ba7264bb4c0e31cbb360c2e4c9d7.jpg",
      rating: 4,
      date: "10 Oct 2024",
      title: "Muy cómodo y versátil",
      comment:
        "Me encanta este producto. La calidad es excelente y el diseño es muy moderno. Lo recomiendo totalmente.",
      helpful: 8,
    },
    {
      id: "3",
      userName: "HankenSanti",
      userAvatar:
        "https://i.pinimg.com/736x/01/c7/4c/01c74c32874892f0ff9177c912d3c8c7.jpg",
      rating: 5,
      date: "8 Oct 2024",
      title: "Superó mis expectativas",
      comment:
        "Increíble producto, la talla es perfecta y el material se siente premium. Definitivamente compraré más.",
      helpful: 15,
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 10, percentage: 17 },
    { stars: 3, count: 3, percentage: 5 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  // Apply rating filter
  const filteredReviews = reviews.filter((r) =>
    filterRating ? r.rating === filterRating : true
  );

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful;
      case "rating":
        return b.rating - a.rating;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortKey);
  };

  // Toggle like/helpful
  const toggleLike = (id: string) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.productReviews}>
      <div className={styles.reviewsHeader}>
        <h2 className={styles.reviewsTitle}>RESEÑAS</h2>
      </div>

      <div className={styles.reviewsLayout}>
        {/* Rating Summary */}
        <div className={styles.ratingSummary}>
          <div className={styles.overallRating}>
            <div className={styles.ratingScore}>
              <span className={styles.ratingNumber}>{rating}</span>
              <span className={styles.ratingMax}>/ 5</span>
            </div>
            <div className={styles.ratingStars}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(rating) ? "#fdd835" : "none"}
                  color="#fdd835"
                />
              ))}
            </div>
            <div className={styles.reviewCount}>
              ({reviewCount} Nuevas Reseñas)
            </div>
          </div>
          <div className={styles.ratingBreakdown}>
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <button
                key={stars}
                className={`${styles.ratingBar} ${
                  filterRating === stars ? styles.active : ""
                }`}
                onClick={() =>
                  setFilterRating(filterRating === stars ? null : stars)
                }
              >
                <div className={styles.ratingBarLabel}>
                  <Star size={12} fill="#fdd835" color="#fdd835" />
                  <span>{stars}</span>
                </div>
                <div className={styles.ratingBarTrack}>
                  <div
                    className={styles.ratingBarFill}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={styles.ratingBarCount}>{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className={styles.reviewsList}>
          <div className={styles.reviewsControls}>
            <div className={styles.sortControls}>
              <Filter size={16} />
              <select
                value={sortBy}
                onChange={handleSortChange}
                className={styles.sortSelect}
              >
                <option value="recent">Más Recientes</option>
                <option value="helpful">Más Útiles</option>
                <option value="rating">Mejor Valoradas</option>
              </select>
            </div>
            {filterRating && (
              <button
                className={styles.clearFilter}
                onClick={() => setFilterRating(null)}
              >
                Mostrar todas las reseñas
              </button>
            )}
          </div>

          <div className={styles.reviewsContainer}>
            {sortedReviews.map((review) => {
              const liked = likedReviews.has(review.id);
              return (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerInfo}>
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className={styles.reviewerAvatar}
                      />
                      <div className={styles.reviewerDetails}>
                        <div className={styles.reviewerName}>
                          {review.userName}
                        </div>
                        <div className={styles.reviewDate}>{review.date}</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.reviewRating}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "#fdd835" : "none"}
                        color="#fdd835"
                      />
                    ))}
                  </div>

                  <div className={styles.reviewContent}>
                    <h4 className={styles.reviewTitle}>{review.title}</h4>
                    <p className={styles.reviewComment}>{review.comment}</p>

                    {review.images && (
                      <div className={styles.reviewImages}>
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            className={styles.reviewImage}
                            onClick={() => setLightboxSrc(img)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.reviewActions}>
                    <button
                      onClick={() => toggleLike(review.id)}
                      className={`${styles.helpfulBtn} ${
                        liked ? styles.liked : ""
                      }`}
                    >
                      <ThumbsUp
                        size={14}
                        fill={liked ? "currentColor" : "none"}
                      />
                      <span>({review.helpful + (liked ? 1 : 0)})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lightbox */}
          {lightboxSrc && (
            <div
              className={styles.lightboxOverlay}
              role="dialog"
              aria-modal="true"
              onClick={() => setLightboxSrc(null)}
            >
              <img
                src={lightboxSrc}
                alt="Imagen ampliada"
                className={styles.lightboxImage}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
