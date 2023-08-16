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
import VerIcon from '@mui/icons-material/Visibility';
import RoleIcon from '@mui/icons-material/WorkOutline';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import EliminarUsuario from './EliminarUsuario'
import EditarUsuario from './EditarUsuario'

const columns = [
  { id: 'usuarioId', label: 'ID', minWidth: 10 },
  { id: 'nombres', label: 'Nombres', minWidth: 180 },
  { id: 'apellidos', label: 'Apellidos', minWidth: 180 },
  { id: 'dni', label: 'DNI', minWidth: 100 },
  { id: 'celular', label: 'Celular', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 220 },
  { id: 'userName', label: 'Usuario', minWidth: 120 },
  { id: 'actions', label: 'Acciones', minWidth: 300 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const ListarUsuarios = ({ usuarios, onUsuarioActualizado ,onUsuarioEliminado }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarioSeleccionadoEliminar, setUsuarioSeleccionadoEliminar] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Usuario');
      // Aquí puedes actualizar la lista de clientes con los datos obtenidos desde la API
      // setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de Usuarios:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleOpenEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  const handleCloseEditarUsuario = () => {
    setUsuarioSeleccionado(null);
  };

  const handleUsuarioActualizado = (usuarioId, datosActualizados) => {
    onUsuarioActualizado(usuarioId, datosActualizados);
  };

  
  const handleOpenEliminarUsuario = (usuario) => {
    setUsuarioSeleccionadoEliminar(usuario);
  };
  
  const handleCloseEliminarUsuario = () => {
    setUsuarioSeleccionadoEliminar(null);
  };
  


  const handleEliminarUsuario = (usuarioId) => {
    onUsuarioEliminado(usuarioId);
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
            {usuarios
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((usuario) => (
                <TableRow key={usuario.usuarioId}>
                  <TableCell align="center">{usuario.usuarioId}</TableCell>
                  <TableCell align="center">{usuario.nombres}</TableCell>
                  <TableCell align="center">{usuario.apellidos}</TableCell>
                  <TableCell align="center">{usuario.dni}</TableCell>
                  <TableCell align="center">{usuario.celular}</TableCell>
                  <TableCell align="center">{usuario.email}</TableCell>
                  <TableCell align="center">{usuario.userName}</TableCell>
                  <TableCell align="center">
                    <Box bgcolor="#F3F3F3" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                    <IconButton >
                        <VerIcon style={{ color: '#555555' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#BBF7BC" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton >
                        <RoleIcon style={{ color: '#048E11' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#A6D4FA" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEditarUsuario(usuario)}>
                        <EditIcon style={{ color: '#1565C0' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#FEB2B2" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEliminarUsuario(usuario)}>
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
        rowsPerPageOptions={[4, 8, 16]}
        component="div"
        count={usuarios.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    {usuarioSeleccionado && (
        <EditarUsuario
          usuario={usuarioSeleccionado}
          onClose={handleCloseEditarUsuario}
          onUsuarioActualizado={handleUsuarioActualizado}
        />
      )}

    {usuarioSeleccionadoEliminar && (
  <EliminarUsuario
  usuarioId={usuarioSeleccionadoEliminar.usuarioId}
  userName={usuarioSeleccionadoEliminar.userName}
  onModalClose={handleCloseEliminarUsuario}
  onUsuarioEliminado={handleEliminarUsuario}
/>
)}

    </>
  );
};

export default ListarUsuarios;
