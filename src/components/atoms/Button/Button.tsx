"use client";

import { motion } from "framer-motion";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "third";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      whileFocus={{ outline: "2px solid #000" }}
    >
      {children}
    </motion.button>
  );
};
