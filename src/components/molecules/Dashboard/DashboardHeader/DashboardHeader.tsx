"use client";

import type React from "react";
import { Search, Bell, User } from "lucide-react";
import { Button } from "../../../atoms/Button/Button"; // Assuming Button component exists
import styles from "./DashboardHeader.module.scss";

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  userEmail,
  onLogout,
}) => {
  return (
    <header className={styles.dashboardHeader}>
      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar cualquier punto de discusión..."
          aria-label="Buscar"
        />
      </div>
      <div className={styles.userActions}>
        <button className={styles.iconButton} aria-label="Notificaciones">
          <Bell size={20} />
        </button>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <User size={24} /> {/* Placeholder for user avatar */}
          </div>
          <div className={styles.details}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.userEmail}>{userEmail}</span>
          </div>
        </div>
        <Button onClick={onLogout} variant="outline" size="sm">
          Cerrar Sesión
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
