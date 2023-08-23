import React from "react";
import { useLocation } from "react-router-dom";
import ViewUsuarioPerfil from "../../../../services/moduloUsuario/views/ViewUserPerfil";
import ViewServicioCliente from "../../../../services/moduloServicio/views/ViewServicioCliente";
import ViewRecepcionMascota from "../../../../services/moduloMascota/views/ViewRecepcionMascota";


const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      case "inicio":
        return <ViewServicioCliente />;
      case "perfil":
        return <ViewUsuarioPerfil />;
        case "mascota":
          return <ViewRecepcionMascota />;
      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
