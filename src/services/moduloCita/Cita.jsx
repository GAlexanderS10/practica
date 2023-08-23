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
import EliminarCita from "./EliminarCitaCli";
import EditarCita from "./EditarCitaCli";

const columns = [
  { id: "nroCita", label: "Nro Cita", minWidth: 10 },
  { id: "mascota", label: "Mascota", minWidth: 180 },
  { id: "servicio", label: "Servicio", minWidth: 180 },
  { id: "fechaRegistro", label: "Fecha Registro", minWidth: 180 },
  { id: "fechaCita", label: "Fecha Cita", minWidth: 180 },
  { id: "hora", label: "Hora", minWidth: 80 },
  { id: "estado", label: "Estado", minWidth: 100 },
  { id: "actions", label: "Acciones", minWidth: 200 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#A9D5EA",
  color: "#014C6F",
  fontSize: "20px",
  fontWeight: "bold",
}));


const Citas = ({ citas, onCitaActualizada, onCitaEliminada }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [citaSeleccionadaEliminar, setCitaSeleccionadaEliminar] =
    useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarCita = (cita) => {
    setCitaSeleccionada(cita);
    console.log(cita);
  };

  const handleCloseEditarCita = () => {
    setCitaSeleccionada(null);
  };

  const handleCitaActualizada = (nroCita, datosActualizados) => {
    onCitaActualizada(nroCita, datosActualizados);
  };

  const handleOpenEliminarCita = (cita) => {
    setCitaSeleccionadaEliminar(cita);
  };

  const handleCloseEliminarCita = () => {
    setCitaSeleccionadaEliminar(null);
  };

  const handleEliminarCita = (nroCita) => {
    onCitaEliminada(nroCita);
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
            <TableBody >
              {citas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cita) => (
                  <TableRow key={cita.nroCita}>
                    <TableCell align="center">{cita.nroCita}</TableCell>
                    <TableCell style={{ display: "none"}} align="center">{cita.dni}</TableCell>
                    <TableCell align="center">{cita.mascota}</TableCell>
                    <TableCell align="center">{cita.servicio}</TableCell>
                    <TableCell align="center">
                      {new Date(cita.fechaRegistro).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(cita.fechaCita).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="center">{cita.hora}</TableCell>
                    <TableCell align="center">{cita.estado}</TableCell>
                    <TableCell align="center">
                      <Box
                        bgcolor="#A6D4FA"
                        padding={1}
                        borderRadius="50%"
                        display="inline-block"
                        margin="0 3px"
                      >
                        <IconButton onClick={() => handleOpenEditarCita(cita)}>
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
                          onClick={() => handleOpenEliminarCita(cita)}
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
          count={citas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {citaSeleccionada && (
        <EditarCita
          cita={citaSeleccionada}
          onClose={handleCloseEditarCita}
          onCitaActualizada={handleCitaActualizada}
        />
      )}

      {citaSeleccionadaEliminar && (
        <EliminarCita
          nroCita={citaSeleccionadaEliminar.nroCita}
          mascotaNombre={citaSeleccionadaEliminar.mascota}
          onModalClose={handleCloseEliminarCita}
          onCitaEliminada={handleEliminarCita}
        />
      )}
    </>
  );
};

export default Citas;
