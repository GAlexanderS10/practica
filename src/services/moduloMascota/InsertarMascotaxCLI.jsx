import React, { useEffect,useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { PhotoCamera, Close, Add } from "@mui/icons-material";
import MachoIcon from "@mui/icons-material/Male";
import HembraIcon from "@mui/icons-material/Female";

const InsertarMascotaxCLI = ({ onMascotasUpdated }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: "",
    TipoMascota: "",
    Raza: "",
    Sexo: "Macho",
    Color: "",
    FechaNacimiento: new Date().toISOString().slice(0, 10),
    Foto: null,
    ClienteId: localStorage.getItem('clienteId') || '',
  });

  const [nombreError, setNombreError] = useState("");
  const [tipoMascotaError, setTipoMascotaError] = useState("");
  const [razaError, setRazaError] = useState("");
  const [sexoError, setSexoError] = useState("");
  const [colorError, setColorError] = useState("");
  const [fechaNacimientoError, setFechaNacimientoError] = useState("");
  const [fotoError, setFotoError] = useState("");

  useEffect(() => {
  
    const clientIdFromLocalStorage = localStorage.getItem('clienteId');
    if (clientIdFromLocalStorage) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ClienteId: parseInt(clientIdFromLocalStorage, 10),
      }));
    }
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    handleReset();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, Foto: file });
  };

  const isAlpha = (text) => /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(text); 

  const validateNombre = () => {
    if (!formData.Nombre.trim()) {
      setNombreError("Debe completar este campo");
    } else if (!isAlpha(formData.Nombre)) {
      setNombreError("El nombre solo debe contener letras");
    } else {
      setNombreError("");
    }
  };

  const validateTipoMascota = () => {
    if (!formData.TipoMascota.trim()) {
      setTipoMascotaError("Debe seleccionar una especie");
    } else {
      setTipoMascotaError("");
    }
  };

  const validateRaza = () => {
    if (!formData.Raza.trim()) {
      setRazaError("Debe completar este campo");
    } else if (!isAlpha(formData.Raza)) {
      setRazaError("La raza solo debe contener letras");
    } else {
      setRazaError("");
    }
  };

  const validateSexo = () => {
    if (!formData.Sexo) {
      setSexoError("Debe seleccionar un sexo");
    } else {
      setSexoError("");
    }
  };

  const validateColor = () => {
    if (!formData.Color.trim()) {
      setColorError("Debe completar este campo");
    } else if (!isAlpha(formData.Color)) {
      setColorError("El color solo debe contener letras");
    } else {
      setColorError("");
    }
  };

  const validateFechaNacimiento = () => {
    if (!formData.FechaNacimiento) {
      setFechaNacimientoError("Debe seleccionar una fecha");
    } else {
      setFechaNacimientoError("");
    }
  };

  const validateFoto = () => {
    if (!formData.Foto) {
      setFotoError("Debe elegir una foto");
    } else {
      setFotoError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateNombre();
    validateTipoMascota();
    validateRaza();
    validateSexo();
    validateColor();
    validateFechaNacimiento();
    validateFoto();

    if (
      !nombreError &&
      !tipoMascotaError &&
      !razaError &&
      !sexoError &&
      !colorError &&
      !fechaNacimientoError &&
      !fotoError
    ) {
      try {
        const formDataWithFile = new FormData();
        for (const key in formData) {
          formDataWithFile.append(key, formData[key]);
        }

        const response = await axios.post(
          "https://localhost:7266/api/Mascota",
          formDataWithFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          setSuccessMessage("Mascota agregada correctamente.");

          closeModal();
          setTimeout(() => {
            setSuccessMessage("");

            onMascotasUpdated();
          }, 1000);
        } else {
          console.error("Error al registrar la mascota.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    } else {
      console.log(
        "Hay errores en el formulario. Por favor, completa todos los campos correctamente."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      Nombre: "",
      TipoMascota: "",
      Raza: "",
      Sexo: "Macho",
      Color: "",
      FechaNacimiento: new Date().toISOString().slice(0, 10),
      Foto: null,
      ClienteId: localStorage.getItem('clienteId') || '',
    });
    setNombreError("");
    setTipoMascotaError("");
    setRazaError("");
    setSexoError("");
    setColorError("");
    setFechaNacimientoError("");
    setFotoError("");
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={openModal}
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

      <Dialog open={modalOpen} onClose={closeModal} fullWidth>
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
          Registro de Mascota
          <IconButton
            aria-label="close"
            onClick={closeModal}
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
                  label="Nombre"
                  variant="outlined"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleInputChange}
                  onBlur={validateNombre}
                  error={!!nombreError}
                  helperText={nombreError}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Especie</InputLabel>
                  <Select
                    label="Especie"
                    name="TipoMascota"
                    value={formData.TipoMascota}
                    onChange={handleInputChange}
                    onBlur={validateTipoMascota}
                    error={!!tipoMascotaError}
                  >
                    <MenuItem value="Perro">Perro</MenuItem>
                    <MenuItem value="Gato">Gato</MenuItem>
                  </Select>
                  {tipoMascotaError && (
                    <div
                      style={{
                        color: "#C84337",
                        fontFamily: "arial",
                        fontSize: "12.2px",
                        fontWeight: "inherit",
                        margin: "4px 15px",
                      }}
                    >
                      {tipoMascotaError}
                    </div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Raza"
                  variant="outlined"
                  name="Raza"
                  value={formData.Raza}
                  onChange={handleInputChange}
                  onBlur={validateRaza}
                  error={!!razaError}
                  helperText={razaError}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth component="fieldset">
                  <FormLabel component="legend">Sexo</FormLabel>
                  <RadioGroup
                    row
                    name="Sexo"
                    value={formData.Sexo}
                    onChange={handleInputChange}
                    onBlur={validateSexo}
                  >
                    <FormControlLabel
                      value="Macho"
                      control={<Radio color="primary" />}
                      label={<MachoIcon />}
                    />
                    <FormControlLabel
                      value="Hembra"
                      control={<Radio color="primary" />}
                      label={<HembraIcon />}
                    />
                  </RadioGroup>
                  {sexoError && (
                    <div
                      style={{
                        color: "#C84337",
                        fontFamily: "arial",
                        fontSize: "12.2px",
                        fontWeight: "inherit",
                        margin: "4px 15px",
                      }}
                    >
                      {sexoError}
                    </div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Color"
                  variant="outlined"
                  name="Color"
                  value={formData.Color}
                  onChange={handleInputChange}
                  onBlur={validateColor}
                  error={!!colorError}
                  helperText={colorError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento"
                  type="date"
                  variant="outlined"
                  name="FechaNacimiento"
                  value={formData.FechaNacimiento}
                  onChange={handleInputChange}
                  onBlur={validateFechaNacimiento}
                  error={!!fechaNacimientoError}
                  helperText={fechaNacimientoError}
                />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <input
                    name="Foto"
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    onBlur={validateFoto}
                  />
                  <label htmlFor="icon-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<PhotoCamera />}
                      fullWidth
                      sx={{ backgroundColor: "#8D8D8D" }}
                    >
                      Elegir Foto
                    </Button>
                  </label>
                  {formData.Foto && (
                    <img
                      src={URL.createObjectURL(formData.Foto)}
                      alt="Previsualización"
                      style={{
                        width: "70px",
                        height: "auto",
                        marginLeft: "5px",
                      }}
                    />
                  )}
                </Box>
                {fotoError && (
                  <div
                    style={{
                      color: "#C84337",
                      fontFamily: "arial",
                      fontSize: "12.2px",
                      fontWeight: "inherit",
                      margin: "4px 15px",
                    }}
                  >
                    {fotoError}
                  </div>
                )}
              </Grid>
                <TextField
                  fullWidth
                  label="Id Cliente"
                  variant="outlined"
                  value={localStorage.getItem('clienteId') || ''}
                  disabled
                  style={{ display: "none" }}
                />
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

export default InsertarMascotaxCLI;
