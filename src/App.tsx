"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/molecules/ui/Navbar/Navbar";
import Footer from "./components/molecules/ui/Footer/Footer";
import Home from "./app/pages/Home/Home";
import { AboutUs } from "./app/pages/AboutUs/AboutUs";
import Products from "./app/pages/Products/Products";
import ProductDetail from "./components/molecules/Products/ProductDetail/ProductDetail";
import { FAQ } from "./app/pages/FAQ/FAQ";
import Contact from "./app/pages/Contact/Contact";
import Login from "./app/auth/login/Login";
import Register from "./app/auth/register/Register";
import Dashboard from "./app/auth/dashboard/Dashboard";
import "./styles/globals.scss";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <div
                style={{ textAlign: "center", padding: "50px", color: "white" }}
              >
                <h1>404 - Página no encontrada</h1>
                <p>La ruta no existe.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
