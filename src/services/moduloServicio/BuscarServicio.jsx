import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BuscarServicio = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    console.log('Buscando:', searchTerm);
    setSearchTerm(searchTerm);

    try {
      if (searchTerm.trim() === '') {

        const response = await axios.get('https://localhost:7266/api/Servicio');
        const serviciosEncontrados = response.data;
        onSearchResults(serviciosEncontrados);
      } else {

        const response = await axios.get(`https://localhost:7266/api/Servicio/buscar?searchTerm=${searchTerm}`);
        const serviciosEncontrados = response.data;
        onSearchResults(serviciosEncontrados);
      }
    } catch (error) {
      console.error('Error al buscar servicios:', error);
    }
  };

  return (
    <div >
      <TextField
        fullWidth
        label="Buscar Servicio"
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

export default BuscarServicio;
