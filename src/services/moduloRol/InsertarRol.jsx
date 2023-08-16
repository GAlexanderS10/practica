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

const InsertarRol = ({ onRolRegistrado }) => {
  const [tipo, setTipo] = useState("");
  const [tipoError, setTipoError] = useState("");
  const [open, setOpen] = useState(false);

  const validateTipo = () => {
    if (!tipo.trim().length) {
      setTipoError("Debe completar este campo");
    } else if (!/^[A-Za-záéíóúñÁÉÍÓÚ]+$/.test(tipo)) {
        setTipoError( "El tipo contiene caracteres no válidos");
    }else {
      setTipoError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    validateTipo();

    if (!tipoError) {
      try {
        const rolData = {
          Tipo: tipo,
        };
        const response = await axios.post(
          "https://localhost:7266/api/Rol",
          rolData
        );

        console.log("Formulario enviado:", response.data);

        onRolRegistrado(response.data);

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
    setTipo("");
    setTipoError("");
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
          Registro de Rol
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
                  label="Rol"
                  variant="outlined"
                  type="text"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  onBlur={validateTipo}
                  error={!!tipoError}
                  helperText={tipoError}
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

export default InsertarRol;
