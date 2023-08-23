import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
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
} from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import MachoIcon from "@mui/icons-material/Male";
import HembraIcon from "@mui/icons-material/Female";

const EditarMascota = ({ mascota, onClose, onMascotaActualizada }) => {
  const [nombre, setNombre] = useState("");
  const [tipoMascota, setTipoMascota] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [color, setColor] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [foto, setFoto] = useState(null);

  const [clienteId, setClienteId] = useState("");
  const [imagenPreview, setImagenPreview] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleFotoChange = (e) => {
    const selectedFile = e.target.files[0];
    setFoto(selectedFile);


    const reader = new FileReader();
    reader.onload = (event) => {
      setImagenPreview(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("TipoMascota", tipoMascota);
    formData.append("Raza", raza);
    formData.append("Sexo", sexo);
    formData.append("Color", color);
    formData.append("FechaNacimiento", fechaNacimiento);
    formData.append("ClienteId", mascota.clienteId);
    if (foto) {
      formData.append("Foto", foto);
    }

    try {

      const response = await axios.put(
        `https://localhost:7266/api/Mascota/${mascota.mascotaId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 204) {
        console.log("Servicio actualizado exitosamente.");
        onMascotaActualizada(mascota.mascotaId, {
          nombre,
          tipoMascota,
          raza,
          sexo,
          color,
          fechaNacimiento,
          foto: mascota.foto,
        });
        onClose();
      } else {
        console.error("Error al actualizar el servicio.");
      }
    } catch (error) {

      console.error("Error al actualizar la mascota:", error);
    }
  };


  useEffect(() => {
    setNombre(mascota.nombre);
    setTipoMascota(mascota.tipoMascota);
    setRaza(mascota.raza);
    setSexo(mascota.sexo);
    setColor(mascota.color);
    setFechaNacimiento(
      new Date(mascota.fechaNacimiento).toISOString().split("T")[0]
    );
    setClienteId(mascota.clienteId);

    setImagenPreview(`https://localhost:7266/Uploads/${mascota.foto}`);
  }, [mascota]);

  return (
    <Dialog open onClose={handleClose} fullWidth>
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
        Editar Mascota
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
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginTop: "5px" }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                name="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Especie</InputLabel>
                <Select
                  label="Especie"
                  name="TipoMascota"
                  value={tipoMascota}
                  onChange={(e) => setTipoMascota(e.target.value)}
                >
                  <MenuItem value="Perro">Perro</MenuItem>
                  <MenuItem value="Gato">Gato</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Raza"
                variant="outlined"
                name="Raza"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth component="fieldset">
                <FormLabel component="legend">Sexo</FormLabel>
                <RadioGroup
                  row
                  name="Sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
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
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Color"
                variant="outlined"
                name="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fecha de Nacimiento"
                type="date"
                variant="outlined"
                name="FechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
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
                  onChange={handleFotoChange}
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Id Cliente"
                variant="outlined"
                disabled
                value={clienteId}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            marginTop: 4,
            color: "#fff",
            backgroundColor: "#8D8D8D",
            "&:hover": { backgroundColor: "#747674" },
          }}
        >
          CANCELAR
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
          EDITAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarMascota;
