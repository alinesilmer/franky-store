"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "../../../components/atoms/Input/Input";
import { Button } from "../../../components/atoms/Button/Button";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  CLIENT_USERNAME,
  CLIENT_PASSWORD,
} from "../../../lib/auth";
import styles from "./Login.module.scss";

interface LoginProps {
  onNavigate: (path: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("userRole", "admin");
      onNavigate("/auth/dashboard");
    } else if (username === CLIENT_USERNAME && password === CLIENT_PASSWORD) {
      localStorage.setItem("userRole", "client");
      onNavigate("/auth/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>INICIAR SESIÓN</h1>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <Input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <Button type="submit" className={styles.loginButton}>
            Entrar
          </Button>
        </form>
        <p className={styles.registerLink}>
          ¿No tienes cuenta?{" "}
          <a href="#" onClick={() => onNavigate("/auth/register")}>
            Regístrate aquí
          </a>
        </p>
        <div className={styles.testCredentials}>
          <h3>Credenciales de Prueba:</h3>
          <p>
            Admin: usuario: <strong>{ADMIN_USERNAME}</strong>, pass:{" "}
            <strong>{ADMIN_PASSWORD}</strong>
          </p>
          <p>
            Cliente: usuario: <strong>{CLIENT_USERNAME}</strong>, pass:{" "}
            <strong>{CLIENT_PASSWORD}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
