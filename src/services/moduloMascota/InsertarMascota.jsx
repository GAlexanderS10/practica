import React, { useState } from 'react';
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import Tabla from './ListarMascotas'
import PetsIcon from '@mui/icons-material/Pets';
import Buscar from './BuscarMascota';
import Formulario from './InsertarMascota';

const InsertarMascota = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{
          background: '#fff',
          color: '#29524A',
          display: 'flex',
          alignItems: 'center',
          borderWidth: '2px',
          borderStyle: 'solid',
          justifyContent: 'center',
          gap: '8px',
          '&:hover': { background: '#DADDDA', color: '#184D47' },
        }}
      >
        <Box sx={{ color: '#29524A' }}>
          <Add />
        </Box>
        <Typography sx={{ fontWeight: 'bold' }}>AGREGAR</Typography>
      </Button>

      <Dialog open={open} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => {
              handleCloseModal();
            }}
            sx={{
              position: 'absolute',
              right: 40,
              top: 60,
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
        <DialogContent>
        <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PetsIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Mis Mascotas
        </Typography>
      </Box>
      <br/>
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
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default InsertarMascota;
