import React, { useEffect, useState } from "react";
import '../../../../styles/Sidebar.css'
import { NavLink, useNavigate, } from "react-router-dom";
import Logo from '../../../../assets/logoprincipal.png'
import Topbar from '../Recepcion/TopBar'
import Contenido from '../Recepcion/Contenido'

const Sidebar = () => {

  const [activeOption, setActiveOption] = useState("");

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const sidebar = body.querySelector(".sidebar");
    const toggle = body.querySelector(".toggle");
    const modeSwitch = body.querySelector(".toggle-switch");
    const modeText = body.querySelector(".mode-text");

    const handleToggleClick = () => {
      sidebar.classList.toggle("close");
    };

    const handleModeSwitchClick = () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Modo Día";
      } else {
        modeText.innerText = "Modo Noche";
      }
    };

    toggle.addEventListener("click", handleToggleClick);
    modeSwitch.addEventListener("click", handleModeSwitchClick);

    return () => {
      toggle.removeEventListener("click", handleToggleClick);
      modeSwitch.removeEventListener("click", handleModeSwitchClick);
    };
  }, []);

  return (
    <>
      <nav className="sidebar close">
        <header>
          <div className="image-text">
            <span className="image">
            <NavLink
                  
                  onClick={() => handleOptionClick("inicio")}
                  className={activeOption === "inicio" ? "active" : ""}
                >
              <img src={Logo} alt="logo" />
              </NavLink>
            </span>
            <div className="text header-text">
              <span className="name">Clínica </span>
              <span className="lugar">Veterinaria</span>
            </div>
          </div>
          <i className="bx bx-chevron-right toggle"></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
              <NavLink
                  
                  onClick={() => handleOptionClick("inicio")}
                  className={activeOption === "inicio" ? "active" : ""}
                >
                
                  <i className="bx bx-home icon"></i>
                  <span className="text nav-text">Inicio</span>
                </NavLink>
              </li>
              <li className="nav-link">
              <NavLink 
                  
                  onClick={() => handleOptionClick("perfil")}
                  className={activeOption === "perfil" ? "active" : ""}
                >
                  <i className='bx bxs-id-card icon'></i>
                  <span className="text nav-text">Perfil</span>
                  </NavLink>
              </li>
              <li className="nav-link">
              <NavLink 
                  
                  onClick={() => handleOptionClick("cliente")}
                  className={activeOption === "cliente" ? "active" : ""}
                >
                  <i className='bx bxs-id-card icon'></i>
                  <span className="text nav-text">Clientes</span>
                  </NavLink>
              </li>
              <li className="nav-link">
              <NavLink
                  onClick={() => handleOptionClick("cita")}
                  className={activeOption === "cita" ? "active" : ""}
                >
                  <i className="bx bx-notepad icon"></i>
                  <span className="text nav-text">Citas</span>
                  </NavLink>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="">
            <NavLink onClick={handleGoBack}>
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Salir</span>
                </NavLink>
            </li>
            <li className="mode">
              <div className="moon-sun">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Modo Noche</span>
              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <section className="dashboard">
        <Topbar />
        <Contenido activeOption={activeOption} />
      </section>
    </>
  );
};

export default Sidebar;
