"use client";

import { useState } from "react";
import { Navbar } from "./components/molecules/Navbar/Navbar";
import { Footer } from "./components/molecules/Footer/Footer";
import { Home } from "./app/pages/Home/Home";
import { AboutUs } from "./app/pages/AboutUs/AboutUs";
import { Products } from "./app/pages/Products/Products";
import { FAQ } from "./app/pages/FAQ/FAQ";
import { Contact } from "./app/pages/Contact/Contact";
import { Login } from "./app/auth/login/Login";
import { Register } from "./app/auth/register/Register";
import { Dashboard } from "./app/auth/dashboard/Dashboard";

// Importa los estilos globales
import "./styles/globals.scss";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("/");

  // Simple router para manejar la navegación
  const handleNavigate = (path: string) => {
    setCurrentPage(path);
    window.scrollTo(0, 0); // Scroll al inicio de la página
  };

  // Renderiza el componente de la página actual
  const renderPage = () => {
    switch (currentPage) {
      case "/":
        return <Home onNavigate={handleNavigate} />;
      case "/about-us":
        return <AboutUs />;
      case "/products":
        return <Products onNavigate={handleNavigate} />;
      case "/faq":
        return <FAQ />;
      case "/contact":
        return <Contact />;
      case "/auth/login":
        return <Login onNavigate={handleNavigate} />;
      case "/auth/register":
        return <Register onNavigate={handleNavigate} />;
      case "/auth/dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      // Puedes añadir más rutas aquí, como /products/:id
      default:
        return (
          <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
            <h1>404 - Página no encontrada</h1>
            <p>La ruta {currentPage} no existe.</p>
            <button
              onClick={() => handleNavigate("/")}
              style={{
                background: "#fdd835",
                color: "black",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Volver a Inicio
            </button>
          </div>
        );
    }
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
