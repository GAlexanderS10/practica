import React from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const EliminarCita = ({ nroCita, mascotaNombre , onModalClose, onCitaEliminada }) => {

  const handleCloseModal = () => {
    onModalClose();
  };

  const handleDelete = async () => {
    try {
      // Realizar la solicitud HTTP DELETE al backend para eliminar el servicio
      await axios.delete(`https://localhost:7266/api/Cita/eliminarCita/${nroCita}`);
      console.log('Cita eliminada exitosamente.');
      // Llamar a la función para notificar al componente padre que el servicio ha sido eliminado
      onCitaEliminada(nroCita);
      onModalClose();
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
  };

  return (
    <div>
      <Dialog open onClose={handleCloseModal}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#B2211E',
            color: '#fff',
            padding: '20px',
            fontWeight: 'bold',
          }}
        >
          CONFIRMACIÓN DE ELIMINACIÓN
          <IconButton
            aria-label="close"
            onClick={() => {
              handleCloseModal();
            }}
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
        <br />
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 'bold', color: '#222' }}>
            ¿Está seguro de eliminar la cita de la mascota "{mascotaNombre}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            sx={{ color: '#fff', backgroundColor: '#8D8D8D', '&:hover': { backgroundColor: '#747674' } }}
          >
            CANCELAR
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ color: '#fff', backgroundColor: '#C84337', '&:hover': { backgroundColor: '#F87171' } }}
          >
            ELIMINAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EliminarCita;
