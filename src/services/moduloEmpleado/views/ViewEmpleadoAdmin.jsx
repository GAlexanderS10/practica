import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Badge";
import Buscar from "../BuscarEmpleado";
import Formulario from "../InsertarEmpleado";
import Tabla from "../ListarEmpleados";
import { sortBy } from "lodash";
import Cargo from "../../moduloCargo/Cargo";

const ViewRecepcionCliente = () => {
  const [empleados, setEmpleados] = useState([]);
  const sortedEmpleados = sortBy(empleados, "empleadoId").reverse();

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7266/api/Empleado/ListarEmpleadosConCargo"
      );
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de empleados:", error);
    }
  };

  const handleEmpleadoRegistrado = (nuevoEmpleado) => {
    setEmpleados((prevEmpleados) => [...prevEmpleados, nuevoEmpleado]);
  };

  const handleEmpleadoActualizado = (empleadoId, datosActualizados) => {
    const empleadoIndex = empleados.findIndex(
      (empleado) => empleado.empleadoId === empleadoId
    );

    if (empleadoIndex !== -1) {
      const nuevosEmpleados = [...empleados];
      nuevosEmpleados[empleadoIndex] = {
        ...nuevosEmpleados[empleadoIndex],
        ...datosActualizados,
      };
      setEmpleados(nuevosEmpleados);
    }
  };

  const handleEmpleadoEliminado = (empleadoId) => {
    setEmpleados((prevEmpleados) =>
      prevEmpleados.filter((empleado) => empleado.empleadoId !== empleadoId)
    );
  };

  return (
    <>
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Box bgcolor="#FFFFFF" p={1} borderRadius="50%" mr={2}>
          <PersonIcon sx={{ fontSize: "40px", color: "#014C6F" }} />
        </Box>
        <Typography
          fontSize={"35px"}
          fontWeight={"bold"}
          align="left"
          color="#014C6F"
        >
          Módulo de Empleados
        </Typography>
      </Box>
      <br />
      <Box bgcolor="#F0F0F0" p={2} display="flex" alignItems="center">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Buscar onSearchResults={setEmpleados} />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Formulario onEmpleadoRegistrado={handleEmpleadoRegistrado} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" align="right">
                  <Cargo />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tabla empleados={sortedEmpleados} onEmpleadoActualizado={handleEmpleadoActualizado} onEmpleadoEliminado={handleEmpleadoEliminado} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewRecepcionCliente;
