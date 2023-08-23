import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BuscarCliente = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    console.log('Buscando:', searchTerm);
    setSearchTerm(searchTerm);
  
    try {
      if (searchTerm.trim() === '') {
        const response = await axios.get('https://localhost:7266/api/Empleado/ListarEmpleadosConCargo');
        const empleadosEncontrados = response.data;
        onSearchResults(empleadosEncontrados);
      } else {

        const response = await axios.get(`https://localhost:7266/api/Empleado/buscar?searchTerm=${searchTerm}`);
        const empleadosEncontrados = response.data;
        onSearchResults(empleadosEncontrados);
      }
    } catch (error) {
      console.error('Error al buscar empleados:', error);
    }
  };
  

  return (
    <div>
      <TextField
        fullWidth
        label="Buscar Empleado"
        variant="outlined"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default BuscarCliente;
