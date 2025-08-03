"use client";

import type React from "react";
import { useState } from "react";
import { Search, Eye, Mail, Phone } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Input } from "../../../../atoms/Input/Input";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./AdminCustomers.module.scss";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  totalOrders: number;
  totalSpent: number;
}

const DUMMY_CUSTOMERS: Customer[] = [
  {
    id: "cust1",
    name: "María García",
    email: "maria.g@example.com",
    phone: "+34 600 123 456",
    registeredDate: "2023-01-10",
    totalOrders: 5,
    totalSpent: 350.75,
  },
  {
    id: "cust2",
    name: "Roberto Díaz",
    email: "roberto.d@example.com",
    phone: "+34 611 234 567",
    registeredDate: "2023-02-15",
    totalOrders: 2,
    totalSpent: 120.0,
  },
  {
    id: "cust3",
    name: "Laura Martínez",
    email: "laura.m@example.com",
    phone: "+34 622 345 678",
    registeredDate: "2023-03-01",
    totalOrders: 8,
    totalSpent: 580.2,
  },
  {
    id: "cust4",
    name: "Javier López",
    email: "javier.l@example.com",
    phone: "+34 633 456 789",
    registeredDate: "2023-04-20",
    totalOrders: 1,
    totalSpent: 75.5,
  },
  {
    id: "cust5",
    name: "Elena Sánchez",
    email: "elena.s@example.com",
    phone: "+34 644 567 890",
    registeredDate: "2023-05-05",
    totalOrders: 3,
    totalSpent: 210.0,
  },
];

const AdminCustomers: React.FC = () => {
  const [customers] = useState<Customer[]>(DUMMY_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customer: Customer) => {
    console.log("Ver detalles del cliente:", customer);
    // Implement modal or new page for customer details
  };

  const handleContactEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleContactPhone = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\s/g, "")}`;
  };

  return (
    <div className={styles.adminCustomers}>
      <h1 className={styles.pageTitle}>Gestión de Clientes</h1>
      <p className={styles.pageSubtitle}>
        Visualiza y gestiona la información de tus clientes.
      </p>

      <DashboardCard className={styles.customersOverviewCard}>
        <div className={styles.cardHeader}>
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar clientes"
            />
          </div>
        </div>

        <div className={styles.customersTableContainer}>
          <table className={styles.customersTable}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Registrado</th>
                <th>Pedidos</th>
                <th>Gasto Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.registeredDate}</td>
                    <td>{customer.totalOrders}</td>
                    <td>${customer.totalSpent.toFixed(2)}</td>
                    <td>
                      <div className={styles.actions}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewDetails(customer)}
                        >
                          Ver Detalles
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactEmail(customer.email)}
                        >
                          Enviar Email
                          <Mail size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactPhone(customer.phone)}
                        >
                          WhatsApp
                          <Phone size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className={styles.noResults}>
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default AdminCustomers;
