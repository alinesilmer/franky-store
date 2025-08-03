"use client";

import type React from "react";
import { useState } from "react";
import { Bell, CheckCircle, XCircle, Info } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./AdminNotifications.module.scss";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  timestamp: string;
  read: boolean;
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: "notif1",
    type: "success",
    message: "Nuevo pedido #1006 recibido de María López.",
    timestamp: "Hace 5 minutos",
    read: false,
  },
  {
    id: "notif2",
    type: "warning",
    message: "Stock bajo para 'Camiseta Graffiti Vibes'. Quedan 5 unidades.",
    timestamp: "Hace 1 hora",
    read: false,
  },
  {
    id: "notif3",
    type: "info",
    message:
      "Actualización del sistema: Nuevas funciones de análisis disponibles.",
    timestamp: "Hace 3 horas",
    read: true,
  },
  {
    id: "notif4",
    type: "error",
    message: "Error en el procesamiento de pago del pedido #1003.",
    timestamp: "Ayer",
    read: false,
  },
  {
    id: "notif5",
    type: "success",
    message: "Producto 'Sudadera Urban Flow' añadido al inventario.",
    timestamp: "Hace 2 días",
    read: true,
  },
];

const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(DUMMY_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className={styles.successIcon} />;
      case "warning":
        return <Info size={20} className={styles.warningIcon} />;
      case "error":
        return <XCircle size={20} className={styles.errorIcon} />;
      case "info":
        return <Info size={20} className={styles.infoIcon} />;
      default:
        return <Bell size={20} className={styles.infoIcon} />;
    }
  };

  return (
    <div className={styles.adminNotifications}>
      <h1 className={styles.pageTitle}>Notificaciones</h1>
      <p className={styles.pageSubtitle}>
        Mantente al día con las últimas actividades y alertas de tu tienda.
      </p>

      <DashboardCard className={styles.notificationsCard}>
        <div className={styles.cardHeader}>
          <h3>Tus Notificaciones ({unreadCount} no leídas)</h3>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Marcar todas como leídas
            </Button>
          )}
        </div>
        <div className={styles.notificationsList}>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`${styles.notificationItem} ${
                  notif.read ? styles.read : styles.unread
                }`}
              >
                <div className={styles.notificationIconWrapper}>
                  {getIcon(notif.type)}
                </div>
                <div className={styles.notificationContent}>
                  <p className={styles.notificationMessage}>{notif.message}</p>
                  <span className={styles.notificationTimestamp}>
                    {notif.timestamp}
                  </span>
                </div>
                <div className={styles.notificationActions}>
                  {!notif.read && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => markAsRead(notif.id)}
                    >
                      Marcar como leída
                      <CheckCircle size={16} />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteNotification(notif.id)}
                  >
                    Eliminar
                    <XCircle size={16} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noNotifications}>
              No tienes notificaciones nuevas.
            </p>
          )}
        </div>
      </DashboardCard>
    </div>
  );
};

export default AdminNotifications;
