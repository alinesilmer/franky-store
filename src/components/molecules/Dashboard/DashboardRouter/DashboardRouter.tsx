"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import DashboardLayout from "../DashboardLayout/DashboardLayout"; // Adjusted path
import AdminDashboard from "../../../../app/auth/dashboard/AdminDashboard/AdminDashboard";
import ClientDashboard from "../../../../app/auth/dashboard/ClientDashboard/ClientDashboard";
import AdminProducts from "../AdminDashboard/AdminProducts/AdminProducts";
import AdminOrders from "../AdminDashboard/AdminOrders/AdminOrders";
import AdminCustomers from "../AdminDashboard/AdminCustomers/AdminCustomers";
import AdminAnalytics from "../AdminDashboard/AdminAnalytics/AdminAnalytics";
import AdminNotifications from "../AdminDashboard/AdminNotifications/AdminNotifications";
import ClientOrders from "../ClientDashboard/ClientOrders/ClientOrders";
import ClientFavorites from "../ClientDashboard/ClientFavorites/ClientFavorites";
import ClientProfile from "../ClientDashboard/ClientProfile/ClientProfile";
import ClientInvoices from "../ClientDashboard/ClientInvoices/ClientInvoices";
import ClientNotifications from "../ClientDashboard/ClientNotifications/ClientNotifications";
import ClientHelp from "../ClientDashboard/ClientHelp/ClientHelp";
import Settings from "../Settings/Settings"; // Reusable settings component
import styles from "./DashboardRouter.module.scss"; // Renamed module

const DashboardRouter: React.FC = () => {
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
      <Routes>
        {/* Admin Routes */}
        {userRole === "admin" && (
          <>
            <Route
              index
              element={
                <AdminDashboard userName={userName} userEmail={userEmail} />
              }
            />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route
              path="settings"
              element={<Settings userName={userName} userEmail={userEmail} />}
            />
          </>
        )}

        {/* Client Routes */}
        {userRole === "client" && (
          <>
            <Route
              index
              element={
                <ClientDashboard userName={userName} userEmail={userEmail} />
              }
            />
            <Route path="orders" element={<ClientOrders />} />
            <Route path="favorites" element={<ClientFavorites />} />
            <Route
              path="profile"
              element={
                <ClientProfile userName={userName} userEmail={userEmail} />
              }
            />
            <Route path="invoices" element={<ClientInvoices />} />
            <Route path="notifications" element={<ClientNotifications />} />
            <Route path="help" element={<ClientHelp />} />
            <Route
              path="settings"
              element={<Settings userName={userName} userEmail={userEmail} />}
            />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRouter;
