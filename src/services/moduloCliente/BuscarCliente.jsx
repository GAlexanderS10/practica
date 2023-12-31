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

        const response = await axios.get('https://localhost:7266/api/Cliente');
        const clientesEncontrados = response.data;
        onSearchResults(clientesEncontrados);
      } else {

        const response = await axios.get(`https://localhost:7266/api/Cliente/buscar?searchTerm=${searchTerm}`);
        const clientesEncontrados = response.data;
        onSearchResults(clientesEncontrados);
      }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Buscar Cliente por DNI"
        variant="outlined"
        placeholder="Buscar por DNI..."
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
