import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Buscar from '../BuscarMascota';
import Formulario from '../InsertarMascota';
import Tabla from '../ListarMascotas';

const ViewRecepcionMascota = () => {
  const [mascotas, setMascotas] = useState([]);

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

  const handleMascotaRegistrada = (nuevaMascota) => {
    // Agregar la nueva mascota a la lista de mascotas actual
    setMascotas((prevMascotas) => [...prevMascotas, nuevaMascota]);
  };

  const handleMascotaActualizada = (mascotaId, datosActualizados) => {
    // Buscamos el índice de la mascota que se actualizó en la lista de mascotas
    const mascotaIndex = mascotas.findIndex((mascota) => mascota.mascotaId === mascotaId);

    if (mascotaIndex !== -1) {
      // Creamos una nueva lista de mascotas, donde la mascota actualizada reemplaza a la antigua
      const nuevasMascotas = [...mascotas];
      nuevasMascotas[mascotaIndex] = { ...nuevasMascotas[mascotaIndex], ...datosActualizados };
      setMascotas(nuevasMascotas);
    }
  };

  const handleMascotaEliminada = (mascotaId) => {
    setMascotas((prevMascotas) =>
      prevMascotas.filter((mascota) => mascota.mascotaId !== mascotaId)
    );
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
      <Box bgcolor="#F0F0F0" p={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Buscar onSearchResults={setMascotas} />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Formulario onMascotaRegistrada={handleMascotaRegistrada} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tabla
              mascotas={mascotas}
              onMascotaActualizada={handleMascotaActualizada}
              onMascotaEliminada={handleMascotaEliminada}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewRecepcionMascota;
