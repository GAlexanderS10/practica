import React from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EliminarCliente = ({ usuarioId, userName, onModalClose, onUsuarioEliminado }) => {
  const handleClose = () => {
    onModalClose();
  };

  const handleEliminarCliente = async () => {
    try {
      const response = await axios.delete(`https://localhost:7266/api/Usuario/${usuarioId}`);
      if (response.status === 204) {
        console.log('Usuario eliminado exitosamente.');
        onUsuarioEliminado(usuarioId);
        onModalClose();
      } else {
        console.error('Error al eliminar el usuario.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <Dialog open onClose={handleClose}>
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
          onClick={handleClose}
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
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <br />
      <DialogContent>
        <DialogContentText sx={{ fontWeight: 'bold', color: '#222' }}>
        ¿Estás seguro de que deseas eliminar el usuario <strong>"{userName}"</strong>?
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}  sx={{ color: '#fff', backgroundColor: '#8D8D8D', '&:hover': { backgroundColor: '#747674' } }}
          >
            CANCELAR
          </Button>
        <Button onClick={handleEliminarCliente} variant="contained" sx={{ color: '#fff', backgroundColor: '#C84337', '&:hover': { backgroundColor: '#F87171' } }}
          >
            ELIMINAR
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EliminarCliente;
