import React, { useState } from 'react';
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
} from '@mui/material';
import { PhotoCamera,Close,Add } from '@mui/icons-material';
import MachoIcon from '@mui/icons-material/Male';
import HembraIcon from '@mui/icons-material/Female';

const Formulario = () => {
  const [sexo, setSexo] = useState('male');
  const [imagenPreview, setImagenPreview] = useState(null);
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date().toISOString().slice(0, 10));
  const [idCliente, setIdCliente] = useState('2');
  const [nombreError, setNombreError] = useState('');
  const [especieError, setEspecieError] = useState('');
  const [razaError, setRazaError] = useState('');
  const [sexoError, setSexoError] = useState('');
  const [colorError, setColorError] = useState('');
  const [fechaNacimientoError, setFechaNacimientoError] = useState('');
  const [fotoError, setFotoError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSexoChange = (event) => {
    setSexo(event.target.value);
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isAlpha = (text) => /^[A-Za-z]+$/.test(text);

  const validateNombre = () => {
    if (!nombre.trim()) {
      setNombreError('Debe completar este campo');
    } else if (!isAlpha(nombre)) {
      setNombreError('El nombre solo debe contener letras');
    } else {
      setNombreError('');
    }
  };

  const validateEspecie = () => {
    if (!especie.trim()) {
      setEspecieError('Debe seleccionar una especie');
    } else {
      setEspecieError('');
    }
  };

  const validateRaza = () => {
    if (!raza.trim()) {
      setRazaError('Debe completar este campo');
    } else if (!isAlpha(raza)) {
      setRazaError('La raza solo debe contener letras');
    } else {
      setRazaError('');
    }
  };

  const validateSexo = () => {
    if (!sexo) {
      setSexoError('Debe seleccionar un sexo');
    } else {
      setSexoError('');
    }
  };

  const validateColor = () => {
    if (!color.trim()) {
      setColorError('Debe completar este campo');
    } else if (!isAlpha(color)) {
      setColorError('El color solo debe contener letras');
    } else {
      setColorError('');
    }
  };

  const validateFechaNacimiento = () => {
    if (!fechaNacimiento) {
      setFechaNacimientoError('Debe seleccionar una fecha');
    } else {
      setFechaNacimientoError('');
    }
  };

  const validateFoto = () => {
    if (!imagenPreview) {
      setFotoError('Debe elegir una foto');
    } else {
      setFotoError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar campos antes de enviar el formulario
    validateNombre();
    validateEspecie();
    validateRaza();
    validateSexo();
    validateColor();
    validateFechaNacimiento();
    validateFoto();

    // Comprobar si hay errores antes de enviar el formulario
    if (
      !nombreError &&
      !especieError &&
      !razaError &&
      !sexoError &&
      !colorError &&
      !fechaNacimientoError &&
      !fotoError
    ) {
      // Aquí puedes realizar la lógica para enviar el formulario
      console.log('Formulario enviado');
    } else {
      console.log(
        'Hay errores en el formulario. Por favor, completa todos los campos correctamente.'
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
    setNombre('');
    setEspecie('');
    setRaza('');
    setColor('');
    setSexo('male');
    setFechaNacimiento(new Date().toISOString().slice(0, 10));
    setImagenPreview(null);
  };

  return (
    <Container maxWidth="sm">
          <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{background: '#fff',color: '#29524A',display: 'flex',alignItems: 'center',borderWidth: '2px',
        borderStyle: 'solid',
                  justifyContent: 'center',gap: '8px','&:hover': {background: '#DADDDA',color: '#184D47',},}}>
            <Box sx={{ color: '#29524A' }}>
              <Add />
              </Box>
            <Typography sx={{ fontWeight:'bold' }}>AGREGAR</Typography>
          </Button>

      <Dialog open={open} onClose={handleCloseModal} fullWidth>
        <DialogTitle   sx={{display: 'flex', alignItems: 'center',justifyContent: 'space-between',backgroundColor: '#8D8D8D', color: '#fff', padding: '20px',fontWeight: 'bold'}}> 
          Registro de Mascota
        <IconButton
            aria-label="close"
            onClick={() => {
              handleCloseModal();
              handleReset();
            }}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#fff',bgcolor:"#C84337", '&:hover': {
              bgcolor: '#F87171', color: '#fff'
            },}}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <br/>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
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
                    value={especie}
                    onChange={(e) => setEspecie(e.target.value)}
                    onBlur={validateEspecie}
                    error={!!especieError}
                  >
                    <MenuItem value="Perro">Perro</MenuItem>
                    <MenuItem value="Gato">Gato</MenuItem>
                  </Select>
                  {especieError && (
                    <div style={{ color: '#C84337', fontFamily: 'arial', fontSize: '12.2px', fontWeight: 'inherit', margin: '4px 15px' }}>
                      {especieError}
                    </div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
            <TextField
              fullWidth
              label="Raza"
              variant="outlined"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
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
                name="sexo"
                value={sexo}
                onChange={handleSexoChange}
                onBlur={validateSexo}
                error={!!sexoError}
                helperText={sexoError}
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
              {sexoError && <div style={{ color: '#C84337', fontFamily: 'arial', fontSize: '12.2px', fontWeight: 'inherit', margin: '4px 15px' }}>{sexoError}</div>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Color"
              variant="outlined"
              value={color}
              onChange={(e) => setColor(e.target.value)}
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
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              onBlur={validateFechaNacimiento}
              error={!!fechaNacimientoError}
              helperText={fechaNacimientoError}
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImagenChange}
                onBlur={validateFoto}
                error={!!fotoError}
                helperText={fotoError}
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained"  component="span" startIcon={<PhotoCamera />} fullWidth sx={{ backgroundColor: '#8D8D8D'}}>
                  Elegir Foto
                </Button>
              </label>
              {imagenPreview && (
                <img
                  src={imagenPreview}
                  alt="Previsualización"
                  style={{ width: '70px', height: 'auto', marginLeft: '5px',  }}
                />
              )}
            </Box>
            {fotoError && (
              <div style={{ color: '#C84337', fontFamily: 'arial', fontSize: '12.2px', fontWeight: 'inherit', margin: '4px 15px' }}>
                {fotoError}
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="idCliente"
              variant="outlined"
              value={idCliente}
              disabled
            />
          </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} sx={{ marginTop: 4, color:'#fff', backgroundColor: '#8D8D8D','&:hover': { backgroundColor: '#747674',}}}>
            RESETEAR
          </Button>
          <Button type="submit" onClick={handleSubmit} variant="contained" sx={{ marginTop: 4, backgroundColor: '#29524A','&:hover': { backgroundColor: '#1D3B35',}}}>
              REGISTRAR
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Formulario;
