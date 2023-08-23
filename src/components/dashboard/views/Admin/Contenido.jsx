import React from "react";
import { useLocation } from "react-router-dom";
import ViewRecepcionCliente from "../../../../services/moduloCliente/views/ViewClienteRecepcion"
import ViewServicioAdmin from "../../../../services/moduloServicio/views/ViewServicioAdmin"
import ViewEmpleadoAdmin from "../../../../services/moduloEmpleado/views/ViewEmpleadoAdmin"
import ViewUserAdmin from "../../../../services/moduloUsuario/views/ViewUserAdmin"
import ViewUsuarioPerfil from "../../../../services/moduloUsuario/views/ViewUserPerfil";
import ViewServicioCliente from "../../../../services/moduloServicio/views/ViewServicioCliente";

const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      
      case "cliente":
        return <ViewRecepcionCliente />;
        case "perfil":
        return <ViewUsuarioPerfil />;
        case "inicio":
          return <ViewServicioCliente />;
        case "servicio":
        return <ViewServicioAdmin/>;
        case "empleados":
        return <ViewEmpleadoAdmin/>;
        case "usuarios":
        return <ViewUserAdmin/>;

      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
