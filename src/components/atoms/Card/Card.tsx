"use client";

import type React from "react";
import styles from "./Card.module.scss";

interface CardProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  imageSrc,
  imageAlt,
  onClick,
}) => {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={imageAlt}
    >
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt}
        className={styles.image}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
