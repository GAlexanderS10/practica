import React, { useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListarMascotasXCLI from './ListarMascotasXCLI'
import InsertarMascotaxCLI from './InsertarMascotaxCLI'
import Grid from '@mui/material/Grid'
import PetsIcon from '@mui/icons-material/Pets';

const MascotasModal = ({ openModal, onCloseMascota, clienteId,clienteNombre }) => {
  const handleCloseModal = () => {
    onCloseMascota();
  };

  const [mascotasUpdated, setMascotasUpdated] = useState(false);

  const handleMascotasUpdated = () => {
    setMascotasUpdated(!mascotasUpdated);
  };
  

  return (
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
<DialogTitle>
  <IconButton
    aria-label="close"
    onClick={handleCloseModal}
    sx={{
      position: 'absolute',
      right: 50,
      top: 60,
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
<DialogContent>
<Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PetsIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Mascotas de {clienteNombre}
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
                    <InsertarMascotaxCLI clienteId={clienteId} onMascotasUpdated={handleMascotasUpdated}/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <ListarMascotasXCLI clienteId={clienteId} mascotasUpdated={mascotasUpdated} />
          </Grid>
        </Grid>
      </Box>
</DialogContent>
</Dialog>
  );
};

export default MascotasModal;
