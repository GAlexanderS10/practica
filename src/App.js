import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tabla from './components/Tabla'
import Formulario from './components/Formulario'
import Eliminar from "./components/Eliminar";
import Buscar from "./components/Buscar";
import Crud from "./components/Crud";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Crud/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
