export type RegisterErrors = Partial<Record<
  | "fullName"
  | "email"
  | "phone"
  | "birthDate"
  | "username"
  | "password"
  | "nationality"
  | "province"
  | "locality"
  | "postalCode"
  | "streetAddress",
  string
>>;

const USER_RE = /^[a-zA-Z0-9_-]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// Arg-style loose phone: 7–15 digits, allows +, spaces, dashes and parentheses
const PHONE_RE = /^[+]?[\d\s()-]{7,15}$/;
const POSTAL_RE = /^[A-Za-z0-9\s-]{3,10}$/;

async function usernameTaken(name: string) {
  const used = ["juanperez", "admin", "demo"];      // demo list
  return used.includes(name.toLowerCase());
}


function isAdult(isoDate: string, minYears = 18) {
  if (!isoDate) return false;
  const dob = new Date(isoDate);
  if (Number.isNaN(dob.getTime())) return false;
  const now = new Date();
  const age =
    now.getFullYear() - dob.getFullYear() -
    (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
  return age >= minYears;
}

export async function validateRegisterForm(values: {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  username: string;
  password: string;
  nationality: string;
  province: string;
  locality: string;
  postalCode: string;
  streetAddress: string;
}) {
  const errors: RegisterErrors = {};

  if (!values.fullName?.trim()) errors.fullName = "Ingresa tu nombre completo.";

  if (!values.email?.trim()) errors.email = "Ingresa tu correo.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Correo inválido.";

  if (!values.phone?.trim()) errors.phone = "Ingresa tu teléfono.";
  else if (!PHONE_RE.test(values.phone)) errors.phone = "Teléfono inválido.";

  if (!values.birthDate) errors.birthDate = "Selecciona tu fecha de nacimiento.";
  else if (!isAdult(values.birthDate, 18))
    errors.birthDate = "Debes ser mayor de 18 años.";

  /* ---------- USERNAME ---------- */
  if (!values.username?.trim()) errors.username = "Elige un usuario.";
  else if (!USER_RE.test(values.username))
    errors.username = "Solo letras, números, _ o -";
  else if (await usernameTaken(values.username))
    errors.username = "Ese usuario ya existe.";

  if (!values.password || values.password.length < 8)
    errors.password = "Mínimo 8 caracteres.";

  if (!values.nationality) errors.nationality = "Selecciona tu país.";
  if (!values.province) errors.province = "Selecciona una provincia.";
  if (!values.locality) errors.locality = "Selecciona una localidad.";

  if (!values.postalCode?.trim()) errors.postalCode = "Ingresa tu código postal.";
  else if (!POSTAL_RE.test(values.postalCode))
    errors.postalCode = "Código postal inválido.";

  if (!values.streetAddress?.trim())
    errors.streetAddress = "Ingresa tu dirección.";

  return { isValid: Object.keys(errors).length === 0, errors };
}
