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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("userRole", "admin");
      navigate("/auth/dashboard");
    } else if (username === CLIENT_USERNAME && password === CLIENT_PASSWORD) {
      localStorage.setItem("userRole", "client");
      navigate("/auth/dashboard");
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
