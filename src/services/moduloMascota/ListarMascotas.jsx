import React from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const createData = (id, ...values) => {
  return { id, values };
};

const columns = [
  { id: 'id', label: 'ID', minWidth: 10 },
  { id: 'age', label: 'Nombre', minWidth: 120 },
  { id: 'email', label: 'Especie', minWidth: 120 },
  { id: 'address', label: 'Raza', minWidth: 120 },
  { id: 'phone', label: 'Sexo', minWidth: 100 },
  { id: 'company', label: 'Color', minWidth: 100 },
  { id: 'position', label: 'F. Nacimiento', minWidth: 200 },
  { id: 'actions', label: 'Acciones', minWidth: 220 },
];

const data = Array.from({ length: 20 }, (_, index) =>
  createData(
    index + 1,
    `Name ${index + 1}`,
    Math.floor(Math.random() * 50) + 20,
    `email${index + 1}@example.com`,
    `Address ${index + 1}`,
    `Phone ${index + 1}`,
    `Company ${index + 1}`,
    `Position ${index + 1}`
  )
);

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#A9D5EA',
  color: '#014C6F',
  fontSize: '20px',
  fontWeight: 'bold'
}));


const StyledIconButton = styled(IconButton)({
  padding: 0,
  borderRadius: '50%',
  
});

const ListarMascotas = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  {row.values.map((value, index) => (
                    <TableCell key={index} align="center">
                      {value}
                    </TableCell>
                  ))}
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
                      <StyledIconButton>
                        <EditIcon style={{ color: '#1565C0' }} />
                      </StyledIconButton>
                    </Box>
                    <Box bgcolor="#FEB2B2" padding={1} borderRadius="50%" display="inline-block" margin="0 3px">
                      <StyledIconButton>
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ListarMascotas;
