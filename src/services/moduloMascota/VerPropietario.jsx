import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const VerPropietario = ({ clienteId, onClose , nombreMascota}) => {
  const [propietarioData, setPropietarioData] = useState(null);

  useEffect(() => {

    axios
      .get(`https://localhost:7266/api/Cliente/${clienteId}`)
      .then((response) => {
        setPropietarioData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del propietario:", error);
      });
  }, [clienteId]);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#8D8D8D",
          color: "#fff",
          padding: "20px",
          fontWeight: "bold",
        }}
      >
        Información del Propietario de "{nombreMascota}"
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 15,
            color: "#fff",
            bgcolor: "#C84337",
            "&:hover": {
              bgcolor: "#F87171",
              color: "#fff",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          marginTop: 2,
        }}
      >
        <TableContainer
          component={Paper}
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#A9D5EA",
                    color: "#014C6F",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {propietarioData?.clienteId}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#A9D5EA",
                    color: "#014C6F",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Nombres
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {propietarioData?.nombres}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#A9D5EA",
                    color: "#014C6F",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Apellidos
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {propietarioData?.apellidos}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#A9D5EA",
                    color: "#014C6F",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  DNI
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {propietarioData?.dni}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#A9D5EA",
                    color: "#014C6F",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                  Celular
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {propietarioData?.celular}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#A9D5EA",
                    color: "#014C6F",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {propietarioData?.email}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default VerPropietario;
