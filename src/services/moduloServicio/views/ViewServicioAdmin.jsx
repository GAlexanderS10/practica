import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Buscar from '../BuscarServicio';
import Formulario from '../InsertarServicio';
import Tabla from '../ListarServicios';
import { sortBy } from 'lodash';

const ViewServicioAdmin = () => {
  const [servicios, setServicios] = useState([]);
  const sortedServicios = sortBy(servicios, 'servicioId').reverse();

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Servicio');
      setServicios(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de servicios:', error);
    }
  };

  const handleServicioRegistrado = (nuevoServicio) => {
    // Agregar el nuevo servicio a la lista de servicios actual
    setServicios((prevServicios) => [...prevServicios, nuevoServicio]);
  };

  const handleServicioActualizado = (servicioId, datosActualizados) => {
    // Buscamos el índice del servicio que se actualizó en la lista de servicios
    const servicioIndex = servicios.findIndex((servicio) => servicio.servicioId === servicioId);
  
    if (servicioIndex !== -1) {
      // Creamos una nueva lista de servicios, donde el servicio actualizado reemplaza al antiguo
      const nuevosServicios = [...servicios];
      nuevosServicios[servicioIndex] = { ...nuevosServicios[servicioIndex], ...datosActualizados };
      setServicios(nuevosServicios);
    }
  };

  const handleServicioEliminado = (servicioId) => {
    // Filtrar la lista de servicios para eliminar el servicio con el servicioId proporcionado
    const nuevosServicios = servicios.filter((servicio) => servicio.servicioId !== servicioId);
    setServicios(nuevosServicios);
  };



  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <VaccinesIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Módulo de Servicios
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2} >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Buscar onSearchResults={setServicios}/>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Formulario onServicioRegistrado={handleServicioRegistrado} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tabla servicios={sortedServicios} onServicioActualizado={handleServicioActualizado} onServicioEliminado={handleServicioEliminado} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewServicioAdmin;
