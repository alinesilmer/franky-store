"use client";

import type React from "react";
import { useState, useEffect } from "react";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import { Input } from "../../../../atoms/Input/Input";
import { Button } from "../../../../atoms/Button/Button";
import styles from "./ClientProfile.module.scss";

interface ClientProfileProps {
  userName: string;
  userEmail: string;
}

const ClientProfile: React.FC<ClientProfileProps> = ({
  userName,
  userEmail,
}) => {
  const [fullName, setFullName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phoneNumber, setPhoneNumber] = useState("N/A");
  const [streetAddress, setStreetAddress] = useState("N/A");
  const [city, setCity] = useState("N/A");
  const [province, setProvince] = useState("N/A");
  const [postalCode, setPostalCode] = useState("N/A");
  const [country, setCountry] = useState("N/A");
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching user data from an API
    // In a real app, this would be an API call
    setFullName(userName);
    setEmail(userEmail);
    setPhoneNumber(localStorage.getItem("userPhone") || "N/A");
    setStreetAddress(localStorage.getItem("userAddress") || "N/A");
    setCity(localStorage.getItem("userCity") || "N/A");
    setProvince(localStorage.getItem("userProvince") || "N/A");
    setPostalCode(localStorage.getItem("userPostalCode") || "N/A");
    setCountry(localStorage.getItem("userCountry") || "N/A");
  }, [userName, userEmail]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving data to an API
    localStorage.setItem("userPhone", phoneNumber);
    localStorage.setItem("userAddress", streetAddress);
    localStorage.setItem("userCity", city);
    localStorage.setItem("userProvince", province);
    localStorage.setItem("userPostalCode", postalCode);
    localStorage.setItem("userCountry", country);

    setStatusMessage("¡Tu perfil ha sido actualizado con éxito!");
    setIsEditing(false);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleCancel = () => {
    // Reset to original values
    setFullName(userName);
    setEmail(userEmail);
    setPhoneNumber(localStorage.getItem("userPhone") || "N/A");
    setStreetAddress(localStorage.getItem("userAddress") || "N/A");
    setCity(localStorage.getItem("userCity") || "N/A");
    setProvince(localStorage.getItem("userProvince") || "N/A");
    setPostalCode(localStorage.getItem("userPostalCode") || "N/A");
    setCountry(localStorage.getItem("userCountry") || "N/A");
    setIsEditing(false);
    setStatusMessage(null);
  };

  return (
    <div className={styles.clientProfile}>
      <h1 className={styles.pageTitle}>Mi Perfil</h1>
      <p className={styles.pageSubtitle}>
        Gestiona tu información personal y de contacto.
      </p>

      <DashboardCard className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <h3>Información de la Cuenta</h3>
          {!isEditing && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </Button>
          )}
        </div>

        <form onSubmit={handleSave}>
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Nombre Completo
              </label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Dirección de Envío</h3>
            <div className={styles.formGroup}>
              <label htmlFor="streetAddress" className={styles.label}>
                Dirección
              </label>
              <Input
                id="streetAddress"
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {statusMessage && (
            <p
              className={`${styles.statusMessage} ${
                statusMessage.includes("éxito") ? styles.success : styles.error
              }`}
            >
              {statusMessage}
            </p>
          )}

          {isEditing && (
            <div className={styles.buttonGroup}>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar Cambios
              </Button>
            </div>
          )}
        </form>
      </DashboardCard>
    </div>
  );
};

export default ClientProfile;
