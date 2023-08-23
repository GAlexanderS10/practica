import React, { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditarEmpleado = ({ empleado, onClose, onEmpleadoActualizado, fetchEmpleados }) => {
  const [nombres, setNombres] = useState(empleado.nombres);
  const [apellidos, setApellidos] = useState(empleado.apellidos);
  const [dni, setDni] = useState(empleado.dni);
  const [celular, setCelular] = useState(empleado.celular);
  const [email, setEmail] = useState(empleado.email);
  const [selectedCargo, setSelectedCargo] = useState(empleado.cargoId);
  const [cargos, setCargos] = useState([]);

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

  const handleClose = () => {
    onClose();
  };

  const handleGuardarCambios = async () => {
    try {
      const empleadoActualizado = {
        ...empleado,
        nombres: nombres,
        apellidos: apellidos,
        dni: dni,
        celular: celular,
        email: email,
        cargoId: selectedCargo,
        
      };

      const response = await axios.put(
        `https://localhost:7266/api/Empleado/${empleado.empleadoId}`,
        empleadoActualizado
      );

      if (response.status === 204) {
        console.log("Empleado actualizado exitosamente.");
        onEmpleadoActualizado(empleado.empleadoId, empleadoActualizado);
        fetchEmpleados()
        onClose();
      } else {
        console.error("Error al actualizar el empleado.");
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
        Editar Empleado
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nombres"
                type="text"
                variant="outlined"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Apellidos"
                type="text"
                variant="outlined"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="DNI"
                type="text"
                variant="outlined"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Celular"
                type="text"
                variant="outlined"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Cargo</InputLabel>
                <Select
                  value={selectedCargo}
                  onChange={(e) => setSelectedCargo(e.target.value)}
                  label="Cargo"
                >
                  <MenuItem value="">
                    <em>Seleccionar Cargo</em>
                  </MenuItem>
                  {cargos.map((cargo) => (
                    <MenuItem key={cargo.cargoId} value={cargo.cargoId}>
                      {cargo.especialidad}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default EditarEmpleado;
