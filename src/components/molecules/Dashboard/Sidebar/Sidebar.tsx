"use client";
import type React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  User,
  Bell,
  BarChart3,
  Users,
  Heart,
  FileText,
  HelpCircle,
} from "lucide-react";
import styles from "./Sidebar.module.scss";
import { Logo } from "../../../atoms/Logo/Logo";

interface SidebarProps {
  userRole: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();

  const adminNavItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      description: "Vista general del negocio",
    },
    {
      name: "Productos",
      icon: Package,
      path: "/dashboard/products",
      description: "Gestionar inventario",
    },
    {
      name: "Pedidos",
      icon: ShoppingCart,
      path: "/dashboard/orders",
      description: "Administrar pedidos",
    },
    {
      name: "Clientes",
      icon: Users,
      path: "/dashboard/customers",
      description: "Base de clientes",
    },
    {
      name: "Análisis",
      icon: BarChart3,
      path: "/dashboard/analytics",
      description: "Reportes y estadísticas",
    },
    {
      name: "Notificaciones",
      icon: Bell,
      path: "/dashboard/notifications",
      description: "Alertas del sistema",
    },
    {
      name: "Configuración",
      icon: Settings,
      path: "/dashboard/settings",
      description: "Ajustes del sistema",
    },
  ];

  const clientNavItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      description: "Mi resumen personal",
    },
    {
      name: "Mis Pedidos",
      icon: ShoppingCart,
      path: "/dashboard/orders",
      description: "Historial de compras",
    },
    {
      name: "Favoritos",
      icon: Heart,
      path: "/dashboard/favorites",
      description: "Productos guardados",
    },
    {
      name: "Mi Perfil",
      icon: User,
      path: "/dashboard/profile",
      description: "Información personal",
    },
    {
      name: "Facturas",
      icon: FileText,
      path: "/dashboard/invoices",
      description: "Documentos de compra",
    },
    {
      name: "Notificaciones",
      icon: Bell,
      path: "/dashboard/notifications",
      description: "Mis alertas",
    },
    {
      name: "Ayuda",
      icon: HelpCircle,
      path: "/dashboard/help",
      description: "Soporte al cliente",
    },
    {
      name: "Configuración",
      icon: Settings,
      path: "/dashboard/settings",
      description: "Preferencias",
    },
  ];

  const navItems = userRole === "admin" ? adminNavItems : clientNavItems;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles.logoText}>
            <p>{userRole === "admin" ? "Admin" : "Mi Cuenta"}</p>
          </div>
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className={styles.navListItem}>
                <Link
                  to={item.path}
                  className={`${styles.navItem} ${
                    isActive ? styles.active : ""
                  }`}
                  title={item.description}
                >
                  <div className={styles.navItemIcon}>
                    <item.icon size={20} />
                  </div>
                  <div className={styles.navItemContent}>
                    <span className={styles.navItemName}>{item.name}</span>
                    <span className={styles.navItemDescription}>
                      {item.description}
                    </span>
                  </div>
                  {isActive && <div className={styles.activeIndicator} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userRole}>
          <div className={styles.roleIndicator}>
            <span>{userRole === "admin" ? "A" : "C"}</span>
          </div>
          <div className={styles.roleText}>
            <span>{userRole === "admin" ? "Administrador" : "Cliente"}</span>
            <p>Sesión activa</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
