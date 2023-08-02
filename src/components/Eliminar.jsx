import React, { useState } from 'react';
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

const Eliminar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    // Aquí puedes implementar la lógica para eliminar el elemento
    console.log('Elemento eliminado');
    setModalOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Eliminar Elemento
      </Button>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
      <DialogTitle   sx={{display: 'flex', alignItems: 'center',justifyContent: 'space-between',backgroundColor: '#B2211E', color: '#fff', padding: '20px',fontWeight: 'bold'}}> 
          CONFIRMACIÓN DE ELIMINACIÓN
        <IconButton
            aria-label="close"
            onClick={() => {
              handleCloseModal();
            }}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#fff',bgcolor:"#C84337", '&:hover': {
              bgcolor: '#F87171', color: '#fff'
            },}}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <br/>
        <DialogContent>
          <DialogContentText sx={{  fontWeight:'bold', color:'#222'}}>
            ¿Estás seguro de que deseas eliminar este elemento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseModal} sx={{  color:'#fff', backgroundColor: '#8D8D8D','&:hover': { backgroundColor: '#747674',}}}>
            CANCELAR
          </Button>
          <Button onClick={handleDelete} sx={{  color:'#fff', backgroundColor: '#C84337','&:hover': { backgroundColor: '#F87171',}}}>
              ELIMINAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Eliminar;
