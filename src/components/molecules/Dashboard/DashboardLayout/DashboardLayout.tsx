"use client";
import type React from "react";
import Sidebar from "../Sidebar/Sidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: string | null;
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userRole,
  userName,
  userEmail,
  onLogout,
}) => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar userRole={userRole} />
      <div className={styles.mainContentArea}>
        <DashboardHeader
          userName={userName}
          userEmail={userEmail}
          onLogout={onLogout}
        />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
