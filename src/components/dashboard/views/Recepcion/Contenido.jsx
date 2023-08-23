import React from "react";
import { useLocation } from "react-router-dom";
import ViewRecepcionCliente from "../../../../services/moduloCliente/views/ViewClienteRecepcion";
import ViewCitaRecepcion from "../../../../services/moduloCita/views/ViewCitaRecepcion";
import ViewUsuarioPerfil from "../../../../services/moduloUsuario/views/ViewUserPerfil";
import ViewServicioCliente from "../../../../services/moduloServicio/views/ViewServicioCliente";


const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      case "inicio":
        return <ViewServicioCliente />;
      case "perfil":
        return <ViewUsuarioPerfil />;
      case "cliente":
        return <ViewRecepcionCliente />;
        case "cita":
        return <ViewCitaRecepcion/>;
      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
