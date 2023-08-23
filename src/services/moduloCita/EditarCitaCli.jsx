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
  TextField,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Calendario from "../../utils/Calendario";
import Horario from "../../utils/Horario";

const EditarCita = ({ cita, onClose, onCitaActualizada }) => {
  const [servicios, setServicios] = useState([]);
  const [estado, setEstado] = useState(cita.estado);
  const [fechaCita, setFechaCita] = useState(
    new Date(cita.fechaCita).toISOString().split("T")[0]
  );
  const [hora, setHora] = useState(cita.hora);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(
    cita.servicio || ""
  );

  useEffect(() => {
    async function fetchServicios() {
      try {
        const response = await axios.get("https://localhost:7266/api/Servicio");
        setServicios(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
        setServicios([]);
      }
    }
    fetchServicios();
  }, []);

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  const handleServicioChange = (e) => {
    setServicioSeleccionado(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCita = {
      ...cita,
      fechaCita: fechaCita,
      hora: hora,
      servicio: servicioSeleccionado,
    };

    try {
      const response = await axios.put(
        `https://localhost:7266/api/Cita/${cita.nroCita}`,
        updatedCita
      );
      console.log("Cita actualizada:", response.data);
      onCitaActualizada(cita.nroCita, updatedCita);
      onClose();
    } catch (error) {
      console.error("Error al actualizar cita:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
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
        Editar Cita
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "10px",
            }}
          >
            <Grid item xs={6} style={{ display: "none" }}>
              <TextField
                label="NroCita"
                value={cita.nroCita}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={6} style={{ display: "none" }}>
              <TextField label="DNI" value={cita.dni} fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Mascota"
                value={cita.mascota}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Servicio</InputLabel>
                <Select
                  name="TipoServicio"
                  label="Servicio"
                  value={servicioSeleccionado}
                  onChange={handleServicioChange}
                >
                  <MenuItem value="">Seleccione un tipo de servicio</MenuItem>
                  {servicios.map((servicio) => (
                    <MenuItem key={servicio.servicioId} value={servicio.nombre}>
                      {servicio.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ display: "none" }}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select value={estado} onChange={handleEstadoChange}>
                  <MenuItem value="ESPERA">ESPERA</MenuItem>
                  <MenuItem value="ASISTIÓ">ASISTIÓ</MenuItem>
                  <MenuItem value="NO ASISTIÓ">NO ASISTIÓ</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                marginTop: "-10px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Calendario
                  selectedDate={new Date(fechaCita)}
                  onDateSelect={(selectedDate) =>
                    setFechaCita(selectedDate.toISOString().split("T")[0])
                  }
                />
                <TextField
                  type="date"
                  name="FechaCita"
                  fullWidth
                  style={{ marginTop: "11px" }}
                  value={fechaCita}
                  onChange={(e) => setFechaCita(e.target.value)}
                  disabled
                />
              </div>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                marginTop: "-10px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Horario
                  selectedTime={new Date(`2000-01-01T${hora}`)}
                  onTimeSelect={(selectedTime) =>
                    setHora(
                      new Date(selectedTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    )
                  }
                />
                <TextField
                  type="text"
                  name="Hora"
                  fullWidth
                  style={{ marginTop: "25px" }}
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  disabled
                />
              </div>
            </Grid>
          </Grid>
          <div style={{ marginBottom: "3px" }}></div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
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
          onClick={handleSubmit}
          variant="contained"
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

export default EditarCita;
