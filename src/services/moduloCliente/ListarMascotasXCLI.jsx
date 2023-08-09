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
import { styled } from '@mui/material/styles';

const columns = [
  { id: 'mascotaId', label: 'ID', minWidth: 10 },
  { id: 'nombre', label: 'Nombre', minWidth: 180 },
  { id: 'tipoMascota', label: 'Especie', minWidth: 150 },
  { id: 'raza', label: 'Raza', minWidth: 150 },
  { id: 'sexo', label: 'Sexo', minWidth: 50 },
  { id: 'color', label: 'Color', minWidth: 100 },
  { id: 'fechaNacimiento', label: 'Fecha de Nacimiento', minWidth: 150 },
  { id: 'foto', label: 'Foto', minWidth: 100 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const ListarMascotasXCLI = ({ clienteId,mascotasUpdated  }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [mascotas, setMascotas] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchMascotas();
  }, [clienteId,mascotasUpdated]);
  

  const fetchMascotas = async () => {
    try {
      const response = await axios.get(`https://localhost:7266/api/Mascota/cliente/${clienteId}`);
      setMascotas(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
    }
  };

  return (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 4, 8]}
        component="div"
        count={mascotas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ListarMascotasXCLI;
