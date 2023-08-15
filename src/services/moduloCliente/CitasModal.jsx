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

const CitasModal = ({
  openModalCita,
  onCloseCita,
  clienteId,
  clienteNombre,
}) => {
  const [cita, setCita] = useState({
    ClienteId: clienteId || 0,
    MascotaId: 0,
    TipoServicio: "",
    FechaCita: "",
    Hora: "",
    Estado: "ESPERA",
  });

  useEffect(() => {
    if (clienteId !== cita.ClienteId) {
      setCita((prevCita) => ({ ...prevCita, ClienteId: clienteId }));
    }
  }, [clienteId, cita.ClienteId]);

  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    async function fetchMascotas() {
      try {
        const response = await axios.get(
          `https://localhost:7266/api/Mascota/cliente/${clienteId}`
        );
        setMascotas(response.data);
      } catch (error) {
        console.error("Error fetching mascotas:", error);
        setMascotas([]);
      }
    }
    fetchMascotas();
  }, [clienteId]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCita((prevCita) => ({ ...prevCita, [name]: value }));
  };

  const handleReset = () => {
    setCita({
      ...cita,
      MascotaId: 0,
      TipoServicio: "",
      FechaCita: "",
      Hora: "",
      Estado: "ESPERA",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7266/api/Cita/crearCita",
        cita
      );
      console.log("Cita creada:", response.data);
      handleReset();
      onCloseCita();
    } catch (error) {
      console.error("Error al crear cita:", error);
      // Manejo de errores, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <Dialog
      open={openModalCita}
      onClose={() => {
        onCloseCita();
        handleReset();
      }}
      fullWidth
      maxWidth="md"
    >
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
        Agendar Cita a las Mascotas de {clienteNombre}
        <IconButton
          aria-label="close"
          onClick={() => {
            onCloseCita();
            handleReset();
          }}
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
          <Grid container spacing={2} sx={{
            marginTop : "5px"
        }}
      >
            
              <TextField
                type="number"
                name="ClienteId"
                label="ID del Cliente"
                value={cita.ClienteId}
                onChange={handleChange}
                fullWidth
                disabled
                style={{ display: "none" }}
              />
            
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Mascota</InputLabel>
                <Select
                  name="MascotaId"
                  label="Mascota"
                  value={cita.MascotaId}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Seleccione una mascota</MenuItem>
                  {mascotas.map((mascota) => (
                    <MenuItem key={mascota.mascotaId} value={mascota.mascotaId}>
                      {mascota.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Servicio</InputLabel>
                <Select
                  name="TipoServicio"
                  label="Servicio"
                  value={cita.TipoServicio}
                  onChange={handleChange}
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

  
              <TextField
                type="text"
                name="Estado"
                label="Estado"
                value={cita.Estado}
                onChange={handleChange}
                fullWidth
                style={{ display: "none" }}
              />
            
            <Grid item xs={6}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Calendario
                  onDateSelect={(selectedDate) =>
                    handleChange({
                      target: {
                        name: "FechaCita",
                        value: selectedDate.toISOString().split("T")[0],
                      },
                    })
                  }
                />
                <TextField
                  type="date"
                  name="FechaCita"
                  value={cita.FechaCita}
                  onChange={handleChange}
                  fullWidth
                  style={{ marginTop: "8px" , display: "none" }}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Horario
                  onTimeSelect={(selectedTime) =>
                    handleChange({
                      target: {
                        name: "Hora",
                        value: new Date(selectedTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      },
                    })
                  }
                />
                <TextField
                  type="text"
                  name="Hora"
                  value={cita.Hora}
                  onChange={handleChange}
                  fullWidth
                  style={{ marginTop: "8px" , display: "none" }}
                />
              </div>
            </Grid>

            
          </Grid>
          <div style={{ marginBottom: "3px" }}></div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleReset();
          }}
          sx={{
            marginTop: 4,
            color: "#fff",
            backgroundColor: "#8D8D8D",
            "&:hover": { backgroundColor: "#747674" },
          }}
        >
          RESETEAR
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          sx={{
            marginTop: 4,
            backgroundColor: "#29524A",
            "&:hover": { backgroundColor: "#1D3B35" },
          }}
        >
          AGENDAR CITA
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CitasModal;
