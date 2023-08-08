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
import EditarServicio from './EditarServicio'
import EliminarServicio from './EliminarServicio'


const columns = [
  { id: 'servicioId', label: 'ID', minWidth: 10 },
  { id: 'nombre', label: 'Nombre', minWidth: 180 },
  { id: 'descripcion', label: 'Descripción', minWidth: 250 }, 
  { id: 'precio', label: 'Precio', minWidth: 150 },
  { id: 'imagen', label: 'Imagen', minWidth: 100 },
  { id: 'actions', label: 'Acciones', minWidth: 200 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold',
}));

const ListarServicios = ({servicios,onServicioActualizado,onServicioEliminado }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [servicioSeleccionadoEliminar, setServicioSeleccionadoEliminar] = useState(null);


  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    try {
      const response = await axios.get('https://localhost:7266/api/Servicio');
      
    } catch (error) {
      console.error('Error al obtener la lista de servicios:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    console.log(servicio)
  };

  const handleCloseEditarServicio = () => {
    setServicioSeleccionado(null);
  };

  const handleServicioActualizado = (servicioId, datosActualizados) => {
    // Actualizar la lista de servicios con los datos actualizados
    onServicioActualizado(servicioId, datosActualizados);
  };

  const handleOpenEliminarServicio = (servicio) => {
    setServicioSeleccionadoEliminar(servicio);
  };
  
  const handleCloseEliminarServicio = () => {
    setServicioSeleccionadoEliminar(null);
  };
  


  const handleEliminarServicio = (servicioId) => {
    // Aquí puedes realizar cualquier otra lógica relacionada con la eliminación del servicio
    // Luego, llamar a la función onServicioEliminado para eliminar el servicio de la lista
    onServicioEliminado(servicioId);
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
            {servicios
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((servicio) => (
                <TableRow key={servicio.servicioId}>
                  <TableCell align="center">{servicio.servicioId}</TableCell>
                  <TableCell align="center">{servicio.nombre}</TableCell>
                  <TableCell align="center">{servicio.descripcion}</TableCell>
                  <TableCell align="center">Desde S/. {servicio.precio}0</TableCell>
                  <TableCell align="center">
                    {servicio.imagen ? (
                      <img
                        src={`https://localhost:7266/Uploads/${servicio.imagen}`}
                        alt="Imagen del servicio"
                        style={{ width: '100px', height: 'auto' }}
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </TableCell>
                  <TableCell align="center">
                  <Box bgcolor="#A6D4FA" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEditarServicio(servicio)}> 
                        <EditIcon style={{ color: '#1565C0' }} />
                      </IconButton>
                    </Box>
                    <Box bgcolor="#FEB2B2" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <IconButton onClick={() => handleOpenEliminarServicio(servicio)}>
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
        count={servicios.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    {servicioSeleccionado && (
        <EditarServicio
          servicio={servicioSeleccionado}
          onClose={handleCloseEditarServicio}
          onServicioActualizado={handleServicioActualizado}
        />
      )}

{servicioSeleccionadoEliminar && (
  <EliminarServicio
  servicioId={servicioSeleccionadoEliminar.servicioId}
  servicioNombre={servicioSeleccionadoEliminar.nombre}
  onModalClose={handleCloseEliminarServicio}
  onServicioEliminado={handleEliminarServicio}
/>
)}


    </>
  );
};

export default ListarServicios;