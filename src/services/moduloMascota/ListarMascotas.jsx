import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import StyledIconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import EditarMascota from './EditarMascota'
import EliminarMascota from './EliminarMascota'

const columns = [
  { id: 'mascotaId', label: 'ID', minWidth: 5 },
  { id: 'nombre', label: 'Nombre', minWidth: 150 },
  { id: 'tipoMascota', label: 'Especie', minWidth: 100 },
  { id: 'raza', label: 'Raza', minWidth: 150 },
  { id: 'sexo', label: 'Sexo', minWidth: 50 },
  { id: 'color', label: 'Color', minWidth: 100 },
  { id: 'fechaNacimiento', label: 'Fecha de Nacimiento', minWidth: 150 },
  { id: 'foto', label: 'Foto', minWidth: 100 },
  { id: 'clienteId', label: 'ID Cliente', minWidth: 20 },
  { id: 'actions', label: 'Acciones', minWidth: 280 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const ListarMascotas = ({ mascotas, onMascotaActualizada, onMascotaEliminada }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [mascotaSeleccionado, setMascotaSeleccionado] = useState(null);
  const [mascotaSeleccionadoEliminar, setMascotaSeleccionadoEliminar] = useState(null);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Mascota');
    } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
    }
  };

  const handleOpenEditarMascota = (mascota) => {
    setMascotaSeleccionado(mascota);
    console.log(mascota)
  };

  const handleCloseEditarMascota = () => {
    setMascotaSeleccionado(null);
  };

  const handleMascotaActualizado = (mascotaId, datosActualizados) => {
    // Actualizar la lista de servicios con los datos actualizados
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

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                    {new Date(mascota.fechaNacimiento).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                </TableCell>
                <TableCell align="center">
                  {mascota.foto ? (
                    <img
                      src={`https://localhost:7266/Uploads/${mascota.foto}`}
                      alt={`Foto de ${mascota.nombre}`}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  ) : (
                    "Sin foto"
                  )}
                </TableCell>
                <TableCell align="center">{mascota.clienteId}</TableCell>
                <TableCell align="center">
                    <Box bgcolor="#F3F3F3" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <StyledIconButton>
                        <VisibilityIcon style={{ color: '#555555' }} />
                      </StyledIconButton>
                    </Box>
                    <Box bgcolor="#BBF7BC" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <StyledIconButton>
                        <AddCircleIcon style={{ color: '#048E11' }} />
                      </StyledIconButton>
                    </Box>
                    <Box bgcolor="#A6D4FA" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <StyledIconButton onClick={() => handleOpenEditarMascota(mascota)}>
                        <EditIcon style={{ color: '#1565C0' }} />
                      </StyledIconButton>
                    </Box>
                    <Box bgcolor="#FEB2B2" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <StyledIconButton onClick={() => handleOpenEliminarMascota(mascota)}>
                        <DeleteIcon style={{ color: '#B91C1C' }} />
                      </StyledIconButton>
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

    {mascotaSeleccionado && (
        <EditarMascota
          mascota={mascotaSeleccionado}
          onClose={handleCloseEditarMascota}
          onMascotaActualizada={handleMascotaActualizado}
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


    </>
  );
};

export default ListarMascotas;