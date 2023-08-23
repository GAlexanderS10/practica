import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardAdmin from "../components/dashboard/views/Admin/DashboardAdmin";
import DashboardVet from "../components/dashboard/views/Veterinario/DashboardVet";
import DashboardCliente from "../components/dashboard/views/Cliente/DashboardCliente";
import DashboardRecepcion from "../components/dashboard/views/Recepcion/DashboardRecepcion";
import Dashboard from "../components/dashboard/Dashboard";
import PaginaDeError from "../routes/PaginaDeError";
import Swal from "sweetalert2";

const Menu = () => {
  const navigate = useNavigate();
  const [activeTimer, setActiveTimer] = useState(null);

  useEffect(() => {
    const sessionTimeout = setTimeout(() => {
      handleLogout(); 
    }, 43200000 ); 


    return () => {
      clearTimeout(sessionTimeout);
    };
  }, []);


  const resetSessionTimeout = () => {
    clearTimeout(activeTimer); 
    const newSessionTimeout = setTimeout(() => {
      handleLogout();
    }, 43200000 ); 
    setActiveTimer(newSessionTimeout); 
  };


  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("dni");
    localStorage.removeItem("role");
    navigate("/ingresar");

    Swal.fire({
      icon: "info",
      title: "Sesión Expiro",
    });
  };

  const userRole = localStorage.getItem("role");
  switch (userRole) {
    case "ADMINISTRADOR":
      break;
    case "VETERINARIO":
      break;
    case "CLIENTE":
      break;
    case "RECEPCIÓN":
      break;
    case "ADMINISTRADOR,VETERINARIO":
      break;
    case "":
      Swal.fire({
        icon: "warning",
        title: "Usuario sin Rol",
        text: "El usuario existe, pero no cuenta con roles",
      });
      break;
  }

  return (
    <div>
      {localStorage.getItem("role") === "ADMINISTRADOR" && <DashboardAdmin />}
      {localStorage.getItem("role") === "VETERINARIO" && <DashboardVet />}
      {localStorage.getItem("role") === "CLIENTE" && <DashboardCliente />}
      {localStorage.getItem("role") === "RECEPCIÓN" && <DashboardRecepcion />}
      {localStorage.getItem("role") === "ADMINISTRADOR,VETERINARIO" && (
        <Dashboard />
      )}
      {localStorage.getItem("role") === "" && <PaginaDeError />}
    </div>
  );
};

export default Menu;
