import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/NoteAlt';
import Buscar from '../BuscarCita';
import Tabla from '../ListarCitas';

const ViewCitaRecepcion = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
      fetchCitas();
    }, []);
  
    const fetchCitas = async () => {
      try {
        const response = await axios.get('https://localhost:7266/api/Cita');
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de citas:', error);
      }
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
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PersonIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Módulo de Citas
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>

              <Buscar onSearchResults={setCitas}/>
                
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">

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

export default ViewCitaRecepcion;
