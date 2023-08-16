import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const AsignarRol = ({
  usuarioId,
  userName,
  onCloseAsignarRol,
}) => {
  const [roles, setRoles] = useState([]);
  const [selectedRol, setSelectedRol] = useState("");
  const [isRolSelected, setIsRolSelected] = useState(false);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await axios.get("https://localhost:7266/api/Rol");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setRoles([]);
      }
    }
    fetchRoles();
  }, []);

  const handleAssignRole = async () => {
    try {
      const response = await axios.post("https://localhost:7266/api/UsuarioRol", {
        UsuarioId: usuarioId,
        RolId: selectedRol,
      });
      console.log("Rol asignado al usuario:", response.data);
      onCloseAsignarRol();
    } catch (error) {
      console.error("Error al asignar rol:", error);
    }
  };

  const handleRolChange = (e) => {
    setSelectedRol(e.target.value);
    setIsRolSelected(e.target.value !== "");
  };

  return (
    <Dialog
      open={true}
      onClose={onCloseAsignarRol}
      fullWidth
      maxWidth="xs"
    >
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
        Asignar Rol al Usuario "{userName}"
        <IconButton
          aria-label="close"
          onClick={onCloseAsignarRol}
          sx={{
            position: "absolute",
            right: 14,
            top: 14,
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
        <Grid container spacing={2} sx={{
            marginTop: "5px"
        }}>
          <Grid item xs={12}>
            <TextField
              label="Usuario ID"
              variant="outlined"
              value={usuarioId}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                name="selectedRol"
                label="Rol"
                value={selectedRol}
                onChange={handleRolChange}
                error={!isRolSelected}
              >
                <MenuItem value="">
                  <em>Seleccione un rol</em>
                </MenuItem>
                {roles.map((rol) => (
                  <MenuItem key={rol.rolId} value={rol.rolId}>
                    {rol.tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCloseAsignarRol}
          sx={{
            marginTop: 4,
            color: "#fff",
            backgroundColor: "#8D8D8D",
            "&:hover": { backgroundColor: "#747674" },
          }}
        >
          Cerrar
        </Button>
        <Button
          onClick={handleAssignRole}
          variant="contained"
          sx={{
            marginTop: 4,
            backgroundColor: "#29524A",
            "&:hover": { backgroundColor: "#1D3B35" },
          }}
          disabled={!isRolSelected}
        >
          Asignar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AsignarRol;
