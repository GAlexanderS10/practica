import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WorkOffOutlined from '@mui/icons-material/WorkOffOutlined';

const ModalAsignacionRol = ({usuarioId, userName,onCloseAsignarModal}) => {

    


  return (
    <>
       
       <Dialog  open={true} onClose={onCloseAsignarModal} maxWidth="lg" fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onCloseAsignarModal}
          sx={{
            position: "absolute",
            right: 50,
            top: 60,
            color: "#fff",
            bgcolor: "#C84337",
            "&:hover": {
              bgcolor: "#F87171",
              color: "#fff",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
          <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
            <WorkOffOutlined sx={{ fontSize: "40px", color: "#014C6F" }} />
          </Box>
          <Typography
            fontSize={"35px"}
            fontWeight={"bold"}
            align="left"
            color="#014C6F"
          >
            Roles Asignados a {userName}
          </Typography>
        </Box>
        <br />
        <Box bgcolor="#F0F0F0" p={2}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ModalAsignacionRol;
