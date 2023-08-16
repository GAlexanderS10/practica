import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Badge';
import Buscar from '../BuscarEmpleado';
import Formulario from '../InsertarEmpleado';
import Tabla from '../ListarEmpleados';
import { sortBy } from 'lodash';

const ViewRecepcionCliente = () => {

  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PersonIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Módulo de Empleados
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2}>
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
            
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewRecepcionCliente;
