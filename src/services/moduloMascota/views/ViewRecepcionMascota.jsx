import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Buscar from '../BuscarMascota';
import Formulario from '../InsertarMascota';
import Tabla from '../ListarMascotas';
import { sortBy } from 'lodash';

const ViewRecepcionMascota = () => {
  const [mascotas, setMascotas] = useState([]);
  const sortedMascotas = sortBy(mascotas, 'mascotaId').reverse();

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Mascota');
      setMascotas(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
    }
  };

  const handleMascotaActualizada = (mascotaId, datosActualizados) => {
    
    const mascotaIndex = mascotas.findIndex((mascota) => mascota.mascotaId === mascotaId);
  
    if (mascotaIndex !== -1) {
      const nuevosMascotas = [...mascotas];
      nuevosMascotas[mascotaIndex] = { ...nuevosMascotas[mascotaIndex], ...datosActualizados };
      setMascotas(nuevosMascotas);
    }
  };

  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PetsIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Módulo de Mascotas
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tabla mascotas={sortedMascotas} onMascotaActualizada={handleMascotaActualizada} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewRecepcionMascota;
