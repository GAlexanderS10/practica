import React from "react";
import { useLocation } from "react-router-dom";
import ViewRecepcionMascota from "../../services/moduloMascota/views/ViewRecepcionMascota";
import ViewRecepcionCliente from "../../services/moduloCliente/views/ViewClienteRecepcion";
import ViewServicioAdmin from "../../services/moduloServicio/views/ViewServicioAdmin";
import ViewCitaRecepcion from "../../services/moduloCita/views/ViewCitaRecepcion";
import ViewEmpleadoAdmin from "../../services/moduloEmpleado/views/ViewEmpleadoAdmin";
import ViewUserAdmin from "../../services/moduloUsuario/views/ViewUserAdmin";
import ViewHistoriaVet from "../../services/moduloHistoriaClinica/views/ViewHistoriaVet"

const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      case "mascota":
        return <ViewRecepcionMascota />;
        case "cliente":
        return <ViewRecepcionCliente />;
        case "servicio":
        return <ViewServicioAdmin/>;
        case "cita":
        return <ViewCitaRecepcion/>;
        case "empleados":
        return <ViewEmpleadoAdmin/>;
        case "usuarios":
        return <ViewUserAdmin/>;
        case "historias":
        return <ViewHistoriaVet/>;

      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
