import type React from "react";
import styles from "./DashboardCard.module.scss";

interface DashboardCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <div className={`${styles.dashboardCard} ${className || ""}`}>
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default DashboardCard;
