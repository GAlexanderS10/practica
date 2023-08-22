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
import ListarCargos from "./ListarCargos";
import InsertarCargo from "./InsertarCargo";

const Cargo = () => {
  const [cargos, setCargos] = useState([]);
  const sortedCargos = sortBy(cargos, "cargoId").reverse();

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const response = await axios.get("https://localhost:7266/api/Cargo");
      setCargos(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de Cargos:", error);
    }
  };

  const handleCargoRegistrado = (nuevoCargo) => {
    setCargos((prevCargos) => [...prevCargos, nuevoCargo]);
  };


  const handleCargoActualizado = (cargoId, datosActualizados) => {
    const cargoIndex = cargos.findIndex((cargo) => cargo.cargoId === cargoId);

    if (cargoIndex !== -1) {
      const nuevosCargos = [...cargos];
      nuevosCargos[cargoIndex] = { ...nuevosCargos[cargoIndex], ...datosActualizados };
      setCargos(nuevosCargos);
    }
  };


  const handleCargoEliminado = (cargoId) => {
    setCargos((prevCargos) =>
        prevCargos.filter((cargo) => cargo.cargoId !== cargoId)
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
        <Typography sx={{ fontWeight: "bold" }}>Módulo de Cargos</Typography>
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
              Módulo de Cargos
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
                      <InsertarCargo onCargoRegistrado={handleCargoRegistrado} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ListarCargos cargos={sortedCargos}  onCargoActualizado={handleCargoActualizado} onCargoEliminado={handleCargoEliminado}/>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Cargo;
