import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Container, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, IconButton } from '@mui/material';
import { Close, PhotoCamera } from '@mui/icons-material';

const EditarServicio = ({ servicio, onClose, onServicioActualizado }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState('');

  useEffect(() => {
    // Cuando se monte el componente, establecer los valores actuales del servicio en los campos del formulario
    setNombre(servicio.nombre);
    setDescripcion(servicio.descripcion);
    setPrecio(servicio.precio);
    setImagenPreview(`https://localhost:7266/Uploads/${servicio.imagen}`);
  }, [servicio]);

  const handleClose = () => {
    // Cerrar el modal sin guardar cambios
    onClose();
  };

  const handleGuardarCambios = async () => {
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('Nombre', nombre);
      formDataWithFile.append('Descripcion', descripcion);
      formDataWithFile.append('Precio', precio);
      formDataWithFile.append('Imagen', imagen);

      const response = await axios.put(`https://localhost:7266/api/Servicio/${servicio.servicioId}`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 204) {
        console.log('Servicio actualizado exitosamente.');
        onServicioActualizado(servicio.servicioId, { nombre, descripcion, precio, imagen: servicio.imagen });
        onClose();
      } else {
        console.error('Error al actualizar el servicio.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container maxWidth="sm">
      <Dialog open onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#8D8D8D',
            color: '#fff',
            padding: '20px',
            fontWeight: 'bold',
          }}
        >
          Editar Servicio
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#fff',
              bgcolor: '#C84337',
              '&:hover': {
                bgcolor: '#F87171',
                color: '#fff',
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <br />
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  type="text"
                  variant="outlined"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
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
                    // Utilizamos una expresión regular para permitir solo números y puntos en el valor
                    const value = e.target.value.replace(/[^0-9,]/g, '');
                    setPrecio(value);
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <input
                    name="Imagen"
                    accept="image/*"
                    id="icon-button-file-edit"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImagenChange}
                  />
                  <label htmlFor="icon-button-file-edit">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<PhotoCamera />}
                      fullWidth
                      sx={{ backgroundColor: '#8D8D8D' }}
                    >
                      Elegir Foto
                    </Button>
                  </label>
                  {imagenPreview && (
                    <img
                      src={imagenPreview}
                      alt="Previsualización"
                      style={{
                        width: '70px',
                        height: 'auto',
                        marginLeft: '5px',
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              marginTop: 4,
              color: '#fff',
              backgroundColor: '#8D8D8D',
              '&:hover': { backgroundColor: '#747674' },
            }}
          >
            CANCELAR
          </Button>
          <Button
            onClick={handleGuardarCambios}
            variant="contained"
            sx={{
              marginTop: 4,
              backgroundColor: '#29524A',
              '&:hover': { backgroundColor: '#1D3B35' },
            }}
          >
            GUARDAR CAMBIOS
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditarServicio;
