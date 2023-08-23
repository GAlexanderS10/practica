import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Paper,
  Button,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListarHistorias = () => {
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    fetchHistorias();
  }, []);

  const fetchHistorias = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7266/api/Historia/listar"
      );
      setHistorias(response.data);
    } catch (error) {
      console.error("Error al obtener las historias clínicas:", error);
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Grid container spacing={2}>
      {historias.map((historia) => (
        <Grid item xs={12} sm={6} key={historia.historiaId}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" component="div">
                  Historia Clínica #{historia.historiaId}
                </Typography>
                <Box >
                  <IconButton style={{ background: "#A6D4FA", margin: "0 3px", borderRadius:"50%" }}>
                    <EditIcon style={{ color: "#1565C0"}} />
                  </IconButton>
                  <IconButton style={{ background: "#FEB2B2", margin: "0 3px", borderRadius:"50%" }}>
                    <DeleteIcon style={{ color: "#B91C1C" }} />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                <strong>Nombre de la Mascota:</strong> {historia.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>DNI del Veterinario:</strong> {historia.dni}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Fecha de Registro:</strong>{" "}
                {formatFecha(historia.fechaConsulta)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Enfermedad:</strong> {historia.sintomas}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Síntomas:</strong> {historia.diagnostico}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Diagnóstico:</strong> {historia.tratamiento}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListarHistorias;
