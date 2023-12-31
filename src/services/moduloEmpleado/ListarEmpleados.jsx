import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import EditarEmpleado from "./EditarEmpleado";
import EliminarEmpleado from "./EliminarEmpleado";

const columns = [
  { id: "empleadoId", label: "ID", minWidth: 8 },
  { id: "nombres", label: "Nombres", minWidth: 180 },
  { id: "apellidos", label: "Apellidos", minWidth: 180 },
  { id: "dni", label: "DNI", minWidth: 100 },
  { id: "celular", label: "Celular", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 220 },
  { id: "cargo1", label: "Cargo", minWidth: 100 },
  { id: "especialidad", label: "Especialidad", minWidth: 100 },
  { id: "sueldo", label: "Sueldo", minWidth: 120 },
  { id: "actions", label: "Acciones", minWidth: 180 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#A9D5EA",
  color: "#014C6F",
  fontSize: "20px",
  fontWeight: "bold",
}));

const ListarEmpleados = ({
  empleados,
  onEmpleadoActualizado,
  onEmpleadoEliminado,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [empleadoSeleccionadoEliminar, setEmpleadoSeleccionadoEliminar] =
    useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7266/api/Empleado/ListarEmpleadosConCargo"
      );
      //setEmpleados(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de empleados con cargo:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
  };

  const handleCloseEditarEmpleado = () => {
    setEmpleadoSeleccionado(null);
  };

  const handleEmpleadoActualizado = (empleadoId, datosActualizados) => {
    onEmpleadoActualizado(empleadoId, datosActualizados);
  };

  const handleOpenEliminarEmpleado = (empleado) => {
    setEmpleadoSeleccionadoEliminar(empleado);
  };

  const handleCloseEliminarEmpleado = () => {
    setEmpleadoSeleccionadoEliminar(null);
  };

  const handleEliminarEmpleado = (empleadoId) => {
    onEmpleadoEliminado(empleadoId);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCellHeader
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCellHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {empleados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((empleado) => (
                  <TableRow key={empleado.empleadoId}>
                    <TableCell align="center">{empleado.empleadoId}</TableCell>
                    <TableCell align="center">{empleado.nombres}</TableCell>
                    <TableCell align="center">{empleado.apellidos}</TableCell>
                    <TableCell align="center">{empleado.dni}</TableCell>
                    <TableCell align="center">{empleado.celular}</TableCell>
                    <TableCell align="center">{empleado.email}</TableCell>
                    <TableCell align="center" style={{ display: 'none' }}>{empleado.cargoId}</TableCell>
                    <TableCell align="center">{empleado.cargo1}</TableCell>
                    <TableCell align="center">
                      {empleado.especialidad}
                    </TableCell>
                    <TableCell align="center">
                      S/. {empleado.sueldo}.00
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        bgcolor="#A6D4FA"
                        padding={1}
                        borderRadius="50%"
                        display="inline-block"
                        margin="0 3px"
                      >
                        <IconButton
                          onClick={() => handleOpenEditarEmpleado(empleado)}
                        >
                          <EditIcon style={{ color: "#1565C0" }} />
                        </IconButton>
                      </Box>
                      <Box
                        bgcolor="#FEB2B2"
                        padding={1}
                        borderRadius="50%"
                        display="inline-block"
                        margin="0 3px"
                      >
                        <IconButton
                          onClick={() => handleOpenEliminarEmpleado(empleado)}
                        >
                          <DeleteIcon style={{ color: "#B91C1C" }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 8, 16]}
          component="div"
          count={empleados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {empleadoSeleccionado && (
        <EditarEmpleado
          empleado={empleadoSeleccionado}
          onClose={handleCloseEditarEmpleado}
          onEmpleadoActualizado={handleEmpleadoActualizado}
          fetchEmpleados = {fetchEmpleados}
        />
      )}

      {empleadoSeleccionadoEliminar && (
        <EliminarEmpleado
          empleadoId={empleadoSeleccionadoEliminar.empleadoId}
          empleadoNombre={empleadoSeleccionadoEliminar.nombres}
          onModalClose={handleCloseEliminarEmpleado}
          onEmpleadoEliminado={handleEliminarEmpleado}
        />
      )}
    </>
  );
};

export default ListarEmpleados;
