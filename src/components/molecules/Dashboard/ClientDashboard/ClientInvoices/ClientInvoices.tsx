"use client";

import type React from "react";
import { useState } from "react";
import { Search, Download } from "lucide-react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Input } from "../../../../atoms/Input/Input";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./ClientInvoices.module.scss";

interface Invoice {
  id: string;
  orderId: string;
  date: string;
  total: number;
  status: "Pagada" | "Pendiente" | "Anulada";
  downloadLink: string;
}

const DUMMY_INVOICES: Invoice[] = [
  {
    id: "INV-2024-001",
    orderId: "#2024001",
    date: "2024-07-28",
    total: 85.0,
    status: "Pagada",
    downloadLink: "/placeholder.pdf",
  },
  {
    id: "INV-2024-002",
    orderId: "#2024002",
    date: "2024-07-25",
    total: 55.0,
    status: "Pagada",
    downloadLink: "/placeholder.pdf",
  },
  {
    id: "INV-2024-003",
    orderId: "#2024003",
    date: "2024-07-20",
    total: 120.0,
    status: "Pendiente",
    downloadLink: "/placeholder.pdf",
  },
  {
    id: "INV-2024-004",
    orderId: "#2024004",
    date: "2024-07-15",
    total: 45.0,
    status: "Pagada",
    downloadLink: "/placeholder.pdf",
  },
  {
    id: "INV-2024-005",
    orderId: "#2024005",
    date: "2024-07-10",
    total: 99.99,
    status: "Anulada",
    downloadLink: "/placeholder.pdf",
  },
];

const ClientInvoices: React.FC = () => {
  const [invoices] = useState<Invoice[]>(DUMMY_INVOICES);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "Todos" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (link: string, invoiceId: string) => {
    console.log("Descargando factura:", invoiceId);
    // In a real app, this would trigger a backend download or open a new tab
    window.open(link, "_blank");
  };

  return (
    <div className={styles.clientInvoices}>
      <h1 className={styles.pageTitle}>Mis Facturas</h1>
      <p className={styles.pageSubtitle}>
        Accede y descarga tus facturas de compra.
      </p>

      <DashboardCard className={styles.invoicesOverviewCard}>
        <div className={styles.cardHeader}>
          <div className={styles.searchFilterGroup}>
            <div className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <Input
                type="text"
                placeholder="Buscar por ID de factura o pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar facturas"
              />
            </div>
            <select
              className={styles.statusFilter}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filtrar por estado"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Pagada">Pagada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Anulada">Anulada</option>
            </select>
          </div>
        </div>

        <div className={styles.invoicesTableContainer}>
          <table className={styles.invoicesTable}>
            <thead>
              <tr>
                <th>ID Factura</th>
                <th>ID Pedido</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.orderId}</td>
                    <td>{invoice.date}</td>
                    <td>${invoice.total.toFixed(2)}</td>
                    <td>
                      <span
                        className={`${styles.invoiceStatusBadge} ${
                          styles[invoice.status.toLowerCase()]
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            handleDownload(invoice.downloadLink, invoice.id)
                          }
                        >
                          Descargar Factura
                          <Download size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noResults}>
                    No tienes facturas disponibles.
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

export default ClientInvoices;
