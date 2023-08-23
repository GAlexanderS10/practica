import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Close, PhotoCamera } from "@mui/icons-material";

const InsertarServicio = ({ onServicioRegistrado }) => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [descripcionError, setDescripcionError] = useState(false);
  const [precioError, setPrecioError] = useState(false);
  const [fotoError, setFotoError] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setImagen(null);
    setImagenPreview("");
    setNombreError(false);
    setDescripcionError(false);
    setPrecioError(false);
    setFotoError(false);
  };

  const validateNombre = () => {
    if (!nombre.trim()) {
      setNombreError("Debe completar este campo");
    } else if (!/^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(nombre)) {
      setNombreError("El nombre solo debe contener letras");
    } else {
      setNombreError(false);
    }
  };

  const validateDescripcion = () => {
    if (!descripcion.trim()) {
      setDescripcionError("Debe completar este campo");
    } else if (!/^[\w\d\s.¡!"";.*':()'¿?,áéíóúÁÉÍÓÚñÑ]+$/.test(descripcion)) {
      setDescripcionError(
        "Este campo solo permite ciertos caracteres especiales, incluyendo tildes"
      );
    } else {
      setDescripcionError(false);
    }
  };

  const validatePrecio = () => {
    if (!precio.trim()) {
      setPrecioError("Debe completar este campo");
    } else if (!/^\d+(,\d{1,2})?$/.test(precio)) {
      setPrecioError(
        "El precio debe ser un número válido con dos decimales como máximo"
      );
    } else {
      setPrecioError(false);
    }
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    validateNombre();
    validateDescripcion();
    validatePrecio();
    validateFoto();

    if (!nombreError && !descripcionError && !precioError && !fotoError) {
      try {
        const formDataWithFile = new FormData();
        formDataWithFile.append("Nombre", nombre);
        formDataWithFile.append("Descripcion", descripcion);
        formDataWithFile.append("Precio", precio);
        formDataWithFile.append("Imagen", imagen);

        const response = await axios.post(
          "https://localhost:7266/api/Servicio",
          formDataWithFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          console.log("Servicio registrado exitosamente.");
          onServicioRegistrado(response.data);
          handleCloseModal();
        } else {
          console.error("Error al registrar el servicio.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const validateFoto = () => {
    if (!imagen) {
      setFotoError("Debe elegir una foto");
    } else {
      setFotoError(false);
    }
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
          Registro de Servicio
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
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
                  type="text"
                  variant="outlined"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onBlur={validateNombre}
                  error={!!nombreError}
                  helperText={nombreError && nombreError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Descripción"
                  variant="outlined"
                  multiline
                  rows={6}
                  inputProps={{ maxLength: 300 }}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  onBlur={validateDescripcion}
                  error={!!descripcionError}
                  helperText={descripcionError && descripcionError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  variant="outlined"
                  type="text"
                  value={precio}
                  onChange={(e) => {
                    
                    const value = e.target.value.replace(/[^0-9,]/g, "");
                    setPrecio(value);
                  }}
                  onBlur={validatePrecio}
                  error={!!precioError}
                  helperText={precioError && precioError}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <input
                    name="Imagen"
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImagenChange}
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
                  {imagenPreview && (
                    <img
                      src={imagenPreview}
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

export default InsertarServicio;
