import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Buscar from './Buscar';
import Formulario from './Formulario';
import Tabla from './Tabla';

const Crud = () => {
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
                <Buscar />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Formulario />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tabla />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Crud;
