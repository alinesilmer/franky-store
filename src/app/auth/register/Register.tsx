"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "../../../components/atoms/Input/Input";
import { Button } from "../../../components/atoms/Button/Button";
import styles from "./Register.module.scss";

interface RegisterProps {
  onNavigate: (path: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de registro exitoso
    // En un entorno real, aquí enviarías los datos a un backend
    console.log("Registro simulado:", { username, email, password });
    setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
    // Opcional: redirigir al login después de un tiempo
    setTimeout(() => {
      onNavigate("/auth/login");
    }, 2000);
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <h1>REGISTRARSE</h1>
        <form onSubmit={handleRegister} className={styles.registerForm}>
          <Input
            type="text"
            placeholder="Nombre de Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}
          <Button type="submit" className={styles.registerButton}>
            Crear Cuenta
          </Button>
        </form>
        <p className={styles.loginLink}>
          ¿Ya tienes cuenta?{" "}
          <a href="#" onClick={() => onNavigate("/auth/login")}>
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};
