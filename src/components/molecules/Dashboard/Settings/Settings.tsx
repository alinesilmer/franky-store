"use client";

import type React from "react";
import { useState, useEffect } from "react";
import DashboardCard from "../../../atoms/DashboardCard/DashboardCard";
import { Input } from "../../../atoms/Input/Input";
import { Button } from "../../../atoms/Button/Button";
import styles from "./Settings.module.scss";

interface SettingsProps {
  userName: string;
  userEmail: string;
}

const Settings: React.FC<SettingsProps> = ({ userName, userEmail }) => {
  // Account Settings
  const [currentFullName, setCurrentFullName] = useState(userName);
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(
    localStorage.getItem("userPhone") || ""
  );

  // Password Settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Billing Settings (simplified)
  const [billingPlan] = useState("Básico");
  const [billingInterval, setBillingInterval] = useState("mensual");

  // Address Settings (simplified)
  const [streetAddress, setStreetAddress] = useState(
    localStorage.getItem("userAddress") || ""
  );
  const [city, setCity] = useState(localStorage.getItem("userCity") || "");
  const [province, setProvince] = useState(
    localStorage.getItem("userProvince") || ""
  );
  const [postalCode, setPostalCode] = useState(
    localStorage.getItem("userPostalCode") || ""
  );
  const [country, setCountry] = useState(
    localStorage.getItem("userCountry") || ""
  );

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    // Load initial data from localStorage or API
    setCurrentFullName(userName);
    setCurrentEmail(userEmail);
    setCurrentPhoneNumber(localStorage.getItem("userPhone") || "");
    setStreetAddress(localStorage.getItem("userAddress") || "");
    setCity(localStorage.getItem("userCity") || "");
    setProvince(localStorage.getItem("userProvince") || "");
    setPostalCode(localStorage.getItem("userPostalCode") || "");
    setCountry(localStorage.getItem("userCountry") || "");
  }, [userName, userEmail]);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update account info
    localStorage.setItem("userName", currentFullName);
    localStorage.setItem("userEmail", currentEmail);
    localStorage.setItem("userPhone", currentPhoneNumber);
    setStatusMessage("Información de cuenta actualizada con éxito.");
    setStatusType("success");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setStatusMessage("Las nuevas contraseñas no coinciden.");
      setStatusType("error");
      return;
    }
    if (newPassword.length < 8) {
      setStatusMessage("La nueva contraseña debe tener al menos 8 caracteres.");
      setStatusType("error");
      return;
    }
    // Simulate API call to change password
    console.log("Contraseña cambiada:", newPassword);
    setStatusMessage("Contraseña actualizada con éxito.");
    setStatusType("success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSaveBilling = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update billing info
    setStatusMessage("Configuración de facturación actualizada con éxito.");
    setStatusType("success");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update address info
    localStorage.setItem("userAddress", streetAddress);
    localStorage.setItem("userCity", city);
    localStorage.setItem("userProvince", province);
    localStorage.setItem("userPostalCode", postalCode);
    localStorage.setItem("userCountry", country);
    setStatusMessage("Dirección actualizada con éxito.");
    setStatusType("success");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className={styles.settingsPage}>
      <h1 className={styles.pageTitle}>Configuración</h1>
      <p className={styles.pageSubtitle}>
        Gestiona las preferencias de tu cuenta y tienda.
      </p>

      {statusMessage && (
        <div
          className={`${styles.globalStatusMessage} ${
            styles[statusType || "info"]
          }`}
        >
          {statusMessage}
        </div>
      )}

      <div className={styles.settingsGrid}>
        <DashboardCard
          title="Información de la Cuenta"
          className={styles.settingsCard}
        >
          <form onSubmit={handleSaveAccount} className={styles.settingsForm}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Nombre Completo
              </label>
              <Input
                id="fullName"
                type="text"
                value={currentFullName}
                onChange={(e) => setCurrentFullName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber" className={styles.label}>
                Número de Teléfono
              </label>
              <Input
                id="phoneNumber"
                type="text"
                value={currentPhoneNumber}
                onChange={(e) => setCurrentPhoneNumber(e.target.value)}
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button type="submit" variant="primary">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </DashboardCard>

        <DashboardCard
          title="Cambiar Contraseña"
          className={styles.settingsCard}
        >
          <form onSubmit={handleSavePassword} className={styles.settingsForm}>
            <p className={styles.passwordHint}>
              La contraseña debe tener al menos 8 caracteres.
            </p>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword" className={styles.label}>
                Contraseña Actual
              </label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                Nueva Contraseña
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmNewPassword" className={styles.label}>
                Confirmar Nueva Contraseña
              </label>
              <Input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button type="submit" variant="primary">
                Actualizar Contraseña
              </Button>
            </div>
          </form>
        </DashboardCard>

        <DashboardCard
          title="Configuración de Facturación"
          className={styles.settingsCard}
        >
          <form onSubmit={handleSaveBilling} className={styles.settingsForm}>
            <div className={styles.formGroup}>
              <label htmlFor="billingPlan" className={styles.label}>
                Plan Actual
              </label>
              <Input
                id="billingPlan"
                type="text"
                value={billingPlan}
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="billingInterval" className={styles.label}>
                Intervalo de Facturación
              </label>
              <select
                id="billingInterval"
                className={styles.selectInput}
                value={billingInterval}
                onChange={(e) => setBillingInterval(e.target.value)}
              >
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
              </select>
            </div>
            <div className={styles.buttonGroup}>
              <Button type="submit" variant="primary">
                Guardar Facturación
              </Button>
            </div>
          </form>
        </DashboardCard>

        <DashboardCard title="Dirección" className={styles.settingsCard}>
          <form onSubmit={handleSaveAddress} className={styles.settingsForm}>
            <div className={styles.formGroup}>
              <label htmlFor="streetAddress" className={styles.label}>
                Dirección
              </label>
              <Input
                id="streetAddress"
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>
                  Ciudad
                </label>
                <Input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="province" className={styles.label}>
                  Provincia
                </label>
                <Input
                  id="province"
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="postalCode" className={styles.label}>
                  Código Postal
                </label>
                <Input
                  id="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="country" className={styles.label}>
                  País
                </label>
                <Input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <Button type="submit" variant="primary">
                Guardar Dirección
              </Button>
            </div>
          </form>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Settings;
