import React,{useState} from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Mascotas from '../Mascotas';
import InsertarMascotaxCLI from '../InsertarMascotaxCLI'

const ViewClienteMascota = () => {

  const [mascotasUpdated, setMascotasUpdated] = useState(false);

  const handleMascotasUpdated = () => {
    setMascotasUpdated(!mascotasUpdated);
  };

  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PetsIcon sx={{ fontSize: '40px', color: '#014C6F' }} />
        </Box>
        <Typography fontSize={'35px'} fontWeight={'bold'} align="left" color="#014C6F">
          Mis Mascotas
        </Typography>
      </Box>
      <br />

      <Box bgcolor="#F0F0F0" p={2}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end" align="right">
                    <InsertarMascotaxCLI
                      onMascotasUpdated={handleMascotasUpdated}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
            </Box>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Mascotas mascotasUpdated={mascotasUpdated}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewClienteMascota;
