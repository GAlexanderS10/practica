import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ContactEmergency from '@mui/icons-material/ContactEmergency';
import Empleado from '../Empleado';

const ViewEmpleadoPerfil = () => {

  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <ContactEmergency sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Perfil de Usuario
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Empleado/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewEmpleadoPerfil;
