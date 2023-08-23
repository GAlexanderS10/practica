import React from "react";
import { useLocation } from "react-router-dom";
import ViewServicioCliente from "../../../../services/moduloServicio/views/ViewServicioCliente";
import ViewClientePerfil from "../../../../services/moduloCliente/views/ViewClientePerfil";
import ViewClienteMascota from "../../../../services/moduloMascota/views/ViewClienteMascota";
import ViewCitaCliente from "../../../../services/moduloCita/views/ViewCitaCliente";

const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      case "inicio":
        return <ViewServicioCliente />;
      case "perfil":
        return <ViewClientePerfil />;
      case "mascota":
        return <ViewClienteMascota />;
        case "cita":
          return <ViewCitaCliente />;
      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
