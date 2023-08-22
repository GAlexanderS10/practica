import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditarCargo = ({ cargo, onCloseCargo, onCargoActualizado }) => {
  const [cargoId, setCargoId] = useState(cargo.cargoId);
  const [cargo1, setCargo1] = useState(cargo.cargo1);
  const [especialidad, setEspecialidad] = useState(cargo.especialidad);
  const [sueldo, setSueldo] = useState(cargo.sueldo);

  const handleClose = () => {
    onCloseCargo();
  };

  const handleGuardarCambios = async () => {
    try {
      const cargoActualizado = {
        ...cargo,
        cargoId: cargoId,
        cargo1: cargo1,
        especialidad: especialidad,
        sueldo: sueldo,
      };

      const response = await axios.put(
        `https://localhost:7266/api/Cargo/${cargo.cargoId}`,
        cargoActualizado
      );
      if (response.status === 204) {
        console.log("Cargo actualizado exitosamente.");
        onCargoActualizado(cargo.cargoId, cargoActualizado);
        onCloseCargo();
      } else {
        console.error("Error al actualizar el cargo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle
        sx={{ backgroundColor: "#8D8D8D", color: "#fff", fontWeight: "bold" }}
      >
        Editar Cargo
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
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
        <form>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "5px",
            }}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cargo ID"
                type="text"
                variant="outlined"
                value={cargoId}
                disabled
                onChange={(e) => setCargoId(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cargo"
                type="text"
                variant="outlined"
                value={cargo1}
                onChange={(e) => setCargo1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Especialidad"
                type="text"
                variant="outlined"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sueldo"
                type="text"
                variant="outlined"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#B91C1C",
            color: "#fff",
            "&:hover": { backgroundColor: "#FA3E35" },
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={handleGuardarCambios}
          variant="contained"
          sx={{
            backgroundColor: "#01235e",
            "&:hover": { backgroundColor: "#033180" },
          }}
        >
          EDITAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarCargo;
