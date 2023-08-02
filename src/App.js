import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from "./pages/inicio/Inicio";
import Nosotros from "./pages/nosotros/Nosotros"
import Servicio from "./pages/servicio/Servicio"
import Contacto from "./pages/contacto/Contacto"
import Ingresar from "./pages/formulario/Ingresar"
import Menu from "./components/dashboard/Dashboard";
import "./index.css";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
