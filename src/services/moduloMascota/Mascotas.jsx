import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import "../../styles/MisMascotas.css";
import EditarMascota from './EditarMascota';
import EliminarMascota from "./EliminarMascota";

const Mascotas = ({ mascotas, onMascotaActualizada, onMascotaEliminada }) => {
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [mascotaSeleccionadoEliminar, setMascotaSeleccionadoEliminar] =
    useState(null);

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const clienteId = localStorage.getItem("clienteId");
      const response = await axios.get(
        `https://localhost:7266/api/Mascota/cliente/${clienteId}`
      );

      // setMascotas(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de mascotas:", error);
    }
  };

  const handleOpenEditarMascota = (mascota) => {
    setMascotaSeleccionada(mascota);
    console.log(mascota);
  };

  const handleCloseEditarMascota = () => {
    setMascotaSeleccionada(null);
  };

  const handleMascotaActualizada = (mascotaId, datosActualizados) => {
    onMascotaActualizada(mascotaId, datosActualizados);
  };

  const handleOpenEliminarMascota = (mascota) => {
    setMascotaSeleccionadoEliminar(mascota);
  };

  const handleCloseEliminarMascota = () => {
    setMascotaSeleccionadoEliminar(null);
  };

  const handleEliminarMascota = (mascotaId) => {
    onMascotaEliminada(mascotaId);
  };

  return (
    <>
      <div className="mascotas-container">
        {Array.isArray(mascotas) &&
          mascotas.map((mascota) => (
            <div key={mascota.mascotaId} className="card-contenido-mascota">
              <div className="imagen-card-mascota">
                <img
                  src={`https://localhost:7266/Uploads/${mascota.foto}`}
                  alt={`Foto de ${mascota.nombre}`}
                />
              </div>
              <div className="detalle-card-mascota">
                <div className="detalle-texto-mascota">
                  <h1 className="titulo-mascota-card">Carnet de Mascota</h1>
                </div>
                <div className="detalle-texto-mascota">
                  <span className="subtitulo-mascota">ID:</span>{" "}
                  <span className="campos-card">{mascota.mascotaId}</span>
                </div>
                <div className="detalle-texto-mascota">
                  <span className="subtitulo-mascota">Nombre:</span>{" "}
                  <span className="campos-card">{mascota.nombre}</span>
                </div>
                <div className="detalle-texto-mascota">
                  <span className="subtitulo-mascota">Especie:</span>{" "}
                  <span className="campos-card">{mascota.tipoMascota}</span>
                </div>
                <div className="detalle-texto-mascota">
                  <span className="subtitulo-mascota">Raza:</span>{" "}
                  <span className="campos-card">{mascota.raza}</span>
                </div>
                <div className="detalle-texto-mascota">
                  <span className="subtitulo-mascota">Sexo:</span>{" "}
                  <span className="campos-card">{mascota.sexo}</span>
                </div>
                <div className="detalle-texto-mascota">
                  <span className="subtitulo-mascota">Color:</span>{" "}
                  <span className="campos-card">{mascota.color}</span>
                </div>
                <div className="detalle-texto-mascota">
                  <span className="subtitulo-mascota">
                    Fecha de Nacimiento:
                  </span>{" "}
                  <span className="campos-card">
                    {new Date(mascota.fechaNacimiento).toLocaleDateString()}
                  </span>
                </div>
                <div className="espacios-btn">
                  <Box
                    bgcolor="#A6D4FA"
                    padding={1}
                    borderRadius="50%"
                    display="inline-block"
                    margin="0 3px"
                  >
                    <IconButton
                      onClick={() => handleOpenEditarMascota(mascota)}
                    >
                      <EditIcon style={{ color: "#1565C0" }} />
                    </IconButton>
                  </Box>
                  <Box
                    bgcolor="#FEB2B2"
                    padding={1}
                    borderRadius="50%"
                    display="inline-block"
                    margin="0 3px"
                  >
                    <IconButton
                      onClick={() => handleOpenEliminarMascota(mascota)}
                    >
                      <DeleteIcon style={{ color: "#B91C1C" }} />
                    </IconButton>
                  </Box>
                </div>
              </div>
            </div>
          ))}

{mascotaSeleccionada && (
        <EditarMascota
          mascota={mascotaSeleccionada}
          onClose={handleCloseEditarMascota}
          onMascotaActualizada={handleMascotaActualizada}
        />
      )}

      {mascotaSeleccionadoEliminar && (
        <EliminarMascota
          mascotaId={mascotaSeleccionadoEliminar.mascotaId}
          mascotaNombre={mascotaSeleccionadoEliminar.nombre}
          onModalClose={handleCloseEliminarMascota}
          onMascotaEliminada={handleEliminarMascota}
        />
      )}
      </div>
    </>
  );
};

export default Mascotas;
