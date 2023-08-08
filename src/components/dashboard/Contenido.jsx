import React from "react";
import { useLocation } from "react-router-dom";
import ViewRecepcionMascota from "../../services/moduloMascota/views/ViewRecepcionMascota";
import ViewRecepcionCliente from "../../services/moduloCliente/views/ViewClienteRecepcion";
import ViewServicioAdmin from "../../services/moduloServicio/views/ViewServicioAdmin"

const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      case "mascota":
        return <ViewRecepcionMascota />;
        case "cliente":
        return <ViewRecepcionCliente />;
        case "servicio":
        return <ViewServicioAdmin/>
      // Agrega otros casos para otras opciones si las tienes.
      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
