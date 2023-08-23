import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Grid, Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Mascotas from '../Mascotas';
import InsertarMascotaxCLI from '../InsertarMascotaxCLI'
import { sortBy } from 'lodash';

const ViewClienteMascota = () => {

  const [mascotas, setMascotas] = useState([]);
  const sortedMascotas = sortBy(mascotas, 'mascotaId').reverse();

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const clienteId = localStorage.getItem("clienteId");
      const response = await axios.get(`https://localhost:7266/api/Mascota/cliente/${clienteId}`);
      setMascotas(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
    }
  };

  const handleMascotaRegistrada = (nuevaMascota) => {
 
    setMascotas((prevMascotas) => [...prevMascotas, nuevaMascota]);
  };

  const handleMascotaActualizada = (mascotaId, datosActualizados) => {
    
    const mascotaIndex = mascotas.findIndex((mascota) => mascota.mascotaId === mascotaId);
  
    if (mascotaIndex !== -1) {
      const nuevosMascotas = [...mascotas];
      nuevosMascotas[mascotaIndex] = { ...nuevosMascotas[mascotaIndex], ...datosActualizados };
      setMascotas(nuevosMascotas);
    }
  };

  const handleMascotaEliminado = (mascotaId) => {
    const nuevosMascotas = mascotas.filter((mascota) => mascota.mascotaId !== mascotaId);
    setMascotas(nuevosMascotas);
  };

  return (
    <>
      <Box className="mod-fondo" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PetsIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" className="mod-fondo-txt">
          Mis Mascotas
        </Typography>
      </Box>
      <br />

      <Box className="mod-fondo" p={2}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Box  className="mod-fondo"display="flex" justifyContent="flex-end" align="right">
                    <InsertarMascotaxCLI onMascotasUpdated={handleMascotaRegistrada}/>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
            </Box>
      <Box className="mod-fondo" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Mascotas mascotas={sortedMascotas} onMascotaActualizada={handleMascotaActualizada} onMascotaEliminada={handleMascotaEliminado}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewClienteMascota;
