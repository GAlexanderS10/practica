import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/ContactEmergency';
import Cliente from '../Cliente';

const ViewRecepcionCliente = () => {

  return (
    <>
      <Box className="mod-fondo" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PersonIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" className="mod-fondo-txt">
          Perfil de Usuario
        </Typography>
      </Box>
      <br />
      <Box className="mod-fondo" p={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Cliente/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewRecepcionCliente;
