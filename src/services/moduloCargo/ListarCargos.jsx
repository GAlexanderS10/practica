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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import EditarCargo from './EditarCargo';
import EliminarCargo from './EliminarCargo';

const columns = [
  { id: 'cargoId', label: 'ID', minWidth: 10 },
  { id: 'cargo1', label: 'Cargo', minWidth: 140 },
  { id: 'especialidad', label: 'Especialidad', minWidth: 140},
  { id: 'sueldo', label: 'Sueldo', minWidth: 140},
  { id: 'actions', label: 'Acciones', minWidth: 160 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const ListarCargos = ({ cargos,  onCargoActualizado, onCargoEliminado }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [cargoSeleccionado, setCargoSeleccionado] = useState(null);
  const [cargoSeleccionadoEliminar, setCargoSeleccionadoEliminar] = useState(null);

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Cargo');
      // setCargos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de Cargos:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarCargo = (cargo) => {
    setCargoSeleccionado(cargo);
  };

  const handleCloseEditarCargo = () => {
    setCargoSeleccionado(null);
  };

  const handleCargoActualizado = (cargoId, datosActualizados) => {
    onCargoActualizado(cargoId, datosActualizados);
  };

  const handleOpenEliminarCargo = (cargo) => {
    setCargoSeleccionadoEliminar(cargo);
  };
  
  const handleCloseEliminarCargo = () => {
    setCargoSeleccionadoEliminar(null);
  };
  

  const handleEliminarCargo = (cargoId) => {
    onCargoEliminado(cargoId);
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
            {cargos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cargo) => (
                <TableRow key={cargo.cargoId}>
                  <TableCell align="center">{cargo.cargoId}</TableCell>
                  <TableCell align="center">{cargo.cargo1}</TableCell>
                  <TableCell align="center">{cargo.especialidad}</TableCell>
                  <TableCell align="center">S/.{cargo.sueldo}.00</TableCell>
                  <TableCell align="center">
                    <Box bgcolor="#A6D4FA" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEditarCargo(cargo)} >
                        <EditIcon style={{ color: '#1565C0' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#FEB2B2" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEliminarCargo(cargo)} >
                        <DeleteIcon style={{ color: '#B91C1C' }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 6, 9]}
        component="div"
        count={cargos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


    {cargoSeleccionado && (
        <EditarCargo
          cargo={cargoSeleccionado}
          onCloseCargo={handleCloseEditarCargo}
          onCargoActualizado={handleCargoActualizado}
        />
      )}

{cargoSeleccionadoEliminar && (
  <EliminarCargo
  cargoId={cargoSeleccionadoEliminar.cargoId}
  cargo1={cargoSeleccionadoEliminar.cargo1}
  onModalClose={handleCloseEliminarCargo}
  onCargoEliminado={handleEliminarCargo}
/>
)}

    </>
  );
};

export default ListarCargos;
