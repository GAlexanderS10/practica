import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const EditarRolAsignado = ({ usuarioId, rolId, tipo, open, onClose }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRolId, setSelectedRolId] = useState("");
  const [rolActual, setRolActual] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await axios.get("https://localhost:7266/api/Rol");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setRoles([]);
      }
    }

    async function fetchRolActual() {
      try {
        const response = await axios.get(
          `https://localhost:7266/api/UsuarioRol/RolActual/${usuarioId}`
        );
        setRolActual(response.data.rolActual);
      } catch (error) {
        console.error("Error fetching rol actual:", error);
        setRolActual("");
      }
    }

    fetchRoles();
    fetchRolActual();
  }, [usuarioId, rolActual]);

  const handleEditar = async () => {
    if (!selectedRolId) {
      setError("Por favor, seleccione un rol antes de editar.");
      return;
    }

    try {
      await axios.put(
        `https://localhost:7266/api/UsuarioRol/ActualizarRol?usuarioId=${usuarioId}&rolId=${rolId}&nuevoRolId=${selectedRolId}`
      );
      console.log("Rol editado exitosamente");
      setSelectedRolId(""); // Restablecer el estado del Select
      onClose();
    } catch (error) {
      console.error("Error al editar el rol:", error);
    }
  };

  useEffect(() => {
    if (!open) {
      setError(null);
    }
  }, [open]);

  const handleCloseModal = () => {
    setSelectedRolId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#8D8D8D",
          color: "#fff",
          padding: "20px",
          fontWeight: "bold",
        }}
      >
        Editar Rol Asignado
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 14,
            top: 14,
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
        <Grid container spacing={2} sx={{ marginTop: "5px" }}>
          <Grid item xs={12}>
            <TextField
              label="Usuario ID"
              variant="outlined"
              value={usuarioId}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Rol Actual"
              variant="outlined"
              value={tipo}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Nuevo Rol</InputLabel>
              <Select
                name="selectedRol"
                label="Rol"
                value={selectedRolId}
                onChange={(e) => {
                  setSelectedRolId(e.target.value);
                  setError(null);
                }}
              >
                <MenuItem value="">
                  <em>Seleccione un rol</em>
                </MenuItem>
                {roles.map((rol) => (
                  <MenuItem key={rol.rolId} value={rol.rolId}>
                    {rol.tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseModal}
          sx={{
            marginTop: 4,
            color: "#fff",
            backgroundColor: "#B91C1C",
            "&:hover": { backgroundColor: "#FA3E35" },
          }}
        >
          CANCELAR
        </Button>
        <Button
          variant="contained"
          onClick={handleEditar}
          sx={{
            marginTop: 4,
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

export default EditarRolAsignado;
