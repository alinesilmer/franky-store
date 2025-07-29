import type React from "react";
import styles from "./Logo.module.scss";
import FrankyLogo from "/LogoFranky.png";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const logoSize = {
    small: 70,
    medium: 90,
    large: 120,
  };

  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      {/* Usando <img> tag en lugar de Next/Image */}
      <img
        src={FrankyLogo}
        alt="Franky Store Logo"
        width={logoSize[size]}
        height={logoSize[size]}
        className={styles.image}
      />
    </div>
  );
};
