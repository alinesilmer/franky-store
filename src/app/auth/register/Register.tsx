"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/atoms/Input/Input";
import { Button } from "../../../components/atoms/Button/Button";
import { Eye, EyeOff } from "lucide-react";
import {
  validateRegisterForm,
  type RegisterErrors,
} from "../../../utils/validation";
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

  /* ---------- state ---------- */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [streetAddress, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [nationality, setNationality] = useState("");
  const [province, setProvince] = useState("");
  const [locality, setLocality] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  /* selectors */
  const [countryOptions, setCountryOptions] = useState<Option[]>([]);
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const [localityOptions, setLocalityOptions] = useState<Option[]>([]);

  /* ui */
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [errorBanner, setErrorBanner] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Countries
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

  // Provinces
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

  // Localities
  useEffect(() => {
    if (!province) {
      setLocalityOptions([]);
      setLocality("");
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorBanner("");

    const { isValid, errors: nextErrors } = await validateRegisterForm({
      fullName,
      email,
      phone,
      birthDate,
      username,
      password,
      nationality,
      province,
      locality,
      postalCode,
      streetAddress,
    });

    if (!isValid) {
      setErrors(nextErrors);
      setErrorBanner("Por favor, corrige los campos marcados.");
      const first = Object.keys(nextErrors)[0];
      document
        .getElementById(first)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    /* ✅ Success path */
    setShowSuccess(true);
    setTimeout(() => navigate("/auth/login"), 2000); // redirect after 2 s
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <h1>REGISTRARSE</h1>

        {/* Scrollable content */}
        <div className={styles.cardBody}>
          <form
            onSubmit={handleRegister}
            className={styles.registerForm}
            noValidate
          >
            {/* Perfil */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Perfil</h2>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.label}>
                    Nombre y Apellido
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Juan Pérez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={errors.fullName ? styles.inputError : ""}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName ? "err-fullName" : undefined
                    }
                    required
                  />
                  {errors.fullName && (
                    <span id="err-fullName" className={styles.errorText}>
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="birthDate" className={styles.label}>
                    Fecha de Nacimiento
                  </label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className={errors.birthDate ? styles.inputError : ""}
                    aria-invalid={!!errors.birthDate}
                    aria-describedby={
                      errors.birthDate ? "err-birthDate" : undefined
                    }
                    required
                  />
                  {errors.birthDate && (
                    <span id="err-birthDate" className={styles.errorText}>
                      {errors.birthDate}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juanperez@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? styles.inputError : ""}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    required
                  />
                  {errors.email && (
                    <span id="err-email" className={styles.errorText}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="3794111111"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? styles.inputError : ""}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "err-phone" : undefined}
                    required
                  />
                  {errors.phone && (
                    <span id="err-phone" className={styles.errorText}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Ubicación</h2>

              <div className={styles.formGroup}>
                <label htmlFor="nationality" className={styles.label}>
                  Country
                </label>
                <select
                  id="nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className={`${styles.selectInput} ${
                    errors.nationality ? styles.inputError : ""
                  }`}
                  aria-invalid={!!errors.nationality}
                  aria-describedby={
                    errors.nationality ? "err-nationality" : undefined
                  }
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
                {errors.nationality && (
                  <span id="err-nationality" className={styles.errorText}>
                    {errors.nationality}
                  </span>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="locality" className={styles.label}>
                    City
                  </label>
                  <select
                    id="locality"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    disabled={!localityOptions.length}
                    className={`${styles.selectInput} ${
                      errors.locality ? styles.inputError : ""
                    }`}
                    aria-invalid={!!errors.locality}
                    aria-describedby={
                      errors.locality ? "err-locality" : undefined
                    }
                    required
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
                  {errors.locality && (
                    <span id="err-locality" className={styles.errorText}>
                      {errors.locality}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="province" className={styles.label}>
                    Province
                  </label>
                  <select
                    id="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className={`${styles.selectInput} ${
                      errors.province ? styles.inputError : ""
                    }`}
                    aria-invalid={!!errors.province}
                    aria-describedby={
                      errors.province ? "err-province" : undefined
                    }
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
                  {errors.province && (
                    <span id="err-province" className={styles.errorText}>
                      {errors.province}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                {/* ZIP / Postal code */}
                <div className={styles.formGroup}>
                  <label htmlFor="postalCode" className={styles.label}>
                    ZIP/Postal Code
                  </label>
                  <Input
                    id="postalCode"
                    type="text"
                    placeholder="Código Postal"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className={errors.postalCode ? styles.inputError : ""}
                    aria-invalid={!!errors.postalCode}
                    required
                  />
                  {errors.postalCode && (
                    <span className={styles.errorText}>
                      {errors.postalCode}
                    </span>
                  )}
                </div>

                {/* Street address – now on the right */}
                <div className={styles.formGroup}>
                  <label htmlFor="streetAddress" className={styles.label}>
                    Dirección
                  </label>
                  <Input
                    id="streetAddress"
                    type="text"
                    placeholder="Calle 123"
                    value={streetAddress}
                    onChange={(e) => setStreet(e.target.value)}
                    className={errors.streetAddress ? styles.inputError : ""}
                  />
                  {errors.streetAddress && (
                    <span className={styles.errorText}>
                      {errors.streetAddress}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Cuenta */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Cuenta</h2>
              <p className={styles.passwordHint}>
                La contraseña debe tener al menos 8 caracteres.
              </p>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="username" className={styles.label}>
                    Usuario
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="juanperez87_"
                    className={errors.username ? styles.inputError : ""}
                    aria-invalid={!!errors.username}
                    aria-describedby={
                      errors.username ? "err-username" : undefined
                    }
                    required
                  />
                  {errors.username && (
                    <span id="err-username" className={styles.errorText}>
                      {errors.username}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    Contraseña
                  </label>
                  <div className={styles.passwordWrapper}>
                    <Input
                      id="password"
                      type={showPwd ? "text" : "password"} // ⬅️ dynamic type
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? styles.inputError : ""}
                      aria-invalid={!!errors.password}
                      aria-describedby={
                        errors.password ? "err-password" : undefined
                      }
                      required
                    />

                    {/* eye button */}
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowPwd((v) => !v)}
                      aria-label={
                        showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                      }
                    >
                      {showPwd ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>

                  {errors.password && (
                    <span id="err-password" className={styles.errorText}>
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {errorBanner && (
              <p className={styles.errorMessage}>{errorBanner}</p>
            )}

            <div className={styles.buttonGroup}>
              <Button variant="primary" type="submit">
                Crear Cuenta
              </Button>
            </div>
            <p className={styles.loginLink}>
              ¿Ya tienes una cuenta?{" "}
              <a href="#" onClick={() => navigate("/auth/login")}>
                Ingresa aquí
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* ---------- SUCCESS MODAL ---------- */}
      {showSuccess && (
        <div
          className={styles.modalOverlay}
          role="alertdialog"
          aria-modal="true"
        >
          <div className={styles.modalCard}>
            <div className={styles.modalIcon}>✓</div>
            <h3>¡Registro exitoso!</h3>
            <p>Serás redirigido en unos segundos…</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
