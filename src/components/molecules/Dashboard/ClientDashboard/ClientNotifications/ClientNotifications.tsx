"use client";

import type React from "react";
import { useState } from "react";
import { Bell, CheckCircle, XCircle, Info } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./ClientNotifications.module.scss";

interface Notification {
  id: string;
  type: "info" | "success" | "promotion" | "alert";
  message: string;
  timestamp: string;
  read: boolean;
}

const DUMMY_CLIENT_NOTIFICATIONS: Notification[] = [
  {
    id: "cnotif1",
    type: "success",
    message: "Tu pedido #2024001 ha sido enviado.",
    timestamp: "Hace 10 minutos",
    read: false,
  },
  {
    id: "cnotif2",
    type: "promotion",
    message:
      "¡Nueva colección 'Urban Summer' disponible! Descuentos exclusivos para ti.",
    timestamp: "Hace 2 horas",
    read: false,
  },
  {
    id: "cnotif3",
    type: "info",
    message: "Actualización de nuestra política de privacidad.",
    timestamp: "Ayer",
    read: true,
  },
  {
    id: "cnotif4",
    type: "alert",
    message: "Tu método de pago principal está a punto de expirar.",
    timestamp: "Hace 3 días",
    read: false,
  },
  {
    id: "cnotif5",
    type: "success",
    message: "Tu devolución del pedido #2024005 ha sido procesada.",
    timestamp: "Hace 1 semana",
    read: true,
  },
];

const ClientNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(
    DUMMY_CLIENT_NOTIFICATIONS
  );

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
      case "promotion":
        return <Info size={20} className={styles.promotionIcon} />;
      case "alert":
        return <XCircle size={20} className={styles.alertIcon} />;
      case "info":
        return <Info size={20} className={styles.infoIcon} />;
      default:
        return <Bell size={20} className={styles.infoIcon} />;
    }
  };

  return (
    <div className={styles.clientNotifications}>
      <h1 className={styles.pageTitle}>Mis Notificaciones</h1>
      <p className={styles.pageSubtitle}>
        Mantente informado sobre tus pedidos, promociones y alertas importantes.
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

export default ClientNotifications;
