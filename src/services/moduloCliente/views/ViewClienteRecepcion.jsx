import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/ContactEmergency';
import Buscar from '../BuscarCliente';
import Formulario from '../InsertarCliente';
import Tabla from '../ListarClientes';
import { sortBy } from 'lodash';

const ViewRecepcionCliente = () => {
  const [clientes, setClientes] = useState([]);
  const sortedClientes = sortBy(clientes, 'clienteId').reverse();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Cliente');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error);
    }
  };

  const handleClienteRegistrado = (nuevoCliente) => {

    setClientes((prevClientes) => [...prevClientes, nuevoCliente]);
  };

 
  const handleClienteActualizado = (clienteId, datosActualizados) => {
 
    const clienteIndex = clientes.findIndex((cliente) => cliente.clienteId === clienteId);

    if (clienteIndex !== -1) {

      const nuevosClientes = [...clientes];
      nuevosClientes[clienteIndex] = { ...nuevosClientes[clienteIndex], ...datosActualizados };
      setClientes(nuevosClientes);
    }
  };

  const handleClienteEliminado = (clienteId) => {
    setClientes((prevClientes) =>
      prevClientes.filter((cliente) => cliente.clienteId !== clienteId)
    );
  };

  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PersonIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Módulo de Clientes
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Buscar onSearchResults={setClientes}/>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Formulario onClienteRegistrado={handleClienteRegistrado}/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tabla clientes={sortedClientes} onClienteActualizado={handleClienteActualizado} onClienteEliminado={handleClienteEliminado} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewRecepcionCliente;
