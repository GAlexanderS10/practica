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
import PetsIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import EditarMascota from './EditarMascota';
import EliminarMascota from "./EliminarMascota";
import VerPropietario from "./VerPropietario";


const columns = [
  { id: "mascotaId", label: "ID", minWidth: 8 },
  { id: "nombre", label: "Nombre", minWidth: 80 },
  { id: "tipoMascota", label: "Especie", minWidth: 80 },
  { id: "raza", label: "Raza", minWidth: 120 },
  { id: "sexo", label: "Sexo", minWidth: 80 },
  { id: "color", label: "Color", minWidth: 100 },
  { id: "fechaNacimiento", label: "Fech. Nacimiento", minWidth: 220 },
  { id: "foto", label: "Foto", minWidth: 80 },
  { id: "clienteId", label: "Cliente ID", minWidth: 10 },
  { id: "actions", label: "Acciones", minWidth: 280 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#A9D5EA",
  color: "#014C6F",
  fontSize: "20px",
  fontWeight: "bold",
}));

const ListarMascotas = ({
  mascotas,
  onMascotaActualizada,
  onMascotaEliminada,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [mascotaSeleccionadoEliminar, setMascotaSeleccionadoEliminar] = useState(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  
  

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await axios.get("https://localhost:7266/api/Mascota");

      // setMascotas(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de mascotas:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarMascota = (mascota) => {
    setMascotaSeleccionada(mascota);
    console.log(mascota)
  };

  const handleCloseEditarMascota = () => {
    setMascotaSeleccionada(null);
  };

  const handleMascotaActualizada = (mascotaId, datosActualizados) => {
  
    onMascotaActualizada(mascotaId, datosActualizados);
  };

  const handleOpenEliminarMascota = (mascota) => {
    setMascotaSeleccionadoEliminar(mascota);
  };
  
  const handleCloseEliminarMascota = () => {
    setMascotaSeleccionadoEliminar(null);
  };
  


  const handleEliminarMascota = (mascotaId) => {
    onMascotaEliminada(mascotaId);
  };

  const handleOpenVerPropietario = (clienteId) => {

    const cliente = mascotas.find((mascota) => mascota.clienteId === clienteId);
    

    setClienteSeleccionado(cliente);
  };

  const handleCloseVerPropietario = () => {

    setClienteSeleccionado(null); 
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
              {mascotas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mascota) => (
                  <TableRow key={mascota.mascotaId}>
                    <TableCell align="center">{mascota.mascotaId}</TableCell>
                    <TableCell align="center">{mascota.nombre}</TableCell>
                    <TableCell align="center">{mascota.tipoMascota}</TableCell>
                    <TableCell align="center">{mascota.raza}</TableCell>
                    <TableCell align="center">{mascota.sexo}</TableCell>
                    <TableCell align="center">{mascota.color}</TableCell>
                    <TableCell align="center">
                      {new Date(mascota.fechaNacimiento).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {mascota.foto ? (
                        <img
                          src={`https://localhost:7266/Uploads/${mascota.foto}`}
                          alt="Imagen de la Mascota"
                          style={{ width: "100px", height: "auto" }}
                        />
                      ) : (
                        "Sin imagen"
                      )}
                    </TableCell>
                    <TableCell align="center">{mascota.clienteId}</TableCell>
                    <TableCell align="center">
                        <Box
                          bgcolor="#F3F3F3"
                          padding={1}
                          borderRadius="50%"
                          display="inline-block"
                          margin="0 3px"
                        >
                          <IconButton onClick={() => handleOpenVerPropietario(mascota.clienteId)}>
                            <PetsIcon style={{ color: "#555555" }} />
                          </IconButton>
                        </Box>
                      <Box
                        bgcolor="#A6D4FA"
                        padding={1}
                        borderRadius="50%"
                        display="inline-block"
                        margin="0 3px"
                      >
                        <IconButton  onClick={() => handleOpenEditarMascota(mascota)}> 
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
                        <IconButton onClick={() => handleOpenEliminarMascota(mascota)}>
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
          count={mascotas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {mascotaSeleccionada && (
        <EditarMascota
          mascota={mascotaSeleccionada}
          onClose={handleCloseEditarMascota}
          onMascotaActualizada={handleMascotaActualizada}
        />
      )}

{mascotaSeleccionadoEliminar && (
  <EliminarMascota
  mascotaId={mascotaSeleccionadoEliminar.mascotaId}
  mascotaNombre={mascotaSeleccionadoEliminar.nombre}
  onModalClose={handleCloseEliminarMascota}
  onMascotaEliminada={handleEliminarMascota}
/>
)}

{clienteSeleccionado && (
  <VerPropietario
    clienteId={clienteSeleccionado.clienteId}
    nombreMascota = {clienteSeleccionado.nombre}
    onClose={handleCloseVerPropietario}
  />
)}


    </>
  );
};

export default ListarMascotas;
