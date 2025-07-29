"use client";

import type React from "react";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import styles from "./FeatureCard.module.scss";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const makeCardVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 50, scale: 0.98 }, // Start slightly lower, almost full scale
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay,
    } satisfies Transition,
  },
  hover: {
    y: -8, // Subtle lift
    boxShadow: "0 15px 30px rgba(0,0,0,0.4)", // Cleaner, more defined shadow
    scale: 1.01, // Very subtle scale
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    } satisfies Transition,
  },
});

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  delay = 0,
}) => {
  const cardVariants = makeCardVariants(delay);
  return (
    <motion.div
      className={styles.featureCard}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      whileHover="hover"
    >
      <div className={styles.iconWrapper}>
        <Icon size={32} className={styles.icon} /> {/* Smaller icon size */}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
