import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/AccountBox';
import Buscar from '../BuscarUsuario';
import Formulario from '../InsertarUsuario';
import Tabla from '../ListarUsuarios';
import Rol from '../../moduloRol/Rol'
import { sortBy } from 'lodash';

const ViewRecepcionCliente = () => {

  const [usuarios, setUsuarios] = useState([]);
  const sortedUsuarios = sortBy(usuarios, 'usuarioId').reverse();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Usuario');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de Usuarios:', error);
    }
  };

  const handleUsuarioRegistrado = (nuevoUsuario) => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
  };

  const handleUsuarioActualizado = (usuarioId, datosActualizados) => {
    const usuarioIndex = usuarios.findIndex((usuario) => usuario.usuarioId === usuarioId);

    if (usuarioIndex !== -1) {
      const nuevosUsuarios = [...usuarios];
      nuevosUsuarios[usuarioIndex] = { ...nuevosUsuarios[usuarioIndex], ...datosActualizados };
      setUsuarios(nuevosUsuarios);
    }
  };

  const handleUsuarioEliminado = (usuarioId) => {
    setUsuarios((prevUsuarios) =>
    prevUsuarios.filter((usuario) => usuario.usuarioId !== usuarioId)
    );
  };


  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PersonIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Módulo de Usuarios
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
              <Buscar onSearchResults={setUsuarios}/>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Formulario onUsuarioRegistrado={handleUsuarioRegistrado}/>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Rol/>
                  
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Tabla usuarios={sortedUsuarios} onUsuarioActualizado={handleUsuarioActualizado} onUsuarioEliminado={handleUsuarioEliminado} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewRecepcionCliente;
