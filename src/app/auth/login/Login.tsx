"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/atoms/Input/Input";
import { Button } from "../../../components/atoms/Button/Button";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  CLIENT_USERNAME,
  CLIENT_PASSWORD,
} from "../../../lib/auth";
import styles from "./Login.module.scss";

type StoredUser = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: "client" | "admin";
};

const DASHBOARD_PATH = "/dashboard";

const loadUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setAuthAndGo = (
    role: "admin" | "client",
    name: string,
    email: string
  ) => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    navigate(DASHBOARD_PATH, { replace: true });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1) Try localStorage users first
    const users = loadUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setAuthAndGo(
        found.role ?? "client",
        found.fullName || found.username,
        found.email
      );
      return;
    }

    // 2) Fallback to hardcoded admin/client
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthAndGo("admin", "Admin", "admin@franky.com");
      return;
    }
    if (username === CLIENT_USERNAME && password === CLIENT_PASSWORD) {
      setAuthAndGo("client", "Cliente", "client@franky.com");
      return;
    }

    setError("Usuario o contraseña incorrectos.");
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
          <Button
            variant="primary"
            type="submit"
            className={styles.loginButton}
          >
            Entrar
          </Button>
        </form>
        <p className={styles.registerLink}>
          ¿No tienes cuenta?{" "}
          <a href="#" onClick={() => navigate("/auth/register")}>
            Regístrate aquí
          </a>
        </p>

        {/* Credenciales de prueba (hardcoded) */}
        <div className={styles.testCredentials}>
          <h3>Credenciales de Prueba:</h3>
          <p>
            Admin: <strong>{ADMIN_USERNAME}</strong> /{" "}
            <strong>{ADMIN_PASSWORD}</strong>
          </p>
          <p>
            Cliente: <strong>{CLIENT_USERNAME}</strong> /{" "}
            <strong>{CLIENT_PASSWORD}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
