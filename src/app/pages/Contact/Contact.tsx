"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "../../../components/atoms/Input/Input";
import { Button } from "../../../components/atoms/Button/Button";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Contact.module.scss";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío de formulario
    console.log("Formulario de contacto enviado:", formData);
    setStatus("¡Mensaje enviado con éxito! Te responderemos pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={styles.contactPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>CONTACTO</h1>
          <p>
            ¿Tienes alguna pregunta o comentario? ¡Estamos aquí para ayudarte!
          </p>
        </div>
      </section>

      <section className={styles.contactInfoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Mail size={48} className={styles.icon} />
              <h3>Correo Electrónico</h3>
              <p>info@frankycrew.com</p>
            </div>
            <div className={styles.infoItem}>
              <Phone size={48} className={styles.icon} />
              <h3>Teléfono</h3>
              <p>+54 9 11 1234-5678</p>
            </div>
            <div className={styles.infoItem}>
              <MapPin size={48} className={styles.icon} />
              <h3>Dirección</h3>
              <p>Calle Ficticia 123, Ciudad Urbana, País</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contactFormSection}>
        <div className="container">
          <h2>ENVÍANOS UN MENSAJE</h2>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <Input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Tu Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Tu Mensaje"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
            ></textarea>
            <Button type="submit" className={styles.submitButton}>
              Enviar Mensaje
            </Button>
            {status && <p className={styles.statusMessage}>{status}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};
