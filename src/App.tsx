"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Navbar } from "./components/molecules/ui/Navbar/Navbar";
import Footer from "./components/molecules/ui/Footer/Footer";
import "./styles/globals.scss";

const Home = lazy(() => import("./app/pages/Home/Home"));
const AboutUs = lazy(() =>
  import("./app/pages/AboutUs/AboutUs").then((m) => ({ default: m.AboutUs }))
);
const Products = lazy(() => import("./app/pages/Products/Products"));
const ProductDetail = lazy(
  () => import("./components/molecules/Products/ProductDetail/ProductDetail")
);
const FAQ = lazy(() =>
  import("./app/pages/FAQ/FAQ").then((m) => ({ default: m.FAQ }))
);
const Contact = lazy(() => import("./app/pages/Contact/Contact"));
const Login = lazy(() => import("./app/auth/login/Login"));
const Register = lazy(() => import("./app/auth/register/Register"));
const Dashboard = lazy(() => import("./app/auth/dashboard/Dashboard"));
const DashboardRouter = lazy(
  () =>
    import("./components/molecules/Dashboard/DashboardRouter/DashboardRouter")
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Suspense
          fallback={
            <div
              style={{
                padding: "48px",
                color: "white",
                textAlign: "center",
                minHeight: "40vh",
              }}
            >
              Cargando…
            </div>
          }
        >
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
            <Route path="/dashboard/*" element={<DashboardRouter />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px",
                    color: "white",
                  }}
                >
                  <h1>404 - Página no encontrada</h1>
                  <p>La ruta no existe.</p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}
