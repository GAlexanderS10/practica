import React, { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

const InsertarEmpleado = ({ onEmpleadoRegistrado }) => {
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellido, setApellido] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [dni, setDni] = useState("");
  const [dniError, setDniError] = useState("");
  const [celular, setCelular] = useState("");
  const [celularError, setCelularError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cargoId, setCargoId] = useState("");
  const [cargos, setCargos] = useState([]);
  const [open, setOpen] = useState(false);

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

  const isNumber = (text) => /^\d+$/.test(text);

  const validateNombre = () => {
    if (!nombre.trim().length) {
      setNombreError("Debe completar este campo");
    } else {
      setNombreError("");
    }
  };

  const validateApellido = () => {
    if (!apellido.trim().length) {
      setApellidoError("Debe completar este campo");
    } else {
      setApellidoError("");
    }
  };

  const validateDni = () => {
    if (!dni.trim()) {
      setDniError("Debe completar este campo");
    } else if (!/^\d{8}$/.test(dni)) {
      setDniError("El DNI debe tener exactamente 8 números");
    } else if (!isNumber(dni)) {
      setDniError("El DNI solo debe contener números");
    } else {
      setDniError("");
    }
  };

  const validateCelular = () => {
    if (!celular.trim()) {
      setCelularError("Debe completar este campo");
    } else if (!/^\d{9}$/.test(celular)) {
      setCelularError("El Celular debe tener exactamente 9 números");
    } else if (!isNumber(celular)) {
      setCelularError("El Celular solo debe contener números");
    } else {
      setCelularError("");
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Debe completar este campo");
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos antes de enviar el formulario
    validateNombre();
    validateApellido();
    validateDni();
    validateCelular();
    validateEmail();

    // Comprobar si hay errores antes de enviar el formulario
    if (
      !nombreError &&
      !apellidoError &&
      !dniError &&
      !celularError &&
      !emailError
    ) {
      try {
        // Datos del cliente a enviar a la API
        const empleadoData = {
          Nombres: nombre,
          Apellidos: apellido,
          Dni: dni,
          Celular: celular,
          Email: email,
          CargoId: cargoId,
        };

        const response = await axios.post(
          "https://localhost:7266/api/Empleado",
          empleadoData
        );
        console.log("Formulario enviado:", response.data);

        onEmpleadoRegistrado(response.data);

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
    setNombre("");
    setNombreError("");
    setApellido("");
    setApellidoError("");
    setDni("");
    setDniError("");
    setCelular("");
    setCelularError("");
    setEmail("");
    setEmailError("");
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
          <Add />
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>AGREGAR</Typography>
      </Button>

      <Dialog open={open} onClose={handleCloseModal} fullWidth>
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
          Registro de Empleado
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nombres"
                  variant="outlined"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onBlur={validateNombre}
                  error={!!nombreError}
                  helperText={nombreError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  variant="outlined"
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  onBlur={validateApellido}
                  error={!!apellidoError}
                  helperText={apellidoError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="DNI"
                  variant="outlined"
                  type="number"
                  value={dni}
                  inputProps={{ maxLength: 8 }}
                  onChange={(e) => setDni(e.target.value)}
                  onBlur={validateDni}
                  error={!!dniError}
                  helperText={dniError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Celular"
                  variant="outlined"
                  type="number"
                  value={celular}
                  inputProps={{ maxLength: 9 }}
                  onChange={(e) => setCelular(e.target.value)}
                  onBlur={validateCelular}
                  error={!!celularError}
                  helperText={celularError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="cargo-label">Especialidad</InputLabel>
                  <Select
                    labelId="cargo-label"
                    id="cargo"
                    value={cargoId}
                    onChange={(e) => setCargoId(e.target.value)}
                    label="Cargo"
                  >
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

export default InsertarEmpleado;
