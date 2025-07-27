"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";
import styles from "./NewsletterForm.module.scss";

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@") && email.includes(".")) {
      setMessage("¡Gracias por suscribirte a nuestra newsletter!");
      setEmail("");
    } else {
      setMessage("Por favor, introduce un email válido.");
    }
  };

  return (
    <div className={styles.newsletterForm}>
      <h2>Únete a la Crew Franky</h2>
      <p>
        Sé el primero en enterarte de nuestras nuevas colecciones, ofertas
        exclusivas y eventos.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.emailInput}
        />
        <Button type="submit" className={styles.subscribeButton}>
          Suscribirme
        </Button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
