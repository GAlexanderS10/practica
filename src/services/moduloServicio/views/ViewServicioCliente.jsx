import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Servicio from '../Servicio';

const ViewServicioCliente = () => {

  return (
    <>
      <Box className="mod-fondo" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <VaccinesIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography className="mod-fondo-txt" fontSize={'35px'} fontWeight={'bold'} align="left">
          Servicios que Ofrecemos
        </Typography>
      </Box>
      <br />
      <Box className="mod-fondo" p={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Servicio/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewServicioCliente;
