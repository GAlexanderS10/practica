import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BuscarMascota = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    console.log('Buscando:', searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Buscar Cliente"
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

export default BuscarMascota;
