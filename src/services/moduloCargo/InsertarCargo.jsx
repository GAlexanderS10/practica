import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

const InsertarCargo = ({ onCargoRegistrado }) => {
  const [cargo1, setCargo1] = useState("");
  const [cargo1Error, setCargo1Error] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [especialidadError, setEspecialidadError] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [sueldoError, setSueldoError] = useState(false);
  const [open, setOpen] = useState(false);

  const validateCargo1 = () => {
    if (!cargo1.trim().length) {
      setCargo1Error("Debe completar este campo");
    } else if (!/^[A-Za-záéíóúñÁÉÍÓÚ]+$/.test(cargo1)) {
      setCargo1Error("El Cargo contiene caracteres no válidos");
    } else {
      setCargo1Error("");
    }
  };

  const validateEspecialidad = () => {
    if (!especialidad.trim().length) {
      setEspecialidadError("Debe completar este campo");
    } else if (!/^[A-Za-záéíóúñÁÉÍÓÚ]+$/.test(cargo1)) {
      setEspecialidadError("La especialidad contiene caracteres no válidos");
    } else {
      setEspecialidadError("");
    }
  };

  const validateSueldo = () => {
    if (!sueldo.trim()) {
      setSueldoError("Debe completar este campo");
    } else if (!/^\d+(,\d{1,2})?$/.test(sueldo)) {
      setSueldoError(
        "El sueldo debe ser un número válido con dos decimales como máximo"
      );
    } else {
      setSueldoError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    validateCargo1();
    validateEspecialidad();
    validateSueldo();

    if (!cargo1Error && !especialidadError && !sueldoError) {
      try {
        const cargoData = {
          Cargo1: cargo1,
          Especialidad: especialidad,
          Sueldo: sueldo,
        };
        const response = await axios.post(
          "https://localhost:7266/api/Cargo",
          cargoData
        );

        console.log("Formulario enviado:", response.data);

        onCargoRegistrado(response.data);

        handleCloseModal();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    } else {
      console.log(
        "Hay errores en el formulario. Por favor, completa todos los campos correctamente."
      );
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setCargo1("");
    setCargo1Error("");
    setEspecialidad("");
    setEspecialidadError("");
    setSueldo("");
    setSueldoError("");
  };

  return (
    <Container maxWidth="xs">
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
          <Add />
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>AGREGAR</Typography>
      </Button>

      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="xs">
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
          Registro de Cargo
          <IconButton
            aria-label="close"
            onClick={() => {
              handleCloseModal();
              handleReset();
            }}
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
        <DialogContent>
          <form onSubmit={handleSubmit}>
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
                  label="Cargo1"
                  variant="outlined"
                  type="text"
                  value={cargo1}
                  onChange={(e) => setCargo1(e.target.value)}
                  onBlur={validateCargo1}
                  error={!!cargo1Error}
                  helperText={cargo1Error}
                />
                 </Grid>

                 <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Especialidad"
                  variant="outlined"
                  type="text"
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  onBlur={validateEspecialidad}
                  error={!!especialidadError}
                  helperText={especialidadError}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sueldo"
                  variant="outlined"
                  type="text"
                  value={sueldo}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9,]/g, "");
                    setSueldo(value);
                  }}
                  onBlur={validateSueldo}
                  error={!!sueldoError}
                  helperText={sueldoError && sueldoError}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </Grid>

            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleReset}
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
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            sx={{
              marginTop: 4,
              backgroundColor: "#29524A",
              "&:hover": { backgroundColor: "#1D3B35" },
            }}
          >
            REGISTRAR
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InsertarCargo;
