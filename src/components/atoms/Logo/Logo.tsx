import type React from "react";
import styles from "./Logo.module.scss";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const logoSize = {
    small: 30,
    medium: 40,
    large: 50,
  };

  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      {/* Usando <img> tag en lugar de Next/Image */}
      <img
        src="/placeholder.svg?height=40&width=40"
        alt="Franky Crew Logo"
        width={logoSize[size]}
        height={logoSize[size]}
        className={styles.image}
      />
      <span className={styles.text}>FRANKY</span>
    </div>
  );
};
