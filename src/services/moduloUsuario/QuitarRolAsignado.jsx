import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const QuitarRolAsignado = ({ usuarioId, rolId, open, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEliminar = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`https://localhost:7266/api/UsuarioRol`, {
        data: { usuarioId, rolId },
      });
      console.log("Rol eliminado exitosamente");

      onClose();
    } catch (error) {
      console.error("Error al eliminar el rol:", error);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#B2211E",
          color: "#fff",
          padding: "20px",
          fontWeight: "bold",
        }}
      >
        CONFIRMACIÓN DE ELIMINACIÓN
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          <Close />
        </IconButton>
      </DialogTitle>
      <br/>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: "bold", color: "#222" }}>
          ¿Está seguro de quitar el rol que tiene asignado?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            backgroundColor: "#8D8D8D",
            "&:hover": { backgroundColor: "#747674" },
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={handleEliminar}
          disabled={isDeleting}
          sx={{
            color: "#fff",
            backgroundColor: "#C84337",
            "&:hover": { backgroundColor: "#F87171" },
          }}
        >
          ELIMINAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuitarRolAsignado;
