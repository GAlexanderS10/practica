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
import PetsIcon from '@mui/icons-material/Pets';
import CitaIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import EditarCliente from './EditarCliente';
import EliminarCliente from './EliminarCliente'
import MascotasModal from './MascotasModal';
import CitasModal from './CitasModal'

const columns = [
  { id: 'clienteId', label: 'ID', minWidth: 10 },
  { id: 'nombres', label: 'Nombres', minWidth: 180 },
  { id: 'apellidos', label: 'Apellidos', minWidth: 180 },
  { id: 'dni', label: 'DNI', minWidth: 100 },
  { id: 'celular', label: 'Celular', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 220 },
  { id: 'actions', label: 'Acciones', minWidth: 300 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const ListarClientes = ({ clientes, onClienteActualizado, onClienteEliminado }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clienteSeleccionadoEliminar, setClienteSeleccionadoEliminar] = useState(null);
  const [clienteXmascotaSeleccionado, setClientexMascotaSeleccionado] = useState(null);
  const [mascotasModalOpen, setMascotasModalOpen] = useState(false);
  const [citasxClienteSeleccionado, setCitasxClienteSeleccionado] = useState(null);
  const [citasModalOpen, setCitasModalOpen] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Cliente');

      // setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const handleCloseEditarCliente = () => {
    setClienteSeleccionado(null);
  };

  const handleClienteActualizado = (clienteId, datosActualizados) => {
    onClienteActualizado(clienteId, datosActualizados);
  };


  const handleOpenEliminarCliente = (cliente) => {
    setClienteSeleccionadoEliminar(cliente);
  };
  
  const handleCloseEliminarCliente = () => {
    setClienteSeleccionadoEliminar(null);
  };
  


  const handleEliminarCliente = (clienteId) => {
    onClienteEliminado(clienteId);
  };


  const handleOpenMascotasModal = (cliente) => {
    console.log('clienteId en handleOpenMascotasModal:', cliente.clienteId);
    setClientexMascotaSeleccionado(cliente);
    setMascotasModalOpen(true);
  };
  
  const handleOpenCitasModal = (cliente) => {
    setCitasxClienteSeleccionado(cliente);
    setCitasModalOpen(true);
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
            {clientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cliente) => (
                <TableRow key={cliente.clienteId}>
                  <TableCell align="center">{cliente.clienteId}</TableCell>
                  <TableCell align="center">{cliente.nombres}</TableCell>
                  <TableCell align="center">{cliente.apellidos}</TableCell>
                  <TableCell align="center">{cliente.dni}</TableCell>
                  <TableCell align="center">{cliente.celular}</TableCell>
                  <TableCell align="center">{cliente.email}</TableCell>
                  <TableCell align="center">
                    <Box bgcolor="#F3F3F3" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                    <IconButton onClick={() => handleOpenMascotasModal(cliente)}>
                        <PetsIcon style={{ color: '#555555' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#BBF7BC" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenCitasModal(cliente)}>
                        <CitaIcon style={{ color: '#048E11' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#A6D4FA" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEditarCliente(cliente)}>
                        <EditIcon style={{ color: '#1565C0' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#FEB2B2" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEliminarCliente(cliente)}>
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
        count={clientes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    {clienteSeleccionado && (
        <EditarCliente
          cliente={clienteSeleccionado}
          onClose={handleCloseEditarCliente}
          onClienteActualizado={handleClienteActualizado}
        />
      )}


{clienteSeleccionadoEliminar && (
  <EliminarCliente
  clienteId={clienteSeleccionadoEliminar.clienteId}
  clienteNombre={clienteSeleccionadoEliminar.nombres}
  onModalClose={handleCloseEliminarCliente}
  onClienteEliminado={handleEliminarCliente}
/>
)}

<MascotasModal
  openModal={mascotasModalOpen}
  onCloseMascota={() => setMascotasModalOpen(false)}
  clienteId={clienteXmascotaSeleccionado?.clienteId}
  clienteNombre={clienteXmascotaSeleccionado?.nombres}
/>

   <CitasModal
        openModalCita={citasModalOpen}
        onCloseCita={() => setCitasModalOpen(false)}
        clienteId={citasxClienteSeleccionado?.clienteId}
        clienteNombre={citasxClienteSeleccionado?.nombres}
      />

    </>
  );
};

export default ListarClientes;
