import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import WorkOutline from "@mui/icons-material/WorkOutline";
import { sortBy } from "lodash";
import ListarRoles from "./ListarRoles";
import InsertarRol from "./InsertarRol";

const Rol = () => {
  const [roles, setRoles] = useState([]);
  const sortedRoles = sortBy(roles, "rolId").reverse();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("https://localhost:7266/api/Rol");
      setRoles(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de Roles:", error);
    }
  };

  const handleRolRegistrado = (nuevoRol) => {
    setRoles((prevRoles) => [...prevRoles, nuevoRol]);
  };


  const handleRolActualizado = (rolId, datosActualizados) => {
    const rolIndex = roles.findIndex((rol) => rol.rolId === rolId);

    if (rolIndex !== -1) {
      const nuevosRoles = [...roles];
      nuevosRoles[rolIndex] = { ...nuevosRoles[rolIndex], ...datosActualizados };
      setRoles(nuevosRoles);
    }
  };


  const handleRolEliminado = (rolId) => {
    setRoles((prevRoles) =>
      prevRoles.filter((rol) => rol.rolId !== rolId)
    );
  };
  

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
          background: "#fff",
          color: "#29524A",
          display: "flex",
          alignItems: "center",
          borderWidth: "2px",
          borderStyle: "solid",
          justifyContent: "center",
          gap: "8px",
          "&:hover": { background: "#DADDDA", color: "#184D47" },
        }}
      >
        <Box sx={{ color: "#29524A" }}>
          <WorkOutline />
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>Módulo de Roles</Typography>
      </Button>
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
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
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
            <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
              <WorkOutline sx={{ fontSize: "40px", color: "#014C6F" }} />
            </Box>
            <Typography
              fontSize={"35px"}
              fontWeight={"bold"}
              align="left"
              color="#014C6F"
            >
              Módulo de Roles
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
                      <InsertarRol onRolRegistrado={handleRolRegistrado} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ListarRoles roles={sortedRoles}  onRolActualizado={handleRolActualizado} onRolEliminado={handleRolEliminado}/>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Rol;
