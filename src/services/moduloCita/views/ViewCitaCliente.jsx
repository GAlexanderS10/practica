import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/NoteAlt";
import Formulario from "../InsertarCita"
import Tabla from '../Cita';

const ViewCitaCliente = () => {
  const [citas, setCitas] = useState([]);
  const clienteId = localStorage.getItem('clienteId'); 
  useEffect(() => {

    const fetchCitas = async () => {
      try {
        const response = await axios.get(`https://localhost:7266/api/Cita/${clienteId}`);
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener las citas del cliente:', error);
      }
    };

    if (clienteId) {
      fetchCitas(); 
    }
  }, [clienteId]);
 
  const handleCitaRegistrada = (nuevaCita) => {

    setCitas((prevCitas) => [...prevCitas, nuevaCita]);
  };

  const handleCitaActualizada = (nroCita, datosActualizados) => {

    const citaIndex = citas.findIndex((cita) => cita.nroCita === nroCita);
  
    if (citaIndex !== -1) {
      const nuevasCitas = [...citas];
      nuevasCitas[citaIndex] = { ...nuevasCitas[citaIndex], ...datosActualizados };
      setCitas(nuevasCitas);
    }
  };


const handleCitaEliminada = (nroCita) => {
    const nuevasCitas = citas.filter((cita) => cita.nroCita !== nroCita);
    setCitas(nuevasCitas);
  };

  return (
    <>
  
      <Box className="mod-fondo" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PetsIcon sx={{ fontSize: "40px", color: "#014C6F" }} />
        </Box>
        <Typography
          fontSize={"35px"}
          fontWeight={"bold"}
          align="left"
          className="mod-fondo-txt"
        >
          Mis Citas
        </Typography>
      </Box>
      <br />
      <Box className="mod-fondo" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>

              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Formulario onCitaRegistrada={handleCitaRegistrada}/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Tabla citas={citas} onCitaActualizada={handleCitaActualizada} onCitaEliminada={handleCitaEliminada}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewCitaCliente;
