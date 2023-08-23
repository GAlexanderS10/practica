import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BuscarMascotas = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    try {
      if (searchTerm.trim() === '') {

        const response = await axios.get('https://localhost:7266/api/Mascota');
        const mascotasEncontradas = response.data;
        onSearchResults(mascotasEncontradas);
      } else {
  
        const response = await axios.get(`https://localhost:7266/api/Mascota/buscar?searchTerm=${searchTerm}`);
        const mascotasEncontradas = response.data;
        onSearchResults(mascotasEncontradas);
      }
    } catch (error) {
      console.error('Error al buscar mascotas:', error);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Buscar Mascota por DNI del Cliente"
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

export default BuscarMascotas;
