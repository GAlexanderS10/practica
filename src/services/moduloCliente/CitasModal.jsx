import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import{ Close } from '@mui/icons-material';

const CitasModal = ({ openModalCita, onCloseCita, clienteId, clienteNombre }) => {
  const [services, setServices] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get('https://localhost:7266/api/Servicio');
        setServices(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    const getMascotasCliente = async () => {
      try {
        const response = await axios.get(`https://localhost:7266/api/Mascota/cliente/${clienteId}`);
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al obtener las mascotas del cliente:', error);
      }
    };

    getServices();
    getMascotasCliente();
  }, [clienteId]);


  return (
    <Dialog open={openModalCita} onClose={onCloseCita} maxWidth="lg" fullWidth>
              <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#8D8D8D',
            color: '#fff',
            padding: '20px',
            fontWeight: 'bold',
          }}
        >
          Agendar Cita para {clienteNombre}
          <IconButton
            aria-label="close"
            onClick={onCloseCita}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#fff',
              bgcolor: '#C84337',
              '&:hover': {
                bgcolor: '#F87171',
                color: '#fff',
              },
            }}
          >
            <Close />
          </IconButton>
      </DialogTitle>
      <b/>
      <DialogContent>
        <form >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Id Cliente"
                  variant="outlined"
                  value={clienteId}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                  <InputLabel>Mascota</InputLabel>
                  <Select
                  label="Mascota"
                  name="mascotaId"
                     >
                    {mascotas.map((mascota) => (
                    <MenuItem key={mascota.mascotaId} value={mascota.nombre}>
                    {mascota.nombre}
                  </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            </Grid>
          </form>
      </DialogContent>
      <DialogActions>
          <Button
            sx={{
              marginTop: 4,
              color: '#fff',
              backgroundColor: '#8D8D8D',
              '&:hover': { backgroundColor: '#747674' },
            }}
          >
            RESETEAR
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: 4,
              backgroundColor: '#29524A',
              '&:hover': { backgroundColor: '#1D3B35' },
            }}
          >
            REGISTRAR
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default CitasModal;
