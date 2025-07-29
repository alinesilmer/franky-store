// src/components/pages/Register/Register.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/atoms/Input/Input";
import { Button } from "../../../components/atoms/Button/Button";
import styles from "./Register.module.scss";

interface Option {
  value: string;
  label: string;
}

interface Country {
  cca2: string;
  name: { common: string };
}

interface ProvinceItem {
  id: number;
  nombre: string;
}

interface ProvinciaResponse {
  provincias: ProvinceItem[];
}

interface MunicipioItem {
  id: number;
  nombre: string;
}

interface MunicipiosResponse {
  municipios: MunicipioItem[];
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [countryOptions, setCountryOptions] = useState<Option[]>([]);
  const [province, setProvince] = useState("");
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const [locality, setLocality] = useState("");
  const [localityOptions, setLocalityOptions] = useState<Option[]>([]);
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        const data = (await res.json()) as Country[];
        const opts: Option[] = data
          .map((c) => ({ value: c.cca2, label: c.name.common }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountryOptions(opts);
        const arg = opts.find((o) => o.label === "Argentina");
        setNationality(arg?.value ?? "");
      } catch (err) {
        console.error("Error fetching countries", err);
      }
    }
    loadCountries();
  }, []);

  // Fetch provincias
  useEffect(() => {
    async function loadProvinces() {
      try {
        const res = await fetch(
          "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=100"
        );
        const data = (await res.json()) as ProvinciaResponse;
        const opts: Option[] = data.provincias
          .map((p) => ({ value: p.id.toString(), label: p.nombre }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setProvinceOptions(opts);
      } catch (err) {
        console.error("Error fetching provinces", err);
      }
    }
    loadProvinces();
  }, []);

  // Fetch localidades when provincia changes
  useEffect(() => {
    if (!province) {
      setLocalityOptions([]);
      return;
    }
    async function loadLocalities() {
      try {
        const res = await fetch(
          `https://apis.datos.gob.ar/georef/api/municipios?provincia=${province}&campos=id,nombre&max=200`
        );
        const data = (await res.json()) as MunicipiosResponse;
        const opts: Option[] = data.municipios
          .map((m) => ({ value: m.nombre, label: m.nombre }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setLocalityOptions(opts);
      } catch (err) {
        console.error("Error fetching localities", err);
      }
    }
    loadLocalities();
  }, [province]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    console.log("Registro simulado:", {
      username,
      email,
      nationality,
      province,
      locality,
      postalCode,
      password,
    });

    setSuccess("¡Registro exitoso! Redirigiendo a login…");
    setTimeout(() => navigate("/auth/login"), 2000);
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

          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          >
            <option value="" disabled>
              Nacionalidad
            </option>
            {countryOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          >
            <option value="" disabled>
              Provincia
            </option>
            {provinceOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            required
            disabled={!localityOptions.length}
          >
            <option value="" disabled>
              Localidad
            </option>
            {localityOptions.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>

          <Input
            type="text"
            placeholder="Código Postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
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
          <a onClick={() => navigate("/auth/login")} href="#">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
