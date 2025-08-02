"use client";

import type React from "react";
import { motion } from "framer-motion";
import styles from "./OwnerCard.module.scss";

interface OwnerCardProps {
  name: string;
  title: string;
  imageSrc: string;
  shortDescription: string;
  longDescription: string;
}

const OwnerCard: React.FC<OwnerCardProps> = ({
  name,
  title,
  imageSrc,
  shortDescription,
  longDescription,
}) => {
  return (
    <motion.div
      className={styles.ownerCard}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc || "/placeholder.svg?height=200&width=200&text=Owner"}
          alt={name}
          className={styles.ownerImage}
        />
      </div>
      <div className={styles.infoContent}>
        <h3 className={styles.ownerName}>{name}</h3>
        <p className={styles.ownerTitle}>{title}</p>
        <p className={styles.shortDescription}>{shortDescription}</p>
        <div className={styles.longDescription}>
          <p>{longDescription}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerCard;
