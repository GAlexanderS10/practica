import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditarCliente = ({ usuario, onClose, onUsuarioActualizado }) => {
  const [nombres, setNombres] = useState(usuario.nombres);
  const [apellidos, setApellidos] = useState(usuario.apellidos);
  const [dni, setDni] = useState(usuario.dni);
  const [celular, setCelular] = useState(usuario.celular);
  const [email, setEmail] = useState(usuario.email);
  const [userName, setUserName] = useState(usuario.userName);
  const [password, setPassword] = useState(usuario.password);

  const handleClose = () => {
    onClose();
  };

  const handleGuardarCambios = async () => {
    try {
      const usuarioActualizado = {
        ...usuario,
        nombres: nombres,
        apellidos: apellidos,
        dni: dni,
        celular: celular,
        email: email,
        userName: userName,
        password: password,
      };

      const response = await axios.put(
        `https://localhost:7266/api/Usuario/actualizarusuario/${usuario.usuarioId}`,
        usuarioActualizado
      );
      if (response.status === 204) {
        console.log("Usuario actualizado exitosamente.");
        onUsuarioActualizado(usuario.usuarioId, usuarioActualizado);
        onClose();
      } else {
        console.error("Error al actualizar el cliente.");
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
        Editar Cliente
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
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="UserName"
                type="text"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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

export default EditarCliente;
