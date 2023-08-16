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
import EditarRol from './EditarRol';
import EliminarRol from './EliminarRol';

const columns = [
  { id: 'rolId', label: 'ID', minWidth: 10 },
  { id: 'tipo', label: 'ROL', minWidth: 140 },
  { id: 'actions', label: 'Acciones', minWidth: 160 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const ListarUsuarios = ({ roles,  onRolActualizado, onRolEliminado }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [rolSeleccionadoEliminar, setRolSeleccionadoEliminar] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Rol');
      // Aquí puedes actualizar la lista de clientes con los datos obtenidos desde la API
      // setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de Roles:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarRol = (rol) => {
    setRolSeleccionado(rol);
  };

  const handleCloseEditarRol = () => {
    setRolSeleccionado(null);
  };

  const handleRolActualizado = (rolId, datosActualizados) => {
    onRolActualizado(rolId, datosActualizados);
  };

  const handleOpenEliminarRol = (rol) => {
    setRolSeleccionadoEliminar(rol);
  };
  
  const handleCloseEliminarRol = () => {
    setRolSeleccionadoEliminar(null);
  };
  

  const handleEliminarRol = (rolId) => {
    onRolEliminado(rolId);
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
            {roles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rol) => (
                <TableRow key={rol.rolId}>
                  <TableCell align="center">{rol.rolId}</TableCell>
                  <TableCell align="center">{rol.tipo}</TableCell>
                  <TableCell align="center">
                    <Box bgcolor="#A6D4FA" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEditarRol(rol)} >
                        <EditIcon style={{ color: '#1565C0' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#FEB2B2" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEliminarRol(rol)} >
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
        count={roles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


    {rolSeleccionado && (
        <EditarRol
          rol={rolSeleccionado}
          onCloseRol={handleCloseEditarRol}
          onRolActualizado={handleRolActualizado}
        />
      )}

{rolSeleccionadoEliminar && (
  <EliminarRol
  rolId={rolSeleccionadoEliminar.rolId}
  tipo={rolSeleccionadoEliminar.tipo}
  onModalClose={handleCloseEliminarRol}
  onRolEliminado={handleEliminarRol}
/>
)}

    </>
  );
};

export default ListarUsuarios;
