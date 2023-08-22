import React from "react";
import { useLocation } from "react-router-dom";


const Contenido = ({ activeOption }) => {
  const renderContent = () => {
    switch (activeOption) {
      

      default:
        return null;
    }
  };

  return <div className="dash-content">{renderContent()}</div>;
};

export default Contenido;
