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

const EditarRol = ({ rol, onCloseRol, onRolActualizado }) => {
  const [tipo, setTipo] = useState(rol.tipo);

  const handleClose = () => {
    onCloseRol();
  };

  const handleGuardarCambios = async () => {
    try {
      const rolActualizado = {
        ...rol,
        tipo: tipo,
      };

      const response = await axios.put(
        `https://localhost:7266/api/Rol/${rol.rolId}`,
        rolActualizado
      );
      if (response.status === 200) {
        console.log("Rol actualizado exitosamente.");
        onRolActualizado(rol.rolId, rolActualizado);
        onCloseRol();
      } else {
        console.error("Error al actualizar el rol.");
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
        Editar Rol
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
                label="Nombres"
                type="text"
                variant="outlined"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
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

export default EditarRol;
