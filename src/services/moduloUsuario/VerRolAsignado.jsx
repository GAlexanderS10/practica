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
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import EditarRolAsignado from "./EditarRolAsignado";
import QuitarRolAsignado from "./QuitarRolAsignado";

const columns = [
  { id: "rolId", label: "ID", minWidth: 10 },
  { id: "tipo", label: "Rol", minWidth: 70 },
  { id: "actions", label: "Acciones", minWidth: 160 },
];

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#A9D5EA",
  color: "#014C6F",
  fontSize: "20px",
  fontWeight: "bold",
}));

const VerRolAsignado = ({ usuarioId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [rolesDescendentes, setRolesDescendentes] = useState([]);
  const [openEditarModal, setOpenEditarModal] = useState(false);
  const [editData, setEditData] = useState({
    usuarioId: null,
    rolId: null,
    tipo: null,
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [rolToDelete, setRolToDelete] = useState({
    usuarioId: null,
    rolId: null,
  });

  useEffect(() => {
    fetchRolesDescendentes();
  }, []);

  const fetchRolesDescendentes = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7266/api/UsuarioRol/RolesDescendentes/${usuarioId}`
      );

      setRolesDescendentes(response.data.rolesDescendentes);
    } catch (error) {
      console.error("Error al obtener los roles descendentes:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEditarModal = (usuarioId, rolId, tipo) => {
    setEditData({ usuarioId, rolId, tipo });
    setOpenEditarModal(true);
  };

  const handleCloseEditarModal = () => {
    setOpenEditarModal(false);
    fetchRolesDescendentes();
  };

  const handleOpenConfirmationModal = (usuarioId, rolId) => {
    setRolToDelete({ usuarioId, rolId });
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationOpen(false);
    fetchRolesDescendentes();
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
              {rolesDescendentes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rol) => (
                  <TableRow key={rol.rolId}>
                    <TableCell align="center">{rol.rolId}</TableCell>
                    <TableCell align="center">{rol.tipo}</TableCell>
                    <TableCell align="center">
                      <Box
                        bgcolor="#A6D4FA"
                        padding={1}
                        borderRadius="50%"
                        display="inline-block"
                        margin="0 3px"
                      >
                        <IconButton
                          onClick={() =>
                            handleOpenEditarModal(
                              usuarioId,
                              rol.rolId,
                              rol.tipo
                            )
                          }
                        >
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
                          onClick={() =>
                            handleOpenConfirmationModal(usuarioId, rol.rolId)
                          }
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
          count={rolesDescendentes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <EditarRolAsignado
        usuarioId={editData.usuarioId}
        rolId={editData.rolId}
        tipo={editData.tipo}
        open={openEditarModal}
        onClose={handleCloseEditarModal}
      />

      <QuitarRolAsignado
        open={isConfirmationOpen}
        onClose={handleCloseConfirmationModal}
        usuarioId={rolToDelete.usuarioId}
        rolId={rolToDelete.rolId}
        
      />
    </>
  );
};

export default VerRolAsignado;
