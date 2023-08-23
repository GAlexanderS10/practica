import React from "react";
import { useLocation } from "react-router-dom";
import ViewEmpleadoPerfil from "../../../../services/moduloEmpleado/views/ViewEmpleadoPerfil";
import ViewServicioCliente from "../../../../services/moduloServicio/views/ViewServicioCliente";
import ViewRecepcionMascota from "../../../../services/moduloMascota/views/ViewRecepcionMascota";
import ViewHistoriaVet from  "../../../../services/moduloHistoriaClinica/views/ViewHistoriaVet";

const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      case "inicio":
        return <ViewServicioCliente />;
      case "perfil":
        return <ViewEmpleadoPerfil />;
        case "mascota":
          return <ViewRecepcionMascota />;
          case "historias":
            return <ViewHistoriaVet />;
      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
