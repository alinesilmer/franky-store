import type React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  User,
  Bell,
} from "lucide-react";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  userRole: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Inicio",
      icon: Home,
      path: "/dashboard",
      roles: ["admin", "client"],
    },
    {
      name: "Productos",
      icon: Package,
      path: "/dashboard/products",
      roles: ["admin"],
    },
    {
      name: "Pedidos",
      icon: ShoppingCart,
      path: "/dashboard/orders",
      roles: ["admin", "client"],
    },
    {
      name: "Mi Perfil",
      icon: User,
      path: "/dashboard/profile",
      roles: ["client"],
    },
    {
      name: "Notificaciones",
      icon: Bell,
      path: "/dashboard/notifications",
      roles: ["admin", "client"],
    },
    {
      name: "Configuración",
      icon: Settings,
      path: "/dashboard/settings",
      roles: ["admin", "client"],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/placeholder.svg?height=40&width=40" alt="Logo" />
        <span>Urban Hub</span>
      </div>
      <nav className={styles.navigation}>
        <ul>
          {navItems.map((item) =>
            item.roles.includes(userRole || "") ? (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`${styles.navItem} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ) : null
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
