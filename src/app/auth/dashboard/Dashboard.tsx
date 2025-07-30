"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/molecules/Dashboard/DashboardLayout/DashboardLayout";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import ClientDashboard from "./ClientDashboard/ClientDashboard";
import styles from "./Dashboard.module.scss";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("Usuario");
  const [userEmail, setUserEmail] = useState<string>("usuario@example.com");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName") || "Usuario";
    const storedUserEmail =
      localStorage.getItem("userEmail") || "usuario@example.com";

    if (!role) {
      navigate("/auth/login");
    } else {
      setUserRole(role);
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/auth/login");
  };

  if (!userRole) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loading}>Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <DashboardLayout
      userRole={userRole}
      userName={userName}
      userEmail={userEmail}
      onLogout={handleLogout}
    >
      {userRole === "admin" ? (
        <AdminDashboard userName={userName} userEmail={userEmail} />
      ) : (
        <ClientDashboard userName={userName} userEmail={userEmail} />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
